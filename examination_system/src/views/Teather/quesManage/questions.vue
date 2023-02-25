<template>
  <div class="bankHead">
    <span>题库</span>
  </div>
  <el-tabs tab-position="left" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane v-for="(item, index) in questionBank.bank" :key="index" :label="item.name">
      <el-table :data="questionBank.titles[index]" :key="updateKey" stripe style="width: 100%">
        <el-table-column prop="name" label="题目" />
        <el-table-column prop="content" label="内容" width="600"/>
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="answer" label="答案" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row.id, scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-button class="mt-4" style="width: 100%" @click="openForm(item.id)"
        >添加题目</el-button
      >
    </el-tab-pane>
  </el-tabs>
  <el-dialog v-model="dialogFormVisible" title="添加题目" width="50%">
    <el-form :model="questionBank.title">
      <el-form-item label="题目" :label-width="formLabelWidth">
        <el-input v-model="questionBank.title.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="内容" :label-width="formLabelWidth">
        <el-input
          v-model="questionBank.title.content"
          :rows="3"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="类型" :label-width="formLabelWidth">
        <el-select v-model="questionBank.title.type" class="m-2">
          <el-option
            v-for="item in questionBank.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="答案" :label-width="formLabelWidth">
        <el-input v-model="questionBank.title.answer" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addQuestion()"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
const dialogFormVisible = ref(false)
const updateKey = ref(0)
const questionBank = reactive({
  tabs: '',
  options: [{
    value: '0',
    label: '选择题'
  },
  {
    value: '1',
    label: '大题'
  }],
  bank: [],
  titles: [],
  title: {
    teacherId: localStorage.getItem('teacherid'),
    name: '',
    questionBankId: '',
    type: '',
    content: '',
    answer: ''
  }
})
onMounted(() => {
  getBank()
  console.log(questionBank)
})
const getBank = () => {
  axios.get('http://localhost/questionBank'
  ).then(res => {
    questionBank.bank = res.data.data
    questionBank.bank.forEach(e => {
      getQuestion(e.id)
    })
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
    questionBank.titles.push(res.data.data.records)
  })
}
const openForm = (id) => {
  questionBank.title.questionBankId = id
  dialogFormVisible.value = true
}
const addQuestion = () => {
  console.log(questionBank)
  axios.post('http://localhost/question', {
    teacherId: questionBank.title.teacherId,
    name: questionBank.title.name,
    questionBankId: questionBank.title.questionBankId,
    type: questionBank.title.type,
    content: questionBank.title.content,
    answer: questionBank.title.answer
  }).then(res => {
    ElMessage.success('添加成功')
    console.log(res)
    questionBank.titles[questionBank.tabs].push(res.data.data)
    updateKey.value += 1
  })
  dialogFormVisible.value = false
}
const handleDelete = (id, index) => {
  axios.delete(`http://localhost/question?id=${id}`
  ).then(res => {
    ElMessage.success('删除成功')
    questionBank.titles[questionBank.tabs].splice(index, 1)
    console.log(res)
  })
}
const handleClick = (tab) => {
  questionBank.tabs = tab.index
  console.log(questionBank.tabs)
}
</script>
<style lang='less' scoped>
.bankHead {
  margin: 10px;
  margin-left: 20px;
}
</style>
