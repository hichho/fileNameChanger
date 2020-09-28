import request from "../request";

export default {

  /**
   * 发送邮件
   */
  sendEmail: async (email, type) => {
    return request('/tools/send/email', {method: 'POST', data: {email, type}})
  },

  /**
   * 获取ip解析
   * @param ip
   */
  ipAddress: async (ip) => {
    return request('/tools/ip/address', {method: 'POST', data: {ip}})
  },

}
