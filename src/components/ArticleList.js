var m = require('mithril');


var ArticlePreview = require('./ArticlePreview');


function view(vnode) {
	if (!vnode.attrs.articles) {
		return m('div.article-preview', 'Loading...');
	}

	if (vnode.attrs.articles.length === 0) {
		return m('div.article-preview', 'No articles are here... yet.');
	}

	return m('div',
		vnode.attrs.articles.map(function (article) {
			return m(ArticlePreview, { key: article.slug, article: article });
		})
		// m('pre', JSON.stringify(vnode.attrs.articles, '', 2))
	);
};


module.exports = {
	view: view
};
