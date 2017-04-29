var m = require('mithril');


var domain = require('./../../domain');
var UserInfoBanner = require('./UserInfoBanner');
var UserArticlesToggle = require('./UserArticlesToggle');
var ArticleList = require('./ArticleList');


function oninit() {
	domain.actions.getArticles();
}


function view() {
	return m('.profile-page',
		[
			m(UserInfoBanner),
			m('.container', [
				m('.row', [
					m('.col-md-12', [
						m(UserArticlesToggle),
						m(ArticleList, { articles: domain.store.articles })
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
