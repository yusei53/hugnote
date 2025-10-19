import { Crown } from "lucide-react";
import Link from "next/link";
import { Box, Divider, Stack } from "styled-system/jsx";
import { Avatar } from "~/components/ui/avatar";
import { Icon } from "~/components/ui/icon";
import type { PointLeaderUser } from "~/model/point-leader";
import { useGetAvatarSize } from "./useGetAvatarSize";
import { useGetCrownColor } from "./useGetCrownColor";

type TopRankingProps = {
	titleIcon: React.ReactNode;
	title: string;
	rankingUsers: PointLeaderUser[];
};

export const TopRanking: React.FC<TopRankingProps> = ({
	titleIcon,
	title,
	rankingUsers,
}) => {
	const { getAvatarSize } = useGetAvatarSize();
	const { getCrownColor } = useGetCrownColor();
	return (
		<Stack direction={"row"} gap={"16px"} alignItems={"center"} px={"16px"}>
			<Stack direction={"column"} gap={"8px"}>
				<Stack direction={"row"} gap={"10px"} alignItems={"center"}>
					<Icon>{titleIcon}</Icon>
					<Box fontSize={"md"}>{title}</Box>
				</Stack>
				<Box>
					<Divider />
				</Box>
			</Stack>
			<Stack direction={"row"} gap={"24px"} alignItems={"flex-end"}>
				{rankingUsers.map((user, index) => (
					<Link href={`/${user.discordUserName}`} key={user.userID}>
						<Stack direction={"column"} alignItems={"center"} cursor="pointer">
							<Icon style={{ color: getCrownColor(index) }}>
								<Crown />
							</Icon>
							<Box>
								<Avatar size={getAvatarSize(index)} src={user.discordAvatar} />
							</Box>
							<Box fontWeight={"bold"}>{user.totalPoints}pt</Box>
						</Stack>
					</Link>
				))}
			</Stack>
		</Stack>
	);
};
