<template>
    <section>
        <form id="hidden-excel-form" method="post" :action="downloadorderUrl" style="display:none">
            <input name="orderCategory" :value="orderCategory"/>
            <input name="queryValue" v-if="queryValue" :value="queryValue"/>
            <input name="apartmentName" v-if="filter.apartmentName" :value="filter.apartmentName"/>
            <input name="roomNumber" v-if="filter.roomNumber" :value="filter.roomNumber"/>
            <input name="tenantName" v-if="filter.tenantName" :value="filter.tenantName"/>
            <input name="paymentStartTime" v-if="filter.paymentStartTime" :value="filter.paymentStartTime"/>
            <input name="paymentEndTime" v-if="filter.paymentEndTime" :value="filter.paymentEndTime"/>
            <input name="orderType" v-if="filter.orderType" :value="filter.orderType"/>
            <input name="orderState" v-if="filter.orderState" :value="filter.orderState"/>
            <input name="orderModel" v-if="filter.orderModel" :value="filter.orderModel"/>
        </form>
        <el-col :span="24">
            <el-popover style="padding:0" ref="popoverBill" placement="bottom-end" width="600"
                        v-model="divVisible">
                <el-form class="queryPopoverForm" :model="filter" ref="filter" label-position="left"
                         label-width="100px">
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
                    <el-form-item label="应付日期">
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
                    <el-form-item label="账单类型" style="margin-bottom:0px">
                        <div style="color:#8c96ab;" v-bind:class="{active: toggleType == 1}" @click="toggleOrderType">
                            <span v-show="toggleType == 0">展开</span>
                            <span v-show="toggleType == 1">收起</span>
                            <div class="circle-triangle-down">
                                <div class="triangle-down"></div>
                            </div>
                        </div>
                        <el-checkbox-group v-show="toggleType == 1" v-model="orderTypes"
                                           style="width:auto; margin-left: -100px;">
                            <el-col :span="6" v-for="item in getOrderType" :key="item.key">
                                <el-checkbox style="margin: 0;" :label="item.key">{{item.value}}</el-checkbox>
                            </el-col>
                        </el-checkbox-group>
                    </el-form-item>

                    <div style="border-bottom:1px solid #e6eaee;width:100%;height:20px;margin-bottom:10px;clear:both"></div>
                    <el-form-item label="账单状态">
                        <el-checkbox-group v-model="orderStates" style="width:100%; margin-left:-15px">
                            <el-checkbox v-for="item in getOrderState" :label="item.key" :key="item.key">{{item.value}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="分期状态">
                        <el-checkbox-group v-model="disposedStates" style="width:100%; margin-left:-15px">
                            <el-checkbox v-for="item in disposedStatesItems" :label="item.key" :key="item.key">{{item.value}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
                <div style="text-align: right; margin: 0">
                    <el-button @click="hideFilter">重置</el-button>
                    <el-button type="primary" @click="doFilter" class="greenBtn" :loading="btnLoading">确定</el-button>
                </div>
            </el-popover>
        </el-col>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-tabs v-model="orderCategory" @tab-click="tabToggleType">
                <el-tab-pane label="收款账单（收入）" name="In"></el-tab-pane>
                <el-tab-pane label="付款账单（支出）" name="Out"></el-tab-pane>
            </el-tabs>
            <el-form :inline="true" class="demo-form-inline query">
                <el-form-item>
                    <el-input v-model="queryValue" placeholder="搜索公寓名、房间编号、合同编号" icon="search"
                              :on-icon-click="handleIconClick"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button v-popover:popoverBill v-bind:class="{active: isFilterSelect || divVisible}"><i class="bf_icon_sx"></i></el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleXls"><i class="bf_icon_download"></i></el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleRefresh"><i class="bf_icon_refresh"></i></el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-col :span="24" class="listbox">
            <el-table :data="tableData" :empty-text="loadtext" :stripe="true" style="width:100%" v-if="toggleType==0">
                <el-table-column prop="apartmentName" label="公寓名" width="220">
                </el-table-column>
                <el-table-column prop="roomNumber" label="房间编号">
                </el-table-column>
                <el-table-column prop="payeeDraweeRealName" label="租客姓名">
                </el-table-column>
                <el-table-column prop="contractNo" label="合同编号" width="150">
                </el-table-column>
                <el-table-column label="账单类型">
                    <template slot-scope="scope">
                        {{scope.row.orderType | orderType}}
                    </template>
                </el-table-column>
                <el-table-column label="账单金额">
                    <template slot-scope="scope">
                        {{scope.row.totalAmount | amount2}}
                    </template>
                </el-table-column>
                <el-table-column label="账单周期" width="200">
                    <template slot-scope="scope">
                        {{scope.row.orderStartTime | dateTirm10}}~{{scope.row.orderEndTime | dateTirm10}}
                    </template>
                </el-table-column>
                <el-table-column label="账单状态">
                    <template slot-scope="scope">
                        {{scope.row.orderState | orderStateForApart}}
                    </template>
                </el-table-column>
                <el-table-column label="应收款日">
                    <template slot-scope="scope">
                        {{scope.row.paymentTime | dateTirm10}}
                    </template>
                </el-table-column>
                <el-table-column label="实收款日">
                    <template slot-scope="scope">
                        {{scope.row.actualPaymentTime | dateTirm10}}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="showBillDetailAside(scope.row)" class="littleTable" type="text" size="small">
                            查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="tableData" :empty-text="loadtext" :stripe="true" style="width:100%" v-if="toggleType==1">
                <el-table-column prop="apartmentName" label="公寓名" width="220">
                </el-table-column>
                <el-table-column prop="roomNumber" label="房间编号">
                </el-table-column>
                <el-table-column prop="payeeDraweeRealName" label="租客姓名">
                </el-table-column>
                <el-table-column prop="contractNo" label="合同编号" width="150">
                </el-table-column>
                <el-table-column label="账单类型">
                    <template slot-scope="scope">
                        {{scope.row.orderType | orderType}}
                    </template>
                </el-table-column>
                <el-table-column label="账单金额">
                    <template slot-scope="scope">
                        {{scope.row.totalAmount | amount2}}
                    </template>
                </el-table-column>
                <el-table-column label="账单周期" width="200">
                    <template slot-scope="scope">
                        {{scope.row.orderStartTime | dateTirm10}}~{{scope.row.orderEndTime | dateTirm10}}
                    </template>
                </el-table-column>
                <el-table-column label="账单状态">
                    <template slot-scope="scope">
                        {{scope.row.orderState | orderStateForApart}}
                    </template>
                </el-table-column>
                <el-table-column label="应收款日">
                    <template slot-scope="scope">
                        {{scope.row.paymentTime | dateTirm10}}
                    </template>
                </el-table-column>
                <el-table-column label="实收款日">
                    <template slot-scope="scope">
                        {{scope.row.actualPaymentTime | dateTirm10}}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="showBillDetailAside(scope.row)" class="littleTable" type="text" size="small">
                            查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <!--分页-->
        <el-col :span="24" style="margin-top:10px">
            <el-pagination @current-change="handleCurrentChange" :page-size="pageSize"
                           :total="pageTotal" :current-page="pageIndex"
                           layout="prev,pager,next,jumper" style="text-align: center"></el-pagination>
        </el-col>
        <billDetailAside ref="billAside"></billDetailAside>
    </section>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    import NProgress from 'nprogress'
    import billDetailAside from '../subComponents/billDetailAside'
    import constants from '../../constants/index'
    import util from '../../common/util'
    import commonData from '../../common/data'
    export default {
        data() {
            return {
                downloadorderUrl: this.$api.downloadorderUrl,
                currentOrder: null,
                divVisible: false,
                btnLoading: false,
                toggleType: 0,
                apartments: null,
                //
                orderCategory: "In",
                queryValue: '',
                filter: {
                    apartmentName: '',
                    roomNumber: '',
                    tenantName: '',
                    paymentStartTime: '',
                    paymentEndTime: '',
                    orderType: '',
                    orderState: '',
                    orderModel: ''
                },
                orderTypes: [],
                orderStates: [],
                disposedStatesItems: [{
                        key: "Staging",
                        value: '已分期'
                    }, {
                        key: "Normal",
                        value: '未分期'
                    }
                ],
                disposedStates: [],
                //
                pageIndex: 1,
                pageSize: 20,
                pageTotal: 0,
                //
                loadtext: "加载中...",
                request: null,
                tableData: null,
                isFilterSelect: false
            };
        },
        methods: {
            doFilter: function () {
                this.isFilterSelect = true;
                this.queryValue = '';
                var paymentStartTime = (!(this.filter.paymentStartTime instanceof Date) ? this.filter.paymentStartTime : this.filter.paymentStartTime.Format("yyyy-MM-dd"));
                var paymentEndTime = (!(this.filter.paymentEndTime instanceof Date) ? this.filter.paymentEndTime : this.filter.paymentEndTime.Format("yyyy-MM-dd"));
                var query = Object.assign(this.filter, {
                    paymentStartTime: paymentStartTime,
                    paymentEndTime: paymentEndTime,
                    orderType: this.orderTypes.join(','),
                    orderState: this.orderStates.join(','),
                    orderModel: this.disposedStates.join(',')
                });
                // if (this.disposedStates.length == 1) {
                //     if (this.disposedStates[0] == 'Staging') {
                //         query.orderModel = 'Staging';
                //     }
                //     else {
                //         query.orderModel = 'Normal';
                //     }
                // }
                // else {
                //     query.orderModel = null;
                // }

                this.queryOrders(query);
                this.btnLoading = true;
            },
            handleXls: function () {
                //alert("handleXls");
                document.getElementById("hidden-excel-form").submit();
            },
            handleRefresh: function () {
                this.refreshOrderInfos(this.request);
            },
            handleIconClick: function () {
                this.isFilterSelect = false;
                this.$refs['filter'].resetFields();
                this.orderTypes = [];
                this.orderStates = [];
                this.disposedStates = [];
                var request = {
                    queryValue: this.queryValue
                };
                this.queryOrders(request);
            },
            handleCurrentChange: function (val) {
                this.pageIndex = val;
                this.queryOrders(this.request);
            },
            tabToggleType: function () {
                this.isFilterSelect = false;
                this.pageIndex = 1;
                this.$refs['filter'].resetFields();
                this.orderTypes = [];
                this.orderStates = [];
                this.disposedStates = [];
                this.queryValue = '';
                this.queryOrders(); // this.request
            },
            showBillDetailAside: function (row) {
                this.currentOrder = row;
                this.$refs.billAside.openRight(row.orderId);
            },
            toggleOrderType: function () {
                this.toggleType = (this.toggleType == 0 ? 1 : 0);
            },
            queryOrders: function (query) {
                var data = Object.assign({
                    pageIndex: (this.pageIndex - 1),
                    pageSize: this.pageSize,
                    orderCategory: this.orderCategory
                }, query);
                var that = this;
                this.$api.post(constants.KCURLS.QUERYORDERINFOS, data, function (res) {
                    if (res.data.length == 0) {
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
            hideFilter: function () {
                this.isFilterSelect = false;
                this.orderTypes = [];
                this.orderStates = [];
                this.disposedStates = [];
                this.$refs['filter'].resetFields();
                this.divVisible = false;
                this.queryOrders({});
            },
            refreshOrderInfos: function (query) {
                var data = Object.assign({
                    pageIndex: (this.pageIndex - 1),
                    pageSize: this.pageSize,
                    orderCategory: this.orderCategory
                }, query);
                var that = this;
                this.$api.post(constants.KCURLS.REFRESHORDERINFOS, data, function (res) {
                    if (res.data.length == 0) {
                        that.loadtext = "暂无数据";
                    }
                    that.pageTotal = res.totalCount;
                    that.tableData = res.data;
                    that.request = query;
                }, err => {
                    that.loadtext = "加载失败";
                });
            },
        },
        created: function () {
            this.queryOrders({});
            this.getApartments();
        },
        components: {
            billDetailAside
        },
        watch: {},
        computed: {
            ...mapGetters([
                'getOrderType',
                'getOrderState'
            ])
        }
    }
</script>
<style scoped>
    .query {
        margin-top: -72px;
    }
</style>
