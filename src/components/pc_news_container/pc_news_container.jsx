import React, {Component} from 'react';
import {Row, Col, Tabs, Carousel} from 'antd';
import style from './pc_news_container.less';
import carousel_1 from './carousel_1.jpg';
import carousel_2 from './carousel_2.jpg';
import carousel_3 from './carousel_3.jpg';
import carousel_4 from './carousel_4.jpg';
import PCNewsBlock from '../pc_news_block/pc_news_block';
import PCNewsImageBlock from '../pc_news_image_block/pc_news_image_block';

const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true
    };
    return (
      <div>
        <Row>
          <Col span={2}/>
          <Col span={20} className={style.container}>
            <div className={style.left_container}>
              <div className={style.carousel}>
                <Carousel {...settings}>
                  <div><img src={carousel_1}/></div>
                  <div><img src={carousel_2}/></div>
                  <div><img src={carousel_3}/></div>
                  <div><img src={carousel_4}/></div>
                </Carousel>
              </div>
              <div className={style.image_block}>
                <PCNewsImageBlock count={6} type="guoji" cardTitle="国际头条" width="400px" imageWidth="112px"
                                  gridValue="repeat(3,1fr)"/>
              </div>
              <div className={style.image_block}>
                <PCNewsImageBlock count={6} type="yule" cardTitle="娱乐新闻" width="400px" imageWidth="112px"
                                  gridValue="repeat(3,1fr)"/>
              </div>
            </div>
            <Tabs className={style.tabs_news}>
              <TabPane tab="新闻头条" key="1">
                <PCNewsBlock count={32} type="top" width="100%" bordered="false"/>
              </TabPane>
              <TabPane tab="国际" key="2">
                <PCNewsBlock count={32} type="guoji" width="100%" bordered="false"/>
              </TabPane>
            </Tabs>
            <div>
              <PCNewsImageBlock count={8} type="guonei" width="100%" cardTitle="国内新闻" imageWidth="112px"
                                gridValue="repeat(8,1fr)"/>
              <PCNewsImageBlock count={8} type="yule" width="100%" cardTitle="娱乐新闻" imageWidth="112px"
                                gridValue="repeat(8,1fr)"/>
            </div>
          </Col>
          <Col span={2}/>
        </Row>
      </div>
    );
  }
}
