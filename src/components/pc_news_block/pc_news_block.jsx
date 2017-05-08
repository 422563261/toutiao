import React, {Component} from 'react';
import {Card} from 'antd';
import {Link} from 'react-router';
import style from './pc_news_block.less'


export default class PCNewBlock extends Component {
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
          <li key={index}>
            <Link to={`details/${newsItem.uniquekey}`} target="_blank">
              {newsItem.title}
            </Link>
          </li>
        )
      )
      : '网络出故障啦！';
    return (
      <div className={style.top_news_list}>
        <Card>
          {newsContent}
        </Card>
      </div>
    );
  }
}
