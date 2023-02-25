<template>
  <div class="stuHome">
    <StuHead/>
    <router-view/>
  </div>
</template>
<script setup>
import StuHead from './compoments/stuHead.vue'
</script>
<style lang='less' scoped>
.stuHome {
  // display: flex;
  // justify-content: center;
  margin: 0 auto;
  width: 80%;
}
</style>
