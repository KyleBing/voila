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

<script setup lang="ts">
interface Props {
    left?: string | number
    top?: string | number
    isShow?: boolean
    animateInClass?: string
    animateOutClass?: string
}

const props = withDefaults(defineProps<Props>(), {
    left: 0,
    top: 0,
    isShow: false,
    animateInClass: 'animate__fadeInLeft',
    animateOutClass: 'animate__fadeOutLeft'
})
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
