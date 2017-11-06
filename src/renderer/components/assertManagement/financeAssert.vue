<template>
    <div>
        <div @click="show()">显示</div>
        <el-row class="right-top-c-c" :gutter="15" style="height: 290px; min-width: 1500px; width: auto">
            <el-col style="height: 100%;" :span="5">
                <div class="border-radius-4  bg-purple">
                    <div class="itemTitle">
                        <span>贷款概况</span>
                    </div>
                    <p class="yue">贷款余额: <span
                            v-if="financialStatistics">{{(financialStatistics.totalLoanYuEAmount) | amount2}}</span> 元
                    </p>
                    <div class="currentTotal">
                        <div style="float: left">
                            <rd-progress-circle :progress="progressCircle1"></rd-progress-circle>
                            <span v-if="financialStatistics">{{(financialStatistics.currentBenJinHuanKuanAmount / financialStatistics.currentLoanAmount ) | rate}}%</span><span
                                v-else>0%</span>
                            <p>当期还款率</p>
                        </div>
                        <div style="float: right">
                            <rd-progress-circle :progress="progressCircle2"></rd-progress-circle>
                            <span v-if="financialStatistics">{{(financialStatistics.currentYuQiAmount / financialStatistics.currentLoanAmount ) | rate}}%</span><span
                                v-else>0%</span>
                            <p>当期逾期率</p>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col style="height: 100%;" :span="11">
                <div class="border-radius-4 bg-purple">
                    <div class="itemTitle">
                        <span>今日财务概况</span>
                    </div>
                    <div v-show="!isNoData" id="bar1" style="width:calc(100% + 400px); height:268px; margin-top: 20px; margin-left: -200px;"></div>
                    <div style="width: 100%; height:288px; text-align: center; font-size: 16px; color: #99A9BF" v-show="isNoData">
                        <img src="~@/assets/financeNoData.png" style="width: 142px; margin-top: 30px; margin-bottom: 20px;" />
                        <p>今日财务概况暂无数据</p>
                    </div>
                </div>
            </el-col>
            <el-col style="height: 100%;" :span="8">
                <div class="border-radius-4 bg-purple">
                    <div class="itemTitle">
                        <span>累计财务概况</span>
                    </div>
                    <p class="totalInfos">贷款总额 <span
                            v-if="financialStatistics">{{(financialStatistics.totalLoanAmount) | amount2}}</span>
                        <span v-else>0</span></p>
                    <div class="totalInfosItem">
                        <ul class="totalInfosUl">
                            <li class="color1">
                                <p v-if="financialStatistics">
                                    {{(financialStatistics.totalZhengChangHuanKuanAmount) | amount2}}</p>
                                <p v-else>0</p>
                                <span>正常还款额</span>
                            </li>
                            <li class="color2">
                                <p v-if="financialStatistics">{{(financialStatistics.totalZhaiQuanHuiGouAmout) | amount2}}</p>
                                <p v-else>0</p>
                                <span>债权回购额</span>
                            </li>
                        </ul>
                        <ul class="totalInfosUl" style="margin-left: 70px;">
                            <li class="color3">
                                <p v-if="financialStatistics">{{(financialStatistics.totalTiQianHuanKuanAmout) | amount2}}</p>
                                <p v-else>0</p>
                                <span>提前还款额</span>
                            </li>
                            <li class="color4">
                                <p v-if="financialStatistics">
                                    {{(financialStatistics.totalYuQiHuanKuanAmout) | amount2}}</p>
                                <p v-else>0</p>
                                <span>逾期还款额</span>
                            </li>
                        </ul>
                        <div class="pie2Content">
                            <div id="pie2"></div>
                            <div class="pie2Text">
                                <p>还款总额</p>
                                <p>统计</p>
                                <p class="pLevel" style="font-size: 14px;">还款总额</p>
                                <span v-if="financialStatistics">{{(financialStatistics.totalShouKuanAmount) | amount2}}</span><span
                                    v-else>0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-popover ref="popoverFinanceDetails1" placement="bottom-end" width="600" v-model="divVisible1">
            <el-form :model="filter1" label-position="left" class="queryPopoverForm " label-width="100px" ref="filter1">
                <el-form-item label="公寓名称" prop="apartmentName">
                    <el-select :clearable="true" v-model="filter1.apartmentName" placeholder="请选择公寓名称">
                        <el-option v-for="item in apartments" :label="item.apartmentName"
                                   :value="item.apartmentName" :key="item.apartmentName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="房间编号" prop="roomNumber">
                    <el-input v-model="filter1.roomNumber" placeholder="请输入房间编号"></el-input>
                </el-form-item>
                <el-form-item label="租客姓名" prop="tenantName">
                    <el-input v-model="filter1.tenantName" placeholder="请输入租客姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="credentialNo">
                    <el-input v-model="filter1.credentialNo" placeholder="请输入身份证号"></el-input>
                </el-form-item>
                <el-form-item label="合同编号" prop="contractNo">
                    <el-input v-model="filter1.contractNo" placeholder="请输入合同编号"></el-input>
                </el-form-item>
                <el-form-item label="申请时间">
                    <el-col :span="11">
                        <el-form-item prop="loanApplyStartTime">
                            <el-date-picker type="date" placeholder="请选择开始日期"
                                            v-model="filter1.loanApplyStartTime"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">&nbsp;&nbsp;</el-col>
                    <el-col :span="11">
                        <el-form-item prop="loanApplyEndTime">
                            <el-date-picker type="date" placeholder="请选择结束日期"
                                            v-model="filter1.loanApplyEndTime"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="贷款状态" prop="loanState">
                    <el-checkbox-group v-model="filter1.loanState" style="width:100%; margin-left:-15px">
                        <el-checkbox v-for="item in getLoanStateFinance" :label="item.key" :key="item.key">{{item.value}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div style="text-align: right; margin: 0">
                <el-button @click="clearFilter1">重置</el-button>
                <el-button type="primary" @click="checkLoanInfos" class="greenBtn">确定</el-button>
            </div>
        </el-popover>
        <el-popover ref="popoverFinanceDetails2" placement="bottom-end" width="600" v-model="divVisible2">
            <el-form :model="filter2" label-position="left" class="queryPopoverForm " label-width="100px" ref="filter2">
                <el-form-item label="公寓名称" prop="apartmentName">
                    <el-select :clearable="true" v-model="filter2.apartmentName" placeholder="请选择公寓名称">
                        <el-option v-for="item in apartments" :label="item.apartmentName" :key="item.apartmentName"
                                   :value="item.apartmentName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="房间编号" prop="roomNumber">
                    <el-input v-model="filter2.roomNumber" placeholder="请输入房间编号"></el-input>
                </el-form-item>
                <el-form-item label="租客姓名" prop="tenantName">
                    <el-input v-model="filter2.tenantName" placeholder="请输入租客姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="credentialNo">
                    <el-input v-model="filter2.credentialNo" placeholder="请输入身份证号"></el-input>
                </el-form-item>
                <el-form-item label="合同编号" prop="contractNo">
                    <el-input v-model="filter2.contractNo" placeholder="请输入合同编号"></el-input>
                </el-form-item>
                <el-form-item label="应还款日">
                    <el-col :span="11">
                        <el-form-item prop="paymentStartTime">
                            <el-date-picker type="date" placeholder="请选择开始日期"
                                            v-model="filter2.paymentStartTime"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">&nbsp;&nbsp;</el-col>
                    <el-col :span="11">
                        <el-form-item prop="paymentEndTime">
                            <el-date-picker type="date" placeholder="请选择结束日期"
                                            v-model="filter2.paymentEndTime"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="实还款日">
                    <el-col :span="11">
                        <el-form-item prop="actualPaymentStartTime">
                            <el-date-picker type="date" placeholder="请选择开始日期"
                                            v-model="filter2.actualPaymentStartTime"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">&nbsp;&nbsp;</el-col>
                    <el-col :span="11">
                        <el-form-item prop="actualPaymentEndTime">
                            <el-date-picker type="date" placeholder="请选择结束日期"
                                            v-model="filter2.actualPaymentEndTime"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="贷款状态" prop="orderState">
                    <el-checkbox-group v-model="filter2.orderState" style="width:100%; margin-left:-15px">
                        <el-checkbox v-for="item in getInstallmentOrderState" :label="item.key"  :key="item.key">{{item.value}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div style="text-align: right; margin: 0">
                <el-button @click="clearFilter2">重置</el-button>
                <el-button type="primary" @click="checkOrderInfos" class="greenBtn">确定</el-button>
            </div>
        </el-popover>
        <el-row class="toolbar myStyleToggle" style="margin-top: 15px;">
            <el-form v-show="activeName == 'first'" :inline="true" class="demo-form-inline query" style="margin-top: 0">
                <el-form-item>
                    <el-input v-model="loanQueryValue" :on-icon-click="loanQueryHandle" placeholder="搜索公寓名、房间编号、姓名或身份证号"
                              icon="search"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button v-bind:class="{active: isFilterSelect1 || divVisible1}" v-popover:popoverFinanceDetails1><i class="fa fa-filter"></i></el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="refreshLoanInfo"><i class="bf_icon_refresh"></i></el-button>
                </el-form-item>
            </el-form>
            <el-form v-show="activeName == 'second'" :inline="true" class="demo-form-inline query" style="margin-top: 0">
                <el-form-item>
                    <el-input v-model="orderQueryValue" :on-icon-click="orderQueryHandle"
                              placeholder="搜索公寓名、房间编号、姓名或身份证号" icon="search"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button v-bind:class="{active: isFilterSelect2 || divVisible2}" v-popover:popoverFinanceDetails2><i class="fa fa-filter"></i></el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="refreshOrderInfo"><i class="bf_icon_refresh"></i></el-button>
                </el-form-item>
            </el-form>
            <el-tabs v-model="activeName" v-if="afterLoading">
                <el-tab-pane label="贷款详情" name="first">
                    <el-col :span="24" class="listbox myStyleToggle">
                        <el-table :empty-text="loanLoadingData" :data="loanDetails" :stripe="true" style="width:100%">
                            <el-table-column prop="apartmentName" width="220" label="公寓名">
                            </el-table-column>
                            <el-table-column prop="roomNumber" width="100" label="房间编号">
                            </el-table-column>
                            <el-table-column prop="realName" width="120" label="申请人姓名">
                            </el-table-column>
                            <el-table-column prop="cellphone" label="手机号">
                            </el-table-column>
                            <el-table-column prop="credentialNo" label="证件号码" width="180">
                            </el-table-column>
                            <el-table-column label="贷款总额">
                                <template slot-scope="scope">
                                    <span>{{scope.row.amount | amount2}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="待还款额">
                                <template slot-scope="scope">
                                    <span>{{scope.row.repayRemainAmount | amount2}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column width="100" label="贷款状态">
                                <template slot-scope="scope">
                                    <span v-show="scope.row.loanState == 'YiHuanKuanZhengChang'" style="color:#07BF96;">已还款</span>
                                    <span v-show="scope.row.loanState == 'YiHuanKuanDaiChang'" style="color:#FE9527;">已还款(代偿)</span>
                                    <span v-show="scope.row.loanState == 'YiHuanKuanYuQi'" style="color:#FF6260;">已还款(逾期)</span>
                                    <span v-show="scope.row.loanState == 'HuanKuanZhongZhengChang'"
                                          style="color:#07BF96;">还款中</span>
                                    <span v-show="scope.row.loanState == 'HuanKuanZhongYuQi'" style="color:#FE9527;">还款中(逾期)</span>
                                    <span v-show="scope.row.loanState == 'YuQiZhong'" style="color:#FF6260;">逾期中</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="apply" label="审批时间">
                                <template slot-scope="scope">
                                    <span>{{scope.row.loanApplyTime | dateYYMMDD}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="loanPeriod" width="100" label="贷款周期">
                            </el-table-column>
                            <el-table-column label="合同信息">
                                <template slot-scope="scope">
                                    <div style="cursor: pointer" @click="openContractInfoDlgFuc(scope.$index)">
                                        <i class="bf_icon_8"
                                           style="font-size: 20px;color: #07bf96;vertical-align: middle;"></i>
                                        <span>合同信息</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button @click="showLoanAside(scope.$index)" class="littleTable" type="text"
                                               size="small">查看
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-col :span="24" style="margin-top:10px" class="myPaginationContent">
                            <el-pagination @current-change="handleCurrentChange1" :current-page="pageData1.pageIndex"
                                           :page-size="pageData1.pageSize" layout="prev,pager,next,jumper"
                                           :total="pageData1.pageTotal" style="text-align: center"></el-pagination>
                        </el-col>
                    </el-col>
                </el-tab-pane>
                <el-tab-pane label="分期账单" name="second">
                    <el-col :span="24" class="listbox myStyleToggle">
                        <el-table :empty-text="installmentLoadingData" :data="installmentOrders" :stripe="true" style="width:100%">
                            <el-table-column prop="apartmentName" width="220" label="公寓名">
                            </el-table-column>
                            <el-table-column prop="roomNumber" width="100" label="房间编号">
                            </el-table-column>
                            <el-table-column prop="realName" label="申请人姓名">
                            </el-table-column>
                            <el-table-column prop="cellphone" width="130" label="手机号">
                            </el-table-column>
                            <el-table-column prop="credentialNo" label="证件号码" width="180">
                            </el-table-column>
                            <el-table-column prop="contractNo" label="合同编号" width="150">
                            </el-table-column>
                            <el-table-column prop="loanNo" label="贷款编号" width="170">
                            </el-table-column>
                            <el-table-column label="账单金额">
                                <template slot-scope="scope">
                                    <span>{{(scope.row.amount + scope.row.interestAmount + scope.row.serviceCharge + scope.row.penaltyAmount) | amount2}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="type" width="100" label="账单状态">
                                <template slot-scope="scope">
                                    <span v-show="scope.row.orderState == 'PrePaid'" style="color:#FF8C14;">提前还款</span>
                                    <span v-show="scope.row.orderState == 'Created'" style="color:#FF8C14;">待支付</span>
                                    <span v-show="scope.row.orderState == 'Paid'" style="color:#31C366;">已支付</span>
                                    <span v-show="scope.row.orderState == 'Overdue'" style="color:#FF5047;">已逾期</span>
                                    <span v-show="scope.row.orderState == 'Disposed'" style="color:#9098A6;">已处置</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="应还款日">
                                <template slot-scope="scope">
                                    <span>{{scope.row.paymentTime | dateYYMMDD}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="实还款日">
                                <template slot-scope="scope">
                                    <span>{{scope.row.actualPaymentTime | dateYYMMDD}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button @click="showBillAside(scope.$index)" class="littleTable" type="text"
                                               size="small">查看
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-col :span="24" style="margin-top:10px" class="myPaginationContent">
                            <el-pagination @current-change="handleCurrentChange2" :current-page="pageData2.pageIndex"
                                           :page-size="pageData2.pageSize" layout="prev,pager,next,jumper"
                                           :total="pageData2.pageTotal" style="text-align: center"></el-pagination>
                        </el-col>
                    </el-col>
                </el-tab-pane>
            </el-tabs>
        </el-row>
        <loanAssertDetailAside ref="loanAside"></loanAssertDetailAside>
        <billAssertDetailAside ref="billAside"></billAssertDetailAside>
        <contractInfoDlg v-if="openContractInfoDlg" :currentContractInfo="selectContractInfo"
                         :showDialog='openContractInfoDlg'
                         @on-result-change="onContractInfoDlgChange"></contractInfoDlg>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    import constants from '../../constants'
    import {
        rdProgressCircle
    } from 'radon-ui'
    import echarts from 'echarts'
    import loanAssertDetailAside from '../subComponents/loanAssertDetailAside'
    import billAssertDetailAside from '../subComponents/billAssertDetailAside'
    import contractInfoDlg from '../subComponents/contractInfoDlg'

    export default {
        data() {
            return {
                afterLoading: false,
                apartments: [],
                loanLoadingData: '加载中...',
                installmentLoadingData: '加载中...',
                label1: '贷款详情',
                selectContractInfo: null,
                progressCircle1: {
                    percent: 0,
                    options: {
                        color: '#2dd1ac',
                        size: 'common',
                        state: 'loading',
                        format: function (percent) {
                            return;
                        }
                    }
                },
                progressCircle2: {
                    percent: 0,
                    options: {
                        color: '#ff6260',
                        size: 'common',
                        state: 'loading',
                        format: function (percent) {
                            return;
                        }
                    }
                },
                financialStatistics: null,
                bar1: null,
                pie2: null,
                screenWidth: document.body.clientWidth,
                activeName: 'first',
                loanDetails: [],
                installmentOrders: [],
                pageData1: {
                    pageIndex: 1,
                    pageSize: 10,
                    pageTotal: 0,
                },
                pageData2: {
                    pageIndex: 1,
                    pageSize: 10,
                    pageTotal: 0,
                },
                openContractInfoDlg: false,
                filter1: {
                    apartmentName: null,
                    roomNumber: null,
                    tenantName: null,
                    credentialNo: null,
                    contractNo: null,
                    loanApplyStartTime: null,
                    loanApplyEndTime: null,
                    loanState: []
                },
                queryLoanInfoCurrentParams: null,
                loanQueryValue: null,
                filter2: {
                    apartmentName: null,
                    roomNumber: null,
                    tenantName: null,
                    credentialNo: null,
                    contractNo: null,
                    orderState: [],
                    paymentStartTime: null,
                    paymentEndTime: null,
                    actualPaymentStartTime: null,
                    actualPaymentEndTime: null,
                },
                queryOrderInfoCurrentParams: null,
                orderQueryValue: null,
                divVisible1: false,
                divVisible2: false,
                isNoData: false,
                isFilterSelect1: false,
                isFilterSelect2: false
            };
        },
        methods: {
            show() {
                this.afterLoading = true;
            },
            tabClick(tab, event) {},
            getApartments: function () {
                var that = this;
                this.$api.get(constants.KCURLS.GETAPARTMENTS, function (res) {
                    that.apartments = res;
                });
            },
            openContractInfoDlgFuc(val) {
                this.selectContractInfo = this.loanDetails[val];
                this.openContractInfoDlg = true;
            },
            onContractInfoDlgChange(val) {
                this.openContractInfoDlg = val;
            },
            redrawBar1() {
                var todayLoanAmount = [0];
                var todayHuanKuanAmount = [0];
                var todayZhengChangHuanKuanAmount = [0];
                var todayZhaiQuanHuiGouAmount = [0];
                var todayTiQianHuanKuanAmount = [0];
                var todayYuQiHuanKuanAmount = [0];
                if (this.financialStatistics) {
                    todayLoanAmount = this.numToArray(this.financialStatistics.todayLoanAmount);
                    todayHuanKuanAmount = this.numToArray(this.financialStatistics.todayHuanKuanAmount);
                    todayZhengChangHuanKuanAmount = this.numToArray(this.financialStatistics.todayZhengChangHuanKuanAmount);
                    todayZhaiQuanHuiGouAmount = this.numToArray(this.financialStatistics.todayZhaiQuanHuiGouAmount);
                    todayTiQianHuanKuanAmount = this.numToArray(this.financialStatistics.todayTiQianHuanKuanAmount);
                    todayYuQiHuanKuanAmount = this.numToArray(this.financialStatistics.todayYuQiHuanKuanAmount);
                    if (this.financialStatistics.todayLoanAmount == 0 && this.financialStatistics.todayHuanKuanAmount == 0 && this.financialStatistics.todayZhengChangHuanKuanAmount == 0 && this.financialStatistics.todayZhaiQuanHuiGouAmount == 0 && this.financialStatistics.todayTiQianHuanKuanAmount == 0 && this.financialStatistics.todayYuQiHuanKuanAmount == 0) {
                        this.isNoData = true;
                    }
                    else {
                        this.isNoData = false;
                        this.bar1 = echarts.init(document.getElementById('bar1'));
                        this.bar1.setOption({
                            calculable: true,
                            xAxis: [{
                                type: 'category',
                                data: ['今日'],
                                show: false
                            }],
                            yAxis: [{
                                type: 'value',
                                show: false
                            }],
                            series: [{
                                name: '贷款总额',
                                type: 'bar',
                                data: todayLoanAmount,
                                itemStyle: {
                                    normal: {
                                        color: '#ff9a55',
                                        label: {
                                            offset: [0, -10],
                                            show: true,
                                            position: 'top',
                                            textStyle: {
                                                color: '#354052',
                                                fontSize: 16,
                                                fontWeight: 'normal'
                                            },
                                            formatter: function (a) {
                                                return a.seriesName + '\n\n' + a.value;
                                            }
                                        }
                                    }
                                },
                            },
                                {
                                    name: '还款总额',
                                    type: 'bar',
                                    data: todayHuanKuanAmount,
                                    itemStyle: {
                                        normal: {
                                            color: '#ffb94c',
                                            label: {
                                                offset: [0, -10],
                                                show: true,
                                                position: 'top',
                                                textStyle: {
                                                    color: '#354052',
                                                    fontSize: 16,
                                                    fontWeight: 'normal'
                                                },
                                                formatter: function (a) {
                                                    return a.seriesName + '\n\n' + a.value;
                                                }
                                            }
                                        }
                                    },
                                },
                                {
                                    name: '正常还款额',
                                    type: 'bar',
                                    data: todayZhengChangHuanKuanAmount,
                                    itemStyle: {
                                        normal: {
                                            color: '#ffd842',
                                            label: {
                                                offset: [0, -10],
                                                show: true,
                                                position: 'top',
                                                textStyle: {
                                                    color: '#354052',
                                                    fontSize: 16,
                                                    fontWeight: 'normal'
                                                },
                                                formatter: function (a) {
                                                    return a.seriesName + '\n\n' + a.value;
                                                }
                                            }
                                        }
                                    },
                                },
                                {
                                    name: '债权回购额',
                                    type: 'bar',
                                    data: todayZhaiQuanHuiGouAmount,
                                    itemStyle: {
                                        normal: {
                                            color: '#f3eb49',
                                            label: {
                                                offset: [0, -10],
                                                show: true,
                                                position: 'top',
                                                textStyle: {
                                                    color: '#354052',
                                                    fontSize: 16,
                                                    fontWeight: 'normal'
                                                },
                                                formatter: function (a) {
                                                    return a.seriesName + '\n\n' + a.value;
                                                }
                                            }
                                        }
                                    },
                                },
                                {
                                    name: '提前还款额',
                                    type: 'bar',
                                    data: todayTiQianHuanKuanAmount,
                                    itemStyle: {
                                        normal: {
                                            color: '#d3ef6c',
                                            label: {
                                                offset: [0, -10],
                                                show: true,
                                                position: 'top',
                                                textStyle: {
                                                    color: '#354052',
                                                    fontSize: 16,
                                                    fontWeight: 'normal'
                                                },
                                                formatter: function (a) {
                                                    return a.seriesName + '\n\n' + a.value;
                                                }
                                            }
                                        }
                                    },
                                },
                                {
                                    name: '逾期还款额',
                                    type: 'bar',
                                    data: todayYuQiHuanKuanAmount,
                                    itemStyle: {
                                        normal: {
                                            color: '#bcf283',
                                            label: {
                                                offset: [0, -10],
                                                show: true,
                                                position: 'top',
                                                textStyle: {
                                                    color: '#354052',
                                                    fontSize: 16,
                                                    fontWeight: 'normal'
                                                },
                                                formatter: function (a) {
                                                    return a.seriesName + '\n\n' + a.value;
                                                }
                                            }
                                        }
                                    },
                                }
                            ]
                        });
                    }
                }
                else {
                    this.isNoData = true;
                }            
            },
            redrawPie2() {
                var totalZhengChangHuanKuanAmount = 0;
                var totalZhaiQuanHuiGouAmout = 0;
                var totalTiQianHuanKuanAmout = 0;
                var totalYuQiHuanKuanAmout = 0;
                if (this.financialStatistics) {
                    totalZhengChangHuanKuanAmount = this.financialStatistics.totalZhengChangHuanKuanAmount;
                    totalZhaiQuanHuiGouAmout = this.financialStatistics.totalZhaiQuanHuiGouAmout;
                    totalTiQianHuanKuanAmout = this.financialStatistics.totalTiQianHuanKuanAmout;
                    totalYuQiHuanKuanAmout = this.financialStatistics.totalYuQiHuanKuanAmout;
                }

                this.pie2 = echarts.init(document.getElementById('pie2'));
                this.pie2.setOption({
                    calculable: true,
                    series: [{
                        name: '访问来源',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            },
                        },
                        data: [{
                            value: totalZhengChangHuanKuanAmount,
                            name: '正常还款额',
                            itemStyle: {
                                normal: {
                                    color: '#15aaf4'
                                }
                            }
                        },
                            {
                                value: totalZhaiQuanHuiGouAmout,
                                name: '债权回购额',
                                itemStyle: {
                                    normal: {
                                        color: '#ffdb00'
                                    }
                                }
                            },
                            {
                                value: totalTiQianHuanKuanAmout,
                                name: '提前还款额',
                                itemStyle: {
                                    normal: {
                                        color: '#ffa001'
                                    }
                                }
                            },
                            {
                                value: totalYuQiHuanKuanAmout,
                                name: '逾期还款额',
                                itemStyle: {
                                    normal: {
                                        color: '#ff6260'
                                    }
                                }
                            }
                        ]
                    }]
                });
            },
            showLoanAside: function (val) {
                this.$refs.loanAside.openRight(this.loanDetails[val]);
            },
            showBillAside: function (val) {
                this.$refs.billAside.openRight(this.installmentOrders[val]);
            },
            numToArray(num) {
                var temp = [];
                temp.push(parseInt((num / 100).toFixed(0)));
                return temp;
            },
            handleCurrentChange1: function (val) {
                this.pageData1.pageIndex = val;
                this.queryLoanInfos(this.queryLoanInfoCurrentParams);
            },
            clearFilter1() {
                this.isFilterSelect1 = false;
                this.$refs['filter1'].resetFields();
                this.queryLoanInfos({});
                this.divVisible1 = false;
            },
            refreshLoanInfo() {
                this.refreshLoanInfos(this.queryLoanInfoCurrentParams);
            },
            loanQueryHandle() {
                this.isFilterSelect1 = false;
                this.pageData1.pageIndex = 1;
                this.$refs['filter1'].resetFields();
                if (!this.loanQueryValue) {
                    this.queryLoanInfos({});
                }
                else {
                    this.queryLoanInfos({queryValue: this.loanQueryValue});
                }
            },
            checkLoanInfos() {
                this.isFilterSelect1 = true;
                this.pageData1.pageIndex = 1;
                this.loanQueryValue = null;
                var params = {
                    apartmentName: this.filter1.apartmentName,
                    roomNumber: this.filter1.roomNumber,
                    tenantName: this.filter1.tenantName,
                    credentialNo: this.filter1.credentialNo,
                    contractNo: this.filter1.contractNo,
                    loanApplyStartTime: (!(this.filter1.loanApplyStartTime instanceof Date)) ? this.filter1.loanApplyStartTime : this.filter1.loanApplyStartTime.Format('yyyy-MM-dd'),
                    loanApplyEndTime: (!(this.filter1.loanApplyEndTime instanceof Date)) ? this.filter1.loanApplyEndTime : this.filter1.loanApplyEndTime.Format('yyyy-MM-dd'),
                    loanState: this.filter1.loanState.join(",")
                }
                this.queryLoanInfos(params);
            },
            queryLoanInfos(params) {
                var _this = this;
                params.pageIndex = _this.pageData1.pageIndex - 1;
                params.pageSize = _this.pageData1.pageSize;
                _this.$api.post(constants.KCURLS.QUERYLOANINFOS, params,
                    function (res) {
                        _this.divVisible1 = false;
                        _this.loanDetails = res.data;
                        _this.pageData1.pageTotal = res.totalCount;
                        _this.queryLoanInfoCurrentParams = params;
                        if (_this.loanDetails.length == 0) {
                            _this.loanLoadingData = '暂无数据';
                        }
                    },
                    function (err) {
                        _this.divVisible1 = false;
                        _this.loanLoadingData = '加载失败';
                    });
            },
            refreshLoanInfos: function (params) {
                var _this = this;
                params.pageIndex = _this.pageData1.pageIndex - 1;
                params.pageSize = _this.pageData1.pageSize;
                _this.$api.post(constants.KCURLS.REFRESHLOANINFOS, params,
                    function (res) {
                        _this.divVisible1 = false;
                        _this.loanDetails = res.data;
                        _this.pageData1.pageTotal = res.totalCount;
                        _this.queryLoanInfoCurrentParams = params;
                        if (_this.loanDetails.length == 0) {
                            _this.loanLoadingData = '暂无数据';
                        }
                    },
                    function (err) {
                        _this.divVisible1 = false;
                        _this.loanLoadingData = '加载失败';
                    });
            },
            clearFilter2() {
                this.isFilterSelect2 = false;
                this.$refs['filter2'].resetFields();
                this.queryCapitalOrderInfos({});
                this.divVisible2 = false;
            },
            handleCurrentChange2: function (val) {
                this.pageData2.pageIndex = val;
                this.queryCapitalOrderInfos(this.queryOrderInfoCurrentParams);
            },
            checkOrderInfos() {
                this.isFilterSelect2 = true;
                this.orderQueryValue = null;
                this.pageData2.pageIndex = 1;
                var params = {
                    apartmentName: this.filter2.apartmentName,
                    roomNumber: this.filter2.roomNumber,
                    tenantName: this.filter2.tenantName,
                    credentialNo: this.filter2.credentialNo,
                    contractNo: this.filter2.contractNo,
                    paymentStartTime: (!(this.filter2.paymentStartTime instanceof Date)) ? this.filter2.paymentStartTime : this.filter2.paymentStartTime.Format('yyyy-MM-dd'),
                    paymentEndTime: (!(this.filter2.paymentEndTime instanceof Date)) ? this.filter2.paymentEndTime : this.filter2.paymentEndTime.Format('yyyy-MM-dd'),
                    actualPaymentStartTime: (!(this.filter2.actualPaymentStartTime instanceof Date)) ? this.filter2.actualPaymentStartTime : this.filter2.actualPaymentStartTime.Format('yyyy-MM-dd'),
                    actualPaymentEndTime: (!(this.filter2.actualPaymentEndTime instanceof Date)) ? this.filter2.actualPaymentEndTime : this.filter2.actualPaymentEndTime.Format('yyyy-MM-dd'),
                    orderState: this.filter2.orderState.join(",")
                }
                this.queryCapitalOrderInfos(params);
            },
            orderQueryHandle() {
                this.isFilterSelect2 = false;
                this.pageData2.pageIndex = 1;
                this.$refs['filter2'].resetFields();
                if (!this.orderQueryValue) {
                    this.queryCapitalOrderInfos({});
                }
                else {
                    this.queryCapitalOrderInfos({queryValue: this.orderQueryValue});
                }
            },
            refreshOrderInfo() {
                this.refreshCapitalOrderInfos(this.queryOrderInfoCurrentParams);
            },
            queryCapitalOrderInfos(params) {
                var _this = this;
                params.pageIndex = _this.pageData2.pageIndex - 1;
                params.pageSize = _this.pageData2.pageSize;
                _this.$api.post(constants.KCURLS.QUERYCAPITALORDERINFOS, params,
                    function (res) {
                        _this.divVisible2 = false;
                        _this.installmentOrders = res.data;
                        _this.pageData2.pageTotal = res.totalCount;
                        _this.queryOrderInfoCurrentParams = params;
                        if (_this.installmentOrders.length == 0) {
                            _this.installmentLoadingData = '暂无数据';
                        }
                    },
                    function (err) {
                        _this.divVisible2 = false;
                        _this.installmentLoadingData = '加载失败';
                    });
            },
            refreshCapitalOrderInfos: function (params) {
                var _this = this;
                params.pageIndex = _this.pageData2.pageIndex - 1;
                params.pageSize = _this.pageData2.pageSize;
                _this.$api.post(constants.KCURLS.REFRESHCAPITALORDERINFOS, params,
                    function (res) {
                        _this.divVisible2 = false;
                        _this.installmentOrders = res.data;
                        _this.pageData2.pageTotal = res.totalCount;
                        _this.queryOrderInfoCurrentParams = params;
                        if (_this.installmentOrders.length == 0) {
                            _this.installmentLoadingData = '暂无数据';
                        }
                    },
                    function (err) {
                        _this.divVisible2 = false;
                        _this.installmentLoadingData = '加载失败';
                    });
            }
        },
        created() {
            this.getApartments();
            this.queryLoanInfos({});
            this.queryCapitalOrderInfos({});
            var _this = this;
            setTimeout(function() {
                _this.afterLoading = true;
            }, 1000);
        },
        mounted: function () {
            this.redrawPie2()
            var _this = this
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth
                    _this.screenWidth = window.screenWidth
                })()
            }
            _this.$api.get(constants.KCURLS.GETLOANFINANCIALSTATISTICS,
                res => {
                    if (res.succeeded) {
                        _this.financialStatistics = res.data;
                        _this.redrawBar1();
                        _this.redrawPie2()
                        _this.progressCircle1.percent = _this.financialStatistics.currentLoanAmount == 0 ? 0 : (_this.financialStatistics.currentBenJinHuanKuanAmount / _this.financialStatistics.currentLoanAmount ) * 100;
                        _this.progressCircle2.percent = _this.financialStatistics.currentLoanAmount == 0 ? 0 : (_this.financialStatistics.currentYuQiAmount / _this.financialStatistics.currentLoanAmount ) * 100;
                    }
                    else {
                        _this.$message({
                            message: res.message,
                            type: 'warning'
                        });
                    }
                }, err => {

                });
        },
        watch: {
            screenWidth(val) {
                if (!this.timer) {
                    this.screenWidth = val
                    this.timer = true
                    var _this = this
                    setTimeout(function () {
                        _this.timer = false;
                        _this.redrawBar1();
                    }, 400)
                }
            }
        },
        computed: {
            ...mapGetters([
                'getLoanStateFinance',
                'getInstallmentOrderState'
            ])
        },
        components: {
            rdProgressCircle,
            loanAssertDetailAside,
            billAssertDetailAside,
            contractInfoDlg
        }
    };
</script>
<style scoped>
    p.yue {
        font-size: 14px;
        color: #8ca0b3;
        margin: 30px 0 40px 20px;
    }

    p.yue span {
        color: #ff6260;
    }

    .currentTotal {
        font-size: 0;
        width: 220px;
        margin: 0 auto;
    }

    .currentTotal div {
        width: 85px;
        height: 85px;
        position: relative;
        text-align: center
    }

    .currentTotal div p {
        font-size: 12px;
        color: #9facb3;
        margin-top: 10px;
    }

    .currentTotal div span {
        font-size: 18px;
        color: #354052;
        position: absolute;
        top: 30px;
        left: 0;
        display: inline-block;
        width: 100%;
        text-align: center;
        font-weight: bold;
    }

    p.totalInfos {
        width: calc(100% - 40px);
        margin: 10px 20px 20px;
        height: 28px;
        background: #f3f5f7;
        border-radius: 4px;
        font-size: 14px;
        color: #697b8c;
        padding: 0 15px;
        line-height: 28px;
    }

    p.totalInfos span {
        font-size: 16px;
        color: #354052;
        float: right;
    }

    .totalInfosItem {
        padding: 0 30px 0 50px;
        width: 100%;
    }

    ul.totalInfosUl {
        float: left;
        font-size: 20px;
        color: #354052;
    }

    ul.totalInfosUl li {
        /*list-style: disc;*/
        margin-bottom: 50px;
        position: relative;
    }

    ul.totalInfosUl li:before {
        position: absolute;
        left: -20px;
        top: 15px;
        content: '';
        width: 7px;
        height: 7px;
        border-radius: 100%;
        background: #000;
    }

    ul.totalInfosUl li.color1:before {
        background: #15aaf4;
    }

    ul.totalInfosUl li.color2:before {
        background: #ffdb00;
    }

    ul.totalInfosUl li.color3:before {
        background: #ffa001;
    }

    ul.totalInfosUl li.color4:before {
        background: #ff6260;
    }

    ul.totalInfosUl li p {
        color: #354052;
    }

    ul.totalInfosUl li span {
        font-size: 14.81px;
        color: #8ca0b3;
    }

    .pie2Content {
        float: right;
        width: 120px;
        position: relative;
        text-align: center
    }

    #pie2 {
        width: 160px;
        margin-left: -10px;
        margin-top: -20px;
        height: 160px;
    }

    .pie2Text {
        width: 160px;
        margin-left: -10px;
        margin-top: -20px;
        height: 160px;
        position: absolute;
        top: 0;
        left: 0;
        font-size: 12px;
        color: #9facb3;
        text-align: center;
        padding-top: 65px;
    }

    .pie2Text .pLevel {
        margin-top: 50px
    }

    .pie2Text span {
        font-size: 20px;
        color: #354052;
    }
</style>
<style>
    .el-tabs__nav-prev,
    .el-tabs__nav-next {
        display: none;
    }

    .el-tabs__nav-wrap.is-scrollable {
        padding: 0;
    }
</style>
