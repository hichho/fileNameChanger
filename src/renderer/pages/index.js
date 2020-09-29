import React from 'react';
import Common from "@/utils/Common";
import {Button, Radio} from "antd";
import Flex from "@/components/Flex";

export default class index extends React.Component {


  constructor(props, context) {
    super(props, context);
    this.state = {
      oldPath: '',
      formPath: '',
      newPath: '',
      type: '', //1 热人员编号，2 卡号
    }

  }


  confirm() {
    const {oldPath, formPath, newPath, type} = this.state;
    if (!(!Common.isEmpty(oldPath) && !Common.isEmpty(formPath) && !Common.isEmpty(newPath))) {
      alert('请确认是否有路径没有选择或路径选择失败');
    } else if (Common.isEmpty(type)) {
      alert('请选择图片转换格式');
    } else {
      const fs = window.require('fs');
      const ImageUtils = window.require("images");
      fs.readFile(formPath, 'utf8', (err, data) => {
        console.log('12212')
        if (err) {
          console.error(err)
          return
        }
        data.split('\r\n').map(row => {
          // console.log(row);
          let cells = row.split(',');

          let oldFile;
          if (type == '1') {
            oldFile = cells[0] + '.jpg';
          } else {
            oldFile = cells[8] + '.jpg';
          }
          try {
            let buffer = fs.readFileSync(oldPath + '/' + oldFile);
            if (buffer) {
              let newBuff = ImageUtils(buffer).resize(480).encode("jpg", {operation: 100});
              fs.writeFileSync(newPath + '/' + (cells[2] + '_' + cells[8] + ".jpg"), newBuff);
            }
          } catch (e) {
            console.log(e);
          }
        })
      })
    }
  }

  openDialog(type) {
    const {dialog} = window.require('electron').remote;
    let result = dialog.showOpenDialogSync({
      title: '请选择文件夹', filters: type == '2' ? [
        {
          name: 'Doc', extensions: ['csv']
        }
      ] : null,
      properties: [
        type == '2' ? 'openFile' : 'openDirectory',
      ]
    })
    if (!result || result.length < 1) {
      return;
    }
    if (type == '1') {
      this.setState({
        oldPath: result[0]
      })
    } else if (type == '2') {
      this.setState({
        formPath: result[0],
      })
    } else {
      this.setState({
        newPath: result[0],
      })
    }
  }


  renderBtn(type) {
    const {oldPath, formPath, newPath} = this.state;
    let Config = {
      '1': oldPath,
      '2': formPath,
      '3': newPath,
    }
    return Common.initValue(Config[type], '请选择文件夹');
  }

  ////////////////////////////////// 页面渲染

  render() {
    return <div style={{padding: 32}}>
      <div>

        <h1>格式化图片名称</h1>
        <form>

          <Flex style={{padding: 16, margin: 16}}>

            <Flex direction={"column"}>
            <Flex style={{margin: '12px 0'}}>原始图片路径：</Flex>
            <Flex style={{
              cursor: 'pointer',height:36,
              padding: '8px 16px', width: '120px', backgroundColor: "#2188ff", color: "white",
              borderRadius: "6px"
            }} justify={"center"} alignItems={"center"}
                  onClick={() => this.openDialog('1')}>
              {this.renderBtn('1')}
            </Flex>
            </Flex>





            <Flex style={{marginLeft:64}} direction={"column"}>
              <Flex style={{margin: '12px 0'}}>图片格式名称：</Flex>
              <Radio.Group style={{marginTop:6}} onChange={e => this.setState({type: e.target.value})}>
                <Radio value={'1'}>人员编号...jpg</Radio>
                <Radio value={'2'}>卡号...jpg</Radio>
              </Radio.Group>
            </Flex>


          </Flex>


          <div style={{padding: 16, margin: 16}}>
            <div style={{margin: '12px 0'}}>excel文件路径：</div>
            <Flex style={{
              cursor: 'pointer',
              padding: '8px 16px', width: '120px', backgroundColor: "#2188ff", color: "white",
              borderRadius: "6px"
            }}
                  justify={"center"}
                  alignItems={"center"} onClick={() => this.openDialog('2')}>
              {this.renderBtn('2')}
            </Flex>
          </div>

          <div style={{padding: 16, margin: 16}}>
            <div style={{margin: '12px 0'}}>转换后图片保存路径：</div>
            <Flex style={{
              cursor: 'pointer',
              padding: '8px 16px', width: '120px', backgroundColor: "#2188ff", color: "white",
              borderRadius: "6px"
            }}
                  justify={"center"}
                  alignItems={"center"} onClick={() => this.openDialog('3')}>
              {this.renderBtn('3')}
            </Flex>
          </div>





          <Button onClick={() => this.confirm()} style={{marginLeft: 32, marginTop: 16}}>
            确认
          </Button>
        </form>


      </div>

    </div>;
  }
}
