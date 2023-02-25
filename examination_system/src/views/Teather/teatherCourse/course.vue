<template>
  <div class="courseHead">
    <el-button @click="dialogFormVisible = true">创建课程</el-button>
  </div>
  <el-tabs tab-position="left" class="demo-tabs">
    <el-tab-pane v-for="(item, index) in tea.courses" :key="index" :label="item.name">
      <div class="code">{{ `课程码: ${item.code}` }}</div>
      <div class="introduce">{{ `课程介绍: ${item.introduce}` }}</div>
      <div class="introduce">学生列表:</div>
      <el-table :data="tea.students[index]" stripe style="width: 100%">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="password" label="密码" />
      </el-table>
    </el-tab-pane>
  </el-tabs>
  <el-dialog v-model="dialogFormVisible" title="添加课程" width="50%">
    <el-form :model="tea">
      <el-form-item label="课程名" :label-width="formLabelWidth">
        <el-input v-model="tea.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="所属题库" :label-width="formLabelWidth">
        <el-select v-model="tea.questionBankId">
          <el-option
            v-for="item in tea.bank"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="课程介绍" :label-width="formLabelWidth">
        <el-input v-model="tea.introduce" :rows="3" type="textarea" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="makeCourse()"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
const dialogFormVisible = ref(false)
const formLabelWidth = '80px'
// const tableData = reactive([
//   {
//     name: '课程1',
//     code: 'dejfirg',
//     introduce: '课程1的介绍',
//     students: [
//       {
//         name: 'Jerry',
//         sex: '男',
//         username: '张三'
//       },
//       {
//         name: 'Jerry',
//         sex: '男',
//         username: '张三'
//       },
//       {
//         name: 'Jerry',
//         sex: '男',
//         username: '张三'
//       }
//     ]
//   },
//   {
//     name: '课程1',
//     code: 'dejfirg',
//     introduce: '课程1的介绍',
//     students: [
//       {
//         name: 'Jerry',
//         sex: '男',
//         username: '张三'
//       },
//       {
//         name: 'Jerry',
//         sex: '男',
//         username: '张三'
//       },
//       {
//         name: 'Jerry',
//         sex: '男',
//         username: '张三'
//       }
//     ]
//   },
//   {
//     name: '课程1',
//     code: 'dejfirg',
//     introduce: '课程1的介绍',
//     students: [
//       {
//         name: 'Jerry',
//         sex: '男',
//         username: '张三'
//       },
//       {
//         name: 'Jerry',
//         sex: '男',
//         username: '张三'
//       },
//       {
//         name: 'Jerry',
//         sex: '男',
//         username: '张三'
//       }
//     ]
//   },
//   {
//     name: '课程1',
//     code: 'dejfirg',
//     introduce: '课程1的介绍',
//     students: [
//       {
//         name: 'Jerry',
//         sex: '男',
//         username: '张三'
//       },
//       {
//         name: 'Jerry',
//         sex: '男',
//         username: '张三'
//       },
//       {
//         name: 'Jerry',
//         sex: '男',
//         username: '张三'
//       }
//     ]
//   },
//   {
//     name: '课程1',
//     code: 'dejfirg',
//     introduce: '课程1的介绍',
//     students: [
//       {
//         name: 'Jerry',
//         sex: '男',
//         username: '张三'
//       },
//       {
//         name: 'Jerry',
//         sex: '男',
//         username: '张三'
//       },
//       {
//         name: 'Jerry',
//         sex: '男',
//         username: '张三'
//       }
//     ]
//   }
// ])
const tea = reactive({
  id: localStorage.getItem('teacherid'),
  courses: [],
  students: [],
  name: '',
  questionBankId: '',
  introduce: '',
  bank: []
})
onMounted(() => {
  getCourse()
  getBank()
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
    console.log(res.data.data.records)
    tea.courses = res.data.data.records
    tea.courses.forEach(e => {
      getStudents(e.id)
    })
  })
}
const getStudents = (id) => {
  axios({
    url: 'http://localhost/courseSelection/student',
    method: 'get',
    params: {
      courseId: id,
      page: 1,
      pageSize: 50
    }
  }).then(res => {
    tea.students.push(res.data.data.records)
  })
}
const getBank = () => {
  axios.get('http://localhost/questionBank'
  ).then(res => {
    tea.bank = res.data.data
    console.log(tea.bank)
  })
}
const makeCourse = () => {
  axios.post('http://localhost/course/', {
    teacherId: tea.id,
    name: tea.name,
    questionBankId: tea.questionBankId,
    introduce: tea.introduce
  }).then(res => {
    console.log(res)
    dialogFormVisible.value = false
    ElMessage.success('添加成功')
  })
}
// const handleEdit = (index, row) => {
//   console.log(index, row)
// }
// const handleDelete = (index) => {
//   tableData.splice(index, 1)
// }
// const stuDelete = (index) => {
//   tableData[index].students.splice(index, 1)
// }
</script>
<style lang='less' scoped>
.courseHead {
  margin: 10px;
  margin-left: 20px;
  display: flex;
  align-items: center;
}
.introduce {
  margin: 5px 0;
}
</style>
