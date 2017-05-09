import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';

function RouterConfig({ history }) {
  return (
    <IndexPage/>
  );
}

export default RouterConfig;
