import constants from '../constants/index'
export default {
	requiredChange: [{
      required: true,
      message: '不能为空，请选择。',
      trigger: 'change'
  }],
  requiredBlur: [{
      required: true,
      message: '为必填项，不能为空。',
      trigger: 'blur'
  }],
	requiredDate: [{
		  type: 'date',
      required: true,
      message: '为必填项，不能为空。',
      trigger: 'change'
  }],
	requiredDaterange:[{
		  type: 'array',
      required: true,
      message: '为必填项，不能为空。',
      trigger: 'change'
  }],
	cellphone: [{
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },{
        validator: (rule, value, callback) => {
          if (constants.REGEXS.TEL.test(value) == false) {
            callback(new Error("手机号格式错误"));
          } else {
          	callback();
          }
        },
        trigger: 'blur'
    }],
    amount: [{
      required: true,
      message: '请输入金额',
      trigger: 'blur'
    },{
        validator: (rule, value, callback) => {
          if (constants.REGEXS.AMOUNT.test(value) == false) {
            callback(new Error("金额格式错误"));
          } else {
          	callback();
          }
        },
        trigger: 'blur'
    }],
    record: [{
      required: true,
      message: '请输入读数',
      trigger: 'blur'
    },{
        validator: (rule, value, callback) => {
          if (constants.REGEXS.AMOUNT.test(value) == false) {
            callback(new Error("读数格式错误"));
          } else {
            callback();
          }
        },
        trigger: 'blur'
    }],
    idCard: [{
      required: true,
      message: '请输入身份证号',
      trigger: 'blur'
    },{
        validator: (rule, value, callback) => {
          if (!constants.REGEXS.IDCARD.test(value)) {
            callback(new Error("身份证号格式错误"));
          } else {
          	callback();
          }
        },
        trigger: 'blur'
    }],
    floor:  [{
      required: true,
      message: '请输入楼层',
      trigger: 'blur'
    }, {
      validator: (rule, value, callback) => {
        if (/^\-?\d+$/.test(value) == false) {
          callback(new Error("楼层应为数字"));
        } else {
          if (value < -10 || value > 100) {
            callback(new Error("楼层应大于地下10层，低于100层"));
          } else {
            callback();
          }
        }
      },
      trigger: 'blur'
    }],
    floorRoomCount: [{
        required: true,
        message: '请输入每层房间数',
        trigger: 'blur'
      },
      {
        validator: (rule, value, callback) => {
          if (/^\d+$/.test(value) == false) {
            callback(new Error("房间应为数字"));
          } else {
            if (value < 1 || value > 100) {
              callback(new Error("房间应少于100间"));
            } else {
              callback();
            }
          }
        },
        trigger: 'blur'
      }
    ]
}
