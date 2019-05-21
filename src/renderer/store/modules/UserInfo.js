const state = {
	isLogin: false,
	token: '9527',
	data: {}
}

const mutations = {
	SET_USER_TOKEN(state, {isLogin, token}) {
		state.isLogin = isLogin
		state.token = token
	},
	SET_USER_DATA(state, data) {
		state.data = data
	}
}

const actions = {
	refreshToken({commit}, {isLogin, token}) {
		commit('SET_USER_TOKEN', {isLogin, token})
	},
	setUserInfo({commit}, userInfo) {
		commit('SET_USER_DATA', userInfo)
	}
}

export default {
	state,
	mutations,
	actions
}
