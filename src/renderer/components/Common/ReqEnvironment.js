import React, {memo, useState, useEffect} from 'react';
import Flex from "@/components/Flex";
import less from "./ReqEnvironment.less";
import {SettingOutlined} from '@ant-design/icons';
import {Select} from 'antd';
import Environment from "@/components/Environment";
import AppDb from "@/utils/AppDb";
import AppEvent from "@/utils/AppEvent";

const Index = memo((props) => {

  const envIdKey = 'env_id_' + props.projectId;

  const [list, setList] = useState([]);
  const [value, setValue] = useState(undefined);

  let environmentRef = null;

  useEffect(() => {
    AppDb.envDb.getEnvList(props.projectId).then(res => {
      setList(res);
    });
    AppDb.configDb.getConfig(envIdKey).then(res => {
      setValue(res.value);
    })
  }, [props.projectId]);

  const showEditModal = () => {
    environmentRef && environmentRef.showModal(props.projectId);
  };

  /**
   * 设置当前环境
   * @param value
   */
  const saveReqEnvironment = (value) => {
    setValue(value);
    AppDb.configDb.saveConfig(envIdKey, value).then(res => {
      AppEvent.postEnvChange({...res});
    });
  };

  /**
   * 窗口关闭的时候
   */
  const onClose = (list) => {
    setList(list);
  };

  return <Flex alignItems={"center"} className={less.env}>
    <SettingOutlined className={less.icn} onClick={showEditModal}/>
    <Select
      placeholder={'请选择环境'} style={{width: 200}} allowClear value={value}
      onChange={saveReqEnvironment}
    >
      {list.map(item => {
        return <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
      })}
    </Select>

    <Environment onClose={onClose} ref={ele => environmentRef = ele}/>

  </Flex>
});


const ReqEnvironment = (props) => {

  return <Index {...props}/>
};

export default ReqEnvironment;
