function setup_edit_mode(dom, samples) {
	/* EDIT MODE */
	document.addEventListener("keydown", (event) => {
		const keyName = event.key;

		if (keyName === "e") {
			/* SELECT SAMPLE */
			document.addEventListener("keydown", (event) => {
				const keyName = event.key;

				if (keyName == "s") {
					// finish later
					//
				}
			});
		}
	});
}
