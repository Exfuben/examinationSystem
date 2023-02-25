<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu
        default-active="0"
        class="el-menu-vertical-demo"
        router
      >
        <el-menu-item index="/manager/userForm">
          <el-icon><icon-menu /></el-icon>
          <span>用 户 管 理</span>
        </el-menu-item>
        <el-menu-item index="/manager/queForm">
          <el-icon><document /></el-icon>
          <span>题 库 管 理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script setup>
</script>
<style lang='less' scoped>
.tac {
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 700px;
        background-color: rgb(238, 237, 243);
    }
}
</style>
