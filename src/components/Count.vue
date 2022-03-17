<template>
    <div class="count" ref="countUp">0</div>

</template>

<script>
import { CountUp } from "countup.js"
export default {
    name: "Count",
    mounted() {
        setTimeout(()=>{
            let countUp = new CountUp(this.$refs.countUp, 537, {

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
    color: white;
    font-size: 150px;
    font-family: 'DS-Digital';
}

</style>
