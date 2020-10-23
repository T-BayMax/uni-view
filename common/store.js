import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: {},

	},
	mutations: {

		SET_USERINFO: (state, userInfo) => {
			state.userInfo = Object.assign({}, state.userInfo, userInfo)
		}
	}
	
})

export default store
