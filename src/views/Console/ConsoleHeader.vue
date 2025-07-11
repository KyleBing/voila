<template>
    <div class="console-header" :style="`height: ${projectStore.headerHeight}px;`">
        <div class="console-header-title">Console Header</div>
    </div>
</template>

<script setup lang="ts">
import { useProjectStore } from '@/useProjectStore'

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
}
.console-header-title {
    font-size: 20px;
    font-weight: bold;
    color: $text-main;
}
</style>
