<template>
    <div class="map-container">
        <div id="container" :style="`height: ${insets.height}px`"></div>
    </div>
</template>

<script>

import AMapLoader from '@amap/amap-jsapi-loader'
import ICON from "@/components/icons"
import {mapState} from "vuex"
import GEO_PROVINCE_DATA from './province.json'

let AMap = null

const TARGET_POINT = [121.504673, 25.046711] // 目标坐标
const DESTENATION_POINT = [115.504673, 20.046711] // 目标坐标

export default {
    name: "MapLoca",
    data() {
        return {
            isLoading: false,
            contentHeight: 400,
            map: null,
            loca: null,
        }
    },
    mounted() {
        this.contentHeight = window.innerHeight

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

        }).then(map => {
            AMap = map
            this.map = new AMap.Map('container', {
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
            this.map.add(labelLayer)

            this.loca = new Loca.Container({
                map: this.map,
            })

            let linkLayer = new Loca.LinkLayer({
                zIndex: 20,
                opacity: 1,
                visible: true,
                zooms: [2, 22],
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
            this.loca.add(scatterLayer3)

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
                data: this.dataPoints,
            });
            const geoDataLines = new Loca.GeoJSONSource({
                data: this.dataLines,
            });


            let loadLocation = () => {
                setLabelsLayer(this.dataPoints)
                scatterLayer2.setSource(geoDataPoints)
                scatterLayer2.setStyle({
                    size: [250000, 250000],
                    unit: 'miter',
                    animate: true,
                    duration: 1000,
                    texture: 'https://a.amap.com/Loca/static/static/orange.png',
                    // texture: 'https://a.amap.com/Loca/static/static/green.png',
                })
                this.loca.add(scatterLayer2)
                setTimeout(() => {
                    this.loca.animate.start() // 开始动画
                })

            }
            loadLocation()

            let loadLine = () => {
                linkLayer.setSource(geoDataLines)
                linkLayer.setStyle({
                    lineColors: ['#ff7514', '#ff0008'],
                    height: (index, item) => {
                        return item.distance / 2
                    },
                    smoothSteps: 300
                })
                this.loca.add(linkLayer)
            }
            loadLine()

            this.loca.viewControl.addAnimates([
                {
                center: {
                    value: TARGET_POINT, // 动画终点的经纬度
                    control: [DESTENATION_POINT, TARGET_POINT], // 过渡中的轨迹控制点，地图上的经纬度
                    timing: [0.42, 0, 0.4, 1], // 动画时间控制点
                    duration: 2000, // 过渡时间，毫秒（ms）
                },
                // 俯仰角动画
/*                pitch: {
                    value: 45, // 动画终点的俯仰角度
                    control: [[0, -60], [1, 45]], // 控制器，x是0～1的起始区间，y是pitch值
                    timing: [0, 0, 1, 1], // 这个值是线性过渡
                    duration: 8000,
                },*/
/*                // 缩放等级动画
                zoom: {
                    value: 18, // 动画终点的地图缩放等级
                    control: [[0, 17], [1, 18]], // 控制器，x是0～1的起始区间，y是zoom值
                    timing: [0, 0, 1, 1],
                    duration: 8000,
                },*/
                // 旋转动画
/*                rotation: {
                    value: 120, // 动画终点的地图旋转角度
                    control: [[0, 0], [1, 120]], // 控制器，x是0～1的起始区间，y是rotation值
                    timing: [0, 0, 1, 1],
                    duration: 8000,
                }*/
            }],()=>{
                this.loca.viewControl.addAnimates([{
                    center: {
                        value: TARGET_POINT, // 动画终点的经纬度
                        control: [DESTENATION_POINT, TARGET_POINT], // 过渡中的轨迹控制点，地图上的经纬度
                        timing: [0, 0, 1, 1], // 动画时间控制点
                        duration: 8000, // 过渡时间，毫秒（ms）
                    },

                }],()=>{
                    this.loca.viewControl.addAnimates([{
                        center: {
                            value: DESTENATION_POINT, // 动画终点的经纬度
                            control: [TARGET_POINT, DESTENATION_POINT], // 过渡中的轨迹控制点，地图上的经纬度
                            timing: [0, 0, 1, 1], // 动画时间控制点
                            duration: 8000, // 过渡时间，毫秒（ms）
                        },
                    }],()=>{
                        this.loca.viewControl.addAnimates([{
                            // 旋转动画
                            rotation: {
                                value: 30, // 动画终点的地图旋转角度
                                control: [[0, 120], [1, 180]], // 控制器，x是0～1的起始区间，y是rotation值
                                timing: [0, 0, 1, 1],
                                duration: 8000,
                            }
                        }],()=>{
                        })
                    })
                })
            })

            this.map.on('complete', ()=> {
                setTimeout(()=>{
                // this.loca.animate.start()
                }, 2000); // 给地图一个加载的时间
            })

        }).catch(e => {
            console.log(e)
        })
    },

    computed: {
        ...mapState(['insets']),
        // 根据省份地址，生成展示地图需要的格式化数据
        dataPoints(){
            let tempData = GEO_PROVINCE_DATA.map(item => {
                let co = item.center.split(',').map(item => Number(item))
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
        },
        dataLines(){
            let tempData = GEO_PROVINCE_DATA.map(item => {
                let co = item.center.split(',').map(item => Number(item))
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
        },
    },
    methods: {
        resizeMap() {
            let mapContainer = document.getElementById('container')
            mapContainer.style.height = window.innerHeight + "px"
            mapContainer.style.width = window.innerWidth + "px"
        },

        // 载入路线信息
        loadLine(map, line) {
            map.plugin('AMap.DragRoute', () => {
                // path 是驾车导航的起、途径和终点，最多支持16个途经点
                let path = []
                line.paths.forEach(point => {
                    path.push(point.position)
                })
                let route = new AMap.DragRoute(map, path, AMap.DrivingPolicy.LEAST_FEE, {
                    startMarkerOptions: {
                        offset: new AMap.Pixel(-13, -40),
                        icon: new AMap.Icon({ // 设置途经点的图标
                            size: new AMap.Size(26, 40),
                            image: ICON.start,
                            // imageOffset: new AMap.Pixel(0,0), // 图片的偏移量，在大图中取小图的时候有用
                            imageSize: new AMap.Size(26, 40) // 指定图标的大小，可以压缩图片

                        }),
                    },
                    endMarkerOptions: {
                        offset: new AMap.Pixel(-13, -40),
                        icon: new AMap.Icon({ // 设置途经点的图标
                            size: new AMap.Size(26, 40),
                            image: ICON.end,
                            // imageOffset: new AMap.Pixel(0,0), // 图片的偏移量，在大图中取小图的时候有用
                            imageSize: new AMap.Size(26, 40) // 指定图标的大小，可以压缩图片

                        }),
                    },
                    midMarkerOptions: {
                        offset: new AMap.Pixel(-5, -10),
                        icon: new AMap.Icon({ // 设置途经点的图标
                            size: new AMap.Size(15, 15),
                            image: ICON.midIcon,
                            // imageOffset: new AMap.Pixel(0,0), // 图片的偏移量，在大图中取小图的时候有用
                            imageSize: new AMap.Size(15, 15) // 指定图标的大小，可以压缩图片

                        }),
                    },
                })
                // 查询导航路径并开启拖拽导航
                route.search()
                this.currentRouting = route
            })
        },
        // 添加路线 Label
        loadLineLabels(map, line) {
            line.paths.forEach(item => {
                this.addMarker(map, item)
            })
        },
        addMarker(map, item) {
            let marker = new AMap.Marker({
                position: item.position,
                content: `
               <div class="marker">
                  <div class="title">${item.name}</div>
                  <div class="note">${item.note.replaceAll('|', '<br>')}</div>
               </div>`,
            })
            map.add(marker)
        }
    },
    watch: {
        '$route'(to, from){
            if (this.currentRouting) {
                this.currentRouting.destroy() // 清除当前路线
                this.map.clearMap() // 删除所有 Marker
            }
            this.activeLineObj = this.lines[parseInt(this.$route.params.lineId) - 1]
            this.loadLine(this.map, this.activeLineObj)
            this.loadLineLabels(this.map, this.activeLineObj)
        },
    },

    beforeUnmount() {
        this.loca.destroy() // 需要先销毁 Loca 再销毁 Map
        this.map.destroy() // 销毁地图，释放内存
        this.map = null
    }
}
</script>

<style lang="scss" scoped>
.map-container {
    position: relative;
}

</style>
