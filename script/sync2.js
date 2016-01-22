/**
 * Created by Lumpychen on 16/1/16.
 */
(function(){
    $("#yunying").change(function(){
        $('#yunying-pre')[0].innerHTML=$(this).attr('value');

//Filament Group modification note:
//This version of excanvas is modified to support lazy loading of this file. More info here: http://pipwerks.com/2009/03/12/lazy-loading-excanvasjs/

// Copyright 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


// Known Issues:
//
// * Patterns are not implemented.
// * Radial gradient are not implemented. The VML version of these look very
//   different from the canvas one.
// * Clipping paths are not implemented.
// * Coordsize. The width and height attribute have higher priority than the
//   width and height style values which isn't correct.
// * Painting mode isn't implemented.
// * Canvas width/height should is using content-box by default. IE in
//   Quirks mode will draw the canvas using border-box. Either change your
//   doctype to HTML5
//   (http://www.whatwg.org/specs/web-apps/current-work/#the-doctype)
//   or use Box Sizing Behavior from WebFX
//   (http://webfx.eae.net/dhtml/boxsizing/boxsizing.html)
// * Non uniform scaling does not correctly scale strokes.
// * Optimize. There is always room for speed improvements.

// Only add this code if we do not already have a canvas implementation
        if (!document.createElement('canvas').getContext) {

            (function() {

                // alias some functions to make (compiled) code shorter
                var m = Math;
                var mr = m.round;
                var ms = m.sin;
                var mc = m.cos;
                var abs = m.abs;
                var sqrt = m.sqrt;

                // this is used for sub pixel precision
                var Z = 10;
                var Z2 = Z / 2;

                /**
                 * This funtion is assigned to the <canvas> elements as element.getContext().
                 * @this {HTMLElement}
                 * @return {CanvasRenderingContext2D_}
                 */
                function getContext() {
                    return this.context_ ||
                        (this.context_ = new CanvasRenderingContext2D_(this));
                }

                var slice = Array.prototype.slice;

                /**
                 * Binds a function to an object. The returned function will always use the
                 * passed in {@code obj} as {@code this}.
                 *
                 * Example:
                 *
                 *   g = bind(f, obj, a, b)
                 *   g(c, d) // will do f.call(obj, a, b, c, d)
                 *
                 * @param {Function} f The function to bind the object to
                 * @param {Object} obj The object that should act as this when the function
                 *     is called
                 * @param {*} var_args Rest arguments that will be used as the initial
                 *     arguments when the function is called
                 * @return {Function} A new function that has bound this
                 */
                function bind(f, obj, var_args) {
                    var a = slice.call(arguments, 2);
                    return function() {
                        return f.apply(obj, a.concat(slice.call(arguments)));
                    };
                }

                var G_vmlCanvasManager_ = {
                    init: function(opt_doc) {
                        if (/MSIE/.test(navigator.userAgent) && !window.opera) {
                            var doc = opt_doc || document;
                            // Create a dummy element so that IE will allow canvas elements to be
                            // recognized.
                            doc.createElement('canvas');

                            if(doc.readyState !== "complete"){

                                doc.attachEvent('onreadystatechange', bind(this.init_, this, doc));

                            } else {

                                this.init_(doc);

                            }

                        }
                    },

                    init_: function(doc) {
                        // create xmlns
                        if (!doc.namespaces['g_vml_']) {
                            doc.namespaces.add('g_vml_', 'urn:schemas-microsoft-com:vml',
                                '#default#VML');

                        }
                        if (!doc.namespaces['g_o_']) {
                            doc.namespaces.add('g_o_', 'urn:schemas-microsoft-com:office:office',
                                '#default#VML');
                        }

                        // Setup default CSS.  Only add one style sheet per document
                        if (!doc.styleSheets['ex_canvas_']) {
                            var ss = doc.createStyleSheet();
                            ss.owningElement.id = 'ex_canvas_';
                            ss.cssText = 'canvas{display:inline-block;overflow:hidden;' +
                                    // default size is 300x150 in Gecko and Opera
                                'text-align:left;width:300px;height:150px}' +
                                'g_vml_\\:*{behavior:url(#default#VML)}' +
                                'g_o_\\:*{behavior:url(#default#VML)}';

                        }

                        // find all canvas elements
                        var els = doc.getElementsByTagName('canvas');
                        for (var i = 0; i < els.length; i++) {
                            this.initElement(els[i]);
                        }
                    },

                    /**
                     * Public initializes a canvas element so that it can be used as canvas
                     * element from now on. This is called automatically before the page is
                     * loaded but if you are creating elements using createElement you need to
                     * make sure this is called on the element.
                     * @param {HTMLElement} el The canvas element to initialize.
                     * @return {HTMLElement} the element that was created.
                     */
                    initElement: function(el) {
                        if (!el.getContext) {

                            el.getContext = getContext;

                            // Remove fallback content. There is no way to hide text nodes so we
                            // just remove all childNodes. We could hide all elements and remove
                            // text nodes but who really cares about the fallback content.
                            el.innerHTML = '';

                            // do not use inline function because that will leak memory
                            el.attachEvent('onpropertychange', onPropertyChange);
                            el.attachEvent('onresize', onResize);

                            var attrs = el.attributes;
                            if (attrs.width && attrs.width.specified) {
                                // TODO: use runtimeStyle and coordsize
                                // el.getContext().setWidth_(attrs.width.nodeValue);
                                el.style.width = attrs.width.nodeValue + 'px';
                            } else {
                                el.width = el.clientWidth;
                            }
                            if (attrs.height && attrs.height.specified) {
                                // TODO: use runtimeStyle and coordsize
                                // el.getContext().setHeight_(attrs.height.nodeValue);
                                el.style.height = attrs.height.nodeValue + 'px';
                            } else {
                                el.height = el.clientHeight;
                            }
                            //el.getContext().setCoordsize_()
                        }
                        return el;
                    }
                };

                function onPropertyChange(e) {
                    var el = e.srcElement;

                    switch (e.propertyName) {
                        case 'width':
                            el.style.width = el.attributes.width.nodeValue + 'px';
                            el.getContext().clearRect();
                            break;
                        case 'height':
                            el.style.height = el.attributes.height.nodeValue + 'px';
                            el.getContext().clearRect();
                            break;
                    }
                }

                function onResize(e) {
                    var el = e.srcElement;
                    if (el.firstChild) {
                        el.firstChild.style.width =  el.clientWidth + 'px';
                        el.firstChild.style.height = el.clientHeight + 'px';
                    }
                }

                G_vmlCanvasManager_.init();

                // precompute "00" to "FF"
                var dec2hex = [];
                for (var i = 0; i < 16; i++) {
                    for (var j = 0; j < 16; j++) {
                        dec2hex[i * 16 + j] = i.toString(16) + j.toString(16);
                    }
                }

                function createMatrixIdentity() {
                    return [
                        [1, 0, 0],
                        [0, 1, 0],
                        [0, 0, 1]
                    ];
                }

                function matrixMultiply(m1, m2) {
                    var result = createMatrixIdentity();

                    for (var x = 0; x < 3; x++) {
                        for (var y = 0; y < 3; y++) {
                            var sum = 0;

                            for (var z = 0; z < 3; z++) {
                                sum += m1[x][z] * m2[z][y];
                            }

                            result[x][y] = sum;
                        }
                    }
                    return result;
                }

                function copyState(o1, o2) {
                    o2.fillStyle     = o1.fillStyle;
                    o2.lineCap       = o1.lineCap;
                    o2.lineJoin      = o1.lineJoin;
                    o2.lineWidth     = o1.lineWidth;
                    o2.miterLimit    = o1.miterLimit;
                    o2.shadowBlur    = o1.shadowBlur;
                    o2.shadowColor   = o1.shadowColor;
                    o2.shadowOffsetX = o1.shadowOffsetX;
                    o2.shadowOffsetY = o1.shadowOffsetY;
                    o2.strokeStyle   = o1.strokeStyle;
                    o2.globalAlpha   = o1.globalAlpha;
                    o2.arcScaleX_    = o1.arcScaleX_;
                    o2.arcScaleY_    = o1.arcScaleY_;
                    o2.lineScale_    = o1.lineScale_;
                }

                function processStyle(styleString) {
                    var str, alpha = 1;

                    styleString = String(styleString);
                    if (styleString.substring(0, 3) == 'rgb') {
                        var start = styleString.indexOf('(', 3);
                        var end = styleString.indexOf(')', start + 1);
                        var guts = styleString.substring(start + 1, end).split(',');

                        str = '#';
                        for (var i = 0; i < 3; i++) {
                            str += dec2hex[Number(guts[i])];
                        }

                        if (guts.length == 4 && styleString.substr(3, 1) == 'a') {
                            alpha = guts[3];
                        }
                    } else {
                        str = styleString;
                    }

                    return {color: str, alpha: alpha};
                }

                function processLineCap(lineCap) {
                    switch (lineCap) {
                        case 'butt':
                            return 'flat';
                        case 'round':
                            return 'round';
                        case 'square':
                        default:
                            return 'square';
                    }
                }

                /**
                 * This class implements CanvasRenderingContext2D interface as described by
                 * the WHATWG.
                 * @param {HTMLElement} surfaceElement The element that the 2D context should
                 * be associated with
                 */
                function CanvasRenderingContext2D_(surfaceElement) {
                    this.m_ = createMatrixIdentity();

                    this.mStack_ = [];
                    this.aStack_ = [];
                    this.currentPath_ = [];

                    // Canvas context properties
                    this.strokeStyle = '#000';
                    this.fillStyle = '#000';

                    this.lineWidth = 1;
                    this.lineJoin = 'miter';
                    this.lineCap = 'butt';
                    this.miterLimit = Z * 1;
                    this.globalAlpha = 1;
                    this.canvas = surfaceElement;

                    var el = surfaceElement.ownerDocument.createElement('div');
                    el.style.width =  surfaceElement.clientWidth + 'px';
                    el.style.height = surfaceElement.clientHeight + 'px';
                    el.style.overflow = 'hidden';
                    el.style.position = 'absolute';
                    surfaceElement.appendChild(el);

                    this.element_ = el;
                    this.arcScaleX_ = 1;
                    this.arcScaleY_ = 1;
                    this.lineScale_ = 1;
                }

                var contextPrototype = CanvasRenderingContext2D_.prototype;
                contextPrototype.clearRect = function() {
                    this.element_.innerHTML = '';
                };

                contextPrototype.beginPath = function() {
                    // TODO: Branch current matrix so that save/restore has no effect
                    //       as per safari docs.
                    this.currentPath_ = [];
                };

                contextPrototype.moveTo = function(aX, aY) {
                    var p = this.getCoords_(aX, aY);
                    this.currentPath_.push({type: 'moveTo', x: p.x, y: p.y});
                    this.currentX_ = p.x;
                    this.currentY_ = p.y;
                };

                contextPrototype.lineTo = function(aX, aY) {
                    var p = this.getCoords_(aX, aY);
                    this.currentPath_.push({type: 'lineTo', x: p.x, y: p.y});

                    this.currentX_ = p.x;
                    this.currentY_ = p.y;
                };

                contextPrototype.bezierCurveTo = function(aCP1x, aCP1y,
                                                          aCP2x, aCP2y,
                                                          aX, aY) {
                    var p = this.getCoords_(aX, aY);
                    var cp1 = this.getCoords_(aCP1x, aCP1y);
                    var cp2 = this.getCoords_(aCP2x, aCP2y);
                    bezierCurveTo(this, cp1, cp2, p);
                };

                // Helper function that takes the already fixed cordinates.
                function bezierCurveTo(self, cp1, cp2, p) {
                    self.currentPath_.push({
                        type: 'bezierCurveTo',
                        cp1x: cp1.x,
                        cp1y: cp1.y,
                        cp2x: cp2.x,
                        cp2y: cp2.y,
                        x: p.x,
                        y: p.y
                    });
                    self.currentX_ = p.x;
                    self.currentY_ = p.y;
                }

                contextPrototype.quadraticCurveTo = function(aCPx, aCPy, aX, aY) {
                    // the following is lifted almost directly from
                    // http://developer.mozilla.org/en/docs/Canvas_tutorial:Drawing_shapes

                    var cp = this.getCoords_(aCPx, aCPy);
                    var p = this.getCoords_(aX, aY);

                    var cp1 = {
                        x: this.currentX_ + 2.0 / 3.0 * (cp.x - this.currentX_),
                        y: this.currentY_ + 2.0 / 3.0 * (cp.y - this.currentY_)
                    };
                    var cp2 = {
                        x: cp1.x + (p.x - this.currentX_) / 3.0,
                        y: cp1.y + (p.y - this.currentY_) / 3.0
                    };

                    bezierCurveTo(this, cp1, cp2, p);
                };

                contextPrototype.arc = function(aX, aY, aRadius,
                                                aStartAngle, aEndAngle, aClockwise) {
                    aRadius *= Z;
                    var arcType = aClockwise ? 'at' : 'wa';

                    var xStart = aX + mc(aStartAngle) * aRadius - Z2;
                    var yStart = aY + ms(aStartAngle) * aRadius - Z2;

                    var xEnd = aX + mc(aEndAngle) * aRadius - Z2;
                    var yEnd = aY + ms(aEndAngle) * aRadius - Z2;

                    // IE won't render arches drawn counter clockwise if xStart == xEnd.
                    if (xStart == xEnd && !aClockwise) {
                        xStart += 0.125; // Offset xStart by 1/80 of a pixel. Use something
                                         // that can be represented in binary
                    }

                    var p = this.getCoords_(aX, aY);
                    var pStart = this.getCoords_(xStart, yStart);
                    var pEnd = this.getCoords_(xEnd, yEnd);

                    this.currentPath_.push({type: arcType,
                        x: p.x,
                        y: p.y,
                        radius: aRadius,
                        xStart: pStart.x,
                        yStart: pStart.y,
                        xEnd: pEnd.x,
                        yEnd: pEnd.y});

                };

                contextPrototype.rect = function(aX, aY, aWidth, aHeight) {
                    this.moveTo(aX, aY);
                    this.lineTo(aX + aWidth, aY);
                    this.lineTo(aX + aWidth, aY + aHeight);
                    this.lineTo(aX, aY + aHeight);
                    this.closePath();
                };

                contextPrototype.strokeRect = function(aX, aY, aWidth, aHeight) {
                    var oldPath = this.currentPath_;
                    this.beginPath();

                    this.moveTo(aX, aY);
                    this.lineTo(aX + aWidth, aY);
                    this.lineTo(aX + aWidth, aY + aHeight);
                    this.lineTo(aX, aY + aHeight);
                    this.closePath();
                    this.stroke();

                    this.currentPath_ = oldPath;
                };

                contextPrototype.fillRect = function(aX, aY, aWidth, aHeight) {
                    var oldPath = this.currentPath_;
                    this.beginPath();

                    this.moveTo(aX, aY);
                    this.lineTo(aX + aWidth, aY);
                    this.lineTo(aX + aWidth, aY + aHeight);
                    this.lineTo(aX, aY + aHeight);
                    this.closePath();
                    this.fill();

                    this.currentPath_ = oldPath;
                };

                contextPrototype.createLinearGradient = function(aX0, aY0, aX1, aY1) {
                    var gradient = new CanvasGradient_('gradient');
                    gradient.x0_ = aX0;
                    gradient.y0_ = aY0;
                    gradient.x1_ = aX1;
                    gradient.y1_ = aY1;
                    return gradient;
                };

                contextPrototype.createRadialGradient = function(aX0, aY0, aR0,
                                                                 aX1, aY1, aR1) {
                    var gradient = new CanvasGradient_('gradientradial');
                    gradient.x0_ = aX0;
                    gradient.y0_ = aY0;
                    gradient.r0_ = aR0;
                    gradient.x1_ = aX1;
                    gradient.y1_ = aY1;
                    gradient.r1_ = aR1;
                    return gradient;
                };

                contextPrototype.drawImage = function(image, var_args) {
                    var dx, dy, dw, dh, sx, sy, sw, sh;

                    // to find the original width we overide the width and height
                    var oldRuntimeWidth = image.runtimeStyle.width;
                    var oldRuntimeHeight = image.runtimeStyle.height;
                    image.runtimeStyle.width = 'auto';
                    image.runtimeStyle.height = 'auto';

                    // get the original size
                    var w = image.width;
                    var h = image.height;

                    // and remove overides
                    image.runtimeStyle.width = oldRuntimeWidth;
                    image.runtimeStyle.height = oldRuntimeHeight;

                    if (arguments.length == 3) {
                        dx = arguments[1];
                        dy = arguments[2];
                        sx = sy = 0;
                        sw = dw = w;
                        sh = dh = h;
                    } else if (arguments.length == 5) {
                        dx = arguments[1];
                        dy = arguments[2];
                        dw = arguments[3];
                        dh = arguments[4];
                        sx = sy = 0;
                        sw = w;
                        sh = h;
                    } else if (arguments.length == 9) {
                        sx = arguments[1];
                        sy = arguments[2];
                        sw = arguments[3];
                        sh = arguments[4];
                        dx = arguments[5];
                        dy = arguments[6];
                        dw = arguments[7];
                        dh = arguments[8];
                    } else {
                        throw Error('Invalid number of arguments');
                    }

                    var d = this.getCoords_(dx, dy);

                    var w2 = sw / 2;
                    var h2 = sh / 2;

                    var vmlStr = [];

                    var W = 10;
                    var H = 10;

                    // For some reason that I've now forgotten, using divs didn't work
                    vmlStr.push(' <g_vml_:group',
                        ' coordsize="', Z * W, ',', Z * H, '"',
                        ' coordorigin="0,0"' ,
                        ' style="width:', W, 'px;height:', H, 'px;position:absolute;');

                    // If filters are necessary (rotation exists), create them
                    // filters are bog-slow, so only create them if abbsolutely necessary
                    // The following check doesn't account for skews (which don't exist
                    // in the canvas spec (yet) anyway.

                    if (this.m_[0][0] != 1 || this.m_[0][1]) {
                        var filter = [];

                        // Note the 12/21 reversal
                        filter.push('M11=', this.m_[0][0], ',',
                            'M12=', this.m_[1][0], ',',
                            'M21=', this.m_[0][1], ',',
                            'M22=', this.m_[1][1], ',',
                            'Dx=', mr(d.x / Z), ',',
                            'Dy=', mr(d.y / Z), '');

                        // Bounding box calculation (need to minimize displayed area so that
                        // filters don't waste time on unused pixels.
                        var max = d;
                        var c2 = this.getCoords_(dx + dw, dy);
                        var c3 = this.getCoords_(dx, dy + dh);
                        var c4 = this.getCoords_(dx + dw, dy + dh);

                        max.x = m.max(max.x, c2.x, c3.x, c4.x);
                        max.y = m.max(max.y, c2.y, c3.y, c4.y);

                        vmlStr.push('padding:0 ', mr(max.x / Z), 'px ', mr(max.y / Z),
                            'px 0;filter:progid:DXImageTransform.Microsoft.Matrix(',
                            filter.join(''), ", sizingmethod='clip');")
                    } else {
                        vmlStr.push('top:', mr(d.y / Z), 'px;left:', mr(d.x / Z), 'px;');
                    }

                    vmlStr.push(' ">' ,
                        '<g_vml_:image src="', image.src, '"',
                        ' style="width:', Z * dw, 'px;',
                        ' height:', Z * dh, 'px;"',
                        ' cropleft="', sx / w, '"',
                        ' croptop="', sy / h, '"',
                        ' cropright="', (w - sx - sw) / w, '"',
                        ' cropbottom="', (h - sy - sh) / h, '"',
                        ' />',
                        '</g_vml_:group>');

                    this.element_.insertAdjacentHTML('BeforeEnd',
                        vmlStr.join(''));
                };

                contextPrototype.stroke = function(aFill) {
                    var lineStr = [];
                    var lineOpen = false;
                    var a = processStyle(aFill ? this.fillStyle : this.strokeStyle);
                    var color = a.color;
                    var opacity = a.alpha * this.globalAlpha;

                    var W = 10;
                    var H = 10;

                    lineStr.push('<g_vml_:shape',
                        ' filled="', !!aFill, '"',
                        ' style="position:absolute;width:', W, 'px;height:', H, 'px;"',
                        ' coordorigin="0 0" coordsize="', Z * W, ' ', Z * H, '"',
                        ' stroked="', !aFill, '"',
                        ' path="');

                    var newSeq = false;
                    var min = {x: null, y: null};
                    var max = {x: null, y: null};

                    for (var i = 0; i < this.currentPath_.length; i++) {
                        var p = this.currentPath_[i];
                        var c;

                        switch (p.type) {
                            case 'moveTo':
                                c = p;
                                lineStr.push(' m ', mr(p.x), ',', mr(p.y));
                                break;
                            case 'lineTo':
                                lineStr.push(' l ', mr(p.x), ',', mr(p.y));
                                break;
                            case 'close':
                                lineStr.push(' x ');
                                p = null;
                                break;
                            case 'bezierCurveTo':
                                lineStr.push(' c ',
                                    mr(p.cp1x), ',', mr(p.cp1y), ',',
                                    mr(p.cp2x), ',', mr(p.cp2y), ',',
                                    mr(p.x), ',', mr(p.y));
                                break;
                            case 'at':
                            case 'wa':
                                lineStr.push(' ', p.type, ' ',
                                    mr(p.x - this.arcScaleX_ * p.radius), ',',
                                    mr(p.y - this.arcScaleY_ * p.radius), ' ',
                                    mr(p.x + this.arcScaleX_ * p.radius), ',',
                                    mr(p.y + this.arcScaleY_ * p.radius), ' ',
                                    mr(p.xStart), ',', mr(p.yStart), ' ',
                                    mr(p.xEnd), ',', mr(p.yEnd));
                                break;
                        }


                        // TODO: Following is broken for curves due to
                        //       move to proper paths.

                        // Figure out dimensions so we can do gradient fills
                        // properly
                        if (p) {
                            if (min.x == null || p.x < min.x) {
                                min.x = p.x;
                            }
                            if (max.x == null || p.x > max.x) {
                                max.x = p.x;
                            }
                            if (min.y == null || p.y < min.y) {
                                min.y = p.y;
                            }
                            if (max.y == null || p.y > max.y) {
                                max.y = p.y;
                            }
                        }
                    }
                    lineStr.push(' ">');

                    if (!aFill) {
                        var lineWidth = this.lineScale_ * this.lineWidth;

                        // VML cannot correctly render a line if the width is less than 1px.
                        // In that case, we dilute the color to make the line look thinner.
                        if (lineWidth < 1) {
                            opacity *= lineWidth;
                        }

                        lineStr.push(
                            '<g_vml_:stroke',
                            ' opacity="', opacity, '"',
                            ' joinstyle="', this.lineJoin, '"',
                            ' miterlimit="', this.miterLimit, '"',
                            ' endcap="', processLineCap(this.lineCap), '"',
                            ' weight="', lineWidth, 'px"',
                            ' color="', color, '" />'
                        );
                    } else if (typeof this.fillStyle == 'object') {
                        var fillStyle = this.fillStyle;
                        var angle = 0;
                        var focus = {x: 0, y: 0};

                        // additional offset
                        var shift = 0;
                        // scale factor for offset
                        var expansion = 1;

                        if (fillStyle.type_ == 'gradient') {
                            var x0 = fillStyle.x0_ / this.arcScaleX_;
                            var y0 = fillStyle.y0_ / this.arcScaleY_;
                            var x1 = fillStyle.x1_ / this.arcScaleX_;
                            var y1 = fillStyle.y1_ / this.arcScaleY_;
                            var p0 = this.getCoords_(x0, y0);
                            var p1 = this.getCoords_(x1, y1);
                            var dx = p1.x - p0.x;
                            var dy = p1.y - p0.y;
                            angle = Math.atan2(dx, dy) * 180 / Math.PI;

                            // The angle should be a non-negative number.
                            if (angle < 0) {
                                angle += 360;
                            }

                            // Very small angles produce an unexpected result because they are
                            // converted to a scientific notation string.
                            if (angle < 1e-6) {
                                angle = 0;
                            }
                        } else {
                            var p0 = this.getCoords_(fillStyle.x0_, fillStyle.y0_);
                            var width  = max.x - min.x;
                            var height = max.y - min.y;
                            focus = {
                                x: (p0.x - min.x) / width,
                                y: (p0.y - min.y) / height
                            };

                            width  /= this.arcScaleX_ * Z;
                            height /= this.arcScaleY_ * Z;
                            var dimension = m.max(width, height);
                            shift = 2 * fillStyle.r0_ / dimension;
                            expansion = 2 * fillStyle.r1_ / dimension - shift;
                        }

                        // We need to sort the color stops in ascending order by offset,
                        // otherwise IE won't interpret it correctly.
                        var stops = fillStyle.colors_;
                        stops.sort(function(cs1, cs2) {
                            return cs1.offset - cs2.offset;
                        });

                        var length = stops.length;
                        var color1 = stops[0].color;
                        var color2 = stops[length - 1].color;
                        var opacity1 = stops[0].alpha * this.globalAlpha;
                        var opacity2 = stops[length - 1].alpha * this.globalAlpha;

                        var colors = [];
                        for (var i = 0; i < length; i++) {
                            var stop = stops[i];
                            colors.push(stop.offset * expansion + shift + ' ' + stop.color);
                        }

                        // When colors attribute is used, the meanings of opacity and o:opacity2
                        // are reversed.
                        lineStr.push('<g_vml_:fill type="', fillStyle.type_, '"',
                            ' method="none" focus="100%"',
                            ' color="', color1, '"',
                            ' color2="', color2, '"',
                            ' colors="', colors.join(','), '"',
                            ' opacity="', opacity2, '"',
                            ' g_o_:opacity2="', opacity1, '"',
                            ' angle="', angle, '"',
                            ' focusposition="', focus.x, ',', focus.y, '" />');
                    } else {
                        lineStr.push('<g_vml_:fill color="', color, '" opacity="', opacity,
                            '" />');
                    }

                    lineStr.push('</g_vml_:shape>');

                    this.element_.insertAdjacentHTML('beforeEnd', lineStr.join(''));
                };

                contextPrototype.fill = function() {
                    this.stroke(true);
                }

                contextPrototype.closePath = function() {
                    this.currentPath_.push({type: 'close'});
                };

                /**
                 * @private
                 */
                contextPrototype.getCoords_ = function(aX, aY) {
                    var m = this.m_;
                    return {
                        x: Z * (aX * m[0][0] + aY * m[1][0] + m[2][0]) - Z2,
                        y: Z * (aX * m[0][1] + aY * m[1][1] + m[2][1]) - Z2
                    }
                };

                contextPrototype.save = function() {
                    var o = {};
                    copyState(this, o);
                    this.aStack_.push(o);
                    this.mStack_.push(this.m_);
                    this.m_ = matrixMultiply(createMatrixIdentity(), this.m_);
                };

                contextPrototype.restore = function() {
                    copyState(this.aStack_.pop(), this);
                    this.m_ = this.mStack_.pop();
                };

                function matrixIsFinite(m) {
                    for (var j = 0; j < 3; j++) {
                        for (var k = 0; k < 2; k++) {
                            if (!isFinite(m[j][k]) || isNaN(m[j][k])) {
                                return false;
                            }
                        }
                    }
                    return true;
                }

                function setM(ctx, m, updateLineScale) {
                    if (!matrixIsFinite(m)) {
                        return;
                    }
                    ctx.m_ = m;

                    if (updateLineScale) {
                        // Get the line scale.
                        // Determinant of this.m_ means how much the area is enlarged by the
                        // transformation. So its square root can be used as a scale factor
                        // for width.
                        var det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
                        ctx.lineScale_ = sqrt(abs(det));
                    }
                }

                contextPrototype.translate = function(aX, aY) {
                    var m1 = [
                        [1,  0,  0],
                        [0,  1,  0],
                        [aX, aY, 1]
                    ];

                    setM(this, matrixMultiply(m1, this.m_), false);
                };

                contextPrototype.rotate = function(aRot) {
                    var c = mc(aRot);
                    var s = ms(aRot);

                    var m1 = [
                        [c,  s, 0],
                        [-s, c, 0],
                        [0,  0, 1]
                    ];

                    setM(this, matrixMultiply(m1, this.m_), false);
                };

                contextPrototype.scale = function(aX, aY) {
                    this.arcScaleX_ *= aX;
                    this.arcScaleY_ *= aY;
                    var m1 = [
                        [aX, 0,  0],
                        [0,  aY, 0],
                        [0,  0,  1]
                    ];

                    setM(this, matrixMultiply(m1, this.m_), true);
                };

                contextPrototype.transform = function(m11, m12, m21, m22, dx, dy) {
                    var m1 = [
                        [m11, m12, 0],
                        [m21, m22, 0],
                        [dx,  dy,  1]
                    ];

                    setM(this, matrixMultiply(m1, this.m_), true);
                };

                contextPrototype.setTransform = function(m11, m12, m21, m22, dx, dy) {
                    var m = [
                        [m11, m12, 0],
                        [m21, m22, 0],
                        [dx,  dy,  1]
                    ];

                    setM(this, m, true);
                };

                /******** STUBS ********/
                contextPrototype.clip = function() {
                    // TODO: Implement
                };

                contextPrototype.arcTo = function() {
                    // TODO: Implement
                };

                contextPrototype.createPattern = function() {
                    return new CanvasPattern_;
                };

                // Gradient / Pattern Stubs
                function CanvasGradient_(aType) {
                    this.type_ = aType;
                    this.x0_ = 0;
                    this.y0_ = 0;
                    this.r0_ = 0;
                    this.x1_ = 0;
                    this.y1_ = 0;
                    this.r1_ = 0;
                    this.colors_ = [];
                }

                CanvasGradient_.prototype.addColorStop = function(aOffset, aColor) {
                    aColor = processStyle(aColor);
                    this.colors_.push({offset: aOffset,
                        color: aColor.color,
                        alpha: aColor.alpha});
                };

                function CanvasPattern_() {}

                // set up externs
                G_vmlCanvasManager = G_vmlCanvasManager_;
                CanvasRenderingContext2D = CanvasRenderingContext2D_;
                CanvasGradient = CanvasGradient_;
                CanvasPattern = CanvasPattern_;

            })();

        } // if







        /*
         * --------------------------------------------------------------------
         * jQuery inputToButton plugin
         * Author: Scott Jehl, scott@filamentgroup.com
         * Copyright (c) 2009 Filament Group
         * licensed under MIT (filamentgroup.com/examples/mit-license.txt)
         * --------------------------------------------------------------------
         */
        (function($) {
            $.fn.visualize = function(options, container){
                return $(this).each(function(){
                    //configuration
                    var o = $.extend({
                        type: 'bar', //also available: area, pie, line
                        width: $(this).width(), //height of canvas - defaults to table height
                        height: $(this).height(), //height of canvas - defaults to table height
                        appendTitle: true, //table caption text is added to chart
                        title: null, //grabs from table caption if null
                        appendKey: true, //color key is added to chart
                        rowFilter: ' ',
                        colFilter: ' ',
                        colors: ['#be1e2d','#666699','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744'],
                        textColors: [], //corresponds with colors array. null/undefined items will fall back to CSS
                        parseDirection: 'x', //which direction to parse the table data
                        pieMargin: 20, //pie charts only - spacing around pie
                        pieLabelsAsPercent: true,
                        pieLabelPos: 'inside',
                        lineWeight: 4, //for line and area - stroke weight
                        barGroupMargin: 10,
                        barMargin: 1, //space around bars in bar chart (added to both sides of bar)
                        yLabelInterval: 30 //distance between y labels
                    },options);

                    //reset width, height to numbers
                    o.width = parseFloat(o.width);
                    o.height = parseFloat(o.height);


                    var self = $(this);

                    //function to scrape data from html table
                    function scrapeTable(){
                        var colors = o.colors;
                        var textColors = o.textColors;
                        var tableData = {
                            dataGroups: function(){
                                var dataGroups = [];
                                if(o.parseDirection == 'x'){
                                    self.find('tr:gt(0)').filter(o.rowFilter).each(function(i){
                                        dataGroups[i] = {};
                                        dataGroups[i].points = [];
                                        dataGroups[i].color = colors[i];
                                        if(textColors[i]){ dataGroups[i].textColor = textColors[i]; }
                                        $(this).find('td').filter(o.colFilter).each(function(){
                                            dataGroups[i].points.push( parseFloat($(this).text()) );
                                        });
                                    });
                                }
                                else {
                                    var cols = self.find('tr:eq(1) td').filter(o.colFilter).size();
                                    for(var i=0; i<cols; i++){
                                        dataGroups[i] = {};
                                        dataGroups[i].points = [];
                                        dataGroups[i].color = colors[i];
                                        if(textColors[i]){ dataGroups[i].textColor = textColors[i]; }
                                        self.find('tr:gt(0)').filter(o.rowFilter).each(function(){
                                            dataGroups[i].points.push( $(this).find('td').filter(o.colFilter).eq(i).text()*1 );
                                        });
                                    };
                                }
                                return dataGroups;
                            },
                            allData: function(){
                                var allData = [];
                                $(this.dataGroups()).each(function(){
                                    allData.push(this.points);
                                });
                                return allData;
                            },
                            dataSum: function(){
                                var dataSum = 0;
                                var allData = this.allData().join(',').split(',');
                                $(allData).each(function(){
                                    dataSum += parseFloat(this);
                                });
                                return dataSum
                            },
                            topValue: function(){
                                var topValue = 0;
                                var allData = this.allData().join(',').split(',');
                                $(allData).each(function(){
                                    if(parseFloat(this,10)>topValue) topValue = parseFloat(this);
                                });
                                return topValue;
                            },
                            bottomValue: function(){
                                var bottomValue = 0;
                                var allData = this.allData().join(',').split(',');
                                $(allData).each(function(){
                                    if(this<bottomValue) bottomValue = parseFloat(this);
                                });
                                return bottomValue;
                            },
                            memberTotals: function(){
                                var memberTotals = [];
                                var dataGroups = this.dataGroups();
                                $(dataGroups).each(function(l){
                                    var count = 0;
                                    $(dataGroups[l].points).each(function(m){
                                        count +=dataGroups[l].points[m];
                                    });
                                    memberTotals.push(count);
                                });
                                return memberTotals;
                            },
                            yTotals: function(){
                                var yTotals = [];
                                var dataGroups = this.dataGroups();
                                var loopLength = this.xLabels().length;
                                for(var i = 0; i<loopLength; i++){
                                    yTotals[i] =[];
                                    var thisTotal = 0;
                                    $(dataGroups).each(function(l){
                                        yTotals[i].push(this.points[i]);
                                    });
                                    yTotals[i].join(',').split(',');
                                    $(yTotals[i]).each(function(){
                                        thisTotal += parseFloat(this);
                                    });
                                    yTotals[i] = thisTotal;

                                }
                                return yTotals;
                            },
                            topYtotal: function(){
                                var topYtotal = 0;
                                var yTotals = this.yTotals().join(',').split(',');
                                $(yTotals).each(function(){
                                    if(parseFloat(this,10)>topYtotal) topYtotal = parseFloat(this);
                                });
                                return topYtotal;
                            },
                            totalYRange: function(){
                                return this.topValue() - this.bottomValue();
                            },
                            xLabels: function(){
                                var xLabels = [];
                                if(o.parseDirection == 'x'){
                                    self.find('tr:eq(0) th').filter(o.colFilter).each(function(){
                                        xLabels.push($(this).html());
                                    });
                                }
                                else {
                                    self.find('tr:gt(0) th').filter(o.rowFilter).each(function(){
                                        xLabels.push($(this).html());
                                    });
                                }
                                return xLabels;
                            },
                            yLabels: function(){
                                var yLabels = [];
                                yLabels.push(bottomValue);
                                var numLabels = Math.round(o.height / o.yLabelInterval);
                                var loopInterval = Math.ceil(totalYRange / numLabels) || 1;
                                while( yLabels[yLabels.length-1] < topValue - loopInterval){
                                    yLabels.push(yLabels[yLabels.length-1] + loopInterval);
                                }
                                yLabels.push(topValue);
                                return yLabels;
                            }
                        };

                        return tableData;
                    };


                    //function to create a chart
                    var createChart = {
                        pie: function(){

                            canvasContain.addClass('visualize-pie');

                            if(o.pieLabelPos == 'outside'){ canvasContain.addClass('visualize-pie-outside'); }

                            var centerx = Math.round(canvas.width()/2);
                            var centery = Math.round(canvas.height()/2);
                            var radius = centery - o.pieMargin;
                            var counter = 0.0;
                            var toRad = function(integer){ return (Math.PI/180)*integer; };
                            var labels = $('<ul class="visualize-labels"></ul>')
                                .insertAfter(canvas);

                            //draw the pie pieces
                            $.each(memberTotals, function(i){
                                var fraction = (this <= 0 || isNaN(this))? 0 : this / dataSum;
                                ctx.beginPath();
                                ctx.moveTo(centerx, centery);
                                ctx.arc(centerx, centery, radius,
                                    counter * Math.PI * 2 - Math.PI * 0.5,
                                    (counter + fraction) * Math.PI * 2 - Math.PI * 0.5,
                                    false);
                                ctx.lineTo(centerx, centery);
                                ctx.closePath();
                                ctx.fillStyle = dataGroups[i].color;
                                ctx.fill();
                                // draw labels
                                var sliceMiddle = (counter + fraction/2);
                                var distance = o.pieLabelPos == 'inside' ? radius/1.5 : radius +  radius / 5;
                                var labelx = Math.round(centerx + Math.sin(sliceMiddle * Math.PI * 2) * (distance));
                                var labely = Math.round(centery - Math.cos(sliceMiddle * Math.PI * 2) * (distance));
                                var leftRight = (labelx > centerx) ? 'right' : 'left';
                                var topBottom = (labely > centery) ? 'bottom' : 'top';
                                var percentage = parseFloat((fraction*100).toFixed(2));

                                if(percentage){
                                    var labelval = (o.pieLabelsAsPercent) ? percentage + '%' : this;
                                    var labeltext = $('<span class="visualize-label">' + labelval +'</span>')
                                        .css(leftRight, 0)
                                        .css(topBottom, 0);
                                    if(labeltext)
                                        var label = $('<li class="visualize-label-pos"></li>')
                                            .appendTo(labels)
                                            .css({left: labelx, top: labely})
                                            .append(labeltext);
                                    labeltext
                                        .css('font-size', radius / 8)
                                        .css('margin-'+leftRight, -labeltext.width()/2)
                                        .css('margin-'+topBottom, -labeltext.outerHeight()/2);

                                    if(dataGroups[i].textColor){ labeltext.css('color', dataGroups[i].textColor); }
                                }
                                counter+=fraction;
                            });
                        },

                        line: function(area){

                            if(area){ canvasContain.addClass('visualize-area'); }
                            else{ canvasContain.addClass('visualize-line'); }

                            //write X labels
                            var xInterval = canvas.width() / (xLabels.length -1);
                            var xlabelsUL = $('<ul class="visualize-labels-x"></ul>')
                                .width(canvas.width())
                                .height(canvas.height())
                                .insertBefore(canvas);
                            $.each(xLabels, function(i){
                                var thisLi = $('<li><span>'+this+'</span></li>')
                                    .prepend('<span class="line" />')
                                    .css('left', xInterval * i)
                                    .appendTo(xlabelsUL);
                                var label = thisLi.find('span:not(.line)');
                                var leftOffset = label.width()/-2;
                                if(i == 0){ leftOffset = 0; }
                                else if(i== xLabels.length-1){ leftOffset = -label.width(); }
                                label
                                    .css('margin-left', leftOffset)
                                    .addClass('label');
                            });

                            //write Y labels
                            var yScale = canvas.height() / totalYRange;
                            var liBottom = canvas.height() / (yLabels.length-1);
                            var ylabelsUL = $('<ul class="visualize-labels-y"></ul>')
                                .width(canvas.width())
                                .height(canvas.height())
                                .insertBefore(canvas);

                            $.each(yLabels, function(i){
                                var thisLi = $('<li><span>'+this+'</span></li>')
                                    .prepend('<span class="line"  />')
                                    .css('bottom',liBottom*i)
                                    .prependTo(ylabelsUL);
                                var label = thisLi.find('span:not(.line)');
                                var topOffset = label.height()/-2;
                                if(i == 0){ topOffset = -label.height(); }
                                else if(i== yLabels.length-1){ topOffset = 0; }
                                label
                                    .css('margin-top', topOffset)
                                    .addClass('label');
                            });

                            //start from the bottom left
                            ctx.translate(0,zeroLoc);
                            //iterate and draw
                            $.each(dataGroups,function(h){
                                ctx.beginPath();
                                ctx.lineWidth = o.lineWeight;
                                ctx.lineJoin = 'round';
                                var points = this.points;
                                var integer = 0;
                                ctx.moveTo(0,-(points[0]*yScale));
                                $.each(points, function(){
                                    ctx.lineTo(integer,-(this*yScale));
                                    integer+=xInterval;
                                });
                                ctx.strokeStyle = this.color;
                                ctx.stroke();
                                if(area){
                                    ctx.lineTo(integer,0);
                                    ctx.lineTo(0,0);
                                    ctx.closePath();
                                    ctx.fillStyle = this.color;
                                    ctx.globalAlpha = .3;
                                    ctx.fill();
                                    ctx.globalAlpha = 1.0;
                                }
                                else {ctx.closePath();}
                            });
                        },

                        area: function(){
                            createChart.line(true);
                        },

                        bar: function(){

                            canvasContain.addClass('visualize-bar');

                            //write X labels
                            var xInterval = canvas.width() / (xLabels.length);
                            var xlabelsUL = $('<ul class="visualize-labels-x"></ul>')
                                .width(canvas.width())
                                .height(canvas.height())
                                .insertBefore(canvas);
                            $.each(xLabels, function(i){
                                var thisLi = $('<li><span class="label">'+this+'</span></li>')
                                    .prepend('<span class="line" />')
                                    .css('left', xInterval * i)
                                    .width(xInterval)
                                    .appendTo(xlabelsUL);
                                var label = thisLi.find('span.label');
                                label.addClass('label');
                            });

                            //write Y labels
                            var yScale = canvas.height() / totalYRange;
                            var liBottom = canvas.height() / (yLabels.length-1);
                            var ylabelsUL = $('<ul class="visualize-labels-y"></ul>')
                                .width(canvas.width())
                                .height(canvas.height())
                                .insertBefore(canvas);
                            $.each(yLabels, function(i){
                                var thisLi = $('<li><span>'+this+'</span></li>')
                                    .prepend('<span class="line"  />')
                                    .css('bottom',liBottom*i)
                                    .prependTo(ylabelsUL);
                                var label = thisLi.find('span:not(.line)');
                                var topOffset = label.height()/-2;
                                if(i == 0){ topOffset = -label.height(); }
                                else if(i== yLabels.length-1){ topOffset = 0; }
                                label
                                    .css('margin-top', topOffset)
                                    .addClass('label');
                            });

                            //start from the bottom left
                            ctx.translate(0,zeroLoc);
                            //iterate and draw
                            for(var h=0; h<dataGroups.length; h++){
                                ctx.beginPath();
                                var linewidth = (xInterval-o.barGroupMargin*2) / dataGroups.length; //removed +1
                                var strokeWidth = linewidth - (o.barMargin*2);
                                ctx.lineWidth = strokeWidth;
                                var points = dataGroups[h].points;
                                var integer = 0;
                                for(var i=0; i<points.length; i++){
                                    var xVal = (integer-o.barGroupMargin)+(h*linewidth)+linewidth/2;
                                    xVal += o.barGroupMargin*2;

                                    ctx.moveTo(xVal, 0);
                                    ctx.lineTo(xVal, Math.round(-points[i]*yScale));
                                    integer+=xInterval;
                                }
                                ctx.strokeStyle = dataGroups[h].color;
                                ctx.stroke();
                                ctx.closePath();
                            }
                        }
                    };

                    //create new canvas, set w&h attrs (not inline styles)
                    var canvasNode = document.createElement("canvas");
                    canvasNode.setAttribute('height',o.height);
                    canvasNode.setAttribute('width',o.width);
                    var canvas = $(canvasNode);

                    //get title for chart
                    var title = o.title || self.find('caption').text();

                    //create canvas wrapper div, set inline w&h, append
                    var canvasContain = (container || $('<div class="visualize" role="img" aria-label="Chart representing data from the table: '+ title +'" />'))
                        .height(o.height)
                        .width(o.width)
                        .append(canvas);

                    //scrape table (this should be cleaned up into an obj)
                    var tableData = scrapeTable();
                    var dataGroups = tableData.dataGroups();
                    var allData = tableData.allData();
                    var dataSum = tableData.dataSum();
                    var topValue = tableData.topValue();
                    var bottomValue = tableData.bottomValue();
                    var memberTotals = tableData.memberTotals();
                    var totalYRange = tableData.totalYRange();
                    var zeroLoc = o.height * (topValue/totalYRange);
                    var xLabels = tableData.xLabels();
                    var yLabels = tableData.yLabels();

                    //title/key container
                    if(o.appendTitle || o.appendKey){
                        var infoContain = $('<div class="visualize-info"></div>')
                            .appendTo(canvasContain);
                    }

                    //append title
                    if(o.appendTitle){
                        $('<div class="visualize-title">'+ title +'</div>').appendTo(infoContain);
                    }


                    //append key
                    if(o.appendKey){
                        var newKey = $('<ul class="visualize-key"></ul>');
                        var selector;
                        if(o.parseDirection == 'x'){
                            selector = self.find('tr:gt(0) th').filter(o.rowFilter);
                        }
                        else{
                            selector = self.find('tr:eq(0) th').filter(o.colFilter);
                        }

                        selector.each(function(i){
                            $('<li><span class="visualize-key-color" style="background: '+dataGroups[i].color+'"></span><span class="visualize-key-label">'+ $(this).text() +'</span></li>')
                                .appendTo(newKey);
                        });
                        newKey.appendTo(infoContain);
                    };

                    //append new canvas to page

                    if(!container){canvasContain.insertAfter(this); }
                    if( typeof(G_vmlCanvasManager) != 'undefined' ){ G_vmlCanvasManager.init(); G_vmlCanvasManager.initElement(canvas[0]); }

                    //set up the drawing board
                    var ctx = canvas[0].getContext('2d');

                    //create chart
                    createChart[o.type]();

                    //clean up some doubled lines that sit on top of canvas borders (done via JS due to IE)
                    $('.visualize-line li:first-child span.line, .visualize-line li:last-child span.line, .visualize-area li:first-child span.line, .visualize-area li:last-child span.line, .visualize-bar li:first-child span.line,.visualize-bar .visualize-labels-y li:last-child span.line').css('border','none');
                    if(!container){
                        //add event for updating
                        canvasContain.bind('visualizeRefresh', function(){
                            self.visualize(o, $(this).empty());
                        });
                    }
                }).next(); //returns canvas(es)
            };
        })(jQuery);




        $(function(){
            $('table').visualize({type: 'line', width: '600px'});
            $('table td')
                .click(function(){
                    if( !$(this).is('.input') ){
                        $(this).addClass('input')
                            .html('<input type="text" value="'+ $(this).text() +'" />')
                            .find('input').focus()
                            .blur(function(){
                                //remove td class, remove input
                                $(this).parent().removeClass('input').html($(this).val() || 0);
                                //update charts
                                $('.visualize').trigger('visualizeRefresh');
                            });
                    }
                })
                .hover(function(){ $(this).addClass('hover'); },function(){ $(this).removeClass('hover'); });
        });

        $('.visualize,.visualize-line[role="img"]').eq(1).remove();
        $('.visualize,.visualize-line[role="img"]').eq(2).remove();

    });
})()
