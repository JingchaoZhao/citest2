<template>
    <div>
        <div class="topPageContainer" v-bind:class="{collopes: isScrolled}">  <!-- isScrolled  scrolled > 200 -->
            <el-row style="height: 300px;">
                <el-col :span="5">
                    <div class="totalHousesNo" style="font-size:20px;color:#161616;text-align: right; float: right">
                        <p>
                            <i class="bf_icon_counts"
                               style="color: #07bf96; margin-right:0px; font-size: 24px; line-height: 25px;"></i>
                            <span style="vertical-align: top;">{{totalRoominfoStatistics.totalRoomCount}}</span>
                        </p>
                        <p style="font-size:12px;color:#6a7088;">房间总数</p>
                    </div>
                    <p class="cardName">房间信息</p>
                    <p class="boldText marTop80">
                        <span>{{(totalRoominfoStatistics.checkInRoomCount / totalRoominfoStatistics.totalRoomCount) | rate}}%
                            <!-- <el-tag class="improveTag">↑12%</el-tag> --></span>
                        <span style="float: right">{{totalRoominfoStatistics.checkInRoomCount}}</span>
                    </p>
                    <p class="littleText">
                        <span>入住率</span>
                        <span style="float: right">入住房间总数</span>
                    </p>
                    <el-progress class="marTop10 ruzhu"
                                 :percentage="(totalRoominfoStatistics.checkInRoomCount / totalRoominfoStatistics.totalRoomCount) | rateNo"
                                 :show-text="false"></el-progress>
                    <p class="boldText marTop40">
                        <span>{{(totalRoominfoStatistics.vacantRoomCount / totalRoominfoStatistics.totalRoomCount) | rate}}%
                            <!-- <el-tag class="unImproveTag">↓12%</el-tag> --></span>
                        <span style="float: right">{{totalRoominfoStatistics.vacantRoomCount}}</span>
                    </p>
                    <p class="littleText">
                        <span>空置率</span>
                        <span style="float: right">空置房间总数</span>
                    </p>
                    <el-progress class="marTop10 kongzhi"
                                 :percentage="(totalRoominfoStatistics.vacantRoomCount / totalRoominfoStatistics.totalRoomCount) | rateNo"
                                 :show-text="false"></el-progress>
                </el-col>
                <el-col :span="10">
                    <p class="cardName">分期信息</p>
                    <div class="leftCircles">
                        <p>分期率</p>
                        <el-progress class="progress1" type="circle"
                                     :percentage="(totalRoominfoStatistics.stageRoomCount / totalRoominfoStatistics.totalRoomCount) | rateNo"
                                     status="success" :show-text="false" :width="200"></el-progress>
                        <el-progress class="progress2" type="circle"
                                     :percentage="(totalRoominfoStatistics.todayStageStartRoomCount / totalRoominfoStatistics.totalRoomCount) | rateNo"
                                     :show-text="false" :width="160"></el-progress>
                        <el-progress class="progress3" type="circle"
                                     :percentage="(totalRoominfoStatistics.todayStageEndRoomCount / totalRoominfoStatistics.totalRoomCount) | rateNo"
                                     status="exception" :show-text="false" :width="120"></el-progress>
                    </div>
                    <div class="rightInfos">
                        <p class="numbersLine boldText">
                            <span class="markSpan green"></span>
                            <span>{{(totalRoominfoStatistics.stageRoomCount / totalRoominfoStatistics.totalRoomCount) | rate}}%
                                <!-- <el-tag class="improveTag">↑12%</el-tag> --></span>
                            <span style="float: right">{{totalRoominfoStatistics.stageRoomCount}}</span>
                        </p>
                        <p class="littleText">
                            <span>分期房间率</span>
                            <span style="float: right">分期房间数</span>
                        </p>

                        <p class="numbersLine boldText">
                            <span class="markSpan blue"></span>
                            <span>{{(totalRoominfoStatistics.todayStageStartRoomCount / totalRoominfoStatistics.totalRoomCount) | rate}}%
                                <!-- <el-tag class="unImproveTag">↓1.2%</el-tag> --></span>
                            <span style="float: right">{{totalRoominfoStatistics.todayStageStartRoomCount }}</span>
                        </p>
                        <p class="littleText">
                            <span>今日新增分期率</span>
                            <span style="float: right">今日新增分期数</span>
                        </p>

                        <p class="numbersLine boldText">
                            <span class="markSpan red"></span>
                            <span>{{(totalRoominfoStatistics.todayStageEndRoomCount / totalRoominfoStatistics.totalRoomCount) | rate}}%
                                <!-- <el-tag class="improveTag">↑1.2%</el-tag> --></span>
                            <span style="float: right">{{totalRoominfoStatistics.todayStageEndRoomCount }}</span>
                        </p>
                        <p class="littleText">
                            <span>今日到期分期率</span>
                            <span style="float: right">今日到期分期数</span>
                        </p>
                    </div>
                </el-col>
                <el-col :span="9">
                    <p class="cardName">租客信息</p>
                    <div class="leftCircles">
                        <p>流动率</p>
                        <el-progress class="progress2" type="circle"
                                     :percentage="(totalRoominfoStatistics.todayStartTenantCount / totalRoominfoStatistics.totalTenantCount) | rateNo"
                                     :show-text="false" :width="160"></el-progress>
                        <el-progress class="progress3" type="circle"
                                     :percentage="(totalRoominfoStatistics.todayEndTenantCount / totalRoominfoStatistics.totalTenantCount) | rateNo"
                                     status="exception" :show-text="false" :width="120"></el-progress>
                    </div>
                    <div class="rightInfos " style="padding: 40px 0 0 20px;">
                        <p class="numbersLine boldText" style="margin-top: 30px;">
                            <span class="markSpan blue"></span>
                            <span>{{(totalRoominfoStatistics.todayStartTenantCount / totalRoominfoStatistics.totalTenantCount) | rate}}%
                                <!-- <el-tag class="unImproveTag">↓1%</el-tag> --></span>
                            <span style="float: right">{{totalRoominfoStatistics.todayStartTenantCount}}</span>
                        </p>
                        <p class="littleText ">
                            <span>今日新增租客率</span>
                            <span style="float: right">今日新增租客数</span>
                        </p>

                        <p class="numbersLine boldText">
                            <span class="markSpan red"></span>
                            <span>{{(totalRoominfoStatistics.todayEndTenantCount / totalRoominfoStatistics.totalTenantCount) | rate}}%
                                <!-- <el-tag class="improveTag">↑2%</el-tag> --></span>
                            <span style="float: right">{{totalRoominfoStatistics.todayEndTenantCount}}</span>
                        </p>
                        <p class="littleText ">
                            <span>今日退租租客率</span>
                            <span style="float: right">今日退租租客数</span>
                        </p>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="leftBottomContainer" v-bind:class="{collopes: isScrolled}">
            <div style="border-right: 0; width:100%" class="left-float-item apartmentsListDiv">
                <div class="title_apart" style="padding-left:20px">公寓列表</div>
                <ul class="apartmentsList">
                    <li v-for="(item, index) in apartmentsList" :title="item.apartmentName"
                        v-bind:class="{active: apartmentCurSelected == index}" @click="changeSelectedApart(index)">
                        {{item.apartmentName}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="rightQuickAccess" v-bind:class="{collopes: isScrolled}">
            <div class="title_apart" style="padding-left: 20px;">
                公寓详情
                <div class="reloadBtns">
                    <div class="refresh-btn" @click="refreshRoomsInfoClear">
                        <i class="fa fa-repeat"></i>
                    </div>
                    <div class="refresh-btn" style="margin-right: 10px;">
                      <i class="bf_icon_download"></i>
                    </div>
                </div>
            </div>
            <div class="roomStateInnerMiddle assertInnerMiddle">
                <el-row :gutter="10" style="width: 100%">
                    <el-col style="height: 80px;" :span="3">
                        <div title="房间数" @click="toggleQuick(1)" v-bind:class="{active: quickIndex == 1}" class="quickSelectItem">
                            <p>房间数</p>
                            <span>{{selectedRoominfoStatistics.totalRoomCount}}</span>
                        </div>
                    </el-col>
                    <el-col style="height: 80px;" :span="3">
                        <div title="入住数" @click="toggleQuick(2)" v-bind:class="{active: quickIndex == 2}" class="quickSelectItem">
                            <p>入住数</p>
                            <span>{{selectedRoominfoStatistics.checkInRoomCount}}</span>
                            <p class="smallItem">
                                入住率 {{(selectedRoominfoStatistics.checkInRoomCount / selectedRoominfoStatistics.totalRoomCount) | rate}}%
                                <!-- <el-tag class="improveTag">↑12%</el-tag> -->
                            </p>
                        </div>
                    </el-col>
                    <el-col style="height: 80px;" :span="3">
                        <div title="空置数" @click="toggleQuick(3)" v-bind:class="{active: quickIndex == 3}" class="quickSelectItem">
                            <p>空置数</p>
                            <span>{{selectedRoominfoStatistics.vacantRoomCount}}</span>
                            <p class="smallItem">
                                空置率 {{(selectedRoominfoStatistics.vacantRoomCount / selectedRoominfoStatistics.totalRoomCount) | rate}}%
                                <!-- <el-tag class="unImproveTag">↓12%</el-tag> -->
                            </p>
                        </div>
                    </el-col>
                    <el-col style="height: 80px;" :span="3">
                        <div title="分期房间数" @click="toggleQuick(4)" v-bind:class="{active: quickIndex == 4}" class="quickSelectItem">
                            <p>分期房间数</p>
                            <span>{{selectedRoominfoStatistics.stageRoomCount}}</span>
                            <p class="smallItem">
                                分期率 {{(selectedRoominfoStatistics.stageRoomCount / selectedRoominfoStatistics.totalRoomCount) | rate}}%
                                <!-- <el-tag class="unImproveTag">↓2%</el-tag> -->
                            </p>
                        </div>
                    </el-col>
                    <el-col style="height: 80px;" :span="3">
                        <div title="今日新增分期数" @click="toggleQuick(5)" v-bind:class="{active: quickIndex == 5}" class="quickSelectItem">
                            <p>今日新增分期数</p>
                            <span>{{selectedRoominfoStatistics.todayStageStartRoomCount}}</span>
                            <p class="smallItem">
                                增期率 {{(selectedRoominfoStatistics.todayStageStartRoomCount / selectedRoominfoStatistics.totalRoomCount) | rate}}%
                                <!-- <el-tag class="unImproveTag">↓2%</el-tag> -->
                            </p>
                        </div>
                    </el-col>
                    <el-col style="height: 80px;" :span="3">
                        <div title="今日分期到期数" @click="toggleQuick(6)" v-bind:class="{active: quickIndex == 6}" class="quickSelectItem">
                            <p>今日分期到期数</p>
                            <span>{{selectedRoominfoStatistics.todayStageEndRoomCount}}</span>
                            <p class="smallItem">
                                到期率 {{(selectedRoominfoStatistics.todayStageEndRoomCount / selectedRoominfoStatistics.totalRoomCount) | rate}}%
                                <!-- <el-tag class="unImproveTag">↓2%</el-tag> -->
                            </p>
                        </div>
                    </el-col>
                    <el-col style="height: 80px;" :span="3">
                        <div title="今日新增租客数" @click="toggleQuick(7)" v-bind:class="{active: quickIndex == 7}" class="quickSelectItem">
                            <p>今日新增租客数</p>
                            <span>{{selectedRoominfoStatistics.todayStartTenantCount}}</span>
                            <p class="smallItem">
                                增客率 {{(selectedRoominfoStatistics.todayStartTenantCount / selectedRoominfoStatistics.totalTenantCount) | rate}}%
                                <!-- <el-tag class="unImproveTag">↓2%</el-tag> -->
                            </p>
                        </div>
                    </el-col>
                    <el-col style="height: 80px;" :span="3">
                        <div title="今日退租租客数" @click="toggleQuick(8)" v-bind:class="{active: quickIndex == 8}" class="quickSelectItem">
                            <p>今日退租租客数</p>
                            <span>{{selectedRoominfoStatistics.todayEndTenantCount}}</span>
                            <p class="smallItem">
                                退客率 {{(selectedRoominfoStatistics.todayEndTenantCount / selectedRoominfoStatistics.totalTenantCount) | rate}}%
                                <!-- <el-tag class="unImproveTag">↓1%</el-tag> -->
                            </p>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div id="rightBottomContainer" v-bind:class="{collopes: isScrolled}"
             class="rightBottomContainer">
            <div class="noRoomsDiv noRoomsDivSmall" v-show="noRoomFilter()">
                <img src="~@/assets/noRoomData.png" />
                <p v-if="!apartIsLoading">暂无该类型房间</p>
                <p v-else>房间数据加载中...</p>
            </div>
            <div v-for="(item, index) in floorsList" v-show="floorFilter(index)">
                <div class="floorTitle">
                    <div class="floorNumber">{{item.floor}}F</div>
                    <div class="floorDistrict"></div>
                </div>
                <ul class="roomListUl">
                    <li v-for="(subItem, subIndex) in item.roomRentStatusResponse" v-show="roomFilter(subItem.roomId)"
                        @click="openRight(index, subIndex)"
                        v-bind:class="{overdueType: subItem.roomInfo.overdueDay > 0, bookingType: subItem.isStaging, kongzhi: subItem.roomInfo.roomState == 'Vacancy',  guanzhu: (subItem.hasOrder || subItem.isStaging) && subItem.postLoanManagementInfo && (subItem.postLoanManagementInfo.loanState == 'Follow'), zhengchang: (subItem.postLoanManagementInfo && (subItem.postLoanManagementInfo.loanState == 'Normal')) || !subItem.postLoanManagementInfo, yichang: (subItem.hasOrder || subItem.isStaging) && subItem.postLoanManagementInfo && (subItem.postLoanManagementInfo.loanState == 'AbNormal'), qita: (subItem.hasOrder || subItem.isStaging) && subItem.postLoanManagementInfo && (subItem.postLoanManagementInfo.loanState == 'Other')}">
                        <div class="roomType">
                            <span v-if="subItem.roomInfo.roomState != 'Vacancy'">
                              <span v-if="subItem.postLoanManagementInfo">{{subItem.postLoanManagementInfo.loanState | loanState
                                  }}</span>
                              <span v-if="!subItem.postLoanManagementInfo">正常</span>
                            </span>
                            <span class="hoverHiddenItem" v-if="subItem.roomInfo.roomState == 'Vacancy'">空置</span>
                            <span v-if="subItem.roomInfo.roomState == 'Vacancy'"
                                  class="hoverShowInlineItem">已空置{{subItem.roomInfo.vacantDay}}天</span>
                            <div v-if="subItem.isStaging" class="bookingMark bookingmark2">分期
                                <div class="triangle-up"></div>
                            </div>
                        </div>
                        <p class="roomNo">
                            {{subItem.roomInfo.roomNumber}}
                        </p>

                        <p class="roomTenant" v-if="subItem.roomInfo && subItem.roomInfo.roomState == 'Vacancy'">
                            <span class="hoverHiddenItem">已空置<br>{{subItem.roomInfo.vacantDay}}天</span>
                            <span class="hoverShowInlineItem" style="color:#ff6260; font-size: 12px; "></span>
                        </p>
                        <p class="roomTenant" v-else-if="subItem.roomInfo && subItem.roomInfo.overdueDay > 0">
                            <span class="hoverHiddenItem">{{subItem.tenant.realName}}</span>
                            <span class="hoverShowInlineItem"
                                  style="color:#ff6260; font-size: 12px; ">已逾期{{subItem.roomInfo.overdueDay}}天</span>
                        </p>
                        <p class="roomTenant" v-else>
                            <span v-if="subItem.tenant" class="hoverHiddenItem">{{subItem.tenant.realName}}</span>
                        </p>
                        <div v-if="subItem.roomInfo && subItem.roomInfo.overdueDay > 0" class="overdueMark">已逾期</div>
                        <div v-if="subItem.isStaging" class="hoverShowItem collectDebt blockBtn greenBtn"
                             @click.stop="openLoantDlg(index, subIndex)">添加描述
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <n3-aside class="asideCommon" placement="right" title="Title" width="692px" ref="asideRight"
                  style="overflow-y: scroll;" :header="false">
            <div class="asideHeader">
                房间详情
                <el-tag v-if="currentSelectedRoom && currentSelectedRoom.postLoanManagementInfo" color="#07bf96">
                    {{currentSelectedRoom.postLoanManagementInfo.loanState | loanState }}
                </el-tag>
                <el-tag v-if="currentSelectedRoom && !currentSelectedRoom.postLoanManagementInfo" color="#07bf96">正常
                </el-tag>
                <i @click="closeRight()" class="el-dialog__close el-icon el-icon-close"></i>
            </div>
            <el-tabs v-if="isAsideOpen" class="asideFirstTab" v-model="asideActiveName" @tab-click="asideHandleClick">
                <el-tab-pane label="房间详情" name="first">
                    <!-- <button @click="openHouseDlg()">test</button> -->
                    <p v-if="currentSelectedRoom" class="asideHouseName">{{currentSelectedRoom.roomInfo.apartmentName}}
                        <!-- {{currentSelectedRoom.roomInfo.floor}}层  -->
                        {{currentSelectedRoom.roomInfo.roomNumber}}室</p>
                    <p class="tabSectionTitle">
                        <i class="bf_icon_roomInfo"></i> 房间信息
                    </p>
                    <div v-if="currentSelectedRoom" class="roomSection unEditState">
                        <el-col :span="4">房间名称</el-col>
                        <el-col :span="20">{{currentSelectedRoom.roomInfo.roomNumber}}室</el-col>
                        <el-col :span="4">门市价</el-col>
                        <el-col :span="20">{{currentSelectedRoom.roomInfo.retailPrice | amount2}}元</el-col>
                        <el-col :span="4">朝向</el-col>
                        <el-col :span="20">{{currentSelectedRoom.roomInfo.orientation}} </el-col>
                        <el-col :span="4">户型</el-col>
                        <el-col :span="20">{{currentSelectedRoom.roomInfo.roomTypeName}}</el-col>
                        <el-col :span="4">面积</el-col>
                        <el-col :span="20">{{currentSelectedRoom.roomInfo.roomTypeSize | amount2}}㎡</el-col>
                        <el-col :span="4">装修类型</el-col>
                        <el-col :span="20">{{currentSelectedRoom.roomInfo.decorationType | decorationType}}</el-col>
                        <el-col :span="4">装修描述</el-col>
                        <el-col :span="20">{{currentSelectedRoom.roomInfo.decorationDescription}}</el-col>
                        <el-col :span="4">房间图片</el-col>
                        <el-col :span="24">
                            <el-upload action="//jsonplaceholder.typicode.com/posts/"
                                       list-type="picture-card" :on-preview="handlePictureCardPreviewRoomPic"
                                       :file-list="roomImgList">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </el-col>
                    </div>
                    <div v-if="currentSelectedRoom && currentSelectedRoom.isStaging">
                         <div class="roomEditDiv">
                            <el-button class="greenNewBtn" @click.native="openLoantDlg(-1)">添加贷中</el-button>
                        </div>
                        <p class="tabSectionTitle" style="margin-bottom: 20px;">
                            <i class="bf_icon_bookInfo"></i>贷中管理
                        </p>
                        <el-table v-if="postLoanManagementInfos && postLoanManagementInfos.length > 0"
                                  class="littleTable unEditState expandColumn" :data="postLoanManagementInfos"
                                  style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="描述信息">
                                            <span>{{ props.row.description}}</span>
                                        </el-form-item>
                                        <div style="clear: both"></div>
                                        <el-form-item label="图片信息">
                                            <el-upload action="//jsonplaceholder.typicode.com/posts/"  
                                                       list-type="picture-card" :on-preview="handlePictureCardPreview"
                                                       :file-list="props.row.modifyPictures">
                                                <i class="el-icon-plus"></i>
                                            </el-upload>
                                            <!-- <span>{{ props.row.name }}</span> -->
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column prop="time" label="时间">
                                <template slot-scope="props">
                                    {{ props.row.createTime | dateYYMMDD}}
                                </template>
                            </el-table-column>
                            <el-table-column label="状态">
                                <template slot-scope="props">
                                    {{ props.row.loanState | loanState}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="operatorName" label="人员">
                            </el-table-column>
                        </el-table>
                        <div v-else style="width: 100%; text-align: center; padding-top:20px;">
                            <img src="~@/assets/noLoanInfosData.png" style="width: 140px;"/>
                            <p style="margin-top: 10px; color: #99A9BF">暂无贷中信息</p>
                        </div>
                        <!-- <div @click="openLoantDlg(-1)" class=" blockBtn greenBtn"
                             style="width:72px;height:28px;line-height:28px; margin-bottom: 20px; margin-top: 20px;">
                            添加贷中
                        </div> -->
                    </div>
                </el-tab-pane>
                <el-tab-pane label="租房合同" name="second">
                    <p v-if="currentSelectedRoom" class="asideHouseName">{{currentSelectedRoom.roomInfo.apartmentName}}
                        <!-- {{currentSelectedRoom.roomInfo.floor}}层 -->{{currentSelectedRoom.roomInfo.roomNumber}}室</p>
                    <img v-if="currentContractInfos && !currentContractInfos.contractResponse.confirmed"
                         src="~@/assets/chuo.png" style="width: 70px; float: right;"/>
                    <p v-if="currentContractInfos" class="tabSectionTitle">
                        <i class="bf_icon_uDetail"></i> 租客信息
                    </p>
                    <div v-if="currentContractInfos" class="roomSection unEditState">
                        <el-col :span="4">租客姓名</el-col>
                        <el-col :span="20">{{currentContractInfos.simpleTenantInfoResponse.realName}}</el-col>
                        <el-col :span="4">手机号码</el-col>
                        <el-col :span="20">{{currentContractInfos.simpleTenantInfoResponse.cellphone}}</el-col>
                        <el-col :span="4">身份证号</el-col>
                        <el-col :span="20">{{currentContractInfos.simpleTenantInfoResponse.idCardNo}}</el-col>
                        <el-col :span="4">身份证附件</el-col>
                        <el-col :span="24">
                            <el-upload action="//jsonplaceholder.typicode.com/posts/"  
                                       list-type="picture-card" :on-preview="handlePictureCardPreviewIdPic"
                                       :file-list="idcardImgList">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </el-col>
                        <!-- <el-col :span="4">同住人</el-col> -->
                        <!-- <el-col :span="20">王重阳 | 手机: 13677889920 | 身份证: 310230198876543567
                          <br/> 丘处机 | 手机: 13677889920 | 身份证: 310230198876543567
                        </el-col> -->
                    </div>
                    <p v-if="currentContractInfos" class="tabSectionTitle">
                        <i class="bf_icon_record"></i> 合同信息
                    </p>
                    <div v-if="currentContractInfos" class="roomSection unEditState">
                        <el-col :span="4">合同编号</el-col>
                        <el-col :span="20">{{currentContractInfos.contractResponse.contractNo}}</el-col>
                        <el-col :span="4">合同类型</el-col>
                        <el-col :span="20">{{currentContractInfos.contractResponse.contractType | contractType}}
                        </el-col>
                        <el-col :span="4">租赁时间</el-col>
                        <el-col :span="20">
                            {{currentContractInfos.contractResponse.rentStartTime | dateYYMMDD}} 至 {{currentContractInfos.contractResponse.rentEndTime | dateYYMMDD}}
                        </el-col>
                        <el-col :span="4">月租金</el-col>
                        <el-col :span="20">{{currentContractInfos.contractResponse.monthlyAmount | amount0}}元
                            <el-tag style="margin-left: 10px;" color="#3bde86">原</el-tag>
                            {{currentContractInfos.contractResponse.originalAmount | amount0}}元
                            <el-tag style="margin-left: 10px;" color="#ff6260">折</el-tag>
                            {{currentContractInfos.contractResponse.discount | discount}}
                        </el-col>
                        <el-col :span="4">支付方式</el-col>
                        <el-col :span="20">
                            押{{currentContractInfos.contractResponse.depositPeriod}}付{{currentContractInfos.contractResponse.payPeriod
                            }}
                        </el-col>
                        <el-col :span="4">收租日期</el-col>
                        <el-col :span="20">每期{{currentContractInfos.contractResponse.payDay}}日</el-col>
                        <el-col :span="4">房屋押金</el-col>
                        <el-col :span="20">{{currentContractInfos.contractResponse.depositAmount | amount0}}元</el-col>
                        <el-col :span="4">门禁卡押金</el-col>
                        <el-col :span="20">
                            {{currentContractInfos.contractResponse.accessCardDepositAmount | amount0}}元
                        </el-col>
                        <el-col :span="4">其他押金</el-col>
                        <el-col :span="20">{{currentContractInfos.contractResponse.othersDepositAmount | amount0}}元
                        </el-col>
                        <el-col :span="4">业务员信息</el-col>
                        <el-col :span="20"></el-col>
                        <el-col :span="4">合同附件</el-col>
                        <el-col :span="24">
                            <el-upload action="//jsonplaceholder.typicode.com/posts/"  
                                       list-type="picture-card" :on-preview="handlePictureCardContractPic"
                                       :file-list="contractImgList">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </el-col>
                    </div>
                    <div v-if="!currentContractInfos" style="width: 100%; text-align: center; padding-top:40px;">
                        <img src="~@/assets/noContract.png" style="width: 140px;"/>
                    </div>
                    <div style="height: 20px;"></div>
                </el-tab-pane>
                <el-tab-pane label="租客账单" name="third">
                    <p v-if="currentSelectedRoom" class="asideHouseName">{{currentSelectedRoom.roomInfo.apartmentName}}
                        <!-- {{currentSelectedRoom.roomInfo.floor}}层  -->
                        {{currentSelectedRoom.roomInfo.roomNumber}}室</p>
                    <el-tabs v-if="allOrders && allOrders.length > 0" class="asideSecondTab"
                             v-model="asideSecondActiveName" @tab-click="asideSecondHandleClick">
                        <el-tab-pane label="收款" name="first">
                            <p class="littleTableLable">未完成账单</p>
                            <el-table class="littleTable" :data="shouUnfinishOrders" border style="width: 100%">
                                <el-table-column label="账单周期" width="180">
                                    <template slot-scope="scope">
                                        {{scope.row.orderStartTime | dateYYMMDD}} 至 {{scope.row.orderEndTime | dateYYMMDD}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="账单类型">
                                    <template slot-scope="scope">
                                        {{scope.row.orderType | orderType}}
                                        <el-tag class="smallTag" v-if="scope.row.orderModel == 'Staging'" color="#ff8c14" close-transition>分</el-tag>
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
                                        <el-tag class="smallTag" v-if="scope.row.orderState == 'Overdue'" color="#ff6260"
                                                close-transition>逾</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button
                                                @click.native.prevent="checkOrderInfo(scope.row.orderId, scope.row.orderModel)"
                                                type="text"
                                                size="small">查看</el-button>
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
                                <el-table-column label="账单类型">
                                    <template slot-scope="scope">
                                        {{scope.row.orderType | orderType}}
                                        <el-tag class="smallTag" v-if="scope.row.orderModel == 'Staging'" color="#ff8c14" close-transition>分</el-tag>
                                        </el-tag>
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
                                        <el-tag class="smallTag" v-if="scope.row.orderState == 'Overdue'" color="#ff6260"
                                                close-transition>逾</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button
                                                @click.native.prevent="checkOrderInfo(scope.row.orderId, scope.row.orderModel)"
                                                type="text"
                                                size="small">
                                            查看
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="付款" name="second">
                            <p class="littleTableLable">未完成账单</p>
                            <el-table class="littleTable" :data="fuUnfinishOrders" border style="width: 100%">
                                <el-table-column label="账单周期" width="180">
                                    <template slot-scope="scope">
                                        {{scope.row.orderStartTime | dateYYMMDD}}至{{scope.row.orderEndTime | dateYYMMDD}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="账单类型">
                                    <template slot-scope="scope">
                                        {{scope.row.orderType | orderType}}
                                        <el-tag class="smallTag" v-if="scope.row.orderModel == 'Staging'" color="#ff8c14" close-transition>分</el-tag>
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
                                        <el-tag class="smallTag" v-if="scope.row.orderState == 'Overdue'" color="#ff6260"
                                                close-transition>逾</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button
                                                @click.native.prevent="checkOrderInfo(scope.row.orderId, scope.row.orderModel)"
                                                type="text"
                                                size="small">
                                            查看
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
                                <el-table-column label="账单类型">
                                    <template slot-scope="scope">
                                        {{scope.row.orderType | orderType}}
                                        <el-tag class="smallTag" v-if="scope.row.orderModel == 'Staging'" color="#ff8c14" close-transition>分</el-tag>
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
                                        <el-tag class="smallTag" v-if="scope.row.orderState == 'Overdue'" color="#ff6260"
                                                close-transition>逾</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button
                                                @click.native.prevent="checkOrderInfo(scope.row.orderId, scope.row.orderModel)"
                                                type="text"
                                                size="small">
                                            查看
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
        <addLoanDlg v-if="openAddLoanDlg" :showDialog='openAddLoanDlg' :fengniaowuLoanId="fengniaowuLoanId"
                    @on-result-change="onLoanChange" v-on:on-add-success="refreshLoanInfo"></addLoanDlg>
        <billDetailAside ref="billAside"></billDetailAside>
    </div>
</template>
<script>
    // import {
    //     n3Aside
    // } from 'N3-components'
    import {
        mapActions
    } from 'vuex'
    import addLoanDlg from '../subComponents/addLoanDlg'
    import billDetailAside from '../subComponents/billDetailAside'
    import constants from '../../constants/index'

    export default {
        data() {
            return {
                openAddLoanDlg: false,
                scrolled: 0,
                scrolledBefore: 0,
                isScrolled: false,
                isScrolling: false,
                asideActiveName: 'first',
                asideSecondActiveName: 'first',
                imgList: [{
                    name: 'house1',
                    url: 'http://www.shqnh.com/data/attached/5b1920b18aa8c34e85cc82dcd3d8db57/image/a37b2a10518cc08e62f3d0de940bbeb5.jpg'
                }, {
                    name: 'house2',
                    url: 'http://www.shqnh.com/data/attached/5b1920b18aa8c34e85cc82dcd3d8db57/image/0f132daa5877e2f4bd6e5fbcb3f6c8ee.jpg'
                }, {
                    name: 'house3',
                    url: 'http://www.shqnh.com/data/attached/5b1920b18aa8c34e85cc82dcd3d8db57/image/46cc4ea7269135a2774ca3ab1f5d3c82.jpg'
                }],
                quickIndex: 1,
                isAsideOpen: false,

                apartmentCurSelected: 0,
                apartmentsList: [],
                floorsList: [],
                floorCurSelected: 0,
                currentSelectedRoom: null,
                currentContractInfos: null,
                postLoanManagementInfos: [],
                allOrders: [],
                shouFinishOrders: [],
                shouUnfinishOrders: [],
                fuFinishOrders: [],
                fuUnfinishOrders: [],
                fengniaowuLoanId: null,
                roomImgList: [],
                idcardImgList: [],
                contractImgList: [],
                totalRoominfoStatistics: {},
                selectedRoominfoStatistics: {},
                apartIsLoading: false
            };
        },
        methods: {
            ...mapActions([
                'visibledialog'
            ]),
            showBillDetailAside: function (orderId, isStagOrder) {
                this.$refs.billAside.openRight(orderId, true, isStagOrder);
            },
            toggleQuick(val) {
                this.quickIndex = val;
            },
            getContainList() {
                var containList = [];
                switch (this.quickIndex) {
                    case 2:
                        containList = this.selectedRoominfoStatistics.checkInRoomIdList;
                        break;
                    case 3:
                        containList = this.selectedRoominfoStatistics.vacantRoomIdList;
                        break;
                    case 4:
                        containList = this.selectedRoominfoStatistics.stageRoomIdList;
                        break;
                    case 5:
                        containList = this.selectedRoominfoStatistics.todayStageStartRoomIdList;
                        break;
                    case 6:
                        containList = this.selectedRoominfoStatistics.todayStageEndRoomIdList;
                        break;
                    case 7:
                        containList = this.selectedRoominfoStatistics.todayStartTenantRoomIdList;
                        break;
                    case 8:
                        containList = this.selectedRoominfoStatistics.todayEndTenantRoomIdList;
                        break;
                }
                return containList;
            },
            roomFilter(roomId) {
                if (this.quickIndex == 1) {
                    return true;
                }
                else {
                    var containList = this.getContainList();
                    for (var i = 0; i < containList.length; i++) {
                        if (containList[i] == roomId) {
                            return true;
                        }
                    }
                    return false;
                }
            },
            floorFilter(floorIndex) {
                var floorItem = this.floorsList[floorIndex].roomRentStatusResponse;
                if (this.quickIndex == 1) {
                    return true;
                }
                else {
                    var containList = this.getContainList();
                    for (var i = 0; i < containList.length; i++) {
                        for (var j = 0; j < floorItem.length; j++) {
                            if (containList[i] == floorItem[j].roomId) {
                                return true;
                            }
                        }
                    }
                    return false;
                }
            },
            noRoomFilter() {
                var currentRoomsList = [];
                if (this.quickIndex == 1) {
                    currentRoomsList = this.floorsList;
                }
                else {
                    currentRoomsList = this.getContainList();
                }
                if (currentRoomsList && currentRoomsList.length > 0) {
                    return false;
                }
                else {
                    return true;
                }
            },
            handleScroll() {
              var _this = this;
              if (!_this.isScrolling) {
                setTimeout(() => {
                      // panel-c-c
                      _this.scrolled = document.getElementById('rightBottomContainer').scrollTop;
                      if (_this.scrolled > 200 && _this.scrolledBefore < _this.scrolled) {
                        _this.isScrolled = true;
                      } 
                      else if (_this.scrolledBefore > _this.scrolled){
                        _this.isScrolled = false;
                      }
                      setTimeout(() => {_this.scrolledBefore = _this.scrolled;},0);    
                      _this.isScrolling = false;
                }, 100);
                _this.isScrolling = true;
              }
              
            },
            openRight(floorIndex, roomIndex) {

                var _this = this;
                // init aside
                _this.isAsideOpen = true;
                _this.asideActiveName = 'first';
                _this.asideSecondActiveName = 'first';

                _this.currentSelectedRoom = _this.floorsList[floorIndex].roomRentStatusResponse[roomIndex];

                _this.currentContractInfos = null;
                _this.roomImgList = [];
                _this.idcardImgList = [];
                _this.contractImgList = [];
                _this.postLoanManagementInfos = [];

                _this.shouFinishOrders = [];
                _this.shouUnfinishOrders = [];
                _this.fuFinishOrders = [];
                _this.fuUnfinishOrders = [];
                _this.allOrders = [];
                if (_this.currentSelectedRoom.roomInfo.pictures) {
                    var roomImgList = _this.currentSelectedRoom.roomInfo.pictures.split(',');
                    for (var i = 0; i < roomImgList.length; i++) {
                        var item = {
                            name: 'roomInfo' + i,
                            url: roomImgList[i]
                        }
                        _this.roomImgList.push(item);
                    }
                }
                if (_this.currentSelectedRoom.roomInfo.roomState != 'Vacancy') {
                    var contractId = _this.currentSelectedRoom.roomInfo.contractId;
                    if (contractId) {
                        _this.$api.get(constants.KCURLS.GETCONTRACTBYCONTRACTID + contractId,
                            function (res) {
                                _this.currentContractInfos = res;
                                _this.idcardImgList = [{
                                    name: 'idcard1',
                                    url: _this.currentContractInfos.simpleTenantInfoResponse.credentialFacePhotoUrl
                                },
                                    {
                                        name: 'idcard2',
                                        url: _this.currentContractInfos.simpleTenantInfoResponse.credentialBackPhotoUrl
                                    }];
                                var resposeConImgList = _this.currentContractInfos.contractResponse.contractPictures.split(',');
                                for (var i = 0; i < resposeConImgList.length; i++) {
                                    var item = {
                                        name: 'contractInfo' + i,
                                        url: resposeConImgList[i]
                                    }
                                    _this.contractImgList.push(item);
                                }
                            }, function (err) {

                            });

                        _this.$api.get(constants.KCURLS.GETPOSTLOANMANAGEMENTSBYCONTRACTID + contractId,
                            function (res) {
                                _this.postLoanManagementInfos = res;
                                for (var i = 0; i < _this.postLoanManagementInfos.length; i++) {
                                    var picturesTempList = [];
                                    for (var j = 0; j < _this.postLoanManagementInfos[i].pictures.length; j++) {
                                        if (_this.postLoanManagementInfos[i].pictures[j] == "") {
                                            continue;
                                        }
                                        var item = {
                                            name: 'postLoan' + j,
                                            url: _this.postLoanManagementInfos[i].pictures[j]
                                        };
                                        picturesTempList.push(item);
                                    }
                                    _this.postLoanManagementInfos[i].modifyPictures = picturesTempList;
                                    //
                                    //
                                }
                            }, function (err) {

                            });
                        // if (!_this.currentSelectedRoom.isStaging) {
                        _this.$api.get(constants.KCURLS.GETINSTALLMENTORDERSANDNORMALORDERS + contractId,
                            function (res) {
                                _this.allOrders = res;
                                for (var j = 0; j < res.length; j++) {
                                    // 付款账单
                                    if (res[j].orderCategory == 'Out') {
                                        // 101:已生成 102:已支付 103:已逾期 104:已分期
                                        if (res[j].orderState == 'Created' || res[j].orderState == 'Overdue') {
                                            _this.fuUnfinishOrders.push(res[j]);
                                        }
                                        else {
                                            _this.fuFinishOrders.push(res[j]);
                                        }
                                    }
                                    // 收款账单
                                    else if (res[j].orderCategory == 'In') {
                                        if (res[j].orderState == 'Created' || res[j].orderState == 'Overdue') {
                                            _this.shouUnfinishOrders.push(res[j]);
                                        }
                                        else {
                                            _this.shouFinishOrders.push(res[j]);
                                        }
                                    }

                                }
                            }, function (err) {

                            });
                        // }
                        // else {
                        //   _this.$api.get(constants.KCURLS.GETINSTALLMENTORDERSANDNORMALORDERS + contractId,
                        //     function(res) {
                        //         _this.allOrders = res;
                        //         for (var j = 0; j < res.length; j++) {
                        //           if (res[j].orderState == 'Created' || res[j].orderState == 'Overdue') {
                        //             _this.shouUnfinishOrders.push(res[j]);
                        //           }
                        //           else {
                        //             _this.shouFinishOrders.push(res[j]);
                        //           }
                        //         }
                        //       }, function(err) {

                        //       });
                        // }

                    }

                }
                _this.$refs.asideRight.open();
            },
            asideHandleClick(tab, event) {
            },
            asideSecondHandleClick(tab, event) {
            },
            closeRight() {
                this.$refs.asideRight.close();
                this.isAsideOpen = false;
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            checkOrderInfo(orderId, orderModel) {
                this.showBillDetailAside(orderId, orderModel == 'Staging');
            },
            handlePictureCardPreviewRoomPic(file) {
                this.visibledialog({
                    url: file.url,
                    urlList: this.roomImgList
                })
            },
            handlePictureCardPreviewIdPic(file) {
                this.visibledialog({
                    url: file.url,
                    urlList: this.idcardImgList
                })
            },
            handlePictureCardContractPic(file) {
                this.visibledialog({
                    url: file.url,
                    urlList: this.contractImgList
                })
            },
            handlePictureCardPreview(file) {
                this.visibledialog({
                    url: file.url
                })
            },
            openLoantDlg: function (floorIndex, roomIndex) {
                var _this = this;
                // 从侧边栏打开已经确认是哪间房间啦
                if (floorIndex == '-1') {
                    _this.fengniaowuLoanId = _this.currentSelectedRoom.installmentOrderInfo.contractId;
                }
                else {
                    _this.fengniaowuLoanId = _this.floorsList[floorIndex].roomRentStatusResponse[roomIndex].installmentOrderInfo.contractId;
                }
                this.openAddLoanDlg = true;
            },
            onLoanChange(val) {
                this.openAddLoanDlg = val;
            },
            refreshLoanInfo(val) {
                var _this = this;
                _this.refreshRoomsInfo();
                if (_this.isAsideOpen) {
                    var contractId = null;
                    if (_this.currentSelectedRoom.orderInfo) {
                        contractId = _this.currentSelectedRoom.orderInfo.contractId;
                    }
                    else if (_this.currentSelectedRoom.installmentOrderInfo) {
                        contractId = _this.currentSelectedRoom.installmentOrderInfo.contractId
                    }

                    if (contractId) {
                        _this.$api.get(constants.KCURLS.GETPOSTLOANMANAGEMENTSBYCONTRACTID + contractId,
                            function (res) {
                                _this.postLoanManagementInfos = res;

                                for (var i = 0; i < _this.postLoanManagementInfos.length; i++) {
                                    var picturesTempList = [];
                                    for (var j = 0; j < _this.postLoanManagementInfos[i].pictures.length; j++) {
                                        var item = {
                                            name: 'postLoan' + i,
                                            url: _this.postLoanManagementInfos[i].pictures[j]
                                        };
                                        picturesTempList.push(item);
                                    }
                                    _this.postLoanManagementInfos[i].modifyPictures = picturesTempList;
                                    //
                                    //
                                }
                            }, function (err) {

                            });
                    }
                }
            },
            getApartmentsList() {
                this.apartmentCurSelected = 0;
                this.apartmentsList = [];
                var _this = this;
                this.$api.get(constants.KCURLS.GETAPARTMENTS,
                    function (res) {
                        _this.apartmentsList = res;
                        _this.refreshRoomsInfo();
                    }, function (err) {

                    });
            },
            changeSelectedApart(val) {
                this.quickIndex = 1;
                // stop watch scroll event;
                document.getElementById('rightBottomContainer').onscroll = null;
                this.scrolled = 0;
                this.scrolledBefore = 0;
                // document.getElementById('rightBottomContainer').scrollTop = -200;
                if (val == this.apartmentCurSelected) {
                    return false;
                }
                if (this.apartIsLoading) {
                    return false;
                }
                this.apartmentCurSelected = val;
                this.refreshRoomsInfo();
            },
            refreshRoomsInfo() {
                this.getRooms();
                this.getSelectedRoominfoStatistics();
            },
            refreshRoomsInfoClear() {
                this.refreshRooms();
                this.getSelectedRoominfoStatistics();
            },
            getRoominfoStatistics(apartId) {
                var _this = this;
                var uriRequest = constants.KCURLS.GETROOMINFOSTATISTICS;
                if (!apartId) {
                    _this.totalRoominfoStatistics = {};
                }
                else {
                    uriRequest = uriRequest + '?apartmentId=' + apartId;
                    _this.selectedRoominfoStatistics = {};
                }
                _this.$api.get(uriRequest, function (res) {
                    if (!apartId) {
                        _this.totalRoominfoStatistics = res;
                    }
                    else {
                        _this.selectedRoominfoStatistics = res;
                    }
                });
            },
            getSelectedRoominfoStatistics() {
                if (this.apartmentCurSelected.length == 0) {
                    return false;
                }
                this.getRoominfoStatistics(this.apartmentsList[this.apartmentCurSelected].apartmentId);
            },
            getRooms() {
                if (this.apartmentCurSelected.length == 0) {
                    return false;
                }
                var _this = this;
                _this.apartIsLoading = true;
                _this.floorsList = [];
                _this.$api.get(constants.KCURLS.GETAPARTMENTROOMRENTSTATUS + _this.apartmentsList[_this.apartmentCurSelected].apartmentId, function (res) {
                    _this.apartIsLoading = false;
                    document.getElementById('rightBottomContainer').onscroll = _this.handleScroll;
                    _this.floorsList = res;
                    if (_this.floorsList.length > 0) {
                        _this.floorCurSelected = 0;
                    }
                }, function (err) {
                    _this.apartIsLoading = false;
                });
            },
            refreshRooms() {
                if (this.apartmentCurSelected.length == 0) {
                    return false;
                }
                var _this = this;
                _this.apartIsLoading = true;
                _this.floorsList = [];
                _this.$api.get(constants.KCURLS.REFRESHAPARTMENTROOMRENTSTATUS + _this.apartmentsList[_this.apartmentCurSelected].apartmentId, function (res) {
                    _this.apartIsLoading = false;
                    document.getElementById('rightBottomContainer').onscroll = _this.handleScroll;
                    _this.floorsList = res;
                    if (_this.floorsList.length > 0) {
                        _this.floorCurSelected = 0;
                    }
                }, function (err) {
                    _this.apartIsLoading = false;
                });
            },
            changeSelectedFloor(val) {
                if (val == this.floorCurSelected) {
                    return false;
                }
                this.floorCurSelected = val;
            }
        },
        created() {
            this.getApartmentsList();
            this.getRoominfoStatistics();
        },
        mounted() {
            document.getElementById('rightBottomContainer').onscroll = this.handleScroll;
        },
        components: {
            // n3Aside,
            addLoanDlg,
            billDetailAside
        },
    };
</script>

<style scoped>
    ul.apartmentsList {
      height: calc(100% - 60px);
      overflow-y: auto;
    }
    .roomStateInnerMiddle.assertInnerMiddle {
        height: 100px;
    }

    ul.test li {
        height: 100px;
        font-size: 50px;
    }

    .el-tag.improveTag {
        background: rgba(59, 222, 134, 0.15);
        color: #3aca60;
        border-radius: 200px;
        margin-left: 5px;
    }

    .el-tag.unImproveTag {
        background: rgba(255, 98, 96, 0.15);
        color: #ff6260;
        border-radius: 200px;
        margin-left: 5px;
    }

    p.boldText {
        font-size: 20px;
        color: #161616;
    }

    .rightInfos p.boldText span {
        vertical-align: middle;
    }

    p.littleText {
        font-size: 12px;
        color: #6a7088;
    }

    .rightInfos p.littleText {
        padding-left: 27px;
        margin-bottom: 30px;
    }

    .marTop80 {
        margin-top: 80px;
    }

    .marTop40 {
        margin-top: 40px;
    }

    .marTop10 {
        margin-top: 10px;
    }

    .topPageContainer {
        background: #ffffff;
        /*box-shadow:-2px 2px 2px 0 rgba(119,151,177,0.16);*/
        border-radius: 4px;
        left: 200px;
        right: 20px;
        top: 70px;
        height: 330px;
        position: fixed;
        z-index: 12;
        border: 20px #f1f2f7 solid;
        border-bottom: 10px #f1f2f7 solid;
        overflow: hidden;
        transition: height .5s;
        min-width: 860px;
    }

    .topPageContainer.collopes {
        height: 80px;
    }

    .topPageContainer.collopes .totalHousesNo {
        display: none;
    }

    .openTitle {
        width: 100%;
        height: 60px;
        padding: 0 20px;
        line-height: 60px;
        font-size: 16px;
        color: #3c4144;
        border-bottom: 1px solid #e6eaee;
    }

    .openTitle .refresh-btn {
        margin-top: 12px;
    }

    .topPageContainer .el-col {
        height: 100%;
        border-right: 1px solid #e6eaee;
        padding: 20px 30px;
        overflow: hidden;
    }

    .topPageContainer p.cardName {
        font-size: 16px;
        color: #6a7088;
        margin-left: -13px;
        padding-left: 10px;
        height: 15px;
        border-left: 3px solid #07bf96;
        line-height: 14px;
    }

    .topPageContainer .el-col:last-child {
        border-right: block;
    }

    .leftBottomContainer {
        position: fixed;
        z-index: 12;
        top: 400px;
        bottom: 20px;
        left: 200px;
        background: #ffffff;
        border-radius: 4px;
        width: 260px;
        border-left: 20px #f1f2f7 solid;
        border-right: 15px #f1f2f7 solid;
        transition: top .5s;
    }

    .leftBottomContainer.collopes {
        top: 150px;
    }

    .rightQuickAccess {
        position: fixed;
        background-color: #fff;
        right: 20px;
        border-right: 20px #f1f2f7 solid;
        left: 460px;
        top: 400px;
        height: 160px;
        transition: top .5s;
        z-index: 12;
        /*min-width: 838px;*/
    }

    .rightQuickAccess.collopes {
        top: 150px;
    }

    .rightBottomContainer {
        /*width: calc(100% - 245px);
        min-width: 830px;
        margin-left: 240px;
        margin-top: 470px;*/

        background-color: #fff;
        transition: top .5s;
        padding: 10px 20px 20px;
    }
    .rightBottomContainer {
        position: fixed;
        left: 460px;
        top: 560px;
        right: 40px;
        bottom: 20px;
        overflow-y: scroll;
    }

    .rightBottomContainer.collopes {
        /*margin-top: 200px;
        border-bottom: 290px solid transparent;*/
        padding-bottom: 380px;
        top: 200px;
    }

    .leftCircles {
        width: 210px;
        height: 100%;
        float: left;
        position: relative;
        text-align: center;
        line-height: 280px;
    }

    .leftCircles .el-progress {
        position: absolute;
        top: 40px;
        left: 0;
    }

    .leftCircles .progress2 {
        top: 60px;
        left: 20px;
    }

    .leftCircles .progress3 {
        top: 80px;
        left: 40px;
        position: absolute;
    }

    .leftCircles p {
        font-size: 16px;
        color: #6a7088;
        margin-left: -10px;
    }

    .rightInfos {
        width: calc(100% - 210px);
        height: 100%;
        float: left;
        padding: 40px 20px 0 40px;
    }

    .markSpan {
        width: 11px;
        height: 11px;
        display: inline-block;
        margin-right: 10px;
        border-radius: 100%;
    }

    .blue {
        background: rgb(32, 160, 255);
    }

    .green {
        background: rgb(19, 206, 102);
    }

    .red {
        background: rgb(255, 73, 73);
    }

    .bookingMark.bookingmark2 {
        width: 30px;
    }

    .bookingmark2 .triangle-up {
        width: 0;
        height: 0;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-bottom: 6px solid #ffffff;
        margin-top: 0px;
    }

    .smallItem {
        font-size: 10px;
        letter-spacing: -1px;
    }

    .quickSelectItem .improveTag,
    .quickSelectItem .unImproveTag {
        font-size: 10px;
        padding: 0 3px;
        height: 20px;
        line-height: 20px;
    }

    .quickSelectItem {
        padding-top: 5px;
    }

    @media screen and (max-width: 1400px) {
        .rightQuickAccess {
            min-width: 600px;
        }
        .rightBottomContainer {
            min-width: 580px;
        }
        .quickSelectItem {
            padding-left: 0;
            padding-right: 0;
            height: 40px;
            line-height: 30px;
            text-align: center;
        }
        .quickSelectItem p{
            display: none;
        }
        .roomStateInnerMiddle {
            min-width: 580px;
        }

        .leftCircles {
            display: none;
        }
        .rightInfos {
            width: 100%;
        }
        .totalHousesNo {
            display: none;
        }
        
    }
    .littleTable.expandColumn .el-form-item__label {
        color: #545454;
    }

    .littleTable.expandColumn .el-form-item__content span {
        color: #8C96AB;
    }

    .reloadBtns {
        float: right;
        margin-top: -8px;
        margin-right: 30px;
    }

    .reloadBtns div {
        display: inline-block;
    }

    .reloadBtns .refresh-btn {
        margin-top: 0;
    }

    .reloadBtns .download-btn {
        width: 106px;
        margin-right: 15px;
        font-size: 16px;
    }

    .reloadBtns .download-btn i,
    .reloadBtns .download-btn span {
        vertical-align: top;
        line-height: 36px;
    }

    .download-btn i {
        font-size: 20px;
    }
</style>
<style>
    .ruzhu .el-progress-bar__inner {
        background: rgb(32, 160, 255);
    }

    .kongzhi .el-progress-bar__inner {
        background: rgb(255, 73, 73);
    }
</style>
