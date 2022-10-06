/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/music.js":
/*!*******************************!*\
  !*** ./resources/js/music.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var startBtn = document.getElementById('startBtn');
var sound1 = document.getElementById('sound1');
var sound2 = document.getElementById('sound2');
var sound3 = document.getElementById('sound3');
var stopBtn = document.getElementById('stopBtn');
var resetBtn = document.getElementById('resetBtn');
var audioFile = document.getElementById('audioFile');
var audio = document.getElementById('audio');
var audioData = [];
var bufferSize = 1024;
var audioCtx;
var audio_sample_rate;
var oscillator;
var gain;
var scriptProcessor;
var is_recording = false;

var onAudioProcess = function onAudioProcess(e) {
  var input = e.inputBuffer.getChannelData(0);
  var output = e.outputBuffer.getChannelData(0);

  for (var i = 0; i < input.length; i++) {
    output[i] = input[i];
  }

  var bufferData = new Float32Array(bufferSize);

  for (var _i = 0; _i < bufferSize; _i++) {
    bufferData[_i] = input[_i];
  }

  audioData.push(bufferData);
};

var exportWAV = function exportWAV(audioData) {
  var encodeWAV = function encodeWAV(samples, sampleRate) {
    var buffer = new ArrayBuffer(44 + samples.length * 2);
    var view = new DataView(buffer);

    var writeString = function writeString(view, offset, string) {
      for (var i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    var floatTo16BitPCM = function floatTo16BitPCM(output, offset, input) {
      for (var i = 0; i < input.length; i++, offset += 2) {
        var s = Math.max(-1, Math.min(1, input[i]));
        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
      }
    };

    writeString(view, 0, 'RIFF'); // RIFFヘッダ

    view.setUint32(4, 32 + samples.length * 2, true); // これ以降のファイルサイズ

    writeString(view, 8, 'WAVE'); // WAVEヘッダ

    writeString(view, 12, 'fmt '); // fmtチャンク

    view.setUint32(16, 16, true); // fmtチャンクのバイト数

    view.setUint16(20, 1, true); // フォーマットID

    view.setUint16(22, 1, true); // チャンネル数

    view.setUint32(24, sampleRate, true); // サンプリングレート

    view.setUint32(28, sampleRate * 2, true); // データ速度

    view.setUint16(32, 2, true); // ブロックサイズ

    view.setUint16(34, 16, true); // サンプルあたりのビット数

    writeString(view, 36, 'data'); // dataチャンク

    view.setUint32(40, samples.length * 2, true); // 波形データのバイト数

    floatTo16BitPCM(view, 44, samples); // 波形データ

    return view;
  };

  var mergeBuffers = function mergeBuffers(audioData) {
    var sampleLength = 0;

    for (var i = 0; i < audioData.length; i++) {
      sampleLength += audioData[i].length;
    }

    var samples = new Float32Array(sampleLength);
    var sampleIdx = 0;

    for (var _i2 = 0; _i2 < audioData.length; _i2++) {
      for (var j = 0; j < audioData[_i2].length; j++) {
        samples[sampleIdx] = audioData[_i2][j];
        sampleIdx++;
      }
    }

    return samples;
  };

  var dataview = encodeWAV(mergeBuffers(audioData), audio_sample_rate);
  var audioBlob = new Blob([dataview], {
    type: 'audio/wav'
  });
  console.log(dataview);
  var myURL = window.URL || window.webkitURL;
  var url = myURL.createObjectURL(audioBlob);
  return url;
};

var saveAudio = function saveAudio() {
  var href = exportWAV(audioData);
  audio.src = href;
  audioFile.file = href; // downloadLink.href = href;
  // downloadLink.download = 'test.wav';
  // downloadLink.click();

  audioCtx.close();
};

startBtn.addEventListener('click', function () {
  is_recording = true;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  audio_sample_rate = audioCtx.sampleRate;
  scriptProcessor = audioCtx.createScriptProcessor(bufferSize, 1, 1);
  scriptProcessor.onaudioprocess = onAudioProcess;
  scriptProcessor.connect(audioCtx.destination);
});
sound1.addEventListener('click', function () {
  if (is_recording) {
    oscillator = audioCtx.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.value = 440 * Math.pow(Math.pow(2, 1 / 12), -9); // value in hertz

    gain = audioCtx.createGain();
    gain.gain.value = 0.1;
    oscillator.connect(gain);
    gain.connect(scriptProcessor);
    var t0 = audioCtx.currentTime;
    oscillator.start(t0);
    oscillator.stop(t0 + 0.2);
  } else {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    oscillator = audioCtx.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.value = 440 * Math.pow(Math.pow(2, 1 / 12), -9); // value in hertz

    gain = audioCtx.createGain();
    gain.gain.value = 0.1;
    oscillator.connect(gain);
    gain.connect(audioCtx.destination);
    var _t = audioCtx.currentTime;
    oscillator.start(_t);
    oscillator.stop(_t + 0.2);
  }
});
sound2.addEventListener('click', function () {
  if (is_recording) {
    oscillator = audioCtx.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.value = 440 * Math.pow(Math.pow(2, 1 / 12), -7); // value in hertz

    gain = audioCtx.createGain();
    gain.gain.value = 0.1;
    oscillator.connect(gain);
    gain.connect(scriptProcessor);
    var t0 = audioCtx.currentTime;
    oscillator.start(t0);
    oscillator.stop(t0 + 0.2);
  } else {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    oscillator = audioCtx.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.value = 440 * Math.pow(Math.pow(2, 1 / 12), -7); // value in hertz

    gain = audioCtx.createGain();
    gain.gain.value = 0.1;
    oscillator.connect(gain);
    gain.connect(audioCtx.destination);
    var _t2 = audioCtx.currentTime;
    oscillator.start(_t2);
    oscillator.stop(_t2 + 0.2);
  }
});
sound3.addEventListener('click', function () {
  if (is_recording) {
    oscillator = audioCtx.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.value = 440 * Math.pow(Math.pow(2, 1 / 12), -5); // value in hertz

    gain = audioCtx.createGain();
    gain.gain.value = 0.1;
    oscillator.connect(gain);
    gain.connect(scriptProcessor);
    var t0 = audioCtx.currentTime;
    oscillator.start(t0);
    oscillator.stop(t0 + 0.2);
  } else {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    oscillator = audioCtx.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.value = 440 * Math.pow(Math.pow(2, 1 / 12), -5); // value in hertz

    gain = audioCtx.createGain();
    gain.gain.value = 0.1;
    oscillator.connect(gain);
    gain.connect(audioCtx.destination);
    var _t3 = audioCtx.currentTime;
    oscillator.start(_t3);
    oscillator.stop(_t3 + 0.2);
  }
});
stopBtn.addEventListener('click', function () {
  is_recording = false;
  saveAudio();
});
resetBtn.addEventListener('click', function () {
  audioData.length = 0;
  audio.src = null;
  audio.removeAttribute('src');
  audioFile.removeAttribute('src'); // downloadLink.removeAttribute('href')
  // downloadLink.removeAttribute('download')
});

/***/ }),

/***/ 1:
/*!*************************************!*\
  !*** multi ./resources/js/music.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/ec2-user/environment/music_share/resources/js/music.js */"./resources/js/music.js");


/***/ })

/******/ });