import router from 'umi/router';
import {message} from 'antd';


/**
 * 显示提示消息
 * @param msg
 * @param type
 * @param onClose
 */
const showToast = (msg, type = 'success', onClose) => {
  message[type](msg, 2, onClose);
};

/**
 * 显示网络请求错误
 * @param res
 */
const showRespError = (res) => {
  if (res && res.code !== 200) {
    if (res.code == 401) {
      routerPush('/login');
    } else {
      hideMessage();
      showToast(res.message, 'error');
    }
  }
};


/**
 * 显示加载框
 * @param msg
 */
const showLoading = (msg = '数据处理中，请稍等') => {
  message.loading(msg, 0);
};

/**
 * 隐藏message组件
 */
const hideMessage = () => {
  message.destroy();
};


/**
 * 返回上一级
 */
const routerBack = () => {
  router.goBack();
};

/**
 * 跳转指定目录
 * @param pathname
 * @param query
 */
const routerPush = (pathname, query) => {
  if (pathname.indexOf('?') != -1) {
    router.push(pathname);
  } else {
    router.push({pathname, query});
  }
};


export default {
  showToast, showRespError, showLoading, hideMessage, routerPush, routerBack,
}
