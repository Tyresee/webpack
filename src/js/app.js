import $ from 'jquery'
import '../css/h5/loading.scss'

// 判断是否手机,加载对应css
if (/Mobile/.test(window.navigator.userAgent)) {
    require.ensure([], (require) => {
        console.log('h5')
        require('../css/h5/app.scss')
        function rem () {
            const w = Math.min(document.documentElement.getBoundingClientRect().width, 500)
            document.getElementsByTagName('html')[0].style.fontSize = w * 100 / 750 + 'px'
        }
        rem()
        window.onresize = function resize () {
            rem()
        }
    })
    $('head').append()
} else {
    require.ensure([], (require) => {
        console.log('pc')
        require('../css/pc/app.scss')
    })
}

// 判断哪个页面,加载对应js
const body = $('body')
const [
    $index,
    $article
    ] = [
    body.is('#index'),
    body.is('#article')
    ]

if ($index) {
    require.ensure([], (require) => {
        require('./page/index.js')
    })
}
if ($article) {
    require.ensure([], (require) => {
        require('./page/article.js')
    })
}
