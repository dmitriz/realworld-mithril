var m = require('mithril');


var responseTypes = {
	GENERIC_SUCCESS: 'GENERIC_SUCCESS',
	GENERIC_ERROR: 'GENERIC_ERROR',
	LOGIN_ERROR: 'LOGIN_ERROR'
};


var authToken = null;


function getAuthRequestHeaders() {
	if (!authToken) {
		return null;
	}

	return {
		'Authorization': 'Token ' + authToken
	};
}


function getErrorMessageFromErrorObject(e) {
	return JSON.parse(e.message).errors;
}


function setUserAuthToken(token) {
	authToken = token;
	return authToken;
}


function clearUserAuthToken() {
	return setUserAuthToken(null);
}


function getArticles() {
	return m.request({
		method: 'GET',
		url: '//conduit.productionready.io/api/articles'
	})
		.then(function (response) {
			return {
				type: responseTypes.GENERIC_SUCCESS,
				data: response
			};
		});
}


function userLogin(email, password) {
	setUserAuthToken(null);

	return m.request({
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
			setUserAuthToken(response.user.token);

			return {
				type: responseTypes.GENERIC_SUCCESS,
				data: response.user
			};
		})
		.catch(function (e) {
			return {
				type: responseTypes.LOGIN_ERROR,
				data: getErrorMessageFromErrorObject(e)
			};
		});
}


function userLogout() {
	setUserAuthToken(null);
}


function getLoggedInUser() {
	console.info('api-adapter.getLoggedInUser()');
	return m.request({
		method: 'GET',
		url: '//conduit.productionready.io/api/user',
		headers: Object.assign({}, getAuthRequestHeaders())
	})
		.then(function (response) {
			return {
				type: responseTypes.GENERIC_SUCCESS,
				data: response.user
			};
		})
		.catch(function (e) {
			return {
				type: responseTypes.GENERIC_ERROR,
				data: getErrorMessageFromErrorObject(e)
			};
		});
}


module.exports = {
	responseTypes: responseTypes,
	clearUserAuthToken: clearUserAuthToken,
	userLogin: userLogin,
	getLoggedInUser: getLoggedInUser,
	getArticles: getArticles
};
