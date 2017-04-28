var m = require('mithril');


function getArticles() {
	m.request({
		method: 'GET',
		url: '//conduit.productionready.io/api/articles',
		withCredentials: true,
	})
		.then(function (data) {
			console.info(data);
		});
}


module.exports = {
	getArticles: getArticles
};
