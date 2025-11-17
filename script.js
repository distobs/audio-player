
async function make_exportable(samples) {
	let exportable = [];

	// sample of samples! all is sample!
	for (let sample of samples.list) {
		const name = sample.name;
		const file = sample.file;
		const filename = file.name;

		const b64_data = await new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = () => {
				resolve(reader.result);
			};

			reader.onerror = reject;

			reader.readAsDataURL(file);
		});

		exportable.push({name: name, file_name: filename,
			audio_data: b64_data});
	}

	return exportable;
}

function make_file(base64_data, name) {
	const info_data = base64_data.split(',')
	const mime_type = info_data[0].split(";")[0].slice(5);
	const data = Uint8Array.from(atob(info_data[1]), (c) => c.charCodeAt(0))

	return new File([data], name,
		{type: mime_type});
}

save_button.addEventListener("click", async () => {
	if (audio_samples.length == 0) {
		alert("Adicione os samples para salvá-los.");
		return;
	} else {
		const exportable = await make_exportable(audio_samples);
		const sample_json = JSON.stringify(exportable, null, 2);
		const file = new Blob([sample_json], {type: "application/json"});
		const url = URL.createObjectURL(file);
		const link = document.createElement("a")

		link.href = url;
		link.download = "saved-samples.json";

		document.body.appendChild(link);

		link.click();

		URL.revokeObjectURL(url);
	}
});

