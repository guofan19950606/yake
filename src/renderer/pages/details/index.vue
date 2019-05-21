<template>
    <Layout>
        <div class="details">
            <div class="patient">
                <div class="case">
                    <img style="margin: 24px 0;" :src="patient.patientPic"/>
                    <p>
                        <span style="font-size: 22px;color: #222;">{{patient.patientTitle}}&nbsp;&nbsp;&nbsp;</span>
                        <span style="font-size: 14px;color: #666;">{{patient.patientSex === 1?'男':'女'}}&nbsp;&nbsp;&nbsp;{{patient.patientAge}}岁</span>
                    </p>
                    <!--<p style="line-height: 30px">{{patient.patientPhone}}</p>-->
                </div>
                <div class="diagnose">
                    <h2 style="font-size: 16px;margin: 15px 0;">病例</h2>
                    <div class="child" v-for="(item, index) in diagnoseList" @click="diagnose(item.caseId, index)">
                        <div>
                            <p v-if="index == diagnoseList.length-1"
                               :style="{fontSize: '14px', color: index==caseOn?'#3EC88C':'#999999'}">
                                初诊</p>
                            <p v-else :style="{fontSize: '14px', color: index==caseOn?'#3EC88C':'#999999'}">
                                复诊{{diagnoseList.length - index -1}}</p>
                            <p style="font-size: 12px;">{{item.createTime | dateFormat}}</p>
                        </div>
                        <p v-if="item.orderStatus >= 5" style="font-size: 12px;">已完成</p>
                        <p v-else-if="item.orderStatus == 0" style="font-size: 12px;">新建中</p>
                        <p v-else-if="item.orderStatus == 1" style="font-size: 12px;">待支付</p>
                        <p v-else style="font-size: 12px;">进行中</p>
                    </div>
                </div>
            </div>
            <div class="content">
                <router-view :status="status"
                             :checkContent="checkContent"
                             :checkPhoto="checkPhoto"
                             :treatmentScheme="treatmentScheme"
                             :messageBoards="messageBoards">
                </router-view>
            </div>
        </div>
    </Layout>
</template>

<script>
	import Layout from '../../components/Layout/index'
	import {fetchGetCaseDesc, fetchCaseList} from '../../common/api/index'
	import {mapState, mapActions} from 'vuex'
	import moment from 'moment'

	export default {
		name: "index",
		data() {
			return {
				patientId: '',
				status: 0,
				patient: {},
				checkContent: {},
				checkPhoto: {},
				treatmentScheme: {},
				messageBoards: [],
				diagnoseList: [],
				caseOn: 0
			}
		},
		components: {Layout},
		computed: mapState(['CaseInfo']),
		methods: {
			...mapActions(['setCaseData']),
			getCaseDesc(caseId) {
				fetchGetCaseDesc({caseId, infoStatus: 4}).then(res => {
					this.status = res.data.status
					this.patient = res.data.patient
					this.checkContent = res.data.checkContent
					this.checkPhoto = res.data.checkPhoto
					this.treatmentScheme = res.data.treatmentScheme
					this.messageBoards = res.data.messageBoards
				})
			},
			getAgainCaseLise(patientId, orderStatus) {
				fetchCaseList({patientId, orderStatus}).then(res => {
					this.diagnoseList = res.data
				})
			},
			diagnose(caseId, index) {
				if (index !== this.caseOn) {
					this.getCaseDesc(caseId)
					this.caseOn = index
					if (this.$route.path !== '/details/pay') {
						this.$router.push({path: '/details/info/case'})
					}
				}
			}
		},
		mounted() {
			this.getCaseDesc(this.CaseInfo.caseId)
			this.getAgainCaseLise(this.CaseInfo.patientId, '')
		},
		filters: {
			dateFormat(date) {
				return moment(date).format('YYYY-MM-DD')
			}
		}
	}
</script>

<style scoped>
    .details {
        min-width: 1100px;
        max-width: 1319px;
        width: 85%;
        margin: 30px auto;
        background-color: #FAFAFF;
    }

    .patient {
        width: 224px;
        float: left;
        background-color: #ffffff;
    }

    .case {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: 1px solid #F0F0F0;
    }

    .case img {
        width: 114px;
        height: 114px;
        border-radius: 50%;
    }

    .content {
        padding: 0 33px;
        margin-left: 240px;
        background-color: #ffffff;
    }

    .diagnose {
        width: 200px;
        margin: auto;
        cursor: pointer;
    }

    .diagnose p {
        color: #999999;
    }

    .diagnose .child {
        display: flex;
        justify-content: space-between;
        overflow: hidden;
    }

    .diagnose .child p {
        line-height: 25px;
    }
</style>
