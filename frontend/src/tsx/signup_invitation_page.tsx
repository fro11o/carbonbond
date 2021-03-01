import * as React from 'react';

import { API_FETCHER, unwrap_or, unwrap } from '../ts/api/api';
import { UserState } from './global_state/user';
import { SignupInvitation } from '../ts/api/api_trait';

import { toastErr } from './utils';

import '../css/signup_invitation_page.css';

async function fetchSignupInvitationList(user_id: number): Promise<SignupInvitation[]> {
	console.log('fetcSignupInvitationList');
	let invitation_list = unwrap_or(await API_FETCHER.querySignupInvitationList(user_id), []);
	console.log(invitation_list);
	return invitation_list;
}
async function activateInvitation(invitation: SignupInvitation): Promise<{}> {
	try {
		await API_FETCHER.activateSignupInvitation(invitation.id);
	} catch (err) {
		toastErr(err);
	}
	return {};
}

// async function deactivateInvitation(invitation: SignupInvitation): Promise<{}> {
// 	try {
// 		await API_FETCHER.deactivateSignupInvitation(invitation.id);
// 	} catch (err) {
// 		toastErr(err);
// 	}
// 	return {};
// }

function getLink(invitation: SignupInvitation): void {
	console.log('getLink');
	console.log(invitation);
	activateInvitation(invitation);
}

function InviteList(): JSX.Element {
	let { user_state } = UserState.useContainer();
	let [invitations, setInvitations] = React.useState<SignupInvitation[]>([]);

	console.log('AA');
	console.log(user_state);
	React.useEffect(() => {
		if (user_state.login) {
			console.log(user_state.id);
			fetchSignupInvitationList(user_state.id).then(tree => {
				console.log('QQ');
				console.log(tree);
				setInvitations(tree);
			}).catch(err => toastErr(err));
		}
	}, [user_state.login]);

	return <>
		{
			invitations.map((invitation) => (
				<div styleName="signupInvitationWrapper" key={`${invitation.id}`}>
					<div styleName="description">#{invitation.id}</div>
					<div styleName="description">描述：{invitation.description}</div>
					<button onClick={() => getLink(invitation)}>產生並複製邀請連結</button>
					<div styleName="description">邀請連結：{invitation.code !== '' ? `http://localhost:8080/app/signup_page/${invitation.code}` : '未啟用'}</div>
					<div styleName="description">使用狀況：{invitation.to_user ? '已使用' : '未使用'}</div>
				</div>
			))
		}
	</>
}

export function SignupInvitationPage(): JSX.Element {
	return <>
		<h1>我的邀請碼</h1>
		<InviteList />
	</>;
}