<template>
<!-- @open="initReport"  --> 
	<el-dialog :modal-append-to-body="false" :show-close="false" :close-on-press-escape="false"  class="approDlgClass" v-model="isDlgVisable" >
		<div class="moduleTitle">
            <span style="line-height: 84px;padding-left: 20px;" class="moduleName">初审报告</span>
            <div class="timeAndDownload">
                <div class="timeLoad">
                    <div class="iconTime"></div> {{reportInfo.updateTime}}
                </div>
                <div class="btnModuleDownload" @click="download"></div>
            </div>
        </div>

        <div id="creditPrint">
            <div class="rptSection" style="margin-top: 25px;">
              <p style="margin-left: 20px; line-height: 18px;" class="apprRptSubTitle">身份信息</p>
              <div class="identityItem">
                <div class="idImg">
                  <img style="width: 70px;" src="~@/assets/reportIcon/id_bg.png" /> 
                </div>
                <div class="nameArea">
                  <div class="nameItem">
                    姓名<span class="value">{{identityInformation.name}}</span>
                    <el-tag v-if="identityInformation.fIdMatch == 1" style="margin-left: 10px" type="success">认证一致</el-tag>
                    <el-tag v-if="identityInformation.fIdMatch == 2" style="margin-left: 10px" type="danger">认证不一致</el-tag>
                    <el-tag v-if="identityInformation.fIdMatch == 3" style="margin-left: 10px" type="warning">无数据</el-tag>
                  </div>
                  <div class="nameItem" style="border-left: 3px solid #a9d773;">性别<span class="value">{{identityInformation.gender}}</span></div>
                  <div class="nameItem" style="border-left: 3px solid #5dcaf1;">籍贯<span class="value">{{identityInformation.province}}</span></div>
                  <div class="nameItem" style="border-left: 3px solid #ff8f59;">年龄<span class="value">{{identityInformation.age}}</span></div>
                </div>
                <div class="nameArea" style="margin-left: 80px;">
                    <div class="nameItem" style="border-left: 3px solid #98bfe8;">
                      身份证号<span class="value">{{identityInformation.idCardNo}}</span>
                      <el-tag v-if="identityInformation.fIdAviable" style="margin-left: 10px" type="success">身份证有效</el-tag>
                      <el-tag v-if="!identityInformation.fIdAviable" style="margin-left: 10px" type="danger">无数据</el-tag>
                  </div>
                  <div class="nameItem" style="border-left: 3px solid #fda185;">手机号码<span class="value" v-if="P0404Request">{{P0404Request.Cellphone}}</span><!-- <el-tag style="margin-left: 10px" type="success">认证一致</el-tag> --></div>
                  <div class="nameItem" style="border-left: 3px solid #f7d167;">出生日期<span class="value">{{identityInformation.birthday}}</span></div>
                  
                </div>
              </div>
            </div>
            <div class="rptSection">
              <p style="margin-left: 20px; line-height: 18px;" class="apprRptSubTitle">风险识别</p>
              <div class="riskArea">
                <div v-if="(dishonestyInfo.DishonestyAnnouncementRecordInfos && dishonestyInfo.DishonestyAnnouncementRecordInfos.length > 0) || (performInfo.PerformAnnouncementsRecordInfos && performInfo.PerformAnnouncementsRecordInfos.length > 0) || (badBehaviorInfo.BadBehaviorBlackListInfos && badBehaviorInfo.BadBehaviorBlackListInfos.length > 0) || (fraudBlacklistInfo.BlackListBases && fraudBlacklistInfo.BlackListBases.length > 0) || (creditRiskBlacklist.BlackListBases && creditRiskBlacklist.BlackListBases.length > 0)">
                  <div class="riskHead riskBg">命中信息</div>
                  <div style="padding: 0 20px">

                    <div v-if="dishonestyInfo.DishonestyAnnouncementRecordInfos && dishonestyInfo.DishonestyAnnouncementRecordInfos.length > 0" class="riskHead2"><img src="~@/assets/reportIcon/ic_rR3.png" /> <span>失信被执行公告信息</span></div>
                    <table v-for="dishonestyItem in dishonestyInfo.DishonestyAnnouncementRecordInfos" class="margBtm25 approveTable table-4" style="width: 100%">
                        <tbody>
                        <tr>
                            <td class="trTitle trRedTitle">案号</td>
                            <td>{{dishonestyItem.CaseNo}}</td>
                            <td class="trTitle trRedTitle">立案时间</td>
                            <td>{{dishonestyItem.Time|dateYYMMDD}}</td>
                        </tr>
                        <tr>
                            <td class="trTitle trRedTitle">执行法院</td>
                            <td>{{dishonestyItem.CourtName}}</td>
                            <td class="trTitle trRedTitle">执行依据文号</td>
                            <td>{{dishonestyItem.BasedInstruments}}</td>
                        </tr>
                        <tr>
                            <td class="trTitle trRedTitle">做出执行依据单位</td>
                            <td>{{dishonestyItem.BasedUnit}}</td>
                            <td class="trTitle trRedTitle">被执行人的履行情况</td>
                            <td>{{dishonestyItem.Fulfillment}}</td>
                        </tr>
                        <tr>
                            <td class="trTitle trRedTitle">被执行人行为具体情形</td>
                            <td>{{dishonestyItem.SpecificCircumstances}}</td>
                            <td class="trTitle trRedTitle">公布时间</td>
                            <td>{{dishonestyItem.PostTime|dateYYMMDD}}</td>
                        </tr>
                        </tbody>
                    </table>

                    <div v-if="performInfo.PerformAnnouncementsRecordInfos && performInfo.PerformAnnouncementsRecordInfos.length > 0" class="riskHead2"><img src="~@/assets/reportIcon/ic_rR5.png" /> <span>被执行信息</span></div>
                    <table v-if="performInfo.PerformAnnouncementsRecordInfos && performInfo.PerformAnnouncementsRecordInfos.length > 0" class="margBtm25 approveTable table-5" style="width: 100%">
                        <tbody>
                        <tr>
                            <td class="trTitle trRedTitle">案号</td>
                            <td class="trTitle trRedTitle">立案时间</td>
                            <td class="trTitle trRedTitle">执行法院</td>
                            <td class="trTitle trRedTitle">执行标的金额</td>
                            <td class="trTitle trRedTitle">执行状态</td>
                        </tr>
                        <tr v-for="performItem in performInfo.PerformAnnouncementsRecordInfos">
                            <td>{{performItem.CaseNo}}</td>
                            <td>{{performItem.RecordTime|dateYYMMDD}}</td> <!-- ??? -->
                            <td>{{performItem.CourtName}}</td>
                            <td>{{performItem.ExecMoney|amount2}}</td>
                            <td>{{performItem.Status}}</td>
                        </tr>
                        </tbody>
                    </table>

                    <div v-if="badBehaviorInfo.BadBehaviorBlackListInfos && badBehaviorInfo.BadBehaviorBlackListInfos.length > 0" class="riskHead2"><img src="~@/assets/reportIcon/ic_rR1.png" /> <span>不良信息</span></div>
                    <table v-if="badBehaviorInfo.BadBehaviorBlackListInfos && badBehaviorInfo.BadBehaviorBlackListInfos.length > 0" class="margBtm25 approveTable table-4" style="width: 100%">
                        <tbody>
                        <tr>
                            <td class="trTitle trRedTitle">命中条件</td>
                            <td class="trTitle trRedTitle">命中结果</td>
                            <td class="trTitle trRedTitle">命中类型</td>
                            <td class="trTitle trRedTitle">风险发生时间</td>
                        </tr>
                        <tr v-for="badBehaviorItem in badBehaviorInfo.BadBehaviorBlackListInfos">
                            <td>{{badBehaviorItem.RiskHitCondition|riskType}}</td>
                            <td>{{badBehaviorItem.BlacklistCategory}}</td>
                            <td>{{badBehaviorItem.RiskType}}</td>
                            <td>{{badBehaviorItem.RiskTime|dateYYMMDD}}</td>
                        </tr>
                        </tbody>
                    </table>

                    <div v-if="fraudBlacklistInfo.BlackListBases && fraudBlacklistInfo.BlackListBases.length > 0" class="riskHead2"><img src="~@/assets/reportIcon/ic_rR4.png" /> <span>欺诈风险黑名单</span></div>
                    <table v-if="fraudBlacklistInfo.BlackListBases && fraudBlacklistInfo.BlackListBases.length > 0" class="margBtm25 approveTable table-4" style="width: 100%">
                        <tbody>
                        <tr>
                            <td class="trTitle trRedTitle">命中条件</td>
                            <td class="trTitle trRedTitle">命中结果</td>
                            <td class="trTitle trRedTitle">命中类型</td>
                            <td class="trTitle trRedTitle">风险发生时间</td>
                        </tr>
                        <tr v-for="fraudItem in fraudBlacklistInfo.BlackListBases">
                            <td>{{fraudItem.RiskHitCondition|riskType}}</td>
                            <td>{{fraudItem.HitResult}}</td>
                            <td>{{fraudItem.RiskType}}</td>
                            <td>{{fraudItem.RiskTime|dateYYMMDD}}</td>
                        </tr>
                        </tbody>
                    </table>

                    <div v-if="creditRiskBlacklist.BlackListBases && creditRiskBlacklist.BlackListBases.length > 0" class="riskHead2"><img src="~@/assets/reportIcon/ic_rR2.png" /> <span>信用风险查询</span></div>
                    <table v-if="creditRiskBlacklist.BlackListBases && creditRiskBlacklist.BlackListBases.length > 0" class="margBtm25 approveTable table-5" style="width: 100%">
                        <tbody>
                        <tr>
                            <td class="trTitle trRedTitle">命中条件</td>
                            <td class="trTitle trRedTitle">风险类型</td>
                            <td class="trTitle trRedTitle">风险等级</td>
                            <td class="trTitle trRedTitle">风险时间</td>
                            <td class="trTitle trRedTitle">风险详情</td>
                        </tr>
                        <tr v-for="creditItem in creditRiskBlacklist.BlackListBases">
                            <td>{{creditItem.RiskDetails.HitCondition | riskType}}</td>
                            <td>{{creditItem.RiskDetails.RiskType}}</td>
                            <td>{{creditItem.RiskDetails.RiskLevel | riskLevel}}</td>
                            <td>{{creditItem.RiskDetails.RiskTime | dateYYMMDD}}</td>
                            <td>{{creditItem.RiskDetails.RiskDetails}}</td>
                        </tr>
                        </tbody>
                    </table>

                  </div>
                </div>
                <div v-if="(!dishonestyInfo.DishonestyAnnouncementRecordInfos || dishonestyInfo.DishonestyAnnouncementRecordInfos.length < 1) || (!performInfo.PerformAnnouncementsRecordInfos || performInfo.PerformAnnouncementsRecordInfos.length < 1) || (!badBehaviorInfo.BadBehaviorBlackListInfos || badBehaviorInfo.BadBehaviorBlackListInfos.length < 1) || (!fraudBlacklistInfo.BlackListBases || fraudBlacklistInfo.BlackListBases.length < 1) || (!creditRiskBlacklist.BlackListBases || creditRiskBlacklist.BlackListBases.length < 1)">
                  <div class="riskHead unRiskBg">未命中信息</div>
                  <div style="padding: 0 20px; width: 100%; font-size: 0;">
                    <div v-if="!dishonestyInfo.DishonestyAnnouncementRecordInfos || dishonestyInfo.DishonestyAnnouncementRecordInfos.length < 1" class="part20">
                      <div><img style="width: 60px;" src="~@/assets/reportIcon/ic_r3.png" /></div>
                      <p>失信被执行公告信息</p>
                    </div>
                    <div v-if="!performInfo.PerformAnnouncementsRecordInfos || performInfo.PerformAnnouncementsRecordInfos.length < 1" class="part20">
                      <div><img style="width: 60px;" src="~@/assets/reportIcon/ic_r5.png" /></div>
                      <p>被执行信息</p>
                    </div>
                    <div v-if="!badBehaviorInfo.BadBehaviorBlackListInfos || badBehaviorInfo.BadBehaviorBlackListInfos.length < 1" class="part20">
                      <div><img style="width: 60px;" src="~@/assets/reportIcon/ic_r1.png" /></div>
                      <p>不良信息</p>
                    </div>
                    <div v-if="!fraudBlacklistInfo.BlackListBases || fraudBlacklistInfo.BlackListBases.length < 1" class="part20">
                      <div><img style="width: 60px;" src="~@/assets/reportIcon/ic_r4.png" /></div>
                      <p>欺诈风险黑名单</p>
                    </div>
                    <div v-if="!creditRiskBlacklist.BlackListBases || creditRiskBlacklist.BlackListBases.length < 1" class="part20">
                      <div><img style="width: 60px;" src="~@/assets/reportIcon/ic_r2.png" /></div>
                      <p>信用风险查询</p>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
        </div>
	    
	</el-dialog>
</template>
<script>
    import constants from '../../constants'
	export default {
		props: ['showDialog', 'reportId', 'batchId'],
		data: function() {
			return {
				isDlgVisable: this.showDialog,
                currentReportId: this.reportId,
                currentBatchId: this.batchId,
        		reportInfo: {},
                identityInformation: {},

                dishonestyInfo: {},
                performInfo: {},
                badBehaviorInfo: {},
                fraudBlacklistInfo: {},
                creditRiskBlacklist: {},

                P0404Request: null
			}
		},
		methods: {
            initReport() {
                var _this = this;
                if (!_this.currentBatchId) {
                    return false;
                }
                var params = { batchId: _this.currentBatchId, reportId: _this.currentReportId }
                // console.log(params);
                _this.$api.post(constants.URLS.FINDCREDITREPORTBATCHCONTENT, params,
                    function(res) {
                        if (!res) {
                            return;
                        }
                        _this.reportInfo = res;
                        _this.reportInfo.updateTime = new Date(_this.reportInfo.updateTime).Format('yyyy-MM-dd hh:mm');
                        if (_this.reportInfo.modules.M01.updateTime != null) {
                            var P0101 = _this.reportInfo.modules.M01.functions.P0101;
                            var P0101Response = JSON.parse((P0101.length === 0) ? '{}' : P0101[0].responseInfo);
                            _this.identityInformation = {
                                name: P0101Response.RealName,
                                idCardNo: P0101Response.IDCardNo,
                                fIdMatch: 1,
                                fIdAviable: (P0101.length > 0 && P0101[0].succeeded),
                                gender: P0101Response.Gender,
                                age: P0101Response.age,
                                birthday: '',
                                province: P0101Response.BirthPlace
                            };
                            if (P0101Response.Birthday) {
                                _this.identityInformation.birthday = new Date(P0101Response.Birthday).Format('yyyy-MM-dd')
                            }
                            if (P0101Response.Status === 10) {
                                _this.identityInformation.fIdMatch = 1;
                            }
                            else if (P0101Response.Status === 20) {
                                _this.identityInformation.fIdMatch = 2;
                            }
                            else {
                                _this.identityInformation.fIdMatch = 3;
                            }
                        }
                        if (_this.reportInfo.modules.M04.updateTime != null) {
                            var M04Func = _this.reportInfo.modules.M04.functions;
                            
                            var P0401 = M04Func.P0401;
                            _this.dishonestyInfo = {};
                            if (P0401.length > 0) {
                                if (P0401[0].code === 2) {
                                    _this.dishonestyInfo = JSON.parse(P0401[0].responseInfo);
                                }
                            }

                            var P0402 = M04Func.P0402;
                            _this.performInfo = {};
                            if (P0402.length > 0) {
                                if (P0402[0].code === 2) {
                                    _this.performInfo = JSON.parse(P0402[0].responseInfo);
                                }
                            }

                            var P0403 = M04Func.P0403;
                            _this.badBehaviorInfo = {};
                            if (P0403.length > 0) {
                                if (P0403[0].code === 2) {
                                    _this.badBehaviorInfo = JSON.parse(P0403[0].responseInfo);
                                }
                            }

                            var P0404 = M04Func.P0404;
                            _this.fraudBlacklistInfo = {};
                            if (P0404.length > 0) {
                                _this.P0404Request = JSON.parse(P0404[0].requestInfo);

                                if (P0404[0].code === 2) {
                                    _this.fraudBlacklistInfo = JSON.parse(P0404[0].responseInfo);
                                }
                            }

                            var P0410 = M04Func.P0410;
                            _this.creditRiskBlacklist = {};
                            if (P0410 && P0410.length > 0) {
                                if (P0410[0].code === 2) {
                                    _this.creditRiskBlacklist = JSON.parse(P0410[0].responseInfo);
                                    for (var baseItem = 0; baseItem < _this.creditRiskBlacklist.BlackListBases.length; baseItem++) {
                                        _this.creditRiskBlacklist.BlackListBases[baseItem].RiskDetails = JSON.parse(_this.creditRiskBlacklist.BlackListBases[baseItem].RiskDetails);
                                    }
                                }
                            }
                        }

                    }, function(error) {

                    }, true);
            },
            download() {
                kendo.drawing.drawDOM($('#creditPrint'), {
                    paperSize: "A4", margin: "10mm", scale: 0.50, template: '<div class="page-template"> \
                        <div class="header"> \
                            个人初审报告 \
                        </div> \
                        <div class="footer"> \
                            <span>#:pageNum# / #:totalPages#</span> \
                        </div> \
                    </div>',
                    keepTogether: ".prevent-split", forcePageBreak: ".page_break"
                }).then(function (group) {
                    var name = '初审报告';
                    kendo.drawing.pdf.saveAs(group, name + ".pdf");
                });
            }
	    },
		watch: {
			showDialog(val) {
				this.isDlgVisable = val;
			},
            // watch 保证值改变的时候 能同步到改变；
            reportId(val) {
                this.currentReportId = val;
            },
            batchId(val) {
                this.currentBatchId = val;
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
    #creditPrint {
        font-family: 'lanting', 'langtingxihei', 'sans-serif', 'Microsoft Himalaya'
    }
</style>
<style>
.riskArea {
  padding: 20px 0;
}
.riskHead {
  font-size:16px;
  color:#3d4d65;
  /*padding-left: 13px;*/
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  font-size:14px;
  color:#ffffff;
  height:32px;
  width: 100%;
  line-height: 32px;
  background: url(~@/assets/reportIcon/bg_riskHead.png) center no-repeat;
}
.riskHead.riskBg {
  background: url(~@/assets/reportIcon/bg_risk.png) center no-repeat;
  background-size: 100% 100%;
}
.riskHead.unRiskBg {
  background: url(~@/assets/reportIcon/bg_unrisk.png) center no-repeat;
  background-size: 100% 100%;
}
.riskHead2 {
  font-size:14px;
  color:#ff6260;
  margin-bottom: 10px;
}
.riskHead2 img {
  width: 24px;
  margin-left: 7px;
  margin-right: 10px;
}
.riskHead2 img, .riskHead2 span {
  vertical-align: middle;
}
.rptSection {
  background:#ffffff;
  box-shadow:-3px 2px 2px 0 rgba(119,151,178,0.16);
  border-radius:4px;
  width:100%;
}
.rptSection .rptHeader {
  border-bottom: 1px solid #e6eaee;
  border-radius:4px 4px 0 0;
  height:50px;
  width: 100%;
  line-height: 50px;
  padding-left: 20px;
  font-size:16px;
  color:#697b8c;
}
.identityItem {
  padding: 35px 40px;
}
.idImg {
  display: inline-block;
  background:#e6f8f4;width:120px;height:120px;border-radius:100%;
  margin-top: 8px;
  line-height: 120px;
  text-align: center;
}
.nameArea {
  display: inline-block;
  margin-left: 50px;
  vertical-align: top;
}
.nameItem {
  padding-left: 10px;
  border-left: 3px solid #47cabf;
  font-size:16px;
  line-height: 16px;
  color:#6a6f7b;
  margin-bottom: 20px;
}
.nameItem .value{
  color:#354052;
  margin-left: 30px;
}
.part20 {
  width: 20%;
  font-size:14px;
  color:#3d4d65;
  text-align: center;
  display: inline-block;
  vertical-align: top;
}
.part20 div {
  margin: 0 auto;
  background: rgba(7, 191, 150, 0.1);
  width:100px;
  height:100px;
  border-radius:100%;
  margin-bottom: 20px;
  text-align: center;
  line-height: 100px;
}
</style>