<template>
  <el-menu
    :default-active="0"
    class="el-menu-demo"
    mode="horizontal"
    router
  >
    <el-menu-item index="/student/course">我的课程</el-menu-item>
    <el-menu-item index="/student/exams">我的考试</el-menu-item>
    <el-menu-item index="/student/answers">我的答卷</el-menu-item>
    <div class="block">
      <el-avatar :size="30" :src="circleUrl" />
    </div>
    <div class="teaOut">
      <el-button class="button" @click="out()">退出登录</el-button>
    </div>
  </el-menu>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const router = useRouter()
const out = () => {
  localStorage.setItem('studentid', '')
  router.push({
    path: '/'
  })
}
</script>
<style lang='less' scoped>
.el-menu-demo:not(.el-menu--collapse) {
    width: 100%;
    background-color: white;
    .block {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 10px;
      margin-left: 70%;
    }
    .teaOut {
      display: flex;
      align-items: center;
      justify-content: center;
    }
}
</style>
