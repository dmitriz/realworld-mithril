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


var state = {
	articles: null,
	articlesByTag: {},
	tags: {},
	userAuthorizationToken: null,
	isUserLoginBusy: false,
	userLoginErrors: null,
	isUserSettingsUpdateBusy: false,
	userUpdateSettingsErrors: null,
	user: null
};


var API_BASE_URI = '//conduit.productionready.io/api';


function init() {
	actions.getLoggedInUser(window.localStorage.getItem('jwt'));
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


function getArticles(payload) {
	/*
	TODO

	Filter by author:

	?author=jake

	Favorited by user:

	?favorited=jake

	Limit number of articles (default is 20):

	?limit=20

	Offset/skip number of articles (default is 0):

	?offset=0
	*/

	var queryString = m.buildQueryString(payload);

	return m.request({
		method: 'GET',
		url: API_BASE_URI + '/articles?' + queryString
	})
		.then(function (response) {
			return response.articles;
		});
}



var actions = {

	getAllArticles: function () {
		return getArticles()
			.then(function (articles) {
				state.articles = articles;
				// state.articles = []; // Test empty response
			});
	},


	getArticlesByTag: function (tag) {
		return getArticles({ tag: tag })
			.then(function (articles) {
				state.articlesByTag.tag = tag;
				state.articlesByTag.list = articles;
			});
	},


	attemptUserLogin: function (email, password) {
		window.localStorage.setItem('jwt', null);
		state.user = null;
		state.isUserLoginBusy = true;
		state.userLoginErrors = null;

		m.request({
			method: 'POST',
			url: API_BASE_URI + '/users/login',
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
				window.localStorage.setItem('jwt', state.user.token);
			})
			.catch(function (e) {
				state.userLoginErrors = getErrorMessageFromAPIErrorObject(e);
			})
			.then(function () {
				state.isUserLoginBusy = false;
			});
	},


	getLoggedInUser: function (token) {
		var userToken = state.user ? state.user.token : '';

		if (token) {
			userToken = token;
		}

		m.request({
			method: 'GET',
			url: API_BASE_URI + '/user',
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
			url: API_BASE_URI + '/user',
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
		window.localStorage.setItem('jwt', null);
		m.route.set('/');
	},


	getTags: function () {
		state.tags.isLoading = true;

		m.request({
			method: 'GET',
			url: API_BASE_URI + '/tags',
		})
			.then(function (response) {
				state.tags.list = response.tags;
			})
			.then(function () {
				state.tags.isLoading = false;
			});
	}

};


module.exports = {
	init: init,
	store: state,
	actions: actions
};
