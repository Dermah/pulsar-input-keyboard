const EventEmitter = require('events');
// Pulsar utility requires
var Combos = require('./combos.js');
var combo;
var io;
var recorder = require('./recorder.js');
var player = require('./player.js');

// Global-ish variables that shouldn't be global
// and will be fixed later right?
var astronautOn = false;
var currentTarget = undefined;
var shake = 0;

var music = require('./music-player.js');
var song;
var config;

class KeyboardEmitter extends EventEmitter {
  constructor (configuration) {
    super();

    combo = new Combos(this);
    config = configuration;
    song = new music(config.songPath);
    player.on( 'press', this.process);

    // Set up keypress detection in stdin
    var stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');

    stdin.on('data', (data) => this.process(data));
  }

  process (key) {
    if ( recorder.recording ) {
      // Log all keys that aren't to do with keylogging
      if ( key !== '[' &&
           key !== ']' &&
           key !== '{' &&
           key !== '}') {
        recorder.log(key);
      }
    }
    // ctrl-c ( end of text )
    if ( key === '\u0003' ) {
      console.log("PULSAR: Exiting...");
      process.exit();
    } else if ( key === 'c') {
      console.log("PULSAR: Random colour...");
      combo.randomFlash(currentTarget);
    } else if ( key === 'b') {
      console.log("PULSAR: Sending ball...");
      this.emit('pulse', {
        name: 'ball'
      });
    } else if ( key === 'w') {
      console.log("PULSAR: Sending long ball...");
      this.emit('pulse', {
        name: 'ball',
        totalFrames: 100
      });
    } else if ( key === '\u0012' ) {
      console.log();
      console.log("PULSAR REBOOTING");
      console.log();
      this.emit('pulsar control', {action: "reboot"});
    } else if ( key === '0' ) {
      combo.flashRow(4);
    } else if ( key === '1' ) {
      combo.flashRow(3);
    } else if ( key === '4' ) {
      combo.flashRow(2);
    } else if ( key === '7' ) {
      combo.flashRow(1);
    } else if ( key === '5' ) {
      combo.flashUp(200);
    } else if ( key === 's' ) {
      console.log("PULSAR: Sending starburst ****");
      this.emit('pulse', {
        name: 'starburst',
      });
    } else if ( key === 'l' ) {
      console.log("PULSAR: Sending gloc");
      this.emit('pulse', {
        name: 'bars',
        h: 0.33,
        w: 1,
        y: 0.17,
        r: 23,
        g: 16,
        b: 200
      });
    } else if ( key === '.' ) {
      console.log("PULSAR: Sending starfield *");
      combo.space(astronautOn, 16, currentTarget);
      astronautOn = false;
    } else if ( key === ',' ) {
      console.log("PULSAR: UPDATING STARFIELD *");
      combo.spaceUpdate(config.totalCols, config.totalRows, astronautOn, 0, 1, currentTarget);
      astronautOn = false;
    } else if ( key === '=' ) {
      var pulse = {
        name: 'strobe',
        probability: 0.1
      }
      if (currentTarget) {
        pulse.target = currentTarget;
      }
      console.log("PULSAR: Strobing");
      this.emit('pulse', pulse);
    } else if ( key === '}' ) {
      console.log("PULSAR: Starting timer");
      recorder.startTimer();
    } else if ( key === '{' ) {
      recorder.dump('./PULSARLOG.json');
    } else if ( key === ']' ) {
      console.log("PULSAR: Loading from file");
      player.openLog('./PULSARLOG.json');
      recorder.startTimer();
    } else if ( key === '[' ) {
      console.log("PULSAR: Playing from file");
      player.play();
    } else if ( key === '\u001b[18~' ) {
      console.log("PULSAR: PLAYING AUDIO");
      song.play();

    }
    else if ( key === ' ' ) {
      // Atmos quiet intro
      console.log("PULSAR: Sending atmos");
      combo.atmospheric(25000, currentTarget);
    } else if ( key === 'B' ) {
      // Atmos quiet intro
      console.log("PULSAR: Sending gloc");
      combo.glock3(3, currentTarget);
    } else if ( key === 'N' ) {
      // Atmos quiet intro
      console.log("PULSAR: Sending gloc");
      combo.glock3(2, currentTarget);
    } else if ( key === 'M' ) {
      // Atmos quiet intro
      console.log("PULSAR: Sending gloc");
      combo.glock3(1, currentTarget);
    } else if ( key === 'K' ) {
      // Breathing style slide pulse
      combo.slideUpDouble(currentTarget);
    } else if ( key === '-' ) {
      // Breathing style slide pulse
      combo.calmBeforeStorm(currentTarget);
    } else if (key === '/' ) {
      astronautOn = true;
    } else if (key === 'J' ) {
      this.emit('pulse', {
        name: 'slider',
        r: 255,
        g: 0,
        b: 0,
        totalFrames: 51,
        slideFrames: 51
      });
    } else if (key === '\b' ) {
      console.log("PULSAR: Delete all drawings");
      this.emit('pulsar control', {action: "clear"});
    } else if (key === '3' ) {
      console.log("Row 4 only");
      currentTarget = {row: 4};
    } else if (key === '6' ) {
      console.log("Everywhere");
      currentTarget = undefined;
    } else if ( key === '>' ) {
      console.log("PULSAR: Sending starfield *");
      combo.space(true, 60, currentTarget);
    } else if ( key === '<' ) {
      shake = 0;
      console.log("PULSAR: Sending starfield *");
      combo.space(true, 2000, currentTarget);
    } else if ( key === 'P' ) {
      console.log("PULSAR: UPDATING STARFIELD *");
      combo.spaceUpdate(config.totalCols, config.totalRows, false, shake, 1, currentTarget);
      astronautOn = false;
      if (shake === 0) {
        shake = 1;
      }
      shake = shake*2;
    } else if ( key === 'O' ) {
      console.log("PULSAR: UPDATING STARFIELD *");
      combo.spaceUpdate(config.totalCols, config.totalRows, false, shake, 6, currentTarget);
      astronautOn = false;
      if (shake === 0) {
        shake = 1;
      }
      shake = shake*2;
    } else if ( key === 'U' ) {
      combo.flashUpOnce(75);
    } else if ( key === '!' ) {
      combo.spaceNaut();
    } else {
      console.log("PULSAR: Flashing... (pressed " + key + ")");
      var pulse = {name: 'flash'};
      if (currentTarget) {
        pulse.target = currentTarget;
      }
      this.emit('pulse', pulse);
    }
  }
}

module.exports = KeyboardEmitter;
