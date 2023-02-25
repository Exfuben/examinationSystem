<template>
  <div class="logoTitle">
    <h1 class="togogo">togogo在线考试系统管理中心</h1>
    <div class="out">
      <el-button @click="out()">退出登录</el-button>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const out = () => {
  localStorage.setItem('adminid', '')
  router.push({
    path: '/'
  })
}
</script>
<style lang='less' scoped>
.logoTitle {
    display: flex;
    justify-content: space-between;
    height: 50px;
    background-color: rgb(161, 204, 246);
    .togogo {
      font-size: 30px;
      padding-left: 20px;
      padding-top: 2px;
      color: rgb(243, 245, 247);
      text-shadow: 0 2px 2px gray;
    }
    .out {
      display: flex;
      align-items: center;
      margin-right: 10px;
    }
}
</style>
