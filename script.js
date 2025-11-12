const add_sample_button = document.querySelector("#add-sample");
const add_sample_popup = document.querySelector(".popup-container");
const close_popup_button = document.querySelector("#popup-closer")
const file_form = document.querySelector("#popup-form");
const save_button = document.querySelector("#save-button")
const load_form = document.querySelector("#load-form")
let audio_samples = []

/* VOLUME LOGIC */

const master_slider = document.querySelector("#master-volume")
let master_volume = master_slider.value / 100;

master_slider.addEventListener("change", () => {
	master_volume = master_slider.value / 100;
});

/* SAVING-LOADING LOGIC */

async function make_exportable(samples) {
	let exportable = [];

	// sample of samples! all is sample!
	for (let sample of samples) {
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

/* SAMPLE LOGIC */

async function make_playable(sample_object, sample_button, paragraph) {
	sample_button.addEventListener("click", async () => {
		const { audio, playing } = sample_object;

		if (playing) {
			// the great gambiarra
			paragraph.textContent = "0" + paragraph.textContent.slice(1);
			audio.pause();
			audio.currentTime = 0;
		} else {
			paragraph.textContent = "1" + paragraph.textContent.slice(1);
			await audio.play();
		}

		sample_object.playing = !sample_object.playing;
	});
}

function update_samples(audio_samples) {
	const sample_grid = document.querySelectorAll(".sample-grid")[0];
	const sample_button = document.createElement("div");
	const paragraph = document.createElement("p");
	const sample_object = audio_samples[audio_samples.length - 1];
	const sample_name = sample_object.name;
	const sample_name_node = document.createTextNode("0 " + sample_name);

	paragraph.appendChild(sample_name_node);
	sample_button.appendChild(paragraph);

	sample_grid.insertBefore(sample_button, add_sample_button);

	make_playable(sample_object, sample_button, paragraph);

	sample_button.classList.add("sample-button");
}

/* POPUP LOGIC */
function toggle_popup(add_sample_popup) {
	if (add_sample_popup.classList.contains("hidden")) {
		add_sample_popup.classList.remove("hidden");
	} else {
		add_sample_popup.classList.add("hidden");
	}
}

toggle_popup(add_sample_popup); // start with closed popup

add_sample_button.addEventListener('click', () => {
		toggle_popup(add_sample_popup);
})

close_popup_button.addEventListener('click', () => {
	toggle_popup(add_sample_popup);
})

/* FORM LOGIC */
file_form.addEventListener("submit", (event) => {
	event.preventDefault();

	const name = file_form.elements.name.value;
	const file = file_form.elements.file.files[0];
	const is_audio = (!(file.type.search("^audio/") == -1) ||
		file.type == "application/ogg");

	if (!name || !file || !is_audio) {
		alert("Favor, preencher os campos corretamente.");
		return;
	} else {
		alert("Tudo O.K. com " + name + " e " + file.name);

		audio_samples.push({
			name: name,
			file: file,
			audio: new Audio(URL.createObjectURL(file)),
			playing: false,
		});

		update_samples(audio_samples);

		file_form.reset();

		toggle_popup(add_sample_popup);
	}
})
