<template>
    <MapCard :isShow="isShow" :left="30" :top="100">
        <div class="target-container">
            <div class="target-item">
                <div class="title">距离</div>
                <div class="value">{{ this.currentDistance.toFixed(0) }} m</div>
            </div>
            <div class="target-item">
                <div class="title">高度</div>
                <div class="value">{{ this.currentAttitude }} km</div>
            </div>
            <div class="target-item">
                <div class="title">速度</div>
                <div class="value">{{ this.currentSpeed }} km/s</div>
            </div>
        </div>

    </MapCard>
</template>

<script>
import MapCard from "@/views/map/MapCard";
export default {
    name: "CardTarget",
    components: {MapCard},
    props: {
        isShow: false
    },
    data(){
        return {
            handleTimeOut: null,
            currentSpeed: 400, // km/h
            currentAttitude: 200, // km
            currentDistance: 2400000, // m
        }
    },
    mounted() {
        this.generateNewData()
    },
    beforeUnmount() {

    },
    methods: {
        generateNewData(){
            this.currentSpeed = this.currentSpeed + this.getRandomGap(10)
            this.currentAttitude = this.currentAttitude + this.getRandomGap(5)
            this.currentAttitude = this.currentAttitude + this.getRandomGap(5)
            if (this.currentSpeed > 3000){
                this.currentSpeed = 2999
            }
            if (this.currentAttitude > 1000){
                this.currentAttitude = 1999
            }
            if (this.currentDistance > 0){
                let currentSpeedPerSecond = this.currentSpeed * 1000 / 60 / 60 // m/s
                this.currentDistance = this.currentDistance - currentSpeedPerSecond
            }

            if (this.currentDistance <=0){
                this.currentDistance = 0
            }

            if (this.handleTimeOut){
                clearTimeout(this.handleTimeOut)
            }
            this.handleTimeOut = setTimeout(this.generateNewData,1000)
        },
        getRandomGap(baseGap){
            return Number((Math.random() * baseGap).toFixed(0))
        }
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
    font-size: $fz-main;
    .title{
        color: white;
    }
    .value{
        flex-grow: 1;
        text-align: right;
        color: white;
        font-family: 'JetBrains Mono';
    }
}
</style>
