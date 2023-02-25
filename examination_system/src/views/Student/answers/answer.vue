<template>
  <el-card class="box-card">
    <div class="card-header">
      <div>总分：<span>{{ totalScore }}</span></div>
      <el-button class="button" type="primary" @click="goBack()">返回</el-button>
    </div>
    <div class="question" v-for="(item, index) in paper.detail" :key="index">
      <div class="head">
        <span>{{ item.question.name }}</span>&nbsp;
        <span>{{ `(分数:${ item.score })` }}</span>
        <span class="score">{{ paper.eachScore[index] }}</span>
      </div>
      <div class="content">{{ item.question.content }}</div>
      <div class="answer">
        <div class="showSelect" v-if="item.question.type === 0">
          <span :class="getColor(index,'A',item.question.answer)">A</span>
          <span :class="getColor(index,'B',item.question.answer)">B</span>
          <span :class="getColor(index,'C',item.question.answer)">C</span>
          <span :class="getColor(index,'D',item.question.answer)">D</span>
        </div>
        <el-input v-else disabled  :rows="3" type="textarea" :placeholder="getDAnswer(index)"/>
      </div>
    </div>
  </el-card>
</template>
<script setup>
import { onMounted, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
const router = useRouter()
const route = useRoute()
const content = route.params.content
const testPaperId = route.params.testPaperId
const totalScore = route.params.totalScore
const eachScore = route.params.eachScore
const paper = reactive({
  detail: [],
  answers: [],
  eachScore: []
})
onMounted(() => {
  getPaper(testPaperId)
  getAnswer(content)
  getEachScore(eachScore)
  console.log(paper)
})
const getPaper = (testPaperId) => {
  axios.get(`http://localhost/testPaper?id=${testPaperId}`
  ).then(res => {
    paper.detail = res.data.data
  })
}
const getEachScore = (eachScore) => {
  const arr = eachScore.split('@')
  paper.eachScore = arr
}
const getAnswer = (content) => {
  paper.answers = content.split('@#')
  console.log(paper.answers)
}
const getDAnswer = (index) => {
  const str = paper.answers[index].slice(1)
  return str
}
const getColor = (index, option, answer) => {
  if (paper.answers[index] === option) {
    if (paper.answers[index] === answer) {
      return 'color-green'
    } else {
      return 'color-red'
    }
  } else {
    if (option === answer) {
      return 'color-green'
    } else {
      return 'color-nomal'
    }
  }
}
const goBack = () => {
  router.push({
    path: '/student/answers'
  })
}
</script>
<style lang='less' scoped>
.box-card {
  margin: 0 auto;
  width: 80%;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .card-header div {
    padding-left: 40px;
    font-size: 20px;
  }
  .card-header div span {
    color: red;
    font-size: 25px;
  }
  .question {
    border-top: 1px solid rgb(218, 207, 207);
    width: 90%;
    margin-left: 5%;
    margin-top: 10px;
    padding: 20px;
    .head {
      .score {
        margin-left: 20px;
        font-size: 20px;
        color: red;
      }
    }
    .content {
      margin: 5px 0;
    }
    .answer {
      display: flex;
      justify-content: flex-start;
      margin-left: 10px;
      margin-top: 10px;
      .showSelect span {
        margin: 0 30px 0 0;
        font-size: 20px;
      }
    }
  }
}
.color-red {
  color: red;
}
.color-green {
  color: green;
}
.color-nomal {
  color: rgb(203, 200, 200);
}
</style>
