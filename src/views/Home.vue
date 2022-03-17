<template>
    <div class="home" :style="`height: ${height}px; width: ${width}px`">
        <FloatingPanel title="demo">
            <Count/>
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
