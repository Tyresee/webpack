import $ from 'jquery'
import Mock from 'mockjs'
import queryString from 'query-string'
import art from '../../../node_modules/art-template/dist/template.js'

const str = queryString.extract(window.location.href)
const strobj = queryString.parse(str)
console.log(strobj.id)

Mock.mock('/mock/article', {
	'data': [
		{
			'title': '标题',
			'content': '内容'
		},
		{
			'title': 'HTML标签之初体验',
			'content': '啦啦啦<a>1</a>'
		}
	]
})

$.ajax({
	url: '/mock/article',
	success (res) {
		res = JSON.parse(res)
		console.log(res.data[strobj.id])
		$('h1').html(res.data[strobj.id].title)
		$('.container').append(res.data[strobj.id].content)
		$('.loading').hide()
	}
})
