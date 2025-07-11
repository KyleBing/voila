<template>
    <div class="date-time">
        <div class="date-display">
            {{ formattedDate }}
        </div>
        <div class="time-display">
            {{ formattedTime }}
        </div>
    </div>
</template> 

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import dayjs from 'dayjs'

const currentDate = ref(dayjs())
let timer = null

const formattedDate = computed(() => {
    return currentDate.value.format('YYYY-MM-DD')
})

const formattedTime = computed(() => {
    return currentDate.value.format('HH:mm:ss')
})

const updateTime = () => {
    currentDate.value = dayjs()
}

onMounted(() => {
    updateTime()
    timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
    if (timer) {
        clearInterval(timer)
    }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_console.scss';

.date-time {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px 12px;
    background-color: $bg;
    border-radius: 4px;
    color: $text-main;
}

.date-display {
    font-size: 12px;
    font-weight: 400;
    color: $text-main;
    opacity: 0.8;
    font-family: 'DS-Digital', monospace;
}

.time-display {
    font-size: 24px;
    font-weight: 600;
    color: $text-main;
    font-family: 'DS-Digital', monospace;
    letter-spacing: 1px;
}
</style>
