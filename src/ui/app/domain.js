var apiAdapter = require('./api-adapter');


var state = {
	articles: null
};


function getArticlesFromAPIOrCache() {

}


var actions = {

	getArticles: function () {
		return apiAdapter.getArticles()
			.then(function (response) {
				console.info('domain', response);
				// state.articles = []; // Testing empty response
				state.articles = response.articles;
				return response.articles;
			});
	},


	getArticlesForUser: function (username) {
		getArticles()
			.then(function (response) {
				// [TODO filter articles by username]
			});
	}

};


module.exports = {
	store: state,
	actions: actions
};
