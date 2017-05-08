import React, {Component} from 'react';
import PCHeader from '../pc_header/pc_header';
import PCFooter  from '../pc_footer/pc_footer';
import PCNewsContainer from '../pc_news_container/pc_news_container';

export default class PCIndex extends Component {
  render() {
    return (
      <div>
        <PCHeader/>
          <PCNewsContainer/>
        <PCFooter/>
      </div>
    );
  }
}
