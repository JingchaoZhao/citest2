<template>
	<div class="">
		<div class="pageTitleAndSearch">
			权限列表
			<el-input style="float: right; width:298px; height:34px; margin-top: 12px; margin-right: 22px;"
			placeholder="请输入权限名查找"
			icon="search"
			v-model="searchBuffer"
			:on-icon-click="searchUserList">
		</el-input>
	</div>
	<el-collapse class="settingCollase" accordion>
		<el-collapse-item>
			<template slot="title">
				<el-row style="width: 80%;">
					<el-col :span="24">
						<p>权限一</p>
						<p class="describle"><span class="greenCircle"></span>描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述
						</p>
					</el-col>
				</el-row>
			</template>
			<div class="inculdeItem">
				<div style="width: 100%; overflow: hidden; margin-bottom: 20px;">
					<div class="leftLabel">
						<span>群组成员</span>
					</div>
					<div class="middleTags">
						<el-tag class="groupTags greenStyle"
						v-for="tag in tags1" :key="tag.name"
						:closable="false"
						color="rgba(6,191,150,0.10)"
						>
						{{tag.name}}
						</el-tag>
					</div>
				</div>
				<div style="width: 100%; overflow: hidden; margin-bottom: 20px;">
					<div class="leftLabel">
						<span>拥有群组</span>
					</div>
					<div class="middleTags">
						<el-tag class="groupTags"
						v-for="tag in tags1" :key="tag.name"
						:closable="false"
						color="rgba(247,186,41,0.10)"
						>
						{{tag.name}}
						</el-tag>
					</div>
				</div>
			</div>
		</el-collapse-item>
		<el-collapse-item>
			<template slot="title">
				<el-row style="width: 80%;">
					<el-col :span="24">
						<p>权限二</p>
						<p class="describle"><span class="greenCircle"></span>描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述
						</p>
					</el-col>
				</el-row>
			</template>
			<div class="inculdeItem">
				<div style="width: 100%; overflow: hidden; margin-bottom: 20px;">
					<div class="leftLabel">
						<span>群组成员</span>
					</div>
					<div class="middleTags">
						<el-tag class="groupTags greenStyle"
						v-for="tag in tags1" :key="tag.name"
						:closable="false"
						color="rgba(6,191,150,0.10)"
						>
						{{tag.name}}
						</el-tag>
					</div>
				</div>
				<div style="width: 100%; overflow: hidden; margin-bottom: 20px;">
					<div class="leftLabel">
						<span>拥有群组</span>
					</div>
					<div class="middleTags">
						<el-tag class="groupTags"
						v-for="tag in tags1" :key="tag.name"
						:closable="false"
						color="rgba(247,186,41,0.10)"
						>
						{{tag.name}}
						</el-tag>
					</div>
				</div>
			</div>
		</el-collapse-item>
		<el-collapse-item>
			<template slot="title">
				<el-row style="width: 80%;">
					<el-col :span="24">
						<p>权限三</p>
						<p class="describle"><span class="greenCircle"></span>描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述
						</p>
					</el-col>
				</el-row>
			</template>
			<div class="inculdeItem">
				<div style="width: 100%; overflow: hidden; margin-bottom: 20px;">
					<div class="leftLabel">
						<span>群组成员</span>
					</div>
					<div class="middleTags">
						<el-tag class="groupTags greenStyle"
						v-for="tag in tags1" :key="tag.name"
						:closable="false"
						color="rgba(6,191,150,0.10)"
						>
						{{tag.name}}
						</el-tag>
					</div>
				</div>
				<div style="width: 100%; overflow: hidden; margin-bottom: 20px;">
					<div class="leftLabel">
						<span>拥有群组</span>
					</div>
					<div class="middleTags">
						<el-tag class="groupTags"
						v-for="tag in tags1" :key="tag.name"
						:closable="false"
						color="rgba(247,186,41,0.10)"
						>
						{{tag.name}}
						</el-tag>
					</div>
				</div>
			</div>
		</el-collapse-item>
	</el-collapse>
</div>
</template>
<script>
	export default {
		data() {
			return {
				userList : [
				{
					name: '123',
				}, {
					name: '2342'
				}
				],
				tags1: [
				{
					name: '超级管理员'
				}, {
					name: '管理员'
				},{
					name: '超级管理员'
				}, {
					name: '管理员'
				},{
					name: '超级管理员'
				}, {
					name: '管理员'
				},{
					name: '超级管理员'
				}, {
					name: '管理员'
				},{
					name: '超级管理员'
				}, {
					name: '管理员'
				},{
					name: '超级管理员'
				}, {
					name: '管理员'
				},{
					name: '超级管理员'
				}, {
					name: '管理员'
				},{
					name: '超级管理员'
				}, {
					name: '管理员'
				},{
					name: '超级管理员'
				}, {
					name: '管理员'
				},{
					name: '超级管理员'
				}, {
					name: '管理员'
				},{
					name: '超级管理员'
				}, {
					name: '管理员'
				},
				],
				searchBuffer: null
			};
		},
		methods: {
			searchUserList: function() {
				if (!this.searchBuffer) {
					this.$notify({
						title: '警告',
						message: '请输入要检索的关键字',
						type: 'warning'
					});
				}
				else {
					alert(this.searchBuffer);
				}
			}
		}
	}
</script>