# MMM-SoundBites

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

This module plays random sound bites at regular intervals.

It uses a HTML5 audio element and a interval timer to change the audio.

This module can be suspended using the MMM-Remote-Control module, which stops the audio.

This module we listen to the MMM-PIR-SENSOR module and will stop audio in POWER_SAVE.

## Installation
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/shinyone/MMM-SoundBites.git`. 


## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-SoundBites',
			position: "bottom_left",
            config: {
				startingVolume: 50,
				fadeDuration: 1,
				playDelay: 5 * 60
			}
        }
    ]
}
```

## Configuration options

| Option           | Description
|----------------- |-----------
| `startingVolume`        | *Optional* The starting volume of the HTML audio element.<br><br>**Type:** `int`(percentage) <br>  Between 0 and 100.
| `fadeDuration`        | *Optional* The timing for the fade animation showing the soundbite file name <br><br>**Type:** `int`(seconds) <br>Default 1 seconds
| `playDelay`        | *Optional* The deplay between audio soundbites <br><br>**Type:** `int`(seconds) <br>Default 5 minutes (5 * 60 seconds)
