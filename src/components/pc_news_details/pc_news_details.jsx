import React, {Component} from 'react';
import {Row, Col, BackTop} from 'antd';
import style from './pc_news_details.less';
import PCHeader from '../pc_header/pc_header';
import PCFooter  from '../pc_footer/pc_footer';
import PCNewsImageBlock from '../pc_news_image_block/pc_news_image_block';
import CommonComments from '../common_comments/common_comments';

export default class PCNewsDetails extends Component {
  constructor() {
    super();
    this.state = {
      newsItem: ''
    };
  }

  componentDidMount() {
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey
      , {method: 'GET'}
    )
      .then(res => res.json())
      .then(data => {
        this.setState({newsItem: data});
        document.title = this.state.newsItem.title + "- React News | React驱动新闻平台";
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <PCHeader/>
        <Row>
          <Col span={2}/>
          <Col span={14} className={style.container}>
            <div className={style.article_container}
                 dangerouslySetInnerHTML={{__html: this.state.newsItem.pagecontent}}
            ></div>
            <CommonComments uniquekey={this.props.params.uniquekey}/>
          </Col>
          <Col span={6}>
            <PCNewsImageBlock count={40} type="top" width="100%" cardTitle="相关新闻" gridValue="repeat(2, 1fr)"
                              imageWidth="130px"/>
          </Col>
          <Col span={2}/>
        </Row>
        <PCFooter/>
        <BackTop/>
      </div>
    );
  }
}
