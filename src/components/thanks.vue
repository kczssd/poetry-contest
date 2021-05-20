<template>
  <div id="back">
      <img class="logo" src="../assets/logo.png">
      <div class="last">
          <div style="fontSize:52px;">答题结束</div>
          <div style="fontSize:32px;">本次得分为 <span style="color:#fc0606;">{{grade}}</span>分</div>
          <div style="fontSize:52px;">感谢你的参与</div>
          <div>{{re}}s后返回</div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        let grade = this.$route.params.grade;
        let setTime;
        let re = 7;
        return {
            grade,
            re,
            setTime
        }
    },
    mounted(){
        this.setTime=setInterval(()=>{
            this.re--;
            if(this.re===0){
                this.$router.replace({name:'About'});
            }
        },1000)
    },
    destroyed(){
        clearInterval(this.setTime)
    }
}
</script>

<style lang="less" scoped>
@screenW:1131/100vw;
@screenH:1875/100vh;
#back{
    width: 100vw;
    height: 100vh;
    background: url('../assets/thank_back.png')no-repeat;
    background-size:100vw 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo{
        width: 230/@screenW;
        position: absolute;
        top: 0;
        left: 0;
    }
    .last{
        width: 100vw;
        height: 30vh;
        font-family:"STXinwei";
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
}
</style>