export function roomTypeSize(value) {
    if (!value) {
        return ;
    }
    else {
        return (value / 10000).toFixed(2);
    }
}

export function discount(value) {
    if (!value) {
        return ;
    }
    else {
        if (value >= 1) {
            return '无优惠'
        }
        else{
            return (value * 10).toFixed(2) + '折';
        }
        
    }
}
export function toFixed2(value) {
    if (!value) {
        return 0;
    }
    else {
        return value.toFixed(2);
    }
}
export function rate(value) {
    if (!value) {
        return 0;
    }
    else {
        return (value * 100).toFixed(2);
    }
}
export function rateNo(value) {
    if (!value) {
        return 0;
    }
    else {
        return parseFloat(value * 100);
    }
}
export function rateNoOnce(value, denominator) {
    if (!value || !denominator) {
        return 0;
    }
    else if (denominator < value) {
        return 100;
    }
    else {
        return parseFloat((value / denominator) * 100);
    }

}
export function percent(value) {
    if (!value) {
        return 0;
    }
    else {
        return parseFloat(value);
    }
}
export function amount2(value) {
    if (!value) {
        return 0.00;
    }
    return (value / 100).toFixed(2);
}
export function amount0(value) {
    if (!value) {
        return 0;
    }
    return (value / 100).toFixed(0);
}
export function dateYYMMDD(value) {
    if (!value) {
        return null;
    }
    return value.substring(0, 10);
    // return new Date(value).Format("yyyy-MM-dd");
}
export function dateTirm10(value) {
    if (value == null) {
        return '--';
    }
    return value.substring(0, 10);
}
export function rentalType(value) {
    switch (value) {
        case "Monthly":
            return "押1付1";
        case "ForceMonthly":
            return "押1付1";
        case "Quarterly":
            return "押1付3";
        case "SixMonthly":
            return "押1付6";
        case "Yearly":
            return "押1付12";
        case "Full":
            return "全额付";
    }
}

export function payPeriod(value) {
    switch (value) {
        case 1:
            return "押1付1";
        case 3:
            return "押1付3";
        case 6:
            return "押1付6";
        case 12:
            return "押1付12";
        default:
            return "全额付";
    }
}

export function isPaidDeposit(value) {
    if (value) {
        return "已付";
    } else {
        return "未付";
    }
}
export function riskType(value) {
    switch (value) {
        case 30:
            return '银行卡号';
        case 10:
            return '手机号码';
        case 50:
            return '设备ID';
        case 40:
            return '身份证号码';
        case 60:
            return 'IP';
        case 20:
            return '姓名';
        default:
            return '未知';
    }
}
export function riskLevel(value) {
    if (!value) {
        return;
    }
    switch (value.toUpperCase()) {
        case 'LOW':
            return '低';
        case 'MEDIUM':
            return '中';
        default:
            return '高';
    }
}
export function auditResult(value) {
    if (!value) {
        return;
    }
    switch (value.toUpperCase()) {
        case "PASS":
            return "通过";
        case "REFUSE":
            return "拒绝";
        case "OBSERVING":
            return "待观察";
    }
}
export function roomState(value) {
    switch (value) {
        case 'Vacancy':
            return "空置";
        case 'LongRent':
            return "长租";
        case 'ShortRent':
            return "短租";
        case 'DailyRent':
            return "日租";
        case 'Others':
            return "其它";
    }
}
export function loanState(value) {
    switch (value) {
        case 'Normal':
            return "正常";
        case 'Follow':
            return "关注";
        case 'AbNormal':
            return "异常";
        case 'Other':
            return "其他";
        default:
            return "正常";
    }
}
export function loanStateFinance(value) {
    switch (value) {
        case 'YiHuanKuanZhengChang':
            return "已还款";
        case 'YiHuanKuanDaiChang':
            return "已还款(代偿)";
        case 'YiHuanKuanYuQi':
            return "已还款(逾期)";
        case 'HuanKuanZhongZhengChang':
            return "还款中";
        case 'HuanKuanZhongYuQi':
            return "还款中(逾期)";
        case 'YuQiZhong':
            return "逾期中";
    }
}
export function decorationType(value) {
    switch (value) {
        case 'MaoPi':
            return "毛坯";
        case 'JianZhuang':
            return "简装";
        case 'JingZhuang':
            return "精装";
        case 'HaoZhuang':
            return "豪装";
    }
}
export function contractType(value) {
    switch (value) {
        case 'Booking':
            return "预定";
        case 'Sign':
            return "直签";
        case 'TakeOver':
            return "顶租";
        case 'Releting':
            return "续租";
        case 'RoomChange':
            return "换房";
    }
}
export function orderType(value) {
    switch (value) {
        case "HouseRental":
            return '房租金';
        case "HouseDeposit":
            return '房租押金';
        case "AccessCardDeposit":
            return '门禁卡押金';
        case "ParkDeposit":
            return '停车费押金';
        case "OtherDeposit":
            return '其他押金';
        case "TenementFee":
            return '物业费';
        case "HotWaterFee":
            return '热水费';
        case "ColdWaterFee":
            return '冷水费';
        case "ElectricityFee":
            return '电费';
        case "ParkFee":
            return '停车费';
        case "LaundryFee":
            return '洗衣费';
        case "CleaningFee":
            return '保洁费';
        case "BroadBandFee":
            return '宽带费';
        case "GasFee":
            return '燃气费';
        case "TelevisionFee":
            return '电视费';
        case "ServiceFee":
            return '服务费';
        case "OtherFee":
            return '其他费用';
        case "Reservation":
            return '预定金';
    }
}

export function contractState(value) {
    switch (value) {
        case 'UnConfirmed':
            return "未确认";
        case 'Confirmed':
            return "已确认";
        case 'Efficient':
            return "已生效";
        case 'CheckOut':
            return "已退租";
    }
}

export function checkoutType(value) {
    switch (value) {
        case 'NotCheckout':
            return "未退租";
        case 'Normal':
            return "到期退租";
        case 'BreakContracts':
            return "违约退租";
        case 'Sublet':
            return "转租退租";
        case 'Agreement':
            return "协议退租";
    }
}


export function reservationState(value) {
    switch (value) {
        case "Created":
            return "未支付";
        case "Reserved":
            return "已支付";
        case "Revoked":
            return "已撤销";
        case "Canceled":
            return "已取消";
        case "Turned":
            return "转合同";
    }
}

export function orderStateForApart(value) {
    switch (value) {
        case "PrePaid":
            return "提前还款";
        case "Created":
            return "未支付";
        case "Paid":
            return "已支付";
        case "Overdue":
            return "已逾期";
        case "Disposed":
            return "已分期";
    }
}

export function orderState(value) {
    switch (value) {
        case "PrePaid":
            return "提前还款";
        case "Created":
            return "待支付";
        case "Paid":
            return "已支付";
        case "Overdue":
            return "已逾期";
        case "Disposed":
            return "已分期";
    }
}
export function installmentOrderState(value) {
    switch (value) {
        case "PrePaid":
            return "提前还款";
        case "Created":
            return "待支付";
        case "Paid":
            return "已支付";
        case "Overdue":
            return "已逾期";
        case "Disposed":
            return "已处置";
    }
}

export function repayMethod(value) {
    switch (value) {
        case "EqualLoanPayments":
            return "等额本息";
        case "EqualPrincipalPayments":
            return "等额本金";
    }
}

export function repayType(value) {
    switch (value) {
        case 'NotRepaid':
            return "未还款";
        case 'Repaid':
            return "正常还款";
        case 'OverdueRepaid':
            return "逾期还款";
        case 'EarlyRepaid':
            return "提前还款";
        case 'BondRepurchase':
            return "债券回购";
    }
}

export function transactionMethod(value) {
    switch (value) {
        case "POS":
            return "POS转账";
        case "AliPay":
            return "支付宝";
        case "WeiXin":
            return "微信支付";
        case "OnlineBank":
            return "网银";
        case "Cash":
            return "现金";
        case "Fengniaowu":
            return "蜂鸟屋";
        case "Other":
            return "其他方式";
    }
}

export function transactionCategory(value) {
    switch (value) {
        case "In":
            return "收入";
        case "Out":
            return "支出";
    }
}

export function floor(value) {
    if (value > 0) {
        return value;
    }
    switch (value) {
        case -1:
            return "B1";
        case -2:
            return "B2";
        case -3:
            return "B3";
        case -4:
            return "B4";
        case -5:
            return "B5";
        case -6:
            return "B6";
        case -7:
            return "B7";
        case -8:
            return "B8";
        case -9:
            return "B9";
        case -10:
            return "B10";
    }
}

export function utilitiesExpenseType(value) {
    switch (value) {
        case 'HotWaterFee':
            return "热水";
        case 'ColdWaterFee':
            return "冷水";
        case 'ElectricityFee':
            return "电费";
    }
}
export function chargingType(value) {
    switch (value) {
        case 'Fixed':
            return "固定";
        case 'Meter':
            return "抄表";
    }
}
