<template>
    <div class="home" :style="`height: ${insets.height}px; width: ${insets.width}px`">
        <FloatingPanel
            :left="20*item"
            :top="20*item"
            :title="`demo-${item}`"
            v-for="item in 4" :key="item">
            <Count :end-val="34 * item"/>
        </FloatingPanel>

        <CardCoding/>
        <CardThreejs/>
        <FloatingPanel :left="700" :top="500">
            <LoadingCircle/>
        </FloatingPanel>
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


export default {
    name: 'Home',
    components: {
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
