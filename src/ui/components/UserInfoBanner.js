var m = require('mithril');


var Link = require('./Link');


function getActionButton(data, currentUser) {
	var actionButton = m('button.btn.btn-sm.action-btn.btn-outline-secondary', '...');

	if (data.username) {
		actionButton = m('button.btn.btn-sm.action-btn.btn-outline-secondary',
			[
				m('i.ion-plus-round'),
				m('span', ' Follow ' + data.username)
			]
		);
	}

	if (data && (data.following === true)) {
		actionButton = m(Link, { className: 'btn btn-sm action-btn btn-outline-secondary', to: '/settings' },
			[
				m('i.ion-minus-round'),
				m('span', ' Unfollow ' + data.username)
			]
		);
	}

	if (data && currentUser && (data.username === currentUser.username)) {
		actionButton = m(Link, { className: 'btn btn-sm action-btn btn-outline-secondary', to: '/settings' },
			[
				m('i.ion-gear-a'),
				m('span', ' Edit Profile Settings')
			]
		);
	}

	return actionButton;
}


function view(vnode) {
	console.log(vnode.attrs.data);
	var data = vnode.attrs.data ? vnode.attrs.data : {
		bio: '',
		image: '',
		username: ''
	};

	return m('.user-info',
		m('.container',
			[
				m('.row',
					[
						m('.col-xs-12 col-md-10 offset-md-1', [
							m('img.user-img', { src: data.image }),
							m('h4', data.username || '...'),
							m('p', data.bio),
							getActionButton(data, vnode.attrs.currentUser)
						]),
					]
				)
			]
		)
	);
};


module.exports = {
	view: view
};
