<template>
  <div class="cover_bg"></div>
  <div class="demo-1 loading glitch">
    <div class="glitch__img"></div>
    <div class="glitch__img"></div>
    <div class="glitch__img"></div>
    <div class="glitch__img"></div>
    <div class="glitch__img"></div>
  </div>
  <!-- <img class="logo" src="../assets/logo.png" alt=""> -->
  <div class="header">
    <img class="logo_top" src="../assets/logo_top.png" alt="">
    <h1>何静静的前端试炼</h1>
  </div>
  
  <div class="list">
    <div class="list_title" :class="{'left_move': state.clock_flag, 'left_back': !state.clock_flag}">
        <ul>
            <li v-for="(item,index) in state.clock_list" :key="index" @click="choose_list(item)">
                <img src="../assets/list_border.png" alt="">
                <img src="../assets/list_border.png" alt="">
                <span class="list_text">{{ item.date }} {{item.title}}</span>
            </li>
        </ul>
    </div>
    <div class="list_content" :class="{'right_move': state.clock_flag || state.move_flag, 'right_back': !state.clock_flag && !state.move_flag}" ref="list_content">
        <ul>
            <li>
                <label for="">日期：</label>
                {{state.current_list.date}}
            </li>
            <li>
                <label for="">姓名：</label>
                {{state.current_list.user}}
            </li>
            <li>
                <label for="">等级：</label>
                {{state.current_list.level}}

            </li>
            <li>
                <label for="">标题：</label>
                <p>{{state.current_list.title}}</p>
            </li>
            <li>
                <label for=""> 时长：</label>
                {{state.current_list.duration}}
            </li>
            <li>
                <label for="">方式：</label>
                <!-- {{state.current_list.ways}} -->
                <span v-for="(item, index) in state.current_list.ways" :key="index" style="margin-right:6px">{{ item}}</span>
            </li>
            <li>
                <label for="">具体内容：</label>
                <p>{{state.current_list.detail}}</p>
            </li>
        </ul>
        <img src="../assets/content_border.png" alt="">
    </div>
    <Clock :style="{display: state.first_flag ? 'none' : ''}" :class="{'top_move': state.clock_flag, 'top_back': !state.clock_flag}"/>
    <img class="enter" src="../assets/aim.png" alt="" @click="show_clock('show')">
    <div class="cover" v-if="state.cover_flag" @click="show_clock('hide')" :class="{'slow_show': state.clock_flag, 'slow_hide': !state.clock_flag}"></div>
    <div class="cover_img" v-if="state.cover_flag" :class="{'slow_show': state.clock_flag, 'slow_hide': !state.clock_flag}"></div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, onBeforeMount, onMounted } from 'vue'
import Clock from '@/components/Clock.vue'
import { query, add } from '../../public/static/fs.js'
import { getDate } from '../../public/static/common.js'
import '../../public/static/bg.css'

export default defineComponent({
  name: 'List',
  components: {
    Clock
  },
  setup () {
    const state = reactive({
      resData: '',
      data: ['2021-8-12 xxxxx','2021-8-12 xxxxx','2021-8-12 xxxxx','2021-8-12 xxxxx','2021-8-12 xxxxx','2021-8-12 xxxxx','2021-8-12 xxxxx','2021-8-12 xxxxx','2021-8-12 xxxxx','2021-8-12 xxxxx'],
      move_flag: 0,
      clock_flag: false,
      clock_list: [],
      current_list: '',
      first_flag: true,
      cover_flag: false
    })
    const list_content=ref(null)
    onBeforeMount(() => {
        getData()
    })
    onMounted(() => {
      
    })
    function getData () {
        query().then((res) => {
            // console.log(res)
            state.clock_list = []
            for(let item of res) {
                state.clock_list.push(item.attributes)
            }
            state.current_list = state.clock_list[0]
        })
    }
    function choose_list (item) {
      state.move_flag = 1
      list_content.value.addEventListener('animationend',() => {
        state.move_flag = 0
      })
      setTimeout(() => {
          state.current_list = item
      }, 1000);
      
    }
    function show_clock (type) {
      state.clock_flag = !state.clock_flag
      state.first_flag = false
      if(type == 'show') {
        state.cover_flag = true
      }else {
        getData()
        setTimeout(() => {
            state.cover_flag = false
        }, 1000);
      }
      
    }

    return { state, choose_list, list_content, show_clock }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.header {
    position: absolute;
    top: 8px;
    left: 25vw;
    z-index: 5;
    width: 50vw;
}
h1 {
    position: absolute;
    top: 0;
    z-index: 5;
    width: 100%;
    text-align: center;
    color: #0cffff;
    transform: skew(-30deg);
    font-family: SimHei;
    text-shadow: 0 0 30px #1fe0e9, 0 0 40px #1fe0e9, 0 0 50px #1fe0e9, 0 0 70px #1fe0e9, 0 0 90px #1fe0e9;
}
.logo_top {
    margin-top: 16px;
    width: 100%;
}
.cover_bg {
  width: 100vw;
  height: 100vh;
  background: #000;
  opacity: 0.3;
  background-size: 100% 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.list {
  color: #fff;
  position: absolute;
  z-index: 5;
  height: 90vh;
  margin-top: 10vh;
  width: 100vw;
  overflow: auto;
}
.list::-webkit-scrollbar {
    display:none
}
.list_title {
  width: 40%;
  position: absolute;
  /*margin-left: -20px;*/
}
.list_title ul{
  width: 100%;
}
.list_title li img{
  position: absolute;
  width: 100%;
  height: 100%;
}
.list_title li {
  box-sizing: border-box;
  display: block;
  opacity: 0.8;
  background: url(../assets/list_border.png);
  /* background: rgba(0, 0, 0, 0.5); */
  background-size: 100% 100%;
  /* padding-left: 40px; */
  width: 80%;
  margin: 24px 0;
  height: 60px;
  line-height: 60px;
  transform: scaleX(1.0) skew(0deg);
  transition: transform 0.3s ease;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
}
.list_title li:hover {
  color: #0cffff;
  font-weight: bolder;
  text-shadow: 0 0 30px #1fe0e9, 0 0 40px #1fe0e9, 0 0 50px #1fe0e9, 0 0 70px #1fe0e9, 0 0 90px;
}
.list_title li span {
  display: inline-block;
  transform: skew(0deg);
  margin-left: 20px;
}

.list_content {
  width: 25vw;
  height: 70vh;
  background: rgba(0, 0, 0, 0.85);
  border-radius: 40px;
  background-position: -40px 0;
  position: fixed;
  right: 30px;
  top: 10vh;
  box-sizing: border-box;
  color: #09e484;
  
}
.list_content ul {
  box-sizing: border-box;
  padding: 30px 40px;

}
.list_content img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}
.list_content li {
  margin-bottom: 20px;
}
.list_content li label{
  color: #0cffff;
}
.list_content li p{
  margin-top: 10px;
  /* font-size: 14px; */
}
.clock {
    top: 10vh;
}

.enter {
    width: 240px;
    position: fixed;
    bottom: 20px;
    left: calc(50vw - 120px);
    animation: rotation 8s linear infinite;
    cursor: pointer;
}
@keyframes rotation {
    0% {
        transform:  scale(0.8) rotate(0);
    }
    25% {
        transform: scale(1.3) rotate(90deg);
    }
    50% {
        transform: scale(0.8) rotate(180deg);
    }
    75% {
        transform: scale(1.3) rotate(270deg);
    }
    100% {
        transform: scale(0.8) rotate(360deg);
    }
}

.slow_show {
    animation: slow_show 1s ease forwards;
}
@keyframes slow_show {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 0.9;
    }
}
.slow_hide {
    animation: slow_hide 1s ease forwards;
}
@keyframes slow_hide {
    0% {
        opacity: 0.9;
    }
    30% {
        opacity: 0.9;
    }
    100% {
        opacity: 0;
    }
}

.move {
  animation: move 1.5s ease;
}
@keyframes move {
    0% {
        right: 30px;
    }
    15% {
        right: 50px;
    }
    35% {
        right: -30vw;
    }
    60% {
        right: -30vw;
    }
    100% {
        right: 30px;
    }
}
.left_move {
    animation: left_move 1s ease forwards ;
}
@keyframes left_move {
    0% {
        left: 0;
    }
    30% {
        left:20px;
    }
    100% {
        left: -40vw;
    }
}
.left_back {
    animation: left_back 1s ease forwards ;
}
@keyframes left_back {
    0% {
        left: -40vw;
    }
    30% {
        left: -40vw;
    }
    100% {
        left: 0;
    }
}
.right_move {
    animation: right_move 1s ease forwards ;
}
@keyframes right_move {
    0% {
        right: 30px;
    }
    30% {
        right:50px;
    }
    100% {
        right: -40vw;
    }
}
.right_back {
    animation: right_back 1s ease forwards ;
}
@keyframes right_back {
    0% {
        right: -40vw;
    }
    30% {
        right: -40vw;
    }
    100% {
        right: 30px;
    }
}
.top_move {
    display: block !important;
    animation: top_move 1s ease forwards ;
}
@keyframes top_move {
    0% {
        top: -100vh;
    }
    30% {
        top: -100vh;
    }
    100% {
        top: 10vh;
    }
}
.top_back {
    animation: top_back 1s ease forwards ;
}
@keyframes top_back {
    0% {
        display: block !important;
        top: 10vh;
    }
    30% {
        display: block !important;
        top: calc(10vh + 20px);
    }
    100% {
        top: -100vh;
        display: none;
    }
}


.cover {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  background-size: 100% 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 15;
}
.cover_img {
  width: 100vw;
  height: 100vh;
  /* background: rgba(0, 0, 0, 0.9); */
  background: url(../assets/cover.png);
  background-size: 100% 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
}

</style>