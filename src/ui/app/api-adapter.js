var m = require('mithril');


var responseTypes = {
	GENERIC_SUCCESS: 'GENERIC_SUCCESS',
	LOGIN_ERROR: 'LOGIN_ERROR'
};


function getErrorMessageFromErrorObject(e) {
	return JSON.parse(e.message).errors;
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


module.exports = {
	responseTypes: responseTypes,
	userLogin: userLogin,
	getArticles: getArticles
};
