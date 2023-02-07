import {
  FileOutlined,
  UserOutlined,
  FileZipOutlined,
  UserAddOutlined,
  SolutionOutlined,
  UserSwitchOutlined,
  PoweroffOutlined,
  SettingOutlined,
  BarChartOutlined,
  ContactsOutlined,
} from '@ant-design/icons'
import { Dropdown, Space, Layout, Menu, Modal, Row, Col } from 'antd'
import React, { useState, useEffect } from 'react'
import admLogo from '../../Logo/logoDark.png'
import './layout.css'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import Home from '../../Breadcrumb'
import connectUsQrcode from '../../Logo/ConnectUs.png'
import NoticeBell from '../../Notice/notice';
import MiniprogramQRcodeComponent from '../../MiniprogramQRcodeComponent/MiniprogramQRcodeComponent'


const { Header, Content, Footer, Sider } = Layout
//此为系管理员主框架

let subKey = []
let sub = []
const onClicks = () => {
  subKey = '3'
  sub = 'sub1'
}

const menu = (
  <Menu style={{ width: "100px", float: "right", marginRight: "10%" }}
    items={[
      {
        key: '1',
        icon: <UserSwitchOutlined />,
        label: (
          <NavLink to="/DepartmentAdmPersonal/DepartmentAdmPersonalSet">修改密码</NavLink>
        ),
        onClick: onClicks,
      },
      {
        key: '2',
        icon: <UserOutlined />,
        label: (
          <NavLink to="/DepartmentAdmPersonal/DepartmentAdmPersonalSet">个人中心</NavLink>
        ),
      },
      {
        type: 'divider',
      },
      {
        key: '3',
        icon: <PoweroffOutlined />,
        label: (
          <NavLink to="/Login" onClick={() => { localStorage.clear() }}>退出登录</NavLink>
        ),
      },
    ]}
  />
)

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  }
}

const items = [
  getItem(<NavLink to="/TeacherManage">教师账户管理</NavLink>, '1', <SolutionOutlined />),
  getItem(<NavLink to="/TeacherAnnouncement">公告管理</NavLink>, '2', <FileZipOutlined />),
  getItem(<NavLink to="/TotalDataSummary">数据总览</NavLink>, '3', <BarChartOutlined />),
  getItem(<NavLink to="/StudentSearchDepartmentAdmin">学生管理</NavLink>, '4', <ContactsOutlined />),
  getItem('个人页', 'sub1', <UserOutlined />, [
    getItem(<NavLink to="/DepartmentAdmPersonal/DepartmentAdmPersonalSet">个人设置</NavLink>, '5', <SettingOutlined />),
  ]),
]

const rootSubmenuKeys = ['sub1'];

const LayOut = () => {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [openKeys, setOpenKeys] = useState(['sub1']);
  //联系我们Modal的开关状态
  const [connectUsModal, setConnectUsModal] = useState(false);

  //联系我们Modal关闭函数
  const handleCancel = () => {
    setConnectUsModal(false);
  };

  //联系我们Modal开启函数
  const opneConnectUsModal = () => {
    setConnectUsModal(true)
  }

  const onOpenChange = (keys) => {
    setOpenKeys(keys)
    console.log(rootSubmenuKeys.indexOf(sub))
    if (rootSubmenuKeys.indexOf(sub) === 0) {
      setOpenKeys(['sub1'])
    }
    sub = ''
  }

  if (sub !== '') {
    onOpenChange()
  }

  const onSelect = (selectedKeys) => {
    subKey = selectedKeys.key
  }
  return (
    <Layout style={{ minHeight: '100vh', }}>
      <Header className="head">
        <img className="logo1" src={admLogo} alt="" />
        <div style={{ fontSize: 16, float: "right", paddingRight: "8%" }}>
          <Space size="large">
            <NoticeBell />
            <Dropdown overlay={menu}>
              <a>
                <Space >
                  <UserOutlined />
                  {localStorage.getItem('adminName')}
                </Space>
              </a>
            </Dropdown>
          </Space>
        </div>
        <div className="administrator"><UserAddOutlined />系管理员</div>
      </Header>
      <Layout>
        <Sider width={200} className="layout-background" collapsible collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}>
          <Menu theme='light'
            selectedKeys={[subKey]}
            onSelect={onSelect}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            mode="inline"
            items={items} />
        </Sider>
        <Layout
          style={{
            padding: '0px 24px 10px 24px',
            boxShadow: '-2px 1px 4px rgba(0, 0, 0, 0.16) inset',
          }}>
          <Home />
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 480,
            }}
          >
            <Outlet></Outlet>
          </Content>
          <Footer>
            {/* <div style={{ textAlign: 'center', display: 'flex' }}>
              <div style={{ 'padding-left': '40%' }}><MiniprogramQRcodeComponent/>苏州城市学院@szcu.edu.cn</div>
              <div style={{ 'padding-left': '37%' }}><a  onClick={opneConnectUsModal}>联系我们</a></div>
            </div> */}
            <Row>
              <Col span={9}></Col>
              <Col span={12}>苏州城市学院@szcu.edu.cn <MiniprogramQRcodeComponent /> {global.url.filingNumber}</Col>
              <Col span={3}><a onClick={opneConnectUsModal}>联系我们</a></Col>
            </Row>
          </Footer>
          <Modal
            style={{ "textAlign": "center" }}
            title="过程化教学系统v1.0公测版"
            open={connectUsModal}
            destroyOnClose={true}
            width={457}
            onCancel={() => {
              handleCancel()
            }}
            footer={null}
          >
            <div style={{ textAlign: 'center' }}>
              <div>📢该系统由学生团队开发，如发现bug或有其他建议📢</div>
              <div>✨欢迎加入qq群与我们沟通交流✨</div>
            </div>
            <img
              className='conncetus'
              alt=''
              src={connectUsQrcode}
            />
          </Modal>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default LayOut