<template>
    <div>
        <div class="border-radius-4 roomStateLeft">
            <div class="left-float-item apartmentsListDiv">
                <div class="title_apart" style="padding-left:20px;">公寓列表</div>
                <ul class="apartmentsList">
                    <li v-for="(item, index) in apartmentsList" :key="item.apartmentName" v-bind:class="{active: apartmentCurSelected == index}"
                        @click="changeSelectedApart(index)" :title="item.apartmentName + '(' + item.roomCount + ')'">
                        {{item.apartmentName}}（{{item.roomCount}}）
                    </li>
                </ul>
                <p style="cursor: pointer; color: #07bf96; line-height: 40px; text-align:center" @click="openApartDlg()">添加公寓</p>
            </div>
            <div class="left-float-item floorsListDiv">
                <div class="title_apart">楼层</div>
                <ul class="floorsList">
                    <li v-for="(item, index) in floorsList" :key="item.floor" v-show="floorFilter(index)" v-bind:class="{active: floorCurSelected == index}"
                        @click="changeSelectedFloor(index)"><a data-scroll :href="herfList[index]">{{item.floor | floor}}F</a>
                    </li>
                </ul>
                <div class="nonBlockBtn" style="margin-left: 12px; margin-top: 7px; line-height: 30px"
                     @click="openFloorDlg()">+
                </div>
            </div>
        </div>
        <div class="left-float-item border-radius-4 roomStateRight">
            <div style="position: fixed; right: 34px; top: 70px; border-top: 20px solid #f1f2f7; border-bottom: 10px solid #fff; left: 465px;background-color: #fff; z-index: 12; min-width: 830px;">
                <div class="roomStateInnerTop">
                    <div class="roomStateInnerTopPercent roomStateProgress1">
                        <p>入住率: {{(statisticsData.checkInRate * 100).toFixed(0)}}%</p>
                        <el-progress :percentage="statisticsData.checkInRate * 100" :show-text="false"></el-progress>
                    </div>
                    <div class="roomStateInnerTopPercent roomStateProgress2">
                        <p>空置率: {{(statisticsData.vacantRate * 100).toFixed(0)}}%</p>
                        <el-progress :percentage="statisticsData.vacantRate * 100" :show-text="false"></el-progress>
                    </div>
                    <el-input style="float: right; width:298px; height:34px; margin-top: 12px; margin-right: 20px;"
                              placeholder="搜索房间号、租客名" icon="search" v-model="searchBuffer"
                              :on-icon-click="searchHouseList">
                    </el-input>
                </div>
                <div class="roomStateInnerMiddle">
                    <el-row :gutter="10">
                        <el-col style="height: 60px;" :span="4">
                            <div class="quickSelectItem" @click="toggleQuick(1)" v-bind:class="{active: quickIndex == 1}">
                                <p>总房间数</p>
                                <span>{{statisticsData.totalRoomCount}}</span>
                            </div>
                        </el-col>
                        <el-col style="height: 60px;" :span="4">
                            <div class="quickSelectItem" @click="toggleQuick(2)" v-bind:class="{active: quickIndex == 2}">
                                <p>入住房间数</p>
                                <span>{{statisticsData.checkInCount}}</span>
                            </div>
                        </el-col>
                        <el-col style="height: 60px;" :span="4">
                            <div class="quickSelectItem" @click="toggleQuick(3)" v-bind:class="{active: quickIndex == 3}">
                                <p>空置房间数</p>
                                <span>{{statisticsData.vacantCount}}</span>
                            </div>
                        </el-col>
                        <el-col style="height: 60px;" :span="4">
                            <div class="quickSelectItem" @click="toggleQuick(4)" v-bind:class="{active: quickIndex == 4}">
                                <p>预定房间数</p>
                                <span>{{statisticsData.bookedCount}}</span>
                            </div>
                        </el-col>
                        <el-col style="height: 60px;" :span="4">
                            <div class="quickSelectItem" v-bind:class="{active: (quickIndex > 4 && quickIndex < 10)}">
                                <p>{{jinrijiaozhuText}}</p>
                                <span v-if="quickIndex == 6">{{statisticsData.rentCount.overdue}}</span>
                                <span v-else-if="quickIndex == 7">{{statisticsData.rentCount.threeDays}}</span>
                                <span v-else-if="quickIndex == 8">{{statisticsData.rentCount.fiveDays}}</span>
                                <span v-else-if="quickIndex == 9">{{statisticsData.rentCount.sevenDays}}</span>
                                <span v-else>{{statisticsData.rentCount.today}}</span>
                                <div class="triangle-bottomright"></div>
                                <ul>
                                    <li @click="toggleQuick(5)" v-bind:class="{active: quickIndex == 5}">今日应交租 ({{statisticsData.rentCount.today}})</li>
                                    <li @click="toggleQuick(6)" v-bind:class="{active: quickIndex == 6}">逾期未交租 ({{statisticsData.rentCount.overdue}})</li>
                                    <li @click="toggleQuick(7)" v-bind:class="{active: quickIndex == 7}">3天内交租 ({{statisticsData.rentCount.threeDays}})</li>
                                    <li @click="toggleQuick(8)" v-bind:class="{active: quickIndex == 8}">5天内交租 ({{statisticsData.rentCount.fiveDays}})</li>
                                    <li @click="toggleQuick(9)" v-bind:class="{active: quickIndex == 9}">7天内交租 ({{statisticsData.rentCount.sevenDays}})</li>
                                </ul>
                            </div>
                        </el-col>
                        <el-col style="height: 60px;" :span="4">
                            <div class="quickSelectItem quickSelectItem4" v-bind:class="{active: (quickIndex >= 10 && quickIndex <= 13)}">
                                <p>{{hetongdaoqiText}}</p>
                                <!-- <span v-if="quickIndex  == 10">{{statisticsData.contractCount.today}}</span> -->
                                <span v-if="quickIndex == 11">{{statisticsData.contractCount.threeDays}}</span>
                                <span v-else-if="quickIndex == 12">{{statisticsData.contractCount.fiveDays}}</span>
                                <span v-else-if="quickIndex == 13">{{statisticsData.contractCount.sevenDays}}</span>
                                <span v-else>{{statisticsData.contractCount.today}}</span>
                                <div class="triangle-bottomright"></div>
                                <ul>
                                    <li @click="toggleQuick(10)" v-bind:class="{active: quickIndex == 10}">今日合同到期 ({{statisticsData.contractCount.today}})</li>
                                    <li @click="toggleQuick(11)" v-bind:class="{active: quickIndex == 11}">3天内合同到期 ({{statisticsData.contractCount.threeDays}})</li>
                                    <li @click="toggleQuick(12)" v-bind:class="{active: quickIndex == 12}">5天内合同到期 ({{statisticsData.contractCount.fiveDays}})</li>
                                    <li @click="toggleQuick(13)" v-bind:class="{active: quickIndex == 13}">7天内合同到期 ({{statisticsData.contractCount.sevenDays}})</li>
                                </ul>
                            </div>
                        </el-col>
                    </el-row>
                    <div @click="RefreshRoomInfos" class="refresh-btn">
                        <i class="fa fa-repeat"></i>
                    </div>
                </div>
            </div>
            <div style="margin-top: 140px;" class="roomStateInnerBottom">
                <div class="noRoomsDiv" v-show="noRoomFilter()">
                    <img src="~@/assets/noRoomData.png" />
                    <p v-if="!isRoomInfosLoading">暂无该类型房间</p>
                    <p v-else>房间数据加载中...</p>
                </div>
                <div v-for="(item, index) in floorsList" :id="index" :key="item.floor" v-show="floorFilter(index)">
                    <div class="floorTitle">
                        <div class="floorNumber">{{item.floor | floor}}F</div>
                        <div class="floorDistrict"></div>
                        <div @click='deleteFloor(item.floor)' class="deleteFloorBtn">
                            <i class="fa fa-trash"></i>
                        </div>
                    </div>
                    <ul class="roomListUl">
                        <li v-for="(subItem, subIndex) in item.roomInfoResponse" :index="subIndex"
                            v-show="roomFilter(subItem.roomId)"
                            @click="openRight('first', index, subIndex)"
                            v-bind:class="{overdueType: subItem.overdueDay > 0, bookingType: subItem.isBooked, longTermLease: subItem.roomState == 'LongRent', shortTermLease : subItem.roomState == 'ShortRent', dayTermLease: subItem.roomState == 'DailyRent', vacantTermLease: subItem.roomState == 'Vacancy'}"
                            class="overdueType bookingType longTermLease">
                            <div class="roomType"><span class="hoverHiddenItem">{{subItem.roomState | roomState}}</span><span
                                    v-if="subItem.roomState == 'LongRent' || subItem.roomState == 'ShortRent' || subItem.roomState == 'DailyRent'"
                                    class="hoverShowInlineItem">收租日:{{subItem.paymentTime | dateYYMMDD}}</span>
                                <span v-if="subItem.roomState == 'Vacancy'" class="hoverShowInlineItem">已空置{{subItem.vacantDay}}天</span>
                                <div v-if="subItem.isBooked" class="bookingMark">预<div class="triangle-up"></div></div>
                                <div style="background: #ffcc0a" v-bind:class="{marRight5: subItem.isBooked}" v-if="subItem.roomState == 'Vacancy' && subItem.contractId" class="bookingMark">待<div class="triangle-up"></div></div>
                            </div>
                            <p class="roomNo">
                                {{subItem.roomNumber}}
                            </p>
                            <p v-if="subItem.roomState != 'Vacancy' && subItem.overdueDay <= 0" class="roomTenant"><span
                                    class="hoverHiddenItem">{{subItem.tenantName}}</span></p>
                            <p v-if="subItem.roomState == 'Vacancy'" class="roomTenant"><span
                                    class="hoverHiddenItem">已空置<br>{{subItem.vacantDay}}天</span>
                                <span class="hoverShowInlineItem" style="color:#ff6260; font-size: 12px; "></span></p>
                            <p v-if="subItem.overdueDay > 0" class="roomTenant">
                                <span class="hoverHiddenItem">{{subItem.tenantName}}</span>
                                <span class="hoverShowInlineItem"
                                      style="color:#ff6260; font-size: 12px; ">已逾期{{subItem.overdueDay}}天</span></p>
                            <div v-if="subItem.overdueDay > 0" class="overdueMark">已逾期</div>
                            <div class="hoverShowItem collectDebt blockBtn greenBtn"
                                 @click.stop="openRight('third', index, subIndex)">收款
                            </div>
                            <div class="hoverShowItem contractBtn blockBtn greenBtn"
                                 @click.stop="openAddContractDlg(index, subIndex)">签约
                            </div>
                            <div class="hoverShowItem itemOrderBtn blockBtn orangeBtn"
                                 @click.stop="openAddRoomBookingDlg(index, subIndex)">预定
                            </div>
                        </li>
                        <li @click="openHouseDlg(item.floor)">
                            <i class="el-icon-plus" style="line-height:80px; font-size: 20px;"></i>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <roomstatemagaside :roomInfo="currentSelectedRoomForAside" @roomAsideUpdate="asideUpdateFunc"
                           ref="roomStateAside"></roomstatemagaside>
        <addapartmentdlg v-if="openAddApartDlg" :showDialog='openAddApartDlg' @on-result-change="onResultChange"
                         v-on:on-add-success="refreshApartmentInfo"></addapartmentdlg>
        <addfloordlg v-if="openAddFloorDlg" :selectApartment='currentApartment' :showDialog='openAddFloorDlg'
                     @on-result-change="onFloorResultChange" @on-add-success="refreshFloorList"></addfloordlg>
        <addhousedlg v-if="openAddHouseDlg" :showDialog='openAddHouseDlg' :selectApartment='currentApartment'
                     :selectFloor='currentFloor' @on-result-change="onHouseResultChange"
                     @on-add-success="refreshFloorList"></addhousedlg>
        <addcontractdlg :roomInfo="currentSelectedRoom" :showDialog='openContractDlg' v-if="openContractDlg"
                        v-on:on-add-success="contractCreateSuccess"
                        @on-result-change="onContractResultChange"></addcontractdlg>
        <roombookingdlg v-if="openRoomBookingDlg" :selectRoom="currentSelectedRoom" :showDialog='openRoomBookingDlg'
                        @on-result-change="onRoomBookingResultChange" @on-add-success="payForBooking"></roombookingdlg>
        <addgatheringbilldlg v-if="openGatherinBillDlg" :showDialog='openGatherinBillDlg'
                             @on-result-change="onGatherinBillResultChange"></addgatheringbilldlg>
        <collectionDlg v-if="openCollectionDlg" :showDialog="openCollectionDlg" :currentOrderId="curBookingOrderId"
                       @on-result-change="openCollectionDlgChange"></collectionDlg>
    </div>
</template>
<script>
    // import smoothScroll from 'smooth-scroll'
    import addapartmentdlg from '../subComponents/addApartmentDlg'
    import addfloordlg from '../subComponents/addFloorDlg'
    import addhousedlg from '../subComponents/addHouseDlg'
    import collectionDlg from '../subComponents/collectionDlg'
    import addcontractdlg from '../subComponents/addContractDlg'
    import roombookingdlg from '../subComponents/roomBookingDlg'
    import roomstatemagaside from '../subComponents/roomStateMagAside'
    import addgatheringbilldlg from '../subComponents/addGatheringBillDlg'

    import constants from '../../constants/index'
    import {
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
                hetongdaoqiText: '今日合同到期',
                jinrijiaozhuText: '今日应交租',
                hetongdaoqiValue: 0,
                apartmentsList: [],
                floorsList: [],
                herfList: [],
                //
                apartmentCurSelected: 0,
                floorCurSelected: 0,
                //
                currentSelectedRoom: {},
                currentSelectedRoomForAside: {},
                currentApartment: {},
                currentFloor: 0,
                statisticsData: {
                    totalRoomCount: 0,
                    checkInCount: 0,
                    vacantCount: 0,
                    bookedCount: 0,
                    checkInRate: 0,
                    vacantRate: 0,
                    rentCount: {
                        today: 0,
                        threeDays: 0,
                        fiveDays: 0,
                        sevenDays: 0,
                        overdue: 0,
                    },
                    contractCount: {
                        today: 0,
                        threeDays: 0,
                        fiveDays: 0,
                        sevenDays: 0,
                    }
                },
                //
                searchBuffer: null,
                closureCalendar: false,
                showRight: true,
                openAddApartDlg: false,
                openAddFloorDlg: false,
                openAddHouseDlg: false,
                openContractDlg: false,
                openGatherinBillDlg: false,
                openRoomBookingDlg: false,
                openCollectionDlg: false,
                quickIndex: 1,
                isRoomInfosLoading: false,
                curBookingOrderId: null,
                searchListRoomIds: []
            };
        },
        methods: {
            ...mapActions([
                'visibledialog',
                'showLoading',
                'hideLoading'
            ]),
            initData: function () {
            },
            searchHouseList: function () {
                if (!this.searchBuffer) {
                    this.quickIndex = 1;
                } else {
                    this.searchListRoomIds = [];
                    for (var i = 0; i < this.floorsList.length; i++) {
                        for (var j = 0; j < this.floorsList[i].roomInfoResponse.length; j++) {
                            if ((this.floorsList[i].roomInfoResponse[j].tenantName && this.floorsList[i].roomInfoResponse[j].tenantName.indexOf(this.searchBuffer) >= 0) || this.floorsList[i].roomInfoResponse[j].roomNumber.indexOf(this.searchBuffer) >= 0) {
                                this.searchListRoomIds.push(this.floorsList[i].roomInfoResponse[j].roomId);
                            }
                        }
                    }
                    this.quickIndex = 100;
                }
            },
            // apartment management
            openApartDlg: function () {
                this.openAddApartDlg = true;
            },
            onResultChange(val) {
                this.openAddApartDlg = val;
            },
            refreshApartmentInfo(val) {
                var _this = this;
                this.$api.get(constants.KCURLS.GETAPARTMENTS,
                    function (res) {
                        _this.apartmentsList = res;
                        _this.currentApartment = _this.apartmentsList[_this.apartmentCurSelected];
                        _this.refreshFloorList();
                    },
                    function (err) {

                    });
            },
            // floor management
            openFloorDlg: function () {
                this.openAddFloorDlg = true;
            },
            onFloorResultChange(val) {
                this.openAddFloorDlg = val;
            },
            refreshFloorList() {
                this.getRooms();
                this.getStatisticsData();
            },
            deleteFloor(floor) {
                var _this = this; 
                this.$confirm('是否确认删除该楼层?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    var params ={
                        apartmentId: _this.apartmentsList[_this.apartmentCurSelected].apartmentId,
                        floor: floor
                    };
                    _this.$api.post(constants.KCURLS.DELETEFLOOR, params,
                        function (res) {
                            if (res.succeeded ) {
                                _this.refreshFloorList();
                                _this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            }
                            else {
                                  _this.$message.error(res.message);
                            }
                            
                        },
                        function (err) {

                        });
                  
                }).catch(() => {
                  _this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });          
                });
            },
            openHouseDlg: function (floor) {
                this.currentFloor = floor;
                this.openAddHouseDlg = true;
            },
            onHouseResultChange(val) {
                this.openAddHouseDlg = val;
            },
            openCollectionDlgFunc(bookingOrderId) {
                this.curBookingOrderId = bookingOrderId;
                this.openCollectionDlg = true;
            },
            openCollectionDlgChange(val) {
                this.openCollectionDlg = val;
            },
            openAddContractDlg: function (floorIndex, roomIndex) {
                this.currentSelectedRoom = this.floorsList[floorIndex].roomInfoResponse[roomIndex];
                this.openContractDlg = true;
            },
            onContractResultChange(val) {
                this.openContractDlg = val;
            },
            contractCreateSuccess() {
                this.refreshFloorList();
            },
            openAddRoomBookingDlg: function (floorIndex, roomIndex) {
                this.currentSelectedRoom = this.floorsList[floorIndex].roomInfoResponse[roomIndex];
                this.openRoomBookingDlg = true;
            },
            onRoomBookingResultChange(val) {
                this.openRoomBookingDlg = val;
            },
            payForBooking(bookingOrderId) {
                if (bookingOrderId) {
                    this.openCollectionDlgFunc(bookingOrderId);
                }
                this.getRooms();
            },
            openRight(val, floorIndex, roomIndex) {
                // TODO: input select item and room infos
                this.currentSelectedRoomForAside = this.floorsList[floorIndex].roomInfoResponse[roomIndex];
                this.$refs.roomStateAside.openRight(val);
            },
            openAddGatherinBillDlg() {
                this.openGatherinBillDlg = true;
            },
            onGatherinBillResultChange(val) {
                this.openGatherinBillDlg = val;
            },
            getApartmentsList() {
                this.apartmentCurSelected = 0;
                this.apartmentsList = [];
                var _this = this;
                this.$api.get(constants.KCURLS.GETAPARTMENTS,
                    function (res) {
                        _this.apartmentsList = res;
                        _this.currentApartment = _this.apartmentsList[_this.apartmentCurSelected];
                        _this.refreshFloorList();
                    },
                    function (err) {

                    });
            },
            changeSelectedApart(val) {
                if (this.isRoomInfosLoading) {
                    return false;
                }
                if (val == this.apartmentCurSelected) {
                    return false;
                }
                this.jinrijiaozhuText = '今日应交租';
                this.hetongdaoqiText = '今日合同到期';
                
                this.searchBuffer = '';
                this.quickIndex = 1;
                this.apartmentCurSelected = val;
                this.currentApartment = this.apartmentsList[this.apartmentCurSelected];
                this.refreshFloorList();
            },
            getRooms() {
                if (this.apartmentCurSelected.length == 0) {
                    return false;
                }
                var _this = this;
                _this.floorsList = [];
                _this.herfList = [];
                _this.isRoomInfosLoading = true;
                _this.$api.get(constants.KCURLS.GETROOMSFROMCACHE + _this.apartmentsList[_this.apartmentCurSelected].apartmentId,
                    function (res) {
                        _this.isRoomInfosLoading = false;
                        _this.floorsList = res;
                        if (_this.floorsList.length > 0) {
                            _this.floorCurSelected = 0;
                        }
                        for (var i = 0; i < _this.floorsList.length; i++) {
                            _this.herfList.push('#' + i);
                        }
                    },
                    function (err) {
                        _this.isRoomInfosLoading = false;
                    });
            },
            RefreshRoomInfos() {
                if (this.apartmentCurSelected.length == 0) {
                    return false;
                }
                var _this = this;
                _this.floorsList = [];
                _this.herfList = [];
                _this.isRoomInfosLoading = true;
                _this.$api.get(constants.KCURLS.REFRESHROOMINFOS + _this.apartmentsList[_this.apartmentCurSelected].apartmentId,
                    function (res) {
                        _this.isRoomInfosLoading = false;
                        _this.floorsList = res;
                        if (_this.floorsList.length > 0) {
                            _this.floorCurSelected = 0;
                        }
                        for (var i = 0; i < _this.floorsList.length; i++) {
                            _this.herfList.push('#' + i);
                        }
                    },
                    function (err) {
                        _this.isRoomInfosLoading = false;
                    });
                _this.getStatisticsData();
            },
            getStatisticsData() {
                if (this.apartmentCurSelected.length == 0) {
                    return false;
                }
                var _this = this;
                _this.statisticsData = {
                    totalRoomCount: 0,
                    checkInCount: 0,
                    vacantCount: 0,
                    bookedCount: 0,
                    checkInRate: 0,
                    vacantRate: 0,
                    rentCount: {
                        today: 0,
                        threeDays: 0,
                        fiveDays: 0,
                        sevenDays: 0,
                        overdue: 0,
                    },
                    contractCount: {
                        today: 0,
                        threeDays: 0,
                        fiveDays: 0,
                        sevenDays: 0,
                    }
                };
                _this.$api.get(constants.KCURLS.GETSTATISTICSDATA + _this.apartmentsList[_this.apartmentCurSelected].apartmentId,
                    function (res) {
                        _this.statisticsData = res;
                    },
                    function (err) {

                    });
            },
            toggleQuick(val) {
              this.searchBuffer = '';
              // this.jinrijiaozhuText = '今日应交租';
              // this.hetongdaoqiText = '今日合同到期';
              switch (val) {
                  case 6:
                    this.jinrijiaozhuText = '逾期未交租 ';
                    break;
                  case 7:
                    this.jinrijiaozhuText = '3天内交租';
                    break;
                  case 8:
                    this.jinrijiaozhuText = '5天内交租';
                    break;
                  case 9:
                    this.jinrijiaozhuText = '7天内交租';
                    break;
                  case 11:
                    this.hetongdaoqiText = '3天内合同到期';
                    break;
                  case 12:
                    this.hetongdaoqiText = '5天内合同到期';
                    break;
                  case 13:
                    this.hetongdaoqiText = '7天内合同到期';
                    break;
                  default:
                    this.jinrijiaozhuText = '今日应交租';
                    this.hetongdaoqiText = '今日合同到期';
                    break;
              };
              this.quickIndex = val;
            },
            getContainListByQuickIndex() {
                var containList = [];
                switch (this.quickIndex) {
                  case 2:
                    containList = this.statisticsData.checkInRoomIds;
                    break;
                  case 3:
                    containList = this.statisticsData.vacantRoomIds;
                    break;
                  case 4:
                    containList = this.statisticsData.bookedRoomIds;
                    break;
                  case 5:
                    containList = this.statisticsData.rentCount.todayRoomIds;
                    break;
                  case 6:
                    containList = this.statisticsData.rentCount.overdueRoomIds;
                    break;
                  case 7:
                    containList = this.statisticsData.rentCount.threeDaysRoomIds;
                    break;
                  case 8:
                    containList = this.statisticsData.rentCount.fiveDaysRoomIds;
                    break;
                  case 9:
                    containList = this.statisticsData.rentCount.sevenDaysRoomIds;
                    break;
                  case 10:
                    containList = this.statisticsData.contractCount.todayRoomIds;
                    break;
                  case 11:
                    containList = this.statisticsData.contractCount.threeDaysRoomIds;
                    break;
                  case 12:
                    containList = this.statisticsData.contractCount.fiveDaysRoomIds;
                    break;
                  case 13:
                    containList = this.statisticsData.contractCount.sevenDaysRoomIds;
                    break;
                  case 100:
                    containList = this.searchListRoomIds;
                    break;
                }
                return containList;
            },
            roomFilter(roomId) {
              if (this.quickIndex == 1) {
                return true;
              }
              else {
                var containList = this.getContainListByQuickIndex();
                for (var i = 0; i < containList.length; i++) {
                  if (containList[i] == roomId) {
                    return true;
                  }
                }
                return false;
              }
            },
            floorFilter(floorIndex) {
              var floorItem = this.floorsList[floorIndex].roomInfoResponse;
              if (this.quickIndex == 1) {
                return true;
              }
              else {
                var containList = this.getContainListByQuickIndex();
                for (var i = 0; i < containList.length; i++) {
                  for (var j = 0; j < floorItem.length; j ++) {
                    if (containList[i] == floorItem[j].roomId) {
                      return true;
                    }
                  }
                }
                return false;
              }
            },
            noRoomFilter() {
                var containList = this.floorsList;
                if (this.quickIndex != 1) {
                    containList = this.getContainListByQuickIndex();
                }
                if (containList && containList.length > 0) {
                    return false;
                }
                else {
                    return true;
                }
            },
            changeSelectedFloor(val) {
                if (val == this.floorCurSelected) {
                    return false;
                }
                this.floorCurSelected = val;
            },
            asideUpdateFunc(val) {
                if (val == 'BOOK') {
                    this.payForBooking();
                } else if (val == 'ADDCONTRACT') {
                    this.refreshFloorList();
                } else if (val == 'ADDORDER') {
                    // this.refreshFloorList();
                }
                else if (val == 'DELETEROOM') {
                    this.refreshFloorList();
                }
            }
        },
        created() {
            // smoothScroll.init({
            //     offset: 100
            // });
            this.getApartmentsList();
        },
        components: {
            // smoothScroll,
            addapartmentdlg,
            addfloordlg,
            addhousedlg,
            addcontractdlg,
            roombookingdlg,
            roomstatemagaside,
            addgatheringbilldlg,
            collectionDlg

        }
    };
</script>
<style scoped>
    ul.apartmentsList {
        max-height: calc(100% - 100px);
        overflow-y: auto;
    }
    ul.floorsList {
        max-height: calc(100% - 110px);
        overflow-y: auto;
    }
    .marRight5 {
        margin-right: 5px !important;
    }
    .roomStateLeft {
        width: 265px;
        background-color: #fff;
        position: fixed;
        top: 70px;
        bottom: 0;
        left: 200px;
        z-index: 12;
        border: 20px #f1f2f7 solid;
    }

    .roomStateRight {
        width: calc(100% - 240px);
        min-width: 830px;
        margin-left: 240px;
        background-color: #fff;
    }

    .roomStateInnerBottom {
        width: 100%;
        min-width: 830px;
        padding: 10px 20px;
    }
    ul.roomListUl li:last-child {
        border: 1px dashed #07bf96;
        color: #07bf96;
        text-align: center;
        line-height: 80px;
        font-size: 30px;
    }

    ul.roomListUl li:last-child i {
        transition: transform 0.3s;
        display: block;
    }

    ul.roomListUl li:last-child:hover {
        height: 80px;
        margin-bottom: 20px;
        background: rgba(79, 210, 180, 0.05);
    }

    ul.roomListUl li:last-child:hover i {
    }

    ul.roomListUl li:last-child:active {
        background: rgba(79, 210, 180, 0.1);
    }
</style>
<style>
    .roomStateProgress1 .el-progress-bar__inner {
        background-color: #3bde86;
    }

    .roomStateProgress2 .el-progress-bar__inner {
        background-color: #ff6260;
    }
</style>
