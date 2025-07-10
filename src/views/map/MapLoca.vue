<template>
    <div class="map-container" ref="mapContainerRef">
        <div class="hover-layer">
            <div class="area-center" ref="mapContainer">
                <div id="container" :style="mapContainerStyle"></div>
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

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import ICON from "@/components/icons.ts"
import GEO_PROVINCE_DATA from './province.json'
import CardTarget from "@/views/map/card/CardTarget"
import BigScreenHeader from "@/views/map/header/BigScreenHeader"
import CardRight from "@/views/map/card/CardRight"

// Types
interface MapInstance {
    Map: any
    LabelsLayer: any
    LabelMarker: any
    Marker: any
    Icon: any
    Size: any
    Pixel: any
    DrivingPolicy: any
}

interface LocaInstance {
    Container: any
    ScatterLayer: any
    GeoJSONSource: any
    LinkLayer: any
    PulseLinkLayer: any
}

interface ProvinceData {
    name: string
    center: string
}

interface Feature {
    type: string
    properties: { province: string }
    geometry: {
        type: string
        coordinates: number[]
    }
}

interface FeatureCollection {
    type: string
    features: Feature[]
}

// Constants
const TARGET_POINT = [121.504673, 25.046711] // 目标坐标 台湾
const TARGET_NAME = '台湾'
const DESTINATION_POINT = [110.504673, 34.046711] // 目标坐标

// Reactive data
const isLoading = ref(false)
const map = ref<any>(null)
const loca = ref<any>(null)
const mapLeft = ref(0)
const mapTop = ref(0)
const cardShow = ref(false)
const mapContainerRef = ref<HTMLElement>()
const mapContainer = ref<HTMLElement>()

let AMap: MapInstance | null = null

// Computed properties
const mapContainerStyle = computed(() => {
    return `
    left: ${-mapLeft.value}px;
    top: ${-mapTop.value}px;
    `
})

// 根据省份地址，生成展示地图需要的格式化数据
const dataPoints = computed((): FeatureCollection => {
    const tempData = GEO_PROVINCE_DATA.map((item: ProvinceData) => {
        const co = item.center.split(',').map(item => Number(item))
        return {
            "type": "Feature",
            "properties": {"province": item.name},
            "geometry": {
                "type": "Point", // 点位
                "coordinates": co
            }
        }
    })
    return {
        "type": "FeatureCollection",
        "features": tempData
    }
})

const dataLines = computed((): FeatureCollection => {
    const tempData = GEO_PROVINCE_DATA.map((item: ProvinceData) => {
        const co = item.center.split(',').map(item => Number(item))
        return {
            "type": "Feature",
            "properties": {"province": item.name},
            "geometry": {
                "type": "LineString", // 线段
                "coordinates": [
                    TARGET_POINT, // target location
                    co
                ]
            }
        }
    })
    return {
        "type": "FeatureCollection",
        "features": tempData
    }
})

const dataLinesReverse = computed((): FeatureCollection => {
    const tempData = GEO_PROVINCE_DATA.map((item: ProvinceData) => {
        const co = item.center.split(',').map(item => Number(item))
        return {
            "type": "Feature",
            "properties": {"province": item.name},
            "geometry": {
                "type": "LineString", // 线段
                "coordinates": [
                    co,
                    TARGET_POINT // target location
                ]
            }
        }
    })
    return {
        "type": "FeatureCollection",
        "features": tempData
    }
})

// Methods
const toggleCards = () => {
    cardShow.value = !cardShow.value
}

const recalculateMapLocation = () => {
    if (mapContainer.value) {
        mapLeft.value = mapContainer.value.offsetLeft
        mapTop.value = mapContainer.value.offsetTop
    }
}

const loadLocaMap = () => {
    AMapLoader.load({
        key: "581591b581149549d9035d039e83e368", // 开发应用的 ID
        version: "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [],
        Loca:{
            version: '2.0.0',
        },
        AMapUI: {             // 是否加载 AMapUI，缺省不加载
            version: '1.1',   // AMapUI 缺省 1.1
            plugins: [],       // 需要加载的 AMapUI ui插件
        },

    }).then((mapInstance: any) => {
        AMap = mapInstance
        map.value = new AMap.Map('container', {
            viewMode: '3D',
            zoom: 6,
            pitch: 32,
            center: TARGET_POINT,
            mapStyle: 'amap://styles/grey',
            showBuildingBlock: true, // 显示建筑物
            showLabel: false, // 不显示地名什么的
        })

        // 文字图层
        const labelLayer = new AMap.LabelsLayer({
            rejectMapMask: true,
            collision: true,
            animation: true,
        })
        map.value.add(labelLayer)

        loca.value = new mapInstance.Loca.Container({
            map: map.value,
        })

        const scatterLayer2 = new mapInstance.Loca.ScatterLayer({
            zIndex: 10,
            opacity: 0.8,
            visible: true,
            zooms: [2, 22],
        })
        const scatterLayer3 = new mapInstance.Loca.ScatterLayer({
            zIndex: 10,
            opacity: 0.8,
            visible: true,
            zooms: [2, 22],
        })

        const centerPoint = new mapInstance.Loca.GeoJSONSource({
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
        loca.value.add(scatterLayer3)

        let lineGeoMap
        let scatterGeoMap

        const setLabelsLayer = (data: FeatureCollection) => {
            labelLayer.clear()
            data.features.forEach((item) => {
                const labelsMarker = new AMap.LabelMarker({
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
                    name: TARGET_NAME,
                    position: TARGET_POINT,
                    zooms: [2, 22],
                    opacity: 1,
                    zIndex: 10,
                    rank: 100,
                    text: {
                        content: TARGET_NAME,
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

        const geoDataPoints = new mapInstance.Loca.GeoJSONSource({
            data: dataPoints.value,
        })
        const geoDataLines = new mapInstance.Loca.GeoJSONSource({
            data: dataLines.value,
        })
        const geoDataLinesReverse = new mapInstance.Loca.GeoJSONSource({
            data: dataLinesReverse.value,
        })

        const loadLocation = () => {
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
            loca.value.add(scatterLayer2)

            // this.loca.animate.start() // 开始动画
        }
        loadLocation()

        const linkLayer = new mapInstance.Loca.LinkLayer({
            zIndex: 20,
            opacity: 1,
            visible: true,
            zooms: [2, 22],
        })
        const loadLine = () => {
            linkLayer.setSource(geoDataLines)
            linkLayer.setStyle({
                lineColors: ['#ff7514', '#ff0008'],
                height: (index: number, item: any) => {
                    return item.distance / 2
                },
                smoothSteps: 300
            })
            loca.value.add(linkLayer)
        }
        // loadLine()

        // pulse layer
        const pulseLayer = new mapInstance.Loca.PulseLinkLayer({
            zIndex: 20,
            opacity: 1,
            visible: true,
            zooms: [2, 22],
        })
        const loadPulse = () => {
            pulseLayer.setSource(geoDataLinesReverse)
            pulseLayer.setStyle({
                height: (index: number, item: any) => {
                    return item.distance / 2
                },
                unit: 'meter',
                dash: [40000, 0, 40000, 0],
                lineWidth: function () {
                    return [20000, 2000] // 始末 节点的线段宽度
                },
                // altitude: 1000,
                smoothSteps: 100, // 曲线圆滑度
                speed: function (index: number, prop: any) {
                    return 1000 + Math.random() * 40000
                },
                flowLength: 100000,
                lineColors: function (index: number, feat: any) {
                    return ['rgb(255,221,0)', 'rgb(255,141,27)', 'rgb(65,0,255)']
                },
                maxHeightScale: 0.3, // 弧顶位置比例
                headColor: 'rgba(255, 255, 0, 1)',
                trailColor: 'rgb(255,84,84)',
            })
            loca.value.add(pulseLayer)
        }
        loadPulse()

        animateStart()

        map.value.on('complete', () => {
            loca.value.animate.start()
        })

    }).catch((e: any) => {
        console.log(e)
    })
}

const render = () => {
    console.log('---Util: Render function is working')
    const fullHeight = document.documentElement.clientHeight
    const fullWidth = document.documentElement.clientWidth
    const scaleWidth = fullWidth / 1920
    const scaleHeight = fullHeight / 1080
    let scale = scaleWidth

    scale = scaleWidth > scaleHeight ? scaleHeight : scaleWidth

    document.body.style.transform = `scale(${scale})`
    // document.body.style.transform = `scale(0.5)`
}

const animateStart = () => {
    cardShow.value = false
    loca.value.viewControl.addAnimates([{
        center: {
            value: DESTINATION_POINT, // 动画终点的经纬度
            control: [TARGET_POINT, DESTINATION_POINT], // 过渡中的轨迹控制点，地图上的经纬度
            timing: [0.42, 0, 0.4, 1], // 动画时间控制点
            duration: 5000, // 过渡时间，毫秒（ms）
        },
        // 俯仰角动画
        pitch: {
            value: 30, // 动画终点的俯仰角度
            control: [[0, 0], [1, 30]], // 控制器，x是0～1的起始区间，y是pitch值
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
        /*rotation: {
            value: -30, // 动画终点的地图旋转角度
            control: [[0, 0], [1, -30]], // 控制器，x是0～1的起始区间，y是rotation值
            timing: [0, 0, 1, 1],
            duration: 8000,
        }*/
    }],
    () => {
        cardShow.value = true
    })
}

const resizeMap = () => {
    const mapContainer = document.getElementById('container')
    if (mapContainer) {
        mapContainer.style.height = window.innerHeight + "px"
        mapContainer.style.width = window.innerWidth + "px"
    }
}

// 载入路线信息
const loadLine = (map: any, line: any) => {
    map.plugin('AMap.DragRoute', () => {
        // path 是驾车导航的起、途径和终点，最多支持16个途经点
        const path: any[] = []
        line.paths.forEach((point: any) => {
            path.push(point.position)
        })
        const route = new AMap!.DragRoute(map, path, AMap!.DrivingPolicy.LEAST_FEE, {
            startMarkerOptions: {
                offset: new AMap!.Pixel(-13, -40),
                icon: new AMap!.Icon({ // 设置途经点的图标
                    size: new AMap!.Size(26, 40),
                    image: ICON.start,
                    // imageOffset: new AMap.Pixel(0,0), // 图片的偏移量，在大图中取小图的时候有用
                    imageSize: new AMap!.Size(26, 40) // 指定图标的大小，可以压缩图片

                }),
            },
            endMarkerOptions: {
                offset: new AMap!.Pixel(-13, -40),
                icon: new AMap!.Icon({ // 设置途经点的图标
                    size: new AMap!.Size(26, 40),
                    image: ICON.end,
                    // imageOffset: new AMap.Pixel(0,0), // 图片的偏移量，在大图中取小图的时候有用
                    imageSize: new AMap!.Size(26, 40) // 指定图标的大小，可以压缩图片

                }),
            },
            midMarkerOptions: {
                offset: new AMap!.Pixel(-5, -10),
                icon: new AMap!.Icon({ // 设置途经点的图标
                    size: new AMap!.Size(15, 15),
                    image: ICON.midIcon,
                    // imageOffset: new AMap.Pixel(0,0), // 图片的偏移量，在大图中取小图的时候有用
                    imageSize: new AMap!.Size(15, 15) // 指定图标的大小，可以压缩图片

                }),
            },
        })
        // 查询导航路径并开启拖拽导航
        route.search()
        // this.currentRouting = route
    })
}

// 添加路线 Label
const loadLineLabels = (map: any, line: any) => {
    line.paths.forEach((item: any) => {
        addMarker(map, item)
    })
}

const addMarker = (map: any, item: any) => {
    const marker = new AMap!.Marker({
        position: item.position,
        content: `
       <div class="marker">
          <div class="title">${item.name}</div>
          <div class="note">${item.note.replaceAll('|', '<br>')}</div>
       </div>`,
    })
    map.add(marker)
}

// Lifecycle hooks
onMounted(() => {
    loadLocaMap()
    nextTick(() => {
        onresize = render
        recalculateMapLocation()
    })
})

onUnmounted(() => {
    onresize = null
    if (loca.value) {
        loca.value.destroy() // 需要先销毁 Loca 再销毁 Map
    }
    if (map.value) {
        map.value.destroy() // 销毁地图，释放内存
        map.value = null
    }
})
</script>

<style lang="scss" scoped>
@import "../../assets/scss/plugin";

#container{
    height: 1080px;
    width: 1920px;
}
.map-container {
    position: relative;
}

.hover-layer{
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

@for $item from 1 through 5{
    .area-left-#{$item}{
        grid-row-start: $item; grid-row-end: $item + 1;
        grid-column-start: 1;  grid-column-end: 2;
    }
    .area-right-#{$item}{
        grid-row-start: $item; grid-row-end: $item+1;
        grid-column-start: 3;  grid-column-end: 4;
    }
}
.area-center{
    grid-row-start: 2; grid-row-end: 6;
    grid-column-start: 2;  grid-column-end: 3;
}

.area-header{
    grid-column-start: 1;  grid-column-end: 4;
    grid-row-start: 1; grid-row-end: 2;
}

</style>
