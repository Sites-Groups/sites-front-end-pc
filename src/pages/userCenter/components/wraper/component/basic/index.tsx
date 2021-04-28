import React, { useState, createRef, useEffect, useCallback } from 'react';
import { Input, Radio, Button } from 'antd';
import { useDidMount } from '@/utils/hooks';
import Notification from '@/component/Notification';
import UserIcon from './userIcon';
import { USER_INFO } from './constant';
import { queryMyBasicInfo, updateMyBasicInfo } from './service';

import styles from './styles.less';

const MAP_COMPONENT = {
  input: Input,
  radio: Radio.Group,
  email: Input,
  textarea: Input.TextArea,
};

interface DataState {
  avatar?: { value: string };
  email?: string;
}

export default ({ reLoad, dispatch, history }) => {
  const [data, setData] = useState<DataState>({});
  const iconRef: BasicRef = createRef();
  const onOut = useCallback(() => {
    dispatch({
      type: 'user/signOut',
    });
    history.push('/');
  }, []);
  useDidMount(async () => {
    const { success, data: resData } = await queryMyBasicInfo();
    if (success && resData) {
      setData(resData);
    }
  });
  const onUpdate = async () => {
    const body = {
      ...data,
      avatar: iconRef.current.getValue(),
    };
    const { success } = await updateMyBasicInfo(body);
    if (success) {
      Notification.success({ msg: '已更新～' });
      reLoad();
    }
  };
  const onChange = (eve, code) => {
    setData({
      ...data,
      [code]: eve.target ? eve.target.value : eve,
    });
  };
  const { avatar, email } = data;
  const [avatarValue, setAvatar] = useState<{ value: string } | string>('');
  useEffect(() => {
    setAvatar(avatar);
  }, [avatar]);
  return (
    <div className={styles.box}>
      <div className={styles.basic}>
        <div className={styles.avatarBox}>
          <div className={styles.avatar} style={{ backgroundImage: `url(${avatarValue})` }} />
          <div className={styles.emailText}>{email}</div>
        </div>
        <div className={styles.info}>
          {USER_INFO.map(({ code, name, type, ...others }) => {
            const Component = MAP_COMPONENT[type];
            if (!Component) return null;
            const value = data[code];
            return (
              <div className={styles.item} key={code}>
                <span className={styles.label}>{name}：</span>
                <span className={styles.con}>
                  <Component {...others} value={value} onChange={(e) => onChange(e, code)} />
                </span>
              </div>
            );
          })}
          <div className={styles.item}>
            <span className={styles.label}>头像：</span>
            <span className={styles.con}>
              <UserIcon
                ref={iconRef}
                value={typeof data.avatar === 'string' ? data.avatar : data?.avatar?.value}
                setAvatar={setAvatar}
              />
            </span>
          </div>
        </div>
      </div>
      <div className={styles.updBtn}>
        <div className={styles.button} onClick={onUpdate}>
          更新
        </div>
        <div className={styles.button} onClick={onOut}>
          退出登录
        </div>
      </div>
    </div>
  );
};
