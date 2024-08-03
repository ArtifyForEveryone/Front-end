import { EyeOutlined, HomeOutlined, StarOutlined } from '@ant-design/icons';
import { ConfigProvider, Tabs } from 'antd';
import React, { Fragment } from "react";
import Hero from '../../components/Hero';
import PostCard from '../../components/PostCard';

const { TabPane } = Tabs;

const items = [
  {
    key: '1',
    label: 'Home',
    header: 'Home',
  },
  {
    key: '2',
    label: 'Following',
    header: 'Following',
  },
  {
    key: '3',
    label: 'Followers',
    header: 'Followers',
  },
];

const Home = () => {
  return (
    <Fragment>
      <Hero />
      <div className='m-10 flex items-center justify-start min-h-20'>
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                itemActiveColor: '#2f6a81 !important',
                itemHoverColor: '#2f6a81 !important',
                itemColor: '#000000 !important',
                itemSelectedColor: '#2f6a81 !important',
              },
            },
          }}
        >
          <Tabs
            tabPosition={'left'}
            className='contentTab'
            defaultActiveKey={items[0].key}
          >
            {items.map((item) => (
              <TabPane
                key={item.key}
                tab={
                  <span className='flex items-center'>
                    {item.key === '1' && <HomeOutlined className="text-xl mr-4" />}
                    {item.key === '2' && <StarOutlined className="text-xl mr-4" />}
                    {item.key === '3' && <EyeOutlined className="text-xl mr-4" />}
                    {item.label}
                  </span>
                }
                disabled={item.disabled}
              >
                <div className="pl-[32px] w-[1000px]">
                  {item.key === '1' &&
                    <PostCard className="text-xl mr-4"
                    />}
                  {item.key === '2' &&
                    <PostCard className="text-xl mr-4"
                    />}
                  {item.key === '3' &&
                    <PostCard className="text-xl mr-4"
                    />}
                </div>
              </TabPane>
            ))}
          </Tabs>
        </ConfigProvider>
      </div>
    </Fragment>
  )
}

export default Home;
