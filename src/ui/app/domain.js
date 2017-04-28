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
				// state.articles = []; // Testing empty response
				state.articles = response.articles;
				return response.articles;
			});
	},


	getArticlesForUser: function (username) {
		return getArticles()
			.then(function (response) {
				// [TODO filter articles by username]
			});
	},


	attemptUserLogin: function (email, password) {
		return apiAdapter.userLogin(email, password)
			.then(function (response) {
				console.log(response.type, response.data);
				return response;
			});
	}

};


module.exports = {
	store: state,
	actions: actions
};
