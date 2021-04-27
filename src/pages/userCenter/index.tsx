import React, { useCallback, useState, useMemo } from 'react';
import classnames from 'classnames';
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
  const [activityKey, setKey] = useState<string>(USER_CENTER_ROUTES[0].path);
  const userInfo = user || {};
  const reLoad = useCallback(() => {
    dispatch({ type: 'user/getUserInfo' });
  }, []);
  const Component = useMemo(() => {
    const target = USER_CENTER_ROUTES.find((item) => item.path === activityKey);
    return {
      component: target.Component,
      title: target.title,
    };
  }, [activityKey]);
  const { component, title } = Component || {};
  return (
    <div className={styles.indexContainer}>
      <div className={styles.menus}>
        {USER_CENTER_ROUTES.map(({ title, path }) => (
          <div className={styles.menuItem} key={path} onClick={() => setKey(path)}>
            {title}
          </div>
        ))}
        <div
          className={classnames({
            [styles.bgCircle]: true,
            [styles[activityKey.replace(/\//g, '')]]: true,
          })}
        >
          <span key={activityKey} className={styles.title}>
            {title}
          </span>
        </div>
      </div>
      <div className={styles.container}>{component && component({ ...props, reLoad })}</div>
    </div>
  );
});
