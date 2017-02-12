(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["tinyupload"] = factory();
	else
		root["tinyupload"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tiny_emitter__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tiny_emitter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tiny_emitter__);


var addEmitter = function addEmitter(instance) {
  var emitter = new __WEBPACK_IMPORTED_MODULE_0_tiny_emitter___default.a();
  var emit = emitter.emit.bind(emitter);

  var on = function on(name, fn) {
    emitter.on(name, fn);
    return instance;
  };
  var once = function once(name, fn) {
    emitter.once(name, fn);
    return instance;
  };
  var off = function off(name, fn) {
    emitter.off(name, fn);
    return instance;
  };

  instance.on = on;
  instance.once = once;
  instance.off = off;

  return emit;
};

/* harmony default export */ __webpack_exports__["a"] = addEmitter;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__supportsDnd__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__processFiles__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_addEmitter__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FILES_CHANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return WAITING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return UPLOADING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return ERROR; });




var create = function create(_ref) {
  var baseUrl = _ref.baseUrl,
      mimeTypes = _ref.mimeTypes;

  var instance = {};
  var emit = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_addEmitter__["a" /* default */])(instance);
  var dnd = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__supportsDnd__["a" /* default */])();

  // State transitions:
  // WAITING -> UPLOADING -> (SUCCESS -> WAITING | ERROR -> WAITING)

  var status = WAITING;
  var method = null;
  var files = [];

  var getMimeTypes = function getMimeTypes() {
    return mimeTypes;
  };

  var getStatus = function getStatus() {
    return status;
  };

  var setFiles = function setFiles(f, m) {
    if (status !== WAITING) {
      return console.log('Invalid status for setting files: ' + status);
    }
    files = f;
    method = m;
    emit(FILES_CHANGE, files);
  };

  var getFiles = function getFiles() {
    return files;
  };

  var getMethod = function getMethod() {
    return method;
  };

  var upload = function upload() {
    if (!files.length) {
      return console.log('No files to upload');
    }

    if (status !== WAITING) {
      return console.log('Invalid status for upload: ' + status);
    }

    status = UPLOADING;
    emit(UPLOADING, files);

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__processFiles__["a" /* default */])(baseUrl, files, function (errors, responses) {
      if (errors) {
        status = ERROR;
        emit(ERROR, errors);
      } else {
        status = SUCCESS;
        emit(SUCCESS, responses);
      }
    });
  };

  var reset = function reset() {
    if (!(status === ERROR || status === SUCCESS)) {
      return console.log('Invalid status for reset: ' + status);
    }
    status = WAITING;
    emit(WAITING);
  };

  Object.assign(instance, {
    setFiles: setFiles,
    getStatus: getStatus,
    getFiles: getFiles,
    getMimeTypes: getMimeTypes,
    getMethod: getMethod,
    upload: upload,
    reset: reset,
    hasDnd: function hasDnd() {
      return dnd;
    }
  });

  return instance;
};

/* harmony default export */ __webpack_exports__["a"] = create;

var FILES_CHANGE = 'filesChange';
var WAITING = 'waiting';
var UPLOADING = 'uploading';
var SUCCESS = 'success';
var ERROR = 'error';

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_addEmitter__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_bindTo__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_string__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__upload_svg__ = __webpack_require__(8);
/* unused harmony export METHOD_FILE_INPUT */
/* unused harmony export METHOD_DRAG_AND_DROP */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return UI_SUBMIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return UI_FILES_CHANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return UI_RESET; });





var create = function create(_ref) {
  var mount = _ref.mount,
      mimeTypes = _ref.mimeTypes,
      hasDnd = _ref.hasDnd,
      _ref$autoSubmit = _ref.autoSubmit,
      autoSubmit = _ref$autoSubmit === undefined ? true : _ref$autoSubmit,
      _ref$multiple = _ref.multiple,
      multiple = _ref$multiple === undefined ? true : _ref$multiple;

  var instance = {};
  var emit = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_addEmitter__["a" /* default */])(instance);

  var WAITING_CLASS = 'tu--is-waiting';
  var UPLOADING_CLASS = 'tu--is-uploading';
  var SUCCESS_CLASS = 'tu--is-success';
  var ERROR_CLASS = 'tu--is-error';
  var HAS_DND_CLASS = 'tu--has-dnd';
  var AUTO_SUBMIT_CLASS = 'tu--auto-submit';

  // TODO: data-multiple-caption="{count} files selected"

  var html = '\n    <form\n      class="tu ' + WAITING_CLASS + ' ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_string__["a" /* stringIf */])(hasDnd, HAS_DND_CLASS) + ' ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_string__["a" /* stringIf */])(autoSubmit, AUTO_SUBMIT_CLASS) + '"\n      method="post"\n      action=""\n      enctype="multipart/form-data"\n    >\n      <div class="tu__input">\n        ' + __WEBPACK_IMPORTED_MODULE_3__upload_svg__["a" /* default */] + '\n        <input\n          class="tu__file"\n          type="file"\n          name="files[]"\n          id="tu-files-input"\n          accept="' + mimeTypes.join(', ') + '"\n          ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_string__["a" /* stringIf */])(multiple, 'multiple') + '\n        />\n        <label for="tu-files-input">\n          <strong>' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_string__["a" /* stringIf */])(multiple, 'Choose files', 'Choose a file') + '</strong>\n          <span class="tu__dnd"> or drag here</span>\n        </label>\n        <button class="tu__button" type="submit">Upload</button>\n      </div>\n      <div class="tu__uploading">Uploading&hellip;</div>\n      <div class="tu__success">Done! <span></span> <a href="javascript:void(0)">Try again</a></div>\n      <div class="tu__error">Error! <span></span> <a href="javascript:void(0)">Try again</a></div>\n    </form>\n  ';

  var container = document.createElement('div');
  container.innerHTML = html;
  mount.appendChild(container);

  var form = container.querySelector('.tu');
  var filesInput = container.querySelector('#tu-files-input');
  var successMessageSpan = container.querySelector('.tu__success span');
  var successRetryLink = container.querySelector('.tu__success a');
  var errorMessageSpan = container.querySelector('.tu__error > span');
  var errorRetryLink = container.querySelector('.tu__error > a');

  var onFilesChange = function onFilesChange(e, files, method) {
    e.preventDefault();
    emit(UI_FILES_CHANGE, files, method);
    if (autoSubmit) {
      emit(UI_SUBMIT);
    }
  };

  if (!autoSubmit) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bindTo__["a" /* on */])(form, 'submit', function (e) {
      e.preventDefault();
      emit(UI_SUBMIT);
      return false;
    });
  }

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bindTo__["a" /* on */])(filesInput, 'change', function (e) {
    return onFilesChange(e, filesInput.files, METHOD_FILE_INPUT);
  });

  if (hasDnd) {
    var swallow = function swallow(e) {
      e.preventDefault();
      e.stopPropagation();
    };

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bindTo__["a" /* on */])(form, 'drag dragstart dragend dragover dragenter dragleave drop', swallow);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bindTo__["a" /* on */])(form, 'dragover dragenter', function () {
      return form.classList.add('tu--is-dragover');
    });
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bindTo__["a" /* on */])(form, 'dragleave dragend drop', function () {
      return form.classList.remove('tu--is-dragover');
    });
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bindTo__["a" /* on */])(form, 'drop', function (e) {
      return onFilesChange(e, e.dataTransfer.files, METHOD_DRAG_AND_DROP);
    });
  }

  var reset = function reset(e) {
    e.preventDefault();
    emit(UI_RESET);
  };

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bindTo__["a" /* on */])(successRetryLink, 'click', reset);
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bindTo__["a" /* on */])(errorRetryLink, 'click', reset);

  var setFiles = function setFiles(files) {};

  var setWaiting = function setWaiting() {
    form.classList.add(WAITING_CLASS);
    form.classList.remove(SUCCESS_CLASS);
    form.classList.remove(ERROR_CLASS);
  };

  var setUploading = function setUploading() {
    form.classList.remove(WAITING_CLASS);
    form.classList.add(UPLOADING_CLASS);
  };

  var setSuccess = function setSuccess(responses) {
    console.log('Responses', responses);
    var count = responses.length;
    successMessageSpan.innerHTML = count + ' ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_string__["b" /* pluralIf */])(count, 'file') + ' uploaded';
    form.classList.remove(UPLOADING_CLASS);
    form.classList.add(SUCCESS_CLASS);
  };

  var setError = function setError(errors) {
    console.log('Errors', errors);
    var count = errors.length;
    errorMessageSpan.innerHTML = count + ' ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_string__["b" /* pluralIf */])(count, 'error');
    form.classList.remove(UPLOADING_CLASS);
    form.classList.add(ERROR_CLASS);
  };

  Object.assign(instance, {
    setFiles: setFiles,
    setWaiting: setWaiting,
    setUploading: setUploading,
    setSuccess: setSuccess,
    setError: setError
  });

  return instance;
};

/* harmony default export */ __webpack_exports__["a"] = create;

var METHOD_FILE_INPUT = 'filesInput';
var METHOD_DRAG_AND_DROP = 'dragAndDrop';

var UI_SUBMIT = 'submit';
var UI_FILES_CHANGE = 'filesChange';
var UI_RESET = 'reset';

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var getSignedUrl = function getSignedUrl(_ref, cb) {
  var name = _ref.name,
      type = _ref.type,
      baseUrl = _ref.baseUrl;

  var xhr = new window.XMLHttpRequest();

  var qs = '?name=' + encodeURIComponent(name) + '&type=' + encodeURIComponent(type);
  var url = baseUrl + qs;

  xhr.open('GET', url, true);
  // xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          cb(null, JSON.parse(xhr.responseText));
        } catch (err) {
          cb(err);
        }
      } else {
        cb({
          message: 'Could not get signed URL for ' + url,
          status: xhr.status
        });
      }
    }
  };
  xhr.send();
};

/* harmony default export */ __webpack_exports__["a"] = getSignedUrl;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getSignedUrl__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uploadFile__ = __webpack_require__(7);



var processFile = function processFile(baseUrl, file, cb) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__getSignedUrl__["a" /* default */])({ name: file.name, type: file.type, baseUrl: baseUrl }, function (err, res) {
    if (err) {
      return cb(err);
    }
    var signedUrl = res.signedUrl,
        url = res.url;

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__uploadFile__["a" /* default */])(file, signedUrl, url, function (err, res) {
      if (err) {
        return cb(err);
      }
      cb(null, res);
    });
  });
};

var processFiles = function processFiles(baseUrl, files, cb) {
  var count = 0;
  var total = files.length;
  var errors = [];
  var responses = [];
  for (var i = 0; i < files.length; i += 1) {
    processFile(baseUrl, files[i], function (err, res) {
      count += 1;
      err ? errors.push(err) : responses.push(res);

      if (count === total) {
        if (errors.length) {
          return cb(errors);
        }
        cb(null, responses);
      }
    });
  }
};

/* harmony default export */ __webpack_exports__["a"] = processFiles;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var supportsDnd = function supportsDnd() {
  var div = document.createElement('div');
  return 'draggable' in div || 'ondragstart' in div && 'ondrop' in div;
};

/* harmony default export */ __webpack_exports__["a"] = supportsDnd;

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var uploadFile = function uploadFile(file, signedUrl, url, cb) {
  var xhr = new window.XMLHttpRequest();
  xhr.open('PUT', signedUrl);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(null, { file: file, url: url });
      } else {
        cb({
          message: 'Could not upload file',
          status: xhr.status
        });
      }
    }
  };
  xhr.send(file);
};

/* harmony default export */ __webpack_exports__["a"] = uploadFile;

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = '<svg class="tu__icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43"><path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path></svg>';

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return on; });
/* unused harmony export off */
var on = function on(element, names, fn) {
  names.split(' ').map(function (name) {
    element.addEventListener(name, fn);
  });
};

var off = function off(element, names, fn) {
  names.split(' ').map(function (name) {
    element.removeEventListener(name, fn);
  });
};

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return stringIf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return pluralIf; });
var stringIf = function stringIf(condition, str) {
  var def = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return condition ? str : def;
};

var pluralIf = function pluralIf(count, singular) {
  var plural = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return count === 1 ? singular : plural || singular + 's';
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_addEmitter__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPLOAD_FILES_CHANGE", function() { return UPLOAD_FILES_CHANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPLOAD_WAITING", function() { return UPLOAD_WAITING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPLOAD_UPLOADING", function() { return UPLOAD_UPLOADING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPLOAD_SUCCESS", function() { return UPLOAD_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPLOAD_ERROR", function() { return UPLOAD_ERROR; });








var create = function create(_ref) {
  var mount = _ref.mount,
      baseUrl = _ref.baseUrl,
      mimeTypes = _ref.mimeTypes,
      _ref$multiple = _ref.multiple,
      multiple = _ref$multiple === undefined ? false : _ref$multiple,
      _ref$autoSubmit = _ref.autoSubmit,
      autoSubmit = _ref$autoSubmit === undefined ? true : _ref$autoSubmit;

  var instance = {};
  var emit = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_addEmitter__["a" /* default */])(instance);

  var model = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__model__["a" /* default */])({ baseUrl: baseUrl, mimeTypes: mimeTypes });

  var ui = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__ui__["a" /* default */])({
    mount: mount,
    mimeTypes: model.getMimeTypes(),
    hasDnd: model.hasDnd(),
    autoSubmit: autoSubmit,
    multiple: multiple
  });

  ui.on(__WEBPACK_IMPORTED_MODULE_2__ui__["b" /* UI_FILES_CHANGE */], model.setFiles).on(__WEBPACK_IMPORTED_MODULE_2__ui__["c" /* UI_SUBMIT */], model.upload).on(__WEBPACK_IMPORTED_MODULE_2__ui__["d" /* UI_RESET */], model.reset);

  model.on(__WEBPACK_IMPORTED_MODULE_3__model__["b" /* FILES_CHANGE */], function (files) {
    ui.setFiles(files);
    emit(UPLOAD_FILES_CHANGE, files);
  }).on(__WEBPACK_IMPORTED_MODULE_3__model__["c" /* WAITING */], function () {
    ui.setWaiting();
    emit(UPLOAD_WAITING);
  }).on(__WEBPACK_IMPORTED_MODULE_3__model__["d" /* UPLOADING */], function (file) {
    ui.setUploading(file);
    emit(UPLOAD_UPLOADING, file);
  }).on(__WEBPACK_IMPORTED_MODULE_3__model__["e" /* SUCCESS */], function (responses) {
    ui.setSuccess(responses);
    emit(UPLOAD_SUCCESS, responses);
  }).on(__WEBPACK_IMPORTED_MODULE_3__model__["f" /* ERROR */], function (errors) {
    ui.setError(errors);
    emit(UPLOAD_ERROR, errors);
  });

  return instance;
};

/* harmony default export */ __webpack_exports__["default"] = create;

var UPLOAD_FILES_CHANGE = 'uploadFilesChange';
var UPLOAD_WAITING = 'uploadWaiting';
var UPLOAD_UPLOADING = 'uploadUploading';
var UPLOAD_SUCCESS = 'uploadSuccess';
var UPLOAD_ERROR = 'uploadError';

/***/ })
/******/ ]);
});
//# sourceMappingURL=tinyupload.umd.js.map