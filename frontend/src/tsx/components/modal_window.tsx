import * as React from 'react';
import ReactModal from 'react-modal';
import style from '../../css/components/modal_window.module.css';

export type ModalButton = {
	text: string,
	handler: Function
};

export function ModalWindow(props: {
	title: string,
	body: JSX.Element,
	buttons: ModalButton[],
	visible: boolean,
	setVisible: Function
}): JSX.Element {
	const buttons = [];
	for (const x of props.buttons) {
		buttons.push(<button key={x.text} onClick={() => { x.handler(); }}>{x.text}</button>);
	}
	ReactModal.setAppElement('body');
	return <ReactModal
		isOpen={props.visible}
		onRequestClose={() => props.setVisible(false)}
		className={'ModalWindow--Content'}
		style={{
			overlay: { zIndex: 200 },
			content: {
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				right: 'none',
				bottom: 'none',
				padding: '2px',
			}
		}} >

		<div className={style.title}>
			<div className={style.leftSet}>{props.title}</div>
			<div className={style.middleSet}></div>
			<div className={style.rightSet}>
				<div className={style.button} onClick={() => props.setVisible(false)}>✗</div>
			</div>
		</div>
		<div className={style.body}>
			{props.body}
			<div className={style.buttonBar}>
				{buttons}
			</div>
		</div>
	</ReactModal>;
}