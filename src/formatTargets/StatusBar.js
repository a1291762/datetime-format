const name = {
	en: "Status Bar",
	fr: "Barre d'état",
	ja: "ステータスバー"
};

const defaultFormat = "%c";

let clockMap = new Map();

function init() {
}

function enable() {
	//global.log("StatusBar enable");
	eachClock().forEach(clockDisplay => {
		//global.log(`StatusBar enable clock ${clockDisplay}`);
		if (clockMap.has(clockDisplay)) {
			//global.log(`StatusBar Why is clockDisplay in clockMap?! ${JSON.stringify(clockMap)}`);
		} else {
			let label = new imports.gi.St.Label({
				y_align: imports.gi.Clutter.ActorAlign.CENTER,
				// justify: imports.gi.Clutter.ActorAlign.CENTER,
			});
			clockDisplay.hide();
			clockDisplay.get_parent().insert_child_below(label, clockDisplay);
			clockMap.set(clockDisplay, label);
		}
	});

	if (global.dashToPanel && ! global.dashToPanel._dateTimeformatPanelsCreatedId) {
		global.dashToPanel._dateTimeformatPanelsCreatedId = global.dashToPanel.connect('panels-created', () => enable());
	}
}

function disable() {
	//global.log("StatusBar disable");
	eachClock().forEach(clockDisplay => {
		//global.log(`StatusBar disable clock ${clockDisplay}`);
		if (clockMap.has(clockDisplay)) {
			let label = clockMap.get(clockDisplay);
			clockMap.delete(clockDisplay);
			clockDisplay.show();
			clockDisplay.get_parent().remove_child(label);
		} else {
			//global.log(`StatusBar Why isn't clockDisplay in clockMap?! ${JSON.stringify(clockMap)}`);
		}
	});

	if (global.dashToPanel && global.dashToPanel._dateTimeformatPanelsCreatedId) {
		global.dashToPanel.disconnect(global.dashToPanel._dateTimeformatPanelsCreatedId);
		delete global.dashToPanel._dateTimeformatPanelsCreatedId;
	}
}

function update(format) {
	//global.log("StatusBar update");
	eachClock().forEach(clockDisplay => {
		//global.log(`StatusBar update clock ${clockDisplay}`);
		if (clockMap.has(clockDisplay)) {
			let label = clockMap.get(clockDisplay);
			label.set_text(format);
		} else {
			//global.log(`StatusBar Why isn't clockDisplay in clockMap?! ${JSON.stringify(clockMap)}`);
		}
	});
}

function eachClock() {
	let ret = [];
	let panelArray = global.dashToPanel ? global.dashToPanel.panels.map(pw => pw.panel || pw) : [imports.ui.main.panel];
	let iterLength = panelArray.length;
	for(var index = 0; index < iterLength; index++){
		let panel = panelArray[index];
		ret.push(panel.statusArea.dateMenu._clockDisplay);
	}
	return ret;
}
