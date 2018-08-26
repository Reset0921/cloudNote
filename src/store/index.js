import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
    //数据源
    state:{
        count:1,
        filter_Type:{},

        userinfo:{
            id:0,
            phone:"",
        },
    },
    //处理同步操作
    mutations:{
        add(state,n){
            state.count+=n;
        },
        reduce(state){
            state.count-=1;
        }
    },
    //计算属性，对数据改变再进行处理
    getters:{
        count(state){
            return state.count+=100
        }
    },
    //处理异步操作
    actions:{
        addAction(context){
            context.commit('add',150);
        }
    }
});