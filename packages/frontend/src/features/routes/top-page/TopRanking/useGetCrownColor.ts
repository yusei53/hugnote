export const useGetCrownColor = () => {
	const getCrownColor = (index: number) => {
		switch (index) {
			case 0:
				return "#FFD700"; // 金色（1位）
			case 1:
				return "#C0C0C0"; // 銀色（2位）
			case 2:
				return "#CD7F32"; // 銅色（3位）
			default:
				return "#9CA3AF"; // 現状、到達しない想定
		}
	};

	return {
		getCrownColor,
	};
};
