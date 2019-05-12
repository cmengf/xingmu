import Vue from 'vue'
import vuex from 'vuex'
import VuePersist from 'vuex-persist'
const vuexLocal=new VuePersist({
    storage:window.localStorage
})
Vue.use(vuex);
const state = {
    adminInfo:{
        login:false
    }
}
const mutations = {
    saveAdminInfo(state,adminInfo){
        state.adminInfo = adminInfo;
    },
  getAdminInfo(state){
    return state.adminInfo;
  },
  getInfo(state){
    state.adminInfo.login=false
    return state.adminInfo;
  }
}
const actions = {
    async getAdminData({commit}){
        try{
            const res = await getAdminInfo()
            if(res.status === 1){
                commit('saveAdminInfo',res.data)
            }else{
                throw new Error(res.type)
            }
        }catch(err){
            console.log(err.message)
        }
    }
}
export default new vuex.Store({
    state,
    mutations,
    actions,
    getters:{},
    modules:{},
    plugins:[vuexLocal.plugin]
})
