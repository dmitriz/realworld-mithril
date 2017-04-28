var m = require('mithril');


var name = 'AppHeader';


function view() {
	return m('header', { className: name },
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
