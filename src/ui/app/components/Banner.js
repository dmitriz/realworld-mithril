var m = require('mithril');


function view() {
	return m('.banner',
		m('.container',
			[
				m('h1.logo-font', 'conduit'),
				m('p', 'A place to share your knowledge')
			]
		)
	);
};


module.exports = {
	view: view
};
