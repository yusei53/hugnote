import { notFound, redirect } from "next/navigation";
import { userPageAPIServer } from "~/features/routes/user-page/endpoints/userPageAPI.server";
import { apiClientServer } from "~/lib/api-client-server";
import { UserPageClient } from "./page.client";

export default async function Page({
	params,
}: {
	params: Promise<{ userName: string }>;
}) {
	const isAuthenticated = await apiClientServer.isAuthenticated();
	if (!isAuthenticated) {
		return redirect("/auth/login");
	}
	const resolvedParams = await params;
	const userName = resolvedParams.userName;

	const currentUser = await userPageAPIServer.getCurrentUser();
	const targetUser = await userPageAPIServer.getUserByName(userName);
	if (targetUser === null) notFound();

	const receivedAppreciations =
		await userPageAPIServer.getReceivedAppreciations(targetUser.discordUserID);
	const sentAppreciations = await userPageAPIServer.getSentAppreciations(
		targetUser.discordUserID
	);
	const allUsers = await userPageAPIServer.getAllUsers();
	const totalPoint = await userPageAPIServer.getAppreciationTotalPoint(
		targetUser.discordUserID
	);
	const appreciationUsers = await userPageAPIServer.getAppreciationUsers(
		targetUser.discordUserID
	);
	const isOwnUser = targetUser.discordUserName === currentUser.discordUserName;

	return (
		<UserPageClient
			user={targetUser}
			isOwnUser={isOwnUser}
			isNotificationEnabled={false}
			receivedAppreciations={receivedAppreciations}
			sentAppreciations={sentAppreciations}
			allUsers={allUsers}
			sendUserList={appreciationUsers?.sentToUsers ?? []}
			receivedUserList={appreciationUsers?.receivedFromUsers ?? []}
			totalPoint={totalPoint}
		/>
	);
}
