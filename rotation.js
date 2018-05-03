// 轮播图
/*
1. 一个 div 里面有 3 个 img 标签
2. 只显示当前活动的 img 标签
3. 加按钮，点击切换图片
4. 导航栏，鼠标移入切换图片
*/
// log('rotation')

// 显示相应位置的圆点
var showIndicatorAtIndex = (index) => {
    var className = 'uu-white'
    removeClassAll(className)
    var nextIndiSelector = '#id-indi-' + String(index)
    var indi = e(nextIndiSelector)
    indi.classList.add(className)
}

// 显示相应位置的图片
var showImageAtIndex = (slide, index) => {
    // 设置父节点 slide 的 data-active
    slide.dataset.active = index
    // 得到下一个选择器
    var nextImgSelector = '#id-image-' + String(index)
    // 删除当前图片的 class 给下张图片加上 class
    var className = 'uu-active'
    removeClassAll(className)
    var img = e(nextImgSelector)
    img.classList.add(className)

    // 显示相应位置的圆点
    showIndicatorAtIndex(index)
}

var nextIndex = (slide, offset) => {
    // 获得图片总数及当前活动下标
    var numberOfImgs = Number(slide.dataset.imgs)
    var activeIndex = Number(slide.dataset.active)
    // var offset = Number(button.dataset.offset)
    // 获得下张图片的 id
    var i = (activeIndex + offset + numberOfImgs) % numberOfImgs
    return i
}

// 点击左右按钮切换图片
var bindEventSlide = () => {
    var selector = '.slide-button'
    bindAll(selector, 'click', (event) => {
        var button = event.target
         // log('click next')
        // 找到 slide 的 div
        var slide = button.parentElement
        var offset = Number(button.dataset.offset)
        // 求出下一张图片的 index
        var index = nextIndex(slide, offset)
        // 显示下一张图片
        showImageAtIndex(slide, index)
    })
}

// 鼠标移入导航切换图片
var bindEventIndicator = () => {
    var selector = '.slide-indi'
    bindAll(selector, 'mouseover', (event) => {
        // log('圆点')
        var self = event.target
        var index = Number(self.dataset.index)
        // log('index', index)
        var slide = self.closest('.uu-slide')
        showImageAtIndex(slide, index)
    })
}

// 播放下一张图片
var playNextImage = () => {
    var slide = e('.uu-slide')
    var index = nextIndex(slide, 1)
    showImageAtIndex(slide, index)
}

// 有问题...
// class PlayAction {
//     constructor() {
//         this.clockId
//     }
//
//     autoPlay() {
//         var interval = 2000
//         this.clockId = setInterval(() => {
//             // log('haha')
//             playNextImage()
//         }, interval)
//         log('play', this.clockId)
//     }
//
//     pausePlay() {
//         log('pause', this.clockId)
//         clearInterval(this.clockId)
//     }
// }

// 设置了一个全局变量来使图片停止播放，不好
var clockId

// 设置定时器自动播放图片
var autoPlay = () => {
    var interval = 1000
    clockId = setInterval(() => {
        // log('haha')
        playNextImage()
    }, interval)
    var buttons = es('.slide-button')
    for (var i = 0; i < buttons.length; i++) {
        // log('隐藏')
        var button = buttons[i]
        button.classList.add('hide')
    }
}

// 清楚定时器停止自动播放图片
var pausePlay = () => {
    clearInterval(clockId)
    var buttons = es('.slide-button')
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i]
        // log('显示')
        button.classList.remove('hide')
    }
}

// 鼠标移入停止自动播放
var bindEventMouseOver = () => {
    // log('over')
    var element = e('.uu-slide')
    bindEvent(element, 'mouseover', pausePlay)

}

// 鼠标移出继续自动播放
var bindEventMouseOut = () => {
    var element = e('.uu-slide')
    bindEvent(element, 'mouseout', autoPlay)

}

var __main = () => {
    autoPlay()
    bindEventMouseOver()
    bindEventMouseOut()
    bindEventSlide()
    bindEventIndicator()
}

__main()
