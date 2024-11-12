const livePreviewStateCheck = () => {
	let lpStatus = $state(false);

	function set(status: boolean) {
        console.log('set',status)
		lpStatus = status;
	}

	return {
		get (): boolean {
			return lpStatus;
		},
		set
	};
};

export const livePreviewStatus = livePreviewStateCheck();
