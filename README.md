# Datetime Format

A [Gnome](https://www.gnome.org/gnome-3/) extension which allows users to modify the datetime displayed in the following places:

* Status bar
* Date menu when status bar is clicked
  * Day name
  * Date

The datetime is updated every second and does not need any Gnome date or time settings to be modified.

If Dash2Panel is being used, the status bar on every panel is updated.

## Installation

To install the extension, run the build.js installation script with node:

```
git clone https://github.com/a1291762/datetime-format.git
cd datetime-format
git checkout release
node --use_strict build.js
```

This will install the extension in `~/.local/share/gnome-shell/extensions/`.

An optional 'system' parameter can be supplied (`node build.js system`) to install the extension in `/usr/local/share/gnome-shell/extensions/`.

Afterwards, restart gnome-shell by pressing Alt+F2, type in 'r', then press enter.

## Changing formats

Install and run `gnome-tweak-tool` to toggle and modify the different format targets.

Alternatively, you can list and change GSettings under `org.gnome.shell.extensions.datetime-format.*`.

## Uninstallation

Uninstallation can be done in various ways.

* **Option #1**: Remove via `gnome-tweak-tool`.
* **Option #2**: Run `node build.js uninstall` or `node build.js system uninstall` depending on where the extension was installed to.

## TODO

* Include other languages (zh, ru, ge, it, es, ...)
* Screen shield (lock screen) format manipulation.

## License

[GPLv3](LICENSE.txt)

