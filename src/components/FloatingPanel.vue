<template>
    <transition
        enter-active-class="animate__animated animate__fadeInTopLeft"
        leave-active-class="animate__animated animate__bounceOutDown"
    >
        <div class="floating-panel" v-show="isShow" :style="`top: ${positionY}px; left: ${positionX}px; width: ${width}px`">
            <div class="header" ref="header">
                <div class="title">{{title}}</div>
                <div class="operations">
                    <div class="operation-item close"></div>
                    <div class="operation-item mini"></div>
                    <div class="operation-item fullscreen"></div>
                </div>
            </div>
            <div class="body" :style="backgroundColor? `background-color: ${backgroundColor}`: ''">
                <slot/>
            </div>
        </div>
    </transition>

</template>

<script>

import interact from 'interactjs'

export default {
    name: "FloatingPanel",
    props: {
        title: {
            type: String,
            default: ''
        },
        top: 0,
        left: 0,
        backgroundColor: '',
        width: {
            type: Number,
            default: 400
        } // 面板宽度
    },
    data(){
        return {
            positionX: 0,
            positionY: 0,
            isMouseDown: false,
            isShow: false // 用于触发 transition 动画
        }
    },
    mounted() {
        this.isShow = true

        this.positionY = this.top
        this.positionX = this.left

        interact(this.$refs.header)
            .draggable({
                // enable inertial throwing
                inertia: true,
                // 是否保持 dom 元素在其父 dom 中
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: 'parent',
                        endOnly: true
                    })
                ],
                // enable autoScroll
                autoScroll: true,

                listeners: {
                    // 移动事件
                    move: this.dragMoveListener,

                    // 移动结束事件
                    end: this.dragMoveListener
                }
            })
        window.dragMoveListener = this.dragMoveListener
    },
    beforeUnmount() {
        this.$refs.header.removeEventListener('mouseup', null)
        this.$refs.header.removeEventListener('mousedown', null)
        this.$refs.header.removeEventListener('mousemove', null)
    },
    methods: {
        dragMoveListener(event){
            // console.log(event)
            this.positionX = this.positionX + event.dx
            this.positionY = this.positionY + event.dy
            console.log(this.positionX, this.positionY)
        },
    }

}
</script>

<style scoped lang="scss">
@use "sass:math";
@import "src/assets/scss/plugin";

$height-header: 24px;
$padding-header: 4px;
$height-operations: 14px;

.floating-panel{
    position: absolute;
    min-width: 400px;
    min-height: 200px;
}
.header{
    @include border-radius(10px 10px 0 0 );
    border: 1px solid $border;
    border-bottom: none;
    padding: $padding-header;
    background-color: $bg-panel-header;
    position: relative;
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
            overflow: hidden;
            &.close{
                background: linear-gradient(to top, $red, lighten($red, 10%)) ;
                &:hover{
                    background: darken(saturate($red, 20%), 0.2);
                }
            }
            &.mini{
                background: linear-gradient(to top, $orange, lighten($orange, 10%)) ;
                &:hover{
                    background: darken(saturate($orange, 20%), 0.2);
                }
            }
            &.fullscreen{
                background: linear-gradient(to top, $green, lighten($green, 10%)) ;
                &:hover{
                    background: darken(saturate($green, 20%), 0.2);
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
    background-color: transparentize($blue, 0.4);
    @extend .glass-blur
}

</style>
