<template>
    <div class="count" ref="countUp">0</div>
</template>

<script>
import { CountUp } from "countup.js"
export default {
    name: "Count",
    props: {
        endVal: {
            type: Number,
            default: 100
        }
    },
    mounted() {
        setTimeout(()=>{
            let countUp = new CountUp(this.$refs.countUp, this.endVal, {

            })
            if (!countUp.error){
                countUp.start()
            } else {
                console.error(countUp.error);
            }
        }, 1000)

    }
}
</script>

<style scoped lang="scss">
.count{
    text-align: right;
    color: white;
    font-size: 80px;
    font-family: 'DS-Digital';
}

</style>
