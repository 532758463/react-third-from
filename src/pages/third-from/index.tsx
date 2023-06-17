import { Button, Form, Input, Select } from 'antd';
import { useEffect, useRef } from 'react';
import { useForm } from 'antd/lib/form/Form';

const { Option } = Select;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
};

const validateMessages = {
  required: '${label}必填!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!'
  },
  number: {
    range: '${label} must be between ${min} and ${max}'
  }
};
const ThirdForm = () => {
  const [form] = useForm();
  const backInfoRef = useRef();
  useEffect(() => {
    top?.postMessage({ hasListener: true }, '*');
    top?.postMessage(
      {
        messageType: 'CUSTOMER_BUTTON_ACTION',
        buttons: [
          {
            label: 'testbutton',
            actionType: 'test',
            style: {
              // height:'24px',
              // background:'red',
              // padding:'0 10px',
              // margin:'0 10px',
              // lineHeight: '24px'
            }
          }
        ]
      },
      '*'
    );
    const fn = async (e: any) => {
      // 判断是否来自外框消息
      if (e.data.isFromBPM) {
        switch (e.data?.messageType) {
          case 'GET_FORM_DATA':
            // eslint-disable-next-line no-case-declarations
            const values = e.data.needValidate
              ? await form.validateFields()
              : form.getFieldsValue();
            values.formRecordId = new Date().getTime();
            console.log('来自主页面得消息', e);
            console.log(values);
            if (e.data.submitType === 'BACK') {
              top?.postMessage(
                {
                  success: true, //表单数据验证成功或不需要验证时传true，否则传false
                  submitType: e.data.submitType, //将此字段值回传
                  formData: values, //表单数据
                  messageType: 'GET_ACTION_INFO' //消息类型
                },
                e.data.url //父页面地址
              );
              return;
            }
            // 将表单内容回传给父页面消息
            top?.postMessage(
              {
                success: true, //表单数据验证成功或不需要验证时传true，否则传false
                submitType: e.data.submitType, //将此字段值回传
                formData: values, //表单数据
                messageType: 'GET_FORM_DATA', //消息类型
                submitParams: {
                  // 0: 回退上节点， 1： 回退发起者 2：指定节点
                  backDealType: 0,
                  // 指定节点时必传
                  targetNodeId: 'xxxx'
                }
              },
              e.data.url //父页面地址
            );
            break;
          case 'GET_ACTION_INFO':
            console.log(e.data);

            if (e.data.submitType === 'BACK') {
              // 获取回退数据
              backInfoRef.current = e.data.info;
              const id = Object.keys(e.data.info || {})[0];
              // 将表单内容回传给父页面消息
              top?.postMessage(
                {
                  success: true, //表单数据验证成功或不需要验证时传true，否则传false
                  submitType: e.data.submitType, //将此字段值回传
                  formData: values, //表单数据
                  messageType: 'GET_FORM_DATA', //消息类型
                  submitParams: {
                    // 0: 回退上节点， 1： 回退发起者 2：指定节点
                    backDealType: 1,
                    // 指定节点时必传
                    targetNodeId: id,
                    // 0: 提交给我 1:流程重走
                    afterType: 0,
                    bpmOpinionDto: {
                      content: 'sxxsss'
                    }
                  }
                },
                e.data.url //父页面地址
              );
            }
            break;
          case 'CUSTOMER_BUTTON_ACTION':
            // e?.data?.closePage();
            console.log(e);
            top?.postMessage(
              {
                messageType: 'CLOSE_WINDOW'
              },
              '*'
            );
            // alert('get actionType:' + e.data.actionType);
            break;
          case 'PROCESS_ACTION_SUCCESS':
            console.log(e.data);
            console.log('流程处理成功');
            break;
        }
      }
    };
    window.addEventListener('message', fn);
    return () => {
      window.removeEventListener('message', fn);
    };
  }, []);
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <Form
      {...layout}
      name="third-form"
      autoComplete="off"
      form={form}
      onFinish={onFinish}
      className="relative top-20"
      validateMessages={validateMessages}
    >
      <h1 className="text-lg font-bold">个人信息</h1>
      <Form.Item
        name={['user', 'name']}
        label="姓名"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'age']} label="年龄">
        <Input type="number" />
      </Form.Item>
      <Form.Item name={['user', 'gender']} label="性别">
        <Select>
          <Option value="boy">男</Option>
          <Option value="girl">女</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label="邮箱"
        rules={[{ type: 'email' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'website']} label="网站">
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="介绍">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
        <Button className="bg-blue-400" type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ThirdForm;
