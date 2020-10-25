var Rune = Rune || {}; Rune["Noise"] =
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Rune = __webpack_require__(1);

// http://mrl.nyu.edu/~perlin/noise/
// Adapting from P5.js
// Which was adapted from PApplet.java
// which was adapted from toxi
// which was adapted from the german demo group farbrausch
// as used in their demo "art": http://www.farb-rausch.de/fr010src.zip

var PERLIN_YWRAPB = 4;
var PERLIN_YWRAP = 1<<PERLIN_YWRAPB;
var PERLIN_ZWRAPB = 8;
var PERLIN_ZWRAP = 1<<PERLIN_ZWRAPB;
var PERLIN_SIZE = 4095;

var SINCOS_PRECISION = 0.5;
var SINCOS_LENGTH = Math.floor(360 / SINCOS_PRECISION);
var sinLUT = new Array(SINCOS_LENGTH);
var cosLUT = new Array(SINCOS_LENGTH);
var DEG_TO_RAD = Math.PI/180.0;
for (var i = 0; i < SINCOS_LENGTH; i++) {
  sinLUT[i] = Math.sin(i * DEG_TO_RAD * SINCOS_PRECISION);
  cosLUT[i] = Math.cos(i * DEG_TO_RAD * SINCOS_PRECISION);
}

var perlin_PI = SINCOS_LENGTH;
perlin_PI >>= 1;

var Noise = function() {
  this.perlin_octaves = 4; // default to medium smooth
  this.perlin_amp_falloff = 0.5; // 50% reduction/octave
  this.perlin = null;
}

Noise.prototype = {

  noiseDetail: function(lod, falloff) {
    if (lod>0)     { this.perlin_octaves = lod; }
    if (falloff>0) { this.perlin_amp_falloff = falloff; }
    return this;
  },

  noiseSeed: function(seed) {

    // Linear Congruential Generator
    // Variant of a Lehman Generator
    var lcg = (function() {
      // Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
      // m is basically chosen to be large (as it is the max period)
      // and for its relationships to a and c
      var m = 4294967296,
      // a - 1 should be divisible by m's prime factors
      a = 1664525,
       // c and m should be co-prime
      c = 1013904223,
      seed, z;
      return {
        setSeed : function(val) {
          // pick a random seed if val is undefined or null
          // the >>> 0 casts the seed to an unsigned 32-bit integer
          z = seed = (val == null ? Math.random() * m : val) >>> 0;
        },
        getSeed : function() {
          return seed;
        },
        rand : function() {
          // define the recurrence relationship
          z = (a * z + c) % m;
          // return a float in [0, 1)
          // if z = m then z / m = 0 therefore (z % m) / m < 1 always
          return z / m;
        }
      };
    }());

    lcg.setSeed(seed);
    this.perlin = new Array(PERLIN_SIZE + 1);
    for (var i = 0; i < PERLIN_SIZE + 1; i++) {
      this.perlin[i] = lcg.rand();
    }
    return this;
  },

  get: function(x,y,z) {

    y = y || 0;
    z = z || 0;

    if(this.perlin == null) {
      this.perlin = new Array(PERLIN_SIZE + 1);
      for (var i = 0; i < PERLIN_SIZE + 1; i++) {
        this.perlin[i] = Math.random();
      }
    }

    if (x<0) { x=-x; }
    if (y<0) { y=-y; }
    if (z<0) { z=-z; }

    var xi=Math.floor(x), yi=Math.floor(y), zi=Math.floor(z);
    var xf = x - xi;
    var yf = y - yi;
    var zf = z - zi;
    var rxf, ryf;

    var r=0;
    var ampl=0.5;

    var n1,n2,n3;

    // Is this right do just have this here?
    var noise_fsc = function(i) {
      // using cosine lookup table
      return 0.5*(1.0-cosLUT[Math.floor(i*perlin_PI)%SINCOS_LENGTH]);
    };

    for (var o=0; o<this.perlin_octaves; o++) {
      var of=xi+(yi<<PERLIN_YWRAPB)+(zi<<PERLIN_ZWRAPB);

      rxf= noise_fsc(xf);
      ryf= noise_fsc(yf);

      n1  = this.perlin[of&PERLIN_SIZE];
      n1 += rxf*(this.perlin[(of+1)&PERLIN_SIZE]-n1);
      n2  = this.perlin[(of+PERLIN_YWRAP)&PERLIN_SIZE];
      n2 += rxf*(this.perlin[(of+PERLIN_YWRAP+1)&PERLIN_SIZE]-n2);
      n1 += ryf*(n2-n1);

      of += PERLIN_ZWRAP;
      n2  = this.perlin[of&PERLIN_SIZE];
      n2 += rxf*(this.perlin[(of+1)&PERLIN_SIZE]-n2);
      n3  = this.perlin[(of+PERLIN_YWRAP)&PERLIN_SIZE];
      n3 += rxf*(this.perlin[(of+PERLIN_YWRAP+1)&PERLIN_SIZE]-n3);
      n2 += ryf*(n3-n2);

      n1 += noise_fsc(zf)*(n2-n1);

      r += n1*ampl;
      ampl *= this.perlin_amp_falloff;
      xi<<=1;
      xf*=2;
      yi<<=1;
      yf*=2;
      zi<<=1;
      zf*=2;

      if (xf>=1.0) { xi++; xf--; }
      if (yf>=1.0) { yi++; yf--; }
      if (zf>=1.0) { zi++; zf--; }
    }
    return r;
  }

}

module.exports = Noise;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = Rune;

/***/ })
/******/ ]);