var log = console.log.bind(console)

var e = (selector) => {
    var element = document.querySelector(selector)
    if (element == null) {
        var s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`
        alert(s)
    } else {
        return element
    }
}

var es = (selector) => {
    var elements = document.querySelectorAll(selector)
    if (elements.length == 0) {
        var s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`
        alert(s)
    } else {
        return elements
    }
}

var appendHtml = (element, html) => {
    element.insertAdjacentHTML('beforeend', html)
}

var bindEvent = (element, eventName, callback) => {
    element.addEventListener(eventName,callback)
}

var bindAll = (selector, eventName, callback) => {
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)

    }
}

var removeClassAll = (className) => {
    var selector = '.' + className
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        // log('classname', className, e)
        e.classList.remove(className)

    }
}