var m = require('mithril');


var Link = require('./Link');


function view(vnode) {
	var tagsContent = m('div', 'Loading Tags...');

	if (vnode.attrs.isLoading === false) {
		tagsContent = m('div.tag-list',
			vnode.attrs.list.map(function (tag) {
				return m(Link, {
					className: 'tag-default tag-pill', key: tag, to: '', onclick: function (e) {
						e.preventDefault();
						vnode.attrs.fn_onTagItemClick(tag);
					}
				}, tag);
			})
		);
	}

	return m('div', [
		m('p', 'Popular Tags'),
		tagsContent
	]);
};


module.exports = {
	view: view
};
