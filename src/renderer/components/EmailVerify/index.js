import React from 'react';
import {Button} from 'antd';
import Common from "../../utils/Common";
import AntdUtils from "../../utils/AntdUtils";
import ToolsApi from "../../https/apis/ToolsApi";

export default class EmailVerify extends React.Component {


  constructor(props, context) {
    super(props, context);
    this.state = {
      count: 0, loading: false,
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  ///////////////////////////////// 逻辑方法

  /**
   * 发送邮件
   */
  sendEmail = () => {
    const {email, type = '1'} = this.props;
    if (Common.isEmpty(email)) {
      AntdUtils.showToast('请输入电子邮箱', 'error');
      return;
    }
    this.setState({loading: true});
    ToolsApi.sendEmail(email, type).then(res => {
      if (res.code === 200) {
        this.setState({count: 120, loading: false}, this.startTimer);
      } else {
        AntdUtils.showRespError(res);
        this.setState({loading: false});
      }
    })
  };

  /**
   * 开始倒计时
   */
  startTimer = () => {
    this.timer = setInterval(() => {
      const {count} = this.state;
      if (count > 0) {
        this.setState({count: count - 1,});
      } else {
        this.clearTimer();
      }
    }, 1000);
  };

  /**
   * 清理倒计时
   */
  clearTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
  };


  //////////////////////////// 页面渲染

  render() {
    const {count, loading} = this.state;


    return <Button
      type={"primary"} size={"large"} disabled={count != 0}
      loading={loading} onClick={this.sendEmail}
    >
      {count == 0 ? '发送验证码' : `${count}s`}
    </Button>

  }

}
