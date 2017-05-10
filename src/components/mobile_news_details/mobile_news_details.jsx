import React, {Component} from 'react';
import {Row, Col} from 'antd';
import MobileHeader from '../mobile_header/mobile_header';
import MobileFooter from '../mobile_footer/mobile_footer';
import CommonComments from '../common_comments/common_comments';
import style from './mobile_news_details.less';


export default class MobileNewsDetails extends Component {
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
        <MobileHeader/>
        <Row>
          <Col span={2}/>
          <Col span={20} className={style.container}>
            <div className={style.article_container}
                 dangerouslySetInnerHTML={{__html: this.state.newsItem.pagecontent}}
            ></div>
            <CommonComments uniquekey={this.props.params.uniquekey}/>
          </Col>
          <Col span={2}/>
        </Row>
        <MobileFooter/>
      </div>
    );
  }
}
