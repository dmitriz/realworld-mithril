var m = require('mithril');


var responseTypes = {
	GENERIC_SUCCESS: 'GENERIC_SUCCESS',
	GENERIC_ERROR: 'GENERIC_ERROR',
	UNAUTHORIZED_REQUEST_ERROR: 'UNAUTHORIZED_REQUEST_ERROR',
	INPUT_VALIDATION_ERROR: 'INPUT_VALIDATION_ERROR'
};


var userAuthorizationToken = null;


function getDefaultRequestHeaders() {
	return {
		Accept: 'application/json',
		'Content-Type': 'application/json; charset=utf-8'
	};
}


function getAuthorizationRequestHeaders() {
	if (!userAuthorizationToken) {
		return null;
	}

	return {
		'Authorization': 'Token ' + userAuthorizationToken
	};
}


function parseXHRResponseTextAsJSON(responseText) {
	if (typeof responseText === 'object') {
		return responseText;
	}

	return JSON.parse(responseText);
}


function handle401Response(xhr) {
	return { message: '{"errors": {"Unauthorized Request": []}}' };
}


function extractXHRResponse(xhr, options) {
	if (xhr.status === 401) {
		return handle401Response();
	}

	return parseXHRResponseTextAsJSON(xhr.responseText);
}


function getErrorMessageFromErrorObject(e) {
	var response = null;

	try {
		response = JSON.parse(e.message).errors;
	} catch (error) {
		response = {
			'An unknown error occurred': []
		};
	}

	return response;
}


function setUserAuthorizationToken(token) {
	userAuthorizationToken = token;
	return userAuthorizationToken;
}


function clearUserAuthorizationToken() {
	return setUserAuthorizationToken(null);
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
	setUserAuthorizationToken(null);

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
			setUserAuthorizationToken(response.user.token);

			return {
				type: responseTypes.GENERIC_SUCCESS,
				data: response.user
			};
		})
		.catch(function (e) {
			return {
				type: responseTypes.INPUT_VALIDATION_ERROR,
				data: getErrorMessageFromErrorObject(e)
			};
		});
}


function userLogout() {
	setUserAuthorizationToken(null);
}


function getLoggedInUser() {
	return m.request({
		method: 'GET',
		url: '//conduit.productionready.io/api/user',
		headers: Object.assign(getDefaultRequestHeaders(), getAuthorizationRequestHeaders())
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


function updateUserSettings(payload) {
	return m.request({
		method: 'PUT',
		url: '//conduit.productionready.io/api/user',
		headers: Object.assign(getDefaultRequestHeaders(), getAuthorizationRequestHeaders()),
		data: {
			user: payload
		},
		extract: extractXHRResponse
	})
		.then(function (response) {
			return {
				type: responseTypes.GENERIC_SUCCESS,
				data: response.user
			};
		})
		.catch(function (e) {
			var error = getErrorMessageFromErrorObject(e);
			var response = {
				type: responseTypes.GENERIC_ERROR,
				data: error
			};

			if (error['Unauthorized Request']) {
				response.type = responseTypes.UNAUTHORIZED_REQUEST_ERROR;
			}

			return response;
		});
}


module.exports = {
	responseTypes: responseTypes,
	operations: {
		userLogin: userLogin,
		getLoggedInUser: getLoggedInUser,
		updateUserSettings: updateUserSettings,
		getArticles: getArticles
	}
};
