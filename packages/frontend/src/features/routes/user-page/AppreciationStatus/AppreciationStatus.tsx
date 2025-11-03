import { Gift, SendHorizontal } from "lucide-react";
import { css } from "styled-system/css";
import { Box, Divider, Stack } from "styled-system/jsx";
import { Card } from "~/components/ui/card";
import { Icon } from "~/components/ui/icon";

type AppreciationStatusProps = {
	title: string;
	sendPoint: number;
	receivedPoint: number;
};

export const AppreciationStatus: React.FC<AppreciationStatusProps> = ({
	title,
	sendPoint,
	receivedPoint,
}) => {
	return (
		<Card.Root
			className={css({
				boxShadow: "none",
				border: "2px solid",
				borderColor: "border",
				pt: "16px",
			})}
			width={"300px"}
		>
			<Card.Body pt={"16px"}>
				<Stack direction={"column"} gap={"4px"}>
					<Box>{title}</Box>
					<Stack direction={"row"} gap={"16px"} alignItems={"center"}>
						<Box>送ったポイント</Box>
						<Stack
							direction={"row"}
							gap={"4px"}
							alignItems={"center"}
							ml={"auto"}
						>
							<Icon color={"blush"}>
								<SendHorizontal />
							</Icon>
							<Box>
								<span
									className={css({
										color: "blush",
										fontSize: "32px",
										fontWeight: "bold",
									})}
								>
									{sendPoint}
								</span>
								pt
							</Box>
						</Stack>
					</Stack>
					<Divider my="0px" />
					<Stack
						direction={"row"}
						gap={"16px"}
						alignItems={"center"}
						mt={"24px"}
					>
						<Box>もらったポイント</Box>
						<Stack
							direction={"row"}
							gap={"4px"}
							alignItems={"center"}
							ml={"auto"}
						>
							<Icon color={"sage"}>
								<Gift />
							</Icon>
							<Box>
								<span
									className={css({
										color: "sage",
										fontSize: "32px",
										fontWeight: "bold",
									})}
								>
									{receivedPoint}
								</span>
								pt
							</Box>
						</Stack>
					</Stack>
					<Divider />
				</Stack>
			</Card.Body>
		</Card.Root>
	);
};
