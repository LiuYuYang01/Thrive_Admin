<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()

const loading = ref<boolean>(true)

// 页面开始进入
router.beforeEach(_ => loading.value = true)
// 页面进入完毕
router.afterEach(_ => {
    setTimeout(() => {
        loading.value = false
    }, 500)
})
</script>

<template>
    <div class="mask" v-if="loading">
        <div class="loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>

        <p class="text" style="top: 55%; font-size: 30px;">加载中，请稍后~</p>
    </div>
</template>

<style scoped lang="scss">
.mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background-color: rgb(255, 255, 255, 1);
    z-index: 99999;
}

.loading,
.loading>div,
.text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    box-sizing: border-box;
    z-index: 99998;
}

.loading {
    display: block;
    font-size: 0;
    color: #727cf5;
    transform: translateY(-200%);
}

.loading.la-dark {
    color: #333;
}

.loading>div {
    display: inline-block;
    float: none;
    background-color: currentColor;
    border: 0 solid currentColor;
}

.loading {
    width: 40px;
    height: 40px;
}

.loading>div {
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 0;
    opacity: 0;
    // transform: translate(-100%);
    animation: ball-8bits 1s 0s ease infinite;
}

.loading>div:nth-child(1) {
    animation-delay: -0.9375s;
}

.loading>div:nth-child(2) {
    animation-delay: -0.875s;
}

.loading>div:nth-child(3) {
    animation-delay: -0.8125s;
}

.loading>div:nth-child(4) {
    animation-delay: -0.75s;
}

.loading>div:nth-child(5) {
    animation-delay: -0.6875s;
}

.loading>div:nth-child(6) {
    animation-delay: -0.625s;
}

.loading>div:nth-child(7) {
    animation-delay: -0.5625s;
}

.loading>div:nth-child(8) {
    animation-delay: -0.5s;
}

.loading>div:nth-child(9) {
    animation-delay: -0.4375s;
}

.loading>div:nth-child(10) {
    animation-delay: -0.375s;
}

.loading>div:nth-child(11) {
    animation-delay: -0.3125s;
}

.loading>div:nth-child(12) {
    animation-delay: -0.25s;
}

.loading>div:nth-child(13) {
    animation-delay: -0.1875s;
}

.loading>div:nth-child(14) {
    animation-delay: -0.125s;
}

.loading>div:nth-child(15) {
    animation-delay: -0.0625s;
}

.loading>div:nth-child(16) {
    animation-delay: 0s;
}

.loading>div:nth-child(1) {
    top: -100%;
    left: 0;
}

.loading>div:nth-child(2) {
    top: -100%;
    left: 33.3333333333%;
}

.loading>div:nth-child(3) {
    top: -66.6666666667%;
    left: 66.6666666667%;
}

.loading>div:nth-child(4) {
    top: -33.3333333333%;
    left: 100%;
}

.loading>div:nth-child(5) {
    top: 0;
    left: 100%;
}

.loading>div:nth-child(6) {
    top: 33.3333333333%;
    left: 100%;
}

.loading>div:nth-child(7) {
    top: 66.6666666667%;
    left: 66.6666666667%;
}

.loading>div:nth-child(8) {
    top: 100%;
    left: 33.3333333333%;
}

.loading>div:nth-child(9) {
    top: 100%;
    left: 0;
}

.loading>div:nth-child(10) {
    top: 100%;
    left: -33.3333333333%;
}

.loading>div:nth-child(11) {
    top: 66.6666666667%;
    left: -66.6666666667%;
}

.loading>div:nth-child(12) {
    top: 33.3333333333%;
    left: -100%;
}

.loading>div:nth-child(13) {
    top: 0;
    left: -100%;
}

.loading>div:nth-child(14) {
    top: -33.3333333333%;
    left: -100%;
}

.loading>div:nth-child(15) {
    top: -66.6666666667%;
    left: -66.6666666667%;
}

.loading>div:nth-child(16) {
    top: -100%;
    left: -33.3333333333%;
}

@keyframes ball-8bits {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 1;
    }

    51% {
        opacity: 0;
    }
}
</style>