import React from 'react';
import { Layout } from 'antd';
import { MenuSide } from './menu';
import { BreadcrumbWrap } from './breadcrumb';
import { Header } from './header';
import Footer from './footer';
import styles from './styles.less';

const { Content } = Layout;

const UserCenter: React.FC<{ children?: React.ReactNode; history?: History }> = ({
  children,
  history,
}) => {
  const {
    location: { pathname },
  } = history;
  return (
    <Layout className={styles.outLayout}>
      <MenuSide history={history} defaultPath={pathname} />
      <Layout>
        <Header />
        <Content className={styles.content}>
          <BreadcrumbWrap history={history} />
          <div className={styles.children}>{children}</div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default UserCenter;
