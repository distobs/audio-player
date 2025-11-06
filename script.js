const add_sample_button = document.querySelector(".add-sample-button");
const add_sample_popup = document.querySelector(".popup-container");
const close_popup = document.querySelector("#popup-closer")
const file_form = document.querySelector("#form");
let audio_samples = [];

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

close_popup.addEventListener('click', () => {
	toggle_popup(add_sample_popup);
})

file_form.addEventListener("submit", (event) => {
	event.preventDefault();

	const name = file_form.elements['name'].value;
	const file = file_form.elements['file'].value;
	
	if (!name || !file) {
		alert("Favor, preencher os campos.");
	} else {
	}
})