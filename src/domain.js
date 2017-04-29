var apiAdapter = require('./api-adapter');


var state = {
	articles: null,
	isUserLoginBusy: false,
	userLoginErrors: null,
	isUserSettingsUpdateBusy: false,
	userUpdateSettingsErrors: null,
	user: null
};


function init(){
	// Do nothing for now
}


function getArticlesFromAPIOrCache() {

}


var actions = {

	getArticles: function () {
		return apiAdapter.operations.getArticles()
			.then(function (response) {
				if (response.type === apiAdapter.responseTypes.GENERIC_SUCCESS) {
					state.articles = response.data.articles;
				}

				// state.articles = []; // Test empty response

				return state.articles;
			});
	},


	attemptUserLogin: function (email, password) {
		state.user = null;
		state.isUserLoginBusy = true;
		state.userLoginErrors = null;

		return apiAdapter.operations.userLogin(email, password)
			.then(function (response) {
				state.isUserLoginBusy = false;

				if (response.type === apiAdapter.responseTypes.GENERIC_SUCCESS) {
					state.userLoginErrors = null;
					state.user = response.data;

					return response.data;
				}

				if (response.type === apiAdapter.responseTypes.INPUT_VALIDATION_ERROR) {
					state.userLoginErrors = response.data;

					return response.data;
				}

			});
	},


	getLoggedInUser: function () {
		return apiAdapter.operations.getLoggedInUser()
			.then(function (response) {
				console.log('domain.getLoggedInUser()', response.type, response.data);
			});
	},


	updateUserSettings: function (payload) {
		state.isUserSettingsUpdateBusy = true;
		state.userUpdateSettingsErrors = null;

		if (!payload.password) {
			delete payload.password;
		}

		return apiAdapter.operations.updateUserSettings(payload)
			.then(function (response) {
				console.log('domain.updateUserSettings()', response.type, response.data);

				state.isUserSettingsUpdateBusy = false;

				if (response.type === apiAdapter.responseTypes.GENERIC_SUCCESS) {
					state.user = response.data;

					return response.data;
				}

				if (response.type === apiAdapter.responseTypes.GENERIC_ERROR ||
					response.type === apiAdapter.responseTypes.INPUT_VALIDATION_ERROR ||
					response.type === apiAdapter.responseTypes.UNAUTHORIZED_REQUEST_ERROR) {
					state.userUpdateSettingsErrors = response.data;

					return response.data;
				}
			});
	},


	logUserOut: function () {
		state.user = null;
		state.isUserLoginBusy = false;
		state.userLoginErrors = null;

		return apiAdapter.operations.logUserOut();
	}

};


module.exports = {
	init: init,
	store: state,
	actions: actions
};
