<script setup lang="ts">
import { ref } from 'vue';
const active = ref(0)
</script>

<template>
  <div class="title"><box-icon name='shield-quarter' />系统配置</div>

  <div class="main">
    <ul class="options">
      <li class="item" :class="{ active: index === active }" @click="active = index" v-for="item, index in 3">
        <h3>系统配置</h3>
        <p>系统配置描述</p>
      </li>
    </ul>

    <div class="config">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  @include title;
}

.main {
  display: flex;

  .options {
    width: 210px;
    margin-right: 20px;
    border-right: 1px solid #eee;

    .item {
      position: relative;
      padding: 10px 0;
      padding-left: 20px;
      margin: 5px 0;
      transition: all $move;
      cursor: pointer;

      h3 {
        font-size: 16px;
      }

      p {
        font-size: 14px;
        margin-top: 10px;
        color: #858585;
      }

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 3.5px;
        height: 0%;
        background-color: $color;
        transition: height $move;
      }

      &:hover {
        background-color: #f7f7f8;

        &::before {
          height: 100%;
        }
      }
    }

    .active {
      background-color: #f7f7f8;

      &::before {
        height: 100%;
      }
    }
  }
}
</style>
