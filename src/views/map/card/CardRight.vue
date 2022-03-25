<template>
    <MapCard
        animate-in-class="animate__fadeInRight"
        animate-out-class="animate__fadeOutRight"
        :isShow="isShow" :left="30" :top="100">
        <div class="target-container">
            <div class="target-item">
                <div class="title">距离</div>
                <div class="value">2135 km</div>
            </div>
            <div class="target-item">
                <div class="title">高度</div>
                <div class="value">2135 km</div>
            </div>
        </div>

    </MapCard>
</template>

<script>
import MapCard from "@/views/map/MapCard";
export default {
    name: "CardRight",
    components: {MapCard},
    props: {
        isShow: false
    }
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/plugin";
.target-container{
    padding: 20px;
}
.target-item{
    display: flex;
    align-items: center;
    .title{
        color: white;
    }
    .value{
        flex-grow: 1;
        text-align: right;
        font-size: 2rem;
        color: white;
        font-family: 'DS-Digital';
    }
}
</style>
