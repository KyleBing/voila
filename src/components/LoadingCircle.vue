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

$height-circle: 150px;

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

$lv1-size: $height-circle * 0.80;
.lv1{
    border-top: $lv1-size/2 solid $blue;
    border-bottom: $lv1-size/2 solid $purple;
    width: $lv1-size;
    height: $lv1-size;
    @include transform(translate(-($lv1-size/2), -($lv1-size/2)));
    animation: rotate-1 infinite 4s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
}

$lv2-size: $height-circle * 0.50;
.lv2{
    border-right: $lv2-size/2 solid $yellow;
    border-left: $lv2-size/2 solid $green;
    width: $lv2-size;
    height: $lv2-size;
    @include transform(translate(-($lv2-size/2), -($lv2-size/2)));
    animation: rotate-2 infinite 2s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
}

$lv3-size: $height-circle * 0.3;
.lv3{
    border-top: $lv3-size/2 solid $magenta;
    border-bottom: $lv3-size/2 solid white;
    width: $lv3-size;
    height: $lv3-size;
    @include transform(translate(-($lv3-size/2), -($lv3-size/2)));
    animation: rotate-3 infinite 3s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
}

@keyframes rotate-1 {
    from {transform-origin: 0 0;transform: rotate(0deg) translate(-($lv1-size/2), -($lv1-size/2))}
    to {transform-origin: 0 0;transform: rotate(360deg) translate(-($lv1-size/2), -($lv1-size/2))}
}
@-webkit-keyframes rotate-1 {
    from {transform-origin: 0 0;transform: rotate(0deg) translate(-($lv1-size/2), -($lv1-size/2))}
    to {transform-origin: 0 0;transform: rotate(360deg) translate(-($lv1-size/2), -($lv1-size/2))}
}

@keyframes rotate-2 {
    from {transform-origin: 0 0;transform: rotate(0deg) translate(-($lv2-size/2), -($lv2-size/2))}
    to {transform-origin: 0 0;transform: rotate(-360deg) translate(-($lv2-size/2), -($lv2-size/2))}
}
@-webkit-keyframes rotate-2 {
    from {transform-origin: 0 0;transform: rotate(0deg) translate(-($lv2-size/2), -($lv2-size/2))}
    to {transform-origin: 0 0;transform: rotate(-360deg) translate(-($lv2-size/2), -($lv2-size/2))}
}

@keyframes rotate-3 {
    from {transform-origin: 0 0;transform: rotate(0deg) translate(-($lv3-size/2), -($lv3-size/2))}
    to {transform-origin: 0 0;transform: rotate(360deg) translate(-($lv3-size/2), -($lv3-size/2))}
}
@-webkit-keyframes rotate-3 {
    from {transform-origin: 0 0;transform: rotate(0deg) translate(-($lv3-size/2), -($lv3-size/2))}
    to {transform-origin: 0 0;transform: rotate(360deg) translate(-($lv3-size/2), -($lv3-size/2))}
}

</style>
