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
                    <span>驳回</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">


                    <el-button @click="open(scope.row)" type="text" size="small">原因</el-button>
                    <el-button @click="AgainCase(scope.row)" type="text" size="small">详情</el-button>

                    <el-button @click="onSubFun(scope.row)" type="text" size="small">再提交</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="驳回原因"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <span>{{checkCause}}</span>
        </el-dialog>        
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import {fetchCaseList} from '../../common/api/index'
	import {resubmission} from '../../common/api/index'
	import Mixin from './mixin'

	export default {
        name: "AuditFailure",
        computed: mapState(['CaseInfo',]),

		mixins: [Mixin],
		data() {
			return {
                dialogVisible: false,
                checkCause: '',         //  驳回原因
                // tableData:{
                //     caseId : 1111111111,
                // }
				tableData: [],
				keyword: '',
				createTimeBegin: '',
				createTimeEnd: '',                
            }
		},
		async mounted() {
			await this.getCaseList(-2)
		},
		methods: {
            open(row){
                this.checkCause = row.checkCause;
                this.dialogVisible = true;
            },
            handleClose(){
                this.dialogVisible = false
            },
            onSubFun(row){   //   再提交
				const params = {
                    caseId: row.caseId,
                    status: -1
                }                
                resubmission(params).then(res => {
                    if (res.resultStatus) {
                        this.getCaseList(-2)
                        // this.search(this.keyword, this.createTimeBegin, this.createTimeEnd)
                    }
                                       
                })       

            },

			AgainCase(row) {
                    this.setCaseId(row.caseId)
                    this.$router.push({path: '/create/examine'})
			}
		},
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
