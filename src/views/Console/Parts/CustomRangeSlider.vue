<template>
    <div 
        class="custom-range-slider"
        :class="{ [`size-${size}`]: true }"
    >
        <div class="slider-container">
            <div class="value-display">
                {{ Math.round(model) }}{{ unit }}
            </div>
            <div class="slider-track" ref="sliderRef" @click="handleTrackClick" @touchstart="handleTrackClick">
                <div 
                    class="slider-fill" 
                    :style="{ width: `${percentage}%` }"
                ></div>
                <div 
                    class="slider-thumb"
                    :style="{ left: `${percentage}%` }"
                    @mousedown="startDragging"
                    @touchstart="startDragging"
                ></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
    min?: number
    max?: number
    step?: number
    unit?: string
    size?: 'tiny' | 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
    min: 0,
    max: 100,
    step: 1,
    unit: '',
    size: 'medium'
})

const model = defineModel<number>({ default: 50 })

const emit = defineEmits(['change', 'input'])

const isDragging = ref(false)
const sliderRef = ref<HTMLElement>()

// Calculate percentage for positioning
const percentage = computed(() => {
    return ((model.value - props.min) / (props.max - props.min)) * 100
})

// Handle track click
const handleTrackClick = (event: MouseEvent | TouchEvent) => {
    if (isDragging.value) return
    
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
    const clickX = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100))
    updateValueFromPercentage(percentage)
}

// Start dragging
const startDragging = (event: MouseEvent | TouchEvent) => {
    event.preventDefault()
    event.stopPropagation()
    isDragging.value = true
    
    // Immediately update the value to the current position
    if (sliderRef.value) {
        const rect = sliderRef.value.getBoundingClientRect()
        const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
        const clickX = clientX - rect.left
        const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100))
        updateValueFromPercentage(percentage)
    }
    
    if (event instanceof MouseEvent) {
        document.addEventListener('mousemove', handleDrag, { passive: false })
        document.addEventListener('mouseup', stopDragging, { passive: false })
    } else {
        document.addEventListener('touchmove', handleDrag, { passive: false })
        document.addEventListener('touchend', stopDragging, { passive: false })
    }
}

// Handle dragging
const handleDrag = (event: MouseEvent | TouchEvent) => {
    if (!isDragging.value || !sliderRef.value) return
    
    event.preventDefault()
    
    const rect = sliderRef.value.getBoundingClientRect()
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
    const clickX = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100))
    
    updateValueFromPercentage(percentage)
}

// Stop dragging
const stopDragging = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', handleDrag)
    document.removeEventListener('mouseup', stopDragging)
    document.removeEventListener('touchmove', handleDrag)
    document.removeEventListener('touchend', stopDragging)
}

// Update value from percentage
const updateValueFromPercentage = (percentage: number) => {
    const value = props.min + (percentage / 100) * (props.max - props.min)
    const steppedValue = Math.round(value / props.step) * props.step
    const clampedValue = Math.max(props.min, Math.min(props.max, steppedValue))
    
    model.value = clampedValue
    emit('input', clampedValue)
    emit('change', clampedValue)
}

// Cleanup on unmount
onUnmounted(() => {
    stopDragging()
})
</script>

<style scoped lang="scss">
@import "../../../assets/scss/plugin";

$active-color: #00b451;
.custom-range-slider {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    cursor: pointer;
    user-select: none;
    position: relative;
    
    .slider-container {
        flex-grow: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;
        padding: 8px 12px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid $border-color-secondary;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        
        &:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: $border-color-secondary;
        }
        
        .slider-track {
            position: relative;
            width: 120px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 2px;
            cursor: pointer;
            transition: all 0.2s ease;
            touch-action: none;
            
            &:hover {
                background: rgba(255, 255, 255, 0.4);
            }
            
            .slider-fill {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                background: linear-gradient(90deg, $active-color, $active-color);
                border-radius: 2px;
                transition: width 0.1s ease;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            }
            
            .slider-thumb {
                position: absolute;
                top: 50%;
                width: 16px;
                height: 16px;
                background: #fff;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                transition: all 0.2s ease;
                touch-action: none;
                
                &:hover {
                    transform: translate(-50%, -50%) scale(1.1);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
                }
                
                &:active {
                    cursor: pointer;
                    transform: translate(-50%, -50%) scale(1.15);
                }
            }
        }
        
        .value-display {
            min-width: 40px;
            text-align: center;
            font-weight: 600;
            font-size: 12px;
            color: #fff;
            padding: 2px 6px;
            transition: all 0.2s ease;
            
            &:hover {
                transform: scale(1.05);
            }
        }
    }
    
    // Size variants
    &.size-tiny {
        .slider-container {
            padding: 4px 8px;
            gap: 8px;
            
            .slider-track {
                width: 80px;
                height: 3px;
                
                .slider-thumb {
                    width: 12px;
                    height: 12px;
                }
            }
            
            .value-display {
                font-size: 10px;
                padding: 1px 4px;
            }
        }
    }
    
    &.size-small {
        .slider-container {
            padding: 6px 10px;
            gap: 10px;
            
            .slider-track {
                width: 100px;
                height: 3.5px;
                
                .slider-thumb {
                    width: 14px;
                    height: 14px;
                }
            }
            
            .value-display {
                font-size: 11px;
                padding: 2px 5px;
            }
        }
    }
    
    &.size-medium {
        .slider-container {
            padding: 8px 12px;
            gap: 12px;
            
            .slider-track {
                width: 120px;
                height: 4px;
                
                .slider-thumb {
                    width: 16px;
                    height: 16px;
                }
            }
            
            .value-display {
                font-size: 12px;
                padding: 2px 6px;
            }
        }
    }
    
    &.size-large {
        .slider-container {
            padding: 10px 16px;
            gap: 14px;
            
            .slider-track {
                width: 150px;
                height: 5px;
                
                .slider-thumb {
                    width: 18px;
                    height: 18px;
                }
            }
            
            .value-display {
                font-size: 14px;
                padding: 3px 8px;
            }
        }
    }
}
</style> 