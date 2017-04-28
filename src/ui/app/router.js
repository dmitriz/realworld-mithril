var m = require('mithril');


var LayoutDefault = require('./components/LayoutDefault');


var ScreenHome = require('./components/ScreenHome');
var ScreenArticle = require('./components/ScreenArticle');
var ScreenUserLogin = require('./components/ScreenUserLogin');
var ScreenUserRegister = require('./components/ScreenUserRegister');
var ScreenUserProfile = require('./components/ScreenUserProfile');
var ScreenUserFavorites = require('./components/ScreenUserFavorites');
var ScreenEditor = require('./components/ScreenEditor');


var routes = {
	'/': {
		view: function () {
			return m(LayoutDefault, m(ScreenHome));
		}
	},
	'/article/:id': {
		view: function () {
			return m(LayoutDefault, m(ScreenArticle));
		}
	},
	'/login': {
		view: function () {
			return m(LayoutDefault, m(ScreenUserLogin));
		}
	},
	'/register': {
		view: function () {
			return m(LayoutDefault, m(ScreenUserRegister));
		}
	},
	'/@:username': {
		view: function () {
			return m(LayoutDefault, m(ScreenUserProfile));
		}
	},
	'/@:username/favorites': {
		view: function () {
			return m(LayoutDefault, m(ScreenUserFavorites));
		}
	},
	'/editor': {
		view: function () {
			return m(LayoutDefault, m(ScreenEditor));
		}
	},
	'/editor/:slug': {
		view: function () {
			return m(LayoutDefault, m(ScreenEditor));
		}
	}
};


function init() {
	m.route(document.getElementById('app'), '/', routes);
}


module.exports = {
	init: init
};
