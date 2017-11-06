<template>
    <div>
        <n3-aside class="asideCommon" placement="right" title="Title" width="692px" ref="asideRight"
                  style="overflow-y: scroll;" :header="false">
            <div v-if="isShowing" class="asideHeader">
                公寓详情
                <el-tag color="#07bf96">{{currentRoom.roomState | roomState }}</el-tag>
                <i @click="closeRight()" class="el-dialog__close el-icon el-icon-close"></i>
            </div>
            <el-tabs v-if="isShowing" class="asideFirstTab" v-model="asideActiveName" @tab-click="asideHandleClick">
                <el-tab-pane label="房间详情" name="first">
                    <!-- <button @click="openHouseDlg()">test</button> -->
                    <p class="asideHouseName">{{currentRoom.apartmentName }}
                        <!-- {{currentRoom.floor }}层 -->{{currentRoom.roomNumber }}室</p>
                    <div class="roomEditDiv">
                        <el-button class="greenNewBtn" @click="editSelectRoomInfo(true)" v-bind:class="{ active: roomEditing }">编辑</el-button>
                        <el-button class="redNewBtn" @click="deleteRoomInfo">删除</el-button>
                    </div>
                    <p class="tabSectionTitle">
                        <i class="bf_icon_roomInfo"></i> 房间信息
                    </p>
                    <div v-show="!roomEditing" class="roomSection unEditState">
                        <el-col :span="4">房间名称</el-col>
                        <el-col :span="20">{{currentRoom.roomNumber }}室</el-col>
                        <el-col :span="4">门市价</el-col>
                        <el-col :span="20">{{currentRoomDetail.retailPrice | amount2 }}元</el-col>
                        <el-col :span="4">朝向</el-col>
                        <el-col :span="20">{{currentRoomDetail.orientation }}</el-col>
                        <el-col :span="4">户型</el-col>
                        <el-col :span="20">{{currentRoomDetail.roomTypeName }}</el-col>
                        <el-col :span="4">面积</el-col>
                        <el-col :span="20">{{currentRoomDetail.roomTypeSize | roomTypeSize}}㎡</el-col>
                        <el-col :span="4">装修类型</el-col>
                        <el-col :span="20">{{currentRoom.decorationType | decorationType }}</el-col>
                        <el-col :span="4">装修描述</el-col>
                        <el-col :span="20">{{currentRoomDetail.decorationDescription }}</el-col>
                        <el-col :span="4">房间图片</el-col>
                        <el-col :span="24">
                            <el-upload :action="uploadUri"  
                                       list-type="picture-card" :on-preview="handlePictureCardPreviewList"
                                       :file-list="currentRoomDetail.picturesNameArray">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </el-col>
                    </div>
                    <div class="roomSection" v-show="roomEditing">
                        <el-form :model="editRoomForm" label-position="left" :rules="editRoomFormRules"
                                 ref="editRoomForm" label-width="92px" style="margin-top:20px;">
                            <el-col :span="16" style="margin-bottom: 0;">
                                <el-form-item label="房间名称" prop="roomNumber">
                                    <el-input placeholder="输入房间名称" v-model="editRoomForm.roomNumber">
                                        <template slot="append">室</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="门市价" prop="retailPrice">
                                    <el-input placeholder="输入门市价" v-model="editRoomForm.retailPrice">
                                        <template slot="append">元</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="朝向" prop="orientation">
                                    <el-select v-model="editRoomForm.orientation" placeholder="选择朝向">
                                        <el-option label="东" value="东"></el-option>
                                        <el-option label="南" value="南"></el-option>
                                        <el-option label="西" value="西"></el-option>
                                        <el-option label="北" value="北"></el-option>
                                        <el-option label="南北" value="南北"></el-option>
                                        <el-option label="东西" value="东西"></el-option>
                                        <el-option label="东南" value="东南"></el-option>
                                        <el-option label="西南" value="西南"></el-option>
                                        <el-option label="东北" value="东北"></el-option>
                                        <el-option label="西北" value="西北"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="户型" prop="roomTypeName">
                                    <el-input type="text" placeholder="输入户型" v-model="editRoomForm.roomTypeName"></el-input>
                                </el-form-item>
                                <el-form-item label="面积" prop="roomSize">
                                    <el-input placeholder="输入面积" v-model="editRoomForm.roomSize">
                                        <template slot="append">m²</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="装修类型" prop="decorationType">
                                    <el-select v-model="editRoomForm.decorationType" placeholder="选择装修类型">
                                        <el-option label="毛坯" value="MaoPi"></el-option>
                                        <el-option label="简装" value="JianZhuang"></el-option>
                                        <el-option label="精装" value="JingZhuang"></el-option>
                                        <el-option label="豪装" value="HaoZhuang"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="装修描述" prop="decorationDescription">
                                    <el-input type="textarea" placeholder="输入装修描述详细" v-model="editRoomForm.decorationDescription ">
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="房间图片" prop="roomPictures">
                                    <el-upload :action="uploadUri"  
                                               list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" 
                                               :on-success="uploadSuccess" :file-list="editRoomForm.roomPictures"
                                               >
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                        </el-form>
                        <el-col :span="24">
                            <div @click="updateRoomInfo('editRoomForm')" class=" blockBtn greenBtn"
                                 style="width:96px;height:36px;line-height:36px; margin-bottom: 20px; float: right;">确定
                            </div>
                            <div class="primaryBtn" @click="unEditSelectRoomInfo(false)" style="width:96px;height:36px;line-height:36px; margin-bottom: 20px; float: right; margin-right: 20px;">取 消</div>
                        </el-col>
                    </div>
                    <div class="roomEditDiv">
                        <el-button class="greenNewBtn" @click.native="openAddRoomBookingDlg">添加预定</el-button>
                    </div>
                    <p class="tabSectionTitle" style="margin-bottom: 20px;">
                        <i class="bf_icon_bookInfo"></i>预定信息
                    </p>
                    <el-table class="littleTable" v-if="bookingDataList.length > 0" :data="bookingDataList" style="width: 100%">
                        <el-table-column prop="tenantName" label="租客">
                        </el-table-column>
                        <el-table-column prop="tenantCellphone" width="110" label="联系方式">
                        </el-table-column>
                        <el-table-column label="入住日期">
                            <template slot-scope="scope">
                                <span>{{scope.row.checkInTime | dateYYMMDD}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="支付时间">
                            <template slot-scope="scope">
                                <span>{{scope.row.paymentTime | dateYYMMDD}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="定金总额">
                            <template slot-scope="scope">
                                <span>{{scope.row.deposite | amount0}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                                <el-button v-show="scope.row.reservationState == 'Reserved' && scope.row.canTurnToContract" type="text" size="small"
                                           @click="openAddContractDlg(scope.row.roomReservationId)">转合同
                                </el-button>
                                <el-button v-show="scope.row.reservationState == 'Created'" type="text" size="small"
                                           @click="openCollectopnDialog(scope.row.orderId)">收款
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div v-else style="width: 100%; text-align: center; padding-top:20px;">
                        <img src="~@/assets/noBookingData.png" style="width: 140px;"/>
                        <p style="margin-top: 10px; color: #99A9BF">暂无预订信息</p>
                    </div>
                    <!-- <div class="blockBtn greenBtn" @click="openAddRoomBookingDlg"
                         style="width:72px;height:28px;line-height:28px; margin-bottom: 20px; margin-top: 20px;">添加预定
                    </div> -->
                </el-tab-pane>
                <el-tab-pane label="租房合同" name="second">
                    <div>
                        <p class="asideHouseName">{{currentRoom.apartmentName }}
                            <!-- {{currentRoom.floor }}层  -->{{currentRoom.roomNumber }}室</p>
                        <div v-show="currentContract && currentContract != '' && currentContract.contractResponse.confirmed && (currentContract.contractResponse.checkoutType == 'NotCheckout')"
                             class="roomEditDiv">
                            <el-button class="greenNewBtn" @click.native="openAddContractDlg('', true)">续租</el-button>
                            <el-button class="redNewBtn" @click.native="openThrowALeaseDlg">退租</el-button>
                        </div>
                        <contractdetail :contractDetail="currentContract" :currentRoom="currentRoom"
                                        @on-add-success="createContractSuccess"></contractdetail>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="租客账单" name="third">
                    <p class="asideHouseName">{{currentRoom.apartmentName }}
                        <!-- {{currentRoom.floor }}层  -->{{currentRoom.roomNumber }}室</p>
                    <el-tabs v-if="allOrders && allOrders.length > 0" class="asideSecondTab"
                             v-model="asideSecondCategory">
                        <el-tab-pane label="收款" name="In">
                           <!--  <p class="addBillBtn" style="margin-top: -20px;" @click="openAddHydropowerBillDlg"><i
                                    class="bf_icon_shuidian"></i><span>添加水电账单</span></p>
                            <p class="addBillBtn" @click="openAddGatherinBillDlg"><i class="bf_icon_infos"></i><span>添加其他账单</span>
                            </p> -->
                            <div class="roomEditDiv">
                                <el-button class="greenNewBtn" @click.native="openAddGatherinBillDlg">添加其他账单</el-button>
                                <el-button class="greenNewBtn" @click.native="openAddHydropowerBillDlg">添加水电账单</el-button>
                            </div>
                            <p class="littleTableLable">未完成账单</p>
                            <el-table class="littleTable" :data="shouUnfinishOrders" border style="width: 100%">
                                <el-table-column label="账单周期" width="180">
                                    <template slot-scope="scope">
                                        {{scope.row.orderStartTime | dateYYMMDD}} 至 {{scope.row.orderEndTime | dateYYMMDD}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="账单类型" width="80">
                                    <template slot-scope="scope">
                                        {{scope.row.orderType | orderType}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="账单金额" width="90">
                                    <template slot-scope="scope">
                                        {{scope.row.totalAmount | amount2}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="应收租日期" width="128">
                                    <template slot-scope="scope">
                                        {{scope.row.paymentTime | dateYYMMDD}}
                                        <el-tag v-if="scope.row.orderState == 'Overdue'" color="#ff6260" close-transition>逾
                                        </el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button @click.native.prevent="showBillDetailAside(scope.row)" type="text"
                                                   size="small">查看
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <p style="margin-top: 30px" class="littleTableLable">已完成账单</p>
                            <el-table class="littleTable" :data="shouFinishOrders" border style="width: 100%">
                                <el-table-column label="账单周期" width="180">
                                    <template slot-scope="scope">
                                        {{scope.row.orderStartTime | dateYYMMDD}} 至 {{scope.row.orderEndTime | dateYYMMDD}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="账单类型" width="80">
                                    <template slot-scope="scope">
                                        {{scope.row.orderType | orderType}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="账单金额" width="90">
                                    <template slot-scope="scope">
                                        {{scope.row.totalAmount | amount2}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="实收租日期" width="128">
                                    <template slot-scope="scope">
                                        {{scope.row.actualPaymentTime | dateYYMMDD}}
                                        <el-tag v-if="scope.row.orderState == 'Overdue'" color="#ff6260" close-transition>逾
                                        </el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button @click.native.prevent="showBillDetailAside(scope.row)" type="text"
                                                   size="small">查看
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="付款" name="Out">
                            <div class="roomEditDiv">
                                <el-button class="greenNewBtn" @click.native="openAddGatherinBillDlg">添加其他账单</el-button>
                                <!-- <el-button class="greenNewBtn" @click.native="openAddHydropowerBillDlg">添加水电账单</el-button> -->
                            </div>
                            <!-- <p class="addBillBtn" style="margin-top: -20px;" @click="openAddGatherinBillDlg"><i class="bf_icon_infos"></i><span>添加其他账单</span> -->
                            </p>
                            <p class="littleTableLable">未完成账单</p>
                            <el-table class="littleTable" :data="fuUnfinishOrders" border style="width: 100%">
                                <el-table-column label="账单周期" width="180">
                                    <template slot-scope="scope">
                                        {{scope.row.orderStartTime | dateYYMMDD}} 至 {{scope.row.orderEndTime | dateYYMMDD}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="账单类型" width="80">
                                    <template slot-scope="scope">
                                        {{scope.row.orderType | orderType}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="账单金额" width="90">
                                    <template slot-scope="scope">
                                        {{scope.row.totalAmount | amount2}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="应收租日期" width="128">
                                    <template slot-scope="scope">
                                        {{scope.row.paymentTime | dateYYMMDD}}
                                        <el-tag v-if="scope.row.orderState == 'Overdue'" color="#ff6260" close-transition>逾
                                        </el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button @click.native.prevent="showBillDetailAside(scope.row)" type="text"
                                                   size="small">查看
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <p style="margin-top: 30px" class="littleTableLable">已完成账单</p>
                            <el-table class="littleTable" :data="fuFinishOrders" border style="width: 100%">
                                <el-table-column label="账单周期" width="180">
                                    <template slot-scope="scope">
                                        {{scope.row.orderStartTime | dateYYMMDD}} 至 {{scope.row.orderEndTime | dateYYMMDD}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="账单类型" width="80">
                                    <template slot-scope="scope">
                                        {{scope.row.orderType | orderType}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="账单金额" width="90">
                                    <template slot-scope="scope">
                                        {{scope.row.totalAmount | amount2}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="实收租日期" width="128">
                                    <template slot-scope="scope">
                                        {{scope.row.actualPaymentTime | dateYYMMDD}}
                                        <el-tag v-if="scope.row.orderState == 'Overdue'" color="#ff6260" close-transition>逾
                                        </el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button @click.native.prevent="showBillDetailAside(scope.row)" type="text"
                                                   size="small">查看
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                    <div v-else style="width: 100%; text-align: center; padding-top:40px;">
                        <img src="~@/assets/noContract.png" style="width: 140px;"/>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </n3-aside>
        <billDetailAside ref="billAside" @on-refresh-order="refreshOrder"></billDetailAside>
        <addgatheringbilldlg v-if="openGatherinBillDlg" :showDialog='openGatherinBillDlg'
                             :currentContract="currentContract" :category="asideSecondCategory"
                             @on-add-success="addOrderSuccess"
                             @on-result-change="onGatherinBillResultChange"></addgatheringbilldlg>
        <addhydropowerbilldlg v-if="openHydropowerBillDlg" :showDialog='openHydropowerBillDlg' :currentContract="currentContract"
                              @on-add-success="addOrderSuccess" @on-result-change="onHydropowerBillResultChange"></addhydropowerbilldlg>
        <addcontractdlg v-if="openContractDlg" :roomInfo="currentRoom" :showDialog='openContractDlg' :roomReservationId="roomReservationId" :isReletingInput="isReleting"  @on-result-change="onContractResultChange" @on-add-success="contractCreateSuccess"></addcontractdlg>
        <throwleasedlg v-if="throwLeaseDlg" :contractId="currentRoom.contractId" :showDialog='throwLeaseDlg' @on-result-change="onThrowALeaseResultChange" @on-result-checkout="onThrowLeaseCheckout"></throwleasedlg>
        <roombookingdlg v-if="openRoomBookingDlg" :selectRoom="currentRoom" :showDialog='openRoomBookingDlg'
                        @on-result-change="onRoomBookingResultChange" @on-add-success="payForBooking"></roombookingdlg>

        <collectionDlg v-if="isCollectionDlg" :showDialog='isCollectionDlg' :currentOrderId="bookingCollectionOrderId"
                       @on-result-change='hideCollectionDialog'
                       @on-refresh-collection="refreshBookingList"></collectionDlg>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    import constants from '../../constants/index'
    // import {
    //     n3Aside
    // } from 'N3-components'
    import collectionDlg from './collectionDlg'
    import billDetailAside from './billDetailAside'
    import addgatheringbilldlg from './addGatheringBillDlg'
    import addhydropowerbilldlg from './addHydropowerBillDlg'
    import addcontractdlg from './addContractDlg'
    import throwleasedlg from './throwLeaseDlg'
    import contractdetail from './contractDetail'
    import roombookingdlg from './roomBookingDlg'
    export default {
        props: ['roomInfo'],
        data: function () {
            // 传入 房间的id 以及是打开第几栏的标志
            return {
                uploadUri: this.$api.uploadUri,
                isReleting: false,
                currentRoom: this.roomInfo,
                currentRoomDetail: {},
                currentContract: null,
                currentOrder: null,
                bookingDataList: [],
                roomEditing: false,
                editRoomForm: {
                    roomId: '',
                    roomNumber: '',
                    retailPrice: '',
                    orientation: '',
                    roomTypeName: '',
                    roomSize: '',
                    decorationType: '',
                    decorationDescription: '',
                    roomPictures: []
                },
                editRoomFormRules: {
                    roomNumber: {
                      required: true,
                      message: '请输入房间名称',
                      trigger: 'blur'
                    },
                    retailPrice: [
                        {
                            validator: (rule, value, callback) => {
                              if (value && constants.REGEXS.AMOUNT.test(value) == false) {
                                callback(new Error("金额格式错误"));
                              } else {
                                callback();
                              }
                            },
                            trigger: 'blur'
                        }
                    ],
                    roomSize: [
                        {
                            validator: (rule, value, callback) => {
                              if (value && constants.REGEXS.AMOUNT.test(value) == false) {
                                callback(new Error("面积格式错误"));
                              } else {
                                callback();
                              }
                            },
                            trigger: 'blur'
                        }
                    ],
                    orientation: {
                      required: true,
                      message: '请选择朝向',
                      trigger: 'change'
                    }
                },
                openGatherinBillDlg: false,
                openHydropowerBillDlg: false,
                openContractDlg: false,
                throwLeaseDlg: false,
                asideActiveName: 'first',
                asideSecondCategory: 'In',
                isShowing: false,
                allOrders: [],
                shouFinishOrders: [],
                shouUnfinishOrders: [],
                fuFinishOrders: [],
                fuUnfinishOrders: [],
                openRoomBookingDlg: false,
                isCollectionDlg: false,
                bookingCollectionOrderId: null,
                roomReservationId: null,
                urlPictures: [],
            };
        },
        methods: {
            ...mapActions([
                'visibledialog',
                'showLoading',
                'hideLoading'
            ]),
            contractCreateSuccess(contractId) {
                this.currentRoom.contractId = contractId;
                this.getBooking();
                this.getContract();
                this.$emit('roomAsideUpdate', 'ADDCONTRACT');
            },
            openCollectopnDialog(selectedOrderId) {
                this.bookingCollectionOrderId = selectedOrderId;
                this.isCollectionDlg = true;
            },
            hideCollectionDialog(val) {
                this.isCollectionDlg = val;
            },
            refreshBookingList() {
                this.getBooking();
                this.getOrders();
            },
            openRight(val) {
                this.roomEditing = false;
                this.asideActiveName = val;
                this.isShowing = true;
                this.$refs.asideRight.open();
            },
            getRoomInfo() {
                var _this = this;
                _this.currentRoomDetail = {};
                _this.$api.get(constants.KCURLS.GETROOM + _this.currentRoom.roomId,
                    function (res) {
                        _this.currentRoomDetail = res;
                        var pictures = [];
                        var picturesNameArray = [];
                        if (_this.currentRoomDetail.pictures) {
                            pictures = _this.currentRoomDetail.pictures.split(',');
                            for (var i = 0; i < pictures.length; i++) {
                                var temp = {
                                    name: 'house' + i,
                                    url: pictures[i]
                                }
                                picturesNameArray.push(temp);
                            }
                        }
                        _this.currentRoomDetail.picturesNameArray = picturesNameArray;
                        _this.editRoomForm = {
                            roomId: res.roomId,
                            roomNumber: res.roomNumber,
                            retailPrice: res.retailPrice / 100,
                            orientation: res.orientation,
                            roomTypeName: res.roomTypeName,
                            decorationType: res.decorationType,
                            decorationDescription: res.decorationDescription,
                            roomPictures: picturesNameArray
                        };
                        if (res.roomTypeSize) {
                            _this.editRoomForm.roomSize = res.roomTypeSize / 10000;
                        }
                        _this.urlPictures = pictures;
                        
                    });
            },
            getOrders() {
                this.allOrders = [];
                this.shouFinishOrders = [];
                this.shouUnfinishOrders = [];
                this.fuFinishOrders = [];
                this.fuUnfinishOrders = [];
                var _this = this;
                if (_this.currentRoom.contractId) {
                    _this.$api.get(constants.KCURLS.GETORDERSBYCONTRACTID + _this.currentRoom.contractId,
                        function (res) {
                            _this.allOrders = res;
                            for (var j = 0; j < res.length; j++) {
                                // 付款账单
                                if (res[j].orderCategory == 'Out') {
                                    if (res[j].orderState == 'Created' || res[j].orderState == 'Overdue') {
                                        _this.fuUnfinishOrders.push(res[j]);
                                    } else {
                                        _this.fuFinishOrders.push(res[j]);
                                    }
                                }
                                // 收款账单
                                else if (res[j].orderCategory == 'In') {
                                    if (res[j].orderState == 'Created' || res[j].orderState == 'Overdue' || !res[j].installmentOrdersFinished) {
                                        _this.shouUnfinishOrders.push(res[j]);
                                    } else {
                                        _this.shouFinishOrders.push(res[j]);
                                    }
                                }
                            }
                        });
                }
            },
            getBooking() {
                var _this = this;
                _this.bookingDataList = [];
                _this.$api.get(constants.KCURLS.GETROOMRESERVATIONSBYROOMID + _this.currentRoom.roomId,
                    function (res) {
                        _this.bookingDataList = res;
                    });
            },
            getContract() {
                var _this = this;
                _this.currentContract = null;
                // 有合同，通过合同ID取合同日期，更快
                if (_this.currentRoom.contractId) {
                    _this.$api.get(constants.KCURLS.GETCONTRACTBYCONTRACTID + _this.currentRoom.contractId,
                        function (res) {
                            _this.currentContract = res;
                            _this.currentContract.contractImgList = [];
                            _this.currentContract.idcardImgList = [{
                                name: 'idcard1',
                                url: _this.currentContract.simpleTenantInfoResponse.credentialFacePhotoUrl
                            }, {
                                name: 'idcard2',
                                url: _this.currentContract.simpleTenantInfoResponse.credentialBackPhotoUrl
                            }];
                            var resposeConImgList = _this.currentContract.contractResponse.contractPictures.split(',');
                            for (var i = 0; i < resposeConImgList.length; i++) {
                                var item = {
                                    name: 'contractInfo' + i,
                                    url: resposeConImgList[i]
                                }
                                _this.currentContract.contractImgList.push(item);
                            }
                        });
                }
            },
            closeRight() {
                this.false = true;
                this.$refs.asideRight.close();
            },
            asideHandleClick(tab, event) {
            },
            // asideSecondHandleClick(tab, event) {},
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            deleteRoomInfo() {
                var _this = this;
                _this.$confirm('是否确认删除该房间?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    _this.$api.post(constants.KCURLS.DELETEROOM, {roomId: _this.currentRoom.roomId},
                        res => {
                            if (res.succeeded) {
                                _this.$message({
                                  type: 'success',
                                  message: '删除成功!'
                                });
                                _this.$emit('roomAsideUpdate', 'DELETEROOM');
                                _this.$refs.asideRight.close();
                            }
                            else {
                                _this.$message.error(res.message);
                            }
                        },
                        err => {

                        });
                  
                }).catch(() => {
                  _this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });          
                });
            },
            getPictures: function(fileList) {
              this.urlPictures = [];
              if (fileList.length > 0) {
                for (var i = 0; i < fileList.length; i++) {
                    if (fileList[i].response) {
                        this.urlPictures.push(fileList[i].response[0].url);
                    }
                    else {
                        this.urlPictures.push(fileList[i].url);
                    }
                  
                }
              }
            },
            handleRemove(file, fileList) {
                this.getPictures(fileList);
            },
            uploadSuccess(res, file, fileList) {
                this.getPictures(fileList);
            },
            handlePictureCardPreviewList(file) {
                this.visibledialog({
                    url: file.url,
                    urlList: this.currentRoomDetail.picturesNameArray
                })
            },
            handlePictureCardPreview(file) {
                this.visibledialog({
                    url: file.url
                })
            },
            editSelectRoomInfo(val) {
                this.roomEditing = val;
            },
            unEditSelectRoomInfo(val) {
                this.roomEditing = val;
            },
            showBillDetailAside(row){
                this.currentOrder = row;
                this.$refs.billAside.openRight(row.orderId);
            },
            updateRoomInfo(ruleForm) {
                  var _this = this;
                  _this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                          var params = {
                                roomId: _this.editRoomForm.roomId,
                                roomNumber: _this.editRoomForm.roomNumber,
                                retailPrice: _this.editRoomForm.retailPrice * 100,
                                orientation: _this.editRoomForm.orientation,
                                roomTypeName: _this.editRoomForm.roomTypeName,
                                decorationType: _this.editRoomForm.decorationType,
                                decorationDescription: _this.editRoomForm.decorationDescription,
                                roomPictures: _this.urlPictures,
                                roomSize: _this.editRoomForm.roomSize * 10000
                          };

                          _this.showLoading();
                          _this.$api.post(constants.KCURLS.UPDATEROOM, params, function(res) {
                            _this.hideLoading();
                            if (res.succeeded) {
                              _this.isDlgVisable = false;
                              _this.$message({
                                message: '房间更新成功',
                                type: 'success'
                              });
                              _this.$emit('roomAsideUpdate', 'ADDCONTRACT');
                              _this.getRoomInfo();
                              _this.roomEditing = false;
                            } else {
                              _this.$message.error(res.message);
                            }
                          }, err => {
                            _this.hideLoading();
                          });
                    }
                  });
            },
            openAddHydropowerBillDlg() {
                this.openHydropowerBillDlg = true;
            },
            onHydropowerBillResultChange(val) {
                this.openHydropowerBillDlg = val;
            },
            openAddGatherinBillDlg() {
                this.openGatherinBillDlg = true;
            },
            onGatherinBillResultChange(val) {
                this.openGatherinBillDlg = val;
            },
            openAddContractDlg(val, isReleting) {
                this.roomReservationId = null;
                if (val) {
                    this.roomReservationId = val;
                }
                if (isReleting) {
                    this.isReleting = true;
                }
                else {
                    this.isReleting = false;
                }
                this.openContractDlg = true;
            },
            onContractResultChange(val) {
                this.openContractDlg = val;
            },
            openThrowALeaseDlg() {
                var that = this;
                var contractId = that.currentRoom.contractId;
                that.showLoading();
                that.$api.get(constants.KCURLS.CHECKOUTFIRSTSTEP + contractId, function (res) {
                    that.hideLoading();
                    if (res.data.staged) {
                        if (res.data.amount > 0) {
                            that.$confirm('该租客还有未支付的分期账单，是否继续退租？', '提示', {
                                confirmButtonText: '继续',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                that.showLoading();
                                that.$api.get(constants.KCURLS.CHECKOUTSECONDSTEP + contractId, function () {
                                    that.hideLoading();
                                    that.throwLeaseDlg = true;
                                }, () => {
                                    that.hideLoading();
                                });
                            });
                        } else {
                            that.throwLeaseDlg = true;
                        }
                    } else if (res.data.canCheckouted) {
                        that.throwLeaseDlg = true;
                    } else {
                        that.$confirm('请先处理完房间中的账单!', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                        });
                    }
                }, () => {
                    that.hideLoading();
                });
            },
            onThrowALeaseResultChange(val) {
                this.throwLeaseDlg = val;
            },
            openAddRoomBookingDlg: function (floorIndex, roomIndex) {
                this.openRoomBookingDlg = true;
            },
            onRoomBookingResultChange(val) {
                this.openRoomBookingDlg = val;
            },
            payForBooking(val) {
                this.openCollectopnDialog(val);
                this.getBooking();
                this.$emit('roomAsideUpdate', 'BOOK');
            },
            createContractSuccess() {
                this.getContract();
                this.$emit('roomAsideUpdate', 'ADDCONTRACT');
            },
            addOrderSuccess(val) {
                this.getOrders();
                if (val) {
                    this.openCollectopnDialog(val);
                }
                this.$emit('roomAsideUpdate', 'ADDORDER');
            },
            refreshOrder: function () {
                this.getOrders();
            },
            onThrowLeaseCheckout() {
                this.currentRoom.roomState = "Vacancy";
                this.currentContract = null;
                this.allOrders = [];
                this.shouFinishOrders = [];
                this.shouUnfinishOrders = [];
                this.fuFinishOrders = [];
                this.fuUnfinishOrders = [];
                this.$emit('roomAsideUpdate', 'ADDCONTRACT');
            }
        },
        watch: {
            roomInfo(val) {
                this.currentRoom = val;
                this.getRoomInfo();
                this.getBooking();
                this.getContract();
                this.getOrders();
            }
        },
        created() {
        },
        components: {
            // n3Aside,
            billDetailAside,
            addgatheringbilldlg,
            addhydropowerbilldlg,
            addcontractdlg,
            throwleasedlg,
            contractdetail,
            roombookingdlg,
            collectionDlg
        }
    }
</script>
<style>
    p.addBillBtn {
        color: #07BF96;
        font-size: 16px;
        margin-bottom: 20px;
        cursor: pointer;
    }

    p.addBillBtn i {
        margin-right: 30px;
        font-size: 25px;
    }

    p.addBillBtn i,
    p.addBillBtn span {
        vertical-align: middle;
    }
</style>
