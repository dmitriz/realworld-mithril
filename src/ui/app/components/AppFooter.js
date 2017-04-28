var m = require('mithril');


var name = 'AppFooter';


function view() {
	return m('footer', { className: name },
		m('.container', 'AppFooter')
	);
};


module.exports = {
	view: view
};
