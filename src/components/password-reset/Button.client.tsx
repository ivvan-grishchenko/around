interface InteractiveButtonProps {
	error?: string;
	token?: string;
	redirect?: string;
}

const InteractiveButton = (props: InteractiveButtonProps) => <div>{props.token}</div>;

export { InteractiveButton };
