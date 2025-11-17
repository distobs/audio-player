export function setup_display_volume(sample) {
	const display_volume = sample.volume_slider;

	display_volume.addEventListener("input", () => {
		sample.audio.volume = (display_volume.value / 100) * master_volume;
	});
}

export function update_volumes(dom, samples) {
	const master_volume = dom.master_slide.value / 100;

	for (let sample of samples) {
		sample.audio.volume = (sample.volume_slider.value / 100) *
			master_volume;
	}
}
