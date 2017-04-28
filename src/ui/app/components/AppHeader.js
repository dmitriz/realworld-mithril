var m = require('mithril');


function view() {
	return m('header',
		m('nav.navbar.navbar-light',
			m('.container',
				m('a.navbar-brand', { href: '#!/' }, 'conduit')
			)
		)
	);
};


module.exports = {
	view: view
};
