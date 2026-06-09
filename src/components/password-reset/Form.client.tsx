interface InteractiveFormProps {
	error?: string;
	token?: string;
	redirect?: string;
}

const InteractiveForm = (props: InteractiveFormProps) => <div>{props.token}</div>;

export { InteractiveForm };
