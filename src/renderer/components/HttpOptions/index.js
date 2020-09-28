import React, {memo, useCallback} from 'react';
import {HttpMethod} from "../../global";
import {Select} from 'antd';

const Index = memo((props => {

  return <Select
    value={props.type} style={{width: 100}}
    onChange={props.onChange}
  >
    {Object.keys(HttpMethod).map(key => {
      return <Select.Option key={key} value={key}>{key}</Select.Option>
    })}
  </Select>

}));

const HttpOptions = (props) => {

  const add = useCallback(props.onChange, [props.type]);

  return <Index type={props.type} onChange={add}/>
};

export default HttpOptions;
