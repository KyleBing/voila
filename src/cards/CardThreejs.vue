<template>
    <FloatingPanel
        :left="40" :top="350"
        title="Threejs"
        :width="width"
        :height="height"
        :no-padding="true"
        background-color="black"
        animate-in-class="animate__fadeInLeft"
    >
        <div class="display" ref="dom">

        </div>
    </FloatingPanel>
</template>

<script>
import * as Three from "three"
import {mapState} from "vuex"
import FloatingPanel from "@/components/FloatingPanel";

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {FontLoader} from "three/examples/jsm/loaders/FontLoader.js";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js";

let scene, camera, renderer, text, spotlightHelper1, spotlightHelper2, spotlightHelper3

export default {
    name: "CardThreejs",
    components: { FloatingPanel },
    data(){
        return {
            height: 400,
            width: 600,

        }
    },
    beforeUnmount() {
        renderer.dispose()
        scene.dispose()
        text.dispose()
    },
    mounted() {
        this.init()
    },
    computed: {
        ...mapState(['insets']),
    },
    methods: {
        init(){
            // Render
            renderer = new Three.WebGLRenderer()

            // high resolution
            renderer.setPixelRatio(window.devicePixelRatio)  // 设置像素比例，匹配屏幕
            renderer.setSize( this.width, this.height)
            // 投影设置
            renderer.shadowMap.enabled = true // 默认为 false
            renderer.shadowMap.type = Three.PCFSoftShadowMap; // default THREE.PCFShadowMap
            this.$refs.dom.appendChild( renderer.domElement )

            // CAMERA
            camera = new Three.PerspectiveCamera( 30, this.width / this.height, 1, 5000 )
            camera.position.set( 200, 150, 200 )
            camera.lookAt( 0, 0, 0 )

            scene = new Three.Scene()

            // 创建一个立方体
            const geometry = new Three.BoxGeometry( 20, 20, 20 ) // 立方体
            const material = new Three.MeshPhongMaterial( {color: 0xeeeeee} ) // 贴图
            this.cube = new Three.Mesh( geometry, material ) // 立方体和贴图合在一起
            this.cube.position.set(0,0,0)
            this.cube.castShadow = true // 投下投影
            scene.add( this.cube ) // 往 scene 中添加这个立方体


            // font
            new FontLoader().load('./font/LLPixel_Regular.json', font => {
                const textGeometry = new TextGeometry('Three.js\n         Light', {
                    font: font,
                    size: 10, // 字体大小
                    height: 1, // 字体厚度
                    curveSegments: 20,
                    bevelEnabled: false,
                    bevelThickness: 1,
                    bevelSize: 0,
                    bevelOffset: 0,
                    bevelSegments: 15
                })
                const textMaterial = new Three.MeshPhongMaterial({color: 0x0090ff})
                text = new Three.Mesh(textGeometry, textMaterial)
                text.position.set(0,12,0)
                text.castShadow = true // 显示投影
                // 添加到 scene
                scene.add( text )
                this.render() // 添加完成后渲染一下画面
            }, xhr => {}, err => {console.log(err)})

            // plane cube
            let planeMaterial = new Three.MeshPhongMaterial({
                color: '0xeeeeee',
                side: Three.DoubleSide
            })
            let planCubeGeometry = new Three.BoxGeometry(400, 400,1)
            let plane = new Three.Mesh(planCubeGeometry, planeMaterial)
            plane.rotation.x = Math.PI * 0.5
            plane.position.y = -20
            plane.receiveShadow = true
            scene.add(plane)


            // 环境光
            const light = new Three.AmbientLight( 0x555555, 1 ) // soft white light
            scene.add( light )

            // SpotLight
            let spotLight = new Three.SpotLight( 0xffffff ,1)
            spotLight.position.set( 100, 100, -100 )
            spotLight.penumbra = 1 // 光线散射程度，0-1 越大越散越模糊
            spotLight.decay = 1 // 光线递减程度，越大递减越强
            spotLight.distance = 300 // 光线发射距离
            spotLight.focus = 0.5 // 光线的集中值，1是整个光线角度内，0 是中间一条线
            spotLight.angle = Math.PI/ 6 // 射线开张角度
            spotLight.intensity = 1.5 // 光线强度 0 为无光线

            // spotlight shadow
            spotLight.castShadow = true // 显示投影
            spotLight.shadow.bias = 0.0001 // 非常细微的调整， 0.0001 为单位， default: 0
            spotLight.shadow.camera.near = 0.5 // default
            spotLight.shadow.camera.far = 5000 // default
            spotLight.shadow.focus = 1 // 0 ~ 1.0
            scene.add( spotLight )

            // spotlight helper
            spotlightHelper1 = new Three.SpotLightHelper( spotLight )

            let spotlight2 = new Three.SpotLight( 0xffffff ,1)
            spotlight2.position.set( -100, 100, -100 )
            spotlight2.penumbra = 1
            spotlight2.decay = 2
            spotlight2.distance = 300
            spotlight2.angle = Math.PI/ 6
            scene.add(spotlight2)
            spotlightHelper2 = new Three.SpotLightHelper( spotlight2 )

            let spotlight3 = new Three.SpotLight( 0xffffff ,1)
            spotlight3.position.set( -100, 100, 100 )
            spotlight3.penumbra = 1
            spotlight3.decay = 2
            spotlight3.distance = 300
            spotlight3.angle = Math.PI/ 6
            scene.add(spotlight3)
            spotlightHelper3 = new Three.SpotLightHelper( spotlight3 )

            scene.add( spotlightHelper1 )
            scene.add( spotlightHelper2 )
            scene.add( spotlightHelper3 )

            // 查看控制器
            const controls = new OrbitControls( camera, renderer.domElement )
            controls.addEventListener( 'change', this.render ) // use if there is no animation loop
            controls.minDistance = 2
            controls.maxDistance = 6000
            controls.target.set( 0, 0.5, - 0.2 )
            controls.update()

            const cameraHelper = new Three.CameraHelper( spotLight.shadow.camera );
            scene.add( cameraHelper );

            this.render() // 渲染界面

            setTimeout(() => {
               this.animate()
            }, 200)
        },
        // 渲染界面
        render(){
            renderer.render(scene, camera)
        },
        // 动画执行方法
        animate(){
            // this.cube.rotation.x += 0.01
            this.cube.rotation.y += 0.01 // 以 Y 轴为轴心旋转
            text.rotation.y += 0.01 // 以 Y 轴为轴心旋转
            requestAnimationFrame(this.animate)  // 在下次动画更新时，使界面内容更新
            this.render()
        }
    }
}
</script>

<style lang="scss" scoped>
.display{
    position: relative;
}
</style>
