<template>
    <video src="../assets/video/bg-1.mp4"
           autoplay
           muted
           loop="true"
           :style="`width: ${width}px; height: ${height}px`">

    </video>
</template>

<script>
export default {
    name: "VideoBg",
    data(){
        return {
            width: 1920,
            height: 1080
        }
    },
    mounted() {

    },

}
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
