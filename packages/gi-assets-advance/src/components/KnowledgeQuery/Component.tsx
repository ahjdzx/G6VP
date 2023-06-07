import { useContext, utils } from '@antv/gi-sdk';

import { Button, Input } from 'antd';
import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import PublishTemplate from '../PublishTemplate';
import './index.less';

export interface CyperQueryProps {
  serviceId: string;
  saveCypherTemplateServceId?: string;
  isShowPublishButton?: boolean;
  limit: number;
  controlledValues?: {
    value: string;
  };
  onOpen?: () => void;
}

const CypherEditorPanel: React.FC<CyperQueryProps> = ({
  serviceId,
  isShowPublishButton,
  saveCypherTemplateServceId = 'GI/PublishTemplate',
  limit,
  controlledValues,
  onOpen,
}) => {
  const { updateContext, updateHistory, transform, services, largeGraphLimit } = useContext();
  const service = utils.getService(services, serviceId);

  const [state, setState] = useImmer({
    value: '',
    loading: false,
    modalVisible: false,
    inputValue: '',
  });

  /**
   * 受控参数变化，自动进行分析
   * e.g. ChatGPT，历史记录模版等
   */
  useEffect(() => {
    // if (controlledValues) {
    //   onOpen?.();
    //   const { value } = controlledValues;
    //   getCyperInputValue(value);
    //   handleQuery(value);
    //   setState(draft => {
    //     draft.inputValue = value;
    //   });
    // }
  }, [controlledValues]);

  /**
   * 更新到历史记录
   * @param success 是否成功
   * @param errorMsg 若失败，填写失败信息
   * @param value 查询语句
   */
  const handleUpateHistory = (success, errorMsg, value) => {
    updateHistory({
      componentId: 'KnowledgeQuery',
      type: 'query',
      subType: 'Cypher',
      statement: value,
      success,
      errorMsg,
      params: {
        value: value,
      },
    });
  };

  const handleQuery = async (value?: string) => {
    if (!service) {
      return;
    }

    setState(draft => {
      draft.loading = true;
    });

    let statement = value || state.value;
    console.log("statement: ", statement)
    const resultData = await service({
      value: statement,
      limit,
    });

    const success = !!resultData.nodes;
    const message = success ? undefined : '查询失败';
    handleUpateHistory(success, message, statement);
    setState(draft => {
      draft.loading = false;
    });
    updateContext(draft => {
      const res = transform(resultData);
      draft.source = res;
      draft.isLoading = false;

      if (res.nodes.length > largeGraphLimit) {
        draft.largeGraphMode = true;
        draft.largeGraphData = res;
        draft.data = {
          nodes: [],
          edges: [],
        };
        return;
      }
      draft.data = res;
    });
  };

  const getCyperInputValue = value => {
    setState(draft => {
      console.log("getCyperInputValue: " + value.target.value)
      draft.value = value.target.value;
    });
  };

  const handleShowModal = () => {
    setState(draft => {
      draft.modalVisible = true;
    });
  };

  return (
    <div className="cypher-query-container">
      <Input placeholder="请输入" 
        type='text'
        style={{ display: 'block', margin: '0 0 30px 10px' }}
        onChange={getCyperInputValue}
        //@ts-ignore
        // value={state.inputValue}
      />
      <div style={{ textAlign: 'right', padding: '12px 0px' }}>
        <Button onClick={() => handleQuery()} type="primary" loading={state.loading}>
          执行查询
        </Button>
      </div>
    </div>
  );
};

export default CypherEditorPanel;
