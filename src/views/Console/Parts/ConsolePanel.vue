<template>
    <div class="console-panel" :class="{ 'rounded': isRounded, 'border': isShowBorder }">
        <div class="console-panel-header">
            <div class="console-panel-title">{{ title }}</div>
        </div>
        <div class="console-panel-body" :style="{ padding: padding }">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    title?: string
    padding?: string
    isRounded?: boolean
    isShowBorder?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    title: 'Console Panel',
    padding: '10px',
    isRounded: false,
    isShowBorder: false
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/plugin';

.console-panel {
    border-top: 1px solid $border-color;
    border-bottom: 1px solid black;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
    &.rounded {
        .console-panel-header {
            border-radius: 10px 10px 0 0;
        }
        .console-panel-body {
            border-radius: 0 0 10px 10px;
        }
    }
    &.border {
        .console-panel-header {
            border: 1px solid $border-color;
        }
        .console-panel-body {
            border: 1px solid $border-color;
        }
    }
    &:hover {
        background-color: $bg-hover;
    }
}   
.console-panel-header {
    font-family: Galvj;
    padding: 3px 10px;
    width: 100%;
    height: 30px;
    background-color: $bg;
}
.console-panel-title {
    font-size: 16px;
    font-weight: bold;
    color: $text-main;
}
.console-panel-body {
    border-top: none;
    width: 100%;
    height: 100%;
}

</style>
