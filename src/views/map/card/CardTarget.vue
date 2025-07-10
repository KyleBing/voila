<template>
    <MapCard :isShow="isShow" :left="30" :top="100">
        <div class="target-container">
            <div class="target-item">
                <div class="title">距离</div>
                <div class="value">{{ currentDistance.toFixed(0) }} m</div>
            </div>
            <div class="target-item">
                <div class="title">高度</div>
                <div class="value">{{ currentAttitude }} km</div>
            </div>
            <div class="target-item">
                <div class="title">速度</div>
                <div class="value">{{ currentSpeed }} km/s</div>
            </div>
        </div>

    </MapCard>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import MapCard from "@/views/map/MapCard.vue"

interface Props {
    isShow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    isShow: false
})

// Reactive data
const handleTimeOut = ref<NodeJS.Timeout | null>(null)
const currentSpeed = ref(400) // km/h
const currentAttitude = ref(200) // km
const currentDistance = ref(2400000) // m

// Methods
const generateNewData = () => {
    currentSpeed.value = currentSpeed.value + getRandomGap(10)
    currentAttitude.value = currentAttitude.value + getRandomGap(5)
    currentAttitude.value = currentAttitude.value + getRandomGap(5)
    
    if (currentSpeed.value > 3000) {
        currentSpeed.value = 2999
    }
    if (currentAttitude.value > 1000) {
        currentAttitude.value = 1999
    }
    if (currentDistance.value > 0) {
        const currentSpeedPerSecond = currentSpeed.value * 1000 / 60 / 60 // m/s
        currentDistance.value = currentDistance.value - currentSpeedPerSecond
    }

    if (currentDistance.value <= 0) {
        currentDistance.value = 0
    }

    if (handleTimeOut.value) {
        clearTimeout(handleTimeOut.value)
    }
    handleTimeOut.value = setTimeout(generateNewData, 1000)
}

const getRandomGap = (baseGap: number): number => {
    return Number((Math.random() * baseGap).toFixed(0))
}

// Lifecycle hooks
onMounted(() => {
    generateNewData()
})

onUnmounted(() => {
    if (handleTimeOut.value) {
        clearTimeout(handleTimeOut.value)
    }
})
</script>

<style scoped lang="scss">
@import "../../../assets/scss/plugin";
.target-container{
    padding: 20px;
}
.target-item{
    display: flex;
    align-items: center;
    font-size: $fz-main;
    .title{
        color: white;
    }
    .value{
        flex-grow: 1;
        text-align: right;
        color: white;
        font-family: 'JetBrains Mono';
    }
}
</style>
