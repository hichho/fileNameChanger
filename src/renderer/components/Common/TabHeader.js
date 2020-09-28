import React, {memo} from 'react';

const Index = memo((props) => {

  return <div>
    {props.title}{props.size > 0 ? <span>({props.size})</span> : ''}
  </div>
});


const TabHeader = (props) => {

  return <Index {...props}/>
};

export default TabHeader;
