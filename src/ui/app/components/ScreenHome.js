var m = require('mithril');


var Banner = require('./Banner');


function view() {
	return m('div.home-page',
		[
			m(Banner)
		]
	);
};


module.exports = {
	view: view
};
