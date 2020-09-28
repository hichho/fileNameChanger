import request from "../request";

export default {

  /**
   * 忘记密码
   */
  forgetPass: async (email, code, password) => {
    return request('/app/user/forgetPass', {method: 'POST', data: {email, code, password}})
  },


}
