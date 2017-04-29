var m = require('mithril');


var state = {
	articles: null,
	userAuthorizationToken: null,
	isUserLoginBusy: false,
	userLoginErrors: null,
	isUserSettingsUpdateBusy: false,
	userUpdateSettingsErrors: null,
	user: null
};


function init() {
	// Do nothing for now
}


function getErrorMessageFromAPIErrorObject(e) {
	var response = null;

	try {
		response = JSON.parse(e.message).errors;
	} catch (error) {
		response = {
			'An unhandled error occurred': []
		};
	}

	return response;
}


function getArticlesFromAPIOrCache() {

}


var actions = {

	getArticles: function () {
		m.request({
			method: 'GET',
			url: '//conduit.productionready.io/api/articles'
		})
			.then(function (response) {
				state.articles = response.articles;
				// state.articles = []; // Test empty response
			});
	},


	attemptUserLogin: function (email, password) {
		state.user = null;
		state.isUserLoginBusy = true;
		state.userLoginErrors = null;

		m.request({
			method: 'POST',
			url: '//conduit.productionready.io/api/users/login',
			data: {
				user: {
					email: email,
					password: password
				}
			}
		})
			.then(function (response) {
				state.userLoginErrors = null;
				state.user = response.user;
			})
			.catch(function (e) {
				state.userLoginErrors = getErrorMessageFromAPIErrorObject(e);
			})
			.then(function () {
				state.isUserLoginBusy = false;
			});
	},


	getLoggedInUser: function () {
		var userToken = state.user ? state.user.token : '';

		m.request({
			method: 'GET',
			url: '//conduit.productionready.io/api/user',
			headers: {
				'Authorization': 'Token ' + userToken
			}
		})
			.then(function (response) {
				state.user = response.user;
			})
			.catch(function (e) {
				console.warn('domain.getLoggedInUser()', e, getErrorMessageFromAPIErrorObject(e));
			});
	},


	updateUserSettings: function (payload) {
		state.isUserSettingsUpdateBusy = true;
		state.userUpdateSettingsErrors = null;

		if (!payload.password) {
			delete payload.password;
		}

		m.request({
			method: 'PUT',
			url: '//conduit.productionready.io/api/user',
			headers: {
				'Authorization': 'Token ' + state.user.token
			},
			data: {
				user: payload
			}
		})
			.then(function (response) {
				state.user = response.user;
			})
			.catch(function (e) {
				state.userUpdateSettingsErrors = getErrorMessageFromAPIErrorObject(e);
			})
			.then(function () {
				state.isUserSettingsUpdateBusy = false;
			});
	},


	logUserOut: function () {
		state.user = null;
	}

};


module.exports = {
	init: init,
	store: state,
	actions: actions
};
