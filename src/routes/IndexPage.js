import React from 'react';
import {connect} from 'dva';
import {Router, Route, hashHistory} from 'react-router';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';
import PCIndex from '../components/pc_index/pc_index';
import PCNewsDetails from '../components/pc_news_details/pc_news_details';
import PCUserCenter from '../components/pc_user_center/pc_user_center';
import MobileIndex from '../components/mobile_index/mobile_index';
import MobileNewsDetails from '../components/mobile_news_details/mobile_news_details';
import MobileUserCenter from '../components/mobile_user_center/mobile_user_center';

function IndexPage() {
  return (
    <div>
      <MediaQuery query={'(min-device-width: 1224px)'}>
        <Router history={hashHistory}>
          <Route path="/" component={PCIndex}></Route>
          <Route path="/details/:uniquekey" component={PCNewsDetails}/>
          <Route path="/usercenter" component={PCUserCenter}></Route>
        </Router>
      </MediaQuery>
      <MediaQuery query={'(max-device-width: 1224px)'}>
        <Router history={hashHistory}>
          <Route path="/" component={MobileIndex}></Route>
          <Route path="/details/:uniquekey" component={MobileNewsDetails}/>
          <Route path="/usercenter" component={MobileUserCenter}></Route>
        </Router>
      </MediaQuery>
    </div>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
