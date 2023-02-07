import { Table, Tooltip, Tag, Space } from 'antd'
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './index.css'
import { useNavigate } from 'react-router-dom'

const App = () => {
  //表格数据
  let [data, setData] = useState([])

  //富文本id
  const history = useNavigate()

  var moment = require('moment')

  //跳转到公告显示页
  const toUpdataTopic = (announceId, title, content, departmentName, publisherName, time,value) => {
    localStorage.setItem('value', value)
    localStorage.setItem('announceId', announceId)
    localStorage.setItem('title', title)
    localStorage.setItem('content', content)
    localStorage.setItem('departmentName', departmentName)
    localStorage.setItem('publisherName', publisherName)
    localStorage.setItem('time', time)
    history('/StuPages/ViewAnn',
      { state: { announceId: announceId } })
  }

  useEffect(() => {
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
          departmentName: res.data.data[i].departmentName,
          publisherName:res.data.data[i].publisherName,
          time: moment(res.data.data[i].time).format('YYYY-MM-DD hh:mm'),
        }
      }
      setData(data2)
      console.log("公告信息", res)
    }).catch((err) => {
      console.error(err)
    })
  }, [])

  const columns = [
    // {
    //   title: '发布方',
    //   dataIndex: 'departmentName',
    //   key: 'departmentName',
    //   align: 'center',
    //   width: 200,
    // },
    {
      title: '公告标题',
      dataIndex: 'title',
      key: 'title',
      align: 'right',
      render: (title, record, key) => {
        return <Space wrap>
          <Tag color="volcano">{record.publisherName}</Tag>
          <Tooltip placement="top" title={title}>
            <div style={{width:800, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",textAlign:"left"}}>
              {title}
            </div>
          </Tooltip>
        </Space>
     }
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      width: 300,
    },
  ]

  return (
    <div className='div'>
      <Table
        scroll={{ y: 320 }}
        columns={columns}
        dataSource={data}
        bordered={false}
        showHeader={false}
        //表格行点击事件
        onRow={(record) => {
          return {
            onClick:() => { toUpdataTopic(record.id,record.title,record.content,record.departmentName,record.publisherName,record.time,record.value)}
          };
        }}
        size='small'
      />
    </div>
    )
}
export default App