<template>
<div>
  <Loading v-if="loading"/>
  <div v-else> 
    <div id="background">
      <header>
        <img id="title" :src="head">
        <div class="lasttime">剩余时间:{{m}}:{{s}}</div>
      </header>
      <main id="content">
        <div v-if="currentIndex<7">
          <div class="answer">
            <div>{{currentIndex+1+'. '}}
              题目:{{radioArray[currentIndex].title}}
            </div>
              <input @click="point($event)" style="cursor:pointer;" type="radio" :id="'A'+currentIndex" value="a" v-model="radioChoose[currentIndex]">
              <label :for="'A'+currentIndex" class="ques">{{radioArray[currentIndex].optionA}}
                <img v-show="checkArray[0]" id="flower" src="../assets/flower.png">
              </label>
            <br>
              <input @click="point($event)" style="cursor:pointer;" type="radio" :id="'B'+currentIndex" value='b' v-model="radioChoose[currentIndex]">
              <label :for="'B'+currentIndex" class="ques">{{radioArray[currentIndex].optionB}}
                <img v-show="checkArray[1]" id="flower" src="../assets/flower.png">
              </label>
            <br>
              <input @click="point($event)" style="cursor:pointer;" type="radio" :id="'C'+currentIndex" value='c' v-model="radioChoose[currentIndex]">
              <label :for="'C'+currentIndex" class="ques">{{radioArray[currentIndex].optionC}}
                <img v-show="checkArray[2]" id="flower" src="../assets/flower.png">
              </label>
            <br>
            <div  v-if="radioArray[currentIndex].optionD">
              <input @click="point($event)" style="cursor:pointer;" type="radio" :id="'D'+currentIndex" value='d' v-model="radioChoose[currentIndex]">
              <label :for="'D'+currentIndex" class="ques">{{radioArray[currentIndex].optionD}}
                <img v-show="checkArray[3]" id="flower" src="../assets/flower.png">
              </label>
            </div>
          </div>
        </div>
        <div v-else-if="currentIndex<10" class="answer">
          <div>{{currentIndex+1+'. '}}
            题目:{{fillArray[currentIndex-7]}}<br>
            <input id="answerInput" type="text" v-model="fillBlanks[currentIndex-7]">
          </div>
        </div>
      </main>
      <footer>
        <button v-if="currentIndex<9" @click="nextques">下一题</button>
        <button v-else @click="submit">提交</button>
      </footer>
    </div>
  </div>
</div>
</template>

<script>
import head from '@/assets/person.png'
import Require from '@/utils/require.js'
import Loading from './loading.vue'
import Moment from 'moment'
import { mapState } from 'vuex'
export default {
  components:{
    Loading
  },
  data(){
    let radioChoose = new Array(7);
    let fillBlanks = new Array(3);
    let currentIndex = 0;
    let radioArray = new Array(7);
    let fillArray = new Array(3);
    let checkArray = new Array(4);
    let loading =true;
    let number = [];
    let timeEnd = new Date().getTime()+180000;
    let timer;
    let m,s;
    return{
      radioChoose,
      fillBlanks,
      head,
      currentIndex,
      radioArray,
      fillArray,
      checkArray,
      loading,
      number,
      timeEnd,
      timer,m,s
    }
  },
  computed:{
    ...mapState(['choose','fill','num'])
  },
  destroyed(){
    clearInterval(this.timer)
  },
  mounted(){
    this.timer = setInterval(()=>{
      let begin = Moment(new Date())
      let end = Moment(this.timeEnd)
      let diff = end.diff(begin)
      if(diff>=0){
        this.m = Moment.duration(diff).minutes()
        this.s = Moment.duration(diff).seconds()
      }
      console.log(this.m+':'+this.s);
    },1000)
      this.radioArray = this.choose;
      this.fillArray = this.fill;
      this.number = this.num
      this.loading=false;
  },
  methods:{
    nextques(){
      if((this.currentIndex<7&&this.radioChoose[this.currentIndex])||(this.currentIndex<10&&this.fillBlanks[this.currentIndex-7])){
        this.checkArray.fill(false)
        this.currentIndex++;
      }else{
        this.$message.warning('请先选择答案');
      }
    },
    submit(){
      if(this.m===0&&this.s===0){
        this.$message.error('答题超时')
        this.$router.replace(`/thanks/0`)
      }else{
          Require('/submit',{
          method:'POST',
          body:JSON.stringify({
            type:'personal',
            choose:this.radioChoose,
            fill:this.fillBlanks,
            number:this.number
          })
        }).then((data)=>{
          if(data.status===200){
            this.$message.success('提交成功')
            this.$router.replace(`/thanks/${data.grade}`)
          }else{
            this.$message.error('提交失败')
          }
        })
      }
    },
    point(e){
      this.checkArray.fill(false)
      switch(e.target.id[0]){
        case 'A':
          this.checkArray[0]=true;
          break;
        case 'B':
          this.checkArray[1]=true;
          break;
        case 'C':
          this.checkArray[2]=true;
          break;
        case 'D':
          this.checkArray[3]=true;
          break;
      }
    }
  }
}
</script>

<style scoped lang="less">
@screenW:1125/100vw;
@screenH:2436/100vh;
#background{
  width: 100vw;
  height: 100vh;
  background: url('../assets/person_back.png')no-repeat;
  background-size:100vw 100vh;
}
#title{
  width: 484/@screenW;
  margin-top:62/@screenH;
  margin-left:50/@screenW;
}
#content{
  width: 1074/@screenW;
  height: 1802/@screenH;
  margin-top: 140/@screenH;
  margin: 140/@screenH auto;
  background: url('../assets/answer_border.png')no-repeat;
  background-size: 1074/@screenW 1802/@screenH;
  overflow: hidden;
.answer{
  position:absolute;
  width: 786/@screenW;
  height: 1352/@screenH;
  margin-top: 186/@screenH;
  margin-left: 122/@screenW;
  opacity: 0.8;
  font-size: 23px;
  color: #040404;
  overflow-y: auto;
}
input[type="radio"]{
  opacity: 0;
}
}
button{
  position: absolute;
  top: 83%;
  right: 30%;
  margin: 2.5rem 0 0;
  width: 40%;
  height: 2.5rem;
  border-radius: 3rem;
  background: linear-gradient( #d2b778, #c88621);
  border:transparent;
  color: #fff;
  font-size: 20px;
  outline: none;

}
.ques{
  position: relative;
  cursor: pointer;
  #flower{
    width:129/@screenW;
    position: absolute;
    left: -13px;
    top: -5px;
  }
}
#answerInput{
  display: block;
  width: 80%;
  font-size:20px;
  background: transparent;
  outline: none;
  border: none;
  border-bottom: 2px dashed #000000;
  text-align: center;
  margin: 40px auto;
}
.lasttime{
  display: inline-block;
  min-width: 440/@screenW;
  font-size: 24px;
  font-family:"STXinwei";
  margin-left: 20/@screenW;
  vertical-align: bottom;
}
</style>