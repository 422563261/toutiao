import React from 'react';
import { connect } from 'dva';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';
import PCIndex from '../components/pc_index/pc_index';
import MobileIndex from '../components/mobile_index/mobile_index';

function IndexPage() {
  return (
    <div>
      <MediaQuery query={'(min-device-width: 1224px)'}>
        <PCIndex/>
      </MediaQuery>
      <MediaQuery query={'(max-device-width: 1224px)'}>
        <MobileIndex/>
      </MediaQuery>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
