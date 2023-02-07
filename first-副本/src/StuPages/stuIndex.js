import './stuIndex.css';
import axios from 'axios';
import React, { useState } from 'react';
import { PageHeader, message, Space, Col, Input, Divider, Form, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import Announcement from './Announcement';


//此页面为学生页面的主页面

const Main = () => {
  let history = useNavigate()
  return (
    <>
      <div className='leftDiv'>
        <PageHeader
          className="site-page-header"
          title="公告"
        />
        <Divider orientation="left"></Divider>
        <div className='bottomDiv1'>
          <div className='bottomDiv2'>
            <Announcement/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
