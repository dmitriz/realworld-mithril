var m = require('mithril');


var domain = require('./../domain');
var ListErrors = require('./ListErrors');
var UserSettingsForm = require('./UserSettingsForm');


function view() {
	return m('div',
		[
			m('.container.page', [
				m('.row', [
					m('.col-md-6.offset-md-3.col-xs-12', [
						m('h1.text-xs-center', 'Your Settings'),
						m(ListErrors, { errors: domain.store.userUpdateSettingsErrors }),
						m(UserSettingsForm, { currentUser: domain.store.user, isUserSettingsUpdateBusy: domain.store.isUserSettingsUpdateBusy, fn_updateUserSettings: domain.actions.updateUserSettings, fn_logUserOut: domain.actions.logUserOut })
					])
				])
			])
		]
	);
};


module.exports = {
	view: view
};
