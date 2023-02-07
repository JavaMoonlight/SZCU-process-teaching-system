import './teachIndex.css';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PageHeader, Divider, Upload } from 'antd';
import TeachAnnouncement from './TeachAnnouncement';


const Main = () => {
   return(
    <>
      <div className='leftDiv'>
        <PageHeader
          className="site-page-header"
          title="公告"
        />
        <Divider orientation="left"></Divider>
        <div className='bottomDiv1'>
          <div className='bottomDiv2'>
            <TeachAnnouncement/>
          </div>
        </div>
      </div>
    </>
   );
}
export default Main;
