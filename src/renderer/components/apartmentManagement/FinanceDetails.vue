<template>
    <section>
         <form id="hidden-excel-form" method="post" :action="downloadorderUrl" style="display:none">
            <input name="queryValue" v-if="queryValue" :value="queryValue"/>
            <input name="transactionCategory" v-if="filter.transactionCategory" :value="filter.transactionCategory"/>
            <input name="apartmentName" v-if="filter.apartmentName" :value="filter.apartmentName"/>
            <input name="roomNumber" v-if="filter.roomNumber" :value="filter.roomNumber"/>
            <input name="tenantName" v-if="filter.tenantName" :value="filter.tenantName"/>
            <input name="paymentStartTime" v-if="filter.paymentStartTime" :value="filter.paymentStartTime"/>
            <input name="paymentEndTime" v-if="filter.paymentEndTime" :value="filter.paymentEndTime"/>
            <input name="transactionType" v-if="filter.transactionType" :value="filter.transactionType"/>
            <input name="transactionMethod " v-if="filter.transactionMethod " :value="filter.transactionMethod"/>
        </form>
        <el-col :span="24">
            <el-popover ref="popoverFinanceDetails" placement="bottom-end" width="600" v-model="divVisible">
                <el-form :model="filter" label-position="left" class="queryPopoverForm " label-width="100px"
                         ref="filter">
                    <el-form-item label="公寓名称" prop="apartmentName">
                        <el-select :clearable="true" v-model="filter.apartmentName" placeholder="请选择公寓名称">
                            <el-option v-for="item in apartments" :label="item.apartmentName" :key="item.apartmentName"
                                       :value="item.apartmentName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="房间编号" prop="roomNumber">
                        <el-input v-model="filter.roomNumber" placeholder="请输入房间编号"></el-input>
                    </el-form-item>
                    <el-form-item label="租客姓名" prop="tenantName">
                        <el-input v-model="filter.tenantName" placeholder="请输入租客姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="流水日期">
                        <el-col :span="11">
                            <el-form-item prop="paymentStartTime">
                                <el-date-picker type="date" placeholder="请选择开始日期"
                                                v-model="filter.paymentStartTime"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">&nbsp;&nbsp;</el-col>
                        <el-col :span="11">
                            <el-form-item prop="paymentEndTime">
                                <el-date-picker type="date" placeholder="请选择结束日期"
                                                v-model="filter.paymentEndTime"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <div style="border-bottom:1px solid #e6eaee;width:100%;height:1px;margin-bottom:10px"></div>
                    <el-form-item label="流水类型" style="margin-bottom:0px">
                        <div style="color:#8c96ab;" v-bind:class="{active: toggleType == 1}" @click="toggleTypeBtn">
                            <span v-show="toggleType == 0">展开</span>
                            <span v-show="toggleType == 1">收起</span>
                            <div class="circle-triangle-down">
                                <div class="triangle-down"></div>
                            </div>
                        </div>
                        <el-checkbox-group v-show="toggleType == 1" v-model="transactionTypes"
                                           style="width:auto; margin-left: -100px;">
                            <el-col :span="6" v-for="item in getOrderType" :key="item.key">
                                <el-checkbox style="margin: 0;" :label="item.key">{{item.value}}</el-checkbox>
                            </el-col>
                        </el-checkbox-group>
                    </el-form-item>
                    <div style="border-bottom:1px solid #e6eaee;width:100%;height:20px;margin-bottom:10px;clear:both"></div>
                    <el-form-item label="流水类别">
                        <el-checkbox-group v-model="transactionCategorys" style="width:100%; margin-left:-15px">
                            <el-checkbox label="In">收入</el-checkbox>
                            <el-checkbox label="Out">支出</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <div style="border-bottom:1px solid #e6eaee;width:100%;height:1px; margin-bottom: 10px;"></div>
                    <el-form-item label="流水方式">
                        <el-checkbox-group v-model="transactionMethods" style="width:100%; margin-left:-15px">
                            <el-checkbox v-for="item in getTransactionType" :key="item.key" :label="item.key">{{item.value}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
                <div style="text-align: right; margin: 0">
                    <el-button @click="hideFilter">重置</el-button>
                    <el-button type="primary" @click="doFilter" class="greenBtn" :loading="btnLoading">确定
                    </el-button>
                </div>
            </el-popover>
        </el-col>
        <el-col :span="24" class="toolbar">
            <span class="title">财务流水</span>
            <el-form :inline="true" class="demo-form-inline query">
                <el-form-item>
                    <el-input v-model="queryValue" placeholder="搜索公寓名、房间编号、合同编号" icon="search"
                              :on-icon-click="handleIconClick"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button v-bind:class="{active: isFilterSelect || divVisible}" v-popover:popoverFinanceDetails><i class="fa fa-filter"></i></el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleXls"><i class="bf_icon_download"></i></el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleRefresh"><i class="bf_icon_refresh"></i></el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24" class="listbox">
            <el-table :data="tableData" :empty-text="loadtext" :stripe="true" :fit="true" style="width:100%">
                <el-table-column prop="apartmentName" label="公寓名" width="220">
                </el-table-column>
                <el-table-column prop="roomNumber" label="房间编号">
                </el-table-column>
                <el-table-column prop="payeeDraweeRealName" label="租客姓名">
                </el-table-column>
                <el-table-column prop="contractNo" label="合同编号">
                </el-table-column>
                <el-table-column label="流水金额">
                    <template slot-scope="scope">
                        {{scope.row.amount | amount2}}
                    </template>
                </el-table-column>
                <el-table-column label="流水类别">
                    <template slot-scope="scope">
                        {{scope.row.transactionCategory | transactionCategory}}
                    </template>
                </el-table-column>
                <el-table-column label="流水类型">
                    <template slot-scope="scope">
                        {{scope.row.transactionType | orderType}}
                    </template>
                </el-table-column>
                <el-table-column label="流水方式">
                    <template slot-scope="scope">
                        {{scope.row.transactionMethod | transactionMethod}}
                    </template>
                </el-table-column>
                <el-table-column label="流水日期">
                    <template slot-scope="scope">
                        {{scope.row.actualPaymentTime | dateTirm10}}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button class="littleTable" @click="showFinanceDetailAside(scope.$index)" type="text"
                                   size="small">查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="24" style="margin-top:10px">
            <el-pagination @current-change="handleCurrentChange" :current-page="pageIndex"
                           :page-size="pageSize" layout="prev,pager,next,jumper" :total="pageTotal"
                           style="text-align: center"></el-pagination>
        </el-col>
        <fnanceDetailsAside ref="fnanceAside"></fnanceDetailsAside>
    </section> 
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import constants from '../../constants/index'
    import util from '../../common/util'
    import NProgress from 'nprogress'
    import commonData from '../../common/data'
    import fnanceDetailsAside from '../subComponents/fnanceDetailsAside'
    export default {
        data() {
            return {
                downloadorderUrl: this.$api.downloadtransactionsUrl,
                toggleType: 0,
                apartments: null,
                divVisible: false,
                btnLoading: false,
                //
                queryValue: "",
                //
                filter: {
                    transactionCategory: '',
                    apartmentName: '',
                    roomNumber: '',
                    tenantName: '',
                    paymentStartTime: '',
                    paymentEndTime: '',
                    transactionType: '',
                    transactionMethod: ''
                },
                transactionCategorys: [],
                transactionTypes: [],
                transactionMethods: [],
                pageIndex: 1,
                pageSize: 20,
                pageTotal: 0,
                loadtext: "加载中...",
                request: null,
                tableData: null,
                isFilterSelect: false
            }
        },
        methods: {
            showFinanceDetailAside(val) {
                this.$refs.fnanceAside.openRight(this.tableData[val]);
            },
            doFilter: function () {
                this.isFilterSelect = true;
                this.queryValue = '';
                var paymentStartTime = (!(this.filter.paymentStartTime instanceof Date) ? this.filter.paymentStartTime : this.filter.paymentStartTime.Format("yyyy-MM-dd"));
                var paymentEndTime = (!(this.filter.paymentEndTime instanceof Date) ? this.filter.paymentEndTime : this.filter.paymentEndTime.Format("yyyy-MM-dd"));
                var query = Object.assign(this.filter, {
                    paymentStartTime: paymentStartTime,
                    paymentEndTime: paymentEndTime,
                    transactionType: this.transactionTypes.join(','),
                    transactionMethod: this.transactionMethods.join(','),
                    transactionCategory: this.transactionCategorys.join(',')
                });
                this.queryTransactionInfos(query);
                this.btnLoading = true;
            },
            handleXls: function () {
                document.getElementById("hidden-excel-form").submit();
            },
            handleRefresh: function () {
                this.refreshransactionInfos(this.request);
            },
            handleIconClick: function () {
                this.isFilterSelect = false;
                this.$refs['filter'].resetFields();
                this.transactionTypes = [];
                this.transactionMethods = [];
                this.transactionCategorys = [];
                var request = {
                    queryValue: this.queryValue
                };
                this.queryTransactionInfos(request);
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.queryTransactionInfos(this.request);
            },
            queryTransactionInfos: function (query) {
                var that = this;
                var data = Object.assign({
                    pageIndex: (this.pageIndex - 1),
                    pageSize: this.pageSize,
                    orderCategory: this.orderCategory
                }, query);
                this.$api.post(constants.KCURLS.QUERYTRANSACTIONINFOS, data, function (res) {
                    if (res.data.length === 0) {
                        that.loadtext = "暂无数据";
                    }
                    that.pageTotal = res.totalCount;
                    that.tableData = res.data;
                    that.request = query;
                    that.btnLoading = false;
                    that.divVisible = false;
                }, err => {
                    that.btnLoading = false;
                    that.divVisible = false;
                    that.loadtext = "加载失败";
                });
            },
            getApartments: function () {
                var that = this;
                this.$api.get(constants.KCURLS.GETAPARTMENTS, function (res) {
                    that.apartments = res;
                });
            },
            toggleTypeBtn: function () {
                this.toggleType = this.toggleType == 0 ? 1 : 0;
            },
            hideFilter: function () {
                this.isFilterSelect = false;
                this.transactionTypes = [];
                this.transactionMethods = [];
                this.transactionCategorys = [];
                this.$refs['filter'].resetFields();
                this.queryTransactionInfos({});
                this.divVisible = false;
            },
            refreshransactionInfos(query) {
                var that = this;
                var data = Object.assign({
                    pageIndex: (this.pageIndex - 1),
                    pageSize: this.pageSize,
                    orderCategory: this.orderCategory
                }, query);
                this.$api.post(constants.KCURLS.REFRESHRANSACTIONINFOS, data, function (res) {
                    if (res.data.length === 0) {
                        that.loadtext = "暂无数据";
                    }
                    that.pageTotal = res.totalCount;
                    that.tableData = res.data;
                    that.request = query;
                }, err => {
                    that.loadtext = "加载失败";
                });
            }
        },
        created: function () {
            this.queryTransactionInfos({});
            this.getApartments();
        },
        components: {
            fnanceDetailsAside
        },
        computed: {
            ...mapGetters([
                'getOrderType',
                'getTransactionType'
            ])
        }
    }
</script>
