<template>
    <div class="home" :style="`height: ${projectStore.insets.height}px; width: ${projectStore.insets.width}px`">
        <FloatingPanel
            :left="20*item"
            :top="20*item"
            :title="`demo-${item}`"
            v-for="item in 8" :key="item">
            <Count :end-val="2358 * item"/>
        </FloatingPanel>

        <CardCoding/>
        <CardThreejs/>
        <CardLoadingCircle/>
<!--        <VideoBg/>-->
    </div>
</template>

<script setup >
import Count from "@/components/Count.vue";
import FloatingPanel from "@/components/FloatingPanel.vue";
import VideoBg from "@/components/VideoBg.vue";
import CardCoding from "@/cards/CardCoding.vue";
import CardThreejs from "@/cards/CardThreejs.vue";

import LoadingCircle from "@/components/LoadingCircle.vue";
import CardLoadingCircle from "@/cards/CardLoadingCircle.vue";

import { useProjectStore } from "@/useProjectStore";
const projectStore = useProjectStore()
</script>

<style lang="scss" scoped>
.home {
    background-color: gray;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
