<template>
    <div class="switch-item">
        <div class="switch-item-title">{{ title }}</div>
        <CustomLightSwitch v-model="modelValue" :size="size" />
    </div>
</template>

<script setup lang="ts">
import CustomLightSwitch from './CustomLightSwitch.vue'

interface Props {
    title?: string
    size?: 'small' | 'medium' | 'large'
}

const modelValue = defineModel<boolean>('modelValue')

const props = withDefaults(defineProps<Props>(), {
    title: 'Switch Item',
    size: 'medium'
})

</script>

<style lang="scss" scoped>
@import '@/assets/scss/plugin';

.switch-item {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
}
.switch-item-title {
    font-size: 14px;
    color: $text-main;
}
</style>
