<template>
  <div id="loading">
      <main>
          <img id="flower" src="../assets/flower.png">
          <img id="circle" src="../assets/circle.png">
          <span>Loading...</span>
      </main>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@screenW:1131/100vw;
@screenH:1875/100vh;
@keyframes turn{
      0%{transform:rotate(0deg);}
      25%{transform:rotate(-90deg);}
      50%{transform:rotate(-180deg);}
      75%{transform:rotate(-270deg);}
      100%{transform:rotate(-360deg);}
}
#loading{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "STXinwei";
    &>main{
        width: 100%;
        height: 30vh;
        position: relative;
        overflow: hidden;
        &>span{
            display: block;
            font-size: 40px;
            margin-left: 160px;
            margin-top: 50px;
        }
        #flower{
            width: 215/@screenW;
            position: absolute;
            left: 60px;
            top: 40px;
        }
        #circle{
            width: 389/@screenW;
            position: absolute;
            left: 30px;
            top: 8px;
            animation: turn 1s linear infinite;
        }
    }
    
}

</style>