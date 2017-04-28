var m = require('mithril');


var domain = require('./../domain');
var MainNav = require('./MainNav');
var Link = require('./Link');


function view() {
	return m('header',
		m('nav.navbar.navbar-light',
			m('.container',
				m(Link, { className: 'navbar-brand', to: '/' }, 'conduit'),
				m(MainNav, { className: 'nav navbar-nav pull-xs-right', currentUser: domain.store.user})
			)
		)
	);
};


module.exports = {
	view: view
};
