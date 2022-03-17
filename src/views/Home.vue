<template>
    <div class="home" :style="`height: ${height}px; width: ${width}px`">
        <FloatingPanel
            :left="20*item"
            :top="20*item"
            :title="`demo-${item}`"
            v-for="item in 10" :key="item">
            <Count :end-val="34 * item"/>
        </FloatingPanel>

        <VideoBg/>
    </div>
</template>

<script>

import Count from "@/components/Count";
import FloatingPanel from "@/components/FloatingPanel";
import VideoBg from "@/components/VideoBg";

export default {
    name: 'Home',
    components: {
        VideoBg,
        FloatingPanel,
        Count
    },
    data(){
        return {
            height: 1080,
            width: 1920
        }
    },
    mounted() {
        this.height = innerHeight
        this.width = innerWidth
    }
}
</script>

<style lang="scss" scoped>
.home {
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
