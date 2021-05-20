<template>
  <div id="rank1">
    <Loading v-if="loading"/>
    <div v-else>
      <div id="rank">
        <header>
            <img @click="()=>this.$router.go(-1)" id="back" :src="back">
            <img id="title" :src="title" />
        </header>
        <main id="top3">
          <div class="first">
            <div class="name">{{ rankList[index].name }}</div>
            <div class="grade">{{ rankList[index].totalGrade }}分</div>
            <div class="school">{{ rankList[index].school }}</div>
          </div>
          <div class="second">
            <div class="name">{{ rankList[index + 1].name }}</div>
            <div class="grade">{{ rankList[index + 1].totalGrade }}分</div>
            <div class="school">{{ rankList[index + 1].school }}</div>
          </div>
          <div class="third">
            <div class="name">{{ rankList[index + 2].name }}</div>
            <div class="grade">{{ rankList[index + 2].totalGrade }}分</div>
            <div class="school">{{ rankList[index + 2].school }}</div>
          </div>
        </main>
        <ul id="toplist">
          <li v-for="(item, index) in newrankList" :key="index">
            <span id="rank">{{ newrankList[index].rank }}</span>
            <span>{{ newrankList[index].name }}</span>
            <span id="school">{{ newrankList[index].school }}</span>
            <span id="grade">{{ newrankList[index].totalGrade }}分</span>
            <p id="distance"></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Require from "@/utils/require.js";
import title from "@/assets/rank_title.png";
import back from "@/assets/back.png";
import Loading from './loading.vue'
export default {
  components:{
    Loading
  },
  data() {
    let rankList = [];
    let index = 0;
    let newrankList = [];
    let name = "";
    let loading = true;
    return {
      rankList,
      title,
      back,
      index,
      newrankList,
      name,
      loading,
    };
  },
  mounted() {
    Require("/getRanks", {
      method: "GET",
    }).then(({ rankBeans }) => {
      this.rankList = rankBeans;
      console.log(this.rankList);
      this.newrankList = rankBeans.splice(3);
      console.log(this.newrankList);
      this.loading = false;
    });
  },
};
</script>

<style lang="less" scoped>
@screenW:1080 /100vw;
@screenH:1920 /100vh;
#rank {
  height: 100vh;
  width: 100vw;
  background: url("../assets/rank_back.png");
  background-size: 100vw 100vh;
  overflow: hidden;
}
#title {
  display: block;
  width: 427 / @screenW;
  height: 187 / @screenH;
  margin: 96 / @screenH auto 0 auto;
}
#top3 {
  width: 100vw;
  height: 618 / @screenH;
  background: url("../assets/rank_top.png");
  background-size: 100vw 618 / @screenH;
}
#toplist {
  width: 994 / @screenW;
  height: 1000 / @screenH;
  margin: 0 auto;
  border-radius: 6px 6px 0 0;
  overflow-y: auto;
}
.first,
.second,
.third {
  position: relative;
  text-align: center;
  display: inline-block;
  &>div{
    margin: 5px 0;
  }
}
.first {
  width: 430 / @screenW;
  height: 300 / @screenH;
  left: 332 / @screenW;
  top: 200 / @screenH;
}
.second,
.third {
  width: 296 / @screenW;
  min-height: 205 / @screenH;
}
.second {
  right: 400 / @screenW;
  top: 250 / @screenH;
}
.third {
  left: 30 / @screenW;
  top: 250 / @screenH;
}
ul {
  margin: 1px;
  background: #ffffff;
}
li {
  width: 994 / @screenW;
  height: 115 / @screenH;
  padding: 60 / @screenH 0 0 0;
  span {
    margin-left: 45 / @screenW;
  }
  #rank {
    margin-left: 50 / @screenW;
    background: #ffffff;
  }
  #grade {
    position: relative;
  }
}
#grade,
.grade {
  color: #ff9f54;
}
#school,
.school {
  font-size:14px;
  opacity: 0.6;
  font-weight: 400;
}
* {
  font-weight: 600;
}
#distance {
  margin-top: 50 / @screenH;
  height: 5 / @screenH;
  background: #d8b8b8;
}
#back{
    width: 16px;
    height: 32px;
    position: absolute;
    top: 60 / @screenH;
    left: 20 / @screenW;
}
</style>