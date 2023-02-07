import '@wangeditor/editor/dist/css/style.css' // 引入 cssd

import React, { useState, useEffect } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { Button, Form, Checkbox, Input, Select, Radio, PageHeader, message, Space, Tag, InputNumber } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const { Option } = Select

const MyEditor = () => {
  const history = useNavigate()
  //公告id
  const announceId = localStorage.getItem('announceId')
  // editor 实例
  const [editor1, setEditor1] = useState()
  //表单组件
  const [form] = Form.useForm()
  // 输入框内容
  const [text, setText] = useState('');
  // 编辑器内容
  const [text1, setText1] = useState('')
  //临时图片暂存数组
  const [imgName, setImgName] = useState([])

  const backCourseBank = () => {
      history('../Announcement')
  }
    
  //获取章节请求
  // useEffect(() => {
  //   // 置顶
  //   window.scrollTo(0, 0)
  //   deleteImage()
  //   const paramsData = new FormData()
  //   paramsData.append('announceId', announceId)
  //   axios({
  //     url: global.url.Url + "/announce/getAnnounceByCondition",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       "token": localStorage.getItem('token'),
  //     },
  //     data: paramsData,
  //     method: 'post',
  //   }).then((res) => {
  //     if (res.data.code === "0") {
  //       let allChapter = []
  //       for (let i = 0; i < res.data.data.length; i++) {
  //         if (res.data.data[i] >= 1) {
  //           allChapter.push(res.data.data[i])
  //         }
  //       }
  //     }
  //     else if (res.data.code === "021") {
  //       history("/Login")
  //       message.error("登录过期，请重新登录")
  //     }
  //   }).catch((err) => {
  //     console.error(err)
  //   })
  // }, [])

  //删除未提交的图片
  const deleteImage = () => {
    let imgNameArray = []
    imgNameArray = JSON.parse(localStorage.getItem('imgNames'))
    if (imgNameArray !== null) {
      if (imgNameArray.length !== 0) {
        axios({
          url: global.url.Url + "/static/delete",
          headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem('token'),
          },
          data: {
            array: imgNameArray,
          },
          method: 'post',
        }).then((res) => {
          console.log("删除未上传的图片", res)
          if (res.data.code === '0') {
            let imgNames = []
            localStorage.setItem('imgNames', JSON.stringify(imgNames))
          }
          else if (res.data.code === "021") {
            history("/Login")
            message.error("登录过期，请重新登录")
          }
        }).catch((err) => {
            console.error(err)
        })
      }
    }
  }
  // 编辑器配置
  const editorConfig = {
    placeholder: "请输入内容...",
    autoFocus: false,
    //插入图片
    MENU_CONF: {
      uploadImage: {
        server: global.url.Url + "/static/upload", // 上传图片地址
        // 超时时间，默认为 10 秒
        timeout: 5 * 1000, // 5s

        fieldName: 'file',
        meta: { token: 'xxx', a: 100 },
        metaWithUrl: true, // 参数拼接到 url 上
        headers: {
          "token": localStorage.getItem('token'),
          Accept: 'application/json',
          otherKey: 'xxx',
        },
        // 最多可上传几个文件，默认为 100
        maxNumberOfFiles: 10,
        // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
        allowedFileTypes: ['image/*'],
        // 单个文件的最大体积限制，默认为 2M
        maxFileSize: 10 * 1024 * 1024, // 10M

        base64LimitSize: 5 * 1024, // 5kb 以下插入 base64

        onBeforeUpload (files) {
          console.log('onBeforeUpload', files)

          return files // 返回哪些文件可以上传
          // return false 会阻止上传
        },
        onProgress (progress) {
          console.log('onProgress', progress)
        },
        onSuccess (file, res) {
          console.log('file', file)
          console.log('res', res)
          let strs = res.data.url.split("=")
          imgName.push(strs[1])
          localStorage.setItem('imgNames', JSON.stringify(imgName))
        },
        onFailed (file, res) {
          alert(res.message)
          console.log('onFailed', file, res)
        },
        onError (file, err, res) {
          alert(err.message)
          console.error('onError', file, err, res)
        },
      }
    }
  }
  //工具栏配置
  const toolbarConfig = {
    toolbarKeys: [
      "headerSelect",
      "blockquote",
      "|",
      "bold",
      "underline",
      "italic",
      {
        key: 'group-more-style',
        title: '更多',
        iconSvg: '',
        menuKeys: ['through', 'code', 'sup', 'sub', 'clearStyle'],
      },
      "color",
      "bgColor",
      "|",
      "fontSize",
      "fontFamily",
      "lineHeight",
      "|",
      "bulletedList",
      "numberedList",
      "todo",
      {
        key: 'group-justify',
        title: '对齐',
        iconSvg: "",
        menuKeys: ['justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify'],
      },
      {
        key: 'group-indent',
        title: '缩进',
        iconSvg: "",
        menuKeys: ['indent', 'delIndent'],
      },
      "|",
      "emotion",
      "insertLink",
      {
        key: 'group-image',
        title: '图片',
        iconSvg: '',
        // menuKeys: ['insertImage', 'uploadImage'],
        menuKeys: ['uploadImage'],
      },
      "insertTable",
      "codeBlock",
      "divider",
      "|",
      "undo",
      "redo",
      "|",
      "fullScreen",
    ]
  }
    // 及时销毁 editor1 答案
    useEffect(() => {
        return () => {
        if (editor1 == null) return
        editor1.destroy()
        setEditor1(null)
        }
    }, [editor1])
    // const [chapterNum,setChapterNum]=useState(0)

    //表单确认回执函数
    const onFinish = (values) => {
        console.log('values', values)
        console.log('title', values.title)
        axios({
        url: global.url.Url + "/announce/addNewAnnounce",
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem('token'),
        },
        data: JSON.stringify({
            announceId:announceId,
            title: values.title,
            content: values.content,
        }),
        method: 'post',
        }).then((res) => {
        console.log("添加公告", res)
        if (res.data.code === "0") {
            message.success("添加公告成功")
            history('/Announcement')
        }
        else if (res.data.code === "021") {
            history("/Login")
            message.error("登录过期，请重新登录")
        }
        else {
            message.error("添加失败")
        }
        }).catch((err) => {
        console.error(err)
        message.error("添加失败")
        })
    }
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => backCourseBank()}
        title="添加文本"
      />
      {/* <Form
        name="basic"
        labelCol={{
          span: 3.5,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
      >
      <Form.Item
        label="请输入标题"
        name="title"
        rules={[
          {
            required: true,
            message: '请输入标题!',
          },
        ]}
      >
      <Input
        // name='title'
        // value={}
      />
    </Form.Item>
    </Form> */}
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        className='form-topic'
        initialValues={{
          modifier: 'public',
        }}
        onFinish={onFinish}
      >
        <Form.Item
        label="请输入标题"
        name="title"
        rules={[
          {
            required: true,
            message: '请输入标题!',
          },
        ]}
      >
      <Input
        maxLength={70}
      />
      </Form.Item>

        <Form.Item
          name='content'
          label="请编辑内容"
          rules={[
            {
              required: true,
              message: '内容不能为空!',
            },
          ]}
        >
          <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
            <Toolbar
              editor={editor1}
              defaultConfig={toolbarConfig}
              mode="default"
              style={{ borderBottom: '1px solid #ccc' }}
            />
            <Editor
              value={text1}
              defaultConfig={editorConfig}
              onChange={editor => form.setFieldsValue({
                content: editor.getHtml(),
              })}
              onCreated={setEditor1}
              mode="default"
              style={{ height: '300px', overflowY: 'hidden' }}
            />
          </div>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 11,
          }}
        >
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default MyEditor
