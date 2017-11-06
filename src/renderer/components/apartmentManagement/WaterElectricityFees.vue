<template>
<section>
        <el-col :span="24">
            <el-popover ref="popoverFinanceDetails" placement="bottom-end" width="600" v-model="divVisible">
                <el-form :model="filter" label-position="left" class="queryPopoverForm " label-width="100px"
                         ref="filter">
                    <el-form-item label="公寓名称" prop="apartmentName">
                        <el-select :clearable="true" v-model="filter.apartmentName" placeholder="请选择公寓名称">
                            <el-option v-for="item in apartments" :label="item.apartmentName"
                                       :value="item.apartmentName" :key="item.apartmentName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="房间编号" prop="roomNumber">
                        <el-input v-model="filter.roomNumber" placeholder="请输入房间编号"></el-input>
                    </el-form-item>
                    <el-form-item label="租客姓名" prop="tenantName">
                        <el-input v-model="filter.tenantName" placeholder="请输入租客姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="tenantCellphone">
                        <el-input v-model="filter.tenantCellphone" placeholder="请输入联系方式"></el-input>
                    </el-form-item>
                    <div style="border-bottom:1px solid #e6eaee;width:100%;height:1px;margin-bottom:10px"></div>
                    <el-form-item label="水电类型" prop="utilitiesExpenseType">
                        <el-checkbox-group v-model="filter.utilitiesExpenseType" style="width:100%; margin-left:-15px">
                            <el-checkbox v-for="item in getUtilitiesExpenseType" :label="item.key" :key="item.key">{{item.value}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="缴费方式" prop="chargingType">
                        <el-checkbox-group v-model="filter.chargingType" style="width:100%; margin-left:-15px">
                            <el-checkbox v-for="item in getChargingType" :label="item.key" :key="item.key">{{item.value}}
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
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <span class="title">水电信息</span>
            <el-form :inline="true" class="demo-form-inline query">
                <el-form-item>
                    <el-input v-model="queryValue" placeholder="搜索公寓名、房间编号、姓名或手机号" icon="search"
                              :on-icon-click="handleIconClick"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button v-bind:class="{active: isFilterSelect || divVisible}" v-popover:popoverFinanceDetails><i class="fa fa-filter"></i></el-button>
                </el-form-item>
                <el-form-item style="display:none">
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
                <el-table-column prop="apartmentName" label="公寓名" width="220">
                </el-table-column>
                <el-table-column prop="roomNumber" label="房间编号">
                </el-table-column>
                <el-table-column prop="tenantName" label="租客姓名">
                </el-table-column>
                <el-table-column prop="" label="类型">
                    <template slot-scope="scope">{{scope.row.utilitiesExpenseType | utilitiesExpenseType}}({{scope.row.chargingType | chargingType}})</template>
                </el-table-column>
                <el-table-column label="上次抄表日">
                    <template slot-scope="scope"><span v-if="scope.row.chargingType != 'Fixed'" >{{scope.row.lastTime | dateTirm10}}</span></template>
                </el-table-column>
                <el-table-column label="上次抄表数">
                    <template slot-scope="scope"><span v-if="scope.row.chargingType != 'Fixed'" >{{scope.row.lastRecord}}</span></template>
                </el-table-column>
                <el-table-column label="本次抄表日">
                    <template slot-scope="scope"><span v-if="scope.row.chargingType != 'Fixed'" >{{scope.row.currentTime | dateTirm10}}</span></template>
                </el-table-column>
                <el-table-column label="本次抄表数">
                    <template slot-scope="scope"><span v-if="scope.row.chargingType != 'Fixed'" >{{scope.row.currentRecord}}</span></template>
                </el-table-column>
                <el-table-column label="单价">
                    <template slot-scope="scope"><span v-if="scope.row.chargingType != 'Fixed'" >{{scope.row.unitPrice | amount2}}</span></template>
                </el-table-column>
                <el-table-column prop="" label="总价">
                    <template slot-scope="scope">{{scope.row.totalAmount | amount2}}</template>
                </el-table-column>
                <el-table-column prop="" label="应付款日期">
                    <template slot-scope="scope">{{scope.row.paymentTime | dateTirm10}}</template>
                </el-table-column>
                <el-table-column prop="" label="实付款日期">
                    <template slot-scope="scope">{{scope.row.actualPaymentTime | dateTirm10}}</template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button class="littleTable" @click="showRentalDetailAside(scope.$index)" type="text"
                                   size="small">查看
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
        <hydropowerDetailAside ref="hydropower"></hydropowerDetailAside>
    </section>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import util from '../../common/util'
import constants from '../../constants/index'
import NProgress from 'nprogress'
import commonData from '../../common/data'
import hydropowerDetailAside from '../subComponents/hydropowerDetailAside'
export default {
    data() {
        return {
            divVisible: false,
            btnLoading: false,
            apartments: null,
            //
            queryValue: "",
            filter: {
                apartmentName: '',
                roomNumber: '',
                tenantName: '',
                paymentTime: null,

                utilitiesExpenseType: [],
                chargingType: []
            },
            reservationStates: [],
            //
            pageIndex: 1,
            pageSize: 20,
            pageTotal: 0,
            //
            loadtext: '加载中...',
            request: null,
            tableData: null,
            isFilterSelect: false
        }
    },
    methods: {
        doFilter: function () {
            this.isFilterSelect = true;
            this.queryValue = '';
            var params = {
                apartmentName: this.filter.apartmentName,
                roomNumber: this.filter.roomNumber,
                tenantName: this.filter.tenantName,
                utilitiesExpenseType: this.filter.utilitiesExpenseType.join(','),
                chargingType: this.filter.chargingType.join(','),
            };
            this.queryUtilitiesExpenses(params);
            this.btnLoading = true;
        },
        handleXls: function () {
            alert("handleXls");
        },
        handleRefresh: function () {
            this.refreshUtilitiesExpenses(this.request);
        },
        handleIconClick: function () {
            this.isFilterSelect = false;
            this.$refs['filter'].resetFields();
            this.reservationStates = [];
            var request = {
                queryValue: this.queryValue
            };
            this.queryUtilitiesExpenses(request);
        },
        handleCurrentChange(val) {
            this.pageIndex = val;
            this.queryUtilitiesExpenses(this.request);
        },
        showRentalDetailAside: function (val) {
            this.$refs.hydropower.openRight(this.tableData[val]);
        },
        queryUtilitiesExpenses: function (query) {
            var data = Object.assign({
                pageIndex: (this.pageIndex - 1),
                pageSize: this.pageSize
            }, query);
            var that = this;
            this.$api.post(constants.KCURLS.QUERYUTILITIESEXPENSES, data, function (res) {
                if (res.data.length == 0) {
                    that.loadtext = '暂无数据';
                }
                that.pageTotal = res.totalCount;
                that.tableData = res.data;
                that.request = query;
                that.btnLoading = false;
                that.divVisible = false;
            }, err => {
                that.btnLoading = false;
                that.divVisible = false;
                that.loadtext = '加载失败';
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
            this.reservationStates = [];
            this.$refs['filter'].resetFields();
            this.queryUtilitiesExpenses({});
            this.divVisible = false;
        },
        refreshUtilitiesExpenses: function (query) {
            var data = Object.assign({
                pageIndex: (this.pageIndex - 1),
                pageSize: this.pageSize
            }, query);
            var that = this;
            this.$api.post(constants.KCURLS.REFRESHUTILITIESEXPENSES, data, function (res) {
                if (res.data.length == 0) {
                    that.loadtext = '暂无数据';
                }
                that.pageTotal = res.totalCount;
                that.tableData = res.data;
                that.request = query;
            }, err => {
                that.loadtext = '加载失败';
            });
        }
    },
    created: function () {
        this.queryUtilitiesExpenses({});
        this.getApartments();
    },
    components: {
        hydropowerDetailAside
    },
    computed: {
        ...mapGetters([
            'getUtilitiesExpenseType',
            'getChargingType'
        ])
    }
}
</script>
