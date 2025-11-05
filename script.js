let add_sample_button = document.querySelector(".add-sample-button");
let add_sample_popup = document.querySelector(".popup-container");
var audio_samples = [];

add_sample_popup.classList.add("hidden");

add_sample_button.addEventListener('click', () => {
	if (add_sample_popup.classList.contains("hidden")) {
		add_sample_popup.classList.remove("hidden");
	} else {
		add_sample_popup.classList.add("hidden");
	}
})