import React, {Component} from 'react';
import {Row, Col, Tabs, Upload, Modal, Icon, Card} from 'antd';
import MobileHeader from '../mobile_header/mobile_header';
import MobileFooter  from '../mobile_footer/mobile_footer';

const TabPane = Tabs.TabPane;

export default class MobileUserCenter extends Component {
  constructor() {
    super();
    let res = JSON.parse(window.localStorage.__user__);
    this.state = {
      userCollection: '',
      userComments: '',
      previewVisible: false,
      previewImage: '',
      userId: res.userId
    }
  }

  componentDidMount() {
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + this.state.userId, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({userCollection: data});
      })
      .catch(err => console.log(err));

    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + this.state.userId, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({userComments: data});
      })
      .catch(err => console.log(err));
  };

  handleCancel() {
    this.setState({
      previewVisible: false
    })
  }

  render() {
    const props = {
      action: 'http://newsapi.gugujiankong.com/handler.ashx',
      header: {
        "Access-Control-Allow-Origin": "*"
      },
      listType: 'picture-card',
      fileList: [
        {
          uid: -1,
          name: 'xxx.png',
          state: 'done',
          url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
          thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
        }
      ],
      onPreview: (file) => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true
        });
      },
      onChange: (file) => {
        this.fileList = file;
      }
    };
    const {userCollection, userComments} = this.state;
    const userCollectionList = userCollection.length ?
      userCollection.map((uc, index) => (
        <Card style={{marginTop: '10px'}} title={uc.uniquekey} key={index} extra={<a href={`/#/details/${uc.uniquekey}`}>查看</a>}>
          <p>{uc.Title}</p>
        </Card>
      ))
      : '您没有收藏任何新闻';
    const userCommentsList = userComments.length ?
      userComments.map((comment, index) => (
        <Card style={{marginTop: '10px'}} key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`}
              extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`}>查看</a>}>
          <p>{comment.Comments}</p>
        </Card>
      ))
      :
      '您还没有发表过任何评论。';
    return (
      <div>
        <MobileHeader/>
        <Row>
          <Col span={24}>
            <Tabs>
              <TabPane tab="我的收藏列表" key="1">
                <div style={{marginTop: '10px'}}>
                  <Row>
                    <Col span={24}>
                      {userCollectionList}
                    </Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane tab="我的评论列表" key="2">
                <div style={{marginTop: '10px'}}>
                  <Row>
                    <Col span={24}>
                      {userCommentsList}
                    </Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane tab="头像设置" key="3">
                <div style={{marginTop: '10px'}} className="clearfix">
                  <Upload {...props}>
                    <Icon type="plus"/>
                    <div className="ant-upload-text">上传照片</div>
                  </Upload>
                  <Modal visible={this.state.previewVisible} footer={null}
                         onCancel={() => this.handleCancel()}>
                    <img src={this.state.previewImage} alt="预览"/>
                  </Modal>
                </div>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <MobileFooter/>
      </div>
    );
  }
}
