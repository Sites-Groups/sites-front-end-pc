import React, { useCallback } from 'react';
import { connect } from 'dva';
import { RootState, User } from 'state-typings';
// import Wrap from './components/wraper';
import { USER_CENTER_ROUTES } from './constant';
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
  const reLoad = useCallback(() => {
    dispatch({ type: 'user/getUserInfo' });
  }, []);
  return (
    <div className={styles.indexContainer}>
      <div className={styles.menus}>
        {USER_CENTER_ROUTES.map(({ title, path }) => (
          <div className={styles.menuItem} key={path}>
            {title}
          </div>
        ))}
      </div>
      111
      {/* <Wrap reLoad={reLoad} user={userInfo} history={history} /> */}
    </div>
  );
});
