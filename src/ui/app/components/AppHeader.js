var m = require('mithril');


var Link = require('./Link');


function view() {
	return m('header',
		m('nav.navbar.navbar-light',
			m('.container',
				m(Link, {to: '/', className: 'navbar-brand'}, 'conduit')
			)
		)
	);
};


module.exports = {
	view: view
};
