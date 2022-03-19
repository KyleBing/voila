<template>
    <div class="home" :style="`height: ${insets.height}px; width: ${insets.width}px`">
        <FloatingPanel
            :left="20*item"
            :top="20*item"
            :title="`demo-${item}`"
            v-for="item in 4" :key="item">
            <Count :end-val="2358 * item"/>
        </FloatingPanel>

        <CardCoding/>
        <CardThreejs/>
        <CardLoadingCircle/>
        <VideoBg/>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Count from "@/components/Count";
import FloatingPanel from "@/components/FloatingPanel";
import VideoBg from "@/components/VideoBg";
import CardCoding from "@/cards/CardCoding";
import CardThreejs from "@/cards/CardThreejs";

import LoadingCircle from "@/components/LoadingCircle";
import CardLoadingCircle from "@/cards/CardLoadingCircle";


export default {
    name: 'Home',
    components: {
        CardLoadingCircle,
        LoadingCircle,
        CardThreejs,
        CardCoding,
        VideoBg,
        FloatingPanel,
        Count
    },
    computed: {
        ...mapState(['insets'])
    }
}
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
