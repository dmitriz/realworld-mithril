var m = require('mithril');


var Link = require('./Link');


function view() {
	return m('header',
		m('nav.navbar.navbar-light',
			m('.container',
				m(Link, { className: 'navbar-brand', to: '/' }, 'conduit'),
				m('ul.nav.navbar-nav.pull-xs-right', [
					m('li.nav-item', m(Link, { className: 'nav-link', to: '/' }, 'Home')),
					m('li.nav-item', m(Link, { className: 'nav-link', to: '/login' }, 'Sign in')),
					m('li.nav-item', m(Link, { className: 'nav-link', to: '/register' }, 'Sign up'))
				])
			)
		)
	);
};


module.exports = {
	view: view
};
