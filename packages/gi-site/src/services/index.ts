import localforage from 'localforage';
import request from 'umi-request';
import { getUid } from '../pages/Workspace/utils';
import { isMock, SERVICE_URL_PREFIX } from './const';

export function getEdgesByNodes(nodes, edges) {
  const ids = nodes.map(node => node.id);
  return edges.filter(edge => {
    const { source, target } = edge;
    if (ids.indexOf(source) !== -1 && ids.indexOf(target) !== -1) {
      return true;
    }
    return false;
  });
}

/**
 * 获取指定项目
 * @param id 项目id
 * @returns
 */
export const getProjectById = async (id: string) => {
  const getResult = project => {
    //TODO :这里应该不用处理JSON.parse 吧
    const config = JSON.parse(project.projectConfig);
    const data = JSON.parse(project.data);
    let activeAssetsKeys;
    if (project.activeAssetsKeys) {
      activeAssetsKeys = JSON.parse(project.activeAssetsKeys);
    } else {
      activeAssetsKeys = {
        elements: [config.node.id, config.edge.id],
        components: [...config.components.map(c => c.id), 'NodeLegend', 'CanvasSetting'],
        layouts: ['Grid', 'GraphinForce', 'D3Force', 'Concentric', 'Dagre', 'Radial', 'Circular'], // [config.layout.id],
      };
    }
    return {
      config,
      data,
      activeAssetsKeys,
    };
  };

  if (isMock) {
    const project = await localforage.getItem(id);
    return getResult(project);
  }
  // TODO response 返回为数组，应该返回为对象
  const response = await request(`${SERVICE_URL_PREFIX}/project/list/${id}`, {
    method: 'post',
  });
  if (response.success && response.data?.length > 0) {
    const res = response.data[0];
    return getResult(res);
  }
};

/**
 * 更新或保存指定项目
 * @param id 项目id
 * @param p 项目配置
 * @returns
 */
export const updateProjectById = async (id: string, data: any) => {
  if (isMock) {
    const origin: any = await localforage.getItem(id);
    return await localforage.setItem(id, { ...origin, ...data });
  }

  data.id = id;

  const response = await request(`${SERVICE_URL_PREFIX}/project/update`, {
    method: 'post',
    data,
  });

  return response.success;
};

// 软删除项目
export const removeProjectById = async (id: string) => {
  if (isMock) {
    return await localforage.removeItem(id);
  }

  const response = await request(`${SERVICE_URL_PREFIX}/project/delete`, {
    method: 'post',
    data: {
      id,
    },
  });

  return response.success;
};

/**
 * 获取所有项目
 * @returns
 */
export const getProjectList = async () => {
  if (isMock) {
    const list = [];
    const iter = await localforage.iterate(value => {
      //@ts-ignore
      if (value.isProject) {
        list.push(value);
      }
    });
    return list || [];
  }

  const response = await request(`${SERVICE_URL_PREFIX}/project/list`, {
    method: 'get',
  });

  if (response.success) {
    return response.data;
  }
  return [];
};

/**
 * 增加项目
 */
export const addProject = async (param: any) => {
  if (isMock) {
    const projectId = getUid();
    const p = { ...param, id: projectId, isProject: true };
    // const all = (await getProjectList()) as any[];
    // localforage.setItem('projects', [...all, p]);

    localforage.setItem(projectId, p);
    return new Promise(resolve => {
      resolve(projectId);
    });
  }

  const response = await request(`${SERVICE_URL_PREFIX}/project/create`, {
    method: 'post',
    data: param,
  });

  if (response.success && response.data?.insertId) {
    return response.data?.insertId;
  }
};
