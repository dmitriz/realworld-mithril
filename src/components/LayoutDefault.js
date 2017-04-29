var m = require('mithril');


var name = 'LayoutDefault';


var AppHeader = require('./AppHeader');
var ScreenContent = require('./ScreenContent');
var AppFooter = require('./AppFooter');


function view(vnode) {
	return m('div', { className: name },
		[
			m(AppHeader),
			m(ScreenContent, {}, vnode.children),
			m(AppFooter)
		]
	);
}


module.exports = {
	view: view
};
