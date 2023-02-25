<template>
  <div class="paper-form">
    <div class="paper" v-for="(item, index) in tea.papers[0]" :key="index">
      <span class="delete" @click="delPaper(item.id, index)">X</span>
      <div class="paperTitle">{{ item.title }}</div>
      <!-- <div class="paperCourse">{{ item.courseName }}</div> -->
      <div class="paperTime">考试时间</div>
      <div class="startTime">{{ item.startTime }}</div>
      <span>|</span>
      <div class="stopTime">{{ item.stopTime }}</div>
      <el-button type="primary" plain class="paperBtn" @click="getAnserPapers(item.id, item.title)">
        答题详情
      </el-button>
    </div>
    <div class="paper make-paper">
      <el-button type="primary" plain @click="dialogFormVisible = true">组卷</el-button>
    </div>
  </div>
  <el-dialog v-model="dialogFormVisible" title="组卷" width="70%">
    <el-form :model="form">
      <el-form-item label="试卷标题" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="发布课程" :label-width="formLabelWidth">
        <el-select v-model="form.courseId" class="m-2" placeholder="Select">
          <el-option
            v-for="item in tea.courses"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="考试时间" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.time"
          type="datetimerange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="题库题目" :label-width="formLabelWidth">
        <el-table
          ref="multipleTableRef"
          :data="tea.titles[0]"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"/>
          <el-table-column property="name" label="题目" width="70"/>
          <el-table-column property="type" label="类型" width="70"/>
          <el-table-column property="content" label="内容" width="550"/>
          <el-table-column label="分数">
            <template #default="scope">
              <el-input-number :step="10" v-model="form.num[scope.$index]" :min="1" :max="100" />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="subPaper()"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { onMounted, ref, reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const dialogFormVisible = ref(false)
const router = useRouter()

const formLabelWidth = '80px'
const form = reactive({
  tableData: '',
  title: '',
  time: '',
  courseId: '',
  num: [],
  paperQuestionList: [],
  score: []
})
onMounted(() => {
  getCourse()
  console.log(tea)
})
const tea = reactive({
  id: localStorage.getItem('teacherid'),
  courses: [],
  papers: [],
  titles: []
})
const getCourse = () => {
  axios({
    url: 'http://localhost/course/page',
    method: 'get',
    params: {
      page: 1,
      pageSize: 50,
      teacherId: tea.id
    }
  }).then(res => {
    tea.courses = res.data.data.records
    tea.courses.forEach(e => {
      getPapers(e.id)
      getQuestion(e.questionBankId)
    })
  })
}
const getPapers = (id) => {
  axios.get(`http://localhost/testPaper/page?page=1&pageSize=20&courseId=${id}`
  ).then(res => {
    if (res.data.data.total > 0) {
      tea.papers.push(res.data.data.records)
    }
  })
}
const getQuestion = (id) => {
  axios({
    url: 'http://localhost/question/page',
    method: 'get',
    params: {
      page: 1,
      pageSize: 50,
      questionBankId: id
    }
  }).then(res => {
    tea.titles.push(res.data.data.records)
  })
}
const subPaper = () => {
  inipaperQuestionList()
  axios.post('http://localhost/testPaper', {
    courseId: form.courseId,
    title: form.title,
    startTime: form.time[0],
    stopTime: form.time[1],
    paperQuestionList: form.paperQuestionList
  }).then(res => {
    ElMessage.success(res.data.data)
  })
  dialogFormVisible.value = false
}
const iniScore = () => {
  form.num.forEach(e => {
    if (e !== '') {
      form.score.push(e)
    }
  })
}
const inipaperQuestionList = () => {
  iniScore()
  const len = form.score.length
  for (let i = 0; i < len; i++) {
    form.paperQuestionList.push({
      questionId: form.tableData[i].id,
      score: form.score[i]
    })
  }
}
const delPaper = (id, index) => {
  axios.delete(`http://localhost/testPaper?id=${id}`
  ).then(res => {
    console.log(res)
    tea.papers[0].splice(index, 1)
    ElMessage.success('删除成功')
  })
  console.log(id)
}
const getAnserPapers = (id, title) => {
  router.push({
    name: 'StuPaperManage',
    params: {
      id: id,
      title: title
    }
  })
}
const handleSelectionChange = (val) => {
  form.tableData = val
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
    .delete {
      position: absolute;
      top: 0;
      right: 2px;
      cursor: pointer;
      color: gray;
    }
  }
  .paper:hover {
    transform: scale(1.1);
  }
  .make-paper {
    border: dashed 1px gray
  }
}
</style>
