
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {state,mutations,getters} from './mutations'
import {actions} from './actions'
import cate from './modules/cate'
import spec from './modules/spec'
import goods from './modules/goods'
import banner from './modules/banner'
import member from './modules/member'
import seckill from './modules/seckill'
//抛出方式一，适用于导出一个
const store =  new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{
        cate,
        spec,
        banner,
        goods,
        member,
        seckill,

    }
})
export default store















//抛出方式二，适用于导出多个
// export const store = new Vuex.Store({

// })