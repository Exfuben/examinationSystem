<template>
  <el-card class="box-card">
    <div class="card-header">
      <span class="paperTitle">答卷评分</span>
      <el-button class="button" type="primary" @click="backPaper(paper.detail.testPaperId)">返回</el-button>
    </div>
    <div class="question" v-for="(item, index) in paper.detail.paperQuestionDtoList" :key="index">
      <div class="head">
        <span>{{ item.question.name }}</span>&nbsp;
        <span>{{ `(分数:${ item.score })` }}</span>
      </div>
      <div class="content">{{ item.question.content }}</div>
      <div class="answer">
        <div class="showSelect" v-if="item.question.type === 0">
          <span :class="getColor(index,'A',item.question.answer)">A</span>
          <span :class="getColor(index,'B',item.question.answer)">B</span>
          <span :class="getColor(index,'C',item.question.answer)">C</span>
          <span :class="getColor(index,'D',item.question.answer)">D</span>
        </div>
        <div v-else class="Danswer">
          <el-input :rows="3" type="textarea" disabled :placeholder="getDAnswer(index)"/>
          <div class="putScore">
            <span>评分：</span>
            <el-input-number :step="10" v-model="paper.eachScore[index]" :min="0" :max="item.score" />
          </div>
        </div>
      </div>
    </div>
    <div class="subPaper">
      <el-button class="button" type="primary" @click="subPaper(paper.detail.testPaperId)">提交</el-button>
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
const paper = reactive({
  studentId: localStorage.getItem('teacherid'),
  detail: [],
  answers: [],
  eachScore: []
})
onMounted(() => {
  getPaperDetail(id)
  console.log(paper)
})
const getPaperDetail = (id) => {
  axios.get(`http://localhost/answerPaper/one?id=${id}`
  ).then(res => {
    console.log(res.data)
    paper.detail = res.data.data
    getAnswer(res.data.data.content)
    getScore(res.data.data.eachScore)
  })
}
const getAnswer = (content) => {
  paper.answers = content.split('@#')
  console.log(paper.answers)
}
const getScore = (str) => {
  const arr = str.split('@')
  paper.eachScore = arr
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
const subPaper = (id) => {
  let totalScore = 0
  paper.eachScore.forEach(e => {
    totalScore += parseInt(e)
  })
  const str = paper.eachScore.join('@')
  axios.post('http://localhost/answerPaper/score', {
    id: paper.detail.id,
    eachScore: str,
    totalScore: totalScore
  }).then(res => {
    console.log(res)
    ElMessage.success('提交成功')
    router.push({
      name: 'StuPaperManage',
      params: {
        id: id
      }
    })
  })
}
const backPaper = (id) => {
  router.push({
    name: 'StuPaperManage',
    params: {
      id: id
    }
  })
}
</script>
<style lang='less' scoped>
.box-card {
  margin: 0 auto;
  width: 80%;
  // height: 700px;
  .subPaper {
    margin-left: 48%;
  }
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
      .showSelect span {
        margin: 0 30px 0 0;
        font-size: 20px;
      }
      .Danswer {
        width: 100%;
        .putScore {
          margin-top: 4px;
        }
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
