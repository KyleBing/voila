<template>
    <div class="slider-demo">
        <h3>Slider Component Demo</h3>
        
        <div class="demo-section">
            <h4>Different Sizes</h4>
            <div class="demo-row">
                <div class="demo-item">
                    <label>Tiny</label>
                    <CustomRangeSlider v-model="value1" size="tiny" />
                </div>
                <div class="demo-item">
                    <label>Small</label>
                    <CustomRangeSlider v-model="value2" size="small" />
                </div>
                <div class="demo-item">
                    <label>Medium</label>
                    <CustomRangeSlider v-model="value3" size="medium" />
                </div>
                <div class="demo-item">
                    <label>Large</label>
                    <CustomRangeSlider v-model="value4" size="large" />
                </div>
            </div>
        </div>
        
        <div class="demo-section">
            <h4>Different Ranges</h4>
            <div class="demo-row">
                <div class="demo-item">
                    <label>Temperature (°C)</label>
                    <CustomRangeSlider 
                        v-model="tempValue" 
                        :min="0" 
                        :max="100" 
                        unit="°C"
                        @change="handleTempChange"
                    />
                </div>
                <div class="demo-item">
                    <label>Volume (%)</label>
                    <CustomRangeSlider 
                        v-model="volumeValue" 
                        :min="0" 
                        :max="100" 
                        unit="%"
                        @change="handleVolumeChange"
                    />
                </div>
                <div class="demo-item">
                    <label>Brightness</label>
                    <CustomRangeSlider 
                        v-model="brightnessValue" 
                        :min="0" 
                        :max="255" 
                        :step="5"
                        @change="handleBrightnessChange"
                    />
                </div>
            </div>
        </div>
        
        <div class="demo-section">
            <h4>Custom Steps</h4>
            <div class="demo-row">
                <div class="demo-item">
                    <label>Step by 5</label>
                    <CustomRangeSlider 
                        v-model="stepValue" 
                        :min="0" 
                        :max="100" 
                        :step="5"
                        @change="handleStepChange"
                    />
                </div>
                <div class="demo-item">
                    <label>Step by 10</label>
                    <CustomRangeSlider 
                        v-model="stepValue2" 
                        :min="0" 
                        :max="100" 
                        :step="10"
                        @change="handleStepChange2"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CustomRangeSlider from './CustomRangeSlider.vue'

// Demo values
const value1 = ref(30)
const value2 = ref(50)
const value3 = ref(70)
const value4 = ref(80)

const tempValue = ref(25)
const volumeValue = ref(75)
const brightnessValue = ref(128)

const stepValue = ref(25)
const stepValue2 = ref(40)

// Event handlers
const handleTempChange = (value: number) => {
    console.log('Temperature changed to:', value)
}

const handleVolumeChange = (value: number) => {
    console.log('Volume changed to:', value)
}

const handleBrightnessChange = (value: number) => {
    console.log('Brightness changed to:', value)
}

const handleStepChange = (value: number) => {
    console.log('Step value changed to:', value)
}

const handleStepChange2 = (value: number) => {
    console.log('Step value 2 changed to:', value)
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/plugin";

.slider-demo {
    padding: 20px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    
    h3 {
        color: #fff;
        margin-bottom: 20px;
        text-align: center;
        font-size: 18px;
        font-weight: 600;
    }
    
    .demo-section {
        margin-bottom: 30px;
        
        h4 {
            color: #fff;
            margin-bottom: 15px;
            font-size: 16px;
            font-weight: 500;
        }
        
        .demo-row {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            
            .demo-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                min-width: 150px;
                
                label {
                    color: #fff;
                    font-size: 14px;
                    font-weight: 500;
                    text-align: center;
                }
            }
        }
    }
}
</style> 