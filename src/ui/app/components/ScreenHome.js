var m = require('mithril');


var Banner = require('./Banner');
var ArticleList = require('./ArticleList');
var FeedToggle = require('./FeedToggle');
var Tags = require('./Tags');


function view() {
	return m('div.home-page',
		[
			m(Banner),
			m('.container.page', [
				m('.row', [
					m('.col-md-9', [
						m(FeedToggle),
						m(ArticleList)
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
	view: view
};
