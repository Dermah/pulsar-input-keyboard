# pulsar-input-keyboard
Transmit pulses using nothing but terminal and keyboard

An input method that is very tightly coupled with [pulsar `v0.2.x`](https://github.com/Dermah/pulsar/tree/v0.2.1) because that is where it was extracted from.

# Usage

## Setup
```JavaScript
var Processor = require('@dermah/pulsar-input-keyboard');
var processor = new Processor(config);
```
where `config` is the same object you're giving [pulsar-transmitter](https://github.com/Dermah/pulsar-transmitter/tree/v0.1.1). It looks like this

```JSON
{
  "songPath": "./song.mp3",
  "totalCols" : 2,
  "totalRows" : 2
}
```

`processor` is an EventEmitter that can emit these events:

* `pulse`
* `pulse update`
* `pulsar control`

When the processor is created, the console will detect any key entered and emit pulse events accordingly.

## Key recording

To record your keypresses, press `}` to start recording and `{` when you are finished to write out the keypresses to `PULSARLOG.json`. To play them back, press `]` to load `PULSARLOG.json` and `[` to start playing.

Press `F8` to play the song specified in the `config` object. This cheats by using command line utilities. If you're on Windows, download [MPlayer](http://sourceforge.net/projects/mplayerwin/) and place `mplayer.exe` in this folder.

Press `ctrl-c` to stop listening for the keyboard.


# Capabilities

This thing takes control of the console so that key presses trigger
* pulse emissions
* timed pulse emissions
* combinations or pulse emission
* music playback
* keylogging to file of all future keypresses
* playback of keylog files
