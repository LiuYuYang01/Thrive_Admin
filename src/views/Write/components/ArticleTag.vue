<script setup lang="ts">

</script>

<template>
    <div class="ArticleTag">
        <div class="title"><box-icon name='purchase-tag' />标签</div>

        <div class="list">
            <box-icon name='plus' class="add"></box-icon>
        </div>
    </div>
</template>

<style scoped lang="scss">
.ArticleTag {
    .title {
        padding: 10px 15px;

        @include title;
        font-size: 16px;
        padding-bottom: 10px;
        margin-bottom: 0;
    }

    .list {
        &:hover .add {
            background-color: #fafafa;
        }

        .add {
            width: 100%;
            text-align: center;
            height: 70px;
            fill: #e3e3e3;
            cursor: pointer;
            transition: background-color $move;
        }
    }
}
</style>
