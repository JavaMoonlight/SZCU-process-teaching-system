import '@wangeditor/editor/dist/css/style.css' // 引入 cssd

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { Button, Form, Input, Select, Radio, PageHeader, message, Tag, Space, InputNumber } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const { Option } = Select

const UpdataAnn = () => {
  const history = useNavigate()
  // const departmentId = localStorage.getItem('departmentId')
  //课程库id
  const announceId = localStorage.getItem('announceId')
  const title = localStorage.getItem('title')
  const content = localStorage.getItem('content')

  // editor 实例
  const [editor1, setEditor1] = useState()
  const [form] = Form.useForm()
  // 内容编辑器内容
  const [text, setText1] = useState(content)
  //临时图片暂存数组
  const [imgName, setImgName] = useState([])

  const [chapterNum,setChapterNum]=useState(0)

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

        onBeforeUpload(files) {
          console.log('onBeforeUpload', files)

          return files // 返回哪些文件可以上传
          // return false 会阻止上传
        },
        onProgress(progress) {
          console.log('onProgress', progress)
        },
        onSuccess(file, res) {
          console.log('file', file)
          console.log('res', res)
          let strs = res.data.url.split("=")
          imgName.push(strs[1])
          localStorage.setItem('imgNames', JSON.stringify(imgName))
        },
        onFailed(file, res) {
          alert(res.message)
          console.log('onFailed', file, res)
        },
        onError(file, err, res) {
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
      // {
      //   key: 'group-video',
      //   title: '视频',
      //   iconSvg: '<svg viewBox="0 0 1024 1024"><path d="M981.184 160….904zM384 704V320l320 192-320 192z"></path></svg>',
      //   menuKeys: ['insertVideo', 'uploadVideo'],
      // },
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
  //表单确认回执函数
  const onFinish = (values) => {
    axios({
      url: global.url.Url + "/announce/updateAnnounce",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem('token'),
      },
      data: JSON.stringify({
        announceId: announceId,
        title: values.title,
        content: values.content,
      }),
      method: 'post',
    }).then((res) => {
      console.log("修改题目", res)
      if (res.data.code === '0') {
        message.success("修改题目成功")
        history('/Announcement')
      } 
      else if (res.data.code === "021") {
        history("/Login")
        message.error("登录过期，请重新登录")
      }
      else {
        message.error(res.data.msg)
      }
    }).catch((err) => {
      console.error(err)
    })
  }
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => history('/Announcement')}
        title="修改公告"
      />
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
          name='title'
          label="请修改标题"
          initialValue={title}
          rules={[
            {
              required: true,
              message: '标题不能为空！',
            },
          ]}
        >
          <Input
            maxLength={70}
          />
        </Form.Item>
        <Form.Item
          name='content'
          label="请修改内容"
          initialValue={content}
          rules={[ 
            {
              required: true,
              message: '答案不能为空!',
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
              value={text}
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

export default UpdataAnn
