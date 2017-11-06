<!-- approveOprtDlg.vue -->
<template>
	<!-- <el-dialog :modal-append-to-body="false" title="信贷审批" :show-close="false" v-model="isDlgVisable"> -->
	<el-dialog :modal-append-to-body="false" class="floorAddDlg" title="信贷审批" v-model="isDlgVisable" >
	 	<el-radio-group v-model="radio" style="width: 100%; margin-top: 15px;">
	 		<el-row>
	 			<el-col :span="8">
	 				<el-radio :label="1">拒绝</el-radio>
	 			</el-col>
	 			<el-col :span="8">
	 				<el-radio :label="2">通过</el-radio>
	 			</el-col>
	 			<el-col :span="8">
	 				<el-radio :label="3">待观察</el-radio>
	 			</el-col>
	 		</el-row>
	 		<p style="margin-top: 35px; margin-bottom: 15px; font-size: 14px; color: #1f2d3d;">审批记录<span style="float: right; font-size: 12px;">(不超过200字)</span></p>
	 		<el-input
			  type="textarea"
			  :rows="8"
			  :maxlength="200"
			  placeholder="请输入审批记录"
			  v-model="textarea">
			</el-input>
		</el-radio-group>
		<div slot="footer" class="dialog-footer">
		  	<div class="blockBtn greenBtn" @click="submit">确 定</div>
		</div>
	</el-dialog>
</template>
<script>
	export default {
		props: ['showDialog'],
		data: function() {
			return {
				radio: 1,
				textarea: null,
				isDlgVisable: this.showDialog
			}
		},
		methods: {
			submit() {
				var auditStateInfo = 'Refuse';
				if (this.radio == 2) {
					auditStateInfo = 'Pass';
				}
				if (this.radio == 3) {
					auditStateInfo = 'Observing';
				}
				this.$emit("on-sp-infos", {
					auditResult: auditStateInfo,
					auditMessage: this.textarea
				});
				this.isDlgVisable = false;
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
<style>
</style>