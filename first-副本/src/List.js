import { Navigate, Routes, Route } from 'react-router-dom';
import Login from './Login/login';        //登录页面
import ChangePasswordPage from './ChangePasswordPage/changePasswordPage'  //修改密码页面
import RegisterTransPage from './TransPages/RegisterTransPage';    //绑定微信过度页面
import LoginTransPage from './TransPages/LoginTransPage';            //微信登录过渡页面

import StuLayout from './StuPages/Layout/layout';  //学生页面主框架
import StuIndex from './StuPages/stuIndex';        //学生端主界面Home
import CourseMain from './StuPages/Course/main';   //我的课程页面
import StuDepartment from './StuPages/Resources/department';       //学生端资源站系科选择
import StuResources from './StuPages/Resources/resources';   //学生端资源站
import WorkList from './StuPages/Course/Worklist/workList';    //学生端-课程\作业列表
import FilePage from './StuPages/Course/FilePage/filePage';     //课程下的作业文件管理页面
import TodoWork from './StuPages/TodoWork/toDoWork';    //学生端-未完成作业页面
import StuPersonal from './StuPages/Personal/personalSet'  //学生端-个人设置页
import StuQuestionBank from './StuPages/StuQuestionBank/StuQuestionBank'  //学生端-课程库系科选择页
import StuSystemChart from './StuPages/StuQuestionBank/StuSystemChart/StuSystemChart' //学生端-课程库页
import StuCourseBank from './StuPages/StuQuestionBank/StuCourseBank/StuCourseBank'  //学生端-题库页
import ViewAnn from './StuPages/ViewAnn/ViewAnn';           //学生端-查看公告页

import TeachLayout from './TechPages/Layout/layout';       //教师页面框架
import TeachIndex from './TechPages/teachIndex';        //教师主页
import TeachLesson from './TechPages/Lesson/lesson';       //教师课程页
import TeachDepartment from './TechPages/Resources/department';     //教师端系科选择页
import TeachResources from './TechPages/Resources/resources';       //教师端资源站页面
import StuManage from './TechPages/Lesson/StuManage/stuManage';      //课程下学生管理页
import TworkList from './TechPages/Lesson/WorkList/workList';       //教师页面单一课程下的作业列表页面
import TeachPersonal from './TechPages/Personal/personalSet'  //教师端-个人设置页
import QuestionBank from './TechPages/QuestionBank/QuestionBank'  //教师端-课程库系科选择页
import SystemChart from './TechPages/QuestionBank/SystemChart/SystemChart' //教师端-课程库页
import CourseBank from './TechPages/QuestionBank/CourseBank/CourseBank'  //教师端-题库页
import AddTopic from './TechPages/QuestionBank/AddTopic/AddTopic'    //教师端-添加题目页
import UpdataTopic from './TechPages/QuestionBank/UpdataTopic/UpdataTopic'  //教师端-修改题目页
import CompositionPaper from './TechPages/QuestionBank/CompositionPaper/CompositionPaper'  //教师端-组卷页
import TeachCheckin from './TechPages/TeachCheckin/TeachCheckin/TeachCheckin'   //教师端签到页面
import CheckinSituation from './TechPages/TeachCheckin/CheckinSituation/CheckinSituation'  //教师端签到详情页面
import SignInForm from './TechPages/TeachCheckin/SignInForm/SignInForm'    //教师端签到总表页面
import DataSummary from './TechPages/TeacherDataSummary/teacherDataSummary' //教师数据总览页
import StudentSearchTeacher from './TechPages/StudentSearch/StudentSearch';//学生搜索管理页面
import TaskSummaryTable from './TechPages/TaskSummaryTable/taskSummaryTable'
import TeachViewAnn from './TechPages/TeachViewAnn/ViewAnn' //教师端查看公告页面

import AdmLayout from './AdmPages/Layout/layout'   //管理员主界面框架
import AdmIndex from './AdmPages/admIndex'     //教师账户管理页
import Department from './AdmPages/Department/department' //系科管理页
import DepartmentAdmin from './AdmPages/DepartmentAdmin/departmentAdmin'//系管理员管理页面
import TotalDataSummaryAdmin from './AdmPages/TotalDataSummary/totalDataSummary';//数据总览
import StudentSearchAdmin from './AdmPages/StudentSearch/StudentSearch';//学生搜索管理页面
import SemesterDelete from './AdmPages/SemesterDelete/SemesterDelete';//学期清理删除页面
import TeacherDataSummaryAdmin from './AdmPages/TeacherDataSummary/teacherDataSummary';//单个教师数据总览
import AdmPersonal from './AdmPages/Personal/personalSet'    //管理员个人页
import WangEditor from './AdmPages/WangEditor/MyEditor';        //富文本页面
import UpdataAnn from './AdmPages/UpdataAnn/UpdateAnn';         //修改文本页面
import Announcement from './AdmPages/Announcement/announcement';    //公告显示页面

import DepartmentAdmLayout from './DepartmentAdminPages/Layout/layout';   //系管理员主界面框架
import TeacherManage from './DepartmentAdminPages/TeacherManage/teacherManage';//教师管理页面
import TeacherAnnouncement from './DepartmentAdminPages/TeacherAnnouncement/announcement';//系管理员公告显示页面
import TeacherUpdataAnn from './DepartmentAdminPages/TeacherUpdataAnn/UpdateAnn';//系管理员公告修改页面
import TeacherWangEditor from './DepartmentAdminPages/TeacherWangEditor/MyEditor';//系管理员添加公告页面

import TeacherDataSummary from './DepartmentAdminPages/TeacherManage/TeacherDataSummary/teacherDataSummary';//单个教师数据总览
import StudentSearchDepartmentAdmin from './DepartmentAdminPages/StudentSearch/StudentSearch';//学生搜索管理页面
import TotalDataSummary from './DepartmentAdminPages/TotalDataSummary/totalDataSummary';//数据总览
import DepartmentAdmPersonal from './DepartmentAdminPages/Personal/personalSet'    //系管理员个人页


//路由地址路径

function List() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate to="/Login" replace />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/ChangePasswordPage' element={<ChangePasswordPage />} />
                <Route path='/LoginTransPage' element={<LoginTransPage />} />
                <Route path='/RegisterTransPage' element={<RegisterTransPage />} />
                <Route element={<StuLayout />}>
                    <Route path='/StuIndex' index element={<StuIndex />} />
                    <Route>
                        <Route path='/StuDepartment' index element={<StuDepartment />} />
                        <Route path='/StuDepartment/StuResources' element={<StuResources />} />
                    </Route>
                    <Route path='/StuPersonal'>
                        <Route path='/StuPersonal/StuPersonalSet' index element={<StuPersonal />} />
                    </Route>
                    <Route >
                        <Route path='/StuQuestionBank' index element={<StuQuestionBank />} />
                        <Route path='/StuQuestionBank/StuSystemChart' element={<StuSystemChart />} />
                        <Route path='/StuQuestionBank/StuSystemChart/StuCourseBank' element={<StuCourseBank />} />
                    </Route>
                    <Route path='/Course'>
                        <Route path='/Course/MyCourse' index element={<CourseMain />} />
                        <Route path='/Course/TodoWork' element={<TodoWork />} />
                        <Route path='/Course/MyCourse/WorkList' element={<WorkList />} />
                        <Route path='/Course/MyCourse/WorkList/FilePage' element={<FilePage />} />
                    </Route>
                    <Route path='/StuPages/ViewAnn' element={<ViewAnn/>}></Route>
                </Route>
                <Route element={<TeachLayout />}>
                    <Route path='/TeachIndex' index element={<TeachIndex />} />
                    <Route>
                        <Route path='/TeachDepartment' index element={<TeachDepartment />} />
                        <Route path='/TeachDepartment/TeachResources' element={<TeachResources />} />
                    </Route>
                    <Route path='/TeachPersonal'>
                        <Route path='/TeachPersonal/TeachPersonalSet' index element={<TeachPersonal />} />
                    </Route>
                    <Route path='/TechPages/TeachViewAnn' element={<TeachViewAnn/>}></Route>
                    <Route>
                        <Route path='/QuestionBank' index element={<QuestionBank />} />
                        <Route path='/QuestionBank/SystemChart' element={<SystemChart />} />
                        <Route path='/QuestionBank/SystemChart/CourseBank' element={<CourseBank />} />
                        <Route path='/QuestionBank/SystemChart/CourseBank/AddTopic' element={<AddTopic />} />
                        <Route path='/QuestionBank/SystemChart/CourseBank/UpdataTopic' element={<UpdataTopic />} />
                        <Route path='/QuestionBank/SystemChart/CourseBank/CompositionPaper' element={<CompositionPaper />} />
                    </Route>
                    <Route path='/Lesson'>
                        <Route path='/Lesson/MyLesson' index element={<TeachLesson />} />
                        <Route path='/Lesson/MyLesson/TworkList' element={<TworkList />} />
                        <Route path='/Lesson/MyLesson/TworkList/SignInForm' index element={<SignInForm />} />
                        <Route path='/Lesson/MyLesson/TworkList/TaskSummaryTable' index element={<TaskSummaryTable />} />
                        <Route path='/Lesson/MyLesson/TworkList/StuManage' element={<StuManage />} />
                        <Route path='/Lesson/MyLesson/TworkList/CheckinSituation' index element={<CheckinSituation />} />
                    </Route>
                    <Route path='/StudentSearchTeacher' index element={<StudentSearchTeacher />} />
                    <Route path='/DataSummary' index element={<DataSummary />} />
                </Route>
                <Route element={<AdmLayout />}>
                    <Route path='/AdmIndex' index element={<AdmIndex />}></Route>
                    <Route path='/AdmIndex/TeacherDataSummaryAdmin' index element={<TeacherDataSummaryAdmin />}></Route>
                    <Route path='/Department' element={<Department />}></Route>
                    <Route path='/Announcement' element={<Announcement/>}></Route>
                    <Route path='/WangEditor' element={<WangEditor/>}></Route>
                    <Route path='/UpdataAnn' element={<UpdataAnn/>}></Route>
                    <Route path='/DepartmentAdmin' element={<DepartmentAdmin />}></Route>
                    <Route path='/TotalDataSummaryAdmin' index element={<TotalDataSummaryAdmin />}></Route>
                    <Route path='/StudentSearchAdmin' index element={<StudentSearchAdmin />}></Route>
                    <Route path='/SemesterDelete' index element={<SemesterDelete />}></Route>
                    <Route path='/AdmPersonal'>
                        <Route path='/AdmPersonal/AdmPersonalSet' index element={<AdmPersonal />} />
                    </Route>
                </Route>
                <Route element={<DepartmentAdmLayout />}>
                    <Route path='/TeacherManage' index element={<TeacherManage />}></Route>
                    <Route path='/TeacherAnnouncement' index element={<TeacherAnnouncement />}></Route>
                    <Route path='/TeacherUpdataAnn' index element={<TeacherUpdataAnn />}></Route>
                    <Route path='/TeacherWangEditor' index element={<TeacherWangEditor />}></Route>
                    <Route path='/TeacherManage/TeacherDataSummary' index element={<TeacherDataSummary />}></Route>
                    <Route path='/TotalDataSummary' index element={<TotalDataSummary />}></Route>
                    <Route path='/StudentSearchDepartmentAdmin' index element={<StudentSearchDepartmentAdmin />}></Route>
                    <Route path='/DepartmentAdmPersonal'>
                        <Route path='/DepartmentAdmPersonal/DepartmentAdmPersonalSet' index element={<DepartmentAdmPersonal />} />
                    </Route>
                </Route>
            </Routes>
        </div>
    )
}

export default List