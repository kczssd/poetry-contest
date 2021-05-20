<template>
  <div id="home">
    <div class="content">
      <div id="first">
    <label for="name">
      <p class="name">姓名:</p><input id="name" type="text" v-model="name">
    </label>
      </div>
      <div id="two">
    <label for="stuNum"><p class="stuNum">学号:</p>
      <input id="stuNum" type="text" v-model="stuNum">
    </label>
      </div>
    <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import Require from '@/utils/require.js'

export default {
  name: 'homepage',
  data(){
    let name = '';
    let stuNum = '';
    return {
      name,
      stuNum
    }
  },
  mounted(){ //生命周期,数据加载好后自动致性
    Require('/logCheck',{
      method:'GET'
    }).then(({status})=>{
      if(status===200){
        return this.$store.dispatch('setIdAsync').then(()=>{
          this.$router.push('/about')
        })
      }
    })
  },
  methods:{
    async login(){
      Require('/login',{
        method:'POST',
        body:JSON.stringify({name:this.name,schoolNum:this.stuNum}) //将参数转化成字符串发送过去
      }).then(({status})=>{
        console.log(status)
        if(status===200){
          this.$store.state; //调用全局的数据
          this.$store.dispatch('setIdAsync') //调用异步方法  dispatch操作异步的方法
        }else{
          return new Promise.reject();
        }
      }).then(()=>{
        this.$router.push('/about')//成功后跳转
      }).catch(()=>{
        this.$message.error('登录失败');
      })
    }
  }
}
</script>
<style scoped lang="less">
#home{
  height: 100vh;
  width: 100vw;
  background:url('../assets/home_back.png');
  background-size: 100vw 100vh;
}
.content{
  width: 94vw;
  height: 35vh;
  position: relative;
  top: 53%;
}
label{
  display:inline-block;
    margin: 0 30vw;
}
input{
  background-color: rgba(248, 242, 242, 0.8);
  border: none;
  border-radius: 2.5vh;
  width: 50vw;
  height: 5vh;
  font-size: 3vh;
  padding-left: 1vh;
  outline: none;
  margin-left: 20px;
}
p{
  font-family:"STXinwei";
  position:absolute;
  left: 10vw;
  font-weight: 500;
  font-size: 4vh;
  line-height: 6vh;
  letter-spacing: 1.3vw;
}
#two{
    margin-top: 3vh;
}
button{
  position: relative;
  margin: 5vh 38vw;
  width: 25vw;
  height:6vh;
  background-color: rgba(248, 242, 242, 0.3);
  font-weight: 500;
  font-size: 4vh;
  letter-spacing: 3vw;
  border: none;
  border-radius: 3vh;
  font-family:"STXinwei";
}
</style>
