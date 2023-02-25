<template>
  <el-table :data="stu.courseList" style="width: 100%">
    <el-table-column prop="code" label="课程码" />
    <el-table-column prop="name" label="课程名" />
    <el-table-column prop="introduce" label="课程介绍" />
    <el-table-column prop="teacherName" label="课程教师" />
  </el-table>
  <el-button class="mt-4" style="width: 100%" @click="dialogFormVisible = true"
    >加入课程</el-button
  >
  <el-dialog v-model="dialogFormVisible" title="加入课程" width="30%">
    <el-form :model="codes">
      <el-form-item label="课程码" :label-width="formLabelWidth">
        <el-input v-model="codes.code" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="getCourse(codes.code)"
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
const formLabelWidth = '80px'

const stu = reactive({
  studentId: localStorage.getItem('studentid'),
  courseList: []
})
const codes = reactive({
  code: ''
})
onMounted(() => {
  iniCourse()
  console.log(stu)
})
// onUpdated(() => {
//   localStorage.setItem('courseList', JSON.stringify(stu.courseList))
// })
const iniCourse = () => {
  axios.get(`http://localhost/courseSelection/course?studentId=${stu.studentId}&page=1&pageSize=10`
  ).then(res => {
    stu.courseList = res.data.data.records
  })
  console.log(stu.courseList)
}
const getCourse = (code) => {
  if (code === '') {
    ElMessage.error('输入不能为空')
  } else {
    axios.get(`http://localhost/course/?code=${code}`
    ).then(res => {
      addCourse(res.data.data.id, stu.studentId)
      dialogFormVisible.value = false
      ElMessage.success('加入成功')
      stu.courseList.push(res.data.data)
    }).catch(err => {
      console.log(err)
    })
  }
}
const addCourse = (courseId, studentId) => {
  axios.post('http://localhost/courseSelection', {
    courseId: courseId,
    studentId: studentId
  }).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}
</script>
<style lang='less' scoped>
</style>
