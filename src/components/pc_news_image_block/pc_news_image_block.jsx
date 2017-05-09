import React, {Component} from 'react';
import {Card} from 'antd';
import {Link} from 'react-router';
import style from './pc_news_image_block.less'


export default class PCNewsImageBlock extends Component {
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
    const image_style = {
      display: 'block',
      width: this.props.imageWidth,
      height: '90px'
    };
    const h4_style = {
      width: this.props.imageWidth,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      padding: '0 2px'
    };
    const {news} = this.state;
    const newsContent = news.length ?
      news.map((newsItem, index) => (
          <div key={index} ref="imageBlock" className={style.image_block}>
            <Link to={`details/${newsItem.uniquekey}`} target="_blank">
              <div>
                <img style={image_style} src={newsItem.thumbnail_pic_s} alt=""/>
              </div>
              <div>
                <h4 style={h4_style}>{newsItem.title}</h4>
                <p className={style.author}>{newsItem.author_name}</p>
              </div>
            </Link>
          </div>
        )
      )
      : '网络出故障啦！';
    return (
      <div className={style.top_news_list}>
        <Card title={this.props.cardTitle} bordered="true" style={{width: this.props.width}}>
          <div style={{display: 'grid', gridTemplateColumns: this.props.gridValue}}>
            {newsContent}
          </div>
        </Card>
      </div>
    );
  }
}
