/**
 * 合并访问路径
 * @param path
 * @returns {string}
 */
function mergeUrl(path) {
  const {href} = window.location;
  return href.substr(0, href.indexOf("#") + 1) + path;
}


/**
 * 打开新窗口
 * @param params
 */
function openWindow(params) {
  const {BrowserWindow} = window.require('electron').remote;
  let top = new BrowserWindow({...params});
  top.loadURL(mergeUrl(params.key));
  top.once('ready-to-show', () => {
    top.show();
  })
}


/**
 * 执行命令行
 * @param cmd
 */
function runCommand(cmd) {
  return new Promise((resolve, reject) => {
    const {exec} = window.require('child_process');
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({stdout, stderr});
      }
    })
  });
}


/**
 * 使用默认应用程序管理文件和 url
 */
function openExternal(url) {
  const {shell} = window.require('electron');
  shell.openExternal(url);
}

/**
 * 获取主进程
 * @returns {NodeJS.Process}
 */
function getMainProcess() {
  const {remote} = window.require('electron');
  return remote.process;
}


export default {
  openWindow, runCommand, openExternal, getMainProcess,

};
