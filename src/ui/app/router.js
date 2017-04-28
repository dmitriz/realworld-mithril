var m = require('mithril');


var LayoutDefault = require('./components/LayoutDefault');


var ScreenHome = require('./components/ScreenHome');


var routes = {
	'/': {
		view: function () {
			return m(LayoutDefault, m(ScreenHome));
		}
	}
};


function init() {
	m.route(document.getElementById('app'), '/', routes);
}


module.exports = {
	init: init
};
