<template>
  <div class="goback">
    <el-button class="button" type="primary" @click="goBack()">返回</el-button>
  </div>
  <div class="paper-form">
    <div class="paper" v-for="(item, index) in stu.papers" :key="index">
      <div class="studentName">{{ item.studentName }}</div>
      <div class="Score">
        <span>分数</span>
        <div class="totalScore red" v-if="item.isScore === 1">{{ item.totalScore }}</div>
        <div class="score red" v-else>未批改</div>
      </div>
      <el-button type="primary" plain class="paperBtn" @click="checkPaper(item.id)">查看答卷</el-button>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
const router = useRouter()
const route = useRoute()
const id = route.params.id
// const paperTitle = route.params.title
const stu = reactive({
  papers: []
})
onMounted(() => {
  getPaper(id)
  console.log(stu)
})
const goBack = () => {
  router.push({
    path: '/teather/paperManage'
  })
}
const getPaper = (id) => {
  axios.get(`http://localhost/answerPaper/answers?page=1&pageSize=20&testPaperId=${id}`
  ).then(res => {
    stu.papers = res.data.data.records
    console.log(res)
  })
}
const checkPaper = (id) => {
  router.push({
    name: 'Paper',
    params: {
      id: id
    }
  })
}
</script>
<style lang='less' scoped>
.goback {
  .button {
    margin-top: 10px;
    margin-left: 95%;
  }
}
.paper-form {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  .paper {
    position: relative;
    flex: 1;
    text-align: center;
    margin: 17px;
    border: 1px solid #888;
    box-sizing: border-box;
    width: 210px;
    min-width: 210px;
    max-width: 210px;
    height: 260px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    box-shadow: 0 3px 5px gray;
    &:nth-child(5n + 5) {
      margin-right: 0;
    }
    transition: all 0.4s;
    .Score {
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .totalScore {
        font-size: 30px;
      }
    }
    .studentName {
        font-size: 30px;
    }
    .red {
        color: red;
    }
    .green {
        color: green;
    }
  }
  .paper:hover {
    transform: scale(1.1);
  }
}
</style>
