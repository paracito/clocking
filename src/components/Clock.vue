<template>
  <div class="clock">
    <ul>
      <li>
        <label>日期：</label>
        <span>{{ state.date }}</span>
      </li>
      <li>
        <label>姓名：</label>
        <span>{{ state.user }}</span>
      </li>
      <li>
        <label>等级：</label>
        <span>{{ state.level }}</span>
      </li>
      <li>
        <label style="display: inline-block;margin-bottom: 6px;">方式：</label><br>
        <input id="video" type="checkbox" name="ways" value="网课" v-model="state.ways"><label for="video" class="selection">网课</label>
        <input id="book" type="checkbox" name="ways" value="书籍文档" v-model="state.ways"><label for="book" class="selection">书籍文档</label>
        <input id="operate" type="checkbox" name="ways" value="敲代码" v-model="state.ways"><label for="operate" class="selection">敲代码</label>
        <input id="rest" type="checkbox" name="ways" value="休息" v-model="state.ways"><label for="rest" class="selection" @click="rest()">休息</label>
      </li>
      <li>
        <label>标题：</label>
        <input type="text" name="" v-model="state.title">
      </li>
      <li>
        <label>学习时长：</label>
        <!-- <input type="number" name="" v-model="state.duration" max=24 min=0> -->
        <span style="width:50px">{{state.duration}} h</span>
        <button class="time_control" @click="() => {if(state.duration < 24) state.duration+=0.5}">+</button>
        <button class="time_control" @click="() => {if(state.duration > 0) state.duration-=0.5}">-</button>
      </li>
      <li>
        <label>具体内容：</label><br>
        <textarea v-model="state.detail"></textarea>
      </li>
    </ul>
    <button class="submit" v-if="state.first_flag" @click="submit()">提交</button>
    <button class="submit" v-else @click="submit()">修改</button>
  </div>
</template>

<script>
import { defineComponent, reactive, onBeforeMount, onMounted } from 'vue'
import { query, query_single, add, modify } from '../../public/static/fs.js'
import { getDate } from '../../public/static/common.js'

export default defineComponent({
  name: 'Clock',
  components: {
    // Hacker
  },
  setup () {
    const state = reactive({
      resData: '',
      user: '眼神飘忽的何静静',
      level: '一看就会，一做就废',
      date: '',
      title: '',
      duration: 0,
      ways: [],
      detail: '',
      first_flag: true,
      id: ''
    })
    onBeforeMount(() => {
      state.date = getDate()
      query_single(state.date).then((res) => {
          console.log(res)
          if(res.length == 0) {
              state.first_flag = true
          }else {
              state.first_flag = false
              state.id = res[0].id
              state.ways = res[0].attributes.ways
              state.duration = res[0].attributes.duration
              state.title = res[0].attributes.title
              state.detail = res[0].attributes.detail
          }
      })
    })

    function rest () {
        setTimeout(() => {
            state.title = ''
            state.detail = ''
            for(let item of state.ways) {
                if(item == '休息') {
                    state.ways = ['休息']
                    state.duration = 0
                    state.title = '今天是条咸鱼'
                    state.detail = '干啥啥不行，休息第一名'
                }
            }
        }, 0);
        
    }

    function submit () {
      let submit_flag = true
      let postData = {
        "user": state.user,
        "level": state.level,
        "date": state.date,
        "title": state.title,
        "duration": state.duration*1,
        "ways": state.ways,
        "detail": state.detail
      }
      for(let item in postData) {
          if((postData[item] == '' || postData[item] == []) && postData[item] != 0) {
              submit_flag = false
              alert('写完！写完！')
              break
          }
      }
      if(submit_flag) {
          if(state.first_flag) {
              add(postData).then((res) => {
                console.log('数据添加成功：',res)
                alert('打卡成功')
              }, (err) => {
                console.log('ERROR:', err);
                alert('打卡失败，请刷新页面重新打卡')
              })
          }else {
              modify(state.id, postData).then((res) => {
                console.log('数据修改成功：',res)
                alert('数据修改成功')
              }, (err) => {
                console.log('ERROR:', err);
                alert('数据修改失败')
              })
          }
      }
    }

    return { state, submit, rest }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clock {
  width: 40vw;
  /*height: 70vh;*/
  /* background: rgba(0, 0, 0, 0.5); */
  background: url(../assets/tech_border.png);
  background-size: 100% 100%;
  position: fixed;
  left: 30vw;
  top: 10vh;
  z-index: 20;
  box-sizing: border-box;
  padding: 60px 100px;
}
.clock li {
  margin-bottom: 15px;
}
.time_control {
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    color: #0cffff;
    border: 1px solid #0cffff;
    background: none;
    cursor: pointer;
    margin-left: 4px;
    font-size: 18px;
    /* line-height: 24px; */
}
.clock li label {
  color: #0cffff;
  margin-right: 20px;
}
 .clock li span {
     /* width: 30px; */
     display: inline-block;
     color: #0cffff;
     text-align: left;
 }
.clock li input {
  border: 1px solid #8fb5bf;
  background: rgba(143, 180, 185, 0.3);
  color: #fff;
}
.clock li input[type=checkbox] {
  /*visibility: hidden;*/
  display: none;
}
.selection {
  cursor: pointer;
}
.selection::before {
  margin-right: 4px;
  display: inline-block;
  /*box-sizing: border-box;*/
  width: 14px;
  height: 14px;
  line-height: 10px;
  content: "";
  border: 1px solid #0cffff;
  text-align: center;
  font-size: 16px;
  color: #0cffff;
  vertical-align: middle;
}
input[type=checkbox]:checked +label::before{
    content: "■";
}
.clock li input[type=text] {
  color: #fff;
  height: 24px;
  width: 100%;
  margin-top: 10px;
}
.clock li input[type=number] {
  width: 40px;
  color: #fff;
  height: 24px;
}
.clock li textarea {
  border: 1px solid #8fb5bf;
  background: rgba(143, 180, 185, 0.3);
  color: #fff;
  width: 100%;
  margin-top: 10px;
  height: 80px;
}
.submit {
  border: 1px solid #8fb5bf;
  background: rgba(143, 180, 185, 0.3);
  color: #0cffff;
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin: 20px 0 10px;
}
</style>