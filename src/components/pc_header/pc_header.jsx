import React, {Component} from 'react';
import {Link} from 'react-router';
import {Row, Col, Menu, Icon, Tabs, Input, Checkbox, Button, Form, message, Modal} from 'antd';
import logo from '../../common/images/logo.png';
import style from './pc_header.less';
import {saveLocalStorage, getLocalStorage} from '../../common/js/store'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class PCHeader extends Component {
  constructor() {
    super();
    let res = JSON.parse(getLocalStorage(false));
    this.state = {
      current: 'top',
      modalShow: false,
      action: 'login',
      hasLogin: res.hasLogin,
      userNickName: res.userNickName,
      userId: res.userId
    };
  }

  setAction(value) {
    this.setState({
      action: value
    })
  }

  setModalShow(value) {
    this.setState({
      modalShow: value
    })
  }

  handleClick(e) {
    if (e.key === 'register') {
      this.setState({
        current: 'register',
      });
      this.setModalShow(true);
    } else {
      this.setState({
        current: e.key,
      });
    }
  };

  handleSubmit(e) {
    // 提交数据
    e.preventDefault();
    e.stopPropagation();
    let formData = this.props.form.getFieldsValue();
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
      + "&username=" + formData.l_userName
      + "&password=" + formData.l_password
      + "&r_userName=" + formData.r_userName
      + "&r_password=" + formData.r_password
      + "&r_confirmPassword=" + formData.r_confirmPassword,
      {method: 'GET'}
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          userNickName: data.NickUserName,
          userId: data.UserId,
          hasLogin: true
        });
        saveLocalStorage(data.UserId, data.NickUserName, true);
        if (this.state.action === 'login') {
          this.setHasLogin(true);
          message.success("登陆成功！");
        } else if (this.state.action === 'register') {
          message.success("注册成功！");
        }
        this.setModalShow(false);
      })
      .catch(err => console.log(err))
  }

  changeAction(key) {
    if (key === "1") {
      this.setAction('login');
    } else if (key === "2") {
      this.setAction('register');
    }
  }

  setHasLogin(value) {
    this.setState({
      hasLogin: value
    })
  }

  logout() {
    saveLocalStorage('', '', false);
    this.setState({
      hasLogin: false
    });
    message.success('已退出登陆');
  }

  render() {
    let {getFieldDecorator} = this.props.form;
    const userShow = this.state.hasLogin ?
      <Menu.Item key="logout" className="register">
        <div>
          <Button htmlType="button">{this.state.userNickName}</Button>
          &nbsp;&nbsp;
          <Button type="dashed" htmlType="button" onClick={() => this.logout()}>退出</Button>
        </div>
      </Menu.Item>
      : <Menu.Item key="register" className="register">
        <Icon type="appstore"/>注册/登陆
      </Menu.Item>;
    return (
      <header>
        <Row>
          <Col span={2}></Col>
          <Col span={4}>
            <a href="/" className={style.logo}>
              <img src={logo} alt="logo"/>
              <span>ReactNews</span>
            </a>
          </Col>
          <Col span={16}>
            <Menu
              onClick={(e) => this.handleClick(e)}
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >
              <Menu.Item key="top">
                <Icon type="appstore"/>头条
              </Menu.Item>
              <Menu.Item key="shehui">
                <Icon type="appstore"/>社会
              </Menu.Item>
              <Menu.Item key="guonei">
                <Icon type="appstore"/>国内
              </Menu.Item>
              <Menu.Item key="guoji">
                <Icon type="appstore"/>国际
              </Menu.Item>
              <Menu.Item key="yule">
                <Icon type="appstore"/>娱乐
              </Menu.Item>
              <Menu.Item key="tiyu">
                <Icon type="appstore"/>体育
              </Menu.Item>
              <Menu.Item key="keji">
                <Icon type="appstore"/>科技
              </Menu.Item>
              {/*<Menu.Item key="shishang">*/}
              {/*<Icon type="appstore"/>时尚*/}
              {/*</Menu.Item>*/}
              {userShow}
            </Menu>
            <Modal title="用户中心"
                   wrapClassName="vertical-center-modal"
                   visible={this.state.modalShow}
                   onCancel={() => this.setModalShow(false)}
                   onOk={() => this.setModalShow(false)}
                   okText="关闭"
            >
              <Tabs type="card" onChange={(key) => this.changeAction(key)}>
                <TabPane tab="登陆" key="1">
                  <Form layout="horizontal" onSubmit={(e) => this.handleSubmit(e)}>
                    <FormItem label="用户名">
                      {getFieldDecorator('l_userName', {
                        rules: [{required: true, message: '用户名不能为空'}]
                      })(
                        <Input placeholder="请输入您的用户名"/>
                      )}
                    </FormItem>
                    <FormItem label="密码">
                      {getFieldDecorator('l_password', {
                        rules: [{required: true, message: '密码不能为空'}]
                      })(
                        <Input type="password" placeholder="请输入您的密码"/>
                      )}
                    </FormItem>
                    <Button type="primary" htmlType="submit">登陆</Button>
                  </Form>
                </TabPane>
                <TabPane tab="注册" key="2">
                  <Form layout="horizontal" onSubmit={(e) => this.handleSubmit(e)}>
                    <FormItem label="用户名">
                      {getFieldDecorator('r_userName', {
                        rules: [{required: true, message: '用户名不能为空'}],
                      })(
                        <Input placeholder="请输入您的用户名"/>
                      )}
                    </FormItem>
                    <FormItem label="密码">
                      {getFieldDecorator('r_password', {
                        rules: [{required: true, message: '密码不能为空哦！'}],
                      })(
                        <Input type="password" placeholder="请输入您的密码"/>
                      )}
                    </FormItem>
                    <FormItem label="确认密码">
                      {getFieldDecorator('r_confirmPassword', {
                        rules: [{required: true, message: '确认密码不能为空哦！'}]
                      })(
                        <Input type="password" placeholder="请再次输入您的密码"/>
                      )}
                    </FormItem>
                    <Button type="primary" htmlType="submit">注册</Button>
                  </Form>
                </TabPane>
              </Tabs>
            </Modal>
          </Col>
          <Col span={2}></Col>
        </Row>
      </header>
    );
  }
}
export default PCHeader = Form.create({})(PCHeader);
