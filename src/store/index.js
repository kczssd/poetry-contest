import Vue from "vue";
import Vuex from "vuex";
import Require from '@/utils/require.js'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        name: "",
        stuNum: "",
        grade: undefined,
        rank: undefined,
        sex: "",
        school:"",
        limit: 0,
        choose:undefined,
        fill:undefined,
        num:undefined       
    },
    mutations: {//同步
        setId(state, { name:Name, schoolNum:StuNum, totalGrade:Grade, rank:Rank, sex:Sex, everydayLimit:Limit,school:School }) {
          
          [ state.name, state.stuNum, state.grade, state.rank, state.sex, state.limit ,state.school]=[Name, StuNum, Grade, Rank, Sex, Limit,School];
        },
        setQues(state,{choose:Ch,fill:Fill,number:Num}){
          [state.choose,state.fill,state.num]=[Ch,Fill,Num];
        }
    },
    actions: {//异步
      async setIdAsync(context){
        let data =await Require('/getInfo',{
          method:'GET'
        })
        console.log(data);
        context.commit('setId',data.personalInfo)
      }
    }
});
