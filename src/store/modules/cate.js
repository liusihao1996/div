import {reqCateList} from '../../uitls/request'
const state = {
    list:[]
}


const mutations = {
    changeList(state,arr){
        state.list=arr
        console.log(state.list);
    }
}


const actions = {
    reqListAction(context){
        reqCateList({istree:true}).then(res=>{
            if(res.data.code==200){
                let list= res.data.list ?res.data.list:[]
                    console.log(res);
                context.commit('changeList',list)
            }
        })
    }


}
const getters = {
    list(state){
        return state.list
    }
}


export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}