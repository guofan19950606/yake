import moment from 'moment'
import {fetchCaseList} from '../../common/api/index'
import {mapActions} from 'vuex'

export default {
	data() {
		return {
			tableData: []
		}
	},
	methods: {
		...mapActions(['setCaseId', 'setPatientId','setInstitutionId']),
		async getCaseList(orderStatus) {
			const caseListRes = await fetchCaseList({orderStatus})
			this.tableData = caseListRes.data
		}
	},
	filters: {
		dateFormat(date) {
			return moment(date).format('YYYY-MM-DD')
		}
	}
}
