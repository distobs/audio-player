import { SampleList } from "./samples.js";
import { process_form } from "./form.js";
import { update_volumes } from "./volume.js";

const dom = {
	add_btn: document.querySelector("#add-sample"),
	popup: document.querySelector(".popup-container"),
	close_btn: document.querySelector("#popup-closer"),
	smp_form: document.querySelector("#popup-form"),
	save_btn: document.querySelector("#save-button"),
	load: document.querySelector("#load-form"),
	smp_grid: document.querySelectorAll(".sample-grid")[0],
	master_slider: document.querySelector("#master-volume"),
};

const samples = new SampleList();

function toggle_popup(dom) {
	if (dom.popup.classList.contains("hidden")) {
		dom.popup.classList.remove("hidden");
	} else {
		dom.popup.classList.add("hidden");
	}
}

function init(samples, dom) {
	dom.smp_form.addEventListener("submit", (event) => {
		event.preventDefault();
		process_form(dom, samples);
	});

	dom.master_slider.addEventListener("input", () => {
		update_volumes(dom, samples);
	});

	dom.add_btn.addEventListener('click', () => {
		toggle_popup(dom);
	});

	dom.close_btn.addEventListener('click', () => {
		toggle_popup(dom);
	});
}

init(samples, dom);
