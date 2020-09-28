import React from 'react';
import JSONTree from "react-json-tree";
import Common from "@/utils/Common";
import less from './index.less';
import {Modal, Input} from 'antd';
import {EditOutlined} from '@ant-design/icons';
import Flex from "@/components/Flex";
import ProjectApi from "@/https/apis/ProjectApi";
import AntdUtils from "@/utils/AntdUtils";

export default class JSONView extends React.Component {


  ///////////////////////// 逻辑方法


  /**
   * 编辑字段
   * @param key
   * @param e
   */
  editKeyExplain = (key, e) => {
    e.stopPropagation();

    const {explains, respId, onChange} = this.props;

    let params = {
      respId, key, value: explains[key],
    };

    Modal.confirm({
      title: '添加字段注释', okText: '确定', cancelText: '取消',
      content: <Flex direction={"column"}>

        <Flex style={{color: 'black'}}>字段:</Flex>
        <Flex style={{color: '#5555555'}}>{key}</Flex>

        <Flex style={{color: 'black', marginTop: 12, marginBottom: 2}}>注释:</Flex>
        <Input.TextArea
          rows={3} placeholder={'请输入字段注释'}
          defaultValue={params.value}
          onChange={e => params.value = e.target.value}
        />

      </Flex>,
      onOk: () => {
        return new Promise((resolve, reject) => {
          ProjectApi.expRespKey(params).then(res => {
            if (res.code == 200) {
              resolve();
              onChange && onChange(res.data);
            } else {
              reject();
              AntdUtils.showRespError(res);
            }
          })
        })
      }
    })
  };


  /**
   * 获取key的路径
   * @param array
   */
  getKeyPath(array) {
    let keys = '';
    array.forEach(item => {
      if (typeof item === 'string') {
        keys = item + '.' + keys
      }
    });
    keys = keys.substring(0, keys.length - 1);
    return keys;
  }


  ///////////////////////// 页面渲染

  render() {
    const {example, explains} = this.props;

    return <Flex direction={"column"} className={less.json}>
      <JSONTree
        data={example} hideRoot
        theme={{scheme: 'google', base00: 'rgb(245,245,245)'}}
        invertTheme={false} shouldExpandNode={() => true}
        labelRenderer={raw => {
          let keys = this.getKeyPath(raw);
          return <span>
            {(typeof raw[0]) == 'string' && <EditOutlined
              className={less.remarkIcon} onClick={this.editKeyExplain.bind(this, keys)}
            />}
            <strong>{raw[0] + ':'}</strong>
          </span>;
        }}
        valueRenderer={(value, raw, ...raw1) => {
          let optKey = this.getKeyPath(raw1);
          let remark = explains[optKey];
          return (
            <span className={less.valueLabel}>
                  <span>{value}</span>
              {!Common.isEmpty(remark) ? (
                <span className={less.remark}>{`// ${remark.explain}`}</span>
              ) : (
                ''
              )}
                </span>
          );
        }}
      />
    </Flex>
  }


}
