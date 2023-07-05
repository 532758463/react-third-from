import { DatePicker, Form, Input, Select } from 'antd';
import { useEffect, useRef } from 'react';
import { useForm } from 'antd/lib/form/Form';
import { jobInfo, getUserInfo, PERMISSION_ENUM, workInfo } from './datas';
import { getValidUrlParamValue } from '@src/utils/getValidUrlParamValue';
import dayjs from 'dayjs';

const { Option } = Select;
const { RangePicker } = DatePicker;
const layout = {
  // labelCol: { span: 8 },
  // wrapperCol: { span: 16 }
};

const SaveActions = [
  PERMISSION_ENUM.AGREE,
  PERMISSION_ENUM.BACK,
  PERMISSION_ENUM.DRAFT,
  PERMISSION_ENUM.DRAFT_HANDLE,
  PERMISSION_ENUM.SUBMIT,
  PERMISSION_ENUM.SEND,
  PERMISSION_ENUM.TEMPORARY
];

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

const RangeDate = (props: any) => {
  const newVal = props?.value?.map((v: string) => dayjs(v));
  return <RangePicker {...props} value={newVal} />;
};

const DateTime = (props: any) => {
  const val = props?.value;
  const newVal = val && dayjs(val);
  return <DatePicker {...props} value={newVal} />;
};

const ThirdForm = () => {
  const [form] = useForm();
  const backInfoRef = useRef();
  const searchUrl = new URLSearchParams(location.search);
  const dataId = searchUrl.get('formRecordId') || '';
  const formRecordId = getValidUrlParamValue(dataId) || new Date().getTime();
  const isStart = searchUrl.get('isStart');

  function svaeFormData() {
    const values = form.getFieldsValue();
    localStorage.setItem(`${formRecordId}`, JSON.stringify(values));
  }

  useEffect(() => {
    const values = localStorage.getItem(`${formRecordId}`);
    if (values) {
      try {
        form.setFieldsValue(JSON.parse(values));
      } catch (error) {
        console.log(error);
      }
    }
  }, [formRecordId, form]);

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
        const values = e.data.needValidate
          ? await form.validateFields()
          : form.getFieldsValue();
        switch (e.data?.messageType) {
          case 'GET_FORM_DATA':
            // eslint-disable-next-line no-case-declarations
            values.formRecordId = formRecordId;
            console.log('来自主页面得消息', e);
            console.log(values);
            if (SaveActions.includes(e.data.submitType)) {
              svaeFormData();
            }
            if (e.data.submitType === 'BACK') {
              top?.postMessage(
                {
                  success: true, //表单数据验证成功或不需要验证时传true，否则传false
                  submitType: e.data.submitType, //将此字段值回传
                  formData: values, //表单数据
                  messageType: 'GET_ACTION_INFO', //消息类型
                  url: e?.data?.url
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
                url: e?.data?.url,
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
              // const id = Object.keys(e.data.info || {})[0];
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
                    targetNodeId: null,
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

  function getControl(v: any) {
    switch (v?.type) {
      case 'number':
        return <Input type="number" />;
      case 'select':
        return (
          <Select showSearch placeholder="请选择" className="text-left">
            {v?.options?.map((i: any) => (
              <Option key={i.value} value={i.value}>
                {i.name}
              </Option>
            ))}
          </Select>
        );
      case 'DateTime':
        return (
          <DateTime
            style={{
              width: '100%'
            }}
            placeholder="请输入日期"
          />
        );
      case 'RangePicker':
        return (
          <RangeDate
            style={{
              width: '100%'
            }}
          />
        );
      default:
        return <Input />;
    }
  }

  return (
    <Form
      {...layout}
      name="third-form"
      autoComplete="off"
      form={form}
      onFinish={onFinish}
      className="relative top-10"
      validateMessages={validateMessages}
    >
      <h1 className="text-lg font-bold">入职信息</h1>
      <div>
        <div className="px-2 mx-20 text-black bg-blue-300 text-start">
          岗位信息
        </div>
        <div className="grid grid-cols-3 gap-4 py-8 mx-20">
          {jobInfo.map((v) => (
            <Form.Item
              key={v.name}
              name={['jobInfo', v.name]}
              label={v.label}
              rules={[{ required: v.required }]}
            >
              {getControl(v)}
            </Form.Item>
          ))}
        </div>
      </div>
      <div>
        <div className="px-2 mx-20 text-black bg-blue-300 text-start">
          人员信息
        </div>
        <div className="grid grid-cols-3 gap-4 py-8 mx-20">
          {getUserInfo(!isStart).map((v) => (
            <Form.Item
              key={v.name}
              name={['userInfo', v.name]}
              label={v.label}
              rules={[{ required: v.required }]}
            >
              {getControl(v)}
            </Form.Item>
          ))}
        </div>
      </div>
      <div>
        <div className="px-2 mx-20 text-black bg-blue-300 text-start">
          入职信息
        </div>
        <div className="grid grid-cols-3 gap-4 py-8 mx-20">
          {workInfo.map((v) => (
            <Form.Item
              key={v.name}
              name={['userInfo', v.name]}
              label={v.label}
              rules={[{ required: v.required }]}
            >
              {getControl(v)}
            </Form.Item>
          ))}
        </div>
      </div>
    </Form>
  );
};

export default ThirdForm;
