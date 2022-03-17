<template>
    <transition
        enter-active-class="animate__animated animate__backInDown"
        leave-active-class="animate__animated animate__bounceOutRight"
    >
        <div class="floating-panel" :style="`top: ${positionY}px; left: ${positionX}px; width: ${width}px`">
            <div class="header" draggable="true" ref="header">
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
        }
    },
    mounted() {
        this.positionY = this.top
        this.positionX = this.left

        this.$refs.header.addEventListener('dragstart', event => {
        })
        this.$refs.header.addEventListener('dragend', event => {
            this.positionX = event.offsetX + this.positionX - event.target.offsetWidth / 2
            this.positionY = event.offsetY + this.positionY - event.target.offsetHeight / 2
        })
        this.$refs.header.addEventListener('drag', event => {
            this.positionX = event.offsetX + this.positionX - event.target.offsetWidth / 2
            this.positionY = event.offsetY + this.positionY - event.target.offsetHeight / 2

        })
    },
    beforeUnmount() {
        this.$refs.header.removeEventListener('mousedown', null)
        this.$refs.header.removeEventListener('mouseup', null)
        this.$refs.header.removeEventListener('mousemove', null)
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
