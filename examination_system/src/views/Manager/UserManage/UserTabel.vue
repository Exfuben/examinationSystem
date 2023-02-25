<template>
  <el-table :data="user.list.slice((currentPage-1) * pageSize, currentPage * pageSize)" stripe style="width: 100%">
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="username" label="用户名" width="180" />
    <el-table-column prop="password" label="密码" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          size="small"
          type="danger"
          @click="delUser(scope.row.id, scope.$index)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-model:currentPage="currentPage"
    v-model:page-size="pageSize"
    layout="prev, pager, next"
    :total="user.list.length"
  />
  <el-button class="mt-4" style="width: 100%" @click="dialogFormVisible = true"
    >添加用户</el-button
  >
  <el-dialog v-model="dialogFormVisible" :title="`${identity === 0 ? '添加教师' : '添加学生'}`" width="30%">
    <el-form :model="user.user">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="user.user.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-select v-model="user.user.sex">
          <el-option label="男" value="0" />
          <el-option label="女" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="user.user.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="user.user.password" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addUser()"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import axios from 'axios'
import { onMounted, ref, reactive, defineProps } from 'vue'
import { ElMessage } from 'element-plus'
const dialogFormVisible = ref(false)
const formLabelWidth = '80px'
const currentPage = ref(1)
const pageSize = ref(10)
const props = defineProps({
  identity: {
    type: String,
    default: '0'
  }
})
const user = reactive({
  list: [],
  identity: props.identity,
  user: {
    name: '',
    sex: '',
    username: '',
    password: ''
  }
})
onMounted(() => {
  getUserList(user.identity)
  console.log(user)
})
const getUserList = (identity) => {
  if (identity === 0) {
    getTeacherList()
  } else if (identity === 1) {
    getStudentList()
  }
}
const getTeacherList = () => {
  axios.get('http://localhost/teacher/page?page=1&pageSize=100'
  ).then(res => {
    user.list = res.data.data.records
  })
}
const getStudentList = () => {
  axios.get('http://localhost/student/page?page=1&pageSize=100'
  ).then(res => {
    user.list = res.data.data.records
  })
}
// const handleDelete = (id) => {
//  tableData.value.splice(index, 1)
//   console.log(id);
// }
const addUser = () => {
  if (user.identity === 0) {
    addTeacher()
  } else if (user.identity === 1) {
    addStudent()
  }
  ElMessage.success('添加成功')
}
const addTeacher = () => {
  axios.post('http://localhost/teacher/save', {
    name: user.user.name,
    sex: user.user.sex,
    username: user.user.username,
    password: user.user.password
  }).then(res => {
    console.log(res)
    user.list.push(res.data.data)
    dialogFormVisible.value = false
  })
}
const addStudent = () => {
  axios.post('http://localhost/student/save', {
    name: user.user.name,
    sex: user.user.sex,
    username: user.user.username,
    password: user.user.password
  }).then(res => {
    console.log(res)
    user.list.push(res.data.data)
    dialogFormVisible.value = false
  })
}
const delUser = (id, index) => {
  if (user.identity === 0) {
    delTeacher(id, index)
  } else if (user.identity === 1) {
    delStudent(id, index)
  }
  console.log(id, index)
  ElMessage.success('删除成功')
}
const delTeacher = (id, index) => {
  axios.delete(`http://localhost/teacher?ids=${id}`
  ).then(res => {
    console.log(res)
    user.list.splice((currentPage.value - 1) * pageSize.value + index, 1)
  })
}
const delStudent = (id, index) => {
  axios.delete(`http://localhost/student?ids=${id}`
  ).then(res => {
    console.log(res)
    user.list.splice((currentPage.value - 1) * pageSize.value + index, 1)
  })
}
</script>
<style lang='less' scoped>
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
</style>
