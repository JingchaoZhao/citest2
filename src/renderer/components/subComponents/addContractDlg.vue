<template>
    <div>
        <el-dialog :modal-append-to-body="false" :close-on-click-modal="false" :close-on-press-escape="false"
                   title="添加租房合同" v-model="isDlgVisable">
            <!-- <p class="dlgSectionTitle"><i class="bf_icon_roomInfo"></i>房间信息</p> -->
            <p v-if="roomObject" class="apartNameP">{{roomObject.apartmentName}}<!-- {{roomObject.floor}}层 -->
                {{roomObject.roomNumber}}室</p>
            <el-form :model="userForm" label-position="top" :rules="userRules" ref="userForm" label-width="100px">
                <el-col v-if="curRoomReservationId" :span="24">
                    <p class="dlgSectionTitle"><i class="bf_icon_payment"></i>定金处理方式</p>
                    <el-form-item prop="reservationFeeHandle">
                        <el-radio-group style="width: 100%;" v-model="userForm.reservationFeeHandle">
                            <el-col :span="8">
                                <el-radio label="ToRent">转租金</el-radio>
                            </el-col>
                            <el-col :span="8">
                                <el-radio label="ToDeposite">转押金</el-radio>
                            </el-col>
                            <el-col :span="8">
                                <el-radio label="Refund">退回</el-radio>
                            </el-col>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <p v-if="!isReleting" class="dlgSectionTitle"><i class="bf_icon_uDetail"></i>租客信息</p>
                <el-col v-if="!isReleting" :span="11">
                    <el-form-item label="手机号" prop="cellphone">
                        <el-input :maxlength="11" placeholder="输入租客手机号" v-model="userForm.cellphone">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col v-if="!isReleting" :span="2"> &nbsp;
                </el-col>
                <el-col v-if="!isReleting" :span="11">
                    <div @click="getTenantByCellphone"
                         style="height: 30px; line-height: 30px; width:120px; text-align: center; color: #fff; margin-top: 30px; border-radius: 3px; font-size: 14px; cursor: pointer;"
                         class="blockBtn greenBtn">获取租客信息
                    </div>
                </el-col>
                <div v-if="tenentInfo" style="width: 100%; clear: both; margin-bottom: 10px;">
                    <p>
                        <i class="bf_icon_hurman"></i>{{tenentInfo.realName}} &nbsp;&nbsp;| &nbsp;&nbsp; 身份证: {{tenentInfo.credentialNo}}
                    </p>
                </div>
                <!-- <el-col :span="11">
                    <div @click="submitForm('userForm')" class="blockBtn greenBtn" style="width:102px;height:28px;line-height: 28px; margin-top: 28px;">
                        获取租客信息
                    </div>
                </el-col> -->
                <!-- <div style="width: 100%; clear: both">
                    <el-col :span="11">
                        <el-form-item label="租客姓名" prop="name">
                            <el-input placeholder="输入租客姓名" v-model="userForm.name">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">  &nbsp;
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="证件类型" prop="idtityType">
                            <el-select v-model="userForm.idtityType" placeholder="证件类型">
                                <el-option
                                  v-for="item in idtityTypes"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="证件号" prop="idcardNo">
                            <el-input placeholder="输入租客证件号" v-model="userForm.idcardNo">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="证件附件" prop="">
                            <el-upload ref="upload" :action="imageUploadUrl"   list-type="picture-card" :on-preview="handlePictureCardPreview" :before-upload="beforeAvatarUpload" :on-success="handleSuccess1" :on-remove="handleRemove1" :on-change="handleChange1">
                                  <i class="el-icon-plus"></i>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </div>
                <div style="width: 100%; clear: both; margin-bottom: 10px;" >
                    <p><i class="bf_icon_hurman"></i>王重阳 &nbsp;&nbsp;| &nbsp;&nbsp; 身份证: 310230198876543567</p>
                </div> -->
            </el-form>
            <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px">
                <el-col v-if="false" :span="24">
                    <el-collapse v-model="activeName" accordion class="my-collapse" style="position: relative">
                        <div v-bind:class="{ active: activeName == 1 }"
                             style="position: absolute; top: 10px;left: 150px;font-size:16px;color:#07bf96;z-index: -1;">
                            <span v-show="activeName == 0">展开</span>
                            <span v-show="activeName == 1">收起</span>
                            <div class="triangle-down"></div>
                        </div>
                        <el-collapse-item title="添加更多租客信息" name="1">
                            <div style="margin-bottom: 10px;">
                                <p><i class="bf_icon_hurman"></i>王重阳 &nbsp;&nbsp;|&nbsp;&nbsp;手机: 13677889920&nbsp;&nbsp;|&nbsp;&nbsp; 身份证: 310230198876543567<span>删除</span>
                                </p>
                                <p><i class="bf_icon_hurman"></i>丘处机 &nbsp;&nbsp;|&nbsp;&nbsp;手机: 13234339920&nbsp;&nbsp;|&nbsp;&nbsp; 身份证: 310230198876543567<span>删除</span>
                                </p>
                            </div>
                            <el-col :span="11">
                                <el-form-item label="同住人姓名" prop="contractNo">
                                    <el-input placeholder="输入同住人姓名" v-model="ruleForm.contractNo">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2" style="height: 10px">&nbsp;
                            </el-col>
                            <el-col :span="11">
                                <el-form-item label="手机号" prop="contractNo">
                                    <el-input placeholder="输入租客手机号" v-model="ruleForm.contractNo">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <div style="clear: both"></div>
                            <el-col :span="11">
                                <el-form-item label="证件类型" prop="contractNo">
                                    <el-select v-model="ruleForm.contractState" placeholder="证件类型">
                                        <el-option
                                                v-for="item in contractStates"
                                                :label="item.label"
                                                :value="item.value" :key="item.label">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2" style="height: 10px"> &nbsp;
                            </el-col>
                            <el-col :span="11">
                                <el-form-item label="证件号" prop="contractNo">
                                    <el-input placeholder="输入租客证件号" v-model="ruleForm.contractNo">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <div style="clear: both"></div>
                            <el-col :span="24">
                                <div class="blockBtn greenBtn"
                                     style="width:72px;height:28px;line-height: 28px; margin-bottom: 20px;">继续添加
                                </div>
                            </el-col>
                        </el-collapse-item>
                    </el-collapse>
                </el-col>
                <el-col :span="24">
                    <p class="dlgSectionTitle"><i class="bf_icon_devify"></i>合同信息</p>
                </el-col>
                <div style="clear: both"></div>
                <el-col :span="11">
                    <el-form-item label="合同编号" prop="contractNo">
                        <el-input placeholder="请输入合同编号" v-model="ruleForm.contractNo">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="2"> &nbsp;
                </el-col>
                <el-col :span="11">
                    <el-form-item v-if="!curRoomReservationId && !isReleting" required label="合同类型"
                                  prop="contractState">
                        <el-select v-model="ruleForm.contractType" placeholder="请输入合同类型">
                            <el-option
                                    v-for="item in contractTypes"
                                    :label="item.label"
                                    :value="item.value" :key="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <div style="clear:both"></div>
                <el-col :span="11">
                    <el-form-item label="开始时间" prop="rentStartTime">
                        <el-date-picker
                                v-model="ruleForm.rentStartTime"
                                align="left"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="2"> &nbsp;
                </el-col>
                <el-col :span="11">
                    <el-form-item required label="剩余租期" prop="term">
                        <el-input-number v-model="ruleForm.term" :min="1" :max="12"></el-input-number>
                    </el-form-item>
                </el-col>
                <div style="clear: both"></div>
                <el-col :span="11">
                    <el-form-item required label="月租金" prop="monthlyAmount">
                        <el-input placeholder="请输入月租金" v-model="ruleForm.monthlyAmount">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                    <!-- <el-form-item required label="每期收租日" prop="payDay">
                        <el-input-number v-model="ruleForm.payDay" :min="1" :max="31"></el-input-number>
                    </el-form-item> -->
                </el-col>
                <el-col :span="2"> &nbsp;
                </el-col>
                <el-col :span="11">
                    <el-form-item label="支付方式" required prop="dpPeriod">
                        <el-select v-model="ruleForm.dpPeriod" placeholder="请输入支付方式">
                            <el-option
                                    v-for="item in dpPeriods"
                                    :label="item.label"
                                    :value="item.value" :key="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <div style="clear: both"></div>
                <!-- <el-col :span="11"> -->
                <!-- <div class="remindPerMonney">
                    <el-tag color="#3bde86">原</el-tag>
                    <span>3200元/月</span>
                    <el-tag color="#ff6260">折</el-tag>
                    <span>6.8折</span>
                </div> -->

                <!-- </el-col> -->
                <el-col :span="11">
                    <el-form-item label="房屋押金" prop="depositAmount">
                        <!-- <el-checkbox class="paidDeposit" v-model="ruleForm.isPaidDeposit"><span v-if="ruleForm.isPaidDeposit">已支付</span><span v-else>未支付</span></el-checkbox> -->
                        <el-input placeholder="输入房屋押金" v-model="ruleForm.depositAmount">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    &nbsp;
                </el-col>
                <el-col :span="11">
                    <el-form-item label="门禁卡押金" prop="accessCardDepositAmount">
                        <el-input placeholder="输入门禁卡押金" v-model="ruleForm.accessCardDepositAmount">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="其他押金" prop="othersDepositAmount">
                        <el-input placeholder="输入其他押金" v-model="ruleForm.othersDepositAmount">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="2">&nbsp;
                </el-col>
                <el-col :span="11">
                    <!-- <el-form-item label="业务员信息" prop="salesmanNames">
                        <el-input placeholder="输入业务员姓名" v-model="ruleForm.salesmanNames"></el-input>
                    </el-form-item> -->
                    <el-form-item label="物业管理费" prop="propertyManagementAmount">
                        <el-input placeholder="输入物业管理费" v-model="ruleForm.propertyManagementAmount">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item required label="合同照片上传">
                        <el-upload
                                :action="uploadUri"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="removeUploadImagesForContract"
                                :on-success="uploadImagesForContract">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <p class="dlgSectionTitle"><i class="bf_icon_others"></i>其他合同信息</p>
                </el-col>
                <el-col :span="24" style="clear:both">
                    <el-collapse v-model="activeName" accordion class="my-collapse" style="position: relative">
                        <div v-bind:class="{ active: activeName == 1 }"
                             style="position: absolute; top: 10px;left: 150px;font-size:16px;color:#07bf96;z-index: -1;">
                            <span v-show="activeName == 0">展开</span>
                            <span v-show="activeName == 1">收起</span>
                            <div class="triangle-down"></div>
                        </div>
                        <el-collapse-item title="添加更多合同信息" name="1">
                            <p style="font-size: 12px; color: #ff8c14;">（非以下两种方式的，请选择“无”，合同添加成功后，通过添加水电账单的方式记录。）</p>

                            <el-row style="margin-top: 10px; clear: both;">
                                <el-col :span="11">
                                    <el-form-item label="冷水费" prop="coldWaterPayMethod">
                                        <el-select v-model="ruleForm.coldWaterPayMethod" placeholder="请选择冷水费方式">
                                            <el-option
                                                    v-for="item in chargingType"
                                                    :label="item.label"
                                                    :value="item.value" :key="item.label">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">&nbsp;
                                </el-col>
                                <div v-show="ruleForm.coldWaterPayMethod == 'Meter'">
                                    <el-col :span="11">
                                        <el-form-item label="单价" prop="coldWaterUnitPrice">
                                            <el-input placeholder="输入金额" v-model="ruleForm.coldWaterUnitPrice">
                                                <template slot="append">元/立方</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="当前读数" prop="coldWaterMeterCurrentRecord">
                                            <el-input placeholder="输入当前读数"
                                                      v-model="ruleForm.coldWaterMeterCurrentRecord">
                                                <template slot="append">立方</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </div>
                                <el-col v-show="ruleForm.coldWaterPayMethod == 'Fixed'" :span="11">
                                    <el-form-item label="固定金额" prop="coldWaterFixedAmount">
                                        <el-input placeholder="输入金额" v-model="ruleForm.coldWaterFixedAmount">
                                            <template slot="append">元/月</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <div style="clear: both"></div>
                                <el-col :span="11">
                                    <el-form-item label="热水费" prop="hotWaterPayMethod">
                                        <el-select v-model="ruleForm.hotWaterPayMethod" placeholder="请选择冷水费方式">
                                            <el-option
                                                    v-for="item in chargingType"
                                                    :label="item.label"
                                                    :value="item.value" :key="item.label">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">&nbsp;
                                </el-col>
                                <div v-show="ruleForm.hotWaterPayMethod == 'Meter'">
                                    <el-col :span="11">
                                        <el-form-item label="单价" prop="hotWaterUnitPrice">
                                            <el-input placeholder="输入金额" v-model="ruleForm.hotWaterUnitPrice">
                                                <template slot="append">元/立方</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="当前读数" prop="hotWaterMeterCurrentRecord">
                                            <el-input placeholder="输入当前读数"
                                                      v-model="ruleForm.hotWaterMeterCurrentRecord">
                                                <template slot="append">立方</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </div>
                                <el-col v-show="ruleForm.hotWaterPayMethod == 'Fixed'" :span="11">
                                    <el-form-item label="固定金额" prop="hotWaterFixedAmount">
                                        <el-input placeholder="输入金额" v-model="ruleForm.hotWaterFixedAmount">
                                            <template slot="append">元/月</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <div style="clear: both"></div>
                                <el-col :span="11">
                                    <el-form-item label="电费" prop="electricityPayMethod">
                                        <el-select v-model="ruleForm.electricityPayMethod" placeholder="请选择冷水费方式">
                                            <el-option
                                                    v-for="item in chargingType"
                                                    :label="item.label"
                                                    :value="item.value" :key="item.label">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">&nbsp;
                                </el-col>
                                <div v-show="ruleForm.electricityPayMethod  == 'Meter'">
                                    <el-col :span="11">
                                        <el-form-item label="单价" prop="electricityUnitPrice">
                                            <el-input placeholder="输入金额" v-model="ruleForm.electricityUnitPrice">
                                                <template slot="append">元/度</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="当前读数" prop="electricityMeterCurrentRecord">
                                            <el-input placeholder="输入当前读数"
                                                      v-model="ruleForm.electricityMeterCurrentRecord">
                                                <template slot="append">度</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </div>
                                <el-col v-show="ruleForm.electricityPayMethod  == 'Fixed'" :span="11">
                                    <el-form-item label="固定金额" prop="electricityFixedAmount">
                                        <el-input placeholder="输入金额" v-model="ruleForm.electricityFixedAmount">
                                            <template slot="append">元/月</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <div style="clear: both"></div>
                                <el-col :span="11">
                                    <el-form-item label="燃气费" prop="gasAmount">
                                        <el-input placeholder="输入金额" v-model="ruleForm.gasAmount">
                                            <template slot="append">元/月</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">&nbsp;
                                </el-col>
                                <el-col :span="11">
                                    <el-form-item label="停车费" prop="parkingAmount">
                                        <el-input placeholder="输入金额" v-model="ruleForm.parkingAmount">
                                            <template slot="append">元/月</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11">
                                    <el-form-item label="洗衣费" prop="washingAmount">
                                        <el-input placeholder="输入金额" v-model="ruleForm.washingAmount">
                                            <template slot="append">元/月</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">&nbsp;
                                </el-col>
                                <el-col :span="11">
                                    <el-form-item label="保洁费" prop="cleaningAmount">
                                        <el-input placeholder="输入金额" v-model="ruleForm.cleaningAmount">
                                            <template slot="append">元/月</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11">
                                    <el-form-item label="宽带费" prop="networkAmount">
                                        <el-input placeholder="输入金额" v-model="ruleForm.networkAmount">
                                            <template slot="append">元/月</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">&nbsp;
                                </el-col>
                                <el-col :span="11">
                                    <el-form-item label="电视费" prop="televisionAmount">
                                        <el-input placeholder="输入金额" v-model="ruleForm.televisionAmount">
                                            <template slot="append">元/月</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11">
                                    <el-form-item label="服务费" prop="serviceAmount">
                                        <el-input placeholder="输入金额" v-model="ruleForm.serviceAmount">
                                            <template slot="append">元/月</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">&nbsp;
                                </el-col>
                                <el-col :span="11">
                                    <el-form-item label="其他费" prop="othersAmount">
                                        <el-input placeholder="输入金额" v-model="ruleForm.othersAmount">
                                            <template slot="append">元/月</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>

                            </el-row>
                        </el-collapse-item>
                    </el-collapse>
                </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <div class="primaryBtn" @click="isDlgVisable = false">取 消</div>
                <div class="blockBtn greenBtn" @click="submitForm('ruleForm')">确 定</div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {mapActions} from 'vuex'
    import constants from '../../constants'

    export default {
        props: ['showDialog', 'roomInfo', 'roomReservationId', 'isReletingInput'],
        data: function () {
            return {
                curRoomReservationId: this.roomReservationId,
                isReleting: this.isReletingInput,
                uploadUri: this.$api.uploadUri,
                isDlgVisable: this.showDialog,
                roomObject: this.roomInfo,
                tenentInfo: null,
                hasGet: false,
                hasGetInfo: false,
                activeName: 0,
                activeName1: 0,
                uploadList: [],
                contractPictures: null,
                idtityTypes: [{
                    value: 'idcard',
                    label: '身份证'
                }],
                contractTypes: [{value: 'Booking', label: '预定'}, {value: 'Sign', label: '直签'}, {
                    value: 'TakeOver',
                    label: '顶租'
                }, {value: 'Releting', label: '续租'}, {value: 'RoomChange', label: '换房'}],
                dpPeriods: [{value: [1, 12], label: '押一付十二'}, {value: [1, 6], label: '押一付六'}, {
                    value: [1, 3],
                    label: '押一付三'
                }, {value: [1, 0], label: '全额付'}],
                chargingType: [
                    {
                        value: 'Unknown',
                        label: '无',
                    },
                    {
                        value: 'Meter',
                        label: '按抄表计算'
                    }, {
                        value: 'Fixed',
                        label: '按固定费用'
                    }
                ],
                userForm: {
                    cellphone: '',
                    name: '',
                    idtityType: 'idcard',
                    idcardNo: '',
                    reservationFeeHandle: 'ToRent'
                },
                userRules: {
                    cellphone: [{
                        required: true,
                        message: '请输入租客手机号',
                        trigger: 'blur'
                    }, {
                        validator: (rule, value, callback) => {
                            if (constants.REGEXS.TEL.test(value) == false) {
                                callback(new Error("手机号格式错误"));
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur'
                    }],
                },
                ruleForm: {
                    reservationFeeHandle: null,
                    contractNo: '',
                    contractType: 'Sign',
                    rentStartTime: new Date(),
                    term: null,
                    payDay: null,
                    dpPeriod: null,
                    monthlyAmount: null,
                    depositAmount: null,
                    accessCardDepositAmount: null,
                    propertyManagementAmount: null,
                    othersDepositAmount: null,

                    coldWaterPayMethod: 'Unknown',
                    coldWaterFixedAmount: null,
                    coldWaterUnitPrice: null,
                    coldWaterMeterCurrentRecord: null,

                    hotWaterPayMethod: 'Unknown',
                    hotWaterMeterCurrentRecord: null,
                    hotWaterUnitPrice: null,
                    hotWaterFixedAmount: null,

                    electricityPayMethod: 'Unknown',
                    electricityUnitPrice: null,
                    electricityMeterCurrentRecord: null,
                    electricityFixedAmount: null,

                    parkingAmount: null,
                    washingAmount: null,
                    cleaningAmount: null,
                    networkAmount: null,
                    gasAmount: null,
                    televisionAmount: null,
                    serviceAmount: null,
                    othersAmount: null,
                    isPaidDeposit: false
                },
                rules: {
                    contractNo: [{
                        required: true,
                        message: '请输入合同编号',
                        trigger: 'blur'
                    },{ min: 4, message: '合同编号至少要有4位', trigger: 'blur' }],
                    monthlyAmount: [{
                        required: true,
                        message: '请输入月租金',
                        trigger: 'blur'
                    }],
                    // dpPeriod: [{
                    //   required: true,
                    //   message: '请选择支付方式',
                    //   trigger: 'change'
                    // }],
                    rentStartTime: [{
                        type: 'date',
                        required: true,
                        message: '开始时间不为空',
                        trigger: 'change'
                    }]
                }
            }
        },
        methods: {
            ...mapActions([
                'visibledialog',
                'showLoading',
                'hideLoading'
            ]),
            handleRemove1(file, fileList) {
            },
            handleChange1(file, fileList) {
            },
            handleSuccess1(response, file, fileList) {
            },
            handlePictureCardPreview(file) {
                this.visibledialog({
                    url: file.url
                });
            },
            uploadImagesForContract: function (response, file, fileList) {
                this.contractPictures = fileList;
            },
            removeUploadImagesForContract: function (file, fileList) {
                this.contractPictures = fileList;
            },
            getTenantByCellphone() {
                this.$refs['userForm'].validate((valid) => {
                    if (valid) {
                        var _this = this;
                        _this.$api.get(constants.KCURLS.GETTENANTBYCELLPHONE + _this.userForm.cellphone, function (res) {
                                if (!res.isExistTenantInfo) {
                                    _this.$message.error('请该用户先注册蜂鸟屋！');
                                }
                                else {
                                    _this.tenentInfo = res;
                                    _this.$message({
                                        message: '获取用户成功请继续！',
                                        type: 'success'
                                    });
                                }
                            },
                            function (err) {
                                console.log('fail');
                            });
                    }
                });
            },
            addDay(val) {
                var current = new Date();
                var distantDay = new Date(current.getFullYear(), current.getMonth() + 1, current.getDate() + val);
                return distantDay.getDate();
            },
            addDayFromSelectedDate(start, distant) {
                var dateTmp = start;
                if (!(dateTmp instanceof Date)) {
                    dateTmp = new Date(dateTmp);
                }
                var distantDay = new Date(dateTmp.getFullYear(), dateTmp.getMonth() + 1, dateTmp.getDate() + distant);
                return distantDay.getDate();
            },
            submitForm(formName) {
                var _this = this;
                if (!_this.isReleting) {
                    if (!_this.tenentInfo || !_this.tenentInfo.tenantId) {
                        _this.$message.error('请先获取租客信息！');
                        return false;
                    }
                }

                if (!_this.contractPictures || _this.contractPictures.length == 0) {
                    _this.$message.error('请上传合同照片！');
                    return false;
                }
                var tempContractPicString = null;
                for (var i = 0; i < _this.contractPictures.length; i++) {
                    if (i == 0) {
                        tempContractPicString = _this.contractPictures[0].response[0].url;
                    }
                    else {
                        tempContractPicString = tempContractPicString + ',' + _this.contractPictures[i].response[0].url;
                    }
                }
                if (!_this.ruleForm.dpPeriod) {
                    _this.$message.error('支付方式不能为空！');
                    return false;
                }

                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        return false;
                    } else {
                        var tmpTenantId = null;
                        if (!_this.isReleting) {
                            tmpTenantId = _this.tenentInfo.tenantId;
                        }
                        else {
                            tmpTenantId = _this.roomInfo.tenantId;
                        }
                        var params = {
                            tenantId: tmpTenantId,
                            roomId: _this.roomObject.roomId,
                            reservationFeeHandle: null,
                            roomReservationId: null,
                            contractNo: _this.ruleForm.contractNo,
                            contractType: _this.ruleForm.contractType,
                            rentStartTime: (!(_this.ruleForm.rentStartTime instanceof Date)) ? _this.ruleForm.rentStartTime : _this.ruleForm.rentStartTime.Format("yyyy-MM-dd"),
                            term: _this.ruleForm.term,
                            payDay: this.addDayFromSelectedDate(this.ruleForm.rentStartTime, -5),
                            payPeriod: _this.ruleForm.dpPeriod[1],
                            depositPeriod: _this.ruleForm.dpPeriod[0],
                            monthlyAmount: _this.ruleForm.monthlyAmount * 100,
                            depositAmount: _this.ruleForm.depositAmount * 100,
                            isPaidDeposit: _this.ruleForm.isPaidDeposit,
                            accessCardDepositAmount: _this.ruleForm.accessCardDepositAmount * 100,
                            propertyManagementAmount: _this.ruleForm.propertyManagementAmount * 100,
                            othersDepositAmount: _this.ruleForm.othersDepositAmount * 100,
                            contractPictures: tempContractPicString,
                            coldWaterPayMethod: _this.ruleForm.coldWaterPayMethod,
                            coldWaterMeterCurrentRecord: _this.ruleForm.coldWaterMeterCurrentRecord,
                            coldWaterUnitPrice: _this.ruleForm.coldWaterUnitPrice * 100,
                            coldWaterFixedAmount: _this.ruleForm.coldWaterFixedAmount * 100,
                            hotWaterPayMethod: _this.ruleForm.hotWaterPayMethod,
                            hotWaterMeterCurrentRecord: _this.ruleForm.hotWaterMeterCurrentRecord,
                            hotWaterUnitPrice: _this.ruleForm.hotWaterUnitPrice * 100,
                            hotWaterFixedAmount: _this.ruleForm.hotWaterFixedAmount * 100,
                            electricityPayMethod: _this.ruleForm.electricityPayMethod,
                            electricityMeterCurrentRecord: _this.ruleForm.electricityMeterCurrentRecord,
                            electricityUnitPrice: _this.ruleForm.electricityUnitPrice * 100,
                            electricityFixedAmount: _this.ruleForm.electricityFixedAmount * 100,
                            parkingAmount: _this.ruleForm.parkingAmount * 100,
                            washingAmount: _this.ruleForm.washingAmount * 100,
                            cleaningAmount: _this.ruleForm.cleaningAmount * 100,
                            networkAmount: _this.ruleForm.networkAmount * 100,
                            gasAmount: _this.ruleForm.gasAmount * 100,
                            televisionAmount: _this.ruleForm.televisionAmount * 100,
                            serviceAmount: _this.ruleForm.serviceAmount * 100,
                            othersAmount: _this.ruleForm.othersAmount * 100
                        }
                        if (_this.curRoomReservationId) {
                            params.reservationFeeHandle = _this.userForm.reservationFeeHandle;
                            params.roomReservationId = _this.curRoomReservationId;
                            params.contractType = 'Booking';
                        }
                        if (_this.isReleting) {
                            params.contractType = 'Releting';
                        }
                        _this.showLoading();
                        _this.$api.post(constants.KCURLS.CONTRACTCREATE, params, function (res) {
                            _this.hideLoading();
                            if (res.succeeded) {
                                _this.$message({
                                    message: '合同创建成功！',
                                    type: 'success'
                                });
                                _this.$emit('on-add-success', res.data.contractId);
                                _this.isDlgVisable = false;
                            }
                            else {
                                _this.$message.error(res.message);
                            }
                        }, function (error) {
                            _this.hideLoading();
                        });
                    }
                });

            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            collapseOtherMates() {
                var _this = this;
                _this.activeName = _this.activeName == 0 ? 1 : 0;
            }
        },
        created() {
            this.isReleting = this.isReletingInput;
        },
        watch: {
            showDialog(val) {
                this.isDlgVisable = val;
            },
            isDlgVisable(val) {
                this.$emit("on-result-change", val);
            },
            roomInfo(val) {
                this.roomObject = val;
            },
            roomReservationId(val) {
                this.curRoomReservationId = val;
            }
        }
    }
</script>
<style scoped>
    .remindPerMonney {
        float: right;
    }

    p.apartNameP {
        font-size: 30px;
        color: rgba(58, 58, 58, 0.87);
        margin-bottom: 20px;
    }

    .paidDeposit {
        top: -35px;
        position: absolute;
        right: 0;
    }
</style>
<style type="less">
    .el-collapse.my-collapse, .my-collapse .el-collapse-item__header, .my-collapse .el-collapse-item__wrap {
        border: 0;
    }

    .my-collapse .el-collapse-item__header__arrow.el-icon-arrow-right {
        float: right;
        display: none;
    }

    .my-collapse .el-collapse-item__header {
        padding-left: 0;
        font-size: 16px;
        color: #3c4144;
        background-color: rgba(0, 0, 0, 0);
    }

    .my-collapse .el-collapse-item__content {
        padding: 0
    }

    .my-collapse .el-collapse-item__content p {
        font-size: 14px;
        color: #475669;
    }

    .my-collapse .el-collapse-item__content i {
        color: #99a9bf;
        font-size: 16px;
        margin-right: 5px;
        vertical-align: text-bottom;
    }

    .my-collapse .el-collapse-item__content span {
        font-size: 12px;
        color: #07bf96;
        cursor: pointer;
        float: right;
        margin-right: 20px;
    }

    .my-collapse .el-collapse-item .el-col {
        font-size: 14px;
        line-height: 14px;
    }

    .el-upload--picture-card, .el-upload-list--picture-card {
        zoom: 0.5;
    }

    .unEditState .el-upload-list--picture-card {
        zoom: 1;
    }
</style>