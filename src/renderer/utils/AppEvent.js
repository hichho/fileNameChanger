import Common from "@/utils/Common";

/**
 * 环境改变
 */
const postEnvChange = () => {
  let changeObj = Common.initValue(window.envChangeObj, {});
  Object.keys(changeObj).map(key => {
    let change = changeObj[key];
    change && change();
  })
};


/**
 * 添加环境改变回调
 * @param key
 * @param callback
 */
const addEnvChange = (key, callback) => {
  if (Common.isEmpty(window.envChangeObj)) {
    window.envChangeObj = {};
  }
  window.envChangeObj[key] = callback;
};


export default {
  postEnvChange, addEnvChange,
}

