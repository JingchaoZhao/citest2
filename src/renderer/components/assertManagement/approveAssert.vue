<template>
    <div>
        <el-row class="right-top-c-c" :gutter="15" style="height: 290px; min-width: 1500px;">
            <el-col style="height: 100%;" :span="12">
                <div class="border-radius-4  bg-purple">
                    <div class="itemTitle">
                        <span>累计审批统计指标</span>
                    </div>
                    <div class="passRate">
                        <rd-progress-circle :progress="progressCircle"></rd-progress-circle>
                        <div class="passNumber">
                            <p>{{progressCircle.percent}}%</p>
                            <span>通过率</span>
                        </div>
                    </div>
                    <div class="passRecode">
                        <p><i class="highlight"></i><span>{{loanApplyStatistics.totalSucceedCount}}</span> 累计通过人数</p>
                        <p><i></i><span>{{loanApplyStatistics.totalFailedCount}}</span> 累计拒绝人数</p>
                        <p class="district">
                        <p>
                        <p><span>{{loanApplyStatistics.totalCount}}</span> 累计审批总人数</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="cardDiv cardTop">
                    <p>
                        <i style="color: #ffa001" class="bf_icon_6"></i>
                        <span>{{loanApplyStatistics.todayCount}}</span>
                    </p>
                    <span>今日申请人数</span>
                </div>
                <div class="cardDiv">
                    <p>
                        <i style="color: #3ecb63" class="bf_icon_3"></i>
                        <span>{{loanApplyStatistics.todaySucceedCount}}</span>
                    </p>
                    <span>今日通过人数</span>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="cardDiv cardTop">
                    <p>
                        <i style="color: #15aaf4" class="bf_icon_2"></i>
                        <span>{{loanApplyStatistics.todayFailedCount + loanApplyStatistics.todaySucceedCount}}</span>
                    </p>
                    <span>今日审批人数</span>
                </div>
                <div class="cardDiv">
                    <p>
                        <i style="color: #ff6260" class="bf_icon_5"></i>
                        <span>{{loanApplyStatistics.todayFailedCount}}</span>
                    </p>
                    <span>今日拒绝人数</span>
                </div>
            </el-col>
        </el-row>
        <el-col :span="24" class="listbox" style="margin-top: 10px; padding:0; width: calc(100% - 15px)">
            <div class="title_apart" style="padding-left: 20px; border-bottom:1px solid #e6eaee;">申请列表</div>
            <div style="padding: 0 20px 20px;">
                <el-table :empty-text="loadingData" :data="approveList" :stripe="true" style="width: 100%">
                    <el-table-column label="申请日期">
                        <template slot-scope="scope">
                            {{scope.row.createTime | dateTirm10}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="realName" label="申请人姓名">
                    </el-table-column>
                    <el-table-column prop="credentialNo" label="证件号码" width="180">
                    </el-table-column>
                    <el-table-column prop="cellphone" label="手机号">
                    </el-table-column>
                    <el-table-column label="申请额度">
                        <template slot-scope="scope">
                            {{(scope.row.monthlyAmount + scope.row.propertyManagementAmount) * scope.row.loanPeriod | amount2}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="type" label="审批状态">
                        <template slot-scope="scope">
                            <span v-show="scope.row.loanApplyState =='Created'">待审批</span>
                            <span v-show="scope.row.loanApplyState =='Succeed'">已审批</span>
                            <span v-show="scope.row.loanApplyState =='Failed'">已审批</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="type" label="审批结果">
                        <template slot-scope="scope">
                            <span v-show="scope.row.loanApplyState =='Created'">--</span>
                            <span v-show="scope.row.loanApplyState =='Succeed'">通过</span>
                            <span v-show="scope.row.loanApplyState =='Failed'">拒绝</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="审批时间" width="170">
                    </el-table-column>
                    <!-- <el-table-column label="审批结果">
                      <template slot-scope="scope">
                            <el-tooltip popper-class="approveToolTip" placement="top" effect="light">
                              <div slot="content">
                                  <div class="itemOptHistory">
                                    <ul class="approvalHistoryUl">
                                        <li v-for="subItem in scope.row.auditRecordList">
                                            <div class="approvalHistoryUlTime">
                                                <div></div>
                                                <span>{{subItem.prvoiusAuditTime}}</span>
                                                <span v-show="subItem.previousAuditResult == 'Pass'" style="float: right; margin-top: 7px;">通过</span>
                                                <span v-show="subItem.previousAuditResult == 'Refuse'" style="float: right; margin-top: 7px;">拒绝</span>
                                                <span v-show="subItem.previousAuditResult == 'Observing'" style="float: right; margin-top: 7px;">待观察</span>
                                            </div>
                                            <div style="margin-left: 26px;">
                                                <p>
                                                    <i class="bf_icon_hurman humanIcon"></i>
                                                    {{subItem.previousAuditor}}
                                                </p>
                                                <p style="color: #6A6F7B">
                                                    {{subItem.previousAuditMessage}}
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                  </div>
                              </div>
                              <el-button type="text"><p style="width: 40px;display: inline-block;">{{scope.row.currentAuditResult | auditResult}}</p> <div class="showHistory"></div></el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="loanPeriod" label="贷款周期">
                    </el-table-column>
                    <el-table-column prop="" label="相关报告链接" width="200">
                        <template slot-scope="scope">
                            <p>
                                <span style="cursor: pointer;" @click="openApprovetDlg(scope.row.apartmentReportId)"><i
                                        style="font-size: 18px; color: #ffa001;  vertical-align: middle"
                                        class="bf_icon_8"></i>进件报告</span>
                                <a target="_blank" style="color: #878f9e" @click="openShouquanDlgFunc"><i
                                        style="font-size: 18px; color: #3ecb63; vertical-align: middle"
                                        class="bf_icon_8"></i>授权协议</a>
                            </p>
                            <span v-if="scope.row.credentialType == 'IDCard'" style="cursor: pointer; color: #878f9e;"
                                  @click="openCreditApproveDlg(scope.$index)"><i
                                    style="font-size: 18px; color: #15aaf4;  vertical-align: middle"
                                    class="bf_icon_8"></i>初审报告</span>
                        </template>
                    </el-table-column>
                </el-table>

                <el-col :span="24" style="margin-top:10px" class="myPaginationContent">
                    <el-pagination @current-change="handleCurrentChange" :current-page="pageData.pageIndex"
                                   :page-size="pageData.pageSize" layout="prev,pager,next,jumper"
                                   :total="pageData.pageTotal" style="text-align: center"></el-pagination>
                </el-col>
            </div>
        </el-col>
        <approveDlg v-if="openApproveDlg" :showDialog='openApproveDlg' :approveId='openApproveId'
                    @on-result-change="onApproveChange"></approveDlg>
        <opproveCreditDlg v-if="openApproveCreditDlg" :showDialog='openApproveCreditDlg' :reportId='repoId'
                          :batchId="batchId" @on-result-change="onApproveCreditChange"></opproveCreditDlg>
        <shouquanInfo v-if="openShouquanDlg" :showDialog='openShouquanDlg'
                      @on-result-change="onShouquanDlgChange"></shouquanInfo>
        <approveOprtDlg v-if="openApproveOprtDlg" :showDialog='openApproveOprtDlg'
                        @on-result-change="onApproveOprtChange"
                        @on-sp-infos="onApproveOprtInfosChange"></approveOprtDlg>
    </div>
</template>
<script>
    import constants from '../../constants'
    import {
        rdProgressCircle
    } from 'radon-ui'
    import approveDlg from '../subComponents/approveDlg'
    import opproveCreditDlg from '../subComponents/opproveCreditDlg'
    import approveOprtDlg from '../subComponents/approveOprtDlg'
    import shouquanInfo from '../subComponents/shouquanInfo'

    export default {
        data() {
            return {
                approveIndex: -1,

                openApproveDlg: false,
                openApproveCreditDlg: false,
                openShouquanDlg: false,
                openApproveId: null,
                repoId: null,
                batchId: null,
                openApproveOprtDlg: false,
                progressCircle: {
                    percent: 0, // Number 0-100
                    options: {
                        color: '#3ecb63',
                        size: 'common',
                        state: 'loading',
                        format: function (percent) {
                            return;
                        }
                    }
                },
                pageData: {
                    pageIndex: 0,
                    pageSize: 10,
                    pageTotal: 0
                },
                approveList: [],
                loadingData: '加载中...',
                loanApplyStatistics: {}
            };
        },
        methods: {
            handleCurrentChange: function (val) {
                var _this = this;
                _this.$api.get(constants.KCURLS.GETLOANAPPLIES + '?pageIndex=' + (val - 1) + '&pageSize=10',
                    function (res) {
                        _this.pageData = {
                            pageIndex: res.pageIndex + 1,
                            pageSize: 10,
                            pageTotal: res.totalCount
                        };
                        _this.approveList = res.data;

                    },
                    function (error) {

                    });
            },
            openCreditApproveDlg: function (index) {
                this.repoId = this.approveList[index].creditReportId;
                this.batchId = this.approveList[index].creditBatchId;
                this.openApproveCreditDlg = true;
            },
            openShouquanDlgFunc() {
                this.openShouquanDlg = true;
            },
            onShouquanDlgChange(val) {
                this.openShouquanDlg = val;
            },
            onApproveCreditChange(val) {
                this.openApproveCreditDlg = val;
            },
            openApprovetDlg: function (val) {
                this.openApproveId = val;
                this.openApproveDlg = true;
            },
            onApproveChange(val) {
                this.openApproveDlg = val;
            },
            openApprovetOprtDlg: function (val) {
                this.approveIndex = val;
                this.openApproveOprtDlg = true;
            },
            onApproveOprtChange(val) {
                this.openApproveOprtDlg = val;
            },
            onApproveOprtInfosChange(val) {
                val.auditId = this.approveList[this.approveIndex].auditId;
                var _this = this;
                _this.$api.post(constants.URLS.UPDATECREDITAUDIT, val,
                    function (res) {
                        _this.$api.get(constants.KCURLS.GETLOANAPPLIES + '?pageIndex=' + _this.approveIndex + '&pageSize=10',
                            function (res) {
                                _this.pageData = {
                                    pageIndex: res.pageIndex + 1,
                                    pageSize: 10,
                                    pageTotal: res.totalCount
                                };

                                _this.approveList = res.data;
                            },
                            function (error) {

                            });
                    },
                    function (err) {

                    }, true);
            }
        },
        created() {

        },
        mounted: function () {
            var _this = this;
            _this.$api.get(constants.KCURLS.GETLOANAPPLIES + '?pageIndex=0&pageSize=10',
                function (res) {
                    _this.pageData = {
                        pageIndex: res.pageIndex,
                        pageSize: 10,
                        pageTotal: res.totalCount
                    };
                    _this.approveList = res.data;
                    if (_this.approveList.length == 0) {
                        _this.loadingData = '暂无数据';
                    }
                },
                function (error) {
                    _this.loadingData = '加载失败';
                });
            _this.$api.get(constants.KCURLS.GETLOANAPPLYSTATISTICS,
                res => {
                    if (res.succeeded) {
                        _this.loanApplyStatistics = res.data;
                        _this.progressCircle.percent = res.data.totalCount == 0 ? 0 : parseInt((100 * res.data.totalSucceedCount / res.data.totalCount).toFixed(0));
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
        watch: {},
        components: {
            rdProgressCircle,
            approveDlg,
            approveOprtDlg,
            opproveCreditDlg,
            shouquanInfo
        }
    };
</script>
<style scoped>
    .cardDiv {
        width: 100%;
        height: 137px;
        background: #fff;
        border-radius: 4px;
        overflow: hidden;
    }

    .cardDiv.cardTop {
        margin-bottom: 15px;
    }

    .cardDiv i {
        font-size: 20px;
        margin-right: 5px;
    }

    .cardDiv p span,
    .cardDiv p i {
        vertical-align: middle;
    }

    .cardDiv p {
        font-size: 36px;
        color: #354052;
        margin-top: 36px;
        padding-left: 30px;
    }

    .cardDiv > span {
        font-size: 14px;
        color: #9facb3;
        margin-left: 65px
    }

    .passRate {
        margin: 36px 0 0 50px;
        width: 164px;
        height: 164px;
        float: left;
        position: relative;
    }

    .passNumber {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        text-align: center;
        padding-top: 50px;
    }

    .passNumber p {
        font-size: 36px;
        color: #3ecb63;
    }

    .passNumber span {
        font-size: 16px;
        color: #9facb3;
    }

    .passRecode {
        float: left;
        font-size: 16px;
        color: #9facb3;
        padding: 60px 0 0 90px;
    }

    .passRecode p {
        margin-bottom: 20px;
    }

    p.district {
        height: 2px;
        background: #dee5ec;
        width: 35px;
    }

    .passRecode span {
        color: #354052;
    }

    .passRecode i {
        display: inline-block;
        background: #dee5ec;
        width: 16px;
        height: 16px;
        border-radius: 100%;
        margin: 0 10px -2px 0;
    }

    .passRecode i.highlight {
        background: #3ecb63
    }

    .itemOptHistory {
        height: 160px;
        padding: 0 20px;
        background: #ffffff;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
        border-radius: 2px;
        top: 32px;
        left: -180px;
        z-index: 10;
        overflow-y: auto;
    }

    .itemOptHistory:before {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        /* 左边框的宽 */
        border-right: 10px solid transparent;
        /* 右边框的宽 */
        border-bottom: 10px solid #ffffff;
        /* 下边框的长度|高,以及背景色 */
        font-size: 0;
        line-height: 0;
        content: '';
        position: absolute;
        top: -10px;
        left: 182px;
    }

    .itemOptHistory ul {
        height: 100%;
    }

    ul.approvalHistoryUl {
        width: 100%;
        height: 100%;
        border-left: 1px solid #f5f5f5;
        padding-top: 30px;
    }

    ul.approvalHistoryUl li {
        margin-bottom: 20px;
        border-left: 1px solid #f5f5f5;
    }

    .approvalHistoryUlTime {
        margin-left: -6px;
        margin-bottom: 10px;
    }

    .approvalHistoryUlTime div {
        background: #d4dce3;
        width: 11px;
        height: 11px;
        border-radius: 100%;
        display: inline-block;
        margin-right: 20px;
    }

    ul.approvalHistoryUl li:first-child .approvalHistoryUlTime div {
        background: #ff5f7a;
    }

    .humanIcon {
        vertical-align: sub;
        margin-right: 10px;
        color: #ff5f7a;
        font-size: 18px
    }

    .showHistory {
        position: relative;
        cursor: pointer;
        width: 24px;
        height: 24px;
        display: inline-block;
        vertical-align: middle;
        background: url(../../assets/reportIcon/ic_showList.png);
        background-size: 100% 100%;
    }

    .el-tooltip.el-button--text:hover .showHistory {
        background: url(../../assets/reportIcon/ic_showList_hl.png);
        background-size: 100% 100%;
    }
</style>
<style>
    .approveToolTip {
        width: 360px;
        padding: 0;
    }

    .approveToolTip.el-tooltip__popper.is-light {
        border: none;
    }

    /*.approveToolTip.el-tooltip__popper .popper__arrow, .approveToolTip.el-tooltip__popper .popper__arrow::after {
      display: none;
    }*/
</style>
