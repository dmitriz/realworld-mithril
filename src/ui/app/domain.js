var apiAdapter = require('./api-adapter');


var state = {
	articles: null,
	isUserLoginBusy: false,
	userLoginErrors: null
};


function getArticlesFromAPIOrCache() {

}


var actions = {

	getArticles: function () {
		return apiAdapter.getArticles()
			.then(function (response) {
				if (response.type === apiAdapter.responseTypes.GENERIC_SUCCESS) {
					state.articles = response.data.articles;
				}

				// state.articles = []; // Test empty response

				return response.articles;
			});
	},


	attemptUserLogin: function (email, password) {
		state.isUserLoginBusy = true;

		return apiAdapter.userLogin(email, password)
			.then(function (response) {
				console.log(response.type, response.data);
				state.isUserLoginBusy = false;

				if (response.type === apiAdapter.responseTypes.GENERIC_SUCCESS) {
					state.userLoginErrors = null;
					return response.data;
				}

				if (response.type === apiAdapter.responseTypes.LOGIN_ERROR) {
					state.userLoginErrors = response.data;
					return response.data;
				}

			});
	}

};


module.exports = {
	store: state,
	actions: actions
};
