<template>
    <div class="console">
        <ConsoleHeader/>
        <div class="console-body">
            <div class="cols" :style="`height: ${projectStore.insets.height - projectStore.headerHeight}px;`">
                <div class="col" v-for="col in cols" :key="col.title">
                    <div class="panel-list">
                        <ConsolePanel 
                            v-for="panel in col.panels" :key="panel.title" 
                            :title="panel.title" 
                            :is-show-border="false"
                        >
                            <SwitchItem 
                                v-for="switchItem in panel.switches" 
                                :key="switchItem.id" 
                                :title="switchItem.name"
                                size="small" 
                                v-model="switchValue"
                            />
                            <CustomRangeSlider v-model="rangeValue"/>
                        </ConsolePanel>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ConsoleHeader from './ConsoleHeader.vue'
import ConsolePanel from './Parts/ConsolePanel.vue'

import SwitchItem from './Parts/SwitchItem.vue' 
import CustomRangeSlider from './Parts/CustomRangeSlider.vue'

import { useProjectStore } from '@/useProjectStore'
import { cols } from './data/consoleData'

const projectStore = useProjectStore()
const switchValue = ref(false)
const rangeValue = ref(0)

</script>

<style lang="scss" scoped>
@import '@/assets/scss/plugin';

.console {
    // background-image: url('/src/assets/img/bg_paper.png');
    // background-repeat: repeat;
    height: 100%;
    width: 100%;
}
.console-body {
    height: calc(100% - 80px);
    width: 100%;
}
.panel-list {
}


.cols {
    flex-flow: row nowrap;
    display: flex;
    align-items: stretch;
    // gap: 10px;
}  
.col {
    height: 100%;
    border-right: 1px solid $border-color-col;
    width: 12.5%;
    background-color: $bg-col;
    &:last-child {
        border-right: none;
    }
}


</style>
