var m = require('mithril');


var Banner = require('./Banner');


function view() {
	return m('div.article-page',
		[
			m(Banner),
			m('h1', 'Article')
		]
	);
};


module.exports = {
	view: view
};
