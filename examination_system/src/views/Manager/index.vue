<template>
  <Logo/>
  <div class="managerHome">
    <Aside/>
    <router-view/>
  </div>
</template>
<script setup>
import Logo from './compoments/logo.vue'
import Aside from './compoments/aside.vue'
</script>
<style lang='less' scoped>
.managerHome {
  display: flex;
}
</style>
