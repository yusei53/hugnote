import { Box } from "styled-system/jsx";

type TruncatedLabelProps = {
	label: string;
};

export const TruncatedLabel: React.FC<TruncatedLabelProps> = ({ label }) => {
	return (
		<Box
			fontSize={"xs"}
			maxWidth="70px"
			overflow="hidden"
			textOverflow="ellipsis"
			whiteSpace="nowrap"
		>
			{label}
		</Box>
	);
};
