import { setup_display_volume } from "./volume.js";

class Sample {
	constructor(name, file, key) {
		this.name = name;
		this.file = file;
		this.audio = new Audio(URL.createObjectURL(file));
		this.key = key;
		this.playing = false;
	}
};

export class SampleList {
	list = [];

	add(name, file) {
		this.list.push(new Sample(name, file));
	}

	tail() {
		return this.list[this.list.length - 1];
	}
}

function setup_slider(sample) {
	const volume_slider = document.createElement("input");

	volume_slider.type = "range";
	volume_slider.value = 100;
	volume_slider.classList.add("sample-volume-slider");

	sample.volume_slider = volume_slider; // fix this

	return volume_slider;
}

function setup_button(sample) {
	const sample_button = document.createElement("div");
	const paragraph = document.createElement("p");
	const name_node = document.createTextNode("0 " + sample.name);

	paragraph.appendChild(name_node);
	sample_button.appendChild(paragraph);

	return { sample_button, paragraph };
}

function setup_wrapper(sample_button, volume_slider) {
	const button_wrapper = document.createElement("div");

	button_wrapper.appendChild(sample_button);
	button_wrapper.appendChild(volume_slider);

	button_wrapper.classList.add("sample-button-wrapper")

	return button_wrapper;
}

function update_grid(dom, button_wrapper) {
	dom.smp_grid.insertBefore(button_wrapper, dom.add_btn);
}

async function make_playable(sample, sample_button, paragraph) {
	const { audio } = sample;

	sample_button.addEventListener("click", async () => {
		const { playing } = sample;

		if (playing) {
			paragraph.textContent = "0" + paragraph.textContent.slice(1);
			audio.pause();
			audio.currentTime = 0;
		} else {
			paragraph.textContent = "1" + paragraph.textContent.slice(1);
			await audio.play();
		}

		sample.playing = !sample.playing;
	});

	console.log(sample);
	console.log(audio);
	audio.addEventListener("ended", () => {
		paragraph.textContent = "0" + paragraph.textContent.slice(1);
	});
}

export function update_samples(dom, sample) {
	const { sample_button, paragraph } = setup_button(sample);
	const volume_slider = setup_slider(sample);
	const button_wrapper = setup_wrapper(sample_button, volume_slider);

	update_grid(dom, button_wrapper);

	setup_display_volume(dom, sample);

	make_playable(sample, sample_button, paragraph);

	sample_button.classList.add("sample-button");
}
