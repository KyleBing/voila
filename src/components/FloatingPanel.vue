<template>
    <div class="floating-panel" :style="`top: ${top}px; left: ${left}px`">
        <div class="header">
            <div class="title">{{title}}</div>
            <div class="operations">
                <div class="operation-item"></div>
                <div class="operation-item"></div>
                <div class="operation-item"></div>
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
    data(){
        return {
            top: 0,
            left: 0,
        }
    },
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    mounted() {
    },

}
</script>

<style scoped lang="scss">
@import "src/assets/scss/plugin";
.floating-panel{
    position: absolute;
    @include border-radius(10px);
    overflow: hidden;
    background-color: transparentize($blue, 0.7);
    min-width: 400px;
    min-height: 200px;
    @extend .glass-blur
}
.header{
    padding: 5px;
    background-color: white;
    //background: linear-gradient(to top);
    position: relative;
    .operations{
        left: 5px;
        top: 5px;
        position: absolute;
        display: flex;
        justify-content: flex-start;
        .operation-item{
            margin-right: 8px;
            width: 20px;
            height: 20px;
            @include border-radius(20px);
            overflow: hidden;
            background-color: $blue;
            &:hover{
                background-color: $green;
            }
        }
    }
    .title{
        line-height: 20px;
        text-align: center;
    }
}

.body{
    padding: 10px;
}

</style>
