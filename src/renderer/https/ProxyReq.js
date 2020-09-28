import request1 from "umi-request";
import Common from "../utils/Common";
import AppDb from "@/utils/AppDb";

/**
 * 完整的请求地址
 * @param envObj
 * @param apiObj
 */
const wholeApi = (envObj, apiObj) => {
  if (Common.isEmpty(apiObj.id)) {
    return '';
  }
  let host = AppDb.projectDb.getProjectHost();
  if (envObj._id) {
    host = envObj.host;
  }
  return host + apiObj.api;
};


/**
 * 发送请求
 * @param envObj
 * @param apiObj
 * @param reqObj
 */
const req = (envObj, apiObj, reqObj) => {

  let params = {};
  Common.parseJSON(envObj.params, []).map(p => {
    params[p.reqKey] = p.reqValue;
  });
  reqObj.params.forEach(p => {
    params[p.reqKey] = p.reqValue;
  });

  let data = {};
  Common.parseJSON(envObj.body, []).map(p => {
    data[p.reqKey] = p.reqValue;
  });
  reqObj.body.forEach(p => {
    data[p.reqKey] = p.reqValue;
  });

  let headers = {};
  Common.parseJSON(envObj.headers, []).map(p => {
    headers[p.reqKey] = p.reqValue;
  });
  reqObj.headers.forEach(h => {
    headers[h.reqKey] = h.reqValue;
  });

  return request1(wholeApi(envObj, apiObj), {
    method: apiObj.type.toLowerCase(),
    params, headers, data,
    credentials: 'include', requestType: reqObj.bodyType,
    getResponse: true, timeout: 20 * 1000,
  }).then(res => {

    // 响应数据处理
    let type = 'blob';

    // 响应头处理
    let headers = [];
    res.response.headers.forEach((value, key) => {
      if (key == 'content-type') {
        if (value.indexOf('json') != -1) {
          type = 'json';
        }
        if (value.indexOf('text') != -1) {
          type = 'text';
          if ((typeof res.data) == 'object') {
            type = 'json';
          }
        }
      }
      headers.push({key, value})
    });

    return {type, headers, data: res.data, response: res.response};
  })
};


export default {
  req, wholeApi,
}
