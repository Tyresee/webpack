import $ from 'jquery'

// 判断是否手机,加载对应css
if(/Mobile/.test(window.navigator.userAgent)){
    require.ensure([], (require) => {
        require('../css/h5/app.scss')
    })
    $('head').append()
} else {
    require.ensure([], (require) => {
        require('../css/pc/app.scss')
    })
}

// 判断哪个页面,加载对应js
const body = $('body')
const [
    $index
    ] = [
    body.is('#index')
    ]
if ($index) {
    require.ensure([], (require) => {
        require('./page/index.js')
    })
}
