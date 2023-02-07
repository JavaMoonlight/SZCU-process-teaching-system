import { Table, Space, Button, Form, Input, Modal, message, PageHeader } from 'antd'
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { render } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'

const { confirm } = Modal
const Announcement = () => {
  //表格数据
  let [data1, setData1] = useState([])

  //获取所要修改的id
  const [id, setId] = useState(-1)
  const [title, setTitle] = useState(-1)
  //富文本id
  const announceId = localStorage.getItem('announceId')
  const history = useNavigate()
  
  //跳转到富文本组件
  const toAddTopic = () => {
    history('../WangEditor/',
      { state: { announceId: announceId } })
  }

  //跳转到更改公告页
  const toUpdataTopic = (announceId, title, content, value) => {
    localStorage.setItem('value', value)
    localStorage.setItem('announceId', announceId)
    localStorage.setItem('title', title)
    localStorage.setItem('content', content)
    history('../UpdataAnn',
      { state: { announceId: announceId } })
  }

  const updateAnnounce = () =>{
    //获取公告的信息
    axios({
      url: global.url.Url + "/announce/getAnnounceByCondition",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "token": localStorage.getItem('token'),
      },
      method: 'post',
    }).then((res) => {
      let data2 = []
      for (let i = 0; i < res.data.data.length; i++) {
        data2[i] = {
          value: i + 1,
          id:res.data.data[i].announceId,
          title: res.data.data[i].title,
          content: res.data.data[i].content,
          // departmentName: res.data.data[i].departmentName,
          // publisherName: res.data.data[i].publisherName,
          // time: res.data.data[i].time,
        }
      }
      setData1(data2)
      console.log("公告信息", res)
    }).catch((err) => {
      console.error(err)
    })
  }

  useEffect(() => {
    updateAnnounce()
  }, [])

  const columns = [
    {
      title: '序号',
      dataIndex: 'value',
      key: 'value',
      align: 'center',
    },
    {
      title: '公告标题',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
    },
    {
      title: '功能',
      dataIndex: 'function',
      key: 'function',
      align: 'center', 
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => { toUpdataTopic(record.id,record.title,record.content,record.value) }}>修改</Button>
          <Button onClick={() => { deleteAnn(record.id, record.value)}}>删除</Button>
        </Space >
      ),
    },
  ]

  //删除公告
  const deleteAnn=(id, value)=>{
    console.log("id="+id);
    confirm({
      title: '确定要删除该公告吗?',
      icon: <ExclamationCircleOutlined />,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',

      onOk () {
        const params = new URLSearchParams()
        params.append('announceId', id)
        axios({
          url: global.url.Url + "/announce/deleteAnnounce",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "token": localStorage.getItem('token'),
          },
          data: params,
          method: 'post',
        }).then((res) => {
          if(res.data.code === '0'){
            console.log("删除公告", res)
            message.success("删除成功")
            updateAnnounce()
          }
          else if (res.data.code === "021") {
            history("/Login")
            message.error("登录过期，请重新登录")
          }
          else{
            console.log("删除失败", res)
            message.error("删除失败")
          }
        }).catch((err) => {
          console.log(err)
          message.error("请求失败")
        })
      },
      onCancel () {
        console.log('取消删除')
      },
    })
  }

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="公告"
        extra={
          <Button
              type="primary"
              style={{ float: "right", margin: 10 }}
              onClick={() => { toAddTopic() }}
            >
            添加公告
          </Button>
        }
      />
      {/* <CollectionCreateForm
        id={id}
        onCancel={() => {
          setId(-1)
        }}
      /> */}
      <Table
        columns={columns}
        dataSource={data1}
        bordered
        size='small'
      />
    </div>
    )
}
export default Announcement