<template>
  <div class="paper-form">
    <div class="paper" v-for="(item, index) in stu.papers[0]" :key="index">
      <div class="paperTitle">{{ item.title }}</div>
      <div class="paperCourse">{{ item.courseName }}</div>
      <div class="paperTime">考试时间</div>
      <div class="startTime">{{ item.startTime }}</div>
      <span>|</span>
      <div class="stopTime">{{ item.stopTime }}</div>
      <el-button type="primary" :disabled="compareTime(item.startTime, item.stopTime)" plain class="paperBtn" @click="beginExam(item.id, item.title)">
        参加考试
      </el-button>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { onMounted, reactive } from 'vue'
import axios from 'axios'
import moment from 'moment'

const router = useRouter()
const stu = reactive({
  studentId: localStorage.getItem('studentid'),
  courseList: [],
  papers: [],
  time: ''
})
onMounted(() => {
  iniCourse()
  console.log(stu.papers)
})
const iniCourse = () => {
  axios.get(`http://localhost/courseSelection/course?studentId=${stu.studentId}&page=1&pageSize=10`
  ).then(res => {
    stu.courseList = res.data.data.records
    getPapers()
  })
}
const getPapers = () => {
  const len = stu.courseList.length
  for (let i = 0; i < len; i++) {
    axios.get(`http://localhost/testPaper/page?page=1&pageSize=10&courseId=${stu.courseList[i].id}`
    ).then(res => {
      if (res.data.data.total > 0) {
        stu.papers.push(res.data.data.records)
      }
    })
  }
}
const compareTime = (startTime, stopTime) => {
  stu.time = moment().format('YYYY-MM-DD HH:mm:ss')
  const nowdata = new Date(moment().format('YYYY-MM-DD HH:mm:ss'))
  const start = new Date(startTime)
  const stop = new Date(stopTime)
  if (nowdata.getTime() > start.getTime() && nowdata.getTime() < stop.getTime()) {
    return false
  } else {
    return true
  }
}
const beginExam = (id, title) => {
  router.push({
    name: 'Exam',
    params: {
      id: id,
      title: title
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
    .startTime {
        margin-bottom: -20px;
    }
    .stopTime {
        margin-top: -20px;
    }
  }
  .paper:hover {
    transform: scale(1.1);
  }
}
</style>
