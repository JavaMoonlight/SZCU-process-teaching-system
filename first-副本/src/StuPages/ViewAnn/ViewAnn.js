import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { Button, Form, Input, Select, Radio, PageHeader, message, Tag, Space, InputNumber } from 'antd'
import axios from 'axios'
import './ViewAnn.css'
import { useNavigate } from 'react-router-dom'

const ViewAnn = () => {
  const history = useNavigate()
  //课程库id
  const announceId = localStorage.getItem('announceId')
  const title = localStorage.getItem('title')
  const content = localStorage.getItem('content')
  const departmentName = localStorage.getItem('departmentName')
  const publisherName = localStorage.getItem('publisherName')
  const time = localStorage.getItem('time')

  //获取章节请求
  useEffect(() => {
    window.scrollTo(0, 0)
    const paramsData = new FormData()
    paramsData.append('announceId', announceId)
    axios({
      url: global.url.Url + "/announce/getAnnounceByCondition",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "token": localStorage.getItem('token'),
      },
      data: paramsData,
      method: 'post',
    }).then((res) => {
      if (res.data.code === "0") {
        console.log("公告", res)
        let allChapter = []
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i] >= 1) {
            allChapter.push(res.data.data[i])
          }
        }
      }
      else if (res.data.code === "021") {
        history("/Login")
        message.error("登录过期，请重新登录")
      }
    }).catch((err) => {
      console.error(err)
    })
  }, [])
  
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => history('../StuIndex')}
        title="公告"
        // subTitle={ 
        //   <Space>
        //     <Tag color='red'>{departmentName}</Tag>
        //     <Tag color='blue'>{publisherName}</Tag>
        //     <Tag color='yellow'>{time}</Tag>
        //   </Space>
        // }
      />
      
      <div className='divTitle'>
        {title}
      </div>
      <div className='divAnn'>
        {departmentName} / {publisherName} / {time}
      </div>
      <div className='editor-content-view'
            dangerouslySetInnerHTML={{ __html: content }}>
      </div>
    </>
  )
}

export default ViewAnn
