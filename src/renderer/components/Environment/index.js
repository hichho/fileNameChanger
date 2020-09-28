import React from 'react';
import Flex from "@/components/Flex";
import {Modal, Button, List, Input, Tabs, Popconfirm} from 'antd';
import AppDb from "@/utils/AppDb";
import less from './index.less';
import TabHeader from "@/components/Common/TabHeader";
import FormTable from "@/components/FormTable";
import Common from "@/utils/Common";
import AntdUtils from "@/utils/AntdUtils";
import {EditOutlined, DeleteOutlined, CopyOutlined} from '@ant-design/icons';

export default class Environment extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
      list: [],
      mode: 'list',

      projectId: '',
      _id: '',
      envName: '',
      envHost: '',
      reqParams: [],
      reqBodies: [],
      reqHeaders: [],

    }
  }

  ///////////////////////// 逻辑方法

  showModal = (projectId) => {
    this.setState({projectId, visible: true}, this.getEnvList);
  };

  /**
   * 获取环境列表
   */
  getEnvList = () => {
    const {projectId} = this.state;
    AppDb.envDb.getEnvList(projectId).then(res => {
      this.setState({list: res});
    })
  };

  /**
   * 点击添加变量
   */
  clickAdd = () => {
    const {mode, projectId, _id, envName, envHost, reqParams, reqBodies, reqHeaders} = this.state;

    if (mode == 'list') {
      this.setState({mode: 'edit'});
    } else {
      if (Common.isEmpty(envName)) {
        AntdUtils.showToast('请输入环境名称', 'error');
        return;
      }
      if (Common.isEmpty(envHost)) {
        AntdUtils.showToast('请输入请求地址', 'error');
        return;
      }

      let obj = {
        _id, name: envName, host: envHost, projectId,
        params: JSON.stringify(reqParams),
        body: JSON.stringify(reqBodies),
        headers: JSON.stringify(reqHeaders),
      };

      AppDb.envDb.saveEnvObj(obj).then(res => {
        this.setState({
          mode: 'list', envName: '', envHost: '', _id: '',
          reqParams: [], reqBodies: [], reqHeaders: []
        }, this.getEnvList)
      });
    }
  };

  clickCancel = () => {
    this.setState({mode: 'list'});
  };

  /**
   * 删除
   * @param _id
   */
  clickDel = (_id) => {
    AppDb.envDb.delEnvObj(_id).then(this.getEnvList);
  };


  /**
   * 编辑
   * @param item
   */
  clickEdit = (item) => {
    this.setState({
      mode: 'edit',
      _id: item._id,
      envName: item.name, envHost: item.host,
      reqParams: JSON.parse(item.params),
      reqBodies: JSON.parse(item.body),
      reqHeaders: JSON.parse(item.headers),
    })
  };


  /**
   * 复制
   * @param item
   */
  clickCopy = (item) => {
    let obj = {...item, name: item.name + ' copy'};
    delete obj['_id'];
    AppDb.envDb.saveEnvObj(obj).then(this.getEnvList);
  };

  ///////////////////////// 页面渲染

  render() {
    const {
      visible, list, mode,
      envName, envHost, reqParams, reqBodies, reqHeaders
    } = this.state;
    const {onClose} = this.props;

    return <Flex direction={"column"}>
      <Modal
        title={'环境变量'} visible={visible} width={600}
        onCancel={() => {
          onClose && onClose(list);
          this.setState({visible: false});
        }}
        footer={<Flex justify={"flex-end"}>
          {mode == 'edit' && <Button type={"primary"} ghost onClick={this.clickCancel}>取消</Button>}
          <Button type={'primary'} onClick={this.clickAdd}>新增变量</Button>
        </Flex>}
      >

        {mode == 'list' && <Flex direction={"column"}>
          <Flex className={less.tips}>该功能用于设置统一的请求参数，如果请求中包含了该参数，将会覆盖当前位置的值。</Flex>

          <List
            dataSource={list} className={less.list}
            renderItem={item => {
              return <Flex
                key={item._id} className={less.item} alignItems={"center"}
              >
                <Flex itemGrow={1} style={{width: 0}}>{item.name}</Flex>
                <Flex alignItems={"center"}>
                  <EditOutlined className={less.icn} onClick={this.clickEdit.bind(this, item)}/>
                  <CopyOutlined className={less.icn} onClick={this.clickCopy.bind(this, item)}/>
                  <Popconfirm title={'确定要删除该环境?'} onConfirm={this.clickDel.bind(this, item._id)}>
                    <DeleteOutlined className={less.icn} style={{color: 'red'}}/>
                  </Popconfirm>
                </Flex>
              </Flex>
            }}
          />
        </Flex>}

        {mode == 'edit' && <Flex direction={"column"}>
          <Flex direction={"column"}>
            <Flex style={{fontSize: 14, color: 'black'}}>环境名称</Flex>
            <Input
              placeholder={'请输入'} value={envName} style={{marginTop: 6}}
              onChange={e => this.setState({envName: e.target.value})}
            />
          </Flex>

          <Flex direction={"column"}>
            <Flex style={{fontSize: 14, marginTop: 16, color: 'black'}}>请求地址</Flex>
            <Input
              placeholder={'请输入'} value={envHost} style={{marginTop: 6}}
              onChange={e => this.setState({envHost: e.target.value})}
            />
          </Flex>

          <Flex direction={"column"} style={{marginTop: 12}}>
            <Tabs animated={false} tabBarGutter={24}>
              <Tabs.TabPane
                tab={<TabHeader title={'Params'} size={reqParams.length}/>}
                key={'params'}
              >
                <FormTable
                  values={reqParams} type={'1'}
                  onChange={values => {
                    this.setState({reqParams: values})
                  }}
                />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={<TabHeader title={'Body'} size={reqBodies.length}/>}
                key={'body'}
              >
                <FormTable
                  values={reqBodies} type={'2'}
                  onChange={values => {
                    this.setState({reqBodies: values})
                  }}
                />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={<TabHeader title={'Headers'} size={reqHeaders.length}/>}
                key={'headers'}
              >
                <FormTable
                  values={reqHeaders} type={'3'}
                  onChange={values => {
                    this.setState({reqHeaders: values})
                  }}
                />
              </Tabs.TabPane>
            </Tabs>
          </Flex>

        </Flex>}

      </Modal>
    </Flex>
  }


}
