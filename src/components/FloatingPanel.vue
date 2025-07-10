<template>
    <transition
        :enter-active-class="`animate__animated ${animateInClass || ''}`"
        leave-active-class="animate__animated animate__bounceOutDown animate__fast"
        appear-active-class=""
    >
        <div class="floating-panel shadow"
             @click="updatePanelZIndex"
             v-show="isShow"
             :style="`
                 z-index: ${zIndex};
                 top: ${positionY}px;
                 left: ${positionX}px;
                 width: ${cardWidth}px;
                 ${cardHeight? 'height: ' + cardHeight + 'px': ''};
             `"
        >
            <div class="header" ref="header">
                <div class="title">{{title || 'title'}}</div>
                <div class="operations">
                    <div class="operation-item close" @click="closePanel"></div>
                    <div class="operation-item mini" @click="closePanel"></div>
                    <div class="operation-item fullscreen" @click="fillWindow"></div>
                </div>
            </div>
            <div class="body" :style="bodyStyle">
                <slot/>
            </div>
        </div>
    </transition>

</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import interact from 'interactjs'

import { useProjectStore } from "@/store/useProjectStore";
const projectStore = useProjectStore()


interface Props {
    title?: string
    top?: number
    left?: number
    backgroundColor?: string
    width?: number
    height?: number
    noPadding?: boolean
    animateInClass?: string
}
const props = withDefaults(defineProps<Props>(), {
    title: '',
    top: 0,
    left: 0,
    backgroundColor: '',
    width: 400,
    height: 0,
    noPadding: false,
    animateInClass: 'animate__fadeInTopLeft'
})

const header = ref<HTMLElement | null>(null)
const oldPositionX = ref(0)
const oldPositionY = ref(0)
const positionX = ref(0)
const positionY = ref(0)
const cardWidth = ref(props.width)
const cardHeight = ref(props.height)
const isMouseDown = ref(false)
const isShow = ref(false)
const zIndex = ref(1)

onMounted(() => {
    isShow.value = true
    cardWidth.value = props.width
    cardHeight.value = props.height
    positionY.value = props.top || 0
    positionX.value = props.left || 0
    if (header.value) {
        interact(header.value)
            .draggable({
                inertia: true,
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: 'parent',
                        endOnly: true
                    })
                ],
                autoScroll: true,
                listeners: {
                    start: updatePanelZIndex,
                    move: dragMoveListener,
                    end: dragMoveListener
                }
            })
    }
    // @ts-ignore
    window.dragMoveListener = dragMoveListener
})

onBeforeUnmount(() => {
    // Clean up interactjs listeners if needed
})

const updatePanelZIndex = () => {
    zIndex.value = projectStore.lastZIndex + 1
    projectStore.lastZIndex = zIndex.value
}

const dragMoveListener = (event: any) => {
    positionX.value = positionX.value + event.dx
    positionY.value = positionY.value + event.dy
}

const closePanel = () => {
    isShow.value = false
}

const fillWindow = () => {
    if (projectStore.insets.width === cardWidth.value) {
        positionX.value = oldPositionX.value
        positionY.value = oldPositionY.value
        cardHeight.value = props.height
        cardWidth.value = props.width
    } else {
        cardHeight.value = projectStore.insets.height
        cardWidth.value = projectStore.insets.width
        oldPositionX.value = positionX.value
        oldPositionY.value = positionY.value
        positionX.value = 0
        positionY.value = 0
    }
}

const bodyStyle = computed(() => {
    const styleList = []
    styleList.push(props.backgroundColor ? `background-color: ${props.backgroundColor}` : '')
    styleList.push(props.noPadding ? 'padding: 0' : 'padding: 20px')
    styleList.push(props.backgroundColor === 'black' ? 'border-color: #444' : '')
    return styleList.join('; ')
})
</script>

<style scoped lang="scss">
@use "sass:math";
@import "src/assets/scss/plugin";

$height-header: 24px;
$padding-header: 4px;
$height-operations: 13px;

.floating-panel{
    position: absolute;
    min-width: 300px;
    min-height: 100px;
    overflow: hidden;
    @include border-radius(10px);
    &.shadow{
        @include box-shadow(2px 2px 15px rgba(0,0,0,0.2))
    }
}
.header{
    border: 1px solid $border;
    border-bottom: none;
    padding: $padding-header;
    background-color: $bg-panel-header;
    @include border-radius(10px 10px 0 0 );
    position: relative;
    &:hover{
        background-color: white;
    }
    .operations{
        left: math.div($height-header - $height-operations, 2);
        top: math.div($height-header - $height-operations, 2);
        position: absolute;
        display: flex;
        justify-content: flex-start;
        .operation-item{
            margin-right: 8px;
            width: $height-operations;
            height: $height-operations;
            @include border-radius(20px);
            cursor: default;
            overflow: hidden;
            &.close{
                background: linear-gradient(to top, $red, lighten($red, 10%)) ;
                &:hover{
                    background: darken(saturate($red, 20%), 10%);
                }
            }
            &.mini{
                background: linear-gradient(to top, $orange, lighten($orange, 10%)) ;
                &:hover{
                    background: darken(saturate($orange, 20%), 10%);
                }
            }
            &.fullscreen{
                background: linear-gradient(to top, $green, lighten($green, 10%)) ;
                &:hover{
                    background: darken(saturate($green, 20%), 15%);
                }
            }
        }
    }
    .title{
        font-size: 12px;
        line-height: $height-header - $padding-header * 2 ;
        text-align: center;
    }
    &:hover{
        background-color: $bg-panel-header-active;
    }
}

.body{
    overflow: hidden;
    @include border-radius(0 0 10px 10px );
    border: 1px solid transparentize($blue, 0.8);
    border-top: none;
    padding: 10px;
    height: 100%;
    background-color: transparentize($blue, 0.4);
    @extend .glass-blur
}

</style>
