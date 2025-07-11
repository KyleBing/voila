<template>
    <div class="map-container">
        <div class="hover-layer">
            <div class="area-center">
                <div id="container" ref="mapContainerRef"></div>
            </div>

            <div class="area-header">
                <BigScreenHeader :isShow="cardShow"
                                 @animate="animateStart"
                                 @toggleCard="toggleCards"
                />
            </div>

            <div :class="`area-left-${item + 1}`" v-for="item in 4" :key="item">
                <CardTarget :isShow="cardShow"/>
            </div>
            <div :class="`area-right-${item + 1}`" v-for="item in 4" :key="item">
                <CardRight :isShow="cardShow"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import AMapLoader from '@amap/amap-jsapi-loader'
import GEO_PROVINCE_DATA from './province.json'
import {PROJECT_CONFIG} from '@/PROJECT_CONFIG'
import {onMounted, onUnmounted, computed, ref} from 'vue'

import BigScreenHeader from './header/BigScreenHeader.vue'
import CardTarget from './card/CardTarget.vue'
import CardRight from './card/CardRight.vue'

let AMap = null
let isLoading = false
let map = null
let loca = null


const TARGET_POINT = [121.504673, 25.046711] // 目标坐标 台湾
const DESTENATION_POINT = [110.504673, 28.046711] // 目标坐标


const cardShow = ref(false)
// Methods
const toggleCards = () => {
    cardShow.value = !cardShow.value
}



onMounted(() => {
    AMapLoader
        .load({
            key: PROJECT_CONFIG.mapDevelopKey, // 开发应用的 ID
            version: "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: [],
            Loca: {
                version: '2.0.0',
            },
            AMapUI: {             // 是否加载 AMapUI，缺省不加载
                version: '1.1',   // AMapUI 缺省 1.1
                plugins: [],       // 需要加载的 AMapUI ui插件
            },

        })
        .then(map => {
            AMap = map
            map = new AMap.Map('container', {
                viewMode: '3D',
                zoom: 6,
                pitch: 32,
                center: TARGET_POINT,
                mapStyle: 'amap://styles/grey',
                showBuildingBlock: true, // 显示建筑物
                showLabel: false, // 不显示地名什么的
            })


            // 文字图层
            let labelLayer = new AMap.LabelsLayer({
                rejectMapMask: true,
                collision: true,
                animation: true,
            })
            map.add(labelLayer)

            loca = new Loca.Container({
                map: map,
            })


            let scatterLayer2 = new Loca.ScatterLayer({
                zIndex: 10,
                opacity: 0.8,
                visible: true,
                zooms: [2, 22],
            })
            let scatterLayer3 = new Loca.ScatterLayer({
                zIndex: 10,
                opacity: 0.8,
                visible: true,
                zooms: [2, 22],
            })

            let centerPoint = new Loca.GeoJSONSource({
                data: {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': TARGET_POINT,
                            },
                        },
                    ],
                },
            })
            scatterLayer3.setSource(centerPoint)
            scatterLayer3.setStyle({
                size: [300000, 300000],
                unit: 'meter',
                texture: 'https://a.amap.com/Loca/static/static/center-point.png',
            })
            loca.add(scatterLayer3)

            let lineGeoMap
            let scatterGeoMap

            let setLabelsLayer = (data) => {
                labelLayer.clear()
                data.features.forEach((item) => {
                    let labelsMarker = new AMap.LabelMarker({
                        name: item.properties.province,
                        position: item.geometry.coordinates,
                        zooms: [2, 22],
                        opacity: 1,
                        zIndex: 10,
                        text: {
                            content: item.properties.province,
                            direction: 'bottom',
                            offset: [0, -5],
                            style: {
                                fontSize: 13,
                                fontWeight: 'normal',
                                fillColor: '#fff',
                            },
                        },
                    })
                    labelLayer.add(labelsMarker)
                })
                labelLayer.add(
                    new AMap.LabelMarker({
                        name: '台湾',
                        position: TARGET_POINT,
                        zooms: [2, 22],
                        opacity: 1,
                        zIndex: 10,
                        rank: 100,
                        text: {
                            content: '台湾',
                            direction: 'bottom',
                            offset: [0, -5],
                            style: {
                                fontSize: 13,
                                fontWeight: 'normal',
                                fillColor: '#fff',
                            },
                        },
                    }),
                )
            }

            const geoDataPoints = new Loca.GeoJSONSource({
                data: dataPoints.value,
            });
            const geoDataLines = new Loca.GeoJSONSource({
                data: dataLines.value,
            });
            const geoDataLinesReverse = new Loca.GeoJSONSource({
                data: dataLinesReverse.value,
            });

            let loadLocation = () => {
                setLabelsLayer(dataPoints.value)
                scatterLayer2.setSource(geoDataPoints)
                scatterLayer2.setStyle({
                    size: [250000, 250000],
                    unit: 'miter',
                    animate: true,
                    duration: 1000,
                    texture: 'https://a.amap.com/Loca/static/static/orange.png',
                    // texture: 'https://a.amap.com/Loca/static/static/green.png',
                })
                loca.add(scatterLayer2)

                // this.loca.animate.start() // 开始动画
            }
            loadLocation()

            let linkLayer = new Loca.LinkLayer({
                zIndex: 20,
                opacity: 1,
                visible: true,
                zooms: [2, 22],
            })

            let loadLine = () => {
                linkLayer.setSource(geoDataLines)
                linkLayer.setStyle({
                    lineColors: ['#ff7514', '#ff0008'],
                    height: (index, item) => {
                        return item.distance / 2
                    },
                    smoothSteps: 300
                })
                loca.add(linkLayer)
            }
            // loadLine()

            // pulse layer
            let pulseLayer = new Loca.PulseLinkLayer({
                zIndex: 20,
                opacity: 1,
                visible: true,
                zooms: [2, 22],
            })
            let loadPulse = () => {
                pulseLayer.setSource(geoDataLinesReverse)
                pulseLayer.setStyle({
                    height: (index, item) => {
                        return item.distance / 2
                    },
                    unit: 'meter',
                    dash: [40000, 0, 40000, 0],
                    lineWidth: function () {
                        return [20000, 2000]; // 始末 节点的线段宽度
                    },
                    // altitude: 1000,
                    smoothSteps: 100, // 曲线圆滑度
                    speed: function (index, prop) {
                        return 1000 + Math.random() * 200000;
                    },
                    flowLength: 100000,
                    lineColors: function (index, feat) {
                        return ['rgb(255,221,0)', 'rgb(255,141,27)', 'rgb(65,0,255)'];
                    },
                    maxHeightScale: 0.3, // 弧顶位置比例
                    headColor: 'rgba(255, 255, 0, 1)',
                    trailColor: 'rgb(255,84,84)',
                })
                loca.add(pulseLayer)
            }
            loadPulse()

            animateStart()

            map.on('complete', () => {
                loca.animate.start()
            })

        })
        .catch(e => {
            console.log(e)
        })
})

// 根据省份地址，生成展示地图需要的格式化数据
const dataPoints = computed(() => {
    let tempData = GEO_PROVINCE_DATA.map(item => {
        let co = item.center.split(',').map(item => Number(item))
        return {
            type: "Feature",
            properties: {"province": item.name},
            geometry: {
                type: "Point", // 点位
                coordinates: co
            }
        }
    })
    return {
        type: "FeatureCollection",
        features: tempData
    }
})
const dataLines = computed(() => {
    let tempData = GEO_PROVINCE_DATA.map(item => {
        let co = item.center.split(',').map(item => Number(item))
        return {
            type: "Feature",
            properties: {"province": item.name},
            geometry: {
                type: "LineString", // 线段
                "coordinates": [
                    TARGET_POINT, // target location
                    co
                ]
            }
        }
    })
    return {
        type: "FeatureCollection",
        features: tempData
    }
})

const dataLinesReverse = computed(() => {
    let tempData = GEO_PROVINCE_DATA.map(item => {
        let co = item.center.split(',').map(item => Number(item))
        return {
            type: "Feature",
            properties: {"province": item.name},
            geometry: {
                type: "LineString", // 线段
                "coordinates": [
                    co,
                    TARGET_POINT // target location
                ]
            }
        }
    })
    return {
        type: "FeatureCollection",
        features: tempData
    }
})

function animateStart() {
    // 动画开始前，隐藏卡片
    cardShow.value = false

    loca.viewControl.addAnimates([{
        center: {
            value: DESTENATION_POINT, // 动画终点的经纬度
            control: [TARGET_POINT, DESTENATION_POINT], // 过渡中的轨迹控制点，地图上的经纬度
            timing: [0.42, 0, 0.4, 1], // 动画时间控制点
            duration: 5000, // 过渡时间，毫秒（ms）
        },
        // 俯仰角动画
        pitch: {
            value: 60, // 动画终点的俯仰角度
            control: [[0, 0], [1, 60]], // 控制器，x是0～1的起始区间，y是pitch值
            timing: [0, 0, 1, 1], // 这个值是线性过渡
            duration: 5000,
        },
        // 缩放等级动画
        zoom: {
            value: 5, // 动画终点的地图缩放等级
            control: [[0, 8], [1, 5]], // 控制器，x是0～1的起始区间，y是zoom值
            timing: [0, 0, 1, 1],
            duration: 8000,
        },
        // 旋转动画
        rotation: {
            value: -30, // 动画终点的地图旋转角度
            control: [[0, 0], [1, -30]], // 控制器，x是0～1的起始区间，y是rotation值
            timing: [0, 0, 1, 1],
            duration: 8000,
        }
    }],
        () => {
            // 动画结束后，显示卡片
            cardShow.value = true
        })
}

function resizeMap() {
    mapContainerRef.value.style.height = window.innerHeight + "px"
    mapContainerRef.value.style.width = window.innerWidth + "px"
}

onUnmounted(() => {
    loca.destroy() // 需要先销毁 Loca 再销毁 Map
    map.destroy() // 销毁地图，释放内存
    map = null
})
</script>

<style lang="scss" scoped>
@import "../../assets/scss/plugin";

#container {
    height: 1080px;
    width: 1920px;
}

.map-container {
    position: relative;
}

.hover-layer {
    overflow: hidden;
    position: absolute;
    left: 0;
    width: 1920px;
    height: 1080px;
    top: 0;
    display: grid;
    grid-gap: 5px;
    grid-template-columns: 20% 60% 20%;
    grid-template-rows: 20% 20% 20% 20% 20%;
    //grid-gap: 10px 10px;
}

@for $item from 1 through 5 {
    .area-left-#{$item} {
        grid-row-start: $item;
        grid-row-end: $item + 1;
        grid-column-start: 1;
        grid-column-end: 2;
    }
    .area-right-#{$item} {
        grid-row-start: $item;
        grid-row-end: $item+1;
        grid-column-start: 3;
        grid-column-end: 4;
    }
}


</style>
