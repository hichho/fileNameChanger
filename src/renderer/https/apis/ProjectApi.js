import request from "../request";

export default {

  /**
   * 项目列表
   */
  list: async () => {
    return request('/app/project/list', {method: 'GET', params: {}})
  },


  groupApi: async (pId, keywords) => {
    return request('/app/project/groupApi', {method: 'GET', params: {pId, keywords}})
  },

  /**
   * 分组更新
   */
  groupUpdate: async (params) => {
    return request('/app/project/groupUpdate', {method: 'POST', data: {...params}})
  },

  /**
   * 分组添加
   */
  groupAdd: async (params) => {
    return request('/app/project/groupAdd', {method: 'POST', data: {...params}})
  },

  apiList: async (groupId) => {
    return request('/app/project/apiList', {method: 'GET', params: {groupId}})
  },

  apiAdd: async (params) => {
    return request('/app/project/apiAdd', {method: 'POST', data: {...params}})
  },

  /**
   * 单个Api详情
   */
  apiOne: async (projectId, apiId) => {
    return request('/app/project/apiOne', {method: 'GET', params: {projectId, apiId}})
  },

  /**
   * 项目成员列表
   */
  memberList: async (id) => {
    return request('/app/project/memberList', {method: 'GET', params: {id}})
  },

  /**
   * 删除项目成员
   */
  memberDelete: async (pId, userId) => {
    return request('/app/project/memberDelete', {method: 'POST', data: {pId, userId}})
  },

  /**
   * 添加项目成员
   */
  memberAdd: async (pId, email) => {
    return request('/app/project/memberAdd', {method: 'POST', data: {pId, email}})
  },

  /**
   * 获取单个项目
   */
  getOne: async (id) => {
    return request('/app/project/getOne', {method: 'GET', params: {id}})
  },

  /**
   * 新建项目
   * @param params
   */
  create: async (params) => {
    return request('/app/project/create', {method: 'POST', data: {...params}})
  },


  /**
   * 响应解析
   * @param params
   */
  expRespKey: async (params) => {
    return request('/app/project/expRespKey', {method: 'POST', data: {...params}})
  },


  /**
   * 保存请求和响应参数
   * @param params
   */
  saveReqResp: async (params) => {
    return request('/app/project/saveReqResp', {method: 'POST', data: {...params}})
  },

  /**
   * 更新项目
   * @param params
   */
  update: async (params) => {
    return request('/app/project/update', {method: 'POST', data: {...params}})
  },

  /**
   * 更新项目
   * @param params
   */
  copy: async (params) => {
    return request('/app/project/copy', {method: 'POST', data: {...params}})
  },

  /**
   * 删除项目
   * @param id
   */
  delete: async (id) => {
    return request('/app/project/delete', {method: 'POST', data: {id}})
  },


  /**
   * 删除分组
   * @param groupId
   */
  groupDel: async (groupId) => {
    return request('/app/project/groupDel', {method: 'POST', data: {groupId}})
  },

  /**
   * 删除接口
   * @param params
   */
  apiDel: async (params) => {
    return request('/app/project/apiDel', {method: 'POST', data: {...params}})
  },

  /**
   * 编辑接口
   * @param params
   */
  apiEdit: async (params) => {
    return request('/app/project/apiEdit', {method: 'POST', data: {...params}})
  },

  /**
   * 更新版本
   * @param id
   */
  updateVersion: async (id) => {
    return request('/app/project/updateVersion', {method: 'POST', data: {id}})
  },

}
