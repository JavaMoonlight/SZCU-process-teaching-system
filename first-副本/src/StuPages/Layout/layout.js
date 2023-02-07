import React, { useState } from 'react';
import { Col, Row } from 'antd';
import './layout.css';
import Home from '../../Breadcrumb';
import {
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
} from '@ant-design/icons'
import eduLogo from '../../Logo/logoDark.png';
import connectUsQrcode from '../../Logo/ConnectUs.png'
import { Dropdown, Space, Layout, Menu, Modal } from 'antd';
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import NoticeBell from '../../Notice/notice';
import MiniprogramQRcodeComponent from '../../MiniprogramQRcodeComponent/MiniprogramQRcodeComponent'
//此为学生页面的主框架Layout

const { Header, Content, Footer, Sider } = Layout;
//引用antd Layout内置元素

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
          <NavLink to="/StuPersonal/StuPersonalSet">修改密码</NavLink>
        ),
        onClick: onClicks,
      },
      {
        key: '2',
        icon: <UserOutlined />,
        label: (
          <NavLink to="/StuPersonal/StuPersonalSet">个人中心</NavLink>
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
  //设置导航Nav所需列表item的元素
  return {
    label,
    key,
    icon,
    children,
  };
}
const items = [
  //设置Item的内容，实现导航栏的功能
  getItem(<NavLink to="/StuIndex">公告</NavLink>, '1', <HomeOutlined />),
  getItem('课程', 'sub1', <ReadOutlined />, [
    getItem(<NavLink to="/Course/MyCourse">我的课程</NavLink>, '2', <BookOutlined />),
    getItem(<NavLink to="/Course/TodoWork">未完成作业</NavLink>, '3', <EditOutlined />),
  ]),
  getItem(<NavLink to="/StuDepartment">资源站</NavLink>, '4', <FolderOpenOutlined />),
  getItem('个人页', 'sub2', <UserOutlined />, [
    getItem(<NavLink to="/StuPersonal/StuPersonalSet">个人设置</NavLink>, '5', <SettingOutlined />),
  ]),
  getItem(<NavLink to="/StuQuestionBank">课程题库</NavLink>, '6', <BookOutlined />),
];

const rootSubmenuKeys = ['sub1', 'sub2'];
//设置并确认导航栏内父级菜单

const App = () => {
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

  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false);
  //设置导航栏收起按钮的控制函数
  const [openKeys, setOpenKeys] = useState(['sub1']);
  //设置导航栏开启状态父级菜单的控制函数

  const onOpenChange = (keys) => {
    //父级菜单的开启状态函数，详见antd官方文档下“Menu”的组件介绍
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
    //以下所用组件可前往antd官方网站查看相应的应用方法和API设置
    <Layout style={{ minHeight: '100vh', }}>
      <Header className="head">
        <div>
          <img className="logo1" src={eduLogo} alt="" />
        </div>
        <div style={{ fontSize: 16, float: "right", paddingRight: "8%" }}>
          <Space size="large">
            <NoticeBell />
            <Dropdown placement="bottomLeft" overlay={menu}>
              <a>
                <Space >
                  <UserOutlined />
                  {localStorage.getItem('stuName')}
                </Space>
              </a>
            </Dropdown>
          </Space>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="layout-background" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <Menu theme="light"
            openKeys={openKeys}
            selectedKeys={[subKey]}
            onSelect={onSelect}
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
            {/* outlet为后续嵌套内部组件提供及确认渲染位置，为此文件Layout框架的本质作用 */}
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
  );
};

export default App;