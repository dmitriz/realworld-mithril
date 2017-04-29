var m = require('mithril');


var Link = require('./Link');


function view(vnode) {
	return m('.articles-toggle',
		m('ul.nav.nav-pills.outline-active', [
			m('li.nav-item',
				m(Link, { className: 'nav-link active', to: '/@username' }, 'My Articles')
			),
			m('li.nav-item',
				m(Link, { className: 'nav-link', to: '/@username/favorites' }, 'Favorited Articles')
			)
		])
	);
};


module.exports = {
	view: view
};
