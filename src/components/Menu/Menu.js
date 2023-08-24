import React, { useState } from 'react';
import { PercentageOutlined,HomeOutlined,FireOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

import { useContext } from "react";
import ScrollContext from "../../context/ScrollContext/ScrollContext";

const items = [
  {
    label: 'Home',
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: 'Sale',
    key: 'sale',
    icon: <PercentageOutlined />,
    disabled: false,
  },
  {
    label: 'Trending',
    key: 'trending',
    icon: <FireOutlined />,
    disabled: false,
  },
  
]
export default function App(){
  const useCtx = useContext(ScrollContext);
  const [current, setCurrent] = useState('home');
  const onClick = (e) => {
    setCurrent(e.key);
    useCtx.scrollDiv(e.key)
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className='menu' />;
};
