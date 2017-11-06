<template>
    <div>
    	<el-dialog :modal-append-to-body="false"  :show-close="false" :close-on-press-escape="false"  class="approDlgClass" v-model="isDlgVisable" >
    		<div class="moduleTitle">
                <span style="line-height: 64px;padding-left: 20px;" class="moduleName">授权书</span>
                <div class="timeAndDownload">
                    <div class="timeLoad">
                        <div class="iconTime"></div> 2017-06-13 11:47:04
                    </div>
                    <div class="btnModuleDownload" @click="downloadShouquan"></div>
                </div>
            </div>
            <div id="shouquanDiv" style=" padding: 20px 40px; text-align: left;">
                <p class="articleTitle">授权书</p> 
                <br>
                <br>
                <br>
                <p><span class="underLine">&nbsp;&nbsp;（甲方）&nbsp;&nbsp;</span>公司：</p>
                <div style="text-indent: 30px">
                <p>本人／本单位（姓名／名称）<span class="underLine">&nbsp;&nbsp;         （最终用户）   &nbsp;&nbsp;</span>        （身份证号码／营业执照号码：       <span class="underLine">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>            ）同意并不可撤销的授权贵司及与贵司合作的第三方查询或核实、搜集本人／本单位相关数据，并授权贵司与前述第三方共享本人／本单位该数据，但法律、法规、监管政策    禁止的除外。</p><br>
                <p>用于下述用途：</p>
                <p>（一）审核本人申请（包括但不限于贷款、消费等业务）；</p>
<p>（二）审核本人作为提出申请或特约商户申请的个人、组织或机构的负责人、法定代表人、出资人、担保人、企业经营者、实际控制人； </p>
<p>（三）对已向本人或本人担任法人、出资人、担保人、企业经营者、实际控制人的个人、机构或组织发放的贷款、进行贷后风险管理；</p>
<p>（四）向本人提供的其他贵司合法经营范围内的业务。</p>
<p>本人/本单位在此声明已充分理解上述授权条款含义，知晓并自愿承担提供上述数据可能产生泄漏等不良影响及法律后果；贵司已经对数据提供事宜及其风险向本人／本单位做了充分说明，本人／本单位已知晓并同意。</p>
    <p>本授权书一经出具即生效。</p>
                </div>
                <br>
                <p class="textAlignRight">授权人（签字）：   <span class="underLine">&nbsp;&nbsp;（最终用户）&nbsp;&nbsp;</span> </p>
                <p class="textAlignRight">签署日期：     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年 &nbsp;&nbsp;  月  &nbsp;&nbsp; 日</p>
            </div>
    	</el-dialog>
    </div>
</template>
<script>
    export default {
        props: ['showDialog'],
        data: function() {
            return {
                isDlgVisable: this.showDialog
            }
        },
        methods: {
            downloadShouquan() {
                kendo.drawing.drawDOM($('#shouquanDiv'), {
                    paperSize: "A4", margin: "10mm", scale: 0.50, template: '<div class="page-template"> \
                        <div class="header"> \
                            授权书 \
                        </div> \
                        <div class="footer"> \
                            <span>#:pageNum# / #:totalPages#</span> \
                        </div> \
                    </div>',
                    keepTogether: ".prevent-split", forcePageBreak: ".page_break"
                }).then(function (group) {
                    var name = '授权书';
                    kendo.drawing.pdf.saveAs(group, name + ".pdf");
                });
            }
        },
        watch: {
            showDialog(val) {
                this.isDlgVisable = val;
            },
            isDlgVisable(val) {
                this.$emit("on-result-change",val);
            }
        }
    }
</script>
<style scoped>
    #shouquanDiv {
        font-family: 'lanting', 'langtingxihei', 'sans-serif', 'Microsoft Himalaya'
    }
</style>
<style >
    .underLine {
        text-decoration: underline;
    }
    .textAlignRight {
        text-align: right;
    }
</style>