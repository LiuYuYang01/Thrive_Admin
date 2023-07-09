<script setup lang="ts">
const text = ref("Hello")
</script>

<template>
  <Title title="创作" icon="edit-alt" />

  <div class="main">
    <div class="edit">
      <v-md-editor v-model="text" height="600px"></v-md-editor>
    </div>

    <div class="sidebar">12131FF</div>
  </div>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  justify-content: space-between;
  padding: 0 50px;

  .edit {
    width: 70%;
    margin-right: 10%;
  }

  .sidebar {
    width: 20%;
    background-color: yellow;
  }
}
</style>
