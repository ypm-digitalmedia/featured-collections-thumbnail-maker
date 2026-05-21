(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a2, b) => (typeof require !== "undefined" ? require : a2)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/js-binary-schema-parser/lib/index.js
  var require_lib = __commonJS({
    "node_modules/js-binary-schema-parser/lib/index.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.loop = exports2.conditional = exports2.parse = void 0;
      var parse = function parse2(stream2, schema) {
        var result = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var parent = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : result;
        if (Array.isArray(schema)) {
          schema.forEach(function(partSchema) {
            return parse2(stream2, partSchema, result, parent);
          });
        } else if (typeof schema === "function") {
          schema(stream2, result, parent, parse2);
        } else {
          var key = Object.keys(schema)[0];
          if (Array.isArray(schema[key])) {
            parent[key] = {};
            parse2(stream2, schema[key], result, parent[key]);
          } else {
            parent[key] = schema[key](stream2, result, parent, parse2);
          }
        }
        return result;
      };
      exports2.parse = parse;
      var conditional = function conditional2(schema, conditionFunc) {
        return function(stream2, result, parent, parse2) {
          if (conditionFunc(stream2, result, parent)) {
            parse2(stream2, schema, result, parent);
          }
        };
      };
      exports2.conditional = conditional;
      var loop = function loop2(schema, continueFunc) {
        return function(stream2, result, parent, parse2) {
          var arr = [];
          var lastStreamPos = stream2.pos;
          while (continueFunc(stream2, result, parent)) {
            var newParent = {};
            parse2(stream2, schema, result, newParent);
            if (stream2.pos === lastStreamPos) {
              break;
            }
            lastStreamPos = stream2.pos;
            arr.push(newParent);
          }
          return arr;
        };
      };
      exports2.loop = loop;
    }
  });

  // node_modules/js-binary-schema-parser/lib/parsers/uint8.js
  var require_uint8 = __commonJS({
    "node_modules/js-binary-schema-parser/lib/parsers/uint8.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.readBits = exports2.readArray = exports2.readUnsigned = exports2.readString = exports2.peekBytes = exports2.readBytes = exports2.peekByte = exports2.readByte = exports2.buildStream = void 0;
      var buildStream = function buildStream2(uint8Data) {
        return {
          data: uint8Data,
          pos: 0
        };
      };
      exports2.buildStream = buildStream;
      var readByte = function readByte2() {
        return function(stream2) {
          return stream2.data[stream2.pos++];
        };
      };
      exports2.readByte = readByte;
      var peekByte = function peekByte2() {
        var offset = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
        return function(stream2) {
          return stream2.data[stream2.pos + offset];
        };
      };
      exports2.peekByte = peekByte;
      var readBytes = function readBytes2(length) {
        return function(stream2) {
          return stream2.data.subarray(stream2.pos, stream2.pos += length);
        };
      };
      exports2.readBytes = readBytes;
      var peekBytes = function peekBytes2(length) {
        return function(stream2) {
          return stream2.data.subarray(stream2.pos, stream2.pos + length);
        };
      };
      exports2.peekBytes = peekBytes;
      var readString = function readString2(length) {
        return function(stream2) {
          return Array.from(readBytes(length)(stream2)).map(function(value) {
            return String.fromCharCode(value);
          }).join("");
        };
      };
      exports2.readString = readString;
      var readUnsigned = function readUnsigned2(littleEndian) {
        return function(stream2) {
          var bytes = readBytes(2)(stream2);
          return littleEndian ? (bytes[1] << 8) + bytes[0] : (bytes[0] << 8) + bytes[1];
        };
      };
      exports2.readUnsigned = readUnsigned;
      var readArray = function readArray2(byteSize, totalOrFunc) {
        return function(stream2, result, parent) {
          var total = typeof totalOrFunc === "function" ? totalOrFunc(stream2, result, parent) : totalOrFunc;
          var parser = readBytes(byteSize);
          var arr = new Array(total);
          for (var i = 0; i < total; i++) {
            arr[i] = parser(stream2);
          }
          return arr;
        };
      };
      exports2.readArray = readArray;
      var subBitsTotal = function subBitsTotal2(bits, startIndex, length) {
        var result = 0;
        for (var i = 0; i < length; i++) {
          result += bits[startIndex + i] && Math.pow(2, length - i - 1);
        }
        return result;
      };
      var readBits = function readBits2(schema) {
        return function(stream2) {
          var _byte = readByte()(stream2);
          var bits = new Array(8);
          for (var i = 0; i < 8; i++) {
            bits[7 - i] = !!(_byte & 1 << i);
          }
          return Object.keys(schema).reduce(function(res, key) {
            var def = schema[key];
            if (def.length) {
              res[key] = subBitsTotal(bits, def.index, def.length);
            } else {
              res[key] = bits[def.index];
            }
            return res;
          }, {});
        };
      };
      exports2.readBits = readBits;
    }
  });

  // node_modules/js-binary-schema-parser/lib/schemas/gif.js
  var require_gif = __commonJS({
    "node_modules/js-binary-schema-parser/lib/schemas/gif.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2["default"] = void 0;
      var _ = require_lib();
      var _uint = require_uint8();
      var subBlocksSchema = {
        blocks: function blocks(stream2) {
          var terminator = 0;
          var chunks = [];
          var streamSize = stream2.data.length;
          var total = 0;
          for (var size = (0, _uint.readByte)()(stream2); size !== terminator; size = (0, _uint.readByte)()(stream2)) {
            if (!size) break;
            if (stream2.pos + size >= streamSize) {
              var availableSize = streamSize - stream2.pos;
              chunks.push((0, _uint.readBytes)(availableSize)(stream2));
              total += availableSize;
              break;
            }
            chunks.push((0, _uint.readBytes)(size)(stream2));
            total += size;
          }
          var result = new Uint8Array(total);
          var offset = 0;
          for (var i = 0; i < chunks.length; i++) {
            result.set(chunks[i], offset);
            offset += chunks[i].length;
          }
          return result;
        }
      };
      var gceSchema = (0, _.conditional)({
        gce: [{
          codes: (0, _uint.readBytes)(2)
        }, {
          byteSize: (0, _uint.readByte)()
        }, {
          extras: (0, _uint.readBits)({
            future: {
              index: 0,
              length: 3
            },
            disposal: {
              index: 3,
              length: 3
            },
            userInput: {
              index: 6
            },
            transparentColorGiven: {
              index: 7
            }
          })
        }, {
          delay: (0, _uint.readUnsigned)(true)
        }, {
          transparentColorIndex: (0, _uint.readByte)()
        }, {
          terminator: (0, _uint.readByte)()
        }]
      }, function(stream2) {
        var codes = (0, _uint.peekBytes)(2)(stream2);
        return codes[0] === 33 && codes[1] === 249;
      });
      var imageSchema = (0, _.conditional)({
        image: [{
          code: (0, _uint.readByte)()
        }, {
          descriptor: [{
            left: (0, _uint.readUnsigned)(true)
          }, {
            top: (0, _uint.readUnsigned)(true)
          }, {
            width: (0, _uint.readUnsigned)(true)
          }, {
            height: (0, _uint.readUnsigned)(true)
          }, {
            lct: (0, _uint.readBits)({
              exists: {
                index: 0
              },
              interlaced: {
                index: 1
              },
              sort: {
                index: 2
              },
              future: {
                index: 3,
                length: 2
              },
              size: {
                index: 5,
                length: 3
              }
            })
          }]
        }, (0, _.conditional)({
          lct: (0, _uint.readArray)(3, function(stream2, result, parent) {
            return Math.pow(2, parent.descriptor.lct.size + 1);
          })
        }, function(stream2, result, parent) {
          return parent.descriptor.lct.exists;
        }), {
          data: [{
            minCodeSize: (0, _uint.readByte)()
          }, subBlocksSchema]
        }]
      }, function(stream2) {
        return (0, _uint.peekByte)()(stream2) === 44;
      });
      var textSchema = (0, _.conditional)({
        text: [{
          codes: (0, _uint.readBytes)(2)
        }, {
          blockSize: (0, _uint.readByte)()
        }, {
          preData: function preData(stream2, result, parent) {
            return (0, _uint.readBytes)(parent.text.blockSize)(stream2);
          }
        }, subBlocksSchema]
      }, function(stream2) {
        var codes = (0, _uint.peekBytes)(2)(stream2);
        return codes[0] === 33 && codes[1] === 1;
      });
      var applicationSchema = (0, _.conditional)({
        application: [{
          codes: (0, _uint.readBytes)(2)
        }, {
          blockSize: (0, _uint.readByte)()
        }, {
          id: function id(stream2, result, parent) {
            return (0, _uint.readString)(parent.blockSize)(stream2);
          }
        }, subBlocksSchema]
      }, function(stream2) {
        var codes = (0, _uint.peekBytes)(2)(stream2);
        return codes[0] === 33 && codes[1] === 255;
      });
      var commentSchema = (0, _.conditional)({
        comment: [{
          codes: (0, _uint.readBytes)(2)
        }, subBlocksSchema]
      }, function(stream2) {
        var codes = (0, _uint.peekBytes)(2)(stream2);
        return codes[0] === 33 && codes[1] === 254;
      });
      var schema = [
        {
          header: [{
            signature: (0, _uint.readString)(3)
          }, {
            version: (0, _uint.readString)(3)
          }]
        },
        {
          lsd: [{
            width: (0, _uint.readUnsigned)(true)
          }, {
            height: (0, _uint.readUnsigned)(true)
          }, {
            gct: (0, _uint.readBits)({
              exists: {
                index: 0
              },
              resolution: {
                index: 1,
                length: 3
              },
              sort: {
                index: 4
              },
              size: {
                index: 5,
                length: 3
              }
            })
          }, {
            backgroundColorIndex: (0, _uint.readByte)()
          }, {
            pixelAspectRatio: (0, _uint.readByte)()
          }]
        },
        (0, _.conditional)({
          gct: (0, _uint.readArray)(3, function(stream2, result) {
            return Math.pow(2, result.lsd.gct.size + 1);
          })
        }, function(stream2, result) {
          return result.lsd.gct.exists;
        }),
        // content frames
        {
          frames: (0, _.loop)([gceSchema, applicationSchema, commentSchema, imageSchema, textSchema], function(stream2) {
            var nextCode = (0, _uint.peekByte)()(stream2);
            return nextCode === 33 || nextCode === 44;
          })
        }
      ];
      var _default = schema;
      exports2["default"] = _default;
    }
  });

  // node_modules/gifuct-js/lib/deinterlace.js
  var require_deinterlace = __commonJS({
    "node_modules/gifuct-js/lib/deinterlace.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.deinterlace = void 0;
      var deinterlace = function deinterlace2(pixels, width) {
        var newPixels = new Array(pixels.length);
        var rows = pixels.length / width;
        var cpRow = function cpRow2(toRow2, fromRow2) {
          var fromPixels = pixels.slice(fromRow2 * width, (fromRow2 + 1) * width);
          newPixels.splice.apply(newPixels, [toRow2 * width, width].concat(fromPixels));
        };
        var offsets = [0, 4, 2, 1];
        var steps = [8, 8, 4, 2];
        var fromRow = 0;
        for (var pass = 0; pass < 4; pass++) {
          for (var toRow = offsets[pass]; toRow < rows; toRow += steps[pass]) {
            cpRow(toRow, fromRow);
            fromRow++;
          }
        }
        return newPixels;
      };
      exports2.deinterlace = deinterlace;
    }
  });

  // node_modules/gifuct-js/lib/lzw.js
  var require_lzw = __commonJS({
    "node_modules/gifuct-js/lib/lzw.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.lzw = void 0;
      var lzw = function lzw2(minCodeSize, data, pixelCount) {
        var MAX_STACK_SIZE = 4096;
        var nullCode = -1;
        var npix = pixelCount;
        var available, clear, code_mask, code_size, end_of_information, in_code, old_code, bits, code, i, datum, data_size, first, top, bi, pi;
        var dstPixels = new Array(pixelCount);
        var prefix = new Array(MAX_STACK_SIZE);
        var suffix = new Array(MAX_STACK_SIZE);
        var pixelStack = new Array(MAX_STACK_SIZE + 1);
        data_size = minCodeSize;
        clear = 1 << data_size;
        end_of_information = clear + 1;
        available = clear + 2;
        old_code = nullCode;
        code_size = data_size + 1;
        code_mask = (1 << code_size) - 1;
        for (code = 0; code < clear; code++) {
          prefix[code] = 0;
          suffix[code] = code;
        }
        var datum, bits, count, first, top, pi, bi;
        datum = bits = count = first = top = pi = bi = 0;
        for (i = 0; i < npix; ) {
          if (top === 0) {
            if (bits < code_size) {
              datum += data[bi] << bits;
              bits += 8;
              bi++;
              continue;
            }
            code = datum & code_mask;
            datum >>= code_size;
            bits -= code_size;
            if (code > available || code == end_of_information) {
              break;
            }
            if (code == clear) {
              code_size = data_size + 1;
              code_mask = (1 << code_size) - 1;
              available = clear + 2;
              old_code = nullCode;
              continue;
            }
            if (old_code == nullCode) {
              pixelStack[top++] = suffix[code];
              old_code = code;
              first = code;
              continue;
            }
            in_code = code;
            if (code == available) {
              pixelStack[top++] = first;
              code = old_code;
            }
            while (code > clear) {
              pixelStack[top++] = suffix[code];
              code = prefix[code];
            }
            first = suffix[code] & 255;
            pixelStack[top++] = first;
            if (available < MAX_STACK_SIZE) {
              prefix[available] = old_code;
              suffix[available] = first;
              available++;
              if ((available & code_mask) === 0 && available < MAX_STACK_SIZE) {
                code_size++;
                code_mask += available;
              }
            }
            old_code = in_code;
          }
          top--;
          dstPixels[pi++] = pixelStack[top];
          i++;
        }
        for (i = pi; i < npix; i++) {
          dstPixels[i] = 0;
        }
        return dstPixels;
      };
      exports2.lzw = lzw;
    }
  });

  // node_modules/gifuct-js/lib/index.js
  var require_lib2 = __commonJS({
    "node_modules/gifuct-js/lib/index.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.decompressFrames = exports2.decompressFrame = exports2.parseGIF = void 0;
      var _gif = _interopRequireDefault(require_gif());
      var _jsBinarySchemaParser = require_lib();
      var _uint = require_uint8();
      var _deinterlace = require_deinterlace();
      var _lzw = require_lzw();
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      var parseGIF = function parseGIF2(arrayBuffer) {
        var byteData = new Uint8Array(arrayBuffer);
        return (0, _jsBinarySchemaParser.parse)((0, _uint.buildStream)(byteData), _gif["default"]);
      };
      exports2.parseGIF = parseGIF;
      var generatePatch = function generatePatch2(image) {
        var totalPixels = image.pixels.length;
        var patchData = new Uint8ClampedArray(totalPixels * 4);
        for (var i = 0; i < totalPixels; i++) {
          var pos = i * 4;
          var colorIndex = image.pixels[i];
          var color = image.colorTable[colorIndex] || [0, 0, 0];
          patchData[pos] = color[0];
          patchData[pos + 1] = color[1];
          patchData[pos + 2] = color[2];
          patchData[pos + 3] = colorIndex !== image.transparentIndex ? 255 : 0;
        }
        return patchData;
      };
      var decompressFrame = function decompressFrame2(frame, gct, buildImagePatch) {
        if (!frame.image) {
          console.warn("gif frame does not have associated image.");
          return;
        }
        var image = frame.image;
        var totalPixels = image.descriptor.width * image.descriptor.height;
        var pixels = (0, _lzw.lzw)(image.data.minCodeSize, image.data.blocks, totalPixels);
        if (image.descriptor.lct.interlaced) {
          pixels = (0, _deinterlace.deinterlace)(pixels, image.descriptor.width);
        }
        var resultImage = {
          pixels,
          dims: {
            top: frame.image.descriptor.top,
            left: frame.image.descriptor.left,
            width: frame.image.descriptor.width,
            height: frame.image.descriptor.height
          }
        };
        if (image.descriptor.lct && image.descriptor.lct.exists) {
          resultImage.colorTable = image.lct;
        } else {
          resultImage.colorTable = gct;
        }
        if (frame.gce) {
          resultImage.delay = (frame.gce.delay || 10) * 10;
          resultImage.disposalType = frame.gce.extras.disposal;
          if (frame.gce.extras.transparentColorGiven) {
            resultImage.transparentIndex = frame.gce.transparentColorIndex;
          }
        }
        if (buildImagePatch) {
          resultImage.patch = generatePatch(resultImage);
        }
        return resultImage;
      };
      exports2.decompressFrame = decompressFrame;
      var decompressFrames = function decompressFrames2(parsedGif, buildImagePatches) {
        return parsedGif.frames.filter(function(f) {
          return f.image;
        }).map(function(f) {
          return decompressFrame(f, parsedGif.gct, buildImagePatches);
        });
      };
      exports2.decompressFrames = decompressFrames;
    }
  });

  // node_modules/super-image-cropper/esm/lib/decoder.js
  var import_gifuct_js;
  var init_decoder = __esm({
    "node_modules/super-image-cropper/esm/lib/decoder.js"() {
      import_gifuct_js = __toESM(require_lib2(), 1);
    }
  });

  // node_modules/gif-build-worker-js/esm/lib/gif.worker.js
  var init_gif_worker = __esm({
    "node_modules/gif-build-worker-js/esm/lib/gif.worker.js"() {
    }
  });

  // node_modules/gif-build-worker-js/esm/index.js
  var init_esm = __esm({
    "node_modules/gif-build-worker-js/esm/index.js"() {
      init_gif_worker();
    }
  });

  // node_modules/gif.js/dist/gif.js
  var require_gif2 = __commonJS({
    "node_modules/gif.js/dist/gif.js"(exports2, module2) {
      (function(f) {
        if (typeof exports2 === "object" && typeof module2 !== "undefined") {
          module2.exports = f();
        } else if (typeof define === "function" && define.amd) {
          define([], f);
        } else {
          var g;
          if (typeof window !== "undefined") {
            g = window;
          } else if (typeof global !== "undefined") {
            g = global;
          } else if (typeof self !== "undefined") {
            g = self;
          } else {
            g = this;
          }
          g.GIF = f();
        }
      })(function() {
        var define2, module3, exports3;
        return (function e3(t5, n2, r3) {
          function s2(o3, u) {
            if (!n2[o3]) {
              if (!t5[o3]) {
                var a2 = typeof __require == "function" && __require;
                if (!u && a2) return a2(o3, true);
                if (i) return i(o3, true);
                var f = new Error("Cannot find module '" + o3 + "'");
                throw f.code = "MODULE_NOT_FOUND", f;
              }
              var l = n2[o3] = { exports: {} };
              t5[o3][0].call(l.exports, function(e4) {
                var n3 = t5[o3][1][e4];
                return s2(n3 ? n3 : e4);
              }, l, l.exports, e3, t5, n2, r3);
            }
            return n2[o3].exports;
          }
          var i = typeof __require == "function" && __require;
          for (var o2 = 0; o2 < r3.length; o2++) s2(r3[o2]);
          return s2;
        })({ 1: [function(require2, module4, exports4) {
          function EventEmitter() {
            this._events = this._events || {};
            this._maxListeners = this._maxListeners || void 0;
          }
          module4.exports = EventEmitter;
          EventEmitter.EventEmitter = EventEmitter;
          EventEmitter.prototype._events = void 0;
          EventEmitter.prototype._maxListeners = void 0;
          EventEmitter.defaultMaxListeners = 10;
          EventEmitter.prototype.setMaxListeners = function(n2) {
            if (!isNumber(n2) || n2 < 0 || isNaN(n2)) throw TypeError("n must be a positive number");
            this._maxListeners = n2;
            return this;
          };
          EventEmitter.prototype.emit = function(type) {
            var er, handler, len, args, i, listeners;
            if (!this._events) this._events = {};
            if (type === "error") {
              if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
                er = arguments[1];
                if (er instanceof Error) {
                  throw er;
                } else {
                  var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
                  err.context = er;
                  throw err;
                }
              }
            }
            handler = this._events[type];
            if (isUndefined(handler)) return false;
            if (isFunction(handler)) {
              switch (arguments.length) {
                case 1:
                  handler.call(this);
                  break;
                case 2:
                  handler.call(this, arguments[1]);
                  break;
                case 3:
                  handler.call(this, arguments[1], arguments[2]);
                  break;
                default:
                  args = Array.prototype.slice.call(arguments, 1);
                  handler.apply(this, args);
              }
            } else if (isObject(handler)) {
              args = Array.prototype.slice.call(arguments, 1);
              listeners = handler.slice();
              len = listeners.length;
              for (i = 0; i < len; i++) listeners[i].apply(this, args);
            }
            return true;
          };
          EventEmitter.prototype.addListener = function(type, listener) {
            var m;
            if (!isFunction(listener)) throw TypeError("listener must be a function");
            if (!this._events) this._events = {};
            if (this._events.newListener) this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener);
            if (!this._events[type]) this._events[type] = listener;
            else if (isObject(this._events[type])) this._events[type].push(listener);
            else this._events[type] = [this._events[type], listener];
            if (isObject(this._events[type]) && !this._events[type].warned) {
              if (!isUndefined(this._maxListeners)) {
                m = this._maxListeners;
              } else {
                m = EventEmitter.defaultMaxListeners;
              }
              if (m && m > 0 && this._events[type].length > m) {
                this._events[type].warned = true;
                console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[type].length);
                if (typeof console.trace === "function") {
                  console.trace();
                }
              }
            }
            return this;
          };
          EventEmitter.prototype.on = EventEmitter.prototype.addListener;
          EventEmitter.prototype.once = function(type, listener) {
            if (!isFunction(listener)) throw TypeError("listener must be a function");
            var fired = false;
            function g() {
              this.removeListener(type, g);
              if (!fired) {
                fired = true;
                listener.apply(this, arguments);
              }
            }
            g.listener = listener;
            this.on(type, g);
            return this;
          };
          EventEmitter.prototype.removeListener = function(type, listener) {
            var list, position, length, i;
            if (!isFunction(listener)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[type]) return this;
            list = this._events[type];
            length = list.length;
            position = -1;
            if (list === listener || isFunction(list.listener) && list.listener === listener) {
              delete this._events[type];
              if (this._events.removeListener) this.emit("removeListener", type, listener);
            } else if (isObject(list)) {
              for (i = length; i-- > 0; ) {
                if (list[i] === listener || list[i].listener && list[i].listener === listener) {
                  position = i;
                  break;
                }
              }
              if (position < 0) return this;
              if (list.length === 1) {
                list.length = 0;
                delete this._events[type];
              } else {
                list.splice(position, 1);
              }
              if (this._events.removeListener) this.emit("removeListener", type, listener);
            }
            return this;
          };
          EventEmitter.prototype.removeAllListeners = function(type) {
            var key, listeners;
            if (!this._events) return this;
            if (!this._events.removeListener) {
              if (arguments.length === 0) this._events = {};
              else if (this._events[type]) delete this._events[type];
              return this;
            }
            if (arguments.length === 0) {
              for (key in this._events) {
                if (key === "removeListener") continue;
                this.removeAllListeners(key);
              }
              this.removeAllListeners("removeListener");
              this._events = {};
              return this;
            }
            listeners = this._events[type];
            if (isFunction(listeners)) {
              this.removeListener(type, listeners);
            } else if (listeners) {
              while (listeners.length) this.removeListener(type, listeners[listeners.length - 1]);
            }
            delete this._events[type];
            return this;
          };
          EventEmitter.prototype.listeners = function(type) {
            var ret;
            if (!this._events || !this._events[type]) ret = [];
            else if (isFunction(this._events[type])) ret = [this._events[type]];
            else ret = this._events[type].slice();
            return ret;
          };
          EventEmitter.prototype.listenerCount = function(type) {
            if (this._events) {
              var evlistener = this._events[type];
              if (isFunction(evlistener)) return 1;
              else if (evlistener) return evlistener.length;
            }
            return 0;
          };
          EventEmitter.listenerCount = function(emitter, type) {
            return emitter.listenerCount(type);
          };
          function isFunction(arg) {
            return typeof arg === "function";
          }
          function isNumber(arg) {
            return typeof arg === "number";
          }
          function isObject(arg) {
            return typeof arg === "object" && arg !== null;
          }
          function isUndefined(arg) {
            return arg === void 0;
          }
        }, {}], 2: [function(require2, module4, exports4) {
          var UA, browser, mode, platform, ua;
          ua = navigator.userAgent.toLowerCase();
          platform = navigator.platform.toLowerCase();
          UA = ua.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || [null, "unknown", 0];
          mode = UA[1] === "ie" && document.documentMode;
          browser = { name: UA[1] === "version" ? UA[3] : UA[1], version: mode || parseFloat(UA[1] === "opera" && UA[4] ? UA[4] : UA[2]), platform: { name: ua.match(/ip(?:ad|od|hone)/) ? "ios" : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ["other"])[0] } };
          browser[browser.name] = true;
          browser[browser.name + parseInt(browser.version, 10)] = true;
          browser.platform[browser.platform.name] = true;
          module4.exports = browser;
        }, {}], 3: [function(require2, module4, exports4) {
          var EventEmitter, GIF, browser, extend = function(child, parent) {
            for (var key in parent) {
              if (hasProp.call(parent, key)) child[key] = parent[key];
            }
            function ctor() {
              this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
          }, hasProp = {}.hasOwnProperty, indexOf = [].indexOf || function(item) {
            for (var i = 0, l = this.length; i < l; i++) {
              if (i in this && this[i] === item) return i;
            }
            return -1;
          }, slice = [].slice;
          EventEmitter = require2("events").EventEmitter;
          browser = require2("./browser.coffee");
          GIF = (function(superClass) {
            var defaults, frameDefaults;
            extend(GIF2, superClass);
            defaults = { workerScript: "gif.worker.js", workers: 2, repeat: 0, background: "#fff", quality: 10, width: null, height: null, transparent: null, debug: false, dither: false };
            frameDefaults = { delay: 500, copy: false };
            function GIF2(options) {
              var base, key, value;
              this.running = false;
              this.options = {};
              this.frames = [];
              this.freeWorkers = [];
              this.activeWorkers = [];
              this.setOptions(options);
              for (key in defaults) {
                value = defaults[key];
                if ((base = this.options)[key] == null) {
                  base[key] = value;
                }
              }
            }
            GIF2.prototype.setOption = function(key, value) {
              this.options[key] = value;
              if (this._canvas != null && (key === "width" || key === "height")) {
                return this._canvas[key] = value;
              }
            };
            GIF2.prototype.setOptions = function(options) {
              var key, results, value;
              results = [];
              for (key in options) {
                if (!hasProp.call(options, key)) continue;
                value = options[key];
                results.push(this.setOption(key, value));
              }
              return results;
            };
            GIF2.prototype.addFrame = function(image, options) {
              var frame, key;
              if (options == null) {
                options = {};
              }
              frame = {};
              frame.transparent = this.options.transparent;
              for (key in frameDefaults) {
                frame[key] = options[key] || frameDefaults[key];
              }
              if (this.options.width == null) {
                this.setOption("width", image.width);
              }
              if (this.options.height == null) {
                this.setOption("height", image.height);
              }
              if (typeof ImageData !== "undefined" && ImageData !== null && image instanceof ImageData) {
                frame.data = image.data;
              } else if (typeof CanvasRenderingContext2D !== "undefined" && CanvasRenderingContext2D !== null && image instanceof CanvasRenderingContext2D || typeof WebGLRenderingContext !== "undefined" && WebGLRenderingContext !== null && image instanceof WebGLRenderingContext) {
                if (options.copy) {
                  frame.data = this.getContextData(image);
                } else {
                  frame.context = image;
                }
              } else if (image.childNodes != null) {
                if (options.copy) {
                  frame.data = this.getImageData(image);
                } else {
                  frame.image = image;
                }
              } else {
                throw new Error("Invalid image");
              }
              return this.frames.push(frame);
            };
            GIF2.prototype.render = function() {
              var i, j, numWorkers, ref;
              if (this.running) {
                throw new Error("Already running");
              }
              if (this.options.width == null || this.options.height == null) {
                throw new Error("Width and height must be set prior to rendering");
              }
              this.running = true;
              this.nextFrame = 0;
              this.finishedFrames = 0;
              this.imageParts = function() {
                var j2, ref2, results;
                results = [];
                for (i = j2 = 0, ref2 = this.frames.length; 0 <= ref2 ? j2 < ref2 : j2 > ref2; i = 0 <= ref2 ? ++j2 : --j2) {
                  results.push(null);
                }
                return results;
              }.call(this);
              numWorkers = this.spawnWorkers();
              if (this.options.globalPalette === true) {
                this.renderNextFrame();
              } else {
                for (i = j = 0, ref = numWorkers; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
                  this.renderNextFrame();
                }
              }
              this.emit("start");
              return this.emit("progress", 0);
            };
            GIF2.prototype.abort = function() {
              var worker;
              while (true) {
                worker = this.activeWorkers.shift();
                if (worker == null) {
                  break;
                }
                this.log("killing active worker");
                worker.terminate();
              }
              this.running = false;
              return this.emit("abort");
            };
            GIF2.prototype.spawnWorkers = function() {
              var j, numWorkers, ref, results;
              numWorkers = Math.min(this.options.workers, this.frames.length);
              (function() {
                results = [];
                for (var j2 = ref = this.freeWorkers.length; ref <= numWorkers ? j2 < numWorkers : j2 > numWorkers; ref <= numWorkers ? j2++ : j2--) {
                  results.push(j2);
                }
                return results;
              }).apply(this).forEach(/* @__PURE__ */ (function(_this) {
                return function(i) {
                  var worker;
                  _this.log("spawning worker " + i);
                  worker = new Worker(_this.options.workerScript);
                  worker.onmessage = function(event) {
                    _this.activeWorkers.splice(_this.activeWorkers.indexOf(worker), 1);
                    _this.freeWorkers.push(worker);
                    return _this.frameFinished(event.data);
                  };
                  return _this.freeWorkers.push(worker);
                };
              })(this));
              return numWorkers;
            };
            GIF2.prototype.frameFinished = function(frame) {
              var i, j, ref;
              this.log("frame " + frame.index + " finished - " + this.activeWorkers.length + " active");
              this.finishedFrames++;
              this.emit("progress", this.finishedFrames / this.frames.length);
              this.imageParts[frame.index] = frame;
              if (this.options.globalPalette === true) {
                this.options.globalPalette = frame.globalPalette;
                this.log("global palette analyzed");
                if (this.frames.length > 2) {
                  for (i = j = 1, ref = this.freeWorkers.length; 1 <= ref ? j < ref : j > ref; i = 1 <= ref ? ++j : --j) {
                    this.renderNextFrame();
                  }
                }
              }
              if (indexOf.call(this.imageParts, null) >= 0) {
                return this.renderNextFrame();
              } else {
                return this.finishRendering();
              }
            };
            GIF2.prototype.finishRendering = function() {
              var data, frame, i, image, j, k, l, len, len1, len2, len3, offset, page, ref, ref1, ref2;
              len = 0;
              ref = this.imageParts;
              for (j = 0, len1 = ref.length; j < len1; j++) {
                frame = ref[j];
                len += (frame.data.length - 1) * frame.pageSize + frame.cursor;
              }
              len += frame.pageSize - frame.cursor;
              this.log("rendering finished - filesize " + Math.round(len / 1e3) + "kb");
              data = new Uint8Array(len);
              offset = 0;
              ref1 = this.imageParts;
              for (k = 0, len2 = ref1.length; k < len2; k++) {
                frame = ref1[k];
                ref2 = frame.data;
                for (i = l = 0, len3 = ref2.length; l < len3; i = ++l) {
                  page = ref2[i];
                  data.set(page, offset);
                  if (i === frame.data.length - 1) {
                    offset += frame.cursor;
                  } else {
                    offset += frame.pageSize;
                  }
                }
              }
              image = new Blob([data], { type: "image/gif" });
              return this.emit("finished", image, data);
            };
            GIF2.prototype.renderNextFrame = function() {
              var frame, task, worker;
              if (this.freeWorkers.length === 0) {
                throw new Error("No free workers");
              }
              if (this.nextFrame >= this.frames.length) {
                return;
              }
              frame = this.frames[this.nextFrame++];
              worker = this.freeWorkers.shift();
              task = this.getTask(frame);
              this.log("starting frame " + (task.index + 1) + " of " + this.frames.length);
              this.activeWorkers.push(worker);
              return worker.postMessage(task);
            };
            GIF2.prototype.getContextData = function(ctx) {
              return ctx.getImageData(0, 0, this.options.width, this.options.height).data;
            };
            GIF2.prototype.getImageData = function(image) {
              var ctx;
              if (this._canvas == null) {
                this._canvas = document.createElement("canvas");
                this._canvas.width = this.options.width;
                this._canvas.height = this.options.height;
              }
              ctx = this._canvas.getContext("2d");
              ctx.setFill = this.options.background;
              ctx.fillRect(0, 0, this.options.width, this.options.height);
              ctx.drawImage(image, 0, 0);
              return this.getContextData(ctx);
            };
            GIF2.prototype.getTask = function(frame) {
              var index, task;
              index = this.frames.indexOf(frame);
              task = { index, last: index === this.frames.length - 1, delay: frame.delay, transparent: frame.transparent, width: this.options.width, height: this.options.height, quality: this.options.quality, dither: this.options.dither, globalPalette: this.options.globalPalette, repeat: this.options.repeat, canTransfer: browser.name === "chrome" };
              if (frame.data != null) {
                task.data = frame.data;
              } else if (frame.context != null) {
                task.data = this.getContextData(frame.context);
              } else if (frame.image != null) {
                task.data = this.getImageData(frame.image);
              } else {
                throw new Error("Invalid frame");
              }
              return task;
            };
            GIF2.prototype.log = function() {
              var args;
              args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
              if (!this.options.debug) {
                return;
              }
              return console.log.apply(console, args);
            };
            return GIF2;
          })(EventEmitter);
          module4.exports = GIF;
        }, { "./browser.coffee": 2, events: 1 }] }, {}, [3])(3);
      });
    }
  });

  // node_modules/super-image-cropper/esm/lib/synthetic-gif.js
  var import_gif;
  var init_synthetic_gif = __esm({
    "node_modules/super-image-cropper/esm/lib/synthetic-gif.js"() {
      init_esm();
      import_gif = __toESM(require_gif2(), 1);
      init_esm2();
    }
  });

  // node_modules/super-image-cropper/esm/lib/cropper.js
  var init_cropper = __esm({
    "node_modules/super-image-cropper/esm/lib/cropper.js"() {
    }
  });

  // node_modules/file-type/index.js
  var require_file_type = __commonJS({
    "node_modules/file-type/index.js"(exports, module) {
      "use strict";
      var toBytes = (s2) => [...s2].map((c) => c.charCodeAt(0));
      var xpiZipFilename = toBytes("META-INF/mozilla.rsa");
      var oxmlContentTypes = toBytes("[Content_Types].xml");
      var oxmlRels = toBytes("_rels/.rels");
      function readUInt64LE(buf, offset = 0) {
        let n2 = buf[offset];
        let mul = 1;
        let i = 0;
        while (++i < 8) {
          mul *= 256;
          n2 += buf[offset + i] * mul;
        }
        return n2;
      }
      var fileType = (input) => {
        if (!(input instanceof Uint8Array || input instanceof ArrayBuffer || Buffer.isBuffer(input))) {
          throw new TypeError(`Expected the \`input\` argument to be of type \`Uint8Array\` or \`Buffer\` or \`ArrayBuffer\`, got \`${typeof input}\``);
        }
        const buf = input instanceof Uint8Array ? input : new Uint8Array(input);
        if (!(buf && buf.length > 1)) {
          return null;
        }
        const check = (header, options) => {
          options = Object.assign({
            offset: 0
          }, options);
          for (let i = 0; i < header.length; i++) {
            if (options.mask) {
              if (header[i] !== (options.mask[i] & buf[i + options.offset])) {
                return false;
              }
            } else if (header[i] !== buf[i + options.offset]) {
              return false;
            }
          }
          return true;
        };
        const checkString = (header, options) => check(toBytes(header), options);
        if (check([255, 216, 255])) {
          return {
            ext: "jpg",
            mime: "image/jpeg"
          };
        }
        if (check([137, 80, 78, 71, 13, 10, 26, 10])) {
          return {
            ext: "png",
            mime: "image/png"
          };
        }
        if (check([71, 73, 70])) {
          return {
            ext: "gif",
            mime: "image/gif"
          };
        }
        if (check([87, 69, 66, 80], { offset: 8 })) {
          return {
            ext: "webp",
            mime: "image/webp"
          };
        }
        if (check([70, 76, 73, 70])) {
          return {
            ext: "flif",
            mime: "image/flif"
          };
        }
        if ((check([73, 73, 42, 0]) || check([77, 77, 0, 42])) && check([67, 82], { offset: 8 })) {
          return {
            ext: "cr2",
            mime: "image/x-canon-cr2"
          };
        }
        if (check([73, 73, 42, 0]) || check([77, 77, 0, 42])) {
          return {
            ext: "tif",
            mime: "image/tiff"
          };
        }
        if (check([66, 77])) {
          return {
            ext: "bmp",
            mime: "image/bmp"
          };
        }
        if (check([73, 73, 188])) {
          return {
            ext: "jxr",
            mime: "image/vnd.ms-photo"
          };
        }
        if (check([56, 66, 80, 83])) {
          return {
            ext: "psd",
            mime: "image/vnd.adobe.photoshop"
          };
        }
        if (check([80, 75, 3, 4])) {
          if (check([109, 105, 109, 101, 116, 121, 112, 101, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 47, 101, 112, 117, 98, 43, 122, 105, 112], { offset: 30 })) {
            return {
              ext: "epub",
              mime: "application/epub+zip"
            };
          }
          if (check(xpiZipFilename, { offset: 30 })) {
            return {
              ext: "xpi",
              mime: "application/x-xpinstall"
            };
          }
          if (checkString("mimetypeapplication/vnd.oasis.opendocument.text", { offset: 30 })) {
            return {
              ext: "odt",
              mime: "application/vnd.oasis.opendocument.text"
            };
          }
          if (checkString("mimetypeapplication/vnd.oasis.opendocument.spreadsheet", { offset: 30 })) {
            return {
              ext: "ods",
              mime: "application/vnd.oasis.opendocument.spreadsheet"
            };
          }
          if (checkString("mimetypeapplication/vnd.oasis.opendocument.presentation", { offset: 30 })) {
            return {
              ext: "odp",
              mime: "application/vnd.oasis.opendocument.presentation"
            };
          }
          const findNextZipHeaderIndex = (arr, startAt = 0) => arr.findIndex((el, i, arr2) => i >= startAt && arr2[i] === 80 && arr2[i + 1] === 75 && arr2[i + 2] === 3 && arr2[i + 3] === 4);
          let zipHeaderIndex = 0;
          let oxmlFound = false;
          let type = null;
          do {
            const offset = zipHeaderIndex + 30;
            if (!oxmlFound) {
              oxmlFound = check(oxmlContentTypes, { offset }) || check(oxmlRels, { offset });
            }
            if (!type) {
              if (checkString("word/", { offset })) {
                type = {
                  ext: "docx",
                  mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                };
              } else if (checkString("ppt/", { offset })) {
                type = {
                  ext: "pptx",
                  mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                };
              } else if (checkString("xl/", { offset })) {
                type = {
                  ext: "xlsx",
                  mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                };
              }
            }
            if (oxmlFound && type) {
              return type;
            }
            zipHeaderIndex = findNextZipHeaderIndex(buf, offset);
          } while (zipHeaderIndex >= 0);
          if (type) {
            return type;
          }
        }
        if (check([80, 75]) && (buf[2] === 3 || buf[2] === 5 || buf[2] === 7) && (buf[3] === 4 || buf[3] === 6 || buf[3] === 8)) {
          return {
            ext: "zip",
            mime: "application/zip"
          };
        }
        if (check([117, 115, 116, 97, 114], { offset: 257 })) {
          return {
            ext: "tar",
            mime: "application/x-tar"
          };
        }
        if (check([82, 97, 114, 33, 26, 7]) && (buf[6] === 0 || buf[6] === 1)) {
          return {
            ext: "rar",
            mime: "application/x-rar-compressed"
          };
        }
        if (check([31, 139, 8])) {
          return {
            ext: "gz",
            mime: "application/gzip"
          };
        }
        if (check([66, 90, 104])) {
          return {
            ext: "bz2",
            mime: "application/x-bzip2"
          };
        }
        if (check([55, 122, 188, 175, 39, 28])) {
          return {
            ext: "7z",
            mime: "application/x-7z-compressed"
          };
        }
        if (check([120, 1])) {
          return {
            ext: "dmg",
            mime: "application/x-apple-diskimage"
          };
        }
        if (check([51, 103, 112, 53]) || // 3gp5
        check([0, 0, 0]) && check([102, 116, 121, 112], { offset: 4 }) && (check([109, 112, 52, 49], { offset: 8 }) || // MP41
        check([109, 112, 52, 50], { offset: 8 }) || // MP42
        check([105, 115, 111, 109], { offset: 8 }) || // ISOM
        check([105, 115, 111, 50], { offset: 8 }) || // ISO2
        check([109, 109, 112, 52], { offset: 8 }) || // MMP4
        check([77, 52, 86], { offset: 8 }) || // M4V
        check([100, 97, 115, 104], { offset: 8 }))) {
          return {
            ext: "mp4",
            mime: "video/mp4"
          };
        }
        if (check([77, 84, 104, 100])) {
          return {
            ext: "mid",
            mime: "audio/midi"
          };
        }
        if (check([26, 69, 223, 163])) {
          const sliced = buf.subarray(4, 4 + 4096);
          const idPos = sliced.findIndex((el, i, arr) => arr[i] === 66 && arr[i + 1] === 130);
          if (idPos !== -1) {
            const docTypePos = idPos + 3;
            const findDocType = (type) => [...type].every((c, i) => sliced[docTypePos + i] === c.charCodeAt(0));
            if (findDocType("matroska")) {
              return {
                ext: "mkv",
                mime: "video/x-matroska"
              };
            }
            if (findDocType("webm")) {
              return {
                ext: "webm",
                mime: "video/webm"
              };
            }
          }
        }
        if (check([0, 0, 0, 20, 102, 116, 121, 112, 113, 116, 32, 32]) || check([102, 114, 101, 101], { offset: 4 }) || // Type: `free`
        check([102, 116, 121, 112, 113, 116, 32, 32], { offset: 4 }) || check([109, 100, 97, 116], { offset: 4 }) || // MJPEG
        check([109, 111, 111, 118], { offset: 4 }) || // Type: `moov`
        check([119, 105, 100, 101], { offset: 4 })) {
          return {
            ext: "mov",
            mime: "video/quicktime"
          };
        }
        if (check([82, 73, 70, 70])) {
          if (check([65, 86, 73], { offset: 8 })) {
            return {
              ext: "avi",
              mime: "video/vnd.avi"
            };
          }
          if (check([87, 65, 86, 69], { offset: 8 })) {
            return {
              ext: "wav",
              mime: "audio/vnd.wave"
            };
          }
          if (check([81, 76, 67, 77], { offset: 8 })) {
            return {
              ext: "qcp",
              mime: "audio/qcelp"
            };
          }
        }
        if (check([48, 38, 178, 117, 142, 102, 207, 17, 166, 217])) {
          let offset = 30;
          do {
            const objectSize = readUInt64LE(buf, offset + 16);
            if (check([145, 7, 220, 183, 183, 169, 207, 17, 142, 230, 0, 192, 12, 32, 83, 101], { offset })) {
              if (check([64, 158, 105, 248, 77, 91, 207, 17, 168, 253, 0, 128, 95, 92, 68, 43], { offset: offset + 24 })) {
                return {
                  ext: "wma",
                  mime: "audio/x-ms-wma"
                };
              }
              if (check([192, 239, 25, 188, 77, 91, 207, 17, 168, 253, 0, 128, 95, 92, 68, 43], { offset: offset + 24 })) {
                return {
                  ext: "wmv",
                  mime: "video/x-ms-asf"
                };
              }
              break;
            }
            offset += objectSize;
          } while (offset + 24 <= buf.length);
          return {
            ext: "asf",
            mime: "application/vnd.ms-asf"
          };
        }
        if (check([0, 0, 1, 186]) || check([0, 0, 1, 179])) {
          return {
            ext: "mpg",
            mime: "video/mpeg"
          };
        }
        if (check([102, 116, 121, 112, 51, 103], { offset: 4 })) {
          return {
            ext: "3gp",
            mime: "video/3gpp"
          };
        }
        for (let start = 0; start < 2 && start < buf.length - 16; start++) {
          if (check([73, 68, 51], { offset: start }) || // ID3 header
          check([255, 226], { offset: start, mask: [255, 226] })) {
            return {
              ext: "mp3",
              mime: "audio/mpeg"
            };
          }
          if (check([255, 228], { offset: start, mask: [255, 228] })) {
            return {
              ext: "mp2",
              mime: "audio/mpeg"
            };
          }
          if (check([255, 248], { offset: start, mask: [255, 252] })) {
            return {
              ext: "mp2",
              mime: "audio/mpeg"
            };
          }
          if (check([255, 240], { offset: start, mask: [255, 252] })) {
            return {
              ext: "mp4",
              mime: "audio/mpeg"
            };
          }
        }
        if (check([102, 116, 121, 112, 77, 52, 65], { offset: 4 })) {
          return {
            // MPEG-4 layer 3 (audio)
            ext: "m4a",
            mime: "audio/mp4"
            // RFC 4337
          };
        }
        if (check([79, 112, 117, 115, 72, 101, 97, 100], { offset: 28 })) {
          return {
            ext: "opus",
            mime: "audio/opus"
          };
        }
        if (check([79, 103, 103, 83])) {
          if (check([128, 116, 104, 101, 111, 114, 97], { offset: 28 })) {
            return {
              ext: "ogv",
              mime: "video/ogg"
            };
          }
          if (check([1, 118, 105, 100, 101, 111, 0], { offset: 28 })) {
            return {
              ext: "ogm",
              mime: "video/ogg"
            };
          }
          if (check([127, 70, 76, 65, 67], { offset: 28 })) {
            return {
              ext: "oga",
              mime: "audio/ogg"
            };
          }
          if (check([83, 112, 101, 101, 120, 32, 32], { offset: 28 })) {
            return {
              ext: "spx",
              mime: "audio/ogg"
            };
          }
          if (check([1, 118, 111, 114, 98, 105, 115], { offset: 28 })) {
            return {
              ext: "ogg",
              mime: "audio/ogg"
            };
          }
          return {
            ext: "ogx",
            mime: "application/ogg"
          };
        }
        if (check([102, 76, 97, 67])) {
          return {
            ext: "flac",
            mime: "audio/x-flac"
          };
        }
        if (check([77, 65, 67, 32])) {
          return {
            ext: "ape",
            mime: "audio/ape"
          };
        }
        if (check([119, 118, 112, 107])) {
          return {
            ext: "wv",
            mime: "audio/wavpack"
          };
        }
        if (check([35, 33, 65, 77, 82, 10])) {
          return {
            ext: "amr",
            mime: "audio/amr"
          };
        }
        if (check([37, 80, 68, 70])) {
          return {
            ext: "pdf",
            mime: "application/pdf"
          };
        }
        if (check([77, 90])) {
          return {
            ext: "exe",
            mime: "application/x-msdownload"
          };
        }
        if ((buf[0] === 67 || buf[0] === 70) && check([87, 83], { offset: 1 })) {
          return {
            ext: "swf",
            mime: "application/x-shockwave-flash"
          };
        }
        if (check([123, 92, 114, 116, 102])) {
          return {
            ext: "rtf",
            mime: "application/rtf"
          };
        }
        if (check([0, 97, 115, 109])) {
          return {
            ext: "wasm",
            mime: "application/wasm"
          };
        }
        if (check([119, 79, 70, 70]) && (check([0, 1, 0, 0], { offset: 4 }) || check([79, 84, 84, 79], { offset: 4 }))) {
          return {
            ext: "woff",
            mime: "font/woff"
          };
        }
        if (check([119, 79, 70, 50]) && (check([0, 1, 0, 0], { offset: 4 }) || check([79, 84, 84, 79], { offset: 4 }))) {
          return {
            ext: "woff2",
            mime: "font/woff2"
          };
        }
        if (check([76, 80], { offset: 34 }) && (check([0, 0, 1], { offset: 8 }) || check([1, 0, 2], { offset: 8 }) || check([2, 0, 2], { offset: 8 }))) {
          return {
            ext: "eot",
            mime: "application/vnd.ms-fontobject"
          };
        }
        if (check([0, 1, 0, 0, 0])) {
          return {
            ext: "ttf",
            mime: "font/ttf"
          };
        }
        if (check([79, 84, 84, 79, 0])) {
          return {
            ext: "otf",
            mime: "font/otf"
          };
        }
        if (check([0, 0, 1, 0])) {
          return {
            ext: "ico",
            mime: "image/x-icon"
          };
        }
        if (check([0, 0, 2, 0])) {
          return {
            ext: "cur",
            mime: "image/x-icon"
          };
        }
        if (check([70, 76, 86, 1])) {
          return {
            ext: "flv",
            mime: "video/x-flv"
          };
        }
        if (check([37, 33])) {
          return {
            ext: "ps",
            mime: "application/postscript"
          };
        }
        if (check([253, 55, 122, 88, 90, 0])) {
          return {
            ext: "xz",
            mime: "application/x-xz"
          };
        }
        if (check([83, 81, 76, 105])) {
          return {
            ext: "sqlite",
            mime: "application/x-sqlite3"
          };
        }
        if (check([78, 69, 83, 26])) {
          return {
            ext: "nes",
            mime: "application/x-nintendo-nes-rom"
          };
        }
        if (check([67, 114, 50, 52])) {
          return {
            ext: "crx",
            mime: "application/x-google-chrome-extension"
          };
        }
        if (check([77, 83, 67, 70]) || check([73, 83, 99, 40])) {
          return {
            ext: "cab",
            mime: "application/vnd.ms-cab-compressed"
          };
        }
        if (check([33, 60, 97, 114, 99, 104, 62, 10, 100, 101, 98, 105, 97, 110, 45, 98, 105, 110, 97, 114, 121])) {
          return {
            ext: "deb",
            mime: "application/x-deb"
          };
        }
        if (check([33, 60, 97, 114, 99, 104, 62])) {
          return {
            ext: "ar",
            mime: "application/x-unix-archive"
          };
        }
        if (check([237, 171, 238, 219])) {
          return {
            ext: "rpm",
            mime: "application/x-rpm"
          };
        }
        if (check([31, 160]) || check([31, 157])) {
          return {
            ext: "Z",
            mime: "application/x-compress"
          };
        }
        if (check([76, 90, 73, 80])) {
          return {
            ext: "lz",
            mime: "application/x-lzip"
          };
        }
        if (check([208, 207, 17, 224, 161, 177, 26, 225])) {
          return {
            ext: "msi",
            mime: "application/x-msi"
          };
        }
        if (check([6, 14, 43, 52, 2, 5, 1, 1, 13, 1, 2, 1, 1, 2])) {
          return {
            ext: "mxf",
            mime: "application/mxf"
          };
        }
        if (check([71], { offset: 4 }) && (check([71], { offset: 192 }) || check([71], { offset: 196 }))) {
          return {
            ext: "mts",
            mime: "video/mp2t"
          };
        }
        if (check([66, 76, 69, 78, 68, 69, 82])) {
          return {
            ext: "blend",
            mime: "application/x-blender"
          };
        }
        if (check([66, 80, 71, 251])) {
          return {
            ext: "bpg",
            mime: "image/bpg"
          };
        }
        if (check([0, 0, 0, 12, 106, 80, 32, 32, 13, 10, 135, 10])) {
          if (check([106, 112, 50, 32], { offset: 20 })) {
            return {
              ext: "jp2",
              mime: "image/jp2"
            };
          }
          if (check([106, 112, 120, 32], { offset: 20 })) {
            return {
              ext: "jpx",
              mime: "image/jpx"
            };
          }
          if (check([106, 112, 109, 32], { offset: 20 })) {
            return {
              ext: "jpm",
              mime: "image/jpm"
            };
          }
          if (check([109, 106, 112, 50], { offset: 20 })) {
            return {
              ext: "mj2",
              mime: "image/mj2"
            };
          }
        }
        if (check([70, 79, 82, 77])) {
          return {
            ext: "aif",
            mime: "audio/aiff"
          };
        }
        if (checkString("<?xml ")) {
          return {
            ext: "xml",
            mime: "application/xml"
          };
        }
        if (check([66, 79, 79, 75, 77, 79, 66, 73], { offset: 60 })) {
          return {
            ext: "mobi",
            mime: "application/x-mobipocket-ebook"
          };
        }
        if (check([102, 116, 121, 112], { offset: 4 })) {
          if (check([109, 105, 102, 49], { offset: 8 })) {
            return {
              ext: "heic",
              mime: "image/heif"
            };
          }
          if (check([109, 115, 102, 49], { offset: 8 })) {
            return {
              ext: "heic",
              mime: "image/heif-sequence"
            };
          }
          if (check([104, 101, 105, 99], { offset: 8 }) || check([104, 101, 105, 120], { offset: 8 })) {
            return {
              ext: "heic",
              mime: "image/heic"
            };
          }
          if (check([104, 101, 118, 99], { offset: 8 }) || check([104, 101, 118, 120], { offset: 8 })) {
            return {
              ext: "heic",
              mime: "image/heic-sequence"
            };
          }
        }
        if (check([171, 75, 84, 88, 32, 49, 49, 187, 13, 10, 26, 10])) {
          return {
            ext: "ktx",
            mime: "image/ktx"
          };
        }
        if (check([68, 73, 67, 77], { offset: 128 })) {
          return {
            ext: "dcm",
            mime: "application/dicom"
          };
        }
        if (check([77, 80, 43])) {
          return {
            ext: "mpc",
            mime: "audio/x-musepack"
          };
        }
        if (check([77, 80, 67, 75])) {
          return {
            ext: "mpc",
            mime: "audio/x-musepack"
          };
        }
        if (check([66, 69, 71, 73, 78, 58])) {
          return {
            ext: "ics",
            mime: "text/calendar"
          };
        }
        if (check([103, 108, 84, 70, 2, 0, 0, 0])) {
          return {
            ext: "glb",
            mime: "model/gltf-binary"
          };
        }
        if (check([212, 195, 178, 161]) || check([161, 178, 195, 212])) {
          return {
            ext: "pcap",
            mime: "application/vnd.tcpdump.pcap"
          };
        }
        return null;
      };
      module.exports = fileType;
      module.exports.default = fileType;
      Object.defineProperty(fileType, "minimumBytes", { value: 4100 });
      module.exports.stream = (readableStream) => new Promise((resolve, reject) => {
        const stream = eval("require")("stream");
        readableStream.once("readable", () => {
          const pass = new stream.PassThrough();
          const chunk = readableStream.read(module.exports.minimumBytes) || readableStream.read();
          try {
            pass.fileType = fileType(chunk);
          } catch (error) {
            reject(error);
          }
          readableStream.unshift(chunk);
          if (stream.pipeline) {
            resolve(stream.pipeline(readableStream, pass, () => {
            }));
          } else {
            resolve(readableStream.pipe(pass));
          }
        });
      });
    }
  });

  // node_modules/image-type/index.js
  var require_image_type = __commonJS({
    "node_modules/image-type/index.js"(exports2, module2) {
      "use strict";
      var fileType2 = require_file_type();
      var imageExts = /* @__PURE__ */ new Set([
        "jpg",
        "png",
        "gif",
        "webp",
        "flif",
        "cr2",
        "tif",
        "bmp",
        "jxr",
        "psd",
        "ico",
        "bpg",
        "jp2",
        "jpm",
        "jpx",
        "heic",
        "cur",
        "dcm"
      ]);
      var imageType = (input) => {
        const ret = fileType2(input);
        return imageExts.has(ret && ret.ext) ? ret : null;
      };
      module2.exports = imageType;
      module2.exports.default = imageType;
      Object.defineProperty(imageType, "minimumBytes", { value: fileType2.minimumBytes });
    }
  });

  // node_modules/super-image-cropper/esm/lib/helper.js
  var import_image_type;
  var init_helper = __esm({
    "node_modules/super-image-cropper/esm/lib/helper.js"() {
      import_image_type = __toESM(require_image_type(), 1);
    }
  });

  // node_modules/super-image-cropper/esm/index.js
  var o;
  var init_esm2 = __esm({
    "node_modules/super-image-cropper/esm/index.js"() {
      init_decoder();
      init_synthetic_gif();
      init_cropper();
      init_helper();
      !(function(t5) {
        t5.BASE64 = "base64", t5.BLOB = "blob", t5.BLOB_URL = "blobURL";
      })(o || (o = {}));
    }
  });

  // public/app.js
  var require_app = __commonJS({
    "public/app.js"() {
      init_esm2();
      var cropperInstance = null;
      var imgUrlPrefix = "https://images.collections.yale.edu/iiif/2/ypm:";
      function updateDebugInfo() {
        if (!cropperInstance) return;
        const imageData = cropperInstance.getImageData();
        const cropData = cropperInstance.getData();
        const debugInfo = `Source Image:
  Width: ${imageData.naturalWidth}px
  Height: ${imageData.naturalHeight}px

Crop Bounding Box:
  Top-Left: (${Math.round(cropData.x)}, ${Math.round(cropData.y)})
  Top-Right: (${Math.round(cropData.x + cropData.width)}, ${Math.round(cropData.y)})
  Bottom-Left: (${Math.round(cropData.x)}, ${Math.round(cropData.y + cropData.height)})
  Bottom-Right: (${Math.round(cropData.x + cropData.width)}, ${Math.round(cropData.y + cropData.height)})
  Width: ${Math.round(cropData.width)}px
  Height: ${Math.round(cropData.height)}px`;
        document.getElementById("debug-info").textContent = debugInfo;
        const guid = window.currentGuid;
        const x = Math.round(cropData.x);
        const y = Math.round(cropData.y);
        const width = Math.round(cropData.width);
        const height = Math.round(cropData.height);
        const targetOutputWidth = 912;
        const targetOutputHeight = 510;
        const previewUrl = `${imgUrlPrefix}${guid}/${x},${y},${width},${height}/${targetOutputWidth},${targetOutputHeight}/0/default.jpg`;
        document.getElementById("output-url").value = previewUrl;
      }
      function recenterImage() {
        if (!cropperInstance) return;
        cropperInstance.reset();
      }
      function extractGuid(input) {
        if (!input) return { guid: null, error: "Please enter a GUID or IIIF URL" };
        if (input.includes("https://")) {
          const match = input.match(/ypm:([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i);
          if (match) {
            const guid2 = match[1];
            console.log("Extracted GUID from URL:", guid2);
            return { guid: guid2, error: null };
          } else {
            const errorMsg = "Could not extract GUID from URL. Expected format with ypm: prefix";
            console.error(errorMsg);
            return { guid: null, error: errorMsg };
          }
        }
        const guid = input.trim();
        console.log("Using direct GUID:", guid);
        return { guid, error: null };
      }
      var inputElement = document.getElementById("input-guid");
      function loadImageToCanvas() {
        if (!inputElement) {
          console.error('Input element with id "input-guid" not found');
          console.log("Available elements:", document.querySelectorAll("input"));
          return;
        }
        const inputValue = inputElement.value;
        const { guid, error } = extractGuid(inputValue);
        if (!guid) {
          const loader = document.getElementById("loader");
          loader.innerHTML = `<div style="text-align: center; color: #d32f2f; font-family: Mallory MP, sans-serif;"><p>${error}</p></div>`;
          return;
        }
        window.currentGuid = guid;
        const imageUrl = `${imgUrlPrefix}${guid}/full/max/0/default.jpg`;
        console.log("Loading image from:", imageUrl);
        console.log("Extracted GUID:", guid);
        const imgElement = document.getElementById("canvas");
        imgElement.onload = () => {
          imgElement.style.display = "block";
          console.log("Image loaded");
          const loader = document.getElementById("loader");
          loader.innerHTML = '<img src="/img/ripples.svg" alt="Loading...">';
          if (cropperInstance) {
            cropperInstance.destroy();
          }
          cropperInstance = new window.Cropper(imgElement, {
            aspectRatio: 456 / 255,
            minCropBoxWidth: 456,
            minCropBoxHeight: 255,
            autoCropArea: 0.8,
            responsive: true,
            restore: true,
            guides: true,
            center: true,
            highlight: true,
            cropBoxMovable: true,
            cropBoxResizable: true,
            toggleDragModeOnDblclick: true,
            crop: updateDebugInfo,
            ready: () => {
              updateDebugInfo();
              document.getElementById("loader").classList.add("hidden");
              console.log("Cropper initialized with 456:255 aspect ratio");
            }
          });
        };
        imgElement.onerror = () => {
          console.error("Failed to load image from:", imageUrl);
          const loader = document.getElementById("loader");
          loader.innerHTML = '<div style="text-align: center; color: #d32f2f; font-family: Mallory MP, sans-serif;"><p>Error loading image</p><p style="font-size: 0.9em;">Please verify the image exists in Yale Collections and try again.</p></div>';
        };
        imgElement.crossOrigin = "anonymous";
        imgElement.src = imageUrl;
      }
      setTimeout(() => {
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", loadImageToCanvas);
        } else {
          loadImageToCanvas();
        }
        const loadBtn = document.getElementById("load-image");
        if (loadBtn) {
          loadBtn.addEventListener("click", () => {
            document.getElementById("loader").classList.remove("hidden");
            loadImageToCanvas();
          });
        }
        const recenterBtn = document.getElementById("recenter-btn");
        if (recenterBtn) {
          recenterBtn.addEventListener("click", recenterImage);
        }
        const previewBtn = document.getElementById("preview-image");
        if (previewBtn) {
          previewBtn.addEventListener("click", () => {
            const previewUrl = document.getElementById("output-url").value;
            if (previewUrl) {
              window.open(previewUrl, "_blank");
            }
          });
        }
      }, 100);
    }
  });
  require_app();
})();
