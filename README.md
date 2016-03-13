# pulsar-input-keyboard
Transmit pulses using nothing but terminal and keyboard

An input method that is very tightly coupled with [pulsar `v0.2.x`](https://github.com/Dermah/pulsar/tree/v0.2.1) because that is where it was extracted from.

# Usage
```JavaScript
var Processor = require('@dermah/pulsar-input-keyboard');
var processor = new Processor(io, config);
```
where `io` is a socket.io instance and config is the same object you're giving [pulsar-transmitter](https://github.com/Dermah/pulsar-transmitter/tree/v0.1.1)

## Capabilities

This thing takes control of the console so that key presses trigger
* pulse emissions
* timed pulse emissions
* combinations or pulse emission
* music playback
* keylogging to file of all future keypresses
* playback of keylog files
