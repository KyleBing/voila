<template>
    <div class="count" ref="countUp">0</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {CountUp} from 'countup.js'

interface Props {
    endVal?: number
}
const props = withDefaults(defineProps<Props>(), {
    endVal: 100
})

const countUp = ref<HTMLElement | null>(null)

onMounted(() => {
    setTimeout(() => {
        if (countUp.value) {
            const countUpInstance = new CountUp(countUp.value, props.endVal)
            if (!countUpInstance.error) {
                countUpInstance.start()
            } else {
                console.error(countUpInstance.error)
            }
        }
    }, 1000)
})
</script>

<style scoped lang="scss">
.count{
    text-align: right;
    color: white;
    font-size: 80px;
    font-family: 'DS-Digital';
}

</style>
