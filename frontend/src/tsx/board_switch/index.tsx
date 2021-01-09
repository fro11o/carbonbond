import * as React from 'react';
import {
	Link,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import { RouteComponentProps } from 'react-router';
import { BoardPage } from './board_page';
import { ArticlePage } from './article_page';
import { ArticleSidebar, BoardSidebar } from './right_sidebar';
import { Board } from '../../ts/api/api_trait';
import { API_FETCHER, unwrap_or, unwrap } from '../../ts/api/api';
import { UserState } from '../global_state/user';

import '../../css/board_switch/board_page.css';
import { toastErr } from '../utils';
import { GraphView } from './graph_view';

function BoardSwitch(props: { board_name: string, style: string, hide_sidebar?: boolean }): JSX.Element {
	const { user_state } = UserState.useContainer();
	let board_name = props.board_name;
	let style = props.style;
	let [fetching, setFetching] = React.useState(true);
	let [board, setBoard] = React.useState<Board | null>(null);
	let [subscribe_count, setSubscribeCount] = React.useState(0);
	let hide_sidebar = props.hide_sidebar;
	React.useEffect(() => {
		setBoard(null); // 注意：這裡會導致切看板時畫面閃動，但如果拿掉它，就要留意看板頁「以為自己在前一個的看板」之問題
		setFetching(true);
		API_FETCHER.queryBoard(board_name, style).then(res => {
			try {
				let board = unwrap(res);
				setBoard(board);
				return API_FETCHER.querySubscribedUserCount(board.id);
			} catch (err) {
				return Promise.reject(err);
			}
		}).then(res => {
			setSubscribeCount(unwrap_or(res, 0));
		}).catch(err => {
			toastErr(err);
		}).finally(() => {
			setFetching(false);
		});
	}, [board_name, style]);
	if (!fetching && board == null) {
		return <div>
			<div>查無此看板</div>
			{(user_state.login && style == '個人看板' && board_name == user_state.user_name) && <button>創建個人看板</button>}
		</div>;
	} else {
		return <div className="forumBody">
			<div className="switchHeader">
				<div styleName="boardHeader">
					<div>
						<div styleName="headerLeft">
							{
								board == null ? null : <>
									<div styleName="boardTitle">
										<Link to={`/app/b/${board.board_name}`}>{board.board_name}</Link>
									</div>
									<div styleName="boardSubTitle">{board.title}</div>
								</>
							}
						</div>

						<div styleName="headerRight">
							{
								board == null ? null : <div styleName="dataBox">
									<div styleName="dataBoxItem">
										<div styleName="number">{subscribe_count}</div>
										<div styleName="text">追蹤人數</div>
									</div>
									<div styleName="dataBoxItem">
										<div styleName="number">{board.popularity}</div>
										<div styleName="text">在線人數</div>
									</div>
								</div>
							}
						</div>
					</div>
				</div>
			</div>
			{
				board == null ? null : <Switch>
					<Route exact path="/app/b/:board_name/graph/:article_id" render={props =>
						<div style={{ display: 'flex', flexDirection: 'row' }}>
							<div style={{ flex: 1 }}>
								<GraphView {...props} />
							</div>
							{
								hide_sidebar ? null : <div className="rightSideBar">
									<ArticleSidebar />
								</div>
							}
						</div>
					} />
					<Route render={() => <SwitchContent board={board!} hide_sidebar={hide_sidebar} />} />
				</Switch>
			}
		</div>;
	}
}

function SwitchContent(props: { board: Board, hide_sidebar?: boolean }): JSX.Element {
	let board = props.board;
	return <div className="switchContent">
		<div className="mainContent">
			<Switch>
				<Route exact path="/app/b/:board_name" render={props =>
					<BoardPage {...props} board={board} />
				} />
				<Route exact path="/app/b/:board_name/a/:article_id" render={props =>
					<ArticlePage {...props} board={board} />
				} />
				<Redirect to="/app" />
			</Switch>
		</div>
		{
			props.hide_sidebar ? null : <div className="rightSideBar">
				<Switch>
					<Route exact path="/app/b/:board_name" render={props =>
						<BoardSidebar {...props} board={board} />
					} />
					<Route exact path="/app/b/:board_name/a/:article_id" render={() =>
						<ArticleSidebar />
					} />
				</Switch>
			</div>
		}
	</div>;
}

type PersonalBoardProps = RouteComponentProps<{ profile_name: string }> & { hide_sidebar?: boolean };

export function PersonalBoard(props: PersonalBoardProps): JSX.Element {
	return <BoardSwitch board_name={props.match.params.profile_name}
		style={'個人看板'} hide_sidebar={props.hide_sidebar} />;
}

type GeneralBoardProps = RouteComponentProps<{ board_name: string }> & { hide_sidebar?: boolean };

export function GeneralBoard(props: GeneralBoardProps): JSX.Element {
	return <BoardSwitch board_name={props.match.params.board_name}
		style={'一般看板'} hide_sidebar={props.hide_sidebar} />;
}
