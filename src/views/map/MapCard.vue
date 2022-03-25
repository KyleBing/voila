<template>
    <transition
        :enter-active-class="`animate__animated ${animateInClass}`"
        :leave-active-class="`animate__animated ${animateOutClass} animate__fast`"
        appear-active-class=""
    >
        <div v-if="isShow" class="map-card" :style="`left: ${left}; top: ${top}`">
            <slot/>
        </div>
    </transition>
</template>

<script>
export default {
    name: "MapCard",
    props: {
        left: 0,
        top: 0,
        isShow: false,
        animateInClass: {
            type: String,
            default: 'animate__fadeInLeft'
        },
        animateOutClass: {
            type: String,
            default: 'animate__fadeOutLeft'
        }
    },
    data(){
        return {
            // isShow: false, // 用于触发 transition 动画
        }
    },
    mounted() {
        // this.isShow = true
    },

}
</script>

<style scoped lang="scss">
@import "../../assets/scss/plugin";
.map-card{
    height: 100%;
    width: 100%;
    background-color: transparentize($blue, 0.8);
    @extend .glass-blur;
    @include border-radius(3px);
}

</style>
