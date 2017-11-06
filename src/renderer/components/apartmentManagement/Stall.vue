<template>
<section>
    <el-col :span="24">
      <el-popover style="padding: 30px;" ref="popoverFinanceDetails" placement="bottom-end" width="600" v-model="filter.divVisible">
          <el-form :model="filter" label-width="100px" ref="filter">
              <el-form-item label="公寓名称">
                  <el-select v-model="filter.name" placeholder="请选择公寓名称">
                      <el-option label="上海浦东A店" :value="1"></el-option>
                      <el-option label="上海浦东B店" :value="2"></el-option>
                      <el-option label="上海浦东c店" :value="3"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="房间编号">
                  <el-input v-model="filter.name" placeholder="请输入房间编号"></el-input>
              </el-form-item>
              <el-form-item label="租客姓名">
                  <el-input v-model="filter.name" placeholder="请输入租客姓名"></el-input>
              </el-form-item>
              <el-form-item label="流水日期">
                  <el-col :span="11">
                      <el-date-picker type="date" placeholder="请选择开始日期" v-model="filter.birth"></el-date-picker>
                  </el-col>
                  <el-col :span="2">&nbsp;&nbsp;</el-col>
                  <el-col :span="11">
                      <el-date-picker type="date" placeholder="请选择结束日期" v-model="filter.birth"></el-date-picker>
                  </el-col>
              </el-form-item>
              <div style="border-bottom:1px solid #e6eaee;width:100%;height:1px;margin-bottom:10px"></div>
              <el-form-item label="流水类型" style="margin-bottom:0px">
                  <span>收起</span>
              </el-form-item>
              <div style="padding-left:35px;margin-bottom:10px">
                  <el-checkbox-group v-model="checkedCities" style="width:100%;">
                      <el-col :span="4" v-for="city in cities">
                          <el-checkbox style="margin: 0;" :label="city">{{city}}</el-checkbox>
                      </el-col>
                  </el-checkbox-group>
              </div>
              <div style="border-bottom:1px solid #e6eaee;width:100%;height:20px;margin-bottom:10px;clear:both"></div>
              <el-form-item label="流水类别">
                  <el-checkbox-group v-model="checkedCities" style="width:100%; margin-left:-15px">
                      <el-checkbox v-for="city in cities" :label="city">{{city}}</el-checkbox>
                  </el-checkbox-group>
              </el-form-item>
              <div style="border-bottom:1px solid #e6eaee;width:100%;height:1px"></div>
              <el-form-item label="流水方式">
                  <el-checkbox-group v-model="checkedCities" style="width:100%; margin-left:-15px">
                      <el-checkbox v-for="city in cities" :label="city">{{city}}</el-checkbox>
                  </el-checkbox-group>
              </el-form-item>
          </el-form>
          <div style="text-align: right; margin: 0">
              <el-button @click="filter.divVisible=false">取 消</el-button>
              <el-button type="primary" @click="doFilter" class="greenBtn" :loading="filter.btnLoading">确定</el-button>
          </div>
      </el-popover>
    </el-col>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
        <span class="title">车位信息</span>
        <el-form :inline="true" :model="filter" class="demo-form-inline query">
            <el-form-item>
                <el-input v-model="filter.key" placeholder="搜索公寓名、房间编号、合同编号" icon="search"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button v-popover:popoverFinanceDetails><i class="fa fa-filter"></i></el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="handleXls"></el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="handleRefresh"></el-button>
            </el-form-item>
        </el-form>
    </el-col>
      <!--列表-->
    <el-col :span="24" class="listbox">
        <el-table :data="tableData" :stripe="true" :fit="true" style="width:100%">
            <el-table-column prop="name" label="公寓名">
            </el-table-column>
            <el-table-column prop="name" label="房间编号">
            </el-table-column>
            <el-table-column prop="sex" label="租客姓名">
            </el-table-column>
            <el-table-column prop="age" label="合同编号">
            </el-table-column>
            <el-table-column prop="birth" label="合同状态">
            </el-table-column>
            <el-table-column prop="addr" label="起租日期">
            </el-table-column>
            <el-table-column prop="addr" label="每期收租日">
            </el-table-column>
            <el-table-column prop="addr" label="支付方式">
            </el-table-column>
            <el-table-column prop="addr" label="月租金">
            </el-table-column>
            <el-table-column prop="addr" label="退租方式">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                  <el-button type="text"  class="littleTable" size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-col>
    <!--分页-->
    <el-col :span="24" style="margin-top:10px;">
        <el-pagination @current-change="handleCurrentChange" :current-page="pageData.pageIndex" :page-size="pageData.pageSize" layout="prev,pager,next,jumper" :total="pageData.pageTotal" style="text-align: center"></el-pagination>
    </el-col>
</section>
</template>

<script>
import util from '../../common/util'
import NProgress from 'nprogress'
import commonData from '../../common/data'
export default {
    data() {
        return {
            checkedCities: ['上海', '北京'],
            cities: ['上海', '北京', '广州', '深圳', '上海1', '北京1', '广州1', '深圳1', '上海11', '北京11', '广州11', '深圳11'],
            filter: {
                divVisible: false,
                btnLoading: false,
                key: '',
                name: '',
                sex: -1,
                age: '',
                birth: '',
                addr: ''
            },
            tableData: [{
                id: 1000,
                name: 'lanqy1',
                sex: 1,
                age: 20,
                birth: '1996-03-02',
                addr: '广东广州天河体育中心'
            }, {
                id: 1001,
                name: 'lanqy2',
                sex: 1,
                age: 20,
                birth: '1996-03-02',
                addr: '广东广州天河体育中心'
            }, {
                id: 1002,
                name: 'lanqy3',
                sex: 0,
                age: 20,
                birth: '1996-03-02',
                addr: '广东广州天河体育中心'
            }],
            pageData: {
                pageIndex: 1,
                pageSize: 100,
                pageTotal: 1000,
            }
        }
    },
    methods: {
        doFilter: function() {
            console.log("handlefilter");
            var that = this;
            that.filter.btnLoading = true;
            setTimeout(function() {
                that.filter.btnLoading = false;
                that.filter.divVisible = false;
            }, 3000);
        },
        handleXls: function() {
            alert("handleXls");
        },
        handleRefresh: function() {
            alert("handleRefresh");
        },
        //显示新增界面
        handleAdd: function() {

        },
        handleCurrentChange(val) {
            this.pageData.pageIndex = val;
            console.log(`当前页: ${val}`);
        }
    }
}
</script>
