<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()

// 引入时间库
import moment from 'moment'
// 年月日 时分秒
const date = ref(moment().format('YYYY-MM-DD HH:mm:ss'))
setInterval(() => {
    date.value = moment().format('YYYY-MM-DD HH:mm:ss')
}, 1000)
</script>

<template>
    <div class="header">
        <div class="date">{{ date }}</div>
    </div>
</template>