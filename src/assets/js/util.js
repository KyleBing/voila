let render = function (pathName , el) {
    console.log('---Util: Render function is working')
    let fullHeight = document.documentElement.clientHeight
    let fullWidth = document.documentElement.clientWidth
    let scaleWidth = fullWidth / 1920
    let scaleHeight = fullHeight / 1080
    let scale = scaleWidth

    if (pathName === 'screen') { // 大屏时，画面内容全部展示在画面内
        scale = scaleWidth > scaleHeight ? scaleHeight : scaleWidth
    }
    el.style.transform = "translate(-50%,0%) scale(" + scale + ")"

    // 同时调整弹窗的缩放
    let new_element = document.getElementById("css_text")
    scale = scale + 0.25
    scale = scale < 1 ?  scale : 1
    new_element.innerText = ".el-dialog__wrapper{transform: scale("+ scale +") !important;}"
    document.body.appendChild(new_element)
}

let getTime = function(){
    let myDate = new Date()

    let h = myDate.getHours(); //获取当前小时数(0-23)
    let m = myDate.getMinutes(); //获取当前分钟数(0-59)
    let s = myDate.getSeconds(); //获取当前秒数(0-59)

    return  h + ':'+ m + ':' + s
}


/**
 * 格式化时间，输出字符串
 *
 * @param   date    要格式化的时间
 * @param   formatString    返回时间的格式：
 * @return  格式化后的时间字符串
 * */
function dateFormatter (date, formatString = 'yyyy-MM-dd hh:mm:ss') {
    let dateRegArray = {
        "M+": date.getMonth() + 1,                      // 月份
        "d+": date.getDate(),                           // 日
        "h+": date.getHours(),                          // 小时
        "m+": date.getMinutes(),                        // 分
        "s+": date.getSeconds(),                        // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        "S": date.getMilliseconds()                     // 毫秒
    }
    if (/(y+)/.test(formatString)) {
        formatString = formatString.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (let section in dateRegArray) {
        if (new RegExp("(" + section + ")").test(formatString)) {
            formatString = formatString.replace(RegExp.$1, (RegExp.$1.length === 1) ? (dateRegArray[section]) : (("00" + dateRegArray[section]).substr(("" + dateRegArray[section]).length)))
        }
    }
    return formatString
}

// 返回两数之间的随机数
function generateRandomValue(low, high){
    if(low > high){
        console.log('Util: generateRandomValue: 参数错误，第一个参数应该为小值',)
        return false
    }
    return low + parseInt((Math.random() * (high - low)).toFixed(0))
}


export default {
    render,
    getTime,
    dateFormatter,
    generateRandomValue
}
