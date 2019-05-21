<template>
    <div>
        <el-table
                :data="tableData"
                :header-cell-style="{background:'#F3FFEA'}">
            <el-table-column
                    prop="basic"
                    label="基本信息">
                <template slot-scope="scope">
                    <div class="basic">
                        <img :src="scope.row.patientPic"/>
                        <div>
                            <p style="font-weight:bold;">{{scope.row.patientName}}</p>
                            <p>{{scope.row.patientAge}}岁</p>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="caseId"
                    label="订单编号">
            </el-table-column>
            <el-table-column
                    prop="institutionName"
                    label="医疗机构">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="时间">
                <template slot-scope="scope">
                    {{scope.row.createTime | dateFormat}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="infoStatus"
                    label="状态">
                <template slot-scope="scope">
                    收方案
                </template>
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--<el-pagination-->
        <!--style="float: right"-->
        <!--layout="prev, pager, next"-->
        <!--:total="50">-->
        <!--</el-pagination>-->
    </div>
</template>

<script>
	import Mixin from './mixin'

	export default {
		name: "Scheme",
		mixins: [Mixin],
		data() {
			return {}
		},
		methods: {
			handleClick(row) {
				this.setCaseId(row.caseId)
				this.setPatientId(row.patientId)
				this.$router.push({path: '/details/info/case'})
			}
		},
		async mounted() {
			await this.getCaseList(2)
		}
	}
</script>

<style scoped>
    .basic {
        display: flex;
    }

    .basic img {
        width: 55px;
        height: 55px;
        border-radius: 50%;
        margin-right: 15px;
    }
</style>
