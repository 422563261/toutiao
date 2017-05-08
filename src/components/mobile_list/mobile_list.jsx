import React, {Component} from 'react';
import {Row, Col} from 'antd';
import {Link} from 'react-router';
import style from './mobile_list.less'


export default class MobileList extends Component {
  constructor() {
    super();
    this.state = {
      news: ''
    };
  }

  componentWillMount() {
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count,
      {method: 'GET'}
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          news: data
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    const {news} = this.state;
    const newsContent = news.length ?
      news.map((newsItem, index) => (
          <section key={index}
                   className={style.m_article}
          >
            <Link to={`details/${newsItem.uniquekey}`} target="_blank">
              <div className={style.m_article_img}>
                <img src={newsItem.thumbnail_pic_s} alt=""/>
              </div>
              <div className={style.m_article_info}>
                <div className={style.m_article_title}>
                  {newsItem.title}
                </div>
                <div className={style.m_article_desc}>
                  <div className={style.m_article_desc_l}>
                    <span className={style.m_article_channel}>{newsItem.realtype}</span>
                    <span className={style.m_article_time}>{newsItem.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )
      )
      : '网络出故障啦！';
    return (
      <div>
        <Row>
          <Col span={24}>
            {newsContent}
          </Col>
        </Row>
      </div>
    );
  }
}
