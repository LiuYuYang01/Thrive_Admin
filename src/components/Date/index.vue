<script setup lang="ts">
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

const emit = defineEmits<{ (e: "update:modelValue", data: Date): void }>()
const date = ref(new Date())
watch(date, (data: Date) => emit("update:modelValue", data))
</script>

<template>
    <div class="date">
        <DatePicker v-model="date" />
    </div>
</template>

<style scoped lang="scss">
.date {
    :deep(.vc-container) {
        .vc-title {
            background-color: transparent;
            transition: background-color $move;
        }

        .vc-header {
            .vc-arrow {
                background-color: transparent;
                transition: background-color $move;
            }

            .vc-arrow:hover {
                background-color: #fafafa;
            }

            .vc-title:hover {
                background-color: #f3f3f3 !important;
            }
        }

        .vc-weekday {
            font-size: 12px;
        }

        .vc-nav-item {
            background-color: transparent;
        }

        .vc-highlight-content-solid {
            background-color: $color;
        }
    }

    :deep(.vc-nav-container) {
        .vc-nav-title {
            background: transparent;
            transition: background-color $move;
        }

        .vc-nav-title:hover {
            background-color: #f3f3f3 !important;
        }

        .vc-nav-arrow {
            background-color: transparent;
            transition: background-color $move;
        }

        .vc-nav-arrow:hover {
            background-color: #f3f3f3;
        }

        .vc-nav-item {
            padding: 5px;
            margin: 2px 0;
            background-color: transparent;
        }

        .vc-nav-item:hover {
            background-color: #f2f2f2;
        }

        .vc-nav-item.is-active {
            color: #fff;
            background-color: $color !important;
        }
    }
}
</style>