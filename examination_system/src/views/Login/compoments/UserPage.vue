<template>
  <div class="loginBox">
    <h1 class="loginTitle">LOGIN</h1>
    <el-form
      ref="loginRef"
      :model="user"
      :rules="loginLules"
      label-width="0px"
      class="loginForm"
      status-icon
    >
      <el-form-item prop="name">
        <el-input v-model="user.name" placeholder="请输入用户" :prefix-icon="User" />
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input v-model="user.pwd" type="password" placeholder="请输入密码" :prefix-icon="Lock"/>
      </el-form-item>
      <el-form-item prop="identity">
        <el-radio-group v-model="radio" >
          <el-radio :label="0">管理员</el-radio>
          <el-radio :label="1">教师</el-radio>
          <el-radio :label="2">学生</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="success" @click="login()">登录</el-button>
        <el-button type="info" @click="resetLoginForm(loginRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios from 'axios'

const router = useRouter()
const loginRef = ref()
const radio = ref(0)
const user = reactive({
  name: '',
  pwd: ''
})

const loginLules = reactive({
  name: [
    { required: true, message: '用户不能为空', trigger: 'blur' }
  ],
  pwd: [
    { required: true, message: '密码不能为空', trigger: 'blur' }
  ]
})

const login = () => {
  axios.post(`http://localhost/${radio.value === 0 ? 'admin' : (radio.value === 1 ? 'teacher' : 'student')}/login?username=${user.name}&password=${user.pwd}`
  ).then(res => {
    console.log('登录', res.data)
    if (res.data.code === 1) {
      ElMessage.success('登录成功')
      if (radio.value === 0) {
        localStorage.setItem('adminid', res.data.data.id)
      } else if (radio.value === 1) {
        localStorage.setItem('teacherid', res.data.data.id)
      } else {
        localStorage.setItem('studentid', res.data.data.id)
      }
      router.push({
        path: `${radio.value === 0 ? '/manager' : (radio.value === 1 ? '/teather' : '/student')}`
      })
    } else {
      ElMessage.error('用户名或密码错误')
    }
  })
}

const resetLoginForm = (loginRef) => {
  if (!loginRef) return
  loginRef.resetFields()
}
</script>

<style lang='less' scoped>
.loginBox {
    width: 450px;
    height: 300px;
    background-color: #e1edeb;
    opacity: 0.95;
    border-radius: 5px;
    opacity: 0.8;
    box-shadow: 0 5px 15px rgb(142, 134, 134);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .loginTitle {
        text-align: center;
        height: 70px;
        padding-top: 20px;
    }
    .loginForm {
        margin: 30px;
        position: absolute;
        width: 390px;
    }
    .btns {
        position: absolute;
        margin-top: 10px;
        right: 0;
    }
}
</style>
