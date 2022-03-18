<template>
    <div class="loading-circle">
        <div class="lv1"></div>
        <div class="lv2"></div>
        <div class="lv3"></div>

    </div>
</template>

<script>
export default {
    name: "LoadingCircle",
    data(){
        return {

        }
    },
    mounted() {
    },

}
</script>

<style scoped lang="scss">
@import "../assets/scss/plugin";

$height-circle: 200px;

.loading-circle{
    margin: 0 auto;
    position: relative;
    height: $height-circle;
    width: $height-circle;
}
.lv1,.lv2,.lv3{
    @include border-radius(100px);
    position: absolute;
    top: 50%;
    left: 50%;
}

.lv1{
    $lv-size: $height-circle * 0.60;
    border-right: $lv-size/2 solid $blue;
    border-left: $lv-size/2 solid $purple;
    width: $lv-size;
    height: $lv-size;
    @include transform(translate(-($lv-size/2), -($lv-size/2)));
    animation: rotate infinite 1s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
}
.lv2{
    $lv-size: $height-circle * 0.40;
    border-right: $lv-size/2 solid $red;
    border-left: $lv-size/2 solid $orange;
    width: $lv-size;
    height: $lv-size;
    @include transform(translate(-($lv-size/2), -($lv-size/2)));
    animation: rotate infinite 1.5s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
}
.lv3{
    $lv-size: $height-circle * 0.26;
    border-right: $lv-size/2 solid $green;
    border-left: $lv-size/2 solid $yellow;
    width: $lv-size;
    height: $lv-size;
    @include transform(translate(-($lv-size/2), -($lv-size/2)));
    animation: rotate infinite 2s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
}

@keyframes rotate {
    from {
        transform-origin: 50% 50%;
        transform: rotate(0deg)
    }
    to {
        transform-origin: 50% 50%;
        transform: rotate(360deg)
    }
}
@-webkit-keyframes rotate {
    from {
        transform-origin: 50% 50%;
        transform: rotate(0deg)
    }
    to {
        transform-origin: 50% 50%;
        transform: rotate(360deg)
    }
}

</style>
