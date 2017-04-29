var m = require('mithril');


var domain = require('./../../domain');
var Banner = require('./Banner');
var ArticleList = require('./ArticleList');
var FeedToggle = require('./FeedToggle');
var Tags = require('./Tags');


function oninit() {
	domain.actions.getArticles();
}


function view() {
	return m('div.home-page',
		[
			m(Banner),
			m('.container.page', [
				m('.row', [
					m('.col-md-9', [
						m(FeedToggle),
						m(ArticleList, { articles: domain.store.articles })
					]),
					m('.col-md-3', [
						m('.sidebar', m(Tags, { type: Tags.types.POPULAR }))
					])
				])
			])
		]
	);
};


module.exports = {
	oninit: oninit,
	view: view
};
