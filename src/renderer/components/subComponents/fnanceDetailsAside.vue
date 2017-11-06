<template>
	<div>
		<n3-aside class="asideCommon" placement="right" title="Title" width="692px" ref="fnanceAsideRight" style="overflow-y: scroll;" :header="false">
	        <div class="asideHeader">
	          流水信息详情
	          <i @click="closeRight()" class="el-dialog__close el-icon el-icon-close"></i>
	        </div>
	        <div class="n3AsideBody">
	        	<p class="asideHouseName">{{financeExpense.apartmentName}} <span v-show="financeExpense.roomNumber">{{financeExpense.roomNumber}}室</span>
	        	</p>
	        	<p class="basicInfo" style="margin: -20px 0 30px"><span>租客: {{financeExpense.payeeDraweeRealName}}</span> <span> 合同编号: {{financeExpense.contractNo}}</span></p>
		        <p class="tabSectionTitle">
		          <i class="bf_icon_devify"></i>
		          流水信息
		        </p>
		        <div class="roomSection unEditState">
		          <el-col :span="5">明细描述</el-col>
		          <el-col :span="19">{{financeExpense.description}}</el-col>
		          <el-col :span="5">流水凭证</el-col>
		          <el-col :span="24">
	                    <el-upload :action="uploadUri"  
	                               list-type="picture-card" :on-preview="handlePictureCardPreview"
	                               :file-list="pictures">
	                        <i class="el-icon-plus"></i>
	                    </el-upload>
	              </el-col>
		        </div>		        
	        </div>
	    </n3-aside>
	</div>
</template>
<script>
	// import { n3Aside} from 'N3-components'
	import { mapActions } from 'vuex'
    import constants from '../../constants/index'
	export default {
		data: function() {
			return {
				uploadUri: this.$api.uploadUri,
				financeExpense: {

				},
				pictures: []
			}
		},
		methods: {
			...mapActions([
                'visibledialog'
            ]),
			openRight (val) {
				var _this = this;
				_this.pictures = [];
				_this.financeExpense = val;
				var pictures = [];
                var picturesNameArray = [];
                if (_this.financeExpense.transactionVoucher) {
                    pictures = _this.financeExpense.transactionVoucher.split(',');
                    for (var i = 0; i < pictures.length; i++) {
                        var temp = {
                            name: 'finance' + i,
                            url: pictures[i]
                        }
                        picturesNameArray.push(temp);
                    }
                    _this.pictures = picturesNameArray;
                }
		        _this.$refs.fnanceAsideRight.open();
		    },
		    closeRight () {
		        this.$refs.fnanceAsideRight.close();
		    },
		    handlePictureCardPreview(file) {
                this.visibledialog({
                    url: file.url,
                    urlList: this.pictures
                })
            },
	    },
		events: {
			
		},
		components: {
	        // n3Aside
	    }
	}
</script>
<style scoped>
</style>
<style type="less">
</style>