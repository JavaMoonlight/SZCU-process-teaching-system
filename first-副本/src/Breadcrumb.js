import { Breadcrumb } from 'antd'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
const breadcrumbNameMap = {
  //学生端
  '/StuIndex': '公告',
  '/StuDepartment': '资源站系科',
  '/StuDepartment/StuResources': '资源站',
  '/StuPersonal': '个人页',
  '/StuPersonal/StuPersonalSet': '个人设置',
  '/Course/TodoWork': '未完成作业',
  '/Course': '课程',
  '/Course/MyCourse': '我的课程',
  '/Course/MyCourse/WorkList': '作业列表',
  '/Course/MyCourse/WorkList/FilePage': '作业详情',
  '/StuQuestionBank': '课程库系科',
  '/StuQuestionBank/StuSystemChart': '课程库',
  '/StuQuestionBank/StuSystemChart/StuCourseBank': '题库',
  //教师端
  '/TeachIndex': '公告',
  '/Lesson': '课程',
  '/TeachPersonal': '个人页',
  '/TeachPersonal/TeachPersonalSet': '个人设置',
  '/Lesson/MyLesson': '我的课程',
  '/Lesson/MyLesson/TworkList': '课程详情',
  '/Lesson/MyLesson/TworkList/CheckinSituation': '签到情况',
  '/Lesson/MyLesson/TworkList/StuManage': '作业详情',
  '/TeachDepartment': '资源站系科',
  '/TeachDepartment/TeachResources': '资源站',
  '/QuestionBank': '课程库系科',
  '/QuestionBank/SystemChart': '课程库',
  '/QuestionBank/SystemChart/CourseBank': '题库',
  '/QuestionBank/SystemChart/CourseBank/AddTopic': '添加题目',
  '/QuestionBank/SystemChart/CourseBank/UpdataTopic': '修改题目',
  '/QuestionBank/SystemChart/CourseBank/CompositionPaper': '组卷',
  '/Lesson/MyLesson/TworkList/SignInForm': '签到总表',
  '/Lesson/MyLesson/TworkList/TaskSummaryTable': '作业总表',
  //管理员
  '/AdmIndex': '教师管理',
  '/Department': '系科管理',
  '/DepartmentAdmin': '系管理员管理',
  '/TotalDataSummaryAdmin': '数据总览',
  '/StudentSearchAdmin':'学生搜索管理',
  '/AdmPersonal': '个人页',
  '/AdmPersonal/AdmPersonalSet': '个人设置',
  '/AdmIndex/TeacherDataSummaryAdmin': '教师数据分析',
  '/Announcement': '公告管理',
  '/MyEditor':'富文本页',
  '/updateAnn':'修改公告页',
  //系管理员
  '/TeacherManage': '教师管理',
  '/TeacherManage/TeacherDataSummary': '数据分析',
  '/TotalDataSummary': '数据总览',
  '/StudentSearchDepartmentAdmin':'学生搜索管理',
  '/DepartmentAdmPersonal': '个人页',
  '/DepartmentAdmPersonal/DepartmentAdmPersonalSet': '个人设置',
  '/TeacherAnnouncement': '公告管理',
  '/TeacherWangEditor': '富文本页',
  '/TeacherUpdataAnn': '修改公告页',
}

const Home = () => {
  //获取当前页面的地址信息
  const location = useLocation()
  //获取当前页面path路径并去除'/'
  const pathSnippets = location.pathname.split('/').filter((i) => i)
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    let tmpUrl = ''
    let tmp = false
    if (url === '/Lesson') {
      tmpUrl = '/Lesson/MyLesson'
      tmp = true
    } else if (url === '/Course') {
      tmpUrl = '/Course/MyCourse'
      tmp = true
    } else if (url === '/StuPersonal') {
      tmpUrl = '/StuPersonal/StuPersonalSet'
      tmp = true
    } else if (url === '/TeachPersonal') {
      tmpUrl = '/TeachPersonal/TeachPersonalSet'
      tmp = true
    } else if (url === '/AdmPersonal') {
      tmpUrl = '/AdmPersonal/AdmPersonalSet'
      tmp = true
    } else if (url === '/DepartmentAdmPersonal') {
      tmpUrl = '/DepartmentAdmPersonal/DepartmentAdmPersonalSet'
      tmp = true
    }
    return (
      <Breadcrumb.Item key={url}>
        <Link to={tmp ? tmpUrl : url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    )
  })
  const breadcrumbItems = [].concat(extraBreadcrumbItems)
  return (
    <div>
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >{breadcrumbItems}</Breadcrumb>
    </div>
  )
}
export default Home