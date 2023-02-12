import { Modal, ModalProps } from '@mui/material';
import React, { CSSProperties, ReactNode } from 'react';
import styles from './dialogue.module.css';

interface IProps extends Omit<ModalProps, 'children'> {
	children: ReactNode;
	p?: CSSProperties['padding'];
}

const Dialogue = (props: IProps) => {
	return (
		<Modal {...props}>
			<div className={styles.dialogueBox} style={{ padding: props.p }}>
				{props.children}
			</div>
		</Modal>
	);
};

export default Dialogue;
