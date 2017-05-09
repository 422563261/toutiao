import React from 'react';
import {connect} from 'dva';
import {Router, Route, hashHistory} from 'react-router';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';
import PCIndex from '../components/pc_index/pc_index';
import PCNewsDetails from '../components/pc_news_details/pc_news_details'
import MobileIndex from '../components/mobile_index/mobile_index';

function IndexPage() {
  return (
    <div>
      <MediaQuery query={'(min-device-width: 1224px)'}>
        <Router history={hashHistory}>
          <Route path="/" component={PCIndex}></Route>
          <Route path="/details/:uniquekey" component={PCNewsDetails}/>
        </Router>
      </MediaQuery>
      <MediaQuery query={'(max-device-width: 1224px)'}>
        <MobileIndex/>
      </MediaQuery>
    </div>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
