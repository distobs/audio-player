function process_load_form(load_form) {
	load_form == null
	// implement next
}

load_form.addEventListener("submit", async (event) => {
	event.preventDefault();

	const file = load_form.elements.file.files[0];

	if (file.type != "application/json") {
		alert("Favor, selecionar um arquivo JSON.");
		return;
	} else {
		let imported = JSON.parse(await file.text());

		for (sample of imported) {
			if (!sample.name || !sample.audio_data) {
				alert("JSON inválido.");
				tmp_samples = [];
				return;
			} else {
				const name = sample.name;
				const file = make_file(sample.audio_data, sample.file_name);
				const audio = new Audio(URL.createObjectURL(file));

				audio_samples.push({
					name: name,
					file: file,
					audio: audio,
					playing: false
				});

				update_samples(audio_samples);
			}
		}
	}
});
