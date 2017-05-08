import React, {Component} from 'react';
import {Tabs} from 'antd';
import './mobile_index.less';
import MobileHeader from '../mobile_header/mobile_header';
import MobileFooter from '../mobile_footer/mobile_footer';

const TabPane = Tabs.TabPane;

export default class MobileIndex extends Component {
  render() {
    return (
      <div>
        <MobileHeader/>
        <Tabs>
          <TabPane>

          </TabPane>
        </Tabs>
        <MobileFooter/>
      </div>
    );
  }
}
