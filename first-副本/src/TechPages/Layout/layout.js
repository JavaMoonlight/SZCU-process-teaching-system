import React, { useState } from 'react';
import { Col, Row } from 'antd';
import './layout.css';
import Home from '../../Breadcrumb';
import {
  CheckSquareOutlined,
  HomeOutlined,
  ReadOutlined,
  FileOutlined,
  BookOutlined,
  UserOutlined,
  EditOutlined,
  FolderOpenOutlined,
  SettingOutlined,
  UserSwitchOutlined,
  PoweroffOutlined,
  BarChartOutlined,
  ContactsOutlined
} from '@ant-design/icons';
import connectUsQrcode from '../../Logo/ConnectUs.png'
import eduLogo from '../../Logo/logoDark.png';
import { Dropdown, Space, Layout, Menu, Modal } from 'antd';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import NoticeBell from '../../Notice/notice';
import MiniprogramQRcodeComponent from '../../MiniprogramQRcodeComponent/MiniprogramQRcodeComponent'
const { Header, Content, Footer, Sider } = Layout;


let subKey = []
let sub = []
const onClicks = () => {
  subKey = '5'
  sub = 'sub2'
}

const menu = (
  <Menu style={{ width: "100px", float: "right", marginRight: "10%" }}
    items={[
      {
        key: '1',
        icon: <UserSwitchOutlined />,
        label: (
          <NavLink to="/TeachPersonal/TeachPersonalSet">修改密码</NavLink>
        ),
        onClick: onClicks,
      },
      {
        key: '2',
        icon: <UserOutlined />,
        label: (
          <NavLink to="/TeachPersonal/TeachPersonalSet">个人中心</NavLink>
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
    label,
    key,
    icon,
    children,
  };
}
const items = [
  getItem(<NavLink to="/teachIndex">公告</NavLink>, '1', <HomeOutlined />),
  getItem('课程', 'sub1', <ReadOutlined />, [
    getItem(<NavLink to="/Lesson/MyLesson">我的课程</NavLink>, '2', <BookOutlined />),
  ]),
  getItem(<NavLink to="/TeachDepartment">资源站</NavLink>, '3', <FolderOpenOutlined />),
  getItem(<NavLink to="/DataSummary">数据总览</NavLink>, '4', <BarChartOutlined />),
  getItem(<NavLink to="/QuestionBank">课程题库</NavLink>, '5', <BookOutlined />),
  getItem(<NavLink to="/StudentSearchTeacher">学生管理</NavLink>, '6', <ContactsOutlined />),
  getItem('个人页', 'sub2', <UserOutlined />, [
    getItem(<NavLink to="/TeachPersonal/TeachPersonalSet">个人设置</NavLink>, '7', <SettingOutlined />),
  ]),
  
];



const rootSubmenuKeys = ['sub1', 'sub2'];

const LayOut = () => {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false);
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
    if (rootSubmenuKeys.indexOf(sub) === 1) {
      setOpenKeys(['sub2'])
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
        <img className="logo1" src={eduLogo} alt="" />
        <div style={{ fontSize: 16, float: "right", paddingRight: "8%" }}>
          <Space size="large">
            <NoticeBell />
            <Dropdown placement="bottomLeft" overlay={menu}>
              <a>
                <Space >
                  <UserOutlined />
                  {localStorage.getItem('teachName')}
                </Space>
              </a>
            </Dropdown>
          </Space>
        </div>
        <div className="teachLogo"><UserOutlined />教师页面</div>
      </Header>
      <Layout>
        <Sider width={200} className="layout-background" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <Menu theme="light"
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
          }}
        >
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
            <Col span={3}><a  onClick={opneConnectUsModal}>联系我们</a></Col>
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
  );
};

export default LayOut;