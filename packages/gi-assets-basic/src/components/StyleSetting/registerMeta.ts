import { extra } from '@alipay/graphinsight';

const { GIAC_CONTENT_METAS, deepClone } = extra;
const metas = deepClone(GIAC_CONTENT_METAS);
metas.GIAC_CONTENT.name = '样式设置';

const registerMeta = context => {
  return {
    ...metas,
  };
};

/** 默认的配置值 */
export default registerMeta;
