import React, {Component} from 'react';
import {Link} from 'react-router';
import {Row, Col, Menu, Icon, Tabs, Input, Checkbox, Button, Form, message, Modal, Card} from 'antd';
import {saveLocalStorage, getLocalStorage} from '../../common/js/store'

const FormItem = Form.Item;

class CommonComments extends Component {
  constructor() {
    super();
    let res = JSON.parse(getLocalStorage(false));
    this.state = {
      comments: '',
      userId: res.userId
    };
  }

  componentDidMount() {
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey,
      {method: 'GET'}
    )
      .then(res => res.json())
      .then(data => {
        let comments = data.filter(item => {
          if (parseInt(item.UserId) === parseInt(this.state.userId)) {
            return true;
          }
        });
        this.setState({comments: comments});
      })
      .catch(err => console.log(err));
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    let formData = this.props.form.getFieldsValue();
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + this.state.userId + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formData.comments
      , {method: 'GET'}
    )
      .then(() => this.componentDidMount())
      .catch(err => console.log(err));
  }

  addUserCollection() {
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + this.state.userId + "&uniquekey=" + this.props.uniquekey
      , {method: 'GET'})
      .then(res => res.json())
      .then(() => {
        message.success('收藏成功！');
      })
      .catch(err => console.log(err));
  }

  render() {
    let {getFieldDecorator} = this.props.form;
    const {comments} = this.state;
    const commentsContents = comments.length ?
      comments.map((comment, index) => (
        <Card style={{margin: '10px'}} key={index} title={comment.UserName}
              extra={<a href="#">发布于 {comment.datetime}</a>}>
          <p>{comment.Comments}</p>
        </Card>
      ))
      : '您还没有发表任何评论';
    return (
      <div style={{marginTop: '50px'}}>
        <Row>
          <Col span={24}>
            {commentsContents}
            <Form onSubmit={(e) => this.handleSubmit(e)}>
              <FormItem label="您的评论">
                {getFieldDecorator('comments', {
                  rules: [{required: true, message: '你的评论还没输入呢'}]
                })(
                  <Input type="textarea" placeholder="请输入您的评论"/>
                )}
              </FormItem>
              <Button type="primary" htmlType="submit">提交</Button>
              <Button style={{marginLeft: '10px'}} type="primary" htmlType="button"
                      onClick={() => this.addUserCollection()}>收藏</Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
export default CommonComments = Form.create({})(CommonComments);
