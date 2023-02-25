<template>
  <div class="page">
    <Title/>
    <UserPage/>
  </div>
</template>

<script setup>
import UserPage from './compoments/UserPage.vue'
import Title from './compoments/Title.vue'
</script>

<style lang='less' scoped>
.page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: skyblue;
}
</style>
