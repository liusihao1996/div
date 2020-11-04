import {reqSpecsList,reqSpecsCount} from '../../uitls/request'

const state = {
    list:[],
    total:0,//总数,这个数据是请求回来的
    size:2,//一页显示几条数据
    page:1//当前显示第几页
}


const mutations = {
    changeList(state,arr){
        state.list=arr
    },
    changeTotal(state,num){//操作总数
        state.total=num
    },
    changeSize(state,arr){//操作一页显示几条数据
        state.size=arr
    },
    changePage(state,page){//操作一页显示几条数据
        state.page=page
    },
    
}


const actions = {
    //列表
    reqListAction(context,bool){
        //判断传进来的是否有值，有值就是{}没值就是分页
        let p =bool?{}:{page: context.state.page, size:context.state.size}

        reqSpecsList(p).then(res=>{
            if(res.data.code==200){
                let list= res.data.list ?res.data.list:[]
                //如果去到了 空数组，并且当前页不是第一页，那么重新请求前一页
                if(list.length==0&&context.state.page>1){
                    context.commit("changePage",context.state.page-1)
                    context.dispatch("reqListAction")
                    return;
                }


                list.forEach(item=>{
                    item.attrs=JSON.parse(item.attrs)
                })
                context.commit('changeList',list)
            }
        })
    },
    //获取总数
    reqTotalAction(context){
        reqSpecsCount().then(res=>{
            context.commit('changeTotal',res.data.list[0].total)
        })
    },
    //修改页码
    changePageAction(context,page){
        context.commit('changePage',page)

        //actions里面调用actions用context.dispatch("被调用者的名字")
        // context.dispatch('reqListAction')
    }
}

const getters = {
    list(state){
        return state.list
    },
    total(state){
        return state.total
    },
    size(state){
        return state.size
    },
    page(state){
        return state.page
    },
}


export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}