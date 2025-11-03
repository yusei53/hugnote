"use client";

import type { GetAppreciationTotalPointResponse } from "@pichikoto/http-contracts";
import { Stack } from "styled-system/jsx";
import { AppTabs } from "~/components/shared/AppTabs/AppTabs";
import { AppToaster } from "~/components/shared/AppToaster/AppToaster";
import { AppreciationCard } from "~/features/common/AppreciationCard/AppreciationCard";
import { AppreciationForm } from "~/features/common/AppreciationForm/AppreciationForm";
import { AppreciationListHeader } from "~/features/common/AppreciationListHeader/AppreciationListHeader";
import { UserProfile } from "~/features/common/UserProfile/UserProfile";
import { AppreciationLog } from "~/features/routes/user-page/AppreciationLog/AppreciationLog";
import { AppreciationStatus } from "~/features/routes/user-page/AppreciationStatus/AppreciationStatus";
import { useToggleAppreciation } from "~/features/routes/user-page/useToggleAppreciation";
import { useToggleProfile } from "~/features/routes/user-page/useToggleProfile";
import type { Appreciation } from "~/model/appreciation";
import type { User, UserInfo } from "~/model/user";

type UserPageClientProps = {
	user: UserInfo;
	isOwnUser: boolean;
	isNotificationEnabled: boolean;
	receivedAppreciations: Appreciation[];
	sentAppreciations: Appreciation[];
	sendUserList: User[];
	receivedUserList: User[];
	allUsers: User[];
	totalPoint: GetAppreciationTotalPointResponse | null;
};

export const UserPageClient: React.FC<UserPageClientProps> = ({
	user,
	isNotificationEnabled,
	isOwnUser,
	allUsers,
	receivedAppreciations,
	sentAppreciations,
	sendUserList,
	receivedUserList,
	totalPoint,
}) => {
	const {
		options: profileOptions,
		selectedOption: selectedProfileOption,
		onSelectOption: onSelectProfileOption,
	} = useToggleProfile();
	const {
		options: appreciationOptions,
		selectedOption: selectedAppreciationOption,
		onSelectOption: onSelectAppreciationOption,
	} = useToggleAppreciation();

	const sentPoint = totalPoint?.sentPoint ?? 0;
	const receivedPoint = totalPoint?.receivedPoint ?? 0;

	return (
		<>
			<Stack direction={"row"} gap={"16px"} p={"24px"} overflowY={"hidden"}>
				<Stack direction={"column"} gap={"8px"} width={"800px"}>
					<UserProfile
						globalName={user.discordGlobalName}
						userName={user.discordUserName}
						avatarUrl={user.discordAvatar}
						isNotificationEnabled={isNotificationEnabled}
					/>
					<AppTabs
						options={profileOptions}
						defaultValue={selectedProfileOption}
						onValueChange={(e) => onSelectProfileOption(e.value)}
					/>
					{selectedProfileOption === "profile" ? (
						<>
							<Stack direction={"row"} gap={"24px"}>
								<AppreciationStatus
									title="今月"
									sendPoint={sentPoint}
									receivedPoint={receivedPoint}
								/>
								<AppreciationStatus
									title="累計"
									sendPoint={sentPoint}
									receivedPoint={receivedPoint}
								/>
							</Stack>
							<Stack direction={"row"} gap={"24px"}>
								<AppreciationLog
									targetUsr={user}
									sendUserList={sendUserList}
									receivedUserList={receivedUserList}
								/>
							</Stack>
						</>
					) : (
						<AppreciationForm
							users={allUsers}
							remainingPoints={user.remainingPoints}
							defaultReceiverUser={!isOwnUser ? user : null}
						/>
					)}
				</Stack>
				<Stack
					direction={"column"}
					width={"100%"}
					height={"calc(100vh - 48px)"}
					overflowY={"auto"}
				>
					<AppreciationListHeader>
						<AppTabs
							options={appreciationOptions}
							defaultValue={selectedAppreciationOption}
							onValueChange={(e) => onSelectAppreciationOption(e.value)}
						/>
					</AppreciationListHeader>
					<Stack direction={"column"} gap={"16px"}>
						{selectedAppreciationOption === "receive"
							? receivedAppreciations.map((appreciation) => (
									<AppreciationCard
										key={appreciation.id}
										appreciation={appreciation}
									/>
								))
							: sentAppreciations.map((appreciation) => (
									<AppreciationCard
										key={appreciation.id}
										appreciation={appreciation}
									/>
								))}
					</Stack>
				</Stack>
			</Stack>
			<AppToaster />
		</>
	);
};
