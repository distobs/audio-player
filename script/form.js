import { toggle_popup } from "./main.js";
import { update_samples } from "./samples.js";

export function process_form(dom, samples) {
	const name = dom.smp_form.elements.name.value;
	const file = dom.smp_form.elements.file.files[0];

	const is_audio = (!(file.type.search("^audio/") == -1) ||
		file.type == "application/ogg");

	if (!name || !file || !is_audio) {
		alert("Favor, preencher os campos corretamente.");
		return;
	} else {
		alert("Tudo O.K. com " + name + " e " + file.name);

		samples.add(name, file);

		update_samples(dom, samples.tail());

		toggle_popup(dom);

		dom.smp_form.reset();
	}
}
