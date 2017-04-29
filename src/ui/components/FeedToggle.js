var m = require('mithril');


function onGlobalFeedClick(e) {
	e.preventDefault();
	// TODO add implementation
	alert('onGlobalFeedClick()');
}


function onYourFeedClick(e) {
	e.preventDefault();
	// TODO add implementation
	alert('onYourFeedClick()');
}


function view() {
	var links = [
		{ label: 'Your Feed', onclick: onYourFeedClick },
		{ label: 'Global Feed', onclick: onGlobalFeedClick }
	];


	return m('div.feed-toggle',
		m('ul.nav.nav-pills.outline-active', links.map(function (link) {
			return m('li.nav-item',
				m('a.nav-link', { href: '', onclick: link.onclick }, link.label)
			);
		}))
	);
};


module.exports = {
	view: view
};
