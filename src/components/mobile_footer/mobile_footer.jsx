import React, {Component} from 'react';
import { Row, Col } from 'antd';
import style from './mobile_footer.less'

export default class MobileFooter extends Component {
  render() {
    return (
      <footer>
        <Row>
          <Col span={2}></Col>
          <Col span={20} className={style.footer}>
            &copy;&nbsp;2016 ReactNews. All rights Reserved.
          </Col>
          <Col span={2}></Col>
        </Row>
      </footer>
    );
  }
}
