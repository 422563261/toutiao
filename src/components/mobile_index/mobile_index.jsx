import React, {Component} from 'react';
import {Tabs, Carousel} from 'antd';
import style from './mobile_index.less';
import MobileHeader from '../mobile_header/mobile_header';
import MobileFooter from '../mobile_footer/mobile_footer';
import MobileList from '../mobile_list/mobile_list';
import carousel_1 from '../../common/images/carousel_1.jpg';
import carousel_2 from '../../common/images/carousel_2.jpg';
import carousel_3 from '../../common/images/carousel_3.jpg';
import carousel_4 from '../../common/images/carousel_4.jpg';

const TabPane = Tabs.TabPane;

export default class MobileIndex extends Component {
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
        <MobileHeader/>
        <Tabs>
          <TabPane tab="头条" key="1">
            <div className={style.carousel}>
              <Carousel {...settings}>
                <div><img src={carousel_1}/></div>
                <div><img src={carousel_2}/></div>
                <div><img src={carousel_3}/></div>
                <div><img src={carousel_4}/></div>
              </Carousel>
            </div>
            <MobileList count={20} type="top"/>
          </TabPane>
          <TabPane tab="社会" key="2">
            <MobileList count={20} type="shehui"/>
          </TabPane>
          <TabPane tab="国内" key="3">
            <MobileList count={20} type="guonei"/>
          </TabPane>
          <TabPane tab="国际" key="4">
            <MobileList count={20} type="guoji"/>
          </TabPane>
          <TabPane tab="娱乐" key="5">
            <MobileList count={20} type="yule"/>
          </TabPane>
          <TabPane tab="体育" key="6">
            <MobileList count={20} type="tiyu"/>
          </TabPane>
          <TabPane tab="科技" key="7">
            <MobileList count={20} type="keji"/>
          </TabPane>
        </Tabs>
        <MobileFooter/>
      </div>
    );
  }
}
