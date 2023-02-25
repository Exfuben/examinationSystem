<template>
  <div class="bank">
    <el-table :data="adminData.bank" stripe style="width: 100%">
      <el-table-column prop="name" label="题库" width="800"/>
      <el-table-column label="操作" width="200x">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="delBank(scope.$index, scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button class="mt-4" style="width: 100%" @click="dialogFormVisible = true"
      >添加题库</el-button
    >
  </div>
  <el-dialog v-model="dialogFormVisible" title="添加题库" width="50%">
    <el-form :model="adminData">
      <el-form-item label="题库名称" :label-width="formLabelWidth">
        <el-input v-model="adminData.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addBank()"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { onMounted, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
const adminData = reactive({
  bank: [],
  name: ''
})
const dialogFormVisible = ref(false)
onMounted(() => {
  getBank()
})
const getBank = () => {
  axios.get('http://localhost/questionBank'
  ).then(res => {
    console.log(res)
    adminData.bank = res.data.data
  })
}
const addBank = () => {
  axios.post('http://localhost/questionBank', {
    name: adminData.name
  }).then(res => {
    console.log(res)
    adminData.bank.push(res.data.data)
    ElMessage.success('添加成功')
    dialogFormVisible.value = false
  })
}
const delBank = (index, id) => {
  axios.delete(`http://localhost/questionBank?id=${id}`
  ).then(res => {
    console.log(res)
    adminData.bank.splice(index, 1)
    ElMessage.success('删除成功')
  })
}
</script>
<style lang='less' scoped>
</style>
