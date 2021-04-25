import React, { memo } from 'react';
import styles from './styles.less';

export default memo(() => {
  //   const curraneYear = new Date().getFullYear();
  return (
    <div className={styles.footerInfo}>
      {/* React Blog, made with <span>❤</span> by{' '}
      <a href="https://www.baidu.com/s?wd=Ada%20卑微小前端" target="blank">
        Ada
      </a>{' '}
      © 2018 - {curraneYear} */}
      <div className={styles.ba}>
        <a
          target="blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602011734"
        >
          <img src="/ba.png" alt="" />
          <p>浙公网安备 33010602011734号</p>
        </a>
      </div>
    </div>
  );
});
