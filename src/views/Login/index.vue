<script setup lang="ts">

</script>

<template>
  <div class="container">
    <div class="login">

    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);

  .login {
    position: absolute;
    left: 50%;
    top: 25%;
    transform: translate(-50%);
    width: 340px;
    height: 400px;
    border-radius: $round;
    background-color: #fff;
  }
}
</style>
