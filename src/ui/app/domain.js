var APIGateway = require('./components/APIGateway');


var state = {
	articles: null
};


function getArticlesFromAPIOrCache() {

}


var actions = {

	getArticles: function () {
		return APIGateway.getArticles()
			.then(function (response) {
				state.articles = response;
				return response;
			});
	},


	getArticlesForUser: function () {
		getArticles()
		.then(function () {

		});
	}

};


module.exports = {
	store: state,
	actions: actions
};
