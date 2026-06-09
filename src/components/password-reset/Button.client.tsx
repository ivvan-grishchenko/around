import {ClientOnly} from "@tanstack/react-router";
import {withForm} from "@hooks/use-form";

interface InteractiveButtonProps {
	error?: string;
	token?: string;
	redirect?: string;
}

const InteractiveButton = (props: InteractiveButtonProps) = withForm()

export { InteractiveButton };
