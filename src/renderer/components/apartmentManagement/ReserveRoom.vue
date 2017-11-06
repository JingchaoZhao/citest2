<template>
    <section>
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
                    <el-form-item label="联系方式" prop="tenantCellphone">
                        <el-input v-model="filter.tenantCellphone" placeholder="请输入联系方式"></el-input>
                    </el-form-item>
                    <div style="border-bottom:1px solid #e6eaee;width:100%;height:1px;margin-bottom:10px"></div>
                    <el-form-item label="预定状态">
                        <el-checkbox-group v-model="reservationStates" style="width:100%; margin-left:-15px">
                            <el-checkbox v-for="item in getReservationState" :key="item.key" :label="item.key">{{item.value}}
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
            <span class="title">房间预定</span>
            <el-form :inline="true" class="demo-form-inline query">
                <el-form-item>
                    <el-input v-model="queryValue" placeholder="搜索公寓名、房间编号、姓名或手机号" icon="search"
                              :on-icon-click="handleIconClick"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button  v-bind:class="{active: isFilterSelect || divVisible}" v-popover:popoverFinanceDetails><i class="fa fa-filter"></i></el-button>
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
                <el-table-column prop="tenantName" label="租客姓名">
                </el-table-column>
                <el-table-column prop="tenantCellphone" label="联系方式">
                </el-table-column>
                <el-table-column prop="roomNumber" label="房间编号">
                </el-table-column>
                <el-table-column label="入住日期">
                    <template slot-scope="scope">{{scope.row.checkInTime | dateTirm10}}</template>
                </el-table-column>
                <el-table-column label="定金总额">
                    <template slot-scope="scope">{{scope.row.depositeAmount | amount2}}</template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">{{scope.row.reservationState | reservationState}}</template>
                </el-table-column>
                <el-table-column label="应收款日">
                    <template slot-scope="scope">{{scope.row.paymentTime | dateTirm10}}</template>
                </el-table-column>
                <el-table-column label="实收款日">
                    <template slot-scope="scope">{{scope.row.actualPaymentTime | dateTirm10}}</template>
                </el-table-column>
                <el-table-column prop="contractNo" label="合同编号">
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
        <el-col :span="24" style="margin-top:10px">
            <el-pagination @current-change="handleCurrentChange" :current-page="pageIndex"
                           :page-size="pageSize" layout="prev,pager,next,jumper" :total="pageTotal"
                           style="text-align: center"></el-pagination>
        </el-col>
        <roomReserveDetailAside ref="roomReserveAside"></roomReserveDetailAside>
    </section>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import util from '../../common/util'
    import constants from '../../constants/index'
    import NProgress from 'nprogress'
    import commonData from '../../common/data'
    import roomReserveDetailAside from '../subComponents/roomReserveDetailAside'
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
                    tenantCellphone: '',
                    reservationState: ''
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
                var query = Object.assign(this.filter, {
                    reservationState: this.reservationStates.join(',')
                });
                this.queryReservations(query);
                this.btnLoading = true;
            },
            handleXls: function () {
                alert("handleXls");
            },
            handleRefresh: function () {
                this.refreshReservationInfos(this.request);
            },
            handleIconClick: function () {
                this.isFilterSelect = false;
                this.$refs['filter'].resetFields();
                this.reservationStates = [];
                var request = {
                    queryValue: this.queryValue
                };
                this.queryReservations(request);
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.queryReservations(this.request);
            },
            showRentalDetailAside: function (val) {
                this.$refs.roomReserveAside.openRight(this.tableData[val]);
            },
            queryReservations: function (query) {
                var data = Object.assign({
                    pageIndex: (this.pageIndex - 1),
                    pageSize: this.pageSize
                }, query);
                var that = this;
                this.$api.post(constants.KCURLS.QUERYRESERVATIONS, data, function (res) {
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
                this.reservationStates = [];
                this.$refs['filter'].resetFields();
                this.queryReservations({});
                this.divVisible = false;
            },
            refreshReservationInfos: function (query) {
                var data = Object.assign({
                    pageIndex: (this.pageIndex - 1),
                    pageSize: this.pageSize
                }, query);
                var that = this;
                this.$api.post(constants.KCURLS.REFRESHRESERVATIONINFOS, data, function (res) {
                    if (res.data.length == 0) {
                        that.loadtext = '暂无数据';
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
            this.queryReservations({});
            this.getApartments();
        },
        components: {
            roomReserveDetailAside
        },
        computed: {
            ...mapGetters([
                'getReservationState'
            ])
        }
    }
</script>
