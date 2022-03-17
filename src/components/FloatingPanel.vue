<template>
    <div class="floating-panel" :style="`top: ${positionY}px; left: ${positionX}px`">
        <div class="header" draggable="true" ref="header">
            <div class="title">{{title}}</div>
            <div class="operations">
                <div class="operation-item close"></div>
                <div class="operation-item mini"></div>
                <div class="operation-item fullscreen"></div>
            </div>
        </div>
        <div class="body">
            <slot/>
        </div>
    </div>
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
        left: 0
    },
    data(){
        return {
            positionX: 0,
            positionY: 0
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

$height-header: 30px;
$padding-header: 5px;
$height-operations: 16px;

.floating-panel{
    position: absolute;
    min-width: 400px;
    min-height: 200px;
}
.header{
    @include border-radius(10px 10px 0 0 );
    border: 1px solid $item-border-color;
    border-bottom: none;
    padding: $padding-header;
    background-color: white;
    position: relative;
    cursor: move;
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
                background-color: $red;
            }
            &.mini{
                background-color: $orange;
            }
            &.fullscreen{
                background-color: $green;
            }
            &:hover{
                background-color: $green;
            }
        }
    }
    .title{
        line-height: $height-header - $padding-header * 2 ;
        text-align: center;
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
