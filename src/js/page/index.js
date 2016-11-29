import $ from 'jquery'
import Mock from 'mockjs'
import art from '../../../node_modules/art-template/dist/template.js'

Mock.mock('/mock/index', {
	'data': {
		'tab': [
			{
				'name': 'HTML',
				'list': [
					{
						'title': 'HTML标签之初体验',
						'id': '1'
					}
				]
			},
			{
				'name': 'CSS',
				'list': [
					{
						'title': '2',
						'id': '2'
					}
				]
			},
			{
				'name': 'JS',
				'list': [
					{
						'title': '4',
						'id': '4'
					}
				]
			}
		]
	}
})

$.ajax({
	url: '/mock/index',
	success (res) {
		res = JSON.parse(res)
		console.log(res)
		const htmlOne = art('left-tab', res.data)
		$('.left-tab').html(htmlOne)
		const htmlTwo = art('right-list', res.data)
		$('.right-list').html(htmlTwo)
		$('.loading').hide()
		$('.tab-item').on('click', function choose () {
			$('.tab-item').removeClass('hover')
			$(this).addClass('hover')
			var index = $(this).index()
			$('.list-item').removeClass('hover')
			$('.list-item').eq(index).addClass('hover')
		})
	}
})
