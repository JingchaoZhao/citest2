<template>
 <!-- @open="initReport()" -->
	<el-dialog :modal-append-to-body="false"  :show-close="false" :close-on-press-escape="false"  class="approDlgClass" v-model="isDlgVisable" >
		<div class="moduleTitle">
            <span style="line-height: 64px;padding-left: 20px;" class="moduleName">进件报告</span>
            <div v-if="reportInfo.data" class="timeAndDownload">
                <div class="timeLoad">
                    <div class="iconTime"></div> {{reportInfo.data.createTime}}
                </div>
                <div @click="downloadShouquan" class="btnModuleDownload"></div>
            </div>
        </div>
        <div v-if="reportInfo.data" id="apprRptContent" class="apprRptContent">
            <el-row class="basicInfoTitle">
                <el-col class="firstCol" :span="5">
                    <span class="bigName">{{reportInfo.data.realName}}</span>
                    <span v-if="reportInfo.data.age != 0" class="smallSex">{{reportInfo.data.sex}}士&nbsp;&nbsp;{{reportInfo.data.age}}岁</span>
                </el-col>
                <el-col class="secondCol" :span="7" style=" white-space: nowrap;">
                    <img src="~@/assets/reportIcon/approve_hl1.svg" class="img-sub imgIcContactMailAdjust">
                    <span class="marleft15">{{reportInfo.data.idCardNo}}</span>
                </el-col>
                <el-col class="thirdCol" :span="5">
                    <img src="~@/assets/reportIcon/approve_hl2.svg"  class="img-sub imgIcContactMailAdjust">
                    <span class="marleft15">{{reportInfo.data.cellphone}}</span>
                </el-col>
                <el-col class="fourCol" :span="7" style=" white-space: nowrap;">
                    <img src="~@/assets/reportIcon/approve_hl3.svg" class="img-sub imgIcContactMailAdjust">
                    <span class="marleft15" v-if="reportInfo.data.contactInfos">{{reportInfo.data.contactInfos[0].realName}}（{{reportInfo.data.contactInfos[0].relationship}} {{reportInfo.data.contactInfos[0].cellphone}})</span>
                </el-col>
            </el-row>
            <div class="identityImgsContent">
                <el-row :gutter="30">
                  <el-col :span="8">
                    <div class="grid-content">
                        <img class="identityImgsList" :src="reportInfo.data.credentialFacePhotoUrl" />
                        <div class="identityImgsName">证件照一</div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content">
                        <img class="identityImgsList" :src="reportInfo.data.credentialBackPhotoUrl" />
                        <div class="identityImgsName">证件照二</div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content">
                        <img class="identityImgsList" :src="reportInfo.data.selfies[0]" />
                        <div class="identityImgsName">个人手持自拍照</div>
                    </div>
                  </el-col>
                </el-row>
            </div>
            <div class="identityImgsContent noBorderContent">
                <p class="titleLoan">贷款用途</p>
                <span class="articleLoan">{{reportInfo.data.loanUse}}</span>
            </div>
            <div class="applyInfoTitle">申请信息</div>
            <ul class="applyInfosUl">
                <li>
                    <div class="blackCircle"></div>
                    <div class="leftApplyName">房屋地址:</div>
                    <span>{{reportInfo.data.houseAddress}}</span>
                </li>
                <li>
                    <div class="blackCircle"></div>
                    <div class="leftApplyName">月租金:</div>
                    <span>{{reportInfo.data.rentalAmount | amount2}}元</span>
                </li>
                <li>
                    <div class="blackCircle"></div>
                    <div class="leftApplyName">每期付款日:</div>
                    <span>{{reportInfo.data.paymentDay}}</span>
                </li>
                <li>
                    <div class="blackCircle"></div>
                    <div class="leftApplyName">剩余月数:</div>
                    <span>{{reportInfo.data.surplusMonths}}</span>
                </li>
                <li>
                    <div class="blackCircle"></div>
                    <div class="leftApplyName">押金:</div>
                    <span>{{reportInfo.data.depositAmount | amount2}}元</span>
                    <span style="margin-left: 65px;">{{reportInfo.data.isPaidDeposit | isPaidDeposit}}</span>
                </li>
                <li>
                    <div class="blackCircle"></div>
                    <div class="leftApplyName">物业费:</div>
                    <span>{{reportInfo.data.tenementAmount | amount2}}元</span>
                </li>
                <li>
                    <div class="blackCircle"></div>
                    <div class="leftApplyName">合同日期:</div>
                    <span>{{reportInfo.data.contractStartTime | dateYYMMDD}} ~ {{reportInfo.data.contractFinishTime | dateYYMMDD}}</span>
                </li>
                <li>
                    <div class="blackCircle"></div>
                    <div class="leftApplyName">合同编号:</div>
                    <span>{{reportInfo.data.contractNo}}</span>
                </li>
                <li>
                    <div class="blackCircle"></div>
                    <div class="leftApplyName">付款方式:</div>
                    <span>{{reportInfo.data.rentalType | rentalType}}</span>
                </li>
            </ul>
            <div style="padding: 20px 40px">
                <img v-for="picItem in reportInfo.data.contractPictures" :src="picItem" style="width: 100%; margin-bottom: 20px;"  />
            </div>
            <div class="subInfoTitle"></div>
        </div>
	   
	</el-dialog>
</template>
<script>
    import constants from '../../constants'
	export default {
		props: ['showDialog', 'approveId'],
		data: function() {
			return {
				isDlgVisable: this.showDialog,
                currentId: this.approveId,
				reportInfo: {}
			}
		},
		methods: {
            initReport() {
                if (!this.currentId) {
                    return false;
                }
                var _this = this;
                _this.$api.post(constants.URLS.FINDAPARTMENTREPORT, { apartmentReportId: this.currentId },
                    function(res) {
                        if (!res.succeeded) {

                        }
                        else {
                            _this.reportInfo = res;
                        }
                    }, function(error) {

                    }, true);
            },
            downloadShouquan() {
                kendo.drawing.drawDOM($('#apprRptContent'), {
                    paperSize: "A4", margin: "10mm", scale: 0.50, template: '<div class="page-template"> \
                        <div class="header"> \
                            个人进件报告 \
                        </div> \
                        <div class="footer"> \
                            <span>#:pageNum# / #:totalPages#</span> \
                        </div> \
                    </div>',
                    keepTogether: ".prevent-split", forcePageBreak: ".page_break"
                }).then(function (group) {
                    var name = '进件报告';
                    kendo.drawing.pdf.saveAs(group, name + ".pdf");
                });
            }
	    },
		watch: {
			showDialog(val) {
				this.isDlgVisable = val;
			},
            approveId(val) {
                this.currentId = val;
            },
			isDlgVisable(val) {
				this.$emit("on-result-change",val);
			}
		},
        created() {
            this.initReport();
        }
	}
</script>
<style scoped>
    #apprRptContent {
        font-family: 'lanting', 'langtingxihei', 'sans-serif', 'Microsoft Himalaya'
    }
</style>