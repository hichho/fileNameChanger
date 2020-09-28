import Common from "./Common";
import Datastore from 'nedb';

let db = {};
db.env = new Datastore({filename: 'env.db', autoload: true});
db.config = new Datastore({filename: 'config.db', autoload: true});

const envDb = {

  /**
   * 获取环境列表
   */
  getEnvList: (projectId) => {
    let query = {};
    if (!Common.isEmpty(projectId)) {
      query.projectId = projectId;
    }
    return new Promise((resolve, reject) => {
      db.env.find(query, (err, docs) => {
        if (Common.isEmpty(err)) {
          resolve(docs);
        } else {
          reject(err);
        }
      })
    })
  },

  /**
   * 添加环境变量
   * @param obj
   */
  saveEnvObj: (obj) => {
    return new Promise((resolve, reject) => {

      const callback = (err, newDoc) => {
        if (Common.isEmpty(err)) {
          resolve(newDoc);
        } else {
          reject();
        }
      };

      if (Common.isEmpty(obj._id)) {
        delete obj['_id'];
        db.env.insert(obj, callback);
      } else {
        db.env.update({_id: obj._id}, {...obj}, {}, callback)
      }

    })
  },


  /**
   * 删除环境变量
   * @param _id
   */
  delEnvObj: (_id) => {
    return new Promise((resolve, reject) => {
      db.env.remove({_id}, (err, num) => {
        if (Common.isEmpty(err)) {
          resolve(num);
        } else {
          reject(err);
        }
      })
    });
  },


  /**
   * 获取选中的环境变量
   */
  getEnvObj: (projectId) => {
    return new Promise((resolve, reject) => {

      configDb.getConfig('env_id_' + projectId).then(res => {
        if (res.value) {
          db.env.findOne({_id: res.value}, (err, docs) => {
            let result = docs;
            if (Common.isEmpty(result)) {
              result = {};
            }
            resolve(result);
          })
        } else {
          resolve({});
        }
      });
    });
  }

};

const configDb = {

  saveConfig: (key, value) => {

    if (Common.isEmpty(value)) {
      return configDb.delConfig(key);
    }

    return new Promise((resolve, reject) => {

      const doInsert = () => {
        db.config.insert({_id: key, value}, (err, docs) => {
          if (Common.isEmpty(err)) {
            resolve(docs);
          } else {
            reject();
          }
        })
      };

      const doUpdate = () => {
        db.config.update({_id: key}, {value}, {}, (err, docs) => {
          if (Common.isEmpty(err)) {
            resolve(docs);
          } else {
            reject();
          }
        })
      };

      configDb.getConfig(key).then(res => {
        if (res._id) {
          doUpdate();
        } else {
          doInsert();
        }
      })
    })
  },

  getConfig: (key) => {
    return new Promise((resolve, reject) => {
      db.config.findOne({_id: key}, (err, docs) => {
        let result = docs;
        if (Common.isEmpty(result)) {
          result = {};
        }
        resolve(result);
      })
    })
  },

  delConfig: (key) => {
    return new Promise((resolve, reject) => {
      db.config.remove({_id: key}, (err, docs) => {
        resolve({});
      })
    })
  }

};


/**
 * 项目信息
 */
const projectDb = {

  saveProjectHost: (host) => {
    localStorage.setItem('project_host', host);
  },

  getProjectHost: () => {
    return localStorage.getItem('project_host');
  },


};

/**
 * tab信息
 */
const tabDb = {
  saveTab: (key, value) => {
    localStorage.setItem(key, value);
  },

  getTab: (key) => {
    return localStorage.getItem(key);
  }
};


export default {
  envDb, configDb, projectDb, tabDb,

  /**
   * 是否登录
   */
  isLogin: () => {
    return !Common.isEmpty(localStorage.getItem('token'));
  },

  /**
   * 保存登录
   */
  saveLogin: (login = {}) => {
    localStorage.setItem('token', login.token);
    localStorage.setItem('nickName', login.nickName);
    localStorage.setItem('email', login.email);
  },


}
