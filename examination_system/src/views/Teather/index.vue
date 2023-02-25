<template>
  <div class="teaHome">
    <TeaHead/>
    <router-view/>
  </div>
</template>
<script setup>
import TeaHead from './compoments/teaHead.vue'
</script>
<style lang='less' scoped>
.teaHome {
  // display: flex;
  // justify-content: center;
  margin: 0 auto;
  width: 80%;
}
</style>
