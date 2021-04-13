import React, { useState, useCallback, useEffect } from 'react';
import SiteList from '@/component/siteList';
import { SortType } from '@/component/siteList/filter';
// import { useDidMount } from '@/utils/hooks';
import { querySites } from '@/utils/service';

export default ({ history }: { history?: any }) => {
  const [pagination, setPage] = useState({
    current: 1,
    total: 1,
  });
  const [data, setData] = useState([]);
  const [filterType, setFilter] = useState<SortType>({
    sortType: 'up',
    filterType: 'submitDate',
  });
  async function query(page = 1) {
    const { data: resData, totalCount } = await querySites({
      page,
      siteType: 'info',
    });
    if (resData) {
      setData(resData);
      setPage({
        ...pagination,
        current: page,
        total: totalCount,
      });
    }
  }
  useEffect(() => {
    if (filterType) {
      query();
    }
  }, [filterType]);
  return (
    <SiteList
      pagination={{
        ...pagination,
        onChange: (pageNo) => query(pageNo),
      }}
      history={history}
      title="资讯类站点"
      data={data}
      changeFilterQuery={setFilter}
      filterType={filterType}
    />
  );
};
