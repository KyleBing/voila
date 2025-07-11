<template>
    <div class="console-header" :style="`height: ${projectStore.headerHeight}px;`">
        <div class="header-left">
        </div>
        <div class="header-center">
            <div class="header-center-title">Console Center</div>
        </div>
        <div class="header-right">
            <DateTime />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useProjectStore } from '@/useProjectStore'
import DateTime from './Parts/DateTime.vue'

const projectStore = useProjectStore()
</script>

<style lang="scss" scoped>
@import '@/assets/scss/plugin';


.console-header {
    text-align: center;
    width: 100%;
    color: $text-main;
    background-color: $bg;
    border-bottom: 1px solid $border-color;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
}
.console-header-title {
    font-size: 20px;
    font-weight: bold;
    color: $text-main;
}
</style>
