<template>
    <div class="scheme">
        <p class="content">{{this.treatmentScheme.schemeContent}}</p>
        <div class="advisory" v-if="status == 3">
            <el-form>
                <el-form-item>
                    <el-input
                            type="textarea"
                            :rows="5"
                            placeholder="请填咨询内容"
                            v-model="advisoryContent">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="onsubmit(CaseInfo.caseId, UserInfo.data.userCode, advisoryContent)">咨询
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div v-if="status >= 5" class="consult">
            <p v-for="(message, index) in messageBoards" v-if="index == 0">咨询：{{message.msgContent}}</p>
            <p v-for="(message, index) in messageBoards" v-if="index == 1">回复：{{message.msgContent}}</p>
        </div>
        <el-button v-if="status == 5" @click="dialogVisible = true">复诊</el-button>
        <el-dialog
                title="复诊确认"
                :visible.sync="dialogVisible"
                width="30%"
                center>
            <span>是否对该患者进行复诊</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="AgainCase">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
	import {mapState, mapActions} from 'vuex'
	import {fetchAddAdvisory, fetchAddCase} from '../../common/api/index'
	import {objectToFormData} from '../../common/utlis'

	export default {
		name: "SchemeInfo",
		props: ['status', 'treatmentScheme', 'messageBoards'],
		data() {
			return {
				advisoryContent: '',
				dialogVisible: false
			}
		},
		computed: mapState(['CaseInfo', 'UserInfo']),
		methods: {
			...mapActions(['setCaseId']),
			onsubmit(caseId, userCode, advisoryContent) {
				fetchAddAdvisory({caseId, msgReplyId: userCode, msgType: 0, msgContent: advisoryContent}).then(res => {
					if (res.resultStatus) {
                        
						this.$router.push('/')

					}
				})
			},
			async AgainCase() {
				const params = {
					status: 6,
					caseId: this.CaseInfo.caseId,
				}
                const againCaseRes = await fetchAddCase(objectToFormData(params))
				if (againCaseRes.resultStatus) {
					const newCaseRes = await fetchAddCase(objectToFormData({patientId: this.CaseInfo.patientId, infoStatus: 1,institutionId:this.CaseInfo.institutionId}))
                    console.log('newCaseRes----------------------')
                    console.log(newCaseRes)
                    // console.log(this.CaseInfo.caseId)
                    // console.log(newCaseRes.data.caseId)
                    if (newCaseRes.resultStatus) {
                        
                        // console.log('this.CaseInfo.caseId-----------------------------')
                        this.setCaseId(newCaseRes.data.caseId)
                        this.dialogVisible = true                        
                        // console.log(this.CaseInfo.caseId)
                        this.$router.push({path: '/create/examine'})
                        
					}
				}
			}
		},
	}
</script>

<style scoped>
    .scheme {
        min-height: 80vh;
    }

    .content {
        padding: 15px;
        font-size: 18px;
        line-height: 30px;
    }

    .consult {
        padding: 15px;
        font-size: 18px;
        line-height: 30px;
    }
</style>
