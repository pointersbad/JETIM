import { Modal, ModalProps } from '@mui/material';
import React, { CSSProperties, ReactNode, useEffect } from 'react';

interface IProps extends Omit<ModalProps, 'children'> {
	children: ReactNode;
}

const Dialogue = (props: IProps) => {
	return (
		<Modal {...props}>
			<>
				<div style={styles.dialogueBox}>
					{props.children} <div style={styles.nameBox}>Jetim</div>
					<img style={styles.image} src="/animegirl.jpeg" />
				</div>
			</>
		</Modal>
	);
};

const styles = {
	nameBox: {
		position: 'absolute',
		top: -55,
		right: 0,
		backgroundColor: '#583830',
		padding: 10,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		fontWeight: 700,
		color: '#E2E6E8ff',
	},
	dialogueBox: {
		position: 'absolute',
		bottom: 50,
		left: 120,
		right: 120,
		backgroundColor: '#f8d69d',
		opacity: 0.8,
		border: '0.5rem solid #583830',
		borderRadius: 10,
		outline: 'none',
		boxShadow: '0px 0px 63px 0px rgba(0,0,0,0.75) inset',
		fontSize: 30,
		padding: 20,
	},
	image: {
		position: 'absolute',
		top: 0,
		left: '-0.5rem',
		height: 300,
		aspectRatio: '1 / 1',
		objectFit: 'cover',
		transform: 'translateY(-100%)',
		border: '0.5rem solid #583830',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
} as const;

export default Dialogue;
