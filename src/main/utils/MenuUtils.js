import {Menu, app} from 'electron';

const template = [
  {
    label: app.name,
    submenu: [
      {
        label: '关于',
        role: 'about',
      }, {
        type: 'separator',
      }, {
        label: '退出',
        role: 'quit',
      },
    ],
  }, {
    label: '编辑',
    submenu: [
      {label: '撤销', role: 'undo'},
      {label: '重做', role: 'redo'},
      {type: 'separator'},
      {label: '剪切', role: 'cut'},
      {label: '复制', role: 'copy'},
      {label: '粘贴', role: 'paste'},
      {label: '删除', role: 'delete'},
      {label: '全选', role: 'selectAll'},
    ],
  },
];

const setMenu = () => {
  let menu = null;
  if (process.env.NODE_ENV !== 'development') {
    // 非开发环境
    if (process.platform === 'darwin') {
      menu = Menu.buildFromTemplate(template);
    }
  }
  Menu.setApplicationMenu(menu);
};


export default {
  setMenu,
}

