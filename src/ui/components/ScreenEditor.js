var m = require('mithril');


var Banner = require('./Banner');


function view() {
	return m('div',
		[
			m(Banner),
			m('h1', 'ScreenEditor')
		]
	);
};


module.exports = {
	view: view
};
