import React, {memo, useCallback} from 'react';
import Flex from "../Flex";
import less from './index.less';
import {DeleteOutlined} from '@ant-design/icons';
import Common from "../../utils/Common";
import {Input} from 'antd';

const Index = memo((props) => {
  const {values = [], onChange} = props;

  const callback = (newValues) => {
    newValues = newValues.filter(item => !Common.isEmpty(item.reqKey));
    onChange && onChange(newValues);
  };


  /**
   * 输入key
   * @param idx
   * @param e
   */
  const inputKey = (idx, e) => {
    let reqKey = e.target.value;
    let newValues = [...values];
    newValues[idx] = {...values[idx], reqKey};
    callback(newValues);
  };

  /**
   * 输入value
   * @param idx
   * @param e
   */
  const inputValue = (idx, e) => {
    let reqValue = e.target.value;
    let newValues = [...values];
    newValues[idx] = {...values[idx], reqValue};
    callback(newValues);
  };

  /**
   * 输入描述
   * @param idx
   * @param e
   */
  const inputDesc = (idx, e) => {
    let reqDesc = e.target.value;
    let newValues = [...values];
    newValues[idx] = {...values[idx], reqDesc};
    callback(newValues);
  };

  /**
   * 删除
   * @param idx
   */
  const delItem = (idx) => {
    let newValues = [...values];
    newValues.splice(idx, 1);
    callback(newValues);
  };


  /**
   * 添加空白
   */
  const addEmptyItem = (newValues) => {
    let emptyItem = newValues.find(item => Common.isEmpty(item.reqKey));
    if (Common.isEmpty(emptyItem)) {
      newValues.push({reqKey: '', reqValue: '', reqDesc: ''});
    }
  };

  let colValues = [...values];
  addEmptyItem(colValues);

  return <Flex direction={"column"} style={{marginBottom: 24}}>
    <Flex className={less.header} alignItems={"center"}>
      <Flex className={less.col} itemGrow={1}>Key</Flex>
      <Flex className={less.col} itemGrow={1}>Value</Flex>
      <Flex className={less.col} itemGrow={1}>Desc</Flex>
      <Flex className={less.col} style={{width: 64}} justify={"center"}>Action</Flex>
    </Flex>

    <Flex direction={"column"}>
      {colValues.map((item, idx) => {
        return <Flex className={less.column} key={idx}>
          <Flex className={less.col} itemGrow={1}>
            <Input
              value={item.reqKey} placeholder={'key'}
              onChange={inputKey.bind(this, idx)}
            />
          </Flex>
          <Flex className={less.col} itemGrow={1}>
            <Input
              value={item.reqValue} placeholder={'value'}
              onChange={inputValue.bind(this, idx)}
            />
          </Flex>
          <Flex className={less.col} itemGrow={1}>
            <Input
              value={item.reqDesc} placeholder={'desc'}
              onChange={inputDesc.bind(this, idx)}
            />
          </Flex>
          <Flex className={less.col} style={{width: 64}} justify={"center"} alignItems={"center"}>
            {!Common.isEmpty(item.reqKey) &&
            <DeleteOutlined onClick={delItem.bind(this, idx)} className={less.del}/>}
          </Flex>
        </Flex>
      })}
    </Flex>

  </Flex>

});


const FormTable = (props) => {

  const onChange = useCallback(props.onChange, [props.values]);

  return <Index {...props} onChange={onChange}/>
};

export default FormTable;
