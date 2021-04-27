import React from 'react';
import Basic from './components/wraper/component/basic';
import MySite from './components/wraper/component/mySites';
import Setting from './components/wraper/component/setting';
import MyFavorite from './components/wraper/component/myFavorite';

export const USER_CENTER_ROUTES = [
  {
    path: '/user-center/basic-info',
    Component: (arg) => <Basic {...arg} />,
    title: '身份证',
  },
  {
    path: '/user-center/my-site',
    Component: (arg) => <MySite {...arg} />,
    title: '我的站点',
  },
  {
    path: '/user-center/my-favorite',
    Component: (arg) => <MyFavorite {...arg} />,
    title: '我的收藏',
  },
  {
    path: '/user-center/setting',
    Component: (arg) => <Setting {...arg} />,
    title: '设置',
  },
];
