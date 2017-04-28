var m = require('mithril');


var name = 'APIGateway';


function getArticles() {
	return m.request({
		method: 'GET',
		url: '//conduit.productionready.io/api/articles',
		withCredentials: true,
	});
}


module.exports = {
	getArticles: getArticles
};
