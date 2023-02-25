<template>
  <el-card class="box-card">
    <div class="card-header">
      <span class="paperTitle">{{ paperTitle }}</span>
      <el-button class="button" type="primary" @click="subPaper()">提交试卷</el-button>
    </div>
    <div class="question" v-for="(item, index) in paper.detail[0]" :key="index">
      <div class="head">
        <span>{{ item.question.name }}</span>&nbsp;
        <span>{{ `(分数:${ item.score })` }}</span>
      </div>
      <div class="content">{{ item.question.content }}</div>
      <div class="answer">
        <el-radio-group v-if="item.question.type === 0" v-model="paper.answers[index]">
          <el-radio label="A">A</el-radio>
          <el-radio label="B">B</el-radio>
          <el-radio label="C">C</el-radio>
          <el-radio label="D">D</el-radio>
        </el-radio-group>
        <el-input v-else :rows="3" type="textarea" v-model="paper.answers[index]" />
      </div>
    </div>
  </el-card>
</template>
<script setup>
import { onMounted, reactive } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const id = route.params.id
const paperTitle = route.params.title
const paper = reactive({
  studentId: localStorage.getItem('studentid'),
  detail: [],
  answers: [],
  answerContent: ''
})
onMounted(() => {
  getPaperDetail(id)
  console.log(paper)
})
const getPaperDetail = (id) => {
  axios.get(`http://localhost/testPaper?id=${id}`
  ).then(res => {
    paper.detail.push(res.data.data)
  })
}
const subPaper = () => {
  console.log(paper.answers)
  paper.answers.forEach(element => {
    if (element === 'A' || element === 'B' || element === 'C' || element === 'D') {
      paper.answerContent += element + '@#'
    } else {
      paper.answerContent += '@' + element
    }
  })
  console.log(paper.answerContent)
  axios.post('http://localhost/answerPaper', {
    studentId: paper.studentId,
    testPaperId: id,
    content: paper.answerContent
  }).then(res => {
    console.log(res)
    ElMessage.success('提交成功')
    router.push({
      path: '/student/answers'
    })
  })
}
</script>
<style lang='less' scoped>
.box-card {
  margin: 0 auto;
  width: 80%;
  // height: 700px;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .paperTitle {
      font-size: 25px;
      margin-left: 20px;
    }
  }
  .question {
    border-top: 1px solid rgb(218, 207, 207);
    width: 90%;
    margin-left: 5%;
    margin-top: 10px;
    padding: 20px;
    .content {
      margin: 5px 0;
    }
    .answer {
      display: flex;
      justify-content: flex-start;
      margin-left: 10px;
      margin-top: 10px;
    }
  }
}
</style>
