<template>
    <transition
        enter-active-class="animate__animated animate__fadeInDown"
        leave-active-class="animate__animated animate__bounceOutDown animate__fast"
        appear-active-class=""
    >
        <div class="header" v-if="isShow">
            <div class="header-nav-list left">
                <div class="header-nav-list-item" @click="$router.back()">返回</div>
                <div class="header-nav-list-item" @click="">报警</div>
            </div>

            <!--最多十六个字-->
            <h1 class="header-title" v-if="defaultTitle.length < 10">{{defaultTitle }}</h1>
            <h1 class="header-title compact" v-else >{{defaultTitle }}</h1>

            <div class="header-nav-list right">
                <div class="header-nav-list-item" @click="">设置</div>
                <div class="header-nav-list-item" @click="handleFullScreen">全屏</div>
            </div>

            <div class="border-items">
                <div class="clock">
                    <div class="date-week">
                        <div class="date">{{clock.date}}</div>
                        <div class="week">{{clock.week}}</div>
                    </div>
                    <div class="time">{{clock.time}}</div>
                </div>
            </div>
        </div>
    </transition>

</template>

<script>
import util from "@/assets/js/util";

let weekMap = new Map()
weekMap.set('0', '周期日')
weekMap.set('1', '周期一')
weekMap.set('2', '周期二')
weekMap.set('3', '周期三')
weekMap.set('4', '周期四')
weekMap.set('5', '周期五')
weekMap.set('6', '周期六')

export default {
    name: "BigScreenHeader",
    props: {
        isShow: false
    },
    data(){
        return {
            clock: {}, // 时钟本体
            defaultTitle: '战略部署', // 默认项目名
            deviceCount: 0, // 设备数量
            intervalHandleClock: null, // 时钟 interval handle
        }
    },
    computed:{
    },
    mounted() {
        this.clockStart()
        this.addVisibilityEvent()
    },
    methods: {
        // 处理界面展示与隐藏的事件
        addVisibilityEvent(){
            document.addEventListener('visibilitychange', event => {
                this.isWindowVisible = document.visibilityState === 'visible'
            })
        },
        clockStart(){
            this.clockStop()
            this.intervalHandleClock = setInterval(()=>{
                let timeNow = new Date()
                this.clock = {
                    date: util.dateFormatter(timeNow, 'yyyy/MM/dd'),
                    week: weekMap.get(String(timeNow.getDay())),
                    time:  util.dateFormatter(timeNow, 'hh:mm:ss'),
                }
            }, 1000)
        },
        clockStop(){
            clearInterval(this.intervalHandleClock)
        },
        // 全屏与非全屏切换
        handleFullScreen() {
            let element = document.documentElement
            // 判断是否已经是全屏
            // 如果是全屏，退出
            if (this.isFullScreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen()
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen()
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen()
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen()
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen()
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen()
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen()
                }
            }
            this.isFullScreen = !this.isFullScreen
        },
    },
    watch: {
        isWindowVisible(newValue){
            // 当界面不展示的时候，应该停止所有的 setInterval 动画
            // 不然，在再回到界面的时候，这段时间的所有 interval 更新，都会一性次的在界面执行，就会很卡
            if (newValue){
                this.clockStart()
            } else {
                this.clockStop()
            }
        }
    },

    beforeDestroy() {
        clearInterval(this.intervalHandleClock) // 清除定时器
    }
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/plugin";

$height-header: 130px;
.header {
    height: $height-header;
    position: relative;
    background-repeat: no-repeat;
    background-image: url("./header_bg@2x.png");
    background-size: 1800px;
    background-position: center center;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-flow: row;
    padding-bottom: 28px;

    &-title {
        text-shadow: 3px 3px rgba(0, 0, 0, 0.3);
        padding-bottom: 15px;
        width: 30%;
        font-size: 45px;
        white-space: nowrap;
        font-weight: bold;
        line-height: 60px;
        display: block;
        text-align: center;
        color: white;
        letter-spacing: 6px;
        &.compact{
            letter-spacing: 0;
            font-size: 35px;
        }
    }

    &-nav-list {
        z-index: 100;
        padding-bottom: 10px;
        width: 25%;
        flex-grow: 1;
        display: flex;
        &-item{
            font-weight: bold;
            color: transparentize(white, 0.1);
            font-size: $fz-nav;
            line-height: 55px;
            padding: 0 28px;
            cursor: pointer;
            text-align: center;
            @extend .btn-like;
            text-shadow: 1px 1px rgba(0, 0, 0, 0.3);
            &:hover {
                color: $cyan;
                //text-shadow: -3px -3px 10px rgba(0,0,0,0.2), 2px 2px 30px $cyan;
                text-shadow: -2px -2px 1px rgba(0,0,0,0.2), 2px 2px 30px white;
            }
        }

        &.left {
            justify-content: flex-end;
            padding-right: 35px;
        }

        &.right {
            padding-left: 35px;
            justify-content: flex-start;
        }
    }

}

.border-items{
    @extend .unselectable;
    padding: 0 30px;
    width: 100%;
    bottom: 10px;
    position: absolute;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    font-size: $fz-main;
    color: $cyan;
    .user{
        .el-dropdown-link{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: $fz-nav;
            color: $cyan;
            .user-avatar{
                width: 30px;
                img{
                    display: block;
                    width: 100%;
                }
            }
            .user-name{
                cursor: pointer;
                margin-left: 10px;
                font-size: $fz-nav;
            }
        }
    }
    .clock {
        color: $cyan;
        font-size: $fz-nav;
        .date-week{
            justify-content: space-between;
            font-size: 13px;
            display: flex;
            .date{

            }
            .week{
                margin-left: 10px;

            }
        }
        .time{
            letter-spacing: 2px;
            text-align: center;
            font-size: 35px;
            font-family: "DS-Digital";
        }
    }
}

</style>
