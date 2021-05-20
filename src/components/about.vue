<template>
<div>
  <Loading v-if="loading"/>
  <div v-else id="background"> 
    <div class="title">
      <span>用户信息</span>
    </div>
    <div class="message">
      <div class="a">
        <div class="l">
          <div>姓名：{{name}}</div>
          <div>学号：{{stuNum}}</div>
          <div>学院：<div style="marginTop:5px;fontSize:20px;width:75vw">{{school}}</div></div>
          <div>分数：{{grade}}</div>
          <div>排行：{{rank}}</div>
          <div style="fontSize:20px">今日剩余答题次数：{{limit}}</div>
        </div>
        <div class="b">
          <div @click="gotoRank">排行榜</div>
        </div>
      </div>
    </div>
    <div class="navigation">
      <button @click="gotoAnswer" class="h1">开始答题</button>
    </div>
  </div>
</div>
</template>

<script>
import Require from '@/utils/require.js'
import {mapState} from 'vuex'
import Loading from './loading.vue'
export default {
  components:{
    Loading
  },
  data(){
    let loading =true;
    let userList = [];
    let index =0;
    let newuserList=[];
    return{
      loading,
      newuserList,
      index,
      userList,
    }
  },
  computed:{
    ...mapState(['name','stuNum','grade','rank','sex','limit','school'])
  },
  mounted(){
    this.$store.dispatch('setIdAsync').then(()=>{
      this.loading=false;
    })
  },
  methods:{
    gotoAnswer(){
      if(this.limit>0){
        Require('/getQuestion',{
        method:'GET'
        }).then((data)=>{
          if(data.status === 200){
            this.$store.commit('setQues',data)
            switch(data.type){
              case 'country':
                this.$router.replace('/answer/country')
                break;
              case 'social':
                this.$router.replace('/answer/society')
                break;
              case 'personal':
                this.$router.replace('/answer/person')
                break;
            }
          }
        })
      }else{
        this.$message.warning('今日答题次数已用尽')
      }
    },
    gotoRank(){
      this.$router.push('/rank')
    }
  }
}
</script>

<style lang="less" scoped>
@screenW:1500/100vw;
@screenH:2100/100vh;
#background{
  width: 100vw;
  height: 100vh;
  background: url('../assets/about_back.png')no-repeat;
  background-size:100vw 100vh;
  overflow: hidden;
}
.title{
  width: 615/@screenW;
  height: 155/@screenH;
  background: rgba(249,230,234,0.7);
  text-align: center;
  border-radius: 5px;
  font-size: 20px;
  color: #040404;
  line-height: 125/@screenH;
  letter-spacing: 10px;
  margin-top: 155/@screenH;
  &>span{
    line-height: 155/@screenH;
  }
}
button{
  margin-left: 300/@screenW;
  height: 200/@screenH;
  width: 900/@screenW;
  background: rgba(249,230,234,0.7);
  border-radius: 5px;
  font-size: 25px;
  color: #040404;
  border: transparent;
}
.message{
  vertical-align: middle;
}
.h1{
    margin-top: 240/@screenH;
  }
img{
  width: 386/@screenW;
  margin-top: 135/@screenH;
  vertical-align: middle;
}
.l{
  font-size:24px;
  font-family:"STXinwei";
  display: inline-block;
  margin-top: 15/@screenH;
  vertical-align: middle;
  margin-left: 30/@screenW;
  min-width: 590/@screenW;
  &>div{
      margin: 10px 0;
  }
}
.a{
  position:relative;
}
.b{
  display: inline-block;
  height: 665/@screenH;
  width: 200/@screenW;
  vertical-align: middle;
  background: rgba(249,230,234,0.7);
  border-radius: 5px;
  font-size: 25px;
  color: #040404;
  border: transparent;
  position: absolute;
  left: 1200/@screenW;
  line-height: 190/@screenH;
  top: -10/@screenH;
  writing-mode:vertical-lr;
  &>div{
    letter-spacing: 20px;
    line-height: 200/@screenW;
    text-align: center;
  }
}
</style>