var m = require('mithril');


var name = 'AppFooter';


function view() {
	return m('div', {className: name},
		m('footer',
			m('.container', 'AppFooter')
		)
	);
};


module.exports = {
	view: view
};
