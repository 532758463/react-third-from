/* eslint-disable no-unused-vars */
/**
 * 按钮权限
 */
export enum PERMISSION_ENUM {
  /**
   * 发送
   */
  SEND = 'SEND',
  /**
   * 提交
   */
  SUBMIT = 'SUBMIT',
  /**
   * 同意
   */
  AGREE = 'AGREE',
  /**
   * 已阅
   */
  READ = 'READ',
  /**
   * 不同意
   */
  DIS_AGREE = 'DIS_AGREE',
  /**
   * 暂存
   */
  TEMPORARY = 'TEMPORARY',
  /**
   * 保存草稿
   */
  DRAFT = 'DRAFT', //新建
  DRAFT_HANDLE = 'DRAFT_HANDLE', //待办
  /**
   * 回退
   */
  BACK = 'BACK',
  /**
   * 撤销
   */
  UNDO = 'UNDO',
  /**
   * 终止
   */
  TERMINATION = 'TERMINATION',
  /**
   * 移交
   */
  TRANSFER = 'TRANSFER',
  /**
   * 加签
   */
  NODE_ADD = 'NODE_ADD',
  /**
   * 减签
   */
  NODE_DEL = 'NODE_DEL',
  /**
   * 咨询
   */
  AFFAIR_CONSULT = 'AFFAIR_CONSULT',
  /**
   * 知会节点
   */
  NOTICE = 'NOTICE',
  /**
   * 取回
   */
  RETRIEVE = 'RETRIEVE',
  /**
   *  催办
   */
  URGE = 'URGE',
  /**
   * 转发
   */
  FORWARD = 'FORWARD',
  /**
   * 流程图展示
   */
  PROCESS_SHOW = 'PROCESS_SHOW',
  /**
   * 辅助信息
   */
  HELP_PAGE = 'HELP_PAGE',
  // PRINT = 'PRINT',
  // /**
  //  * 意见/附言
  //  */
  // OPINION = 'OPINION',
  /**
   * 会签(送转)
   */
  GIVE = 'GIVE',
  /**
   * 问题上报
   */
  REPORT_SUBMIT = 'REPORT_SUBMIT',
  /**
   * 查看附件
   */
  VIEW_ATTACHMENT = 'VIEW_ATTACHMENT',
  /**
   * 附言
   */
  POSTSCRIPT = 'POSTSCRIPT',
  OPINION = 'OPINION',
  /**
   * 流程评分
   */
  EVALUATION = 'EVALUATION'
}

export const jobInfo = [
  {
    label: '所属部门',
    name: 'depart',
    required: true
  },
  {
    label: '主岗职务',
    name: 'job',
    required: true
  },
  {
    label: '工作地点',
    name: 'site',
    required: true
  },
  {
    label: '体系HR',
    name: 'hr',
    type: 'Selector',
    required: false
  },
  {
    label: '指导人',
    name: 'teacher',
    type: 'Selector',
    required: true
  }
];

export const getUserInfo = (required: boolean) => {
  return [
    {
      label: '姓名',
      name: 'name',
      required
    },
    {
      label: '年龄',
      name: 'age',
      required,
      type: 'number'
    },
    {
      label: '性别',
      name: 'gender',
      type: 'select',
      options: [
        {
          name: '男',
          value: 'boy'
        },
        {
          name: '女',
          value: 'girl'
        }
      ]
    },
    {
      label: '邮箱',
      name: 'email',
      type: 'email'
    },
    {
      label: '电话',
      name: 'phone',
      required,
      type: 'number'
    },
    {
      label: '身份证号',
      name: 'cardCode',
      required
    },
    {
      label: '住址',
      name: 'place'
    },
    {
      label: '学历',
      name: 'degree',
      type: 'select',
      required,
      options: [
        {
          name: '大专',
          value: 'dazhuan'
        },
        {
          name: '本科',
          value: 'undergraduate'
        },
        {
          name: '硕士',
          value: 'master'
        },
        {
          name: '博士',
          value: 'dr'
        }
      ]
    },
    {
      label: '毕业院校',
      name: 'school',
      required
    }
  ];
};

export const workInfo = [
  {
    label: '入职日期',
    name: 'startDate',
    type: 'DateTime'
  },
  {
    label: '试用期',
    name: 'endDate',
    required: true,
    type: 'RangePicker'
  },
  {
    label: '合同截至日期',
    name: 'endTime',
    type: 'DateTime',
    required: true
  }
];
