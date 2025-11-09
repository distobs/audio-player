const add_sample_button = document.querySelector("#add-sample");
const add_sample_popup = document.querySelector(".popup-container");
const close_popup_button = document.querySelector("#popup-closer")
const file_form = document.querySelector("#form");
let audio_samples = []

/* SAMPLE LOGIC */
function update_samples(audio_samples) {
	const sample_grid = document.querySelectorAll(".sample-grid");
	const sample_button = document.createElement("div");
	const paragraph = document.createElement("p");
	const sample_name = document.createTextNode(
		audio_samples[audio_samples.length - 1]["name"]
	);

	paragraph.appendChild(sample_name);
	sample_button.appendChild(paragraph);

	sample_grid[0].insertBefore(sample_button, add_sample_button);

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

	const name = file_form.elements['name'];
	const file = file_form.elements['file'].files[0];

	if (!name || !file) {
		alert("Favor, preencher os campos.");
	} else {
		alert("Tudo O.K. com " + name.value + " e " + file.name);

		audio_samples.push({
			name: name.value,
			file: file
		});

		update_samples(audio_samples);

		file_form.reset();

		toggle_popup(add_sample_popup);
	}
})