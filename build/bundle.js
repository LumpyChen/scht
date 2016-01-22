/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var less = __webpack_require__(1);
	__webpack_require__(4);
	less.render(__webpack_require__(8));
	less.render(__webpack_require__(10));

	var jQuery = __webpack_require__(12);
	var backgroundChange = __webpack_require__(13);
	var modernizr = __webpack_require__(14);
	var bgStretch = __webpack_require__(15);
	var bootstrapJS = __webpack_require__(16);

	bootstrapJS(jQuery);
	modernizr();
	backgroundChange(jQuery);
	bgStretch(jQuery,window);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/* WEBPACK VAR INJECTION */(function(setImmediate) {/*!
	 * Less - Leaner CSS v2.5.3
	 * http://lesscss.org
	 *
	 * Copyright (c) 2009-2015, Alexis Sellier <self@cloudhead.net>
	 * Licensed under the  License.
	 *
	 */

	 /** * @license 
	 */

	(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.less = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	var addDataAttr = require("./utils").addDataAttr,
	    browser = require("./browser");

	module.exports = function(window, options) {

	    // use options from the current script tag data attribues
	    addDataAttr(options, browser.currentScript(window));

	    if (options.isFileProtocol === undefined) {
	        options.isFileProtocol = /^(file|(chrome|safari)(-extension)?|resource|qrc|app):/.test(window.location.protocol);
	    }

	    // Load styles asynchronously (default: false)
	    //
	    // This is set to `false` by default, so that the body
	    // doesn't start loading before the stylesheets are parsed.
	    // Setting this to `true` can result in flickering.
	    //
	    options.async = options.async || false;
	    options.fileAsync = options.fileAsync || false;

	    // Interval between watch polls
	    options.poll = options.poll || (options.isFileProtocol ? 1000 : 1500);

	    options.env = options.env || (window.location.hostname == '127.0.0.1' ||
	        window.location.hostname == '0.0.0.0'   ||
	        window.location.hostname == 'localhost' ||
	        (window.location.port &&
	            window.location.port.length > 0)      ||
	        options.isFileProtocol                   ? 'development'
	        : 'production');

	    var dumpLineNumbers = /!dumpLineNumbers:(comments|mediaquery|all)/.exec(window.location.hash);
	    if (dumpLineNumbers) {
	        options.dumpLineNumbers = dumpLineNumbers[1];
	    }

	    if (options.useFileCache === undefined) {
	        options.useFileCache = true;
	    }

	    if (options.onReady === undefined) {
	        options.onReady = true;
	    }

	};

	},{"./browser":3,"./utils":9}],2:[function(require,module,exports){
	/**
	 * Kicks off less and compiles any stylesheets
	 * used in the browser distributed version of less
	 * to kick-start less using the browser api
	 */
	/*global window */

	// shim Promise if required
	require('promise/polyfill.js');

	var options = window.less || {};
	require("./add-default-options")(window, options);

	var less = module.exports = require("./index")(window, options);

	window.less = less;

	if (options.onReady) {
	    if (/!watch/.test(window.location.hash)) {
	        less.watch();
	    }

	    less.registerStylesheetsImmediately();
	    less.pageLoadFinished = less.refresh(less.env === 'development');
	}

	},{"./add-default-options":1,"./index":7,"promise/polyfill.js":95}],3:[function(require,module,exports){
	var utils = require("./utils");
	module.exports = {
	    createCSS: function (document, styles, sheet) {
	        // Strip the query-string
	        var href = sheet.href || '';

	        // If there is no title set, use the filename, minus the extension
	        var id = 'less:' + (sheet.title || utils.extractId(href));

	        // If this has already been inserted into the DOM, we may need to replace it
	        var oldStyleNode = document.getElementById(id);
	        var keepOldStyleNode = false;

	        // Create a new stylesheet node for insertion or (if necessary) replacement
	        var styleNode = document.createElement('style');
	        styleNode.setAttribute('type', 'text/css');
	        if (sheet.media) {
	            styleNode.setAttribute('media', sheet.media);
	        }
	        styleNode.id = id;

	        if (!styleNode.styleSheet) {
	            styleNode.appendChild(document.createTextNode(styles));

	            // If new contents match contents of oldStyleNode, don't replace oldStyleNode
	            keepOldStyleNode = (oldStyleNode !== null && oldStyleNode.childNodes.length > 0 && styleNode.childNodes.length > 0 &&
	                oldStyleNode.firstChild.nodeValue === styleNode.firstChild.nodeValue);
	        }

	        var head = document.getElementsByTagName('head')[0];

	        // If there is no oldStyleNode, just append; otherwise, only append if we need
	        // to replace oldStyleNode with an updated stylesheet
	        if (oldStyleNode === null || keepOldStyleNode === false) {
	            var nextEl = sheet && sheet.nextSibling || null;
	            if (nextEl) {
	                nextEl.parentNode.insertBefore(styleNode, nextEl);
	            } else {
	                head.appendChild(styleNode);
	            }
	        }
	        if (oldStyleNode && keepOldStyleNode === false) {
	            oldStyleNode.parentNode.removeChild(oldStyleNode);
	        }

	        // For IE.
	        // This needs to happen *after* the style element is added to the DOM, otherwise IE 7 and 8 may crash.
	        // See http://social.msdn.microsoft.com/Forums/en-US/7e081b65-878a-4c22-8e68-c10d39c2ed32/internet-explorer-crashes-appending-style-element-to-head
	        if (styleNode.styleSheet) {
	            try {
	                styleNode.styleSheet.cssText = styles;
	            } catch (e) {
	                throw new Error("Couldn't reassign styleSheet.cssText.");
	            }
	        }
	    },
	    currentScript: function(window) {
	        var document = window.document;
	        return document.currentScript || (function() {
	            var scripts = document.getElementsByTagName("script");
	            return scripts[scripts.length - 1];
	        })();
	    }
	};

	},{"./utils":9}],4:[function(require,module,exports){
	// Cache system is a bit outdated and could do with work

	module.exports = function(window, options, logger) {
	    var cache = null;
	    if (options.env !== 'development') {
	        try {
	            cache = (typeof window.localStorage === 'undefined') ? null : window.localStorage;
	        } catch (_) {}
	    }
	    return {
	        setCSS: function(path, lastModified, styles) {
	            if (cache) {
	                logger.info('saving ' + path + ' to cache.');
	                try {
	                    cache.setItem(path, styles);
	                    cache.setItem(path + ':timestamp', lastModified);
	                } catch(e) {
	                    //TODO - could do with adding more robust error handling
	                    logger.error('failed to save "' + path + '" to local storage for caching.');
	                }
	            }
	        },
	        getCSS: function(path, webInfo) {
	            var css       = cache && cache.getItem(path),
	                timestamp = cache && cache.getItem(path + ':timestamp');

	            if (timestamp && webInfo.lastModified &&
	                (new Date(webInfo.lastModified).valueOf() ===
	                    new Date(timestamp).valueOf())) {
	                // Use local copy
	                return css;
	            }
	        }
	    };
	};

	},{}],5:[function(require,module,exports){
	var utils = require("./utils"),
	    browser = require("./browser");

	module.exports = function(window, less, options) {

	    function errorHTML(e, rootHref) {
	        var id = 'less-error-message:' + utils.extractId(rootHref || "");
	        var template = '<li><label>{line}</label><pre class="{class}">{content}</pre></li>';
	        var elem = window.document.createElement('div'), timer, content, errors = [];
	        var filename = e.filename || rootHref;
	        var filenameNoPath = filename.match(/([^\/]+(\?.*)?)$/)[1];

	        elem.id        = id;
	        elem.className = "less-error-message";

	        content = '<h3>'  + (e.type || "Syntax") + "Error: " + (e.message || 'There is an error in your .less file') +
	            '</h3>' + '<p>in <a href="' + filename   + '">' + filenameNoPath + "</a> ";

	        var errorline = function (e, i, classname) {
	            if (e.extract[i] !== undefined) {
	                errors.push(template.replace(/\{line\}/, (parseInt(e.line, 10) || 0) + (i - 1))
	                    .replace(/\{class\}/, classname)
	                    .replace(/\{content\}/, e.extract[i]));
	            }
	        };

	        if (e.extract) {
	            errorline(e, 0, '');
	            errorline(e, 1, 'line');
	            errorline(e, 2, '');
	            content += 'on line ' + e.line + ', column ' + (e.column + 1) + ':</p>' +
	                '<ul>' + errors.join('') + '</ul>';
	        }
	        if (e.stack && (e.extract || options.logLevel >= 4)) {
	            content += '<br/>Stack Trace</br />' + e.stack.split('\n').slice(1).join('<br/>');
	        }
	        elem.innerHTML = content;

	        // CSS for error messages
	        browser.createCSS(window.document, [
	            '.less-error-message ul, .less-error-message li {',
	            'list-style-type: none;',
	            'margin-right: 15px;',
	            'padding: 4px 0;',
	            'margin: 0;',
	            '}',
	            '.less-error-message label {',
	            'font-size: 12px;',
	            'margin-right: 15px;',
	            'padding: 4px 0;',
	            'color: #cc7777;',
	            '}',
	            '.less-error-message pre {',
	            'color: #dd6666;',
	            'padding: 4px 0;',
	            'margin: 0;',
	            'display: inline-block;',
	            '}',
	            '.less-error-message pre.line {',
	            'color: #ff0000;',
	            '}',
	            '.less-error-message h3 {',
	            'font-size: 20px;',
	            'font-weight: bold;',
	            'padding: 15px 0 5px 0;',
	            'margin: 0;',
	            '}',
	            '.less-error-message a {',
	            'color: #10a',
	            '}',
	            '.less-error-message .error {',
	            'color: red;',
	            'font-weight: bold;',
	            'padding-bottom: 2px;',
	            'border-bottom: 1px dashed red;',
	            '}'
	        ].join('\n'), { title: 'error-message' });

	        elem.style.cssText = [
	            "font-family: Arial, sans-serif",
	            "border: 1px solid #e00",
	            "background-color: #eee",
	            "border-radius: 5px",
	            "-webkit-border-radius: 5px",
	            "-moz-border-radius: 5px",
	            "color: #e00",
	            "padding: 15px",
	            "margin-bottom: 15px"
	        ].join(';');

	        if (options.env === 'development') {
	            timer = setInterval(function () {
	                var document = window.document,
	                    body = document.body;
	                if (body) {
	                    if (document.getElementById(id)) {
	                        body.replaceChild(elem, document.getElementById(id));
	                    } else {
	                        body.insertBefore(elem, body.firstChild);
	                    }
	                    clearInterval(timer);
	                }
	            }, 10);
	        }
	    }

	    function error(e, rootHref) {
	        if (!options.errorReporting || options.errorReporting === "html") {
	            errorHTML(e, rootHref);
	        } else if (options.errorReporting === "console") {
	            errorConsole(e, rootHref);
	        } else if (typeof options.errorReporting === 'function') {
	            options.errorReporting("add", e, rootHref);
	        }
	    }

	    function removeErrorHTML(path) {
	        var node = window.document.getElementById('less-error-message:' + utils.extractId(path));
	        if (node) {
	            node.parentNode.removeChild(node);
	        }
	    }

	    function removeErrorConsole(path) {
	        //no action
	    }

	    function removeError(path) {
	        if (!options.errorReporting || options.errorReporting === "html") {
	            removeErrorHTML(path);
	        } else if (options.errorReporting === "console") {
	            removeErrorConsole(path);
	        } else if (typeof options.errorReporting === 'function') {
	            options.errorReporting("remove", path);
	        }
	    }

	    function errorConsole(e, rootHref) {
	        var template = '{line} {content}';
	        var filename = e.filename || rootHref;
	        var errors = [];
	        var content = (e.type || "Syntax") + "Error: " + (e.message || 'There is an error in your .less file') +
	            " in " + filename + " ";

	        var errorline = function (e, i, classname) {
	            if (e.extract[i] !== undefined) {
	                errors.push(template.replace(/\{line\}/, (parseInt(e.line, 10) || 0) + (i - 1))
	                    .replace(/\{class\}/, classname)
	                    .replace(/\{content\}/, e.extract[i]));
	            }
	        };

	        if (e.extract) {
	            errorline(e, 0, '');
	            errorline(e, 1, 'line');
	            errorline(e, 2, '');
	            content += 'on line ' + e.line + ', column ' + (e.column + 1) + ':\n' +
	                errors.join('\n');
	        }
	        if (e.stack && (e.extract || options.logLevel >= 4)) {
	            content += '\nStack Trace\n' + e.stack;
	        }
	        less.logger.error(content);
	    }

	    return {
	        add: error,
	        remove: removeError
	    };
	};

	},{"./browser":3,"./utils":9}],6:[function(require,module,exports){
	/*global window, XMLHttpRequest */

	module.exports = function(options, logger) {

	    var AbstractFileManager = require("../less/environment/abstract-file-manager.js");

	    var fileCache = {};

	    //TODOS - move log somewhere. pathDiff and doing something similar in node. use pathDiff in the other browser file for the initial load

	    function getXMLHttpRequest() {
	        if (window.XMLHttpRequest && (window.location.protocol !== "file:" || !("ActiveXObject" in window))) {
	            return new XMLHttpRequest();
	        } else {
	            try {
	                /*global ActiveXObject */
	                return new ActiveXObject("Microsoft.XMLHTTP");
	            } catch (e) {
	                logger.error("browser doesn't support AJAX.");
	                return null;
	            }
	        }
	    }

	    var FileManager = function() {
	    };

	    FileManager.prototype = new AbstractFileManager();

	    FileManager.prototype.alwaysMakePathsAbsolute = function alwaysMakePathsAbsolute() {
	        return true;
	    };
	    FileManager.prototype.join = function join(basePath, laterPath) {
	        if (!basePath) {
	            return laterPath;
	        }
	        return this.extractUrlParts(laterPath, basePath).path;
	    };
	    FileManager.prototype.doXHR = function doXHR(url, type, callback, errback) {

	        var xhr = getXMLHttpRequest();
	        var async = options.isFileProtocol ? options.fileAsync : options.async;

	        if (typeof xhr.overrideMimeType === 'function') {
	            xhr.overrideMimeType('text/css');
	        }
	        logger.debug("XHR: Getting '" + url + "'");
	        xhr.open('GET', url, async);
	        xhr.setRequestHeader('Accept', type || 'text/x-less, text/css; q=0.9, */*; q=0.5');
	        xhr.send(null);

	        function handleResponse(xhr, callback, errback) {
	            if (xhr.status >= 200 && xhr.status < 300) {
	                callback(xhr.responseText,
	                    xhr.getResponseHeader("Last-Modified"));
	            } else if (typeof errback === 'function') {
	                errback(xhr.status, url);
	            }
	        }

	        if (options.isFileProtocol && !options.fileAsync) {
	            if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 300)) {
	                callback(xhr.responseText);
	            } else {
	                errback(xhr.status, url);
	            }
	        } else if (async) {
	            xhr.onreadystatechange = function () {
	                if (xhr.readyState == 4) {
	                    handleResponse(xhr, callback, errback);
	                }
	            };
	        } else {
	            handleResponse(xhr, callback, errback);
	        }
	    };
	    FileManager.prototype.supports = function(filename, currentDirectory, options, environment) {
	        return true;
	    };

	    FileManager.prototype.clearFileCache = function() {
	        fileCache = {};
	    };

	    FileManager.prototype.loadFile = function loadFile(filename, currentDirectory, options, environment, callback) {
	        if (currentDirectory && !this.isPathAbsolute(filename)) {
	            filename = currentDirectory + filename;
	        }

	        options = options || {};

	        // sheet may be set to the stylesheet for the initial load or a collection of properties including
	        // some context variables for imports
	        var hrefParts = this.extractUrlParts(filename, window.location.href);
	        var href      = hrefParts.url;

	        if (options.useFileCache && fileCache[href]) {
	            try {
	                var lessText = fileCache[href];
	                callback(null, { contents: lessText, filename: href, webInfo: { lastModified: new Date() }});
	            } catch (e) {
	                callback({filename: href, message: "Error loading file " + href + " error was " + e.message});
	            }
	            return;
	        }

	        this.doXHR(href, options.mime, function doXHRCallback(data, lastModified) {
	            // per file cache
	            fileCache[href] = data;

	            // Use remote copy (re-parse)
	            callback(null, { contents: data, filename: href, webInfo: { lastModified: lastModified }});
	        }, function doXHRError(status, url) {
	            callback({ type: 'File', message: "'" + url + "' wasn't found (" + status + ")", href: href });
	        });
	    };

	    return FileManager;
	};

	},{"../less/environment/abstract-file-manager.js":14}],7:[function(require,module,exports){
	//
	// index.js
	// Should expose the additional browser functions on to the less object
	//
	var addDataAttr = require("./utils").addDataAttr,
	    browser = require("./browser");

	module.exports = function(window, options) {
	    var document = window.document;
	    var less = require('../less')();
	    //module.exports = less;
	    less.options = options;
	    var environment = less.environment,
	        FileManager = require("./file-manager")(options, less.logger),
	        fileManager = new FileManager();
	    environment.addFileManager(fileManager);
	    less.FileManager = FileManager;

	    require("./log-listener")(less, options);
	    var errors = require("./error-reporting")(window, less, options);
	    var cache = less.cache = options.cache || require("./cache")(window, options, less.logger);

	    //Setup user functions
	    if (options.functions) {
	        less.functions.functionRegistry.addMultiple(options.functions);
	    }

	    var typePattern = /^text\/(x-)?less$/;

	    function postProcessCSS(styles) { // deprecated, use a plugin for postprocesstasks
	        if (options.postProcessor && typeof options.postProcessor === 'function') {
	            styles = options.postProcessor.call(styles, styles) || styles;
	        }
	        return styles;
	    }

	    function clone(obj) {
	        var cloned = {};
	        for (var prop in obj) {
	            if (obj.hasOwnProperty(prop)) {
	                cloned[prop] = obj[prop];
	            }
	        }
	        return cloned;
	    }

	    // only really needed for phantom
	    function bind(func, thisArg) {
	        var curryArgs = Array.prototype.slice.call(arguments, 2);
	        return function() {
	            var args = curryArgs.concat(Array.prototype.slice.call(arguments, 0));
	            return func.apply(thisArg, args);
	        };
	    }

	    function loadStyles(modifyVars) {
	        var styles = document.getElementsByTagName('style'),
	            style;

	        for (var i = 0; i < styles.length; i++) {
	            style = styles[i];
	            if (style.type.match(typePattern)) {
	                var instanceOptions = clone(options);
	                instanceOptions.modifyVars = modifyVars;
	                var lessText = style.innerHTML || '';
	                instanceOptions.filename = document.location.href.replace(/#.*$/, '');

	                /*jshint loopfunc:true */
	                // use closure to store current style
	                less.render(lessText, instanceOptions,
	                        bind(function(style, e, result) {
	                            if (e) {
	                                errors.add(e, "inline");
	                            } else {
	                                style.type = 'text/css';
	                                if (style.styleSheet) {
	                                    style.styleSheet.cssText = result.css;
	                                } else {
	                                    style.innerHTML = result.css;
	                                }
	                            }
	                        }, null, style));
	            }
	        }
	    }

	    function loadStyleSheet(sheet, callback, reload, remaining, modifyVars) {

	        var instanceOptions = clone(options);
	        addDataAttr(instanceOptions, sheet);
	        instanceOptions.mime = sheet.type;

	        if (modifyVars) {
	            instanceOptions.modifyVars = modifyVars;
	        }

	        function loadInitialFileCallback(loadedFile) {

	            var data = loadedFile.contents,
	                path = loadedFile.filename,
	                webInfo = loadedFile.webInfo;

	            var newFileInfo = {
	                currentDirectory: fileManager.getPath(path),
	                filename: path,
	                rootFilename: path,
	                relativeUrls: instanceOptions.relativeUrls};

	            newFileInfo.entryPath = newFileInfo.currentDirectory;
	            newFileInfo.rootpath = instanceOptions.rootpath || newFileInfo.currentDirectory;

	            if (webInfo) {
	                webInfo.remaining = remaining;

	                if (!instanceOptions.modifyVars) {
	                    var css = cache.getCSS(path, webInfo);
	                    if (!reload && css) {
	                        webInfo.local = true;
	                        callback(null, css, data, sheet, webInfo, path);
	                        return;
	                    }
	                }
	            }

	            //TODO add tests around how this behaves when reloading
	            errors.remove(path);

	            instanceOptions.rootFileInfo = newFileInfo;
	            less.render(data, instanceOptions, function(e, result) {
	                if (e) {
	                    e.href = path;
	                    callback(e);
	                } else {
	                    result.css = postProcessCSS(result.css);
	                    if (!instanceOptions.modifyVars) {
	                        cache.setCSS(sheet.href, webInfo.lastModified, result.css);
	                    }
	                    callback(null, result.css, data, sheet, webInfo, path);
	                }
	            });
	        }

	        fileManager.loadFile(sheet.href, null, instanceOptions, environment, function(e, loadedFile) {
	            if (e) {
	                callback(e);
	                return;
	            }
	            loadInitialFileCallback(loadedFile);
	        });
	    }

	    function loadStyleSheets(callback, reload, modifyVars) {
	        for (var i = 0; i < less.sheets.length; i++) {
	            loadStyleSheet(less.sheets[i], callback, reload, less.sheets.length - (i + 1), modifyVars);
	        }
	    }

	    function initRunningMode() {
	        if (less.env === 'development') {
	            less.watchTimer = setInterval(function () {
	                if (less.watchMode) {
	                    fileManager.clearFileCache();
	                    loadStyleSheets(function (e, css, _, sheet, webInfo) {
	                        if (e) {
	                            errors.add(e, e.href || sheet.href);
	                        } else if (css) {
	                            browser.createCSS(window.document, css, sheet);
	                        }
	                    });
	                }
	            }, options.poll);
	        }
	    }

	    //
	    // Watch mode
	    //
	    less.watch   = function () {
	        if (!less.watchMode ) {
	            less.env = 'development';
	            initRunningMode();
	        }
	        this.watchMode = true;
	        return true;
	    };

	    less.unwatch = function () {clearInterval(less.watchTimer); this.watchMode = false; return false; };

	    //
	    // Synchronously get all <link> tags with the 'rel' attribute set to
	    // "stylesheet/less".
	    //
	    less.registerStylesheetsImmediately = function() {
	        var links = document.getElementsByTagName('link');
	        less.sheets = [];

	        for (var i = 0; i < links.length; i++) {
	            if (links[i].rel === 'stylesheet/less' || (links[i].rel.match(/stylesheet/) &&
	                (links[i].type.match(typePattern)))) {
	                less.sheets.push(links[i]);
	            }
	        }
	    };

	    //
	    // Asynchronously get all <link> tags with the 'rel' attribute set to
	    // "stylesheet/less", returning a Promise.
	    //
	    less.registerStylesheets = function() {
	        return new Promise(function(resolve, reject) {
	            less.registerStylesheetsImmediately();
	            resolve();
	        });
	    };

	    //
	    // With this function, it's possible to alter variables and re-render
	    // CSS without reloading less-files
	    //
	    less.modifyVars = function(record) {
	        return less.refresh(true, record, false);
	    };

	    less.refresh = function (reload, modifyVars, clearFileCache) {
	        if ((reload || clearFileCache) && clearFileCache !== false) {
	            fileManager.clearFileCache();
	        }
	        return new Promise(function (resolve, reject) {
	            var startTime, endTime, totalMilliseconds;
	            startTime = endTime = new Date();

	            loadStyleSheets(function (e, css, _, sheet, webInfo) {
	                if (e) {
	                    errors.add(e, e.href || sheet.href);
	                    reject(e);
	                    return;
	                }
	                if (webInfo.local) {
	                    less.logger.info("loading " + sheet.href + " from cache.");
	                } else {
	                    less.logger.info("rendered " + sheet.href + " successfully.");
	                }
	                browser.createCSS(window.document, css, sheet);
	                less.logger.info("css for " + sheet.href + " generated in " + (new Date() - endTime) + 'ms');
	                if (webInfo.remaining === 0) {
	                    totalMilliseconds = new Date() - startTime;
	                    less.logger.info("less has finished. css generated in " + totalMilliseconds + 'ms');
	                    resolve({
	                        startTime: startTime,
	                        endTime: endTime,
	                        totalMilliseconds: totalMilliseconds,
	                        sheets: less.sheets.length
	                    });
	                }
	                endTime = new Date();
	            }, reload, modifyVars);

	            loadStyles(modifyVars);
	        });
	    };

	    less.refreshStyles = loadStyles;
	    return less;
	};

	},{"../less":30,"./browser":3,"./cache":4,"./error-reporting":5,"./file-manager":6,"./log-listener":8,"./utils":9}],8:[function(require,module,exports){
	module.exports = function(less, options) {

	    var logLevel_debug = 4,
	        logLevel_info = 3,
	        logLevel_warn = 2,
	        logLevel_error = 1;

	    // The amount of logging in the javascript console.
	    // 3 - Debug, information and errors
	    // 2 - Information and errors
	    // 1 - Errors
	    // 0 - None
	    // Defaults to 2
	    options.logLevel = typeof options.logLevel !== 'undefined' ? options.logLevel : (options.env === 'development' ?  logLevel_info : logLevel_error);

	    if (!options.loggers) {
	        options.loggers = [{
	            debug: function(msg) {
	                if (options.logLevel >= logLevel_debug) {
	                    console.log(msg);
	                }
	            },
	            info: function(msg) {
	                if (options.logLevel >= logLevel_info) {
	                    console.log(msg);
	                }
	            },
	            warn: function(msg) {
	                if (options.logLevel >= logLevel_warn) {
	                    console.warn(msg);
	                }
	            },
	            error: function(msg) {
	                if (options.logLevel >= logLevel_error) {
	                    console.error(msg);
	                }
	            }
	        }];
	    }
	    for (var i = 0; i < options.loggers.length; i++) {
	        less.logger.addListener(options.loggers[i]);
	    }
	};

	},{}],9:[function(require,module,exports){
	module.exports = {
	    extractId: function(href) {
	        return href.replace(/^[a-z-]+:\/+?[^\/]+/, '')  // Remove protocol & domain
	            .replace(/[\?\&]livereload=\w+/, '')        // Remove LiveReload cachebuster
	            .replace(/^\//, '')                         // Remove root /
	            .replace(/\.[a-zA-Z]+$/, '')                // Remove simple extension
	            .replace(/[^\.\w-]+/g, '-')                 // Replace illegal characters
	            .replace(/\./g, ':');                       // Replace dots with colons(for valid id)
	    },
	    addDataAttr: function(options, tag) {
	        for (var opt in tag.dataset) {
	            if (tag.dataset.hasOwnProperty(opt)) {
	                if (opt === "env" || opt === "dumpLineNumbers" || opt === "rootpath" || opt === "errorReporting") {
	                    options[opt] = tag.dataset[opt];
	                } else {
	                    try {
	                        options[opt] = JSON.parse(tag.dataset[opt]);
	                    }
	                    catch(_) {}
	                }
	            }
	        }
	    }
	};

	},{}],10:[function(require,module,exports){
	var contexts = {};
	module.exports = contexts;

	var copyFromOriginal = function copyFromOriginal(original, destination, propertiesToCopy) {
	    if (!original) { return; }

	    for (var i = 0; i < propertiesToCopy.length; i++) {
	        if (original.hasOwnProperty(propertiesToCopy[i])) {
	            destination[propertiesToCopy[i]] = original[propertiesToCopy[i]];
	        }
	    }
	};

	/*
	 parse is used whilst parsing
	 */
	var parseCopyProperties = [
	    // options
	    'paths',            // option - unmodified - paths to search for imports on
	    'relativeUrls',     // option - whether to adjust URL's to be relative
	    'rootpath',         // option - rootpath to append to URL's
	    'strictImports',    // option -
	    'insecure',         // option - whether to allow imports from insecure ssl hosts
	    'dumpLineNumbers',  // option - whether to dump line numbers
	    'compress',         // option - whether to compress
	    'syncImport',       // option - whether to import synchronously
	    'chunkInput',       // option - whether to chunk input. more performant but causes parse issues.
	    'mime',             // browser only - mime type for sheet import
	    'useFileCache',     // browser only - whether to use the per file session cache
	    // context
	    'processImports',   // option & context - whether to process imports. if false then imports will not be imported.
	                        // Used by the import manager to stop multiple import visitors being created.
	    'reference',        // Used to indicate that the contents are imported by reference
	    'pluginManager'     // Used as the plugin manager for the session
	];

	contexts.Parse = function(options) {
	    copyFromOriginal(options, this, parseCopyProperties);

	    if (typeof this.paths === "string") { this.paths = [this.paths]; }
	};

	var evalCopyProperties = [
	    'paths',          // additional include paths
	    'compress',       // whether to compress
	    'ieCompat',       // whether to enforce IE compatibility (IE8 data-uri)
	    'strictMath',     // whether math has to be within parenthesis
	    'strictUnits',    // whether units need to evaluate correctly
	    'sourceMap',      // whether to output a source map
	    'importMultiple', // whether we are currently importing multiple copies
	    'urlArgs',        // whether to add args into url tokens
	    'javascriptEnabled',// option - whether JavaScript is enabled. if undefined, defaults to true
	    'pluginManager',  // Used as the plugin manager for the session
	    'importantScope'  // used to bubble up !important statements
	    ];

	contexts.Eval = function(options, frames) {
	    copyFromOriginal(options, this, evalCopyProperties);

	    if (typeof this.paths === "string") { this.paths = [this.paths]; }

	    this.frames = frames || [];
	    this.importantScope = this.importantScope || [];
	};

	contexts.Eval.prototype.inParenthesis = function () {
	    if (!this.parensStack) {
	        this.parensStack = [];
	    }
	    this.parensStack.push(true);
	};

	contexts.Eval.prototype.outOfParenthesis = function () {
	    this.parensStack.pop();
	};

	contexts.Eval.prototype.isMathOn = function () {
	    return this.strictMath ? (this.parensStack && this.parensStack.length) : true;
	};

	contexts.Eval.prototype.isPathRelative = function (path) {
	    return !/^(?:[a-z-]+:|\/|#)/i.test(path);
	};

	contexts.Eval.prototype.normalizePath = function( path ) {
	    var
	      segments = path.split("/").reverse(),
	      segment;

	    path = [];
	    while (segments.length !== 0 ) {
	        segment = segments.pop();
	        switch( segment ) {
	            case ".":
	                break;
	            case "..":
	                if ((path.length === 0) || (path[path.length - 1] === "..")) {
	                    path.push( segment );
	                } else {
	                    path.pop();
	                }
	                break;
	            default:
	                path.push( segment );
	                break;
	        }
	    }

	    return path.join("/");
	};

	//todo - do the same for the toCSS ?

	},{}],11:[function(require,module,exports){
	module.exports = {
	    'aliceblue':'#f0f8ff',
	    'antiquewhite':'#faebd7',
	    'aqua':'#00ffff',
	    'aquamarine':'#7fffd4',
	    'azure':'#f0ffff',
	    'beige':'#f5f5dc',
	    'bisque':'#ffe4c4',
	    'black':'#000000',
	    'blanchedalmond':'#ffebcd',
	    'blue':'#0000ff',
	    'blueviolet':'#8a2be2',
	    'brown':'#a52a2a',
	    'burlywood':'#deb887',
	    'cadetblue':'#5f9ea0',
	    'chartreuse':'#7fff00',
	    'chocolate':'#d2691e',
	    'coral':'#ff7f50',
	    'cornflowerblue':'#6495ed',
	    'cornsilk':'#fff8dc',
	    'crimson':'#dc143c',
	    'cyan':'#00ffff',
	    'darkblue':'#00008b',
	    'darkcyan':'#008b8b',
	    'darkgoldenrod':'#b8860b',
	    'darkgray':'#a9a9a9',
	    'darkgrey':'#a9a9a9',
	    'darkgreen':'#006400',
	    'darkkhaki':'#bdb76b',
	    'darkmagenta':'#8b008b',
	    'darkolivegreen':'#556b2f',
	    'darkorange':'#ff8c00',
	    'darkorchid':'#9932cc',
	    'darkred':'#8b0000',
	    'darksalmon':'#e9967a',
	    'darkseagreen':'#8fbc8f',
	    'darkslateblue':'#483d8b',
	    'darkslategray':'#2f4f4f',
	    'darkslategrey':'#2f4f4f',
	    'darkturquoise':'#00ced1',
	    'darkviolet':'#9400d3',
	    'deeppink':'#ff1493',
	    'deepskyblue':'#00bfff',
	    'dimgray':'#696969',
	    'dimgrey':'#696969',
	    'dodgerblue':'#1e90ff',
	    'firebrick':'#b22222',
	    'floralwhite':'#fffaf0',
	    'forestgreen':'#228b22',
	    'fuchsia':'#ff00ff',
	    'gainsboro':'#dcdcdc',
	    'ghostwhite':'#f8f8ff',
	    'gold':'#ffd700',
	    'goldenrod':'#daa520',
	    'gray':'#808080',
	    'grey':'#808080',
	    'green':'#008000',
	    'greenyellow':'#adff2f',
	    'honeydew':'#f0fff0',
	    'hotpink':'#ff69b4',
	    'indianred':'#cd5c5c',
	    'indigo':'#4b0082',
	    'ivory':'#fffff0',
	    'khaki':'#f0e68c',
	    'lavender':'#e6e6fa',
	    'lavenderblush':'#fff0f5',
	    'lawngreen':'#7cfc00',
	    'lemonchiffon':'#fffacd',
	    'lightblue':'#add8e6',
	    'lightcoral':'#f08080',
	    'lightcyan':'#e0ffff',
	    'lightgoldenrodyellow':'#fafad2',
	    'lightgray':'#d3d3d3',
	    'lightgrey':'#d3d3d3',
	    'lightgreen':'#90ee90',
	    'lightpink':'#ffb6c1',
	    'lightsalmon':'#ffa07a',
	    'lightseagreen':'#20b2aa',
	    'lightskyblue':'#87cefa',
	    'lightslategray':'#778899',
	    'lightslategrey':'#778899',
	    'lightsteelblue':'#b0c4de',
	    'lightyellow':'#ffffe0',
	    'lime':'#00ff00',
	    'limegreen':'#32cd32',
	    'linen':'#faf0e6',
	    'magenta':'#ff00ff',
	    'maroon':'#800000',
	    'mediumaquamarine':'#66cdaa',
	    'mediumblue':'#0000cd',
	    'mediumorchid':'#ba55d3',
	    'mediumpurple':'#9370d8',
	    'mediumseagreen':'#3cb371',
	    'mediumslateblue':'#7b68ee',
	    'mediumspringgreen':'#00fa9a',
	    'mediumturquoise':'#48d1cc',
	    'mediumvioletred':'#c71585',
	    'midnightblue':'#191970',
	    'mintcream':'#f5fffa',
	    'mistyrose':'#ffe4e1',
	    'moccasin':'#ffe4b5',
	    'navajowhite':'#ffdead',
	    'navy':'#000080',
	    'oldlace':'#fdf5e6',
	    'olive':'#808000',
	    'olivedrab':'#6b8e23',
	    'orange':'#ffa500',
	    'orangered':'#ff4500',
	    'orchid':'#da70d6',
	    'palegoldenrod':'#eee8aa',
	    'palegreen':'#98fb98',
	    'paleturquoise':'#afeeee',
	    'palevioletred':'#d87093',
	    'papayawhip':'#ffefd5',
	    'peachpuff':'#ffdab9',
	    'peru':'#cd853f',
	    'pink':'#ffc0cb',
	    'plum':'#dda0dd',
	    'powderblue':'#b0e0e6',
	    'purple':'#800080',
	    'rebeccapurple':'#663399',
	    'red':'#ff0000',
	    'rosybrown':'#bc8f8f',
	    'royalblue':'#4169e1',
	    'saddlebrown':'#8b4513',
	    'salmon':'#fa8072',
	    'sandybrown':'#f4a460',
	    'seagreen':'#2e8b57',
	    'seashell':'#fff5ee',
	    'sienna':'#a0522d',
	    'silver':'#c0c0c0',
	    'skyblue':'#87ceeb',
	    'slateblue':'#6a5acd',
	    'slategray':'#708090',
	    'slategrey':'#708090',
	    'snow':'#fffafa',
	    'springgreen':'#00ff7f',
	    'steelblue':'#4682b4',
	    'tan':'#d2b48c',
	    'teal':'#008080',
	    'thistle':'#d8bfd8',
	    'tomato':'#ff6347',
	    'turquoise':'#40e0d0',
	    'violet':'#ee82ee',
	    'wheat':'#f5deb3',
	    'white':'#ffffff',
	    'whitesmoke':'#f5f5f5',
	    'yellow':'#ffff00',
	    'yellowgreen':'#9acd32'
	};
	},{}],12:[function(require,module,exports){
	module.exports = {
	    colors: require("./colors"),
	    unitConversions: require("./unit-conversions")
	};

	},{"./colors":11,"./unit-conversions":13}],13:[function(require,module,exports){
	module.exports = {
	    length: {
	        'm': 1,
	        'cm': 0.01,
	        'mm': 0.001,
	        'in': 0.0254,
	        'px': 0.0254 / 96,
	        'pt': 0.0254 / 72,
	        'pc': 0.0254 / 72 * 12
	    },
	    duration: {
	        's': 1,
	        'ms': 0.001
	    },
	    angle: {
	        'rad': 1 / (2 * Math.PI),
	        'deg': 1 / 360,
	        'grad': 1 / 400,
	        'turn': 1
	    }
	};
	},{}],14:[function(require,module,exports){
	var abstractFileManager = function() {
	};

	abstractFileManager.prototype.getPath = function (filename) {
	    var j = filename.lastIndexOf('?');
	    if (j > 0) {
	        filename = filename.slice(0, j);
	    }
	    j = filename.lastIndexOf('/');
	    if (j < 0) {
	        j = filename.lastIndexOf('\\');
	    }
	    if (j < 0) {
	        return "";
	    }
	    return filename.slice(0, j + 1);
	};

	abstractFileManager.prototype.tryAppendExtension = function(path, ext) {
	    return /(\.[a-z]*$)|([\?;].*)$/.test(path) ? path : path + ext;
	};

	abstractFileManager.prototype.tryAppendLessExtension = function(path) {
	    return this.tryAppendExtension(path, '.less');
	};

	abstractFileManager.prototype.supportsSync = function() {
	    return false;
	};

	abstractFileManager.prototype.alwaysMakePathsAbsolute = function() {
	    return false;
	};

	abstractFileManager.prototype.isPathAbsolute = function(filename) {
	    return (/^(?:[a-z-]+:|\/|\\|#)/i).test(filename);
	};

	abstractFileManager.prototype.join = function(basePath, laterPath) {
	    if (!basePath) {
	        return laterPath;
	    }
	    return basePath + laterPath;
	};
	abstractFileManager.prototype.pathDiff = function pathDiff(url, baseUrl) {
	    // diff between two paths to create a relative path

	    var urlParts = this.extractUrlParts(url),
	        baseUrlParts = this.extractUrlParts(baseUrl),
	        i, max, urlDirectories, baseUrlDirectories, diff = "";
	    if (urlParts.hostPart !== baseUrlParts.hostPart) {
	        return "";
	    }
	    max = Math.max(baseUrlParts.directories.length, urlParts.directories.length);
	    for (i = 0; i < max; i++) {
	        if (baseUrlParts.directories[i] !== urlParts.directories[i]) { break; }
	    }
	    baseUrlDirectories = baseUrlParts.directories.slice(i);
	    urlDirectories = urlParts.directories.slice(i);
	    for (i = 0; i < baseUrlDirectories.length - 1; i++) {
	        diff += "../";
	    }
	    for (i = 0; i < urlDirectories.length - 1; i++) {
	        diff += urlDirectories[i] + "/";
	    }
	    return diff;
	};
	// helper function, not part of API
	abstractFileManager.prototype.extractUrlParts = function extractUrlParts(url, baseUrl) {
	    // urlParts[1] = protocol&hostname || /
	    // urlParts[2] = / if path relative to host base
	    // urlParts[3] = directories
	    // urlParts[4] = filename
	    // urlParts[5] = parameters

	    var urlPartsRegex = /^((?:[a-z-]+:)?\/+?(?:[^\/\?#]*\/)|([\/\\]))?((?:[^\/\\\?#]*[\/\\])*)([^\/\\\?#]*)([#\?].*)?$/i,
	        urlParts = url.match(urlPartsRegex),
	        returner = {}, directories = [], i, baseUrlParts;

	    if (!urlParts) {
	        throw new Error("Could not parse sheet href - '" + url + "'");
	    }

	    // Stylesheets in IE don't always return the full path
	    if (baseUrl && (!urlParts[1] || urlParts[2])) {
	        baseUrlParts = baseUrl.match(urlPartsRegex);
	        if (!baseUrlParts) {
	            throw new Error("Could not parse page url - '" + baseUrl + "'");
	        }
	        urlParts[1] = urlParts[1] || baseUrlParts[1] || "";
	        if (!urlParts[2]) {
	            urlParts[3] = baseUrlParts[3] + urlParts[3];
	        }
	    }

	    if (urlParts[3]) {
	        directories = urlParts[3].replace(/\\/g, "/").split("/");

	        // extract out . before .. so .. doesn't absorb a non-directory
	        for (i = 0; i < directories.length; i++) {
	            if (directories[i] === ".") {
	                directories.splice(i, 1);
	                i -= 1;
	            }
	        }

	        for (i = 0; i < directories.length; i++) {
	            if (directories[i] === ".." && i > 0) {
	                directories.splice(i - 1, 2);
	                i -= 2;
	            }
	        }
	    }

	    returner.hostPart = urlParts[1];
	    returner.directories = directories;
	    returner.path = (urlParts[1] || "") + directories.join("/");
	    returner.fileUrl = returner.path + (urlParts[4] || "");
	    returner.url = returner.fileUrl + (urlParts[5] || "");
	    return returner;
	};

	module.exports = abstractFileManager;

	},{}],15:[function(require,module,exports){
	var logger = require("../logger");
	var environment = function(externalEnvironment, fileManagers) {
	    this.fileManagers = fileManagers || [];
	    externalEnvironment = externalEnvironment || {};

	    var optionalFunctions = ["encodeBase64", "mimeLookup", "charsetLookup", "getSourceMapGenerator"],
	        requiredFunctions = [],
	        functions = requiredFunctions.concat(optionalFunctions);

	    for (var i = 0; i < functions.length; i++) {
	        var propName = functions[i],
	            environmentFunc = externalEnvironment[propName];
	        if (environmentFunc) {
	            this[propName] = environmentFunc.bind(externalEnvironment);
	        } else if (i < requiredFunctions.length) {
	            this.warn("missing required function in environment - " + propName);
	        }
	    }
	};

	environment.prototype.getFileManager = function (filename, currentDirectory, options, environment, isSync) {

	    if (!filename) {
	        logger.warn("getFileManager called with no filename.. Please report this issue. continuing.");
	    }
	    if (currentDirectory == null) {
	        logger.warn("getFileManager called with null directory.. Please report this issue. continuing.");
	    }

	    var fileManagers = this.fileManagers;
	    if (options.pluginManager) {
	        fileManagers = [].concat(fileManagers).concat(options.pluginManager.getFileManagers());
	    }
	    for (var i = fileManagers.length - 1; i >= 0 ; i--) {
	        var fileManager = fileManagers[i];
	        if (fileManager[isSync ? "supportsSync" : "supports"](filename, currentDirectory, options, environment)) {
	            return fileManager;
	        }
	    }
	    return null;
	};

	environment.prototype.addFileManager = function (fileManager) {
	    this.fileManagers.push(fileManager);
	};

	environment.prototype.clearFileManagers = function () {
	    this.fileManagers = [];
	};

	module.exports = environment;

	},{"../logger":32}],16:[function(require,module,exports){
	var Color = require("../tree/color"),
	    functionRegistry = require("./function-registry");

	// Color Blending
	// ref: http://www.w3.org/TR/compositing-1

	function colorBlend(mode, color1, color2) {
	    var ab = color1.alpha, cb, // backdrop
	        as = color2.alpha, cs, // source
	        ar, cr, r = [];        // result

	    ar = as + ab * (1 - as);
	    for (var i = 0; i < 3; i++) {
	        cb = color1.rgb[i] / 255;
	        cs = color2.rgb[i] / 255;
	        cr = mode(cb, cs);
	        if (ar) {
	            cr = (as * cs + ab * (cb -
	                  as * (cb + cs - cr))) / ar;
	        }
	        r[i] = cr * 255;
	    }

	    return new Color(r, ar);
	}

	var colorBlendModeFunctions = {
	    multiply: function(cb, cs) {
	        return cb * cs;
	    },
	    screen: function(cb, cs) {
	        return cb + cs - cb * cs;
	    },
	    overlay: function(cb, cs) {
	        cb *= 2;
	        return (cb <= 1) ?
	            colorBlendModeFunctions.multiply(cb, cs) :
	            colorBlendModeFunctions.screen(cb - 1, cs);
	    },
	    softlight: function(cb, cs) {
	        var d = 1, e = cb;
	        if (cs > 0.5) {
	            e = 1;
	            d = (cb > 0.25) ? Math.sqrt(cb)
	                : ((16 * cb - 12) * cb + 4) * cb;
	        }
	        return cb - (1 - 2 * cs) * e * (d - cb);
	    },
	    hardlight: function(cb, cs) {
	        return colorBlendModeFunctions.overlay(cs, cb);
	    },
	    difference: function(cb, cs) {
	        return Math.abs(cb - cs);
	    },
	    exclusion: function(cb, cs) {
	        return cb + cs - 2 * cb * cs;
	    },

	    // non-w3c functions:
	    average: function(cb, cs) {
	        return (cb + cs) / 2;
	    },
	    negation: function(cb, cs) {
	        return 1 - Math.abs(cb + cs - 1);
	    }
	};

	for (var f in colorBlendModeFunctions) {
	    if (colorBlendModeFunctions.hasOwnProperty(f)) {
	        colorBlend[f] = colorBlend.bind(null, colorBlendModeFunctions[f]);
	    }
	}

	functionRegistry.addMultiple(colorBlend);

	},{"../tree/color":49,"./function-registry":21}],17:[function(require,module,exports){
	var Dimension = require("../tree/dimension"),
	    Color = require("../tree/color"),
	    Quoted = require("../tree/quoted"),
	    Anonymous = require("../tree/anonymous"),
	    functionRegistry = require("./function-registry"),
	    colorFunctions;

	function clamp(val) {
	    return Math.min(1, Math.max(0, val));
	}
	function hsla(color) {
	    return colorFunctions.hsla(color.h, color.s, color.l, color.a);
	}
	function number(n) {
	    if (n instanceof Dimension) {
	        return parseFloat(n.unit.is('%') ? n.value / 100 : n.value);
	    } else if (typeof n === 'number') {
	        return n;
	    } else {
	        throw {
	            type: "Argument",
	            message: "color functions take numbers as parameters"
	        };
	    }
	}
	function scaled(n, size) {
	    if (n instanceof Dimension && n.unit.is('%')) {
	        return parseFloat(n.value * size / 100);
	    } else {
	        return number(n);
	    }
	}
	colorFunctions = {
	    rgb: function (r, g, b) {
	        return colorFunctions.rgba(r, g, b, 1.0);
	    },
	    rgba: function (r, g, b, a) {
	        var rgb = [r, g, b].map(function (c) { return scaled(c, 255); });
	        a = number(a);
	        return new Color(rgb, a);
	    },
	    hsl: function (h, s, l) {
	        return colorFunctions.hsla(h, s, l, 1.0);
	    },
	    hsla: function (h, s, l, a) {
	        function hue(h) {
	            h = h < 0 ? h + 1 : (h > 1 ? h - 1 : h);
	            if (h * 6 < 1) {
	                return m1 + (m2 - m1) * h * 6;
	            }
	            else if (h * 2 < 1) {
	                return m2;
	            }
	            else if (h * 3 < 2) {
	                return m1 + (m2 - m1) * (2 / 3 - h) * 6;
	            }
	            else {
	                return m1;
	            }
	        }

	        h = (number(h) % 360) / 360;
	        s = clamp(number(s)); l = clamp(number(l)); a = clamp(number(a));

	        var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
	        var m1 = l * 2 - m2;

	        return colorFunctions.rgba(hue(h + 1 / 3) * 255,
	            hue(h)       * 255,
	            hue(h - 1 / 3) * 255,
	            a);
	    },

	    hsv: function(h, s, v) {
	        return colorFunctions.hsva(h, s, v, 1.0);
	    },

	    hsva: function(h, s, v, a) {
	        h = ((number(h) % 360) / 360) * 360;
	        s = number(s); v = number(v); a = number(a);

	        var i, f;
	        i = Math.floor((h / 60) % 6);
	        f = (h / 60) - i;

	        var vs = [v,
	            v * (1 - s),
	            v * (1 - f * s),
	            v * (1 - (1 - f) * s)];
	        var perm = [[0, 3, 1],
	            [2, 0, 1],
	            [1, 0, 3],
	            [1, 2, 0],
	            [3, 1, 0],
	            [0, 1, 2]];

	        return colorFunctions.rgba(vs[perm[i][0]] * 255,
	            vs[perm[i][1]] * 255,
	            vs[perm[i][2]] * 255,
	            a);
	    },

	    hue: function (color) {
	        return new Dimension(color.toHSL().h);
	    },
	    saturation: function (color) {
	        return new Dimension(color.toHSL().s * 100, '%');
	    },
	    lightness: function (color) {
	        return new Dimension(color.toHSL().l * 100, '%');
	    },
	    hsvhue: function(color) {
	        return new Dimension(color.toHSV().h);
	    },
	    hsvsaturation: function (color) {
	        return new Dimension(color.toHSV().s * 100, '%');
	    },
	    hsvvalue: function (color) {
	        return new Dimension(color.toHSV().v * 100, '%');
	    },
	    red: function (color) {
	        return new Dimension(color.rgb[0]);
	    },
	    green: function (color) {
	        return new Dimension(color.rgb[1]);
	    },
	    blue: function (color) {
	        return new Dimension(color.rgb[2]);
	    },
	    alpha: function (color) {
	        return new Dimension(color.toHSL().a);
	    },
	    luma: function (color) {
	        return new Dimension(color.luma() * color.alpha * 100, '%');
	    },
	    luminance: function (color) {
	        var luminance =
	            (0.2126 * color.rgb[0] / 255) +
	                (0.7152 * color.rgb[1] / 255) +
	                (0.0722 * color.rgb[2] / 255);

	        return new Dimension(luminance * color.alpha * 100, '%');
	    },
	    saturate: function (color, amount, method) {
	        // filter: saturate(3.2);
	        // should be kept as is, so check for color
	        if (!color.rgb) {
	            return null;
	        }
	        var hsl = color.toHSL();

	        if (typeof method !== "undefined" && method.value === "relative") {
	            hsl.s +=  hsl.s * amount.value / 100;
	        }
	        else {
	            hsl.s += amount.value / 100;
	        }
	        hsl.s = clamp(hsl.s);
	        return hsla(hsl);
	    },
	    desaturate: function (color, amount, method) {
	        var hsl = color.toHSL();

	        if (typeof method !== "undefined" && method.value === "relative") {
	            hsl.s -=  hsl.s * amount.value / 100;
	        }
	        else {
	            hsl.s -= amount.value / 100;
	        }
	        hsl.s = clamp(hsl.s);
	        return hsla(hsl);
	    },
	    lighten: function (color, amount, method) {
	        var hsl = color.toHSL();

	        if (typeof method !== "undefined" && method.value === "relative") {
	            hsl.l +=  hsl.l * amount.value / 100;
	        }
	        else {
	            hsl.l += amount.value / 100;
	        }
	        hsl.l = clamp(hsl.l);
	        return hsla(hsl);
	    },
	    darken: function (color, amount, method) {
	        var hsl = color.toHSL();

	        if (typeof method !== "undefined" && method.value === "relative") {
	            hsl.l -=  hsl.l * amount.value / 100;
	        }
	        else {
	            hsl.l -= amount.value / 100;
	        }
	        hsl.l = clamp(hsl.l);
	        return hsla(hsl);
	    },
	    fadein: function (color, amount, method) {
	        var hsl = color.toHSL();

	        if (typeof method !== "undefined" && method.value === "relative") {
	            hsl.a +=  hsl.a * amount.value / 100;
	        }
	        else {
	            hsl.a += amount.value / 100;
	        }
	        hsl.a = clamp(hsl.a);
	        return hsla(hsl);
	    },
	    fadeout: function (color, amount, method) {
	        var hsl = color.toHSL();

	        if (typeof method !== "undefined" && method.value === "relative") {
	            hsl.a -=  hsl.a * amount.value / 100;
	        }
	        else {
	            hsl.a -= amount.value / 100;
	        }
	        hsl.a = clamp(hsl.a);
	        return hsla(hsl);
	    },
	    fade: function (color, amount) {
	        var hsl = color.toHSL();

	        hsl.a = amount.value / 100;
	        hsl.a = clamp(hsl.a);
	        return hsla(hsl);
	    },
	    spin: function (color, amount) {
	        var hsl = color.toHSL();
	        var hue = (hsl.h + amount.value) % 360;

	        hsl.h = hue < 0 ? 360 + hue : hue;

	        return hsla(hsl);
	    },
	    //
	    // Copyright (c) 2006-2009 Hampton Catlin, Nathan Weizenbaum, and Chris Eppstein
	    // http://sass-lang.com
	    //
	    mix: function (color1, color2, weight) {
	        if (!color1.toHSL || !color2.toHSL) {
	            console.log(color2.type);
	            console.dir(color2);
	        }
	        if (!weight) {
	            weight = new Dimension(50);
	        }
	        var p = weight.value / 100.0;
	        var w = p * 2 - 1;
	        var a = color1.toHSL().a - color2.toHSL().a;

	        var w1 = (((w * a == -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
	        var w2 = 1 - w1;

	        var rgb = [color1.rgb[0] * w1 + color2.rgb[0] * w2,
	            color1.rgb[1] * w1 + color2.rgb[1] * w2,
	            color1.rgb[2] * w1 + color2.rgb[2] * w2];

	        var alpha = color1.alpha * p + color2.alpha * (1 - p);

	        return new Color(rgb, alpha);
	    },
	    greyscale: function (color) {
	        return colorFunctions.desaturate(color, new Dimension(100));
	    },
	    contrast: function (color, dark, light, threshold) {
	        // filter: contrast(3.2);
	        // should be kept as is, so check for color
	        if (!color.rgb) {
	            return null;
	        }
	        if (typeof light === 'undefined') {
	            light = colorFunctions.rgba(255, 255, 255, 1.0);
	        }
	        if (typeof dark === 'undefined') {
	            dark = colorFunctions.rgba(0, 0, 0, 1.0);
	        }
	        //Figure out which is actually light and dark!
	        if (dark.luma() > light.luma()) {
	            var t = light;
	            light = dark;
	            dark = t;
	        }
	        if (typeof threshold === 'undefined') {
	            threshold = 0.43;
	        } else {
	            threshold = number(threshold);
	        }
	        if (color.luma() < threshold) {
	            return light;
	        } else {
	            return dark;
	        }
	    },
	    argb: function (color) {
	        return new Anonymous(color.toARGB());
	    },
	    color: function(c) {
	        if ((c instanceof Quoted) &&
	            (/^#([a-f0-9]{6}|[a-f0-9]{3})$/i.test(c.value))) {
	            return new Color(c.value.slice(1));
	        }
	        if ((c instanceof Color) || (c = Color.fromKeyword(c.value))) {
	            c.value = undefined;
	            return c;
	        }
	        throw {
	            type:    "Argument",
	            message: "argument must be a color keyword or 3/6 digit hex e.g. #FFF"
	        };
	    },
	    tint: function(color, amount) {
	        return colorFunctions.mix(colorFunctions.rgb(255, 255, 255), color, amount);
	    },
	    shade: function(color, amount) {
	        return colorFunctions.mix(colorFunctions.rgb(0, 0, 0), color, amount);
	    }
	};
	functionRegistry.addMultiple(colorFunctions);

	},{"../tree/anonymous":45,"../tree/color":49,"../tree/dimension":55,"../tree/quoted":72,"./function-registry":21}],18:[function(require,module,exports){
	module.exports = function(environment) {
	    var Quoted = require("../tree/quoted"),
	        URL = require("../tree/url"),
	        functionRegistry = require("./function-registry"),
	        fallback = function(functionThis, node) {
	            return new URL(node, functionThis.index, functionThis.currentFileInfo).eval(functionThis.context);
	        },
	        logger = require('../logger');

	    functionRegistry.add("data-uri", function(mimetypeNode, filePathNode) {

	        if (!filePathNode) {
	            filePathNode = mimetypeNode;
	            mimetypeNode = null;
	        }

	        var mimetype = mimetypeNode && mimetypeNode.value;
	        var filePath = filePathNode.value;
	        var currentFileInfo = this.currentFileInfo;
	        var currentDirectory = currentFileInfo.relativeUrls ?
	            currentFileInfo.currentDirectory : currentFileInfo.entryPath;

	        var fragmentStart = filePath.indexOf('#');
	        var fragment = '';
	        if (fragmentStart !== -1) {
	            fragment = filePath.slice(fragmentStart);
	            filePath = filePath.slice(0, fragmentStart);
	        }

	        var fileManager = environment.getFileManager(filePath, currentDirectory, this.context, environment, true);

	        if (!fileManager) {
	            return fallback(this, filePathNode);
	        }

	        var useBase64 = false;

	        // detect the mimetype if not given
	        if (!mimetypeNode) {

	            mimetype = environment.mimeLookup(filePath);

	            if (mimetype === "image/svg+xml") {
	                useBase64 = false;
	            } else {
	                // use base 64 unless it's an ASCII or UTF-8 format
	                var charset = environment.charsetLookup(mimetype);
	                useBase64 = ['US-ASCII', 'UTF-8'].indexOf(charset) < 0;
	            }
	            if (useBase64) { mimetype += ';base64'; }
	        }
	        else {
	            useBase64 = /;base64$/.test(mimetype);
	        }

	        var fileSync = fileManager.loadFileSync(filePath, currentDirectory, this.context, environment);
	        if (!fileSync.contents) {
	            logger.warn("Skipped data-uri embedding of " + filePath + " because file not found");
	            return fallback(this, filePathNode || mimetypeNode);
	        }
	        var buf = fileSync.contents;
	        if (useBase64 && !environment.encodeBase64) {
	            return fallback(this, filePathNode);
	        }

	        buf = useBase64 ? environment.encodeBase64(buf) : encodeURIComponent(buf);

	        var uri = "data:" + mimetype + ',' + buf + fragment;

	        // IE8 cannot handle a data-uri larger than 32,768 characters. If this is exceeded
	        // and the --ieCompat flag is enabled, return a normal url() instead.
	        var DATA_URI_MAX = 32768;
	        if (uri.length >= DATA_URI_MAX) {

	            if (this.context.ieCompat !== false) {
	                logger.warn("Skipped data-uri embedding of " + filePath + " because its size (" + uri.length +
	                    " characters) exceeds IE8-safe " + DATA_URI_MAX + " characters!");

	                return fallback(this, filePathNode || mimetypeNode);
	            }
	        }

	        return new URL(new Quoted('"' + uri + '"', uri, false, this.index, this.currentFileInfo), this.index, this.currentFileInfo);
	    });
	};

	},{"../logger":32,"../tree/quoted":72,"../tree/url":79,"./function-registry":21}],19:[function(require,module,exports){
	var Keyword = require("../tree/keyword"),
	    functionRegistry = require("./function-registry");

	var defaultFunc = {
	    eval: function () {
	        var v = this.value_, e = this.error_;
	        if (e) {
	            throw e;
	        }
	        if (v != null) {
	            return v ? Keyword.True : Keyword.False;
	        }
	    },
	    value: function (v) {
	        this.value_ = v;
	    },
	    error: function (e) {
	        this.error_ = e;
	    },
	    reset: function () {
	        this.value_ = this.error_ = null;
	    }
	};

	functionRegistry.add("default", defaultFunc.eval.bind(defaultFunc));

	module.exports = defaultFunc;

	},{"../tree/keyword":64,"./function-registry":21}],20:[function(require,module,exports){
	var Expression = require("../tree/expression");

	var functionCaller = function(name, context, index, currentFileInfo) {
	    this.name = name.toLowerCase();
	    this.index = index;
	    this.context = context;
	    this.currentFileInfo = currentFileInfo;

	    this.func = context.frames[0].functionRegistry.get(this.name);
	};
	functionCaller.prototype.isValid = function() {
	    return Boolean(this.func);
	};
	functionCaller.prototype.call = function(args) {

	    // This code is terrible and should be replaced as per this issue...
	    // https://github.com/less/less.js/issues/2477
	    if (Array.isArray(args)) {
	        args = args.filter(function (item) {
	            if (item.type === "Comment") {
	                return false;
	            }
	            return true;
	        })
	        .map(function(item) {
	            if (item.type === "Expression") {
	                var subNodes = item.value.filter(function (item) {
	                    if (item.type === "Comment") {
	                        return false;
	                    }
	                    return true;
	                });
	                if (subNodes.length === 1) {
	                    return subNodes[0];
	                } else {
	                    return new Expression(subNodes);
	                }
	            }
	            return item;
	        });
	    }

	    return this.func.apply(this, args);
	};

	module.exports = functionCaller;

	},{"../tree/expression":58}],21:[function(require,module,exports){
	function makeRegistry( base ) {
	    return {
	        _data: {},
	        add: function(name, func) {
	            // precautionary case conversion, as later querying of
	            // the registry by function-caller uses lower case as well.
	            name = name.toLowerCase();

	            if (this._data.hasOwnProperty(name)) {
	                //TODO warn
	            }
	            this._data[name] = func;
	        },
	        addMultiple: function(functions) {
	            Object.keys(functions).forEach(
	                function(name) {
	                    this.add(name, functions[name]);
	                }.bind(this));
	        },
	        get: function(name) {
	            return this._data[name] || ( base && base.get( name ));
	        },
	        inherit : function() {
	            return makeRegistry( this );
	        }
	    };
	}

	module.exports = makeRegistry( null );
	},{}],22:[function(require,module,exports){
	module.exports = function(environment) {
	    var functions = {
	        functionRegistry: require("./function-registry"),
	        functionCaller: require("./function-caller")
	    };

	    //register functions
	    require("./default");
	    require("./color");
	    require("./color-blending");
	    require("./data-uri")(environment);
	    require("./math");
	    require("./number");
	    require("./string");
	    require("./svg")(environment);
	    require("./types");

	    return functions;
	};

	},{"./color":17,"./color-blending":16,"./data-uri":18,"./default":19,"./function-caller":20,"./function-registry":21,"./math":24,"./number":25,"./string":26,"./svg":27,"./types":28}],23:[function(require,module,exports){
	var Dimension = require("../tree/dimension");

	var MathHelper = function() {
	};
	MathHelper._math = function (fn, unit, n) {
	    if (!(n instanceof Dimension)) {
	        throw { type: "Argument", message: "argument must be a number" };
	    }
	    if (unit == null) {
	        unit = n.unit;
	    } else {
	        n = n.unify();
	    }
	    return new Dimension(fn(parseFloat(n.value)), unit);
	};
	module.exports = MathHelper;
	},{"../tree/dimension":55}],24:[function(require,module,exports){
	var functionRegistry = require("./function-registry"),
	    mathHelper = require("./math-helper.js");

	var mathFunctions = {
	    // name,  unit
	    ceil:  null,
	    floor: null,
	    sqrt:  null,
	    abs:   null,
	    tan:   "",
	    sin:   "",
	    cos:   "",
	    atan:  "rad",
	    asin:  "rad",
	    acos:  "rad"
	};

	for (var f in mathFunctions) {
	    if (mathFunctions.hasOwnProperty(f)) {
	        mathFunctions[f] = mathHelper._math.bind(null, Math[f], mathFunctions[f]);
	    }
	}

	mathFunctions.round = function (n, f) {
	    var fraction = typeof f === "undefined" ? 0 : f.value;
	    return mathHelper._math(function(num) { return num.toFixed(fraction); }, null, n);
	};

	functionRegistry.addMultiple(mathFunctions);

	},{"./function-registry":21,"./math-helper.js":23}],25:[function(require,module,exports){
	var Dimension = require("../tree/dimension"),
	    Anonymous = require("../tree/anonymous"),
	    functionRegistry = require("./function-registry"),
	    mathHelper = require("./math-helper.js");

	var minMax = function (isMin, args) {
	    args = Array.prototype.slice.call(args);
	    switch(args.length) {
	        case 0: throw { type: "Argument", message: "one or more arguments required" };
	    }
	    var i, j, current, currentUnified, referenceUnified, unit, unitStatic, unitClone,
	        order  = [], // elems only contains original argument values.
	        values = {}; // key is the unit.toString() for unified Dimension values,
	    // value is the index into the order array.
	    for (i = 0; i < args.length; i++) {
	        current = args[i];
	        if (!(current instanceof Dimension)) {
	            if (Array.isArray(args[i].value)) {
	                Array.prototype.push.apply(args, Array.prototype.slice.call(args[i].value));
	            }
	            continue;
	        }
	        currentUnified = current.unit.toString() === "" && unitClone !== undefined ? new Dimension(current.value, unitClone).unify() : current.unify();
	        unit = currentUnified.unit.toString() === "" && unitStatic !== undefined ? unitStatic : currentUnified.unit.toString();
	        unitStatic = unit !== "" && unitStatic === undefined || unit !== "" && order[0].unify().unit.toString() === "" ? unit : unitStatic;
	        unitClone = unit !== "" && unitClone === undefined ? current.unit.toString() : unitClone;
	        j = values[""] !== undefined && unit !== "" && unit === unitStatic ? values[""] : values[unit];
	        if (j === undefined) {
	            if (unitStatic !== undefined && unit !== unitStatic) {
	                throw{ type: "Argument", message: "incompatible types" };
	            }
	            values[unit] = order.length;
	            order.push(current);
	            continue;
	        }
	        referenceUnified = order[j].unit.toString() === "" && unitClone !== undefined ? new Dimension(order[j].value, unitClone).unify() : order[j].unify();
	        if ( isMin && currentUnified.value < referenceUnified.value ||
	            !isMin && currentUnified.value > referenceUnified.value) {
	            order[j] = current;
	        }
	    }
	    if (order.length == 1) {
	        return order[0];
	    }
	    args = order.map(function (a) { return a.toCSS(this.context); }).join(this.context.compress ? "," : ", ");
	    return new Anonymous((isMin ? "min" : "max") + "(" + args + ")");
	};
	functionRegistry.addMultiple({
	    min: function () {
	        return minMax(true, arguments);
	    },
	    max: function () {
	        return minMax(false, arguments);
	    },
	    convert: function (val, unit) {
	        return val.convertTo(unit.value);
	    },
	    pi: function () {
	        return new Dimension(Math.PI);
	    },
	    mod: function(a, b) {
	        return new Dimension(a.value % b.value, a.unit);
	    },
	    pow: function(x, y) {
	        if (typeof x === "number" && typeof y === "number") {
	            x = new Dimension(x);
	            y = new Dimension(y);
	        } else if (!(x instanceof Dimension) || !(y instanceof Dimension)) {
	            throw { type: "Argument", message: "arguments must be numbers" };
	        }

	        return new Dimension(Math.pow(x.value, y.value), x.unit);
	    },
	    percentage: function (n) {
	        var result = mathHelper._math(function(num) {
	            return num * 100;
	        }, '%', n);

	        return result;
	    }
	});

	},{"../tree/anonymous":45,"../tree/dimension":55,"./function-registry":21,"./math-helper.js":23}],26:[function(require,module,exports){
	var Quoted = require("../tree/quoted"),
	    Anonymous = require("../tree/anonymous"),
	    JavaScript = require("../tree/javascript"),
	    functionRegistry = require("./function-registry");

	functionRegistry.addMultiple({
	    e: function (str) {
	        return new Anonymous(str instanceof JavaScript ? str.evaluated : str.value);
	    },
	    escape: function (str) {
	        return new Anonymous(
	            encodeURI(str.value).replace(/=/g, "%3D").replace(/:/g, "%3A").replace(/#/g, "%23").replace(/;/g, "%3B")
	                .replace(/\(/g, "%28").replace(/\)/g, "%29"));
	    },
	    replace: function (string, pattern, replacement, flags) {
	        var result = string.value;
	        replacement = (replacement.type === "Quoted") ?
	            replacement.value : replacement.toCSS();
	        result = result.replace(new RegExp(pattern.value, flags ? flags.value : ''), replacement);
	        return new Quoted(string.quote || '', result, string.escaped);
	    },
	    '%': function (string /* arg, arg, ...*/) {
	        var args = Array.prototype.slice.call(arguments, 1),
	            result = string.value;

	        for (var i = 0; i < args.length; i++) {
	            /*jshint loopfunc:true */
	            result = result.replace(/%[sda]/i, function(token) {
	                var value = ((args[i].type === "Quoted") &&
	                    token.match(/s/i)) ? args[i].value : args[i].toCSS();
	                return token.match(/[A-Z]$/) ? encodeURIComponent(value) : value;
	            });
	        }
	        result = result.replace(/%%/g, '%');
	        return new Quoted(string.quote || '', result, string.escaped);
	    }
	});

	},{"../tree/anonymous":45,"../tree/javascript":62,"../tree/quoted":72,"./function-registry":21}],27:[function(require,module,exports){
	module.exports = function(environment) {
	    var Dimension = require("../tree/dimension"),
	        Color = require("../tree/color"),
	        Expression = require("../tree/expression"),
	        Quoted = require("../tree/quoted"),
	        URL = require("../tree/url"),
	        functionRegistry = require("./function-registry");

	    functionRegistry.add("svg-gradient", function(direction) {

	        var stops,
	            gradientDirectionSvg,
	            gradientType = "linear",
	            rectangleDimension = 'x="0" y="0" width="1" height="1"',
	            renderEnv = {compress: false},
	            returner,
	            directionValue = direction.toCSS(renderEnv),
				i, color, position, positionValue, alpha;

	        function throwArgumentDescriptor() {
	            throw { type: "Argument",
						message: "svg-gradient expects direction, start_color [start_position], [color position,]...," +
								" end_color [end_position] or direction, color list" };
	        }

	        if (arguments.length == 2) {
	            if (arguments[1].value.length < 2) {
	                throwArgumentDescriptor();
	            }
	            stops = arguments[1].value;
	        } else if (arguments.length < 3) {
	            throwArgumentDescriptor();
	        } else {
	            stops = Array.prototype.slice.call(arguments, 1);
	        }

	        switch (directionValue) {
	            case "to bottom":
	                gradientDirectionSvg = 'x1="0%" y1="0%" x2="0%" y2="100%"';
	                break;
	            case "to right":
	                gradientDirectionSvg = 'x1="0%" y1="0%" x2="100%" y2="0%"';
	                break;
	            case "to bottom right":
	                gradientDirectionSvg = 'x1="0%" y1="0%" x2="100%" y2="100%"';
	                break;
	            case "to top right":
	                gradientDirectionSvg = 'x1="0%" y1="100%" x2="100%" y2="0%"';
	                break;
	            case "ellipse":
	            case "ellipse at center":
	                gradientType = "radial";
	                gradientDirectionSvg = 'cx="50%" cy="50%" r="75%"';
	                rectangleDimension = 'x="-50" y="-50" width="101" height="101"';
	                break;
	            default:
	                throw { type: "Argument", message: "svg-gradient direction must be 'to bottom', 'to right'," +
	                    " 'to bottom right', 'to top right' or 'ellipse at center'" };
	        }
	        returner = '<?xml version="1.0" ?>' +
	            '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" viewBox="0 0 1 1" preserveAspectRatio="none">' +
	            '<' + gradientType + 'Gradient id="gradient" gradientUnits="userSpaceOnUse" ' + gradientDirectionSvg + '>';

	        for (i = 0; i < stops.length; i+= 1) {
	            if (stops[i] instanceof Expression) {
	                color = stops[i].value[0];
	                position = stops[i].value[1];
	            } else {
	                color = stops[i];
	                position = undefined;
	            }

	            if (!(color instanceof Color) || (!((i === 0 || i + 1 === stops.length) && position === undefined) && !(position instanceof Dimension))) {
	                throwArgumentDescriptor();
	            }
	            positionValue = position ? position.toCSS(renderEnv) : i === 0 ? "0%" : "100%";
	            alpha = color.alpha;
	            returner += '<stop offset="' + positionValue + '" stop-color="' + color.toRGB() + '"' + (alpha < 1 ? ' stop-opacity="' + alpha + '"' : '') + '/>';
	        }
	        returner += '</' + gradientType + 'Gradient>' +
	            '<rect ' + rectangleDimension + ' fill="url(#gradient)" /></svg>';

	        returner = encodeURIComponent(returner);

	        returner = "data:image/svg+xml," + returner;
	        return new URL(new Quoted("'" + returner + "'", returner, false, this.index, this.currentFileInfo), this.index, this.currentFileInfo);
	    });
	};

	},{"../tree/color":49,"../tree/dimension":55,"../tree/expression":58,"../tree/quoted":72,"../tree/url":79,"./function-registry":21}],28:[function(require,module,exports){
	var Keyword = require("../tree/keyword"),
	    DetachedRuleset = require("../tree/detached-ruleset"),
	    Dimension = require("../tree/dimension"),
	    Color = require("../tree/color"),
	    Quoted = require("../tree/quoted"),
	    Anonymous = require("../tree/anonymous"),
	    URL = require("../tree/url"),
	    Operation = require("../tree/operation"),
	    functionRegistry = require("./function-registry");

	var isa = function (n, Type) {
	        return (n instanceof Type) ? Keyword.True : Keyword.False;
	    },
	    isunit = function (n, unit) {
	        if (unit === undefined) {
	            throw { type: "Argument", message: "missing the required second argument to isunit." };
	        }
	        unit = typeof unit.value === "string" ? unit.value : unit;
	        if (typeof unit !== "string") {
	            throw { type: "Argument", message: "Second argument to isunit should be a unit or a string." };
	        }
	        return (n instanceof Dimension) && n.unit.is(unit) ? Keyword.True : Keyword.False;
	    },
	    getItemsFromNode = function(node) {
	        // handle non-array values as an array of length 1
	        // return 'undefined' if index is invalid
	        var items = Array.isArray(node.value) ?
	            node.value : Array(node);

	        return items;
	    };
	functionRegistry.addMultiple({
	    isruleset: function (n) {
	        return isa(n, DetachedRuleset);
	    },
	    iscolor: function (n) {
	        return isa(n, Color);
	    },
	    isnumber: function (n) {
	        return isa(n, Dimension);
	    },
	    isstring: function (n) {
	        return isa(n, Quoted);
	    },
	    iskeyword: function (n) {
	        return isa(n, Keyword);
	    },
	    isurl: function (n) {
	        return isa(n, URL);
	    },
	    ispixel: function (n) {
	        return isunit(n, 'px');
	    },
	    ispercentage: function (n) {
	        return isunit(n, '%');
	    },
	    isem: function (n) {
	        return isunit(n, 'em');
	    },
	    isunit: isunit,
	    unit: function (val, unit) {
	        if (!(val instanceof Dimension)) {
	            throw { type: "Argument",
	                message: "the first argument to unit must be a number" +
	                    (val instanceof Operation ? ". Have you forgotten parenthesis?" : "") };
	        }
	        if (unit) {
	            if (unit instanceof Keyword) {
	                unit = unit.value;
	            } else {
	                unit = unit.toCSS();
	            }
	        } else {
	            unit = "";
	        }
	        return new Dimension(val.value, unit);
	    },
	    "get-unit": function (n) {
	        return new Anonymous(n.unit);
	    },
	    extract: function(values, index) {
	        index = index.value - 1; // (1-based index)

	        return getItemsFromNode(values)[index];
	    },
	    length: function(values) {
	        return new Dimension(getItemsFromNode(values).length);
	    }
	});

	},{"../tree/anonymous":45,"../tree/color":49,"../tree/detached-ruleset":54,"../tree/dimension":55,"../tree/keyword":64,"../tree/operation":70,"../tree/quoted":72,"../tree/url":79,"./function-registry":21}],29:[function(require,module,exports){
	var contexts = require("./contexts"),
	    Parser = require('./parser/parser'),
	    FunctionImporter = require('./plugins/function-importer');

	module.exports = function(environment) {

	    // FileInfo = {
	    //  'relativeUrls' - option - whether to adjust URL's to be relative
	    //  'filename' - full resolved filename of current file
	    //  'rootpath' - path to append to normal URLs for this node
	    //  'currentDirectory' - path to the current file, absolute
	    //  'rootFilename' - filename of the base file
	    //  'entryPath' - absolute path to the entry file
	    //  'reference' - whether the file should not be output and only output parts that are referenced

	    var ImportManager = function(context, rootFileInfo) {
	        this.rootFilename = rootFileInfo.filename;
	        this.paths = context.paths || [];  // Search paths, when importing
	        this.contents = {};             // map - filename to contents of all the files
	        this.contentsIgnoredChars = {}; // map - filename to lines at the beginning of each file to ignore
	        this.mime = context.mime;
	        this.error = null;
	        this.context = context;
	        // Deprecated? Unused outside of here, could be useful.
	        this.queue = [];        // Files which haven't been imported yet
	        this.files = {};        // Holds the imported parse trees.
	    };
	    /**
	     * Add an import to be imported
	     * @param path - the raw path
	     * @param tryAppendLessExtension - whether to try appending the less extension (if the path has no extension)
	     * @param currentFileInfo - the current file info (used for instance to work out relative paths)
	     * @param importOptions - import options
	     * @param callback - callback for when it is imported
	     */
	    ImportManager.prototype.push = function (path, tryAppendLessExtension, currentFileInfo, importOptions, callback) {
	        var importManager = this;
	        this.queue.push(path);

	        var fileParsedFunc = function (e, root, fullPath) {
	            importManager.queue.splice(importManager.queue.indexOf(path), 1); // Remove the path from the queue

	            var importedEqualsRoot = fullPath === importManager.rootFilename;
	            if (importOptions.optional && e) {
	                callback(null, {rules:[]}, false, null);
	            }
	            else {
	                importManager.files[fullPath] = root;
	                if (e && !importManager.error) { importManager.error = e; }
	                callback(e, root, importedEqualsRoot, fullPath);
	            }
	        };

	        var newFileInfo = {
	            relativeUrls: this.context.relativeUrls,
	            entryPath: currentFileInfo.entryPath,
	            rootpath: currentFileInfo.rootpath,
	            rootFilename: currentFileInfo.rootFilename
	        };

	        var fileManager = environment.getFileManager(path, currentFileInfo.currentDirectory, this.context, environment);

	        if (!fileManager) {
	            fileParsedFunc({ message: "Could not find a file-manager for " + path });
	            return;
	        }

	        if (tryAppendLessExtension) {
	            path = fileManager.tryAppendExtension(path, importOptions.plugin ? ".js" : ".less");
	        }

	        var loadFileCallback = function(loadedFile) {
	            var resolvedFilename = loadedFile.filename,
	                contents = loadedFile.contents.replace(/^\uFEFF/, '');

	            // Pass on an updated rootpath if path of imported file is relative and file
	            // is in a (sub|sup) directory
	            //
	            // Examples:
	            // - If path of imported file is 'module/nav/nav.less' and rootpath is 'less/',
	            //   then rootpath should become 'less/module/nav/'
	            // - If path of imported file is '../mixins.less' and rootpath is 'less/',
	            //   then rootpath should become 'less/../'
	            newFileInfo.currentDirectory = fileManager.getPath(resolvedFilename);
	            if (newFileInfo.relativeUrls) {
	                newFileInfo.rootpath = fileManager.join(
	                    (importManager.context.rootpath || ""),
	                    fileManager.pathDiff(newFileInfo.currentDirectory, newFileInfo.entryPath));

	                if (!fileManager.isPathAbsolute(newFileInfo.rootpath) && fileManager.alwaysMakePathsAbsolute()) {
	                    newFileInfo.rootpath = fileManager.join(newFileInfo.entryPath, newFileInfo.rootpath);
	                }
	            }
	            newFileInfo.filename = resolvedFilename;

	            var newEnv = new contexts.Parse(importManager.context);

	            newEnv.processImports = false;
	            importManager.contents[resolvedFilename] = contents;

	            if (currentFileInfo.reference || importOptions.reference) {
	                newFileInfo.reference = true;
	            }

	            if (importOptions.plugin) {
	                new FunctionImporter(newEnv, newFileInfo).eval(contents, function (e, root) {
	                    fileParsedFunc(e, root, resolvedFilename);
	                });
	            } else if (importOptions.inline) {
	                fileParsedFunc(null, contents, resolvedFilename);
	            } else {
	                new Parser(newEnv, importManager, newFileInfo).parse(contents, function (e, root) {
	                    fileParsedFunc(e, root, resolvedFilename);
	                });
	            }
	        };

	        var promise = fileManager.loadFile(path, currentFileInfo.currentDirectory, this.context, environment,
	            function(err, loadedFile) {
	            if (err) {
	                fileParsedFunc(err);
	            } else {
	                loadFileCallback(loadedFile);
	            }
	        });
	        if (promise) {
	            promise.then(loadFileCallback, fileParsedFunc);
	        }
	    };
	    return ImportManager;
	};

	},{"./contexts":10,"./parser/parser":37,"./plugins/function-importer":39}],30:[function(require,module,exports){
	module.exports = function(environment, fileManagers) {
	    var SourceMapOutput, SourceMapBuilder, ParseTree, ImportManager, Environment;

	    var less = {
	        version: [2, 5, 3],
	        data: require('./data'),
	        tree: require('./tree'),
	        Environment: (Environment = require("./environment/environment")),
	        AbstractFileManager: require("./environment/abstract-file-manager"),
	        environment: (environment = new Environment(environment, fileManagers)),
	        visitors: require('./visitors'),
	        Parser: require('./parser/parser'),
	        functions: require('./functions')(environment),
	        contexts: require("./contexts"),
	        SourceMapOutput: (SourceMapOutput = require('./source-map-output')(environment)),
	        SourceMapBuilder: (SourceMapBuilder = require('./source-map-builder')(SourceMapOutput, environment)),
	        ParseTree: (ParseTree = require('./parse-tree')(SourceMapBuilder)),
	        ImportManager: (ImportManager = require('./import-manager')(environment)),
	        render: require("./render")(environment, ParseTree, ImportManager),
	        parse: require("./parse")(environment, ParseTree, ImportManager),
	        LessError: require('./less-error'),
	        transformTree: require('./transform-tree'),
	        utils: require('./utils'),
	        PluginManager: require('./plugin-manager'),
	        logger: require('./logger')
	    };

	    return less;
	};

	},{"./contexts":10,"./data":12,"./environment/abstract-file-manager":14,"./environment/environment":15,"./functions":22,"./import-manager":29,"./less-error":31,"./logger":32,"./parse":34,"./parse-tree":33,"./parser/parser":37,"./plugin-manager":38,"./render":40,"./source-map-builder":41,"./source-map-output":42,"./transform-tree":43,"./tree":61,"./utils":82,"./visitors":86}],31:[function(require,module,exports){
	var utils = require("./utils");

	var LessError = module.exports = function LessError(e, importManager, currentFilename) {

	    Error.call(this);

	    var filename = e.filename || currentFilename;

	    if (importManager && filename) {
	        var input = importManager.contents[filename],
	            loc = utils.getLocation(e.index, input),
	            line = loc.line,
	            col  = loc.column,
	            callLine = e.call && utils.getLocation(e.call, input).line,
	            lines = input.split('\n');

	        this.type = e.type || 'Syntax';
	        this.filename = filename;
	        this.index = e.index;
	        this.line = typeof line === 'number' ? line + 1 : null;
	        this.callLine = callLine + 1;
	        this.callExtract = lines[callLine];
	        this.column = col;
	        this.extract = [
	            lines[line - 1],
	            lines[line],
	            lines[line + 1]
	        ];
	    }
	    this.message = e.message;
	    this.stack = e.stack;
	};

	if (typeof Object.create === 'undefined') {
	    var F = function () {};
	    F.prototype = Error.prototype;
	    LessError.prototype = new F();
	} else {
	    LessError.prototype = Object.create(Error.prototype);
	}

	LessError.prototype.constructor = LessError;

	},{"./utils":82}],32:[function(require,module,exports){
	module.exports = {
	    error: function(msg) {
	        this._fireEvent("error", msg);
	    },
	    warn: function(msg) {
	        this._fireEvent("warn", msg);
	    },
	    info: function(msg) {
	        this._fireEvent("info", msg);
	    },
	    debug: function(msg) {
	        this._fireEvent("debug", msg);
	    },
	    addListener: function(listener) {
	        this._listeners.push(listener);
	    },
	    removeListener: function(listener) {
	        for (var i = 0; i < this._listeners.length; i++) {
	            if (this._listeners[i] === listener) {
	                this._listeners.splice(i, 1);
	                return;
	            }
	        }
	    },
	    _fireEvent: function(type, msg) {
	        for (var i = 0; i < this._listeners.length; i++) {
	            var logFunction = this._listeners[i][type];
	            if (logFunction) {
	                logFunction(msg);
	            }
	        }
	    },
	    _listeners: []
	};

	},{}],33:[function(require,module,exports){
	var LessError = require('./less-error'),
	    transformTree = require("./transform-tree"),
	    logger = require("./logger");

	module.exports = function(SourceMapBuilder) {
	    var ParseTree = function(root, imports) {
	        this.root = root;
	        this.imports = imports;
	    };

	    ParseTree.prototype.toCSS = function(options) {
	        var evaldRoot, result = {}, sourceMapBuilder;
	        try {
	            evaldRoot = transformTree(this.root, options);
	        } catch (e) {
	            throw new LessError(e, this.imports);
	        }

	        try {
	            var compress = Boolean(options.compress);
	            if (compress) {
	                logger.warn("The compress option has been deprecated. We recommend you use a dedicated css minifier, for instance see less-plugin-clean-css.");
	            }

	            var toCSSOptions = {
	                compress: compress,
	                dumpLineNumbers: options.dumpLineNumbers,
	                strictUnits: Boolean(options.strictUnits),
	                numPrecision: 8};

	            if (options.sourceMap) {
	                sourceMapBuilder = new SourceMapBuilder(options.sourceMap);
	                result.css = sourceMapBuilder.toCSS(evaldRoot, toCSSOptions, this.imports);
	            } else {
	                result.css = evaldRoot.toCSS(toCSSOptions);
	            }
	        } catch (e) {
	            throw new LessError(e, this.imports);
	        }

	        if (options.pluginManager) {
	            var postProcessors = options.pluginManager.getPostProcessors();
	            for (var i = 0; i < postProcessors.length; i++) {
	                result.css = postProcessors[i].process(result.css, { sourceMap: sourceMapBuilder, options: options, imports: this.imports });
	            }
	        }
	        if (options.sourceMap) {
	            result.map = sourceMapBuilder.getExternalSourceMap();
	        }

	        result.imports = [];
	        for (var file in this.imports.files) {
	            if (this.imports.files.hasOwnProperty(file) && file !== this.imports.rootFilename) {
	                result.imports.push(file);
	            }
	        }
	        return result;
	    };
	    return ParseTree;
	};

	},{"./less-error":31,"./logger":32,"./transform-tree":43}],34:[function(require,module,exports){
	var PromiseConstructor,
	    contexts = require("./contexts"),
	    Parser = require('./parser/parser'),
	    PluginManager = require('./plugin-manager');

	module.exports = function(environment, ParseTree, ImportManager) {
	    var parse = function (input, options, callback) {
	        options = options || {};

	        if (typeof options === 'function') {
	            callback = options;
	            options = {};
	        }

	        if (!callback) {
	            if (!PromiseConstructor) {
	                PromiseConstructor = typeof Promise === 'undefined' ? require('promise') : Promise;
	            }
	            var self = this;
	            return new PromiseConstructor(function (resolve, reject) {
	                parse.call(self, input, options, function(err, output) {
	                    if (err) {
	                        reject(err);
	                    } else {
	                        resolve(output);
	                    }
	                });
	            });
	        } else {
	            var context,
	                rootFileInfo,
	                pluginManager = new PluginManager(this);

	            pluginManager.addPlugins(options.plugins);
	            options.pluginManager = pluginManager;

	            context = new contexts.Parse(options);

	            if (options.rootFileInfo) {
	                rootFileInfo = options.rootFileInfo;
	            } else {
	                var filename = options.filename || "input";
	                var entryPath = filename.replace(/[^\/\\]*$/, "");
	                rootFileInfo = {
	                    filename: filename,
	                    relativeUrls: context.relativeUrls,
	                    rootpath: context.rootpath || "",
	                    currentDirectory: entryPath,
	                    entryPath: entryPath,
	                    rootFilename: filename
	                };
	                // add in a missing trailing slash
	                if (rootFileInfo.rootpath && rootFileInfo.rootpath.slice(-1) !== "/") {
	                    rootFileInfo.rootpath += "/";
	                }
	            }

	            var imports = new ImportManager(context, rootFileInfo);

	            new Parser(context, imports, rootFileInfo)
	                .parse(input, function (e, root) {
	                if (e) { return callback(e); }
	                callback(null, root, imports, options);
	            }, options);
	        }
	    };
	    return parse;
	};

	},{"./contexts":10,"./parser/parser":37,"./plugin-manager":38,"promise":undefined}],35:[function(require,module,exports){
	// Split the input into chunks.
	module.exports = function (input, fail) {
	    var len = input.length, level = 0, parenLevel = 0,
	        lastOpening, lastOpeningParen, lastMultiComment, lastMultiCommentEndBrace,
	        chunks = [], emitFrom = 0,
	        chunkerCurrentIndex, currentChunkStartIndex, cc, cc2, matched;

	    function emitChunk(force) {
	        var len = chunkerCurrentIndex - emitFrom;
	        if (((len < 512) && !force) || !len) {
	            return;
	        }
	        chunks.push(input.slice(emitFrom, chunkerCurrentIndex + 1));
	        emitFrom = chunkerCurrentIndex + 1;
	    }

	    for (chunkerCurrentIndex = 0; chunkerCurrentIndex < len; chunkerCurrentIndex++) {
	        cc = input.charCodeAt(chunkerCurrentIndex);
	        if (((cc >= 97) && (cc <= 122)) || (cc < 34)) {
	            // a-z or whitespace
	            continue;
	        }

	        switch (cc) {
	            case 40:                        // (
	                parenLevel++;
	                lastOpeningParen = chunkerCurrentIndex;
	                continue;
	            case 41:                        // )
	                if (--parenLevel < 0) {
	                    return fail("missing opening `(`", chunkerCurrentIndex);
	                }
	                continue;
	            case 59:                        // ;
	                if (!parenLevel) { emitChunk(); }
	                continue;
	            case 123:                       // {
	                level++;
	                lastOpening = chunkerCurrentIndex;
	                continue;
	            case 125:                       // }
	                if (--level < 0) {
	                    return fail("missing opening `{`", chunkerCurrentIndex);
	                }
	                if (!level && !parenLevel) { emitChunk(); }
	                continue;
	            case 92:                        // \
	                if (chunkerCurrentIndex < len - 1) { chunkerCurrentIndex++; continue; }
	                return fail("unescaped `\\`", chunkerCurrentIndex);
	            case 34:
	            case 39:
	            case 96:                        // ", ' and `
	                matched = 0;
	                currentChunkStartIndex = chunkerCurrentIndex;
	                for (chunkerCurrentIndex = chunkerCurrentIndex + 1; chunkerCurrentIndex < len; chunkerCurrentIndex++) {
	                    cc2 = input.charCodeAt(chunkerCurrentIndex);
	                    if (cc2 > 96) { continue; }
	                    if (cc2 == cc) { matched = 1; break; }
	                    if (cc2 == 92) {        // \
	                        if (chunkerCurrentIndex == len - 1) {
	                            return fail("unescaped `\\`", chunkerCurrentIndex);
	                        }
	                        chunkerCurrentIndex++;
	                    }
	                }
	                if (matched) { continue; }
	                return fail("unmatched `" + String.fromCharCode(cc) + "`", currentChunkStartIndex);
	            case 47:                        // /, check for comment
	                if (parenLevel || (chunkerCurrentIndex == len - 1)) { continue; }
	                cc2 = input.charCodeAt(chunkerCurrentIndex + 1);
	                if (cc2 == 47) {
	                    // //, find lnfeed
	                    for (chunkerCurrentIndex = chunkerCurrentIndex + 2; chunkerCurrentIndex < len; chunkerCurrentIndex++) {
	                        cc2 = input.charCodeAt(chunkerCurrentIndex);
	                        if ((cc2 <= 13) && ((cc2 == 10) || (cc2 == 13))) { break; }
	                    }
	                } else if (cc2 == 42) {
	                    // /*, find */
	                    lastMultiComment = currentChunkStartIndex = chunkerCurrentIndex;
	                    for (chunkerCurrentIndex = chunkerCurrentIndex + 2; chunkerCurrentIndex < len - 1; chunkerCurrentIndex++) {
	                        cc2 = input.charCodeAt(chunkerCurrentIndex);
	                        if (cc2 == 125) { lastMultiCommentEndBrace = chunkerCurrentIndex; }
	                        if (cc2 != 42) { continue; }
	                        if (input.charCodeAt(chunkerCurrentIndex + 1) == 47) { break; }
	                    }
	                    if (chunkerCurrentIndex == len - 1) {
	                        return fail("missing closing `*/`", currentChunkStartIndex);
	                    }
	                    chunkerCurrentIndex++;
	                }
	                continue;
	            case 42:                       // *, check for unmatched */
	                if ((chunkerCurrentIndex < len - 1) && (input.charCodeAt(chunkerCurrentIndex + 1) == 47)) {
	                    return fail("unmatched `/*`", chunkerCurrentIndex);
	                }
	                continue;
	        }
	    }

	    if (level !== 0) {
	        if ((lastMultiComment > lastOpening) && (lastMultiCommentEndBrace > lastMultiComment)) {
	            return fail("missing closing `}` or `*/`", lastOpening);
	        } else {
	            return fail("missing closing `}`", lastOpening);
	        }
	    } else if (parenLevel !== 0) {
	        return fail("missing closing `)`", lastOpeningParen);
	    }

	    emitChunk(true);
	    return chunks;
	};

	},{}],36:[function(require,module,exports){
	var chunker = require('./chunker');

	module.exports = function() {
	    var input,       // LeSS input string
	        j,           // current chunk
	        saveStack = [],   // holds state for backtracking
	        furthest,    // furthest index the parser has gone to
	        furthestPossibleErrorMessage,// if this is furthest we got to, this is the probably cause
	        chunks,      // chunkified input
	        current,     // current chunk
	        currentPos,  // index of current chunk, in `input`
	        parserInput = {};

	    parserInput.save = function() {
	        currentPos = parserInput.i;
	        saveStack.push( { current: current, i: parserInput.i, j: j });
	    };
	    parserInput.restore = function(possibleErrorMessage) {

	        if (parserInput.i > furthest || (parserInput.i === furthest && possibleErrorMessage && !furthestPossibleErrorMessage)) {
	            furthest = parserInput.i;
	            furthestPossibleErrorMessage = possibleErrorMessage;
	        }
	        var state = saveStack.pop();
	        current = state.current;
	        currentPos = parserInput.i = state.i;
	        j = state.j;
	    };
	    parserInput.forget = function() {
	        saveStack.pop();
	    };
	    parserInput.isWhitespace = function (offset) {
	        var pos = parserInput.i + (offset || 0),
	            code = input.charCodeAt(pos);
	        return (code === CHARCODE_SPACE || code === CHARCODE_CR || code === CHARCODE_TAB || code === CHARCODE_LF);
	    };

	    // Specialization of $(tok)
	    parserInput.$re = function(tok) {
	        if (parserInput.i > currentPos) {
	            current = current.slice(parserInput.i - currentPos);
	            currentPos = parserInput.i;
	        }

	        var m = tok.exec(current);
	        if (!m) {
	            return null;
	        }

	        skipWhitespace(m[0].length);
	        if (typeof m === "string") {
	            return m;
	        }

	        return m.length === 1 ? m[0] : m;
	    };

	    parserInput.$char = function(tok) {
	        if (input.charAt(parserInput.i) !== tok) {
	            return null;
	        }
	        skipWhitespace(1);
	        return tok;
	    };

	    parserInput.$str = function(tok) {
	        var tokLength = tok.length;

	        // https://jsperf.com/string-startswith/21
	        for (var i = 0; i < tokLength; i++) {
	            if (input.charAt(parserInput.i + i) !== tok.charAt(i)) {
	                return null;
	            }
	        }

	        skipWhitespace(tokLength);
	        return tok;
	    };

	    parserInput.$quoted = function() {

	        var startChar = input.charAt(parserInput.i);
	        if (startChar !== "'" && startChar !== '"') {
	            return;
	        }
	        var length = input.length,
	            currentPosition = parserInput.i;

	        for (var i = 1; i + currentPosition < length; i++) {
	            var nextChar = input.charAt(i + currentPosition);
	            switch(nextChar) {
	                case "\\":
	                    i++;
	                    continue;
	                case "\r":
	                case "\n":
	                    break;
	                case startChar:
	                    var str = input.substr(currentPosition, i + 1);
	                    skipWhitespace(i + 1);
	                    return str;
	                default:
	            }
	        }
	        return null;
	    };

	    var CHARCODE_SPACE = 32,
	        CHARCODE_TAB = 9,
	        CHARCODE_LF = 10,
	        CHARCODE_CR = 13,
	        CHARCODE_PLUS = 43,
	        CHARCODE_COMMA = 44,
	        CHARCODE_FORWARD_SLASH = 47,
	        CHARCODE_9 = 57;

	    parserInput.autoCommentAbsorb = true;
	    parserInput.commentStore = [];
	    parserInput.finished = false;

	    var skipWhitespace = function(length) {
	        var oldi = parserInput.i, oldj = j,
	            curr = parserInput.i - currentPos,
	            endIndex = parserInput.i + current.length - curr,
	            mem = (parserInput.i += length),
	            inp = input,
	            c, nextChar, comment;

	        for (; parserInput.i < endIndex; parserInput.i++) {
	            c = inp.charCodeAt(parserInput.i);

	            if (parserInput.autoCommentAbsorb && c === CHARCODE_FORWARD_SLASH) {
	                nextChar = inp.charAt(parserInput.i + 1);
	                if (nextChar === '/') {
	                    comment = {index: parserInput.i, isLineComment: true};
	                    var nextNewLine = inp.indexOf("\n", parserInput.i + 2);
	                    if (nextNewLine < 0) {
	                        nextNewLine = endIndex;
	                    }
	                    parserInput.i = nextNewLine;
	                    comment.text = inp.substr(comment.i, parserInput.i - comment.i);
	                    parserInput.commentStore.push(comment);
	                    continue;
	                } else if (nextChar === '*') {
	                    var nextStarSlash = inp.indexOf("*/", parserInput.i + 2);
	                    if (nextStarSlash >= 0) {
	                        comment = {
	                            index: parserInput.i,
	                            text: inp.substr(parserInput.i, nextStarSlash + 2 - parserInput.i),
	                            isLineComment: false
	                        };
	                        parserInput.i += comment.text.length - 1;
	                        parserInput.commentStore.push(comment);
	                        continue;
	                    }
	                }
	                break;
	            }

	            if ((c !== CHARCODE_SPACE) && (c !== CHARCODE_LF) && (c !== CHARCODE_TAB) && (c !== CHARCODE_CR)) {
	                break;
	            }
	        }

	        current = current.slice(length + parserInput.i - mem + curr);
	        currentPos = parserInput.i;

	        if (!current.length) {
	            if (j < chunks.length - 1) {
	                current = chunks[++j];
	                skipWhitespace(0); // skip space at the beginning of a chunk
	                return true; // things changed
	            }
	            parserInput.finished = true;
	        }

	        return oldi !== parserInput.i || oldj !== j;
	    };

	    // Same as $(), but don't change the state of the parser,
	    // just return the match.
	    parserInput.peek = function(tok) {
	        if (typeof tok === 'string') {
	            // https://jsperf.com/string-startswith/21
	            for (var i = 0; i < tok.length; i++) {
	                if (input.charAt(parserInput.i + i) !== tok.charAt(i)) {
	                    return false;
	                }
	            }
	            return true;
	        } else {
	            return tok.test(current);
	        }
	    };

	    // Specialization of peek()
	    // TODO remove or change some currentChar calls to peekChar
	    parserInput.peekChar = function(tok) {
	        return input.charAt(parserInput.i) === tok;
	    };

	    parserInput.currentChar = function() {
	        return input.charAt(parserInput.i);
	    };

	    parserInput.getInput = function() {
	        return input;
	    };

	    parserInput.peekNotNumeric = function() {
	        var c = input.charCodeAt(parserInput.i);
	        //Is the first char of the dimension 0-9, '.', '+' or '-'
	        return (c > CHARCODE_9 || c < CHARCODE_PLUS) || c === CHARCODE_FORWARD_SLASH || c === CHARCODE_COMMA;
	    };

	    parserInput.start = function(str, chunkInput, failFunction) {
	        input = str;
	        parserInput.i = j = currentPos = furthest = 0;

	        // chunking apparantly makes things quicker (but my tests indicate
	        // it might actually make things slower in node at least)
	        // and it is a non-perfect parse - it can't recognise
	        // unquoted urls, meaning it can't distinguish comments
	        // meaning comments with quotes or {}() in them get 'counted'
	        // and then lead to parse errors.
	        // In addition if the chunking chunks in the wrong place we might
	        // not be able to parse a parser statement in one go
	        // this is officially deprecated but can be switched on via an option
	        // in the case it causes too much performance issues.
	        if (chunkInput) {
	            chunks = chunker(str, failFunction);
	        } else {
	            chunks = [str];
	        }

	        current = chunks[0];

	        skipWhitespace(0);
	    };

	    parserInput.end = function() {
	        var message,
	            isFinished = parserInput.i >= input.length;

	        if (parserInput.i < furthest) {
	            message = furthestPossibleErrorMessage;
	            parserInput.i = furthest;
	        }
	        return {
	            isFinished: isFinished,
	            furthest: parserInput.i,
	            furthestPossibleErrorMessage: message,
	            furthestReachedEnd: parserInput.i >= input.length - 1,
	            furthestChar: input[parserInput.i]
	        };
	    };

	    return parserInput;
	};

	},{"./chunker":35}],37:[function(require,module,exports){
	var LessError = require('../less-error'),
	    tree = require("../tree"),
	    visitors = require("../visitors"),
	    getParserInput = require("./parser-input"),
	    utils = require("../utils");

	//
	// less.js - parser
	//
	//    A relatively straight-forward predictive parser.
	//    There is no tokenization/lexing stage, the input is parsed
	//    in one sweep.
	//
	//    To make the parser fast enough to run in the browser, several
	//    optimization had to be made:
	//
	//    - Matching and slicing on a huge input is often cause of slowdowns.
	//      The solution is to chunkify the input into smaller strings.
	//      The chunks are stored in the `chunks` var,
	//      `j` holds the current chunk index, and `currentPos` holds
	//      the index of the current chunk in relation to `input`.
	//      This gives us an almost 4x speed-up.
	//
	//    - In many cases, we don't need to match individual tokens;
	//      for example, if a value doesn't hold any variables, operations
	//      or dynamic references, the parser can effectively 'skip' it,
	//      treating it as a literal.
	//      An example would be '1px solid #000' - which evaluates to itself,
	//      we don't need to know what the individual components are.
	//      The drawback, of course is that you don't get the benefits of
	//      syntax-checking on the CSS. This gives us a 50% speed-up in the parser,
	//      and a smaller speed-up in the code-gen.
	//
	//
	//    Token matching is done with the `$` function, which either takes
	//    a terminal string or regexp, or a non-terminal function to call.
	//    It also takes care of moving all the indices forwards.
	//
	//
	var Parser = function Parser(context, imports, fileInfo) {
	    var parsers,
	        parserInput = getParserInput();

	    function expect(arg, msg, index) {
	        // some older browsers return typeof 'function' for RegExp
	        var result = (Object.prototype.toString.call(arg) === '[object Function]') ? arg.call(parsers) : parserInput.$re(arg);
	        if (result) {
	            return result;
	        }
	        error(msg || (typeof arg === 'string' ? "expected '" + arg + "' got '" + parserInput.currentChar() + "'"
	                                               : "unexpected token"));
	    }

	    // Specialization of expect()
	    function expectChar(arg, msg) {
	        if (parserInput.$char(arg)) {
	            return arg;
	        }
	        error(msg || "expected '" + arg + "' got '" + parserInput.currentChar() + "'");
	    }

	    function error(msg, type) {
	        throw new LessError(
	            {
	                index: parserInput.i,
	                filename: fileInfo.filename,
	                type: type || 'Syntax',
	                message: msg
	            },
	            imports
	        );
	    }

	    function getDebugInfo(index) {
	        var filename = fileInfo.filename;

	        return {
	            lineNumber: utils.getLocation(index, parserInput.getInput()).line + 1,
	            fileName: filename
	        };
	    }

	    //
	    // The Parser
	    //
	    return {

	        //
	        // Parse an input string into an abstract syntax tree,
	        // @param str A string containing 'less' markup
	        // @param callback call `callback` when done.
	        // @param [additionalData] An optional map which can contains vars - a map (key, value) of variables to apply
	        //
	        parse: function (str, callback, additionalData) {
	            var root, error = null, globalVars, modifyVars, ignored, preText = "";

	            globalVars = (additionalData && additionalData.globalVars) ? Parser.serializeVars(additionalData.globalVars) + '\n' : '';
	            modifyVars = (additionalData && additionalData.modifyVars) ? '\n' + Parser.serializeVars(additionalData.modifyVars) : '';

	            if (context.pluginManager) {
	                var preProcessors = context.pluginManager.getPreProcessors();
	                for (var i = 0; i < preProcessors.length; i++) {
	                    str = preProcessors[i].process(str, { context: context, imports: imports, fileInfo: fileInfo });
	                }
	            }

	            if (globalVars || (additionalData && additionalData.banner)) {
	                preText = ((additionalData && additionalData.banner) ? additionalData.banner : "") + globalVars;
	                ignored = imports.contentsIgnoredChars;
	                ignored[fileInfo.filename] = ignored[fileInfo.filename] || 0;
	                ignored[fileInfo.filename] += preText.length;
	            }

	            str = str.replace(/\r\n?/g, '\n');
	            // Remove potential UTF Byte Order Mark
	            str = preText + str.replace(/^\uFEFF/, '') + modifyVars;
	            imports.contents[fileInfo.filename] = str;

	            // Start with the primary rule.
	            // The whole syntax tree is held under a Ruleset node,
	            // with the `root` property set to true, so no `{}` are
	            // output. The callback is called when the input is parsed.
	            try {
	                parserInput.start(str, context.chunkInput, function fail(msg, index) {
	                    throw new LessError({
	                        index: index,
	                        type: 'Parse',
	                        message: msg,
	                        filename: fileInfo.filename
	                    }, imports);
	                });

	                root = new(tree.Ruleset)(null, this.parsers.primary());
	                root.root = true;
	                root.firstRoot = true;
	            } catch (e) {
	                return callback(new LessError(e, imports, fileInfo.filename));
	            }

	            // If `i` is smaller than the `input.length - 1`,
	            // it means the parser wasn't able to parse the whole
	            // string, so we've got a parsing error.
	            //
	            // We try to extract a \n delimited string,
	            // showing the line where the parse error occurred.
	            // We split it up into two parts (the part which parsed,
	            // and the part which didn't), so we can color them differently.
	            var endInfo = parserInput.end();
	            if (!endInfo.isFinished) {

	                var message = endInfo.furthestPossibleErrorMessage;

	                if (!message) {
	                    message = "Unrecognised input";
	                    if (endInfo.furthestChar === '}') {
	                        message += ". Possibly missing opening '{'";
	                    } else if (endInfo.furthestChar === ')') {
	                        message += ". Possibly missing opening '('";
	                    } else if (endInfo.furthestReachedEnd) {
	                        message += ". Possibly missing something";
	                    }
	                }

	                error = new LessError({
	                    type: "Parse",
	                    message: message,
	                    index: endInfo.furthest,
	                    filename: fileInfo.filename
	                }, imports);
	            }

	            var finish = function (e) {
	                e = error || e || imports.error;

	                if (e) {
	                    if (!(e instanceof LessError)) {
	                        e = new LessError(e, imports, fileInfo.filename);
	                    }

	                    return callback(e);
	                }
	                else {
	                    return callback(null, root);
	                }
	            };

	            if (context.processImports !== false) {
	                new visitors.ImportVisitor(imports, finish)
	                    .run(root);
	            } else {
	                return finish();
	            }
	        },

	        //
	        // Here in, the parsing rules/functions
	        //
	        // The basic structure of the syntax tree generated is as follows:
	        //
	        //   Ruleset ->  Rule -> Value -> Expression -> Entity
	        //
	        // Here's some Less code:
	        //
	        //    .class {
	        //      color: #fff;
	        //      border: 1px solid #000;
	        //      width: @w + 4px;
	        //      > .child {...}
	        //    }
	        //
	        // And here's what the parse tree might look like:
	        //
	        //     Ruleset (Selector '.class', [
	        //         Rule ("color",  Value ([Expression [Color #fff]]))
	        //         Rule ("border", Value ([Expression [Dimension 1px][Keyword "solid"][Color #000]]))
	        //         Rule ("width",  Value ([Expression [Operation " + " [Variable "@w"][Dimension 4px]]]))
	        //         Ruleset (Selector [Element '>', '.child'], [...])
	        //     ])
	        //
	        //  In general, most rules will try to parse a token with the `$re()` function, and if the return
	        //  value is truly, will return a new node, of the relevant type. Sometimes, we need to check
	        //  first, before parsing, that's when we use `peek()`.
	        //
	        parsers: parsers = {
	            //
	            // The `primary` rule is the *entry* and *exit* point of the parser.
	            // The rules here can appear at any level of the parse tree.
	            //
	            // The recursive nature of the grammar is an interplay between the `block`
	            // rule, which represents `{ ... }`, the `ruleset` rule, and this `primary` rule,
	            // as represented by this simplified grammar:
	            //
	            //     primary  →  (ruleset | rule)+
	            //     ruleset  →  selector+ block
	            //     block    →  '{' primary '}'
	            //
	            // Only at one point is the primary rule not called from the
	            // block rule: at the root level.
	            //
	            primary: function () {
	                var mixin = this.mixin, root = [], node;

	                while (true) {
	                    while (true) {
	                        node = this.comment();
	                        if (!node) { break; }
	                        root.push(node);
	                    }
	                    // always process comments before deciding if finished
	                    if (parserInput.finished) {
	                        break;
	                    }
	                    if (parserInput.peek('}')) {
	                        break;
	                    }

	                    node = this.extendRule();
	                    if (node) {
	                        root = root.concat(node);
	                        continue;
	                    }

	                    node = mixin.definition() || this.rule() || this.ruleset() ||
	                        mixin.call() || this.rulesetCall() || this.directive();
	                    if (node) {
	                        root.push(node);
	                    } else {
	                        var foundSemiColon = false;
	                        while (parserInput.$char(";")) {
	                            foundSemiColon = true;
	                        }
	                        if (!foundSemiColon) {
	                            break;
	                        }
	                    }
	                }

	                return root;
	            },

	            // comments are collected by the main parsing mechanism and then assigned to nodes
	            // where the current structure allows it
	            comment: function () {
	                if (parserInput.commentStore.length) {
	                    var comment = parserInput.commentStore.shift();
	                    return new(tree.Comment)(comment.text, comment.isLineComment, comment.index, fileInfo);
	                }
	            },

	            //
	            // Entities are tokens which can be found inside an Expression
	            //
	            entities: {
	                //
	                // A string, which supports escaping " and '
	                //
	                //     "milky way" 'he\'s the one!'
	                //
	                quoted: function () {
	                    var str, index = parserInput.i, isEscaped = false;

	                    parserInput.save();
	                    if (parserInput.$char("~")) {
	                        isEscaped = true;
	                    }
	                    str = parserInput.$quoted();
	                    if (!str) {
	                        parserInput.restore();
	                        return;
	                    }
	                    parserInput.forget();

	                    return new(tree.Quoted)(str.charAt(0), str.substr(1, str.length - 2), isEscaped, index, fileInfo);
	                },

	                //
	                // A catch-all word, such as:
	                //
	                //     black border-collapse
	                //
	                keyword: function () {
	                    var k = parserInput.$char("%") || parserInput.$re(/^[_A-Za-z-][_A-Za-z0-9-]*/);
	                    if (k) {
	                        return tree.Color.fromKeyword(k) || new(tree.Keyword)(k);
	                    }
	                },

	                //
	                // A function call
	                //
	                //     rgb(255, 0, 255)
	                //
	                // We also try to catch IE's `alpha()`, but let the `alpha` parser
	                // deal with the details.
	                //
	                // The arguments are parsed with the `entities.arguments` parser.
	                //
	                call: function () {
	                    var name, nameLC, args, alpha, index = parserInput.i;

	                    // http://jsperf.com/case-insensitive-regex-vs-strtolower-then-regex/18
	                    if (parserInput.peek(/^url\(/i)) {
	                        return;
	                    }

	                    parserInput.save();

	                    name = parserInput.$re(/^([\w-]+|%|progid:[\w\.]+)\(/);
	                    if (!name) { parserInput.forget(); return; }

	                    name = name[1];
	                    nameLC = name.toLowerCase();

	                    if (nameLC === 'alpha') {
	                        alpha = parsers.alpha();
	                        if (alpha) {
	                            parserInput.forget();
	                            return alpha;
	                        }
	                    }

	                    args = this.arguments();

	                    if (! parserInput.$char(')')) {
	                        parserInput.restore("Could not parse call arguments or missing ')'");
	                        return;
	                    }

	                    parserInput.forget();
	                    return new(tree.Call)(name, args, index, fileInfo);
	                },
	                arguments: function () {
	                    var args = [], arg;

	                    while (true) {
	                        arg = this.assignment() || parsers.expression();
	                        if (!arg) {
	                            break;
	                        }
	                        args.push(arg);
	                        if (! parserInput.$char(',')) {
	                            break;
	                        }
	                    }
	                    return args;
	                },
	                literal: function () {
	                    return this.dimension() ||
	                           this.color() ||
	                           this.quoted() ||
	                           this.unicodeDescriptor();
	                },

	                // Assignments are argument entities for calls.
	                // They are present in ie filter properties as shown below.
	                //
	                //     filter: progid:DXImageTransform.Microsoft.Alpha( *opacity=50* )
	                //

	                assignment: function () {
	                    var key, value;
	                    parserInput.save();
	                    key = parserInput.$re(/^\w+(?=\s?=)/i);
	                    if (!key) {
	                        parserInput.restore();
	                        return;
	                    }
	                    if (!parserInput.$char('=')) {
	                        parserInput.restore();
	                        return;
	                    }
	                    value = parsers.entity();
	                    if (value) {
	                        parserInput.forget();
	                        return new(tree.Assignment)(key, value);
	                    } else {
	                        parserInput.restore();
	                    }
	                },

	                //
	                // Parse url() tokens
	                //
	                // We use a specific rule for urls, because they don't really behave like
	                // standard function calls. The difference is that the argument doesn't have
	                // to be enclosed within a string, so it can't be parsed as an Expression.
	                //
	                url: function () {
	                    var value, index = parserInput.i;

	                    parserInput.autoCommentAbsorb = false;

	                    if (!parserInput.$str("url(")) {
	                        parserInput.autoCommentAbsorb = true;
	                        return;
	                    }

	                    value = this.quoted() || this.variable() ||
	                            parserInput.$re(/^(?:(?:\\[\(\)'"])|[^\(\)'"])+/) || "";

	                    parserInput.autoCommentAbsorb = true;

	                    expectChar(')');

	                    return new(tree.URL)((value.value != null || value instanceof tree.Variable) ?
	                                        value : new(tree.Anonymous)(value), index, fileInfo);
	                },

	                //
	                // A Variable entity, such as `@fink`, in
	                //
	                //     width: @fink + 2px
	                //
	                // We use a different parser for variable definitions,
	                // see `parsers.variable`.
	                //
	                variable: function () {
	                    var name, index = parserInput.i;

	                    if (parserInput.currentChar() === '@' && (name = parserInput.$re(/^@@?[\w-]+/))) {
	                        return new(tree.Variable)(name, index, fileInfo);
	                    }
	                },

	                // A variable entity useing the protective {} e.g. @{var}
	                variableCurly: function () {
	                    var curly, index = parserInput.i;

	                    if (parserInput.currentChar() === '@' && (curly = parserInput.$re(/^@\{([\w-]+)\}/))) {
	                        return new(tree.Variable)("@" + curly[1], index, fileInfo);
	                    }
	                },

	                //
	                // A Hexadecimal color
	                //
	                //     #4F3C2F
	                //
	                // `rgb` and `hsl` colors are parsed through the `entities.call` parser.
	                //
	                color: function () {
	                    var rgb;

	                    if (parserInput.currentChar() === '#' && (rgb = parserInput.$re(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/))) {
	                        // strip colons, brackets, whitespaces and other characters that should not
	                        // definitely be part of color string
	                        var colorCandidateString = rgb.input.match(/^#([\w]+).*/);
	                        colorCandidateString = colorCandidateString[1];
	                        if (!colorCandidateString.match(/^[A-Fa-f0-9]+$/)) { // verify if candidate consists only of allowed HEX characters
	                            error("Invalid HEX color code");
	                        }
	                        return new(tree.Color)(rgb[1], undefined, '#' + colorCandidateString);
	                    }
	                },

	                //
	                // A Dimension, that is, a number and a unit
	                //
	                //     0.5em 95%
	                //
	                dimension: function () {
	                    if (parserInput.peekNotNumeric()) {
	                        return;
	                    }

	                    var value = parserInput.$re(/^([+-]?\d*\.?\d+)(%|[a-z]+)?/i);
	                    if (value) {
	                        return new(tree.Dimension)(value[1], value[2]);
	                    }
	                },

	                //
	                // A unicode descriptor, as is used in unicode-range
	                //
	                // U+0??  or U+00A1-00A9
	                //
	                unicodeDescriptor: function () {
	                    var ud;

	                    ud = parserInput.$re(/^U\+[0-9a-fA-F?]+(\-[0-9a-fA-F?]+)?/);
	                    if (ud) {
	                        return new(tree.UnicodeDescriptor)(ud[0]);
	                    }
	                },

	                //
	                // JavaScript code to be evaluated
	                //
	                //     `window.location.href`
	                //
	                javascript: function () {
	                    var js, index = parserInput.i;

	                    parserInput.save();

	                    var escape = parserInput.$char("~");
	                    var jsQuote = parserInput.$char("`");

	                    if (!jsQuote) {
	                        parserInput.restore();
	                        return;
	                    }

	                    js = parserInput.$re(/^[^`]*`/);
	                    if (js) {
	                        parserInput.forget();
	                        return new(tree.JavaScript)(js.substr(0, js.length - 1), Boolean(escape), index, fileInfo);
	                    }
	                    parserInput.restore("invalid javascript definition");
	                }
	            },

	            //
	            // The variable part of a variable definition. Used in the `rule` parser
	            //
	            //     @fink:
	            //
	            variable: function () {
	                var name;

	                if (parserInput.currentChar() === '@' && (name = parserInput.$re(/^(@[\w-]+)\s*:/))) { return name[1]; }
	            },

	            //
	            // The variable part of a variable definition. Used in the `rule` parser
	            //
	            //     @fink();
	            //
	            rulesetCall: function () {
	                var name;

	                if (parserInput.currentChar() === '@' && (name = parserInput.$re(/^(@[\w-]+)\s*\(\s*\)\s*;/))) {
	                    return new tree.RulesetCall(name[1]);
	                }
	            },

	            //
	            // extend syntax - used to extend selectors
	            //
	            extend: function(isRule) {
	                var elements, e, index = parserInput.i, option, extendList, extend;

	                if (!parserInput.$str(isRule ? "&:extend(" : ":extend(")) {
	                    return;
	                }

	                do {
	                    option = null;
	                    elements = null;
	                    while (! (option = parserInput.$re(/^(all)(?=\s*(\)|,))/))) {
	                        e = this.element();
	                        if (!e) {
	                            break;
	                        }
	                        if (elements) {
	                            elements.push(e);
	                        } else {
	                            elements = [ e ];
	                        }
	                    }

	                    option = option && option[1];
	                    if (!elements) {
	                        error("Missing target selector for :extend().");
	                    }
	                    extend = new(tree.Extend)(new(tree.Selector)(elements), option, index);
	                    if (extendList) {
	                        extendList.push(extend);
	                    } else {
	                        extendList = [ extend ];
	                    }
	                } while (parserInput.$char(","));

	                expect(/^\)/);

	                if (isRule) {
	                    expect(/^;/);
	                }

	                return extendList;
	            },

	            //
	            // extendRule - used in a rule to extend all the parent selectors
	            //
	            extendRule: function() {
	                return this.extend(true);
	            },

	            //
	            // Mixins
	            //
	            mixin: {
	                //
	                // A Mixin call, with an optional argument list
	                //
	                //     #mixins > .square(#fff);
	                //     .rounded(4px, black);
	                //     .button;
	                //
	                // The `while` loop is there because mixins can be
	                // namespaced, but we only support the child and descendant
	                // selector for now.
	                //
	                call: function () {
	                    var s = parserInput.currentChar(), important = false, index = parserInput.i, elemIndex,
	                        elements, elem, e, c, args;

	                    if (s !== '.' && s !== '#') { return; }

	                    parserInput.save(); // stop us absorbing part of an invalid selector

	                    while (true) {
	                        elemIndex = parserInput.i;
	                        e = parserInput.$re(/^[#.](?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+/);
	                        if (!e) {
	                            break;
	                        }
	                        elem = new(tree.Element)(c, e, elemIndex, fileInfo);
	                        if (elements) {
	                            elements.push(elem);
	                        } else {
	                            elements = [ elem ];
	                        }
	                        c = parserInput.$char('>');
	                    }

	                    if (elements) {
	                        if (parserInput.$char('(')) {
	                            args = this.args(true).args;
	                            expectChar(')');
	                        }

	                        if (parsers.important()) {
	                            important = true;
	                        }

	                        if (parsers.end()) {
	                            parserInput.forget();
	                            return new(tree.mixin.Call)(elements, args, index, fileInfo, important);
	                        }
	                    }

	                    parserInput.restore();
	                },
	                args: function (isCall) {
	                    var entities = parsers.entities,
	                        returner = { args:null, variadic: false },
	                        expressions = [], argsSemiColon = [], argsComma = [],
	                        isSemiColonSeparated, expressionContainsNamed, name, nameLoop,
	                        value, arg, expand;

	                    parserInput.save();

	                    while (true) {
	                        if (isCall) {
	                            arg = parsers.detachedRuleset() || parsers.expression();
	                        } else {
	                            parserInput.commentStore.length = 0;
	                            if (parserInput.$str("...")) {
	                                returner.variadic = true;
	                                if (parserInput.$char(";") && !isSemiColonSeparated) {
	                                    isSemiColonSeparated = true;
	                                }
	                                (isSemiColonSeparated ? argsSemiColon : argsComma)
	                                    .push({ variadic: true });
	                                break;
	                            }
	                            arg = entities.variable() || entities.literal() || entities.keyword();
	                        }

	                        if (!arg) {
	                            break;
	                        }

	                        nameLoop = null;
	                        if (arg.throwAwayComments) {
	                            arg.throwAwayComments();
	                        }
	                        value = arg;
	                        var val = null;

	                        if (isCall) {
	                            // Variable
	                            if (arg.value && arg.value.length == 1) {
	                                val = arg.value[0];
	                            }
	                        } else {
	                            val = arg;
	                        }

	                        if (val && val instanceof tree.Variable) {
	                            if (parserInput.$char(':')) {
	                                if (expressions.length > 0) {
	                                    if (isSemiColonSeparated) {
	                                        error("Cannot mix ; and , as delimiter types");
	                                    }
	                                    expressionContainsNamed = true;
	                                }

	                                value = parsers.detachedRuleset() || parsers.expression();

	                                if (!value) {
	                                    if (isCall) {
	                                        error("could not understand value for named argument");
	                                    } else {
	                                        parserInput.restore();
	                                        returner.args = [];
	                                        return returner;
	                                    }
	                                }
	                                nameLoop = (name = val.name);
	                            } else if (parserInput.$str("...")) {
	                                if (!isCall) {
	                                    returner.variadic = true;
	                                    if (parserInput.$char(";") && !isSemiColonSeparated) {
	                                        isSemiColonSeparated = true;
	                                    }
	                                    (isSemiColonSeparated ? argsSemiColon : argsComma)
	                                        .push({ name: arg.name, variadic: true });
	                                    break;
	                                } else {
	                                    expand = true;
	                                }
	                            } else if (!isCall) {
	                                name = nameLoop = val.name;
	                                value = null;
	                            }
	                        }

	                        if (value) {
	                            expressions.push(value);
	                        }

	                        argsComma.push({ name:nameLoop, value:value, expand:expand });

	                        if (parserInput.$char(',')) {
	                            continue;
	                        }

	                        if (parserInput.$char(';') || isSemiColonSeparated) {

	                            if (expressionContainsNamed) {
	                                error("Cannot mix ; and , as delimiter types");
	                            }

	                            isSemiColonSeparated = true;

	                            if (expressions.length > 1) {
	                                value = new(tree.Value)(expressions);
	                            }
	                            argsSemiColon.push({ name:name, value:value, expand:expand });

	                            name = null;
	                            expressions = [];
	                            expressionContainsNamed = false;
	                        }
	                    }

	                    parserInput.forget();
	                    returner.args = isSemiColonSeparated ? argsSemiColon : argsComma;
	                    return returner;
	                },
	                //
	                // A Mixin definition, with a list of parameters
	                //
	                //     .rounded (@radius: 2px, @color) {
	                //        ...
	                //     }
	                //
	                // Until we have a finer grained state-machine, we have to
	                // do a look-ahead, to make sure we don't have a mixin call.
	                // See the `rule` function for more information.
	                //
	                // We start by matching `.rounded (`, and then proceed on to
	                // the argument list, which has optional default values.
	                // We store the parameters in `params`, with a `value` key,
	                // if there is a value, such as in the case of `@radius`.
	                //
	                // Once we've got our params list, and a closing `)`, we parse
	                // the `{...}` block.
	                //
	                definition: function () {
	                    var name, params = [], match, ruleset, cond, variadic = false;
	                    if ((parserInput.currentChar() !== '.' && parserInput.currentChar() !== '#') ||
	                        parserInput.peek(/^[^{]*\}/)) {
	                        return;
	                    }

	                    parserInput.save();

	                    match = parserInput.$re(/^([#.](?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+)\s*\(/);
	                    if (match) {
	                        name = match[1];

	                        var argInfo = this.args(false);
	                        params = argInfo.args;
	                        variadic = argInfo.variadic;

	                        // .mixincall("@{a}");
	                        // looks a bit like a mixin definition..
	                        // also
	                        // .mixincall(@a: {rule: set;});
	                        // so we have to be nice and restore
	                        if (!parserInput.$char(')')) {
	                            parserInput.restore("Missing closing ')'");
	                            return;
	                        }

	                        parserInput.commentStore.length = 0;

	                        if (parserInput.$str("when")) { // Guard
	                            cond = expect(parsers.conditions, 'expected condition');
	                        }

	                        ruleset = parsers.block();

	                        if (ruleset) {
	                            parserInput.forget();
	                            return new(tree.mixin.Definition)(name, params, ruleset, cond, variadic);
	                        } else {
	                            parserInput.restore();
	                        }
	                    } else {
	                        parserInput.forget();
	                    }
	                }
	            },

	            //
	            // Entities are the smallest recognized token,
	            // and can be found inside a rule's value.
	            //
	            entity: function () {
	                var entities = this.entities;

	                return this.comment() || entities.literal() || entities.variable() || entities.url() ||
	                       entities.call()    || entities.keyword()  || entities.javascript();
	            },

	            //
	            // A Rule terminator. Note that we use `peek()` to check for '}',
	            // because the `block` rule will be expecting it, but we still need to make sure
	            // it's there, if ';' was ommitted.
	            //
	            end: function () {
	                return parserInput.$char(';') || parserInput.peek('}');
	            },

	            //
	            // IE's alpha function
	            //
	            //     alpha(opacity=88)
	            //
	            alpha: function () {
	                var value;

	                // http://jsperf.com/case-insensitive-regex-vs-strtolower-then-regex/18
	                if (! parserInput.$re(/^opacity=/i)) { return; }
	                value = parserInput.$re(/^\d+/);
	                if (!value) {
	                    value = expect(this.entities.variable, "Could not parse alpha");
	                }
	                expectChar(')');
	                return new(tree.Alpha)(value);
	            },

	            //
	            // A Selector Element
	            //
	            //     div
	            //     + h1
	            //     #socks
	            //     input[type="text"]
	            //
	            // Elements are the building blocks for Selectors,
	            // they are made out of a `Combinator` (see combinator rule),
	            // and an element name, such as a tag a class, or `*`.
	            //
	            element: function () {
	                var e, c, v, index = parserInput.i;

	                c = this.combinator();

	                e = parserInput.$re(/^(?:\d+\.\d+|\d+)%/) ||
	                    parserInput.$re(/^(?:[.#]?|:*)(?:[\w-]|[^\x00-\x9f]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+/) ||
	                    parserInput.$char('*') || parserInput.$char('&') || this.attribute() ||
	                    parserInput.$re(/^\([^&()@]+\)/) ||  parserInput.$re(/^[\.#:](?=@)/) ||
	                    this.entities.variableCurly();

	                if (! e) {
	                    parserInput.save();
	                    if (parserInput.$char('(')) {
	                        if ((v = this.selector()) && parserInput.$char(')')) {
	                            e = new(tree.Paren)(v);
	                            parserInput.forget();
	                        } else {
	                            parserInput.restore("Missing closing ')'");
	                        }
	                    } else {
	                        parserInput.forget();
	                    }
	                }

	                if (e) { return new(tree.Element)(c, e, index, fileInfo); }
	            },

	            //
	            // Combinators combine elements together, in a Selector.
	            //
	            // Because our parser isn't white-space sensitive, special care
	            // has to be taken, when parsing the descendant combinator, ` `,
	            // as it's an empty space. We have to check the previous character
	            // in the input, to see if it's a ` ` character. More info on how
	            // we deal with this in *combinator.js*.
	            //
	            combinator: function () {
	                var c = parserInput.currentChar();

	                if (c === '/') {
	                    parserInput.save();
	                    var slashedCombinator = parserInput.$re(/^\/[a-z]+\//i);
	                    if (slashedCombinator) {
	                        parserInput.forget();
	                        return new(tree.Combinator)(slashedCombinator);
	                    }
	                    parserInput.restore();
	                }

	                if (c === '>' || c === '+' || c === '~' || c === '|' || c === '^') {
	                    parserInput.i++;
	                    if (c === '^' && parserInput.currentChar() === '^') {
	                        c = '^^';
	                        parserInput.i++;
	                    }
	                    while (parserInput.isWhitespace()) { parserInput.i++; }
	                    return new(tree.Combinator)(c);
	                } else if (parserInput.isWhitespace(-1)) {
	                    return new(tree.Combinator)(" ");
	                } else {
	                    return new(tree.Combinator)(null);
	                }
	            },
	            //
	            // A CSS selector (see selector below)
	            // with less extensions e.g. the ability to extend and guard
	            //
	            lessSelector: function () {
	                return this.selector(true);
	            },
	            //
	            // A CSS Selector
	            //
	            //     .class > div + h1
	            //     li a:hover
	            //
	            // Selectors are made out of one or more Elements, see above.
	            //
	            selector: function (isLess) {
	                var index = parserInput.i, elements, extendList, c, e, allExtends, when, condition;

	                while ((isLess && (extendList = this.extend())) || (isLess && (when = parserInput.$str("when"))) || (e = this.element())) {
	                    if (when) {
	                        condition = expect(this.conditions, 'expected condition');
	                    } else if (condition) {
	                        error("CSS guard can only be used at the end of selector");
	                    } else if (extendList) {
	                        if (allExtends) {
	                            allExtends = allExtends.concat(extendList);
	                        } else {
	                            allExtends = extendList;
	                        }
	                    } else {
	                        if (allExtends) { error("Extend can only be used at the end of selector"); }
	                        c = parserInput.currentChar();
	                        if (elements) {
	                            elements.push(e);
	                        } else {
	                            elements = [ e ];
	                        }
	                        e = null;
	                    }
	                    if (c === '{' || c === '}' || c === ';' || c === ',' || c === ')') {
	                        break;
	                    }
	                }

	                if (elements) { return new(tree.Selector)(elements, allExtends, condition, index, fileInfo); }
	                if (allExtends) { error("Extend must be used to extend a selector, it cannot be used on its own"); }
	            },
	            attribute: function () {
	                if (! parserInput.$char('[')) { return; }

	                var entities = this.entities,
	                    key, val, op;

	                if (!(key = entities.variableCurly())) {
	                    key = expect(/^(?:[_A-Za-z0-9-\*]*\|)?(?:[_A-Za-z0-9-]|\\.)+/);
	                }

	                op = parserInput.$re(/^[|~*$^]?=/);
	                if (op) {
	                    val = entities.quoted() || parserInput.$re(/^[0-9]+%/) || parserInput.$re(/^[\w-]+/) || entities.variableCurly();
	                }

	                expectChar(']');

	                return new(tree.Attribute)(key, op, val);
	            },

	            //
	            // The `block` rule is used by `ruleset` and `mixin.definition`.
	            // It's a wrapper around the `primary` rule, with added `{}`.
	            //
	            block: function () {
	                var content;
	                if (parserInput.$char('{') && (content = this.primary()) && parserInput.$char('}')) {
	                    return content;
	                }
	            },

	            blockRuleset: function() {
	                var block = this.block();

	                if (block) {
	                    block = new tree.Ruleset(null, block);
	                }
	                return block;
	            },

	            detachedRuleset: function() {
	                var blockRuleset = this.blockRuleset();
	                if (blockRuleset) {
	                    return new tree.DetachedRuleset(blockRuleset);
	                }
	            },

	            //
	            // div, .class, body > p {...}
	            //
	            ruleset: function () {
	                var selectors, s, rules, debugInfo;

	                parserInput.save();

	                if (context.dumpLineNumbers) {
	                    debugInfo = getDebugInfo(parserInput.i);
	                }

	                while (true) {
	                    s = this.lessSelector();
	                    if (!s) {
	                        break;
	                    }
	                    if (selectors) {
	                        selectors.push(s);
	                    } else {
	                        selectors = [ s ];
	                    }
	                    parserInput.commentStore.length = 0;
	                    if (s.condition && selectors.length > 1) {
	                        error("Guards are only currently allowed on a single selector.");
	                    }
	                    if (! parserInput.$char(',')) { break; }
	                    if (s.condition) {
	                        error("Guards are only currently allowed on a single selector.");
	                    }
	                    parserInput.commentStore.length = 0;
	                }

	                if (selectors && (rules = this.block())) {
	                    parserInput.forget();
	                    var ruleset = new(tree.Ruleset)(selectors, rules, context.strictImports);
	                    if (context.dumpLineNumbers) {
	                        ruleset.debugInfo = debugInfo;
	                    }
	                    return ruleset;
	                } else {
	                    parserInput.restore();
	                }
	            },
	            rule: function (tryAnonymous) {
	                var name, value, startOfRule = parserInput.i, c = parserInput.currentChar(), important, merge, isVariable;

	                if (c === '.' || c === '#' || c === '&' || c === ':') { return; }

	                parserInput.save();

	                name = this.variable() || this.ruleProperty();
	                if (name) {
	                    isVariable = typeof name === "string";

	                    if (isVariable) {
	                        value = this.detachedRuleset();
	                    }

	                    parserInput.commentStore.length = 0;
	                    if (!value) {
	                        // a name returned by this.ruleProperty() is always an array of the form:
	                        // [string-1, ..., string-n, ""] or [string-1, ..., string-n, "+"]
	                        // where each item is a tree.Keyword or tree.Variable
	                        merge = !isVariable && name.length > 1 && name.pop().value;

	                        // prefer to try to parse first if its a variable or we are compressing
	                        // but always fallback on the other one
	                        var tryValueFirst = !tryAnonymous && (context.compress || isVariable);

	                        if (tryValueFirst) {
	                            value = this.value();
	                        }
	                        if (!value) {
	                            value = this.anonymousValue();
	                            if (value) {
	                                parserInput.forget();
	                                // anonymous values absorb the end ';' which is required for them to work
	                                return new (tree.Rule)(name, value, false, merge, startOfRule, fileInfo);
	                            }
	                        }
	                        if (!tryValueFirst && !value) {
	                            value = this.value();
	                        }

	                        important = this.important();
	                    }

	                    if (value && this.end()) {
	                        parserInput.forget();
	                        return new (tree.Rule)(name, value, important, merge, startOfRule, fileInfo);
	                    } else {
	                        parserInput.restore();
	                        if (value && !tryAnonymous) {
	                            return this.rule(true);
	                        }
	                    }
	                } else {
	                    parserInput.forget();
	                }
	            },
	            anonymousValue: function () {
	                var match = parserInput.$re(/^([^@+\/'"*`(;{}-]*);/);
	                if (match) {
	                    return new(tree.Anonymous)(match[1]);
	                }
	            },

	            //
	            // An @import directive
	            //
	            //     @import "lib";
	            //
	            // Depending on our environment, importing is done differently:
	            // In the browser, it's an XHR request, in Node, it would be a
	            // file-system operation. The function used for importing is
	            // stored in `import`, which we pass to the Import constructor.
	            //
	            "import": function () {
	                var path, features, index = parserInput.i;

	                var dir = parserInput.$re(/^@import?\s+/);

	                if (dir) {
	                    var options = (dir ? this.importOptions() : null) || {};

	                    if ((path = this.entities.quoted() || this.entities.url())) {
	                        features = this.mediaFeatures();

	                        if (!parserInput.$char(';')) {
	                            parserInput.i = index;
	                            error("missing semi-colon or unrecognised media features on import");
	                        }
	                        features = features && new(tree.Value)(features);
	                        return new(tree.Import)(path, features, options, index, fileInfo);
	                    }
	                    else {
	                        parserInput.i = index;
	                        error("malformed import statement");
	                    }
	                }
	            },

	            importOptions: function() {
	                var o, options = {}, optionName, value;

	                // list of options, surrounded by parens
	                if (! parserInput.$char('(')) { return null; }
	                do {
	                    o = this.importOption();
	                    if (o) {
	                        optionName = o;
	                        value = true;
	                        switch(optionName) {
	                            case "css":
	                                optionName = "less";
	                                value = false;
	                                break;
	                            case "once":
	                                optionName = "multiple";
	                                value = false;
	                                break;
	                        }
	                        options[optionName] = value;
	                        if (! parserInput.$char(',')) { break; }
	                    }
	                } while (o);
	                expectChar(')');
	                return options;
	            },

	            importOption: function() {
	                var opt = parserInput.$re(/^(less|css|multiple|once|inline|reference|optional)/);
	                if (opt) {
	                    return opt[1];
	                }
	            },

	            mediaFeature: function () {
	                var entities = this.entities, nodes = [], e, p;
	                parserInput.save();
	                do {
	                    e = entities.keyword() || entities.variable();
	                    if (e) {
	                        nodes.push(e);
	                    } else if (parserInput.$char('(')) {
	                        p = this.property();
	                        e = this.value();
	                        if (parserInput.$char(')')) {
	                            if (p && e) {
	                                nodes.push(new(tree.Paren)(new(tree.Rule)(p, e, null, null, parserInput.i, fileInfo, true)));
	                            } else if (e) {
	                                nodes.push(new(tree.Paren)(e));
	                            } else {
	                                parserInput.restore("badly formed media feature definition");
	                                return null;
	                            }
	                        } else {
	                            parserInput.restore("Missing closing ')'");
	                            return null;
	                        }
	                    }
	                } while (e);

	                parserInput.forget();
	                if (nodes.length > 0) {
	                    return new(tree.Expression)(nodes);
	                }
	            },

	            mediaFeatures: function () {
	                var entities = this.entities, features = [], e;
	                do {
	                    e = this.mediaFeature();
	                    if (e) {
	                        features.push(e);
	                        if (! parserInput.$char(',')) { break; }
	                    } else {
	                        e = entities.variable();
	                        if (e) {
	                            features.push(e);
	                            if (! parserInput.$char(',')) { break; }
	                        }
	                    }
	                } while (e);

	                return features.length > 0 ? features : null;
	            },

	            media: function () {
	                var features, rules, media, debugInfo;

	                if (context.dumpLineNumbers) {
	                    debugInfo = getDebugInfo(parserInput.i);
	                }

	                parserInput.save();

	                if (parserInput.$str("@media")) {
	                    features = this.mediaFeatures();

	                    rules = this.block();

	                    if (!rules) {
	                        parserInput.restore("media definitions require block statements after any features");
	                        return;
	                    }

	                    parserInput.forget();

	                    media = new(tree.Media)(rules, features, parserInput.i, fileInfo);
	                    if (context.dumpLineNumbers) {
	                        media.debugInfo = debugInfo;
	                    }

	                    return media;
	                }

	                parserInput.restore();
	            },

	            //
	            // A @plugin directive, used to import compiler extensions dynamically.
	            //
	            //     @plugin "lib";
	            //
	            // Depending on our environment, importing is done differently:
	            // In the browser, it's an XHR request, in Node, it would be a
	            // file-system operation. The function used for importing is
	            // stored in `import`, which we pass to the Import constructor.
	            //
	            plugin: function () {
	                var path,
	                    index = parserInput.i,
	                    dir   = parserInput.$re(/^@plugin?\s+/);

	                if (dir) {
	                    var options = { plugin : true };

	                    if ((path = this.entities.quoted() || this.entities.url())) {

	                        if (!parserInput.$char(';')) {
	                            parserInput.i = index;
	                            error("missing semi-colon on plugin");
	                        }

	                        return new(tree.Import)(path, null, options, index, fileInfo);
	                    }
	                    else {
	                        parserInput.i = index;
	                        error("malformed plugin statement");
	                    }
	                }
	            },

	            //
	            // A CSS Directive
	            //
	            //     @charset "utf-8";
	            //
	            directive: function () {
	                var index = parserInput.i, name, value, rules, nonVendorSpecificName,
	                    hasIdentifier, hasExpression, hasUnknown, hasBlock = true, isRooted = true;

	                if (parserInput.currentChar() !== '@') { return; }

	                value = this['import']() || this.plugin() || this.media();
	                if (value) {
	                    return value;
	                }

	                parserInput.save();

	                name = parserInput.$re(/^@[a-z-]+/);

	                if (!name) { return; }

	                nonVendorSpecificName = name;
	                if (name.charAt(1) == '-' && name.indexOf('-', 2) > 0) {
	                    nonVendorSpecificName = "@" + name.slice(name.indexOf('-', 2) + 1);
	                }

	                switch(nonVendorSpecificName) {
	                    /*
	                    case "@font-face":
	                    case "@viewport":
	                    case "@top-left":
	                    case "@top-left-corner":
	                    case "@top-center":
	                    case "@top-right":
	                    case "@top-right-corner":
	                    case "@bottom-left":
	                    case "@bottom-left-corner":
	                    case "@bottom-center":
	                    case "@bottom-right":
	                    case "@bottom-right-corner":
	                    case "@left-top":
	                    case "@left-middle":
	                    case "@left-bottom":
	                    case "@right-top":
	                    case "@right-middle":
	                    case "@right-bottom":
	                        hasBlock = true;
	                        isRooted = true;
	                        break;
	                    */
	                    case "@counter-style":
	                        hasIdentifier = true;
	                        hasBlock = true;
	                        break;
	                    case "@charset":
	                        hasIdentifier = true;
	                        hasBlock = false;
	                        break;
	                    case "@namespace":
	                        hasExpression = true;
	                        hasBlock = false;
	                        break;
	                    case "@keyframes":
	                        hasIdentifier = true;
	                        break;
	                    case "@host":
	                    case "@page":
	                        hasUnknown = true;
	                        break;
	                    case "@document":
	                    case "@supports":
	                        hasUnknown = true;
	                        isRooted = false;
	                        break;
	                }

	                parserInput.commentStore.length = 0;

	                if (hasIdentifier) {
	                    value = this.entity();
	                    if (!value) {
	                        error("expected " + name + " identifier");
	                    }
	                } else if (hasExpression) {
	                    value = this.expression();
	                    if (!value) {
	                        error("expected " + name + " expression");
	                    }
	                } else if (hasUnknown) {
	                    value = (parserInput.$re(/^[^{;]+/) || '').trim();
	                    if (value) {
	                        value = new(tree.Anonymous)(value);
	                    }
	                }

	                if (hasBlock) {
	                    rules = this.blockRuleset();
	                }

	                if (rules || (!hasBlock && value && parserInput.$char(';'))) {
	                    parserInput.forget();
	                    return new (tree.Directive)(name, value, rules, index, fileInfo,
	                        context.dumpLineNumbers ? getDebugInfo(index) : null,
	                        false,
	                        isRooted
	                    );
	                }

	                parserInput.restore("directive options not recognised");
	            },

	            //
	            // A Value is a comma-delimited list of Expressions
	            //
	            //     font-family: Baskerville, Georgia, serif;
	            //
	            // In a Rule, a Value represents everything after the `:`,
	            // and before the `;`.
	            //
	            value: function () {
	                var e, expressions = [];

	                do {
	                    e = this.expression();
	                    if (e) {
	                        expressions.push(e);
	                        if (! parserInput.$char(',')) { break; }
	                    }
	                } while (e);

	                if (expressions.length > 0) {
	                    return new(tree.Value)(expressions);
	                }
	            },
	            important: function () {
	                if (parserInput.currentChar() === '!') {
	                    return parserInput.$re(/^! *important/);
	                }
	            },
	            sub: function () {
	                var a, e;

	                parserInput.save();
	                if (parserInput.$char('(')) {
	                    a = this.addition();
	                    if (a && parserInput.$char(')')) {
	                        parserInput.forget();
	                        e = new(tree.Expression)([a]);
	                        e.parens = true;
	                        return e;
	                    }
	                    parserInput.restore("Expected ')'");
	                    return;
	                }
	                parserInput.restore();
	            },
	            multiplication: function () {
	                var m, a, op, operation, isSpaced;
	                m = this.operand();
	                if (m) {
	                    isSpaced = parserInput.isWhitespace(-1);
	                    while (true) {
	                        if (parserInput.peek(/^\/[*\/]/)) {
	                            break;
	                        }

	                        parserInput.save();

	                        op = parserInput.$char('/') || parserInput.$char('*');

	                        if (!op) { parserInput.forget(); break; }

	                        a = this.operand();

	                        if (!a) { parserInput.restore(); break; }
	                        parserInput.forget();

	                        m.parensInOp = true;
	                        a.parensInOp = true;
	                        operation = new(tree.Operation)(op, [operation || m, a], isSpaced);
	                        isSpaced = parserInput.isWhitespace(-1);
	                    }
	                    return operation || m;
	                }
	            },
	            addition: function () {
	                var m, a, op, operation, isSpaced;
	                m = this.multiplication();
	                if (m) {
	                    isSpaced = parserInput.isWhitespace(-1);
	                    while (true) {
	                        op = parserInput.$re(/^[-+]\s+/) || (!isSpaced && (parserInput.$char('+') || parserInput.$char('-')));
	                        if (!op) {
	                            break;
	                        }
	                        a = this.multiplication();
	                        if (!a) {
	                            break;
	                        }

	                        m.parensInOp = true;
	                        a.parensInOp = true;
	                        operation = new(tree.Operation)(op, [operation || m, a], isSpaced);
	                        isSpaced = parserInput.isWhitespace(-1);
	                    }
	                    return operation || m;
	                }
	            },
	            conditions: function () {
	                var a, b, index = parserInput.i, condition;

	                a = this.condition();
	                if (a) {
	                    while (true) {
	                        if (!parserInput.peek(/^,\s*(not\s*)?\(/) || !parserInput.$char(',')) {
	                            break;
	                        }
	                        b = this.condition();
	                        if (!b) {
	                            break;
	                        }
	                        condition = new(tree.Condition)('or', condition || a, b, index);
	                    }
	                    return condition || a;
	                }
	            },
	            condition: function () {
	                var entities = this.entities, index = parserInput.i, negate = false,
	                    a, b, c, op;

	                if (parserInput.$str("not")) { negate = true; }
	                expectChar('(');
	                a = this.addition() || entities.keyword() || entities.quoted();
	                if (a) {
	                    if (parserInput.$char('>')) {
	                        if (parserInput.$char('=')) {
	                            op = ">=";
	                        } else {
	                            op = '>';
	                        }
	                    } else
	                    if (parserInput.$char('<')) {
	                        if (parserInput.$char('=')) {
	                            op = "<=";
	                        } else {
	                            op = '<';
	                        }
	                    } else
	                    if (parserInput.$char('=')) {
	                        if (parserInput.$char('>')) {
	                            op = "=>";
	                        } else if (parserInput.$char('<')) {
	                            op = '=<';
	                        } else {
	                            op = '=';
	                        }
	                    }
	                    if (op) {
	                        b = this.addition() || entities.keyword() || entities.quoted();
	                        if (b) {
	                            c = new(tree.Condition)(op, a, b, index, negate);
	                        } else {
	                            error('expected expression');
	                        }
	                    } else {
	                        c = new(tree.Condition)('=', a, new(tree.Keyword)('true'), index, negate);
	                    }
	                    expectChar(')');
	                    return parserInput.$str("and") ? new(tree.Condition)('and', c, this.condition()) : c;
	                }
	            },

	            //
	            // An operand is anything that can be part of an operation,
	            // such as a Color, or a Variable
	            //
	            operand: function () {
	                var entities = this.entities, negate;

	                if (parserInput.peek(/^-[@\(]/)) {
	                    negate = parserInput.$char('-');
	                }

	                var o = this.sub() || entities.dimension() ||
	                        entities.color() || entities.variable() ||
	                        entities.call();

	                if (negate) {
	                    o.parensInOp = true;
	                    o = new(tree.Negative)(o);
	                }

	                return o;
	            },

	            //
	            // Expressions either represent mathematical operations,
	            // or white-space delimited Entities.
	            //
	            //     1px solid black
	            //     @var * 2
	            //
	            expression: function () {
	                var entities = [], e, delim;

	                do {
	                    e = this.comment();
	                    if (e) {
	                        entities.push(e);
	                        continue;
	                    }
	                    e = this.addition() || this.entity();
	                    if (e) {
	                        entities.push(e);
	                        // operations do not allow keyword "/" dimension (e.g. small/20px) so we support that here
	                        if (!parserInput.peek(/^\/[\/*]/)) {
	                            delim = parserInput.$char('/');
	                            if (delim) {
	                                entities.push(new(tree.Anonymous)(delim));
	                            }
	                        }
	                    }
	                } while (e);
	                if (entities.length > 0) {
	                    return new(tree.Expression)(entities);
	                }
	            },
	            property: function () {
	                var name = parserInput.$re(/^(\*?-?[_a-zA-Z0-9-]+)\s*:/);
	                if (name) {
	                    return name[1];
	                }
	            },
	            ruleProperty: function () {
	                var name = [], index = [], s, k;

	                parserInput.save();

	                var simpleProperty = parserInput.$re(/^([_a-zA-Z0-9-]+)\s*:/);
	                if (simpleProperty) {
	                    name = [new(tree.Keyword)(simpleProperty[1])];
	                    parserInput.forget();
	                    return name;
	                }

	                function match(re) {
	                    var i = parserInput.i,
	                        chunk = parserInput.$re(re);
	                    if (chunk) {
	                        index.push(i);
	                        return name.push(chunk[1]);
	                    }
	                }

	                match(/^(\*?)/);
	                while (true) {
	                    if (!match(/^((?:[\w-]+)|(?:@\{[\w-]+\}))/)) {
	                        break;
	                    }
	                }

	                if ((name.length > 1) && match(/^((?:\+_|\+)?)\s*:/)) {
	                    parserInput.forget();

	                    // at last, we have the complete match now. move forward,
	                    // convert name particles to tree objects and return:
	                    if (name[0] === '') {
	                        name.shift();
	                        index.shift();
	                    }
	                    for (k = 0; k < name.length; k++) {
	                        s = name[k];
	                        name[k] = (s.charAt(0) !== '@') ?
	                            new(tree.Keyword)(s) :
	                            new(tree.Variable)('@' + s.slice(2, -1),
	                                index[k], fileInfo);
	                    }
	                    return name;
	                }
	                parserInput.restore();
	            }
	        }
	    };
	};
	Parser.serializeVars = function(vars) {
	    var s = '';

	    for (var name in vars) {
	        if (Object.hasOwnProperty.call(vars, name)) {
	            var value = vars[name];
	            s += ((name[0] === '@') ? '' : '@') + name + ': ' + value +
	                ((String(value).slice(-1) === ';') ? '' : ';');
	        }
	    }

	    return s;
	};

	module.exports = Parser;

	},{"../less-error":31,"../tree":61,"../utils":82,"../visitors":86,"./parser-input":36}],38:[function(require,module,exports){
	/**
	 * Plugin Manager
	 */
	var PluginManager = function(less) {
	    this.less = less;
	    this.visitors = [];
	    this.preProcessors = [];
	    this.postProcessors = [];
	    this.installedPlugins = [];
	    this.fileManagers = [];
	};
	/**
	 * Adds all the plugins in the array
	 * @param {Array} plugins
	 */
	PluginManager.prototype.addPlugins = function(plugins) {
	    if (plugins) {
	        for (var i = 0; i < plugins.length; i++) {
	            this.addPlugin(plugins[i]);
	        }
	    }
	};
	/**
	 *
	 * @param plugin
	 */
	PluginManager.prototype.addPlugin = function(plugin) {
	    this.installedPlugins.push(plugin);
	    plugin.install(this.less, this);
	};
	/**
	 * Adds a visitor. The visitor object has options on itself to determine
	 * when it should run.
	 * @param visitor
	 */
	PluginManager.prototype.addVisitor = function(visitor) {
	    this.visitors.push(visitor);
	};
	/**
	 * Adds a pre processor object
	 * @param {object} preProcessor
	 * @param {number} priority - guidelines 1 = before import, 1000 = import, 2000 = after import
	 */
	PluginManager.prototype.addPreProcessor = function(preProcessor, priority) {
	    var indexToInsertAt;
	    for (indexToInsertAt = 0; indexToInsertAt < this.preProcessors.length; indexToInsertAt++) {
	        if (this.preProcessors[indexToInsertAt].priority >= priority) {
	            break;
	        }
	    }
	    this.preProcessors.splice(indexToInsertAt, 0, {preProcessor: preProcessor, priority: priority});
	};
	/**
	 * Adds a post processor object
	 * @param {object} postProcessor
	 * @param {number} priority - guidelines 1 = before compression, 1000 = compression, 2000 = after compression
	 */
	PluginManager.prototype.addPostProcessor = function(postProcessor, priority) {
	    var indexToInsertAt;
	    for (indexToInsertAt = 0; indexToInsertAt < this.postProcessors.length; indexToInsertAt++) {
	        if (this.postProcessors[indexToInsertAt].priority >= priority) {
	            break;
	        }
	    }
	    this.postProcessors.splice(indexToInsertAt, 0, {postProcessor: postProcessor, priority: priority});
	};
	/**
	 *
	 * @param manager
	 */
	PluginManager.prototype.addFileManager = function(manager) {
	    this.fileManagers.push(manager);
	};
	/**
	 *
	 * @returns {Array}
	 * @private
	 */
	PluginManager.prototype.getPreProcessors = function() {
	    var preProcessors = [];
	    for (var i = 0; i < this.preProcessors.length; i++) {
	        preProcessors.push(this.preProcessors[i].preProcessor);
	    }
	    return preProcessors;
	};
	/**
	 *
	 * @returns {Array}
	 * @private
	 */
	PluginManager.prototype.getPostProcessors = function() {
	    var postProcessors = [];
	    for (var i = 0; i < this.postProcessors.length; i++) {
	        postProcessors.push(this.postProcessors[i].postProcessor);
	    }
	    return postProcessors;
	};
	/**
	 *
	 * @returns {Array}
	 * @private
	 */
	PluginManager.prototype.getVisitors = function() {
	    return this.visitors;
	};
	/**
	 *
	 * @returns {Array}
	 * @private
	 */
	PluginManager.prototype.getFileManagers = function() {
	    return this.fileManagers;
	};
	module.exports = PluginManager;

	},{}],39:[function(require,module,exports){
	var LessError = require('../less-error'),
	    tree = require("../tree");

	var FunctionImporter = module.exports = function FunctionImporter(context, fileInfo) {
	    this.fileInfo = fileInfo;
	};

	FunctionImporter.prototype.eval = function(contents, callback) {
	    var loaded = {},
	        loader,
	        registry;

	    registry = {
	        add: function(name, func) {
	            loaded[name] = func;
	        },
	        addMultiple: function(functions) {
	            Object.keys(functions).forEach(function(name) {
	                loaded[name] = functions[name];
	            });
	        }
	    };

	    try {
	        loader = new Function("functions", "tree", "fileInfo", contents);
	        loader(registry, tree, this.fileInfo);
	    } catch(e) {
	        callback(new LessError({
	            message: "Plugin evaluation error: '" + e.name + ': ' + e.message.replace(/["]/g, "'") + "'" ,
	            filename: this.fileInfo.filename
	        }), null );
	    }

	    callback(null, { functions: loaded });
	};

	},{"../less-error":31,"../tree":61}],40:[function(require,module,exports){
	var PromiseConstructor;

	module.exports = function(environment, ParseTree, ImportManager) {
	    var render = function (input, options, callback) {
	        if (typeof options === 'function') {
	            callback = options;
	            options = {};
	        }

	        if (!callback) {
	            if (!PromiseConstructor) {
	                PromiseConstructor = typeof Promise === 'undefined' ? require('promise') : Promise;
	            }
	            var self = this;
	            return new PromiseConstructor(function (resolve, reject) {
	                render.call(self, input, options, function(err, output) {
	                    if (err) {
	                        reject(err);
	                    } else {
	                        resolve(output);
	                    }
	                });
	            });
	        } else {
	            this.parse(input, options, function(err, root, imports, options) {
	                if (err) { return callback(err); }

	                var result;
	                try {
	                    var parseTree = new ParseTree(root, imports);
	                    result = parseTree.toCSS(options);
	                }
	                catch (err) { return callback(err); }

	                callback(null, result);
	            });
	        }
	    };

	    return render;
	};

	},{"promise":undefined}],41:[function(require,module,exports){
	module.exports = function (SourceMapOutput, environment) {

	    var SourceMapBuilder = function (options) {
	        this.options = options;
	    };

	    SourceMapBuilder.prototype.toCSS = function(rootNode, options, imports) {
	        var sourceMapOutput = new SourceMapOutput(
	            {
	                contentsIgnoredCharsMap: imports.contentsIgnoredChars,
	                rootNode: rootNode,
	                contentsMap: imports.contents,
	                sourceMapFilename: this.options.sourceMapFilename,
	                sourceMapURL: this.options.sourceMapURL,
	                outputFilename: this.options.sourceMapOutputFilename,
	                sourceMapBasepath: this.options.sourceMapBasepath,
	                sourceMapRootpath: this.options.sourceMapRootpath,
	                outputSourceFiles: this.options.outputSourceFiles,
	                sourceMapGenerator: this.options.sourceMapGenerator,
	                sourceMapFileInline: this.options.sourceMapFileInline
	            });

	        var css = sourceMapOutput.toCSS(options);
	        this.sourceMap = sourceMapOutput.sourceMap;
	        this.sourceMapURL = sourceMapOutput.sourceMapURL;
	        if (this.options.sourceMapInputFilename) {
	            this.sourceMapInputFilename = sourceMapOutput.normalizeFilename(this.options.sourceMapInputFilename);
	        }
	        return css + this.getCSSAppendage();
	    };

	    SourceMapBuilder.prototype.getCSSAppendage = function() {

	        var sourceMapURL = this.sourceMapURL;
	        if (this.options.sourceMapFileInline) {
	            if (this.sourceMap === undefined) {
	                return "";
	            }
	            sourceMapURL = "data:application/json;base64," + environment.encodeBase64(this.sourceMap);
	        }

	        if (sourceMapURL) {
	            return "/*# sourceMappingURL=" + sourceMapURL + " */";
	        }
	        return "";
	    };

	    SourceMapBuilder.prototype.getExternalSourceMap = function() {
	        return this.sourceMap;
	    };
	    SourceMapBuilder.prototype.setExternalSourceMap = function(sourceMap) {
	        this.sourceMap = sourceMap;
	    };

	    SourceMapBuilder.prototype.isInline = function() {
	        return this.options.sourceMapFileInline;
	    };
	    SourceMapBuilder.prototype.getSourceMapURL = function() {
	        return this.sourceMapURL;
	    };
	    SourceMapBuilder.prototype.getOutputFilename = function() {
	        return this.options.sourceMapOutputFilename;
	    };
	    SourceMapBuilder.prototype.getInputFilename = function() {
	        return this.sourceMapInputFilename;
	    };

	    return SourceMapBuilder;
	};

	},{}],42:[function(require,module,exports){
	module.exports = function (environment) {

	    var SourceMapOutput = function (options) {
	        this._css = [];
	        this._rootNode = options.rootNode;
	        this._contentsMap = options.contentsMap;
	        this._contentsIgnoredCharsMap = options.contentsIgnoredCharsMap;
	        if (options.sourceMapFilename) {
	            this._sourceMapFilename = options.sourceMapFilename.replace(/\\/g, '/');
	        }
	        this._outputFilename = options.outputFilename;
	        this.sourceMapURL = options.sourceMapURL;
	        if (options.sourceMapBasepath) {
	            this._sourceMapBasepath = options.sourceMapBasepath.replace(/\\/g, '/');
	        }
	        if (options.sourceMapRootpath) {
	            this._sourceMapRootpath = options.sourceMapRootpath.replace(/\\/g, '/');
	            if (this._sourceMapRootpath.charAt(this._sourceMapRootpath.length - 1) !== '/') {
	                this._sourceMapRootpath += '/';
	            }
	        } else {
	            this._sourceMapRootpath = "";
	        }
	        this._outputSourceFiles = options.outputSourceFiles;
	        this._sourceMapGeneratorConstructor = environment.getSourceMapGenerator();

	        this._lineNumber = 0;
	        this._column = 0;
	    };

	    SourceMapOutput.prototype.normalizeFilename = function(filename) {
	        filename = filename.replace(/\\/g, '/');

	        if (this._sourceMapBasepath && filename.indexOf(this._sourceMapBasepath) === 0) {
	            filename = filename.substring(this._sourceMapBasepath.length);
	            if (filename.charAt(0) === '\\' || filename.charAt(0) === '/') {
	                filename = filename.substring(1);
	            }
	        }
	        return (this._sourceMapRootpath || "") + filename;
	    };

	    SourceMapOutput.prototype.add = function(chunk, fileInfo, index, mapLines) {

	        //ignore adding empty strings
	        if (!chunk) {
	            return;
	        }

	        var lines,
	            sourceLines,
	            columns,
	            sourceColumns,
	            i;

	        if (fileInfo) {
	            var inputSource = this._contentsMap[fileInfo.filename];

	            // remove vars/banner added to the top of the file
	            if (this._contentsIgnoredCharsMap[fileInfo.filename]) {
	                // adjust the index
	                index -= this._contentsIgnoredCharsMap[fileInfo.filename];
	                if (index < 0) { index = 0; }
	                // adjust the source
	                inputSource = inputSource.slice(this._contentsIgnoredCharsMap[fileInfo.filename]);
	            }
	            inputSource = inputSource.substring(0, index);
	            sourceLines = inputSource.split("\n");
	            sourceColumns = sourceLines[sourceLines.length - 1];
	        }

	        lines = chunk.split("\n");
	        columns = lines[lines.length - 1];

	        if (fileInfo) {
	            if (!mapLines) {
	                this._sourceMapGenerator.addMapping({ generated: { line: this._lineNumber + 1, column: this._column},
	                    original: { line: sourceLines.length, column: sourceColumns.length},
	                    source: this.normalizeFilename(fileInfo.filename)});
	            } else {
	                for (i = 0; i < lines.length; i++) {
	                    this._sourceMapGenerator.addMapping({ generated: { line: this._lineNumber + i + 1, column: i === 0 ? this._column : 0},
	                        original: { line: sourceLines.length + i, column: i === 0 ? sourceColumns.length : 0},
	                        source: this.normalizeFilename(fileInfo.filename)});
	                }
	            }
	        }

	        if (lines.length === 1) {
	            this._column += columns.length;
	        } else {
	            this._lineNumber += lines.length - 1;
	            this._column = columns.length;
	        }

	        this._css.push(chunk);
	    };

	    SourceMapOutput.prototype.isEmpty = function() {
	        return this._css.length === 0;
	    };

	    SourceMapOutput.prototype.toCSS = function(context) {
	        this._sourceMapGenerator = new this._sourceMapGeneratorConstructor({ file: this._outputFilename, sourceRoot: null });

	        if (this._outputSourceFiles) {
	            for (var filename in this._contentsMap) {
	                if (this._contentsMap.hasOwnProperty(filename)) {
	                    var source = this._contentsMap[filename];
	                    if (this._contentsIgnoredCharsMap[filename]) {
	                        source = source.slice(this._contentsIgnoredCharsMap[filename]);
	                    }
	                    this._sourceMapGenerator.setSourceContent(this.normalizeFilename(filename), source);
	                }
	            }
	        }

	        this._rootNode.genCSS(context, this);

	        if (this._css.length > 0) {
	            var sourceMapURL,
	                sourceMapContent = JSON.stringify(this._sourceMapGenerator.toJSON());

	            if (this.sourceMapURL) {
	                sourceMapURL = this.sourceMapURL;
	            } else if (this._sourceMapFilename) {
	                sourceMapURL = this._sourceMapFilename;
	            }
	            this.sourceMapURL = sourceMapURL;

	            this.sourceMap = sourceMapContent;
	        }

	        return this._css.join('');
	    };

	    return SourceMapOutput;
	};

	},{}],43:[function(require,module,exports){
	var contexts = require("./contexts"),
	    visitor = require("./visitors"),
	    tree = require("./tree");

	module.exports = function(root, options) {
	    options = options || {};
	    var evaldRoot,
	        variables = options.variables,
	        evalEnv = new contexts.Eval(options);

	    //
	    // Allows setting variables with a hash, so:
	    //
	    //   `{ color: new tree.Color('#f01') }` will become:
	    //
	    //   new tree.Rule('@color',
	    //     new tree.Value([
	    //       new tree.Expression([
	    //         new tree.Color('#f01')
	    //       ])
	    //     ])
	    //   )
	    //
	    if (typeof variables === 'object' && !Array.isArray(variables)) {
	        variables = Object.keys(variables).map(function (k) {
	            var value = variables[k];

	            if (! (value instanceof tree.Value)) {
	                if (! (value instanceof tree.Expression)) {
	                    value = new tree.Expression([value]);
	                }
	                value = new tree.Value([value]);
	            }
	            return new tree.Rule('@' + k, value, false, null, 0);
	        });
	        evalEnv.frames = [new tree.Ruleset(null, variables)];
	    }

	    var preEvalVisitors = [],
	        visitors = [
	            new visitor.JoinSelectorVisitor(),
	            new visitor.ExtendVisitor(),
	            new visitor.ToCSSVisitor({compress: Boolean(options.compress)})
	        ], i;

	    if (options.pluginManager) {
	        var pluginVisitors = options.pluginManager.getVisitors();
	        for (i = 0; i < pluginVisitors.length; i++) {
	            var pluginVisitor = pluginVisitors[i];
	            if (pluginVisitor.isPreEvalVisitor) {
	                preEvalVisitors.push(pluginVisitor);
	            } else {
	                if (pluginVisitor.isPreVisitor) {
	                    visitors.splice(0, 0, pluginVisitor);
	                } else {
	                    visitors.push(pluginVisitor);
	                }
	            }
	        }
	    }

	    for (i = 0; i < preEvalVisitors.length; i++) {
	        preEvalVisitors[i].run(root);
	    }

	    evaldRoot = root.eval(evalEnv);

	    for (i = 0; i < visitors.length; i++) {
	        visitors[i].run(evaldRoot);
	    }

	    return evaldRoot;
	};

	},{"./contexts":10,"./tree":61,"./visitors":86}],44:[function(require,module,exports){
	var Node = require("./node");

	var Alpha = function (val) {
	    this.value = val;
	};
	Alpha.prototype = new Node();
	Alpha.prototype.type = "Alpha";

	Alpha.prototype.accept = function (visitor) {
	    this.value = visitor.visit(this.value);
	};
	Alpha.prototype.eval = function (context) {
	    if (this.value.eval) { return new Alpha(this.value.eval(context)); }
	    return this;
	};
	Alpha.prototype.genCSS = function (context, output) {
	    output.add("alpha(opacity=");

	    if (this.value.genCSS) {
	        this.value.genCSS(context, output);
	    } else {
	        output.add(this.value);
	    }

	    output.add(")");
	};

	module.exports = Alpha;

	},{"./node":69}],45:[function(require,module,exports){
	var Node = require("./node");

	var Anonymous = function (value, index, currentFileInfo, mapLines, rulesetLike, referenced) {
	    this.value = value;
	    this.index = index;
	    this.mapLines = mapLines;
	    this.currentFileInfo = currentFileInfo;
	    this.rulesetLike = (typeof rulesetLike === 'undefined') ? false : rulesetLike;
	    this.isReferenced = referenced || false;
	};
	Anonymous.prototype = new Node();
	Anonymous.prototype.type = "Anonymous";
	Anonymous.prototype.eval = function () {
	    return new Anonymous(this.value, this.index, this.currentFileInfo, this.mapLines, this.rulesetLike, this.isReferenced);
	};
	Anonymous.prototype.compare = function (other) {
	    return other.toCSS && this.toCSS() === other.toCSS() ? 0 : undefined;
	};
	Anonymous.prototype.isRulesetLike = function() {
	    return this.rulesetLike;
	};
	Anonymous.prototype.genCSS = function (context, output) {
	    output.add(this.value, this.currentFileInfo, this.index, this.mapLines);
	};
	Anonymous.prototype.markReferenced = function () {
	    this.isReferenced = true;
	};
	Anonymous.prototype.getIsReferenced = function () {
	    return !this.currentFileInfo || !this.currentFileInfo.reference || this.isReferenced;
	};

	module.exports = Anonymous;

	},{"./node":69}],46:[function(require,module,exports){
	var Node = require("./node");

	var Assignment = function (key, val) {
	    this.key = key;
	    this.value = val;
	};

	Assignment.prototype = new Node();
	Assignment.prototype.type = "Assignment";
	Assignment.prototype.accept = function (visitor) {
	    this.value = visitor.visit(this.value);
	};
	Assignment.prototype.eval = function (context) {
	    if (this.value.eval) {
	        return new Assignment(this.key, this.value.eval(context));
	    }
	    return this;
	};
	Assignment.prototype.genCSS = function (context, output) {
	    output.add(this.key + '=');
	    if (this.value.genCSS) {
	        this.value.genCSS(context, output);
	    } else {
	        output.add(this.value);
	    }
	};
	module.exports = Assignment;

	},{"./node":69}],47:[function(require,module,exports){
	var Node = require("./node");

	var Attribute = function (key, op, value) {
	    this.key = key;
	    this.op = op;
	    this.value = value;
	};
	Attribute.prototype = new Node();
	Attribute.prototype.type = "Attribute";
	Attribute.prototype.eval = function (context) {
	    return new Attribute(this.key.eval ? this.key.eval(context) : this.key,
	        this.op, (this.value && this.value.eval) ? this.value.eval(context) : this.value);
	};
	Attribute.prototype.genCSS = function (context, output) {
	    output.add(this.toCSS(context));
	};
	Attribute.prototype.toCSS = function (context) {
	    var value = this.key.toCSS ? this.key.toCSS(context) : this.key;

	    if (this.op) {
	        value += this.op;
	        value += (this.value.toCSS ? this.value.toCSS(context) : this.value);
	    }

	    return '[' + value + ']';
	};
	module.exports = Attribute;

	},{"./node":69}],48:[function(require,module,exports){
	var Node = require("./node"),
	    FunctionCaller = require("../functions/function-caller");
	//
	// A function call node.
	//
	var Call = function (name, args, index, currentFileInfo) {
	    this.name = name;
	    this.args = args;
	    this.index = index;
	    this.currentFileInfo = currentFileInfo;
	};
	Call.prototype = new Node();
	Call.prototype.type = "Call";
	Call.prototype.accept = function (visitor) {
	    if (this.args) {
	        this.args = visitor.visitArray(this.args);
	    }
	};
	//
	// When evaluating a function call,
	// we either find the function in the functionRegistry,
	// in which case we call it, passing the  evaluated arguments,
	// if this returns null or we cannot find the function, we
	// simply print it out as it appeared originally [2].
	//
	// The reason why we evaluate the arguments, is in the case where
	// we try to pass a variable to a function, like: `saturate(@color)`.
	// The function should receive the value, not the variable.
	//
	Call.prototype.eval = function (context) {
	    var args = this.args.map(function (a) { return a.eval(context); }),
	        result, funcCaller = new FunctionCaller(this.name, context, this.index, this.currentFileInfo);

	    if (funcCaller.isValid()) { // 1.
	        try {
	            result = funcCaller.call(args);
	            if (result != null) {
	                return result;
	            }
	        } catch (e) {
	            throw { type: e.type || "Runtime",
	                    message: "error evaluating function `" + this.name + "`" +
	                             (e.message ? ': ' + e.message : ''),
	                    index: this.index, filename: this.currentFileInfo.filename };
	        }
	    }

	    return new Call(this.name, args, this.index, this.currentFileInfo);
	};
	Call.prototype.genCSS = function (context, output) {
	    output.add(this.name + "(", this.currentFileInfo, this.index);

	    for (var i = 0; i < this.args.length; i++) {
	        this.args[i].genCSS(context, output);
	        if (i + 1 < this.args.length) {
	            output.add(", ");
	        }
	    }

	    output.add(")");
	};
	module.exports = Call;

	},{"../functions/function-caller":20,"./node":69}],49:[function(require,module,exports){
	var Node = require("./node"),
	    colors = require("../data/colors");

	//
	// RGB Colors - #ff0014, #eee
	//
	var Color = function (rgb, a, originalForm) {
	    //
	    // The end goal here, is to parse the arguments
	    // into an integer triplet, such as `128, 255, 0`
	    //
	    // This facilitates operations and conversions.
	    //
	    if (Array.isArray(rgb)) {
	        this.rgb = rgb;
	    } else if (rgb.length == 6) {
	        this.rgb = rgb.match(/.{2}/g).map(function (c) {
	            return parseInt(c, 16);
	        });
	    } else {
	        this.rgb = rgb.split('').map(function (c) {
	            return parseInt(c + c, 16);
	        });
	    }
	    this.alpha = typeof a === 'number' ? a : 1;
	    if (typeof originalForm !== 'undefined') {
	        this.value = originalForm;
	    }
	};

	Color.prototype = new Node();
	Color.prototype.type = "Color";

	function clamp(v, max) {
	    return Math.min(Math.max(v, 0), max);
	}

	function toHex(v) {
	    return '#' + v.map(function (c) {
	        c = clamp(Math.round(c), 255);
	        return (c < 16 ? '0' : '') + c.toString(16);
	    }).join('');
	}

	Color.prototype.luma = function () {
	    var r = this.rgb[0] / 255,
	        g = this.rgb[1] / 255,
	        b = this.rgb[2] / 255;

	    r = (r <= 0.03928) ? r / 12.92 : Math.pow(((r + 0.055) / 1.055), 2.4);
	    g = (g <= 0.03928) ? g / 12.92 : Math.pow(((g + 0.055) / 1.055), 2.4);
	    b = (b <= 0.03928) ? b / 12.92 : Math.pow(((b + 0.055) / 1.055), 2.4);

	    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
	};
	Color.prototype.genCSS = function (context, output) {
	    output.add(this.toCSS(context));
	};
	Color.prototype.toCSS = function (context, doNotCompress) {
	    var compress = context && context.compress && !doNotCompress, color, alpha;

	    // `value` is set if this color was originally
	    // converted from a named color string so we need
	    // to respect this and try to output named color too.
	    if (this.value) {
	        return this.value;
	    }

	    // If we have some transparency, the only way to represent it
	    // is via `rgba`. Otherwise, we use the hex representation,
	    // which has better compatibility with older browsers.
	    // Values are capped between `0` and `255`, rounded and zero-padded.
	    alpha = this.fround(context, this.alpha);
	    if (alpha < 1) {
	        return "rgba(" + this.rgb.map(function (c) {
	            return clamp(Math.round(c), 255);
	        }).concat(clamp(alpha, 1))
	            .join(',' + (compress ? '' : ' ')) + ")";
	    }

	    color = this.toRGB();

	    if (compress) {
	        var splitcolor = color.split('');

	        // Convert color to short format
	        if (splitcolor[1] === splitcolor[2] && splitcolor[3] === splitcolor[4] && splitcolor[5] === splitcolor[6]) {
	            color = '#' + splitcolor[1] + splitcolor[3] + splitcolor[5];
	        }
	    }

	    return color;
	};

	//
	// Operations have to be done per-channel, if not,
	// channels will spill onto each other. Once we have
	// our result, in the form of an integer triplet,
	// we create a new Color node to hold the result.
	//
	Color.prototype.operate = function (context, op, other) {
	    var rgb = [];
	    var alpha = this.alpha * (1 - other.alpha) + other.alpha;
	    for (var c = 0; c < 3; c++) {
	        rgb[c] = this._operate(context, op, this.rgb[c], other.rgb[c]);
	    }
	    return new Color(rgb, alpha);
	};
	Color.prototype.toRGB = function () {
	    return toHex(this.rgb);
	};
	Color.prototype.toHSL = function () {
	    var r = this.rgb[0] / 255,
	        g = this.rgb[1] / 255,
	        b = this.rgb[2] / 255,
	        a = this.alpha;

	    var max = Math.max(r, g, b), min = Math.min(r, g, b);
	    var h, s, l = (max + min) / 2, d = max - min;

	    if (max === min) {
	        h = s = 0;
	    } else {
	        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

	        switch (max) {
	            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	            case g: h = (b - r) / d + 2;               break;
	            case b: h = (r - g) / d + 4;               break;
	        }
	        h /= 6;
	    }
	    return { h: h * 360, s: s, l: l, a: a };
	};
	//Adapted from http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
	Color.prototype.toHSV = function () {
	    var r = this.rgb[0] / 255,
	        g = this.rgb[1] / 255,
	        b = this.rgb[2] / 255,
	        a = this.alpha;

	    var max = Math.max(r, g, b), min = Math.min(r, g, b);
	    var h, s, v = max;

	    var d = max - min;
	    if (max === 0) {
	        s = 0;
	    } else {
	        s = d / max;
	    }

	    if (max === min) {
	        h = 0;
	    } else {
	        switch(max) {
	            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	            case g: h = (b - r) / d + 2; break;
	            case b: h = (r - g) / d + 4; break;
	        }
	        h /= 6;
	    }
	    return { h: h * 360, s: s, v: v, a: a };
	};
	Color.prototype.toARGB = function () {
	    return toHex([this.alpha * 255].concat(this.rgb));
	};
	Color.prototype.compare = function (x) {
	    return (x.rgb &&
	        x.rgb[0] === this.rgb[0] &&
	        x.rgb[1] === this.rgb[1] &&
	        x.rgb[2] === this.rgb[2] &&
	        x.alpha  === this.alpha) ? 0 : undefined;
	};

	Color.fromKeyword = function(keyword) {
	    var c, key = keyword.toLowerCase();
	    if (colors.hasOwnProperty(key)) {
	        c = new Color(colors[key].slice(1));
	    }
	    else if (key === "transparent") {
	        c = new Color([0, 0, 0], 0);
	    }

	    if (c) {
	        c.value = keyword;
	        return c;
	    }
	};
	module.exports = Color;

	},{"../data/colors":11,"./node":69}],50:[function(require,module,exports){
	var Node = require("./node");

	var Combinator = function (value) {
	    if (value === ' ') {
	        this.value = ' ';
	        this.emptyOrWhitespace = true;
	    } else {
	        this.value = value ? value.trim() : "";
	        this.emptyOrWhitespace = this.value === "";
	    }
	};
	Combinator.prototype = new Node();
	Combinator.prototype.type = "Combinator";
	var _noSpaceCombinators = {
	    '': true,
	    ' ': true,
	    '|': true
	};
	Combinator.prototype.genCSS = function (context, output) {
	    var spaceOrEmpty = (context.compress || _noSpaceCombinators[this.value]) ? '' : ' ';
	    output.add(spaceOrEmpty + this.value + spaceOrEmpty);
	};
	module.exports = Combinator;

	},{"./node":69}],51:[function(require,module,exports){
	var Node = require("./node"),
	    getDebugInfo = require("./debug-info");

	var Comment = function (value, isLineComment, index, currentFileInfo) {
	    this.value = value;
	    this.isLineComment = isLineComment;
	    this.currentFileInfo = currentFileInfo;
	};
	Comment.prototype = new Node();
	Comment.prototype.type = "Comment";
	Comment.prototype.genCSS = function (context, output) {
	    if (this.debugInfo) {
	        output.add(getDebugInfo(context, this), this.currentFileInfo, this.index);
	    }
	    output.add(this.value);
	};
	Comment.prototype.isSilent = function(context) {
	    var isReference = (this.currentFileInfo && this.currentFileInfo.reference && !this.isReferenced),
	        isCompressed = context.compress && this.value[2] !== "!";
	    return this.isLineComment || isReference || isCompressed;
	};
	Comment.prototype.markReferenced = function () {
	    this.isReferenced = true;
	};
	module.exports = Comment;

	},{"./debug-info":53,"./node":69}],52:[function(require,module,exports){
	var Node = require("./node");

	var Condition = function (op, l, r, i, negate) {
	    this.op = op.trim();
	    this.lvalue = l;
	    this.rvalue = r;
	    this.index = i;
	    this.negate = negate;
	};
	Condition.prototype = new Node();
	Condition.prototype.type = "Condition";
	Condition.prototype.accept = function (visitor) {
	    this.lvalue = visitor.visit(this.lvalue);
	    this.rvalue = visitor.visit(this.rvalue);
	};
	Condition.prototype.eval = function (context) {
	    var result = (function (op, a, b) {
	        switch (op) {
	            case 'and': return a && b;
	            case 'or':  return a || b;
	            default:
	                switch (Node.compare(a, b)) {
	                    case -1:
	                        return op === '<' || op === '=<' || op === '<=';
	                    case 0:
	                        return op === '=' || op === '>=' || op === '=<' || op === '<=';
	                    case 1:
	                        return op === '>' || op === '>=';
	                    default:
	                        return false;
	                }
	        }
	    })(this.op, this.lvalue.eval(context), this.rvalue.eval(context));

	    return this.negate ? !result : result;
	};
	module.exports = Condition;

	},{"./node":69}],53:[function(require,module,exports){
	var debugInfo = function(context, ctx, lineSeparator) {
	    var result = "";
	    if (context.dumpLineNumbers && !context.compress) {
	        switch(context.dumpLineNumbers) {
	            case 'comments':
	                result = debugInfo.asComment(ctx);
	                break;
	            case 'mediaquery':
	                result = debugInfo.asMediaQuery(ctx);
	                break;
	            case 'all':
	                result = debugInfo.asComment(ctx) + (lineSeparator || "") + debugInfo.asMediaQuery(ctx);
	                break;
	        }
	    }
	    return result;
	};

	debugInfo.asComment = function(ctx) {
	    return '/* line ' + ctx.debugInfo.lineNumber + ', ' + ctx.debugInfo.fileName + ' */\n';
	};

	debugInfo.asMediaQuery = function(ctx) {
	    var filenameWithProtocol = ctx.debugInfo.fileName;
	    if (!/^[a-z]+:\/\//i.test(filenameWithProtocol)) {
	        filenameWithProtocol = 'file://' + filenameWithProtocol;
	    }
	    return '@media -sass-debug-info{filename{font-family:' +
	        filenameWithProtocol.replace(/([.:\/\\])/g, function (a) {
	            if (a == '\\') {
	                a = '\/';
	            }
	            return '\\' + a;
	        }) +
	        '}line{font-family:\\00003' + ctx.debugInfo.lineNumber + '}}\n';
	};

	module.exports = debugInfo;

	},{}],54:[function(require,module,exports){
	var Node = require("./node"),
	    contexts = require("../contexts");

	var DetachedRuleset = function (ruleset, frames) {
	    this.ruleset = ruleset;
	    this.frames = frames;
	};
	DetachedRuleset.prototype = new Node();
	DetachedRuleset.prototype.type = "DetachedRuleset";
	DetachedRuleset.prototype.evalFirst = true;
	DetachedRuleset.prototype.accept = function (visitor) {
	    this.ruleset = visitor.visit(this.ruleset);
	};
	DetachedRuleset.prototype.eval = function (context) {
	    var frames = this.frames || context.frames.slice(0);
	    return new DetachedRuleset(this.ruleset, frames);
	};
	DetachedRuleset.prototype.callEval = function (context) {
	    return this.ruleset.eval(this.frames ? new contexts.Eval(context, this.frames.concat(context.frames)) : context);
	};
	module.exports = DetachedRuleset;

	},{"../contexts":10,"./node":69}],55:[function(require,module,exports){
	var Node = require("./node"),
	    unitConversions = require("../data/unit-conversions"),
	    Unit = require("./unit"),
	    Color = require("./color");

	//
	// A number with a unit
	//
	var Dimension = function (value, unit) {
	    this.value = parseFloat(value);
	    this.unit = (unit && unit instanceof Unit) ? unit :
	      new Unit(unit ? [unit] : undefined);
	};

	Dimension.prototype = new Node();
	Dimension.prototype.type = "Dimension";
	Dimension.prototype.accept = function (visitor) {
	    this.unit = visitor.visit(this.unit);
	};
	Dimension.prototype.eval = function (context) {
	    return this;
	};
	Dimension.prototype.toColor = function () {
	    return new Color([this.value, this.value, this.value]);
	};
	Dimension.prototype.genCSS = function (context, output) {
	    if ((context && context.strictUnits) && !this.unit.isSingular()) {
	        throw new Error("Multiple units in dimension. Correct the units or use the unit function. Bad unit: " + this.unit.toString());
	    }

	    var value = this.fround(context, this.value),
	        strValue = String(value);

	    if (value !== 0 && value < 0.000001 && value > -0.000001) {
	        // would be output 1e-6 etc.
	        strValue = value.toFixed(20).replace(/0+$/, "");
	    }

	    if (context && context.compress) {
	        // Zero values doesn't need a unit
	        if (value === 0 && this.unit.isLength()) {
	            output.add(strValue);
	            return;
	        }

	        // Float values doesn't need a leading zero
	        if (value > 0 && value < 1) {
	            strValue = (strValue).substr(1);
	        }
	    }

	    output.add(strValue);
	    this.unit.genCSS(context, output);
	};

	// In an operation between two Dimensions,
	// we default to the first Dimension's unit,
	// so `1px + 2` will yield `3px`.
	Dimension.prototype.operate = function (context, op, other) {
	    /*jshint noempty:false */
	    var value = this._operate(context, op, this.value, other.value),
	        unit = this.unit.clone();

	    if (op === '+' || op === '-') {
	        if (unit.numerator.length === 0 && unit.denominator.length === 0) {
	            unit = other.unit.clone();
	            if (this.unit.backupUnit) {
	                unit.backupUnit = this.unit.backupUnit;
	            }
	        } else if (other.unit.numerator.length === 0 && unit.denominator.length === 0) {
	            // do nothing
	        } else {
	            other = other.convertTo(this.unit.usedUnits());

	            if (context.strictUnits && other.unit.toString() !== unit.toString()) {
	                throw new Error("Incompatible units. Change the units or use the unit function. Bad units: '" + unit.toString() +
	                    "' and '" + other.unit.toString() + "'.");
	            }

	            value = this._operate(context, op, this.value, other.value);
	        }
	    } else if (op === '*') {
	        unit.numerator = unit.numerator.concat(other.unit.numerator).sort();
	        unit.denominator = unit.denominator.concat(other.unit.denominator).sort();
	        unit.cancel();
	    } else if (op === '/') {
	        unit.numerator = unit.numerator.concat(other.unit.denominator).sort();
	        unit.denominator = unit.denominator.concat(other.unit.numerator).sort();
	        unit.cancel();
	    }
	    return new Dimension(value, unit);
	};
	Dimension.prototype.compare = function (other) {
	    var a, b;

	    if (!(other instanceof Dimension)) {
	        return undefined;
	    }

	    if (this.unit.isEmpty() || other.unit.isEmpty()) {
	        a = this;
	        b = other;
	    } else {
	        a = this.unify();
	        b = other.unify();
	        if (a.unit.compare(b.unit) !== 0) {
	            return undefined;
	        }
	    }

	    return Node.numericCompare(a.value, b.value);
	};
	Dimension.prototype.unify = function () {
	    return this.convertTo({ length: 'px', duration: 's', angle: 'rad' });
	};
	Dimension.prototype.convertTo = function (conversions) {
	    var value = this.value, unit = this.unit.clone(),
	        i, groupName, group, targetUnit, derivedConversions = {}, applyUnit;

	    if (typeof conversions === 'string') {
	        for (i in unitConversions) {
	            if (unitConversions[i].hasOwnProperty(conversions)) {
	                derivedConversions = {};
	                derivedConversions[i] = conversions;
	            }
	        }
	        conversions = derivedConversions;
	    }
	    applyUnit = function (atomicUnit, denominator) {
	        /* jshint loopfunc:true */
	        if (group.hasOwnProperty(atomicUnit)) {
	            if (denominator) {
	                value = value / (group[atomicUnit] / group[targetUnit]);
	            } else {
	                value = value * (group[atomicUnit] / group[targetUnit]);
	            }

	            return targetUnit;
	        }

	        return atomicUnit;
	    };

	    for (groupName in conversions) {
	        if (conversions.hasOwnProperty(groupName)) {
	            targetUnit = conversions[groupName];
	            group = unitConversions[groupName];

	            unit.map(applyUnit);
	        }
	    }

	    unit.cancel();

	    return new Dimension(value, unit);
	};
	module.exports = Dimension;

	},{"../data/unit-conversions":13,"./color":49,"./node":69,"./unit":78}],56:[function(require,module,exports){
	var Node = require("./node"),
	    Selector = require("./selector"),
	    Ruleset = require("./ruleset");

	var Directive = function (name, value, rules, index, currentFileInfo, debugInfo, isReferenced, isRooted) {
	    var i;

	    this.name  = name;
	    this.value = value;
	    if (rules) {
	        if (Array.isArray(rules)) {
	            this.rules = rules;
	        } else {
	            this.rules = [rules];
	            this.rules[0].selectors = (new Selector([], null, null, this.index, currentFileInfo)).createEmptySelectors();
	        }
	        for (i = 0; i < this.rules.length; i++) {
	            this.rules[i].allowImports = true;
	        }
	    }
	    this.index = index;
	    this.currentFileInfo = currentFileInfo;
	    this.debugInfo = debugInfo;
	    this.isReferenced = isReferenced;
	    this.isRooted = isRooted || false;
	};

	Directive.prototype = new Node();
	Directive.prototype.type = "Directive";
	Directive.prototype.accept = function (visitor) {
	    var value = this.value, rules = this.rules;
	    if (rules) {
	        this.rules = visitor.visitArray(rules);
	    }
	    if (value) {
	        this.value = visitor.visit(value);
	    }
	};
	Directive.prototype.isRulesetLike = function() {
	    return this.rules || !this.isCharset();
	};
	Directive.prototype.isCharset = function() {
	    return "@charset" === this.name;
	};
	Directive.prototype.genCSS = function (context, output) {
	    var value = this.value, rules = this.rules;
	    output.add(this.name, this.currentFileInfo, this.index);
	    if (value) {
	        output.add(' ');
	        value.genCSS(context, output);
	    }
	    if (rules) {
	        this.outputRuleset(context, output, rules);
	    } else {
	        output.add(';');
	    }
	};
	Directive.prototype.eval = function (context) {
	    var mediaPathBackup, mediaBlocksBackup, value = this.value, rules = this.rules;

	    //media stored inside other directive should not bubble over it
	    //backpup media bubbling information
	    mediaPathBackup = context.mediaPath;
	    mediaBlocksBackup = context.mediaBlocks;
	    //deleted media bubbling information
	    context.mediaPath = [];
	    context.mediaBlocks = [];

	    if (value) {
	        value = value.eval(context);
	    }
	    if (rules) {
	        // assuming that there is only one rule at this point - that is how parser constructs the rule
	        rules = [rules[0].eval(context)];
	        rules[0].root = true;
	    }
	    //restore media bubbling information
	    context.mediaPath = mediaPathBackup;
	    context.mediaBlocks = mediaBlocksBackup;

	    return new Directive(this.name, value, rules,
	        this.index, this.currentFileInfo, this.debugInfo, this.isReferenced, this.isRooted);
	};
	Directive.prototype.variable = function (name) {
	    if (this.rules) {
	        // assuming that there is only one rule at this point - that is how parser constructs the rule
	        return Ruleset.prototype.variable.call(this.rules[0], name);
	    }
	};
	Directive.prototype.find = function () {
	    if (this.rules) {
	        // assuming that there is only one rule at this point - that is how parser constructs the rule
	        return Ruleset.prototype.find.apply(this.rules[0], arguments);
	    }
	};
	Directive.prototype.rulesets = function () {
	    if (this.rules) {
	        // assuming that there is only one rule at this point - that is how parser constructs the rule
	        return Ruleset.prototype.rulesets.apply(this.rules[0]);
	    }
	};
	Directive.prototype.markReferenced = function () {
	    var i, rules;
	    this.isReferenced = true;
	    if (this.rules) {
	        rules = this.rules;
	        for (i = 0; i < rules.length; i++) {
	            if (rules[i].markReferenced) {
	                rules[i].markReferenced();
	            }
	        }
	    }
	};
	Directive.prototype.getIsReferenced = function () {
	    return !this.currentFileInfo || !this.currentFileInfo.reference || this.isReferenced;
	};
	Directive.prototype.outputRuleset = function (context, output, rules) {
	    var ruleCnt = rules.length, i;
	    context.tabLevel = (context.tabLevel | 0) + 1;

	    // Compressed
	    if (context.compress) {
	        output.add('{');
	        for (i = 0; i < ruleCnt; i++) {
	            rules[i].genCSS(context, output);
	        }
	        output.add('}');
	        context.tabLevel--;
	        return;
	    }

	    // Non-compressed
	    var tabSetStr = '\n' + Array(context.tabLevel).join("  "), tabRuleStr = tabSetStr + "  ";
	    if (!ruleCnt) {
	        output.add(" {" + tabSetStr + '}');
	    } else {
	        output.add(" {" + tabRuleStr);
	        rules[0].genCSS(context, output);
	        for (i = 1; i < ruleCnt; i++) {
	            output.add(tabRuleStr);
	            rules[i].genCSS(context, output);
	        }
	        output.add(tabSetStr + '}');
	    }

	    context.tabLevel--;
	};
	module.exports = Directive;

	},{"./node":69,"./ruleset":75,"./selector":76}],57:[function(require,module,exports){
	var Node = require("./node"),
	    Paren = require("./paren"),
	    Combinator = require("./combinator");

	var Element = function (combinator, value, index, currentFileInfo) {
	    this.combinator = combinator instanceof Combinator ?
	                      combinator : new Combinator(combinator);

	    if (typeof value === 'string') {
	        this.value = value.trim();
	    } else if (value) {
	        this.value = value;
	    } else {
	        this.value = "";
	    }
	    this.index = index;
	    this.currentFileInfo = currentFileInfo;
	};
	Element.prototype = new Node();
	Element.prototype.type = "Element";
	Element.prototype.accept = function (visitor) {
	    var value = this.value;
	    this.combinator = visitor.visit(this.combinator);
	    if (typeof value === "object") {
	        this.value = visitor.visit(value);
	    }
	};
	Element.prototype.eval = function (context) {
	    return new Element(this.combinator,
	                             this.value.eval ? this.value.eval(context) : this.value,
	                             this.index,
	                             this.currentFileInfo);
	};
	Element.prototype.genCSS = function (context, output) {
	    output.add(this.toCSS(context), this.currentFileInfo, this.index);
	};
	Element.prototype.toCSS = function (context) {
	    context = context || {};
	    var value = this.value, firstSelector = context.firstSelector;
	    if (value instanceof Paren) {
	        // selector in parens should not be affected by outer selector
	        // flags (breaks only interpolated selectors - see #1973)
	        context.firstSelector = true;
	    }
	    value = value.toCSS ? value.toCSS(context) : value;
	    context.firstSelector = firstSelector;
	    if (value === '' && this.combinator.value.charAt(0) === '&') {
	        return '';
	    } else {
	        return this.combinator.toCSS(context) + value;
	    }
	};
	module.exports = Element;

	},{"./combinator":50,"./node":69,"./paren":71}],58:[function(require,module,exports){
	var Node = require("./node"),
	    Paren = require("./paren"),
	    Comment = require("./comment");

	var Expression = function (value) {
	    this.value = value;
	    if (!value) {
	        throw new Error("Expression requires an array parameter");
	    }
	};
	Expression.prototype = new Node();
	Expression.prototype.type = "Expression";
	Expression.prototype.accept = function (visitor) {
	    this.value = visitor.visitArray(this.value);
	};
	Expression.prototype.eval = function (context) {
	    var returnValue,
	        inParenthesis = this.parens && !this.parensInOp,
	        doubleParen = false;
	    if (inParenthesis) {
	        context.inParenthesis();
	    }
	    if (this.value.length > 1) {
	        returnValue = new Expression(this.value.map(function (e) {
	            return e.eval(context);
	        }));
	    } else if (this.value.length === 1) {
	        if (this.value[0].parens && !this.value[0].parensInOp) {
	            doubleParen = true;
	        }
	        returnValue = this.value[0].eval(context);
	    } else {
	        returnValue = this;
	    }
	    if (inParenthesis) {
	        context.outOfParenthesis();
	    }
	    if (this.parens && this.parensInOp && !(context.isMathOn()) && !doubleParen) {
	        returnValue = new Paren(returnValue);
	    }
	    return returnValue;
	};
	Expression.prototype.genCSS = function (context, output) {
	    for (var i = 0; i < this.value.length; i++) {
	        this.value[i].genCSS(context, output);
	        if (i + 1 < this.value.length) {
	            output.add(" ");
	        }
	    }
	};
	Expression.prototype.throwAwayComments = function () {
	    this.value = this.value.filter(function(v) {
	        return !(v instanceof Comment);
	    });
	};
	Expression.prototype.markReferenced = function () {
	    this.value.forEach(function (value) {
	        if (value.markReferenced) { value.markReferenced(); }
	    });
	};
	module.exports = Expression;

	},{"./comment":51,"./node":69,"./paren":71}],59:[function(require,module,exports){
	var Node = require("./node");

	var Extend = function Extend(selector, option, index) {
	    this.selector = selector;
	    this.option = option;
	    this.index = index;
	    this.object_id = Extend.next_id++;
	    this.parent_ids = [this.object_id];

	    switch(option) {
	        case "all":
	            this.allowBefore = true;
	            this.allowAfter = true;
	            break;
	        default:
	            this.allowBefore = false;
	            this.allowAfter = false;
	            break;
	    }
	};
	Extend.next_id = 0;

	Extend.prototype = new Node();
	Extend.prototype.type = "Extend";
	Extend.prototype.accept = function (visitor) {
	    this.selector = visitor.visit(this.selector);
	};
	Extend.prototype.eval = function (context) {
	    return new Extend(this.selector.eval(context), this.option, this.index);
	};
	Extend.prototype.clone = function (context) {
	    return new Extend(this.selector, this.option, this.index);
	};
	Extend.prototype.findSelfSelectors = function (selectors) {
	    var selfElements = [],
	        i,
	        selectorElements;

	    for (i = 0; i < selectors.length; i++) {
	        selectorElements = selectors[i].elements;
	        // duplicate the logic in genCSS function inside the selector node.
	        // future TODO - move both logics into the selector joiner visitor
	        if (i > 0 && selectorElements.length && selectorElements[0].combinator.value === "") {
	            selectorElements[0].combinator.value = ' ';
	        }
	        selfElements = selfElements.concat(selectors[i].elements);
	    }

	    this.selfSelectors = [{ elements: selfElements }];
	};
	module.exports = Extend;

	},{"./node":69}],60:[function(require,module,exports){
	var Node = require("./node"),
	    Media = require("./media"),
	    URL = require("./url"),
	    Quoted = require("./quoted"),
	    Ruleset = require("./ruleset"),
	    Anonymous = require("./anonymous");

	//
	// CSS @import node
	//
	// The general strategy here is that we don't want to wait
	// for the parsing to be completed, before we start importing
	// the file. That's because in the context of a browser,
	// most of the time will be spent waiting for the server to respond.
	//
	// On creation, we push the import path to our import queue, though
	// `import,push`, we also pass it a callback, which it'll call once
	// the file has been fetched, and parsed.
	//
	var Import = function (path, features, options, index, currentFileInfo) {
	    this.options = options;
	    this.index = index;
	    this.path = path;
	    this.features = features;
	    this.currentFileInfo = currentFileInfo;

	    if (this.options.less !== undefined || this.options.inline) {
	        this.css = !this.options.less || this.options.inline;
	    } else {
	        var pathValue = this.getPath();
	        if (pathValue && /[#\.\&\?\/]css([\?;].*)?$/.test(pathValue)) {
	            this.css = true;
	        }
	    }
	};

	//
	// The actual import node doesn't return anything, when converted to CSS.
	// The reason is that it's used at the evaluation stage, so that the rules
	// it imports can be treated like any other rules.
	//
	// In `eval`, we make sure all Import nodes get evaluated, recursively, so
	// we end up with a flat structure, which can easily be imported in the parent
	// ruleset.
	//
	Import.prototype = new Node();
	Import.prototype.type = "Import";
	Import.prototype.accept = function (visitor) {
	    if (this.features) {
	        this.features = visitor.visit(this.features);
	    }
	    this.path = visitor.visit(this.path);
	    if (!this.options.plugin && !this.options.inline && this.root) {
	        this.root = visitor.visit(this.root);
	    }
	};
	Import.prototype.genCSS = function (context, output) {
	    if (this.css && this.path.currentFileInfo.reference === undefined) {
	        output.add("@import ", this.currentFileInfo, this.index);
	        this.path.genCSS(context, output);
	        if (this.features) {
	            output.add(" ");
	            this.features.genCSS(context, output);
	        }
	        output.add(';');
	    }
	};
	Import.prototype.getPath = function () {
	    return (this.path instanceof URL) ?
	        this.path.value.value : this.path.value;
	};
	Import.prototype.isVariableImport = function () {
	    var path = this.path;
	    if (path instanceof URL) {
	        path = path.value;
	    }
	    if (path instanceof Quoted) {
	        return path.containsVariables();
	    }

	    return true;
	};
	Import.prototype.evalForImport = function (context) {
	    var path = this.path;

	    if (path instanceof URL) {
	        path = path.value;
	    }

	    return new Import(path.eval(context), this.features, this.options, this.index, this.currentFileInfo);
	};
	Import.prototype.evalPath = function (context) {
	    var path = this.path.eval(context);
	    var rootpath = this.currentFileInfo && this.currentFileInfo.rootpath;

	    if (!(path instanceof URL)) {
	        if (rootpath) {
	            var pathValue = path.value;
	            // Add the base path if the import is relative
	            if (pathValue && context.isPathRelative(pathValue)) {
	                path.value = rootpath + pathValue;
	            }
	        }
	        path.value = context.normalizePath(path.value);
	    }

	    return path;
	};
	Import.prototype.eval = function (context) {
	    var ruleset, registry,
	        features = this.features && this.features.eval(context);

	    if (this.options.plugin) {
	        registry = context.frames[0] && context.frames[0].functionRegistry;
	        if ( registry && this.root && this.root.functions ) {
	            registry.addMultiple( this.root.functions );
	        }
	        return [];
	    }

	    if (this.skip) {
	        if (typeof this.skip === "function") {
	            this.skip = this.skip();
	        }
	        if (this.skip) {
	            return [];
	        }
	    }

	    if (this.options.inline) {
	        var contents = new Anonymous(this.root, 0,
	          {
	              filename: this.importedFilename,
	              reference: this.path.currentFileInfo && this.path.currentFileInfo.reference
	          }, true, true, false);

	        return this.features ? new Media([contents], this.features.value) : [contents];
	    } else if (this.css) {
	        var newImport = new Import(this.evalPath(context), features, this.options, this.index);
	        if (!newImport.css && this.error) {
	            throw this.error;
	        }
	        return newImport;
	    } else {
	        ruleset = new Ruleset(null, this.root.rules.slice(0));

	        ruleset.evalImports(context);

	        return this.features ? new Media(ruleset.rules, this.features.value) : ruleset.rules;
	    }
	};
	module.exports = Import;

	},{"./anonymous":45,"./media":65,"./node":69,"./quoted":72,"./ruleset":75,"./url":79}],61:[function(require,module,exports){
	var tree = {};

	tree.Node = require('./node');
	tree.Alpha = require('./alpha');
	tree.Color = require('./color');
	tree.Directive = require('./directive');
	tree.DetachedRuleset = require('./detached-ruleset');
	tree.Operation = require('./operation');
	tree.Dimension = require('./dimension');
	tree.Unit = require('./unit');
	tree.Keyword = require('./keyword');
	tree.Variable = require('./variable');
	tree.Ruleset = require('./ruleset');
	tree.Element = require('./element');
	tree.Attribute = require('./attribute');
	tree.Combinator = require('./combinator');
	tree.Selector = require('./selector');
	tree.Quoted = require('./quoted');
	tree.Expression = require('./expression');
	tree.Rule = require('./rule');
	tree.Call = require('./call');
	tree.URL = require('./url');
	tree.Import = require('./import');
	tree.mixin = {
	    Call: require('./mixin-call'),
	    Definition: require('./mixin-definition')
	};
	tree.Comment = require('./comment');
	tree.Anonymous = require('./anonymous');
	tree.Value = require('./value');
	tree.JavaScript = require('./javascript');
	tree.Assignment = require('./assignment');
	tree.Condition = require('./condition');
	tree.Paren = require('./paren');
	tree.Media = require('./media');
	tree.UnicodeDescriptor = require('./unicode-descriptor');
	tree.Negative = require('./negative');
	tree.Extend = require('./extend');
	tree.RulesetCall = require('./ruleset-call');

	module.exports = tree;

	},{"./alpha":44,"./anonymous":45,"./assignment":46,"./attribute":47,"./call":48,"./color":49,"./combinator":50,"./comment":51,"./condition":52,"./detached-ruleset":54,"./dimension":55,"./directive":56,"./element":57,"./expression":58,"./extend":59,"./import":60,"./javascript":62,"./keyword":64,"./media":65,"./mixin-call":66,"./mixin-definition":67,"./negative":68,"./node":69,"./operation":70,"./paren":71,"./quoted":72,"./rule":73,"./ruleset":75,"./ruleset-call":74,"./selector":76,"./unicode-descriptor":77,"./unit":78,"./url":79,"./value":80,"./variable":81}],62:[function(require,module,exports){
	var JsEvalNode = require("./js-eval-node"),
	    Dimension = require("./dimension"),
	    Quoted = require("./quoted"),
	    Anonymous = require("./anonymous");

	var JavaScript = function (string, escaped, index, currentFileInfo) {
	    this.escaped = escaped;
	    this.expression = string;
	    this.index = index;
	    this.currentFileInfo = currentFileInfo;
	};
	JavaScript.prototype = new JsEvalNode();
	JavaScript.prototype.type = "JavaScript";
	JavaScript.prototype.eval = function(context) {
	    var result = this.evaluateJavaScript(this.expression, context);

	    if (typeof result === 'number') {
	        return new Dimension(result);
	    } else if (typeof result === 'string') {
	        return new Quoted('"' + result + '"', result, this.escaped, this.index);
	    } else if (Array.isArray(result)) {
	        return new Anonymous(result.join(', '));
	    } else {
	        return new Anonymous(result);
	    }
	};

	module.exports = JavaScript;

	},{"./anonymous":45,"./dimension":55,"./js-eval-node":63,"./quoted":72}],63:[function(require,module,exports){
	var Node = require("./node"),
	    Variable = require("./variable");

	var JsEvalNode = function() {
	};
	JsEvalNode.prototype = new Node();

	JsEvalNode.prototype.evaluateJavaScript = function (expression, context) {
	    var result,
	        that = this,
	        evalContext = {};

	    if (context.javascriptEnabled !== undefined && !context.javascriptEnabled) {
	        throw { message: "You are using JavaScript, which has been disabled.",
	            filename: this.currentFileInfo.filename,
	            index: this.index };
	    }

	    expression = expression.replace(/@\{([\w-]+)\}/g, function (_, name) {
	        return that.jsify(new Variable('@' + name, that.index, that.currentFileInfo).eval(context));
	    });

	    try {
	        expression = new Function('return (' + expression + ')');
	    } catch (e) {
	        throw { message: "JavaScript evaluation error: " + e.message + " from `" + expression + "`" ,
	            filename: this.currentFileInfo.filename,
	            index: this.index };
	    }

	    var variables = context.frames[0].variables();
	    for (var k in variables) {
	        if (variables.hasOwnProperty(k)) {
	            /*jshint loopfunc:true */
	            evalContext[k.slice(1)] = {
	                value: variables[k].value,
	                toJS: function () {
	                    return this.value.eval(context).toCSS();
	                }
	            };
	        }
	    }

	    try {
	        result = expression.call(evalContext);
	    } catch (e) {
	        throw { message: "JavaScript evaluation error: '" + e.name + ': ' + e.message.replace(/["]/g, "'") + "'" ,
	            filename: this.currentFileInfo.filename,
	            index: this.index };
	    }
	    return result;
	};
	JsEvalNode.prototype.jsify = function (obj) {
	    if (Array.isArray(obj.value) && (obj.value.length > 1)) {
	        return '[' + obj.value.map(function (v) { return v.toCSS(); }).join(', ') + ']';
	    } else {
	        return obj.toCSS();
	    }
	};

	module.exports = JsEvalNode;

	},{"./node":69,"./variable":81}],64:[function(require,module,exports){
	var Node = require("./node");

	var Keyword = function (value) { this.value = value; };
	Keyword.prototype = new Node();
	Keyword.prototype.type = "Keyword";
	Keyword.prototype.genCSS = function (context, output) {
	    if (this.value === '%') { throw { type: "Syntax", message: "Invalid % without number" }; }
	    output.add(this.value);
	};

	Keyword.True = new Keyword('true');
	Keyword.False = new Keyword('false');

	module.exports = Keyword;

	},{"./node":69}],65:[function(require,module,exports){
	var Ruleset = require("./ruleset"),
	    Value = require("./value"),
	    Selector = require("./selector"),
	    Anonymous = require("./anonymous"),
	    Expression = require("./expression"),
	    Directive = require("./directive");

	var Media = function (value, features, index, currentFileInfo) {
	    this.index = index;
	    this.currentFileInfo = currentFileInfo;

	    var selectors = (new Selector([], null, null, this.index, this.currentFileInfo)).createEmptySelectors();

	    this.features = new Value(features);
	    this.rules = [new Ruleset(selectors, value)];
	    this.rules[0].allowImports = true;
	};
	Media.prototype = new Directive();
	Media.prototype.type = "Media";
	Media.prototype.isRulesetLike = true;
	Media.prototype.accept = function (visitor) {
	    if (this.features) {
	        this.features = visitor.visit(this.features);
	    }
	    if (this.rules) {
	        this.rules = visitor.visitArray(this.rules);
	    }
	};
	Media.prototype.genCSS = function (context, output) {
	    output.add('@media ', this.currentFileInfo, this.index);
	    this.features.genCSS(context, output);
	    this.outputRuleset(context, output, this.rules);
	};
	Media.prototype.eval = function (context) {
	    if (!context.mediaBlocks) {
	        context.mediaBlocks = [];
	        context.mediaPath = [];
	    }

	    var media = new Media(null, [], this.index, this.currentFileInfo);
	    if (this.debugInfo) {
	        this.rules[0].debugInfo = this.debugInfo;
	        media.debugInfo = this.debugInfo;
	    }
	    var strictMathBypass = false;
	    if (!context.strictMath) {
	        strictMathBypass = true;
	        context.strictMath = true;
	    }
	    try {
	        media.features = this.features.eval(context);
	    }
	    finally {
	        if (strictMathBypass) {
	            context.strictMath = false;
	        }
	    }

	    context.mediaPath.push(media);
	    context.mediaBlocks.push(media);

	    this.rules[0].functionRegistry = context.frames[0].functionRegistry.inherit();
	    context.frames.unshift(this.rules[0]);
	    media.rules = [this.rules[0].eval(context)];
	    context.frames.shift();

	    context.mediaPath.pop();

	    return context.mediaPath.length === 0 ? media.evalTop(context) :
	                media.evalNested(context);
	};
	Media.prototype.evalTop = function (context) {
	    var result = this;

	    // Render all dependent Media blocks.
	    if (context.mediaBlocks.length > 1) {
	        var selectors = (new Selector([], null, null, this.index, this.currentFileInfo)).createEmptySelectors();
	        result = new Ruleset(selectors, context.mediaBlocks);
	        result.multiMedia = true;
	    }

	    delete context.mediaBlocks;
	    delete context.mediaPath;

	    return result;
	};
	Media.prototype.evalNested = function (context) {
	    var i, value,
	        path = context.mediaPath.concat([this]);

	    // Extract the media-query conditions separated with `,` (OR).
	    for (i = 0; i < path.length; i++) {
	        value = path[i].features instanceof Value ?
	                    path[i].features.value : path[i].features;
	        path[i] = Array.isArray(value) ? value : [value];
	    }

	    // Trace all permutations to generate the resulting media-query.
	    //
	    // (a, b and c) with nested (d, e) ->
	    //    a and d
	    //    a and e
	    //    b and c and d
	    //    b and c and e
	    this.features = new Value(this.permute(path).map(function (path) {
	        path = path.map(function (fragment) {
	            return fragment.toCSS ? fragment : new Anonymous(fragment);
	        });

	        for (i = path.length - 1; i > 0; i--) {
	            path.splice(i, 0, new Anonymous("and"));
	        }

	        return new Expression(path);
	    }));

	    // Fake a tree-node that doesn't output anything.
	    return new Ruleset([], []);
	};
	Media.prototype.permute = function (arr) {
	    if (arr.length === 0) {
	        return [];
	    } else if (arr.length === 1) {
	        return arr[0];
	    } else {
	        var result = [];
	        var rest = this.permute(arr.slice(1));
	        for (var i = 0; i < rest.length; i++) {
	            for (var j = 0; j < arr[0].length; j++) {
	                result.push([arr[0][j]].concat(rest[i]));
	            }
	        }
	        return result;
	    }
	};
	Media.prototype.bubbleSelectors = function (selectors) {
	    if (!selectors) {
	        return;
	    }
	    this.rules = [new Ruleset(selectors.slice(0), [this.rules[0]])];
	};
	module.exports = Media;

	},{"./anonymous":45,"./directive":56,"./expression":58,"./ruleset":75,"./selector":76,"./value":80}],66:[function(require,module,exports){
	var Node = require("./node"),
	    Selector = require("./selector"),
	    MixinDefinition = require("./mixin-definition"),
	    defaultFunc = require("../functions/default");

	var MixinCall = function (elements, args, index, currentFileInfo, important) {
	    this.selector = new Selector(elements);
	    this.arguments = args || [];
	    this.index = index;
	    this.currentFileInfo = currentFileInfo;
	    this.important = important;
	};
	MixinCall.prototype = new Node();
	MixinCall.prototype.type = "MixinCall";
	MixinCall.prototype.accept = function (visitor) {
	    if (this.selector) {
	        this.selector = visitor.visit(this.selector);
	    }
	    if (this.arguments.length) {
	        this.arguments = visitor.visitArray(this.arguments);
	    }
	};
	MixinCall.prototype.eval = function (context) {
	    var mixins, mixin, mixinPath, args = [], arg, argValue,
	        rules = [], rule, match = false, i, m, f, isRecursive, isOneFound,
	        candidates = [], candidate, conditionResult = [], defaultResult, defFalseEitherCase = -1,
	        defNone = 0, defTrue = 1, defFalse = 2, count, originalRuleset, noArgumentsFilter;

	    function calcDefGroup(mixin, mixinPath) {
	        var f, p, namespace;

	        for (f = 0; f < 2; f++) {
	            conditionResult[f] = true;
	            defaultFunc.value(f);
	            for (p = 0; p < mixinPath.length && conditionResult[f]; p++) {
	                namespace = mixinPath[p];
	                if (namespace.matchCondition) {
	                    conditionResult[f] = conditionResult[f] && namespace.matchCondition(null, context);
	                }
	            }
	            if (mixin.matchCondition) {
	                conditionResult[f] = conditionResult[f] && mixin.matchCondition(args, context);
	            }
	        }
	        if (conditionResult[0] || conditionResult[1]) {
	            if (conditionResult[0] != conditionResult[1]) {
	                return conditionResult[1] ?
	                    defTrue : defFalse;
	            }

	            return defNone;
	        }
	        return defFalseEitherCase;
	    }

	    for (i = 0; i < this.arguments.length; i++) {
	        arg = this.arguments[i];
	        argValue = arg.value.eval(context);
	        if (arg.expand && Array.isArray(argValue.value)) {
	            argValue = argValue.value;
	            for (m = 0; m < argValue.length; m++) {
	                args.push({value: argValue[m]});
	            }
	        } else {
	            args.push({name: arg.name, value: argValue});
	        }
	    }

	    noArgumentsFilter = function(rule) {return rule.matchArgs(null, context);};

	    for (i = 0; i < context.frames.length; i++) {
	        if ((mixins = context.frames[i].find(this.selector, null, noArgumentsFilter)).length > 0) {
	            isOneFound = true;

	            // To make `default()` function independent of definition order we have two "subpasses" here.
	            // At first we evaluate each guard *twice* (with `default() == true` and `default() == false`),
	            // and build candidate list with corresponding flags. Then, when we know all possible matches,
	            // we make a final decision.

	            for (m = 0; m < mixins.length; m++) {
	                mixin = mixins[m].rule;
	                mixinPath = mixins[m].path;
	                isRecursive = false;
	                for (f = 0; f < context.frames.length; f++) {
	                    if ((!(mixin instanceof MixinDefinition)) && mixin === (context.frames[f].originalRuleset || context.frames[f])) {
	                        isRecursive = true;
	                        break;
	                    }
	                }
	                if (isRecursive) {
	                    continue;
	                }

	                if (mixin.matchArgs(args, context)) {
	                    candidate = {mixin: mixin, group: calcDefGroup(mixin, mixinPath)};

	                    if (candidate.group !== defFalseEitherCase) {
	                        candidates.push(candidate);
	                    }

	                    match = true;
	                }
	            }

	            defaultFunc.reset();

	            count = [0, 0, 0];
	            for (m = 0; m < candidates.length; m++) {
	                count[candidates[m].group]++;
	            }

	            if (count[defNone] > 0) {
	                defaultResult = defFalse;
	            } else {
	                defaultResult = defTrue;
	                if ((count[defTrue] + count[defFalse]) > 1) {
	                    throw { type: 'Runtime',
	                        message: 'Ambiguous use of `default()` found when matching for `' + this.format(args) + '`',
	                        index: this.index, filename: this.currentFileInfo.filename };
	                }
	            }

	            for (m = 0; m < candidates.length; m++) {
	                candidate = candidates[m].group;
	                if ((candidate === defNone) || (candidate === defaultResult)) {
	                    try {
	                        mixin = candidates[m].mixin;
	                        if (!(mixin instanceof MixinDefinition)) {
	                            originalRuleset = mixin.originalRuleset || mixin;
	                            mixin = new MixinDefinition("", [], mixin.rules, null, false);
	                            mixin.originalRuleset = originalRuleset;
	                        }
	                        Array.prototype.push.apply(
	                            rules, mixin.evalCall(context, args, this.important).rules);
	                    } catch (e) {
	                        throw { message: e.message, index: this.index, filename: this.currentFileInfo.filename, stack: e.stack };
	                    }
	                }
	            }

	            if (match) {
	                if (!this.currentFileInfo || !this.currentFileInfo.reference) {
	                    for (i = 0; i < rules.length; i++) {
	                        rule = rules[i];
	                        if (rule.markReferenced) {
	                            rule.markReferenced();
	                        }
	                    }
	                }
	                return rules;
	            }
	        }
	    }
	    if (isOneFound) {
	        throw { type:    'Runtime',
	            message: 'No matching definition was found for `' + this.format(args) + '`',
	            index:   this.index, filename: this.currentFileInfo.filename };
	    } else {
	        throw { type:    'Name',
	            message: this.selector.toCSS().trim() + " is undefined",
	            index:   this.index, filename: this.currentFileInfo.filename };
	    }
	};
	MixinCall.prototype.format = function (args) {
	    return this.selector.toCSS().trim() + '(' +
	        (args ? args.map(function (a) {
	            var argValue = "";
	            if (a.name) {
	                argValue += a.name + ":";
	            }
	            if (a.value.toCSS) {
	                argValue += a.value.toCSS();
	            } else {
	                argValue += "???";
	            }
	            return argValue;
	        }).join(', ') : "") + ")";
	};
	module.exports = MixinCall;

	},{"../functions/default":19,"./mixin-definition":67,"./node":69,"./selector":76}],67:[function(require,module,exports){
	var Selector = require("./selector"),
	    Element = require("./element"),
	    Ruleset = require("./ruleset"),
	    Rule = require("./rule"),
	    Expression = require("./expression"),
	    contexts = require("../contexts");

	var Definition = function (name, params, rules, condition, variadic, frames) {
	    this.name = name;
	    this.selectors = [new Selector([new Element(null, name, this.index, this.currentFileInfo)])];
	    this.params = params;
	    this.condition = condition;
	    this.variadic = variadic;
	    this.arity = params.length;
	    this.rules = rules;
	    this._lookups = {};
	    var optionalParameters = [];
	    this.required = params.reduce(function (count, p) {
	        if (!p.name || (p.name && !p.value)) {
	            return count + 1;
	        }
	        else {
	            optionalParameters.push(p.name);
	            return count;
	        }
	    }, 0);
	    this.optionalParameters = optionalParameters;
	    this.frames = frames;
	};
	Definition.prototype = new Ruleset();
	Definition.prototype.type = "MixinDefinition";
	Definition.prototype.evalFirst = true;
	Definition.prototype.accept = function (visitor) {
	    if (this.params && this.params.length) {
	        this.params = visitor.visitArray(this.params);
	    }
	    this.rules = visitor.visitArray(this.rules);
	    if (this.condition) {
	        this.condition = visitor.visit(this.condition);
	    }
	};
	Definition.prototype.evalParams = function (context, mixinEnv, args, evaldArguments) {
	    /*jshint boss:true */
	    var frame = new Ruleset(null, null),
	        varargs, arg,
	        params = this.params.slice(0),
	        i, j, val, name, isNamedFound, argIndex, argsLength = 0;

	    if (mixinEnv.frames && mixinEnv.frames[0] && mixinEnv.frames[0].functionRegistry) {
	        frame.functionRegistry = mixinEnv.frames[0].functionRegistry.inherit();
	    }
	    mixinEnv = new contexts.Eval(mixinEnv, [frame].concat(mixinEnv.frames));

	    if (args) {
	        args = args.slice(0);
	        argsLength = args.length;

	        for (i = 0; i < argsLength; i++) {
	            arg = args[i];
	            if (name = (arg && arg.name)) {
	                isNamedFound = false;
	                for (j = 0; j < params.length; j++) {
	                    if (!evaldArguments[j] && name === params[j].name) {
	                        evaldArguments[j] = arg.value.eval(context);
	                        frame.prependRule(new Rule(name, arg.value.eval(context)));
	                        isNamedFound = true;
	                        break;
	                    }
	                }
	                if (isNamedFound) {
	                    args.splice(i, 1);
	                    i--;
	                    continue;
	                } else {
	                    throw { type: 'Runtime', message: "Named argument for " + this.name +
	                        ' ' + args[i].name + ' not found' };
	                }
	            }
	        }
	    }
	    argIndex = 0;
	    for (i = 0; i < params.length; i++) {
	        if (evaldArguments[i]) { continue; }

	        arg = args && args[argIndex];

	        if (name = params[i].name) {
	            if (params[i].variadic) {
	                varargs = [];
	                for (j = argIndex; j < argsLength; j++) {
	                    varargs.push(args[j].value.eval(context));
	                }
	                frame.prependRule(new Rule(name, new Expression(varargs).eval(context)));
	            } else {
	                val = arg && arg.value;
	                if (val) {
	                    val = val.eval(context);
	                } else if (params[i].value) {
	                    val = params[i].value.eval(mixinEnv);
	                    frame.resetCache();
	                } else {
	                    throw { type: 'Runtime', message: "wrong number of arguments for " + this.name +
	                        ' (' + argsLength + ' for ' + this.arity + ')' };
	                }

	                frame.prependRule(new Rule(name, val));
	                evaldArguments[i] = val;
	            }
	        }

	        if (params[i].variadic && args) {
	            for (j = argIndex; j < argsLength; j++) {
	                evaldArguments[j] = args[j].value.eval(context);
	            }
	        }
	        argIndex++;
	    }

	    return frame;
	};
	Definition.prototype.makeImportant = function() {
	    var rules = !this.rules ? this.rules : this.rules.map(function (r) {
	        if (r.makeImportant) {
	            return r.makeImportant(true);
	        } else {
	            return r;
	        }
	    });
	    var result = new Definition (this.name, this.params, rules, this.condition, this.variadic, this.frames);
	    return result;
	};
	Definition.prototype.eval = function (context) {
	    return new Definition(this.name, this.params, this.rules, this.condition, this.variadic, this.frames || context.frames.slice(0));
	};
	Definition.prototype.evalCall = function (context, args, important) {
	    var _arguments = [],
	        mixinFrames = this.frames ? this.frames.concat(context.frames) : context.frames,
	        frame = this.evalParams(context, new contexts.Eval(context, mixinFrames), args, _arguments),
	        rules, ruleset;

	    frame.prependRule(new Rule('@arguments', new Expression(_arguments).eval(context)));

	    rules = this.rules.slice(0);

	    ruleset = new Ruleset(null, rules);
	    ruleset.originalRuleset = this;
	    ruleset = ruleset.eval(new contexts.Eval(context, [this, frame].concat(mixinFrames)));
	    if (important) {
	        ruleset = ruleset.makeImportant();
	    }
	    return ruleset;
	};
	Definition.prototype.matchCondition = function (args, context) {
	    if (this.condition && !this.condition.eval(
	        new contexts.Eval(context,
	            [this.evalParams(context, /* the parameter variables*/
	                new contexts.Eval(context, this.frames ? this.frames.concat(context.frames) : context.frames), args, [])]
	            .concat(this.frames || []) // the parent namespace/mixin frames
	            .concat(context.frames)))) { // the current environment frames
	        return false;
	    }
	    return true;
	};
	Definition.prototype.matchArgs = function (args, context) {
	    var allArgsCnt = (args && args.length) || 0, len, optionalParameters = this.optionalParameters;
	    var requiredArgsCnt = !args ? 0 : args.reduce(function (count, p) {
	        if (optionalParameters.indexOf(p.name) < 0) {
	            return count + 1;
	        } else {
	            return count;
	        }
	    }, 0);

	    if (! this.variadic) {
	        if (requiredArgsCnt < this.required) {
	            return false;
	        }
	        if (allArgsCnt > this.params.length) {
	            return false;
	        }
	    } else {
	        if (requiredArgsCnt < (this.required - 1)) {
	            return false;
	        }
	    }

	    // check patterns
	    len = Math.min(requiredArgsCnt, this.arity);

	    for (var i = 0; i < len; i++) {
	        if (!this.params[i].name && !this.params[i].variadic) {
	            if (args[i].value.eval(context).toCSS() != this.params[i].value.eval(context).toCSS()) {
	                return false;
	            }
	        }
	    }
	    return true;
	};
	module.exports = Definition;

	},{"../contexts":10,"./element":57,"./expression":58,"./rule":73,"./ruleset":75,"./selector":76}],68:[function(require,module,exports){
	var Node = require("./node"),
	    Operation = require("./operation"),
	    Dimension = require("./dimension");

	var Negative = function (node) {
	    this.value = node;
	};
	Negative.prototype = new Node();
	Negative.prototype.type = "Negative";
	Negative.prototype.genCSS = function (context, output) {
	    output.add('-');
	    this.value.genCSS(context, output);
	};
	Negative.prototype.eval = function (context) {
	    if (context.isMathOn()) {
	        return (new Operation('*', [new Dimension(-1), this.value])).eval(context);
	    }
	    return new Negative(this.value.eval(context));
	};
	module.exports = Negative;

	},{"./dimension":55,"./node":69,"./operation":70}],69:[function(require,module,exports){
	var Node = function() {
	};
	Node.prototype.toCSS = function (context) {
	    var strs = [];
	    this.genCSS(context, {
	        add: function(chunk, fileInfo, index) {
	            strs.push(chunk);
	        },
	        isEmpty: function () {
	            return strs.length === 0;
	        }
	    });
	    return strs.join('');
	};
	Node.prototype.genCSS = function (context, output) {
	    output.add(this.value);
	};
	Node.prototype.accept = function (visitor) {
	    this.value = visitor.visit(this.value);
	};
	Node.prototype.eval = function () { return this; };
	Node.prototype._operate = function (context, op, a, b) {
	    switch (op) {
	        case '+': return a + b;
	        case '-': return a - b;
	        case '*': return a * b;
	        case '/': return a / b;
	    }
	};
	Node.prototype.fround = function(context, value) {
	    var precision = context && context.numPrecision;
	    //add "epsilon" to ensure numbers like 1.000000005 (represented as 1.000000004999....) are properly rounded...
	    return (precision == null) ? value : Number((value + 2e-16).toFixed(precision));
	};
	Node.compare = function (a, b) {
	    /* returns:
	     -1: a < b
	     0: a = b
	     1: a > b
	     and *any* other value for a != b (e.g. undefined, NaN, -2 etc.) */

	    if ((a.compare) &&
	        // for "symmetric results" force toCSS-based comparison
	        // of Quoted or Anonymous if either value is one of those
	        !(b.type === "Quoted" || b.type === "Anonymous")) {
	        return a.compare(b);
	    } else if (b.compare) {
	        return -b.compare(a);
	    } else if (a.type !== b.type) {
	        return undefined;
	    }

	    a = a.value;
	    b = b.value;
	    if (!Array.isArray(a)) {
	        return a === b ? 0 : undefined;
	    }
	    if (a.length !== b.length) {
	        return undefined;
	    }
	    for (var i = 0; i < a.length; i++) {
	        if (Node.compare(a[i], b[i]) !== 0) {
	            return undefined;
	        }
	    }
	    return 0;
	};

	Node.numericCompare = function (a, b) {
	    return a  <  b ? -1
	        : a === b ?  0
	        : a  >  b ?  1 : undefined;
	};
	module.exports = Node;

	},{}],70:[function(require,module,exports){
	var Node = require("./node"),
	    Color = require("./color"),
	    Dimension = require("./dimension");

	var Operation = function (op, operands, isSpaced) {
	    this.op = op.trim();
	    this.operands = operands;
	    this.isSpaced = isSpaced;
	};
	Operation.prototype = new Node();
	Operation.prototype.type = "Operation";
	Operation.prototype.accept = function (visitor) {
	    this.operands = visitor.visit(this.operands);
	};
	Operation.prototype.eval = function (context) {
	    var a = this.operands[0].eval(context),
	        b = this.operands[1].eval(context);

	    if (context.isMathOn()) {
	        if (a instanceof Dimension && b instanceof Color) {
	            a = a.toColor();
	        }
	        if (b instanceof Dimension && a instanceof Color) {
	            b = b.toColor();
	        }
	        if (!a.operate) {
	            throw { type: "Operation",
	                    message: "Operation on an invalid type" };
	        }

	        return a.operate(context, this.op, b);
	    } else {
	        return new Operation(this.op, [a, b], this.isSpaced);
	    }
	};
	Operation.prototype.genCSS = function (context, output) {
	    this.operands[0].genCSS(context, output);
	    if (this.isSpaced) {
	        output.add(" ");
	    }
	    output.add(this.op);
	    if (this.isSpaced) {
	        output.add(" ");
	    }
	    this.operands[1].genCSS(context, output);
	};

	module.exports = Operation;

	},{"./color":49,"./dimension":55,"./node":69}],71:[function(require,module,exports){
	var Node = require("./node");

	var Paren = function (node) {
	    this.value = node;
	};
	Paren.prototype = new Node();
	Paren.prototype.type = "Paren";
	Paren.prototype.genCSS = function (context, output) {
	    output.add('(');
	    this.value.genCSS(context, output);
	    output.add(')');
	};
	Paren.prototype.eval = function (context) {
	    return new Paren(this.value.eval(context));
	};
	module.exports = Paren;

	},{"./node":69}],72:[function(require,module,exports){
	var Node = require("./node"),
	    JsEvalNode = require("./js-eval-node"),
	    Variable = require("./variable");

	var Quoted = function (str, content, escaped, index, currentFileInfo) {
	    this.escaped = (escaped == null) ? true : escaped;
	    this.value = content || '';
	    this.quote = str.charAt(0);
	    this.index = index;
	    this.currentFileInfo = currentFileInfo;
	};
	Quoted.prototype = new JsEvalNode();
	Quoted.prototype.type = "Quoted";
	Quoted.prototype.genCSS = function (context, output) {
	    if (!this.escaped) {
	        output.add(this.quote, this.currentFileInfo, this.index);
	    }
	    output.add(this.value);
	    if (!this.escaped) {
	        output.add(this.quote);
	    }
	};
	Quoted.prototype.containsVariables = function() {
	    return this.value.match(/(`([^`]+)`)|@\{([\w-]+)\}/);
	};
	Quoted.prototype.eval = function (context) {
	    var that = this, value = this.value;
	    var javascriptReplacement = function (_, exp) {
	        return String(that.evaluateJavaScript(exp, context));
	    };
	    var interpolationReplacement = function (_, name) {
	        var v = new Variable('@' + name, that.index, that.currentFileInfo).eval(context, true);
	        return (v instanceof Quoted) ? v.value : v.toCSS();
	    };
	    function iterativeReplace(value, regexp, replacementFnc) {
	        var evaluatedValue = value;
	        do {
	            value = evaluatedValue;
	            evaluatedValue = value.replace(regexp, replacementFnc);
	        } while (value !== evaluatedValue);
	        return evaluatedValue;
	    }
	    value = iterativeReplace(value, /`([^`]+)`/g, javascriptReplacement);
	    value = iterativeReplace(value, /@\{([\w-]+)\}/g, interpolationReplacement);
	    return new Quoted(this.quote + value + this.quote, value, this.escaped, this.index, this.currentFileInfo);
	};
	Quoted.prototype.compare = function (other) {
	    // when comparing quoted strings allow the quote to differ
	    if (other.type === "Quoted" && !this.escaped && !other.escaped) {
	        return Node.numericCompare(this.value, other.value);
	    } else {
	        return other.toCSS && this.toCSS() === other.toCSS() ? 0 : undefined;
	    }
	};
	module.exports = Quoted;

	},{"./js-eval-node":63,"./node":69,"./variable":81}],73:[function(require,module,exports){
	var Node = require("./node"),
	    Value = require("./value"),
	    Keyword = require("./keyword");

	var Rule = function (name, value, important, merge, index, currentFileInfo, inline, variable) {
	    this.name = name;
	    this.value = (value instanceof Node) ? value : new Value([value]); //value instanceof tree.Value || value instanceof tree.Ruleset ??
	    this.important = important ? ' ' + important.trim() : '';
	    this.merge = merge;
	    this.index = index;
	    this.currentFileInfo = currentFileInfo;
	    this.inline = inline || false;
	    this.variable = (variable !== undefined) ? variable
	        : (name.charAt && (name.charAt(0) === '@'));
	};

	function evalName(context, name) {
	    var value = "", i, n = name.length,
	        output = {add: function (s) {value += s;}};
	    for (i = 0; i < n; i++) {
	        name[i].eval(context).genCSS(context, output);
	    }
	    return value;
	}

	Rule.prototype = new Node();
	Rule.prototype.type = "Rule";
	Rule.prototype.genCSS = function (context, output) {
	    output.add(this.name + (context.compress ? ':' : ': '), this.currentFileInfo, this.index);
	    try {
	        this.value.genCSS(context, output);
	    }
	    catch(e) {
	        e.index = this.index;
	        e.filename = this.currentFileInfo.filename;
	        throw e;
	    }
	    output.add(this.important + ((this.inline || (context.lastRule && context.compress)) ? "" : ";"), this.currentFileInfo, this.index);
	};
	Rule.prototype.eval = function (context) {
	    var strictMathBypass = false, name = this.name, evaldValue, variable = this.variable;
	    if (typeof name !== "string") {
	        // expand 'primitive' name directly to get
	        // things faster (~10% for benchmark.less):
	        name = (name.length === 1) && (name[0] instanceof Keyword) ?
	                name[0].value : evalName(context, name);
	        variable = false; // never treat expanded interpolation as new variable name
	    }
	    if (name === "font" && !context.strictMath) {
	        strictMathBypass = true;
	        context.strictMath = true;
	    }
	    try {
	        context.importantScope.push({});
	        evaldValue = this.value.eval(context);

	        if (!this.variable && evaldValue.type === "DetachedRuleset") {
	            throw { message: "Rulesets cannot be evaluated on a property.",
	                    index: this.index, filename: this.currentFileInfo.filename };
	        }
	        var important = this.important,
	            importantResult = context.importantScope.pop();
	        if (!important && importantResult.important) {
	            important = importantResult.important;
	        }

	        return new Rule(name,
	                          evaldValue,
	                          important,
	                          this.merge,
	                          this.index, this.currentFileInfo, this.inline,
	                              variable);
	    }
	    catch(e) {
	        if (typeof e.index !== 'number') {
	            e.index = this.index;
	            e.filename = this.currentFileInfo.filename;
	        }
	        throw e;
	    }
	    finally {
	        if (strictMathBypass) {
	            context.strictMath = false;
	        }
	    }
	};
	Rule.prototype.makeImportant = function () {
	    return new Rule(this.name,
	                          this.value,
	                          "!important",
	                          this.merge,
	                          this.index, this.currentFileInfo, this.inline);
	};

	// Recursive marking for rules
	var mark = function(value) {
	    if (!Array.isArray(value)) {
	        if (value.markReferenced) {
	            value.markReferenced();
	        }
	    } else {
	        value.forEach(function (ar) {
	            mark(ar);
	        });
	    }
	};
	Rule.prototype.markReferenced = function () {
	    if (this.value) {
	        mark(this.value);
	    }
	};

	module.exports = Rule;
	},{"./keyword":64,"./node":69,"./value":80}],74:[function(require,module,exports){
	var Node = require("./node"),
	    Variable = require("./variable");

	var RulesetCall = function (variable) {
	    this.variable = variable;
	};
	RulesetCall.prototype = new Node();
	RulesetCall.prototype.type = "RulesetCall";
	RulesetCall.prototype.eval = function (context) {
	    var detachedRuleset = new Variable(this.variable).eval(context);
	    return detachedRuleset.callEval(context);
	};
	module.exports = RulesetCall;

	},{"./node":69,"./variable":81}],75:[function(require,module,exports){
	var Node = require("./node"),
	    Rule = require("./rule"),
	    Selector = require("./selector"),
	    Element = require("./element"),
	    Paren = require("./paren"),
	    contexts = require("../contexts"),
	    globalFunctionRegistry = require("../functions/function-registry"),
	    defaultFunc = require("../functions/default"),
	    getDebugInfo = require("./debug-info");

	var Ruleset = function (selectors, rules, strictImports) {
	    this.selectors = selectors;
	    this.rules = rules;
	    this._lookups = {};
	    this.strictImports = strictImports;
	};
	Ruleset.prototype = new Node();
	Ruleset.prototype.type = "Ruleset";
	Ruleset.prototype.isRuleset = true;
	Ruleset.prototype.isRulesetLike = true;
	Ruleset.prototype.accept = function (visitor) {
	    if (this.paths) {
	        visitor.visitArray(this.paths, true);
	    } else if (this.selectors) {
	        this.selectors = visitor.visitArray(this.selectors);
	    }
	    if (this.rules && this.rules.length) {
	        this.rules = visitor.visitArray(this.rules);
	    }
	};
	Ruleset.prototype.eval = function (context) {
	    var thisSelectors = this.selectors, selectors,
	        selCnt, selector, i, hasOnePassingSelector = false;

	    if (thisSelectors && (selCnt = thisSelectors.length)) {
	        selectors = [];
	        defaultFunc.error({
	            type: "Syntax",
	            message: "it is currently only allowed in parametric mixin guards,"
	        });
	        for (i = 0; i < selCnt; i++) {
	            selector = thisSelectors[i].eval(context);
	            selectors.push(selector);
	            if (selector.evaldCondition) {
	                hasOnePassingSelector = true;
	            }
	        }
	        defaultFunc.reset();
	    } else {
	        hasOnePassingSelector = true;
	    }

	    var rules = this.rules ? this.rules.slice(0) : null,
	        ruleset = new Ruleset(selectors, rules, this.strictImports),
	        rule, subRule;

	    ruleset.originalRuleset = this;
	    ruleset.root = this.root;
	    ruleset.firstRoot = this.firstRoot;
	    ruleset.allowImports = this.allowImports;

	    if (this.debugInfo) {
	        ruleset.debugInfo = this.debugInfo;
	    }

	    if (!hasOnePassingSelector) {
	        rules.length = 0;
	    }

	    // inherit a function registry from the frames stack when possible;
	    // otherwise from the global registry
	    ruleset.functionRegistry = (function (frames) {
	        var i = 0,
	            n = frames.length,
	            found;
	        for ( ; i !== n ; ++i ) {
	            found = frames[ i ].functionRegistry;
	            if ( found ) { return found; }
	        }
	        return globalFunctionRegistry;
	    }(context.frames)).inherit();

	    // push the current ruleset to the frames stack
	    var ctxFrames = context.frames;
	    ctxFrames.unshift(ruleset);

	    // currrent selectors
	    var ctxSelectors = context.selectors;
	    if (!ctxSelectors) {
	        context.selectors = ctxSelectors = [];
	    }
	    ctxSelectors.unshift(this.selectors);

	    // Evaluate imports
	    if (ruleset.root || ruleset.allowImports || !ruleset.strictImports) {
	        ruleset.evalImports(context);
	    }

	    // Store the frames around mixin definitions,
	    // so they can be evaluated like closures when the time comes.
	    var rsRules = ruleset.rules, rsRuleCnt = rsRules ? rsRules.length : 0;
	    for (i = 0; i < rsRuleCnt; i++) {
	        if (rsRules[i].evalFirst) {
	            rsRules[i] = rsRules[i].eval(context);
	        }
	    }

	    var mediaBlockCount = (context.mediaBlocks && context.mediaBlocks.length) || 0;

	    // Evaluate mixin calls.
	    for (i = 0; i < rsRuleCnt; i++) {
	        if (rsRules[i].type === "MixinCall") {
	            /*jshint loopfunc:true */
	            rules = rsRules[i].eval(context).filter(function(r) {
	                if ((r instanceof Rule) && r.variable) {
	                    // do not pollute the scope if the variable is
	                    // already there. consider returning false here
	                    // but we need a way to "return" variable from mixins
	                    return !(ruleset.variable(r.name));
	                }
	                return true;
	            });
	            rsRules.splice.apply(rsRules, [i, 1].concat(rules));
	            rsRuleCnt += rules.length - 1;
	            i += rules.length - 1;
	            ruleset.resetCache();
	        } else if (rsRules[i].type === "RulesetCall") {
	            /*jshint loopfunc:true */
	            rules = rsRules[i].eval(context).rules.filter(function(r) {
	                if ((r instanceof Rule) && r.variable) {
	                    // do not pollute the scope at all
	                    return false;
	                }
	                return true;
	            });
	            rsRules.splice.apply(rsRules, [i, 1].concat(rules));
	            rsRuleCnt += rules.length - 1;
	            i += rules.length - 1;
	            ruleset.resetCache();
	        }
	    }

	    // Evaluate everything else
	    for (i = 0; i < rsRules.length; i++) {
	        rule = rsRules[i];
	        if (!rule.evalFirst) {
	            rsRules[i] = rule = rule.eval ? rule.eval(context) : rule;
	        }
	    }

	    // Evaluate everything else
	    for (i = 0; i < rsRules.length; i++) {
	        rule = rsRules[i];
	        // for rulesets, check if it is a css guard and can be removed
	        if (rule instanceof Ruleset && rule.selectors && rule.selectors.length === 1) {
	            // check if it can be folded in (e.g. & where)
	            if (rule.selectors[0].isJustParentSelector()) {
	                rsRules.splice(i--, 1);

	                for (var j = 0; j < rule.rules.length; j++) {
	                    subRule = rule.rules[j];
	                    if (!(subRule instanceof Rule) || !subRule.variable) {
	                        rsRules.splice(++i, 0, subRule);
	                    }
	                }
	            }
	        }
	    }

	    // Pop the stack
	    ctxFrames.shift();
	    ctxSelectors.shift();

	    if (context.mediaBlocks) {
	        for (i = mediaBlockCount; i < context.mediaBlocks.length; i++) {
	            context.mediaBlocks[i].bubbleSelectors(selectors);
	        }
	    }

	    return ruleset;
	};
	Ruleset.prototype.evalImports = function(context) {
	    var rules = this.rules, i, importRules;
	    if (!rules) { return; }

	    for (i = 0; i < rules.length; i++) {
	        if (rules[i].type === "Import") {
	            importRules = rules[i].eval(context);
	            if (importRules && importRules.length) {
	                rules.splice.apply(rules, [i, 1].concat(importRules));
	                i+= importRules.length - 1;
	            } else {
	                rules.splice(i, 1, importRules);
	            }
	            this.resetCache();
	        }
	    }
	};
	Ruleset.prototype.makeImportant = function() {
	    var result = new Ruleset(this.selectors, this.rules.map(function (r) {
	        if (r.makeImportant) {
	            return r.makeImportant();
	        } else {
	            return r;
	        }
	    }), this.strictImports);

	    return result;
	};
	Ruleset.prototype.matchArgs = function (args) {
	    return !args || args.length === 0;
	};
	// lets you call a css selector with a guard
	Ruleset.prototype.matchCondition = function (args, context) {
	    var lastSelector = this.selectors[this.selectors.length - 1];
	    if (!lastSelector.evaldCondition) {
	        return false;
	    }
	    if (lastSelector.condition &&
	        !lastSelector.condition.eval(
	            new contexts.Eval(context,
	                context.frames))) {
	        return false;
	    }
	    return true;
	};
	Ruleset.prototype.resetCache = function () {
	    this._rulesets = null;
	    this._variables = null;
	    this._lookups = {};
	};
	Ruleset.prototype.variables = function () {
	    if (!this._variables) {
	        this._variables = !this.rules ? {} : this.rules.reduce(function (hash, r) {
	            if (r instanceof Rule && r.variable === true) {
	                hash[r.name] = r;
	            }
	            // when evaluating variables in an import statement, imports have not been eval'd
	            // so we need to go inside import statements.
	            // guard against root being a string (in the case of inlined less)
	            if (r.type === "Import" && r.root && r.root.variables) {
	                var vars = r.root.variables();
	                for (var name in vars) {
	                    if (vars.hasOwnProperty(name)) {
	                        hash[name] = vars[name];
	                    }
	                }
	            }
	            return hash;
	        }, {});
	    }
	    return this._variables;
	};
	Ruleset.prototype.variable = function (name) {
	    return this.variables()[name];
	};
	Ruleset.prototype.rulesets = function () {
	    if (!this.rules) { return []; }

	    var filtRules = [], rules = this.rules, cnt = rules.length,
	        i, rule;

	    for (i = 0; i < cnt; i++) {
	        rule = rules[i];
	        if (rule.isRuleset) {
	            filtRules.push(rule);
	        }
	    }

	    return filtRules;
	};
	Ruleset.prototype.prependRule = function (rule) {
	    var rules = this.rules;
	    if (rules) {
	        rules.unshift(rule);
	    } else {
	        this.rules = [ rule ];
	    }
	};
	Ruleset.prototype.find = function (selector, self, filter) {
	    self = self || this;
	    var rules = [], match, foundMixins,
	        key = selector.toCSS();

	    if (key in this._lookups) { return this._lookups[key]; }

	    this.rulesets().forEach(function (rule) {
	        if (rule !== self) {
	            for (var j = 0; j < rule.selectors.length; j++) {
	                match = selector.match(rule.selectors[j]);
	                if (match) {
	                    if (selector.elements.length > match) {
	                        if (!filter || filter(rule)) {
	                            foundMixins = rule.find(new Selector(selector.elements.slice(match)), self, filter);
	                            for (var i = 0; i < foundMixins.length; ++i) {
	                                foundMixins[i].path.push(rule);
	                            }
	                            Array.prototype.push.apply(rules, foundMixins);
	                        }
	                    } else {
	                        rules.push({ rule: rule, path: []});
	                    }
	                    break;
	                }
	            }
	        }
	    });
	    this._lookups[key] = rules;
	    return rules;
	};
	Ruleset.prototype.genCSS = function (context, output) {
	    var i, j,
	        charsetRuleNodes = [],
	        ruleNodes = [],
	        debugInfo,     // Line number debugging
	        rule,
	        path;

	    context.tabLevel = (context.tabLevel || 0);

	    if (!this.root) {
	        context.tabLevel++;
	    }

	    var tabRuleStr = context.compress ? '' : Array(context.tabLevel + 1).join("  "),
	        tabSetStr = context.compress ? '' : Array(context.tabLevel).join("  "),
	        sep;

	    function isRulesetLikeNode(rule) {
	        // if it has nested rules, then it should be treated like a ruleset
	        // medias and comments do not have nested rules, but should be treated like rulesets anyway
	        // some directives and anonymous nodes are ruleset like, others are not
	        if (typeof rule.isRulesetLike === "boolean") {
	            return rule.isRulesetLike;
	        } else if (typeof rule.isRulesetLike === "function") {
	            return rule.isRulesetLike();
	        }

	        //anything else is assumed to be a rule
	        return false;
	    }

	    var charsetNodeIndex = 0;
	    var importNodeIndex = 0;
	    for (i = 0; i < this.rules.length; i++) {
	        rule = this.rules[i];
	        if (rule.type === "Comment") {
	            if (importNodeIndex === i) {
	                importNodeIndex++;
	            }
	            ruleNodes.push(rule);
	        } else if (rule.isCharset && rule.isCharset()) {
	            ruleNodes.splice(charsetNodeIndex, 0, rule);
	            charsetNodeIndex++;
	            importNodeIndex++;
	        } else if (rule.type === "Import") {
	            ruleNodes.splice(importNodeIndex, 0, rule);
	            importNodeIndex++;
	        } else {
	            ruleNodes.push(rule);
	        }
	    }
	    ruleNodes = charsetRuleNodes.concat(ruleNodes);

	    // If this is the root node, we don't render
	    // a selector, or {}.
	    if (!this.root) {
	        debugInfo = getDebugInfo(context, this, tabSetStr);

	        if (debugInfo) {
	            output.add(debugInfo);
	            output.add(tabSetStr);
	        }

	        var paths = this.paths, pathCnt = paths.length,
	            pathSubCnt;

	        sep = context.compress ? ',' : (',\n' + tabSetStr);

	        for (i = 0; i < pathCnt; i++) {
	            path = paths[i];
	            if (!(pathSubCnt = path.length)) { continue; }
	            if (i > 0) { output.add(sep); }

	            context.firstSelector = true;
	            path[0].genCSS(context, output);

	            context.firstSelector = false;
	            for (j = 1; j < pathSubCnt; j++) {
	                path[j].genCSS(context, output);
	            }
	        }

	        output.add((context.compress ? '{' : ' {\n') + tabRuleStr);
	    }

	    // Compile rules and rulesets
	    for (i = 0; i < ruleNodes.length; i++) {
	        rule = ruleNodes[i];

	        if (i + 1 === ruleNodes.length) {
	            context.lastRule = true;
	        }

	        var currentLastRule = context.lastRule;
	        if (isRulesetLikeNode(rule)) {
	            context.lastRule = false;
	        }

	        if (rule.genCSS) {
	            rule.genCSS(context, output);
	        } else if (rule.value) {
	            output.add(rule.value.toString());
	        }

	        context.lastRule = currentLastRule;

	        if (!context.lastRule) {
	            output.add(context.compress ? '' : ('\n' + tabRuleStr));
	        } else {
	            context.lastRule = false;
	        }
	    }

	    if (!this.root) {
	        output.add((context.compress ? '}' : '\n' + tabSetStr + '}'));
	        context.tabLevel--;
	    }

	    if (!output.isEmpty() && !context.compress && this.firstRoot) {
	        output.add('\n');
	    }
	};
	Ruleset.prototype.markReferenced = function () {
	    var s;
	    if (this.selectors) {
	        for (s = 0; s < this.selectors.length; s++) {
	            this.selectors[s].markReferenced();
	        }
	    }

	    if (this.rules) {
	        for (s = 0; s < this.rules.length; s++) {
	            if (this.rules[s].markReferenced) {
	                this.rules[s].markReferenced();
	            }
	        }
	    }
	};
	Ruleset.prototype.getIsReferenced = function() {
	    var i, j, path, selector;

	    if (this.paths) {
	        for (i = 0; i < this.paths.length; i++) {
	            path = this.paths[i];
	            for (j = 0; j < path.length; j++) {
	                if (path[j].getIsReferenced && path[j].getIsReferenced()) {
	                    return true;
	                }
	            }
	        }
	    }

	    if (this.selectors) {
	        for (i = 0; i < this.selectors.length; i++) {
	            selector = this.selectors[i];
	            if (selector.getIsReferenced && selector.getIsReferenced()) {
	                return true;
	            }
	        }
	    }
	    return false;
	};

	Ruleset.prototype.joinSelectors = function (paths, context, selectors) {
	    for (var s = 0; s < selectors.length; s++) {
	        this.joinSelector(paths, context, selectors[s]);
	    }
	};

	Ruleset.prototype.joinSelector = function (paths, context, selector) {

	    function createParenthesis(elementsToPak, originalElement) {
	        var replacementParen, j;
	        if (elementsToPak.length === 0) {
	            replacementParen = new Paren(elementsToPak[0]);
	        } else {
	            var insideParent = [];
	            for (j = 0; j < elementsToPak.length; j++) {
	                insideParent.push(new Element(null, elementsToPak[j], originalElement.index, originalElement.currentFileInfo));
	            }
	            replacementParen = new Paren(new Selector(insideParent));
	        }
	        return replacementParen;
	    }

	    function createSelector(containedElement, originalElement) {
	        var element, selector;
	        element = new Element(null, containedElement, originalElement.index, originalElement.currentFileInfo);
	        selector = new Selector([element]);
	        return selector;
	    }

	    // replace all parent selectors inside `inSelector` by content of `context` array
	    // resulting selectors are returned inside `paths` array
	    // returns true if `inSelector` contained at least one parent selector
	    function replaceParentSelector(paths, context, inSelector) {
	        // The paths are [[Selector]]
	        // The first list is a list of comma separated selectors
	        // The inner list is a list of inheritance separated selectors
	        // e.g.
	        // .a, .b {
	        //   .c {
	        //   }
	        // }
	        // == [[.a] [.c]] [[.b] [.c]]
	        //
	        var i, j, k, currentElements, newSelectors, selectorsMultiplied, sel, el, hadParentSelector = false, length, lastSelector;
	        function findNestedSelector(element) {
	            var maybeSelector;
	            if (element.value.type !== 'Paren') {
	                return null;
	            }

	            maybeSelector = element.value.value;
	            if (maybeSelector.type !== 'Selector') {
	                return null;
	            }

	            return maybeSelector;
	        }

	        // the elements from the current selector so far
	        currentElements = [];
	        // the current list of new selectors to add to the path.
	        // We will build it up. We initiate it with one empty selector as we "multiply" the new selectors
	        // by the parents
	        newSelectors = [
	            []
	        ];

	        for (i = 0; i < inSelector.elements.length; i++) {
	            el = inSelector.elements[i];
	            // non parent reference elements just get added
	            if (el.value !== "&") {
	                var nestedSelector = findNestedSelector(el);
	                if (nestedSelector != null) {
	                    // merge the current list of non parent selector elements
	                    // on to the current list of selectors to add
	                    mergeElementsOnToSelectors(currentElements, newSelectors);

	                    var nestedPaths = [], replaced, replacedNewSelectors = [];
	                    replaced = replaceParentSelector(nestedPaths, context, nestedSelector);
	                    hadParentSelector = hadParentSelector || replaced;
	                    //the nestedPaths array should have only one member - replaceParentSelector does not multiply selectors
	                    for (k = 0; k < nestedPaths.length; k++) {
	                        var replacementSelector = createSelector(createParenthesis(nestedPaths[k], el), el);
	                        addAllReplacementsIntoPath(newSelectors, [replacementSelector], el, inSelector, replacedNewSelectors);
	                    }
	                    newSelectors = replacedNewSelectors;
	                    currentElements = [];

	                } else {
	                    currentElements.push(el);
	                }

	            } else {
	                hadParentSelector = true;
	                // the new list of selectors to add
	                selectorsMultiplied = [];

	                // merge the current list of non parent selector elements
	                // on to the current list of selectors to add
	                mergeElementsOnToSelectors(currentElements, newSelectors);

	                // loop through our current selectors
	                for (j = 0; j < newSelectors.length; j++) {
	                    sel = newSelectors[j];
	                    // if we don't have any parent paths, the & might be in a mixin so that it can be used
	                    // whether there are parents or not
	                    if (context.length === 0) {
	                        // the combinator used on el should now be applied to the next element instead so that
	                        // it is not lost
	                        if (sel.length > 0) {
	                            sel[0].elements.push(new Element(el.combinator, '', el.index, el.currentFileInfo));
	                        }
	                        selectorsMultiplied.push(sel);
	                    }
	                    else {
	                        // and the parent selectors
	                        for (k = 0; k < context.length; k++) {
	                            // We need to put the current selectors
	                            // then join the last selector's elements on to the parents selectors
	                            var newSelectorPath = addReplacementIntoPath(sel, context[k], el, inSelector);
	                            // add that to our new set of selectors
	                            selectorsMultiplied.push(newSelectorPath);
	                        }
	                    }
	                }

	                // our new selectors has been multiplied, so reset the state
	                newSelectors = selectorsMultiplied;
	                currentElements = [];
	            }
	        }

	        // if we have any elements left over (e.g. .a& .b == .b)
	        // add them on to all the current selectors
	        mergeElementsOnToSelectors(currentElements, newSelectors);

	        for (i = 0; i < newSelectors.length; i++) {
	            length = newSelectors[i].length;
	            if (length > 0) {
	                paths.push(newSelectors[i]);
	                lastSelector = newSelectors[i][length - 1];
	                newSelectors[i][length - 1] = lastSelector.createDerived(lastSelector.elements, inSelector.extendList);
	            }
	        }

	        return hadParentSelector;
	    }

	    // joins selector path from `beginningPath` with selector path in `addPath`
	    // `replacedElement` contains element that is being replaced by `addPath`
	    // returns concatenated path
	    function addReplacementIntoPath(beginningPath, addPath, replacedElement, originalSelector) {
	        var newSelectorPath, lastSelector, newJoinedSelector;
	        // our new selector path
	        newSelectorPath = [];

	        //construct the joined selector - if & is the first thing this will be empty,
	        // if not newJoinedSelector will be the last set of elements in the selector
	        if (beginningPath.length > 0) {
	            newSelectorPath = beginningPath.slice(0);
	            lastSelector = newSelectorPath.pop();
	            newJoinedSelector = originalSelector.createDerived(lastSelector.elements.slice(0));
	        }
	        else {
	            newJoinedSelector = originalSelector.createDerived([]);
	        }

	        if (addPath.length > 0) {
	            // /deep/ is a combinator that is valid without anything in front of it
	            // so if the & does not have a combinator that is "" or " " then
	            // and there is a combinator on the parent, then grab that.
	            // this also allows + a { & .b { .a & { ... though not sure why you would want to do that
	            var combinator = replacedElement.combinator, parentEl = addPath[0].elements[0];
	            if (combinator.emptyOrWhitespace && !parentEl.combinator.emptyOrWhitespace) {
	                combinator = parentEl.combinator;
	            }
	            // join the elements so far with the first part of the parent
	            newJoinedSelector.elements.push(new Element(combinator, parentEl.value, replacedElement.index, replacedElement.currentFileInfo));
	            newJoinedSelector.elements = newJoinedSelector.elements.concat(addPath[0].elements.slice(1));
	        }

	        // now add the joined selector - but only if it is not empty
	        if (newJoinedSelector.elements.length !== 0) {
	            newSelectorPath.push(newJoinedSelector);
	        }

	        //put together the parent selectors after the join (e.g. the rest of the parent)
	        if (addPath.length > 1) {
	            newSelectorPath = newSelectorPath.concat(addPath.slice(1));
	        }
	        return newSelectorPath;
	    }

	    // joins selector path from `beginningPath` with every selector path in `addPaths` array
	    // `replacedElement` contains element that is being replaced by `addPath`
	    // returns array with all concatenated paths
	    function addAllReplacementsIntoPath( beginningPath, addPaths, replacedElement, originalSelector, result) {
	        var j;
	        for (j = 0; j < beginningPath.length; j++) {
	            var newSelectorPath = addReplacementIntoPath(beginningPath[j], addPaths, replacedElement, originalSelector);
	            result.push(newSelectorPath);
	        }
	        return result;
	    }

	    function mergeElementsOnToSelectors(elements, selectors) {
	        var i, sel;

	        if (elements.length === 0) {
	            return ;
	        }
	        if (selectors.length === 0) {
	            selectors.push([ new Selector(elements) ]);
	            return;
	        }

	        for (i = 0; i < selectors.length; i++) {
	            sel = selectors[i];

	            // if the previous thing in sel is a parent this needs to join on to it
	            if (sel.length > 0) {
	                sel[sel.length - 1] = sel[sel.length - 1].createDerived(sel[sel.length - 1].elements.concat(elements));
	            }
	            else {
	                sel.push(new Selector(elements));
	            }
	        }
	    }

	    // joinSelector code follows
	    var i, newPaths, hadParentSelector;

	    newPaths = [];
	    hadParentSelector = replaceParentSelector(newPaths, context, selector);

	    if (!hadParentSelector) {
	        if (context.length > 0) {
	            newPaths = [];
	            for (i = 0; i < context.length; i++) {
	                newPaths.push(context[i].concat(selector));
	            }
	        }
	        else {
	            newPaths = [[selector]];
	        }
	    }

	    for (i = 0; i < newPaths.length; i++) {
	        paths.push(newPaths[i]);
	    }

	};
	module.exports = Ruleset;

	},{"../contexts":10,"../functions/default":19,"../functions/function-registry":21,"./debug-info":53,"./element":57,"./node":69,"./paren":71,"./rule":73,"./selector":76}],76:[function(require,module,exports){
	var Node = require("./node"),
	    Element = require("./element");

	var Selector = function (elements, extendList, condition, index, currentFileInfo, isReferenced) {
	    this.elements = elements;
	    this.extendList = extendList;
	    this.condition = condition;
	    this.currentFileInfo = currentFileInfo || {};
	    this.isReferenced = isReferenced;
	    if (!condition) {
	        this.evaldCondition = true;
	    }
	};
	Selector.prototype = new Node();
	Selector.prototype.type = "Selector";
	Selector.prototype.accept = function (visitor) {
	    if (this.elements) {
	        this.elements = visitor.visitArray(this.elements);
	    }
	    if (this.extendList) {
	        this.extendList = visitor.visitArray(this.extendList);
	    }
	    if (this.condition) {
	        this.condition = visitor.visit(this.condition);
	    }
	};
	Selector.prototype.createDerived = function(elements, extendList, evaldCondition) {
	    evaldCondition = (evaldCondition != null) ? evaldCondition : this.evaldCondition;
	    var newSelector = new Selector(elements, extendList || this.extendList, null, this.index, this.currentFileInfo, this.isReferenced);
	    newSelector.evaldCondition = evaldCondition;
	    newSelector.mediaEmpty = this.mediaEmpty;
	    return newSelector;
	};
	Selector.prototype.createEmptySelectors = function() {
	    var el = new Element('', '&', this.index, this.currentFileInfo),
	        sels = [new Selector([el], null, null, this.index, this.currentFileInfo)];
	    sels[0].mediaEmpty = true;
	    return sels;
	};
	Selector.prototype.match = function (other) {
	    var elements = this.elements,
	        len = elements.length,
	        olen, i;

	    other.CacheElements();

	    olen = other._elements.length;
	    if (olen === 0 || len < olen) {
	        return 0;
	    } else {
	        for (i = 0; i < olen; i++) {
	            if (elements[i].value !== other._elements[i]) {
	                return 0;
	            }
	        }
	    }

	    return olen; // return number of matched elements
	};
	Selector.prototype.CacheElements = function() {
	    if (this._elements) {
	        return;
	    }

	    var elements = this.elements.map( function(v) {
	        return v.combinator.value + (v.value.value || v.value);
	    }).join("").match(/[,&#\*\.\w-]([\w-]|(\\.))*/g);

	    if (elements) {
	        if (elements[0] === "&") {
	            elements.shift();
	        }
	    } else {
	        elements = [];
	    }

	    this._elements = elements;
	};
	Selector.prototype.isJustParentSelector = function() {
	    return !this.mediaEmpty &&
	        this.elements.length === 1 &&
	        this.elements[0].value === '&' &&
	        (this.elements[0].combinator.value === ' ' || this.elements[0].combinator.value === '');
	};
	Selector.prototype.eval = function (context) {
	    var evaldCondition = this.condition && this.condition.eval(context),
	        elements = this.elements, extendList = this.extendList;

	    elements = elements && elements.map(function (e) { return e.eval(context); });
	    extendList = extendList && extendList.map(function(extend) { return extend.eval(context); });

	    return this.createDerived(elements, extendList, evaldCondition);
	};
	Selector.prototype.genCSS = function (context, output) {
	    var i, element;
	    if ((!context || !context.firstSelector) && this.elements[0].combinator.value === "") {
	        output.add(' ', this.currentFileInfo, this.index);
	    }
	    if (!this._css) {
	        //TODO caching? speed comparison?
	        for (i = 0; i < this.elements.length; i++) {
	            element = this.elements[i];
	            element.genCSS(context, output);
	        }
	    }
	};
	Selector.prototype.markReferenced = function () {
	    this.isReferenced = true;
	};
	Selector.prototype.getIsReferenced = function() {
	    return !this.currentFileInfo.reference || this.isReferenced;
	};
	Selector.prototype.getIsOutput = function() {
	    return this.evaldCondition;
	};
	module.exports = Selector;

	},{"./element":57,"./node":69}],77:[function(require,module,exports){
	var Node = require("./node");

	var UnicodeDescriptor = function (value) {
	    this.value = value;
	};
	UnicodeDescriptor.prototype = new Node();
	UnicodeDescriptor.prototype.type = "UnicodeDescriptor";

	module.exports = UnicodeDescriptor;

	},{"./node":69}],78:[function(require,module,exports){
	var Node = require("./node"),
	    unitConversions = require("../data/unit-conversions");

	var Unit = function (numerator, denominator, backupUnit) {
	    this.numerator = numerator ? numerator.slice(0).sort() : [];
	    this.denominator = denominator ? denominator.slice(0).sort() : [];
	    if (backupUnit) {
	        this.backupUnit = backupUnit;
	    } else if (numerator && numerator.length) {
	        this.backupUnit = numerator[0];
	    }
	};

	Unit.prototype = new Node();
	Unit.prototype.type = "Unit";
	Unit.prototype.clone = function () {
	    return new Unit(this.numerator.slice(0), this.denominator.slice(0), this.backupUnit);
	};
	Unit.prototype.genCSS = function (context, output) {
	    // Dimension checks the unit is singular and throws an error if in strict math mode.
	    var strictUnits = context && context.strictUnits;
	    if (this.numerator.length === 1) {
	        output.add(this.numerator[0]); // the ideal situation
	    } else if (!strictUnits && this.backupUnit) {
	        output.add(this.backupUnit);
	    } else if (!strictUnits && this.denominator.length) {
	        output.add(this.denominator[0]);
	    }
	};
	Unit.prototype.toString = function () {
	    var i, returnStr = this.numerator.join("*");
	    for (i = 0; i < this.denominator.length; i++) {
	        returnStr += "/" + this.denominator[i];
	    }
	    return returnStr;
	};
	Unit.prototype.compare = function (other) {
	    return this.is(other.toString()) ? 0 : undefined;
	};
	Unit.prototype.is = function (unitString) {
	    return this.toString().toUpperCase() === unitString.toUpperCase();
	};
	Unit.prototype.isLength = function () {
	    return Boolean(this.toCSS().match(/px|em|%|in|cm|mm|pc|pt|ex/));
	};
	Unit.prototype.isEmpty = function () {
	    return this.numerator.length === 0 && this.denominator.length === 0;
	};
	Unit.prototype.isSingular = function() {
	    return this.numerator.length <= 1 && this.denominator.length === 0;
	};
	Unit.prototype.map = function(callback) {
	    var i;

	    for (i = 0; i < this.numerator.length; i++) {
	        this.numerator[i] = callback(this.numerator[i], false);
	    }

	    for (i = 0; i < this.denominator.length; i++) {
	        this.denominator[i] = callback(this.denominator[i], true);
	    }
	};
	Unit.prototype.usedUnits = function() {
	    var group, result = {}, mapUnit;

	    mapUnit = function (atomicUnit) {
	        /*jshint loopfunc:true */
	        if (group.hasOwnProperty(atomicUnit) && !result[groupName]) {
	            result[groupName] = atomicUnit;
	        }

	        return atomicUnit;
	    };

	    for (var groupName in unitConversions) {
	        if (unitConversions.hasOwnProperty(groupName)) {
	            group = unitConversions[groupName];

	            this.map(mapUnit);
	        }
	    }

	    return result;
	};
	Unit.prototype.cancel = function () {
	    var counter = {}, atomicUnit, i;

	    for (i = 0; i < this.numerator.length; i++) {
	        atomicUnit = this.numerator[i];
	        counter[atomicUnit] = (counter[atomicUnit] || 0) + 1;
	    }

	    for (i = 0; i < this.denominator.length; i++) {
	        atomicUnit = this.denominator[i];
	        counter[atomicUnit] = (counter[atomicUnit] || 0) - 1;
	    }

	    this.numerator = [];
	    this.denominator = [];

	    for (atomicUnit in counter) {
	        if (counter.hasOwnProperty(atomicUnit)) {
	            var count = counter[atomicUnit];

	            if (count > 0) {
	                for (i = 0; i < count; i++) {
	                    this.numerator.push(atomicUnit);
	                }
	            } else if (count < 0) {
	                for (i = 0; i < -count; i++) {
	                    this.denominator.push(atomicUnit);
	                }
	            }
	        }
	    }

	    this.numerator.sort();
	    this.denominator.sort();
	};
	module.exports = Unit;

	},{"../data/unit-conversions":13,"./node":69}],79:[function(require,module,exports){
	var Node = require("./node");

	var URL = function (val, index, currentFileInfo, isEvald) {
	    this.value = val;
	    this.currentFileInfo = currentFileInfo;
	    this.index = index;
	    this.isEvald = isEvald;
	};
	URL.prototype = new Node();
	URL.prototype.type = "Url";
	URL.prototype.accept = function (visitor) {
	    this.value = visitor.visit(this.value);
	};
	URL.prototype.genCSS = function (context, output) {
	    output.add("url(");
	    this.value.genCSS(context, output);
	    output.add(")");
	};
	URL.prototype.eval = function (context) {
	    var val = this.value.eval(context),
	        rootpath;

	    if (!this.isEvald) {
	        // Add the base path if the URL is relative
	        rootpath = this.currentFileInfo && this.currentFileInfo.rootpath;
	        if (rootpath &&
	            typeof val.value === "string" &&
	            context.isPathRelative(val.value)) {

	            if (!val.quote) {
	                rootpath = rootpath.replace(/[\(\)'"\s]/g, function(match) { return "\\" + match; });
	            }
	            val.value = rootpath + val.value;
	        }

	        val.value = context.normalizePath(val.value);

	        // Add url args if enabled
	        if (context.urlArgs) {
	            if (!val.value.match(/^\s*data:/)) {
	                var delimiter = val.value.indexOf('?') === -1 ? '?' : '&';
	                var urlArgs = delimiter + context.urlArgs;
	                if (val.value.indexOf('#') !== -1) {
	                    val.value = val.value.replace('#', urlArgs + '#');
	                } else {
	                    val.value += urlArgs;
	                }
	            }
	        }
	    }

	    return new URL(val, this.index, this.currentFileInfo, true);
	};
	module.exports = URL;

	},{"./node":69}],80:[function(require,module,exports){
	var Node = require("./node");

	var Value = function (value) {
	    this.value = value;
	    if (!value) {
	        throw new Error("Value requires an array argument");
	    }
	};
	Value.prototype = new Node();
	Value.prototype.type = "Value";
	Value.prototype.accept = function (visitor) {
	    if (this.value) {
	        this.value = visitor.visitArray(this.value);
	    }
	};
	Value.prototype.eval = function (context) {
	    if (this.value.length === 1) {
	        return this.value[0].eval(context);
	    } else {
	        return new Value(this.value.map(function (v) {
	            return v.eval(context);
	        }));
	    }
	};
	Value.prototype.genCSS = function (context, output) {
	    var i;
	    for (i = 0; i < this.value.length; i++) {
	        this.value[i].genCSS(context, output);
	        if (i + 1 < this.value.length) {
	            output.add((context && context.compress) ? ',' : ', ');
	        }
	    }
	};
	module.exports = Value;

	},{"./node":69}],81:[function(require,module,exports){
	var Node = require("./node");

	var Variable = function (name, index, currentFileInfo) {
	    this.name = name;
	    this.index = index;
	    this.currentFileInfo = currentFileInfo || {};
	};
	Variable.prototype = new Node();
	Variable.prototype.type = "Variable";
	Variable.prototype.eval = function (context) {
	    var variable, name = this.name;

	    if (name.indexOf('@@') === 0) {
	        name = '@' + new Variable(name.slice(1), this.index, this.currentFileInfo).eval(context).value;
	    }

	    if (this.evaluating) {
	        throw { type: 'Name',
	                message: "Recursive variable definition for " + name,
	                filename: this.currentFileInfo.filename,
	                index: this.index };
	    }

	    this.evaluating = true;

	    variable = this.find(context.frames, function (frame) {
	        var v = frame.variable(name);
	        if (v) {
	            if (v.important) {
	                var importantScope = context.importantScope[context.importantScope.length - 1];
	                importantScope.important = v.important;
	            }
	            return v.value.eval(context);
	        }
	    });
	    if (variable) {
	        this.evaluating = false;
	        return variable;
	    } else {
	        throw { type: 'Name',
	                message: "variable " + name + " is undefined",
	                filename: this.currentFileInfo.filename,
	                index: this.index };
	    }
	};
	Variable.prototype.find = function (obj, fun) {
	    for (var i = 0, r; i < obj.length; i++) {
	        r = fun.call(obj, obj[i]);
	        if (r) { return r; }
	    }
	    return null;
	};
	module.exports = Variable;

	},{"./node":69}],82:[function(require,module,exports){
	module.exports = {
	    getLocation: function(index, inputStream) {
	        var n = index + 1,
	            line = null,
	            column = -1;

	        while (--n >= 0 && inputStream.charAt(n) !== '\n') {
	            column++;
	        }

	        if (typeof index === 'number') {
	            line = (inputStream.slice(0, index).match(/\n/g) || "").length;
	        }

	        return {
	            line: line,
	            column: column
	        };
	    }
	};

	},{}],83:[function(require,module,exports){
	var tree = require("../tree"),
	    Visitor = require("./visitor"),
	    logger = require("../logger");

	/*jshint loopfunc:true */

	var ExtendFinderVisitor = function() {
	    this._visitor = new Visitor(this);
	    this.contexts = [];
	    this.allExtendsStack = [[]];
	};

	ExtendFinderVisitor.prototype = {
	    run: function (root) {
	        root = this._visitor.visit(root);
	        root.allExtends = this.allExtendsStack[0];
	        return root;
	    },
	    visitRule: function (ruleNode, visitArgs) {
	        visitArgs.visitDeeper = false;
	    },
	    visitMixinDefinition: function (mixinDefinitionNode, visitArgs) {
	        visitArgs.visitDeeper = false;
	    },
	    visitRuleset: function (rulesetNode, visitArgs) {
	        if (rulesetNode.root) {
	            return;
	        }

	        var i, j, extend, allSelectorsExtendList = [], extendList;

	        // get &:extend(.a); rules which apply to all selectors in this ruleset
	        var rules = rulesetNode.rules, ruleCnt = rules ? rules.length : 0;
	        for (i = 0; i < ruleCnt; i++) {
	            if (rulesetNode.rules[i] instanceof tree.Extend) {
	                allSelectorsExtendList.push(rules[i]);
	                rulesetNode.extendOnEveryPath = true;
	            }
	        }

	        // now find every selector and apply the extends that apply to all extends
	        // and the ones which apply to an individual extend
	        var paths = rulesetNode.paths;
	        for (i = 0; i < paths.length; i++) {
	            var selectorPath = paths[i],
	                selector = selectorPath[selectorPath.length - 1],
	                selExtendList = selector.extendList;

	            extendList = selExtendList ? selExtendList.slice(0).concat(allSelectorsExtendList)
	                                       : allSelectorsExtendList;

	            if (extendList) {
	                extendList = extendList.map(function(allSelectorsExtend) {
	                    return allSelectorsExtend.clone();
	                });
	            }

	            for (j = 0; j < extendList.length; j++) {
	                this.foundExtends = true;
	                extend = extendList[j];
	                extend.findSelfSelectors(selectorPath);
	                extend.ruleset = rulesetNode;
	                if (j === 0) { extend.firstExtendOnThisSelectorPath = true; }
	                this.allExtendsStack[this.allExtendsStack.length - 1].push(extend);
	            }
	        }

	        this.contexts.push(rulesetNode.selectors);
	    },
	    visitRulesetOut: function (rulesetNode) {
	        if (!rulesetNode.root) {
	            this.contexts.length = this.contexts.length - 1;
	        }
	    },
	    visitMedia: function (mediaNode, visitArgs) {
	        mediaNode.allExtends = [];
	        this.allExtendsStack.push(mediaNode.allExtends);
	    },
	    visitMediaOut: function (mediaNode) {
	        this.allExtendsStack.length = this.allExtendsStack.length - 1;
	    },
	    visitDirective: function (directiveNode, visitArgs) {
	        directiveNode.allExtends = [];
	        this.allExtendsStack.push(directiveNode.allExtends);
	    },
	    visitDirectiveOut: function (directiveNode) {
	        this.allExtendsStack.length = this.allExtendsStack.length - 1;
	    }
	};

	var ProcessExtendsVisitor = function() {
	    this._visitor = new Visitor(this);
	};

	ProcessExtendsVisitor.prototype = {
	    run: function(root) {
	        var extendFinder = new ExtendFinderVisitor();
	        this.extendIndicies = {};
	        extendFinder.run(root);
	        if (!extendFinder.foundExtends) { return root; }
	        root.allExtends = root.allExtends.concat(this.doExtendChaining(root.allExtends, root.allExtends));
	        this.allExtendsStack = [root.allExtends];
	        var newRoot = this._visitor.visit(root);
	        this.checkExtendsForNonMatched(root.allExtends);
	        return newRoot;
	    },
	    checkExtendsForNonMatched: function(extendList) {
	        var indicies = this.extendIndicies;
	        extendList.filter(function(extend) {
	            return !extend.hasFoundMatches && extend.parent_ids.length == 1;
	        }).forEach(function(extend) {
	                var selector = "_unknown_";
	                try {
	                    selector = extend.selector.toCSS({});
	                }
	                catch(_) {}

	                if (!indicies[extend.index + ' ' + selector]) {
	                    indicies[extend.index + ' ' + selector] = true;
	                    logger.warn("extend '" + selector + "' has no matches");
	                }
	            });
	    },
	    doExtendChaining: function (extendsList, extendsListTarget, iterationCount) {
	        //
	        // chaining is different from normal extension.. if we extend an extend then we are not just copying, altering
	        // and pasting the selector we would do normally, but we are also adding an extend with the same target selector
	        // this means this new extend can then go and alter other extends
	        //
	        // this method deals with all the chaining work - without it, extend is flat and doesn't work on other extend selectors
	        // this is also the most expensive.. and a match on one selector can cause an extension of a selector we had already
	        // processed if we look at each selector at a time, as is done in visitRuleset

	        var extendIndex, targetExtendIndex, matches, extendsToAdd = [], newSelector, extendVisitor = this, selectorPath,
	            extend, targetExtend, newExtend;

	        iterationCount = iterationCount || 0;

	        //loop through comparing every extend with every target extend.
	        // a target extend is the one on the ruleset we are looking at copy/edit/pasting in place
	        // e.g.  .a:extend(.b) {}  and .b:extend(.c) {} then the first extend extends the second one
	        // and the second is the target.
	        // the seperation into two lists allows us to process a subset of chains with a bigger set, as is the
	        // case when processing media queries
	        for (extendIndex = 0; extendIndex < extendsList.length; extendIndex++) {
	            for (targetExtendIndex = 0; targetExtendIndex < extendsListTarget.length; targetExtendIndex++) {

	                extend = extendsList[extendIndex];
	                targetExtend = extendsListTarget[targetExtendIndex];

	                // look for circular references
	                if ( extend.parent_ids.indexOf( targetExtend.object_id ) >= 0 ) { continue; }

	                // find a match in the target extends self selector (the bit before :extend)
	                selectorPath = [targetExtend.selfSelectors[0]];
	                matches = extendVisitor.findMatch(extend, selectorPath);

	                if (matches.length) {

	                    extend.hasFoundMatches = true;

	                    // we found a match, so for each self selector..
	                    extend.selfSelectors.forEach(function(selfSelector) {

	                        // process the extend as usual
	                        newSelector = extendVisitor.extendSelector(matches, selectorPath, selfSelector);

	                        // but now we create a new extend from it
	                        newExtend = new(tree.Extend)(targetExtend.selector, targetExtend.option, 0);
	                        newExtend.selfSelectors = newSelector;

	                        // add the extend onto the list of extends for that selector
	                        newSelector[newSelector.length - 1].extendList = [newExtend];

	                        // record that we need to add it.
	                        extendsToAdd.push(newExtend);
	                        newExtend.ruleset = targetExtend.ruleset;

	                        //remember its parents for circular references
	                        newExtend.parent_ids = newExtend.parent_ids.concat(targetExtend.parent_ids, extend.parent_ids);

	                        // only process the selector once.. if we have :extend(.a,.b) then multiple
	                        // extends will look at the same selector path, so when extending
	                        // we know that any others will be duplicates in terms of what is added to the css
	                        if (targetExtend.firstExtendOnThisSelectorPath) {
	                            newExtend.firstExtendOnThisSelectorPath = true;
	                            targetExtend.ruleset.paths.push(newSelector);
	                        }
	                    });
	                }
	            }
	        }

	        if (extendsToAdd.length) {
	            // try to detect circular references to stop a stack overflow.
	            // may no longer be needed.
	            this.extendChainCount++;
	            if (iterationCount > 100) {
	                var selectorOne = "{unable to calculate}";
	                var selectorTwo = "{unable to calculate}";
	                try {
	                    selectorOne = extendsToAdd[0].selfSelectors[0].toCSS();
	                    selectorTwo = extendsToAdd[0].selector.toCSS();
	                }
	                catch(e) {}
	                throw { message: "extend circular reference detected. One of the circular extends is currently:" +
	                    selectorOne + ":extend(" + selectorTwo + ")"};
	            }

	            // now process the new extends on the existing rules so that we can handle a extending b extending c extending
	            // d extending e...
	            return extendsToAdd.concat(extendVisitor.doExtendChaining(extendsToAdd, extendsListTarget, iterationCount + 1));
	        } else {
	            return extendsToAdd;
	        }
	    },
	    visitRule: function (ruleNode, visitArgs) {
	        visitArgs.visitDeeper = false;
	    },
	    visitMixinDefinition: function (mixinDefinitionNode, visitArgs) {
	        visitArgs.visitDeeper = false;
	    },
	    visitSelector: function (selectorNode, visitArgs) {
	        visitArgs.visitDeeper = false;
	    },
	    visitRuleset: function (rulesetNode, visitArgs) {
	        if (rulesetNode.root) {
	            return;
	        }
	        var matches, pathIndex, extendIndex, allExtends = this.allExtendsStack[this.allExtendsStack.length - 1],
	            selectorsToAdd = [], extendVisitor = this, selectorPath;

	        // look at each selector path in the ruleset, find any extend matches and then copy, find and replace

	        for (extendIndex = 0; extendIndex < allExtends.length; extendIndex++) {
	            for (pathIndex = 0; pathIndex < rulesetNode.paths.length; pathIndex++) {
	                selectorPath = rulesetNode.paths[pathIndex];

	                // extending extends happens initially, before the main pass
	                if (rulesetNode.extendOnEveryPath) { continue; }
	                var extendList = selectorPath[selectorPath.length - 1].extendList;
	                if (extendList && extendList.length) { continue; }

	                matches = this.findMatch(allExtends[extendIndex], selectorPath);

	                if (matches.length) {
	                    allExtends[extendIndex].hasFoundMatches = true;

	                    allExtends[extendIndex].selfSelectors.forEach(function(selfSelector) {
	                        selectorsToAdd.push(extendVisitor.extendSelector(matches, selectorPath, selfSelector));
	                    });
	                }
	            }
	        }
	        rulesetNode.paths = rulesetNode.paths.concat(selectorsToAdd);
	    },
	    findMatch: function (extend, haystackSelectorPath) {
	        //
	        // look through the haystack selector path to try and find the needle - extend.selector
	        // returns an array of selector matches that can then be replaced
	        //
	        var haystackSelectorIndex, hackstackSelector, hackstackElementIndex, haystackElement,
	            targetCombinator, i,
	            extendVisitor = this,
	            needleElements = extend.selector.elements,
	            potentialMatches = [], potentialMatch, matches = [];

	        // loop through the haystack elements
	        for (haystackSelectorIndex = 0; haystackSelectorIndex < haystackSelectorPath.length; haystackSelectorIndex++) {
	            hackstackSelector = haystackSelectorPath[haystackSelectorIndex];

	            for (hackstackElementIndex = 0; hackstackElementIndex < hackstackSelector.elements.length; hackstackElementIndex++) {

	                haystackElement = hackstackSelector.elements[hackstackElementIndex];

	                // if we allow elements before our match we can add a potential match every time. otherwise only at the first element.
	                if (extend.allowBefore || (haystackSelectorIndex === 0 && hackstackElementIndex === 0)) {
	                    potentialMatches.push({pathIndex: haystackSelectorIndex, index: hackstackElementIndex, matched: 0,
	                        initialCombinator: haystackElement.combinator});
	                }

	                for (i = 0; i < potentialMatches.length; i++) {
	                    potentialMatch = potentialMatches[i];

	                    // selectors add " " onto the first element. When we use & it joins the selectors together, but if we don't
	                    // then each selector in haystackSelectorPath has a space before it added in the toCSS phase. so we need to
	                    // work out what the resulting combinator will be
	                    targetCombinator = haystackElement.combinator.value;
	                    if (targetCombinator === '' && hackstackElementIndex === 0) {
	                        targetCombinator = ' ';
	                    }

	                    // if we don't match, null our match to indicate failure
	                    if (!extendVisitor.isElementValuesEqual(needleElements[potentialMatch.matched].value, haystackElement.value) ||
	                        (potentialMatch.matched > 0 && needleElements[potentialMatch.matched].combinator.value !== targetCombinator)) {
	                        potentialMatch = null;
	                    } else {
	                        potentialMatch.matched++;
	                    }

	                    // if we are still valid and have finished, test whether we have elements after and whether these are allowed
	                    if (potentialMatch) {
	                        potentialMatch.finished = potentialMatch.matched === needleElements.length;
	                        if (potentialMatch.finished &&
	                            (!extend.allowAfter &&
	                                (hackstackElementIndex + 1 < hackstackSelector.elements.length || haystackSelectorIndex + 1 < haystackSelectorPath.length))) {
	                            potentialMatch = null;
	                        }
	                    }
	                    // if null we remove, if not, we are still valid, so either push as a valid match or continue
	                    if (potentialMatch) {
	                        if (potentialMatch.finished) {
	                            potentialMatch.length = needleElements.length;
	                            potentialMatch.endPathIndex = haystackSelectorIndex;
	                            potentialMatch.endPathElementIndex = hackstackElementIndex + 1; // index after end of match
	                            potentialMatches.length = 0; // we don't allow matches to overlap, so start matching again
	                            matches.push(potentialMatch);
	                        }
	                    } else {
	                        potentialMatches.splice(i, 1);
	                        i--;
	                    }
	                }
	            }
	        }
	        return matches;
	    },
	    isElementValuesEqual: function(elementValue1, elementValue2) {
	        if (typeof elementValue1 === "string" || typeof elementValue2 === "string") {
	            return elementValue1 === elementValue2;
	        }
	        if (elementValue1 instanceof tree.Attribute) {
	            if (elementValue1.op !== elementValue2.op || elementValue1.key !== elementValue2.key) {
	                return false;
	            }
	            if (!elementValue1.value || !elementValue2.value) {
	                if (elementValue1.value || elementValue2.value) {
	                    return false;
	                }
	                return true;
	            }
	            elementValue1 = elementValue1.value.value || elementValue1.value;
	            elementValue2 = elementValue2.value.value || elementValue2.value;
	            return elementValue1 === elementValue2;
	        }
	        elementValue1 = elementValue1.value;
	        elementValue2 = elementValue2.value;
	        if (elementValue1 instanceof tree.Selector) {
	            if (!(elementValue2 instanceof tree.Selector) || elementValue1.elements.length !== elementValue2.elements.length) {
	                return false;
	            }
	            for (var i = 0; i  < elementValue1.elements.length; i++) {
	                if (elementValue1.elements[i].combinator.value !== elementValue2.elements[i].combinator.value) {
	                    if (i !== 0 || (elementValue1.elements[i].combinator.value || ' ') !== (elementValue2.elements[i].combinator.value || ' ')) {
	                        return false;
	                    }
	                }
	                if (!this.isElementValuesEqual(elementValue1.elements[i].value, elementValue2.elements[i].value)) {
	                    return false;
	                }
	            }
	            return true;
	        }
	        return false;
	    },
	    extendSelector:function (matches, selectorPath, replacementSelector) {

	        //for a set of matches, replace each match with the replacement selector

	        var currentSelectorPathIndex = 0,
	            currentSelectorPathElementIndex = 0,
	            path = [],
	            matchIndex,
	            selector,
	            firstElement,
	            match,
	            newElements;

	        for (matchIndex = 0; matchIndex < matches.length; matchIndex++) {
	            match = matches[matchIndex];
	            selector = selectorPath[match.pathIndex];
	            firstElement = new tree.Element(
	                match.initialCombinator,
	                replacementSelector.elements[0].value,
	                replacementSelector.elements[0].index,
	                replacementSelector.elements[0].currentFileInfo
	            );

	            if (match.pathIndex > currentSelectorPathIndex && currentSelectorPathElementIndex > 0) {
	                path[path.length - 1].elements = path[path.length - 1]
	                    .elements.concat(selectorPath[currentSelectorPathIndex].elements.slice(currentSelectorPathElementIndex));
	                currentSelectorPathElementIndex = 0;
	                currentSelectorPathIndex++;
	            }

	            newElements = selector.elements
	                .slice(currentSelectorPathElementIndex, match.index)
	                .concat([firstElement])
	                .concat(replacementSelector.elements.slice(1));

	            if (currentSelectorPathIndex === match.pathIndex && matchIndex > 0) {
	                path[path.length - 1].elements =
	                    path[path.length - 1].elements.concat(newElements);
	            } else {
	                path = path.concat(selectorPath.slice(currentSelectorPathIndex, match.pathIndex));

	                path.push(new tree.Selector(
	                    newElements
	                ));
	            }
	            currentSelectorPathIndex = match.endPathIndex;
	            currentSelectorPathElementIndex = match.endPathElementIndex;
	            if (currentSelectorPathElementIndex >= selectorPath[currentSelectorPathIndex].elements.length) {
	                currentSelectorPathElementIndex = 0;
	                currentSelectorPathIndex++;
	            }
	        }

	        if (currentSelectorPathIndex < selectorPath.length && currentSelectorPathElementIndex > 0) {
	            path[path.length - 1].elements = path[path.length - 1]
	                .elements.concat(selectorPath[currentSelectorPathIndex].elements.slice(currentSelectorPathElementIndex));
	            currentSelectorPathIndex++;
	        }

	        path = path.concat(selectorPath.slice(currentSelectorPathIndex, selectorPath.length));

	        return path;
	    },
	    visitRulesetOut: function (rulesetNode) {
	    },
	    visitMedia: function (mediaNode, visitArgs) {
	        var newAllExtends = mediaNode.allExtends.concat(this.allExtendsStack[this.allExtendsStack.length - 1]);
	        newAllExtends = newAllExtends.concat(this.doExtendChaining(newAllExtends, mediaNode.allExtends));
	        this.allExtendsStack.push(newAllExtends);
	    },
	    visitMediaOut: function (mediaNode) {
	        var lastIndex = this.allExtendsStack.length - 1;
	        this.allExtendsStack.length = lastIndex;
	    },
	    visitDirective: function (directiveNode, visitArgs) {
	        var newAllExtends = directiveNode.allExtends.concat(this.allExtendsStack[this.allExtendsStack.length - 1]);
	        newAllExtends = newAllExtends.concat(this.doExtendChaining(newAllExtends, directiveNode.allExtends));
	        this.allExtendsStack.push(newAllExtends);
	    },
	    visitDirectiveOut: function (directiveNode) {
	        var lastIndex = this.allExtendsStack.length - 1;
	        this.allExtendsStack.length = lastIndex;
	    }
	};

	module.exports = ProcessExtendsVisitor;

	},{"../logger":32,"../tree":61,"./visitor":89}],84:[function(require,module,exports){
	function ImportSequencer(onSequencerEmpty) {
	    this.imports = [];
	    this.variableImports = [];
	    this._onSequencerEmpty = onSequencerEmpty;
	    this._currentDepth = 0;
	}

	ImportSequencer.prototype.addImport = function(callback) {
	    var importSequencer = this,
	        importItem = {
	            callback: callback,
	            args: null,
	            isReady: false
	        };
	    this.imports.push(importItem);
	    return function() {
	        importItem.args = Array.prototype.slice.call(arguments, 0);
	        importItem.isReady = true;
	        importSequencer.tryRun();
	    };
	};

	ImportSequencer.prototype.addVariableImport = function(callback) {
	    this.variableImports.push(callback);
	};

	ImportSequencer.prototype.tryRun = function() {
	    this._currentDepth++;
	    try {
	        while (true) {
	            while (this.imports.length > 0) {
	                var importItem = this.imports[0];
	                if (!importItem.isReady) {
	                    return;
	                }
	                this.imports = this.imports.slice(1);
	                importItem.callback.apply(null, importItem.args);
	            }
	            if (this.variableImports.length === 0) {
	                break;
	            }
	            var variableImport = this.variableImports[0];
	            this.variableImports = this.variableImports.slice(1);
	            variableImport();
	        }
	    } finally {
	        this._currentDepth--;
	    }
	    if (this._currentDepth === 0 && this._onSequencerEmpty) {
	        this._onSequencerEmpty();
	    }
	};

	module.exports = ImportSequencer;

	},{}],85:[function(require,module,exports){
	var contexts = require("../contexts"),
	    Visitor = require("./visitor"),
	    ImportSequencer = require("./import-sequencer");

	var ImportVisitor = function(importer, finish) {

	    this._visitor = new Visitor(this);
	    this._importer = importer;
	    this._finish = finish;
	    this.context = new contexts.Eval();
	    this.importCount = 0;
	    this.onceFileDetectionMap = {};
	    this.recursionDetector = {};
	    this._sequencer = new ImportSequencer(this._onSequencerEmpty.bind(this));
	};

	ImportVisitor.prototype = {
	    isReplacing: false,
	    run: function (root) {
	        try {
	            // process the contents
	            this._visitor.visit(root);
	        }
	        catch(e) {
	            this.error = e;
	        }

	        this.isFinished = true;
	        this._sequencer.tryRun();
	    },
	    _onSequencerEmpty: function() {
	        if (!this.isFinished) {
	            return;
	        }
	        this._finish(this.error);
	    },
	    visitImport: function (importNode, visitArgs) {
	        var inlineCSS = importNode.options.inline;

	        if (!importNode.css || inlineCSS) {

	            var context = new contexts.Eval(this.context, this.context.frames.slice(0));
	            var importParent = context.frames[0];

	            this.importCount++;
	            if (importNode.isVariableImport()) {
	                this._sequencer.addVariableImport(this.processImportNode.bind(this, importNode, context, importParent));
	            } else {
	                this.processImportNode(importNode, context, importParent);
	            }
	        }
	        visitArgs.visitDeeper = false;
	    },
	    processImportNode: function(importNode, context, importParent) {
	        var evaldImportNode,
	            inlineCSS = importNode.options.inline;

	        try {
	            evaldImportNode = importNode.evalForImport(context);
	        } catch(e) {
	            if (!e.filename) { e.index = importNode.index; e.filename = importNode.currentFileInfo.filename; }
	            // attempt to eval properly and treat as css
	            importNode.css = true;
	            // if that fails, this error will be thrown
	            importNode.error = e;
	        }

	        if (evaldImportNode && (!evaldImportNode.css || inlineCSS)) {

	            if (evaldImportNode.options.multiple) {
	                context.importMultiple = true;
	            }

	            // try appending if we haven't determined if it is css or not
	            var tryAppendLessExtension = evaldImportNode.css === undefined;

	            for (var i = 0; i < importParent.rules.length; i++) {
	                if (importParent.rules[i] === importNode) {
	                    importParent.rules[i] = evaldImportNode;
	                    break;
	                }
	            }

	            var onImported = this.onImported.bind(this, evaldImportNode, context),
	                sequencedOnImported = this._sequencer.addImport(onImported);

	            this._importer.push(evaldImportNode.getPath(), tryAppendLessExtension, evaldImportNode.currentFileInfo,
	                evaldImportNode.options, sequencedOnImported);
	        } else {
	            this.importCount--;
	            if (this.isFinished) {
	                this._sequencer.tryRun();
	            }
	        }
	    },
	    onImported: function (importNode, context, e, root, importedAtRoot, fullPath) {
	        if (e) {
	            if (!e.filename) {
	                e.index = importNode.index; e.filename = importNode.currentFileInfo.filename;
	            }
	            this.error = e;
	        }

	        var importVisitor = this,
	            inlineCSS = importNode.options.inline,
	            isPlugin = importNode.options.plugin,
	            isOptional = importNode.options.optional,
	            duplicateImport = importedAtRoot || fullPath in importVisitor.recursionDetector;

	        if (!context.importMultiple) {
	            if (duplicateImport) {
	                importNode.skip = true;
	            } else {
	                importNode.skip = function() {
	                    if (fullPath in importVisitor.onceFileDetectionMap) {
	                        return true;
	                    }
	                    importVisitor.onceFileDetectionMap[fullPath] = true;
	                    return false;
	                };
	            }
	        }

	        if (!fullPath && isOptional) {
	            importNode.skip = true;
	        }

	        if (root) {
	            importNode.root = root;
	            importNode.importedFilename = fullPath;

	            if (!inlineCSS && !isPlugin && (context.importMultiple || !duplicateImport)) {
	                importVisitor.recursionDetector[fullPath] = true;

	                var oldContext = this.context;
	                this.context = context;
	                try {
	                    this._visitor.visit(root);
	                } catch (e) {
	                    this.error = e;
	                }
	                this.context = oldContext;
	            }
	        }

	        importVisitor.importCount--;

	        if (importVisitor.isFinished) {
	            importVisitor._sequencer.tryRun();
	        }
	    },
	    visitRule: function (ruleNode, visitArgs) {
	        if (ruleNode.value.type === "DetachedRuleset") {
	            this.context.frames.unshift(ruleNode);
	        } else {
	            visitArgs.visitDeeper = false;
	        }
	    },
	    visitRuleOut : function(ruleNode) {
	        if (ruleNode.value.type === "DetachedRuleset") {
	            this.context.frames.shift();
	        }
	    },
	    visitDirective: function (directiveNode, visitArgs) {
	        this.context.frames.unshift(directiveNode);
	    },
	    visitDirectiveOut: function (directiveNode) {
	        this.context.frames.shift();
	    },
	    visitMixinDefinition: function (mixinDefinitionNode, visitArgs) {
	        this.context.frames.unshift(mixinDefinitionNode);
	    },
	    visitMixinDefinitionOut: function (mixinDefinitionNode) {
	        this.context.frames.shift();
	    },
	    visitRuleset: function (rulesetNode, visitArgs) {
	        this.context.frames.unshift(rulesetNode);
	    },
	    visitRulesetOut: function (rulesetNode) {
	        this.context.frames.shift();
	    },
	    visitMedia: function (mediaNode, visitArgs) {
	        this.context.frames.unshift(mediaNode.rules[0]);
	    },
	    visitMediaOut: function (mediaNode) {
	        this.context.frames.shift();
	    }
	};
	module.exports = ImportVisitor;

	},{"../contexts":10,"./import-sequencer":84,"./visitor":89}],86:[function(require,module,exports){
	var visitors = {
	    Visitor: require("./visitor"),
	    ImportVisitor: require('./import-visitor'),
	    ExtendVisitor: require('./extend-visitor'),
	    JoinSelectorVisitor: require('./join-selector-visitor'),
	    ToCSSVisitor: require('./to-css-visitor')
	};

	module.exports = visitors;

	},{"./extend-visitor":83,"./import-visitor":85,"./join-selector-visitor":87,"./to-css-visitor":88,"./visitor":89}],87:[function(require,module,exports){
	var Visitor = require("./visitor");

	var JoinSelectorVisitor = function() {
	    this.contexts = [[]];
	    this._visitor = new Visitor(this);
	};

	JoinSelectorVisitor.prototype = {
	    run: function (root) {
	        return this._visitor.visit(root);
	    },
	    visitRule: function (ruleNode, visitArgs) {
	        visitArgs.visitDeeper = false;
	    },
	    visitMixinDefinition: function (mixinDefinitionNode, visitArgs) {
	        visitArgs.visitDeeper = false;
	    },

	    visitRuleset: function (rulesetNode, visitArgs) {
	        var context = this.contexts[this.contexts.length - 1],
	            paths = [], selectors;

	        this.contexts.push(paths);

	        if (! rulesetNode.root) {
	            selectors = rulesetNode.selectors;
	            if (selectors) {
	                selectors = selectors.filter(function(selector) { return selector.getIsOutput(); });
	                rulesetNode.selectors = selectors.length ? selectors : (selectors = null);
	                if (selectors) { rulesetNode.joinSelectors(paths, context, selectors); }
	            }
	            if (!selectors) { rulesetNode.rules = null; }
	            rulesetNode.paths = paths;
	        }
	    },
	    visitRulesetOut: function (rulesetNode) {
	        this.contexts.length = this.contexts.length - 1;
	    },
	    visitMedia: function (mediaNode, visitArgs) {
	        var context = this.contexts[this.contexts.length - 1];
	        mediaNode.rules[0].root = (context.length === 0 || context[0].multiMedia);
	    },
	    visitDirective: function (directiveNode, visitArgs) {
	        var context = this.contexts[this.contexts.length - 1];
	        if (directiveNode.rules && directiveNode.rules.length) {
	            directiveNode.rules[0].root = (directiveNode.isRooted || context.length === 0 || null);
	        }
	    }
	};

	module.exports = JoinSelectorVisitor;

	},{"./visitor":89}],88:[function(require,module,exports){
	var tree = require("../tree"),
	    Visitor = require("./visitor");

	var ToCSSVisitor = function(context) {
	    this._visitor = new Visitor(this);
	    this._context = context;
	};

	ToCSSVisitor.prototype = {
	    isReplacing: true,
	    run: function (root) {
	        return this._visitor.visit(root);
	    },

	    visitRule: function (ruleNode, visitArgs) {
	        if (ruleNode.variable) {
	            return;
	        }
	        return ruleNode;
	    },

	    visitMixinDefinition: function (mixinNode, visitArgs) {
	        // mixin definitions do not get eval'd - this means they keep state
	        // so we have to clear that state here so it isn't used if toCSS is called twice
	        mixinNode.frames = [];
	    },

	    visitExtend: function (extendNode, visitArgs) {
	    },

	    visitComment: function (commentNode, visitArgs) {
	        if (commentNode.isSilent(this._context)) {
	            return;
	        }
	        return commentNode;
	    },

	    visitMedia: function(mediaNode, visitArgs) {
	        mediaNode.accept(this._visitor);
	        visitArgs.visitDeeper = false;

	        if (!mediaNode.rules.length) {
	            return;
	        }
	        return mediaNode;
	    },

	    visitImport: function (importNode, visitArgs) {
	        if (importNode.path.currentFileInfo.reference !== undefined && importNode.css) {
	            return;
	        }
	        return importNode;
	    },

	    visitDirective: function(directiveNode, visitArgs) {
	        if (directiveNode.name === "@charset") {
	            if (!directiveNode.getIsReferenced()) {
	                return;
	            }
	            // Only output the debug info together with subsequent @charset definitions
	            // a comment (or @media statement) before the actual @charset directive would
	            // be considered illegal css as it has to be on the first line
	            if (this.charset) {
	                if (directiveNode.debugInfo) {
	                    var comment = new tree.Comment("/* " + directiveNode.toCSS(this._context).replace(/\n/g, "") + " */\n");
	                    comment.debugInfo = directiveNode.debugInfo;
	                    return this._visitor.visit(comment);
	                }
	                return;
	            }
	            this.charset = true;
	        }
	        function hasVisibleChild(directiveNode) {
	            //prepare list of childs
	            var rule, bodyRules = directiveNode.rules;
	            //if there is only one nested ruleset and that one has no path, then it is
	            //just fake ruleset that got not replaced and we need to look inside it to
	            //get real childs
	            if (bodyRules.length === 1 && (!bodyRules[0].paths || bodyRules[0].paths.length === 0)) {
	                bodyRules = bodyRules[0].rules;
	            }
	            for (var r = 0; r < bodyRules.length; r++) {
	                rule = bodyRules[r];
	                if (rule.getIsReferenced && rule.getIsReferenced()) {
	                    //the directive contains something that was referenced (likely by extend)
	                    //therefore it needs to be shown in output too
	                    return true;
	                }
	            }
	            return false;
	        }

	        if (directiveNode.rules && directiveNode.rules.length) {
	            //it is still true that it is only one ruleset in array
	            //this is last such moment
	            this._mergeRules(directiveNode.rules[0].rules);
	            //process childs
	            directiveNode.accept(this._visitor);
	            visitArgs.visitDeeper = false;

	            // the directive was directly referenced and therefore needs to be shown in the output
	            if (directiveNode.getIsReferenced()) {
	                return directiveNode;
	            }

	            if (!directiveNode.rules || !directiveNode.rules.length) {
	                return ;
	            }

	            //the directive was not directly referenced - we need to check whether some of its childs
	            //was referenced
	            if (hasVisibleChild(directiveNode)) {
	                //marking as referenced in case the directive is stored inside another directive
	                directiveNode.markReferenced();
	                return directiveNode;
	            }

	            //The directive was not directly referenced and does not contain anything that
	            //was referenced. Therefore it must not be shown in output.
	            return ;
	        } else {
	            if (!directiveNode.getIsReferenced()) {
	                return;
	            }
	        }
	        return directiveNode;
	    },

	    checkPropertiesInRoot: function(rules) {
	        var ruleNode;
	        for (var i = 0; i < rules.length; i++) {
	            ruleNode = rules[i];
	            if (ruleNode instanceof tree.Rule && !ruleNode.variable) {
	                throw { message: "properties must be inside selector blocks, they cannot be in the root.",
	                    index: ruleNode.index, filename: ruleNode.currentFileInfo ? ruleNode.currentFileInfo.filename : null};
	            }
	        }
	    },

	    visitRuleset: function (rulesetNode, visitArgs) {
	        var rule, rulesets = [];
	        if (rulesetNode.firstRoot) {
	            this.checkPropertiesInRoot(rulesetNode.rules);
	        }
	        if (! rulesetNode.root) {
	            if (rulesetNode.paths) {
	                rulesetNode.paths = rulesetNode.paths
	                    .filter(function(p) {
	                        var i;
	                        if (p[0].elements[0].combinator.value === ' ') {
	                            p[0].elements[0].combinator = new(tree.Combinator)('');
	                        }
	                        for (i = 0; i < p.length; i++) {
	                            if (p[i].getIsReferenced() && p[i].getIsOutput()) {
	                                return true;
	                            }
	                        }
	                        return false;
	                    });
	            }

	            // Compile rules and rulesets
	            var nodeRules = rulesetNode.rules, nodeRuleCnt = nodeRules ? nodeRules.length : 0;
	            for (var i = 0; i < nodeRuleCnt; ) {
	                rule = nodeRules[i];
	                if (rule && rule.rules) {
	                    // visit because we are moving them out from being a child
	                    rulesets.push(this._visitor.visit(rule));
	                    nodeRules.splice(i, 1);
	                    nodeRuleCnt--;
	                    continue;
	                }
	                i++;
	            }
	            // accept the visitor to remove rules and refactor itself
	            // then we can decide now whether we want it or not
	            if (nodeRuleCnt > 0) {
	                rulesetNode.accept(this._visitor);
	            } else {
	                rulesetNode.rules = null;
	            }
	            visitArgs.visitDeeper = false;

	            nodeRules = rulesetNode.rules;
	            if (nodeRules) {
	                this._mergeRules(nodeRules);
	                nodeRules = rulesetNode.rules;
	            }
	            if (nodeRules) {
	                this._removeDuplicateRules(nodeRules);
	                nodeRules = rulesetNode.rules;
	            }

	            // now decide whether we keep the ruleset
	            if (nodeRules && nodeRules.length > 0 && rulesetNode.paths.length > 0) {
	                rulesets.splice(0, 0, rulesetNode);
	            }
	        } else {
	            rulesetNode.accept(this._visitor);
	            visitArgs.visitDeeper = false;
	            if (rulesetNode.firstRoot || (rulesetNode.rules && rulesetNode.rules.length > 0)) {
	                rulesets.splice(0, 0, rulesetNode);
	            }
	        }
	        if (rulesets.length === 1) {
	            return rulesets[0];
	        }
	        return rulesets;
	    },

	    _removeDuplicateRules: function(rules) {
	        if (!rules) { return; }

	        // remove duplicates
	        var ruleCache = {},
	            ruleList, rule, i;

	        for (i = rules.length - 1; i >= 0 ; i--) {
	            rule = rules[i];
	            if (rule instanceof tree.Rule) {
	                if (!ruleCache[rule.name]) {
	                    ruleCache[rule.name] = rule;
	                } else {
	                    ruleList = ruleCache[rule.name];
	                    if (ruleList instanceof tree.Rule) {
	                        ruleList = ruleCache[rule.name] = [ruleCache[rule.name].toCSS(this._context)];
	                    }
	                    var ruleCSS = rule.toCSS(this._context);
	                    if (ruleList.indexOf(ruleCSS) !== -1) {
	                        rules.splice(i, 1);
	                    } else {
	                        ruleList.push(ruleCSS);
	                    }
	                }
	            }
	        }
	    },

	    _mergeRules: function (rules) {
	        if (!rules) { return; }

	        var groups = {},
	            parts,
	            rule,
	            key;

	        for (var i = 0; i < rules.length; i++) {
	            rule = rules[i];

	            if ((rule instanceof tree.Rule) && rule.merge) {
	                key = [rule.name,
	                    rule.important ? "!" : ""].join(",");

	                if (!groups[key]) {
	                    groups[key] = [];
	                } else {
	                    rules.splice(i--, 1);
	                }

	                groups[key].push(rule);
	            }
	        }

	        Object.keys(groups).map(function (k) {

	            function toExpression(values) {
	                return new (tree.Expression)(values.map(function (p) {
	                    return p.value;
	                }));
	            }

	            function toValue(values) {
	                return new (tree.Value)(values.map(function (p) {
	                    return p;
	                }));
	            }

	            parts = groups[k];

	            if (parts.length > 1) {
	                rule = parts[0];
	                var spacedGroups = [];
	                var lastSpacedGroup = [];
	                parts.map(function (p) {
	                    if (p.merge === "+") {
	                        if (lastSpacedGroup.length > 0) {
	                            spacedGroups.push(toExpression(lastSpacedGroup));
	                        }
	                        lastSpacedGroup = [];
	                    }
	                    lastSpacedGroup.push(p);
	                });
	                spacedGroups.push(toExpression(lastSpacedGroup));
	                rule.value = toValue(spacedGroups);
	            }
	        });
	    },

	    visitAnonymous: function(anonymousNode, visitArgs) {
	        if (!anonymousNode.getIsReferenced()) {
	            return ;
	        }

	        anonymousNode.accept(this._visitor);
	        return anonymousNode;
	    }
	};

	module.exports = ToCSSVisitor;

	},{"../tree":61,"./visitor":89}],89:[function(require,module,exports){
	var tree = require("../tree");

	var _visitArgs = { visitDeeper: true },
	    _hasIndexed = false;

	function _noop(node) {
	    return node;
	}

	function indexNodeTypes(parent, ticker) {
	    // add .typeIndex to tree node types for lookup table
	    var key, child;
	    for (key in parent) {
	        if (parent.hasOwnProperty(key)) {
	            child = parent[key];
	            switch (typeof child) {
	                case "function":
	                    // ignore bound functions directly on tree which do not have a prototype
	                    // or aren't nodes
	                    if (child.prototype && child.prototype.type) {
	                        child.prototype.typeIndex = ticker++;
	                    }
	                    break;
	                case "object":
	                    ticker = indexNodeTypes(child, ticker);
	                    break;
	            }
	        }
	    }
	    return ticker;
	}

	var Visitor = function(implementation) {
	    this._implementation = implementation;
	    this._visitFnCache = [];

	    if (!_hasIndexed) {
	        indexNodeTypes(tree, 1);
	        _hasIndexed = true;
	    }
	};

	Visitor.prototype = {
	    visit: function(node) {
	        if (!node) {
	            return node;
	        }

	        var nodeTypeIndex = node.typeIndex;
	        if (!nodeTypeIndex) {
	            return node;
	        }

	        var visitFnCache = this._visitFnCache,
	            impl = this._implementation,
	            aryIndx = nodeTypeIndex << 1,
	            outAryIndex = aryIndx | 1,
	            func = visitFnCache[aryIndx],
	            funcOut = visitFnCache[outAryIndex],
	            visitArgs = _visitArgs,
	            fnName;

	        visitArgs.visitDeeper = true;

	        if (!func) {
	            fnName = "visit" + node.type;
	            func = impl[fnName] || _noop;
	            funcOut = impl[fnName + "Out"] || _noop;
	            visitFnCache[aryIndx] = func;
	            visitFnCache[outAryIndex] = funcOut;
	        }

	        if (func !== _noop) {
	            var newNode = func.call(impl, node, visitArgs);
	            if (impl.isReplacing) {
	                node = newNode;
	            }
	        }

	        if (visitArgs.visitDeeper && node && node.accept) {
	            node.accept(this);
	        }

	        if (funcOut != _noop) {
	            funcOut.call(impl, node);
	        }

	        return node;
	    },
	    visitArray: function(nodes, nonReplacing) {
	        if (!nodes) {
	            return nodes;
	        }

	        var cnt = nodes.length, i;

	        // Non-replacing
	        if (nonReplacing || !this._implementation.isReplacing) {
	            for (i = 0; i < cnt; i++) {
	                this.visit(nodes[i]);
	            }
	            return nodes;
	        }

	        // Replacing
	        var out = [];
	        for (i = 0; i < cnt; i++) {
	            var evald = this.visit(nodes[i]);
	            if (evald === undefined) { continue; }
	            if (!evald.splice) {
	                out.push(evald);
	            } else if (evald.length) {
	                this.flatten(evald, out);
	            }
	        }
	        return out;
	    },
	    flatten: function(arr, out) {
	        if (!out) {
	            out = [];
	        }

	        var cnt, i, item,
	            nestedCnt, j, nestedItem;

	        for (i = 0, cnt = arr.length; i < cnt; i++) {
	            item = arr[i];
	            if (item === undefined) {
	                continue;
	            }
	            if (!item.splice) {
	                out.push(item);
	                continue;
	            }

	            for (j = 0, nestedCnt = item.length; j < nestedCnt; j++) {
	                nestedItem = item[j];
	                if (nestedItem === undefined) {
	                    continue;
	                }
	                if (!nestedItem.splice) {
	                    out.push(nestedItem);
	                } else if (nestedItem.length) {
	                    this.flatten(nestedItem, out);
	                }
	            }
	        }

	        return out;
	    }
	};
	module.exports = Visitor;

	},{"../tree":61}],90:[function(require,module,exports){
	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    draining = true;
	    var currentQueue;
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        var i = -1;
	        while (++i < len) {
	            currentQueue[i]();
	        }
	        len = queue.length;
	    }
	    draining = false;
	}
	process.nextTick = function (fun) {
	    queue.push(fun);
	    if (!draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };

	},{}],91:[function(require,module,exports){
	'use strict';

	var asap = require('asap')

	module.exports = Promise;
	function Promise(fn) {
	  if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new')
	  if (typeof fn !== 'function') throw new TypeError('not a function')
	  var state = null
	  var value = null
	  var deferreds = []
	  var self = this

	  this.then = function(onFulfilled, onRejected) {
	    return new self.constructor(function(resolve, reject) {
	      handle(new Handler(onFulfilled, onRejected, resolve, reject))
	    })
	  }

	  function handle(deferred) {
	    if (state === null) {
	      deferreds.push(deferred)
	      return
	    }
	    asap(function() {
	      var cb = state ? deferred.onFulfilled : deferred.onRejected
	      if (cb === null) {
	        (state ? deferred.resolve : deferred.reject)(value)
	        return
	      }
	      var ret
	      try {
	        ret = cb(value)
	      }
	      catch (e) {
	        deferred.reject(e)
	        return
	      }
	      deferred.resolve(ret)
	    })
	  }

	  function resolve(newValue) {
	    try { //Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
	      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.')
	      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
	        var then = newValue.then
	        if (typeof then === 'function') {
	          doResolve(then.bind(newValue), resolve, reject)
	          return
	        }
	      }
	      state = true
	      value = newValue
	      finale()
	    } catch (e) { reject(e) }
	  }

	  function reject(newValue) {
	    state = false
	    value = newValue
	    finale()
	  }

	  function finale() {
	    for (var i = 0, len = deferreds.length; i < len; i++)
	      handle(deferreds[i])
	    deferreds = null
	  }

	  doResolve(fn, resolve, reject)
	}


	function Handler(onFulfilled, onRejected, resolve, reject){
	  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null
	  this.onRejected = typeof onRejected === 'function' ? onRejected : null
	  this.resolve = resolve
	  this.reject = reject
	}

	/**
	 * Take a potentially misbehaving resolver function and make sure
	 * onFulfilled and onRejected are only called once.
	 *
	 * Makes no guarantees about asynchrony.
	 */
	function doResolve(fn, onFulfilled, onRejected) {
	  var done = false;
	  try {
	    fn(function (value) {
	      if (done) return
	      done = true
	      onFulfilled(value)
	    }, function (reason) {
	      if (done) return
	      done = true
	      onRejected(reason)
	    })
	  } catch (ex) {
	    if (done) return
	    done = true
	    onRejected(ex)
	  }
	}

	},{"asap":93}],92:[function(require,module,exports){
	'use strict';

	//This file contains the ES6 extensions to the core Promises/A+ API

	var Promise = require('./core.js')
	var asap = require('asap')

	module.exports = Promise

	/* Static Functions */

	function ValuePromise(value) {
	  this.then = function (onFulfilled) {
	    if (typeof onFulfilled !== 'function') return this
	    return new Promise(function (resolve, reject) {
	      asap(function () {
	        try {
	          resolve(onFulfilled(value))
	        } catch (ex) {
	          reject(ex);
	        }
	      })
	    })
	  }
	}
	ValuePromise.prototype = Promise.prototype

	var TRUE = new ValuePromise(true)
	var FALSE = new ValuePromise(false)
	var NULL = new ValuePromise(null)
	var UNDEFINED = new ValuePromise(undefined)
	var ZERO = new ValuePromise(0)
	var EMPTYSTRING = new ValuePromise('')

	Promise.resolve = function (value) {
	  if (value instanceof Promise) return value

	  if (value === null) return NULL
	  if (value === undefined) return UNDEFINED
	  if (value === true) return TRUE
	  if (value === false) return FALSE
	  if (value === 0) return ZERO
	  if (value === '') return EMPTYSTRING

	  if (typeof value === 'object' || typeof value === 'function') {
	    try {
	      var then = value.then
	      if (typeof then === 'function') {
	        return new Promise(then.bind(value))
	      }
	    } catch (ex) {
	      return new Promise(function (resolve, reject) {
	        reject(ex)
	      })
	    }
	  }

	  return new ValuePromise(value)
	}

	Promise.all = function (arr) {
	  var args = Array.prototype.slice.call(arr)

	  return new Promise(function (resolve, reject) {
	    if (args.length === 0) return resolve([])
	    var remaining = args.length
	    function res(i, val) {
	      try {
	        if (val && (typeof val === 'object' || typeof val === 'function')) {
	          var then = val.then
	          if (typeof then === 'function') {
	            then.call(val, function (val) { res(i, val) }, reject)
	            return
	          }
	        }
	        args[i] = val
	        if (--remaining === 0) {
	          resolve(args);
	        }
	      } catch (ex) {
	        reject(ex)
	      }
	    }
	    for (var i = 0; i < args.length; i++) {
	      res(i, args[i])
	    }
	  })
	}

	Promise.reject = function (value) {
	  return new Promise(function (resolve, reject) { 
	    reject(value);
	  });
	}

	Promise.race = function (values) {
	  return new Promise(function (resolve, reject) { 
	    values.forEach(function(value){
	      Promise.resolve(value).then(resolve, reject);
	    })
	  });
	}

	/* Prototype Methods */

	Promise.prototype['catch'] = function (onRejected) {
	  return this.then(null, onRejected);
	}

	},{"./core.js":91,"asap":93}],93:[function(require,module,exports){
	(function (process){

	// Use the fastest possible means to execute a task in a future turn
	// of the event loop.

	// linked list of tasks (single, with head node)
	var head = {task: void 0, next: null};
	var tail = head;
	var flushing = false;
	var requestFlush = void 0;
	var isNodeJS = false;

	function flush() {
	    /* jshint loopfunc: true */

	    while (head.next) {
	        head = head.next;
	        var task = head.task;
	        head.task = void 0;
	        var domain = head.domain;

	        if (domain) {
	            head.domain = void 0;
	            domain.enter();
	        }

	        try {
	            task();

	        } catch (e) {
	            if (isNodeJS) {
	                // In node, uncaught exceptions are considered fatal errors.
	                // Re-throw them synchronously to interrupt flushing!

	                // Ensure continuation if the uncaught exception is suppressed
	                // listening "uncaughtException" events (as domains does).
	                // Continue in next event to avoid tick recursion.
	                if (domain) {
	                    domain.exit();
	                }
	                setTimeout(flush, 0);
	                if (domain) {
	                    domain.enter();
	                }

	                throw e;

	            } else {
	                // In browsers, uncaught exceptions are not fatal.
	                // Re-throw them asynchronously to avoid slow-downs.
	                setTimeout(function() {
	                   throw e;
	                }, 0);
	            }
	        }

	        if (domain) {
	            domain.exit();
	        }
	    }

	    flushing = false;
	}

	if (typeof process !== "undefined" && process.nextTick) {
	    // Node.js before 0.9. Note that some fake-Node environments, like the
	    // Mocha test runner, introduce a `process` global without a `nextTick`.
	    isNodeJS = true;

	    requestFlush = function () {
	        process.nextTick(flush);
	    };

	} else if (typeof setImmediate === "function") {
	    // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
	    if (typeof window !== "undefined") {
	        requestFlush = setImmediate.bind(window, flush);
	    } else {
	        requestFlush = function () {
	            setImmediate(flush);
	        };
	    }

	} else if (typeof MessageChannel !== "undefined") {
	    // modern browsers
	    // http://www.nonblocking.io/2011/06/windownexttick.html
	    var channel = new MessageChannel();
	    channel.port1.onmessage = flush;
	    requestFlush = function () {
	        channel.port2.postMessage(0);
	    };

	} else {
	    // old browsers
	    requestFlush = function () {
	        setTimeout(flush, 0);
	    };
	}

	function asap(task) {
	    tail = tail.next = {
	        task: task,
	        domain: isNodeJS && process.domain,
	        next: null
	    };

	    if (!flushing) {
	        flushing = true;
	        requestFlush();
	    }
	};

	module.exports = asap;


	}).call(this,require('_process'))
	},{"_process":90}],94:[function(require,module,exports){
	// should work in any browser without browserify

	if (typeof Promise.prototype.done !== 'function') {
	  Promise.prototype.done = function (onFulfilled, onRejected) {
	    var self = arguments.length ? this.then.apply(this, arguments) : this
	    self.then(null, function (err) {
	      setTimeout(function () {
	        throw err
	      }, 0)
	    })
	  }
	}
	},{}],95:[function(require,module,exports){
	// not "use strict" so we can declare global "Promise"

	var asap = require('asap');

	if (typeof Promise === 'undefined') {
	  Promise = require('./lib/core.js')
	  require('./lib/es6-extensions.js')
	}

	require('./polyfill-done.js');

	},{"./lib/core.js":91,"./lib/es6-extensions.js":92,"./polyfill-done.js":94,"asap":93}]},{},[2])(2)
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).setImmediate))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(3).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).setImmediate, __webpack_require__(2).clearImmediate))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(5);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./animate.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./animate.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, "@charset \"UTF-8\";\n\n/*!\nAnimate.css - http://daneden.me/animate\nLicensed under the MIT license - http://opensource.org/licenses/MIT\n\nCopyright (c) 2014 Daniel Eden\n*/\n\n.animated {\n  -webkit-animation-duration: 1s;\n  animation-duration: 1s;\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n}\n\n.animated.infinite {\n  -webkit-animation-iteration-count: infinite;\n  animation-iteration-count: infinite;\n}\n\n.animated.hinge {\n  -webkit-animation-duration: 2s;\n  animation-duration: 2s;\n}\n\n@-webkit-keyframes bounce {\n  0%, 20%, 53%, 80%, 100% {\n    -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    -webkit-transform: translate3d(0,0,0);\n    transform: translate3d(0,0,0);\n  }\n\n  40%, 43% {\n    -webkit-transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);\n    transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);\n    -webkit-transform: translate3d(0, -30px, 0);\n    transform: translate3d(0, -30px, 0);\n  }\n\n  70% {\n    -webkit-transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);\n    transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);\n    -webkit-transform: translate3d(0, -15px, 0);\n    transform: translate3d(0, -15px, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0,-4px,0);\n    transform: translate3d(0,-4px,0);\n  }\n}\n\n@keyframes bounce {\n  0%, 20%, 53%, 80%, 100% {\n    -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    -webkit-transform: translate3d(0,0,0);\n    -ms-transform: translate3d(0,0,0);\n    transform: translate3d(0,0,0);\n  }\n\n  40%, 43% {\n    -webkit-transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);\n    transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);\n    -webkit-transform: translate3d(0, -30px, 0);\n    -ms-transform: translate3d(0, -30px, 0);\n    transform: translate3d(0, -30px, 0);\n  }\n\n  70% {\n    -webkit-transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);\n    transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);\n    -webkit-transform: translate3d(0, -15px, 0);\n    -ms-transform: translate3d(0, -15px, 0);\n    transform: translate3d(0, -15px, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0,-4px,0);\n    -ms-transform: translate3d(0,-4px,0);\n    transform: translate3d(0,-4px,0);\n  }\n}\n\n.bounce {\n  -webkit-animation-name: bounce;\n  animation-name: bounce;\n  -webkit-transform-origin: center bottom;\n  -ms-transform-origin: center bottom;\n  transform-origin: center bottom;\n}\n\n@-webkit-keyframes flash {\n  0%, 50%, 100% {\n    opacity: 1;\n  }\n\n  25%, 75% {\n    opacity: 0;\n  }\n}\n\n@keyframes flash {\n  0%, 50%, 100% {\n    opacity: 1;\n  }\n\n  25%, 75% {\n    opacity: 0;\n  }\n}\n\n.flash {\n  -webkit-animation-name: flash;\n  animation-name: flash;\n}\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n\n@-webkit-keyframes pulse {\n  0% {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    -webkit-transform: scale3d(1.05, 1.05, 1.05);\n    transform: scale3d(1.05, 1.05, 1.05);\n  }\n\n  100% {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes pulse {\n  0% {\n    -webkit-transform: scale3d(1, 1, 1);\n    -ms-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    -webkit-transform: scale3d(1.05, 1.05, 1.05);\n    -ms-transform: scale3d(1.05, 1.05, 1.05);\n    transform: scale3d(1.05, 1.05, 1.05);\n  }\n\n  100% {\n    -webkit-transform: scale3d(1, 1, 1);\n    -ms-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n.pulse {\n  -webkit-animation-name: pulse;\n  animation-name: pulse;\n}\n\n@-webkit-keyframes rubberBand {\n  0% {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n\n  30% {\n    -webkit-transform: scale3d(1.25, 0.75, 1);\n    transform: scale3d(1.25, 0.75, 1);\n  }\n\n  40% {\n    -webkit-transform: scale3d(0.75, 1.25, 1);\n    transform: scale3d(0.75, 1.25, 1);\n  }\n\n  50% {\n    -webkit-transform: scale3d(1.15, 0.85, 1);\n    transform: scale3d(1.15, 0.85, 1);\n  }\n\n  65% {\n    -webkit-transform: scale3d(.95, 1.05, 1);\n    transform: scale3d(.95, 1.05, 1);\n  }\n\n  75% {\n    -webkit-transform: scale3d(1.05, .95, 1);\n    transform: scale3d(1.05, .95, 1);\n  }\n\n  100% {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes rubberBand {\n  0% {\n    -webkit-transform: scale3d(1, 1, 1);\n    -ms-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n\n  30% {\n    -webkit-transform: scale3d(1.25, 0.75, 1);\n    -ms-transform: scale3d(1.25, 0.75, 1);\n    transform: scale3d(1.25, 0.75, 1);\n  }\n\n  40% {\n    -webkit-transform: scale3d(0.75, 1.25, 1);\n    -ms-transform: scale3d(0.75, 1.25, 1);\n    transform: scale3d(0.75, 1.25, 1);\n  }\n\n  50% {\n    -webkit-transform: scale3d(1.15, 0.85, 1);\n    -ms-transform: scale3d(1.15, 0.85, 1);\n    transform: scale3d(1.15, 0.85, 1);\n  }\n\n  65% {\n    -webkit-transform: scale3d(.95, 1.05, 1);\n    -ms-transform: scale3d(.95, 1.05, 1);\n    transform: scale3d(.95, 1.05, 1);\n  }\n\n  75% {\n    -webkit-transform: scale3d(1.05, .95, 1);\n    -ms-transform: scale3d(1.05, .95, 1);\n    transform: scale3d(1.05, .95, 1);\n  }\n\n  100% {\n    -webkit-transform: scale3d(1, 1, 1);\n    -ms-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n.rubberBand {\n  -webkit-animation-name: rubberBand;\n  animation-name: rubberBand;\n}\n\n@-webkit-keyframes shake {\n  0%, 100% {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  10%, 30%, 50%, 70%, 90% {\n    -webkit-transform: translate3d(-10px, 0, 0);\n    transform: translate3d(-10px, 0, 0);\n  }\n\n  20%, 40%, 60%, 80% {\n    -webkit-transform: translate3d(10px, 0, 0);\n    transform: translate3d(10px, 0, 0);\n  }\n}\n\n@keyframes shake {\n  0%, 100% {\n    -webkit-transform: translate3d(0, 0, 0);\n    -ms-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  10%, 30%, 50%, 70%, 90% {\n    -webkit-transform: translate3d(-10px, 0, 0);\n    -ms-transform: translate3d(-10px, 0, 0);\n    transform: translate3d(-10px, 0, 0);\n  }\n\n  20%, 40%, 60%, 80% {\n    -webkit-transform: translate3d(10px, 0, 0);\n    -ms-transform: translate3d(10px, 0, 0);\n    transform: translate3d(10px, 0, 0);\n  }\n}\n\n.shake {\n  -webkit-animation-name: shake;\n  animation-name: shake;\n}\n\n@-webkit-keyframes swing {\n  20% {\n    -webkit-transform: rotate3d(0, 0, 1, 15deg);\n    transform: rotate3d(0, 0, 1, 15deg);\n  }\n\n  40% {\n    -webkit-transform: rotate3d(0, 0, 1, -10deg);\n    transform: rotate3d(0, 0, 1, -10deg);\n  }\n\n  60% {\n    -webkit-transform: rotate3d(0, 0, 1, 5deg);\n    transform: rotate3d(0, 0, 1, 5deg);\n  }\n\n  80% {\n    -webkit-transform: rotate3d(0, 0, 1, -5deg);\n    transform: rotate3d(0, 0, 1, -5deg);\n  }\n\n  100% {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n    transform: rotate3d(0, 0, 1, 0deg);\n  }\n}\n\n@keyframes swing {\n  20% {\n    -webkit-transform: rotate3d(0, 0, 1, 15deg);\n    -ms-transform: rotate3d(0, 0, 1, 15deg);\n    transform: rotate3d(0, 0, 1, 15deg);\n  }\n\n  40% {\n    -webkit-transform: rotate3d(0, 0, 1, -10deg);\n    -ms-transform: rotate3d(0, 0, 1, -10deg);\n    transform: rotate3d(0, 0, 1, -10deg);\n  }\n\n  60% {\n    -webkit-transform: rotate3d(0, 0, 1, 5deg);\n    -ms-transform: rotate3d(0, 0, 1, 5deg);\n    transform: rotate3d(0, 0, 1, 5deg);\n  }\n\n  80% {\n    -webkit-transform: rotate3d(0, 0, 1, -5deg);\n    -ms-transform: rotate3d(0, 0, 1, -5deg);\n    transform: rotate3d(0, 0, 1, -5deg);\n  }\n\n  100% {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n    -ms-transform: rotate3d(0, 0, 1, 0deg);\n    transform: rotate3d(0, 0, 1, 0deg);\n  }\n}\n\n.swing {\n  -webkit-transform-origin: top center;\n  -ms-transform-origin: top center;\n  transform-origin: top center;\n  -webkit-animation-name: swing;\n  animation-name: swing;\n}\n\n@-webkit-keyframes tada {\n  0% {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n\n  10%, 20% {\n    -webkit-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);\n    transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);\n  }\n\n  30%, 50%, 70%, 90% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n  }\n\n  40%, 60%, 80% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n  }\n\n  100% {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes tada {\n  0% {\n    -webkit-transform: scale3d(1, 1, 1);\n    -ms-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n\n  10%, 20% {\n    -webkit-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);\n    -ms-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);\n    transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);\n  }\n\n  30%, 50%, 70%, 90% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n    -ms-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n  }\n\n  40%, 60%, 80% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n    -ms-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n  }\n\n  100% {\n    -webkit-transform: scale3d(1, 1, 1);\n    -ms-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n.tada {\n  -webkit-animation-name: tada;\n  animation-name: tada;\n}\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n\n@-webkit-keyframes wobble {\n  0% {\n    -webkit-transform: none;\n    transform: none;\n  }\n\n  15% {\n    -webkit-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\n    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\n  }\n\n  30% {\n    -webkit-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\n    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\n  }\n\n  45% {\n    -webkit-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\n    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\n  }\n\n  60% {\n    -webkit-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\n    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\n  }\n\n  75% {\n    -webkit-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\n    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\n  }\n\n  100% {\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes wobble {\n  0% {\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none;\n  }\n\n  15% {\n    -webkit-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\n    -ms-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\n    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\n  }\n\n  30% {\n    -webkit-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\n    -ms-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\n    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\n  }\n\n  45% {\n    -webkit-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\n    -ms-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\n    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\n  }\n\n  60% {\n    -webkit-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\n    -ms-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\n    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\n  }\n\n  75% {\n    -webkit-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\n    -ms-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\n    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\n  }\n\n  100% {\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none;\n  }\n}\n\n.wobble {\n  -webkit-animation-name: wobble;\n  animation-name: wobble;\n}\n\n@-webkit-keyframes bounceIn {\n  0%, 20%, 40%, 60%, 80%, 100% {\n    -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(.3, .3, .3);\n    transform: scale3d(.3, .3, .3);\n  }\n\n  20% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    -webkit-transform: scale3d(.9, .9, .9);\n    transform: scale3d(.9, .9, .9);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.03, 1.03, 1.03);\n    transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    -webkit-transform: scale3d(.97, .97, .97);\n    transform: scale3d(.97, .97, .97);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes bounceIn {\n  0%, 20%, 40%, 60%, 80%, 100% {\n    -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(.3, .3, .3);\n    -ms-transform: scale3d(.3, .3, .3);\n    transform: scale3d(.3, .3, .3);\n  }\n\n  20% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    -ms-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    -webkit-transform: scale3d(.9, .9, .9);\n    -ms-transform: scale3d(.9, .9, .9);\n    transform: scale3d(.9, .9, .9);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.03, 1.03, 1.03);\n    -ms-transform: scale3d(1.03, 1.03, 1.03);\n    transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    -webkit-transform: scale3d(.97, .97, .97);\n    -ms-transform: scale3d(.97, .97, .97);\n    transform: scale3d(.97, .97, .97);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n    -ms-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n.bounceIn {\n  -webkit-animation-name: bounceIn;\n  animation-name: bounceIn;\n  -webkit-animation-duration: .75s;\n  animation-duration: .75s;\n}\n\n@-webkit-keyframes bounceInDown {\n  0%, 60%, 75%, 90%, 100% {\n    -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -3000px, 0);\n    transform: translate3d(0, -3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 25px, 0);\n    transform: translate3d(0, 25px, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(0, -10px, 0);\n    transform: translate3d(0, -10px, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0, 5px, 0);\n    transform: translate3d(0, 5px, 0);\n  }\n\n  100% {\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes bounceInDown {\n  0%, 60%, 75%, 90%, 100% {\n    -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -3000px, 0);\n    -ms-transform: translate3d(0, -3000px, 0);\n    transform: translate3d(0, -3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 25px, 0);\n    -ms-transform: translate3d(0, 25px, 0);\n    transform: translate3d(0, 25px, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(0, -10px, 0);\n    -ms-transform: translate3d(0, -10px, 0);\n    transform: translate3d(0, -10px, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0, 5px, 0);\n    -ms-transform: translate3d(0, 5px, 0);\n    transform: translate3d(0, 5px, 0);\n  }\n\n  100% {\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none;\n  }\n}\n\n.bounceInDown {\n  -webkit-animation-name: bounceInDown;\n  animation-name: bounceInDown;\n}\n\n@-webkit-keyframes bounceInLeft {\n  0%, 60%, 75%, 90%, 100% {\n    -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(-3000px, 0, 0);\n    transform: translate3d(-3000px, 0, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(25px, 0, 0);\n    transform: translate3d(25px, 0, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(-10px, 0, 0);\n    transform: translate3d(-10px, 0, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(5px, 0, 0);\n    transform: translate3d(5px, 0, 0);\n  }\n\n  100% {\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes bounceInLeft {\n  0%, 60%, 75%, 90%, 100% {\n    -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(-3000px, 0, 0);\n    -ms-transform: translate3d(-3000px, 0, 0);\n    transform: translate3d(-3000px, 0, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(25px, 0, 0);\n    -ms-transform: translate3d(25px, 0, 0);\n    transform: translate3d(25px, 0, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(-10px, 0, 0);\n    -ms-transform: translate3d(-10px, 0, 0);\n    transform: translate3d(-10px, 0, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(5px, 0, 0);\n    -ms-transform: translate3d(5px, 0, 0);\n    transform: translate3d(5px, 0, 0);\n  }\n\n  100% {\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none;\n  }\n}\n\n.bounceInLeft {\n  -webkit-animation-name: bounceInLeft;\n  animation-name: bounceInLeft;\n}\n\n@-webkit-keyframes bounceInRight {\n  0%, 60%, 75%, 90%, 100% {\n    -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(3000px, 0, 0);\n    transform: translate3d(3000px, 0, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(-25px, 0, 0);\n    transform: translate3d(-25px, 0, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(10px, 0, 0);\n    transform: translate3d(10px, 0, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(-5px, 0, 0);\n    transform: translate3d(-5px, 0, 0);\n  }\n\n  100% {\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes bounceInRight {\n  0%, 60%, 75%, 90%, 100% {\n    -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(3000px, 0, 0);\n    -ms-transform: translate3d(3000px, 0, 0);\n    transform: translate3d(3000px, 0, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(-25px, 0, 0);\n    -ms-transform: translate3d(-25px, 0, 0);\n    transform: translate3d(-25px, 0, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(10px, 0, 0);\n    -ms-transform: translate3d(10px, 0, 0);\n    transform: translate3d(10px, 0, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(-5px, 0, 0);\n    -ms-transform: translate3d(-5px, 0, 0);\n    transform: translate3d(-5px, 0, 0);\n  }\n\n  100% {\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none;\n  }\n}\n\n.bounceInRight {\n  -webkit-animation-name: bounceInRight;\n  animation-name: bounceInRight;\n}\n\n@-webkit-keyframes bounceInUp {\n  0%, 60%, 75%, 90%, 100% {\n    -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 3000px, 0);\n    transform: translate3d(0, 3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(0, 10px, 0);\n    transform: translate3d(0, 10px, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0, -5px, 0);\n    transform: translate3d(0, -5px, 0);\n  }\n\n  100% {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n\n@keyframes bounceInUp {\n  0%, 60%, 75%, 90%, 100% {\n    -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 3000px, 0);\n    -ms-transform: translate3d(0, 3000px, 0);\n    transform: translate3d(0, 3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, -20px, 0);\n    -ms-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(0, 10px, 0);\n    -ms-transform: translate3d(0, 10px, 0);\n    transform: translate3d(0, 10px, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0, -5px, 0);\n    -ms-transform: translate3d(0, -5px, 0);\n    transform: translate3d(0, -5px, 0);\n  }\n\n  100% {\n    -webkit-transform: translate3d(0, 0, 0);\n    -ms-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n\n.bounceInUp {\n  -webkit-animation-name: bounceInUp;\n  animation-name: bounceInUp;\n}\n\n@-webkit-keyframes bounceOut {\n  20% {\n    -webkit-transform: scale3d(.9, .9, .9);\n    transform: scale3d(.9, .9, .9);\n  }\n\n  50%, 55% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: scale3d(.3, .3, .3);\n    transform: scale3d(.3, .3, .3);\n  }\n}\n\n@keyframes bounceOut {\n  20% {\n    -webkit-transform: scale3d(.9, .9, .9);\n    -ms-transform: scale3d(.9, .9, .9);\n    transform: scale3d(.9, .9, .9);\n  }\n\n  50%, 55% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    -ms-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: scale3d(.3, .3, .3);\n    -ms-transform: scale3d(.3, .3, .3);\n    transform: scale3d(.3, .3, .3);\n  }\n}\n\n.bounceOut {\n  -webkit-animation-name: bounceOut;\n  animation-name: bounceOut;\n  -webkit-animation-duration: .75s;\n  animation-duration: .75s;\n}\n\n@-webkit-keyframes bounceOutDown {\n  20% {\n    -webkit-transform: translate3d(0, 10px, 0);\n    transform: translate3d(0, 10px, 0);\n  }\n\n  40%, 45% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0);\n  }\n}\n\n@keyframes bounceOutDown {\n  20% {\n    -webkit-transform: translate3d(0, 10px, 0);\n    -ms-transform: translate3d(0, 10px, 0);\n    transform: translate3d(0, 10px, 0);\n  }\n\n  40%, 45% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, -20px, 0);\n    -ms-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    -ms-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0);\n  }\n}\n\n.bounceOutDown {\n  -webkit-animation-name: bounceOutDown;\n  animation-name: bounceOutDown;\n}\n\n@-webkit-keyframes bounceOutLeft {\n  20% {\n    opacity: 1;\n    -webkit-transform: translate3d(20px, 0, 0);\n    transform: translate3d(20px, 0, 0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0);\n  }\n}\n\n@keyframes bounceOutLeft {\n  20% {\n    opacity: 1;\n    -webkit-transform: translate3d(20px, 0, 0);\n    -ms-transform: translate3d(20px, 0, 0);\n    transform: translate3d(20px, 0, 0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    -ms-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0);\n  }\n}\n\n.bounceOutLeft {\n  -webkit-animation-name: bounceOutLeft;\n  animation-name: bounceOutLeft;\n}\n\n@-webkit-keyframes bounceOutRight {\n  20% {\n    opacity: 1;\n    -webkit-transform: translate3d(-20px, 0, 0);\n    transform: translate3d(-20px, 0, 0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0);\n  }\n}\n\n@keyframes bounceOutRight {\n  20% {\n    opacity: 1;\n    -webkit-transform: translate3d(-20px, 0, 0);\n    -ms-transform: translate3d(-20px, 0, 0);\n    transform: translate3d(-20px, 0, 0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    -ms-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0);\n  }\n}\n\n.bounceOutRight {\n  -webkit-animation-name: bounceOutRight;\n  animation-name: bounceOutRight;\n}\n\n@-webkit-keyframes bounceOutUp {\n  20% {\n    -webkit-transform: translate3d(0, -10px, 0);\n    transform: translate3d(0, -10px, 0);\n  }\n\n  40%, 45% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 20px, 0);\n    transform: translate3d(0, 20px, 0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0);\n  }\n}\n\n@keyframes bounceOutUp {\n  20% {\n    -webkit-transform: translate3d(0, -10px, 0);\n    -ms-transform: translate3d(0, -10px, 0);\n    transform: translate3d(0, -10px, 0);\n  }\n\n  40%, 45% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 20px, 0);\n    -ms-transform: translate3d(0, 20px, 0);\n    transform: translate3d(0, 20px, 0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    -ms-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0);\n  }\n}\n\n.bounceOutUp {\n  -webkit-animation-name: bounceOutUp;\n  animation-name: bounceOutUp;\n}\n\n@-webkit-keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n\n  100% {\n    opacity: 1;\n  }\n}\n\n@keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n\n  100% {\n    opacity: 1;\n  }\n}\n\n.fadeIn {\n  -webkit-animation-name: fadeIn;\n  animation-name: fadeIn;\n}\n\n@-webkit-keyframes fadeInDown {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes fadeInDown {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n    -ms-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none;\n  }\n}\n\n.fadeInDown {\n  -webkit-animation-name: fadeInDown;\n  animation-name: fadeInDown;\n}\n\n@-webkit-keyframes fadeInDownBig {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes fadeInDownBig {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    -ms-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none;\n  }\n}\n\n.fadeInDownBig {\n  -webkit-animation-name: fadeInDownBig;\n  animation-name: fadeInDownBig;\n}\n\n@-webkit-keyframes fadeInLeft {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes fadeInLeft {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    -ms-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none;\n  }\n}\n\n.fadeInLeft {\n  -webkit-animation-name: fadeInLeft;\n  animation-name: fadeInLeft;\n}\n\n@-webkit-keyframes fadeInLeftBig {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes fadeInLeftBig {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    -ms-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none;\n  }\n}\n\n.fadeInLeftBig {\n  -webkit-animation-name: fadeInLeftBig;\n  animation-name: fadeInLeftBig;\n}\n\n@-webkit-keyframes fadeInRight {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes fadeInRight {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    -ms-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none;\n  }\n}\n\n.fadeInRight {\n  -webkit-animation-name: fadeInRight;\n  animation-name: fadeInRight;\n}\n\n@-webkit-keyframes fadeInRightBig {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes fadeInRightBig {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    -ms-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none;\n  }\n}\n\n.fadeInRightBig {\n  -webkit-animation-name: fadeInRightBig;\n  animation-name: fadeInRightBig;\n}\n\n@-webkit-keyframes fadeInUp {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes fadeInUp {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    -ms-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none;\n  }\n}\n\n.fadeInUp {\n  -webkit-animation-name: fadeInUp;\n  animation-name: fadeInUp;\n}\n\n@-webkit-keyframes fadeInUpBig {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes fadeInUpBig {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    -ms-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none;\n  }\n}\n\n.fadeInUpBig {\n  -webkit-animation-name: fadeInUpBig;\n  animation-name: fadeInUpBig;\n}\n\n@-webkit-keyframes fadeOut {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n  }\n}\n\n@keyframes fadeOut {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n  }\n}\n\n.fadeOut {\n  -webkit-animation-name: fadeOut;\n  animation-name: fadeOut;\n}\n\n@-webkit-keyframes fadeOutDown {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n  }\n}\n\n@keyframes fadeOutDown {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    -ms-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n  }\n}\n\n.fadeOutDown {\n  -webkit-animation-name: fadeOutDown;\n  animation-name: fadeOutDown;\n}\n\n@-webkit-keyframes fadeOutDownBig {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0);\n  }\n}\n\n@keyframes fadeOutDownBig {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    -ms-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0);\n  }\n}\n\n.fadeOutDownBig {\n  -webkit-animation-name: fadeOutDownBig;\n  animation-name: fadeOutDownBig;\n}\n\n@-webkit-keyframes fadeOutLeft {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n  }\n}\n\n@keyframes fadeOutLeft {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    -ms-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n  }\n}\n\n.fadeOutLeft {\n  -webkit-animation-name: fadeOutLeft;\n  animation-name: fadeOutLeft;\n}\n\n@-webkit-keyframes fadeOutLeftBig {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0);\n  }\n}\n\n@keyframes fadeOutLeftBig {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    -ms-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0);\n  }\n}\n\n.fadeOutLeftBig {\n  -webkit-animation-name: fadeOutLeftBig;\n  animation-name: fadeOutLeftBig;\n}\n\n@-webkit-keyframes fadeOutRight {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n  }\n}\n\n@keyframes fadeOutRight {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    -ms-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n  }\n}\n\n.fadeOutRight {\n  -webkit-animation-name: fadeOutRight;\n  animation-name: fadeOutRight;\n}\n\n@-webkit-keyframes fadeOutRightBig {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0);\n  }\n}\n\n@keyframes fadeOutRightBig {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    -ms-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0);\n  }\n}\n\n.fadeOutRightBig {\n  -webkit-animation-name: fadeOutRightBig;\n  animation-name: fadeOutRightBig;\n}\n\n@-webkit-keyframes fadeOutUp {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n  }\n}\n\n@keyframes fadeOutUp {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n    -ms-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n  }\n}\n\n.fadeOutUp {\n  -webkit-animation-name: fadeOutUp;\n  animation-name: fadeOutUp;\n}\n\n@-webkit-keyframes fadeOutUpBig {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0);\n  }\n}\n\n@keyframes fadeOutUpBig {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    -ms-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0);\n  }\n}\n\n.fadeOutUpBig {\n  -webkit-animation-name: fadeOutUpBig;\n  animation-name: fadeOutUpBig;\n}\n\n@-webkit-keyframes flip {\n  0% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -360deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -360deg);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out;\n  }\n\n  40% {\n    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);\n    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out;\n  }\n\n  50% {\n    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);\n    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n\n  80% {\n    -webkit-transform: perspective(400px) scale3d(.95, .95, .95);\n    transform: perspective(400px) scale3d(.95, .95, .95);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n\n  100% {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n}\n\n@keyframes flip {\n  0% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -360deg);\n    -ms-transform: perspective(400px) rotate3d(0, 1, 0, -360deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -360deg);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out;\n  }\n\n  40% {\n    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);\n    -ms-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);\n    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out;\n  }\n\n  50% {\n    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);\n    -ms-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);\n    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n\n  80% {\n    -webkit-transform: perspective(400px) scale3d(.95, .95, .95);\n    -ms-transform: perspective(400px) scale3d(.95, .95, .95);\n    transform: perspective(400px) scale3d(.95, .95, .95);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n\n  100% {\n    -webkit-transform: perspective(400px);\n    -ms-transform: perspective(400px);\n    transform: perspective(400px);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n}\n\n.animated.flip {\n  -webkit-backface-visibility: visible;\n  -ms-backface-visibility: visible;\n  backface-visibility: visible;\n  -webkit-animation-name: flip;\n  animation-name: flip;\n}\n\n@-webkit-keyframes flipInX {\n  0% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    -webkit-transition-timing-function: ease-in;\n    transition-timing-function: ease-in;\n    opacity: 0;\n  }\n\n  40% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    -webkit-transition-timing-function: ease-in;\n    transition-timing-function: ease-in;\n  }\n\n  60% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    opacity: 1;\n  }\n\n  80% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\n  }\n\n  100% {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n  }\n}\n\n@keyframes flipInX {\n  0% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    -ms-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    -webkit-transition-timing-function: ease-in;\n    transition-timing-function: ease-in;\n    opacity: 0;\n  }\n\n  40% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    -ms-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    -webkit-transition-timing-function: ease-in;\n    transition-timing-function: ease-in;\n  }\n\n  60% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    -ms-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    opacity: 1;\n  }\n\n  80% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\n    -ms-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\n  }\n\n  100% {\n    -webkit-transform: perspective(400px);\n    -ms-transform: perspective(400px);\n    transform: perspective(400px);\n  }\n}\n\n.flipInX {\n  -webkit-backface-visibility: visible !important;\n  -ms-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  -webkit-animation-name: flipInX;\n  animation-name: flipInX;\n}\n\n@-webkit-keyframes flipInY {\n  0% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    -webkit-transition-timing-function: ease-in;\n    transition-timing-function: ease-in;\n    opacity: 0;\n  }\n\n  40% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    -webkit-transition-timing-function: ease-in;\n    transition-timing-function: ease-in;\n  }\n\n  60% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    opacity: 1;\n  }\n\n  80% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\n  }\n\n  100% {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n  }\n}\n\n@keyframes flipInY {\n  0% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    -ms-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    -webkit-transition-timing-function: ease-in;\n    transition-timing-function: ease-in;\n    opacity: 0;\n  }\n\n  40% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    -ms-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    -webkit-transition-timing-function: ease-in;\n    transition-timing-function: ease-in;\n  }\n\n  60% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    -ms-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    opacity: 1;\n  }\n\n  80% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\n    -ms-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\n  }\n\n  100% {\n    -webkit-transform: perspective(400px);\n    -ms-transform: perspective(400px);\n    transform: perspective(400px);\n  }\n}\n\n.flipInY {\n  -webkit-backface-visibility: visible !important;\n  -ms-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  -webkit-animation-name: flipInY;\n  animation-name: flipInY;\n}\n\n@-webkit-keyframes flipOutX {\n  0% {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n  }\n\n  30% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    opacity: 0;\n  }\n}\n\n@keyframes flipOutX {\n  0% {\n    -webkit-transform: perspective(400px);\n    -ms-transform: perspective(400px);\n    transform: perspective(400px);\n  }\n\n  30% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    -ms-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    -ms-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    opacity: 0;\n  }\n}\n\n.flipOutX {\n  -webkit-animation-name: flipOutX;\n  animation-name: flipOutX;\n  -webkit-animation-duration: .75s;\n  animation-duration: .75s;\n  -webkit-backface-visibility: visible !important;\n  -ms-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n}\n\n@-webkit-keyframes flipOutY {\n  0% {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n  }\n\n  30% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    opacity: 0;\n  }\n}\n\n@keyframes flipOutY {\n  0% {\n    -webkit-transform: perspective(400px);\n    -ms-transform: perspective(400px);\n    transform: perspective(400px);\n  }\n\n  30% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    -ms-transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    -ms-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    opacity: 0;\n  }\n}\n\n.flipOutY {\n  -webkit-backface-visibility: visible !important;\n  -ms-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  -webkit-animation-name: flipOutY;\n  animation-name: flipOutY;\n  -webkit-animation-duration: .75s;\n  animation-duration: .75s;\n}\n\n@-webkit-keyframes lightSpeedIn {\n  0% {\n    -webkit-transform: translate3d(100%, 0, 0) skewX(-30deg);\n    transform: translate3d(100%, 0, 0) skewX(-30deg);\n    opacity: 0;\n  }\n\n  60% {\n    -webkit-transform: skewX(20deg);\n    transform: skewX(20deg);\n    opacity: 1;\n  }\n\n  80% {\n    -webkit-transform: skewX(-5deg);\n    transform: skewX(-5deg);\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1;\n  }\n}\n\n@keyframes lightSpeedIn {\n  0% {\n    -webkit-transform: translate3d(100%, 0, 0) skewX(-30deg);\n    -ms-transform: translate3d(100%, 0, 0) skewX(-30deg);\n    transform: translate3d(100%, 0, 0) skewX(-30deg);\n    opacity: 0;\n  }\n\n  60% {\n    -webkit-transform: skewX(20deg);\n    -ms-transform: skewX(20deg);\n    transform: skewX(20deg);\n    opacity: 1;\n  }\n\n  80% {\n    -webkit-transform: skewX(-5deg);\n    -ms-transform: skewX(-5deg);\n    transform: skewX(-5deg);\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none;\n    opacity: 1;\n  }\n}\n\n.lightSpeedIn {\n  -webkit-animation-name: lightSpeedIn;\n  animation-name: lightSpeedIn;\n  -webkit-animation-timing-function: ease-out;\n  animation-timing-function: ease-out;\n}\n\n@-webkit-keyframes lightSpeedOut {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform: translate3d(100%, 0, 0) skewX(30deg);\n    transform: translate3d(100%, 0, 0) skewX(30deg);\n    opacity: 0;\n  }\n}\n\n@keyframes lightSpeedOut {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform: translate3d(100%, 0, 0) skewX(30deg);\n    -ms-transform: translate3d(100%, 0, 0) skewX(30deg);\n    transform: translate3d(100%, 0, 0) skewX(30deg);\n    opacity: 0;\n  }\n}\n\n.lightSpeedOut {\n  -webkit-animation-name: lightSpeedOut;\n  animation-name: lightSpeedOut;\n  -webkit-animation-timing-function: ease-in;\n  animation-timing-function: ease-in;\n}\n\n@-webkit-keyframes rotateIn {\n  0% {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: rotate3d(0, 0, 1, -200deg);\n    transform: rotate3d(0, 0, 1, -200deg);\n    opacity: 0;\n  }\n\n  100% {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1;\n  }\n}\n\n@keyframes rotateIn {\n  0% {\n    -webkit-transform-origin: center;\n    -ms-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: rotate3d(0, 0, 1, -200deg);\n    -ms-transform: rotate3d(0, 0, 1, -200deg);\n    transform: rotate3d(0, 0, 1, -200deg);\n    opacity: 0;\n  }\n\n  100% {\n    -webkit-transform-origin: center;\n    -ms-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none;\n    opacity: 1;\n  }\n}\n\n.rotateIn {\n  -webkit-animation-name: rotateIn;\n  animation-name: rotateIn;\n}\n\n@-webkit-keyframes rotateInDownLeft {\n  0% {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n\n  100% {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1;\n  }\n}\n\n@keyframes rotateInDownLeft {\n  0% {\n    -webkit-transform-origin: left bottom;\n    -ms-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    -ms-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n\n  100% {\n    -webkit-transform-origin: left bottom;\n    -ms-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none;\n    opacity: 1;\n  }\n}\n\n.rotateInDownLeft {\n  -webkit-animation-name: rotateInDownLeft;\n  animation-name: rotateInDownLeft;\n}\n\n@-webkit-keyframes rotateInDownRight {\n  0% {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n\n  100% {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1;\n  }\n}\n\n@keyframes rotateInDownRight {\n  0% {\n    -webkit-transform-origin: right bottom;\n    -ms-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    -ms-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n\n  100% {\n    -webkit-transform-origin: right bottom;\n    -ms-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none;\n    opacity: 1;\n  }\n}\n\n.rotateInDownRight {\n  -webkit-animation-name: rotateInDownRight;\n  animation-name: rotateInDownRight;\n}\n\n@-webkit-keyframes rotateInUpLeft {\n  0% {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n\n  100% {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1;\n  }\n}\n\n@keyframes rotateInUpLeft {\n  0% {\n    -webkit-transform-origin: left bottom;\n    -ms-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    -ms-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n\n  100% {\n    -webkit-transform-origin: left bottom;\n    -ms-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none;\n    opacity: 1;\n  }\n}\n\n.rotateInUpLeft {\n  -webkit-animation-name: rotateInUpLeft;\n  animation-name: rotateInUpLeft;\n}\n\n@-webkit-keyframes rotateInUpRight {\n  0% {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -90deg);\n    transform: rotate3d(0, 0, 1, -90deg);\n    opacity: 0;\n  }\n\n  100% {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1;\n  }\n}\n\n@keyframes rotateInUpRight {\n  0% {\n    -webkit-transform-origin: right bottom;\n    -ms-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -90deg);\n    -ms-transform: rotate3d(0, 0, 1, -90deg);\n    transform: rotate3d(0, 0, 1, -90deg);\n    opacity: 0;\n  }\n\n  100% {\n    -webkit-transform-origin: right bottom;\n    -ms-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none;\n    opacity: 1;\n  }\n}\n\n.rotateInUpRight {\n  -webkit-animation-name: rotateInUpRight;\n  animation-name: rotateInUpRight;\n}\n\n@-webkit-keyframes rotateOut {\n  0% {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: rotate3d(0, 0, 1, 200deg);\n    transform: rotate3d(0, 0, 1, 200deg);\n    opacity: 0;\n  }\n}\n\n@keyframes rotateOut {\n  0% {\n    -webkit-transform-origin: center;\n    -ms-transform-origin: center;\n    transform-origin: center;\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform-origin: center;\n    -ms-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: rotate3d(0, 0, 1, 200deg);\n    -ms-transform: rotate3d(0, 0, 1, 200deg);\n    transform: rotate3d(0, 0, 1, 200deg);\n    opacity: 0;\n  }\n}\n\n.rotateOut {\n  -webkit-animation-name: rotateOut;\n  animation-name: rotateOut;\n}\n\n@-webkit-keyframes rotateOutDownLeft {\n  0% {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate(0, 0, 1, 45deg);\n    transform: rotate(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n}\n\n@keyframes rotateOutDownLeft {\n  0% {\n    -webkit-transform-origin: left bottom;\n    -ms-transform-origin: left bottom;\n    transform-origin: left bottom;\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform-origin: left bottom;\n    -ms-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate(0, 0, 1, 45deg);\n    -ms-transform: rotate(0, 0, 1, 45deg);\n    transform: rotate(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n}\n\n.rotateOutDownLeft {\n  -webkit-animation-name: rotateOutDownLeft;\n  animation-name: rotateOutDownLeft;\n}\n\n@-webkit-keyframes rotateOutDownRight {\n  0% {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n}\n\n@keyframes rotateOutDownRight {\n  0% {\n    -webkit-transform-origin: right bottom;\n    -ms-transform-origin: right bottom;\n    transform-origin: right bottom;\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform-origin: right bottom;\n    -ms-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    -ms-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n}\n\n.rotateOutDownRight {\n  -webkit-animation-name: rotateOutDownRight;\n  animation-name: rotateOutDownRight;\n}\n\n@-webkit-keyframes rotateOutUpLeft {\n  0% {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n}\n\n@keyframes rotateOutUpLeft {\n  0% {\n    -webkit-transform-origin: left bottom;\n    -ms-transform-origin: left bottom;\n    transform-origin: left bottom;\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform-origin: left bottom;\n    -ms-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    -ms-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n}\n\n.rotateOutUpLeft {\n  -webkit-animation-name: rotateOutUpLeft;\n  animation-name: rotateOutUpLeft;\n}\n\n@-webkit-keyframes rotateOutUpRight {\n  0% {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 90deg);\n    transform: rotate3d(0, 0, 1, 90deg);\n    opacity: 0;\n  }\n}\n\n@keyframes rotateOutUpRight {\n  0% {\n    -webkit-transform-origin: right bottom;\n    -ms-transform-origin: right bottom;\n    transform-origin: right bottom;\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform-origin: right bottom;\n    -ms-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 90deg);\n    -ms-transform: rotate3d(0, 0, 1, 90deg);\n    transform: rotate3d(0, 0, 1, 90deg);\n    opacity: 0;\n  }\n}\n\n.rotateOutUpRight {\n  -webkit-animation-name: rotateOutUpRight;\n  animation-name: rotateOutUpRight;\n}\n\n@-webkit-keyframes hinge {\n  0% {\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n  }\n\n  20%, 60% {\n    -webkit-transform: rotate3d(0, 0, 1, 80deg);\n    transform: rotate3d(0, 0, 1, 80deg);\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n  }\n\n  40%, 80% {\n    -webkit-transform: rotate3d(0, 0, 1, 60deg);\n    transform: rotate3d(0, 0, 1, 60deg);\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform: translate3d(0, 700px, 0);\n    transform: translate3d(0, 700px, 0);\n    opacity: 0;\n  }\n}\n\n@keyframes hinge {\n  0% {\n    -webkit-transform-origin: top left;\n    -ms-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n  }\n\n  20%, 60% {\n    -webkit-transform: rotate3d(0, 0, 1, 80deg);\n    -ms-transform: rotate3d(0, 0, 1, 80deg);\n    transform: rotate3d(0, 0, 1, 80deg);\n    -webkit-transform-origin: top left;\n    -ms-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n  }\n\n  40%, 80% {\n    -webkit-transform: rotate3d(0, 0, 1, 60deg);\n    -ms-transform: rotate3d(0, 0, 1, 60deg);\n    transform: rotate3d(0, 0, 1, 60deg);\n    -webkit-transform-origin: top left;\n    -ms-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform: translate3d(0, 700px, 0);\n    -ms-transform: translate3d(0, 700px, 0);\n    transform: translate3d(0, 700px, 0);\n    opacity: 0;\n  }\n}\n\n.hinge {\n  -webkit-animation-name: hinge;\n  animation-name: hinge;\n}\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n\n@-webkit-keyframes rollIn {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\n    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n}\n\n@keyframes rollIn {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\n    -ms-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\n    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none;\n  }\n}\n\n.rollIn {\n  -webkit-animation-name: rollIn;\n  animation-name: rollIn;\n}\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n\n@-webkit-keyframes rollOut {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\n    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\n  }\n}\n\n@keyframes rollOut {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\n    -ms-transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\n    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\n  }\n}\n\n.rollOut {\n  -webkit-animation-name: rollOut;\n  animation-name: rollOut;\n}\n\n@-webkit-keyframes zoomIn {\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(.3, .3, .3);\n    transform: scale3d(.3, .3, .3);\n  }\n\n  50% {\n    opacity: 1;\n  }\n}\n\n@keyframes zoomIn {\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(.3, .3, .3);\n    -ms-transform: scale3d(.3, .3, .3);\n    transform: scale3d(.3, .3, .3);\n  }\n\n  50% {\n    opacity: 1;\n  }\n}\n\n.zoomIn {\n  -webkit-animation-name: zoomIn;\n  animation-name: zoomIn;\n}\n\n@-webkit-keyframes zoomInDown {\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);\n    transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);\n    transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n  }\n}\n\n@keyframes zoomInDown {\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);\n    -ms-transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);\n    transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);\n    -ms-transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);\n    transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n  }\n}\n\n.zoomInDown {\n  -webkit-animation-name: zoomInDown;\n  animation-name: zoomInDown;\n}\n\n@-webkit-keyframes zoomInLeft {\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(.1, .1, .1) translate3d(-1000px, 0, 0);\n    transform: scale3d(.1, .1, .1) translate3d(-1000px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(10px, 0, 0);\n    transform: scale3d(.475, .475, .475) translate3d(10px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n  }\n}\n\n@keyframes zoomInLeft {\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(.1, .1, .1) translate3d(-1000px, 0, 0);\n    -ms-transform: scale3d(.1, .1, .1) translate3d(-1000px, 0, 0);\n    transform: scale3d(.1, .1, .1) translate3d(-1000px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(10px, 0, 0);\n    -ms-transform: scale3d(.475, .475, .475) translate3d(10px, 0, 0);\n    transform: scale3d(.475, .475, .475) translate3d(10px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n  }\n}\n\n.zoomInLeft {\n  -webkit-animation-name: zoomInLeft;\n  animation-name: zoomInLeft;\n}\n\n@-webkit-keyframes zoomInRight {\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(.1, .1, .1) translate3d(1000px, 0, 0);\n    transform: scale3d(.1, .1, .1) translate3d(1000px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(-10px, 0, 0);\n    transform: scale3d(.475, .475, .475) translate3d(-10px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n  }\n}\n\n@keyframes zoomInRight {\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(.1, .1, .1) translate3d(1000px, 0, 0);\n    -ms-transform: scale3d(.1, .1, .1) translate3d(1000px, 0, 0);\n    transform: scale3d(.1, .1, .1) translate3d(1000px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(-10px, 0, 0);\n    -ms-transform: scale3d(.475, .475, .475) translate3d(-10px, 0, 0);\n    transform: scale3d(.475, .475, .475) translate3d(-10px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n  }\n}\n\n.zoomInRight {\n  -webkit-animation-name: zoomInRight;\n  animation-name: zoomInRight;\n}\n\n@-webkit-keyframes zoomInUp {\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(.1, .1, .1) translate3d(0, 1000px, 0);\n    transform: scale3d(.1, .1, .1) translate3d(0, 1000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);\n    transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n  }\n}\n\n@keyframes zoomInUp {\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(.1, .1, .1) translate3d(0, 1000px, 0);\n    -ms-transform: scale3d(.1, .1, .1) translate3d(0, 1000px, 0);\n    transform: scale3d(.1, .1, .1) translate3d(0, 1000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);\n    -ms-transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);\n    transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n  }\n}\n\n.zoomInUp {\n  -webkit-animation-name: zoomInUp;\n  animation-name: zoomInUp;\n}\n\n@-webkit-keyframes zoomOut {\n  0% {\n    opacity: 1;\n  }\n\n  50% {\n    opacity: 0;\n    -webkit-transform: scale3d(.3, .3, .3);\n    transform: scale3d(.3, .3, .3);\n  }\n\n  100% {\n    opacity: 0;\n  }\n}\n\n@keyframes zoomOut {\n  0% {\n    opacity: 1;\n  }\n\n  50% {\n    opacity: 0;\n    -webkit-transform: scale3d(.3, .3, .3);\n    -ms-transform: scale3d(.3, .3, .3);\n    transform: scale3d(.3, .3, .3);\n  }\n\n  100% {\n    opacity: 0;\n  }\n}\n\n.zoomOut {\n  -webkit-animation-name: zoomOut;\n  animation-name: zoomOut;\n}\n\n@-webkit-keyframes zoomOutDown {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);\n    transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: scale3d(.1, .1, .1) translate3d(0, 2000px, 0);\n    transform: scale3d(.1, .1, .1) translate3d(0, 2000px, 0);\n    -webkit-transform-origin: center bottom;\n    transform-origin: center bottom;\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n  }\n}\n\n@keyframes zoomOutDown {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);\n    -ms-transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);\n    transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: scale3d(.1, .1, .1) translate3d(0, 2000px, 0);\n    -ms-transform: scale3d(.1, .1, .1) translate3d(0, 2000px, 0);\n    transform: scale3d(.1, .1, .1) translate3d(0, 2000px, 0);\n    -webkit-transform-origin: center bottom;\n    -ms-transform-origin: center bottom;\n    transform-origin: center bottom;\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n  }\n}\n\n.zoomOutDown {\n  -webkit-animation-name: zoomOutDown;\n  animation-name: zoomOutDown;\n}\n\n@-webkit-keyframes zoomOutLeft {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(42px, 0, 0);\n    transform: scale3d(.475, .475, .475) translate3d(42px, 0, 0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: scale(.1) translate3d(-2000px, 0, 0);\n    transform: scale(.1) translate3d(-2000px, 0, 0);\n    -webkit-transform-origin: left center;\n    transform-origin: left center;\n  }\n}\n\n@keyframes zoomOutLeft {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(42px, 0, 0);\n    -ms-transform: scale3d(.475, .475, .475) translate3d(42px, 0, 0);\n    transform: scale3d(.475, .475, .475) translate3d(42px, 0, 0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: scale(.1) translate3d(-2000px, 0, 0);\n    -ms-transform: scale(.1) translate3d(-2000px, 0, 0);\n    transform: scale(.1) translate3d(-2000px, 0, 0);\n    -webkit-transform-origin: left center;\n    -ms-transform-origin: left center;\n    transform-origin: left center;\n  }\n}\n\n.zoomOutLeft {\n  -webkit-animation-name: zoomOutLeft;\n  animation-name: zoomOutLeft;\n}\n\n@-webkit-keyframes zoomOutRight {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(-42px, 0, 0);\n    transform: scale3d(.475, .475, .475) translate3d(-42px, 0, 0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: scale(.1) translate3d(2000px, 0, 0);\n    transform: scale(.1) translate3d(2000px, 0, 0);\n    -webkit-transform-origin: right center;\n    transform-origin: right center;\n  }\n}\n\n@keyframes zoomOutRight {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(-42px, 0, 0);\n    -ms-transform: scale3d(.475, .475, .475) translate3d(-42px, 0, 0);\n    transform: scale3d(.475, .475, .475) translate3d(-42px, 0, 0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: scale(.1) translate3d(2000px, 0, 0);\n    -ms-transform: scale(.1) translate3d(2000px, 0, 0);\n    transform: scale(.1) translate3d(2000px, 0, 0);\n    -webkit-transform-origin: right center;\n    -ms-transform-origin: right center;\n    transform-origin: right center;\n  }\n}\n\n.zoomOutRight {\n  -webkit-animation-name: zoomOutRight;\n  animation-name: zoomOutRight;\n}\n\n@-webkit-keyframes zoomOutUp {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);\n    transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: scale3d(.1, .1, .1) translate3d(0, -2000px, 0);\n    transform: scale3d(.1, .1, .1) translate3d(0, -2000px, 0);\n    -webkit-transform-origin: center bottom;\n    transform-origin: center bottom;\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n  }\n}\n\n@keyframes zoomOutUp {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);\n    -ms-transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);\n    transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: scale3d(.1, .1, .1) translate3d(0, -2000px, 0);\n    -ms-transform: scale3d(.1, .1, .1) translate3d(0, -2000px, 0);\n    transform: scale3d(.1, .1, .1) translate3d(0, -2000px, 0);\n    -webkit-transform-origin: center bottom;\n    -ms-transform-origin: center bottom;\n    transform-origin: center bottom;\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);\n  }\n}\n\n.zoomOutUp {\n  -webkit-animation-name: zoomOutUp;\n  animation-name: zoomOutUp;\n}", ""]);

	// exports


/***/ },
/* 6 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./normalize.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./normalize.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/\n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml,\nbody {\n  padding: 0px!important;\n}\nhtml,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nmenu,\nnav,\nsection {\n  display: block;\n}\nbody {\n  line-height: 1;\n}\nol,\nul {\n  list-style: none;\n}\nblockquote,\nq {\n  quotes: none;\n}\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: '';\n  content: none;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n", ""]);

	// exports


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./main.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./main.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, "/* Typography\nInclude: font-family, font-size, color */\nhtml,\nbody {\n  font-family: '\\5FAE\\8F6F\\96C5\\9ED1', Tahoma;\n  height: 100%;\n  font-size: 15px;\n  line-height: 1.50;\n  color: #ffffff;\n  background-color: #ffffff;\n  position: relative;\n  overflow: hidden;\n}\nul,\nol {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  color: #ffffff;\n}\nh1 {\n  font-size: 38px;\n  font-weight: 700;\n  margin-bottom: 20px;\n}\nh2 {\n  font-size: 28px;\n  margin-bottom: 15px;\n}\nh3 {\n  font-size: 22px;\n}\nh4 {\n  font-size: 18px;\n  font-weight: 700;\n}\nh5 {\n  font-size: 16px;\n  text-transform: uppercase;\n  font-weight: 700;\n}\nh6 {\n  font-weight: 700;\n}\nh1 span,\nh2 span,\nh3 span,\nh4 span {\n  color: #339BEB;\n}\n.text-colored {\n  color: #AB3B3A;\n}\na {\n  color: #AB3B3A;\n}\na:focus,\na:active {\n  outline: none;\n}\n.large {\n  font-size: 18px;\n}\nimg {\n  display: block;\n  max-width: 100%;\n  height: auto;\n}\n/* Header without Bootstrap\n----------------------------------------------------------------------------- */\n@media (min-width: 500px) {\n  .header {\n    height: 80px;\n    color: #ffffff;\n    padding: 0;\n    -webkit-transition: all 0.2s ease-in-out;\n    -moz-transition: all 0.2s ease-in-out;\n    -o-transition: all 0.2s ease-in-out;\n    -ms-transition: all 0.2s ease-in-out;\n    transition: all 0.2s ease-in-out;\n    top: 0;\n    border: none;\n    border-radius: 0px;\n    position: fixed;\n    width: 100%;\n    z-index: 1030;\n  }\n  .header .logo {\n    float: left;\n    width: 40%;\n    height: 80px;\n    display: inline;\n  }\n  .header .logo a img {\n    height: 50px;\n    margin-top: 15px;\n  }\n  .header .login {\n    width: 60%;\n    float: left;\n  }\n  .header .login .login-right {\n    float: right;\n  }\n  .header .login .login-right li {\n    float: right;\n    height: 80px;\n  }\n  .header .login .login-right li a {\n    color: #AB3B3A;\n    padding: 10px 20px;\n    font-size: 18px;\n    font-weight: bolder;\n    line-height: 80px;\n    transition: all 0.3s ease-in-out;\n  }\n  .header .login .login-right li a:hover {\n    text-decoration: none;\n    color: #AB3B3A;\n  }\n  .header .login .login-right li:first-child a {\n    padding-right: 60px;\n  }\n}\n@media (max-width: 500px) {\n  .header {\n    color: #ffffff;\n    padding: 0;\n    top: 0;\n    border: none;\n    border-radius: 0px;\n    position: fixed;\n    width: 100%;\n    z-index: 1030;\n  }\n  .header .logo {\n    width: 80%;\n    height: 50px;\n    margin: 0 auto;\n    text-align: center;\n  }\n  .header .logo a {\n    width: 100%;\n  }\n  .header .logo a img {\n    height: 50px;\n    margin: 0 auto;\n  }\n  .header .login {\n    width: 70%;\n    margin: 0 auto;\n  }\n  .header .login .login-right {\n    width: 100%;\n    float: right;\n  }\n  .header .login .login-right li {\n    text-align: center;\n    float: right;\n    width: 50%;\n    height: 80px;\n  }\n  .header .login .login-right li a {\n    color: #AB3B3A;\n    font-size: 18px;\n    font-weight: bolder;\n    line-height: 80px;\n    transition: all 0.3s ease-in-out;\n  }\n  .header .login .login-right li a:hover {\n    text-decoration: none;\n    color: #AB3B3A;\n  }\n}\n.banner {\n  width: 100%;\n  height: 100%;\n  min-height: 100%;\n  position: relative;\n  color: #fff;\n}\n.banner-image {\n  vertical-align: middle;\n  min-height: 100%;\n  width: 100%;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n}\n.banner:after {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.3);\n  content: \"\";\n}\n.banner-caption {\n  position: absolute;\n  top: 25%;\n  width: 100%;\n  z-index: 2;\n}\n/*\n\n/* Sections\n----------------------------------------------------------------------------- */\n.banner-caption h1,\n.banner-caption h2,\n.banner-caption h3,\n.banner-caption h4,\n.banner-caption h5,\n.banner-caption h6 {\n  color: #000000;\n}\n.banner-caption h1 {\n  font-size: 60px;\n}\n.banner-caption .title {\n  color: #ffffff;\n  font-size: 48px;\n  text-align: center;\n  font-weight: 700;\n  padding-bottom: 15px;\n}\n.banner-caption .subtitle {\n  color: #ffffff;\n  font-size: 28px;\n  text-align: center;\n  font-weight: 400;\n  padding-bottom: 20px;\n}\n@media (max-width: 500px) {\n  .banner-caption .subtitle {\n    color: #ffffff;\n    font-size: 24px;\n    text-align: center;\n    font-weight: 400;\n    padding-bottom: 20px;\n  }\n}\n.search-btn {\n  background-color: #AB3B3A;\n  transition: all 0.5s ease-in 0.3s;\n  border: none;\n  margin: 0px!important;\n}\n.search-btn:hover {\n  background-color: #86473F;\n  color: #ffffff;\n}\n/* Footer with Bootstrap\n----------------------------------------------------------------------------- */\n@media (min-width: 500px) {\n  .banner-caption-foot {\n    position: absolute;\n    bottom: 0;\n    height: 40px;\n    width: 100%;\n    z-index: 4;\n    background-color: rgba(0, 0, 0, 0.7);\n    content: \"\";\n  }\n  .banner-caption-foot .ft-left {\n    margin-left: 70px;\n    float: left;\n  }\n  .banner-caption-foot .ft-left li {\n    float: left;\n    list-style: none;\n    line-height: 40px;\n    margin-right: 12px;\n  }\n  .banner-caption-foot .ft-left li a {\n    color: #ffffff;\n    transition: all 0.3s ease-in-out;\n  }\n  .banner-caption-foot .ft-left li a:hover {\n    text-decoration: none;\n    color: #AB3B3A;\n  }\n  .banner-caption-foot .ft-right {\n    margin-right: 40px;\n    float: right;\n  }\n  .banner-caption-foot .ft-right li {\n    float: right;\n    list-style: none;\n    line-height: 40px;\n    margin-left: 12px;\n  }\n  .banner-caption-foot .ft-right li a {\n    color: #ffffff;\n    transition: all 0.3s ease-in-out;\n  }\n  .banner-caption-foot .ft-right li a:hover {\n    text-decoration: none;\n    color: #AB3B3A;\n  }\n}\n@media (max-width: 500px) {\n  .banner-caption-foot {\n    position: absolute;\n    bottom: 0;\n    height: 40px;\n    width: 100%;\n    z-index: 4;\n    background-color: rgba(0, 0, 0, 0.7);\n    content: \"\";\n    font-size: 10px;\n  }\n  .banner-caption-foot .ft-left {\n    text-align: center;\n    width: 80%;\n    margin: 0 auto;\n  }\n  .banner-caption-foot .ft-left li:nth-child(2n+1) {\n    width: 25%;\n    float: left;\n    list-style: none;\n    line-height: 20px;\n    height: 20px;\n  }\n  .banner-caption-foot .ft-left li:nth-child(2n+1) a {\n    color: #ffffff;\n    transition: all 0.3s ease-in-out;\n  }\n  .banner-caption-foot .ft-left li:nth-child(2n+1) a:hover {\n    text-decoration: none;\n    color: #AB3B3A;\n  }\n  .banner-caption-foot .ft-left li:nth-child(2n) {\n    width: 12.5%;\n    float: left;\n    list-style: none;\n    line-height: 20px;\n    height: 20px;\n  }\n  .banner-caption-foot .ft-left li:nth-child(2n) a {\n    color: #ffffff;\n    transition: all 0.3s ease-in-out;\n  }\n  .banner-caption-foot .ft-left li:nth-child(2n) a:hover {\n    text-decoration: none;\n    color: #AB3B3A;\n  }\n  .banner-caption-foot .ft-right {\n    float: right;\n    width: 80%;\n    margin: 0 auto;\n  }\n  .banner-caption-foot .ft-right li:nth-child(2n+1) {\n    float: right;\n    list-style: none;\n    line-height: 20px;\n    width: 40%;\n  }\n  .banner-caption-foot .ft-right li:nth-child(2n+1) a {\n    color: #ffffff;\n    transition: all 0.3s ease-in-out;\n  }\n  .banner-caption-foot .ft-right li:nth-child(2n+1) a:hover {\n    text-decoration: none;\n    color: #AB3B3A;\n  }\n  .banner-caption-foot .ft-right li:nth-child(2n) {\n    float: right;\n    list-style: none;\n    line-height: 20px;\n    width: 20%;\n  }\n  .banner-caption-foot .ft-right li:nth-child(2n) a {\n    color: #ffffff;\n    transition: all 0.3s ease-in-out;\n  }\n  .banner-caption-foot .ft-right li:nth-child(2n) a:hover {\n    text-decoration: none;\n    color: #AB3B3A;\n  }\n}\n/* The perfect clearfix\n----------------------------------------------------------------------------- */\n.cf:before,\n.cf:after {\n  content: \"\";\n  display: table;\n}\n.cf:after {\n  clear: both;\n}\n/* For IE 6/7 (trigger hasLayout) */\n.cf {\n  zoom: 1;\n}\n", ""]);

	// exports


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v2.2.0
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-01-08T20:02Z
	 */

	(function( global, factory ) {

		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}

	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//"use strict";
	var arr = [];

	var document = window.document;

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};



	var
		version = "2.2.0",

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {

			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},

		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?

				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :

				// Return all the elements in a clean array
				slice.call( this );
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {

			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {

				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = jQuery.isArray( copy ) ) ) ) {

						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray( src ) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend( {

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		isFunction: function( obj ) {
			return jQuery.type( obj ) === "function";
		},

		isArray: Array.isArray,

		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function( obj ) {

			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			var realStringObj = obj && obj.toString();
			return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
		},

		isPlainObject: function( obj ) {

			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}

			if ( obj.constructor &&
					!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}

			// If the function hasn't returned already, we're confident that
			// |obj| is a plain object, created by {} or constructed with new Object
			return true;
		},

		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},

		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}

			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;

			code = jQuery.trim( code );

			if ( code ) {

				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf( "use strict" ) === 1 ) {
					script = document.createElement( "script" );
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {

					// Otherwise, avoid the DOM node creation, insertion
					// and removal by using an indirect global eval

					indirect( code );
				}
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},

		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		each: function( obj, callback ) {
			var length, i = 0;

			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},

		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;

			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );

	// JSHint would error on this code due to the Symbol not being defined in ES5.
	// Defining this global in .jshintrc would create a danger of using the global
	// unguarded in another place, it seems safer to just disable JSHint for these
	// three lines.
	/* jshint ignore: start */
	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}
	/* jshint ignore: end */

	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

	function isArrayLike( obj ) {

		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type( obj );

		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.2.1
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2015-10-17
	 */
	(function( window ) {

	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},

		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,

		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",

		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",

		pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rnative = /^[^{]+\{\s*\[native \w/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibling = /[+~]/,
		rescape = /'|\\/g,

		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},

		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		};

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :

			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, nidselect, match, groups, newSelector,
			newContext = context && context.ownerDocument,

			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

		results = results || [];

		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

			return results;
		}

		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {

			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
			context = context || document;

			if ( documentIsHTML ) {

				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

					// ID selector
					if ( (m = match[1]) ) {

						// Document context
						if ( nodeType === 9 ) {
							if ( (elem = context.getElementById( m )) ) {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}

						// Element context
						} else {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && (elem = newContext.getElementById( m )) &&
								contains( context, elem ) &&
								elem.id === m ) {

								results.push( elem );
								return results;
							}
						}

					// Type selector
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;

					// Class selector
					} else if ( (m = match[3]) && support.getElementsByClassName &&
						context.getElementsByClassName ) {

						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}

				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!compilerCache[ selector + " " ] &&
					(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

					if ( nodeType !== 1 ) {
						newContext = context;
						newSelector = selector;

					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
					} else if ( context.nodeName.toLowerCase() !== "object" ) {

						// Capture the context ID, setting it first if necessary
						if ( (nid = context.getAttribute( "id" )) ) {
							nid = nid.replace( rescape, "\\$&" );
						} else {
							context.setAttribute( "id", (nid = expando) );
						}

						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
						while ( i-- ) {
							groups[i] = nidselect + " " + toSelector( groups[i] );
						}
						newSelector = groups.join( "," );

						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;
					}

					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}

	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");

		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}

	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = arr.length;

		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}

	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );

		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}

		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, parent,
			doc = node ? node.ownerDocument || node : preferredDoc;

		// Return early if doc is invalid or already selected
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );

		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if ( (parent = document.defaultView) && parent.top !== parent ) {
			// Support: IE 11
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", unloadHandler, false );

			// Support: IE 9 - 10 only
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", unloadHandler );
			}
		}

		/* Attributes
		---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});

		/* getElement(s)By*
		---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( document.createComment("") );
			return !div.getElementsByTagName("*").length;
		});

		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		});

		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					return m ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];

			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );

				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :

			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			};

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( div.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}

				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}

				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibing-combinator selector` fails
				if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});

			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {

			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );

		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};

		/* Sorting
		---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :

				// Otherwise we know they are disconnected
				1;

			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === document ? -1 :
					b === document ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;

			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}

			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}

			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};

		return document;
	};

	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );

		if ( support.matchesSelector && documentIsHTML &&
			!compilerCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}

		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;

		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}

				return match.slice( 0, 4 );
			},

			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();

				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}

				return match;
			},

			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];

				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},

			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},

			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, context, xml ) {
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							} else {
								// Use previously-cached element index if available
								if ( useCache ) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || (node[ expando ] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										(outerCache[ node.uniqueID ] = {});

									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {

										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {

											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] || (node[ expando ] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													(outerCache[ node.uniqueID ] = {});

												uniqueCache[ type ] = [ dirruns, diff ];
											}

											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );

				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),

			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),

			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),

			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			"root": function( elem ) {
				return elem === docElem;
			},

			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},

			"disabled": function( elem ) {
				return elem.disabled === true;
			},

			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},

			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},

			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},

			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},

			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},

			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),

			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),

			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),

			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};

	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}

			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;

		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

							if ( (oldCache = uniqueCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ dir ] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,

				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
					matcherIn;

			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];

		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;

				if ( outermost ) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						if ( !context && elem.ownerDocument !== document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context || document, xml) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						Sizzle.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );

		results = results || [];

		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {

			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;

				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}

	return Sizzle;

	})( window );



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;



	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};


	var siblings = function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	};


	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			} );

		}

		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );

		}

		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}

			qualifier = jQuery.filter( qualifier, elements );
		}

		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			} ) );
	};

	jQuery.fn.extend( {
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {

					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {

								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );

						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if ( elem && elem.parentNode ) {

							// Inject the element directly into the jQuery object
							this.length = 1;
							this[ 0 ] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[ 0 ] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :

					// Execute immediately if ready is not present
					selector( jQuery );
			}

			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}

			return jQuery.makeArray( selector, this );
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,

		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;

			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;

			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( pos ?
						pos.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},

		// Determine the position of an element within the set
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}

			// Locate the position of the desired element
			return indexOf.call( this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );

	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}

	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}

			if ( this.length > 1 ) {

				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}

			return this.pushStack( matched );
		};
	} );
	var rnotwhite = ( /\S+/g );



	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );

		var // Flag to know if list is currently firing
			firing,

			// Last fire value for non-forgettable lists
			memory,

			// Flag to know if list was already fired
			fired,

			// Flag to prevent firing
			locked,

			// Actual callback list
			list = [],

			// Queue of execution data for repeatable lists
			queue = [],

			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,

			// Fire callbacks
			fire = function() {

				// Enforce single-firing
				locked = options.once;

				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {

						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {

							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}

				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}

				firing = false;

				// Clean up if we're done firing for good
				if ( locked ) {

					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];

					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},

			// Actual Callbacks object
			self = {

				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {

						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}

						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( jQuery.isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );

						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},

				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );

							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},

				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},

				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},

				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},

				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},

				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},

				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},

				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};


	jQuery.extend( {

		Deferred: function( func ) {
			var tuples = [

					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this === promise ? newDefer.promise() : this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},

					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Keep pipe for back-compat
			promise.pipe = promise.then;

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];

				// promise[ done | fail | progress ] = list.add
				promise[ tuple[ 1 ] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add( function() {

						// state = [ resolved | rejected ]
						state = stateString;

					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}

				// deferred[ resolve | reject | notify ]
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,

				// the count of uncompleted subordinates
				remaining = length !== 1 ||
					( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

				// the master Deferred.
				// If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},

				progressValues, progressContexts, resolveContexts;

			// Add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.progress( updateFunc( i, progressContexts, progressValues ) )
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject );
					} else {
						--remaining;
					}
				}
			}

			// If we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}

			return deferred.promise();
		}
	} );


	// The deferred used on DOM ready
	var readyList;

	jQuery.fn.ready = function( fn ) {

		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	};

	jQuery.extend( {

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	} );

	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}

	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called
			// after the browser event has already occurred.
			// Support: IE9-10 only
			// Older IE sometimes signals "interactive" too soon
			if ( document.readyState === "complete" ||
				( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

				// Handle it asynchronously to allow scripts the opportunity to delay ready
				window.setTimeout( jQuery.ready );

			} else {

				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed );

				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed );
			}
		}
		return readyList.promise( obj );
	};

	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();




	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {

				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[ 0 ], key ) : emptyGet;
	};
	var acceptData = function( owner ) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};




	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		register: function( owner, initial ) {
			var value = initial || {};

			// If it is a node unlikely to be stringify-ed or looped over
			// use plain assignment
			if ( owner.nodeType ) {
				owner[ this.expando ] = value;

			// Otherwise secure it in a non-enumerable, non-writable property
			// configurability must be true to allow the property to be
			// deleted with the delete operator
			} else {
				Object.defineProperty( owner, this.expando, {
					value: value,
					writable: true,
					configurable: true
				} );
			}
			return owner[ this.expando ];
		},
		cache: function( owner ) {

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( !acceptData( owner ) ) {
				return {};
			}

			// Check if the owner object already has a cache
			var value = owner[ this.expando ];

			// If not, create one
			if ( !value ) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;

					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}

			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );

			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;

			// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :
				owner[ this.expando ] && owner[ this.expando ][ key ];
		},
		access: function( owner, key, value ) {
			var stored;

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {

				stored = this.get( owner, key );

				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase( key ) );
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				cache = owner[ this.expando ];

			if ( cache === undefined ) {
				return;
			}

			if ( key === undefined ) {
				this.register( owner );

			} else {

				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {

					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );

					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {

						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}

				i = name.length;

				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}

			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

				// Support: Chrome <= 35-45+
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://code.google.com/p/chromium/issues/detail?id=378607
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();



	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;

	function dataAttr( elem, key, data ) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :

						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch ( e ) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},

		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},

		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},

		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );

	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );

					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}

			return access( this, function( value ) {
				var data, camelKey;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {

					// Attempt to get data from the cache
					// with the key as-is
					data = dataUser.get( elem, key ) ||

						// Try to find dashed key if it exists (gh-2779)
						// This is for 2.2.x only
						dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

					if ( data !== undefined ) {
						return data;
					}

					camelKey = jQuery.camelCase( key );

					// Attempt to get data from the cache
					// with the key camelized
					data = dataUser.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				camelKey = jQuery.camelCase( key );
				this.each( function() {

					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = dataUser.get( this, camelKey );

					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					dataUser.set( this, camelKey, value );

					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
						dataUser.set( this, key, value );
					}
				} );
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );


	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );

	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}

			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );

					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var isHidden = function( elem, el ) {

			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" ||
				!jQuery.contains( elem.ownerDocument, elem );
		};



	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted,
			scale = 1,
			maxIterations = 20,
			currentValue = tween ?
				function() { return tween.cur(); } :
				function() { return jQuery.css( elem, prop, "" ); },
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

			// Starting value computation is required for potential unit mismatches
			initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );

		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style( elem, prop, initialInUnit + unit );

			// Update scale, tolerating zero or NaN from tween.cur()
			// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
			);
		}

		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	var rcheckableType = ( /^(?:checkbox|radio)$/i );

	var rtagName = ( /<([\w:-]+)/ );

	var rscriptType = ( /^$|\/(?:java|ecma)script/i );



	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

	// Support: IE9
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;


	function getAll( context, tag ) {

		// Support: IE9-11+
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret = typeof context.getElementsByTagName !== "undefined" ?
				context.getElementsByTagName( tag || "*" ) :
				typeof context.querySelectorAll !== "undefined" ?
					context.querySelectorAll( tag || "*" ) :
				[];

		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}


	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}


	var rhtml = /<|&#?\w+;/;

	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {

			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	}


	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );

		// Support: Android 4.0-4.3, Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );

		div.appendChild( input );

		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	} )();


	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE9
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {

			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}

		if ( data == null && fn == null ) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {

				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = {};
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},

		dispatch: function( event ) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );

			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Support (at least): Chrome, IE9
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			//
			// Support: Firefox<=42+
			// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
			if ( delegateCount && cur.nodeType &&
				( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

				for ( ; cur !== this; cur = cur.parentNode || this ) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push( { elem: cur, handlers: matches } );
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
			}

			return handlerQueue;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
			"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split( " " ),
			filter: function( event, original ) {

				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
				"screenX screenY toElement" ).split( " " ),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;

				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX +
						( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
						( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY +
						( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
						( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}

				return event;
			}
		},

		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];

			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

			event = new jQuery.Event( originalEvent );

			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}

			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}

			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}

			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};

	jQuery.Event = function( src, props ) {

		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&

					// Support: Android<4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;

		// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if ( e ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if ( e ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://code.google.com/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );

	jQuery.fn.extend( {
		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {

				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );


	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

		// Support: IE 10-11, Edge 10240+
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,

		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	function manipulationTarget( elem, content ) {
		if ( jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

			return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
		}

		return elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );

		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute( "type" );
		}

		return elem;
	}

	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if ( dest.nodeType !== 1 ) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.access( src );
			pdataCur = dataPriv.set( dest, pdataOld );
			events = pdataOld.events;

			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}

		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );

			dataUser.set( dest, udataCur );
		}
	}

	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;

		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip( collection, args, callback, ignored ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}

		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {

							// Support: Android<4.1, PhantomJS<2
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( collection[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {

							if ( node.src ) {

								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;

		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}

			if ( node.parentNode ) {
				if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}

		return elem;
	}

	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html.replace( rxhtmlTag, "<$1></$2>" );
		},

		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );

			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;

			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );

	jQuery.fn.extend( {

		// Keep domManip exposed until 3.0 (gh-2225)
		domManip: domManip,

		detach: function( selector ) {
			return remove( this, selector, true );
		},

		remove: function( selector ) {
			return remove( this, selector );
		},

		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},

		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},

		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},

		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},

		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {

					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

					value = jQuery.htmlPrefilter( value );

					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};

							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;

				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}

			// Force callback invocation
			}, ignored );
		}
	} );

	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );

				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	} );


	var iframe,
		elemdisplay = {

			// Support: Firefox
			// We have to pre-define these values for FF (#10227)
			HTML: "block",
			BODY: "block"
		};

	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */

	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

			display = jQuery.css( elem[ 0 ], "display" );

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];

		if ( !display ) {
			display = actualDisplay( nodeName, doc );

			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {

				// Use the already-created iframe if possible
				iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
					.appendTo( doc.documentElement );

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}

		return display;
	}
	var rmargin = ( /^margin/ );

	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

	var getStyles = function( elem ) {

			// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;

			if ( !view.opener ) {
				view = window;
			}

			return view.getComputedStyle( elem );
		};

	var swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};


	var documentElement = document.documentElement;



	( function() {
		var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );

		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}

		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
			"padding:0;margin-top:1px;position:absolute";
		container.appendChild( div );

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:relative;display:block;" +
				"margin:auto;border:1px;padding:1px;" +
				"top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild( container );

			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild( container );
		}

		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return boxSizingReliableVal;
			},
			pixelMarginRight: function() {

				// Support: Android 4.0-4.3
				// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
				// since that compresses better and they're computed together anyway.
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function() {

				// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return reliableMarginLeftVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =

					// Support: Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;box-sizing:content-box;" +
					"display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				documentElement.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

				documentElement.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		} );
	} )();


	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {
			ret = computed.getPropertyValue( name ) || computed[ name ];

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

			// Support: IE9-11+
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf( conditionFn, hookFn ) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}


	var

		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,

		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( name ) {

		// Shortcut for names that are not vendor prefixed
		if ( name in emptyStyle ) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}

	function setPositiveNumber( elem, value, subtract ) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?

			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}

	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?

			// If we already have the right measurement, avoid augmentation
			4 :

			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,

			val = 0;

		for ( ; i < 4; i += 2 ) {

			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}

			if ( isBorderBox ) {

				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		return val;
	}

	function getWidthOrHeight( elem, name, extra ) {

		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Support: IE11 only
		// In IE 11 fullscreen elements inside of an iframe have
		// 100x too small dimensions (gh-1764).
		if ( document.msFullscreenElement && window.top !== window ) {

			// Support: IE11 only
			// Running getBoundingClientRect on a disconnected node
			// in IE throws an error.
			if ( elem.getClientRects().length ) {
				val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
			}
		}

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {

			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}

			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test( val ) ) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );

			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}

	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;

		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}

			values[ index ] = dataPriv.get( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {

				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = dataPriv.access(
						elem,
						"olddisplay",
						defaultDisplay( elem.nodeName )
					);
				}
			} else {
				hidden = isHidden( elem );

				if ( display !== "none" || !hidden ) {
					dataPriv.set(
						elem,
						"olddisplay",
						hidden ? display : jQuery.css( elem, "display" )
					);
				}
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}

		return elements;
	}

	jQuery.extend( {

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {

						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {

			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;

			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if ( type === "number" ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}

				// Support: IE9-11+
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {

					style[ name ] = value;
				}

			} else {

				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );

			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}
			return val;
		}
	} );

	jQuery.each( [ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
						elem.offsetWidth === 0 ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, name, extra );
							} ) :
							getWidthOrHeight( elem, name, extra );
				}
			},

			set: function( elem, value, extra ) {
				var matches,
					styles = extra && getStyles( elem ),
					subtract = extra && augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					);

				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {

					elem.style[ name ] = value;
					value = jQuery.css( elem, name );
				}

				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );

	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
					) + "px";
			}
		}
	);

	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				return swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );

	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each( function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 &&
					( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
						jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = jQuery.now() );
	}

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );

		// Handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always( function() {

				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}

		// Height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );

			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
				style.display = "inline-block";
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}

		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// If there is dataShow left over from a stopped hide or show
					// and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

			// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}

		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", {} );
			}

			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done( function() {
					jQuery( elem ).hide();
				} );
			}
			anim.done( function() {
				var prop;

				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}

		// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
			style.display = display;
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {

				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

					// Support: Android 2.3
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ] );

				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,

						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length ; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( jQuery.isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						jQuery.proxy( result.stop, result );
				}
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);

		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}

	jQuery.Animation = jQuery.extend( Animation, {
		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},

		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnotwhite );
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},

		prefilters: [ defaultPrefilter ],

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
			opt.duration : opt.duration in jQuery.fx.speeds ?
				jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {

			// Show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()

				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {

					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}

			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {

						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );

	jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );

	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;

		fxNow = jQuery.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];

			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};

	jQuery.fx.stop = function() {
		window.clearInterval( timerId );

		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};


	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );

		input.type = "checkbox";

		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();


	var boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );

	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}

			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}

				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				elem.setAttribute( name, value + "" );
				return value;
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					propName = jQuery.propFix[ name ] || name;

					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {

						// Set corresponding property to false
						elem[ propName ] = false;
					}

					elem.removeAttribute( name );
				}
			}
		}
	} );

	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} );




	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );

	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				return ( elem[ name ] = value );
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			return elem[ name ];
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {

					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );

					return tabindex ?
						parseInt( tabindex, 10 ) :
						rfocusable.test( elem.nodeName ) ||
							rclickable.test( elem.nodeName ) && elem.href ?
								0 :
								-1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );

	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			}
		};
	}

	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );




	var rclass = /[\t\r\n\f]/g;

	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}

	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {

							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value;

			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}

			return this.each( function() {
				var className, i, self, classNames;

				if ( type === "string" ) {

					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = value.match( rnotwhite ) || [];

					while ( ( className = classNames[ i++ ] ) ) {

						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {

						// Store className if set
						dataPriv.set( this, "__className__", className );
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},

		hasClass: function( selector ) {
			var className, elem,
				i = 0;

			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + getClass( elem ) + " " ).replace( rclass, " " )
						.indexOf( className ) > -1
				) {
					return true;
				}
			}

			return false;
		}
	} );




	var rreturn = /\r/g;

	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[ 0 ];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?

						// Handle most common string cases
						ret.replace( rreturn, "" ) :

						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction( value );

			return this.each( function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";

				} else if ( typeof val === "number" ) {
					val += "";

				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );

	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {

					// Support: IE<11
					// option.value not trimmed (#14858)
					return jQuery.trim( elem.value );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&

								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ?
									!option.disabled : option.getAttribute( "disabled" ) === null ) &&
								( !option.parentNode.disabled ||
									!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];
						if ( option.selected =
								jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}
					}

					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );

	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );




	// Return jQuery for attributes-only inclusion


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend( jQuery.event, {

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf( "." ) > -1 ) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true

					// Previously, `originalEvent: {}` was set here, so stopPropagation call
					// would not be triggered on donor event, since in our own
					// jQuery.event.stopPropagation function we had a check for existence of
					// originalEvent.stopPropagation method, so, consequently it would be a noop.
					//
					// But now, this "simulate" function is used only for events
					// for which stopPropagation() is noop, so there is no need for that anymore.
					//
					// For the compat branch though, guard for "click" and "submit"
					// events is still used, but was moved to jQuery.event.stopPropagation function
					// because `originalEvent` should point to the original event for the constancy
					// with other events and for more focused logic
				}
			);

			jQuery.event.trigger( e, null, elem );

			if ( e.isDefaultPrevented() ) {
				event.preventDefault();
			}
		}

	} );

	jQuery.fn.extend( {

		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );


	jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
		function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );

	jQuery.fn.extend( {
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );




	support.focusin = "onfocusin" in window;


	// Support: Firefox
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome, Safari
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};

			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix );

					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix ) - 1;

					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );

					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = ( /\?/ );



	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};


	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};


	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),

		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );
		originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

			if ( jQuery.isFunction( func ) ) {

				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {

					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {

			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},

			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {

									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend( {

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,

				// URL without anti-cache param
				cacheURL,

				// Response headers
				responseHeadersString,
				responseHeaders,

				// timeout handle
				timeoutTimer,

				// Url cleanup var
				urlAnchor,

				// To know if global events are to be dispatched
				fireGlobals,

				// Loop variable
				i,

				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),

				// Callbacks context
				callbackContext = s.context || s,

				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,

				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),

				// Status-dependent callbacks
				statusCode = s.statusCode || {},

				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},

				// The jqXHR state
				state = 0,

				// Default abort message
				strAbort = "canceled",

				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {

									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {

								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
				.replace( rprotocol, location.protocol + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );

				// Support: IE8-11+
				// IE throws exception if url is malformed, e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE8-11+
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?

						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :

						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}

				// If request was aborted inside ajaxSend, stop there
				if ( state === 2 ) {
					return jqXHR;
				}

				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}

				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {

					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );

					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Called once
				if ( state === 2 ) {
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );

	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {

			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );


	jQuery._evalUrl = function( url ) {
		return jQuery.ajax( {
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		} );
	};


	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;

			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapAll( html.call( this, i ) );
				} );
			}

			if ( this[ 0 ] ) {

				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}

				wrap.map( function() {
					var elem = this;

					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}

					return elem;
				} ).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}

			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			} );
		},

		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );

			return this.each( function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
			} );
		},

		unwrap: function() {
			return this.parent().each( function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			} ).end();
		}
	} );


	jQuery.expr.filters.hidden = function( elem ) {
		return !jQuery.expr.filters.visible( elem );
	};
	jQuery.expr.filters.visible = function( elem ) {

		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		// Use OR instead of AND as the element is not visible if either is true
		// See tickets #10406 and #13132
		return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
	};




	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( jQuery.isArray( obj ) ) {

			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {

					// Treat each array item as a scalar.
					add( prefix, v );

				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );

		} else if ( !traditional && jQuery.type( obj ) === "object" ) {

			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {

			// Serialize scalar item.
			add( prefix, obj );
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {

				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );

		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};

	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} )
			.filter( function() {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} )
			.map( function( i, elem ) {
				var val = jQuery( this ).val();

				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						} ) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );


	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};

	var xhrSuccessStatus = {

			// File protocol always yields status code 0, assume 200
			0: 200,

			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();

					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}

					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {

									// Support: IE9
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(

											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,

										// Support: IE9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback( "error" );

					// Support: IE9
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {

							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}

					// Create the abort callback
					callback = callback( "abort" );

					try {

						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},

				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {

		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" ).prop( {
						charset: s.scriptCharset,
						src: s.url
					} ).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// Force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always( function() {

				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );

				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}

				// Save back as free
				if ( s[ callbackName ] ) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			} );

			// Delegate to script
			return "script";
		}
	} );




	// Support: Safari 8+
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = ( function() {
		var body = document.implementation.createHTMLDocument( "" ).body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	} )();


	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		context = context || ( support.createHTMLDocument ?
			document.implementation.createHTMLDocument( "" ) :
			document );

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}

		parsed = buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


	// Keep a copy of the old load method
	var _load = jQuery.fn.load;

	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}

		var selector, type, response,
			self = this,
			off = url.indexOf( " " );

		if ( off > -1 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( jQuery.isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}

		return this;
	};




	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );




	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};




	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( jQuery.isFunction( options ) ) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );

			} else {
				curElem.css( props );
			}
		}
	};

	jQuery.fn.extend( {
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}

			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;

			if ( !doc ) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}

			box = elem.getBoundingClientRect();
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();

			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				// Subtract offsetParent scroll positions
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ) -
					offsetParent.scrollTop();
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true ) -
					offsetParent.scrollLeft();
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;

				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			} );
		}
	} );

	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );

				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );

	// Support: Safari<7-8+, Chrome<37-44+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );

					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
			function( defaultExtra, funcName ) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
					var doc;

					if ( jQuery.isWindow( elem ) ) {

						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?

						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		} );
	} );


	jQuery.fn.extend( {

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		},
		size: function() {
			return this.length;
		}
	} );

	jQuery.fn.andSelf = jQuery.fn.addBack;




	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}



	var

		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}

	return jQuery;
	}));


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(12);
	module.exports = function(){
		$(document).ready(function(){
			
			$(".banner-image").backstretch("images/6.jpg"); 
			var curIndex = 0; 
			var timeInterval = 10000; 
			var arr = new Array(); 
			arr[0] = "images/1.jpg"; 
			arr[1] = "images/2.jpg"; 
			arr[2] = "images/3.jpg"; 
			arr[3] = "images/4.jpg"; 
			arr[4] = "images/5.jpg";
			arr[4] = "images/6.jpg"; 
			setInterval(changeImg,timeInterval); 
			function changeImg() { 
				if (curIndex == arr.length-1) {
					curIndex = 0; 
				} else { 
					curIndex += 1; 
				} 
				$(".banner-image").backstretch(arr[curIndex]); 
				$(".banner-image").addClass('animated fadeIn');
				setTimeout(function(){
					$(".banner-image").removeClass('animated fadeIn');
				},4000);
			} 
			
			// Fixed header
			//-----------------------------------------------
			$(window).scroll(function() {
				if (($(".header.fixed").length > 0)) { 
					if(($(this).scrollTop() > 0) && ($(window).width() > 767)) {
						$("body").addClass("fixed-header-on");
					} else {
						$("body").removeClass("fixed-header-on");
					}
				};
			});

			$(window).load(function() {
				if (($(".header.fixed").length > 0)) { 
					if(($(this).scrollTop() > 0) && ($(window).width() > 767)) {
						$("body").addClass("fixed-header-on");
					} else {
						$("body").removeClass("fixed-header-on");
					}
				};
			});

			// Animations
			//-----------------------------------------------
			if (($("[data-animation-effect]").length>0) && !Modernizr.touch) {
				$("[data-animation-effect]").each(function() {
					var $this = $(this),
					animationEffect = $this.attr("data-animation-effect");
					if(Modernizr.mq('only all and (min-width: 768px)') && Modernizr.csstransitions) {
						$this.show(function() {
							setTimeout(function() {
								$this.addClass('animated object-visible ' + animationEffect);
							}, 400);
						}, {accX: 0, accY: -130});
					} else {
						$this.addClass('object-visible');
					}
				});
			};
			
			//Modal
			//-----------------------------------------------
			if($(".modal").length>0) {
				$(".modal").each(function() {
					$(".modal").prependTo( "body" );
				});
			}

		}); // End document ready
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
	 * Build: http://modernizr.com/download/#-csstransitions-touch-shiv-mq-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes-load
	 */
	module.exports=function(){
		window.Modernizr = function(a, b, c) {
			function A(a) {
				j.cssText = a
			}

			function B(a, b) {
				return A(m.join(a + ";") + (b || ""))
			}

			function C(a, b) {
				return typeof a === b
			}

			function D(a, b) {
				return !!~("" + a).indexOf(b)
			}

			function E(a, b) {
				for (var d in a) {
					var e = a[d];
					if (!D(e, "-") && j[e] !== c) return b == "pfx" ? e : !0
				}
				return !1
			}

			function F(a, b, d) {
				for (var e in a) {
					var f = b[a[e]];
					if (f !== c) return d === !1 ? a[e] : C(f, "function") ? f.bind(d || b) : f
				}
				return !1
			}

			function G(a, b, c) {
				var d = a.charAt(0).toUpperCase() + a.slice(1),
					e = (a + " " + o.join(d + " ") + d).split(" ");
				return C(b, "string") || C(b, "undefined") ? E(e, b) : (e = (a + " " + p.join(d + " ") + d).split(" "), F(e, b, c))
			}
			var d = "2.8.3",
				e = {},
				f = !0,
				g = b.documentElement,
				h = "modernizr",
				i = b.createElement(h),
				j = i.style,
				k, l = {}.toString,
				m = " -webkit- -moz- -o- -ms- ".split(" "),
				n = "Webkit Moz O ms",
				o = n.split(" "),
				p = n.toLowerCase().split(" "),
				q = {},
				r = {},
				s = {},
				t = [],
				u = t.slice,
				v, w = function(a, c, d, e) {
					var f, i, j, k, l = b.createElement("div"),
						m = b.body,
						n = m || b.createElement("body");
					if (parseInt(d, 10))
						while (d--) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j);
					return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !!i
				},
				x = function(b) {
					var c = a.matchMedia || a.msMatchMedia;
					if (c) return c(b) && c(b).matches || !1;
					var d;
					return w("@media " + b + " { #" + h + " { position: absolute; } }", function(b) {
						d = (a.getComputedStyle ? getComputedStyle(b, null) : b.currentStyle)["position"] == "absolute"
					}), d
				},
				y = {}.hasOwnProperty,
				z;
			!C(y, "undefined") && !C(y.call, "undefined") ? z = function(a, b) {
				return y.call(a, b)
			} : z = function(a, b) {
				return b in a && C(a.constructor.prototype[b], "undefined")
			}, Function.prototype.bind || (Function.prototype.bind = function(b) {
				var c = this;
				if (typeof c != "function") throw new TypeError;
				var d = u.call(arguments, 1),
					e = function() {
						if (this instanceof e) {
							var a = function() {};
							a.prototype = c.prototype;
							var f = new a,
								g = c.apply(f, d.concat(u.call(arguments)));
							return Object(g) === g ? g : f
						}
						return c.apply(b, d.concat(u.call(arguments)))
					};
				return e
			}), q.touch = function() {
				var c;
				return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : w(["@media (", m.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
					c = a.offsetTop === 9
				}), c
			}, q.csstransitions = function() {
				return G("transition")
			};
			for (var H in q) z(q, H) && (v = H.toLowerCase(), e[v] = q[H](), t.push((e[v] ? "" : "no-") + v));
			return e.addTest = function(a, b) {
					if (typeof a == "object")
						for (var d in a) z(a, d) && e.addTest(d, a[d]);
					else {
						a = a.toLowerCase();
						if (e[a] !== c) return e;
						b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b
					}
					return e
				}, A(""), i = k = null,
				function(a, b) {
					function l(a, b) {
						var c = a.createElement("p"),
							d = a.getElementsByTagName("head")[0] || a.documentElement;
						return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
					}

					function m() {
						var a = s.elements;
						return typeof a == "string" ? a.split(" ") : a
					}

					function n(a) {
						var b = j[a[h]];
						return b || (b = {}, i++, a[h] = i, j[i] = b), b
					}

					function o(a, c, d) {
						c || (c = b);
						if (k) return c.createElement(a);
						d || (d = n(c));
						var g;
						return d.cache[a] ? g = d.cache[a].cloneNode() : f.test(a) ? g = (d.cache[a] = d.createElem(a)).cloneNode() : g = d.createElem(a), g.canHaveChildren && !e.test(a) && !g.tagUrn ? d.frag.appendChild(g) : g
					}

					function p(a, c) {
						a || (a = b);
						if (k) return a.createDocumentFragment();
						c = c || n(a);
						var d = c.frag.cloneNode(),
							e = 0,
							f = m(),
							g = f.length;
						for (; e < g; e++) d.createElement(f[e]);
						return d
					}

					function q(a, b) {
						b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function(c) {
							return s.shivMethods ? o(c, a, b) : b.createElem(c)
						}, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + m().join().replace(/[\w\-]+/g, function(a) {
							return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
						}) + ");return n}")(s, b.frag)
					}

					function r(a) {
						a || (a = b);
						var c = n(a);
						return s.shivCSS && !g && !c.hasCSS && (c.hasCSS = !!l(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), k || q(a, c), a
					}
					var c = "3.7.0",
						d = a.html5 || {},
						e = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
						f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
						g, h = "_html5shiv",
						i = 0,
						j = {},
						k;
					(function() {
						try {
							var a = b.createElement("a");
							a.innerHTML = "<xyz></xyz>", g = "hidden" in a, k = a.childNodes.length == 1 || function() {
								b.createElement("a");
								var a = b.createDocumentFragment();
								return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined"
							}()
						} catch (c) {
							g = !0, k = !0
						}
					})();
					var s = {
						elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
						version: c,
						shivCSS: d.shivCSS !== !1,
						supportsUnknownElements: k,
						shivMethods: d.shivMethods !== !1,
						type: "default",
						shivDocument: r,
						createElement: o,
						createDocumentFragment: p
					};
					a.html5 = s, r(b)
				}(this, b), e._version = d, e._prefixes = m, e._domPrefixes = p, e._cssomPrefixes = o, e.mq = x, e.testProp = function(a) {
					return E([a])
				}, e.testAllProps = G, e.testStyles = w, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + t.join(" ") : ""), e
		}(this, this.document),
		function(a, b, c) {
			function d(a) {
				return "[object Function]" == o.call(a)
			}

			function e(a) {
				return "string" == typeof a
			}

			function f() {}

			function g(a) {
				return !a || "loaded" == a || "complete" == a || "uninitialized" == a
			}

			function h() {
				var a = p.shift();
				q = 1, a ? a.t ? m(function() {
					("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
				}, 0) : (a(), h()) : q = 0
			}

			function i(a, c, d, e, f, i, j) {
				function k(b) {
					if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
						"img" != a && m(function() {
							t.removeChild(l)
						}, 50);
						for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload()
					}
				}
				var j = j || B.errorTimeout,
					l = b.createElement(a),
					o = 0,
					r = 0,
					u = {
						t: d,
						s: c,
						e: f,
						a: i,
						x: j
					};
				1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
					k.call(this, r)
				}, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l))
			}

			function j(a, b, c, d, f) {
				return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this
			}

			function k() {
				var a = B;
				return a.loader = {
					load: j,
					i: 0
				}, a
			}
			var l = b.documentElement,
				m = a.setTimeout,
				n = b.getElementsByTagName("script")[0],
				o = {}.toString,
				p = [],
				q = 0,
				r = "MozAppearance" in l.style,
				s = r && !!b.createRange().compareNode,
				t = s ? l : n.parentNode,
				l = a.opera && "[object Opera]" == o.call(a.opera),
				l = !!b.attachEvent && !l,
				u = r ? "object" : l ? "script" : "img",
				v = l ? "script" : u,
				w = Array.isArray || function(a) {
					return "[object Array]" == o.call(a)
				},
				x = [],
				y = {},
				z = {
					timeout: function(a, b) {
						return b.length && (a.timeout = b[0]), a
					}
				},
				A, B;
			B = function(a) {
				function b(a) {
					var a = a.split("!"),
						b = x.length,
						c = a.pop(),
						d = a.length,
						c = {
							url: c,
							origUrl: c,
							prefixes: a
						},
						e, f, g;
					for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
					for (f = 0; f < b; f++) c = x[f](c);
					return c
				}

				function g(a, e, f, g, h) {
					var i = b(a),
						j = i.autoCallback;
					i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function() {
						k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2
					})))
				}

				function h(a, b) {
					function c(a, c) {
						if (a) {
							if (e(a)) c || (j = function() {
								var a = [].slice.call(arguments);
								k.apply(this, a), l()
							}), g(a, j, b, 0, h);
							else if (Object(a) === a)
								for (n in m = function() {
										var b = 0,
											c;
										for (c in a) a.hasOwnProperty(c) && b++;
										return b
									}(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
									var a = [].slice.call(arguments);
									k.apply(this, a), l()
								} : j[n] = function(a) {
									return function() {
										var b = [].slice.call(arguments);
										a && a.apply(this, b), l()
									}
								}(k[n])), g(a[n], j, b, n, h))
						} else !c && l()
					}
					var h = !!a.test,
						i = a.load || a.both,
						j = a.callback || f,
						k = j,
						l = a.complete || f,
						m, n;
					c(h ? a.yep : a.nope, !!i), i && c(i)
				}
				var i, j, l = this.yepnope.loader;
				if (e(a)) g(a, 0, l, 0);
				else if (w(a))
					for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
				else Object(a) === a && h(a, l)
			}, B.addPrefix = function(a, b) {
				z[a] = b
			}, B.addFilter = function(a) {
				x.push(a)
			}, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function() {
				b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete"
			}, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
				var k = b.createElement("script"),
					l, o, e = e || B.errorTimeout;
				k.src = a;
				for (o in d) k.setAttribute(o, d[o]);
				c = j ? h : c || f, k.onreadystatechange = k.onload = function() {
					!l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null)
				}, m(function() {
					l || (l = 1, c(1))
				}, e), i ? k.onload() : n.parentNode.insertBefore(k, n)
			}, a.yepnope.injectCss = function(a, c, d, e, g, i) {
				var e = b.createElement("link"),
					j, c = i ? h : c || f;
				e.href = a, e.rel = "stylesheet", e.type = "text/css";
				for (j in d) e.setAttribute(j, d[j]);
				g || (n.parentNode.insertBefore(e, n), m(c, 0))
			}
		}(this, document), Modernizr.load = function() {
			yepnope.apply(window, [].slice.call(arguments, 0))
		};
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/*! Backstretch - v2.0.4 - 2013-06-19
	 * http://srobbin.com/jquery-plugins/backstretch/
	 * Copyright (c) 2013 Scott Robbin; Licensed MIT */
	var $ = __webpack_require__(12);
	module.exports = function(a, d, p) {
		a.fn.backstretch = function(c, b) {
			(c === p || 0 === c.length) && a.error("No images were supplied for Backstretch");
			0 === a(d).scrollTop() && d.scrollTo(0, 0);
			return this.each(function() {
				var d = a(this),
					g = d.data("backstretch");
				if (g) {
					if ("string" == typeof c && "function" == typeof g[c]) {
						g[c](b);
						return
					}
					b = a.extend(g.options, b);
					g.destroy(!0)
				}
				g = new q(this, c, b);
				d.data("backstretch", g)
			})
		};
		a.backstretch = function(c, b) {
			return a("body").backstretch(c, b).data("backstretch")
		};
		a.expr[":"].backstretch = function(c) {
			return a(c).data("backstretch") !== p
		};
		a.fn.backstretch.defaults = {
			centeredX: !0,
			centeredY: !0,
			duration: 5E3,
			fade: 0
		};
		var r = {
				left: 0,
				top: 0,
				overflow: "hidden",
				margin: 0,
				padding: 0,
				height: "100%",
				width: "100%",
				zIndex: -999999
			},
			s = {
				position: "absolute",
				display: "none",
				margin: 0,
				padding: 0,
				border: "none",
				width: "auto",
				height: "auto",
				maxHeight: "none",
				maxWidth: "none",
				zIndex: -999999
			},
			q = function(c, b, e) {
				this.options = a.extend({}, a.fn.backstretch.defaults, e || {});
				this.images = a.isArray(b) ? b : [b];
				a.each(this.images, function() {
					a("<img />")[0].src = this
				});
				this.isBody = c === document.body;
				this.$container = a(c);
				this.$root = this.isBody ? l ? a(d) : a(document) : this.$container;
				c = this.$container.children(".backstretch").first();
				this.$wrap = c.length ? c : a('<div class="backstretch"></div>').css(r).appendTo(this.$container);
				this.isBody || (c = this.$container.css("position"), b = this.$container.css("zIndex"), this.$container.css({
					position: "static" === c ? "relative" : c,
					zIndex: "auto" === b ? 0 : b,
					background: "none"
				}), this.$wrap.css({
					zIndex: -999998
				}));
				this.$wrap.css({
					position: this.isBody && l ? "fixed" : "absolute"
				});
				this.index = 0;
				this.show(this.index);
				a(d).on("resize.backstretch", a.proxy(this.resize, this)).on("orientationchange.backstretch", a.proxy(function() {
					this.isBody && 0 === d.pageYOffset && (d.scrollTo(0, 1), this.resize())
				}, this))
			};
		q.prototype = {
			resize: function() {
				try {
					var a = {
							left: 0,
							top: 0
						},
						b = this.isBody ? this.$root.width() : this.$root.innerWidth(),
						e = b,
						g = this.isBody ? d.innerHeight ? d.innerHeight : this.$root.height() : this.$root.innerHeight(),
						j = e / this.$img.data("ratio"),
						f;
					j >= g ? (f = (j - g) / 2, this.options.centeredY && (a.top = "-" + f + "px")) : (j = g, e = j * this.$img.data("ratio"), f = (e - b) / 2, this.options.centeredX && (a.left = "-" + f + "px"));
					this.$wrap.css({
						width: b,
						height: g
					}).find("img:not(.deleteable)").css({
						width: e,
						height: j
					}).css(a)
				} catch (h) {}
				return this
			},
			show: function(c) {
				if (!(Math.abs(c) > this.images.length - 1)) {
					var b = this,
						e = b.$wrap.find("img").addClass("deleteable"),
						d = {
							relatedTarget: b.$container[0]
						};
					b.$container.trigger(a.Event("backstretch.before", d), [b, c]);
					this.index = c;
					clearInterval(b.interval);
					b.$img = a("<img />").css(s).bind("load", function(f) {
						var h = this.width || a(f.target).width();
						f = this.height || a(f.target).height();
						a(this).data("ratio", h / f);
						a(this).fadeIn(b.options.speed || b.options.fade, function() {
							e.remove();
							b.paused || b.cycle();
							a(["after", "show"]).each(function() {
								b.$container.trigger(a.Event("backstretch." + this, d), [b, c])
							})
						});
						b.resize()
					}).appendTo(b.$wrap);
					b.$img.attr("src", b.images[c]);
					return b
				}
			},
			next: function() {
				return this.show(this.index < this.images.length - 1 ? this.index + 1 : 0)
			},
			prev: function() {
				return this.show(0 === this.index ? this.images.length - 1 : this.index - 1)
			},
			pause: function() {
				this.paused = !0;
				return this
			},
			resume: function() {
				this.paused = !1;
				this.next();
				return this
			},
			cycle: function() {
				1 < this.images.length && (clearInterval(this.interval), this.interval = setInterval(a.proxy(function() {
					this.paused || this.next()
				}, this), this.options.duration));
				return this
			},
			destroy: function(c) {
				a(d).off("resize.backstretch orientationchange.backstretch");
				clearInterval(this.interval);
				c || this.$wrap.remove();
				this.$container.removeData("backstretch")
			}
		};
		var l, f = navigator.userAgent,
			m = navigator.platform,
			e = f.match(/AppleWebKit\/([0-9]+)/),
			e = !!e && e[1],
			h = f.match(/Fennec\/([0-9]+)/),
			h = !!h && h[1],
			n = f.match(/Opera Mobi\/([0-9]+)/),
			t = !!n && n[1],
			k = f.match(/MSIE ([0-9]+)/),
			k = !!k && k[1];
		l = !((-1 < m.indexOf("iPhone") || -1 < m.indexOf("iPad") || -1 < m.indexOf("iPod")) && e && 534 > e || d.operamini && "[object OperaMini]" === {}.toString.call(d.operamini) || n && 7458 > t || -1 < f.indexOf("Android") && e && 533 > e || h && 6 > h || "palmGetResource" in d && e && 534 > e || -1 < f.indexOf("MeeGo") && -1 < f.indexOf("NokiaBrowser/8.5.0") || k && 6 >= k)
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	/*!
	 * Bootstrap v3.3.2 (http://getbootstrap.com)
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 */
	module.exports = function(jQuery) {
	    if ("undefined" == typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");
	    +function (a) {
	        "use strict";
	        var b = a.fn.jquery.split(" ")[0].split(".");
	        if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
	    }(jQuery), +function (a) {
	        "use strict";
	        function b() {
	            var a = document.createElement("bootstrap"), b = {
	                WebkitTransition: "webkitTransitionEnd",
	                MozTransition: "transitionend",
	                OTransition: "oTransitionEnd otransitionend",
	                transition: "transitionend"
	            };
	            for (var c in b)if (void 0 !== a.style[c])return {end: b[c]};
	            return !1
	        }

	        a.fn.emulateTransitionEnd = function (b) {
	            var c = !1, d = this;
	            a(this).one("bsTransitionEnd", function () {
	                c = !0
	            });
	            var e = function () {
	                c || a(d).trigger(a.support.transition.end)
	            };
	            return setTimeout(e, b), this
	        }, a(function () {
	            a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
	                bindType: a.support.transition.end,
	                delegateType: a.support.transition.end,
	                handle: function (b) {
	                    return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0
	                }
	            })
	        })
	    }(jQuery), +function (a) {
	        "use strict";
	        function b(b) {
	            return this.each(function () {
	                var c = a(this), e = c.data("bs.alert");
	                e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
	            })
	        }

	        var c = '[data-dismiss="alert"]', d = function (b) {
	            a(b).on("click", c, this.close)
	        };
	        d.VERSION = "3.3.2", d.TRANSITION_DURATION = 150, d.prototype.close = function (b) {
	            function c() {
	                g.detach().trigger("closed.bs.alert").remove()
	            }

	            var e = a(this), f = e.attr("data-target");
	            f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
	            var g = a(f);
	            b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
	        };
	        var e = a.fn.alert;
	        a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () {
	            return a.fn.alert = e, this
	        }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
	    }(jQuery), +function (a) {
	        "use strict";
	        function b(b) {
	            return this.each(function () {
	                var d = a(this), e = d.data("bs.button"), f = "object" == typeof b && b;
	                e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
	            })
	        }

	        var c = function (b, d) {
	            this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
	        };
	        c.VERSION = "3.3.2", c.DEFAULTS = {loadingText: "loading..."}, c.prototype.setState = function (b) {
	            var c = "disabled", d = this.$element, e = d.is("input") ? "val" : "html", f = d.data();
	            b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function () {
	                d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
	            }, this), 0)
	        }, c.prototype.toggle = function () {
	            var a = !0, b = this.$element.closest('[data-toggle="buttons"]');
	            if (b.length) {
	                var c = this.$element.find("input");
	                "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), a && c.prop("checked", !this.$element.hasClass("active")).trigger("change")
	            } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
	            a && this.$element.toggleClass("active")
	        };
	        var d = a.fn.button;
	        a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function () {
	            return a.fn.button = d, this
	        }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (c) {
	            var d = a(c.target);
	            d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), c.preventDefault()
	        }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (b) {
	            a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
	        })
	    }(jQuery), +function (a) {
	        "use strict";
	        function b(b) {
	            return this.each(function () {
	                var d = a(this), e = d.data("bs.carousel"), f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b), g = "string" == typeof b ? b : f.slide;
	                e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
	            })
	        }

	        var c = function (b, c) {
	            this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
	        };
	        c.VERSION = "3.3.2", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
	            interval: 5e3,
	            pause: "hover",
	            wrap: !0,
	            keyboard: !0
	        }, c.prototype.keydown = function (a) {
	            if (!/input|textarea/i.test(a.target.tagName)) {
	                switch (a.which) {
	                    case 37:
	                        this.prev();
	                        break;
	                    case 39:
	                        this.next();
	                        break;
	                    default:
	                        return
	                }
	                a.preventDefault()
	            }
	        }, c.prototype.cycle = function (b) {
	            return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
	        }, c.prototype.getItemIndex = function (a) {
	            return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
	        }, c.prototype.getItemForDirection = function (a, b) {
	            var c = this.getItemIndex(b), d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
	            if (d && !this.options.wrap)return b;
	            var e = "prev" == a ? -1 : 1, f = (c + e) % this.$items.length;
	            return this.$items.eq(f)
	        }, c.prototype.to = function (a) {
	            var b = this, c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
	            return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () {
	                b.to(a)
	            }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
	        }, c.prototype.pause = function (b) {
	            return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
	        }, c.prototype.next = function () {
	            return this.sliding ? void 0 : this.slide("next")
	        }, c.prototype.prev = function () {
	            return this.sliding ? void 0 : this.slide("prev")
	        }, c.prototype.slide = function (b, d) {
	            var e = this.$element.find(".item.active"), f = d || this.getItemForDirection(b, e), g = this.interval, h = "next" == b ? "left" : "right", i = this;
	            if (f.hasClass("active"))return this.sliding = !1;
	            var j = f[0], k = a.Event("slide.bs.carousel", {relatedTarget: j, direction: h});
	            if (this.$element.trigger(k), !k.isDefaultPrevented()) {
	                if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
	                    this.$indicators.find(".active").removeClass("active");
	                    var l = a(this.$indicators.children()[this.getItemIndex(f)]);
	                    l && l.addClass("active")
	                }
	                var m = a.Event("slid.bs.carousel", {relatedTarget: j, direction: h});
	                return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function () {
	                    f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function () {
	                        i.$element.trigger(m)
	                    }, 0)
	                }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
	            }
	        };
	        var d = a.fn.carousel;
	        a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function () {
	            return a.fn.carousel = d, this
	        };
	        var e = function (c) {
	            var d, e = a(this), f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
	            if (f.hasClass("carousel")) {
	                var g = a.extend({}, f.data(), e.data()), h = e.attr("data-slide-to");
	                h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
	            }
	        };
	        a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function () {
	            a('[data-ride="carousel"]').each(function () {
	                var c = a(this);
	                b.call(c, c.data())
	            })
	        })
	    }(jQuery), +function (a) {
	        "use strict";
	        function b(b) {
	            var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
	            return a(d)
	        }

	        function c(b) {
	            return this.each(function () {
	                var c = a(this), e = c.data("bs.collapse"), f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
	                !e && f.toggle && "show" == b && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
	            })
	        }

	        var d = function (b, c) {
	            this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a(this.options.trigger).filter('[href="#' + b.id + '"], [data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
	        };
	        d.VERSION = "3.3.2", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
	            toggle: !0,
	            trigger: '[data-toggle="collapse"]'
	        }, d.prototype.dimension = function () {
	            var a = this.$element.hasClass("width");
	            return a ? "width" : "height"
	        }, d.prototype.show = function () {
	            if (!this.transitioning && !this.$element.hasClass("in")) {
	                var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
	                if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
	                    var f = a.Event("show.bs.collapse");
	                    if (this.$element.trigger(f), !f.isDefaultPrevented()) {
	                        e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
	                        var g = this.dimension();
	                        this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
	                        var h = function () {
	                            this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
	                        };
	                        if (!a.support.transition)return h.call(this);
	                        var i = a.camelCase(["scroll", g].join("-"));
	                        this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
	                    }
	                }
	            }
	        }, d.prototype.hide = function () {
	            if (!this.transitioning && this.$element.hasClass("in")) {
	                var b = a.Event("hide.bs.collapse");
	                if (this.$element.trigger(b), !b.isDefaultPrevented()) {
	                    var c = this.dimension();
	                    this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
	                    var e = function () {
	                        this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
	                    };
	                    return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
	                }
	            }
	        }, d.prototype.toggle = function () {
	            this[this.$element.hasClass("in") ? "hide" : "show"]()
	        }, d.prototype.getParent = function () {
	            return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function (c, d) {
	                var e = a(d);
	                this.addAriaAndCollapsedClass(b(e), e)
	            }, this)).end()
	        }, d.prototype.addAriaAndCollapsedClass = function (a, b) {
	            var c = a.hasClass("in");
	            a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
	        };
	        var e = a.fn.collapse;
	        a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function () {
	            return a.fn.collapse = e, this
	        }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (d) {
	            var e = a(this);
	            e.attr("data-target") || d.preventDefault();
	            var f = b(e), g = f.data("bs.collapse"), h = g ? "toggle" : a.extend({}, e.data(), {trigger: this});
	            c.call(f, h)
	        })
	    }(jQuery), +function (a) {
	        "use strict";
	        function b(b) {
	            b && 3 === b.which || (a(e).remove(), a(f).each(function () {
	                var d = a(this), e = c(d), f = {relatedTarget: this};
	                e.hasClass("open") && (e.trigger(b = a.Event("hide.bs.dropdown", f)), b.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger("hidden.bs.dropdown", f)))
	            }))
	        }

	        function c(b) {
	            var c = b.attr("data-target");
	            c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
	            var d = c && a(c);
	            return d && d.length ? d : b.parent()
	        }

	        function d(b) {
	            return this.each(function () {
	                var c = a(this), d = c.data("bs.dropdown");
	                d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
	            })
	        }

	        var e = ".dropdown-backdrop", f = '[data-toggle="dropdown"]', g = function (b) {
	            a(b).on("click.bs.dropdown", this.toggle)
	        };
	        g.VERSION = "3.3.2", g.prototype.toggle = function (d) {
	            var e = a(this);
	            if (!e.is(".disabled, :disabled")) {
	                var f = c(e), g = f.hasClass("open");
	                if (b(), !g) {
	                    "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
	                    var h = {relatedTarget: this};
	                    if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented())return;
	                    e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger("shown.bs.dropdown", h)
	                }
	                return !1
	            }
	        }, g.prototype.keydown = function (b) {
	            if (/(38|40|27|32)/.test(b.which) && !/input|textarea/i.test(b.target.tagName)) {
	                var d = a(this);
	                if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
	                    var e = c(d), g = e.hasClass("open");
	                    if (!g && 27 != b.which || g && 27 == b.which)return 27 == b.which && e.find(f).trigger("focus"), d.trigger("click");
	                    var h = " li:not(.divider):visible a", i = e.find('[role="menu"]' + h + ', [role="listbox"]' + h);
	                    if (i.length) {
	                        var j = i.index(b.target);
	                        38 == b.which && j > 0 && j--, 40 == b.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
	                    }
	                }
	            }
	        };
	        var h = a.fn.dropdown;
	        a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function () {
	            return a.fn.dropdown = h, this
	        }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
	            a.stopPropagation()
	        }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', g.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', g.prototype.keydown)
	    }(jQuery), +function (a) {
	        "use strict";
	        function b(b, d) {
	            return this.each(function () {
	                var e = a(this), f = e.data("bs.modal"), g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
	                f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
	            })
	        }

	        var c = function (b, c) {
	            this.options = c, this.$body = a(document.body), this.$element = a(b), this.$backdrop = this.isShown = null, this.scrollbarWidth = 0, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
	                this.$element.trigger("loaded.bs.modal")
	            }, this))
	        };
	        c.VERSION = "3.3.2", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
	            backdrop: !0,
	            keyboard: !0,
	            show: !0
	        }, c.prototype.toggle = function (a) {
	            return this.isShown ? this.hide() : this.show(a)
	        }, c.prototype.show = function (b) {
	            var d = this, e = a.Event("show.bs.modal", {relatedTarget: b});
	            this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.backdrop(function () {
	                var e = a.support.transition && d.$element.hasClass("fade");
	                d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.options.backdrop && d.adjustBackdrop(), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in").attr("aria-hidden", !1), d.enforceFocus();
	                var f = a.Event("shown.bs.modal", {relatedTarget: b});
	                e ? d.$element.find(".modal-dialog").one("bsTransitionEnd", function () {
	                    d.$element.trigger("focus").trigger(f)
	                }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
	            }))
	        }, c.prototype.hide = function (b) {
	            b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
	        }, c.prototype.enforceFocus = function () {
	            a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
	                this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
	            }, this))
	        }, c.prototype.escape = function () {
	            this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function (a) {
	                27 == a.which && this.hide()
	            }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
	        }, c.prototype.resize = function () {
	            this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
	        }, c.prototype.hideModal = function () {
	            var a = this;
	            this.$element.hide(), this.backdrop(function () {
	                a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
	            })
	        }, c.prototype.removeBackdrop = function () {
	            this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
	        }, c.prototype.backdrop = function (b) {
	            var d = this, e = this.$element.hasClass("fade") ? "fade" : "";
	            if (this.isShown && this.options.backdrop) {
	                var f = a.support.transition && e;
	                if (this.$backdrop = a('<div class="modal-backdrop ' + e + '" />').prependTo(this.$element).on("click.dismiss.bs.modal", a.proxy(function (a) {
	                        a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
	                    }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b)return;
	                f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
	            } else if (!this.isShown && this.$backdrop) {
	                this.$backdrop.removeClass("in");
	                var g = function () {
	                    d.removeBackdrop(), b && b()
	                };
	                a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
	            } else b && b()
	        }, c.prototype.handleUpdate = function () {
	            this.options.backdrop && this.adjustBackdrop(), this.adjustDialog()
	        }, c.prototype.adjustBackdrop = function () {
	            this.$backdrop.css("height", 0).css("height", this.$element[0].scrollHeight)
	        }, c.prototype.adjustDialog = function () {
	            var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
	            this.$element.css({
	                paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
	                paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
	            })
	        }, c.prototype.resetAdjustments = function () {
	            this.$element.css({paddingLeft: "", paddingRight: ""})
	        }, c.prototype.checkScrollbar = function () {
	            this.bodyIsOverflowing = document.body.scrollHeight > document.documentElement.clientHeight, this.scrollbarWidth = this.measureScrollbar()
	        }, c.prototype.setScrollbar = function () {
	            var a = parseInt(this.$body.css("padding-right") || 0, 10);
	            this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
	        }, c.prototype.resetScrollbar = function () {
	            this.$body.css("padding-right", "")
	        }, c.prototype.measureScrollbar = function () {
	            var a = document.createElement("div");
	            a.className = "modal-scrollbar-measure", this.$body.append(a);
	            var b = a.offsetWidth - a.clientWidth;
	            return this.$body[0].removeChild(a), b
	        };
	        var d = a.fn.modal;
	        a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {
	            return a.fn.modal = d, this
	        }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (c) {
	            var d = a(this), e = d.attr("href"), f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")), g = f.data("bs.modal") ? "toggle" : a.extend({remote: !/#/.test(e) && e}, f.data(), d.data());
	            d.is("a") && c.preventDefault(), f.one("show.bs.modal", function (a) {
	                a.isDefaultPrevented() || f.one("hidden.bs.modal", function () {
	                    d.is(":visible") && d.trigger("focus")
	                })
	            }), b.call(f, g, this)
	        })
	    }(jQuery), +function (a) {
	        "use strict";
	        function b(b) {
	            return this.each(function () {
	                var d = a(this), e = d.data("bs.tooltip"), f = "object" == typeof b && b;
	                (e || "destroy" != b) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
	            })
	        }

	        var c = function (a, b) {
	            this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", a, b)
	        };
	        c.VERSION = "3.3.2", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
	            animation: !0,
	            placement: "top",
	            selector: !1,
	            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
	            trigger: "hover focus",
	            title: "",
	            delay: 0,
	            html: !1,
	            container: !1,
	            viewport: {selector: "body", padding: 0}
	        }, c.prototype.init = function (b, c, d) {
	            this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(this.options.viewport.selector || this.options.viewport);
	            for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
	                var g = e[f];
	                if ("click" == g)this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)); else if ("manual" != g) {
	                    var h = "hover" == g ? "mouseenter" : "focusin", i = "hover" == g ? "mouseleave" : "focusout";
	                    this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
	                }
	            }
	            this.options.selector ? this._options = a.extend({}, this.options, {
	                trigger: "manual",
	                selector: ""
	            }) : this.fixTitle()
	        }, c.prototype.getDefaults = function () {
	            return c.DEFAULTS
	        }, c.prototype.getOptions = function (b) {
	            return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
	                show: b.delay,
	                hide: b.delay
	            }), b
	        }, c.prototype.getDelegateOptions = function () {
	            var b = {}, c = this.getDefaults();
	            return this._options && a.each(this._options, function (a, d) {
	                c[a] != d && (b[a] = d)
	            }), b
	        }, c.prototype.enter = function (b) {
	            var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
	            return c && c.$tip && c.$tip.is(":visible") ? void(c.hoverState = "in") : (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function () {
	                "in" == c.hoverState && c.show()
	            }, c.options.delay.show)) : c.show())
	        }, c.prototype.leave = function (b) {
	            var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
	            return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function () {
	                "out" == c.hoverState && c.hide()
	            }, c.options.delay.hide)) : c.hide()
	        }, c.prototype.show = function () {
	            var b = a.Event("show.bs." + this.type);
	            if (this.hasContent() && this.enabled) {
	                this.$element.trigger(b);
	                var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
	                if (b.isDefaultPrevented() || !d)return;
	                var e = this, f = this.tip(), g = this.getUID(this.type);
	                this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
	                var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement, i = /\s?auto?\s?/i, j = i.test(h);
	                j && (h = h.replace(i, "") || "top"), f.detach().css({
	                    top: 0,
	                    left: 0,
	                    display: "block"
	                }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element);
	                var k = this.getPosition(), l = f[0].offsetWidth, m = f[0].offsetHeight;
	                if (j) {
	                    var n = h, o = this.options.container ? a(this.options.container) : this.$element.parent(), p = this.getPosition(o);
	                    h = "bottom" == h && k.bottom + m > p.bottom ? "top" : "top" == h && k.top - m < p.top ? "bottom" : "right" == h && k.right + l > p.width ? "left" : "left" == h && k.left - l < p.left ? "right" : h, f.removeClass(n).addClass(h)
	                }
	                var q = this.getCalculatedOffset(h, k, l, m);
	                this.applyPlacement(q, h);
	                var r = function () {
	                    var a = e.hoverState;
	                    e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
	                };
	                a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", r).emulateTransitionEnd(c.TRANSITION_DURATION) : r()
	            }
	        }, c.prototype.applyPlacement = function (b, c) {
	            var d = this.tip(), e = d[0].offsetWidth, f = d[0].offsetHeight, g = parseInt(d.css("margin-top"), 10), h = parseInt(d.css("margin-left"), 10);
	            isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top = b.top + g, b.left = b.left + h, a.offset.setOffset(d[0], a.extend({
	                using: function (a) {
	                    d.css({top: Math.round(a.top), left: Math.round(a.left)})
	                }
	            }, b), 0), d.addClass("in");
	            var i = d[0].offsetWidth, j = d[0].offsetHeight;
	            "top" == c && j != f && (b.top = b.top + f - j);
	            var k = this.getViewportAdjustedDelta(c, b, i, j);
	            k.left ? b.left += k.left : b.top += k.top;
	            var l = /top|bottom/.test(c), m = l ? 2 * k.left - e + i : 2 * k.top - f + j, n = l ? "offsetWidth" : "offsetHeight";
	            d.offset(b), this.replaceArrow(m, d[0][n], l)
	        }, c.prototype.replaceArrow = function (a, b, c) {
	            this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
	        }, c.prototype.setContent = function () {
	            var a = this.tip(), b = this.getTitle();
	            a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
	        }, c.prototype.hide = function (b) {
	            function d() {
	                "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
	            }

	            var e = this, f = this.tip(), g = a.Event("hide.bs." + this.type);
	            return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this)
	        }, c.prototype.fixTitle = function () {
	            var a = this.$element;
	            (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
	        }, c.prototype.hasContent = function () {
	            return this.getTitle()
	        }, c.prototype.getPosition = function (b) {
	            b = b || this.$element;
	            var c = b[0], d = "BODY" == c.tagName, e = c.getBoundingClientRect();
	            null == e.width && (e = a.extend({}, e, {width: e.right - e.left, height: e.bottom - e.top}));
	            var f = d ? {
	                top: 0,
	                left: 0
	            } : b.offset(), g = {scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()}, h = d ? {
	                width: a(window).width(),
	                height: a(window).height()
	            } : null;
	            return a.extend({}, e, g, h, f)
	        }, c.prototype.getCalculatedOffset = function (a, b, c, d) {
	            return "bottom" == a ? {
	                top: b.top + b.height,
	                left: b.left + b.width / 2 - c / 2
	            } : "top" == a ? {
	                top: b.top - d,
	                left: b.left + b.width / 2 - c / 2
	            } : "left" == a ? {
	                top: b.top + b.height / 2 - d / 2,
	                left: b.left - c
	            } : {top: b.top + b.height / 2 - d / 2, left: b.left + b.width}
	        }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
	            var e = {top: 0, left: 0};
	            if (!this.$viewport)return e;
	            var f = this.options.viewport && this.options.viewport.padding || 0, g = this.getPosition(this.$viewport);
	            if (/right|left/.test(a)) {
	                var h = b.top - f - g.scroll, i = b.top + f - g.scroll + d;
	                h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
	            } else {
	                var j = b.left - f, k = b.left + f + c;
	                j < g.left ? e.left = g.left - j : k > g.width && (e.left = g.left + g.width - k)
	            }
	            return e
	        }, c.prototype.getTitle = function () {
	            var a, b = this.$element, c = this.options;
	            return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
	        }, c.prototype.getUID = function (a) {
	            do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
	            return a
	        }, c.prototype.tip = function () {
	            return this.$tip = this.$tip || a(this.options.template)
	        }, c.prototype.arrow = function () {
	            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
	        }, c.prototype.enable = function () {
	            this.enabled = !0
	        }, c.prototype.disable = function () {
	            this.enabled = !1
	        }, c.prototype.toggleEnabled = function () {
	            this.enabled = !this.enabled
	        }, c.prototype.toggle = function (b) {
	            var c = this;
	            b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
	        }, c.prototype.destroy = function () {
	            var a = this;
	            clearTimeout(this.timeout), this.hide(function () {
	                a.$element.off("." + a.type).removeData("bs." + a.type)
	            })
	        };
	        var d = a.fn.tooltip;
	        a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () {
	            return a.fn.tooltip = d, this
	        }
	    }(jQuery), +function (a) {
	        "use strict";
	        function b(b) {
	            return this.each(function () {
	                var d = a(this), e = d.data("bs.popover"), f = "object" == typeof b && b;
	                (e || "destroy" != b) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
	            })
	        }

	        var c = function (a, b) {
	            this.init("popover", a, b)
	        };
	        if (!a.fn.tooltip)throw new Error("Popover requires tooltip.js");
	        c.VERSION = "3.3.2", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
	            placement: "right",
	            trigger: "click",
	            content: "",
	            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
	        }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {
	            return c.DEFAULTS
	        }, c.prototype.setContent = function () {
	            var a = this.tip(), b = this.getTitle(), c = this.getContent();
	            a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
	        }, c.prototype.hasContent = function () {
	            return this.getTitle() || this.getContent()
	        }, c.prototype.getContent = function () {
	            var a = this.$element, b = this.options;
	            return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
	        }, c.prototype.arrow = function () {
	            return this.$arrow = this.$arrow || this.tip().find(".arrow")
	        }, c.prototype.tip = function () {
	            return this.$tip || (this.$tip = a(this.options.template)), this.$tip
	        };
	        var d = a.fn.popover;
	        a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () {
	            return a.fn.popover = d, this
	        }
	    }(jQuery), +function (a) {
	        "use strict";
	        function b(c, d) {
	            var e = a.proxy(this.process, this);
	            this.$body = a("body"), this.$scrollElement = a(a(c).is("body") ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", e), this.refresh(), this.process()
	        }

	        function c(c) {
	            return this.each(function () {
	                var d = a(this), e = d.data("bs.scrollspy"), f = "object" == typeof c && c;
	                e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
	            })
	        }

	        b.VERSION = "3.3.2", b.DEFAULTS = {offset: 10}, b.prototype.getScrollHeight = function () {
	            return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
	        }, b.prototype.refresh = function () {
	            var b = "offset", c = 0;
	            a.isWindow(this.$scrollElement[0]) || (b = "position", c = this.$scrollElement.scrollTop()), this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight();
	            var d = this;
	            this.$body.find(this.selector).map(function () {
	                var d = a(this), e = d.data("target") || d.attr("href"), f = /^#./.test(e) && a(e);
	                return f && f.length && f.is(":visible") && [[f[b]().top + c, e]] || null
	            }).sort(function (a, b) {
	                return a[0] - b[0]
	            }).each(function () {
	                d.offsets.push(this[0]), d.targets.push(this[1])
	            })
	        }, b.prototype.process = function () {
	            var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.getScrollHeight(), d = this.options.offset + c - this.$scrollElement.height(), e = this.offsets, f = this.targets, g = this.activeTarget;
	            if (this.scrollHeight != c && this.refresh(), b >= d)return g != (a = f[f.length - 1]) && this.activate(a);
	            if (g && b < e[0])return this.activeTarget = null, this.clear();
	            for (a = e.length; a--;)g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a])
	        }, b.prototype.activate = function (b) {
	            this.activeTarget = b, this.clear();
	            var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', d = a(c).parents("li").addClass("active");
	            d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
	        }, b.prototype.clear = function () {
	            a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
	        };
	        var d = a.fn.scrollspy;
	        a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
	            return a.fn.scrollspy = d, this
	        }, a(window).on("load.bs.scrollspy.data-api", function () {
	            a('[data-spy="scroll"]').each(function () {
	                var b = a(this);
	                c.call(b, b.data())
	            })
	        })
	    }(jQuery), +function (a) {
	        "use strict";
	        function b(b) {
	            return this.each(function () {
	                var d = a(this), e = d.data("bs.tab");
	                e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
	            })
	        }

	        var c = function (b) {
	            this.element = a(b)
	        };
	        c.VERSION = "3.3.2", c.TRANSITION_DURATION = 150, c.prototype.show = function () {
	            var b = this.element, c = b.closest("ul:not(.dropdown-menu)"), d = b.data("target");
	            if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
	                var e = c.find(".active:last a"), f = a.Event("hide.bs.tab", {relatedTarget: b[0]}), g = a.Event("show.bs.tab", {relatedTarget: e[0]});
	                if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
	                    var h = a(d);
	                    this.activate(b.closest("li"), c), this.activate(h, h.parent(), function () {
	                        e.trigger({type: "hidden.bs.tab", relatedTarget: b[0]}), b.trigger({
	                            type: "shown.bs.tab",
	                            relatedTarget: e[0]
	                        })
	                    })
	                }
	            }
	        }, c.prototype.activate = function (b, d, e) {
	            function f() {
	                g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
	            }

	            var g = d.find("> .active"), h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
	            g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
	        };
	        var d = a.fn.tab;
	        a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {
	            return a.fn.tab = d, this
	        };
	        var e = function (c) {
	            c.preventDefault(), b.call(a(this), "show")
	        };
	        a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
	    }(jQuery), +function (a) {
	        "use strict";
	        function b(b) {
	            return this.each(function () {
	                var d = a(this), e = d.data("bs.affix"), f = "object" == typeof b && b;
	                e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
	            })
	        }

	        var c = function (b, d) {
	            this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition()
	        };
	        c.VERSION = "3.3.2", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
	            offset: 0,
	            target: window
	        }, c.prototype.getState = function (a, b, c, d) {
	            var e = this.$target.scrollTop(), f = this.$element.offset(), g = this.$target.height();
	            if (null != c && "top" == this.affixed)return c > e ? "top" : !1;
	            if ("bottom" == this.affixed)return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";
	            var h = null == this.affixed, i = h ? e : f.top, j = h ? g : b;
	            return null != c && c >= e ? "top" : null != d && i + j >= a - d ? "bottom" : !1
	        }, c.prototype.getPinnedOffset = function () {
	            if (this.pinnedOffset)return this.pinnedOffset;
	            this.$element.removeClass(c.RESET).addClass("affix");
	            var a = this.$target.scrollTop(), b = this.$element.offset();
	            return this.pinnedOffset = b.top - a
	        }, c.prototype.checkPositionWithEventLoop = function () {
	            setTimeout(a.proxy(this.checkPosition, this), 1)
	        }, c.prototype.checkPosition = function () {
	            if (this.$element.is(":visible")) {
	                var b = this.$element.height(), d = this.options.offset, e = d.top, f = d.bottom, g = a("body").height();
	                "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
	                var h = this.getState(g, b, e, f);
	                if (this.affixed != h) {
	                    null != this.unpin && this.$element.css("top", "");
	                    var i = "affix" + (h ? "-" + h : ""), j = a.Event(i + ".bs.affix");
	                    if (this.$element.trigger(j), j.isDefaultPrevented())return;
	                    this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
	                }
	                "bottom" == h && this.$element.offset({top: g - b - f})
	            }
	        };
	        var d = a.fn.affix;
	        a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function () {
	            return a.fn.affix = d, this
	        }, a(window).on("load", function () {
	            a('[data-spy="affix"]').each(function () {
	                var c = a(this), d = c.data();
	                d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
	            })
	        })
	    }(jQuery);
	};

/***/ }
/******/ ]);