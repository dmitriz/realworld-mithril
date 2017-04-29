var m = require('mithril');


var types = {
	DEFAULT: 'DEFAULT',
	POPULAR: 'POPULAR'
};


function getTitleForType(type) {
	switch (type) {
		case types.POPULAR:
			return 'Popular Tags';
			break;
		case types.DEFAULT:
			return 'All Tags';
			break;
	}
}


function view(vnode) {
	return m('div', [
		m('p', getTitleForType(vnode.attrs.type))
	]);
};


module.exports = {
	view: view,
	types: types
};
