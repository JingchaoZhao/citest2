<template>
    <div>     
        <div @click="show()">显示</div>
        <el-tabs v-if="isShowing" class="asideFirstTab" v-model="asideActiveName" @tab-click="asideHandleClick">
            <el-tab-pane label="房间详情" name="first">
            </el-tab-pane>
            <el-tab-pane label="租房合同" name="second">
            </el-tab-pane>
            <el-tab-pane label="租客账单" name="third">
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                asideActiveName: 'first',
                isShowing: false
            };
        },
        methods: {
            asideHandleClick(tab, event) {},
            show() {
                this.isShowing = true;
            }
        },
        created() {
            var _this = this;
            setTimeout(function() {
                _this.isShowing = true;
            }, 0);
        }
    };
</script>
