<template>
  <div class="paper-form">
    <div class="paper" v-for="(item, index) in stu.papers" :key="index">
      <div class="paperTitle">答卷</div>
      <div class="testTitle">{{ item.testPaperName }}</div>
      <div class="paperScore">分数</div>
      <div class="score" v-if="item.isScore === 1">{{ item.totalScore }}</div>
      <div class="score" v-else>未批改</div>
      <el-button type="primary" plain class="paperBtn" @click="checkPaper(item.content, item.testPaperId, item.totalScore, item.eachScore)">
        查看试卷
      </el-button>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { onMounted, reactive } from 'vue'
import axios from 'axios'

const router = useRouter()
const stu = reactive({
  studentId: localStorage.getItem('studentid'),
  courseList: [],
  papers: []
})
onMounted(() => {
  iniCourse()
  getPapers()
})
const iniCourse = () => {
  axios.get(`http://localhost/courseSelection/course?studentId=${stu.studentId}&page=1&pageSize=10`
  ).then(res => {
    stu.courseList = res.data.data.records
  })
}
const getPapers = () => {
  axios.get(`http://localhost/answerPaper/all?page=1&pageSize=20&studentId=${stu.studentId}`
  ).then(res => {
    console.log(res.data.data)
    stu.papers = res.data.data.records
  })
}
const checkPaper = (content, testPaperId, totalScore, eachScore) => {
  router.push({
    name: 'Answer',
    params: {
      content: content,
      testPaperId: testPaperId,
      totalScore: totalScore,
      eachScore: eachScore
    }
  })
}
</script>
<style lang='less' scoped>
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
    .paperTitle {
        font-size: 30px;
    }
    .testTitle {
      font-size: 20px;
    }
    .paperScore {
        font-size: 20px;
        margin-bottom: -20px;
    }
    .score {
        font-size: 20px;
        color: red;
    }
  }
  .paper:hover {
    transform: scale(1.1);
  }
}
</style>
