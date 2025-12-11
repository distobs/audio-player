import { SampleList } from "./samples.js";
import { process_form } from "./form.js";
import { update_volumes } from "./volume.js";
import { setup_save_button, process_load_form } from "./save_load.js";

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

let mouseX = 0, mouseY = 0

export function toggle_popup(dom) {
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

	dom.load.addEventListener("submit", async (event) => {
		event.preventDefault();
		process_load_form(dom, samples);
	});

	dom.save_btn.addEventListener("click", async () => {
		setup_save_button(samples);
	});


	addEventListener("mousemove", (event) => {
		mouseX = event.clientX;
		mouseY = event.clientY;
	})

	addEventListener("keydown", (event) => {
		console.log("oi")
		if (event.key == "Enter") {
			const evt = new MouseEvent("click", {
				clientX: mouseX, 
				clientY: mouseY,
				button: 0,
			});

			document.dispatchEvent(evt)
		}
	})
}

init(samples, dom);
