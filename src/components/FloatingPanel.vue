<template>
    <transition
        :enter-active-class="`animate__animated ${animateInClass || ''}`"
        leave-active-class="animate__animated animate__bounceOutDown animate__fast"
        appear-active-class=""
    >
        <div class="floating-panel shadow"
             v-show="isShow"
             :style="`
                 z-index: ${zIndex};
                 top: ${positionY}px;
                 left: ${positionX}px;
                 width: ${cardWidth}px;
                 ${cardHeight? 'height: ' + cardHeight + 'px': ''};
             `"
        >
            <div class="header" ref="header" @click="updatePanelZIndex">
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

<script>

import interact from 'interactjs'
import {mapMutations, mapState} from "vuex";

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
        width: {// 面板宽度
            type: Number,
            default: 400
        },
        height: {// 面板高度
            type: Number,
            default: 0
        },
        noPadding: {
            type: Boolean,
            default: false
        },
        animateInClass: {
            type: String,
            default: 'animate__fadeInTopLeft'
        }
    },
    data(){
        return {
            oldPositionX: 0,
            oldPositionY: 0,
            positionX: 0,
            positionY: 0,
            cardWidth: 0,
            cardHeight: 0,
            isMouseDown: false,
            isShow: false, // 用于触发 transition 动画
            zIndex: 1 // z-index
        }
    },
    mounted() {
        this.isShow = true
        this.cardWidth = this.width
        this.cardHeight = this.height

        this.positionY = this.top || 0
        this.positionX = this.left || 0

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
                    // 拖动开始
                    start: this.updatePanelZIndex,
                    // 拖动中
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
        ...mapMutations(['SET_LATEST_Z_INDEX']),
        // 更新当前卡片的 z-index 在点击 .header 或拖动 .header 的时候都会触发
        updatePanelZIndex(){
            this.zIndex = this.lastZIndex + 1
            this.SET_LATEST_Z_INDEX(this.zIndex)
        },
        dragMoveListener(event){
            // console.log(event)
            this.positionX = this.positionX + event.dx
            this.positionY = this.positionY + event.dy
            // console.log(this.positionX, this.positionY)
        },
        closePanel(){
            this.isShow = false
        },
        fillWindow(){
            if (this.insets.width === this.cardWidth){ // 已全屏
                this.positionX = this.oldPositionX
                this.positionY = this.oldPositionY
                this.cardHeight = this.height
                this.cardWidth = this.width
            } else {
                this.cardHeight = this.insets.height
                this.cardWidth = this.insets.width
                this.oldPositionX = this.positionX
                this.oldPositionY = this.positionY
                this.positionX = 0
                this.positionY = 0
            }
        }
    },
    computed: {
        ...mapState(['insets', 'lastZIndex']),
        bodyStyle(){ // 计算 body 的样式
            let styleList = []
            styleList.push(this.backgroundColor? `background-color: ${this.backgroundColor}`: '' )
            styleList.push(this.noPadding?'padding: 0' : 'padding: 20px')
            styleList.push(this.backgroundColor === 'black'?'border-color: #444' : '')
            return styleList.join('; ')
        }
    }

}
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
