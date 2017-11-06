<template>
<div>
  <div v-bind:class="{ closure: closureCalendar }" class="left-float-item border-radius-4 summaryLeft">
    <div id="calendar">
      <div class="month">
        <ul>
          <li class="year-month" style="padding: 0 30px 0 20px;">待办</li>
          <li v-bind:class="{ disabledCalcBtn: isSmallerEqualToday(currentYear, currentMonth) }" class="arrow" @click="pickPre(currentYear,currentMonth)">
            <i style="font-size: 14px;" class="el-icon-caret-left"></i>
          </li>
          <li class="year-month">
            <span class="choose-year">{{ selectYear }}.{{ selectMonth }}.{{selectDay}}</span>
          </li>
          <li class="arrow" @click="pickNext(currentYear,currentMonth)">
            <i style="font-size: 14px;" class="el-icon-caret-right"></i>
          </li>
          <li @click="toggleClosureWeek()" class="year-month toggleText">
            <span v-show="closureCalendar">展开</span>
            <span v-show="!closureCalendar">收起</span>
          </li>
          <li @click="toggleClosureWeek()" v-bind:class="{ active: closureCalendar }" class="toggleIcon">
            <div class="circle-triangle-down">
              <div class="triangle-down"></div>
            </div>
          </li>
        </ul>
      </div>
      <ul class="weekdays">
        <li>日</li>
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
      </ul>
      <ul class="days">
        <li @click="pick(day)" v-for="(day, index) in days" v-bind:class="{ disabledCalcBtn: isDaySmallerEqualToday(day.getDate(), currentMonth), hasDaiban: hasDaiban(day.getDate()) }" >
          <span v-if="day.getMonth()+1 != currentMonth" class="other-month"> </span>
          <span v-else >
              <span v-if="day.getFullYear() == new Date().getFullYear() && new Date().getFullYear() == selectYear  && day.getMonth() == new Date().getMonth() && new Date().getMonth() + 1 == selectMonth && day.getDate() == new Date().getDate() && new Date().getDate() == selectDay" class="cur_active active">{{ day.getDate() }}</span>
              <span v-else-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()" class="cur_active">{{ day.getDate() }}</span>
              <span v-else-if="day.getFullYear() == selectYear && day.getMonth() + 1 == selectMonth && day.getDate() == selectDay" class="active">{{ day.getDate() }}</span>
              <span v-else>{{ day.getDate() }}</span>

              <i class="active hasInfoDor" v-if="day.getFullYear() == selectYear && day.getMonth() + 1 == selectMonth && day.getDate() == selectDay">.</i>
              <i class="hasInfoDor" v-else>.</i>
          </span>
        </li>
      </ul>
    </div>
    <el-tabs class='notifierTab' type="border-card" v-model="activeName" @tab-click="tabClick">
      <el-tab-pane style="height: 385px;" :label="zhangdanLabel" name="first">
        <ul v-if="dayDaibanInfos" class="billUl">
          <li v-for="item in dayDaibanInfos.orders ">
            <div v-if="item.orderCategory == 'In'" class="produceLittleTapLable" @click="openCollectionDlgFunc(item.orderId)">应收</div>
            <div v-else class="produceLittleTapLable" @click="openCollectionDlgFunc(item.orderId)">应付</div>
            <p class="produceRoomInfo">{{item.apartmentName + ' ' + item.roomNumber + '室'}}</p>
            <p class="marTop20">
              <span style="font-size:14px;color:#b0b0b0;">{{item.paymentTime | dateYYMMDD }}</span>
              <span v-show="item.orderState == 'Overdue'" class="produceStateLable">已逾期</span>
            </p>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane style="height: 385px;" :label="hetongLabel" name="second">
        <ul v-if="dayDaibanInfos" class="contractUl">
          <li v-for="item in dayDaibanInfos.contracts">
            <p class="produceRoomInfo">{{item.apartmentName + ' ' + item.roomNumber + '室'}}
              <span @click="openThrowALeaseDlg(item.contractId)" class="produceLittleTapLable">退租</span>
            </p>
            <p class="marTop20">
              <span style="font-size:14px;color:#b0b0b0;">{{item.rentEndTime | dateYYMMDD}}</span>
              <span v-if="checkTheDateOverdue(item.rentEndTime)" class="produceStateLable">逾期未处理</span>
            </p>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane style="height: 385px;" :label="dingjinLabel" name="third">
        <ul v-if="dayDaibanInfos" class="earnestUl">
          <li  v-for="item in dayDaibanInfos.roomReservations ">
            <p class="produceRoomInfo">{{item.apartmentName + ' ' + item.roomNumber + '室'}}
              <span @click="openAddContractDlg(item)" class="produceLittleTapLable">转合同</span>
            </p>
            <p class="marTop20">
              <span style="font-size:14px;color:#b0b0b0;">{{item.checkInTime | dateYYMMDD}}</span>
              <span v-if="checkTheDateOverdue(item.checkInTime)" class="produceStateLable">逾期未处理</span>
            </p>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
  <div class="left-float-item summaryRight">
    <el-row class="right-top-c-c" :gutter="15">
      <el-col style="height: 100%;" :span="8">
        <div class="border-radius-4 bg-purple">
          <div class="itemTitle">
            <span>近期收支情况</span>
          </div>
          <div style="margin-top: 15px">
            <p class="income-p income-curday">
              <label>今日</label>
              <span>{{(commonStatistics.todayIn - commonStatistics.todayOut) | amount2}}</span>
            </p>
            <p class="income-p income-curWeek">
              <label>本周</label>
              <span>{{(commonStatistics.weekIn - commonStatistics.weeOut) | amount2}}</span>
            </p>
            <p class="income-p income-curMonth">
              <label>本月</label>
              <span>{{(commonStatistics.monthIn - commonStatistics.monthOut) | amount2}}</span>
            </p>
            <p class="income-p income-curSeason">
              <label>本季度</label>
              <span>{{(commonStatistics.quarterIn - commonStatistics.quarterOut) | amount2}}</span>
            </p>
          </div>
        </div>
      </el-col>
      <el-col style="height: 100%;" :span="16">
        <div class="border-radius-4 bg-purple">
          <div class="itemTitle">
            <span>快捷操作</span>
          </div>
          <el-row class="quickEntrance">
            <el-col :span="6">
              <div @click="gotoRoomState" class="quickEnter bg_color_47cabf">
                <i class="bf_icon_addapart"></i>
              </div>
              <p>添加公寓</p>
            </el-col>
            <el-col :span="6">
              <div @click="gotoRoomState" class="quickEnter bg_color_a9d773">
                <i class="bf_icon_adduser"></i>
              </div>
              <p>添加租客</p>
            </el-col>
            <el-col :span="6">
              <div @click="gotoRoomState" class="quickEnter bg_color_ff8f59">
                <i class="bf_icon_addbooking"></i>
              </div>
              <p>添加预定</p>
            </el-col>
            <el-col :span="6">
              <div @click="showGatherinBillDlg" class="quickEnter bg_color_5dcaf1">
                <i class="bf_icon_addinout"></i>
              </div>
              <p>添加账单</p>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <div class="border-radius-4 right-middle-bottom-c-c">
      <div class="itemTitle">
        <span>经营状况</span>
        <el-row class="run_situation">
          <el-col :span="8" class="run_situation_tab" v-bind:class="{ active: curRunSituation === 1 }">
            <p @click="tabToggleRunSituation(1)">今日</p>
          </el-col>
          <el-col :span="8" class="run_situation_tab" v-bind:class="{ active: curRunSituation === 2 }">
            <p @click="tabToggleRunSituation(2)">本周</p>
          </el-col>
          <el-col :span="8" class="run_situation_tab" v-bind:class="{ active: curRunSituation === 3 }">
            <p @click="tabToggleRunSituation(3)">本月</p>
          </el-col>
        </el-row>
      </div>
      <el-row v-show="curRunSituation === 1" class="run_situation_detail">
        <el-col :span="12" style="margin-top: 50px;">
          <div class="run_situation_detail_item">
            <p>已处理租客合同
              <span><label>{{commonStatistics.todayDoneContractCount}}</label> / {{commonStatistics.todayAllContractCount}}</span>
            </p>
            <el-progress :percentage="commonStatistics.todayDoneContractCount | rateNoOnce(commonStatistics.todayAllContractCount)" :show-text="false"></el-progress>
          </div>
        </el-col>
        <el-col :span="12" style="margin-top: 50px;">
          <div class="run_situation_detail_item">
            <p>已收账款
              <span><label>{{commonStatistics.todayDoneOrderInAmount | amount0}}</label> / {{commonStatistics.todayAllOrderInAmount | amount0}}</span>
            </p>
            <el-progress :percentage="commonStatistics.todayDoneOrderInAmount | rateNoOnce(commonStatistics.todayAllOrderInAmount)" :show-text="false"></el-progress>
          </div>
        </el-col>
        <el-col :span="12" style="margin-top: 50px;">
          <div class="run_situation_detail_item">
            <p>已处理租客账单
              <span><label>{{commonStatistics.todayDoneOrderCount}}</label> / {{commonStatistics.todayAllOrderCount}}</span>
            </p>
            <el-progress :percentage="commonStatistics.todayDoneOrderCount | rateNoOnce(commonStatistics.todayAllOrderCount)" :show-text="false"></el-progress>
          </div>
        </el-col>
        <el-col :span="12" style="margin-top: 50px;">
          <div class="run_situation_detail_item">
            <p>已付账款
              <span><label>{{commonStatistics.todayDoneOrderOutAmount | amount0}}</label> / {{commonStatistics.todayAllOrderOutAmount | amount0}}</span>
            </p>
            <el-progress :percentage="commonStatistics.todayDoneOrderOutAmount | rateNoOnce(commonStatistics.todayAllOrderOutAmount)" :show-text="false"></el-progress>
          </div>
        </el-col>
      </el-row>
      <el-row v-show="curRunSituation === 2" class="run_situation_detail">
        <el-col :span="12" style="margin-top: 50px;">
          <div class="run_situation_detail_item">
            <p>已处理租客合同
              <span><label>{{commonStatistics.weekDoneContractCount}}</label> / {{commonStatistics.weekAllContractCount}}</span>
            </p>
            <el-progress :percentage="commonStatistics.weekDoneContractCount | rateNoOnce(commonStatistics.weekAllContractCount)" :show-text="false"></el-progress>
          </div>
        </el-col>
        <el-col :span="12" style="margin-top: 50px;">
          <div class="run_situation_detail_item">
            <p>已收账款
              <span><label>{{commonStatistics.weekDoneOrderInAmount | amount0}}</label> / {{commonStatistics.weekAllOrderInAmount | amount0}}</span>
            </p>
            <el-progress :percentage="commonStatistics.weekDoneOrderInAmount | rateNoOnce(commonStatistics.weekAllOrderInAmount)" :show-text="false"></el-progress>
          </div>
        </el-col>
        <el-col :span="12" style="margin-top: 50px;">
          <div class="run_situation_detail_item">
            <p>已处理租客账单
              <span><label>{{commonStatistics.weekDoneOrderCount}}</label> / {{commonStatistics.weekAllOrderCount}}</span>
            </p>
            <el-progress :percentage="commonStatistics.weekDoneOrderCount | rateNoOnce(commonStatistics.weekAllOrderCount)" :show-text="false"></el-progress>
          </div>
        </el-col>
        <el-col :span="12" style="margin-top: 50px;">
          <div class="run_situation_detail_item">
            <p>已付账款
              <span><label>{{commonStatistics.weekDoneOrderOutAmount | amount0}}</label> / {{commonStatistics.weekAllOrderOutAmount | amount0}}</span>
            </p>
            <el-progress :percentage="commonStatistics.weekDoneOrderOutAmount | rateNoOnce(commonStatistics.weekAllOrderOutAmount)" :show-text="false"></el-progress>
          </div>
        </el-col>
      </el-row>
      <el-row v-show="curRunSituation === 3" class="run_situation_detail">
        <el-col :span="12" style="margin-top: 50px;">
          <div class="run_situation_detail_item">
            <p>已处理租客合同
              <span><label>{{commonStatistics.monthDoneContractCount}}</label> / {{commonStatistics.monthAllContractCount}}</span>
            </p>
            <el-progress :percentage="commonStatistics.monthDoneContractCount | rateNoOnce(commonStatistics.monthAllContractCount)" :show-text="false"></el-progress>
          </div>
        </el-col>
        <el-col :span="12" style="margin-top: 50px;">
          <div class="run_situation_detail_item">
           <p>已收账款
              <span><label>{{commonStatistics.monthDoneOrderInAmount | amount0}}</label> / {{commonStatistics.monthAllOrderInAmount | amount0}}</span>
            </p>
            <el-progress :percentage="commonStatistics.monthDoneOrderInAmount | rateNoOnce(commonStatistics.monthAllOrderInAmount)" :show-text="false"></el-progress>
          </div>
        </el-col>
        <el-col :span="12" style="margin-top: 50px;">
          <div class="run_situation_detail_item">
            <p>已处理租客账单
              <span><label>{{commonStatistics.monthDoneOrderCount}}</label> / {{commonStatistics.monthAllOrderCount}}</span>
            </p>
            <el-progress :percentage="commonStatistics.monthDoneOrderCount | rateNoOnce(commonStatistics.monthAllOrderCount)" :show-text="false"></el-progress>
          </div>
        </el-col>
        <el-col :span="12" style="margin-top: 50px;">
          <div class="run_situation_detail_item">
            <p>已付账款
              <span><label>{{commonStatistics.monthDoneOrderOutAmount | amount0}}</label> / {{commonStatistics.monthAllOrderOutAmount | amount0}}</span>
            </p>
            <el-progress :percentage="commonStatistics.monthDoneOrderOutAmount | rateNoOnce(commonStatistics.monthAllOrderOutAmount)" :show-text="false"></el-progress>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="border-radius-4 right-middle-bottom-c-c" style="height: 325px;">
      <div class="itemTitle">
        <span>经营数据统计</span>
        <el-row class="management_statistics">
          <el-col :span="6">&nbsp;
          </el-col>
          <el-col :span="1">
            <div class="circle_reminder"></div>
          </el-col>
          <el-col :span="5">入住率</el-col>
          <el-col :span="1">
            <div class="circle_reminder bg_color_ff6260"></div>
          </el-col>
          <el-col :span="5">退租率</el-col>
          <el-col :span="1">
            <div class="circle_reminder bg_color_ff8c14"></div>
          </el-col>
          <el-col :span="5">续租率</el-col>
        </el-row>
      </div>
      <el-row class="management_statistics_detail">
        <el-col :span="8">
          <div class="circle_progress_div">
            <!-- <el-progress type="circle" :width="107" :percentage="25"></el-progress> -->
            <rd-progress-circle :progress="progressCircle1"></rd-progress-circle>
            <div class="progress-circle-absolute-div">
              <p>{{(commonStatistics.roomCount == 0 ? 0 : 1 - commonStatistics.vacantRoomCount / commonStatistics.roomCount) | rate}} %</p>
              <span>入住率</span>
            </div>
          </div>
          <p>房源总数: <span>{{commonStatistics.roomCount}}</span> 间</p>
          <p>空置间数: <span>{{commonStatistics.vacantRoomCount}}</span> 间</p>
        </el-col>
        <el-col :span="8">
          <div class="circle_progress_div">
            <!-- <el-progress type="circle" :width="107" :percentage="25"></el-progress> -->
            <rd-progress-circle :progress="progressCircle2"></rd-progress-circle>
            <div class="progress-circle-absolute-div">
              <p>{{commonStatistics.contractCount == 0 ? 0 : commonStatistics.checkoutContractCount / commonStatistics.contractCount | rate}}%</p>
              <span>退租率</span>
            </div>
          </div>
          <p>退租合同数: <span>{{commonStatistics.checkoutContractCount}}</span> 个</p>
          <p>中途退租数: <span>{{commonStatistics.earlyCheckoutContractCount}}</span> 个</p>
        </el-col>
        <el-col :span="8">
          <div class="circle_progress_div">
            <!-- <el-progress type="circle" :width="107" :percentage="25"></el-progress> -->
            <rd-progress-circle :progress="progressCircle3"></rd-progress-circle>
            <div class="progress-circle-absolute-div">
              <p>{{commonStatistics.contractCount == 0 ? 0 : commonStatistics.reletContractCount / commonStatistics.contractCount | rate}}%</p>
              <span>续租率</span>
            </div>
          </div>
          <p>到期合同数: <span>{{commonStatistics.checkoutContractCount}}</span> 个</p>
          <p>续租合同数: <span>{{commonStatistics.reletContractCount}}</span> 个</p>
        </el-col>
      </el-row>
      <addgatheringbilldlg v-if="openGatherinBillDlg" :showDialog='openGatherinBillDlg' @on-result-change="onGatherinBillResultChange"></addgatheringbilldlg>
      <collectionDlg v-if="openCollectionDlg" :showDialog="openCollectionDlg" :currentOrderId="bookingCollectionOrderId"
                       @on-result-change="openCollectionDlgChange" @on-refresh-collection="refreshToadyInfos('first')"></collectionDlg>
      <addcontractdlg :roomInfo="currentRoom" :showDialog='openContractDlg' :roomReservationId="roomReservationId" @on-result-change="onContractResultChange" @on-add-success="refreshToadyInfos('third')"></addcontractdlg>
      <throwleasedlg v-if="throwLeaseDlg" :contractId="selectedContractId" :showDialog='throwLeaseDlg' @on-result-change="onThrowALeaseResultChange" @on-result-checkout="refreshToadyInfos('second')"></throwleasedlg>
    </div>
  </div>
</div>
</template>
<script>
  // use radon-ui rdProgressCicle
  import { mapActions } from 'vuex'
  import {
    rdProgressCircle
  } from 'radon-ui'
  import addgatheringbilldlg from '../subComponents/addGatheringBillDlg'
  import collectionDlg from '../subComponents/collectionDlg'
  import addcontractdlg from '../subComponents/addContractDlg'
  import throwleasedlg from '../subComponents/throwLeaseDlg'
  import constants from '../../constants/index'
  // import addapartmentdlg from '../subComponents/addApartmentDlg'
  export default {
    data() {
      return {
        selectedContractId: null,
        roomReservationId: null,
        currentRoom: null,
        openContractDlg: false,
        bookingCollectionOrderId: null,
        zhangdanLabel: '未完成账单',
        hetongLabel: '待处理合同',
        dingjinLabel: '待处理定金',
        monthDaibanList: null,
        dayDaibanInfos: null,
        commonStatistics: {},
        openCollectionDlg: false,
        openGatherinBillDlg: false,
        closureCalendar: false,
        throwLeaseDlg: false,
        currentDay: 1,
        currentMonth: 1,
        currentYear: 1970,
        currentWeek: 1,
        selectDay: 1,
        selectMonth: 1,
        selectYear: 1970,
        todayYear: 1970,
        todayMonth: 1,
        todayDay: 0,
        days: [],
        activeName: 'first',
        curRunSituation: 1,
        progressCircle1: {
          percent: 0, // Number 0-100
          options: {
            color: '#3bde86',
            size: 'common',
            state: 'loading',
            format: function(percent) {
              return;
            }
          }
        },
        progressCircle2: {
          percent: 0, // Number 0-100
          options: {
            color: '#ff6260',
            size: 'common',
            state: 'loading',
            format: function(percent) {
              return;
            }
          }
        },
        progressCircle3: {
          percent: 0, // Number 0-100
          options: {
            color: '#ff8c14',
            size: 'common',
            state: 'loading',
            format: function(percent) {
              return;
            }
          }
        }
      };
    },
    methods: {
      ...mapActions([
          'visibledialog',
          'showLoading',
          'hideLoading'
      ]),
      openAddContractDlg(val) {
          this.currentRoom = val;
          this.roomReservationId = val.roomReservationId;
          this.openContractDlg = true;
      },
      onContractResultChange(val) {
          this.openContractDlg = val;
      },
      openCollectionDlgFunc(orderId) {
        this.bookingCollectionOrderId = orderId;
        this.openCollectionDlg = true;
      },
      openCollectionDlgChange(val) {
          this.openCollectionDlg = val;
      },
      checkTheDateOverdue(selectedDate) {
        if (selectedDate.substr(0, 10) < new Date().Format('yyyy-MM-dd')) {
          return true;
        }
        return false
      },
      p(s) {
        return s < 10 ? '0' + s : s;
      },
      initData: function(cur) {
        var date;
        if (cur) {
          date = new Date(cur);
        } else {
          date = new Date();
        }
        this.currentDay = date.getDate();
        this.currentYear = date.getFullYear();
        this.currentMonth = date.getMonth() + 1;
        this.currentWeek = date.getDay();
        this.selectDay = this.p(this.currentDay);
        this.selectMonth = this.p(this.currentMonth);
        this.selectYear = this.currentYear;
        this.getOverviewMonthlyStatistics(this.selectYear + '-' + this.selectMonth);
        this.getOverviewDayStatistics(this.selectYear + '-' + this.selectMonth + '-' + this.selectDay);
        var str = this.formatDate(this.currentYear, this.currentMonth, 1);
        var fisrtDayDate = new Date(str);
        var firstDayWeek = fisrtDayDate.getDay();
        this.days.length = 0;
        // 今天是周日，放在第一行第7个位置，前面6个
        firstDayWeek += 1;
        for (var i = firstDayWeek - 1; i >= 0; i--) {
          var d = new Date(str);
          d.setDate(d.getDate() - i);
          this.days.push(d);
        }
        for (var i = 1; i <= 42 - firstDayWeek; i++) {
          var d = new Date(str);
          d.setDate(d.getDate() + i);
          this.days.push(d);
        }
      },
      pick: function(date) {
        // 今天及以后可以被点击
        if (date < new Date() && (date.getDate() != this.todayDay)) {
          return false;
        }
        if (date.getMonth() + 1 == this.currentMonth) {
          this.selectYear = date.getFullYear();
          this.selectMonth = this.p(date.getMonth() + 1);
          this.selectDay = this.p(date.getDate());
          this.getOverviewDayStatistics(this.selectYear + '-' + this.selectMonth + '-' + this.selectDay);
        }
      },
      isSmallerEqualToday(year, month) {
        if ((year * 100 + month) <= (this.todayYear * 100 + this.todayMonth)) {
          return true;
        }
        else {
          return false;
        }
      },
      isDaySmallerEqualToday (day, month) {
        if (month == this.todayMonth && day < this.todayDay) {
          return true;
        }
        return false;
      },
      pickPre: function(year, month) {
        // 判断当前选择月份与当前时间的大小
        if ((year * 100 + month) <= (this.todayYear * 100 + this.todayMonth)) {
          return false;
        }
        var d = new Date(this.formatDate(year, month, 1));
        d.setDate(0);
        // 选中月份可用的第一天；当前月可用的第一天为今天；
        var selectItemDay = 1;
        if (d.getFullYear() == this.todayYear && (d.getMonth() + 1 == this.todayMonth)) {
          selectItemDay = this.todayDay;
        }
        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, selectItemDay));
      },
      pickNext: function(year, month) {
        var d = new Date(this.formatDate(year, month, 1));
        d.setDate(42);
        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
      },
      toggleClosureWeek: function() {
        this.closureCalendar = !this.closureCalendar;
      },
      formatDate: function(year, month, day) {
        var y = year;
        var m = month;
        if (m < 10) m = "0" + m;
        var d = day;
        if (d < 10) d = "0" + d;
        return y + "-" + m + "-" + d
      },
      tabClick(tab, event) {},
      tabToggleRunSituation(situaitonNo) {
        this.curRunSituation = situaitonNo;
      },
      showGatherinBillDlg: function() {
        this.openGatherinBillDlg = true;
      },
      gotoRoomState() {
        this.$router.push({ path: '/rootStateMag' });
      },
      onGatherinBillResultChange: function(val) {
        this.openGatherinBillDlg = val;
      },
      hasDaiban(index) {
        if (!this.monthDaibanList) {
          return false;
        }
        return this.monthDaibanList[index];
      },
      getOverviewMonthlyStatistics: function(selectedMonth) {
        var _this = this;
        _this.monthDaibanList = null;
        _this.$api.get(constants.KCURLS.GETOVERVIEWMONTHLYSTATISTICS + selectedMonth,
            function (res) {
              _this.monthDaibanList = res;
            });
      },
      getOverviewDayStatistics: function(selectedDay, curActiveName) {
        var _this = this;
        _this.dayDaibanInfos = null;
        _this.$api.get(constants.KCURLS.GETOVERVIEWDAYSTATISTICS + selectedDay,
            function (res) {
              if (res.succeeded) {
                _this.dayDaibanInfos = res.data;
                _this.zhangdanLabel = '未完成账单' + ' ' + _this.dayDaibanInfos.orders.length;
                _this.hetongLabel = '待处理合同' + ' ' + _this.dayDaibanInfos.contracts.length;
                _this.dingjinLabel = '待处理定金' + ' ' + _this.dayDaibanInfos.roomReservations.length;
                if (curActiveName) {
                  _this.activeName = curActiveName;
                }
                else {
                  if (_this.dayDaibanInfos.orders.length > 0) {
                    _this.activeName = 'first';
                  }
                  else if (_this.dayDaibanInfos.contracts.length > 0) {
                    _this.activeName = 'second';
                  }
                  else if (_this.dayDaibanInfos.roomReservations.length > 0) {
                    _this.activeName = 'third';
                  }
                  else {
                    _this.activeName = 'first';
                  }
                }
              }
            });
      },
      getOverviewCommonStatistics() {
        var _this = this;
        _this.$api.get(constants.KCURLS.GETOVERVIEWCOMMONSTATISTICS,
            function (res) {
              _this.commonStatistics = res.data;
              _this.progressCircle1.percent = (_this.commonStatistics.roomCount == 0 ? 0 : 1 - _this.commonStatistics.vacantRoomCount / _this.commonStatistics.roomCount) * 100;
              _this.progressCircle2.percent = (commonStatistics.contractCount == 0 ? 0 : commonStatistics.checkoutContractCount / commonStatistics.contractCount) * 100;
              _this.progressCircle3.percent = (commonStatistics.contractCount == 0 ? 0 : commonStatistics.reletContractCount / commonStatistics.contractCount) * 100;
            });
      },
      refreshToadyInfos(curActiveName) {
        this.getOverviewDayStatistics(this.selectYear + '-' + this.selectMonth + '-' + this.selectDay, curActiveName);
      },
      openThrowALeaseDlg(contractId) {
          this.selectedContractId = contractId;
          var that = this;
          that.showLoading();
          that.$api.get(constants.KCURLS.CHECKOUTFIRSTSTEP + contractId, function (res) {
              that.hideLoading();
              if (res.data.staged) {
                  if (res.data.amount > 0) {
                      that.$confirm('处理该房间的所有分期账单!', '提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning'
                      }).then(() => {
                          that.$api.get(constants.KCURLS.CHECKOUTSECONDSTEP + contractId, function () {
                              that.hideLoading();
                              that.throwLeaseDlg = true;
                          });
                      }, () => {
                        that.hideLoading();
                      });
                  } else {
                      that.throwLeaseDlg = true;
                  }
              } else if (res.data.canCheckouted) {
                  that.throwLeaseDlg = true;
              } else {
                  that.$confirm('请先处理完房间中的账单！', '提示', {
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
      }
    },
    created() {
      var today = new Date();
      this.todayYear = today.getFullYear();
      this.todayMonth = today.getMonth() + 1;
      this.todayDay = today.getDate();
      this.initData(null);
      this.getOverviewCommonStatistics();
    },
    components: {
      rdProgressCircle,
      // addapartmentdlg
      addgatheringbilldlg,
      collectionDlg,
      addcontractdlg,
      throwleasedlg
    }
  };
</script>

<style scoped>
.produceLittleTapLable {
  cursor:pointer;float:right;font-size:14px;color:#07bf96;margin-right:20px;
}
.produceRoomInfo {
  font-size:17px;color:#6a6a6a;margin-bottom: 0; line-height: 24px;
}
.produceStateLable {
  font-size:14px; color: #fe6f6e; margin-left: 20px;
}
.marTop20 {
  margin: 0 0 20px 0;
}
.quickEntrance {
  width: 100%; height: 180px;
}
.quickEntrance .el-col{
  height: 100%; text-align: center
}
.quickEntrance .el-col p{
  color: #697b8c; font-size:14px;
}
.summaryLeft {
  width: 376px;
  background-color: #fff;
}
.summaryRight {
  width: calc(100% - 376px);
  padding-left: 15px;
}
#calendar {
  width: 100%;
}
.month {
  width: 100%;
  border-radius: 3px 3px 0 0;
  background-color: #fff;
  border-bottom: 2px solid #e6eaee;
}
.month ul {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: stretch;
}
.disabledCalcBtn {
  opacity: 0.2;
}
.hasInfoDor {
  display: none;
}
.hasDaiban .hasInfoDor {
  display: block;
}
.disabledCalcBtn .hasInfoDor {
  display: none;
}
.year-month {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.year-month.toggleText{
  cursor:pointer; padding: 0 0 0 30px; font-size: 14px; color: #8c96ab
}
.toggleIcon {
  cursor:pointer; padding: 13px 10px 0 10px;
}
.choose-month {
  text-align: center;
  font-size: 1.5rem;
}
.arrow {
  padding: 15px;
  cursor: pointer;
}
.arrow:hover {
  background: rgba(0, 0, 0, 0.1);
}

.month ul li {
  font-size: 18px;
  color: #697b8c;
  text-transform: uppercase;
  letter-spacing: 0;
}

.summaryLeft.closure ul.weekdays,
.summaryLeft.closure ul.days {
  height: 0;
  overflow: hidden;
  padding: 0;
}

.weekdays {
  margin: 0;
  padding: 10px 0;
  background-color: #FFFFFF;
  font-size: 11px;
  display: flex;
  flex-wrap: wrap;
  color: rgba(29, 29, 37, 0.5);
  justify-content: space-around;
}

.weekdays li {
  display: inline-block;
  width: 13.6%;
  text-align: center;
}

.days {
  padding: 0;
  background: #FFFFFF;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.days li {
  list-style-type: none;
  display: inline-block;
  width: 14.2%;
  text-align: center;
  padding-bottom: 15px;
  padding-top: 15px;
  font-size: 13px;
  color: #1d1d26;
  cursor: pointer;
  position: relative;
  height: 50px;
}
.days li span {
  position: absolute;
  top: 0;
  left: 3px;
  width: 40px;
  height: 40px;
  line-height: 40px;
}
.days li span.active {
  background: #2dd1ac;
  color: #fff;
  border-radius: 50%;
}
.days li span.cur_active {
  border: 1px solid #2dd1ac;
  border-radius: 50%;
}
.days li span.active.cur_active {
  border: 1px solid #2dd1ac;
  border-radius: 50%;
  background: #2dd1ac;
  color: #fff;
}
.days li i {
  color: #2dd1ac;
  font-size: 30px;
  position: absolute;
  left: 20px;
  top: 5px
}
.days li i.active {
  color: #fff;
  /*background: #fff;*/
}
.el-tabs {
  width: 100%;
  margin-top: 0px;
}
.right-middle-bottom-c-c {
  background: #fff;
  margin-top: 15px;
  height: 260px;
  width: calc(100% - 15px);
  min-width: 745px
}
.income-p {
  height: 28px;
  line-height: 28px;
  width: calc(100% - 40px);
  margin: 0 20px 10px 20px;
  border: 1px solid #eceff4;
  border-radius: 4px;
  color: #697b8c;
  font-size: 14px;
}
.income-p span {
  float: right;
  margin-right: 15px;
}
.income-p label {
  margin-left: 15px;
}
.income-p.income-curday {
  border-left: 4px solid #f7d167;
}
.income-p.income-curWeek {
  border-left: 4px solid #fda185;
}
.income-p.income-curMonth {
  border-left: 4px solid #7ef1b6;
}
.income-p.income-curSeason {
  border-left: 4px solid #98bfe8;
}
.run_situation {
  float: right;
  height: 51px;
  width: 192px;
}
.run_situation_tab {
  height: 100%;
  font-size: 14px;
  color: #7f8fa4;
  text-align: center;
  line-height: 51px;
  font-weight: normal;
  border-bottom: 2px solid transparent;
  cursor: pointer;
}
.run_situation_tab p {
  margin: 0;
}

.run_situation_tab.active {
  color: #07bf96;
  border-bottom: 2px solid #07bf96;
}

.run_situation_detail_item {
  margin: 0 auto;
  width: 60%;
}

.run_situation_detail_item p {
  font-size: 14px;
  color: #8ca0b3;
}

.run_situation_detail_item p span {
  font-size: 14px;
  color: #354052;
  float: right;
}

.run_situation_detail_item p span label {
  color: #07bf96;
}

.management_statistics {
  float: right;
  height: 51px;
  line-height: 51px;
  width: 300px;
  font-size: 14px;
  color: #8ca0b3;
  font-weight: normal;
}

.circle_reminder {
  background: #3bde86;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  margin-top: 20px;
}

.management_statistics_detail p {
  text-align: center;
  color: #8ca0b3;
  font-size: 14px;
}

.management_statistics_detail p span {
  color: #354052;
}

.circle_progress_div {
  width: 107px;
  height: 107px;
  margin: 40px auto 30px auto;
  position: relative;
}

.progress-circle-absolute-div {
  position: absolute;
  z-index: 2;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
}

.progress-circle-absolute-div p {
  font-size: 18px;
  color: #354052;
  font-weight: bold;
  margin-top: 34px;
}

.progress-circle-absolute-div span {
  font-size: 12px;
  color: #9facb3;
}

.notifierTab .el-tab-pane ul {
  height: 100%;
  overflow-y: auto;
}

.closure .notifierTab .el-tab-pane {
  height: 721px !important;
}

.quickEnter {
  border-radius: 4px;
  margin: 30px auto 20px auto;
  width: 80px;
  height: 80px;
  text-align: center;
  color: white;
  line-height: 92px;
  cursor: pointer;
}

.quickEnter i {
  font-size: 30px
}

.bg_color_ff6260 {
  background: #ff6260 !important;
}

.bg_color_ff8c14 {
  background: #ff8c14 !important;
}

.bg_color_2dd1ac {
  background: #2dd1ac !important;
}

.bg_color_47cabf {
  background: #47cabf !important;
}

.bg_color_a9d773 {
  background: #a9d773 !important;
}

.bg_color_ff8f59 {
  background: #ff8f59 !important;
}

.bg_color_5dcaf1 {
  background: #5dcaf1 !important;
}
</style>
<style>
.notifierTab.el-tabs--border-card {
  border: none;
}

.notifierTab.el-tabs--border-card>.el-tabs__header>.el-tabs__item {
  width: 127px;
  border: 1px solid transparent;
}

.notifierTab.el-tabs--border-card>.el-tabs__header>.el-tabs__item:last-child {
  width: 127px;
}

.notifierTab.el-tabs--border-card>.el-tabs__header {
  background-color: #f8f8f9;
  font-size: 14px;
  color: #7f8fa4;
  border: none;
}

.notifierTab.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
  color: #07bf96;
  border-top: 1px solid #07bf96;
  box-shadow: inset 0 2px 0 0 #2dd1ac;
  background: #fff;
}

.notifierTab.el-tabs--border-card .el-tabs__nav {
  width: 100%;
}

.notifierTab.el-tabs--border-card .el-tabs__item {
  width: 33%;
}

.notifierTab.el-tabs--border-card .el-tabs__item:last-child {
  width: 34%;
}

.run_situation_detail .el-progress-bar__inner {
  background-color: #2dd1ac
}
</style>
