import { redirect } from "next/navigation";
import { topPageAPIServer } from "~/features/routes/top-page/endpoints/topPageAPI.server";
import { apiClientServer } from "~/lib/api-client-server";
import { ClientTopPage } from "./page.client";

export const revalidate = 60;

const TopPage = async () => {
	const isAuthenticated = await apiClientServer.isAuthenticated();
	if (!isAuthenticated) {
		return redirect("/auth/login");
	}

	const appreciationList = await topPageAPIServer.getAppreciationList();
	const allUsers = await topPageAPIServer.getAllUsers();
	const pointLeaders = await topPageAPIServer.getPointLeaders();
	const userInfo = await topPageAPIServer.getUserInfo();
	return (
		<ClientTopPage
			userInfo={userInfo}
			isNotificationEnabled={false}
			allUsers={allUsers}
			sendPointRanking={pointLeaders.topSenders}
			receivedPointRanking={pointLeaders.topReceivers}
			appreciationList={appreciationList}
		/>
	);
};

export default TopPage;
