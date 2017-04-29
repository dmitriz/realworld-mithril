var m = require('mithril');


// Refactor state object as the app grows
// TODO: GET /api/profiles/:username
// TODO: POST /api/profiles/:username/follow
// TODO: DELETE /api/profiles/:username/follow
// TODO: GET /api/articles/feed
// TODO: GET /api/articles/:slug
// TODO: POST /api/articles
// TODO: PUT /api/articles/:slug
// TODO: DELETE /api/articles/:slug
// TODO: POST /api/articles/:slug/comments
// TODO: GET /api/articles/:slug/comments
// TODO: DELETE /api/articles/:slug/comments/:id
// TODO: POST /api/articles/:slug/favorite
// TODO: DELETE /api/articles/:slug/favorite
// TODO: GET /api/tags


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


var actions = {

	getArticles: function () {
		/*
		TODO
		Filter by tag:

		?tag=AngularJS

		Filter by author:

		?author=jake

		Favorited by user:

		?favorited=jake

		Limit number of articles (default is 20):

		?limit=20

		Offset/skip number of articles (default is 0):

		?offset=0
		*/
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
		m.route.set('/');
	}

};


module.exports = {
	init: init,
	store: state,
	actions: actions
};
