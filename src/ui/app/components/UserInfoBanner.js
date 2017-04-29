var m = require('mithril');


function view() {
	return m('.user-info',
		m('.container',
			[
				m('.row',
					[
						m('.col-xs-12 col-md-10 offset-md-1',
							[
								m('img.user-img', { src: 'https://static.productionready.io/images/smiley-cyrus.jpg' }),
								m('h4', 'username'),
								m('p', 'user bio'),
								m('button.btn btn-sm action-btn btn-outline-secondary',
									[
										m('i.ion-plus-round'),
										m('span', ' Follow username')
									]
								)
							]
						)
					]
				)
			]
		)
	);
};


module.exports = {
	view: view
};
