//引入http的nodejs原生模块
var http = require('http');
//param来自于http.js从url上获取的参数 格式是一个对象
//response来自于http.js的http.createServer的response对象
function newsApi(param,response) {
	http.request({
		//域名
		hostname: 'apis.baidu.com',
		//端口
		port: '80',
		path: '/showapi_open_bus/channel_news/search_news?channelId=5572a109b3cdc86cf39001db&channelName=%E5%9B%BD%E5%86%85%E6%9C%80%E6%96%B0&title=%E4%B8%8A%E5%B8%82&page='+param.page+'&needContent=0&needHtml=0',
		//用get请求
		method: 'GET',
		headers: {
			//设置百度的apiKey
			'apikey': '0aea38d1a7c4443f2f00adc86c4c3e72',
			//'Access-Control-Allow-Origin':'*'
		}
	}, function(request) {
		//设置请求结果解析为utf-8编码
		request.setEncoding('utf-8');
		//刚开始还没拿数据的时候是为空
		var str = '';
		//遍历监听数据源，并存放到str里面
		request.on('data', function(data) {
			str += data;
		})
		//当确定数据已经完全获取回来后我们再把他组装成jsonp
		request.on('end', function(data) {
			console.log(str)
			response.end(param.callback + '(' + str + ')');
		})
	}).end()
}
//导出newsApi模块给http.js模块使用
exports.newsApi = newsApi;