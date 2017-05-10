import React, {Component} from 'react';
import {Link} from 'react-router';
import {Row, Col, Menu, Icon, Tabs, Input, Checkbox, Button, Form, message, Modal} from 'antd';
import style from './mobile_header.less';
import logo from '../../common/images/logo.png';
import {getLocalStorage, saveLocalStorage} from '../../common/js/store'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class MobileHeader extends Component {
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

  setModalShow(value) {
    this.setState({
      modalShow: value
    })
  }

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
        if (this.state.action === 'login') {
          this.setHasLogin(true);
          this.setState({
            userNickName: data.NickUserName,
            userId: data.UserId,
            hasLogin: true
          });
          saveLocalStorage(data.UserId, data.NickUserName, true);
          message.success("登陆成功！");
        } else if (this.state.action === 'register') {
          message.success("注册成功！");
        }
        this.setModalShow(false);
      })
      .catch(err => console.log(err))
  }

  login() {
    this.setModalShow(true);
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
    const {getFieldDecorator} = this.props.form;
    const userShow = this.state.hasLogin ?
      <Link to="/usercenter">
        <Icon type="inbox" className={style.icon}/>
      </Link>
      :
      <Icon type="setting" className={style.icon} onClick={() => this.login()}/>;
    return (
      <div className={style.mobile}>
        <header>
          <Link to="/">
            <img src={logo} alt="logo"/>
          </Link>
          <div className={style.title}>ReactNews</div>
          {userShow}
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
                  <FormItem label="账户">
                    {getFieldDecorator('r_userName', {
                      rules: [{required: true, message: '用户名不能为空'}],
                    })(
                      <Input placeholder="请输入您的账号"/>
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
        </header>
      </div>
    );
  }
}
export default MobileHeader = Form.create({})(MobileHeader);
