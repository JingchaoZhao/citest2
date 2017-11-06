const state = {
  orderType: [{
        key: "HouseRental",
        value: '房租金'
    }, {
        key: "HouseDeposit",
        value: '房租押金'
    }, {
        key: "AccessCardDeposit",
        value: '门禁卡押金'
    }, {
        key: "ParkDeposit",
        value: '停车费押金'
    }, {
        key: "OtherDeposit",
        value: '其他押金'
    }, {
        key: "TenementFee",
        value: '物业费'
    }, {
        key: "HotWaterFee",
        value: '热水费'
    }, {
        key: "ColdWaterFee",
        value: '冷水费'
    }, {
        key: "ElectricityFee",
        value: '电费'
    }, {
        key: "ParkFee",
        value: '停车费'
    }, {
        key: "LaundryFee",
        value: '洗衣费'
    }, {
        key: "CleaningFee",
        value: '保洁费'
    }, {
        key: "BroadBandFee",
        value: '宽带费'
    }, {
        key: "GasFee",
        value: '燃气费'
    }, {
        key: "TelevisionFee",
        value: '电视费'
    }, {
        key: "ServiceFee",
        value: '服务费'
    }, {
        key: "OtherFee",
        value: '其他费用'
    }, {
        key: "Reservation",
        value: '预定金'
    }],
    transactionType: [{
        key: "POS",
        value: 'POS收款'
    }, {
        key: "AliPay",
        value: '支付宝'
    }, {
        key: "WeiXin",
        value: '微信'
    }, {
        key: "OnlineBank",
        value: '网银'
    }, {
        key: "Cash",
        value: '现金'
    }, {
        key: "Fengniaowu",
        value: '蜂鸟屋'
    }, {
        key: "Other",
        value: '其他方式'
    }], 
    orderState: [{
        key: "Created",
        value: '未支付'
    }, {
        key: "Paid",
        value: '已支付'
    }, {
        key: "Overdue",
        value: '已逾期'
    }],
    installmentOrderState: [{
        key: "PrePaid",
        value: '提前还款'
    },{
        key: "Created",
        value: '待支付'
    }, {
        key: "Paid",
        value: '已支付'
    }, {
        key: "Overdue",
        value: '已逾期'
    }, {
        key: "Disposed",
        value: '已处置'
    }], 
    contractState: [{
        key: "UnConfirmed",
        value: '未确认'
    }, {
        key: "Confirmed",
        value: '已确认'
    }, {
        key: "Efficient",
        value: '已生效'
    }, {
        key: "CheckOut",
        value: '已退租'
    }], 
    payPeriod: [{
        key: "0",
        value: '全额付'
    }, {
        key: "1",
        value: '押1付1'
    }, {
        key: "3",
        value: '押1付3'
    }, {
        key: "6",
        value: '押1付6'
    }, {
        key: "12",
        value: '押1付12'
    }],
    reservationState:[{
        key: "Created",
        value: '待支付'
    }, {
        key: "Reserved",
        value: '已支付'
    }, {
        key: "Revoked",
        value: '已撤销'
    }, {
        key: "Turned",
        value: '转合同'
    }],
    loanStateFinance: [{
        key: "YiHuanKuanZhengChang",
        value: '已还款'
    }, {
        key: "YiHuanKuanDaiChang",
        value: '已还款(代偿)'
    }, {
        key: "YiHuanKuanYuQi",
        value: '已还款(逾期)'
    }, {
        key: "HuanKuanZhongZhengChang",
        value: '还款中'
    }, {
        key: "HuanKuanZhongYuQi",
        value: '还款中(逾期)'
    }, {
        key: "YuQiZhong",
        value: '逾期中'
    }],
    utilitiesExpenseType: [{
        key: "HotWaterFee",
        value: '热水'
    }, {
        key: "ColdWaterFee",
        value: '冷水'
    }, {
        key: "ElectricityFee",
        value: '电费'
    }],
    chargingType: [{
        key: "Fixed",
        value: '固定'
    }, {
        key: "Meter",
        value: '抄表'
    }]
}
const getters = {
    getOrderType(state) {
        return state.orderType
    },
    getTransactionType(state) {
        return state.transactionType
    },
    getOrderState(state) {
        return state.orderState
    },
    getContractState(state) {
        return state.contractState
    },
    getPayPeriod(state) {
        return state.payPeriod
    },
    getReservationState(state) {
        return state.reservationState
    },
    getLoanStateFinance(state) {
        return state.loanStateFinance
    },
    getInstallmentOrderState(state) {
        return state.installmentOrderState
    },
    getUtilitiesExpenseType(state) {
        return state.utilitiesExpenseType
    },
    getChargingType(state) {
        return state.chargingType
    }
}

export default {
  state,
  getters
}