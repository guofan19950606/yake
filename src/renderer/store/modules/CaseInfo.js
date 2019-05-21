const state = {
	caseId: null,
	patientId: null,
	institutionId: null,   //  基本信息  医疗机构Id
	data: {}
}

const mutations = {
	SET_CASE_DATA(state, data) {
		state.data = data
	},
	
	SET_CASE_ID(state, caseId) {
		state.caseId = caseId
	},
	
	SET_PATIENT_ID(state, patientId) {
		state.patientId = patientId
	},
	SET_INSTITUTION_ID(state, institutionId) {
		state.institutionId = institutionId
	}, 
	
}

const getters = {
	patient(state) {
		return state.data.patient
	},
	checkContent(state) {
		return state.data.checkContent
	},
	checkPhoto(state) {
		return state.data.checkPhoto
	}
}

const actions = {
	setCaseData({commit}, data) {
		commit('SET_CASE_DATA', data)
	},
	
	setCaseId({commit}, caseId) {
		commit('SET_CASE_ID', caseId)
	},
	
	setPatientId({commit}, patientId) {
		commit('SET_PATIENT_ID', patientId)
	},
	setInstitutionId({commit}, institutionId) {
		commit('SET_INSTITUTION_ID', institutionId)
	},
	
}

export default {
	state,
	mutations,
	getters,
	actions
}
