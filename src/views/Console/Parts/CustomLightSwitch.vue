<template>
    <div 
        class="custom-button-switch"
        :class="{ 'active': model, [`size-${size}`]: true }"
        @click.stop="toggleSwitch"
    >
        <div class="horizontal-switch">
            <div class="switch-track">
                <div class="switch-slider" :class="{ 'on': model }"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

interface Props {
    lightName?: string
    size?: 'tiny' | 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
    lightName: 'Light',
    size: 'medium'
})

const model = defineModel<boolean>({ default: false })

const emit = defineEmits(['change'])

// 切换灯光状态
const toggleSwitch = () => {
    // 立即更新UI状态
    model.value = !model.value
    emit('change', model.value)
    
    // 这里可以添加实际的灯光控制逻辑
    console.log(`Light ${props.lightName} toggled to: ${model.value ? 'ON' : 'OFF'}`)
}
</script>

<style scoped lang="scss">

@import "../../../assets/scss/plugin";
// 自定义按钮开关样式
.custom-button-switch {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    user-select: none;
    position: relative;
    
    .horizontal-switch {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px 5px;
        background-color: transparentize;
        // background: rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        
        .switch-track {
            position: relative;
            width: 55px;
            height: 22px;
            // background: rgba(0, 0, 0, 0.3);
            background-color: darken(transparentize($red, 0.4), 50%);

            border-radius: 11px;
            border: 0.5px solid rgba(255, 255, 255, 0.2);
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
        }
        
        .switch-slider {
            position: absolute;
            top: 1px;
            left: 1px;
            width: 20px;
            height: 20px;
            background: #ff4949;
            border-radius: 50%;
            border: 0.5px solid rgba(255, 255, 255, 0.3);
            box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.9);
            transition: all 0.3s ease;
            
            &.on {
                transform: translateX(33px);
                background: #00ff73;
            }
        }
    }
    
    // Size variants
    &.size-tiny {
        .horizontal-switch {
            padding: 2px 2px;
            border-radius: 12px;
            
            .switch-track {
                width: 32px;
                height: 12px;
                border-radius: 6px;
            }
            
            .switch-slider {
                width: 10px;
                height: 10px;
                top: 1px;
                left: 1px;
                
                &.on {
                    transform: translateX(20px);
                }
            }
        }
    }
    
    &.size-small {
        .horizontal-switch {
            padding: 3px 3px;
            border-radius: 15px;
            
            .switch-track {
                width: 40px;
                height: 16px;
                border-radius: 8px;
            }
            
            .switch-slider {
                width: 14px;
                height: 14px;
                top: 1px;
                left: 1px;
                
                &.on {
                    transform: translateX(24px);
                }
            }
        }
    }
    
    &.size-medium {
        .horizontal-switch {
            padding: 4px 4px;
            border-radius: 18px;
            
            .switch-track {
                width: 48px;
                height: 20px;
                border-radius: 10px;
            }
            
            .switch-slider {
                width: 18px;
                height: 18px;
                top: 1px;
                left: 1px;
                
                &.on {
                    transform: translateX(28px);
                }
            }
        }
    }
    
    &.size-large {
        .horizontal-switch {
            padding: 6px 6px;
            border-radius: 22px;
            
            .switch-track {
                width: 60px;
                height: 24px;
                border-radius: 12px;
            }
            
            .switch-slider {
                width: 22px;
                height: 22px;
                top: 1px;
                left: 1px;
                
                &.on {
                    transform: translateX(36px);
                }
            }
        }
    }
    
    &.active {
        .horizontal-switch {
            background-color: transparentize(white, 0.3);
            border-color: #13ce66;
            .switch-track {
                background-color: darken(transparentize($green, 0.4), 50%);
            }
            .switch-slider {
            }
        }
    }
    
    &:hover {
        .horizontal-switch {
            transform: scale(1.05);
        }
    }
}
</style> 