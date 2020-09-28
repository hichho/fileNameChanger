import request from "../request";

export default {

  /**
   * 用户登录
   */
  login: async (email, password) => {
    return request('/app/common/login', {method: 'POST', data: {email, password}})
  },

  /**
   * 用户注册
   */
  register: async (email, verifyCode, nickName, password) => {
    return request('/app/common/register', {method: 'POST', data: {email, verifyCode, nickName, password}})
  },

}
