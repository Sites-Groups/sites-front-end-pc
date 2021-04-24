import React from 'react';
import { connect } from 'dva';
import { RootState, User } from 'state-typings';
import Wrap from './components/wraper';
import styles from './styles.less';

interface WrapProps {
  user: User;
  dispatch?: any;
  history?: History;
}

export default connect(({ user }: RootState) => ({
  user,
}))((props: WrapProps) => {
  const { user, dispatch, history } = props;
  const userInfo = user || {};
  const reLoad = () => {
    dispatch({ type: 'user/getUserInfo' });
  };
  return (
    <div className={styles.indexContainer}>
      <Wrap reLoad={reLoad} user={userInfo} history={history} />
    </div>
  );
});
