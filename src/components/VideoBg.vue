<template>
<!--    <video src="../assets/video/bg-1.mp4"
           autoplay
           muted
           loop="true"
           :style="`min-width: ${insets.width}px; min-height: ${insets.height}px`">

    </video>-->
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
@import "src/assets/scss/plugin";
video{
    -webkit-filter: saturate(-30%);
    filter: saturate(-30%);

    z-index: -1;
    position: absolute;
    top: 50%;
    left: 50%;
    @include transform(translate(-50% , -50%))
}

</style>
