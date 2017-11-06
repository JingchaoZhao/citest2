<template>
    <section>
        <form id="hidden-excel-form" method="post" :action="downloadcontractUrl" style="display:none">
            <input name="queryValue" v-if="queryValue" :value="queryValue"/>
            <input name="apartmentName" v-if="filter.apartmentName" :value="filter.apartmentName"/>
            <input name="roomNumber" v-if="filter.roomNumber" :value="filter.roomNumber"/>
            <input name="tenantName" v-if="filter.tenantName" :value="filter.tenantName"/>
            <input name="contractNo" v-if="filter.contractNo" :value="filter.contractNo"/>
            <input name="rentStartTime" v-if="filter.rentStartTime" :value="filter.rentStartTime"/>
            <input name="rentEndTime" v-if="filter.rentEndTime" :value="filter.rentEndTime"/>
            <input name="contractState" v-if="filter.contractState" :value="filter.contractState"/>
            <input name="payPeriod" v-if="filter.payPeriod" :value="filter.payPeriod"/>
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
                    <el-form-item label="合同编号" prop="contractNo">
                        <el-input v-model="filter.contractNo" placeholder="请输入合同编号"></el-input>
                    </el-form-item>
                    <el-form-item label="起租日期" prop="rentStartTime">
                        <el-date-picker type="date" placeholder="请选择合同到期日"
                                        v-model="filter.rentStartTime"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="到期日期" prop="rentEndTime">
                        <el-date-picker type="date" placeholder="请选择合同签署日"
                                        v-model="filter.rentEndTime"></el-date-picker>
                    </el-form-item>
                    <div style="border-bottom:1px solid #e6eaee;width:100%;height:1px;margin-bottom:10px"></div>
                    <el-form-item label="合同状态">
                        <el-checkbox-group v-model="contractStates" style="width:100%; margin-left:-15px">
                            <el-checkbox v-for="item in getContractState" :label="item.key" :key="item.key">{{item.value}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <div style="border-bottom:1px solid #e6eaee;width:100%;height:1px;margin-bottom:10px;clear:both"></div>
                    <el-form-item label="支付方式">
                        <el-checkbox-group v-model="payPeriods" style="width:100%; margin-left:-15px">
                            <el-checkbox v-for="item in getPayPeriod" :key="item.key" :label="item.key">{{item.value}}</el-checkbox>
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
            <span class="title">租房合同</span>
            <el-form :inline="true" class="demo-form-inline query">
                <el-form-item>
                    <el-input v-model="queryValue" placeholder="搜索公寓名、房间编号、合同编号" icon="search"
                              :on-icon-click="handleIconClick"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button  v-bind:class="{active: isFilterSelect || divVisible}"  v-popover:popoverFinanceDetails><i class="fa fa-filter"></i></el-button>
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
            <el-table :data="tableData" :empty-text="loadtext" :stripe="true" :fit="true" style="width:100%">
                <el-table-column prop="apartmentName" label="公寓名" width="240">
                </el-table-column>
                <el-table-column prop="roomNumber" label="房间编号">
                </el-table-column>
                <el-table-column prop="tenantName" label="租客姓名">
                </el-table-column>
                <el-table-column prop="contractNo" label="合同编号" width="160">
                </el-table-column>
                <el-table-column label="合同状态">
                    <template slot-scope="scope">
                        {{scope.row.contractState | contractState}}
                    </template>
                </el-table-column>
                <el-table-column label="起租日期">
                    <template slot-scope="scope">
                        {{scope.row.rentStartTime | dateYYMMDD}}
                    </template>
                </el-table-column>
                <el-table-column label="到期日期">
                    <template slot-scope="scope">
                        {{scope.row.rentEndTime | dateYYMMDD}}
                    </template>
                </el-table-column>
                <el-table-column prop="payDay" label="每期收租日">
                </el-table-column>
                <el-table-column label="付租方式">
                    <template slot-scope="scope">
                        {{scope.row.payPeriod | payPeriod}}
                    </template>
                </el-table-column>
                <el-table-column label="月租金">
                    <template slot-scope="scope">
                        {{scope.row.monthlyAmount | amount2}}
                    </template>
                </el-table-column>
                <el-table-column label="退租方式">
                    <template slot-scope="scope">
                        {{scope.row.checkoutType | checkoutType}}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="showRentalDetailAside(scope.row.contractId)" class="littleTable" type="text"
                                   size="small"> 查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <!--分页-->
        <el-col :span="24" style="margin-top:10px">
            <el-pagination @current-change="handleCurrentChange" :current-page="pageIndex"
                           :page-size="pageSize" layout="prev,pager,next,jumper" :total="pageTotal"
                           style="text-align: center"></el-pagination>
        </el-col>
        <rentalDetailAside ref="rentalAside"></rentalDetailAside>
    </section>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import constants from '../../constants/index'
    import NProgress from 'nprogress'
    import rentalDetailAside from '../subComponents/rentalDetailAside'
    export default {
        data() {
            return {
                downloadcontractUrl: this.$api.downloadcontractUrl,
                divVisible: false,
                btnLoading: false,
                apartments: null,
                //
                queryValue: '',
                filter: {
                    apartmentName: '',
                    roomNumber: '',
                    tenantName: '',
                    contractNo: '',
                    rentStartTime: '',
                    rentEndTime: '',
                    contractState: '',
                    payPeriod: ''
                },
                contractStates: [],
                payPeriods: [],
                //
                pageIndex: 1,
                pageSize: 20,
                pageTotal: 0,
                //
                loadtext: "加载中...",
                request: null,
                tableData: null,
                isFilterSelect: false
            }
        },
        methods: {
            doFilter: function () {
                this.isFilterSelect = true;
                this.queryValue = '';
                var rentStartTime = (!(this.filter.rentStartTime instanceof Date) ? this.filter.rentStartTime : this.filter.rentStartTime.Format("yyyy-MM-dd"));
                var rentEndTime = (!(this.filter.rentEndTime instanceof Date) ? this.filter.rentEndTime : this.filter.rentEndTime.Format("yyyy-MM-dd"));
                var query = Object.assign(this.filter, {
                    rentStartTime: rentStartTime,
                    rentEndTime: rentEndTime,
                    contractState: this.contractStates.join(','),
                    payPeriod: this.payPeriods.join(',')
                });
                this.queryContracts(query);
                this.btnLoading = true;
            },
            handleXls: function () {
                //alert("handleXls");
                document.getElementById("hidden-excel-form").submit();
            },
            handleRefresh: function () {
                this.refreshContracts(this.request);
            },
            handleIconClick: function () {
                this.isFilterSelect = false;
                this.$refs['filter'].resetFields();
                this.contractStates = [];
                this.payPeriods = [];
                var request = {
                    queryValue: this.queryValue
                };
                this.queryContracts(request);
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.queryContracts(this.request);
            },
            queryContracts: function (query) {
                var data = Object.assign({
                    pageIndex: (this.pageIndex - 1),
                    pageSize: this.pageSize,
                    orderCategory: this.orderCategory
                }, query);
                var that = this;
                this.$api.post(constants.KCURLS.GETCONTRACTS, data, function (res) {
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
                this.contractStates = [];
                this.payPeriods = [];
                this.$refs['filter'].resetFields();
                this.queryContracts({});
                this.divVisible = false;
            },
            showRentalDetailAside: function (val) {
                this.$refs.rentalAside.openRight(val);
            },
            refreshContracts(query) {
                var data = Object.assign({
                    pageIndex: (this.pageIndex - 1),
                    pageSize: this.pageSize,
                    orderCategory: this.orderCategory
                }, query);
                var that = this;
                this.$api.post(constants.KCURLS.REFRESHCONTRACTS, data, function (res) {
                    if (res.data.length == 0) {
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
            this.queryContracts({});
            this.getApartments();
        },
        components: {
            rentalDetailAside
        },
        computed: {
            ...mapGetters([
                'getContractState',
                'getPayPeriod'
            ])
        }
    }
</script>