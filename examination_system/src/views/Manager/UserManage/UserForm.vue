<template>
  <el-tabs type="border-card" class="userTabs">
    <el-tab-pane label="教师管理">
      <UserTabel :identity="0"/>
    </el-tab-pane>
    <el-tab-pane label="学生管理">
      <UserTabel :identity="1"/>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup>
import UserTabel from './UserTabel.vue'
</script>
<style lang='less' scoped>
.userTabs {
  width: 100%;
}
</style>
