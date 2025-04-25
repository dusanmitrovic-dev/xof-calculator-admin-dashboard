import {
  Platform,
  _bindEventWithOptions,
  _getEventTarget,
  _getFocusedElementPierceShadowDom,
  _getShadowRoot,
  coerceArray,
  coerceElement,
  coerceNumberProperty,
  normalizePassiveListenerOptions
} from "./chunk-JP23VCWP.js";
import {
  IconDirective
} from "./chunk-IZQGUJUQ.js";
import {
  AnimationBuilder,
  animate,
  animateChild,
  animation,
  group,
  query,
  state,
  style,
  transition,
  trigger,
  useAnimation
} from "./chunk-2R6UYQXR.js";
import {
  takeUntilDestroyed,
  toObservable
} from "./chunk-TOV26B7B.js";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule
} from "./chunk-ZAVJN4YP.js";
import "./chunk-W4XWCQSP.js";
import {
  AsyncPipe,
  DOCUMENT,
  NgClass,
  NgStyle,
  NgTemplateOutlet,
  isPlatformBrowser,
  isPlatformServer
} from "./chunk-W64MAQ4E.js";
import {
  APP_ID,
  ApplicationRef,
  CSP_NONCE,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  DestroyRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  NgZone,
  Output,
  PLATFORM_ID,
  Pipe,
  QueryList,
  Renderer2,
  RendererFactory2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  afterNextRender,
  afterRender,
  booleanAttribute,
  computed,
  contentChild,
  contentChildren,
  createComponent,
  effect,
  forwardRef,
  fromEvent,
  inject,
  input,
  isObservable,
  isSignal,
  linkedSignal,
  merge,
  model,
  numberAttribute,
  output,
  runInInjectionContext,
  setClassMetadata,
  signal,
  untracked,
  viewChild,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵcontentQuery,
  ɵɵcontentQuerySignal,
  ɵɵdeclareLet,
  ɵɵdefer,
  ɵɵdeferOnIdle,
  ɵɵdeferPrefetchOnIdle,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵhostProperty,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpropertyInterpolate,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryAdvance,
  ɵɵqueryRefresh,
  ɵɵreadContextLet,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstoreLet,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵsyntheticHostListener,
  ɵɵsyntheticHostProperty,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery,
  ɵɵviewQuerySignal
} from "./chunk-XAF5YQQW.js";
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  combineLatest,
  concat,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  of,
  skip,
  startWith,
  take,
  takeUntil,
  takeWhile,
  tap,
  withLatestFrom,
  zipWith
} from "./chunk-MXDOIL62.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-XWLXMCJQ.js";

// node_modules/@popperjs/core/lib/enums.js
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

// node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}

// node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}

// node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state2 = _ref.state;
  Object.keys(state2.elements).forEach(function(name) {
    var style2 = state2.styles[name] || {};
    var attributes = state2.attributes[name] || {};
    var element = state2.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style2);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect2(_ref2) {
  var state2 = _ref2.state;
  var initialStyles = {
    popper: {
      position: state2.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state2.elements.popper.style, initialStyles.popper);
  state2.styles = initialStyles;
  if (state2.elements.arrow) {
    Object.assign(state2.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state2.elements).forEach(function(name) {
      var element = state2.elements[name];
      var attributes = state2.attributes[name] || {};
      var styleProperties = Object.keys(state2.styles.hasOwnProperty(name) ? state2.styles[name] : initialStyles[name]);
      var style2 = styleProperties.reduce(function(style3, property) {
        style3[property] = "";
        return style3;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style2);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect: effect2,
  requires: ["computeStyles"]
};

// node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
  return placement.split("-")[0];
}

// node_modules/@popperjs/core/lib/utils/math.js
var max = Math.max;
var min = Math.min;
var round = Math.round;

// node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}

// node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}

// node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}

// node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}

// node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}

// node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : (
    // $FlowFixMe[prop-missing]
    element.document
  )) || window.document).documentElement;
}

// node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element)
  );
}

// node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle2(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle2(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle2(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle2(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle2(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}

// node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}

// node_modules/@popperjs/core/lib/utils/within.js
function within(min2, value, max2) {
  return max(min2, min(value, max2));
}
function withinMaxClamp(min2, value, max2) {
  var v = within(min2, value, max2);
  return v > max2 ? max2 : v;
}

// node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

// node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

// node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

// node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject2(padding, state2) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state2.rects, {
    placement: state2.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state2 = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state2.elements.arrow;
  var popperOffsets2 = state2.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state2.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state2);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state2.rects.reference[len] + state2.rects.reference[axis] - popperOffsets2[axis] - state2.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state2.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state2.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect3(_ref2) {
  var state2 = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state2.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state2.elements.popper, arrowElement)) {
    return;
  }
  state2.elements.arrow = arrowElement;
}
var arrow_default = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect3,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};

// node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split("-")[1];
}

// node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x, y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle2(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        offsetParent[heightProp]
      );
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        offsetParent[widthProp]
      );
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }, getWindow(popper2)) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state2 = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state2.placement),
    variation: getVariation(state2.placement),
    popper: state2.elements.popper,
    popperRect: state2.rects.popper,
    gpuAcceleration,
    isFixed: state2.options.strategy === "fixed"
  };
  if (state2.modifiersData.popperOffsets != null) {
    state2.styles.popper = Object.assign({}, state2.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state2.modifiersData.popperOffsets,
      position: state2.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state2.modifiersData.arrow != null) {
    state2.styles.arrow = Object.assign({}, state2.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state2.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state2.attributes.popper = Object.assign({}, state2.attributes.popper, {
    "data-popper-placement": state2.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};

// node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = {
  passive: true
};
function effect4(_ref) {
  var state2 = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state2.elements.popper);
  var scrollParents = [].concat(state2.scrollParents.reference, state2.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect: effect4,
  data: {}
};

// node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash[matched];
  });
}

// node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var hash2 = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash2[matched];
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle2(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle2(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}

// node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)))
  );
}

// node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === "fixed");
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle2(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

// node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}

// node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state2, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state2.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state2.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state2.rects.popper;
  var element = state2.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state2.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state2.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state2.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}

// node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state2, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state2, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}

// node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state2 = _ref.state, options = _ref.options, name = _ref.name;
  if (state2.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state2.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state2, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state2.rects.reference;
  var popperRect = state2.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state2, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break") break;
    }
  }
  if (state2.placement !== firstFittingPlacement) {
    state2.modifiersData[name]._skip = true;
    state2.placement = firstFittingPlacement;
    state2.reset = true;
  }
}
var flip_default = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};

// node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state2 = _ref.state, name = _ref.name;
  var referenceRect = state2.rects.reference;
  var popperRect = state2.rects.popper;
  var preventedOffsets = state2.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state2, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state2, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state2.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state2.attributes.popper = Object.assign({}, state2.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};

// node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state2 = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state2.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state2.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state2.modifiersData.popperOffsets != null) {
    state2.modifiersData.popperOffsets.x += x;
    state2.modifiersData.popperOffsets.y += y;
  }
  state2.modifiersData[name] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};

// node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
  var state2 = _ref.state, name = _ref.name;
  state2.modifiersData[name] = computeOffsets({
    reference: state2.rects.reference,
    element: state2.rects.popper,
    strategy: "absolute",
    placement: state2.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};

// node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}

// node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state2 = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state2, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state2.placement);
  var variation = getVariation(state2.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state2.modifiersData.popperOffsets;
  var referenceRect = state2.rects.reference;
  var popperRect = state2.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state2.rects, {
    placement: state2.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state2.modifiersData.offset ? state2.modifiersData.offset[state2.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min2 = offset2 + overflow[mainSide];
    var max2 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state2.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state2.modifiersData["arrow#persistent"] ? state2.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state2.elements.arrow && getOffsetParent(state2.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min2, tetherMin) : min2, offset2, tether ? max(max2, tetherMax) : max2);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state2.modifiersData[name] = data;
}
var preventOverflow_default = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};

// node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

// node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
  var map2 = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map2.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map2.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

// node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}

// node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}

// node_modules/@popperjs/core/lib/createPopper.js
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers3 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper4(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state2 = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state2,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state2.options) : setOptionsAction;
        cleanupModifierEffects();
        state2.options = Object.assign({}, defaultOptions, state2.options, options2);
        state2.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers3, state2.options.modifiers)));
        state2.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state2.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state2.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state2.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state2.reset = false;
        state2.placement = state2.options.placement;
        state2.orderedModifiers.forEach(function(modifier) {
          return state2.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state2.orderedModifiers.length; index++) {
          if (state2.reset === true) {
            state2.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state2.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state2 = fn2({
              state: state2,
              options: _options,
              name,
              instance
            }) || state2;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state2);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state3) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state3);
      }
    });
    function runModifierEffects() {
      state2.orderedModifiers.forEach(function(_ref) {
        var name = _ref.name, _ref$options = _ref.options, options2 = _ref$options === void 0 ? {} : _ref$options, effect5 = _ref.effect;
        if (typeof effect5 === "function") {
          var cleanupFn = effect5({
            state: state2,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var createPopper = popperGenerator();

// node_modules/@popperjs/core/lib/popper-lite.js
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default];
var createPopper2 = popperGenerator({
  defaultModifiers
});

// node_modules/@popperjs/core/lib/popper.js
var defaultModifiers2 = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
var createPopper3 = popperGenerator({
  defaultModifiers: defaultModifiers2
});

// node_modules/@angular/cdk/fesm2022/keycodes.mjs
var TAB = 9;
var SHIFT = 16;
var CONTROL = 17;
var ALT = 18;
var PAGE_UP = 33;
var PAGE_DOWN = 34;
var END = 35;
var HOME = 36;
var LEFT_ARROW = 37;
var UP_ARROW = 38;
var RIGHT_ARROW = 39;
var DOWN_ARROW = 40;
var ZERO = 48;
var NINE = 57;
var A = 65;
var Z = 90;
var META = 91;
var MAC_META = 224;
function hasModifierKey(event, ...modifiers) {
  if (modifiers.length) {
    return modifiers.some((modifier) => event[modifier]);
  }
  return event.altKey || event.shiftKey || event.ctrlKey || event.metaKey;
}

// node_modules/@angular/cdk/fesm2022/layout.mjs
var LayoutModule = class _LayoutModule {
  static ɵfac = function LayoutModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LayoutModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _LayoutModule
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutModule, [{
    type: NgModule,
    args: [{}]
  }], null, null);
})();
var mediaQueriesForWebkitCompatibility = /* @__PURE__ */ new Set();
var mediaQueryStyleNode;
var MediaMatcher = class _MediaMatcher {
  _platform = inject(Platform);
  _nonce = inject(CSP_NONCE, {
    optional: true
  });
  /** The internal matchMedia method to return back a MediaQueryList like object. */
  _matchMedia;
  constructor() {
    this._matchMedia = this._platform.isBrowser && window.matchMedia ? (
      // matchMedia is bound to the window scope intentionally as it is an illegal invocation to
      // call it from a different scope.
      window.matchMedia.bind(window)
    ) : noopMatchMedia;
  }
  /**
   * Evaluates the given media query and returns the native MediaQueryList from which results
   * can be retrieved.
   * Confirms the layout engine will trigger for the selector query provided and returns the
   * MediaQueryList for the query provided.
   */
  matchMedia(query2) {
    if (this._platform.WEBKIT || this._platform.BLINK) {
      createEmptyStyleRule(query2, this._nonce);
    }
    return this._matchMedia(query2);
  }
  static ɵfac = function MediaMatcher_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MediaMatcher)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _MediaMatcher,
    factory: _MediaMatcher.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MediaMatcher, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
function createEmptyStyleRule(query2, nonce) {
  if (mediaQueriesForWebkitCompatibility.has(query2)) {
    return;
  }
  try {
    if (!mediaQueryStyleNode) {
      mediaQueryStyleNode = document.createElement("style");
      if (nonce) {
        mediaQueryStyleNode.setAttribute("nonce", nonce);
      }
      mediaQueryStyleNode.setAttribute("type", "text/css");
      document.head.appendChild(mediaQueryStyleNode);
    }
    if (mediaQueryStyleNode.sheet) {
      mediaQueryStyleNode.sheet.insertRule(`@media ${query2} {body{ }}`, 0);
      mediaQueriesForWebkitCompatibility.add(query2);
    }
  } catch (e) {
    console.error(e);
  }
}
function noopMatchMedia(query2) {
  return {
    matches: query2 === "all" || query2 === "",
    media: query2,
    addListener: () => {
    },
    removeListener: () => {
    }
  };
}
var BreakpointObserver = class _BreakpointObserver {
  _mediaMatcher = inject(MediaMatcher);
  _zone = inject(NgZone);
  /**  A map of all media queries currently being listened for. */
  _queries = /* @__PURE__ */ new Map();
  /** A subject for all other observables to takeUntil based on. */
  _destroySubject = new Subject();
  constructor() {
  }
  /** Completes the active subject, signalling to all other observables to complete. */
  ngOnDestroy() {
    this._destroySubject.next();
    this._destroySubject.complete();
  }
  /**
   * Whether one or more media queries match the current viewport size.
   * @param value One or more media queries to check.
   * @returns Whether any of the media queries match.
   */
  isMatched(value) {
    const queries = splitQueries(coerceArray(value));
    return queries.some((mediaQuery) => this._registerQuery(mediaQuery).mql.matches);
  }
  /**
   * Gets an observable of results for the given queries that will emit new results for any changes
   * in matching of the given queries.
   * @param value One or more media queries to check.
   * @returns A stream of matches for the given queries.
   */
  observe(value) {
    const queries = splitQueries(coerceArray(value));
    const observables = queries.map((query2) => this._registerQuery(query2).observable);
    let stateObservable = combineLatest(observables);
    stateObservable = concat(stateObservable.pipe(take(1)), stateObservable.pipe(skip(1), debounceTime(0)));
    return stateObservable.pipe(map((breakpointStates) => {
      const response = {
        matches: false,
        breakpoints: {}
      };
      breakpointStates.forEach(({
        matches,
        query: query2
      }) => {
        response.matches = response.matches || matches;
        response.breakpoints[query2] = matches;
      });
      return response;
    }));
  }
  /** Registers a specific query to be listened for. */
  _registerQuery(query2) {
    if (this._queries.has(query2)) {
      return this._queries.get(query2);
    }
    const mql = this._mediaMatcher.matchMedia(query2);
    const queryObservable = new Observable((observer) => {
      const handler = (e) => this._zone.run(() => observer.next(e));
      mql.addListener(handler);
      return () => {
        mql.removeListener(handler);
      };
    }).pipe(startWith(mql), map(({
      matches
    }) => ({
      query: query2,
      matches
    })), takeUntil(this._destroySubject));
    const output2 = {
      observable: queryObservable,
      mql
    };
    this._queries.set(query2, output2);
    return output2;
  }
  static ɵfac = function BreakpointObserver_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BreakpointObserver)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _BreakpointObserver,
    factory: _BreakpointObserver.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BreakpointObserver, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
function splitQueries(queries) {
  return queries.map((query2) => query2.split(",")).reduce((a1, a2) => a1.concat(a2)).map((query2) => query2.trim());
}

// node_modules/@angular/cdk/fesm2022/private.mjs
var appsWithLoaders = /* @__PURE__ */ new WeakMap();
var _CdkPrivateStyleLoader = class __CdkPrivateStyleLoader {
  _appRef;
  _injector = inject(Injector);
  _environmentInjector = inject(EnvironmentInjector);
  /**
   * Loads a set of styles.
   * @param loader Component which will be instantiated to load the styles.
   */
  load(loader) {
    const appRef = this._appRef = this._appRef || this._injector.get(ApplicationRef);
    let data = appsWithLoaders.get(appRef);
    if (!data) {
      data = {
        loaders: /* @__PURE__ */ new Set(),
        refs: []
      };
      appsWithLoaders.set(appRef, data);
      appRef.onDestroy(() => {
        appsWithLoaders.get(appRef)?.refs.forEach((ref) => ref.destroy());
        appsWithLoaders.delete(appRef);
      });
    }
    if (!data.loaders.has(loader)) {
      data.loaders.add(loader);
      data.refs.push(createComponent(loader, {
        environmentInjector: this._environmentInjector
      }));
    }
  }
  static ɵfac = function _CdkPrivateStyleLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || __CdkPrivateStyleLoader)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: __CdkPrivateStyleLoader,
    factory: __CdkPrivateStyleLoader.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_CdkPrivateStyleLoader, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var _VisuallyHiddenLoader = class __VisuallyHiddenLoader {
  static ɵfac = function _VisuallyHiddenLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || __VisuallyHiddenLoader)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: __VisuallyHiddenLoader,
    selectors: [["ng-component"]],
    exportAs: ["cdkVisuallyHidden"],
    decls: 0,
    vars: 0,
    template: function _VisuallyHiddenLoader_Template(rf, ctx) {
    },
    styles: [".cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;white-space:nowrap;outline:0;-webkit-appearance:none;-moz-appearance:none;left:0}[dir=rtl] .cdk-visually-hidden{left:auto;right:0}"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_VisuallyHiddenLoader, [{
    type: Component,
    args: [{
      exportAs: "cdkVisuallyHidden",
      encapsulation: ViewEncapsulation.None,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      styles: [".cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;white-space:nowrap;outline:0;-webkit-appearance:none;-moz-appearance:none;left:0}[dir=rtl] .cdk-visually-hidden{left:auto;right:0}"]
    }]
  }], null, null);
})();

// node_modules/@angular/cdk/fesm2022/coercion/private.mjs
function coerceObservable(data) {
  if (!isObservable(data)) {
    return of(data);
  }
  return data;
}

// node_modules/@angular/cdk/fesm2022/observers.mjs
function shouldIgnoreRecord(record) {
  if (record.type === "characterData" && record.target instanceof Comment) {
    return true;
  }
  if (record.type === "childList") {
    for (let i = 0; i < record.addedNodes.length; i++) {
      if (!(record.addedNodes[i] instanceof Comment)) {
        return false;
      }
    }
    for (let i = 0; i < record.removedNodes.length; i++) {
      if (!(record.removedNodes[i] instanceof Comment)) {
        return false;
      }
    }
    return true;
  }
  return false;
}
var MutationObserverFactory = class _MutationObserverFactory {
  create(callback) {
    return typeof MutationObserver === "undefined" ? null : new MutationObserver(callback);
  }
  static ɵfac = function MutationObserverFactory_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MutationObserverFactory)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _MutationObserverFactory,
    factory: _MutationObserverFactory.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MutationObserverFactory, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var ContentObserver = class _ContentObserver {
  _mutationObserverFactory = inject(MutationObserverFactory);
  /** Keeps track of the existing MutationObservers so they can be reused. */
  _observedElements = /* @__PURE__ */ new Map();
  _ngZone = inject(NgZone);
  constructor() {
  }
  ngOnDestroy() {
    this._observedElements.forEach((_, element) => this._cleanupObserver(element));
  }
  observe(elementOrRef) {
    const element = coerceElement(elementOrRef);
    return new Observable((observer) => {
      const stream = this._observeElement(element);
      const subscription = stream.pipe(map((records) => records.filter((record) => !shouldIgnoreRecord(record))), filter((records) => !!records.length)).subscribe((records) => {
        this._ngZone.run(() => {
          observer.next(records);
        });
      });
      return () => {
        subscription.unsubscribe();
        this._unobserveElement(element);
      };
    });
  }
  /**
   * Observes the given element by using the existing MutationObserver if available, or creating a
   * new one if not.
   */
  _observeElement(element) {
    return this._ngZone.runOutsideAngular(() => {
      if (!this._observedElements.has(element)) {
        const stream = new Subject();
        const observer = this._mutationObserverFactory.create((mutations) => stream.next(mutations));
        if (observer) {
          observer.observe(element, {
            characterData: true,
            childList: true,
            subtree: true
          });
        }
        this._observedElements.set(element, {
          observer,
          stream,
          count: 1
        });
      } else {
        this._observedElements.get(element).count++;
      }
      return this._observedElements.get(element).stream;
    });
  }
  /**
   * Un-observes the given element and cleans up the underlying MutationObserver if nobody else is
   * observing this element.
   */
  _unobserveElement(element) {
    if (this._observedElements.has(element)) {
      this._observedElements.get(element).count--;
      if (!this._observedElements.get(element).count) {
        this._cleanupObserver(element);
      }
    }
  }
  /** Clean up the underlying MutationObserver for the specified element. */
  _cleanupObserver(element) {
    if (this._observedElements.has(element)) {
      const {
        observer,
        stream
      } = this._observedElements.get(element);
      if (observer) {
        observer.disconnect();
      }
      stream.complete();
      this._observedElements.delete(element);
    }
  }
  static ɵfac = function ContentObserver_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContentObserver)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _ContentObserver,
    factory: _ContentObserver.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContentObserver, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var CdkObserveContent = class _CdkObserveContent {
  _contentObserver = inject(ContentObserver);
  _elementRef = inject(ElementRef);
  /** Event emitted for each change in the element's content. */
  event = new EventEmitter();
  /**
   * Whether observing content is disabled. This option can be used
   * to disconnect the underlying MutationObserver until it is needed.
   */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = value;
    this._disabled ? this._unsubscribe() : this._subscribe();
  }
  _disabled = false;
  /** Debounce interval for emitting the changes. */
  get debounce() {
    return this._debounce;
  }
  set debounce(value) {
    this._debounce = coerceNumberProperty(value);
    this._subscribe();
  }
  _debounce;
  _currentSubscription = null;
  constructor() {
  }
  ngAfterContentInit() {
    if (!this._currentSubscription && !this.disabled) {
      this._subscribe();
    }
  }
  ngOnDestroy() {
    this._unsubscribe();
  }
  _subscribe() {
    this._unsubscribe();
    const stream = this._contentObserver.observe(this._elementRef);
    this._currentSubscription = (this.debounce ? stream.pipe(debounceTime(this.debounce)) : stream).subscribe(this.event);
  }
  _unsubscribe() {
    this._currentSubscription?.unsubscribe();
  }
  static ɵfac = function CdkObserveContent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkObserveContent)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _CdkObserveContent,
    selectors: [["", "cdkObserveContent", ""]],
    inputs: {
      disabled: [2, "cdkObserveContentDisabled", "disabled", booleanAttribute],
      debounce: "debounce"
    },
    outputs: {
      event: "cdkObserveContent"
    },
    exportAs: ["cdkObserveContent"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkObserveContent, [{
    type: Directive,
    args: [{
      selector: "[cdkObserveContent]",
      exportAs: "cdkObserveContent"
    }]
  }], () => [], {
    event: [{
      type: Output,
      args: ["cdkObserveContent"]
    }],
    disabled: [{
      type: Input,
      args: [{
        alias: "cdkObserveContentDisabled",
        transform: booleanAttribute
      }]
    }],
    debounce: [{
      type: Input
    }]
  });
})();
var ObserversModule = class _ObserversModule {
  static ɵfac = function ObserversModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ObserversModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _ObserversModule,
    imports: [CdkObserveContent],
    exports: [CdkObserveContent]
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [MutationObserverFactory]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ObserversModule, [{
    type: NgModule,
    args: [{
      imports: [CdkObserveContent],
      exports: [CdkObserveContent],
      providers: [MutationObserverFactory]
    }]
  }], null, null);
})();

// node_modules/@angular/cdk/fesm2022/a11y.mjs
var ID_DELIMITER = " ";
function addAriaReferencedId(el, attr, id) {
  const ids = getAriaReferenceIds(el, attr);
  id = id.trim();
  if (ids.some((existingId) => existingId.trim() === id)) {
    return;
  }
  ids.push(id);
  el.setAttribute(attr, ids.join(ID_DELIMITER));
}
function removeAriaReferencedId(el, attr, id) {
  const ids = getAriaReferenceIds(el, attr);
  id = id.trim();
  const filteredIds = ids.filter((val) => val !== id);
  if (filteredIds.length) {
    el.setAttribute(attr, filteredIds.join(ID_DELIMITER));
  } else {
    el.removeAttribute(attr);
  }
}
function getAriaReferenceIds(el, attr) {
  const attrValue = el.getAttribute(attr);
  return attrValue?.match(/\S+/g) ?? [];
}
var CDK_DESCRIBEDBY_ID_PREFIX = "cdk-describedby-message";
var CDK_DESCRIBEDBY_HOST_ATTRIBUTE = "cdk-describedby-host";
var nextId = 0;
var AriaDescriber = class _AriaDescriber {
  _platform = inject(Platform);
  _document = inject(DOCUMENT);
  /** Map of all registered message elements that have been placed into the document. */
  _messageRegistry = /* @__PURE__ */ new Map();
  /** Container for all registered messages. */
  _messagesContainer = null;
  /** Unique ID for the service. */
  _id = `${nextId++}`;
  constructor() {
    inject(_CdkPrivateStyleLoader).load(_VisuallyHiddenLoader);
    this._id = inject(APP_ID) + "-" + nextId++;
  }
  describe(hostElement, message, role) {
    if (!this._canBeDescribed(hostElement, message)) {
      return;
    }
    const key = getKey(message, role);
    if (typeof message !== "string") {
      setMessageId(message, this._id);
      this._messageRegistry.set(key, {
        messageElement: message,
        referenceCount: 0
      });
    } else if (!this._messageRegistry.has(key)) {
      this._createMessageElement(message, role);
    }
    if (!this._isElementDescribedByMessage(hostElement, key)) {
      this._addMessageReference(hostElement, key);
    }
  }
  removeDescription(hostElement, message, role) {
    if (!message || !this._isElementNode(hostElement)) {
      return;
    }
    const key = getKey(message, role);
    if (this._isElementDescribedByMessage(hostElement, key)) {
      this._removeMessageReference(hostElement, key);
    }
    if (typeof message === "string") {
      const registeredMessage = this._messageRegistry.get(key);
      if (registeredMessage && registeredMessage.referenceCount === 0) {
        this._deleteMessageElement(key);
      }
    }
    if (this._messagesContainer?.childNodes.length === 0) {
      this._messagesContainer.remove();
      this._messagesContainer = null;
    }
  }
  /** Unregisters all created message elements and removes the message container. */
  ngOnDestroy() {
    const describedElements = this._document.querySelectorAll(`[${CDK_DESCRIBEDBY_HOST_ATTRIBUTE}="${this._id}"]`);
    for (let i = 0; i < describedElements.length; i++) {
      this._removeCdkDescribedByReferenceIds(describedElements[i]);
      describedElements[i].removeAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
    }
    this._messagesContainer?.remove();
    this._messagesContainer = null;
    this._messageRegistry.clear();
  }
  /**
   * Creates a new element in the visually hidden message container element with the message
   * as its content and adds it to the message registry.
   */
  _createMessageElement(message, role) {
    const messageElement = this._document.createElement("div");
    setMessageId(messageElement, this._id);
    messageElement.textContent = message;
    if (role) {
      messageElement.setAttribute("role", role);
    }
    this._createMessagesContainer();
    this._messagesContainer.appendChild(messageElement);
    this._messageRegistry.set(getKey(message, role), {
      messageElement,
      referenceCount: 0
    });
  }
  /** Deletes the message element from the global messages container. */
  _deleteMessageElement(key) {
    this._messageRegistry.get(key)?.messageElement?.remove();
    this._messageRegistry.delete(key);
  }
  /** Creates the global container for all aria-describedby messages. */
  _createMessagesContainer() {
    if (this._messagesContainer) {
      return;
    }
    const containerClassName = "cdk-describedby-message-container";
    const serverContainers = this._document.querySelectorAll(`.${containerClassName}[platform="server"]`);
    for (let i = 0; i < serverContainers.length; i++) {
      serverContainers[i].remove();
    }
    const messagesContainer = this._document.createElement("div");
    messagesContainer.style.visibility = "hidden";
    messagesContainer.classList.add(containerClassName);
    messagesContainer.classList.add("cdk-visually-hidden");
    if (!this._platform.isBrowser) {
      messagesContainer.setAttribute("platform", "server");
    }
    this._document.body.appendChild(messagesContainer);
    this._messagesContainer = messagesContainer;
  }
  /** Removes all cdk-describedby messages that are hosted through the element. */
  _removeCdkDescribedByReferenceIds(element) {
    const originalReferenceIds = getAriaReferenceIds(element, "aria-describedby").filter((id) => id.indexOf(CDK_DESCRIBEDBY_ID_PREFIX) != 0);
    element.setAttribute("aria-describedby", originalReferenceIds.join(" "));
  }
  /**
   * Adds a message reference to the element using aria-describedby and increments the registered
   * message's reference count.
   */
  _addMessageReference(element, key) {
    const registeredMessage = this._messageRegistry.get(key);
    addAriaReferencedId(element, "aria-describedby", registeredMessage.messageElement.id);
    element.setAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE, this._id);
    registeredMessage.referenceCount++;
  }
  /**
   * Removes a message reference from the element using aria-describedby
   * and decrements the registered message's reference count.
   */
  _removeMessageReference(element, key) {
    const registeredMessage = this._messageRegistry.get(key);
    registeredMessage.referenceCount--;
    removeAriaReferencedId(element, "aria-describedby", registeredMessage.messageElement.id);
    element.removeAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
  }
  /** Returns true if the element has been described by the provided message ID. */
  _isElementDescribedByMessage(element, key) {
    const referenceIds = getAriaReferenceIds(element, "aria-describedby");
    const registeredMessage = this._messageRegistry.get(key);
    const messageId = registeredMessage && registeredMessage.messageElement.id;
    return !!messageId && referenceIds.indexOf(messageId) != -1;
  }
  /** Determines whether a message can be described on a particular element. */
  _canBeDescribed(element, message) {
    if (!this._isElementNode(element)) {
      return false;
    }
    if (message && typeof message === "object") {
      return true;
    }
    const trimmedMessage = message == null ? "" : `${message}`.trim();
    const ariaLabel = element.getAttribute("aria-label");
    return trimmedMessage ? !ariaLabel || ariaLabel.trim() !== trimmedMessage : false;
  }
  /** Checks whether a node is an Element node. */
  _isElementNode(element) {
    return element.nodeType === this._document.ELEMENT_NODE;
  }
  static ɵfac = function AriaDescriber_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AriaDescriber)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _AriaDescriber,
    factory: _AriaDescriber.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AriaDescriber, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
function getKey(message, role) {
  return typeof message === "string" ? `${role || ""}/${message}` : message;
}
function setMessageId(element, serviceId) {
  if (!element.id) {
    element.id = `${CDK_DESCRIBEDBY_ID_PREFIX}-${serviceId}-${nextId++}`;
  }
}
var DEFAULT_TYPEAHEAD_DEBOUNCE_INTERVAL_MS = 200;
var Typeahead = class {
  _letterKeyStream = new Subject();
  _items = [];
  _selectedItemIndex = -1;
  /** Buffer for the letters that the user has pressed */
  _pressedLetters = [];
  _skipPredicateFn;
  _selectedItem = new Subject();
  selectedItem = this._selectedItem;
  constructor(initialItems, config) {
    const typeAheadInterval = typeof config?.debounceInterval === "number" ? config.debounceInterval : DEFAULT_TYPEAHEAD_DEBOUNCE_INTERVAL_MS;
    if (config?.skipPredicate) {
      this._skipPredicateFn = config.skipPredicate;
    }
    if ((typeof ngDevMode === "undefined" || ngDevMode) && initialItems.length && initialItems.some((item) => typeof item.getLabel !== "function")) {
      throw new Error("KeyManager items in typeahead mode must implement the `getLabel` method.");
    }
    this.setItems(initialItems);
    this._setupKeyHandler(typeAheadInterval);
  }
  destroy() {
    this._pressedLetters = [];
    this._letterKeyStream.complete();
    this._selectedItem.complete();
  }
  setCurrentSelectedItemIndex(index) {
    this._selectedItemIndex = index;
  }
  setItems(items) {
    this._items = items;
  }
  handleKey(event) {
    const keyCode = event.keyCode;
    if (event.key && event.key.length === 1) {
      this._letterKeyStream.next(event.key.toLocaleUpperCase());
    } else if (keyCode >= A && keyCode <= Z || keyCode >= ZERO && keyCode <= NINE) {
      this._letterKeyStream.next(String.fromCharCode(keyCode));
    }
  }
  /** Gets whether the user is currently typing into the manager using the typeahead feature. */
  isTyping() {
    return this._pressedLetters.length > 0;
  }
  /** Resets the currently stored sequence of typed letters. */
  reset() {
    this._pressedLetters = [];
  }
  _setupKeyHandler(typeAheadInterval) {
    this._letterKeyStream.pipe(tap((letter) => this._pressedLetters.push(letter)), debounceTime(typeAheadInterval), filter(() => this._pressedLetters.length > 0), map(() => this._pressedLetters.join("").toLocaleUpperCase())).subscribe((inputString) => {
      for (let i = 1; i < this._items.length + 1; i++) {
        const index = (this._selectedItemIndex + i) % this._items.length;
        const item = this._items[index];
        if (!this._skipPredicateFn?.(item) && item.getLabel?.().toLocaleUpperCase().trim().indexOf(inputString) === 0) {
          this._selectedItem.next(item);
          break;
        }
      }
      this._pressedLetters = [];
    });
  }
};
var ListKeyManager = class {
  _items;
  _activeItemIndex = -1;
  _activeItem = signal(null);
  _wrap = false;
  _typeaheadSubscription = Subscription.EMPTY;
  _itemChangesSubscription;
  _vertical = true;
  _horizontal;
  _allowedModifierKeys = [];
  _homeAndEnd = false;
  _pageUpAndDown = {
    enabled: false,
    delta: 10
  };
  _effectRef;
  _typeahead;
  /**
   * Predicate function that can be used to check whether an item should be skipped
   * by the key manager. By default, disabled items are skipped.
   */
  _skipPredicateFn = (item) => item.disabled;
  constructor(_items, injector) {
    this._items = _items;
    if (_items instanceof QueryList) {
      this._itemChangesSubscription = _items.changes.subscribe((newItems) => this._itemsChanged(newItems.toArray()));
    } else if (isSignal(_items)) {
      if (!injector && (typeof ngDevMode === "undefined" || ngDevMode)) {
        throw new Error("ListKeyManager constructed with a signal must receive an injector");
      }
      this._effectRef = effect(() => this._itemsChanged(_items()), {
        injector
      });
    }
  }
  /**
   * Stream that emits any time the TAB key is pressed, so components can react
   * when focus is shifted off of the list.
   */
  tabOut = new Subject();
  /** Stream that emits whenever the active item of the list manager changes. */
  change = new Subject();
  /**
   * Sets the predicate function that determines which items should be skipped by the
   * list key manager.
   * @param predicate Function that determines whether the given item should be skipped.
   */
  skipPredicate(predicate) {
    this._skipPredicateFn = predicate;
    return this;
  }
  /**
   * Configures wrapping mode, which determines whether the active item will wrap to
   * the other end of list when there are no more items in the given direction.
   * @param shouldWrap Whether the list should wrap when reaching the end.
   */
  withWrap(shouldWrap = true) {
    this._wrap = shouldWrap;
    return this;
  }
  /**
   * Configures whether the key manager should be able to move the selection vertically.
   * @param enabled Whether vertical selection should be enabled.
   */
  withVerticalOrientation(enabled = true) {
    this._vertical = enabled;
    return this;
  }
  /**
   * Configures the key manager to move the selection horizontally.
   * Passing in `null` will disable horizontal movement.
   * @param direction Direction in which the selection can be moved.
   */
  withHorizontalOrientation(direction) {
    this._horizontal = direction;
    return this;
  }
  /**
   * Modifier keys which are allowed to be held down and whose default actions will be prevented
   * as the user is pressing the arrow keys. Defaults to not allowing any modifier keys.
   */
  withAllowedModifierKeys(keys) {
    this._allowedModifierKeys = keys;
    return this;
  }
  /**
   * Turns on typeahead mode which allows users to set the active item by typing.
   * @param debounceInterval Time to wait after the last keystroke before setting the active item.
   */
  withTypeAhead(debounceInterval = 200) {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      const items2 = this._getItemsArray();
      if (items2.length > 0 && items2.some((item) => typeof item.getLabel !== "function")) {
        throw Error("ListKeyManager items in typeahead mode must implement the `getLabel` method.");
      }
    }
    this._typeaheadSubscription.unsubscribe();
    const items = this._getItemsArray();
    this._typeahead = new Typeahead(items, {
      debounceInterval: typeof debounceInterval === "number" ? debounceInterval : void 0,
      skipPredicate: (item) => this._skipPredicateFn(item)
    });
    this._typeaheadSubscription = this._typeahead.selectedItem.subscribe((item) => {
      this.setActiveItem(item);
    });
    return this;
  }
  /** Cancels the current typeahead sequence. */
  cancelTypeahead() {
    this._typeahead?.reset();
    return this;
  }
  /**
   * Configures the key manager to activate the first and last items
   * respectively when the Home or End key is pressed.
   * @param enabled Whether pressing the Home or End key activates the first/last item.
   */
  withHomeAndEnd(enabled = true) {
    this._homeAndEnd = enabled;
    return this;
  }
  /**
   * Configures the key manager to activate every 10th, configured or first/last element in up/down direction
   * respectively when the Page-Up or Page-Down key is pressed.
   * @param enabled Whether pressing the Page-Up or Page-Down key activates the first/last item.
   * @param delta Whether pressing the Home or End key activates the first/last item.
   */
  withPageUpDown(enabled = true, delta = 10) {
    this._pageUpAndDown = {
      enabled,
      delta
    };
    return this;
  }
  setActiveItem(item) {
    const previousActiveItem = this._activeItem();
    this.updateActiveItem(item);
    if (this._activeItem() !== previousActiveItem) {
      this.change.next(this._activeItemIndex);
    }
  }
  /**
   * Sets the active item depending on the key event passed in.
   * @param event Keyboard event to be used for determining which element should be active.
   */
  onKeydown(event) {
    const keyCode = event.keyCode;
    const modifiers = ["altKey", "ctrlKey", "metaKey", "shiftKey"];
    const isModifierAllowed = modifiers.every((modifier) => {
      return !event[modifier] || this._allowedModifierKeys.indexOf(modifier) > -1;
    });
    switch (keyCode) {
      case TAB:
        this.tabOut.next();
        return;
      case DOWN_ARROW:
        if (this._vertical && isModifierAllowed) {
          this.setNextItemActive();
          break;
        } else {
          return;
        }
      case UP_ARROW:
        if (this._vertical && isModifierAllowed) {
          this.setPreviousItemActive();
          break;
        } else {
          return;
        }
      case RIGHT_ARROW:
        if (this._horizontal && isModifierAllowed) {
          this._horizontal === "rtl" ? this.setPreviousItemActive() : this.setNextItemActive();
          break;
        } else {
          return;
        }
      case LEFT_ARROW:
        if (this._horizontal && isModifierAllowed) {
          this._horizontal === "rtl" ? this.setNextItemActive() : this.setPreviousItemActive();
          break;
        } else {
          return;
        }
      case HOME:
        if (this._homeAndEnd && isModifierAllowed) {
          this.setFirstItemActive();
          break;
        } else {
          return;
        }
      case END:
        if (this._homeAndEnd && isModifierAllowed) {
          this.setLastItemActive();
          break;
        } else {
          return;
        }
      case PAGE_UP:
        if (this._pageUpAndDown.enabled && isModifierAllowed) {
          const targetIndex = this._activeItemIndex - this._pageUpAndDown.delta;
          this._setActiveItemByIndex(targetIndex > 0 ? targetIndex : 0, 1);
          break;
        } else {
          return;
        }
      case PAGE_DOWN:
        if (this._pageUpAndDown.enabled && isModifierAllowed) {
          const targetIndex = this._activeItemIndex + this._pageUpAndDown.delta;
          const itemsLength = this._getItemsArray().length;
          this._setActiveItemByIndex(targetIndex < itemsLength ? targetIndex : itemsLength - 1, -1);
          break;
        } else {
          return;
        }
      default:
        if (isModifierAllowed || hasModifierKey(event, "shiftKey")) {
          this._typeahead?.handleKey(event);
        }
        return;
    }
    this._typeahead?.reset();
    event.preventDefault();
  }
  /** Index of the currently active item. */
  get activeItemIndex() {
    return this._activeItemIndex;
  }
  /** The active item. */
  get activeItem() {
    return this._activeItem();
  }
  /** Gets whether the user is currently typing into the manager using the typeahead feature. */
  isTyping() {
    return !!this._typeahead && this._typeahead.isTyping();
  }
  /** Sets the active item to the first enabled item in the list. */
  setFirstItemActive() {
    this._setActiveItemByIndex(0, 1);
  }
  /** Sets the active item to the last enabled item in the list. */
  setLastItemActive() {
    this._setActiveItemByIndex(this._getItemsArray().length - 1, -1);
  }
  /** Sets the active item to the next enabled item in the list. */
  setNextItemActive() {
    this._activeItemIndex < 0 ? this.setFirstItemActive() : this._setActiveItemByDelta(1);
  }
  /** Sets the active item to a previous enabled item in the list. */
  setPreviousItemActive() {
    this._activeItemIndex < 0 && this._wrap ? this.setLastItemActive() : this._setActiveItemByDelta(-1);
  }
  updateActiveItem(item) {
    const itemArray = this._getItemsArray();
    const index = typeof item === "number" ? item : itemArray.indexOf(item);
    const activeItem = itemArray[index];
    this._activeItem.set(activeItem == null ? null : activeItem);
    this._activeItemIndex = index;
    this._typeahead?.setCurrentSelectedItemIndex(index);
  }
  /** Cleans up the key manager. */
  destroy() {
    this._typeaheadSubscription.unsubscribe();
    this._itemChangesSubscription?.unsubscribe();
    this._effectRef?.destroy();
    this._typeahead?.destroy();
    this.tabOut.complete();
    this.change.complete();
  }
  /**
   * This method sets the active item, given a list of items and the delta between the
   * currently active item and the new active item. It will calculate differently
   * depending on whether wrap mode is turned on.
   */
  _setActiveItemByDelta(delta) {
    this._wrap ? this._setActiveInWrapMode(delta) : this._setActiveInDefaultMode(delta);
  }
  /**
   * Sets the active item properly given "wrap" mode. In other words, it will continue to move
   * down the list until it finds an item that is not disabled, and it will wrap if it
   * encounters either end of the list.
   */
  _setActiveInWrapMode(delta) {
    const items = this._getItemsArray();
    for (let i = 1; i <= items.length; i++) {
      const index = (this._activeItemIndex + delta * i + items.length) % items.length;
      const item = items[index];
      if (!this._skipPredicateFn(item)) {
        this.setActiveItem(index);
        return;
      }
    }
  }
  /**
   * Sets the active item properly given the default mode. In other words, it will
   * continue to move down the list until it finds an item that is not disabled. If
   * it encounters either end of the list, it will stop and not wrap.
   */
  _setActiveInDefaultMode(delta) {
    this._setActiveItemByIndex(this._activeItemIndex + delta, delta);
  }
  /**
   * Sets the active item to the first enabled item starting at the index specified. If the
   * item is disabled, it will move in the fallbackDelta direction until it either
   * finds an enabled item or encounters the end of the list.
   */
  _setActiveItemByIndex(index, fallbackDelta) {
    const items = this._getItemsArray();
    if (!items[index]) {
      return;
    }
    while (this._skipPredicateFn(items[index])) {
      index += fallbackDelta;
      if (!items[index]) {
        return;
      }
    }
    this.setActiveItem(index);
  }
  /** Returns the items as an array. */
  _getItemsArray() {
    if (isSignal(this._items)) {
      return this._items();
    }
    return this._items instanceof QueryList ? this._items.toArray() : this._items;
  }
  /** Callback for when the items have changed. */
  _itemsChanged(newItems) {
    this._typeahead?.setItems(newItems);
    const activeItem = this._activeItem();
    if (activeItem) {
      const newIndex = newItems.indexOf(activeItem);
      if (newIndex > -1 && newIndex !== this._activeItemIndex) {
        this._activeItemIndex = newIndex;
        this._typeahead?.setCurrentSelectedItemIndex(newIndex);
      }
    }
  }
};
var FocusKeyManager = class extends ListKeyManager {
  _origin = "program";
  /**
   * Sets the focus origin that will be passed in to the items for any subsequent `focus` calls.
   * @param origin Focus origin to be used when focusing items.
   */
  setFocusOrigin(origin) {
    this._origin = origin;
    return this;
  }
  setActiveItem(item) {
    super.setActiveItem(item);
    if (this.activeItem) {
      this.activeItem.focus(this._origin);
    }
  }
};
var TreeKeyManager = class {
  /** The index of the currently active (focused) item. */
  _activeItemIndex = -1;
  /** The currently active (focused) item. */
  _activeItem = null;
  /** Whether or not we activate the item when it's focused. */
  _shouldActivationFollowFocus = false;
  /**
   * The orientation that the tree is laid out in. In `rtl` mode, the behavior of Left and
   * Right arrow are switched.
   */
  _horizontalOrientation = "ltr";
  /**
   * Predicate function that can be used to check whether an item should be skipped
   * by the key manager.
   *
   * The default value for this doesn't skip any elements in order to keep tree items focusable
   * when disabled. This aligns with ARIA guidelines:
   * https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#focusabilityofdisabledcontrols.
   */
  _skipPredicateFn = (_item) => false;
  /** Function to determine equivalent items. */
  _trackByFn = (item) => item;
  /** Synchronous cache of the items to manage. */
  _items = [];
  _typeahead;
  _typeaheadSubscription = Subscription.EMPTY;
  _hasInitialFocused = false;
  _initializeFocus() {
    if (this._hasInitialFocused || this._items.length === 0) {
      return;
    }
    let activeIndex = 0;
    for (let i = 0; i < this._items.length; i++) {
      if (!this._skipPredicateFn(this._items[i]) && !this._isItemDisabled(this._items[i])) {
        activeIndex = i;
        break;
      }
    }
    const activeItem = this._items[activeIndex];
    if (activeItem.makeFocusable) {
      this._activeItem?.unfocus();
      this._activeItemIndex = activeIndex;
      this._activeItem = activeItem;
      this._typeahead?.setCurrentSelectedItemIndex(activeIndex);
      activeItem.makeFocusable();
    } else {
      this.focusItem(activeIndex);
    }
    this._hasInitialFocused = true;
  }
  /**
   *
   * @param items List of TreeKeyManager options. Can be synchronous or asynchronous.
   * @param config Optional configuration options. By default, use 'ltr' horizontal orientation. By
   * default, do not skip any nodes. By default, key manager only calls `focus` method when items
   * are focused and does not call `activate`. If `typeaheadDefaultInterval` is `true`, use a
   * default interval of 200ms.
   */
  constructor(items, config) {
    if (items instanceof QueryList) {
      this._items = items.toArray();
      items.changes.subscribe((newItems) => {
        this._items = newItems.toArray();
        this._typeahead?.setItems(this._items);
        this._updateActiveItemIndex(this._items);
        this._initializeFocus();
      });
    } else if (isObservable(items)) {
      items.subscribe((newItems) => {
        this._items = newItems;
        this._typeahead?.setItems(newItems);
        this._updateActiveItemIndex(newItems);
        this._initializeFocus();
      });
    } else {
      this._items = items;
      this._initializeFocus();
    }
    if (typeof config.shouldActivationFollowFocus === "boolean") {
      this._shouldActivationFollowFocus = config.shouldActivationFollowFocus;
    }
    if (config.horizontalOrientation) {
      this._horizontalOrientation = config.horizontalOrientation;
    }
    if (config.skipPredicate) {
      this._skipPredicateFn = config.skipPredicate;
    }
    if (config.trackBy) {
      this._trackByFn = config.trackBy;
    }
    if (typeof config.typeAheadDebounceInterval !== "undefined") {
      this._setTypeAhead(config.typeAheadDebounceInterval);
    }
  }
  /** Stream that emits any time the focused item changes. */
  change = new Subject();
  /** Cleans up the key manager. */
  destroy() {
    this._typeaheadSubscription.unsubscribe();
    this._typeahead?.destroy();
    this.change.complete();
  }
  /**
   * Handles a keyboard event on the tree.
   * @param event Keyboard event that represents the user interaction with the tree.
   */
  onKeydown(event) {
    const key = event.key;
    switch (key) {
      case "Tab":
        return;
      case "ArrowDown":
        this._focusNextItem();
        break;
      case "ArrowUp":
        this._focusPreviousItem();
        break;
      case "ArrowRight":
        this._horizontalOrientation === "rtl" ? this._collapseCurrentItem() : this._expandCurrentItem();
        break;
      case "ArrowLeft":
        this._horizontalOrientation === "rtl" ? this._expandCurrentItem() : this._collapseCurrentItem();
        break;
      case "Home":
        this._focusFirstItem();
        break;
      case "End":
        this._focusLastItem();
        break;
      case "Enter":
      case " ":
        this._activateCurrentItem();
        break;
      default:
        if (event.key === "*") {
          this._expandAllItemsAtCurrentItemLevel();
          break;
        }
        this._typeahead?.handleKey(event);
        return;
    }
    this._typeahead?.reset();
    event.preventDefault();
  }
  /** Index of the currently active item. */
  getActiveItemIndex() {
    return this._activeItemIndex;
  }
  /** The currently active item. */
  getActiveItem() {
    return this._activeItem;
  }
  /** Focus the first available item. */
  _focusFirstItem() {
    this.focusItem(this._findNextAvailableItemIndex(-1));
  }
  /** Focus the last available item. */
  _focusLastItem() {
    this.focusItem(this._findPreviousAvailableItemIndex(this._items.length));
  }
  /** Focus the next available item. */
  _focusNextItem() {
    this.focusItem(this._findNextAvailableItemIndex(this._activeItemIndex));
  }
  /** Focus the previous available item. */
  _focusPreviousItem() {
    this.focusItem(this._findPreviousAvailableItemIndex(this._activeItemIndex));
  }
  focusItem(itemOrIndex, options = {}) {
    options.emitChangeEvent ??= true;
    let index = typeof itemOrIndex === "number" ? itemOrIndex : this._items.findIndex((item) => this._trackByFn(item) === this._trackByFn(itemOrIndex));
    if (index < 0 || index >= this._items.length) {
      return;
    }
    const activeItem = this._items[index];
    if (this._activeItem !== null && this._trackByFn(activeItem) === this._trackByFn(this._activeItem)) {
      return;
    }
    const previousActiveItem = this._activeItem;
    this._activeItem = activeItem ?? null;
    this._activeItemIndex = index;
    this._typeahead?.setCurrentSelectedItemIndex(index);
    this._activeItem?.focus();
    previousActiveItem?.unfocus();
    if (options.emitChangeEvent) {
      this.change.next(this._activeItem);
    }
    if (this._shouldActivationFollowFocus) {
      this._activateCurrentItem();
    }
  }
  _updateActiveItemIndex(newItems) {
    const activeItem = this._activeItem;
    if (!activeItem) {
      return;
    }
    const newIndex = newItems.findIndex((item) => this._trackByFn(item) === this._trackByFn(activeItem));
    if (newIndex > -1 && newIndex !== this._activeItemIndex) {
      this._activeItemIndex = newIndex;
      this._typeahead?.setCurrentSelectedItemIndex(newIndex);
    }
  }
  _setTypeAhead(debounceInterval) {
    this._typeahead = new Typeahead(this._items, {
      debounceInterval: typeof debounceInterval === "number" ? debounceInterval : void 0,
      skipPredicate: (item) => this._skipPredicateFn(item)
    });
    this._typeaheadSubscription = this._typeahead.selectedItem.subscribe((item) => {
      this.focusItem(item);
    });
  }
  _findNextAvailableItemIndex(startingIndex) {
    for (let i = startingIndex + 1; i < this._items.length; i++) {
      if (!this._skipPredicateFn(this._items[i])) {
        return i;
      }
    }
    return startingIndex;
  }
  _findPreviousAvailableItemIndex(startingIndex) {
    for (let i = startingIndex - 1; i >= 0; i--) {
      if (!this._skipPredicateFn(this._items[i])) {
        return i;
      }
    }
    return startingIndex;
  }
  /**
   * If the item is already expanded, we collapse the item. Otherwise, we will focus the parent.
   */
  _collapseCurrentItem() {
    if (!this._activeItem) {
      return;
    }
    if (this._isCurrentItemExpanded()) {
      this._activeItem.collapse();
    } else {
      const parent = this._activeItem.getParent();
      if (!parent || this._skipPredicateFn(parent)) {
        return;
      }
      this.focusItem(parent);
    }
  }
  /**
   * If the item is already collapsed, we expand the item. Otherwise, we will focus the first child.
   */
  _expandCurrentItem() {
    if (!this._activeItem) {
      return;
    }
    if (!this._isCurrentItemExpanded()) {
      this._activeItem.expand();
    } else {
      coerceObservable(this._activeItem.getChildren()).pipe(take(1)).subscribe((children) => {
        const firstChild = children.find((child) => !this._skipPredicateFn(child));
        if (!firstChild) {
          return;
        }
        this.focusItem(firstChild);
      });
    }
  }
  _isCurrentItemExpanded() {
    if (!this._activeItem) {
      return false;
    }
    return typeof this._activeItem.isExpanded === "boolean" ? this._activeItem.isExpanded : this._activeItem.isExpanded();
  }
  _isItemDisabled(item) {
    return typeof item.isDisabled === "boolean" ? item.isDisabled : item.isDisabled?.();
  }
  /** For all items that are the same level as the current item, we expand those items. */
  _expandAllItemsAtCurrentItemLevel() {
    if (!this._activeItem) {
      return;
    }
    const parent = this._activeItem.getParent();
    let itemsToExpand;
    if (!parent) {
      itemsToExpand = of(this._items.filter((item) => item.getParent() === null));
    } else {
      itemsToExpand = coerceObservable(parent.getChildren());
    }
    itemsToExpand.pipe(take(1)).subscribe((items) => {
      for (const item of items) {
        item.expand();
      }
    });
  }
  _activateCurrentItem() {
    this._activeItem?.activate();
  }
};
function TREE_KEY_MANAGER_FACTORY() {
  return (items, options) => new TreeKeyManager(items, options);
}
var TREE_KEY_MANAGER = new InjectionToken("tree-key-manager", {
  providedIn: "root",
  factory: TREE_KEY_MANAGER_FACTORY
});
var InteractivityChecker = class _InteractivityChecker {
  _platform = inject(Platform);
  constructor() {
  }
  /**
   * Gets whether an element is disabled.
   *
   * @param element Element to be checked.
   * @returns Whether the element is disabled.
   */
  isDisabled(element) {
    return element.hasAttribute("disabled");
  }
  /**
   * Gets whether an element is visible for the purposes of interactivity.
   *
   * This will capture states like `display: none` and `visibility: hidden`, but not things like
   * being clipped by an `overflow: hidden` parent or being outside the viewport.
   *
   * @returns Whether the element is visible.
   */
  isVisible(element) {
    return hasGeometry(element) && getComputedStyle(element).visibility === "visible";
  }
  /**
   * Gets whether an element can be reached via Tab key.
   * Assumes that the element has already been checked with isFocusable.
   *
   * @param element Element to be checked.
   * @returns Whether the element is tabbable.
   */
  isTabbable(element) {
    if (!this._platform.isBrowser) {
      return false;
    }
    const frameElement = getFrameElement(getWindow2(element));
    if (frameElement) {
      if (getTabIndexValue(frameElement) === -1) {
        return false;
      }
      if (!this.isVisible(frameElement)) {
        return false;
      }
    }
    let nodeName = element.nodeName.toLowerCase();
    let tabIndexValue = getTabIndexValue(element);
    if (element.hasAttribute("contenteditable")) {
      return tabIndexValue !== -1;
    }
    if (nodeName === "iframe" || nodeName === "object") {
      return false;
    }
    if (this._platform.WEBKIT && this._platform.IOS && !isPotentiallyTabbableIOS(element)) {
      return false;
    }
    if (nodeName === "audio") {
      if (!element.hasAttribute("controls")) {
        return false;
      }
      return tabIndexValue !== -1;
    }
    if (nodeName === "video") {
      if (tabIndexValue === -1) {
        return false;
      }
      if (tabIndexValue !== null) {
        return true;
      }
      return this._platform.FIREFOX || element.hasAttribute("controls");
    }
    return element.tabIndex >= 0;
  }
  /**
   * Gets whether an element can be focused by the user.
   *
   * @param element Element to be checked.
   * @param config The config object with options to customize this method's behavior
   * @returns Whether the element is focusable.
   */
  isFocusable(element, config) {
    return isPotentiallyFocusable(element) && !this.isDisabled(element) && (config?.ignoreVisibility || this.isVisible(element));
  }
  static ɵfac = function InteractivityChecker_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InteractivityChecker)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _InteractivityChecker,
    factory: _InteractivityChecker.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InteractivityChecker, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
function getFrameElement(window2) {
  try {
    return window2.frameElement;
  } catch {
    return null;
  }
}
function hasGeometry(element) {
  return !!(element.offsetWidth || element.offsetHeight || typeof element.getClientRects === "function" && element.getClientRects().length);
}
function isNativeFormElement(element) {
  let nodeName = element.nodeName.toLowerCase();
  return nodeName === "input" || nodeName === "select" || nodeName === "button" || nodeName === "textarea";
}
function isHiddenInput(element) {
  return isInputElement(element) && element.type == "hidden";
}
function isAnchorWithHref(element) {
  return isAnchorElement(element) && element.hasAttribute("href");
}
function isInputElement(element) {
  return element.nodeName.toLowerCase() == "input";
}
function isAnchorElement(element) {
  return element.nodeName.toLowerCase() == "a";
}
function hasValidTabIndex(element) {
  if (!element.hasAttribute("tabindex") || element.tabIndex === void 0) {
    return false;
  }
  let tabIndex = element.getAttribute("tabindex");
  return !!(tabIndex && !isNaN(parseInt(tabIndex, 10)));
}
function getTabIndexValue(element) {
  if (!hasValidTabIndex(element)) {
    return null;
  }
  const tabIndex = parseInt(element.getAttribute("tabindex") || "", 10);
  return isNaN(tabIndex) ? -1 : tabIndex;
}
function isPotentiallyTabbableIOS(element) {
  let nodeName = element.nodeName.toLowerCase();
  let inputType = nodeName === "input" && element.type;
  return inputType === "text" || inputType === "password" || nodeName === "select" || nodeName === "textarea";
}
function isPotentiallyFocusable(element) {
  if (isHiddenInput(element)) {
    return false;
  }
  return isNativeFormElement(element) || isAnchorWithHref(element) || element.hasAttribute("contenteditable") || hasValidTabIndex(element);
}
function getWindow2(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || window;
}
var FocusTrap = class {
  _element;
  _checker;
  _ngZone;
  _document;
  _injector;
  _startAnchor;
  _endAnchor;
  _hasAttached = false;
  // Event listeners for the anchors. Need to be regular functions so that we can unbind them later.
  startAnchorListener = () => this.focusLastTabbableElement();
  endAnchorListener = () => this.focusFirstTabbableElement();
  /** Whether the focus trap is active. */
  get enabled() {
    return this._enabled;
  }
  set enabled(value) {
    this._enabled = value;
    if (this._startAnchor && this._endAnchor) {
      this._toggleAnchorTabIndex(value, this._startAnchor);
      this._toggleAnchorTabIndex(value, this._endAnchor);
    }
  }
  _enabled = true;
  constructor(_element, _checker, _ngZone, _document, deferAnchors = false, _injector) {
    this._element = _element;
    this._checker = _checker;
    this._ngZone = _ngZone;
    this._document = _document;
    this._injector = _injector;
    if (!deferAnchors) {
      this.attachAnchors();
    }
  }
  /** Destroys the focus trap by cleaning up the anchors. */
  destroy() {
    const startAnchor = this._startAnchor;
    const endAnchor = this._endAnchor;
    if (startAnchor) {
      startAnchor.removeEventListener("focus", this.startAnchorListener);
      startAnchor.remove();
    }
    if (endAnchor) {
      endAnchor.removeEventListener("focus", this.endAnchorListener);
      endAnchor.remove();
    }
    this._startAnchor = this._endAnchor = null;
    this._hasAttached = false;
  }
  /**
   * Inserts the anchors into the DOM. This is usually done automatically
   * in the constructor, but can be deferred for cases like directives with `*ngIf`.
   * @returns Whether the focus trap managed to attach successfully. This may not be the case
   * if the target element isn't currently in the DOM.
   */
  attachAnchors() {
    if (this._hasAttached) {
      return true;
    }
    this._ngZone.runOutsideAngular(() => {
      if (!this._startAnchor) {
        this._startAnchor = this._createAnchor();
        this._startAnchor.addEventListener("focus", this.startAnchorListener);
      }
      if (!this._endAnchor) {
        this._endAnchor = this._createAnchor();
        this._endAnchor.addEventListener("focus", this.endAnchorListener);
      }
    });
    if (this._element.parentNode) {
      this._element.parentNode.insertBefore(this._startAnchor, this._element);
      this._element.parentNode.insertBefore(this._endAnchor, this._element.nextSibling);
      this._hasAttached = true;
    }
    return this._hasAttached;
  }
  /**
   * Waits for the zone to stabilize, then focuses the first tabbable element.
   * @returns Returns a promise that resolves with a boolean, depending
   * on whether focus was moved successfully.
   */
  focusInitialElementWhenReady(options) {
    return new Promise((resolve) => {
      this._executeOnStable(() => resolve(this.focusInitialElement(options)));
    });
  }
  /**
   * Waits for the zone to stabilize, then focuses
   * the first tabbable element within the focus trap region.
   * @returns Returns a promise that resolves with a boolean, depending
   * on whether focus was moved successfully.
   */
  focusFirstTabbableElementWhenReady(options) {
    return new Promise((resolve) => {
      this._executeOnStable(() => resolve(this.focusFirstTabbableElement(options)));
    });
  }
  /**
   * Waits for the zone to stabilize, then focuses
   * the last tabbable element within the focus trap region.
   * @returns Returns a promise that resolves with a boolean, depending
   * on whether focus was moved successfully.
   */
  focusLastTabbableElementWhenReady(options) {
    return new Promise((resolve) => {
      this._executeOnStable(() => resolve(this.focusLastTabbableElement(options)));
    });
  }
  /**
   * Get the specified boundary element of the trapped region.
   * @param bound The boundary to get (start or end of trapped region).
   * @returns The boundary element.
   */
  _getRegionBoundary(bound) {
    const markers = this._element.querySelectorAll(`[cdk-focus-region-${bound}], [cdkFocusRegion${bound}], [cdk-focus-${bound}]`);
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      for (let i = 0; i < markers.length; i++) {
        if (markers[i].hasAttribute(`cdk-focus-${bound}`)) {
          console.warn(`Found use of deprecated attribute 'cdk-focus-${bound}', use 'cdkFocusRegion${bound}' instead. The deprecated attribute will be removed in 8.0.0.`, markers[i]);
        } else if (markers[i].hasAttribute(`cdk-focus-region-${bound}`)) {
          console.warn(`Found use of deprecated attribute 'cdk-focus-region-${bound}', use 'cdkFocusRegion${bound}' instead. The deprecated attribute will be removed in 8.0.0.`, markers[i]);
        }
      }
    }
    if (bound == "start") {
      return markers.length ? markers[0] : this._getFirstTabbableElement(this._element);
    }
    return markers.length ? markers[markers.length - 1] : this._getLastTabbableElement(this._element);
  }
  /**
   * Focuses the element that should be focused when the focus trap is initialized.
   * @returns Whether focus was moved successfully.
   */
  focusInitialElement(options) {
    const redirectToElement = this._element.querySelector(`[cdk-focus-initial], [cdkFocusInitial]`);
    if (redirectToElement) {
      if ((typeof ngDevMode === "undefined" || ngDevMode) && redirectToElement.hasAttribute(`cdk-focus-initial`)) {
        console.warn(`Found use of deprecated attribute 'cdk-focus-initial', use 'cdkFocusInitial' instead. The deprecated attribute will be removed in 8.0.0`, redirectToElement);
      }
      if ((typeof ngDevMode === "undefined" || ngDevMode) && !this._checker.isFocusable(redirectToElement)) {
        console.warn(`Element matching '[cdkFocusInitial]' is not focusable.`, redirectToElement);
      }
      if (!this._checker.isFocusable(redirectToElement)) {
        const focusableChild = this._getFirstTabbableElement(redirectToElement);
        focusableChild?.focus(options);
        return !!focusableChild;
      }
      redirectToElement.focus(options);
      return true;
    }
    return this.focusFirstTabbableElement(options);
  }
  /**
   * Focuses the first tabbable element within the focus trap region.
   * @returns Whether focus was moved successfully.
   */
  focusFirstTabbableElement(options) {
    const redirectToElement = this._getRegionBoundary("start");
    if (redirectToElement) {
      redirectToElement.focus(options);
    }
    return !!redirectToElement;
  }
  /**
   * Focuses the last tabbable element within the focus trap region.
   * @returns Whether focus was moved successfully.
   */
  focusLastTabbableElement(options) {
    const redirectToElement = this._getRegionBoundary("end");
    if (redirectToElement) {
      redirectToElement.focus(options);
    }
    return !!redirectToElement;
  }
  /**
   * Checks whether the focus trap has successfully been attached.
   */
  hasAttached() {
    return this._hasAttached;
  }
  /** Get the first tabbable element from a DOM subtree (inclusive). */
  _getFirstTabbableElement(root) {
    if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
      return root;
    }
    const children = root.children;
    for (let i = 0; i < children.length; i++) {
      const tabbableChild = children[i].nodeType === this._document.ELEMENT_NODE ? this._getFirstTabbableElement(children[i]) : null;
      if (tabbableChild) {
        return tabbableChild;
      }
    }
    return null;
  }
  /** Get the last tabbable element from a DOM subtree (inclusive). */
  _getLastTabbableElement(root) {
    if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
      return root;
    }
    const children = root.children;
    for (let i = children.length - 1; i >= 0; i--) {
      const tabbableChild = children[i].nodeType === this._document.ELEMENT_NODE ? this._getLastTabbableElement(children[i]) : null;
      if (tabbableChild) {
        return tabbableChild;
      }
    }
    return null;
  }
  /** Creates an anchor element. */
  _createAnchor() {
    const anchor = this._document.createElement("div");
    this._toggleAnchorTabIndex(this._enabled, anchor);
    anchor.classList.add("cdk-visually-hidden");
    anchor.classList.add("cdk-focus-trap-anchor");
    anchor.setAttribute("aria-hidden", "true");
    return anchor;
  }
  /**
   * Toggles the `tabindex` of an anchor, based on the enabled state of the focus trap.
   * @param isEnabled Whether the focus trap is enabled.
   * @param anchor Anchor on which to toggle the tabindex.
   */
  _toggleAnchorTabIndex(isEnabled, anchor) {
    isEnabled ? anchor.setAttribute("tabindex", "0") : anchor.removeAttribute("tabindex");
  }
  /**
   * Toggles the`tabindex` of both anchors to either trap Tab focus or allow it to escape.
   * @param enabled: Whether the anchors should trap Tab.
   */
  toggleAnchors(enabled) {
    if (this._startAnchor && this._endAnchor) {
      this._toggleAnchorTabIndex(enabled, this._startAnchor);
      this._toggleAnchorTabIndex(enabled, this._endAnchor);
    }
  }
  /** Executes a function when the zone is stable. */
  _executeOnStable(fn2) {
    if (this._injector) {
      afterNextRender(fn2, {
        injector: this._injector
      });
    } else {
      setTimeout(fn2);
    }
  }
};
var FocusTrapFactory = class _FocusTrapFactory {
  _checker = inject(InteractivityChecker);
  _ngZone = inject(NgZone);
  _document = inject(DOCUMENT);
  _injector = inject(Injector);
  constructor() {
    inject(_CdkPrivateStyleLoader).load(_VisuallyHiddenLoader);
  }
  /**
   * Creates a focus-trapped region around the given element.
   * @param element The element around which focus will be trapped.
   * @param deferCaptureElements Defers the creation of focus-capturing elements to be done
   *     manually by the user.
   * @returns The created focus trap instance.
   */
  create(element, deferCaptureElements = false) {
    return new FocusTrap(element, this._checker, this._ngZone, this._document, deferCaptureElements, this._injector);
  }
  static ɵfac = function FocusTrapFactory_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FocusTrapFactory)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _FocusTrapFactory,
    factory: _FocusTrapFactory.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FocusTrapFactory, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var CdkTrapFocus = class _CdkTrapFocus {
  _elementRef = inject(ElementRef);
  _focusTrapFactory = inject(FocusTrapFactory);
  /** Underlying FocusTrap instance. */
  focusTrap;
  /** Previously focused element to restore focus to upon destroy when using autoCapture. */
  _previouslyFocusedElement = null;
  /** Whether the focus trap is active. */
  get enabled() {
    return this.focusTrap?.enabled || false;
  }
  set enabled(value) {
    if (this.focusTrap) {
      this.focusTrap.enabled = value;
    }
  }
  /**
   * Whether the directive should automatically move focus into the trapped region upon
   * initialization and return focus to the previous activeElement upon destruction.
   */
  autoCapture;
  constructor() {
    const platform = inject(Platform);
    if (platform.isBrowser) {
      this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
    }
  }
  ngOnDestroy() {
    this.focusTrap?.destroy();
    if (this._previouslyFocusedElement) {
      this._previouslyFocusedElement.focus();
      this._previouslyFocusedElement = null;
    }
  }
  ngAfterContentInit() {
    this.focusTrap?.attachAnchors();
    if (this.autoCapture) {
      this._captureFocus();
    }
  }
  ngDoCheck() {
    if (this.focusTrap && !this.focusTrap.hasAttached()) {
      this.focusTrap.attachAnchors();
    }
  }
  ngOnChanges(changes) {
    const autoCaptureChange = changes["autoCapture"];
    if (autoCaptureChange && !autoCaptureChange.firstChange && this.autoCapture && this.focusTrap?.hasAttached()) {
      this._captureFocus();
    }
  }
  _captureFocus() {
    this._previouslyFocusedElement = _getFocusedElementPierceShadowDom();
    this.focusTrap?.focusInitialElementWhenReady();
  }
  static ɵfac = function CdkTrapFocus_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkTrapFocus)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _CdkTrapFocus,
    selectors: [["", "cdkTrapFocus", ""]],
    inputs: {
      enabled: [2, "cdkTrapFocus", "enabled", booleanAttribute],
      autoCapture: [2, "cdkTrapFocusAutoCapture", "autoCapture", booleanAttribute]
    },
    exportAs: ["cdkTrapFocus"],
    features: [ɵɵNgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkTrapFocus, [{
    type: Directive,
    args: [{
      selector: "[cdkTrapFocus]",
      exportAs: "cdkTrapFocus"
    }]
  }], () => [], {
    enabled: [{
      type: Input,
      args: [{
        alias: "cdkTrapFocus",
        transform: booleanAttribute
      }]
    }],
    autoCapture: [{
      type: Input,
      args: [{
        alias: "cdkTrapFocusAutoCapture",
        transform: booleanAttribute
      }]
    }]
  });
})();
var ConfigurableFocusTrap = class extends FocusTrap {
  _focusTrapManager;
  _inertStrategy;
  /** Whether the FocusTrap is enabled. */
  get enabled() {
    return this._enabled;
  }
  set enabled(value) {
    this._enabled = value;
    if (this._enabled) {
      this._focusTrapManager.register(this);
    } else {
      this._focusTrapManager.deregister(this);
    }
  }
  constructor(_element, _checker, _ngZone, _document, _focusTrapManager, _inertStrategy, config, injector) {
    super(_element, _checker, _ngZone, _document, config.defer, injector);
    this._focusTrapManager = _focusTrapManager;
    this._inertStrategy = _inertStrategy;
    this._focusTrapManager.register(this);
  }
  /** Notifies the FocusTrapManager that this FocusTrap will be destroyed. */
  destroy() {
    this._focusTrapManager.deregister(this);
    super.destroy();
  }
  /** @docs-private Implemented as part of ManagedFocusTrap. */
  _enable() {
    this._inertStrategy.preventFocus(this);
    this.toggleAnchors(true);
  }
  /** @docs-private Implemented as part of ManagedFocusTrap. */
  _disable() {
    this._inertStrategy.allowFocus(this);
    this.toggleAnchors(false);
  }
};
var EventListenerFocusTrapInertStrategy = class {
  /** Focus event handler. */
  _listener = null;
  /** Adds a document event listener that keeps focus inside the FocusTrap. */
  preventFocus(focusTrap) {
    if (this._listener) {
      focusTrap._document.removeEventListener("focus", this._listener, true);
    }
    this._listener = (e) => this._trapFocus(focusTrap, e);
    focusTrap._ngZone.runOutsideAngular(() => {
      focusTrap._document.addEventListener("focus", this._listener, true);
    });
  }
  /** Removes the event listener added in preventFocus. */
  allowFocus(focusTrap) {
    if (!this._listener) {
      return;
    }
    focusTrap._document.removeEventListener("focus", this._listener, true);
    this._listener = null;
  }
  /**
   * Refocuses the first element in the FocusTrap if the focus event target was outside
   * the FocusTrap.
   *
   * This is an event listener callback. The event listener is added in runOutsideAngular,
   * so all this code runs outside Angular as well.
   */
  _trapFocus(focusTrap, event) {
    const target = event.target;
    const focusTrapRoot = focusTrap._element;
    if (target && !focusTrapRoot.contains(target) && !target.closest?.("div.cdk-overlay-pane")) {
      setTimeout(() => {
        if (focusTrap.enabled && !focusTrapRoot.contains(focusTrap._document.activeElement)) {
          focusTrap.focusFirstTabbableElement();
        }
      });
    }
  }
};
var FOCUS_TRAP_INERT_STRATEGY = new InjectionToken("FOCUS_TRAP_INERT_STRATEGY");
var FocusTrapManager = class _FocusTrapManager {
  // A stack of the FocusTraps on the page. Only the FocusTrap at the
  // top of the stack is active.
  _focusTrapStack = [];
  /**
   * Disables the FocusTrap at the top of the stack, and then pushes
   * the new FocusTrap onto the stack.
   */
  register(focusTrap) {
    this._focusTrapStack = this._focusTrapStack.filter((ft) => ft !== focusTrap);
    let stack = this._focusTrapStack;
    if (stack.length) {
      stack[stack.length - 1]._disable();
    }
    stack.push(focusTrap);
    focusTrap._enable();
  }
  /**
   * Removes the FocusTrap from the stack, and activates the
   * FocusTrap that is the new top of the stack.
   */
  deregister(focusTrap) {
    focusTrap._disable();
    const stack = this._focusTrapStack;
    const i = stack.indexOf(focusTrap);
    if (i !== -1) {
      stack.splice(i, 1);
      if (stack.length) {
        stack[stack.length - 1]._enable();
      }
    }
  }
  static ɵfac = function FocusTrapManager_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FocusTrapManager)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _FocusTrapManager,
    factory: _FocusTrapManager.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FocusTrapManager, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var ConfigurableFocusTrapFactory = class _ConfigurableFocusTrapFactory {
  _checker = inject(InteractivityChecker);
  _ngZone = inject(NgZone);
  _focusTrapManager = inject(FocusTrapManager);
  _document = inject(DOCUMENT);
  _inertStrategy;
  _injector = inject(Injector);
  constructor() {
    const inertStrategy = inject(FOCUS_TRAP_INERT_STRATEGY, {
      optional: true
    });
    this._inertStrategy = inertStrategy || new EventListenerFocusTrapInertStrategy();
  }
  create(element, config = {
    defer: false
  }) {
    let configObject;
    if (typeof config === "boolean") {
      configObject = {
        defer: config
      };
    } else {
      configObject = config;
    }
    return new ConfigurableFocusTrap(element, this._checker, this._ngZone, this._document, this._focusTrapManager, this._inertStrategy, configObject, this._injector);
  }
  static ɵfac = function ConfigurableFocusTrapFactory_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ConfigurableFocusTrapFactory)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _ConfigurableFocusTrapFactory,
    factory: _ConfigurableFocusTrapFactory.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfigurableFocusTrapFactory, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
function isFakeMousedownFromScreenReader(event) {
  return event.buttons === 0 || event.detail === 0;
}
function isFakeTouchstartFromScreenReader(event) {
  const touch = event.touches && event.touches[0] || event.changedTouches && event.changedTouches[0];
  return !!touch && touch.identifier === -1 && (touch.radiusX == null || touch.radiusX === 1) && (touch.radiusY == null || touch.radiusY === 1);
}
var INPUT_MODALITY_DETECTOR_OPTIONS = new InjectionToken("cdk-input-modality-detector-options");
var INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS = {
  ignoreKeys: [ALT, CONTROL, MAC_META, META, SHIFT]
};
var TOUCH_BUFFER_MS = 650;
var modalityEventListenerOptions = {
  passive: true,
  capture: true
};
var InputModalityDetector = class _InputModalityDetector {
  _platform = inject(Platform);
  _listenerCleanups;
  /** Emits whenever an input modality is detected. */
  modalityDetected;
  /** Emits when the input modality changes. */
  modalityChanged;
  /** The most recently detected input modality. */
  get mostRecentModality() {
    return this._modality.value;
  }
  /**
   * The most recently detected input modality event target. Is null if no input modality has been
   * detected or if the associated event target is null for some unknown reason.
   */
  _mostRecentTarget = null;
  /** The underlying BehaviorSubject that emits whenever an input modality is detected. */
  _modality = new BehaviorSubject(null);
  /** Options for this InputModalityDetector. */
  _options;
  /**
   * The timestamp of the last touch input modality. Used to determine whether mousedown events
   * should be attributed to mouse or touch.
   */
  _lastTouchMs = 0;
  /**
   * Handles keydown events. Must be an arrow function in order to preserve the context when it gets
   * bound.
   */
  _onKeydown = (event) => {
    if (this._options?.ignoreKeys?.some((keyCode) => keyCode === event.keyCode)) {
      return;
    }
    this._modality.next("keyboard");
    this._mostRecentTarget = _getEventTarget(event);
  };
  /**
   * Handles mousedown events. Must be an arrow function in order to preserve the context when it
   * gets bound.
   */
  _onMousedown = (event) => {
    if (Date.now() - this._lastTouchMs < TOUCH_BUFFER_MS) {
      return;
    }
    this._modality.next(isFakeMousedownFromScreenReader(event) ? "keyboard" : "mouse");
    this._mostRecentTarget = _getEventTarget(event);
  };
  /**
   * Handles touchstart events. Must be an arrow function in order to preserve the context when it
   * gets bound.
   */
  _onTouchstart = (event) => {
    if (isFakeTouchstartFromScreenReader(event)) {
      this._modality.next("keyboard");
      return;
    }
    this._lastTouchMs = Date.now();
    this._modality.next("touch");
    this._mostRecentTarget = _getEventTarget(event);
  };
  constructor() {
    const ngZone = inject(NgZone);
    const document2 = inject(DOCUMENT);
    const options = inject(INPUT_MODALITY_DETECTOR_OPTIONS, {
      optional: true
    });
    this._options = __spreadValues(__spreadValues({}, INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS), options);
    this.modalityDetected = this._modality.pipe(skip(1));
    this.modalityChanged = this.modalityDetected.pipe(distinctUntilChanged());
    if (this._platform.isBrowser) {
      const renderer = inject(RendererFactory2).createRenderer(null, null);
      this._listenerCleanups = ngZone.runOutsideAngular(() => {
        return [_bindEventWithOptions(renderer, document2, "keydown", this._onKeydown, modalityEventListenerOptions), _bindEventWithOptions(renderer, document2, "mousedown", this._onMousedown, modalityEventListenerOptions), _bindEventWithOptions(renderer, document2, "touchstart", this._onTouchstart, modalityEventListenerOptions)];
      });
    }
  }
  ngOnDestroy() {
    this._modality.complete();
    this._listenerCleanups?.forEach((cleanup) => cleanup());
  }
  static ɵfac = function InputModalityDetector_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InputModalityDetector)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _InputModalityDetector,
    factory: _InputModalityDetector.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputModalityDetector, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var LIVE_ANNOUNCER_ELEMENT_TOKEN = new InjectionToken("liveAnnouncerElement", {
  providedIn: "root",
  factory: LIVE_ANNOUNCER_ELEMENT_TOKEN_FACTORY
});
function LIVE_ANNOUNCER_ELEMENT_TOKEN_FACTORY() {
  return null;
}
var LIVE_ANNOUNCER_DEFAULT_OPTIONS = new InjectionToken("LIVE_ANNOUNCER_DEFAULT_OPTIONS");
var uniqueIds = 0;
var LiveAnnouncer = class _LiveAnnouncer {
  _ngZone = inject(NgZone);
  _defaultOptions = inject(LIVE_ANNOUNCER_DEFAULT_OPTIONS, {
    optional: true
  });
  _liveElement;
  _document = inject(DOCUMENT);
  _previousTimeout;
  _currentPromise;
  _currentResolve;
  constructor() {
    const elementToken = inject(LIVE_ANNOUNCER_ELEMENT_TOKEN, {
      optional: true
    });
    this._liveElement = elementToken || this._createLiveElement();
  }
  announce(message, ...args) {
    const defaultOptions = this._defaultOptions;
    let politeness;
    let duration;
    if (args.length === 1 && typeof args[0] === "number") {
      duration = args[0];
    } else {
      [politeness, duration] = args;
    }
    this.clear();
    clearTimeout(this._previousTimeout);
    if (!politeness) {
      politeness = defaultOptions && defaultOptions.politeness ? defaultOptions.politeness : "polite";
    }
    if (duration == null && defaultOptions) {
      duration = defaultOptions.duration;
    }
    this._liveElement.setAttribute("aria-live", politeness);
    if (this._liveElement.id) {
      this._exposeAnnouncerToModals(this._liveElement.id);
    }
    return this._ngZone.runOutsideAngular(() => {
      if (!this._currentPromise) {
        this._currentPromise = new Promise((resolve) => this._currentResolve = resolve);
      }
      clearTimeout(this._previousTimeout);
      this._previousTimeout = setTimeout(() => {
        this._liveElement.textContent = message;
        if (typeof duration === "number") {
          this._previousTimeout = setTimeout(() => this.clear(), duration);
        }
        this._currentResolve?.();
        this._currentPromise = this._currentResolve = void 0;
      }, 100);
      return this._currentPromise;
    });
  }
  /**
   * Clears the current text from the announcer element. Can be used to prevent
   * screen readers from reading the text out again while the user is going
   * through the page landmarks.
   */
  clear() {
    if (this._liveElement) {
      this._liveElement.textContent = "";
    }
  }
  ngOnDestroy() {
    clearTimeout(this._previousTimeout);
    this._liveElement?.remove();
    this._liveElement = null;
    this._currentResolve?.();
    this._currentPromise = this._currentResolve = void 0;
  }
  _createLiveElement() {
    const elementClass = "cdk-live-announcer-element";
    const previousElements = this._document.getElementsByClassName(elementClass);
    const liveEl = this._document.createElement("div");
    for (let i = 0; i < previousElements.length; i++) {
      previousElements[i].remove();
    }
    liveEl.classList.add(elementClass);
    liveEl.classList.add("cdk-visually-hidden");
    liveEl.setAttribute("aria-atomic", "true");
    liveEl.setAttribute("aria-live", "polite");
    liveEl.id = `cdk-live-announcer-${uniqueIds++}`;
    this._document.body.appendChild(liveEl);
    return liveEl;
  }
  /**
   * Some browsers won't expose the accessibility node of the live announcer element if there is an
   * `aria-modal` and the live announcer is outside of it. This method works around the issue by
   * pointing the `aria-owns` of all modals to the live announcer element.
   */
  _exposeAnnouncerToModals(id) {
    const modals = this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');
    for (let i = 0; i < modals.length; i++) {
      const modal = modals[i];
      const ariaOwns = modal.getAttribute("aria-owns");
      if (!ariaOwns) {
        modal.setAttribute("aria-owns", id);
      } else if (ariaOwns.indexOf(id) === -1) {
        modal.setAttribute("aria-owns", ariaOwns + " " + id);
      }
    }
  }
  static ɵfac = function LiveAnnouncer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LiveAnnouncer)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _LiveAnnouncer,
    factory: _LiveAnnouncer.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LiveAnnouncer, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var CdkAriaLive = class _CdkAriaLive {
  _elementRef = inject(ElementRef);
  _liveAnnouncer = inject(LiveAnnouncer);
  _contentObserver = inject(ContentObserver);
  _ngZone = inject(NgZone);
  /** The aria-live politeness level to use when announcing messages. */
  get politeness() {
    return this._politeness;
  }
  set politeness(value) {
    this._politeness = value === "off" || value === "assertive" ? value : "polite";
    if (this._politeness === "off") {
      if (this._subscription) {
        this._subscription.unsubscribe();
        this._subscription = null;
      }
    } else if (!this._subscription) {
      this._subscription = this._ngZone.runOutsideAngular(() => {
        return this._contentObserver.observe(this._elementRef).subscribe(() => {
          const elementText = this._elementRef.nativeElement.textContent;
          if (elementText !== this._previousAnnouncedText) {
            this._liveAnnouncer.announce(elementText, this._politeness, this.duration);
            this._previousAnnouncedText = elementText;
          }
        });
      });
    }
  }
  _politeness = "polite";
  /** Time in milliseconds after which to clear out the announcer element. */
  duration;
  _previousAnnouncedText;
  _subscription;
  constructor() {
    inject(_CdkPrivateStyleLoader).load(_VisuallyHiddenLoader);
  }
  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
  static ɵfac = function CdkAriaLive_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkAriaLive)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _CdkAriaLive,
    selectors: [["", "cdkAriaLive", ""]],
    inputs: {
      politeness: [0, "cdkAriaLive", "politeness"],
      duration: [0, "cdkAriaLiveDuration", "duration"]
    },
    exportAs: ["cdkAriaLive"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkAriaLive, [{
    type: Directive,
    args: [{
      selector: "[cdkAriaLive]",
      exportAs: "cdkAriaLive"
    }]
  }], () => [], {
    politeness: [{
      type: Input,
      args: ["cdkAriaLive"]
    }],
    duration: [{
      type: Input,
      args: ["cdkAriaLiveDuration"]
    }]
  });
})();
var FocusMonitorDetectionMode;
(function(FocusMonitorDetectionMode2) {
  FocusMonitorDetectionMode2[FocusMonitorDetectionMode2["IMMEDIATE"] = 0] = "IMMEDIATE";
  FocusMonitorDetectionMode2[FocusMonitorDetectionMode2["EVENTUAL"] = 1] = "EVENTUAL";
})(FocusMonitorDetectionMode || (FocusMonitorDetectionMode = {}));
var FOCUS_MONITOR_DEFAULT_OPTIONS = new InjectionToken("cdk-focus-monitor-default-options");
var captureEventListenerOptions = normalizePassiveListenerOptions({
  passive: true,
  capture: true
});
var FocusMonitor = class _FocusMonitor {
  _ngZone = inject(NgZone);
  _platform = inject(Platform);
  _inputModalityDetector = inject(InputModalityDetector);
  /** The focus origin that the next focus event is a result of. */
  _origin = null;
  /** The FocusOrigin of the last focus event tracked by the FocusMonitor. */
  _lastFocusOrigin;
  /** Whether the window has just been focused. */
  _windowFocused = false;
  /** The timeout id of the window focus timeout. */
  _windowFocusTimeoutId;
  /** The timeout id of the origin clearing timeout. */
  _originTimeoutId;
  /**
   * Whether the origin was determined via a touch interaction. Necessary as properly attributing
   * focus events to touch interactions requires special logic.
   */
  _originFromTouchInteraction = false;
  /** Map of elements being monitored to their info. */
  _elementInfo = /* @__PURE__ */ new Map();
  /** The number of elements currently being monitored. */
  _monitoredElementCount = 0;
  /**
   * Keeps track of the root nodes to which we've currently bound a focus/blur handler,
   * as well as the number of monitored elements that they contain. We have to treat focus/blur
   * handlers differently from the rest of the events, because the browser won't emit events
   * to the document when focus moves inside of a shadow root.
   */
  _rootNodeFocusListenerCount = /* @__PURE__ */ new Map();
  /**
   * The specified detection mode, used for attributing the origin of a focus
   * event.
   */
  _detectionMode;
  /**
   * Event listener for `focus` events on the window.
   * Needs to be an arrow function in order to preserve the context when it gets bound.
   */
  _windowFocusListener = () => {
    this._windowFocused = true;
    this._windowFocusTimeoutId = setTimeout(() => this._windowFocused = false);
  };
  /** Used to reference correct document/window */
  _document = inject(DOCUMENT, {
    optional: true
  });
  /** Subject for stopping our InputModalityDetector subscription. */
  _stopInputModalityDetector = new Subject();
  constructor() {
    const options = inject(FOCUS_MONITOR_DEFAULT_OPTIONS, {
      optional: true
    });
    this._detectionMode = options?.detectionMode || FocusMonitorDetectionMode.IMMEDIATE;
  }
  /**
   * Event listener for `focus` and 'blur' events on the document.
   * Needs to be an arrow function in order to preserve the context when it gets bound.
   */
  _rootNodeFocusAndBlurListener = (event) => {
    const target = _getEventTarget(event);
    for (let element = target; element; element = element.parentElement) {
      if (event.type === "focus") {
        this._onFocus(event, element);
      } else {
        this._onBlur(event, element);
      }
    }
  };
  monitor(element, checkChildren = false) {
    const nativeElement = coerceElement(element);
    if (!this._platform.isBrowser || nativeElement.nodeType !== 1) {
      return of();
    }
    const rootNode = _getShadowRoot(nativeElement) || this._getDocument();
    const cachedInfo = this._elementInfo.get(nativeElement);
    if (cachedInfo) {
      if (checkChildren) {
        cachedInfo.checkChildren = true;
      }
      return cachedInfo.subject;
    }
    const info = {
      checkChildren,
      subject: new Subject(),
      rootNode
    };
    this._elementInfo.set(nativeElement, info);
    this._registerGlobalListeners(info);
    return info.subject;
  }
  stopMonitoring(element) {
    const nativeElement = coerceElement(element);
    const elementInfo = this._elementInfo.get(nativeElement);
    if (elementInfo) {
      elementInfo.subject.complete();
      this._setClasses(nativeElement);
      this._elementInfo.delete(nativeElement);
      this._removeGlobalListeners(elementInfo);
    }
  }
  focusVia(element, origin, options) {
    const nativeElement = coerceElement(element);
    const focusedElement = this._getDocument().activeElement;
    if (nativeElement === focusedElement) {
      this._getClosestElementsInfo(nativeElement).forEach(([currentElement, info]) => this._originChanged(currentElement, origin, info));
    } else {
      this._setOrigin(origin);
      if (typeof nativeElement.focus === "function") {
        nativeElement.focus(options);
      }
    }
  }
  ngOnDestroy() {
    this._elementInfo.forEach((_info, element) => this.stopMonitoring(element));
  }
  /** Access injected document if available or fallback to global document reference */
  _getDocument() {
    return this._document || document;
  }
  /** Use defaultView of injected document if available or fallback to global window reference */
  _getWindow() {
    const doc = this._getDocument();
    return doc.defaultView || window;
  }
  _getFocusOrigin(focusEventTarget) {
    if (this._origin) {
      if (this._originFromTouchInteraction) {
        return this._shouldBeAttributedToTouch(focusEventTarget) ? "touch" : "program";
      } else {
        return this._origin;
      }
    }
    if (this._windowFocused && this._lastFocusOrigin) {
      return this._lastFocusOrigin;
    }
    if (focusEventTarget && this._isLastInteractionFromInputLabel(focusEventTarget)) {
      return "mouse";
    }
    return "program";
  }
  /**
   * Returns whether the focus event should be attributed to touch. Recall that in IMMEDIATE mode, a
   * touch origin isn't immediately reset at the next tick (see _setOrigin). This means that when we
   * handle a focus event following a touch interaction, we need to determine whether (1) the focus
   * event was directly caused by the touch interaction or (2) the focus event was caused by a
   * subsequent programmatic focus call triggered by the touch interaction.
   * @param focusEventTarget The target of the focus event under examination.
   */
  _shouldBeAttributedToTouch(focusEventTarget) {
    return this._detectionMode === FocusMonitorDetectionMode.EVENTUAL || !!focusEventTarget?.contains(this._inputModalityDetector._mostRecentTarget);
  }
  /**
   * Sets the focus classes on the element based on the given focus origin.
   * @param element The element to update the classes on.
   * @param origin The focus origin.
   */
  _setClasses(element, origin) {
    element.classList.toggle("cdk-focused", !!origin);
    element.classList.toggle("cdk-touch-focused", origin === "touch");
    element.classList.toggle("cdk-keyboard-focused", origin === "keyboard");
    element.classList.toggle("cdk-mouse-focused", origin === "mouse");
    element.classList.toggle("cdk-program-focused", origin === "program");
  }
  /**
   * Updates the focus origin. If we're using immediate detection mode, we schedule an async
   * function to clear the origin at the end of a timeout. The duration of the timeout depends on
   * the origin being set.
   * @param origin The origin to set.
   * @param isFromInteraction Whether we are setting the origin from an interaction event.
   */
  _setOrigin(origin, isFromInteraction = false) {
    this._ngZone.runOutsideAngular(() => {
      this._origin = origin;
      this._originFromTouchInteraction = origin === "touch" && isFromInteraction;
      if (this._detectionMode === FocusMonitorDetectionMode.IMMEDIATE) {
        clearTimeout(this._originTimeoutId);
        const ms = this._originFromTouchInteraction ? TOUCH_BUFFER_MS : 1;
        this._originTimeoutId = setTimeout(() => this._origin = null, ms);
      }
    });
  }
  /**
   * Handles focus events on a registered element.
   * @param event The focus event.
   * @param element The monitored element.
   */
  _onFocus(event, element) {
    const elementInfo = this._elementInfo.get(element);
    const focusEventTarget = _getEventTarget(event);
    if (!elementInfo || !elementInfo.checkChildren && element !== focusEventTarget) {
      return;
    }
    this._originChanged(element, this._getFocusOrigin(focusEventTarget), elementInfo);
  }
  /**
   * Handles blur events on a registered element.
   * @param event The blur event.
   * @param element The monitored element.
   */
  _onBlur(event, element) {
    const elementInfo = this._elementInfo.get(element);
    if (!elementInfo || elementInfo.checkChildren && event.relatedTarget instanceof Node && element.contains(event.relatedTarget)) {
      return;
    }
    this._setClasses(element);
    this._emitOrigin(elementInfo, null);
  }
  _emitOrigin(info, origin) {
    if (info.subject.observers.length) {
      this._ngZone.run(() => info.subject.next(origin));
    }
  }
  _registerGlobalListeners(elementInfo) {
    if (!this._platform.isBrowser) {
      return;
    }
    const rootNode = elementInfo.rootNode;
    const rootNodeFocusListeners = this._rootNodeFocusListenerCount.get(rootNode) || 0;
    if (!rootNodeFocusListeners) {
      this._ngZone.runOutsideAngular(() => {
        rootNode.addEventListener("focus", this._rootNodeFocusAndBlurListener, captureEventListenerOptions);
        rootNode.addEventListener("blur", this._rootNodeFocusAndBlurListener, captureEventListenerOptions);
      });
    }
    this._rootNodeFocusListenerCount.set(rootNode, rootNodeFocusListeners + 1);
    if (++this._monitoredElementCount === 1) {
      this._ngZone.runOutsideAngular(() => {
        const window2 = this._getWindow();
        window2.addEventListener("focus", this._windowFocusListener);
      });
      this._inputModalityDetector.modalityDetected.pipe(takeUntil(this._stopInputModalityDetector)).subscribe((modality) => {
        this._setOrigin(
          modality,
          true
          /* isFromInteraction */
        );
      });
    }
  }
  _removeGlobalListeners(elementInfo) {
    const rootNode = elementInfo.rootNode;
    if (this._rootNodeFocusListenerCount.has(rootNode)) {
      const rootNodeFocusListeners = this._rootNodeFocusListenerCount.get(rootNode);
      if (rootNodeFocusListeners > 1) {
        this._rootNodeFocusListenerCount.set(rootNode, rootNodeFocusListeners - 1);
      } else {
        rootNode.removeEventListener("focus", this._rootNodeFocusAndBlurListener, captureEventListenerOptions);
        rootNode.removeEventListener("blur", this._rootNodeFocusAndBlurListener, captureEventListenerOptions);
        this._rootNodeFocusListenerCount.delete(rootNode);
      }
    }
    if (!--this._monitoredElementCount) {
      const window2 = this._getWindow();
      window2.removeEventListener("focus", this._windowFocusListener);
      this._stopInputModalityDetector.next();
      clearTimeout(this._windowFocusTimeoutId);
      clearTimeout(this._originTimeoutId);
    }
  }
  /** Updates all the state on an element once its focus origin has changed. */
  _originChanged(element, origin, elementInfo) {
    this._setClasses(element, origin);
    this._emitOrigin(elementInfo, origin);
    this._lastFocusOrigin = origin;
  }
  /**
   * Collects the `MonitoredElementInfo` of a particular element and
   * all of its ancestors that have enabled `checkChildren`.
   * @param element Element from which to start the search.
   */
  _getClosestElementsInfo(element) {
    const results = [];
    this._elementInfo.forEach((info, currentElement) => {
      if (currentElement === element || info.checkChildren && currentElement.contains(element)) {
        results.push([currentElement, info]);
      }
    });
    return results;
  }
  /**
   * Returns whether an interaction is likely to have come from the user clicking the `label` of
   * an `input` or `textarea` in order to focus it.
   * @param focusEventTarget Target currently receiving focus.
   */
  _isLastInteractionFromInputLabel(focusEventTarget) {
    const {
      _mostRecentTarget: mostRecentTarget,
      mostRecentModality
    } = this._inputModalityDetector;
    if (mostRecentModality !== "mouse" || !mostRecentTarget || mostRecentTarget === focusEventTarget || focusEventTarget.nodeName !== "INPUT" && focusEventTarget.nodeName !== "TEXTAREA" || focusEventTarget.disabled) {
      return false;
    }
    const labels = focusEventTarget.labels;
    if (labels) {
      for (let i = 0; i < labels.length; i++) {
        if (labels[i].contains(mostRecentTarget)) {
          return true;
        }
      }
    }
    return false;
  }
  static ɵfac = function FocusMonitor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FocusMonitor)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _FocusMonitor,
    factory: _FocusMonitor.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FocusMonitor, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var CdkMonitorFocus = class _CdkMonitorFocus {
  _elementRef = inject(ElementRef);
  _focusMonitor = inject(FocusMonitor);
  _monitorSubscription;
  _focusOrigin = null;
  cdkFocusChange = new EventEmitter();
  constructor() {
  }
  get focusOrigin() {
    return this._focusOrigin;
  }
  ngAfterViewInit() {
    const element = this._elementRef.nativeElement;
    this._monitorSubscription = this._focusMonitor.monitor(element, element.nodeType === 1 && element.hasAttribute("cdkMonitorSubtreeFocus")).subscribe((origin) => {
      this._focusOrigin = origin;
      this.cdkFocusChange.emit(origin);
    });
  }
  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
    if (this._monitorSubscription) {
      this._monitorSubscription.unsubscribe();
    }
  }
  static ɵfac = function CdkMonitorFocus_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkMonitorFocus)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _CdkMonitorFocus,
    selectors: [["", "cdkMonitorElementFocus", ""], ["", "cdkMonitorSubtreeFocus", ""]],
    outputs: {
      cdkFocusChange: "cdkFocusChange"
    },
    exportAs: ["cdkMonitorFocus"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkMonitorFocus, [{
    type: Directive,
    args: [{
      selector: "[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]",
      exportAs: "cdkMonitorFocus"
    }]
  }], () => [], {
    cdkFocusChange: [{
      type: Output
    }]
  });
})();
var HighContrastMode;
(function(HighContrastMode2) {
  HighContrastMode2[HighContrastMode2["NONE"] = 0] = "NONE";
  HighContrastMode2[HighContrastMode2["BLACK_ON_WHITE"] = 1] = "BLACK_ON_WHITE";
  HighContrastMode2[HighContrastMode2["WHITE_ON_BLACK"] = 2] = "WHITE_ON_BLACK";
})(HighContrastMode || (HighContrastMode = {}));
var BLACK_ON_WHITE_CSS_CLASS = "cdk-high-contrast-black-on-white";
var WHITE_ON_BLACK_CSS_CLASS = "cdk-high-contrast-white-on-black";
var HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS = "cdk-high-contrast-active";
var HighContrastModeDetector = class _HighContrastModeDetector {
  _platform = inject(Platform);
  /**
   * Figuring out the high contrast mode and adding the body classes can cause
   * some expensive layouts. This flag is used to ensure that we only do it once.
   */
  _hasCheckedHighContrastMode;
  _document = inject(DOCUMENT);
  _breakpointSubscription;
  constructor() {
    this._breakpointSubscription = inject(BreakpointObserver).observe("(forced-colors: active)").subscribe(() => {
      if (this._hasCheckedHighContrastMode) {
        this._hasCheckedHighContrastMode = false;
        this._applyBodyHighContrastModeCssClasses();
      }
    });
  }
  /** Gets the current high-contrast-mode for the page. */
  getHighContrastMode() {
    if (!this._platform.isBrowser) {
      return HighContrastMode.NONE;
    }
    const testElement = this._document.createElement("div");
    testElement.style.backgroundColor = "rgb(1,2,3)";
    testElement.style.position = "absolute";
    this._document.body.appendChild(testElement);
    const documentWindow = this._document.defaultView || window;
    const computedStyle = documentWindow && documentWindow.getComputedStyle ? documentWindow.getComputedStyle(testElement) : null;
    const computedColor = (computedStyle && computedStyle.backgroundColor || "").replace(/ /g, "");
    testElement.remove();
    switch (computedColor) {
      // Pre Windows 11 dark theme.
      case "rgb(0,0,0)":
      // Windows 11 dark themes.
      case "rgb(45,50,54)":
      case "rgb(32,32,32)":
        return HighContrastMode.WHITE_ON_BLACK;
      // Pre Windows 11 light theme.
      case "rgb(255,255,255)":
      // Windows 11 light theme.
      case "rgb(255,250,239)":
        return HighContrastMode.BLACK_ON_WHITE;
    }
    return HighContrastMode.NONE;
  }
  ngOnDestroy() {
    this._breakpointSubscription.unsubscribe();
  }
  /** Applies CSS classes indicating high-contrast mode to document body (browser-only). */
  _applyBodyHighContrastModeCssClasses() {
    if (!this._hasCheckedHighContrastMode && this._platform.isBrowser && this._document.body) {
      const bodyClasses = this._document.body.classList;
      bodyClasses.remove(HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS, BLACK_ON_WHITE_CSS_CLASS, WHITE_ON_BLACK_CSS_CLASS);
      this._hasCheckedHighContrastMode = true;
      const mode = this.getHighContrastMode();
      if (mode === HighContrastMode.BLACK_ON_WHITE) {
        bodyClasses.add(HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS, BLACK_ON_WHITE_CSS_CLASS);
      } else if (mode === HighContrastMode.WHITE_ON_BLACK) {
        bodyClasses.add(HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS, WHITE_ON_BLACK_CSS_CLASS);
      }
    }
  }
  static ɵfac = function HighContrastModeDetector_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HighContrastModeDetector)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _HighContrastModeDetector,
    factory: _HighContrastModeDetector.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HighContrastModeDetector, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var A11yModule = class _A11yModule {
  constructor() {
    inject(HighContrastModeDetector)._applyBodyHighContrastModeCssClasses();
  }
  static ɵfac = function A11yModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _A11yModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _A11yModule,
    imports: [ObserversModule, CdkAriaLive, CdkTrapFocus, CdkMonitorFocus],
    exports: [CdkAriaLive, CdkTrapFocus, CdkMonitorFocus]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [ObserversModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(A11yModule, [{
    type: NgModule,
    args: [{
      imports: [ObserversModule, CdkAriaLive, CdkTrapFocus, CdkMonitorFocus],
      exports: [CdkAriaLive, CdkTrapFocus, CdkMonitorFocus]
    }]
  }], () => [], null);
})();
var counters = {};
var _IdGenerator = class __IdGenerator {
  _appId = inject(APP_ID);
  /**
   * Generates a unique ID with a specific prefix.
   * @param prefix Prefix to add to the ID.
   */
  getId(prefix) {
    if (this._appId !== "ng") {
      prefix += this._appId;
    }
    if (!counters.hasOwnProperty(prefix)) {
      counters[prefix] = 0;
    }
    return `${prefix}${counters[prefix]++}`;
  }
  static ɵfac = function _IdGenerator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || __IdGenerator)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: __IdGenerator,
    factory: __IdGenerator.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_IdGenerator, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// node_modules/@coreui/angular/fesm2022/coreui-angular.mjs
var _c0 = ["*"];
var _c1 = () => ({
  display: "none"
});
var _c2 = ["*", "*"];
function AccordionItemComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function AccordionItemComponent_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function AccordionItemComponent_ng_template_6_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function AccordionItemComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 7);
    ɵɵlistener("click", function AccordionItemComponent_ng_template_6_Template_button_click_0_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.toggleItem());
    });
    ɵɵtemplate(1, AccordionItemComponent_ng_template_6_ng_container_1_Template, 1, 0, "ng-container", 5);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    const defaultAccordionHeaderContentTemplate_r3 = ɵɵreference(9);
    const tmpl_r4 = ɵɵreadContextLet(0);
    ɵɵproperty("collapsed", !ctx_r1.itemVisible());
    ɵɵattribute("aria-controls", ctx_r1.contentId);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", tmpl_r4["accordionHeader"] || defaultAccordionHeaderContentTemplate_r3)("ngTemplateOutletContext", ctx_r1.itemContext);
  }
}
function AccordionItemComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
  }
}
function AccordionItemComponent_ng_template_10_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function AccordionItemComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 8);
    ɵɵtemplate(1, AccordionItemComponent_ng_template_10_ng_container_1_Template, 1, 0, "ng-container", 5);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    const defaultAccordionBodyContentTemplate_r5 = ɵɵreference(13);
    const tmpl_r4 = ɵɵreadContextLet(0);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", tmpl_r4["accordionBody"] || defaultAccordionBodyContentTemplate_r5)("ngTemplateOutletContext", ctx_r1.itemContext);
  }
}
function AccordionItemComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 1);
  }
}
function AlertComponent_Conditional_0_Conditional_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function AlertComponent_Conditional_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, AlertComponent_Conditional_0_Conditional_0_ng_container_0_Template, 1, 0, "ng-container", 1);
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r0 = ɵɵnextContext(2);
    const defaultAlertButtonCloseTemplate_r2 = ɵɵreference(2);
    ɵɵproperty("ngTemplateOutlet", ((tmp_3_0 = ctx_r0.templates()) == null ? null : tmp_3_0["alertButtonCloseTemplate"]) || defaultAlertButtonCloseTemplate_r2);
  }
}
function AlertComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, AlertComponent_Conditional_0_Conditional_0_Template, 1, 1, "ng-container");
    ɵɵprojection(1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵconditional(ctx_r0.dismissible ? 0 : -1);
  }
}
function AlertComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 2);
    ɵɵlistener("click", function AlertComponent_ng_template_1_Template_button_click_0_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.visible = false);
    });
    ɵɵelementEnd();
  }
}
function AvatarComponent_ProjectionFallback_0_Conditional_0_Defer_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "img", 1);
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵpropertyInterpolate("src", (tmp_3_0 = ctx_r0.src()) !== null && tmp_3_0 !== void 0 ? tmp_3_0 : "", ɵɵsanitizeUrl);
    ɵɵpropertyInterpolate("alt", ctx_r0.alt());
  }
}
function AvatarComponent_ProjectionFallback_0_Conditional_0_DeferPlaceholder_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 2);
    ɵɵelement(1, "rect", 3);
    ɵɵelementEnd();
  }
}
function AvatarComponent_ProjectionFallback_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, AvatarComponent_ProjectionFallback_0_Conditional_0_Defer_0_Template, 1, 2)(1, AvatarComponent_ProjectionFallback_0_Conditional_0_DeferPlaceholder_1_Template, 2, 0);
    ɵɵdefer(2, 0, null, null, 1);
    ɵɵdeferPrefetchOnIdle();
    ɵɵdeferOnIdle();
  }
}
function AvatarComponent_ProjectionFallback_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, AvatarComponent_ProjectionFallback_0_Conditional_0_Template, 4, 0);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵconditional(ctx_r0.src() ? 0 : -1);
  }
}
function AvatarComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 0);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngClass", ctx_r0.statusClass());
  }
}
var _c3 = () => ({});
function BreadcrumbItemComponent_Conditional_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function BreadcrumbItemComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "a", 1);
    ɵɵtemplate(1, BreadcrumbItemComponent_Conditional_0_ng_container_1_Template, 1, 0, "ng-container", 3);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_10_0;
    let tmp_11_0;
    const ctx_r0 = ɵɵnextContext();
    const defaultBreadcrumbItemContentTemplate_r2 = ɵɵreference(3);
    ɵɵproperty("routerLink", ctx_r0.url())("cHtmlAttr", (tmp_3_0 = ctx_r0.attributes()) !== null && tmp_3_0 !== void 0 ? tmp_3_0 : ɵɵpureFunction0(11, _c3))("target", (tmp_4_0 = ctx_r0.attributes()) == null ? null : tmp_4_0["target"])("queryParams", (tmp_5_0 = (tmp_5_0 = ctx_r0.linkProps()) == null ? null : tmp_5_0.queryParams) !== null && tmp_5_0 !== void 0 ? tmp_5_0 : null)("fragment", (tmp_6_0 = ctx_r0.linkProps()) == null ? null : tmp_6_0.fragment)("queryParamsHandling", (tmp_7_0 = (tmp_7_0 = ctx_r0.linkProps()) == null ? null : tmp_7_0.queryParamsHandling) !== null && tmp_7_0 !== void 0 ? tmp_7_0 : null)("preserveFragment", (tmp_8_0 = (tmp_8_0 = ctx_r0.linkProps()) == null ? null : tmp_8_0.preserveFragment) !== null && tmp_8_0 !== void 0 ? tmp_8_0 : false)("skipLocationChange", (tmp_9_0 = (tmp_9_0 = ctx_r0.linkProps()) == null ? null : tmp_9_0.skipLocationChange) !== null && tmp_9_0 !== void 0 ? tmp_9_0 : false)("replaceUrl", (tmp_10_0 = (tmp_10_0 = ctx_r0.linkProps()) == null ? null : tmp_10_0.replaceUrl) !== null && tmp_10_0 !== void 0 ? tmp_10_0 : false)("state", (tmp_11_0 = (tmp_11_0 = ctx_r0.linkProps()) == null ? null : tmp_11_0.state) !== null && tmp_11_0 !== void 0 ? tmp_11_0 : ɵɵpureFunction0(12, _c3));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", defaultBreadcrumbItemContentTemplate_r2);
  }
}
function BreadcrumbItemComponent_Conditional_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function BreadcrumbItemComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 2);
    ɵɵtemplate(1, BreadcrumbItemComponent_Conditional_1_ng_container_1_Template, 1, 0, "ng-container", 3);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = ɵɵnextContext();
    const defaultBreadcrumbItemContentTemplate_r2 = ɵɵreference(3);
    ɵɵproperty("cHtmlAttr", (tmp_2_0 = ctx_r0.attributes()) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : ɵɵpureFunction0(2, _c3));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", defaultBreadcrumbItemContentTemplate_r2);
  }
}
function BreadcrumbItemComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
  }
}
function BreadcrumbRouterComponent_For_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "c-breadcrumb-item", 1);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    const breadcrumb_r2 = ctx_r0.$implicit;
    const ɵ$index_3_r3 = ctx_r0.$index;
    const ɵ$count_3_r4 = ctx_r0.$count;
    ɵɵproperty("active", ɵ$index_3_r3 === ɵ$count_3_r4 - 1)("url", breadcrumb_r2 == null ? null : breadcrumb_r2.url)("attributes", breadcrumb_r2 == null ? null : breadcrumb_r2.attributes)("linkProps", breadcrumb_r2 == null ? null : breadcrumb_r2.linkProps);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", breadcrumb_r2 == null ? null : breadcrumb_r2.label, " ");
  }
}
function BreadcrumbRouterComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, BreadcrumbRouterComponent_For_2_Conditional_0_Template, 2, 5, "c-breadcrumb-item", 1);
  }
  if (rf & 2) {
    const breadcrumb_r2 = ctx.$implicit;
    const ɵ$index_3_r3 = ctx.$index;
    const ɵ$count_3_r4 = ctx.$count;
    ɵɵconditional((breadcrumb_r2 == null ? null : breadcrumb_r2.label) && ((breadcrumb_r2 == null ? null : breadcrumb_r2.url == null ? null : breadcrumb_r2.url.slice(-1)) === "/" || ɵ$index_3_r3 === ɵ$count_3_r4 - 1) ? 0 : -1);
  }
}
function CarouselControlComponent_ProjectionFallback_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span");
    ɵɵelementStart(1, "span", 0);
    ɵɵtext(2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.carouselControlIconClass());
    ɵɵattribute("aria-hidden", true);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r0.caption());
  }
}
var _c4 = (a0, a1) => ({
  $implicit: a0,
  active: a1
});
var _c5 = (a0) => ({
  active: a0
});
function CarouselIndicatorsComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function CarouselIndicatorsComponent_ng_template_2_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 3);
    ɵɵlistener("click", function CarouselIndicatorsComponent_ng_template_2_For_1_Template_button_click_0_listener() {
      const ɵ$index_8_r2 = ɵɵrestoreView(_r1).$index;
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.onClick(ɵ$index_8_r2));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ɵ$index_8_r2 = ctx.$index;
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵclassMap(ɵɵpureFunction1(4, _c5, ctx_r2.active === ɵ$index_8_r2));
    ɵɵattribute("data-coreui-target", ɵ$index_8_r2)("aria-current", ctx_r2.active === ɵ$index_8_r2);
  }
}
function CarouselIndicatorsComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵrepeaterCreate(0, CarouselIndicatorsComponent_ng_template_2_For_1_Template, 1, 6, "button", 2, ɵɵrepeaterTrackByIdentity);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵrepeater(ctx_r2.items);
  }
}
function CarouselItemComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
  }
}
function HeaderComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 0);
    ɵɵprojection(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngClass", ctx_r0.headerClasses());
  }
}
function HeaderComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 1);
  }
}
function NavbarComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NavbarComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 3);
    ɵɵprojection(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngClass", ctx_r0.containerClass());
  }
}
function NavbarComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 1);
  }
}
var _c6 = ["modalContentRef"];
var _c7 = "[_nghost-%COMP%]{display:list-item;text-align:-webkit-match-parent;text-align:match-parent}";
var _c8 = ["popoverTemplate"];
var _c9 = (a0) => ({
  "popover-arrow": a0
});
function ProgressComponent_Conditional_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function ProgressComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, ProgressComponent_Conditional_0_ng_container_0_Template, 1, 0, "ng-container", 2);
  }
  if (rf & 2) {
    ɵɵnextContext();
    const defaultContent_r1 = ɵɵreference(3);
    ɵɵproperty("ngTemplateOutlet", defaultContent_r1);
  }
}
function ProgressComponent_Conditional_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function ProgressComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵdeclareLet(0);
    ɵɵelementStart(1, "c-progress-bar", 1);
    ɵɵtemplate(2, ProgressComponent_Conditional_1_ng_container_2_Template, 1, 0, "ng-container", 2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    const defaultContent_r1 = ɵɵreference(3);
    const pbd_r3 = ctx_r1.progressBarDirective;
    ɵɵadvance();
    ɵɵproperty("animated", pbd_r3 == null ? null : pbd_r3.animated())("variant", pbd_r3 == null ? null : pbd_r3.variant())("color", pbd_r3 == null ? null : pbd_r3.color())("value", ctx_r1.value());
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", defaultContent_r1);
  }
}
function ProgressComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
  }
}
function SidebarBrandComponent_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "img", 1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("cHtmlAttr", ctx_r0.brandFull())("ngClass", "sidebar-brand-full");
  }
}
function SidebarBrandComponent_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "img", 1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("cHtmlAttr", ctx_r0.brandNarrow())("ngClass", "sidebar-brand-narrow");
  }
}
function SidebarBrandComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "a", 0);
    ɵɵtemplate(1, SidebarBrandComponent_Conditional_0_Conditional_1_Template, 1, 2, "img", 1)(2, SidebarBrandComponent_Conditional_0_Conditional_2_Template, 1, 2, "img", 1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("routerLink", ctx_r0.routerLink());
    ɵɵadvance();
    ɵɵconditional(ctx_r0.brandFull() ? 1 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.brandNarrow() ? 2 : -1);
  }
}
function SidebarBrandComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
  }
}
function SidebarNavLinkContentComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate((tmp_1_0 = ctx_r0.item == null ? null : ctx_r0.item.name) !== null && tmp_1_0 !== void 0 ? tmp_1_0 : "");
  }
}
var _c10 = (a0) => ({
  $implicit: a0
});
var _c11 = () => ({
  exact: false
});
function SidebarNavLinkComponent_Case_0_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function SidebarNavLinkComponent_Case_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 6);
    ɵɵpipe(1, "cSidebarNavBadge");
    ɵɵtext(2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ɵɵpipeBind1(1, 2, ctx_r0.item));
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r0.item.badge == null ? null : ctx_r0.item.badge.text);
  }
}
function SidebarNavLinkComponent_Case_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "a", 1);
    ɵɵpipe(1, "cSidebarNavLink");
    ɵɵtemplate(2, SidebarNavLinkComponent_Case_0_ng_container_2_Template, 1, 0, "ng-container", 4);
    ɵɵelement(3, "c-sidebar-nav-link-content", 5);
    ɵɵtemplate(4, SidebarNavLinkComponent_Case_0_Conditional_4_Template, 3, 4, "span", 6);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = ɵɵnextContext();
    const iconTemplate_r2 = ɵɵreference(4);
    ɵɵproperty("cHtmlAttr", (tmp_2_0 = ctx_r0.item.attributes) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : ɵɵpureFunction0(8, _c3))("ngClass", ɵɵpipeBind1(1, 6, ctx_r0.item));
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", iconTemplate_r2)("ngTemplateOutletContext", ɵɵpureFunction1(9, _c10, ctx_r0.item));
    ɵɵadvance();
    ɵɵproperty("item", ctx_r0.item);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.item.badge ? 4 : -1);
  }
}
function SidebarNavLinkComponent_Case_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function SidebarNavLinkComponent_Case_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 6);
    ɵɵpipe(1, "cSidebarNavBadge");
    ɵɵtext(2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ɵɵpipeBind1(1, 2, ctx_r0.item));
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r0.item.badge == null ? null : ctx_r0.item.badge.text);
  }
}
function SidebarNavLinkComponent_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 7);
    ɵɵpipe(1, "cSidebarNavLink");
    ɵɵlistener("click", function SidebarNavLinkComponent_Case_1_Template_a_click_0_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.linkClicked());
    });
    ɵɵtemplate(2, SidebarNavLinkComponent_Case_1_ng_container_2_Template, 1, 0, "ng-container", 4);
    ɵɵelement(3, "c-sidebar-nav-link-content", 5);
    ɵɵtemplate(4, SidebarNavLinkComponent_Case_1_Conditional_4_Template, 3, 4, "span", 6);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = ɵɵnextContext();
    const iconTemplate_r2 = ɵɵreference(4);
    ɵɵproperty("cHtmlAttr", (tmp_2_0 = ctx_r0.item.attributes) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : ɵɵpureFunction0(9, _c3))("href", ctx_r0.href, ɵɵsanitizeUrl)("ngClass", ɵɵpipeBind1(1, 7, ctx_r0.item));
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", iconTemplate_r2)("ngTemplateOutletContext", ɵɵpureFunction1(10, _c10, ctx_r0.item));
    ɵɵadvance();
    ɵɵproperty("item", ctx_r0.item);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.item.badge ? 4 : -1);
  }
}
function SidebarNavLinkComponent_Case_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function SidebarNavLinkComponent_Case_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 6);
    ɵɵpipe(1, "cSidebarNavBadge");
    ɵɵtext(2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ɵɵpipeBind1(1, 2, ctx_r0.item));
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r0.item.badge == null ? null : ctx_r0.item.badge.text);
  }
}
function SidebarNavLinkComponent_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 8);
    ɵɵpipe(1, "cSidebarNavLink");
    ɵɵlistener("click", function SidebarNavLinkComponent_Case_2_Template_a_click_0_listener() {
      ɵɵrestoreView(_r4);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.linkClicked());
    });
    ɵɵtemplate(2, SidebarNavLinkComponent_Case_2_ng_container_2_Template, 1, 0, "ng-container", 4);
    ɵɵelement(3, "c-sidebar-nav-link-content", 5);
    ɵɵtemplate(4, SidebarNavLinkComponent_Case_2_Conditional_4_Template, 3, 4, "span", 6);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_5_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_11_0;
    let tmp_12_0;
    const ctx_r0 = ɵɵnextContext();
    const iconTemplate_r2 = ɵɵreference(4);
    ɵɵproperty("cHtmlAttr", (tmp_2_0 = ctx_r0.item.attributes) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : ɵɵpureFunction0(18, _c3))("fragment", ctx_r0.item.linkProps == null ? null : ctx_r0.item.linkProps.fragment)("ngClass", ɵɵpipeBind1(1, 16, ctx_r0.item))("preserveFragment", (tmp_5_0 = ctx_r0.item.linkProps == null ? null : ctx_r0.item.linkProps.preserveFragment) !== null && tmp_5_0 !== void 0 ? tmp_5_0 : false)("queryParamsHandling", ctx_r0.item.linkProps == null ? null : ctx_r0.item.linkProps.queryParamsHandling)("queryParams", (tmp_7_0 = ctx_r0.item.linkProps == null ? null : ctx_r0.item.linkProps.queryParams) !== null && tmp_7_0 !== void 0 ? tmp_7_0 : null)("replaceUrl", (tmp_8_0 = ctx_r0.item.linkProps == null ? null : ctx_r0.item.linkProps.replaceUrl) !== null && tmp_8_0 !== void 0 ? tmp_8_0 : false)("routerLinkActiveOptions", (tmp_9_0 = ctx_r0.item.linkProps == null ? null : ctx_r0.item.linkProps.routerLinkActiveOptions) !== null && tmp_9_0 !== void 0 ? tmp_9_0 : ɵɵpureFunction0(19, _c11))("routerLink", ctx_r0.item.url)("skipLocationChange", (tmp_11_0 = ctx_r0.item.linkProps == null ? null : ctx_r0.item.linkProps.skipLocationChange) !== null && tmp_11_0 !== void 0 ? tmp_11_0 : false)("state", (tmp_12_0 = ctx_r0.item.linkProps == null ? null : ctx_r0.item.linkProps.state) !== null && tmp_12_0 !== void 0 ? tmp_12_0 : ɵɵpureFunction0(20, _c3))("target", ctx_r0.item.attributes == null ? null : ctx_r0.item.attributes["target"]);
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", iconTemplate_r2)("ngTemplateOutletContext", ɵɵpureFunction1(21, _c10, ctx_r0.item));
    ɵɵadvance();
    ɵɵproperty("item", ctx_r0.item);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.item.badge ? 4 : -1);
  }
}
function SidebarNavLinkComponent_ng_template_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 9);
    ɵɵelement(1, "span", 6);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const item_r5 = ɵɵnextContext().$implicit;
    ɵɵadvance();
    ɵɵproperty("ngClass", (tmp_4_0 = item_r5.icon) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : "");
  }
}
function SidebarNavLinkComponent_ng_template_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 10);
    ɵɵpipe(1, "cSidebarNavIcon");
  }
  if (rf & 2) {
    const item_r5 = ɵɵnextContext().$implicit;
    ɵɵproperty("cIcon", item_r5.iconComponent == null ? null : item_r5.iconComponent.content)("customClasses", ɵɵpipeBind1(1, 3, item_r5))("name", item_r5.iconComponent == null ? null : item_r5.iconComponent.name);
  }
}
function SidebarNavLinkComponent_ng_template_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 6);
    ɵɵpipe(1, "cSidebarNavIcon");
  }
  if (rf & 2) {
    const item_r5 = ɵɵnextContext().$implicit;
    ɵɵproperty("ngClass", ɵɵpipeBind1(1, 1, item_r5));
  }
}
function SidebarNavLinkComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, SidebarNavLinkComponent_ng_template_3_Conditional_0_Template, 2, 1, "span", 9)(1, SidebarNavLinkComponent_ng_template_3_Conditional_1_Template, 2, 5, ":svg:svg", 10)(2, SidebarNavLinkComponent_ng_template_3_Conditional_2_Template, 2, 3, "span", 6);
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    ɵɵconditional((item_r5 == null ? null : item_r5.icon) ? 0 : -1);
    ɵɵadvance();
    ɵɵconditional((item_r5 == null ? null : item_r5.iconComponent) ? 1 : -1);
    ɵɵadvance();
    ɵɵconditional(!(item_r5 == null ? null : item_r5.icon) && !(item_r5 == null ? null : item_r5.iconComponent) ? 2 : -1);
  }
}
function SidebarNavLabelComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "i", 1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngClass", ctx_r0.getLabelIconClass());
  }
}
function SidebarNavLabelComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 1);
    ɵɵpipe(1, "cSidebarNavBadge");
    ɵɵtext(2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpipeBind1(1, 2, ctx_r0.item));
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r0.item.badge.text);
  }
}
function SidebarNavGroupComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function SidebarNavGroupComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 3);
    ɵɵpipe(1, "cSidebarNavBadge");
    ɵɵtext(2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpipeBind1(1, 2, ctx_r1.item));
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r1.item.badge.text);
  }
}
function SidebarNavGroupComponent_ng_template_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 5);
    ɵɵelement(1, "span", 3);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const item_r3 = ɵɵnextContext().$implicit;
    ɵɵadvance();
    ɵɵproperty("ngClass", (tmp_4_0 = item_r3.icon) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : "");
  }
}
function SidebarNavGroupComponent_ng_template_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 6);
    ɵɵpipe(1, "cSidebarNavIcon");
  }
  if (rf & 2) {
    const item_r3 = ɵɵnextContext().$implicit;
    ɵɵproperty("cIcon", item_r3.iconComponent == null ? null : item_r3.iconComponent.content)("customClasses", ɵɵpipeBind1(1, 3, item_r3))("name", item_r3.iconComponent == null ? null : item_r3.iconComponent.name);
  }
}
function SidebarNavGroupComponent_ng_template_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 3);
    ɵɵpipe(1, "cSidebarNavIcon");
  }
  if (rf & 2) {
    const item_r3 = ɵɵnextContext().$implicit;
    ɵɵproperty("ngClass", ɵɵpipeBind1(1, 1, item_r3));
  }
}
function SidebarNavGroupComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, SidebarNavGroupComponent_ng_template_6_Conditional_0_Template, 2, 1, "span", 5)(1, SidebarNavGroupComponent_ng_template_6_Conditional_1_Template, 2, 5, ":svg:svg", 6)(2, SidebarNavGroupComponent_ng_template_6_Conditional_2_Template, 2, 3, "span", 3);
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    ɵɵconditional((item_r3 == null ? null : item_r3.icon) ? 0 : -1);
    ɵɵadvance();
    ɵɵconditional((item_r3 == null ? null : item_r3.iconComponent) ? 1 : -1);
    ɵɵadvance();
    ɵɵconditional(!(item_r3 == null ? null : item_r3.icon) && !(item_r3 == null ? null : item_r3.iconComponent) ? 2 : -1);
  }
}
var _c12 = () => ({
  exact: true
});
function SidebarNavComponent_For_1_Case_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "c-sidebar-nav-group", 1, 0);
    ɵɵpipe(2, "cSidebarNavItemClass");
  }
  if (rf & 2) {
    const item_r1 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("dropdownMode", ctx_r1.dropdownMode)("item", item_r1)("ngClass", ɵɵpipeBind1(2, 5, item_r1))("routerLinkActiveOptions", ɵɵpureFunction0(7, _c12))("compact", ctx_r1.compact);
  }
}
function SidebarNavComponent_For_1_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "c-sidebar-nav-divider", 2);
    ɵɵpipe(1, "cSidebarNavItemClass");
  }
  if (rf & 2) {
    let tmp_11_0;
    const item_r1 = ɵɵnextContext().$implicit;
    ɵɵproperty("cHtmlAttr", (tmp_11_0 = item_r1.attributes) !== null && tmp_11_0 !== void 0 ? tmp_11_0 : ɵɵpureFunction0(5, _c3))("item", item_r1)("ngClass", ɵɵpipeBind1(1, 3, item_r1));
  }
}
function SidebarNavComponent_For_1_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "c-sidebar-nav-title", 2);
    ɵɵpipe(1, "cSidebarNavItemClass");
  }
  if (rf & 2) {
    let tmp_11_0;
    const item_r1 = ɵɵnextContext().$implicit;
    ɵɵproperty("cHtmlAttr", (tmp_11_0 = item_r1.attributes) !== null && tmp_11_0 !== void 0 ? tmp_11_0 : ɵɵpureFunction0(5, _c3))("item", item_r1)("ngClass", ɵɵpipeBind1(1, 3, item_r1));
  }
}
function SidebarNavComponent_For_1_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "c-sidebar-nav-label", 3);
    ɵɵpipe(1, "cSidebarNavItemClass");
  }
  if (rf & 2) {
    const item_r1 = ɵɵnextContext().$implicit;
    ɵɵproperty("item", item_r1)("ngClass", ɵɵpipeBind1(1, 2, item_r1));
  }
}
function SidebarNavComponent_For_1_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function SidebarNavComponent_For_1_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "c-sidebar-nav-link", 4);
    ɵɵpipe(1, "cSidebarNavItemClass");
    ɵɵlistener("linkClick", function SidebarNavComponent_For_1_Case_5_Template_c_sidebar_nav_link_linkClick_0_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.hideMobile());
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r1 = ɵɵnextContext().$implicit;
    ɵɵproperty("item", item_r1)("ngClass", ɵɵpipeBind1(1, 2, item_r1));
  }
}
function SidebarNavComponent_For_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, SidebarNavComponent_For_1_Case_0_Template, 3, 8, "c-sidebar-nav-group", 1)(1, SidebarNavComponent_For_1_Case_1_Template, 2, 6, "c-sidebar-nav-divider", 2)(2, SidebarNavComponent_For_1_Case_2_Template, 2, 6, "c-sidebar-nav-title", 2)(3, SidebarNavComponent_For_1_Case_3_Template, 2, 4, "c-sidebar-nav-label", 3)(4, SidebarNavComponent_For_1_Case_4_Template, 1, 0, "ng-container")(5, SidebarNavComponent_For_1_Case_5_Template, 2, 4, "c-sidebar-nav-link", 3);
  }
  if (rf & 2) {
    let tmp_10_0;
    const item_r1 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵconditional((tmp_10_0 = ctx_r1.helper.itemType(item_r1)) === "group" ? 0 : tmp_10_0 === "divider" ? 1 : tmp_10_0 === "title" ? 2 : tmp_10_0 === "label" ? 3 : tmp_10_0 === "empty" ? 4 : 5);
  }
}
function SpinnerComponent_ProjectionFallback_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 0);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.label());
  }
}
var _c13 = () => ({
  outline: 0
});
function ToastHeaderComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "button", 1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵstyleMap(ɵɵpureFunction0(3, _c13));
    ɵɵproperty("cToastClose", ctx_r0.toast());
  }
}
function ToasterComponent_ng_template_0_Template(rf, ctx) {
}
var _c14 = ["tooltipTemplate"];
var _c15 = [[["", 8, "chart-wrapper"]], "*"];
var _c16 = [".chart-wrapper", "*"];
function WidgetStatAComponent_Conditional_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function WidgetStatAComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 5);
    ɵɵtemplate(1, WidgetStatAComponent_Conditional_3_ng_container_1_Template, 1, 0, "ng-container", 6);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    const defaultWidgetValueTemplate_r2 = ɵɵreference(10);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", (ctx_r0.templates == null ? null : ctx_r0.templates["widgetValueTemplate"]) || defaultWidgetValueTemplate_r2);
  }
}
function WidgetStatAComponent_Conditional_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function WidgetStatAComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵtemplate(1, WidgetStatAComponent_Conditional_4_ng_container_1_Template, 1, 0, "ng-container", 6);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    const defaultWidgetTitleTemplate_r3 = ɵɵreference(8);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", (ctx_r0.templates == null ? null : ctx_r0.templates["widgetTitleTemplate"]) || defaultWidgetTitleTemplate_r3);
  }
}
function WidgetStatAComponent_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function WidgetStatAComponent_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function WidgetStatAComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵtextInterpolate1(" ", ctx_r0.title(), "\n");
  }
}
function WidgetStatAComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵtextInterpolate1(" ", ctx_r0.value(), "\n");
  }
}
function WidgetStatAComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
  }
}
function WidgetStatAComponent_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 1);
  }
}
function WidgetStatBComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 0);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.value());
  }
}
function WidgetStatBComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.title());
  }
}
function WidgetStatBComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "small", 1);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngClass", ctx_r0.inverse() ? "text-white text-opacity-75" : "text-body-secondary");
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r0.text(), " ");
  }
}
function WidgetStatCComponent_Conditional_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function WidgetStatCComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 2);
    ɵɵtemplate(1, WidgetStatCComponent_Conditional_1_ng_container_1_Template, 1, 0, "ng-container", 3);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    const defaultWidgetIconTemplate_r2 = ɵɵreference(6);
    ɵɵproperty("ngClass", ctx_r0.iconClasses());
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", (ctx_r0.templates == null ? null : ctx_r0.templates["widgetIconTemplate"]) || defaultWidgetIconTemplate_r2);
  }
}
function WidgetStatCComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 2);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngClass", ctx_r0.valueClasses());
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r0.value(), " ");
  }
}
function WidgetStatCComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 2);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngClass", ctx_r0.titleClasses());
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r0.title(), " ");
  }
}
function WidgetStatCComponent_Conditional_4_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function WidgetStatCComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, WidgetStatCComponent_Conditional_4_ng_container_0_Template, 1, 0, "ng-container", 3);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    const defaultWidgetProgressTemplate_r3 = ɵɵreference(8);
    ɵɵproperty("ngTemplateOutlet", (ctx_r0.templates == null ? null : ctx_r0.templates["widgetProgressTemplate"]) || defaultWidgetProgressTemplate_r3);
  }
}
function WidgetStatCComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵtextInterpolate1(" ", ctx_r0.icon(), "\n");
  }
}
function WidgetStatCComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
  }
}
function WidgetStatDComponent_For_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 2);
  }
}
function WidgetStatDComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, WidgetStatDComponent_For_4_Conditional_0_Template, 1, 0, "div", 2);
    ɵɵelementStart(1, "c-col")(2, "div", 3);
    ɵɵtext(3);
    ɵɵelementEnd();
    ɵɵelementStart(4, "div", 4);
    ɵɵtext(5);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ɵ$index_6_r2 = ctx.$index;
    ɵɵconditional(ɵ$index_6_r2 % 2 !== 0 ? 0 : -1);
    ɵɵadvance(3);
    ɵɵtextInterpolate(item_r1.value);
    ɵɵadvance(2);
    ɵɵtextInterpolate(item_r1.title);
  }
}
function WidgetStatEComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 1);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngClass", ctx_r0.titleClasses());
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.title());
  }
}
function WidgetStatEComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 2);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.value());
  }
}
function WidgetStatFComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function WidgetStatFComponent_Conditional_9_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function WidgetStatFComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "c-card-footer");
    ɵɵtemplate(1, WidgetStatFComponent_Conditional_9_ng_container_1_Template, 1, 0, "ng-container", 3);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    const defaultFooterIconTemplate_r2 = ɵɵreference(13);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", (ctx_r0.templates == null ? null : ctx_r0.templates["widgetFooterTemplate"]) || defaultFooterIconTemplate_r2);
  }
}
function WidgetStatFComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.icon());
  }
}
function WidgetStatFComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.footer());
  }
}
var BreakpointInfix;
(function(BreakpointInfix2) {
  BreakpointInfix2["xs"] = "xs";
  BreakpointInfix2["sm"] = "sm";
  BreakpointInfix2["md"] = "md";
  BreakpointInfix2["lg"] = "lg";
  BreakpointInfix2["xl"] = "xl";
  BreakpointInfix2["xxl"] = "xxl";
})(BreakpointInfix || (BreakpointInfix = {}));
var ElementRefDirective = class _ElementRefDirective {
  constructor() {
    this.elementRef = inject(ElementRef);
  }
  static {
    this.ɵfac = function ElementRefDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ElementRefDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _ElementRefDirective,
      selectors: [["", "cElementRef", ""]],
      exportAs: ["cElementRef"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ElementRefDirective, [{
    type: Directive,
    args: [{
      selector: "[cElementRef]",
      exportAs: "cElementRef"
    }]
  }], null, null);
})();
var HtmlAttributesDirective = class _HtmlAttributesDirective {
  constructor() {
    this.cHtmlAttr = input();
    this.#renderer = inject(Renderer2);
    this.#elementRef = inject(ElementRef);
    this.#attrEffect = effect(() => {
      const attribs = this.cHtmlAttr();
      for (const attr in attribs) {
        if (attr === "style" && typeof attribs[attr] === "object") {
          this.setStyle(attribs[attr]);
        } else if (attr === "class") {
          this.addClass(attribs[attr]);
        } else {
          this.setAttrib(attr, attribs[attr]);
        }
      }
    });
  }
  #renderer;
  #elementRef;
  #attrEffect;
  setStyle(styles) {
    for (const style2 in styles) {
      if (style2) {
        this.#renderer.setStyle(this.#elementRef.nativeElement, style2, styles[style2]);
      }
    }
  }
  addClass(classes) {
    const classArray = Array.isArray(classes) ? classes : classes.split(" ");
    classArray.filter((element) => element.length > 0).forEach((element) => {
      this.#renderer.addClass(this.#elementRef.nativeElement, element);
    });
  }
  setAttrib(key, value) {
    value !== null ? this.#renderer.setAttribute(this.#elementRef.nativeElement, key, value) : this.#renderer.removeAttribute(this.#elementRef.nativeElement, key);
  }
  static {
    this.ɵfac = function HtmlAttributesDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HtmlAttributesDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _HtmlAttributesDirective,
      selectors: [["", "cHtmlAttr", ""]],
      inputs: {
        cHtmlAttr: [1, "cHtmlAttr"]
      },
      exportAs: ["cHtmlAttr"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HtmlAttributesDirective, [{
    type: Directive,
    args: [{
      selector: "[cHtmlAttr]",
      exportAs: "cHtmlAttr"
    }]
  }], null, null);
})();
var TemplateIdDirective = class _TemplateIdDirective {
  constructor() {
    this.templateRef = inject(TemplateRef);
    this.cTemplateId = input.required();
  }
  get id() {
    return this.cTemplateId();
  }
  static {
    this.ɵfac = function TemplateIdDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TemplateIdDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TemplateIdDirective,
      selectors: [["", "cTemplateId", ""]],
      inputs: {
        cTemplateId: [1, "cTemplateId"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TemplateIdDirective, [{
    type: Directive,
    args: [{
      selector: "[cTemplateId]"
    }]
  }], null, null);
})();
var ThemeDirective = class _ThemeDirective {
  constructor() {
    this.#hostElement = inject(ElementRef);
    this.#renderer = inject(Renderer2);
    this.colorScheme = input();
    this.#colorSchemeChange = effect(() => {
      const colorScheme = this.colorScheme();
      colorScheme ? this.setTheme(colorScheme) : this.unsetTheme();
    });
    this.dark = input(false, {
      transform: booleanAttribute
    });
    this.#darkChange = effect(() => {
      const darkTheme = this.dark() || untracked(this.colorScheme) === "dark";
      darkTheme ? this.setTheme("dark") : this.unsetTheme();
    });
  }
  #hostElement;
  #renderer;
  #colorSchemeChange;
  #darkChange;
  setTheme(theme) {
    if (theme) {
      this.#renderer.setAttribute(this.#hostElement.nativeElement, "data-coreui-theme", theme);
    }
  }
  unsetTheme() {
    this.#renderer.removeAttribute(this.#hostElement.nativeElement, "data-coreui-theme");
  }
  static {
    this.ɵfac = function ThemeDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ThemeDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _ThemeDirective,
      selectors: [["", "cTheme", ""]],
      inputs: {
        colorScheme: [1, "colorScheme"],
        dark: [1, "dark"]
      },
      exportAs: ["cTheme"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThemeDirective, [{
    type: Directive,
    args: [{
      selector: "[cTheme]",
      exportAs: "cTheme"
    }]
  }], null, null);
})();
var SharedModule = class _SharedModule {
  static forRoot() {
    return {
      ngModule: _SharedModule
    };
  }
  static {
    this.ɵfac = function SharedModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SharedModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _SharedModule,
      imports: [ElementRefDirective, HtmlAttributesDirective, TemplateIdDirective, ThemeDirective],
      exports: [ElementRefDirective, HtmlAttributesDirective, TemplateIdDirective, ThemeDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SharedModule, [{
    type: NgModule,
    args: [{
      imports: [ElementRefDirective, HtmlAttributesDirective, TemplateIdDirective, ThemeDirective],
      exports: [ElementRefDirective, HtmlAttributesDirective, TemplateIdDirective, ThemeDirective]
    }]
  }], null, null);
})();
var AccordionButtonDirective = class _AccordionButtonDirective {
  constructor() {
    this.collapsed = input(void 0);
    this.type = input("button");
    this.hostClasses = computed(() => {
      return {
        "accordion-button": true,
        collapsed: this.collapsed()
      };
    });
    this.ariaExpanded = computed(() => !this.collapsed());
  }
  static {
    this.ɵfac = function AccordionButtonDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AccordionButtonDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _AccordionButtonDirective,
      selectors: [["", "cAccordionButton", ""]],
      hostVars: 4,
      hostBindings: function AccordionButtonDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("type", ctx.type())("aria-expanded", ctx.ariaExpanded());
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        collapsed: [1, "collapsed"],
        type: [1, "type"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccordionButtonDirective, [{
    type: Directive,
    args: [{
      selector: "[cAccordionButton]",
      host: {
        "[class]": "hostClasses()",
        "[attr.type]": "type()",
        "[attr.aria-expanded]": "ariaExpanded()"
      }
    }]
  }], null, null);
})();
var AccordionService = class _AccordionService {
  constructor() {
    this.items = [];
    this.alwaysOpen = false;
  }
  addItem(item) {
    this.items.push(item);
  }
  removeItem(item) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
  toggleItem(item) {
    item.itemVisible.update((value) => !value);
    this.closeOtherItems(item);
  }
  closeOtherItems(openItem) {
    if (!this.alwaysOpen) {
      this.items.forEach((item) => {
        if (item !== openItem) {
          item.itemVisible.set(false);
        }
      });
    }
  }
  static {
    this.ɵfac = function AccordionService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AccordionService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _AccordionService,
      factory: _AccordionService.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccordionService, [{
    type: Injectable
  }], null, null);
})();
var AccordionComponent = class _AccordionComponent {
  constructor() {
    this.#accordionService = inject(AccordionService);
    this.flush = input(false, {
      transform: booleanAttribute
    });
    this.alwaysOpen = input(false, {
      transform: booleanAttribute
    });
    this.#alwaysOpenEffect = effect(() => {
      this.#accordionService.alwaysOpen = this.alwaysOpen();
    });
    this.hostClasses = computed(() => ({
      accordion: true,
      "accordion-flush": this.flush()
    }));
  }
  #accordionService;
  #alwaysOpenEffect;
  static {
    this.ɵfac = function AccordionComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AccordionComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _AccordionComponent,
      selectors: [["c-accordion"]],
      hostVars: 2,
      hostBindings: function AccordionComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        flush: [1, "flush"],
        alwaysOpen: [1, "alwaysOpen"]
      },
      exportAs: ["cAccordionItem"],
      features: [ɵɵProvidersFeature([AccordionService])],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function AccordionComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      styles: ["[_nghost-%COMP%]{display:block}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccordionComponent, [{
    type: Component,
    args: [{
      selector: "c-accordion",
      template: "<ng-content />",
      exportAs: "cAccordionItem",
      providers: [AccordionService],
      host: {
        "[class]": "hostClasses()"
      },
      styles: [":host{display:block}\n"]
    }]
  }], null, null);
})();
var expandAnimation = animation([animate("{{ time }} {{ easing }}")]);
var collapseAnimation = animation([style({
  height: "*",
  minHeight: "*"
}), animate("{{ time }} {{ easing }}", style({
  height: 0,
  minHeight: 0
}))]);
var expandHorizontalAnimation = animation([animate("{{ time }} {{ easing }}")]);
var collapseHorizontalAnimation = animation([animate("{{ time }} {{ easing }}")]);
var CollapseDirective = class _CollapseDirective {
  #hostElement;
  #renderer;
  #animationBuilder;
  #player;
  constructor() {
    this.#hostElement = inject(ElementRef);
    this.#renderer = inject(Renderer2);
    this.#animationBuilder = inject(AnimationBuilder);
    this.#player = void 0;
    this.animateInput = input(true, {
      transform: booleanAttribute,
      alias: "animate"
    });
    this.animate = linkedSignal({
      source: this.animateInput,
      computation: (value) => value
    });
    this.horizontal = input(false, {
      transform: booleanAttribute
    });
    this.visibleInput = input(false, {
      transform: booleanAttribute,
      alias: "visible"
    });
    this.visibleChange = output();
    this.visible = linkedSignal({
      source: this.visibleInput,
      computation: (value) => value
    });
    this.#initialized = signal(false);
    this.#visibleEffect = effect(() => {
      const visible = this.visible();
      if (this.#initialized()) {
        this.createPlayer(visible);
      }
    });
    this.navbar = input(false, {
      transform: booleanAttribute
    });
    this.duration = input("350ms");
    this.transition = input("ease");
    this.collapseChange = output();
    this.hostClasses = computed(() => {
      return {
        "navbar-collapse": this.navbar(),
        "collapse-horizontal": this.horizontal()
      };
    });
    afterNextRender({
      read: () => {
        this.#initialized.set(true);
      }
    });
  }
  #initialized;
  #visibleEffect;
  ngOnDestroy() {
    this.destroyPlayer();
  }
  toggle(visible = !this.visible()) {
    this.visible.set(visible);
  }
  destroyPlayer() {
    this.#player?.destroy();
    this.#player = void 0;
  }
  createPlayer(visible = this.visible()) {
    if (this.#player?.hasStarted()) {
      this.destroyPlayer();
    }
    const host = this.#hostElement.nativeElement;
    if (visible) {
      this.#renderer.removeStyle(host, "display");
    }
    const duration = this.animate() ? this.duration() : "0ms";
    const expand = this.horizontal() ? expandHorizontalAnimation : expandAnimation;
    const collapse = this.horizontal() ? collapseHorizontalAnimation : collapseAnimation;
    const dimension = this.horizontal() ? "width" : "height";
    const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
    const scrollSize = `scroll${capitalizedDimension}`;
    const animationFactory = this.#animationBuilder?.build(useAnimation(visible ? expand : collapse, {
      params: {
        time: duration,
        easing: this.transition()
      }
    }));
    this.#player = animationFactory.create(host);
    !visible && host.offsetHeight && host.style[dimension] && host.scrollHeight;
    this.#renderer.setStyle(host, dimension, visible ? 0 : `${host.getBoundingClientRect()[dimension]}px`);
    this.#player.onStart(() => {
      this.setMaxSize();
      this.#renderer.removeClass(host, "collapse");
      this.#renderer.addClass(host, "collapsing");
      this.#renderer.removeClass(host, "show");
      this.#renderer.setStyle(host, dimension, visible ? `${host[scrollSize]}px` : "");
      this.collapseChange?.emit(visible ? "opening" : "collapsing");
    });
    this.#player.onDone(() => {
      this.#renderer.removeClass(host, "collapsing");
      this.#renderer.addClass(host, "collapse");
      if (visible) {
        this.#renderer.addClass(host, "show");
        this.#renderer.setStyle(host, dimension, "");
      } else {
        this.#renderer.removeClass(host, "show");
      }
      this.collapseChange?.emit(visible ? "open" : "collapsed");
      this.destroyPlayer();
      this.visibleChange.emit(visible);
    });
    this.#player?.play();
  }
  setMaxSize() {
    const host = this.#hostElement.nativeElement;
    if (this.horizontal()) {
      host.scrollWidth > 0 && this.#renderer.setStyle(host, "maxWidth", `${host.scrollWidth}px`);
    }
  }
  static {
    this.ɵfac = function CollapseDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CollapseDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _CollapseDirective,
      selectors: [["", "cCollapse", ""]],
      hostVars: 5,
      hostBindings: function CollapseDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵstyleMap(ɵɵpureFunction0(4, _c1));
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        animateInput: [1, "animate", "animateInput"],
        horizontal: [1, "horizontal"],
        visibleInput: [1, "visible", "visibleInput"],
        navbar: [1, "navbar"],
        duration: [1, "duration"],
        transition: [1, "transition"]
      },
      outputs: {
        visibleChange: "visibleChange",
        collapseChange: "collapseChange"
      },
      exportAs: ["cCollapse"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CollapseDirective, [{
    type: Directive,
    args: [{
      selector: "[cCollapse]",
      exportAs: "cCollapse",
      host: {
        "[class]": "hostClasses()",
        "[style]": '{ display: "none" }'
      }
    }]
  }], () => [], null);
})();
var CollapseModule = class _CollapseModule {
  static forRoot() {
    return {
      ngModule: _CollapseModule,
      providers: []
    };
  }
  static {
    this.ɵfac = function CollapseModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CollapseModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _CollapseModule,
      imports: [CollapseDirective],
      exports: [CollapseDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CollapseModule, [{
    type: NgModule,
    args: [{
      exports: [CollapseDirective],
      imports: [CollapseDirective]
    }]
  }], null, null);
})();
var nextId$2 = 0;
var AccordionItemComponent = class _AccordionItemComponent {
  constructor() {
    this.#accordionService = inject(AccordionService);
    this.visibleInput = input(false, {
      transform: booleanAttribute,
      alias: "visible"
    });
    this.itemVisible = signal(false);
    this.#visibleInputChange = effect(() => {
      this.visible = this.visibleInput();
    });
    this.contentId = `accordion-item-${nextId$2++}`;
    this.contentTemplates = contentChildren(TemplateIdDirective, {
      descendants: true
    });
    this.templates = computed(() => {
      return this.contentTemplates().reduce((acc, child) => {
        acc[child.id] = child.templateRef;
        return acc;
      }, {});
    });
  }
  #accordionService;
  #visibleInputChange;
  set visible(value) {
    this.itemVisible.set(value);
  }
  get visible() {
    return this.itemVisible();
  }
  get itemContext() {
    return {
      $implicit: this.itemVisible()
    };
  }
  ngOnInit() {
    this.#accordionService.addItem(this);
  }
  ngOnDestroy() {
    this.#accordionService.removeItem(this);
  }
  toggleItem() {
    this.#accordionService.toggleItem(this);
  }
  static {
    this.ɵfac = function AccordionItemComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AccordionItemComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _AccordionItemComponent,
      selectors: [["c-accordion-item"]],
      contentQueries: function AccordionItemComponent_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuerySignal(dirIndex, ctx.contentTemplates, TemplateIdDirective, 5);
        }
        if (rf & 2) {
          ɵɵqueryAdvance();
        }
      },
      hostAttrs: [1, "accordion-item"],
      inputs: {
        visibleInput: [1, "visible", "visibleInput"]
      },
      exportAs: ["cAccordionItem"],
      ngContentSelectors: _c2,
      decls: 14,
      vars: 8,
      consts: [["defaultAccordionHeaderTemplate", ""], ["defaultAccordionHeaderContentTemplate", ""], ["defaultAccordionBodyTemplate", ""], ["defaultAccordionBodyContentTemplate", ""], [1, "accordion-header"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["cCollapse", "", 1, "accordion-collapse", 3, "visible", "id"], ["cAccordionButton", "", 3, "click", "collapsed"], [1, "accordion-body"]],
      template: function AccordionItemComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef(_c2);
          ɵɵdeclareLet(0);
          ɵɵelementContainerStart(1);
          ɵɵelementStart(2, "div", 4);
          ɵɵtemplate(3, AccordionItemComponent_ng_container_3_Template, 1, 0, "ng-container", 5);
          ɵɵelementEnd();
          ɵɵelementStart(4, "div", 6);
          ɵɵtemplate(5, AccordionItemComponent_ng_container_5_Template, 1, 0, "ng-container", 5);
          ɵɵelementEnd();
          ɵɵelementContainerEnd();
          ɵɵtemplate(6, AccordionItemComponent_ng_template_6_Template, 2, 4, "ng-template", null, 0, ɵɵtemplateRefExtractor)(8, AccordionItemComponent_ng_template_8_Template, 1, 0, "ng-template", null, 1, ɵɵtemplateRefExtractor)(10, AccordionItemComponent_ng_template_10_Template, 2, 2, "ng-template", null, 2, ɵɵtemplateRefExtractor)(12, AccordionItemComponent_ng_template_12_Template, 1, 0, "ng-template", null, 3, ɵɵtemplateRefExtractor);
        }
        if (rf & 2) {
          const defaultAccordionHeaderTemplate_r6 = ɵɵreference(7);
          const defaultAccordionBodyTemplate_r7 = ɵɵreference(11);
          const tmpl_r8 = ɵɵstoreLet(ctx.templates());
          ɵɵadvance(3);
          ɵɵproperty("ngTemplateOutlet", tmpl_r8["accordionHeaderTemplate"] || defaultAccordionHeaderTemplate_r6)("ngTemplateOutletContext", ctx.itemContext);
          ɵɵadvance();
          ɵɵproperty("visible", ctx.itemVisible())("id", ctx.contentId);
          ɵɵattribute("aria-expanded", ctx.itemVisible());
          ɵɵadvance();
          ɵɵproperty("ngTemplateOutlet", tmpl_r8["accordionBodyTemplate"] || defaultAccordionBodyTemplate_r7)("ngTemplateOutletContext", ctx.itemContext);
        }
      },
      dependencies: [AccordionButtonDirective, NgTemplateOutlet, CollapseDirective],
      styles: ["[_nghost-%COMP%]{display:block;overflow:hidden}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccordionItemComponent, [{
    type: Component,
    args: [{
      selector: "c-accordion-item",
      exportAs: "cAccordionItem",
      imports: [AccordionButtonDirective, NgTemplateOutlet, CollapseDirective],
      host: {
        class: "accordion-item"
      },
      template: `@let tmpl = templates();
<ng-container>
  <div class="accordion-header">
    <ng-container *ngTemplateOutlet="tmpl['accordionHeaderTemplate'] || defaultAccordionHeaderTemplate; context: itemContext" />
  </div>
  <div class="accordion-collapse" cCollapse [visible]="itemVisible()" [attr.aria-expanded]="itemVisible()" [id]="contentId">
    <ng-container *ngTemplateOutlet="tmpl['accordionBodyTemplate'] || defaultAccordionBodyTemplate; context: itemContext" />
  </div>
</ng-container>

<ng-template #defaultAccordionHeaderTemplate>
  <button cAccordionButton [collapsed]="!itemVisible()" [attr.aria-controls]="contentId" (click)="toggleItem()">
    <ng-container
      *ngTemplateOutlet="tmpl['accordionHeader'] || defaultAccordionHeaderContentTemplate; context: itemContext">
    </ng-container>
  </button>
</ng-template>

<ng-template #defaultAccordionHeaderContentTemplate>
  <ng-content />
</ng-template>

<ng-template #defaultAccordionBodyTemplate>
  <div class="accordion-body">
    <ng-container
      *ngTemplateOutlet="tmpl['accordionBody'] || defaultAccordionBodyContentTemplate; context: itemContext">
    </ng-container>
  </div>
</ng-template>

<ng-template #defaultAccordionBodyContentTemplate>
  <ng-content />
</ng-template>
`,
      styles: [":host{display:block;overflow:hidden}\n"]
    }]
  }], null, null);
})();
var AccordionModule = class _AccordionModule {
  static {
    this.ɵfac = function AccordionModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AccordionModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _AccordionModule,
      imports: [AccordionButtonDirective, AccordionComponent, AccordionItemComponent],
      exports: [AccordionComponent, AccordionButtonDirective, AccordionItemComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      providers: [AccordionService]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccordionModule, [{
    type: NgModule,
    args: [{
      imports: [AccordionButtonDirective, AccordionComponent, AccordionItemComponent],
      exports: [AccordionComponent, AccordionButtonDirective, AccordionItemComponent],
      providers: [AccordionService]
    }]
  }], null, null);
})();
var AlertHeadingDirective = class _AlertHeadingDirective {
  static {
    this.ɵfac = function AlertHeadingDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AlertHeadingDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _AlertHeadingDirective,
      selectors: [["", "cAlertHeading", ""]],
      hostAttrs: [1, "alert-heading"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AlertHeadingDirective, [{
    type: Directive,
    args: [{
      selector: "[cAlertHeading]",
      host: {
        class: "alert-heading"
      }
    }]
  }], null, null);
})();
var AlertLinkDirective = class _AlertLinkDirective {
  static {
    this.ɵfac = function AlertLinkDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AlertLinkDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _AlertLinkDirective,
      selectors: [["", "cAlertLink", ""]],
      hostAttrs: [1, "alert-link"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AlertLinkDirective, [{
    type: Directive,
    args: [{
      selector: "[cAlertLink]",
      host: {
        class: "alert-link"
      }
    }]
  }], null, null);
})();
var ButtonDirective = class _ButtonDirective {
  constructor() {
    this.active = input(false, {
      transform: booleanAttribute
    });
    this.color = input("primary");
    this.disabled = input(false, {
      transform: booleanAttribute
    });
    this.shape = input();
    this.size = input("");
    this.type = input("button");
    this.variant = input();
    this.hostClasses = computed(() => {
      return {
        btn: true,
        [`btn-${this.color()}`]: !!this.color() && !this.variant(),
        [`btn-${this.variant()}`]: !!this.variant() && !this.color(),
        [`btn-${this.variant()}-${this.color()}`]: !!this.variant() && !!this.color(),
        [`btn-${this.size()}`]: !!this.size(),
        [`${this.shape()}`]: !!this.shape(),
        active: this.active(),
        disabled: this._disabled()
      };
    });
    this._disabled = computed(() => this.disabled());
    this.ariaDisabled = computed(() => {
      return this._disabled() ? true : null;
    });
    this.attrDisabled = computed(() => {
      return this._disabled() ? "" : null;
    });
    this.tabIndex = computed(() => {
      return this._disabled() ? "-1" : null;
    });
    this.isActive = computed(() => {
      return this.active() || null;
    });
  }
  static {
    this.ɵfac = function ButtonDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ButtonDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _ButtonDirective,
      selectors: [["", "cButton", ""]],
      hostAttrs: [1, "btn"],
      hostVars: 7,
      hostBindings: function ButtonDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("aria-disabled", ctx.ariaDisabled())("aria-pressed", ctx.isActive())("disabled", ctx.attrDisabled())("tabindex", ctx.tabIndex())("type", ctx.type());
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        active: [1, "active"],
        color: [1, "color"],
        disabled: [1, "disabled"],
        shape: [1, "shape"],
        size: [1, "size"],
        type: [1, "type"],
        variant: [1, "variant"]
      },
      exportAs: ["cButton"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonDirective, [{
    type: Directive,
    args: [{
      selector: "[cButton]",
      exportAs: "cButton",
      host: {
        class: "btn",
        "[class]": "hostClasses()",
        "[attr.aria-disabled]": "ariaDisabled()",
        "[attr.aria-pressed]": "isActive()",
        "[attr.disabled]": "attrDisabled()",
        "[attr.tabindex]": "tabIndex()",
        "[attr.type]": "type()"
      }
    }]
  }], null, null);
})();
var ButtonCloseDirective = class _ButtonCloseDirective extends ButtonDirective {
  constructor() {
    super(...arguments);
    this.white = input(false, {
      transform: booleanAttribute
    });
    this.hostClasses = computed(() => {
      return {
        btn: true,
        "btn-close": true,
        "btn-close-white": this.white(),
        [`btn-${this.size()}`]: !!this.size(),
        active: this.active(),
        disabled: this._disabled()
      };
    });
  }
  static {
    this.ɵfac = /* @__PURE__ */ (() => {
      let ɵButtonCloseDirective_BaseFactory;
      return function ButtonCloseDirective_Factory(__ngFactoryType__) {
        return (ɵButtonCloseDirective_BaseFactory || (ɵButtonCloseDirective_BaseFactory = ɵɵgetInheritedFactory(_ButtonCloseDirective)))(__ngFactoryType__ || _ButtonCloseDirective);
      };
    })();
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _ButtonCloseDirective,
      selectors: [["", "cButtonClose", ""]],
      hostAttrs: [1, "btn", "btn-close"],
      hostVars: 7,
      hostBindings: function ButtonCloseDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("aria-disabled", ctx.ariaDisabled())("aria-pressed", ctx.isActive())("disabled", ctx.attrDisabled())("tabindex", ctx.tabIndex())("type", ctx.type());
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        white: [1, "white"]
      },
      features: [ɵɵHostDirectivesFeature([{
        directive: ThemeDirective,
        inputs: ["dark", "dark"]
      }]), ɵɵInheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonCloseDirective, [{
    type: Directive,
    args: [{
      selector: "[cButtonClose]",
      hostDirectives: [{
        directive: ThemeDirective,
        inputs: ["dark"]
      }],
      host: {
        class: "btn btn-close",
        "[class]": "hostClasses()",
        "[attr.aria-disabled]": "ariaDisabled()",
        "[attr.aria-pressed]": "isActive()",
        "[attr.disabled]": "attrDisabled()",
        "[attr.tabindex]": "tabIndex()",
        "[attr.type]": "type()"
      }
    }]
  }], null, null);
})();
var ButtonModule = class _ButtonModule {
  static {
    this.ɵfac = function ButtonModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ButtonModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _ButtonModule,
      imports: [ButtonDirective, ButtonCloseDirective],
      exports: [ButtonDirective, ButtonCloseDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonModule, [{
    type: NgModule,
    args: [{
      imports: [ButtonDirective, ButtonCloseDirective],
      exports: [ButtonDirective, ButtonCloseDirective]
    }]
  }], null, null);
})();
var AlertComponent = class _AlertComponent {
  constructor() {
    this.color = input("primary");
    this.role = input("alert");
    this.variant = input();
    this.dismissibleInput = input(false, {
      transform: booleanAttribute,
      alias: "dismissible"
    });
    this.#dismissible = linkedSignal({
      source: this.dismissibleInput,
      computation: (value) => {
        return value;
      }
    });
    this.fade = input(false, {
      transform: booleanAttribute
    });
    this.visibleInput = input(true, {
      transform: booleanAttribute,
      alias: "visible"
    });
    this.#visible = linkedSignal({
      source: this.visibleInput,
      computation: (value) => {
        return value;
      }
    });
    this.hide = signal(false);
    this.visibleChange = output();
    this.contentTemplates = contentChildren(TemplateIdDirective, {
      descendants: true
    });
    this.templates = computed(() => {
      return this.contentTemplates().reduce((acc, child) => {
        acc[child.id] = child.templateRef;
        return acc;
      }, {});
    });
    this.hostClasses = computed(() => {
      const color = this.color();
      const variant = this.variant();
      return {
        alert: true,
        "alert-dismissible": this.dismissible,
        fade: this.fade(),
        show: !this.hide(),
        [`alert-${color}`]: !!color && variant !== "solid",
        [`bg-${color}`]: !!color && variant === "solid",
        "text-white": !!color && variant === "solid"
      };
    });
  }
  #dismissible;
  set dismissible(value) {
    this.#dismissible.set(value);
  }
  get dismissible() {
    return this.#dismissible();
  }
  #visible;
  set visible(value) {
    if (this.#visible() !== value) {
      this.#visible.set(value);
      this.visibleChange.emit(value);
    }
  }
  get visible() {
    return this.#visible();
  }
  get animateType() {
    return this.visible ? "show" : "hide";
  }
  onAnimationStart($event) {
    this.onAnimationEvent($event);
  }
  onAnimationDone($event) {
    this.onAnimationEvent($event);
  }
  onAnimationEvent(event) {
    this.hide.set(event.phaseName === "start" && event.toState === "show");
    if (event.phaseName === "done") {
      this.hide.set(event.toState === "hide" || event.toState === "void");
      if (event.toState === "show") {
        this.hide.set(false);
      }
    }
  }
  static {
    this.ɵfac = function AlertComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AlertComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _AlertComponent,
      selectors: [["c-alert"]],
      contentQueries: function AlertComponent_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuerySignal(dirIndex, ctx.contentTemplates, TemplateIdDirective, 5);
        }
        if (rf & 2) {
          ɵɵqueryAdvance();
        }
      },
      hostVars: 5,
      hostBindings: function AlertComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵsyntheticHostListener("@fadeInOut.start", function AlertComponent_animation_fadeInOut_start_HostBindingHandler($event) {
            return ctx.onAnimationStart($event);
          })("@fadeInOut.done", function AlertComponent_animation_fadeInOut_done_HostBindingHandler($event) {
            return ctx.onAnimationDone($event);
          });
        }
        if (rf & 2) {
          ɵɵsyntheticHostProperty("@.disabled", !ctx.fade())("@fadeInOut", ctx.animateType);
          ɵɵattribute("role", ctx.role());
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        color: [1, "color"],
        role: [1, "role"],
        variant: [1, "variant"],
        dismissibleInput: [1, "dismissible", "dismissibleInput"],
        fade: [1, "fade"],
        visibleInput: [1, "visible", "visibleInput"]
      },
      outputs: {
        visibleChange: "visibleChange"
      },
      exportAs: ["cAlert"],
      ngContentSelectors: _c0,
      decls: 3,
      vars: 1,
      consts: [["defaultAlertButtonCloseTemplate", ""], [4, "ngTemplateOutlet"], ["aria-label", "Close", "cButtonClose", "", 3, "click"]],
      template: function AlertComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵtemplate(0, AlertComponent_Conditional_0_Template, 2, 1)(1, AlertComponent_ng_template_1_Template, 1, 0, "ng-template", null, 0, ɵɵtemplateRefExtractor);
        }
        if (rf & 2) {
          ɵɵconditional(ctx.visible || !ctx.hide() ? 0 : -1);
        }
      },
      dependencies: [NgTemplateOutlet, ButtonCloseDirective],
      styles: ["[_nghost-%COMP%]{display:block;overflow:hidden}"],
      data: {
        animation: [trigger("fadeInOut", [state("show", style({
          opacity: 1,
          height: "*",
          padding: "*",
          border: "*",
          margin: "*"
        })), state("hide", style({
          opacity: 0,
          height: 0,
          padding: 0,
          border: 0,
          margin: 0
        })), state("void", style({
          opacity: 0,
          height: 0,
          padding: 0,
          border: 0,
          margin: 0
        })), transition("show => hide", [animate(".3s ease-out")]), transition("hide => show", [animate(".3s ease-in")]), transition("show => void", [animate(".3s ease-out")]), transition("void => show", [animate(".3s ease-in")])])]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AlertComponent, [{
    type: Component,
    args: [{
      selector: "c-alert",
      exportAs: "cAlert",
      imports: [NgTemplateOutlet, ButtonCloseDirective],
      animations: [trigger("fadeInOut", [state("show", style({
        opacity: 1,
        height: "*",
        padding: "*",
        border: "*",
        margin: "*"
      })), state("hide", style({
        opacity: 0,
        height: 0,
        padding: 0,
        border: 0,
        margin: 0
      })), state("void", style({
        opacity: 0,
        height: 0,
        padding: 0,
        border: 0,
        margin: 0
      })), transition("show => hide", [animate(".3s ease-out")]), transition("hide => show", [animate(".3s ease-in")]), transition("show => void", [animate(".3s ease-out")]), transition("void => show", [animate(".3s ease-in")])])],
      host: {
        "[@.disabled]": "!fade()",
        "[@fadeInOut]": "animateType",
        "[attr.role]": "role()",
        "[class]": "hostClasses()",
        "(@fadeInOut.start)": "onAnimationStart($event)",
        "(@fadeInOut.done)": "onAnimationDone($event)"
      },
      template: `@if (visible || !hide()) {
  @if (dismissible) {
    <ng-container *ngTemplateOutlet="templates()?.['alertButtonCloseTemplate'] || defaultAlertButtonCloseTemplate" />
  }
  <ng-content />
}
<ng-template #defaultAlertButtonCloseTemplate>
  <button (click)="visible=false" aria-label="Close" cButtonClose></button>
</ng-template>
`,
      styles: [":host{display:block;overflow:hidden}\n"]
    }]
  }], null, null);
})();
var AlertModule = class _AlertModule {
  static {
    this.ɵfac = function AlertModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AlertModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _AlertModule,
      imports: [AlertComponent, AlertHeadingDirective, AlertLinkDirective],
      exports: [AlertComponent, AlertHeadingDirective, AlertLinkDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AlertModule, [{
    type: NgModule,
    args: [{
      imports: [AlertComponent, AlertHeadingDirective, AlertLinkDirective],
      exports: [AlertComponent, AlertHeadingDirective, AlertLinkDirective]
    }]
  }], null, null);
})();
var AlignDirective = class _AlignDirective {
  constructor() {
    this.align = input(void 0, {
      alias: "cAlign"
    });
    this.hostClasses = computed(() => {
      const align = this.align();
      return {
        [`align-${align}`]: !!align
      };
    });
  }
  static {
    this.ɵfac = function AlignDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AlignDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _AlignDirective,
      selectors: [["", "cAlign", ""]],
      hostVars: 2,
      hostBindings: function AlignDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        align: [1, "cAlign", "align"]
      },
      exportAs: ["cAlign"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AlignDirective, [{
    type: Directive,
    args: [{
      selector: "[cAlign]",
      exportAs: "cAlign",
      host: {
        "[class]": "hostClasses()"
      }
    }]
  }], null, null);
})();
var BgColorDirective = class _BgColorDirective {
  constructor() {
    this.cBgColor = input("");
    this.gradient = input();
    this.hostClasses = computed(() => {
      const color = this.cBgColor();
      return {
        [`bg-${color}`]: !!color,
        "bg-gradient": this.gradient()
      };
    });
  }
  static {
    this.ɵfac = function BgColorDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BgColorDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _BgColorDirective,
      selectors: [["", "cBgColor", ""]],
      hostVars: 2,
      hostBindings: function BgColorDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        cBgColor: [1, "cBgColor"],
        gradient: [1, "gradient"]
      },
      exportAs: ["cBgColor"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BgColorDirective, [{
    type: Directive,
    args: [{
      selector: "[cBgColor]",
      exportAs: "cBgColor",
      host: {
        "[class]": "hostClasses()"
      }
    }]
  }], null, null);
})();
var BorderDirective = class _BorderDirective {
  constructor() {
    this.cBorder = input(true);
    this.hostClasses = computed(() => {
      const border = this.cBorder();
      if (typeof border === "boolean") {
        return {
          border
        };
      }
      if (typeof border === "number" || typeof border === "string") {
        return {
          border: true,
          [`border-${border}`]: true
        };
      }
      if (typeof border === "object") {
        const borderObj = __spreadValues({
          top: void 0,
          end: void 0,
          bottom: void 0,
          start: void 0,
          color: void 0
        }, border);
        const keys = Object.keys(borderObj).filter((key) => borderObj[key] !== void 0);
        const classes = {};
        keys.forEach((key) => {
          const val = borderObj[key];
          if (typeof val === "boolean") {
            classes[`border-${key}`] = true;
          } else if (typeof val === "number" || typeof val === "string") {
            classes[`border-${key}-${val}`] = true;
          } else if (typeof val === "object") {
            if ("color" in val) {
              classes[`border-${key}-${val.color}`] = true;
            }
            if ("width" in val) {
              classes[`border-${key}-${val.width}`] = true;
            }
          }
        });
        return Object.entries(classes).length === 0 ? {
          border: false
        } : classes;
      }
      return {
        border: false
      };
    });
  }
  static {
    this.ɵfac = function BorderDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BorderDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _BorderDirective,
      selectors: [["", "cBorder", ""]],
      hostVars: 2,
      hostBindings: function BorderDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        cBorder: [1, "cBorder"]
      },
      exportAs: ["cBorder"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BorderDirective, [{
    type: Directive,
    args: [{
      selector: "[cBorder]",
      exportAs: "cBorder",
      host: {
        "[class]": "hostClasses()"
      }
    }]
  }], null, null);
})();
var RoundedDirective = class _RoundedDirective {
  constructor() {
    this.cRounded = input(true);
    this.hostClasses = computed(() => {
      const rounded = this.cRounded();
      if (typeof rounded === "boolean") {
        return {
          rounded
        };
      }
      if (typeof rounded === "number" || typeof rounded === "string") {
        return {
          [`rounded-${rounded}`]: true
        };
      }
      if (typeof rounded === "object") {
        const roundedObj = __spreadValues({
          top: void 0,
          end: void 0,
          bottom: void 0,
          start: void 0,
          circle: void 0,
          pill: void 0,
          size: void 0
        }, rounded);
        const keys = Object.keys(roundedObj).filter((key) => roundedObj[key] !== void 0);
        const classes = {};
        keys.forEach((key) => {
          const val = roundedObj[key];
          if (typeof val === "boolean") {
            classes[`rounded-${key}`] = val;
          } else {
            classes[`rounded-${val}`] = true;
          }
        });
        return Object.entries(classes).length === 0 ? {
          rounded: false
        } : classes;
      }
      return {
        rounded: false
      };
    });
  }
  static {
    this.ɵfac = function RoundedDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RoundedDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _RoundedDirective,
      selectors: [["", "cRounded", ""]],
      hostVars: 2,
      hostBindings: function RoundedDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        cRounded: [1, "cRounded"]
      },
      exportAs: ["cRounded"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RoundedDirective, [{
    type: Directive,
    args: [{
      selector: "[cRounded]",
      exportAs: "cRounded",
      host: {
        "[class]": "hostClasses()"
      }
    }]
  }], null, null);
})();
var ShadowOnScrollDirective = class _ShadowOnScrollDirective {
  #destroyRef;
  #document;
  #elementRef;
  #scrolled;
  #scrollEffect;
  #observable;
  #shadowClass;
  constructor() {
    this.#destroyRef = inject(DestroyRef);
    this.#document = inject(DOCUMENT);
    this.#elementRef = inject(ElementRef);
    this.#scrolled = signal(false);
    this.#scrollEffect = effect(() => {
      this.#elementRef.nativeElement.classList.toggle(this.#shadowClass, this.#scrolled());
    });
    this.#shadowClass = "shadow-sm";
    this.cShadowOnScroll = input(true);
    this.#shadowOnScrollEffect = effect(() => {
      const value = this.cShadowOnScroll();
      untracked(() => {
        this.#scrolled.set(false);
        if (value) {
          this.#shadowClass = value === true ? "shadow" : `shadow-${value}`;
          this.#observable = fromEvent(this.#document, "scroll").pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((scrolled) => {
            this.#scrolled.set(this.#document.documentElement.scrollTop > 0);
          });
        } else {
          this.#observable?.unsubscribe();
        }
      });
    });
    this.#destroyRef.onDestroy(() => {
      this.#scrollEffect?.destroy();
    });
  }
  #shadowOnScrollEffect;
  static {
    this.ɵfac = function ShadowOnScrollDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ShadowOnScrollDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _ShadowOnScrollDirective,
      selectors: [["", "cShadowOnScroll", ""]],
      inputs: {
        cShadowOnScroll: [1, "cShadowOnScroll"]
      },
      exportAs: ["cShadowOnScroll"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShadowOnScrollDirective, [{
    type: Directive,
    args: [{
      selector: "[cShadowOnScroll]",
      exportAs: "cShadowOnScroll"
    }]
  }], () => [], null);
})();
var TextColorDirective = class _TextColorDirective {
  constructor() {
    this.color = input("", {
      alias: "cTextColor"
    });
    this.hostClasses = computed(() => {
      const color = this.color();
      return {
        [`text-${color}`]: !!color
      };
    });
  }
  static {
    this.ɵfac = function TextColorDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TextColorDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TextColorDirective,
      selectors: [["", "cTextColor", ""]],
      hostVars: 2,
      hostBindings: function TextColorDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        color: [1, "cTextColor", "color"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TextColorDirective, [{
    type: Directive,
    args: [{
      selector: "[cTextColor]",
      host: {
        "[class]": "hostClasses()"
      }
    }]
  }], null, null);
})();
var TextBgColorDirective = class _TextBgColorDirective {
  constructor() {
    this.textBgColor = input("", {
      alias: "cTextBgColor"
    });
    this.hostClasses = computed(() => {
      const color = this.textBgColor();
      return {
        [`text-bg-${color}`]: !!color
      };
    });
  }
  static {
    this.ɵfac = function TextBgColorDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TextBgColorDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TextBgColorDirective,
      selectors: [["", "cTextBgColor", ""]],
      hostVars: 2,
      hostBindings: function TextBgColorDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        textBgColor: [1, "cTextBgColor", "textBgColor"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TextBgColorDirective, [{
    type: Directive,
    args: [{
      selector: "[cTextBgColor]",
      host: {
        "[class]": "hostClasses()"
      }
    }]
  }], null, null);
})();
var UTILITY_DIRECTIVES = [AlignDirective, BgColorDirective, BorderDirective, RoundedDirective, ShadowOnScrollDirective, TextColorDirective, TextBgColorDirective];
var UtilitiesModule = class _UtilitiesModule {
  static {
    this.ɵfac = function UtilitiesModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UtilitiesModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _UtilitiesModule,
      imports: [AlignDirective, BgColorDirective, BorderDirective, RoundedDirective, ShadowOnScrollDirective, TextColorDirective, TextBgColorDirective],
      exports: [AlignDirective, BgColorDirective, BorderDirective, RoundedDirective, ShadowOnScrollDirective, TextColorDirective, TextBgColorDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UtilitiesModule, [{
    type: NgModule,
    args: [{
      imports: [...UTILITY_DIRECTIVES],
      exports: [...UTILITY_DIRECTIVES]
    }]
  }], null, null);
})();
var AvatarComponent = class _AvatarComponent {
  constructor() {
    this.color = input();
    this.shape = input();
    this.size = input("md");
    this.alt = input("");
    this.src = input();
    this.status = input();
    this.textColor = input();
    this.statusClass = computed(() => {
      return {
        "avatar-status": true,
        [`bg-${this.status()}`]: !!this.status()
      };
    });
    this.hostClasses = computed(() => {
      return {
        avatar: true,
        [`avatar-${this.size()}`]: !!this.size(),
        [`bg-${this.color()}`]: !!this.color(),
        [`${this.shape()}`]: !!this.shape()
      };
    });
  }
  static {
    this.ɵfac = function AvatarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AvatarComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _AvatarComponent,
      selectors: [["c-avatar"]],
      hostAttrs: [1, "avatar"],
      hostVars: 2,
      hostBindings: function AvatarComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        color: [1, "color"],
        shape: [1, "shape"],
        size: [1, "size"],
        alt: [1, "alt"],
        src: [1, "src"],
        status: [1, "status"],
        textColor: [1, "textColor"]
      },
      features: [ɵɵHostDirectivesFeature([{
        directive: TextColorDirective,
        inputs: ["cTextColor", "textColor"]
      }])],
      ngContentSelectors: _c0,
      decls: 3,
      vars: 1,
      consts: [[3, "ngClass"], [1, "avatar-img", 3, "src", "alt"], ["aria-label", "Avatar placeholder", "focusable", "false", "preserveAspectRatio", "xMidYMid slice", "role", "img", "xmlns", "http://www.w3.org/2000/svg", 1, "avatar-img", 2, "position", "absolute", "width", "100%", "height", "100%", "inset", "0"], ["fill", "#868e96", "height", "100%", "width", "100%"]],
      template: function AvatarComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0, 0, null, AvatarComponent_ProjectionFallback_0_Template, 1, 1);
          ɵɵtemplate(2, AvatarComponent_Conditional_2_Template, 1, 1, "span", 0);
        }
        if (rf & 2) {
          ɵɵadvance(2);
          ɵɵconditional(!!ctx.status() ? 2 : -1);
        }
      },
      dependencies: [NgClass],
      styles: ["[_nghost-%COMP%]   .avatar-img[_ngcontent-%COMP%]{object-fit:cover}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AvatarComponent, [{
    type: Component,
    args: [{
      selector: "c-avatar",
      imports: [NgClass],
      hostDirectives: [{
        directive: TextColorDirective,
        inputs: ["cTextColor: textColor"]
      }],
      host: {
        class: "avatar",
        "[class]": "hostClasses()"
      },
      template: `<ng-content>
  @if (src()) {
    @defer (prefetch on idle) {
      <img src="{{src() ?? ''}}" class="avatar-img" alt="{{alt()}}" />
    } @placeholder () {
      <svg aria-label="Avatar placeholder"
           focusable="false"
           preserveAspectRatio="xMidYMid slice"
           role="img"
           xmlns="http://www.w3.org/2000/svg"
           class="avatar-img"
           style="position: absolute; width: 100%; height: 100%; inset: 0;">
        <rect fill="#868e96" height="100%" width="100%"></rect>
      </svg>
    }
  }
</ng-content>
@if (!!status()) {
  <span [ngClass]="statusClass()"></span>
}

`,
      styles: [":host .avatar-img{object-fit:cover}\n"]
    }]
  }], null, null);
})();
var AvatarModule = class _AvatarModule {
  static {
    this.ɵfac = function AvatarModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AvatarModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _AvatarModule,
      imports: [AvatarComponent],
      exports: [AvatarComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AvatarModule, [{
    type: NgModule,
    args: [{
      imports: [AvatarComponent],
      exports: [AvatarComponent]
    }]
  }], null, null);
})();
var BadgeComponent = class _BadgeComponent {
  constructor() {
    this.color = input();
    this.position = input();
    this.shape = input();
    this.size = input();
    this.textColor = input();
    this.textBgColor = input();
    this.hostClasses = computed(() => {
      const position = this.position();
      const positionClasses = {
        "position-absolute": !!position,
        "translate-middle": !!position,
        "top-0": position?.includes("top"),
        "top-100": position?.includes("bottom"),
        "start-100": position?.includes("end"),
        "start-0": position?.includes("start")
      };
      return Object.assign({
        badge: true,
        [`bg-${this.color()}`]: !!this.color(),
        [`badge-${this.size()}`]: !!this.size(),
        [`${this.shape()}`]: !!this.shape()
      }, !!position ? positionClasses : {});
    });
  }
  static {
    this.ɵfac = function BadgeComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BadgeComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _BadgeComponent,
      selectors: [["c-badge"]],
      hostAttrs: [1, "badge"],
      hostVars: 2,
      hostBindings: function BadgeComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        color: [1, "color"],
        position: [1, "position"],
        shape: [1, "shape"],
        size: [1, "size"],
        textColor: [1, "textColor"],
        textBgColor: [1, "textBgColor"]
      },
      features: [ɵɵHostDirectivesFeature([{
        directive: TextColorDirective,
        inputs: ["cTextColor", "textColor"]
      }, {
        directive: TextBgColorDirective,
        inputs: ["cTextBgColor", "textBgColor"]
      }])],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function BadgeComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BadgeComponent, [{
    type: Component,
    args: [{
      selector: "c-badge",
      template: "<ng-content />",
      hostDirectives: [{
        directive: TextColorDirective,
        inputs: ["cTextColor: textColor"]
      }, {
        directive: TextBgColorDirective,
        inputs: ["cTextBgColor: textBgColor"]
      }],
      host: {
        class: "badge",
        "[class]": "hostClasses()"
      }
    }]
  }], null, null);
})();
var BadgeModule = class _BadgeModule {
  static {
    this.ɵfac = function BadgeModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BadgeModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _BadgeModule,
      imports: [BadgeComponent],
      exports: [BadgeComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BadgeModule, [{
    type: NgModule,
    args: [{
      imports: [BadgeComponent],
      exports: [BadgeComponent]
    }]
  }], null, null);
})();
var BackdropService = class _BackdropService {
  constructor() {
    this.#backdropClick = new Subject();
    this.backdropClick$ = this.#backdropClick.asObservable();
    this.#document = inject(DOCUMENT);
    this.#rendererFactory = inject(RendererFactory2);
    this.#renderer = this.#rendererFactory.createRenderer(null, null);
    this.scrollbarWidth = this.#scrollbarWidth;
    this.#scrollBarVisible = true;
  }
  #backdropClick;
  #document;
  #rendererFactory;
  #renderer;
  #unListen;
  get #scrollbarWidth() {
    const documentWidth = this.#document.documentElement.clientWidth;
    const scrollbarWidth = Math.abs((this.#document.defaultView?.innerWidth ?? documentWidth) - documentWidth);
    return `${scrollbarWidth}px`;
  }
  setBackdrop(type = "modal") {
    const backdropElement = this.#renderer.createElement("div");
    this.#renderer.addClass(backdropElement, `${type}-backdrop`);
    this.#renderer.addClass(backdropElement, "fade");
    this.#renderer.appendChild(this.#document.body, backdropElement);
    this.#unListen = this.#renderer.listen(backdropElement, "click", (e) => {
      this.onClickHandler();
    });
    this.scrollbarWidth = this.#scrollbarWidth;
    setTimeout(() => {
      this.#renderer.addClass(backdropElement, "show");
    });
    this.activeBackdrop = backdropElement;
    return backdropElement;
  }
  clearBackdrop(backdropElement) {
    if (backdropElement) {
      this.#unListen();
      this.#renderer.removeClass(backdropElement, "show");
      setTimeout(() => {
        if (this.activeBackdrop === backdropElement) {
          this.resetScrollbar();
        }
        this.#renderer.removeChild(this.#document.body, backdropElement);
        backdropElement = void 0;
      }, 300);
    }
    return void 0;
  }
  get #isRTL() {
    return [this.#document.documentElement.dir, this.#document.body.dir].includes("rtl");
  }
  #scrollBarVisible;
  hideScrollbar() {
    if (this.#scrollBarVisible) {
      this.#renderer.setStyle(this.#document.body, "overflow", "hidden");
      this.#renderer.setStyle(this.#document.body, `padding-${this.#isRTL ? "left" : "right"}`, this.scrollbarWidth);
      this.#scrollBarVisible = false;
    }
  }
  resetScrollbar() {
    this.#renderer.removeStyle(this.#document.body, "overflow");
    this.#renderer.removeStyle(this.#document.body, `padding-${this.#isRTL ? "left" : "right"}`);
    this.#scrollBarVisible = true;
  }
  onClickHandler() {
    this.#backdropClick.next(true);
  }
  static {
    this.ɵfac = function BackdropService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BackdropService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _BackdropService,
      factory: _BackdropService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BackdropService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var BreadcrumbItemComponent = class _BreadcrumbItemComponent {
  constructor() {
    this.active = input(void 0, {
      transform: booleanAttribute
    });
    this.url = input();
    this.attributes = input();
    this.linkProps = input();
    this.ariaCurrent = computed(() => {
      return this.active() ? "page" : null;
    });
    this.hostClasses = computed(() => {
      return {
        "breadcrumb-item": true,
        active: this.active()
      };
    });
  }
  static {
    this.ɵfac = function BreadcrumbItemComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BreadcrumbItemComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _BreadcrumbItemComponent,
      selectors: [["c-breadcrumb-item"]],
      hostVars: 3,
      hostBindings: function BreadcrumbItemComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("aria-current", ctx.ariaCurrent());
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        active: [1, "active"],
        url: [1, "url"],
        attributes: [1, "attributes"],
        linkProps: [1, "linkProps"]
      },
      exportAs: ["breadcrumbItem"],
      ngContentSelectors: _c0,
      decls: 4,
      vars: 1,
      consts: [["defaultBreadcrumbItemContentTemplate", ""], [3, "routerLink", "cHtmlAttr", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state"], [3, "cHtmlAttr"], [4, "ngTemplateOutlet"]],
      template: function BreadcrumbItemComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵtemplate(0, BreadcrumbItemComponent_Conditional_0_Template, 2, 13, "a", 1)(1, BreadcrumbItemComponent_Conditional_1_Template, 2, 3, "span", 2)(2, BreadcrumbItemComponent_ng_template_2_Template, 1, 0, "ng-template", null, 0, ɵɵtemplateRefExtractor);
        }
        if (rf & 2) {
          ɵɵconditional(!ctx.active() ? 0 : 1);
        }
      },
      dependencies: [RouterModule, RouterLink, NgTemplateOutlet, HtmlAttributesDirective],
      styles: ["[_nghost-%COMP%]{display:list-item;text-align:-webkit-match-parent;text-align:match-parent}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BreadcrumbItemComponent, [{
    type: Component,
    args: [{
      selector: "c-breadcrumb-item",
      imports: [RouterModule, NgTemplateOutlet, HtmlAttributesDirective],
      exportAs: "breadcrumbItem",
      host: {
        "[attr.aria-current]": "ariaCurrent()",
        "[class]": "hostClasses()"
      },
      template: `@if (!active()) {
  <a [routerLink]="url()"
     [cHtmlAttr]="attributes() ?? {}"
     [target]="attributes()?.['target']"
     [queryParams]="linkProps()?.queryParams ?? null"
     [fragment]="linkProps()?.fragment"
     [queryParamsHandling]="linkProps()?.queryParamsHandling ?? null"
     [preserveFragment]="linkProps()?.preserveFragment ?? false"
     [skipLocationChange]="linkProps()?.skipLocationChange ?? false"
     [replaceUrl]="linkProps()?.replaceUrl ?? false"
     [state]="linkProps()?.state ?? {}"
  >
    <ng-container *ngTemplateOutlet="defaultBreadcrumbItemContentTemplate" />
  </a>
} @else {
  <span [cHtmlAttr]="attributes() ?? {}">
      <ng-container *ngTemplateOutlet="defaultBreadcrumbItemContentTemplate" />
  </span>
}

<ng-template #defaultBreadcrumbItemContentTemplate>
  <ng-content />
</ng-template>
`,
      styles: [":host{display:list-item;text-align:-webkit-match-parent;text-align:match-parent}\n"]
    }]
  }], null, null);
})();
var BreadcrumbComponent = class _BreadcrumbComponent {
  constructor() {
    this.ariaLabel = input("breadcrumb");
    this.role = input("navigation");
  }
  static {
    this.ɵfac = function BreadcrumbComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BreadcrumbComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _BreadcrumbComponent,
      selectors: [["c-breadcrumb"]],
      hostAttrs: [1, "breadcrumb"],
      hostVars: 2,
      hostBindings: function BreadcrumbComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("aria-label", ctx.ariaLabel())("role", ctx.role());
        }
      },
      inputs: {
        ariaLabel: [1, "ariaLabel"],
        role: [1, "role"]
      },
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function BreadcrumbComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BreadcrumbComponent, [{
    type: Component,
    args: [{
      selector: "c-breadcrumb",
      template: "<ng-content />",
      host: {
        class: "breadcrumb",
        "[attr.aria-label]": "ariaLabel()",
        "[attr.role]": "role()"
      }
    }]
  }], null, null);
})();
var BreadcrumbRouterService = class _BreadcrumbRouterService {
  #router;
  #activatedRoute;
  #breadcrumbsBehaviorSubject;
  constructor() {
    this.#router = inject(Router);
    this.#activatedRoute = inject(ActivatedRoute);
    this.outlet = "primary";
    this.#breadcrumbsBehaviorSubject = new BehaviorSubject(new Array());
    this.breadcrumbs$ = this.#breadcrumbsBehaviorSubject.asObservable();
    this.#router.events.pipe(takeUntilDestroyed(), filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      const breadcrumbs = [];
      let currentRoute = this.#activatedRoute.root;
      let url = "";
      do {
        const childrenRoutes = currentRoute.children;
        currentRoute = null;
        childrenRoutes.forEach((childRoute) => {
          if (childRoute.outlet === this.outlet) {
            const routeSnapshot = childRoute.snapshot;
            url += "/" + routeSnapshot.url.map((segment) => segment.path).join("/");
            breadcrumbs.push({
              label: routeSnapshot.data["title"] ?? routeSnapshot.title ?? "",
              url,
              queryParams: routeSnapshot.queryParams
            });
            currentRoute = childRoute;
          }
        });
      } while (currentRoute);
      this.#breadcrumbsBehaviorSubject.next(Object.assign([], breadcrumbs));
      return breadcrumbs;
    });
  }
  static {
    this.ɵfac = function BreadcrumbRouterService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BreadcrumbRouterService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _BreadcrumbRouterService,
      factory: _BreadcrumbRouterService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BreadcrumbRouterService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var BreadcrumbRouterComponent = class _BreadcrumbRouterComponent {
  constructor() {
    this.service = inject(BreadcrumbRouterService);
    this.items = input();
    this.setup = effect(() => {
      const items = this.items();
      if (items && items.length > 0) {
        this.breadcrumbs = new Observable((observer) => {
          const itemsValue = this.items();
          if (itemsValue) {
            observer.next(itemsValue);
          }
        });
      }
    });
  }
  ngOnInit() {
    this.breadcrumbs = this.service.breadcrumbs$;
  }
  ngOnDestroy() {
    this.breadcrumbs = void 0;
  }
  static {
    this.ɵfac = function BreadcrumbRouterComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BreadcrumbRouterComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _BreadcrumbRouterComponent,
      selectors: [["c-breadcrumb-router"], ["", "cBreadcrumbRouter", ""]],
      inputs: {
        items: [1, "items"]
      },
      decls: 4,
      vars: 2,
      consts: [[1, "m-0"], [3, "active", "url", "attributes", "linkProps"]],
      template: function BreadcrumbRouterComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "c-breadcrumb", 0);
          ɵɵrepeaterCreate(1, BreadcrumbRouterComponent_For_2_Template, 1, 1, null, null, ɵɵrepeaterTrackByIdentity);
          ɵɵpipe(3, "async");
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵadvance();
          ɵɵrepeater(ɵɵpipeBind1(3, 0, ctx.breadcrumbs));
        }
      },
      dependencies: [BreadcrumbComponent, BreadcrumbItemComponent, AsyncPipe],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BreadcrumbRouterComponent, [{
    type: Component,
    args: [{
      selector: "c-breadcrumb-router, [cBreadcrumbRouter]",
      imports: [BreadcrumbComponent, BreadcrumbItemComponent, AsyncPipe],
      template: `<c-breadcrumb class="m-0">
  @for (breadcrumb of breadcrumbs | async; track breadcrumb; let last = $last) {
    @if (breadcrumb?.label && (breadcrumb?.url?.slice(-1) === '/' || last)) {
      <c-breadcrumb-item
        [active]="last"
        [url]="breadcrumb?.url"
        [attributes]="breadcrumb?.attributes"
        [linkProps]="breadcrumb?.linkProps"
      >
        {{ breadcrumb?.label }}
      </c-breadcrumb-item>
    }
  }
</c-breadcrumb>
`
    }]
  }], null, null);
})();
var BreadcrumbModule = class _BreadcrumbModule {
  static {
    this.ɵfac = function BreadcrumbModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BreadcrumbModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _BreadcrumbModule,
      imports: [BreadcrumbComponent, BreadcrumbItemComponent, BreadcrumbRouterComponent],
      exports: [BreadcrumbComponent, BreadcrumbItemComponent, BreadcrumbRouterComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      providers: [BreadcrumbRouterService],
      imports: [BreadcrumbItemComponent, BreadcrumbRouterComponent]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BreadcrumbModule, [{
    type: NgModule,
    args: [{
      imports: [BreadcrumbComponent, BreadcrumbItemComponent, BreadcrumbRouterComponent],
      exports: [BreadcrumbComponent, BreadcrumbItemComponent, BreadcrumbRouterComponent],
      providers: [BreadcrumbRouterService]
    }]
  }], null, null);
})();
var ButtonGroupComponent = class _ButtonGroupComponent {
  constructor() {
    this.size = input();
    this.vertical = input(false, {
      transform: booleanAttribute
    });
    this.role = input("group");
    this.hostClasses = computed(() => {
      return {
        "btn-group": !this.vertical(),
        "btn-group-vertical": this.vertical(),
        [`btn-group-${this.size()}`]: !!this.size()
      };
    });
  }
  static {
    this.ɵfac = function ButtonGroupComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ButtonGroupComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ButtonGroupComponent,
      selectors: [["c-button-group"]],
      hostVars: 3,
      hostBindings: function ButtonGroupComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("role", ctx.role());
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        size: [1, "size"],
        vertical: [1, "vertical"],
        role: [1, "role"]
      },
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function ButtonGroupComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonGroupComponent, [{
    type: Component,
    args: [{
      selector: "c-button-group",
      template: "<ng-content />",
      host: {
        "[attr.role]": "role()",
        "[class]": "hostClasses()"
      }
    }]
  }], null, null);
})();
var ButtonToolbarComponent = class _ButtonToolbarComponent {
  constructor() {
    this.role = input("toolbar");
  }
  static {
    this.ɵfac = function ButtonToolbarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ButtonToolbarComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ButtonToolbarComponent,
      selectors: [["c-button-toolbar"]],
      hostAttrs: [1, "btn-toolbar"],
      hostVars: 1,
      hostBindings: function ButtonToolbarComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("role", ctx.role());
        }
      },
      inputs: {
        role: [1, "role"]
      },
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function ButtonToolbarComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonToolbarComponent, [{
    type: Component,
    args: [{
      selector: "c-button-toolbar",
      template: "<ng-content />",
      host: {
        class: "btn-toolbar",
        "[attr.role]": "role()"
      }
    }]
  }], null, null);
})();
var ButtonGroupModule = class _ButtonGroupModule {
  static {
    this.ɵfac = function ButtonGroupModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ButtonGroupModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _ButtonGroupModule,
      imports: [ButtonGroupComponent, ButtonToolbarComponent],
      exports: [ButtonGroupComponent, ButtonToolbarComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonGroupModule, [{
    type: NgModule,
    args: [{
      imports: [ButtonGroupComponent, ButtonToolbarComponent],
      exports: [ButtonGroupComponent, ButtonToolbarComponent]
    }]
  }], null, null);
})();
var CalloutComponent = class _CalloutComponent {
  constructor() {
    this.color = input();
    this.hostClasses = computed(() => {
      const color = this.color();
      return {
        callout: true,
        [`callout-${color}`]: !!color
      };
    });
  }
  static {
    this.ɵfac = function CalloutComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CalloutComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _CalloutComponent,
      selectors: [["c-callout"], ["", "cCallout", ""]],
      hostAttrs: [1, "callout"],
      hostVars: 2,
      hostBindings: function CalloutComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        color: [1, "color"]
      },
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function CalloutComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      styles: ["[_nghost-%COMP%]{display:block}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalloutComponent, [{
    type: Component,
    args: [{
      selector: "c-callout, [cCallout]",
      template: "<ng-content />",
      host: {
        class: "callout",
        "[class]": "hostClasses()"
      },
      styles: [":host{display:block}\n"]
    }]
  }], null, null);
})();
var CalloutModule = class _CalloutModule {
  static {
    this.ɵfac = function CalloutModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CalloutModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _CalloutModule,
      imports: [CalloutComponent],
      exports: [CalloutComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalloutModule, [{
    type: NgModule,
    args: [{
      exports: [CalloutComponent],
      imports: [CalloutComponent]
    }]
  }], null, null);
})();
var CardComponent = class _CardComponent {
  constructor() {
    this.color = input();
    this.textColor = input();
    this.textBgColor = input();
    this.hostClasses = computed(() => {
      const color = this.color();
      return {
        card: true,
        [`bg-${color}`]: !!color
      };
    });
  }
  static {
    this.ɵfac = function CardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CardComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _CardComponent,
      selectors: [["c-card"], ["", "c-card", ""]],
      hostAttrs: [1, "card"],
      hostVars: 2,
      hostBindings: function CardComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        color: [1, "color"],
        textColor: [1, "textColor"],
        textBgColor: [1, "textBgColor"]
      },
      features: [ɵɵHostDirectivesFeature([{
        directive: TextColorDirective,
        inputs: ["cTextColor", "textColor"]
      }, {
        directive: TextBgColorDirective,
        inputs: ["cTextBgColor", "textBgColor"]
      }])],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function CardComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CardComponent, [{
    type: Component,
    args: [{
      selector: "c-card, [c-card]",
      template: "<ng-content />",
      hostDirectives: [{
        directive: TextColorDirective,
        inputs: ["cTextColor: textColor"]
      }, {
        directive: TextBgColorDirective,
        inputs: ["cTextBgColor: textBgColor"]
      }],
      host: {
        class: "card",
        "[class]": "hostClasses()"
      }
    }]
  }], null, null);
})();
var CardBodyComponent = class _CardBodyComponent {
  static {
    this.ɵfac = function CardBodyComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CardBodyComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _CardBodyComponent,
      selectors: [["c-card-body"], ["", "c-card-body", ""]],
      hostAttrs: [1, "card-body"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function CardBodyComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CardBodyComponent, [{
    type: Component,
    args: [{
      selector: "c-card-body, [c-card-body]",
      template: "<ng-content />",
      host: {
        class: "card-body"
      }
    }]
  }], null, null);
})();
var CardFooterComponent = class _CardFooterComponent {
  static {
    this.ɵfac = function CardFooterComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CardFooterComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _CardFooterComponent,
      selectors: [["c-card-footer"], ["", "c-card-footer", ""]],
      hostAttrs: [1, "card-footer"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function CardFooterComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CardFooterComponent, [{
    type: Component,
    args: [{
      selector: "c-card-footer, [c-card-footer]",
      template: "<ng-content />",
      host: {
        class: "card-footer"
      }
    }]
  }], null, null);
})();
var CardGroupComponent = class _CardGroupComponent {
  static {
    this.ɵfac = function CardGroupComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CardGroupComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _CardGroupComponent,
      selectors: [["c-card-group"], ["", "c-card-group", ""]],
      hostAttrs: [1, "card-group"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function CardGroupComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CardGroupComponent, [{
    type: Component,
    args: [{
      selector: "c-card-group, [c-card-group]",
      template: "<ng-content />",
      host: {
        class: "card-group"
      }
    }]
  }], null, null);
})();
var CardHeaderComponent = class _CardHeaderComponent {
  static {
    this.ɵfac = function CardHeaderComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CardHeaderComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _CardHeaderComponent,
      selectors: [["c-card-header"], ["", "c-card-header", ""]],
      hostAttrs: [1, "card-header"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function CardHeaderComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CardHeaderComponent, [{
    type: Component,
    args: [{
      selector: "c-card-header, [c-card-header]",
      template: "<ng-content />",
      host: {
        class: "card-header"
      }
    }]
  }], null, null);
})();
var CardHeaderActionsComponent = class _CardHeaderActionsComponent {
  static {
    this.ɵfac = function CardHeaderActionsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CardHeaderActionsComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _CardHeaderActionsComponent,
      selectors: [["c-card-header-actions"], ["", "c-card-header-actions", ""]],
      hostAttrs: [1, "card-header-actions"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function CardHeaderActionsComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CardHeaderActionsComponent, [{
    type: Component,
    args: [{
      selector: "c-card-header-actions, [c-card-header-actions]",
      template: "<ng-content />",
      host: {
        class: "card-header-actions"
      }
    }]
  }], null, null);
})();
var CardImgDirective = class _CardImgDirective {
  constructor() {
    this.orientation = input(void 0, {
      alias: "cCardImg"
    });
    this.hostClasses = computed(() => {
      const orientation = this.orientation();
      const suffix = !!orientation ? `-${orientation}` : "";
      const horizontal = ["start", "end"].includes(orientation ?? "-") ? orientation : void 0;
      return {
        [`card-img${suffix}`]: !horizontal,
        "img-fluid": !!horizontal,
        [`rounded-${horizontal}`]: !!horizontal
      };
    });
  }
  static {
    this.ɵfac = function CardImgDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CardImgDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _CardImgDirective,
      selectors: [["", "cCardImg", ""]],
      hostVars: 2,
      hostBindings: function CardImgDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        orientation: [1, "cCardImg", "orientation"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CardImgDirective, [{
    type: Directive,
    args: [{
      selector: "[cCardImg]",
      host: {
        "[class]": "hostClasses()"
      }
    }]
  }], null, null);
})();
var CardImgOverlayComponent = class _CardImgOverlayComponent {
  static {
    this.ɵfac = function CardImgOverlayComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CardImgOverlayComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _CardImgOverlayComponent,
      selectors: [["c-card-img-overlay"]],
      hostAttrs: [1, "card-img-overlay"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function CardImgOverlayComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      styles: ["[_nghost-%COMP%]{display:block}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CardImgOverlayComponent, [{
    type: Component,
    args: [{
      selector: "c-card-img-overlay",
      template: "<ng-content />",
      host: {
        class: "card-img-overlay"
      },
      styles: [":host{display:block}\n"]
    }]
  }], null, null);
})();
var CardLinkDirective = class _CardLinkDirective {
  static {
    this.ɵfac = function CardLinkDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CardLinkDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _CardLinkDirective,
      selectors: [["", "cCardLink", ""]],
      hostAttrs: [1, "card-link"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CardLinkDirective, [{
    type: Directive,
    args: [{
      selector: "[cCardLink]",
      host: {
        class: "card-link"
      }
    }]
  }], null, null);
})();
var CardSubtitleDirective = class _CardSubtitleDirective {
  static {
    this.ɵfac = function CardSubtitleDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CardSubtitleDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _CardSubtitleDirective,
      selectors: [["", "cCardSubtitle", ""]],
      hostAttrs: [1, "card-subtitle"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CardSubtitleDirective, [{
    type: Directive,
    args: [{
      selector: "[cCardSubtitle]",
      host: {
        class: "card-subtitle"
      }
    }]
  }], null, null);
})();
var CardTextDirective = class _CardTextDirective {
  static {
    this.ɵfac = function CardTextDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CardTextDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _CardTextDirective,
      selectors: [["", "cCardText", ""]],
      hostAttrs: [1, "card-text"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CardTextDirective, [{
    type: Directive,
    args: [{
      selector: "[cCardText]",
      host: {
        class: "card-text"
      }
    }]
  }], null, null);
})();
var CardTitleDirective = class _CardTitleDirective {
  static {
    this.ɵfac = function CardTitleDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CardTitleDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _CardTitleDirective,
      selectors: [["", "cCardTitle", ""]],
      hostAttrs: [1, "card-title"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CardTitleDirective, [{
    type: Directive,
    args: [{
      selector: "[cCardTitle]",
      host: {
        class: "card-title"
      }
    }]
  }], null, null);
})();
var CardModule = class _CardModule {
  static {
    this.ɵfac = function CardModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CardModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _CardModule,
      imports: [CardComponent, CardBodyComponent, CardFooterComponent, CardGroupComponent, CardHeaderComponent, CardHeaderActionsComponent, CardImgDirective, CardImgOverlayComponent, CardLinkDirective, CardSubtitleDirective, CardTextDirective, CardTitleDirective],
      exports: [CardComponent, CardBodyComponent, CardFooterComponent, CardGroupComponent, CardHeaderComponent, CardHeaderActionsComponent, CardImgDirective, CardImgOverlayComponent, CardLinkDirective, CardSubtitleDirective, CardTextDirective, CardTitleDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CardModule, [{
    type: NgModule,
    args: [{
      imports: [CardComponent, CardBodyComponent, CardFooterComponent, CardGroupComponent, CardHeaderComponent, CardHeaderActionsComponent, CardImgDirective, CardImgOverlayComponent, CardLinkDirective, CardSubtitleDirective, CardTextDirective, CardTitleDirective],
      exports: [CardComponent, CardBodyComponent, CardFooterComponent, CardGroupComponent, CardHeaderComponent, CardHeaderActionsComponent, CardImgDirective, CardImgOverlayComponent, CardLinkDirective, CardSubtitleDirective, CardTextDirective, CardTitleDirective]
    }]
  }], null, null);
})();
var IntersectionService = class _IntersectionService {
  constructor() {
    this.platformId = inject(PLATFORM_ID);
    this.#intersecting = new BehaviorSubject({
      isIntersecting: false
    });
    this.intersecting$ = this.#intersecting.asObservable();
    this.defaultObserverOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2
    };
    this.hostElementRefs = /* @__PURE__ */ new Map();
  }
  #intersecting;
  createIntersectionObserver(hostElement, observerOptions = this.defaultObserverOptions) {
    if (isPlatformServer(this.platformId)) {
      this.#intersecting.next({
        isIntersecting: true,
        hostElement
      });
      return;
    }
    const options = __spreadValues(__spreadValues({}, this.defaultObserverOptions), observerOptions);
    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        this.#intersecting.next({
          isIntersecting: entry.isIntersecting,
          hostElement
        });
      });
    };
    this.hostElementRefs.set(hostElement, new IntersectionObserver(handleIntersect, options));
    this.hostElementRefs.get(hostElement)?.observe(hostElement.nativeElement);
  }
  unobserve(elementRef) {
    this.hostElementRefs.get(elementRef)?.unobserve(elementRef.nativeElement);
    this.hostElementRefs.set(elementRef, null);
    this.hostElementRefs.delete(elementRef);
  }
  ngOnDestroy() {
    this.hostElementRefs.forEach((observer, elementRef) => {
      observer?.unobserve(elementRef.nativeElement);
    });
  }
  static {
    this.ɵfac = function IntersectionService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _IntersectionService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _IntersectionService,
      factory: _IntersectionService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IntersectionService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var ListenersService = class _ListenersService {
  constructor() {
    this.renderer = inject(Renderer2);
    this.listeners = /* @__PURE__ */ new Map();
  }
  setListeners({
    hostElement,
    trigger: trigger2,
    callbackOn,
    callbackOff,
    callbackToggle
  }) {
    const host = hostElement.nativeElement;
    const triggers = Array.isArray(trigger2) ? trigger2 : trigger2?.split(" ") ?? [];
    if (triggers?.includes("click")) {
      typeof callbackToggle === "function" && this.listeners.set("click", this.renderer.listen(host, "click", callbackToggle));
    }
    if (triggers?.includes("focus")) {
      typeof callbackOn === "function" && this.listeners.set("focus", this.renderer.listen(host, "focus", callbackOn));
    }
    if (triggers?.includes("focusin")) {
      typeof callbackOff === "function" && this.listeners.set("focusout", this.renderer.listen(host, "focusout", callbackOff));
      typeof callbackOn === "function" && this.listeners.set("focusin", this.renderer.listen(host, "focusin", callbackOn));
    }
    if (triggers?.includes("click") || triggers?.includes("focus")) {
      typeof callbackOff === "function" && this.listeners.set("blur", this.renderer.listen(host, "blur", callbackOff));
    }
    if (triggers?.includes("hover")) {
      typeof callbackOn === "function" && this.listeners.set("mouseenter", this.renderer.listen(host, "mouseenter", callbackOn));
      typeof callbackOff === "function" && this.listeners.set("mouseleave", this.renderer.listen(host, "mouseleave", callbackOff));
    }
  }
  clearListeners() {
    this.listeners.forEach((unListen, key) => {
      unListen();
    });
    this.listeners.forEach((unListen, key) => {
      this.listeners.set(key, null);
    });
    this.listeners.clear();
  }
  static {
    this.ɵfac = function ListenersService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ListenersService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ListenersService,
      factory: _ListenersService.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ListenersService, [{
    type: Injectable
  }], null, null);
})();
var ClassToggleService = class _ClassToggleService {
  #document = inject(DOCUMENT);
  #rendererFactory = inject(RendererFactory2);
  #renderer;
  constructor() {
    this.#renderer = this.#rendererFactory.createRenderer(null, null);
  }
  toggle(selector, className) {
    const element = this.#document.querySelector(selector);
    if (element) {
      element.classList.contains(className) ? this.#renderer.removeClass(element, className) : this.#renderer.addClass(element, className);
    }
  }
  static {
    this.ɵfac = function ClassToggleService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ClassToggleService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ClassToggleService,
      factory: _ClassToggleService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClassToggleService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var InMemoryStorageService = class _InMemoryStorageService {
  #storage = /* @__PURE__ */ new Map();
  setItem(key, data) {
    this.#storage.set(key, JSON.stringify(data));
  }
  getItem(key) {
    return this.#storage.has(key) ? JSON.parse(this.#storage.get(key) ?? "null") : void 0;
  }
  removeItem(key) {
    this.#storage.delete(key);
  }
  clear() {
    this.#storage.clear();
  }
  get length() {
    return this.#storage.size;
  }
  key(index) {
    return Array.from(this.#storage.keys())[index];
  }
  static {
    this.ɵfac = function InMemoryStorageService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _InMemoryStorageService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _InMemoryStorageService,
      factory: _InMemoryStorageService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InMemoryStorageService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var LocalStorageService = class _LocalStorageService {
  constructor() {
    this.platformId = inject(PLATFORM_ID);
    this.document = inject(DOCUMENT);
    this.#data$ = new BehaviorSubject(null);
    this.data$ = this.#data$.asObservable();
    this.#localStorage = isPlatformBrowser(this.platformId) && this.document.defaultView ? this.document.defaultView?.localStorage : new InMemoryStorageService();
  }
  #localStorage;
  #data$;
  setItem(key, data) {
    this.#localStorage.setItem(key, JSON.stringify(data));
    this.#data$.next({
      key,
      data
    });
  }
  getItem(key) {
    const data = JSON.parse(this.#localStorage.getItem(key) || "null");
    this.#data$.next({
      key,
      data
    });
    return data;
  }
  removeItem(key) {
    this.#localStorage.removeItem(key);
    this.#data$.next({
      key,
      data: null
    });
  }
  clear() {
    this.#localStorage.clear();
    this.#data$.next(null);
  }
  static {
    this.ɵfac = function LocalStorageService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LocalStorageService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _LocalStorageService,
      factory: _LocalStorageService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LocalStorageService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var ColorModeService = class _ColorModeService {
  #destroyRef;
  #document;
  #localStorage;
  #colorModeEffect;
  constructor() {
    this.#destroyRef = inject(DestroyRef);
    this.#document = inject(DOCUMENT);
    this.#localStorage = inject(LocalStorageService);
    this.eventName = signal("ColorSchemeChange");
    this.localStorageItemName = signal(void 0);
    this.localStorageItemName$ = toObservable(this.localStorageItemName);
    this.colorMode = signal(void 0);
    this.#colorModeEffect = effect(() => {
      const colorMode = this.colorMode();
      if (colorMode) {
        const localStorageItemName = this.localStorageItemName();
        localStorageItemName && this.setStoredTheme(localStorageItemName, colorMode);
        this.#setTheme(colorMode);
      }
    });
    afterNextRender({
      read: () => {
        this.localStorageItemName$.pipe(tap((params) => {
          this.colorMode.set(this.getDefaultScheme(params));
        }), takeUntilDestroyed(this.#destroyRef)).subscribe();
      }
    });
  }
  getStoredTheme(localStorageItemName) {
    return this.#localStorage.getItem(localStorageItemName);
  }
  setStoredTheme(localStorageItemName, colorMode) {
    return this.#localStorage.setItem(localStorageItemName, colorMode);
  }
  removeStoredTheme(localStorageItemName) {
    this.#localStorage.removeItem(localStorageItemName);
  }
  getDefaultScheme(localStorageItemName) {
    if (this.#document.defaultView === void 0) {
      return this.getDatasetTheme();
    }
    const storedTheme = localStorageItemName && this.getStoredTheme(localStorageItemName);
    return storedTheme ?? this.getDatasetTheme();
  }
  getPrefersColorScheme() {
    return this.#document.defaultView?.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : this.#document.defaultView?.matchMedia("(prefers-color-scheme: light)").matches ? "light" : void 0;
  }
  getDatasetTheme() {
    return this.#document.documentElement.dataset["coreuiTheme"];
  }
  #setTheme(colorMode) {
    this.#document.documentElement.dataset["coreuiTheme"] = colorMode === "auto" ? this.getPrefersColorScheme() : colorMode;
    const event = new Event(this.eventName());
    this.#document.documentElement.dispatchEvent(event);
  }
  static {
    this.ɵfac = function ColorModeService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ColorModeService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ColorModeService,
      factory: _ColorModeService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ColorModeService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var UIDService = class _UIDService {
  #document = inject(DOCUMENT);
  getUID(prefix = "random-id") {
    let uid = prefix;
    do {
      uid = `${prefix}-${Math.floor(Math.random() * 1e6).toString(10)}`;
    } while (this.#document.getElementById(uid));
    return uid;
  }
  static {
    this.ɵfac = function UIDService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UIDService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _UIDService,
      factory: _UIDService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UIDService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var RtlService = class _RtlService {
  #document = inject(DOCUMENT);
  isRTL(element) {
    if (element) {
      return element.closest('[dir="rtl"]') !== null;
    }
    return this.#document?.documentElement?.dir === "rtl" || this.#document?.body?.dir === "rtl";
  }
  static {
    this.ɵfac = function RtlService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RtlService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _RtlService,
      factory: _RtlService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RtlService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var CarouselService = class _CarouselService {
  constructor() {
    this.#carouselIndex = new BehaviorSubject({});
    this.carouselIndex$ = this.#carouselIndex.asObservable();
  }
  #carouselIndex;
  setIndex(index) {
    this.#carouselIndex.next(index);
  }
  static {
    this.ɵfac = function CarouselService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CarouselService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _CarouselService,
      factory: _CarouselService.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CarouselService, [{
    type: Injectable
  }], null, null);
})();
var CarouselState = class _CarouselState {
  #carouselService = inject(CarouselService);
  #state = {
    activeItemIndex: -1,
    animate: true,
    items: [],
    direction: "next",
    transition: "slide",
    interval: 0
  };
  get state() {
    return this.#state;
  }
  set state(state2) {
    const prevState = __spreadValues({}, this.#state);
    const nextState = __spreadValues(__spreadValues({}, this.#state), state2);
    this.#state = nextState;
    if (prevState.activeItemIndex !== nextState.activeItemIndex) {
      const activeItemIndex = this.state.activeItemIndex || 0;
      const itemInterval = this.state.items && this.state.items[activeItemIndex]?.interval() || -1;
      this.#carouselService.setIndex({
        active: nextState.activeItemIndex,
        interval: itemInterval,
        lastItemIndex: (nextState.items?.length ?? 0) - 1
      });
    }
  }
  setItems(newItems) {
    if (newItems.length) {
      const itemsArray = newItems;
      itemsArray.forEach((item, i) => {
        item.index = i;
      });
      this.state = {
        items: [...itemsArray]
      };
    } else {
      this.reset();
    }
  }
  setNextIndex(nextIndex) {
    this.#carouselService.setIndex(nextIndex);
  }
  direction(direction = "next") {
    this.state = {
      direction
    };
    const {
      activeItemIndex = -1,
      items
    } = this.state;
    const itemsCount = items?.length ?? 0;
    if (itemsCount > 0) {
      return direction === "next" ? activeItemIndex === itemsCount - 1 ? 0 : activeItemIndex + 1 : activeItemIndex === 0 ? itemsCount - 1 : activeItemIndex - 1;
    } else {
      return 0;
    }
  }
  reset() {
    this.state = {
      activeItemIndex: -1,
      animate: true,
      items: [],
      direction: "next",
      transition: "slide",
      interval: 0
    };
  }
  static {
    this.ɵfac = function CarouselState_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CarouselState)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _CarouselState,
      factory: _CarouselState.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CarouselState, [{
    type: Injectable
  }], null, null);
})();
var CarouselConfig = class _CarouselConfig {
  constructor() {
    this.activeIndex = 0;
    this.animate = true;
    this.direction = "next";
    this.interval = 0;
  }
  static {
    this.ɵfac = function CarouselConfig_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CarouselConfig)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _CarouselConfig,
      factory: _CarouselConfig.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CarouselConfig, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var CarouselComponent = class _CarouselComponent {
  #hostElement;
  #carouselService;
  #carouselState;
  #intersectionService;
  #listenersService;
  constructor(config) {
    this.config = config;
    this.#hostElement = inject(ElementRef);
    this.#carouselService = inject(CarouselService);
    this.#carouselState = inject(CarouselState);
    this.#intersectionService = inject(IntersectionService);
    this.#listenersService = inject(ListenersService);
    this.activeIndexInput = input(0, {
      alias: "activeIndex"
    });
    this.activeIndex = linkedSignal({
      source: this.activeIndexInput,
      computation: (value) => value
    });
    this.animateInput = input(true, {
      alias: "animate"
    });
    this.animate = linkedSignal({
      source: this.animateInput,
      computation: (value) => value
    });
    this.directionInput = input("next", {
      alias: "direction"
    });
    this.direction = linkedSignal({
      source: this.directionInput,
      computation: (value) => value
    });
    this.intervalInput = input(0, {
      alias: "interval"
    });
    this.interval = linkedSignal({
      source: this.intervalInput,
      computation: (value) => value
    });
    this.#intervalEffect = effect(() => {
      const interval = this.interval();
      this.#carouselState.state = {
        interval
      };
      interval ? this.setTimer() : this.resetTimer();
    });
    this.pause = input("hover");
    this.touch = input(true);
    this.transition = input("slide");
    this.wrap = input(true);
    this.itemChange = output();
    this.activeItemInterval = 0;
    this.#destroyRef = inject(DestroyRef);
    this.#visible = true;
    this.loadConfig();
  }
  loadConfig() {
    this.activeIndex.set(this.config?.activeIndex ?? this.activeIndex());
    this.animate.set(this.config?.animate ?? this.animate());
    this.direction.set(this.config?.direction ?? this.direction());
    this.interval.set(this.config?.interval ?? this.interval());
  }
  #intervalEffect;
  #destroyRef;
  ngOnInit() {
    this.carouselStateSubscribe();
  }
  ngOnDestroy() {
    this.resetTimer();
    this.clearListeners();
    this.swipeSubscribe(false);
  }
  ngAfterContentInit() {
    this.intersectionServiceSubscribe();
    this.#carouselState.state = {
      activeItemIndex: this.activeIndex(),
      animate: this.animate(),
      interval: this.interval(),
      transition: this.transition()
    };
    this.setListeners();
    this.swipeSubscribe();
  }
  setListeners() {
    const config = {
      hostElement: this.#hostElement,
      trigger: this.pause() || [],
      callbackOff: () => {
        this.setTimer();
      },
      callbackOn: () => {
        this.resetTimer();
      }
    };
    this.#listenersService.setListeners(config);
  }
  clearListeners() {
    this.#listenersService.clearListeners();
  }
  set visible(value) {
    this.#visible = value;
  }
  get visible() {
    return this.#visible;
  }
  #visible;
  setTimer() {
    const interval = this.activeItemInterval || this.interval();
    const direction = this.direction();
    this.resetTimer();
    if (interval > 0) {
      this.timerId = setTimeout(() => {
        const nextIndex = this.#carouselState.direction(direction);
        this.#carouselState.state = {
          activeItemIndex: nextIndex
        };
      }, interval);
    }
  }
  resetTimer() {
    clearTimeout(this.timerId);
    this.timerId = void 0;
  }
  carouselStateSubscribe() {
    this.#carouselService.carouselIndex$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((nextItem) => {
      if ("active" in nextItem && typeof nextItem.active === "number") {
        this.itemChange.emit(nextItem.active);
      }
      this.activeItemInterval = typeof nextItem.interval === "number" && nextItem.interval > -1 ? nextItem.interval : this.interval();
      const direction = this.direction();
      const isLastItem = nextItem.active === nextItem.lastItemIndex && direction === "next" || nextItem.active === 0 && direction === "prev";
      !this.wrap() && isLastItem ? this.resetTimer() : this.setTimer();
    });
  }
  intersectionServiceSubscribe() {
    this.#intersectionService.createIntersectionObserver(this.#hostElement);
    this.#intersectionService.intersecting$.pipe(filter((next) => next.hostElement === this.#hostElement), finalize(() => {
      this.#intersectionService.unobserve(this.#hostElement);
    }), takeUntilDestroyed(this.#destroyRef)).subscribe((next) => {
      this.visible = next.isIntersecting;
      next.isIntersecting ? this.setTimer() : this.resetTimer();
    });
  }
  swipeSubscribe(subscribe = true) {
    if (this.touch() && subscribe) {
      const carouselElement = this.#hostElement.nativeElement;
      const touchStart$ = fromEvent(carouselElement, "touchstart");
      const touchEnd$ = fromEvent(carouselElement, "touchend");
      const touchMove$ = fromEvent(carouselElement, "touchmove");
      this.swipeSubscription = touchStart$.pipe(zipWith(touchEnd$.pipe(withLatestFrom(touchMove$))), takeUntilDestroyed(this.#destroyRef)).subscribe(([touchstart, [touchend, touchmove]]) => {
        touchstart.stopPropagation();
        touchmove.stopPropagation();
        const distanceX = touchstart.touches[0]?.clientX - touchmove.touches[0]?.clientX || 0;
        if (Math.abs(distanceX) > 0.3 * carouselElement.clientWidth && touchstart.timeStamp <= touchmove.timeStamp) {
          const nextIndex = this.#carouselState.direction(distanceX > 0 ? "next" : "prev");
          this.#carouselState.state = {
            activeItemIndex: nextIndex
          };
        }
      });
    } else {
      this.swipeSubscription?.unsubscribe();
    }
  }
  static {
    this.ɵfac = function CarouselComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CarouselComponent)(ɵɵdirectiveInject(CarouselConfig));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _CarouselComponent,
      selectors: [["c-carousel"]],
      hostAttrs: [1, "carousel", "slide"],
      hostVars: 2,
      hostBindings: function CarouselComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassProp("carousel-fade", ctx.transition() === "crossfade" && ctx.animate());
        }
      },
      inputs: {
        activeIndexInput: [1, "activeIndex", "activeIndexInput"],
        animateInput: [1, "animate", "animateInput"],
        directionInput: [1, "direction", "directionInput"],
        intervalInput: [1, "interval", "intervalInput"],
        pause: [1, "pause"],
        touch: [1, "touch"],
        transition: [1, "transition"],
        wrap: [1, "wrap"]
      },
      outputs: {
        itemChange: "itemChange"
      },
      exportAs: ["cCarousel"],
      features: [ɵɵProvidersFeature([CarouselService, CarouselState, ListenersService]), ɵɵHostDirectivesFeature([{
        directive: ThemeDirective,
        inputs: ["dark", "dark"]
      }])],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function CarouselComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      styles: ["[_nghost-%COMP%]{display:block}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CarouselComponent, [{
    type: Component,
    args: [{
      selector: "c-carousel",
      template: "<ng-content />",
      providers: [CarouselService, CarouselState, ListenersService],
      hostDirectives: [{
        directive: ThemeDirective,
        inputs: ["dark"]
      }],
      exportAs: "cCarousel",
      host: {
        class: "carousel slide",
        "[class.carousel-fade]": 'transition() === "crossfade" && animate()'
      },
      styles: [":host{display:block}\n"]
    }]
  }], () => [{
    type: CarouselConfig,
    decorators: [{
      type: Inject,
      args: [CarouselConfig]
    }]
  }], null);
})();
var CarouselCaptionComponent = class _CarouselCaptionComponent {
  static {
    this.ɵfac = function CarouselCaptionComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CarouselCaptionComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _CarouselCaptionComponent,
      selectors: [["c-carousel-caption"]],
      hostVars: 2,
      hostBindings: function CarouselCaptionComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassProp("carousel-caption", true);
        }
      },
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function CarouselCaptionComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      styles: ["[_nghost-%COMP%]{display:block}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CarouselCaptionComponent, [{
    type: Component,
    args: [{
      selector: "c-carousel-caption",
      template: "<ng-content />",
      host: {
        "[class.carousel-caption]": "true"
      },
      styles: [":host{display:block}\n"]
    }]
  }], null, null);
})();
var CarouselControlComponent = class _CarouselControlComponent {
  constructor() {
    this.#carouselState = inject(CarouselState);
    this.captionInput = input(void 0, {
      alias: "caption"
    });
    this.caption = linkedSignal({
      source: this.captionInput,
      computation: (value) => {
        return !!value ? value : this.direction() === "prev" ? "Previous" : "Next";
      }
    });
    this.direction = input("next");
    this.role = input("button");
    this.hostClasses = computed(() => {
      return `carousel-control-${this.direction()}`;
    });
    this.carouselControlIconClass = computed(() => {
      return `carousel-control-${this.direction()}-icon`;
    });
  }
  #carouselState;
  onKeyUp($event) {
    if ($event.key === "Enter") {
      this.#play();
    }
    if ($event.key === "ArrowLeft") {
      this.#play("prev");
    }
    if ($event.key === "ArrowRight") {
      this.#play("next");
    }
  }
  onClick($event) {
    this.#play();
  }
  #play(direction = this.direction()) {
    const nextIndex = this.#carouselState.direction(direction);
    this.#carouselState.state = {
      activeItemIndex: nextIndex
    };
  }
  static {
    this.ɵfac = function CarouselControlComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CarouselControlComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _CarouselControlComponent,
      selectors: [["c-carousel-control"]],
      hostVars: 3,
      hostBindings: function CarouselControlComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("keyup", function CarouselControlComponent_keyup_HostBindingHandler($event) {
            return ctx.onKeyUp($event);
          })("click", function CarouselControlComponent_click_HostBindingHandler($event) {
            return ctx.onClick($event);
          });
        }
        if (rf & 2) {
          ɵɵattribute("role", ctx.role());
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        captionInput: [1, "caption", "captionInput"],
        direction: [1, "direction"],
        role: [1, "role"]
      },
      exportAs: ["cCarouselControl"],
      ngContentSelectors: _c0,
      decls: 2,
      vars: 0,
      consts: [[1, "visually-hidden"]],
      template: function CarouselControlComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0, 0, null, CarouselControlComponent_ProjectionFallback_0_Template, 3, 4);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CarouselControlComponent, [{
    type: Component,
    args: [{
      selector: "c-carousel-control",
      exportAs: "cCarouselControl",
      host: {
        "[attr.role]": "role()",
        "[class]": "hostClasses()",
        "(keyup)": "onKeyUp($event)",
        "(click)": "onClick($event)"
      },
      template: '<ng-content>\n  <span [attr.aria-hidden]="true" [class]="carouselControlIconClass()"></span>\n  <span class="visually-hidden">{{ caption() }}</span>\n</ng-content>\n'
    }]
  }], null, null);
})();
var CarouselIndicatorsComponent = class _CarouselIndicatorsComponent {
  constructor() {
    this.#destroyRef = inject(DestroyRef);
    this.#carouselService = inject(CarouselService);
    this.#carouselState = inject(CarouselState);
    this.items = [];
    this.active = 0;
    this.contentTemplates = contentChildren(TemplateIdDirective, {
      descendants: true
    });
    this.templates = computed(() => {
      return this.contentTemplates().reduce((acc, child) => {
        acc[child.id] = child.templateRef;
        return acc;
      }, {});
    });
  }
  #destroyRef;
  #carouselService;
  #carouselState;
  ngOnInit() {
    this.#carouselService.carouselIndex$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((nextIndex) => {
      this.items = this.#carouselState?.state?.items?.map((item) => item.index) ?? [];
      if ("active" in nextIndex) {
        this.active = nextIndex.active ?? 0;
      }
    });
  }
  onClick(index) {
    if (index !== this.active) {
      const direction = index < this.active ? "prev" : "next";
      this.#carouselState.state = {
        direction,
        activeItemIndex: index
      };
    }
  }
  static {
    this.ɵfac = function CarouselIndicatorsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CarouselIndicatorsComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _CarouselIndicatorsComponent,
      selectors: [["c-carousel-indicators"]],
      contentQueries: function CarouselIndicatorsComponent_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuerySignal(dirIndex, ctx.contentTemplates, TemplateIdDirective, 5);
        }
        if (rf & 2) {
          ɵɵqueryAdvance();
        }
      },
      hostAttrs: [1, "carousel-indicators"],
      exportAs: ["cCarouselIndicators"],
      decls: 4,
      vars: 5,
      consts: [["defaultCarouselIndicatorsTemplate", ""], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["type", "button", 3, "class"], ["type", "button", 3, "click"]],
      template: function CarouselIndicatorsComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵdeclareLet(0);
          ɵɵtemplate(1, CarouselIndicatorsComponent_ng_container_1_Template, 1, 0, "ng-container", 1)(2, CarouselIndicatorsComponent_ng_template_2_Template, 2, 0, "ng-template", null, 0, ɵɵtemplateRefExtractor);
        }
        if (rf & 2) {
          const defaultCarouselIndicatorsTemplate_r4 = ɵɵreference(3);
          const tmpl_r5 = ctx.templates();
          ɵɵadvance();
          ɵɵproperty("ngTemplateOutlet", tmpl_r5["carouselIndicatorsTemplate"] || defaultCarouselIndicatorsTemplate_r4)("ngTemplateOutletContext", ɵɵpureFunction2(2, _c4, ctx.items, ctx.active));
        }
      },
      dependencies: [NgTemplateOutlet],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CarouselIndicatorsComponent, [{
    type: Component,
    args: [{
      selector: "c-carousel-indicators",
      exportAs: "cCarouselIndicators",
      imports: [NgTemplateOutlet],
      host: {
        class: "carousel-indicators"
      },
      template: `@let tmpl = templates();
<ng-container *ngTemplateOutlet="tmpl['carouselIndicatorsTemplate'] || defaultCarouselIndicatorsTemplate; context: {$implicit: items, active: active}" />

<ng-template #defaultCarouselIndicatorsTemplate>
  @for (item of items; track item; let i = $index) {
    <button
      [attr.data-coreui-target]="i"
      type="button"
      (click)="onClick(i)"
      [class]="{ active: active === i }"
      [attr.aria-current]="active === i">
    </button>
  }
</ng-template>
`
    }]
  }], null, null);
})();
var CarouselItemComponent = class _CarouselItemComponent {
  #destroyRef;
  #carouselService;
  constructor() {
    this.#destroyRef = inject(DestroyRef);
    this.#carouselService = inject(CarouselService);
    this.activeInput = input(false, {
      transform: booleanAttribute,
      alias: "active"
    });
    this.active = linkedSignal({
      source: this.activeInput,
      computation: (value) => {
        return value;
      }
    });
    this.interval = input(-1);
    this.role = input("group");
    this.#carouselService.carouselIndex$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((nextIndex) => {
      if ("active" in nextIndex) {
        this.active.set(nextIndex.active === this.index);
      }
    });
  }
  static {
    this.ɵfac = function CarouselItemComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CarouselItemComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _CarouselItemComponent,
      selectors: [["c-carousel-item"]],
      hostAttrs: [1, "carousel-item"],
      hostVars: 3,
      hostBindings: function CarouselItemComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("role", ctx.role());
          ɵɵclassProp("active", ctx.active());
        }
      },
      inputs: {
        activeInput: [1, "active", "activeInput"],
        interval: [1, "interval"],
        role: [1, "role"]
      },
      exportAs: ["cCarouselItem"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 1,
      template: function CarouselItemComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵtemplate(0, CarouselItemComponent_Conditional_0_Template, 1, 0);
        }
        if (rf & 2) {
          ɵɵconditional(ctx.active() ? 0 : -1);
        }
      },
      styles: ["[_nghost-%COMP%]{display:block}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CarouselItemComponent, [{
    type: Component,
    args: [{
      selector: "c-carousel-item",
      exportAs: "cCarouselItem",
      host: {
        class: "carousel-item",
        "[class.active]": "active()",
        "[attr.role]": "role()"
      },
      template: "@if (active()) {\n  <ng-content />\n}\n",
      styles: [":host{display:block}\n"]
    }]
  }], () => [], null);
})();
function toSlideLeft(fromState, toState) {
  return toState.left === true && toState.type === "slide";
}
function toSlideRight(fromState, toState) {
  return toState.left === false && toState.type === "slide";
}
function toFadeLeft(fromState, toState) {
  return toState.left === true && toState.type !== "slide";
}
function toFadeRight(fromState, toState) {
  return toState.left === false && toState.type !== "slide";
}
var slideAnimationLeft = animation(group([query(":leave", [animate("0.6s ease-in-out", style({
  transform: "translateX(-100%)"
}))], {
  optional: true
}), query(":enter", [style({
  transform: "translateX(100%)"
}), animate("0.6s ease-in-out", style("*"))], {
  optional: true
})]));
var slideAnimationRight = animation(group([query(":enter", [style({
  transform: "translateX(-100%)"
}), animate("0.6s ease-in-out", style("*"))], {
  optional: true
}), query(":leave", [animate("0.6s ease-in-out", style({
  transform: "translateX(100%)"
}))], {
  optional: true
})]));
var fadeAnimationLeft = animation(group([query(":leave", [animate("0.9s ease-in-out", style({
  zIndex: 0,
  opacity: 0
}))], {
  optional: true
}), query(":enter", [style({
  zIndex: 1,
  opacity: 1
}), animate("0.6s ease-in-out", style("*"))], {
  optional: true
})]));
var fadeAnimationRight = animation(group([query(":enter", [style({
  zIndex: 1,
  opacity: 1
}), animate("0.6s ease-in-out", style("*"))], {
  optional: true
}), query(":leave", [animate("0.9s ease-in-out", style({
  zIndex: 0,
  opacity: 0
}))], {
  optional: true
})]));
var carouselPlay = trigger("carouselPlay", [state("*", style({
  transform: "translateX(0)",
  display: "block",
  opacity: 1
})), transition(toFadeLeft, useAnimation(fadeAnimationLeft)), transition(toFadeRight, useAnimation(fadeAnimationRight)), transition(toSlideLeft, useAnimation(slideAnimationLeft)), transition(toSlideRight, useAnimation(slideAnimationRight))]);
var CarouselInnerComponent = class _CarouselInnerComponent {
  constructor() {
    this.#carouselState = inject(CarouselState);
    this.activeIndex = signal(void 0);
    this.animate = signal(true);
    this.interval = signal(0);
    this.slide = signal({
      left: true
    });
    this.transition = signal("crossfade");
    this.slideType = computed(() => {
      return {
        left: this.slide().left,
        type: this.transition()
      };
    });
    this.ariaLive = computed(() => {
      return this.interval() ? "off" : "polite";
    });
    this.contentItems = contentChildren(CarouselItemComponent);
    this.#prevContentItems = signal([]);
  }
  #carouselState;
  #prevContentItems;
  ngAfterContentInit() {
    this.setItems();
  }
  ngAfterContentChecked() {
    this.setItems();
    const state2 = this.#carouselState?.state;
    const nextIndex = state2?.activeItemIndex;
    const nextDirection = state2?.direction;
    if (this.activeIndex() !== nextIndex) {
      this.animate.set(state2?.animate ?? false);
      this.activeIndex.set(state2?.activeItemIndex);
      this.interval.set(state2?.interval ?? 0);
      this.slide.set({
        left: nextDirection === "next"
      });
      this.transition.set(state2?.transition ?? "slide");
    }
  }
  setItems() {
    const contentItems = this.contentItems();
    if (this.#prevContentItems() !== contentItems) {
      this.#prevContentItems.set([...contentItems]);
      this.#carouselState.setItems(contentItems);
    }
  }
  static {
    this.ɵfac = function CarouselInnerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CarouselInnerComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _CarouselInnerComponent,
      selectors: [["c-carousel-inner"]],
      contentQueries: function CarouselInnerComponent_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuerySignal(dirIndex, ctx.contentItems, CarouselItemComponent, 4);
        }
        if (rf & 2) {
          ɵɵqueryAdvance();
        }
      },
      hostAttrs: [1, "carousel-inner"],
      hostVars: 3,
      hostBindings: function CarouselInnerComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵsyntheticHostProperty("@carouselPlay", ctx.slideType())("@.disabled", !ctx.animate());
          ɵɵattribute("aria-live", ctx.ariaLive());
        }
      },
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function CarouselInnerComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      styles: ["[_nghost-%COMP%]{display:block}"],
      data: {
        animation: [carouselPlay]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CarouselInnerComponent, [{
    type: Component,
    args: [{
      selector: "c-carousel-inner",
      animations: [carouselPlay],
      template: "<ng-content />",
      host: {
        class: "carousel-inner",
        "[@carouselPlay]": "slideType()",
        "[@.disabled]": "!animate()",
        "[attr.aria-live]": "ariaLive()"
      },
      styles: [":host{display:block}\n"]
    }]
  }], null, null);
})();
var CarouselModule = class _CarouselModule {
  static forRoot() {
    return {
      ngModule: _CarouselModule,
      providers: []
    };
  }
  static {
    this.ɵfac = function CarouselModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CarouselModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _CarouselModule,
      imports: [CarouselComponent, CarouselCaptionComponent, CarouselControlComponent, CarouselIndicatorsComponent, CarouselInnerComponent, CarouselItemComponent],
      exports: [CarouselComponent, CarouselCaptionComponent, CarouselControlComponent, CarouselIndicatorsComponent, CarouselInnerComponent, CarouselItemComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      providers: [CarouselService, CarouselState, CarouselConfig]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CarouselModule, [{
    type: NgModule,
    args: [{
      imports: [CarouselComponent, CarouselCaptionComponent, CarouselControlComponent, CarouselIndicatorsComponent, CarouselInnerComponent, CarouselItemComponent],
      providers: [CarouselService, CarouselState, CarouselConfig],
      exports: [CarouselComponent, CarouselCaptionComponent, CarouselControlComponent, CarouselIndicatorsComponent, CarouselInnerComponent, CarouselItemComponent]
    }]
  }], null, null);
})();
var DropdownDividerDirective = class _DropdownDividerDirective {
  static {
    this.ɵfac = function DropdownDividerDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DropdownDividerDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _DropdownDividerDirective,
      selectors: [["", "cDropdownDivider", ""]],
      hostAttrs: [1, "dropdown-divider"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DropdownDividerDirective, [{
    type: Directive,
    args: [{
      selector: "[cDropdownDivider]",
      host: {
        class: "dropdown-divider"
      }
    }]
  }], null, null);
})();
var DropdownHeaderDirective = class _DropdownHeaderDirective {
  static {
    this.ɵfac = function DropdownHeaderDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DropdownHeaderDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _DropdownHeaderDirective,
      selectors: [["", "cDropdownHeader", ""]],
      hostAttrs: [1, "dropdown-header"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DropdownHeaderDirective, [{
    type: Directive,
    args: [{
      selector: "[cDropdownHeader]",
      host: {
        class: "dropdown-header"
      }
    }]
  }], null, null);
})();
var DropdownService = class _DropdownService {
  constructor() {
    this.dropdownState = new BehaviorSubject({});
    this.dropdownState$ = this.dropdownState.asObservable();
  }
  toggle(state2) {
    this.dropdownState.next(state2);
  }
  static {
    this.ɵfac = function DropdownService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DropdownService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _DropdownService,
      factory: _DropdownService.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DropdownService, [{
    type: Injectable
  }], null, null);
})();
var DropdownMenuDirective = class _DropdownMenuDirective {
  constructor() {
    this.#destroyRef = inject(DestroyRef);
    this.elementRef = inject(ElementRef);
    this.#dropdownService = inject(DropdownService);
    this.alignment = input();
    this.visibleInput = input(false, {
      transform: booleanAttribute,
      alias: "visible"
    });
    this.visible = linkedSignal({
      source: this.visibleInput,
      computation: (value) => value
    });
    this.hostClasses = computed(() => {
      const alignment = this.alignment();
      const visible = this.visible();
      return {
        "dropdown-menu": true,
        [`dropdown-menu-${alignment}`]: !!alignment,
        show: visible
      };
    });
    this.hostStyles = computed(() => {
      const visible = this.visible();
      return {
        visibility: visible ? null : "",
        display: visible ? null : ""
      };
    });
  }
  #destroyRef;
  #dropdownService;
  #focusKeyManager;
  onKeyDown($event) {
    if (!this.visible()) {
      return;
    }
    if (["Space", "ArrowDown"].includes($event.code)) {
      $event.preventDefault();
    }
    this.#focusKeyManager.onKeydown($event);
  }
  onKeyUp($event) {
    if (!this.visible()) {
      return;
    }
    if (["Tab"].includes($event.key)) {
      if (this.#focusKeyManager.activeItem) {
        $event.shiftKey ? this.#focusKeyManager.setPreviousItemActive() : this.#focusKeyManager.setNextItemActive();
      } else {
        this.#focusKeyManager.setFirstItemActive();
      }
    }
  }
  ngAfterContentInit() {
    this.focusKeyManagerInit();
    this.dropdownItemsContent.changes.pipe(tap((change) => {
      this.focusKeyManagerInit();
    }), takeUntilDestroyed(this.#destroyRef)).subscribe();
  }
  ngOnInit() {
    this.#dropdownService.dropdownState$.pipe(tap((state2) => {
      if ("visible" in state2) {
        this.visible.update((visible) => state2.visible === "toggle" ? !visible : state2.visible);
        if (!this.visible()) {
          this.#focusKeyManager?.setActiveItem(-1);
        }
      }
    }), takeUntilDestroyed(this.#destroyRef)).subscribe();
  }
  focusKeyManagerInit() {
    this.#focusKeyManager = new FocusKeyManager(this.dropdownItemsContent).withHomeAndEnd().withPageUpDown().withWrap().skipPredicate((dropdownItem) => dropdownItem.disabled === true);
  }
  static {
    this.ɵfac = function DropdownMenuDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DropdownMenuDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _DropdownMenuDirective,
      selectors: [["", "cDropdownMenu", ""]],
      contentQueries: function DropdownMenuDirective_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuery(dirIndex, DropdownItemDirective, 5);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.dropdownItemsContent = _t);
        }
      },
      hostAttrs: [1, "dropdown-menu"],
      hostVars: 4,
      hostBindings: function DropdownMenuDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("keydown", function DropdownMenuDirective_keydown_HostBindingHandler($event) {
            return ctx.onKeyDown($event);
          })("keyup", function DropdownMenuDirective_keyup_HostBindingHandler($event) {
            return ctx.onKeyUp($event);
          });
        }
        if (rf & 2) {
          ɵɵstyleMap(ctx.hostStyles());
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        alignment: [1, "alignment"],
        visibleInput: [1, "visible", "visibleInput"]
      },
      exportAs: ["cDropdownMenu"],
      features: [ɵɵHostDirectivesFeature([{
        directive: ThemeDirective,
        inputs: ["dark", "dark"]
      }])]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DropdownMenuDirective, [{
    type: Directive,
    args: [{
      selector: "[cDropdownMenu]",
      exportAs: "cDropdownMenu",
      hostDirectives: [{
        directive: ThemeDirective,
        inputs: ["dark"]
      }],
      host: {
        class: "dropdown-menu",
        "[class]": "hostClasses()",
        "[style]": "hostStyles()",
        "(keydown)": "onKeyDown($event)",
        "(keyup)": "onKeyUp($event)"
      }
    }]
  }], null, {
    dropdownItemsContent: [{
      type: ContentChildren,
      args: [forwardRef(() => DropdownItemDirective), {
        descendants: true
      }]
    }]
  });
})();
var DropdownToken = class {
};
var DropdownToggleDirective = class _DropdownToggleDirective {
  constructor() {
    this.#destroyRef = inject(DestroyRef);
    this.elementRef = inject(ElementRef);
    this.#dropdownService = inject(DropdownService);
    this.dropdown = inject(DropdownToken, {
      optional: true
    });
    this.dropdownComponent = input();
    this.disabled = input(false, {
      transform: booleanAttribute
    });
    this.caret = input(true);
    this.split = input(false, {
      transform: booleanAttribute
    });
    this.hostClasses = computed(() => {
      return {
        "dropdown-toggle": this.caret(),
        "dropdown-toggle-split": this.split(),
        disabled: this.disabled()
      };
    });
    this.#ariaExpanded = signal(false);
  }
  // injections
  #destroyRef;
  #dropdownService;
  #ariaExpanded;
  get ariaExpanded() {
    return this.#ariaExpanded();
  }
  onClick($event) {
    $event.preventDefault();
    !this.disabled() && this.#dropdownService.toggle({
      visible: "toggle",
      dropdown: this.dropdown
    });
  }
  ngAfterViewInit() {
    const dropdownComponent = this.dropdownComponent();
    if (dropdownComponent) {
      this.dropdown = dropdownComponent;
      this.#dropdownService = dropdownComponent?.dropdownService;
    }
    if (this.dropdown) {
      const dropdown = this.dropdown;
      dropdown?.visibleChange?.subscribe((visible) => {
        this.#ariaExpanded.set(visible);
      });
    }
  }
  static {
    this.ɵfac = function DropdownToggleDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DropdownToggleDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _DropdownToggleDirective,
      selectors: [["", "cDropdownToggle", ""]],
      hostVars: 3,
      hostBindings: function DropdownToggleDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function DropdownToggleDirective_click_HostBindingHandler($event) {
            return ctx.onClick($event);
          });
        }
        if (rf & 2) {
          ɵɵattribute("aria-expanded", ctx.ariaExpanded);
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        dropdownComponent: [1, "dropdownComponent"],
        disabled: [1, "disabled"],
        caret: [1, "caret"],
        split: [1, "split"]
      },
      exportAs: ["cDropdownToggle"],
      features: [ɵɵProvidersFeature([{
        provide: DropdownToken,
        useExisting: forwardRef(() => DropdownComponent)
      }])]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DropdownToggleDirective, [{
    type: Directive,
    args: [{
      selector: "[cDropdownToggle]",
      providers: [{
        provide: DropdownToken,
        useExisting: forwardRef(() => DropdownComponent)
      }],
      exportAs: "cDropdownToggle",
      host: {
        "[class]": "hostClasses()",
        "[attr.aria-expanded]": "ariaExpanded",
        "(click)": "onClick($event)"
      }
    }]
  }], null, null);
})();
var DropdownComponent = class _DropdownComponent {
  constructor(document2, elementRef, renderer, ngZone, changeDetectorRef, dropdownService) {
    this.document = document2;
    this.elementRef = elementRef;
    this.renderer = renderer;
    this.ngZone = ngZone;
    this.changeDetectorRef = changeDetectorRef;
    this.dropdownService = dropdownService;
    this.alignment = input();
    this.autoClose = input(true);
    this.direction = input();
    this.placement = input("bottom-start");
    this.popper = input(true, {
      transform: booleanAttribute
    });
    this.popperOptionsInput = input({}, {
      alias: "popperOptions"
    });
    this.popperOptionsEffect = effect(() => {
      this.popperOptions = __spreadValues(__spreadValues({}, untracked(this.#popperOptions)), this.popperOptionsInput());
    });
    this.#popperOptions = signal({
      placement: this.placement(),
      modifiers: [],
      strategy: "absolute"
    });
    this.variant = input("dropdown");
    this.visibleInput = input(false, {
      transform: booleanAttribute,
      alias: "visible"
    });
    this.visible = linkedSignal({
      source: this.visibleInput,
      computation: (value) => value
    });
    this.visibleEffect = effect(() => {
      const visible = this.visible();
      this.activeTrap = visible;
      visible ? this.createPopperInstance() : this.destroyPopperInstance();
      this.setVisibleState(visible);
      this.visibleChange.emit(visible);
    });
    this.visibleChange = output();
    this.dropdownContext = {
      $implicit: this.visible()
    };
    this.activeTrap = false;
    this.listeners = [];
    this.hostClasses = computed(() => {
      const direction = this.direction();
      const variant = this.variant();
      return {
        dropdown: (variant === "dropdown" || variant === "nav-item") && !direction,
        [`${direction}`]: !!direction,
        [`${variant}`]: !!variant,
        dropup: direction === "dropup" || direction === "dropup-center",
        show: this.visible()
      };
    });
    this.hostStyle = computed(() => {
      return this.variant() === "input-group" ? {
        display: "contents"
      } : {};
    });
    this.dropdownStateSubscribe();
  }
  set popperOptions(value) {
    this.#popperOptions.update((popperOptions) => __spreadValues(__spreadValues({}, popperOptions), value));
  }
  get popperOptions() {
    let placement = this.placement();
    switch (this.direction()) {
      case "dropup": {
        placement = "top-start";
        break;
      }
      case "dropend": {
        placement = "right-start";
        break;
      }
      case "dropstart": {
        placement = "left-start";
        break;
      }
      case "center": {
        placement = "bottom";
        break;
      }
      case "dropup-center": {
        placement = "top";
        break;
      }
    }
    if (this.alignment() === "end") {
      placement = "bottom-end";
    }
    this.#popperOptions.update((value) => __spreadProps(__spreadValues({}, value), {
      placement
    }));
    return this.#popperOptions();
  }
  #popperOptions;
  onHostClick($event) {
    this.clickedTarget = $event.target;
  }
  dropdownStateSubscribe(subscribe = true) {
    if (subscribe) {
      this.dropdownStateSubscription = this.dropdownService.dropdownState$.pipe(filter((state2) => {
        return this === state2.dropdown;
      })).subscribe((state2) => {
        if ("visible" in state2) {
          state2?.visible === "toggle" ? this.toggleDropdown() : this.visible.set(state2.visible);
        }
      });
    } else {
      this.dropdownStateSubscription?.unsubscribe();
    }
  }
  toggleDropdown() {
    this.visible.update((visible) => !visible);
  }
  onClick(event) {
    if (!this._toggler?.elementRef.nativeElement.contains(event.target?.closest("[cDropdownToggle]"))) {
      this.toggleDropdown();
    }
  }
  ngAfterContentInit() {
    if (this.variant() === "nav-item") {
      this.renderer.addClass(this._toggler.elementRef.nativeElement, "nav-link");
    }
  }
  ngOnInit() {
    this.setVisibleState(this.visible());
  }
  ngOnDestroy() {
    this.clearListeners();
    this.dropdownStateSubscribe(false);
    this.destroyPopperInstance();
  }
  setVisibleState(value) {
    this.dropdownService.toggle({
      visible: value,
      dropdown: this
    });
  }
  // todo: turn off popper in navbar-nav
  createPopperInstance() {
    if (this._toggler && this._menu) {
      this.ngZone.runOutsideAngular(() => {
        this._menu.elementRef.nativeElement.style.visibility = "hidden";
        this._menu.elementRef.nativeElement.style.display = "block";
        if (this.popper()) {
          this.popperInstance = createPopper3(this._toggler.elementRef.nativeElement, this._menu.elementRef.nativeElement, __spreadValues({}, this.popperOptions));
        }
        this.ngZone.run(() => {
          this.setListeners();
          this.changeDetectorRef.markForCheck();
          this.changeDetectorRef.detectChanges();
        });
      });
    }
  }
  destroyPopperInstance() {
    this.clearListeners();
    this.popperInstance?.destroy();
    this.popperInstance = void 0;
    this.changeDetectorRef.markForCheck();
  }
  setListeners() {
    this.listeners.push(this.renderer.listen(this.document, "click", (event) => {
      const target = event.target;
      if (this._menuElementRef?.nativeElement.contains(event.target)) {
        this.clickedTarget = target;
      }
      if (this._toggler?.elementRef.nativeElement.contains(event.target)) {
        return;
      }
      const autoClose = this.autoClose();
      if (autoClose === true) {
        this.setVisibleState(false);
        return;
      }
      if (this.clickedTarget === target && autoClose === "inside") {
        this.setVisibleState(false);
        return;
      }
      if (this.clickedTarget !== target && autoClose === "outside") {
        this.setVisibleState(false);
        return;
      }
    }));
    this.listeners.push(this.renderer.listen(this.elementRef.nativeElement, "keyup", (event) => {
      if (event.key === "Escape" && this.autoClose() !== false) {
        event.stopPropagation();
        this.setVisibleState(false);
        return;
      }
    }));
    this.listeners.push(this.renderer.listen(this.document, "keyup", (event) => {
      if (event.key === "Tab" && this.autoClose() !== false && !this.elementRef.nativeElement.contains(event.target)) {
        this.setVisibleState(false);
        return;
      }
    }));
  }
  clearListeners() {
    this.listeners.forEach((unListen) => {
      unListen();
    });
    this.listeners.fill(void 0);
    this.listeners = [];
  }
  static {
    this.ɵfac = function DropdownComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DropdownComponent)(ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(DropdownService));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _DropdownComponent,
      selectors: [["c-dropdown"]],
      contentQueries: function DropdownComponent_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuery(dirIndex, DropdownToggleDirective, 5);
          ɵɵcontentQuery(dirIndex, DropdownMenuDirective, 5);
          ɵɵcontentQuery(dirIndex, DropdownMenuDirective, 5, ElementRef);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._toggler = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._menu = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._menuElementRef = _t.first);
        }
      },
      hostVars: 4,
      hostBindings: function DropdownComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function DropdownComponent_click_HostBindingHandler($event) {
            return ctx.onHostClick($event);
          });
        }
        if (rf & 2) {
          ɵɵstyleMap(ctx.hostStyle());
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        alignment: [1, "alignment"],
        autoClose: [1, "autoClose"],
        direction: [1, "direction"],
        placement: [1, "placement"],
        popper: [1, "popper"],
        popperOptionsInput: [1, "popperOptions", "popperOptionsInput"],
        variant: [1, "variant"],
        visibleInput: [1, "visible", "visibleInput"]
      },
      outputs: {
        visibleChange: "visibleChange"
      },
      exportAs: ["cDropdown"],
      features: [ɵɵProvidersFeature([DropdownService]), ɵɵHostDirectivesFeature([{
        directive: ThemeDirective,
        inputs: ["dark", "dark"]
      }])],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function DropdownComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      styles: [".dropdown[_nghost-%COMP%]:not(.btn-group), .dropdown   [_nghost-%COMP%]:not(.btn-group), .dropup[_nghost-%COMP%]:not(.btn-group), .dropup   [_nghost-%COMP%]:not(.btn-group){display:block}.dropstart[_nghost-%COMP%]:not(.btn-group), .dropstart   [_nghost-%COMP%]:not(.btn-group), .dropend[_nghost-%COMP%]:not(.btn-group), .dropend   [_nghost-%COMP%]:not(.btn-group){display:inline-flex}html:not([dir=rtl]).input-group   [_nghost-%COMP%]:first-child  :first-child, html:not([dir=rtl])   .input-group   [_nghost-%COMP%]:first-child  :first-child, .input-group   html:not([dir=rtl])   [_nghost-%COMP%]:first-child  :first-child{border-top-right-radius:0;border-bottom-right-radius:0}html:not([dir=rtl]).input-group   [_nghost-%COMP%]:first-child  :not(:first-child):not(.dropdown-menu), html:not([dir=rtl])   .input-group   [_nghost-%COMP%]:first-child  :not(:first-child):not(.dropdown-menu), .input-group   html:not([dir=rtl])   [_nghost-%COMP%]:first-child  :not(:first-child):not(.dropdown-menu){margin-left:-1px;border-top-left-radius:0;border-bottom-left-radius:0}html:not([dir=rtl]).input-group   [_nghost-%COMP%]:first-child  :not(:first-child):not(.dropdown-menu):not(:only-of-type), html:not([dir=rtl])   .input-group   [_nghost-%COMP%]:first-child  :not(:first-child):not(.dropdown-menu):not(:only-of-type), .input-group   html:not([dir=rtl])   [_nghost-%COMP%]:first-child  :not(:first-child):not(.dropdown-menu):not(:only-of-type){border-top-right-radius:0;border-bottom-right-radius:0}html:not([dir=rtl]).input-group   [_nghost-%COMP%]:last-child  :first-child, html:not([dir=rtl])   .input-group   [_nghost-%COMP%]:last-child  :first-child, .input-group   html:not([dir=rtl])   [_nghost-%COMP%]:last-child  :first-child{border-top-left-radius:0;border-bottom-left-radius:0}html:not([dir=rtl]).input-group   [_nghost-%COMP%]:last-child  :first-child:not(:only-of-type), html:not([dir=rtl])   .input-group   [_nghost-%COMP%]:last-child  :first-child:not(:only-of-type), .input-group   html:not([dir=rtl])   [_nghost-%COMP%]:last-child  :first-child:not(:only-of-type){border-top-right-radius:0;border-bottom-right-radius:0}html:not([dir=rtl]).input-group   [_nghost-%COMP%]:last-child  :not(:first-child):not(.dropdown-menu), html:not([dir=rtl])   .input-group   [_nghost-%COMP%]:last-child  :not(:first-child):not(.dropdown-menu), .input-group   html:not([dir=rtl])   [_nghost-%COMP%]:last-child  :not(:first-child):not(.dropdown-menu){margin-left:-1px;border-top-left-radius:0;border-bottom-left-radius:0}[dir=rtl]   .input-group   [_nghost-%COMP%]{direction:rtl}[dir=rtl]   .input-group   [_nghost-%COMP%]:first-child  :first-child{border-top-left-radius:0;border-bottom-left-radius:0}[dir=rtl]   .input-group   [_nghost-%COMP%]:first-child  :not(:first-child):not(.dropdown-menu){margin-right:-1px;border-top-right-radius:0;border-bottom-right-radius:0}[dir=rtl]   .input-group   [_nghost-%COMP%]:first-child  :not(:first-child):not(.dropdown-menu):not(:only-of-type){border-top-left-radius:0;border-bottom-left-radius:0}[dir=rtl]   .input-group   [_nghost-%COMP%]:last-child  :first-child{border-top-right-radius:0;border-bottom-right-radius:0}[dir=rtl]   .input-group   [_nghost-%COMP%]:last-child  :first-child:not(:only-of-type){border-top-left-radius:0;border-bottom-left-radius:0}[dir=rtl]   .input-group   [_nghost-%COMP%]:last-child  :not(:first-child):not(.dropdown-menu){margin-right:-1px;border-top-right-radius:0;border-bottom-right-radius:0}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DropdownComponent, [{
    type: Component,
    args: [{
      selector: "c-dropdown",
      template: "<ng-content />",
      exportAs: "cDropdown",
      providers: [DropdownService],
      hostDirectives: [{
        directive: ThemeDirective,
        inputs: ["dark"]
      }],
      host: {
        "[class]": "hostClasses()",
        "[style]": "hostStyle()",
        "(click)": "onHostClick($event)"
      },
      styles: [":host-context(.dropdown,.dropup):not(.btn-group){display:block}:host-context(.dropstart,.dropend):not(.btn-group){display:inline-flex}:host-context(html:not([dir=rtl])) :host-context(.input-group) :host:first-child::ng-deep :first-child{border-top-right-radius:0;border-bottom-right-radius:0}:host-context(html:not([dir=rtl])) :host-context(.input-group) :host:first-child::ng-deep :not(:first-child):not(.dropdown-menu){margin-left:-1px;border-top-left-radius:0;border-bottom-left-radius:0}:host-context(html:not([dir=rtl])) :host-context(.input-group) :host:first-child::ng-deep :not(:first-child):not(.dropdown-menu):not(:only-of-type){border-top-right-radius:0;border-bottom-right-radius:0}:host-context(html:not([dir=rtl])) :host-context(.input-group) :host:last-child::ng-deep :first-child{border-top-left-radius:0;border-bottom-left-radius:0}:host-context(html:not([dir=rtl])) :host-context(.input-group) :host:last-child::ng-deep :first-child:not(:only-of-type){border-top-right-radius:0;border-bottom-right-radius:0}:host-context(html:not([dir=rtl])) :host-context(.input-group) :host:last-child::ng-deep :not(:first-child):not(.dropdown-menu){margin-left:-1px;border-top-left-radius:0;border-bottom-left-radius:0}:host-context([dir=rtl] .input-group) :host{direction:rtl}:host-context([dir=rtl] .input-group) :host:first-child::ng-deep :first-child{border-top-left-radius:0;border-bottom-left-radius:0}:host-context([dir=rtl] .input-group) :host:first-child::ng-deep :not(:first-child):not(.dropdown-menu){margin-right:-1px;border-top-right-radius:0;border-bottom-right-radius:0}:host-context([dir=rtl] .input-group) :host:first-child::ng-deep :not(:first-child):not(.dropdown-menu):not(:only-of-type){border-top-left-radius:0;border-bottom-left-radius:0}:host-context([dir=rtl] .input-group) :host:last-child::ng-deep :first-child{border-top-right-radius:0;border-bottom-right-radius:0}:host-context([dir=rtl] .input-group) :host:last-child::ng-deep :first-child:not(:only-of-type){border-top-left-radius:0;border-bottom-left-radius:0}:host-context([dir=rtl] .input-group) :host:last-child::ng-deep :not(:first-child):not(.dropdown-menu){margin-right:-1px;border-top-right-radius:0;border-bottom-right-radius:0}\n"]
    }]
  }], () => [{
    type: Document,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: NgZone
  }, {
    type: ChangeDetectorRef
  }, {
    type: DropdownService
  }], {
    _toggler: [{
      type: ContentChild,
      args: [DropdownToggleDirective]
    }],
    _menu: [{
      type: ContentChild,
      args: [DropdownMenuDirective]
    }],
    _menuElementRef: [{
      type: ContentChild,
      args: [DropdownMenuDirective, {
        read: ElementRef
      }]
    }]
  });
})();
var DropdownItemDirective = class _DropdownItemDirective {
  constructor() {
    this.#elementRef = inject(ElementRef);
    this.#dropdownService = inject(DropdownService);
    this.dropdown = inject(DropdownComponent, {
      optional: true
    });
    this.active = input();
    this.autoClose = input(true);
    this.disabledInput = input(false, {
      transform: booleanAttribute,
      alias: "disabled"
    });
    this.disabledEffect = linkedSignal({
      source: this.disabledInput,
      computation: (value) => value
    });
    this.ariaCurrent = computed(() => {
      return this.active() ? "true" : null;
    });
    this.hostClasses = computed(() => {
      return {
        "dropdown-item": true,
        active: this.active(),
        disabled: this.disabled
      };
    });
    this.tabIndexInput = input(null, {
      alias: "tabIndex"
    });
    this.tabIndex = linkedSignal({
      source: this.tabIndexInput,
      computation: (value) => this.disabled ? "-1" : value
    });
  }
  #elementRef;
  #dropdownService;
  set disabled(value) {
    this.disabledEffect.set(value);
  }
  get disabled() {
    return this.disabledEffect();
  }
  focus(origin) {
    this.#elementRef?.nativeElement?.focus();
  }
  getLabel() {
    return this.#elementRef?.nativeElement?.textContent.trim();
  }
  onClick($event) {
    this.handleInteraction();
  }
  onKeyUp($event) {
    if ($event.key === "Enter") {
      this.handleInteraction();
    }
  }
  handleInteraction() {
    if (this.autoClose()) {
      this.#dropdownService.toggle({
        visible: "toggle",
        dropdown: this.dropdown
      });
    }
  }
  static {
    this.ɵfac = function DropdownItemDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DropdownItemDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _DropdownItemDirective,
      selectors: [["", "cDropdownItem", ""]],
      hostAttrs: [1, "dropdown-item"],
      hostVars: 5,
      hostBindings: function DropdownItemDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function DropdownItemDirective_click_HostBindingHandler($event) {
            return ctx.onClick($event);
          })("keyup", function DropdownItemDirective_keyup_HostBindingHandler($event) {
            return ctx.onKeyUp($event);
          });
        }
        if (rf & 2) {
          ɵɵattribute("tabindex", ctx.tabIndex())("aria-current", ctx.ariaCurrent())("aria-disabled", ctx.disabled || null);
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        active: [1, "active"],
        autoClose: [1, "autoClose"],
        disabledInput: [1, "disabled", "disabledInput"],
        tabIndexInput: [1, "tabIndex", "tabIndexInput"]
      },
      exportAs: ["cDropdownItem"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DropdownItemDirective, [{
    type: Directive,
    args: [{
      selector: "[cDropdownItem]",
      exportAs: "cDropdownItem",
      host: {
        class: "dropdown-item",
        "[class]": "hostClasses()",
        "[attr.tabindex]": "tabIndex()",
        "[attr.aria-current]": "ariaCurrent()",
        "[attr.aria-disabled]": "disabled || null",
        "(click)": "onClick($event)",
        "(keyup)": "onKeyUp($event)"
      }
    }]
  }], null, null);
})();
var DropdownItemPlainDirective = class _DropdownItemPlainDirective {
  static {
    this.ɵfac = function DropdownItemPlainDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DropdownItemPlainDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _DropdownItemPlainDirective,
      selectors: [["", "cDropdownItemPlain", ""]],
      hostAttrs: [1, "dropdown-item-text"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DropdownItemPlainDirective, [{
    type: Directive,
    args: [{
      selector: "[cDropdownItemPlain]",
      host: {
        class: "dropdown-item-text"
      }
    }]
  }], null, null);
})();
var DropdownCloseDirective = class _DropdownCloseDirective {
  constructor() {
    this.#dropdownService = inject(DropdownService);
    this.dropdown = inject(DropdownComponent, {
      optional: true
    });
    this.disabledInput = input(false, {
      transform: booleanAttribute,
      alias: "disabled"
    });
    this.disabled = linkedSignal({
      source: this.disabledInput,
      computation: (value) => value || null
    });
    this.dropdownComponent = input();
    this.tabIndexInput = input(null, {
      alias: "tabIndex"
    });
    this.tabIndex = linkedSignal({
      source: this.tabIndexInput,
      computation: (value) => this.disabled() ? "-1" : value
    });
  }
  #dropdownService;
  ngAfterViewInit() {
    const dropdownComponent = this.dropdownComponent();
    if (dropdownComponent) {
      this.dropdown = dropdownComponent;
      this.#dropdownService = dropdownComponent?.dropdownService;
    }
  }
  onClick($event) {
    this.handleToggle();
  }
  onKeyUp($event) {
    if ($event.key === "Enter") {
      this.handleToggle();
    }
  }
  handleToggle() {
    if (!this.disabled()) {
      this.#dropdownService.toggle({
        visible: false,
        dropdown: this.dropdown
      });
    }
  }
  static {
    this.ɵfac = function DropdownCloseDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DropdownCloseDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _DropdownCloseDirective,
      selectors: [["", "cDropdownClose", ""]],
      hostVars: 4,
      hostBindings: function DropdownCloseDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function DropdownCloseDirective_click_HostBindingHandler($event) {
            return ctx.onClick($event);
          })("keyup", function DropdownCloseDirective_keyup_HostBindingHandler($event) {
            return ctx.onKeyUp($event);
          });
        }
        if (rf & 2) {
          ɵɵattribute("aria-disabled", ctx.disabled() || null)("tabindex", ctx.tabIndex());
          ɵɵclassProp("disabled", ctx.disabled());
        }
      },
      inputs: {
        disabledInput: [1, "disabled", "disabledInput"],
        dropdownComponent: [1, "dropdownComponent"],
        tabIndexInput: [1, "tabIndex", "tabIndexInput"]
      },
      exportAs: ["cDropdownClose"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DropdownCloseDirective, [{
    type: Directive,
    args: [{
      selector: "[cDropdownClose]",
      exportAs: "cDropdownClose",
      host: {
        "[class.disabled]": "disabled()",
        "[attr.aria-disabled]": "disabled() || null",
        "[attr.tabindex]": "tabIndex()",
        "(click)": "onClick($event)",
        "(keyup)": "onKeyUp($event)"
      }
    }]
  }], null, null);
})();
var DropdownModule = class _DropdownModule {
  static {
    this.ɵfac = function DropdownModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DropdownModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _DropdownModule,
      imports: [DropdownComponent, DropdownCloseDirective, DropdownDividerDirective, DropdownHeaderDirective, DropdownItemDirective, DropdownItemPlainDirective, DropdownMenuDirective, DropdownToggleDirective],
      exports: [DropdownComponent, DropdownCloseDirective, DropdownDividerDirective, DropdownHeaderDirective, DropdownItemDirective, DropdownItemPlainDirective, DropdownMenuDirective, DropdownToggleDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      providers: [DropdownService]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DropdownModule, [{
    type: NgModule,
    args: [{
      imports: [DropdownComponent, DropdownCloseDirective, DropdownDividerDirective, DropdownHeaderDirective, DropdownItemDirective, DropdownItemPlainDirective, DropdownMenuDirective, DropdownToggleDirective],
      exports: [DropdownComponent, DropdownCloseDirective, DropdownDividerDirective, DropdownHeaderDirective, DropdownItemDirective, DropdownItemPlainDirective, DropdownMenuDirective, DropdownToggleDirective],
      providers: [DropdownService]
    }]
  }], null, null);
})();
var FooterComponent = class _FooterComponent {
  constructor() {
    this.position = input();
    this.role = input("contentinfo");
    this.hostClasses = computed(() => {
      return {
        footer: true,
        [`footer-${this.position()}`]: !!this.position()
      };
    });
  }
  static {
    this.ɵfac = function FooterComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FooterComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _FooterComponent,
      selectors: [["c-footer"], ["", "cFooter", ""]],
      hostAttrs: [1, "footer"],
      hostVars: 3,
      hostBindings: function FooterComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("role", ctx.role());
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        position: [1, "position"],
        role: [1, "role"]
      },
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function FooterComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FooterComponent, [{
    type: Component,
    args: [{
      selector: "c-footer, [cFooter]",
      template: "<ng-content />",
      host: {
        class: "footer",
        "[class]": "hostClasses()",
        "[attr.role]": "role()"
      }
    }]
  }], null, null);
})();
var FooterModule = class _FooterModule {
  static {
    this.ɵfac = function FooterModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FooterModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _FooterModule,
      imports: [FooterComponent],
      exports: [FooterComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FooterModule, [{
    type: NgModule,
    args: [{
      imports: [FooterComponent],
      exports: [FooterComponent]
    }]
  }], null, null);
})();
var FormDirective = class _FormDirective {
  constructor() {
    this.validated = input(false, {
      transform: booleanAttribute
    });
  }
  static {
    this.ɵfac = function FormDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FormDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _FormDirective,
      selectors: [["form", "cForm", ""]],
      hostVars: 2,
      hostBindings: function FormDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassProp("was-validated", ctx.validated());
        }
      },
      inputs: {
        validated: [1, "validated"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormDirective, [{
    type: Directive,
    args: [{
      selector: "form[cForm]",
      host: {
        "[class.was-validated]": "validated()"
      }
    }]
  }], null, null);
})();
var FormFeedbackComponent = class _FormFeedbackComponent {
  constructor() {
    this.tooltip = input(false, {
      transform: booleanAttribute
    });
    this.valid = input();
    this.hostClasses = computed(() => {
      const status = this.valid() === true ? "valid" : "invalid";
      const type = this.tooltip() ? "tooltip" : "feedback";
      return {
        [`${status}-${type}`]: true
        // 'valid-feedback': valid === true && !tooltip,
        // 'valid-tooltip': valid === true && tooltip,
        // 'invalid-feedback': valid !== true && !tooltip,
        // 'invalid-tooltip': valid !== true && tooltip
      };
    });
  }
  static {
    this.ɵfac = function FormFeedbackComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FormFeedbackComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _FormFeedbackComponent,
      selectors: [["c-form-feedback"]],
      hostVars: 2,
      hostBindings: function FormFeedbackComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        tooltip: [1, "tooltip"],
        valid: [1, "valid"]
      },
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function FormFeedbackComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormFeedbackComponent, [{
    type: Component,
    args: [{
      selector: "c-form-feedback",
      template: "<ng-content />",
      host: {
        "[class]": "hostClasses()"
      }
    }]
  }], null, null);
})();
var InputGroupComponent = class _InputGroupComponent {
  constructor() {
    this.sizing = input();
    this.hostClasses = computed(() => {
      const sizing = this.sizing();
      return {
        "input-group": true,
        [`input-group-${sizing}`]: !!sizing
      };
    });
  }
  static {
    this.ɵfac = function InputGroupComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _InputGroupComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _InputGroupComponent,
      selectors: [["c-input-group"]],
      hostAttrs: [1, "input-group"],
      hostVars: 2,
      hostBindings: function InputGroupComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        sizing: [1, "sizing"]
      },
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function InputGroupComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputGroupComponent, [{
    type: Component,
    args: [{
      selector: "c-input-group",
      template: "<ng-content />",
      host: {
        class: "input-group",
        "[class]": "hostClasses()"
      }
    }]
  }], null, null);
})();
var FormSelectDirective = class _FormSelectDirective {
  constructor() {
    this.sizing = input();
    this.valid = input();
    this.hostClasses = computed(() => {
      const sizing = this.sizing();
      const valid = this.valid();
      return {
        "form-select": true,
        [`form-select-${sizing}`]: !!sizing,
        "is-valid": valid === true,
        "is-invalid": valid === false
      };
    });
  }
  static {
    this.ɵfac = function FormSelectDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FormSelectDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _FormSelectDirective,
      selectors: [["select", "cSelect", ""]],
      hostAttrs: [1, "form-select"],
      hostVars: 2,
      hostBindings: function FormSelectDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        sizing: [1, "sizing"],
        valid: [1, "valid"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormSelectDirective, [{
    type: Directive,
    args: [{
      selector: "select[cSelect]",
      host: {
        class: "form-select",
        "[class]": "hostClasses()"
      }
    }]
  }], null, null);
})();
var FormLabelDirective = class _FormLabelDirective {
  constructor() {
    this.col = input("", {
      alias: "cLabel"
    });
    this.sizing = input();
    this.hostClasses = computed(() => {
      const col = this.col();
      const sizing = this.sizing();
      return {
        "form-label": true,
        "col-form-label": col === "col",
        [`col-form-label-${sizing}`]: !!sizing && col === "col"
      };
    });
  }
  static {
    this.ɵfac = function FormLabelDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FormLabelDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _FormLabelDirective,
      selectors: [["", "cLabel", ""]],
      hostAttrs: [1, "form-label"],
      hostVars: 2,
      hostBindings: function FormLabelDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        col: [1, "cLabel", "col"],
        sizing: [1, "sizing"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormLabelDirective, [{
    type: Directive,
    args: [{
      selector: "[cLabel]",
      host: {
        class: "form-label",
        "[class]": "hostClasses()"
      }
    }]
  }], null, null);
})();
var FormCheckLabelDirective = class _FormCheckLabelDirective {
  static {
    this.ɵfac = function FormCheckLabelDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FormCheckLabelDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _FormCheckLabelDirective,
      selectors: [["label", "cFormCheckLabel", ""]],
      hostAttrs: [1, "form-check-label"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormCheckLabelDirective, [{
    type: Directive,
    args: [{
      selector: "label[cFormCheckLabel]",
      host: {
        class: "form-check-label"
      }
    }]
  }], null, null);
})();
var FormCheckComponent = class _FormCheckComponent {
  constructor() {
    this.inline = input(false, {
      transform: booleanAttribute
    });
    this.reverse = input(false, {
      transform: booleanAttribute
    });
    this.sizing = input();
    this.switch = input(false, {
      transform: booleanAttribute
    });
    this.formCheckLabel = contentChild(FormCheckLabelDirective);
    this.formCheckClass = computed(() => !!this.formCheckLabel());
    this.hostClasses = computed(() => {
      const sizing = this.sizing();
      const isSwitch = this.switch();
      return {
        "form-check": !!this.formCheckLabel(),
        "form-switch": isSwitch,
        [`form-switch-${sizing}`]: isSwitch && !!sizing,
        "form-check-inline": this.inline(),
        "form-check-reverse": this.reverse()
      };
    });
  }
  static {
    this.ɵfac = function FormCheckComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FormCheckComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _FormCheckComponent,
      selectors: [["c-form-check"]],
      contentQueries: function FormCheckComponent_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuerySignal(dirIndex, ctx.formCheckLabel, FormCheckLabelDirective, 5);
        }
        if (rf & 2) {
          ɵɵqueryAdvance();
        }
      },
      hostVars: 2,
      hostBindings: function FormCheckComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        inline: [1, "inline"],
        reverse: [1, "reverse"],
        sizing: [1, "sizing"],
        switch: [1, "switch"]
      },
      exportAs: ["cFormCheck"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function FormCheckComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormCheckComponent, [{
    type: Component,
    args: [{
      selector: "c-form-check",
      template: "<ng-content />",
      exportAs: "cFormCheck",
      host: {
        "[class]": "hostClasses()"
      }
    }]
  }], null, null);
})();
var FormCheckInputDirective = class _FormCheckInputDirective {
  constructor() {
    this.#renderer = inject(Renderer2);
    this.#hostElement = inject(ElementRef);
    this.type = input("checkbox");
    this.indeterminateInput = input(false, {
      transform: booleanAttribute,
      alias: "indeterminate"
    });
    this.#indeterminateEffect = effect(() => {
      const indeterminate = this.indeterminateInput();
      if (untracked(this.#indeterminate) !== indeterminate) {
        const htmlInputElement = this.#hostElement.nativeElement;
        if (indeterminate) {
          this.#renderer.setProperty(htmlInputElement, "checked", false);
        }
        this.#renderer.setProperty(htmlInputElement, "indeterminate", indeterminate);
        this.#indeterminate.set(indeterminate);
      }
    });
    this.#indeterminate = signal(false);
    this.valid = input();
    this.hostClasses = computed(() => {
      const valid = this.valid();
      return {
        "form-check-input": true,
        "is-valid": valid === true,
        "is-invalid": valid === false
      };
    });
    this.checkedInput = input(false, {
      transform: booleanAttribute,
      alias: "checked"
    });
    this.#checkedEffect = effect(() => {
      const checked = this.checkedInput();
      const htmlInputElement = this.#hostElement?.nativeElement;
      if (htmlInputElement) {
        this.#renderer.setProperty(htmlInputElement, "checked", checked);
      }
    });
  }
  #renderer;
  #hostElement;
  #indeterminateEffect;
  get indeterminate() {
    return this.#indeterminate();
  }
  #indeterminate;
  #checkedEffect;
  get checked() {
    return this.#hostElement?.nativeElement?.checked;
  }
  static {
    this.ɵfac = function FormCheckInputDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FormCheckInputDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _FormCheckInputDirective,
      selectors: [["input", "cFormCheckInput", ""]],
      hostAttrs: [1, "form-check-input"],
      hostVars: 3,
      hostBindings: function FormCheckInputDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("type", ctx.type());
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        type: [1, "type"],
        indeterminateInput: [1, "indeterminate", "indeterminateInput"],
        valid: [1, "valid"],
        checkedInput: [1, "checked", "checkedInput"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormCheckInputDirective, [{
    type: Directive,
    args: [{
      selector: "input[cFormCheckInput]",
      host: {
        class: "form-check-input",
        "[class]": "hostClasses()",
        "[attr.type]": "type()"
      }
    }]
  }], null, null);
})();
var FormControlDirective = class _FormControlDirective {
  constructor() {
    this.#hostElement = inject(ElementRef);
    this.sizing = input();
    this.valid = input();
    this.type = input("text");
    this.plaintext = input(false, {
      transform: booleanAttribute
    });
    this.hostClasses = computed(() => {
      const type = this.type();
      const isRange = type === "range";
      const plaintext = this.plaintext();
      const sizing = this.sizing();
      const valid = this.valid();
      return {
        "form-control": !isRange && !plaintext,
        "form-control-plaintext": !isRange && plaintext,
        "form-control-color": type === "color",
        "form-range": isRange,
        [`form-control-${sizing}`]: !!sizing && !isRange,
        "is-valid": valid === true,
        "is-invalid": valid === false
      };
    });
  }
  #hostElement;
  get hostTag() {
    return this.#hostElement.nativeElement.tagName;
  }
  ngOnInit() {
    const hostTag = this.hostTag.toLowerCase();
    if (hostTag !== "input" && hostTag !== "textarea") {
      console.warn(`CoreUI [cFormControl] works with '<input>' and '<textarea>' - not with '<${hostTag}>'`);
    }
  }
  static {
    this.ɵfac = function FormControlDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FormControlDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _FormControlDirective,
      selectors: [["input", "cFormControl", ""], ["textarea", "cFormControl", ""]],
      hostVars: 3,
      hostBindings: function FormControlDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("type", ctx.type());
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        sizing: [1, "sizing"],
        valid: [1, "valid"],
        type: [1, "type"],
        plaintext: [1, "plaintext"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormControlDirective, [{
    type: Directive,
    args: [{
      selector: "input[cFormControl], textarea[cFormControl]",
      host: {
        "[class]": "hostClasses()",
        "[attr.type]": "type()"
      }
    }]
  }], null, null);
})();
var FormTextDirective = class _FormTextDirective {
  static {
    this.ɵfac = function FormTextDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FormTextDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _FormTextDirective,
      selectors: [["", "cFormText", ""]],
      hostAttrs: [1, "form-text"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormTextDirective, [{
    type: Directive,
    args: [{
      selector: "[cFormText]",
      host: {
        class: "form-text"
      }
    }]
  }], null, null);
})();
var FormFloatingDirective = class _FormFloatingDirective {
  constructor() {
    this.floating = input(true, {
      transform: booleanAttribute,
      alias: "cFormFloating"
    });
  }
  static {
    this.ɵfac = function FormFloatingDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FormFloatingDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _FormFloatingDirective,
      selectors: [["", "cFormFloating", ""]],
      hostVars: 2,
      hostBindings: function FormFloatingDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassProp("form-floating", ctx.floating());
        }
      },
      inputs: {
        floating: [1, "cFormFloating", "floating"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormFloatingDirective, [{
    type: Directive,
    args: [{
      selector: "[cFormFloating]",
      host: {
        "[class.form-floating]": "floating()"
      }
    }]
  }], null, null);
})();
var InputGroupTextDirective = class _InputGroupTextDirective {
  static {
    this.ɵfac = function InputGroupTextDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _InputGroupTextDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _InputGroupTextDirective,
      selectors: [["", "cInputGroupText", ""]],
      hostAttrs: [1, "input-group-text"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputGroupTextDirective, [{
    type: Directive,
    args: [{
      selector: "[cInputGroupText]",
      host: {
        class: "input-group-text"
      }
    }]
  }], null, null);
})();
var FormModule = class _FormModule {
  static {
    this.ɵfac = function FormModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FormModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _FormModule,
      imports: [FormDirective, FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormControlDirective, FormFeedbackComponent, FormFloatingDirective, FormLabelDirective, FormSelectDirective, FormTextDirective, InputGroupComponent, InputGroupTextDirective],
      exports: [FormDirective, FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormControlDirective, FormFeedbackComponent, FormFloatingDirective, FormLabelDirective, FormSelectDirective, FormTextDirective, InputGroupComponent, InputGroupTextDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormModule, [{
    type: NgModule,
    args: [{
      imports: [FormDirective, FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormControlDirective, FormFeedbackComponent, FormFloatingDirective, FormLabelDirective, FormSelectDirective, FormTextDirective, InputGroupComponent, InputGroupTextDirective],
      exports: [FormDirective, FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormControlDirective, FormFeedbackComponent, FormFloatingDirective, FormLabelDirective, FormSelectDirective, FormTextDirective, InputGroupComponent, InputGroupTextDirective]
    }]
  }], null, null);
})();
var ContainerComponent = class _ContainerComponent {
  constructor() {
    this.breakpoint = input("");
    this.fluid = input(false, {
      transform: booleanAttribute
    });
    this.hostClasses = computed(() => {
      const breakpoint = this.breakpoint();
      const fluid = this.fluid();
      return {
        container: !fluid && !breakpoint,
        "container-fluid": !!fluid,
        [`container-${breakpoint}`]: !!breakpoint
      };
    });
  }
  static {
    this.ɵfac = function ContainerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ContainerComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ContainerComponent,
      selectors: [["c-container"], ["", "cContainer", ""]],
      hostVars: 2,
      hostBindings: function ContainerComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        breakpoint: [1, "breakpoint"],
        fluid: [1, "fluid"]
      },
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function ContainerComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      styles: ["[_nghost-%COMP%]{display:block}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContainerComponent, [{
    type: Component,
    args: [{
      selector: "c-container, [cContainer]",
      template: "<ng-content />",
      host: {
        "[class]": "hostClasses()"
      },
      styles: [":host{display:block}\n"]
    }]
  }], null, null);
})();
var ColDirective = class _ColDirective {
  constructor() {
    this.cCol = input(false, {
      transform: this.coerceInput
    });
    this.xs = input(false, {
      transform: this.coerceInput
    });
    this.sm = input(false, {
      transform: this.coerceInput
    });
    this.md = input(false, {
      transform: this.coerceInput
    });
    this.lg = input(false, {
      transform: this.coerceInput
    });
    this.xl = input(false, {
      transform: this.coerceInput
    });
    this.xxl = input(false, {
      transform: this.coerceInput
    });
    this.breakpoints = computed(() => {
      return {
        xs: this.xs() || this.cCol(),
        sm: this.sm(),
        md: this.md(),
        lg: this.lg(),
        xl: this.xl(),
        xxl: this.xxl()
      };
    });
    this.offset = input();
    this.order = input();
    this.hostClasses = computed(() => {
      const classes = {
        col: true
      };
      const breakpoints = this.breakpoints();
      const offsetInput = this.offset();
      const orderInput = this.order();
      Object.keys(BreakpointInfix).forEach((breakpoint) => {
        const value = breakpoints[breakpoint];
        const infix = breakpoint === "xs" ? "" : `-${breakpoint}`;
        classes[`col${infix}`] = value === true;
        classes[`col${infix}-${value}`] = typeof value === "number" || typeof value === "string";
      });
      if (typeof offsetInput === "object") {
        const offset2 = __spreadValues({}, offsetInput);
        Object.entries(offset2).forEach((entry) => {
          const [breakpoint, value] = [...entry];
          const infix = breakpoint === "xs" ? "" : `-${breakpoint}`;
          classes[`offset${infix}-${value}`] = value >= 0 && value <= 11;
        });
      } else {
        const offset2 = numberAttribute(offsetInput);
        classes[`offset-${offset2}`] = typeof offset2 === "number" && offset2 > 0 && offset2 <= 11;
      }
      if (typeof orderInput === "object") {
        const order2 = __spreadValues({}, orderInput);
        Object.entries(order2).forEach((entry) => {
          const [breakpoint, value] = [...entry];
          const infix = breakpoint === "xs" ? "" : `-${breakpoint}`;
          classes[`order${infix}-${value}`] = !!value;
        });
      } else {
        const order2 = orderInput;
        classes[`order-${order2}`] = !!order2;
      }
      classes["col"] = !Object.entries(classes).filter((i) => i[0].startsWith("col-") && i[1]).length || breakpoints["xs"] === true;
      return classes;
    });
  }
  coerceInput(value) {
    if (value === "auto") {
      return value;
    }
    if (value === "" || value === void 0 || value === null) {
      return booleanAttribute(value);
    }
    if (typeof value === "boolean") {
      return value;
    }
    return numberAttribute(value);
  }
  static {
    this.ɵfac = function ColDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ColDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _ColDirective,
      selectors: [["", "cCol", ""]],
      hostVars: 2,
      hostBindings: function ColDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        cCol: [1, "cCol"],
        xs: [1, "xs"],
        sm: [1, "sm"],
        md: [1, "md"],
        lg: [1, "lg"],
        xl: [1, "xl"],
        xxl: [1, "xxl"],
        offset: [1, "offset"],
        order: [1, "order"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ColDirective, [{
    type: Directive,
    args: [{
      selector: "[cCol]",
      host: {
        "[class]": "hostClasses()"
      }
    }]
  }], null, null);
})();
var ColComponent = class _ColComponent extends ColDirective {
  static {
    this.ɵfac = /* @__PURE__ */ (() => {
      let ɵColComponent_BaseFactory;
      return function ColComponent_Factory(__ngFactoryType__) {
        return (ɵColComponent_BaseFactory || (ɵColComponent_BaseFactory = ɵɵgetInheritedFactory(_ColComponent)))(__ngFactoryType__ || _ColComponent);
      };
    })();
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ColComponent,
      selectors: [["c-col"]],
      features: [ɵɵInheritDefinitionFeature],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function ColComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      styles: ["[_nghost-%COMP%]{display:block}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ColComponent, [{
    type: Component,
    args: [{
      selector: "c-col",
      template: "<ng-content />",
      styles: [":host{display:block}\n"]
    }]
  }], null, null);
})();
var RowDirective = class _RowDirective {
  constructor() {
    this.xs = input();
    this.sm = input();
    this.md = input();
    this.lg = input();
    this.xl = input();
    this.xxl = input();
    this.hostClasses = computed(() => {
      const cols = this.xs();
      const classes = {
        row: true,
        [`row-cols-${cols}`]: !!cols
      };
      Object.keys(BreakpointInfix).forEach((breakpoint) => {
        const value = this[breakpoint]();
        if (typeof value === "number" || typeof value === "string") {
          const infix = breakpoint === "xs" ? "" : `-${breakpoint}`;
          classes[`row-cols${infix}-${value}`] = !!value;
        }
      });
      return classes;
    });
  }
  static {
    this.ɵfac = function RowDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RowDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _RowDirective,
      selectors: [["", "cRow", ""]],
      hostAttrs: [1, "row"],
      hostVars: 2,
      hostBindings: function RowDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        xs: [1, "xs"],
        sm: [1, "sm"],
        md: [1, "md"],
        lg: [1, "lg"],
        xl: [1, "xl"],
        xxl: [1, "xxl"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RowDirective, [{
    type: Directive,
    args: [{
      selector: "[cRow]",
      host: {
        class: "row",
        "[class]": "hostClasses()"
      }
    }]
  }], null, null);
})();
var RowComponent = class _RowComponent extends RowDirective {
  static {
    this.ɵfac = /* @__PURE__ */ (() => {
      let ɵRowComponent_BaseFactory;
      return function RowComponent_Factory(__ngFactoryType__) {
        return (ɵRowComponent_BaseFactory || (ɵRowComponent_BaseFactory = ɵɵgetInheritedFactory(_RowComponent)))(__ngFactoryType__ || _RowComponent);
      };
    })();
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _RowComponent,
      selectors: [["c-row"]],
      features: [ɵɵInheritDefinitionFeature],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function RowComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RowComponent, [{
    type: Component,
    args: [{
      selector: "c-row",
      template: "<ng-content />"
    }]
  }], null, null);
})();
var GutterDirective = class _GutterDirective {
  constructor() {
    this.gutter = input({});
    this.hostClasses = computed(() => {
      let gutterClass;
      const gutterInput = this.gutter();
      if (typeof gutterInput === "number") {
        gutterClass = _GutterDirective.getGutterClasses({
          g: gutterInput
        });
        return gutterClass;
      }
      {
        const {
          g,
          gx,
          gy
        } = __spreadValues({}, gutterInput);
        gutterClass = _GutterDirective.getGutterClasses({
          g,
          gx,
          gy
        });
      }
      Object.keys(BreakpointInfix).forEach((key) => {
        const gutter = gutterInput[key] ? __spreadValues({}, gutterInput[key]) : void 0;
        if (gutter) {
          const classes = _GutterDirective.getGutterClasses(gutter, key);
          gutterClass = __spreadValues(__spreadValues({}, gutterClass), classes);
        }
      });
      return gutterClass;
    });
  }
  static getGutterClasses(gutter, breakpoint) {
    const {
      g,
      gx,
      gy
    } = __spreadValues({}, gutter);
    const infix = breakpoint ? `-${breakpoint}` : "";
    return {
      [`g${infix}-${g}`]: typeof g === "number",
      [`gx${infix}-${gx}`]: typeof gx === "number",
      [`gy${infix}-${gy}`]: typeof gy === "number"
    };
  }
  static {
    this.ɵfac = function GutterDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _GutterDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _GutterDirective,
      selectors: [["", "gutter", ""]],
      hostVars: 2,
      hostBindings: function GutterDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        gutter: [1, "gutter"]
      },
      exportAs: ["gutter"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GutterDirective, [{
    type: Directive,
    args: [{
      // eslint-disable-next-line @angular-eslint/directive-selector
      selector: "[gutter]",
      exportAs: "gutter",
      host: {
        "[class]": "hostClasses()"
      }
    }]
  }], null, null);
})();
var GridModule = class _GridModule {
  static {
    this.ɵfac = function GridModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _GridModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _GridModule,
      imports: [ColComponent, ColDirective, ContainerComponent, GutterDirective, RowComponent, RowDirective],
      exports: [ColComponent, ColDirective, ContainerComponent, GutterDirective, RowComponent, RowDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridModule, [{
    type: NgModule,
    args: [{
      imports: [ColComponent, ColDirective, ContainerComponent, GutterDirective, RowComponent, RowDirective],
      exports: [ColComponent, ColDirective, ContainerComponent, GutterDirective, RowComponent, RowDirective]
    }]
  }], null, null);
})();
var HeaderComponent = class _HeaderComponent {
  constructor() {
    this.container = input();
    this.position = input();
    this.role = input("banner");
    this.hostClasses = computed(() => {
      return !!this.container() ? this.containerClasses() : this.headerClasses();
    });
    this.headerClasses = computed(() => {
      const position = this.position();
      return {
        header: true,
        [`header-${position}`]: !!position
      };
    });
    this.containerClasses = computed(() => {
      const container = this.container();
      return {
        container: container === true,
        [`container-${container}`]: typeof container === "string"
      };
    });
  }
  static {
    this.ɵfac = function HeaderComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HeaderComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _HeaderComponent,
      selectors: [["c-header"], ["", "c-header", ""]],
      hostVars: 3,
      hostBindings: function HeaderComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("role", ctx.role());
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        container: [1, "container"],
        position: [1, "position"],
        role: [1, "role"]
      },
      exportAs: ["cHeader"],
      ngContentSelectors: _c2,
      decls: 2,
      vars: 1,
      consts: [[3, "ngClass"]],
      template: function HeaderComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef(_c2);
          ɵɵtemplate(0, HeaderComponent_Conditional_0_Template, 2, 1, "div", 0)(1, HeaderComponent_Conditional_1_Template, 1, 0);
        }
        if (rf & 2) {
          ɵɵconditional(!!ctx.container() ? 0 : 1);
        }
      },
      dependencies: [NgClass],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HeaderComponent, [{
    type: Component,
    args: [{
      selector: "c-header, [c-header]",
      imports: [NgClass],
      exportAs: "cHeader",
      host: {
        "[attr.role]": "role()",
        "[class]": "hostClasses()"
      },
      template: '@if (!!container()) {\n  <div [ngClass]="headerClasses()">\n    <ng-content />\n  </div>\n} @else {\n  <ng-content />\n}\n'
    }]
  }], null, null);
})();
var HeaderBrandComponent = class _HeaderBrandComponent {
  constructor() {
    this.role = input("button");
  }
  static {
    this.ɵfac = function HeaderBrandComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HeaderBrandComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _HeaderBrandComponent,
      selectors: [["c-header-brand"]],
      hostAttrs: [1, "header-brand"],
      hostVars: 1,
      hostBindings: function HeaderBrandComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("role", ctx.role());
        }
      },
      inputs: {
        role: [1, "role"]
      },
      exportAs: ["cHeaderBrand"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function HeaderBrandComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HeaderBrandComponent, [{
    type: Component,
    args: [{
      selector: "c-header-brand",
      template: "<ng-content />",
      exportAs: "cHeaderBrand",
      host: {
        "[attr.role]": "role()",
        class: "header-brand"
      }
    }]
  }], null, null);
})();
var HeaderDividerComponent = class _HeaderDividerComponent {
  static {
    this.ɵfac = function HeaderDividerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HeaderDividerComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _HeaderDividerComponent,
      selectors: [["c-header-divider"], ["", "cHeaderDivider", ""]],
      hostAttrs: [1, "header-divider"],
      decls: 0,
      vars: 0,
      template: function HeaderDividerComponent_Template(rf, ctx) {
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HeaderDividerComponent, [{
    type: Component,
    args: [{
      selector: "c-header-divider, [cHeaderDivider]",
      template: ``,
      host: {
        class: "header-divider"
      }
    }]
  }], null, null);
})();
var HeaderNavComponent = class _HeaderNavComponent {
  constructor() {
    this.role = input("navigation");
  }
  static {
    this.ɵfac = function HeaderNavComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HeaderNavComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _HeaderNavComponent,
      selectors: [["c-header-nav"]],
      hostAttrs: [1, "header-nav"],
      hostVars: 1,
      hostBindings: function HeaderNavComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("role", ctx.role());
        }
      },
      inputs: {
        role: [1, "role"]
      },
      exportAs: ["cHeaderNav"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function HeaderNavComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HeaderNavComponent, [{
    type: Component,
    args: [{
      selector: "c-header-nav",
      template: "<ng-content />",
      exportAs: "cHeaderNav",
      host: {
        "[attr.role]": "role()",
        class: "header-nav"
      }
    }]
  }], null, null);
})();
var HeaderTextComponent = class _HeaderTextComponent {
  static {
    this.ɵfac = function HeaderTextComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HeaderTextComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _HeaderTextComponent,
      selectors: [["c-header-text"], ["", "cHeaderText", ""]],
      hostAttrs: [1, "header-text"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function HeaderTextComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HeaderTextComponent, [{
    type: Component,
    args: [{
      selector: "c-header-text, [cHeaderText]",
      template: "<ng-content />",
      host: {
        class: "header-text"
      }
    }]
  }], null, null);
})();
var HeaderTogglerDirective = class _HeaderTogglerDirective {
  constructor() {
    this.#renderer = inject(Renderer2);
    this.#hostElement = inject(ElementRef);
    this.type = input("button");
    this.ariaLabel = input("Toggle navigation");
  }
  #renderer;
  #hostElement;
  addDefaultIcon() {
    const span = this.#renderer.createElement("span");
    this.#renderer.addClass(span, "header-toggler-icon");
    this.#renderer.appendChild(this.#hostElement.nativeElement, span);
  }
  ngAfterContentInit() {
    const hasContent = this.#hostElement.nativeElement.childNodes.length > 0;
    if (!hasContent) {
      this.addDefaultIcon();
    }
  }
  static {
    this.ɵfac = function HeaderTogglerDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HeaderTogglerDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _HeaderTogglerDirective,
      selectors: [["", "cHeaderToggler", ""]],
      hostAttrs: [1, "header-toggler"],
      hostVars: 2,
      hostBindings: function HeaderTogglerDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("type", ctx.type())("aria-label", ctx.ariaLabel());
        }
      },
      inputs: {
        type: [1, "type"],
        ariaLabel: [1, "ariaLabel"]
      },
      exportAs: ["cHeaderToggler"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HeaderTogglerDirective, [{
    type: Directive,
    args: [{
      selector: "[cHeaderToggler]",
      exportAs: "cHeaderToggler",
      host: {
        "[attr.type]": "type()",
        "[attr.aria-label]": "ariaLabel()",
        class: "header-toggler"
      }
    }]
  }], null, null);
})();
var HeaderModule = class _HeaderModule {
  static {
    this.ɵfac = function HeaderModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HeaderModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _HeaderModule,
      imports: [HeaderComponent, HeaderBrandComponent, HeaderDividerComponent, HeaderNavComponent, HeaderTextComponent, HeaderTogglerDirective],
      exports: [HeaderComponent, HeaderBrandComponent, HeaderDividerComponent, HeaderNavComponent, HeaderTextComponent, HeaderTogglerDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HeaderModule, [{
    type: NgModule,
    args: [{
      imports: [HeaderComponent, HeaderBrandComponent, HeaderDividerComponent, HeaderNavComponent, HeaderTextComponent, HeaderTogglerDirective],
      exports: [HeaderComponent, HeaderBrandComponent, HeaderDividerComponent, HeaderNavComponent, HeaderTextComponent, HeaderTogglerDirective]
    }]
  }], null, null);
})();
var ImgDirective = class _ImgDirective {
  constructor() {
    this.align = input("");
    this.fluid = input(false, {
      transform: booleanAttribute
    });
    this.rounded = input(false, {
      transform: booleanAttribute
    });
    this.thumbnail = input(false, {
      transform: booleanAttribute
    });
    this.placeholderColor = input("transparent");
    this.hostStyles = computed(() => {
      return {
        backgroundColor: this.placeholderColor()
      };
    });
    this.hostClasses = computed(() => {
      const align = this.align();
      return {
        [`float-${align}`]: align === "start" || align === "end",
        "d-block": align === "center",
        "mx-auto": align === "center",
        "img-fluid": this.fluid(),
        rounded: this.rounded(),
        "img-thumbnail": this.thumbnail()
      };
    });
  }
  static {
    this.ɵfac = function ImgDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ImgDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _ImgDirective,
      selectors: [["", "cImg", ""]],
      hostVars: 4,
      hostBindings: function ImgDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵstyleMap(ctx.hostStyles());
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        align: [1, "align"],
        fluid: [1, "fluid"],
        rounded: [1, "rounded"],
        thumbnail: [1, "thumbnail"],
        placeholderColor: [1, "placeholderColor"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ImgDirective, [{
    type: Directive,
    args: [{
      selector: "[cImg]",
      host: {
        "[class]": "hostClasses()",
        "[style]": "hostStyles()"
      }
    }]
  }], null, null);
})();
var ImgModule = class _ImgModule {
  static {
    this.ɵfac = function ImgModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ImgModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _ImgModule,
      imports: [ImgDirective],
      exports: [ImgDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ImgModule, [{
    type: NgModule,
    args: [{
      imports: [ImgDirective],
      exports: [ImgDirective]
    }]
  }], null, null);
})();
var ListGroupDirective = class _ListGroupDirective {
  constructor() {
    this.flush = input(false, {
      transform: booleanAttribute
    });
    this.horizontal = input();
    this.hostClasses = computed(() => {
      const horizontal = this.horizontal();
      return {
        "list-group": true,
        "list-group-horizontal": horizontal === true || horizontal === "",
        [`list-group-horizontal-${horizontal}`]: !!horizontal && typeof horizontal !== "boolean",
        "list-group-flush": this.flush()
      };
    });
  }
  static {
    this.ɵfac = function ListGroupDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ListGroupDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _ListGroupDirective,
      selectors: [["", "cListGroup", ""]],
      hostAttrs: [1, "list-group"],
      hostVars: 2,
      hostBindings: function ListGroupDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        flush: [1, "flush"],
        horizontal: [1, "horizontal"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ListGroupDirective, [{
    type: Directive,
    args: [{
      selector: "[cListGroup]",
      host: {
        class: "list-group",
        "[class]": "hostClasses()"
      }
    }]
  }], null, null);
})();
var ListGroupItemDirective = class _ListGroupItemDirective {
  constructor() {
    this.hostElement = inject(ElementRef);
    this.active = input();
    this.color = input();
    this.disabled = input(false, {
      transform: booleanAttribute
    });
    this.hostClasses = computed(() => {
      const host = this.hostElement.nativeElement;
      return {
        "list-group-item": true,
        "list-group-item-action": host.nodeName === "A" || host.nodeName === "BUTTON",
        active: !!this.active(),
        disabled: this._disabled(),
        [`list-group-item-${this.color()}`]: !!this.color()
      };
    });
    this._disabled = computed(() => this.disabled());
    this.ariaDisabled = computed(() => {
      return this._disabled() ? true : null;
    });
    this.attrDisabled = computed(() => {
      return this._disabled() ? "" : null;
    });
    this.tabIndex = computed(() => {
      return this._disabled() ? "-1" : null;
    });
    this.ariaCurrent = computed(() => {
      return this.active() || null;
    });
  }
  static {
    this.ɵfac = function ListGroupItemDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ListGroupItemDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _ListGroupItemDirective,
      selectors: [["", "cListGroupItem", ""], ["c-list-group-item"]],
      hostVars: 6,
      hostBindings: function ListGroupItemDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("aria-disabled", ctx.ariaDisabled())("aria-current", ctx.ariaCurrent())("disabled", ctx.attrDisabled())("tabindex", ctx.tabIndex());
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        active: [1, "active"],
        color: [1, "color"],
        disabled: [1, "disabled"]
      },
      exportAs: ["cListGroupItem"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ListGroupItemDirective, [{
    type: Directive,
    args: [{
      selector: "[cListGroupItem], c-list-group-item",
      exportAs: "cListGroupItem",
      host: {
        "[class]": "hostClasses()",
        "[attr.aria-disabled]": "ariaDisabled()",
        "[attr.aria-current]": "ariaCurrent()",
        "[attr.disabled]": "attrDisabled()",
        "[attr.tabindex]": "tabIndex()"
      }
    }]
  }], null, null);
})();
var ListGroupModule = class _ListGroupModule {
  static {
    this.ɵfac = function ListGroupModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ListGroupModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _ListGroupModule,
      imports: [ListGroupDirective, ListGroupItemDirective],
      exports: [ListGroupDirective, ListGroupItemDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ListGroupModule, [{
    type: NgModule,
    args: [{
      exports: [ListGroupDirective, ListGroupItemDirective],
      imports: [ListGroupDirective, ListGroupItemDirective]
    }]
  }], null, null);
})();
var NavLinkDirective = class _NavLinkDirective {
  constructor() {
    this.cNavLink = input(true, {
      transform: booleanAttribute
    });
    this.active = input();
    this.disabled = input(false, {
      transform: booleanAttribute
    });
    this.ariaCurrent = computed(() => {
      return this.active() ? "page" : null;
    });
    this.ariaDisabled = null;
    this.attrDisabled = null;
    this.attrTabindex = null;
    this.styleCursor = null;
    this.#disabledEffect = effect(() => {
      const disabled = this.disabled();
      this.ariaDisabled = disabled || null;
      this.attrDisabled = disabled ? "" : null;
      this.attrTabindex = disabled ? "-1" : null;
      this.styleCursor = disabled ? null : "pointer";
    });
    this.hostClasses = computed(() => {
      return {
        "nav-link": this.cNavLink(),
        disabled: this.disabled(),
        active: this.active()
      };
    });
  }
  #disabledEffect;
  static {
    this.ɵfac = function NavLinkDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NavLinkDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _NavLinkDirective,
      selectors: [["", "cNavLink", ""]],
      hostVars: 8,
      hostBindings: function NavLinkDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("aria-current", ctx.ariaCurrent())("aria-disabled", ctx.ariaDisabled)("disabled", ctx.attrDisabled)("tabindex", ctx.attrTabindex);
          ɵɵclassMap(ctx.hostClasses());
          ɵɵstyleProp("cursor", ctx.styleCursor);
        }
      },
      inputs: {
        cNavLink: [1, "cNavLink"],
        active: [1, "active"],
        disabled: [1, "disabled"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NavLinkDirective, [{
    type: Directive,
    args: [{
      selector: "[cNavLink]",
      host: {
        "[class]": "hostClasses()",
        "[attr.aria-current]": "ariaCurrent()",
        "[attr.aria-disabled]": "ariaDisabled",
        "[attr.disabled]": "attrDisabled",
        "[attr.tabindex]": "attrTabindex",
        "[style.cursor]": "styleCursor"
      }
    }]
  }], null, null);
})();
var NavItemComponent = class _NavItemComponent {
  static {
    this.ɵfac = function NavItemComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NavItemComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NavItemComponent,
      selectors: [["c-nav-item"]],
      hostAttrs: [1, "nav-item"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function NavItemComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      styles: ["[_nghost-%COMP%]{display:list-item;text-align:match-parent;text-align:-webkit-match-parent}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NavItemComponent, [{
    type: Component,
    args: [{
      selector: "c-nav-item",
      template: "<ng-content />",
      host: {
        class: "nav-item"
      },
      styles: [":host{display:list-item;text-align:match-parent;text-align:-webkit-match-parent}\n"]
    }]
  }], null, null);
})();
var NavComponent = class _NavComponent {
  constructor() {
    this.layout = input();
    this.variant = input();
    this.hostClasses = computed(() => {
      const layout = this.layout();
      const variant = this.variant();
      return {
        nav: true,
        [`nav-${layout}`]: !!layout,
        [`nav-${variant}`]: !!variant
      };
    });
  }
  static {
    this.ɵfac = function NavComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NavComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NavComponent,
      selectors: [["c-nav"]],
      hostAttrs: [1, "nav"],
      hostVars: 2,
      hostBindings: function NavComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        layout: [1, "layout"],
        variant: [1, "variant"]
      },
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function NavComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      styles: ["[_nghost-%COMP%]   .nav-link[_ngcontent-%COMP%]:focus{outline:0}.nav-underline-border[_nghost-%COMP%]{column-gap:0}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NavComponent, [{
    type: Component,
    args: [{
      selector: "c-nav",
      template: "<ng-content />",
      host: {
        class: "nav",
        "[class]": "hostClasses()"
      },
      styles: [":host .nav-link:focus{outline:0}:host.nav-underline-border{column-gap:0}\n"]
    }]
  }], null, null);
})();
var NavModule = class _NavModule {
  static {
    this.ɵfac = function NavModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NavModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _NavModule,
      imports: [NavComponent, NavItemComponent, NavLinkDirective],
      exports: [NavComponent, NavItemComponent, NavLinkDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NavModule, [{
    type: NgModule,
    args: [{
      imports: [NavComponent, NavItemComponent, NavLinkDirective],
      exports: [NavComponent, NavItemComponent, NavLinkDirective]
    }]
  }], null, null);
})();
var NavbarComponent = class _NavbarComponent {
  constructor() {
    this.#breakpointObserver = inject(BreakpointObserver);
    this.#document = inject(DOCUMENT);
    this.#hostElement = inject(ElementRef);
    this.color = input();
    this.container = input();
    this.expand = input();
    this.placement = input();
    this.role = input("navigation");
    this.collapse = contentChild(CollapseDirective);
    this.hostClasses = computed(() => {
      const color = this.color();
      const expand = this.expand();
      const expandClassSuffix = expand === true ? "" : `-${expand}`;
      const placement = this.placement();
      return {
        navbar: true,
        [`navbar-expand${expandClassSuffix}`]: !!expand,
        [`bg-${color}`]: !!color,
        [`${placement}`]: !!placement
      };
    });
    this.containerClass = computed(() => {
      const container = this.container();
      return `container${container !== true ? "-" + container : ""}`;
    });
    this.computedStyle = signal("");
    this.afterNextRenderFn = afterRender({
      read: () => {
        const expand = this.expand();
        if (typeof expand === "string") {
          const computedStyle = this.#document.defaultView?.getComputedStyle(this.#hostElement.nativeElement)?.getPropertyValue(`--cui-breakpoint-${expand}`) ?? false;
          computedStyle && this.computedStyle.set(computedStyle);
        }
      }
    });
    this.breakpoint = computed(() => {
      const expand = this.expand();
      if (typeof expand === "string") {
        return this.computedStyle();
      }
      return false;
    });
  }
  #breakpointObserver;
  #document;
  #hostElement;
  #observer;
  ngAfterContentInit() {
    const breakpoint = this.breakpoint();
    if (breakpoint) {
      const onBreakpoint = `(min-width: ${breakpoint})`;
      this.#observer = this.#breakpointObserver.observe([onBreakpoint]).pipe().subscribe((result) => {
        const collapse = this.collapse();
        if (collapse) {
          const animate2 = collapse.animate();
          collapse.animate.set(false);
          collapse.toggle(false);
          setTimeout(() => {
            collapse.toggle(result.matches);
            setTimeout(() => {
              collapse.animate.set(animate2);
            });
          });
        }
      });
    }
  }
  ngOnDestroy() {
    this.#observer?.unsubscribe();
  }
  static {
    this.ɵfac = function NavbarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NavbarComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NavbarComponent,
      selectors: [["c-navbar"]],
      contentQueries: function NavbarComponent_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuerySignal(dirIndex, ctx.collapse, CollapseDirective, 5);
        }
        if (rf & 2) {
          ɵɵqueryAdvance();
        }
      },
      hostVars: 3,
      hostBindings: function NavbarComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("role", ctx.role());
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        color: [1, "color"],
        container: [1, "container"],
        expand: [1, "expand"],
        placement: [1, "placement"],
        role: [1, "role"]
      },
      features: [ɵɵHostDirectivesFeature([{
        directive: ThemeDirective,
        inputs: ["colorScheme", "colorScheme"]
      }])],
      ngContentSelectors: _c2,
      decls: 5,
      vars: 1,
      consts: [["withContainerTemplate", ""], ["noContainerTemplate", ""], [4, "ngTemplateOutlet"], [3, "ngClass"]],
      template: function NavbarComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef(_c2);
          ɵɵtemplate(0, NavbarComponent_ng_container_0_Template, 1, 0, "ng-container", 2)(1, NavbarComponent_ng_template_1_Template, 2, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor)(3, NavbarComponent_ng_template_3_Template, 1, 0, "ng-template", null, 1, ɵɵtemplateRefExtractor);
        }
        if (rf & 2) {
          const withContainerTemplate_r2 = ɵɵreference(2);
          const noContainerTemplate_r3 = ɵɵreference(4);
          ɵɵproperty("ngTemplateOutlet", ctx.container() ? withContainerTemplate_r2 : noContainerTemplate_r3);
        }
      },
      dependencies: [NgClass, NgTemplateOutlet],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NavbarComponent, [{
    type: Component,
    args: [{
      selector: "c-navbar",
      imports: [NgClass, NgTemplateOutlet],
      hostDirectives: [{
        directive: ThemeDirective,
        inputs: ["colorScheme"]
      }],
      host: {
        "[class]": "hostClasses()",
        "[attr.role]": "role()"
      },
      template: '<ng-container *ngTemplateOutlet="container() ? withContainerTemplate : noContainerTemplate" />\n\n<ng-template #withContainerTemplate>\n  <div [ngClass]="containerClass()">\n    <ng-content />\n  </div>\n</ng-template>\n\n<ng-template #noContainerTemplate>\n  <ng-content />\n</ng-template>\n'
    }]
  }], null, null);
})();
var NavbarBrandDirective = class _NavbarBrandDirective {
  constructor() {
    this.role = input("button");
  }
  static {
    this.ɵfac = function NavbarBrandDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NavbarBrandDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _NavbarBrandDirective,
      selectors: [["", "cNavbarBrand", ""]],
      hostAttrs: [1, "navbar-brand"],
      hostVars: 1,
      hostBindings: function NavbarBrandDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("role", ctx.role());
        }
      },
      inputs: {
        role: [1, "role"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NavbarBrandDirective, [{
    type: Directive,
    args: [{
      selector: "[cNavbarBrand]",
      host: {
        class: "navbar-brand",
        "[attr.role]": "role()"
      }
    }]
  }], null, null);
})();
var NavbarNavComponent = class _NavbarNavComponent {
  constructor() {
    this.scroll = input(false, {
      transform: booleanAttribute
    });
    this.hostClasses = computed(() => {
      return {
        "navbar-nav": true,
        "navbar-nav-scroll": this.scroll()
      };
    });
  }
  static {
    this.ɵfac = function NavbarNavComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NavbarNavComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NavbarNavComponent,
      selectors: [["c-navbar-nav"]],
      hostVars: 2,
      hostBindings: function NavbarNavComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        scroll: [1, "scroll"]
      },
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function NavbarNavComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NavbarNavComponent, [{
    type: Component,
    args: [{
      selector: "c-navbar-nav",
      template: "<ng-content />",
      host: {
        "[class]": "hostClasses()"
      }
    }]
  }], null, null);
})();
var NavbarTextComponent = class _NavbarTextComponent {
  static {
    this.ɵfac = function NavbarTextComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NavbarTextComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NavbarTextComponent,
      selectors: [["c-navbar-text"]],
      hostAttrs: [1, "navbar-text"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function NavbarTextComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NavbarTextComponent, [{
    type: Component,
    args: [{
      selector: "c-navbar-text",
      template: "<ng-content />",
      host: {
        class: "navbar-text"
      }
    }]
  }], null, null);
})();
var NavbarTogglerDirective = class _NavbarTogglerDirective {
  #renderer;
  #hostElement;
  constructor() {
    this.#renderer = inject(Renderer2);
    this.#hostElement = inject(ElementRef);
    this.collapseRef = input(void 0, {
      alias: "cNavbarToggler"
    });
    this.type = input("button");
    this.ariaLabel = input("Toggle navigation");
    afterNextRender({
      read: () => {
        const hasContent = this.#hostElement.nativeElement.childNodes.length;
        if (!hasContent) {
          this.addDefaultIcon();
        }
      }
    });
  }
  handleClick($event) {
    const collapseRef = this.collapseRef();
    collapseRef?.toggle(!collapseRef?.visible());
  }
  addDefaultIcon() {
    const span = this.#renderer.createElement("span");
    this.#renderer.addClass(span, "navbar-toggler-icon");
    this.#renderer.appendChild(this.#hostElement.nativeElement, span);
  }
  static {
    this.ɵfac = function NavbarTogglerDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NavbarTogglerDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _NavbarTogglerDirective,
      selectors: [["", "cNavbarToggler", ""]],
      hostAttrs: [1, "navbar-toggler"],
      hostVars: 2,
      hostBindings: function NavbarTogglerDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function NavbarTogglerDirective_click_HostBindingHandler($event) {
            return ctx.handleClick($event);
          });
        }
        if (rf & 2) {
          ɵɵattribute("aria-label", ctx.ariaLabel())("type", ctx.type());
        }
      },
      inputs: {
        collapseRef: [1, "cNavbarToggler", "collapseRef"],
        type: [1, "type"],
        ariaLabel: [1, "ariaLabel"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NavbarTogglerDirective, [{
    type: Directive,
    args: [{
      selector: "[cNavbarToggler]",
      host: {
        "[attr.aria-label]": "ariaLabel()",
        "[attr.type]": "type()",
        class: "navbar-toggler",
        "(click)": "handleClick($event)"
      }
    }]
  }], () => [], null);
})();
var NavbarModule = class _NavbarModule {
  static {
    this.ɵfac = function NavbarModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NavbarModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _NavbarModule,
      imports: [NavbarBrandDirective, NavbarComponent, NavbarNavComponent, NavbarTextComponent, NavbarTogglerDirective],
      exports: [NavbarBrandDirective, NavbarComponent, NavbarNavComponent, NavbarTextComponent, NavbarTogglerDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NavbarModule, [{
    type: NgModule,
    args: [{
      exports: [NavbarBrandDirective, NavbarComponent, NavbarNavComponent, NavbarTextComponent, NavbarTogglerDirective],
      imports: [NavbarBrandDirective, NavbarComponent, NavbarNavComponent, NavbarTextComponent, NavbarTogglerDirective]
    }]
  }], null, null);
})();
var ModalBodyComponent = class _ModalBodyComponent {
  static {
    this.ɵfac = function ModalBodyComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ModalBodyComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ModalBodyComponent,
      selectors: [["c-modal-body"]],
      hostAttrs: [1, "modal-body"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function ModalBodyComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      styles: ["[_nghost-%COMP%]{display:block}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ModalBodyComponent, [{
    type: Component,
    args: [{
      selector: "c-modal-body",
      template: "<ng-content />",
      host: {
        class: "modal-body"
      },
      styles: [":host{display:block}\n"]
    }]
  }], null, null);
})();
var ModalContentComponent = class _ModalContentComponent {
  static {
    this.ɵfac = function ModalContentComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ModalContentComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ModalContentComponent,
      selectors: [["c-modal-content"]],
      hostAttrs: [1, "modal-content"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function ModalContentComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ModalContentComponent, [{
    type: Component,
    args: [{
      selector: "c-modal-content",
      template: "<ng-content />",
      host: {
        class: "modal-content"
      }
    }]
  }], null, null);
})();
var ModalDialogComponent = class _ModalDialogComponent {
  constructor() {
    this.alignment = input();
    this.fullscreen = input();
    this.scrollable = input(false, {
      transform: booleanAttribute
    });
    this.size = input();
    this.hostClasses = computed(() => {
      const fullscreen = this.fullscreen();
      const size = this.size();
      return {
        "modal-dialog": true,
        "modal-dialog-centered": this.alignment() === "center",
        "modal-fullscreen": fullscreen === true,
        [`modal-fullscreen-${fullscreen}-down`]: typeof fullscreen === "string",
        "modal-dialog-scrollable": this.scrollable(),
        [`modal-${size}`]: !!size
      };
    });
  }
  static {
    this.ɵfac = function ModalDialogComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ModalDialogComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ModalDialogComponent,
      selectors: [["c-modal-dialog"]],
      hostAttrs: [1, "modal-dialog"],
      hostVars: 2,
      hostBindings: function ModalDialogComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        alignment: [1, "alignment"],
        fullscreen: [1, "fullscreen"],
        scrollable: [1, "scrollable"],
        size: [1, "size"]
      },
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function ModalDialogComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      styles: ["[_nghost-%COMP%]{display:block}.modal-dialog-centered[_nghost-%COMP%]{display:flex}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ModalDialogComponent, [{
    type: Component,
    args: [{
      selector: "c-modal-dialog",
      template: "<ng-content />",
      host: {
        class: "modal-dialog",
        "[class]": "hostClasses()"
      },
      styles: [":host{display:block}:host.modal-dialog-centered{display:flex}\n"]
    }]
  }], null, null);
})();
var ModalService = class _ModalService {
  constructor() {
    this.#modalState = new Subject();
    this.modalState$ = this.#modalState.asObservable();
  }
  #modalState;
  toggle(action) {
    this.#modalState.next(action);
  }
  static {
    this.ɵfac = function ModalService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ModalService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ModalService,
      factory: _ModalService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ModalService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var ModalToggleDirective = class _ModalToggleDirective {
  constructor() {
    this.#modalService = inject(ModalService);
    this.toggle = input(void 0, {
      alias: "cModalToggle"
    });
  }
  #modalService;
  dismiss($event) {
    $event.preventDefault();
    this.#modalService.toggle({
      show: "toggle",
      id: this.toggle()
    });
  }
  static {
    this.ɵfac = function ModalToggleDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ModalToggleDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _ModalToggleDirective,
      selectors: [["", "cModalToggle", ""]],
      hostBindings: function ModalToggleDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function ModalToggleDirective_click_HostBindingHandler($event) {
            return ctx.dismiss($event);
          });
        }
      },
      inputs: {
        toggle: [1, "cModalToggle", "toggle"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ModalToggleDirective, [{
    type: Directive,
    args: [{
      selector: "[cModalToggle]",
      host: {
        "(click)": "dismiss($event)"
      }
    }]
  }], null, null);
})();
var ModalFooterComponent = class _ModalFooterComponent {
  static {
    this.ɵfac = function ModalFooterComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ModalFooterComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ModalFooterComponent,
      selectors: [["c-modal-footer"]],
      hostAttrs: [1, "modal-footer"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function ModalFooterComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ModalFooterComponent, [{
    type: Component,
    args: [{
      selector: "c-modal-footer",
      template: "<ng-content />",
      host: {
        class: "modal-footer"
      }
    }]
  }], null, null);
})();
var ModalHeaderComponent = class _ModalHeaderComponent {
  static {
    this.ɵfac = function ModalHeaderComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ModalHeaderComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ModalHeaderComponent,
      selectors: [["c-modal-header"]],
      hostAttrs: [1, "modal-header"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function ModalHeaderComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ModalHeaderComponent, [{
    type: Component,
    args: [{
      selector: "c-modal-header",
      template: "<ng-content />",
      host: {
        class: "modal-header"
      }
    }]
  }], null, null);
})();
var ModalTitleDirective = class _ModalTitleDirective {
  static {
    this.ɵfac = function ModalTitleDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ModalTitleDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _ModalTitleDirective,
      selectors: [["", "cModalTitle", ""]],
      hostAttrs: [1, "modal-title"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ModalTitleDirective, [{
    type: Directive,
    args: [{
      selector: "[cModalTitle]",
      host: {
        class: "modal-title"
      }
    }]
  }], null, null);
})();
var ModalComponent = class _ModalComponent {
  constructor() {
    this.#document = inject(DOCUMENT);
    this.#renderer = inject(Renderer2);
    this.#hostElement = inject(ElementRef);
    this.#modalService = inject(ModalService);
    this.#backdropService = inject(BackdropService);
    this.#destroyRef = inject(DestroyRef);
    this.#focusMonitor = inject(FocusMonitor);
    this.alignment = input("top");
    this.backdrop = input(true);
    this.fullscreen = input();
    this.keyboard = input(true, {
      transform: booleanAttribute
    });
    this.attrId = input(void 0, {
      alias: "id"
    });
    this.size = input();
    this.transition = input(true, {
      transform: booleanAttribute
    });
    this.role = input("dialog");
    this.ariaModalInput = input(false, {
      transform: booleanAttribute,
      alias: "ariaModal"
    });
    this.ariaModal = computed(() => {
      return this.visible || this.ariaModalInput() ? true : null;
    });
    this.scrollable = input(false, {
      transform: booleanAttribute
    });
    this.visibleInput = input(false, {
      transform: booleanAttribute,
      alias: "visible"
    });
    this.#visibleInputEffect = effect(() => {
      const visible = this.visibleInput();
      untracked(() => {
        this.visible = visible;
      });
    });
    this.#visible = signal(false);
    this.#activeElement = signal(null);
    this.#visibleEffect = effect(() => {
      const visible = this.#visible();
      const afterViewInit = this.#afterViewInit();
      untracked(() => {
        if (visible && afterViewInit) {
          this.#activeElement.set(this.#document.activeElement);
          setTimeout(() => {
            const focusable = this.modalContentRef()?.nativeElement.querySelectorAll('[tabindex]:not([tabindex="-1"]), button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])');
            if (focusable?.length) {
              this.#focusMonitor.focusVia(focusable[0], "keyboard");
            }
          });
        } else {
          const activeElement = this.#activeElement();
          if (activeElement && this.#document.contains(activeElement)) {
            this.#focusMonitor.focusVia(activeElement, "keyboard");
            setTimeout(() => {
              this.#activeElement.set(null);
            });
          }
        }
      });
    });
    this.visibleChange = output();
    this.modalContentRef = viewChild("modalContentRef", {
      read: ElementRef
    });
    this.hostClasses = computed(() => {
      return {
        modal: true,
        fade: this.transition(),
        show: this.show
      };
    });
    this.animateTrigger = computed(() => {
      return this.visible ? "visible" : "hidden";
    });
    this.#show = signal(true);
    this.mouseDownTarget = null;
    this.#afterViewInit = signal(false);
  }
  #document;
  #renderer;
  #hostElement;
  #modalService;
  #backdropService;
  #destroyRef;
  #focusMonitor;
  get id() {
    return this.attrId();
  }
  #visibleInputEffect;
  set visible(value) {
    if (this.#visible() !== value) {
      this.#visible.set(value);
      this.setBodyStyles(value);
      this.setBackdrop(this.backdrop() !== false && value);
      this.visibleChange.emit(value);
    }
  }
  get visible() {
    return this.#visible();
  }
  #visible;
  #activeElement;
  #visibleEffect;
  #activeBackdrop;
  get ariaHidden() {
    return this.visible ? null : true;
  }
  get show() {
    return this.visible && this.#show();
  }
  set show(value) {
    this.#show.set(value);
  }
  #show;
  animateStart(event) {
    if (event.toState === "visible") {
      this.#backdropService.hideScrollbar();
      this.#renderer.setStyle(this.#hostElement.nativeElement, "display", "block");
    } else {
      if (!this.transition()) {
        this.#renderer.setStyle(this.#hostElement.nativeElement, "display", "none");
      }
    }
  }
  animateDone(event) {
    setTimeout(() => {
      if (event.toState === "hidden") {
        this.#renderer.setStyle(this.#hostElement.nativeElement, "display", "none");
      }
    });
    this.show = this.visible;
  }
  onKeyUpHandler(event) {
    if (event.key === "Escape" && this.keyboard() && this.visible) {
      if (this.backdrop() === "static") {
        this.setStaticBackdrop();
      } else {
        this.#modalService.toggle({
          show: false,
          modal: this
        });
      }
    }
  }
  onMouseDownHandler($event) {
    this.mouseDownTarget = $event.target;
  }
  onClickHandler($event) {
    if (this.mouseDownTarget !== $event.target) {
      this.mouseDownTarget = null;
      return;
    }
    const targetElement = $event.target;
    if (targetElement === this.#hostElement.nativeElement) {
      if (this.backdrop() === "static") {
        this.setStaticBackdrop();
        return;
      }
      this.#modalService.toggle({
        show: false,
        modal: this
      });
    }
  }
  ngOnInit() {
    this.stateToggleSubscribe();
  }
  #afterViewInit;
  ngAfterViewInit() {
    this.#afterViewInit.set(true);
  }
  ngOnDestroy() {
    this.#modalService.toggle({
      show: false,
      modal: this
    });
    this.#afterViewInit.set(false);
  }
  stateToggleSubscribe() {
    this.#modalService.modalState$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((action) => {
      if (this === action.modal || this.id === action.id) {
        if ("show" in action) {
          this.visible = action?.show === "toggle" ? !this.visible : action.show;
        }
      } else {
        if (this.visible) {
          this.visible = false;
        }
      }
    });
  }
  setBackdrop(setBackdrop) {
    this.#activeBackdrop = setBackdrop ? this.#backdropService.setBackdrop("modal") : this.#backdropService.clearBackdrop(this.#activeBackdrop);
  }
  setBodyStyles(open) {
    if (open) {
      if (this.backdrop() === true) {
        this.#renderer.addClass(this.#document.body, "modal-open");
      }
    } else {
      this.#renderer.removeClass(this.#document.body, "modal-open");
    }
  }
  setStaticBackdrop() {
    if (this.transition()) {
      this.#renderer.addClass(this.#hostElement.nativeElement, "modal-static");
      this.#renderer.setStyle(this.#hostElement.nativeElement, "overflow-y", "hidden");
      setTimeout(() => {
        this.#renderer.removeClass(this.#hostElement.nativeElement, "modal-static");
        this.#renderer.removeStyle(this.#hostElement.nativeElement, "overflow-y");
      }, 300);
    }
  }
  static {
    this.ɵfac = function ModalComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ModalComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ModalComponent,
      selectors: [["c-modal"]],
      viewQuery: function ModalComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuerySignal(ctx.modalContentRef, _c6, 5, ElementRef);
        }
        if (rf & 2) {
          ɵɵqueryAdvance();
        }
      },
      hostAttrs: [1, "modal"],
      hostVars: 8,
      hostBindings: function ModalComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵsyntheticHostListener("@showHide.start", function ModalComponent_animation_showHide_start_HostBindingHandler($event) {
            return ctx.animateStart($event);
          })("@showHide.done", function ModalComponent_animation_showHide_done_HostBindingHandler($event) {
            return ctx.animateDone($event);
          });
          ɵɵlistener("mousedown", function ModalComponent_mousedown_HostBindingHandler($event) {
            return ctx.onMouseDownHandler($event);
          })("click", function ModalComponent_click_HostBindingHandler($event) {
            return ctx.onClickHandler($event);
          })("keyup", function ModalComponent_keyup_HostBindingHandler($event) {
            return ctx.onKeyUpHandler($event);
          }, false, ɵɵresolveDocument);
        }
        if (rf & 2) {
          ɵɵsyntheticHostProperty("@showHide", ctx.animateTrigger());
          ɵɵattribute("role", ctx.role())("inert", ctx.ariaHidden)("id", ctx.id)("aria-modal", ctx.ariaModal())("tabindex", -1);
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        alignment: [1, "alignment"],
        backdrop: [1, "backdrop"],
        fullscreen: [1, "fullscreen"],
        keyboard: [1, "keyboard"],
        attrId: [1, "id", "attrId"],
        size: [1, "size"],
        transition: [1, "transition"],
        role: [1, "role"],
        ariaModalInput: [1, "ariaModal", "ariaModalInput"],
        scrollable: [1, "scrollable"],
        visibleInput: [1, "visible", "visibleInput"]
      },
      outputs: {
        visibleChange: "visibleChange"
      },
      exportAs: ["cModal"],
      ngContentSelectors: _c0,
      decls: 5,
      vars: 6,
      consts: [["modalContentRef", ""], [3, "alignment", "fullscreen", "scrollable", "size"], [2, "display", "contents", 3, "cdkTrapFocus", "cdkTrapFocusAutoCapture"]],
      template: function ModalComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵelementStart(0, "c-modal-dialog", 1)(1, "c-modal-content")(2, "div", 2, 0);
          ɵɵprojection(4);
          ɵɵelementEnd()()();
        }
        if (rf & 2) {
          ɵɵproperty("alignment", ctx.alignment())("fullscreen", ctx.fullscreen())("scrollable", ctx.scrollable())("size", ctx.size());
          ɵɵadvance(2);
          ɵɵproperty("cdkTrapFocus", ctx.visible)("cdkTrapFocusAutoCapture", ctx.visible);
        }
      },
      dependencies: [ModalDialogComponent, ModalContentComponent, A11yModule, CdkTrapFocus],
      encapsulation: 2,
      data: {
        animation: [trigger("showHide", [state("visible", style({
          // display: 'block'
        })), state("hidden", style({
          // display: 'none'
        })), transition("visible <=> *", [animate("150ms")])])]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ModalComponent, [{
    type: Component,
    args: [{
      selector: "c-modal",
      animations: [trigger("showHide", [state("visible", style({
        // display: 'block'
      })), state("hidden", style({
        // display: 'none'
      })), transition("visible <=> *", [animate("150ms")])])],
      exportAs: "cModal",
      imports: [ModalDialogComponent, ModalContentComponent, A11yModule],
      host: {
        class: "modal",
        "[class]": "hostClasses()",
        "[attr.role]": "role()",
        "[attr.inert]": "ariaHidden",
        "[attr.id]": "id",
        "[attr.aria-modal]": "ariaModal()",
        "[attr.tabindex]": "-1",
        "[@showHide]": "animateTrigger()",
        "(@showHide.start)": "animateStart($event)",
        "(@showHide.done)": "animateDone($event)",
        "(mousedown)": "onMouseDownHandler($event)",
        "(click)": "onClickHandler($event)",
        "(document:keyup)": "onKeyUpHandler($event)"
      },
      template: '<c-modal-dialog\n  [alignment]="alignment()"\n  [fullscreen]="fullscreen()"\n  [scrollable]="scrollable()"\n  [size]="size()">\n  <c-modal-content>\n    <div [cdkTrapFocus]="visible" [cdkTrapFocusAutoCapture]="visible" style="display: contents;" #modalContentRef>\n      <ng-content />\n    </div>\n  </c-modal-content>\n</c-modal-dialog>\n'
    }]
  }], null, null);
})();
var ModalModule = class _ModalModule {
  static {
    this.ɵfac = function ModalModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ModalModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _ModalModule,
      imports: [ModalBodyComponent, ModalComponent, ModalContentComponent, ModalDialogComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective],
      exports: [ModalBodyComponent, ModalComponent, ModalContentComponent, ModalDialogComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      providers: [ModalService],
      imports: [ModalComponent]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ModalModule, [{
    type: NgModule,
    args: [{
      exports: [ModalBodyComponent, ModalComponent, ModalContentComponent, ModalDialogComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective],
      imports: [ModalBodyComponent, ModalComponent, ModalContentComponent, ModalDialogComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective],
      providers: [ModalService]
    }]
  }], null, null);
})();
var OffcanvasService = class _OffcanvasService {
  constructor() {
    this.offcanvasState = new Subject();
    this.offcanvasState$ = this.offcanvasState.asObservable();
  }
  toggle(action) {
    this.offcanvasState.next(action);
  }
  static {
    this.ɵfac = function OffcanvasService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OffcanvasService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _OffcanvasService,
      factory: _OffcanvasService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OffcanvasService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var nextId$1 = 0;
var OffcanvasComponent = class _OffcanvasComponent {
  constructor() {
    this.#document = inject(DOCUMENT);
    this.#platformId = inject(PLATFORM_ID);
    this.#renderer = inject(Renderer2);
    this.#hostElement = inject(ElementRef);
    this.#offcanvasService = inject(OffcanvasService);
    this.#backdropService = inject(BackdropService);
    this.#breakpointObserver = inject(BreakpointObserver);
    this.#destroyRef = inject(DestroyRef);
    this.backdrop = input(true);
    this.keyboard = input(true, {
      transform: booleanAttribute
    });
    this.placement = input("start");
    this.responsive = input(true);
    this.id = input(`offcanvas-${this.placement()}-${nextId$1++}`);
    this.role = input("dialog");
    this.ariaModal = input(true, {
      transform: booleanAttribute
    });
    this.scroll = input(false, {
      transform: booleanAttribute
    });
    this.visibleInput = input(false, {
      transform: booleanAttribute,
      alias: "visible"
    });
    this.visible = linkedSignal({
      source: this.visibleInput,
      computation: (value) => value
    });
    this.visibleEffect = effect(() => {
      const visible = this.visible();
      if (visible) {
        this.setBackdrop(this.backdrop());
        this.setFocus();
      } else {
        this.setBackdrop(false);
      }
      this.layoutChangeSubscribe(visible);
      this.visibleChange.emit(visible);
    });
    this.visibleChange = output();
    this.hostClasses = computed(() => {
      const responsive = this.responsive();
      const placement = this.placement();
      const visible = this.visible();
      return {
        offcanvas: typeof responsive === "boolean",
        [`offcanvas-${responsive}`]: typeof responsive !== "boolean",
        [`offcanvas-${placement}`]: !!placement,
        show: visible
      };
    });
    this.ariaHidden = computed(() => {
      return this.visible() ? null : true;
    });
  }
  #document;
  #platformId;
  #renderer;
  #hostElement;
  #offcanvasService;
  #backdropService;
  #breakpointObserver;
  #destroyRef;
  #activeBackdrop;
  #backdropClickSubscription;
  #layoutChangeSubscription;
  get tabIndex() {
    return "-1";
  }
  get show() {
    return this.visible();
  }
  set show(value) {
    this.visible.set(value);
  }
  get responsiveBreakpoint() {
    const responsive = this.responsive();
    if (typeof responsive !== "string") {
      return false;
    }
    const element = this.#document.documentElement;
    const breakpointValue = this.#document.defaultView?.getComputedStyle(element)?.getPropertyValue(`--cui-breakpoint-${responsive.trim()}`) ?? false;
    return breakpointValue ? `${parseFloat(breakpointValue.trim()) - 0.02}px` : false;
  }
  animateStart(event) {
    if (event.toState === "visible") {
      if (!this.scroll()) {
        this.#backdropService.hideScrollbar();
      }
      this.#renderer.addClass(this.#hostElement.nativeElement, "showing");
    } else {
      this.#renderer.addClass(this.#hostElement.nativeElement, "hiding");
    }
  }
  animateDone(event) {
    setTimeout(() => {
      if (event.toState === "visible") {
        this.#renderer.removeClass(this.#hostElement.nativeElement, "showing");
      }
      if (event.toState === "hidden") {
        this.#renderer.removeClass(this.#hostElement.nativeElement, "hiding");
        this.#renderer.removeStyle(this.#document.body, "overflow");
        this.#renderer.removeStyle(this.#document.body, "paddingRight");
      }
    });
    this.show = this.visible();
  }
  onKeyDownHandler(event) {
    if (event.key === "Escape" && this.keyboard() && this.visible() && this.backdrop() !== "static") {
      this.#offcanvasService.toggle({
        show: false,
        id: this.id()
      });
    }
  }
  ngOnInit() {
    this.stateToggleSubscribe();
    setTimeout(() => {
      this.#renderer.setStyle(this.#hostElement.nativeElement, "display", "flex");
    });
  }
  ngOnDestroy() {
    this.#offcanvasService.toggle({
      show: false,
      id: this.id()
    });
  }
  setFocus() {
    if (isPlatformBrowser(this.#platformId)) {
      setTimeout(() => this.#hostElement.nativeElement.focus());
    }
  }
  stateToggleSubscribe() {
    this.#offcanvasService.offcanvasState$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((action) => {
      if (this === action.offcanvas || this.id() === action.id) {
        if ("show" in action) {
          this.visible.update((value) => action?.show === "toggle" ? !value : action.show);
        }
      }
    });
  }
  backdropClickSubscribe(subscribe = true) {
    if (subscribe) {
      this.#backdropClickSubscription = this.#backdropService.backdropClick$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((clicked) => {
        this.#offcanvasService.toggle({
          show: !clicked,
          id: this.id()
        });
      });
    } else {
      this.#backdropClickSubscription?.unsubscribe();
    }
  }
  setBackdrop(setBackdrop) {
    this.#activeBackdrop = !!setBackdrop ? this.#backdropService.setBackdrop("offcanvas") : this.#backdropService.clearBackdrop(this.#activeBackdrop);
    setBackdrop === true ? this.backdropClickSubscribe() : this.backdropClickSubscribe(false);
  }
  layoutChangeSubscribe(subscribe = true) {
    if (subscribe) {
      if (!this.responsiveBreakpoint) {
        return;
      }
      const responsiveBreakpoint = `(max-width: ${this.responsiveBreakpoint})`;
      const layoutChanges = this.#breakpointObserver.observe([responsiveBreakpoint]);
      this.#layoutChangeSubscription = layoutChanges.pipe(filter((breakpointState) => !breakpointState.matches), takeUntilDestroyed(this.#destroyRef)).subscribe((breakpointState) => {
        this.visible.set(breakpointState.matches);
      });
    } else {
      this.#layoutChangeSubscription?.unsubscribe();
    }
  }
  static {
    this.ɵfac = function OffcanvasComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OffcanvasComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _OffcanvasComponent,
      selectors: [["c-offcanvas"]],
      hostAttrs: ["ngSkipHydration", "true"],
      hostVars: 8,
      hostBindings: function OffcanvasComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵsyntheticHostListener("@showHide.start", function OffcanvasComponent_animation_showHide_start_HostBindingHandler($event) {
            return ctx.animateStart($event);
          })("@showHide.done", function OffcanvasComponent_animation_showHide_done_HostBindingHandler($event) {
            return ctx.animateDone($event);
          });
          ɵɵlistener("keydown", function OffcanvasComponent_keydown_HostBindingHandler($event) {
            return ctx.onKeyDownHandler($event);
          }, false, ɵɵresolveDocument);
        }
        if (rf & 2) {
          ɵɵsyntheticHostProperty("@showHide", ctx.visible() ? "visible" : "hidden");
          ɵɵattribute("id", ctx.id())("inert", ctx.ariaHidden() || null)("role", ctx.role())("aria-modal", ctx.ariaModal())("tabindex", ctx.tabIndex);
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        backdrop: [1, "backdrop"],
        keyboard: [1, "keyboard"],
        placement: [1, "placement"],
        responsive: [1, "responsive"],
        id: [1, "id"],
        role: [1, "role"],
        ariaModal: [1, "ariaModal"],
        scroll: [1, "scroll"],
        visibleInput: [1, "visible", "visibleInput"]
      },
      outputs: {
        visibleChange: "visibleChange"
      },
      exportAs: ["cOffcanvas"],
      features: [ɵɵHostDirectivesFeature([{
        directive: ThemeDirective,
        inputs: ["dark", "dark"]
      }])],
      ngContentSelectors: _c0,
      decls: 2,
      vars: 0,
      consts: [["cdkTrapFocus", "", "cdkTrapFocusAutoCapture", ""]],
      template: function OffcanvasComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵelementStart(0, "div", 0);
          ɵɵprojection(1);
          ɵɵelementEnd();
        }
      },
      dependencies: [A11yModule, CdkTrapFocus],
      styles: ["[_nghost-%COMP%]{display:none}"],
      data: {
        animation: [trigger("showHide", [state("visible", style({
          // visibility: 'visible'
        })), state("hidden", style({
          // visibility: 'hidden'
        })), transition("visible <=> *", [animate("300ms")])])]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OffcanvasComponent, [{
    type: Component,
    args: [{
      selector: "c-offcanvas",
      animations: [trigger("showHide", [state("visible", style({
        // visibility: 'visible'
      })), state("hidden", style({
        // visibility: 'hidden'
      })), transition("visible <=> *", [animate("300ms")])])],
      exportAs: "cOffcanvas",
      imports: [A11yModule],
      hostDirectives: [{
        directive: ThemeDirective,
        inputs: ["dark"]
      }],
      host: {
        ngSkipHydration: "true",
        "[@showHide]": 'this.visible() ? "visible" : "hidden"',
        "[attr.id]": "id()",
        "[attr.inert]": "ariaHidden() || null",
        "[attr.role]": "role()",
        "[attr.aria-modal]": "ariaModal()",
        "[attr.tabindex]": "tabIndex",
        "[class]": "hostClasses()",
        "(@showHide.start)": "animateStart($event)",
        "(@showHide.done)": "animateDone($event)",
        "(document:keydown)": "onKeyDownHandler($event)"
      },
      template: "<div cdkTrapFocus cdkTrapFocusAutoCapture>\n  <ng-content />\n</div>\n\n",
      styles: [":host{display:none}\n"]
    }]
  }], null, null);
})();
var OffcanvasBodyComponent = class _OffcanvasBodyComponent {
  static {
    this.ɵfac = function OffcanvasBodyComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OffcanvasBodyComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _OffcanvasBodyComponent,
      selectors: [["c-offcanvas-body"]],
      hostAttrs: [1, "offcanvas-body"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function OffcanvasBodyComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      styles: ["[_nghost-%COMP%]{display:block}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OffcanvasBodyComponent, [{
    type: Component,
    args: [{
      selector: "c-offcanvas-body",
      template: "<ng-content />",
      host: {
        class: "offcanvas-body"
      },
      styles: [":host{display:block}\n"]
    }]
  }], null, null);
})();
var OffcanvasHeaderComponent = class _OffcanvasHeaderComponent {
  static {
    this.ɵfac = function OffcanvasHeaderComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OffcanvasHeaderComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _OffcanvasHeaderComponent,
      selectors: [["c-offcanvas-header"]],
      hostAttrs: [1, "offcanvas-header"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function OffcanvasHeaderComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OffcanvasHeaderComponent, [{
    type: Component,
    args: [{
      selector: "c-offcanvas-header",
      template: "<ng-content />",
      host: {
        class: "offcanvas-header"
      }
    }]
  }], null, null);
})();
var OffcanvasTitleDirective = class _OffcanvasTitleDirective {
  static {
    this.ɵfac = function OffcanvasTitleDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OffcanvasTitleDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _OffcanvasTitleDirective,
      selectors: [["", "cOffcanvasTitle", ""]],
      hostAttrs: [1, "offcanvas-title"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OffcanvasTitleDirective, [{
    type: Directive,
    args: [{
      selector: "[cOffcanvasTitle]",
      host: {
        class: "offcanvas-title"
      }
    }]
  }], null, null);
})();
var OffcanvasToggleDirective = class _OffcanvasToggleDirective {
  constructor() {
    this.#offcanvasService = inject(OffcanvasService);
    this.id = input(void 0, {
      alias: "cOffcanvasToggle"
    });
  }
  #offcanvasService;
  toggleOpen($event) {
    $event.preventDefault();
    this.#offcanvasService.toggle({
      show: "toggle",
      id: this.id()
    });
  }
  static {
    this.ɵfac = function OffcanvasToggleDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OffcanvasToggleDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _OffcanvasToggleDirective,
      selectors: [["", "cOffcanvasToggle", ""]],
      hostBindings: function OffcanvasToggleDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function OffcanvasToggleDirective_click_HostBindingHandler($event) {
            return ctx.toggleOpen($event);
          });
        }
      },
      inputs: {
        id: [1, "cOffcanvasToggle", "id"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OffcanvasToggleDirective, [{
    type: Directive,
    args: [{
      selector: "[cOffcanvasToggle]",
      host: {
        "(click)": "toggleOpen($event)"
      }
    }]
  }], null, null);
})();
var OffcanvasModule = class _OffcanvasModule {
  static {
    this.ɵfac = function OffcanvasModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OffcanvasModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _OffcanvasModule,
      imports: [OffcanvasBodyComponent, OffcanvasComponent, OffcanvasHeaderComponent, OffcanvasTitleDirective, OffcanvasToggleDirective],
      exports: [OffcanvasBodyComponent, OffcanvasComponent, OffcanvasHeaderComponent, OffcanvasTitleDirective, OffcanvasToggleDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      providers: [OffcanvasService, BackdropService],
      imports: [OffcanvasComponent]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OffcanvasModule, [{
    type: NgModule,
    args: [{
      exports: [OffcanvasBodyComponent, OffcanvasComponent, OffcanvasHeaderComponent, OffcanvasTitleDirective, OffcanvasToggleDirective],
      imports: [OffcanvasBodyComponent, OffcanvasComponent, OffcanvasHeaderComponent, OffcanvasTitleDirective, OffcanvasToggleDirective],
      providers: [OffcanvasService, BackdropService]
    }]
  }], null, null);
})();
var PageLinkDirective = class _PageLinkDirective {
  static {
    this.ɵfac = function PageLinkDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PageLinkDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _PageLinkDirective,
      selectors: [["", "cPageLink", ""]],
      hostAttrs: [1, "page-link"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PageLinkDirective, [{
    type: Directive,
    args: [{
      selector: "[cPageLink]",
      host: {
        class: "page-link"
      }
    }]
  }], null, null);
})();
var PageItemDirective = class _PageItemDirective {
  constructor() {
    this.#renderer = inject(Renderer2);
    this.active = input();
    this.disabled = input();
    this.ariaCurrent = computed(() => {
      return this.active() ? "page" : null;
    });
    this.hostClasses = computed(() => {
      return {
        "page-item": true,
        disabled: this.disabled(),
        active: this.active()
      };
    });
    this.pageLinkElementRef = contentChild(PageLinkDirective, {
      read: ElementRef
    });
    this.pageLinkElementRefEffect = effect(() => {
      const pageLinkElementRef = this.pageLinkElementRef();
      const disabled = this.disabled();
      if (!pageLinkElementRef) {
        return;
      }
      const pageLinkElement = pageLinkElementRef.nativeElement;
      if (disabled) {
        this.#renderer.setAttribute(pageLinkElement, "aria-disabled", "true");
        this.#renderer.setAttribute(pageLinkElement, "tabindex", "-1");
      } else {
        this.#renderer.removeAttribute(pageLinkElement, "aria-disabled");
        this.#renderer.removeAttribute(pageLinkElement, "tabindex");
      }
    });
  }
  #renderer;
  static {
    this.ɵfac = function PageItemDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PageItemDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _PageItemDirective,
      selectors: [["", "cPageItem", ""]],
      contentQueries: function PageItemDirective_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuerySignal(dirIndex, ctx.pageLinkElementRef, PageLinkDirective, 5, ElementRef);
        }
        if (rf & 2) {
          ɵɵqueryAdvance();
        }
      },
      hostAttrs: [1, "page-item"],
      hostVars: 3,
      hostBindings: function PageItemDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("aria-current", ctx.ariaCurrent());
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        active: [1, "active"],
        disabled: [1, "disabled"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PageItemDirective, [{
    type: Directive,
    args: [{
      selector: "[cPageItem]",
      host: {
        class: "page-item",
        "[class]": "hostClasses()",
        "[attr.aria-current]": "ariaCurrent()"
      }
    }]
  }], null, null);
})();
var PageItemComponent = class _PageItemComponent extends PageItemDirective {
  static {
    this.ɵfac = /* @__PURE__ */ (() => {
      let ɵPageItemComponent_BaseFactory;
      return function PageItemComponent_Factory(__ngFactoryType__) {
        return (ɵPageItemComponent_BaseFactory || (ɵPageItemComponent_BaseFactory = ɵɵgetInheritedFactory(_PageItemComponent)))(__ngFactoryType__ || _PageItemComponent);
      };
    })();
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _PageItemComponent,
      selectors: [["c-page-item"]],
      features: [ɵɵInheritDefinitionFeature],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function PageItemComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      styles: [_c7]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PageItemComponent, [{
    type: Component,
    args: [{
      selector: "c-page-item",
      template: "<ng-content />",
      styles: [":host{display:list-item;text-align:-webkit-match-parent;text-align:match-parent}\n"]
    }]
  }], null, null);
})();
var PaginationComponent = class _PaginationComponent {
  constructor() {
    this.align = input("");
    this.size = input();
    this.role = input("navigation");
    this.paginationClass = computed(() => {
      const size = this.size();
      const align = this.align();
      return {
        pagination: true,
        [`pagination-${size}`]: !!size,
        [`justify-content-${align}`]: !!align
      };
    });
  }
  static {
    this.ɵfac = function PaginationComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PaginationComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _PaginationComponent,
      selectors: [["c-pagination"]],
      hostVars: 1,
      hostBindings: function PaginationComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("role", ctx.role());
        }
      },
      inputs: {
        align: [1, "align"],
        size: [1, "size"],
        role: [1, "role"]
      },
      ngContentSelectors: _c0,
      decls: 2,
      vars: 1,
      consts: [[3, "ngClass"]],
      template: function PaginationComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵelementStart(0, "ul", 0);
          ɵɵprojection(1);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵproperty("ngClass", ctx.paginationClass());
        }
      },
      dependencies: [NgClass],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PaginationComponent, [{
    type: Component,
    args: [{
      selector: "c-pagination",
      imports: [NgClass],
      host: {
        "[attr.role]": "role()"
      },
      template: '<ul [ngClass]="paginationClass()">\n  <ng-content />\n</ul>\n'
    }]
  }], null, null);
})();
var PaginationModule = class _PaginationModule {
  static {
    this.ɵfac = function PaginationModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PaginationModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _PaginationModule,
      imports: [PageItemComponent, PageItemDirective, PageLinkDirective, PaginationComponent],
      exports: [PageItemComponent, PageItemDirective, PageLinkDirective, PaginationComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PaginationModule, [{
    type: NgModule,
    args: [{
      exports: [PageItemComponent, PageItemDirective, PageLinkDirective, PaginationComponent],
      imports: [PageItemComponent, PageItemDirective, PageLinkDirective, PaginationComponent]
    }]
  }], null, null);
})();
var PlaceholderDirective = class _PlaceholderDirective {
  constructor() {
    this.visible = input(false, {
      transform: booleanAttribute,
      alias: "cPlaceholder"
    });
    this.size = input(void 0, {
      alias: "cPlaceholderSize"
    });
    this.ariaHidden = computed(() => {
      return this.visible() ? null : true;
    });
    this.hostClasses = computed(() => {
      return {
        placeholder: this.visible(),
        [`placeholder-${this.size()}`]: !!this.size()
      };
    });
  }
  static {
    this.ɵfac = function PlaceholderDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PlaceholderDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _PlaceholderDirective,
      selectors: [["", "cPlaceholder", ""]],
      hostVars: 3,
      hostBindings: function PlaceholderDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("aria-hidden", ctx.ariaHidden());
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        visible: [1, "cPlaceholder", "visible"],
        size: [1, "cPlaceholderSize", "size"]
      },
      exportAs: ["cPlaceholder"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlaceholderDirective, [{
    type: Directive,
    args: [{
      selector: "[cPlaceholder]",
      exportAs: "cPlaceholder",
      host: {
        "[class]": "hostClasses()",
        "[attr.aria-hidden]": "ariaHidden()"
      }
    }]
  }], null, null);
})();
var PlaceholderAnimationDirective = class _PlaceholderAnimationDirective {
  constructor() {
    this.animation = input(void 0, {
      alias: "cPlaceholderAnimation"
    });
    this.placeholder = contentChild(PlaceholderDirective);
    this.hostClasses = computed(() => {
      return {
        [`placeholder-${this.animation()}`]: this.placeholder()?.visible() && !!this.animation()
      };
    });
  }
  static {
    this.ɵfac = function PlaceholderAnimationDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PlaceholderAnimationDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _PlaceholderAnimationDirective,
      selectors: [["", "cPlaceholderAnimation", ""]],
      contentQueries: function PlaceholderAnimationDirective_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuerySignal(dirIndex, ctx.placeholder, PlaceholderDirective, 5);
        }
        if (rf & 2) {
          ɵɵqueryAdvance();
        }
      },
      hostVars: 2,
      hostBindings: function PlaceholderAnimationDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        animation: [1, "cPlaceholderAnimation", "animation"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlaceholderAnimationDirective, [{
    type: Directive,
    args: [{
      selector: "[cPlaceholderAnimation]",
      host: {
        "[class]": "hostClasses()"
      }
    }]
  }], null, null);
})();
var PlaceholderModule = class _PlaceholderModule {
  static {
    this.ɵfac = function PlaceholderModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PlaceholderModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _PlaceholderModule,
      imports: [PlaceholderDirective, PlaceholderAnimationDirective],
      exports: [PlaceholderDirective, PlaceholderAnimationDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlaceholderModule, [{
    type: NgModule,
    args: [{
      imports: [PlaceholderDirective, PlaceholderAnimationDirective],
      exports: [PlaceholderDirective, PlaceholderAnimationDirective]
    }]
  }], null, null);
})();
var PopoverComponent = class _PopoverComponent {
  constructor() {
    this.renderer = inject(Renderer2);
    this.content = input("");
    this.#contentEffect = effect(() => {
      this.updateView(this.content());
    });
    this.visible = input(false, {
      transform: booleanAttribute
    });
    this.id = input();
    this.role = input("tooltip");
    this.viewContainerRef = viewChild("popoverTemplate", {
      read: ViewContainerRef
    });
    this.hostClasses = computed(() => {
      return {
        popover: true,
        fade: true,
        show: this.visible(),
        "bs-popover-auto": true
      };
    });
  }
  #contentEffect;
  ngOnDestroy() {
    this.clear();
  }
  clear() {
    this.viewContainerRef()?.clear();
    if (!!this.textNode) {
      this.renderer.removeChild(this.textNode.parentNode, this.textNode);
    }
  }
  updateView(content) {
    this.clear();
    if (!content) {
      return;
    }
    if (content instanceof TemplateRef) {
      this.viewContainerRef()?.createEmbeddedView(content);
    } else {
      const textNodeContent = this.renderer.createText(content);
      this.textNode = this.renderer.createElement("div");
      this.renderer.addClass(this.textNode, "popover-body");
      this.renderer.appendChild(this.textNode, textNodeContent);
      const element = this.viewContainerRef()?.element.nativeElement;
      this.renderer.appendChild(element.parentNode, this.textNode);
    }
  }
  static {
    this.ɵfac = function PopoverComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PopoverComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _PopoverComponent,
      selectors: [["c-popover"]],
      viewQuery: function PopoverComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuerySignal(ctx.viewContainerRef, _c8, 5, ViewContainerRef);
        }
        if (rf & 2) {
          ɵɵqueryAdvance();
        }
      },
      hostAttrs: [1, "popover", "fade", "bs-popover-auto"],
      hostVars: 4,
      hostBindings: function PopoverComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("role", ctx.role())("id", ctx.id());
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        content: [1, "content"],
        visible: [1, "visible"],
        id: [1, "id"],
        role: [1, "role"]
      },
      decls: 4,
      vars: 3,
      consts: [["popoverTemplate", ""], ["data-popper-arrow", "", 3, "ngClass"]],
      template: function PopoverComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementContainerStart(0);
          ɵɵelement(1, "div", 1);
          ɵɵelementContainer(2, null, 0);
          ɵɵelementContainerEnd();
        }
        if (rf & 2) {
          ɵɵadvance();
          ɵɵproperty("ngClass", ɵɵpureFunction1(1, _c9, !!ctx.content()));
        }
      },
      dependencies: [NgClass],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PopoverComponent, [{
    type: Component,
    args: [{
      selector: "c-popover",
      imports: [NgClass],
      host: {
        class: "popover fade bs-popover-auto",
        "[class]": "hostClasses()",
        "[attr.role]": "role()",
        "[attr.id]": "id()"
      },
      template: `<ng-container>
  <div [ngClass]="{'popover-arrow': !!content()}" data-popper-arrow></div>
  <ng-container #popoverTemplate />
</ng-container>
`
    }]
  }], null, null);
})();
var PopoverDirective = class _PopoverDirective {
  constructor() {
    this.#renderer = inject(Renderer2);
    this.#hostElement = inject(ElementRef);
    this.#viewContainerRef = inject(ViewContainerRef);
    this.#listenersService = inject(ListenersService);
    this.#changeDetectorRef = inject(ChangeDetectorRef);
    this.#intersectionService = inject(IntersectionService);
    this.#destroyRef = inject(DestroyRef);
    this.#document = inject(DOCUMENT);
    this.content = input(void 0, {
      alias: "cPopover"
    });
    this.#contentEffect = effect(() => {
      if (this.content()) {
        this.destroyTooltipElement();
      }
    });
    this.popperOptions = input({}, {
      alias: "cPopoverOptions"
    });
    this.#popperOptionsEffect = effect(() => {
      this._popperOptions = __spreadValues(__spreadProps(__spreadValues({}, this._popperOptions), {
        placement: this.placement()
      }), this.popperOptions());
    });
    this.popperOptionsComputed = computed(() => {
      return __spreadValues({
        placement: this.placement()
      }, this._popperOptions);
    });
    this.placement = input("top", {
      alias: "cPopoverPlacement"
    });
    this.reference = input(void 0, {
      alias: "cTooltipRef"
    });
    this.referenceRef = computed(() => this.reference()?.elementRef ?? this.#hostElement);
    this.trigger = input("hover", {
      alias: "cPopoverTrigger"
    });
    this.visible = model(false, {
      alias: "cPopoverVisible"
    });
    this.#visibleEffect = effect(() => {
      this.visible() ? this.addTooltipElement() : this.removeTooltipElement();
    });
    this._popperOptions = {
      modifiers: [{
        name: "offset",
        options: {
          offset: [0, 9]
        }
      }]
    };
  }
  #renderer;
  #hostElement;
  #viewContainerRef;
  #listenersService;
  #changeDetectorRef;
  #intersectionService;
  #destroyRef;
  #document;
  #contentEffect;
  #popperOptionsEffect;
  #visibleEffect;
  get ariaDescribedBy() {
    return this.tooltipId ? this.tooltipId : null;
  }
  ngAfterViewInit() {
    this.intersectionServiceSubscribe();
  }
  ngOnDestroy() {
    this.clearListeners();
    this.destroyTooltipElement();
  }
  ngOnInit() {
    this.setListeners();
  }
  setListeners() {
    const config = {
      hostElement: this.#hostElement,
      trigger: this.trigger(),
      callbackToggle: () => {
        this.visible.update((visible) => !visible);
      },
      callbackOff: () => {
        this.visible.set(false);
      },
      callbackOn: () => {
        this.visible.set(true);
      }
    };
    this.#listenersService.setListeners(config);
  }
  clearListeners() {
    this.#listenersService.clearListeners();
  }
  intersectionServiceSubscribe() {
    this.#intersectionService.createIntersectionObserver(this.referenceRef());
    this.#intersectionService.intersecting$.pipe(filter((next) => next.hostElement === this.referenceRef()), debounceTime(100), finalize(() => {
      this.#intersectionService.unobserve(this.referenceRef());
    }), takeUntilDestroyed(this.#destroyRef)).subscribe((next) => {
      this.visible.set(next.isIntersecting ? this.visible() : false);
    });
  }
  getUID(prefix) {
    let uid = prefix ?? "random-id";
    do {
      uid = `${prefix}-${Math.floor(Math.random() * 1e6).toString(10)}`;
    } while (this.#document.getElementById(uid));
    return uid;
  }
  createTooltipElement() {
    if (!this.tooltipRef) {
      this.tooltipRef = this.#viewContainerRef.createComponent(PopoverComponent);
    }
  }
  destroyTooltipElement() {
    this.tooltip?.remove();
    this.tooltipRef?.destroy();
    this.tooltipRef = void 0;
    this.popperInstance?.destroy();
    this.#viewContainerRef?.detach();
    this.#viewContainerRef?.clear();
  }
  addTooltipElement() {
    if (!this.content()) {
      this.destroyTooltipElement();
      return;
    }
    if (!this.tooltipRef) {
      this.createTooltipElement();
    }
    this.tooltipRef?.setInput("content", this.content() ?? "");
    this.tooltip = this.tooltipRef?.location.nativeElement;
    this.#renderer.addClass(this.tooltip, "d-none");
    this.#renderer.addClass(this.tooltip, "fade");
    this.popperInstance?.destroy();
    this.#viewContainerRef.insert(this.tooltipRef.hostView);
    this.#renderer.appendChild(this.#document.body, this.tooltip);
    this.popperInstance = createPopper3(this.referenceRef().nativeElement, this.tooltip, __spreadValues({}, this.popperOptionsComputed()));
    if (!this.visible()) {
      this.removeTooltipElement();
      return;
    }
    setTimeout(() => {
      this.tooltipId = this.getUID("popover");
      this.tooltipRef?.setInput("id", this.tooltipId);
      this.#renderer.removeClass(this.tooltip, "d-none");
      this.tooltipRef?.setInput("visible", this.visible());
      this.popperInstance?.forceUpdate();
      this.#changeDetectorRef?.markForCheck();
    }, 100);
  }
  removeTooltipElement() {
    this.tooltipId = "";
    if (!this.tooltipRef) {
      return;
    }
    this.tooltipRef.setInput("visible", false);
    this.tooltipRef.setInput("id", void 0);
    this.#changeDetectorRef.markForCheck();
    setTimeout(() => {
      this.#viewContainerRef?.detach();
    }, 300);
  }
  static {
    this.ɵfac = function PopoverDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PopoverDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _PopoverDirective,
      selectors: [["", "cPopover", ""]],
      hostVars: 1,
      hostBindings: function PopoverDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("aria-describedby", ctx.ariaDescribedBy);
        }
      },
      inputs: {
        content: [1, "cPopover", "content"],
        popperOptions: [1, "cPopoverOptions", "popperOptions"],
        placement: [1, "cPopoverPlacement", "placement"],
        reference: [1, "cTooltipRef", "reference"],
        trigger: [1, "cPopoverTrigger", "trigger"],
        visible: [1, "cPopoverVisible", "visible"]
      },
      outputs: {
        visible: "cPopoverVisibleChange"
      },
      exportAs: ["cPopover"],
      features: [ɵɵProvidersFeature([ListenersService, IntersectionService])]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PopoverDirective, [{
    type: Directive,
    args: [{
      selector: "[cPopover]",
      exportAs: "cPopover",
      providers: [ListenersService, IntersectionService],
      host: {
        "[attr.aria-describedby]": "ariaDescribedBy"
      }
    }]
  }], null, null);
})();
var PopoverModule = class _PopoverModule {
  static {
    this.ɵfac = function PopoverModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PopoverModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _PopoverModule,
      imports: [PopoverDirective, PopoverComponent],
      exports: [PopoverDirective, PopoverComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PopoverModule, [{
    type: NgModule,
    args: [{
      exports: [PopoverDirective, PopoverComponent],
      imports: [PopoverDirective, PopoverComponent]
    }]
  }], null, null);
})();
var ProgressService = class _ProgressService {
  constructor() {
    this.stacked = signal(false);
    this.value = signal(void 0);
    this.precision = signal(0);
    this.min = signal(0);
    this.max = signal(100);
    this.percent = computed(() => {
      return +(((this.value() ?? 0) - this.min()) / (this.max() - this.min()) * 100).toFixed(this.precision());
    });
  }
  static {
    this.ɵfac = function ProgressService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProgressService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ProgressService,
      factory: _ProgressService.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgressService, [{
    type: Injectable
  }], null, null);
})();
var ProgressBarDirective = class _ProgressBarDirective {
  constructor() {
    this.#renderer = inject(Renderer2);
    this.#hostElement = inject(ElementRef);
    this.#progressService = inject(ProgressService);
    this.#valuesEffect = effect(() => {
      const host = this.#hostElement.nativeElement;
      const value = this.#progressService.value();
      const percent = this.#progressService.percent();
      const stacked = this.#progressService.stacked();
      if (value === void 0) {
        for (const name of ["aria-valuenow", "aria-valuemax", "aria-valuemin", "role"]) {
          this.#renderer.removeAttribute(host, name);
        }
      } else {
        const {
          min: min2,
          max: max2
        } = this.#progressService;
        this.#renderer.setAttribute(host, "aria-valuenow", String(value));
        this.#renderer.setAttribute(host, "aria-valuemin", String(min2()));
        this.#renderer.setAttribute(host, "aria-valuemax", String(max2()));
        this.#renderer.setAttribute(host, "role", this.role());
      }
      const tagName = host.tagName;
      if (percent >= 0 && (stacked && tagName === "C-PROGRESS" || !stacked && tagName !== "C-PROGRESS")) {
        this.#renderer.setStyle(host, "width", `${percent}%`);
      } else {
        this.#renderer.removeStyle(host, "width");
      }
    });
    this.animated = input(void 0, {
      transform: booleanAttribute
    });
    this.color = input();
    this.precision = input(0, {
      transform: numberAttribute
    });
    this.value = input(0, {
      transform: numberAttribute
    });
    this.variant = input();
    this.max = input(100, {
      transform: numberAttribute
    });
    this.role = input("progressbar");
    this.#serviceEffect = effect(() => {
      this.#progressService.precision.set(this.precision());
      const max2 = this.max();
      this.#progressService.max.set(isNaN(max2) || max2 <= 0 ? 100 : max2);
      const value = this.value();
      this.#progressService.value.set(value && !isNaN(value) ? value : void 0);
    });
  }
  #renderer;
  #hostElement;
  #progressService;
  #valuesEffect;
  #serviceEffect;
  static {
    this.ɵfac = function ProgressBarDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProgressBarDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _ProgressBarDirective,
      selectors: [["", "cProgressBar", ""]],
      inputs: {
        animated: [1, "animated"],
        color: [1, "color"],
        precision: [1, "precision"],
        value: [1, "value"],
        variant: [1, "variant"],
        max: [1, "max"],
        role: [1, "role"]
      },
      exportAs: ["cProgressBar"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgressBarDirective, [{
    type: Directive,
    args: [{
      selector: "[cProgressBar]",
      exportAs: "cProgressBar"
    }]
  }], null, null);
})();
var ProgressBarComponent = class _ProgressBarComponent {
  constructor() {
    this.#progressBarDirective = inject(ProgressBarDirective, {
      optional: true
    });
    this.hostClasses = computed(() => {
      const animated = this.#progressBarDirective?.animated();
      const color = this.#progressBarDirective?.color();
      const variant = this.#progressBarDirective?.variant();
      return {
        "progress-bar": true,
        "progress-bar-animated": !!animated,
        [`progress-bar-${variant}`]: !!variant,
        [`bg-${color}`]: !!color
      };
    });
  }
  #progressBarDirective;
  static {
    this.ɵfac = function ProgressBarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProgressBarComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ProgressBarComponent,
      selectors: [["c-progress-bar"]],
      hostAttrs: [1, "progress-bar"],
      hostVars: 2,
      hostBindings: function ProgressBarComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      features: [ɵɵHostDirectivesFeature([{
        directive: ProgressBarDirective,
        inputs: ["animated", "animated", "color", "color", "max", "max", "role", "role", "value", "value", "variant", "variant"]
      }])],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function ProgressBarComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgressBarComponent, [{
    type: Component,
    args: [{
      selector: "c-progress-bar",
      template: "<ng-content />",
      hostDirectives: [{
        directive: ProgressBarDirective,
        inputs: ["animated", "color", "max", "role", "value", "variant"]
      }],
      host: {
        class: "progress-bar",
        "[class]": "hostClasses()"
      }
    }]
  }], null, null);
})();
var ProgressStackedComponent = class _ProgressStackedComponent {
  constructor() {
    this.stacked = input(true);
  }
  static {
    this.ɵfac = function ProgressStackedComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProgressStackedComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ProgressStackedComponent,
      selectors: [["c-progress-stacked"]],
      hostVars: 2,
      hostBindings: function ProgressStackedComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassProp("progress-stacked", ctx.stacked());
        }
      },
      inputs: {
        stacked: [1, "stacked"]
      },
      exportAs: ["cProgressStacked"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function ProgressStackedComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      styles: ["[_nghost-%COMP%]{display:flex}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgressStackedComponent, [{
    type: Component,
    args: [{
      selector: "c-progress-stacked",
      exportAs: "cProgressStacked",
      template: "<ng-content />",
      host: {
        "[class.progress-stacked]": "stacked()"
      },
      styles: [":host{display:flex}\n"]
    }]
  }], null, null);
})();
var ProgressComponent = class _ProgressComponent {
  #hostElement;
  #stacked;
  #progressService;
  constructor() {
    this.#hostElement = inject(ElementRef);
    this.progressBarDirective = inject(ProgressBarDirective, {
      optional: true
    });
    this.#stacked = inject(ProgressStackedComponent, {
      optional: true
    })?.stacked() ?? false;
    this.#progressService = inject(ProgressService);
    this.stacked = this.#progressService.stacked;
    this.percent = this.#progressService.percent;
    this.value = this.#progressService.value;
    this.contentProgressBars = contentChildren(ProgressBarComponent);
    this.height = input(0, {
      transform: numberAttribute
    });
    this.thin = input(false, {
      transform: booleanAttribute
    });
    this.white = input(false, {
      transform: booleanAttribute
    });
    this.hostClasses = computed(() => {
      return {
        progress: true,
        "progress-thin": this.thin(),
        "progress-white": this.white()
      };
    });
    this.hostStyle = computed(() => {
      const height = this.height();
      return !!height ? `${height}px` : this.#hostElement?.nativeElement?.style?.height ?? void 0;
    });
    this.#progressService.stacked.set(this.#stacked);
  }
  static {
    this.ɵfac = function ProgressComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProgressComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ProgressComponent,
      selectors: [["c-progress"]],
      contentQueries: function ProgressComponent_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuerySignal(dirIndex, ctx.contentProgressBars, ProgressBarComponent, 4);
        }
        if (rf & 2) {
          ɵɵqueryAdvance();
        }
      },
      hostAttrs: [1, "progress"],
      hostVars: 4,
      hostBindings: function ProgressComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
          ɵɵstyleProp("height", ctx.hostStyle());
        }
      },
      inputs: {
        height: [1, "height"],
        thin: [1, "thin"],
        white: [1, "white"]
      },
      exportAs: ["cProgress"],
      features: [ɵɵProvidersFeature([ProgressService]), ɵɵHostDirectivesFeature([{
        directive: ProgressBarDirective,
        inputs: ["animated", "animated", "color", "color", "max", "max", "role", "role", "value", "value", "variant", "variant"]
      }])],
      ngContentSelectors: _c0,
      decls: 4,
      vars: 1,
      consts: [["defaultContent", ""], [3, "animated", "variant", "color", "value"], [4, "ngTemplateOutlet"]],
      template: function ProgressComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵtemplate(0, ProgressComponent_Conditional_0_Template, 1, 1, "ng-container")(1, ProgressComponent_Conditional_1_Template, 3, 5, "c-progress-bar", 1)(2, ProgressComponent_ng_template_2_Template, 1, 0, "ng-template", null, 0, ɵɵtemplateRefExtractor);
        }
        if (rf & 2) {
          let tmp_1_0;
          ɵɵconditional(((tmp_1_0 = ctx.contentProgressBars()) == null ? null : tmp_1_0.length) ? 0 : 1);
        }
      },
      dependencies: [ProgressBarComponent, NgTemplateOutlet],
      styles: [".progress-stacked.progress[_nghost-%COMP%], .progress-stacked   .progress[_nghost-%COMP%]{transition:var(--cui-progress-bar-transition)}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgressComponent, [{
    type: Component,
    args: [{
      selector: "c-progress",
      exportAs: "cProgress",
      imports: [ProgressBarComponent, NgTemplateOutlet],
      hostDirectives: [{
        directive: ProgressBarDirective,
        inputs: ["animated", "color", "max", "role", "value", "variant"]
      }],
      host: {
        class: "progress",
        "[class]": "hostClasses()",
        "[style.height]": "hostStyle()"
      },
      providers: [ProgressService],
      template: '@if (contentProgressBars()?.length) {\n  <ng-container *ngTemplateOutlet="defaultContent" />\n} @else {\n  @let pbd = progressBarDirective;\n  <c-progress-bar [animated]="pbd?.animated()" [variant]="pbd?.variant()" [color]="pbd?.color()" [value]="value()">\n    <ng-container *ngTemplateOutlet="defaultContent" />\n  </c-progress-bar>\n}\n\n<ng-template #defaultContent>\n  <ng-content />\n</ng-template>\n\n',
      styles: [":host-context(.progress-stacked).progress{transition:var(--cui-progress-bar-transition)}\n"]
    }]
  }], () => [], null);
})();
var ProgressModule = class _ProgressModule {
  static {
    this.ɵfac = function ProgressModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProgressModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _ProgressModule,
      imports: [ProgressComponent, ProgressBarComponent, ProgressBarDirective, ProgressStackedComponent],
      exports: [ProgressComponent, ProgressBarComponent, ProgressBarDirective, ProgressStackedComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgressModule, [{
    type: NgModule,
    args: [{
      exports: [ProgressComponent, ProgressBarComponent, ProgressBarDirective, ProgressStackedComponent],
      imports: [ProgressComponent, ProgressBarComponent, ProgressBarDirective, ProgressStackedComponent]
    }]
  }], null, null);
})();
var SidebarService = class _SidebarService {
  constructor() {
    this.sidebarState = new BehaviorSubject({});
    this.sidebarState$ = this.sidebarState.asObservable();
  }
  toggle(action) {
    this.sidebarState.next(action);
  }
  static {
    this.ɵfac = function SidebarService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _SidebarService,
      factory: _SidebarService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var SidebarBackdropService = class _SidebarBackdropService {
  #document = inject(DOCUMENT);
  #sidebarService = inject(SidebarService);
  #backdrop;
  #clickListener = () => {
  };
  setBackdrop(sidebar) {
    const backdrop = this.#document.getElementsByClassName("sidebar-backdrop");
    if (backdrop.length === 0) {
      this.#backdrop = this.renderer.createElement("div");
      this.renderer.addClass(this.#backdrop, "sidebar-backdrop");
      this.renderer.appendChild(this.#document.body, this.#backdrop);
      this.#clickListener = this.renderer.listen(this.#backdrop, "click", (e) => {
        this.#sidebarService.toggle({
          toggle: "visible",
          sidebar
        });
      });
    }
    if (this.#backdrop && sidebar.sidebarState.mobile && sidebar.sidebarState.visible) {
      this.renderer.addClass(this.#backdrop, "fade");
      this.renderer.addClass(this.#backdrop, "show");
    } else {
      this.renderer.removeClass(this.#backdrop, "show");
      this.renderer.removeClass(this.#backdrop, "fade");
    }
  }
  clearBackdrop() {
    if (this.#backdrop) {
      this.#clickListener();
      this.renderer.removeChild(this.#document.body, this.#backdrop);
      this.#backdrop = void 0;
    }
  }
  static {
    this.ɵfac = function SidebarBackdropService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarBackdropService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _SidebarBackdropService,
      factory: _SidebarBackdropService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarBackdropService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var SidebarComponent = class _SidebarComponent {
  #document;
  #renderer;
  #breakpointObserver;
  #sidebarService;
  #backdropService;
  #onMobile;
  #layoutChangeSubscription;
  #stateToggleSubscription;
  #stateInitial;
  #narrow;
  set narrow(value) {
    this.#narrow.set(value);
  }
  get narrow() {
    return this.#narrow();
  }
  #visible;
  #visibleEffect;
  set visible(value) {
    this.#visible.set(value);
  }
  get visible() {
    return this.#visible();
  }
  set sidebarState(value) {
    const newState = value;
    if ("toggle" in newState) {
      if (newState.toggle === "visible") {
        newState.visible = !this.state().visible;
        this.#visible.set(newState.visible);
      } else if (newState.toggle === "unfoldable") {
        newState.unfoldable = !this.state().unfoldable;
        this.unfoldable.set(newState.unfoldable);
      }
    } else {
      this.#visible.update((visible) => (newState.visible ?? visible) && !this.overlaid());
    }
    this.state.update((state2) => __spreadValues(__spreadValues({}, state2), newState));
    this.state().mobile && this.state().visible ? this.#backdropService.setBackdrop(this) : this.#backdropService.clearBackdrop();
  }
  get sidebarState() {
    return __spreadValues({}, this.state());
  }
  get getMobileBreakpoint() {
    const element = this.#document.documentElement;
    const mobileBreakpoint = this.#document.defaultView?.getComputedStyle(element)?.getPropertyValue("--cui-mobile-breakpoint") ?? "md";
    const breakpointValue = this.#document.defaultView?.getComputedStyle(element)?.getPropertyValue(`--cui-breakpoint-${mobileBreakpoint.trim()}`) ?? "768px";
    return `${parseFloat(breakpointValue.trim()) - 0.02}px`;
  }
  constructor() {
    this.#document = inject(DOCUMENT);
    this.#renderer = inject(Renderer2);
    this.#breakpointObserver = inject(BreakpointObserver);
    this.#sidebarService = inject(SidebarService);
    this.#backdropService = inject(SidebarBackdropService);
    this.#onMobile = false;
    this.state = signal({
      sidebar: this
    });
    this.#stateInitial = {
      narrow: false,
      visible: false,
      unfoldable: false
    };
    this.colorScheme = input();
    this.id = input();
    this.narrowInput = input(false, {
      transform: booleanAttribute,
      alias: "narrow"
    });
    this.#narrow = linkedSignal(this.narrowInput);
    this.overlaid = input(false, {
      transform: booleanAttribute
    });
    this.placement = input();
    this.position = input("fixed");
    this.size = input();
    this.unfoldableInput = input(false, {
      transform: booleanAttribute,
      alias: "unfoldable"
    });
    this.unfoldable = linkedSignal({
      source: this.unfoldableInput,
      computation: (value) => value
    });
    this.visibleInput = input(false, {
      transform: booleanAttribute,
      alias: "visible"
    });
    this.#visible = linkedSignal(this.visibleInput);
    this.#visibleEffect = effect(() => {
      this.visibleChange.emit(this.#visible());
    });
    this.visibleChange = output();
    this.hostClasses = computed(() => {
      const {
        mobile,
        visible
      } = __spreadValues({}, this.sidebarState);
      const unfoldable = this.unfoldable();
      const placement = this.placement();
      const colorScheme = this.colorScheme();
      const size = this.size();
      return {
        sidebar: true,
        "sidebar-fixed": this.position() === "fixed" && !mobile,
        "sidebar-narrow": this.#narrow() && !unfoldable,
        "sidebar-narrow-unfoldable": unfoldable,
        "sidebar-overlaid": this.overlaid(),
        [`sidebar-${placement}`]: !!placement,
        [`sidebar-${colorScheme}`]: !!colorScheme,
        [`sidebar-${size}`]: !!size,
        show: visible,
        // show: visible && this.#onMobile, //todo: check
        hide: !visible
      };
    });
    this.#backdropService.renderer = this.#renderer;
  }
  ngOnInit() {
    this.setInitialState();
    this.layoutChangeSubscribe();
    this.stateToggleSubscribe();
  }
  ngOnDestroy() {
    this.stateToggleSubscribe(false);
    this.layoutChangeSubscribe(false);
  }
  ngOnChanges(changes) {
    const oldStateMap = new Map(Object.entries(this.state()));
    const newStateMap = /* @__PURE__ */ new Map();
    newStateMap.set("sidebar", this);
    const propList = ["visible", "unfoldable", "narrow"];
    for (const propName in changes) {
      if (propList.includes(propName)) {
        if (changes[propName] && !changes[propName].firstChange) {
          const value = booleanAttribute(changes[propName].currentValue);
          if (oldStateMap.get(propName) !== value) {
            newStateMap.set(propName, value);
          }
        }
      }
    }
    if (newStateMap.size > 1) {
      const state2 = Object.fromEntries(newStateMap.entries());
      this.#sidebarService.toggle(state2);
    }
  }
  setInitialState() {
    this.#stateInitial = {
      narrow: this.#narrow(),
      visible: this.#visible(),
      unfoldable: this.unfoldable()
    };
    this.#sidebarService.toggle(__spreadProps(__spreadValues({}, this.#stateInitial), {
      sidebar: this
    }));
  }
  stateToggleSubscribe(subscribe = true) {
    if (subscribe) {
      this.#stateToggleSubscription = this.#sidebarService.sidebarState$.subscribe((state2) => {
        if (this === state2.sidebar || this.id() === state2.id) {
          this.sidebarState = __spreadValues({}, state2);
        }
      });
    } else {
      this.#stateToggleSubscription?.unsubscribe();
    }
  }
  layoutChangeSubscribe(subscribe = true) {
    const onMobile = `(max-width: ${this.getMobileBreakpoint})`;
    if (subscribe) {
      const layoutChanges = this.#breakpointObserver.observe([onMobile]);
      this.#layoutChangeSubscription = layoutChanges.subscribe((result) => {
        const isOnMobile = result.breakpoints[onMobile];
        const isUnfoldable = isOnMobile ? false : this.unfoldable();
        if (this.#onMobile !== isOnMobile) {
          this.#onMobile = isOnMobile;
          this.#sidebarService.toggle({
            mobile: isOnMobile,
            unfoldable: isUnfoldable,
            visible: isOnMobile ? !isOnMobile : this.#stateInitial.visible,
            sidebar: this
          });
        }
      });
    } else {
      this.#layoutChangeSubscription?.unsubscribe();
    }
  }
  static {
    this.ɵfac = function SidebarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _SidebarComponent,
      selectors: [["c-sidebar"]],
      hostAttrs: [1, "sidebar"],
      hostVars: 3,
      hostBindings: function SidebarComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("inert", !ctx.sidebarState.visible || null);
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        colorScheme: [1, "colorScheme"],
        id: [1, "id"],
        narrowInput: [1, "narrow", "narrowInput"],
        overlaid: [1, "overlaid"],
        placement: [1, "placement"],
        position: [1, "position"],
        size: [1, "size"],
        unfoldableInput: [1, "unfoldable", "unfoldableInput"],
        visibleInput: [1, "visible", "visibleInput"]
      },
      outputs: {
        visibleChange: "visibleChange"
      },
      exportAs: ["cSidebar"],
      features: [ɵɵNgOnChangesFeature],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function SidebarComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarComponent, [{
    type: Component,
    args: [{
      selector: "c-sidebar",
      exportAs: "cSidebar",
      template: "<ng-content />",
      host: {
        class: "sidebar",
        "[class]": "hostClasses()",
        "[attr.inert]": "!this.sidebarState.visible || null"
      }
    }]
  }], () => [], null);
})();
var SidebarBrandComponent = class _SidebarBrandComponent {
  constructor() {
    this.brandFull = input();
    this.brandNarrow = input();
    this.routerLink = input();
    this.brandImg = computed(() => Boolean(this.brandFull() || this.brandNarrow()));
  }
  static {
    this.ɵfac = function SidebarBrandComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarBrandComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _SidebarBrandComponent,
      selectors: [["c-sidebar-brand"]],
      hostAttrs: [1, "sidebar-brand"],
      inputs: {
        brandFull: [1, "brandFull"],
        brandNarrow: [1, "brandNarrow"],
        routerLink: [1, "routerLink"]
      },
      ngContentSelectors: _c0,
      decls: 2,
      vars: 1,
      consts: [[3, "routerLink"], [3, "cHtmlAttr", "ngClass"]],
      template: function SidebarBrandComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵtemplate(0, SidebarBrandComponent_Conditional_0_Template, 3, 3, "a", 0)(1, SidebarBrandComponent_Conditional_1_Template, 1, 0);
        }
        if (rf & 2) {
          ɵɵconditional(ctx.brandImg() ? 0 : 1);
        }
      },
      dependencies: [RouterLink, HtmlAttributesDirective, NgClass],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarBrandComponent, [{
    type: Component,
    args: [{
      selector: "c-sidebar-brand",
      imports: [RouterLink, HtmlAttributesDirective, NgClass],
      host: {
        class: "sidebar-brand"
      },
      template: `@if (brandImg()) {
  <a [routerLink]="routerLink()">
    @if (brandFull()) {
      <img [cHtmlAttr]="brandFull()" [ngClass]="'sidebar-brand-full'">
    }
    @if (brandNarrow()) {
      <img [cHtmlAttr]="brandNarrow()" [ngClass]="'sidebar-brand-narrow'">
    }
  </a>
} @else {
  <ng-content />
}
`
    }]
  }], null, null);
})();
var SidebarToggleDirective = class _SidebarToggleDirective {
  constructor() {
    this.#sidebarService = inject(SidebarService);
    this.id = input(void 0, {
      alias: "cSidebarToggle"
    });
    this.toggle = input("visible");
  }
  #sidebarService;
  toggleOpen($event) {
    $event.preventDefault();
    this.#sidebarService.toggle({
      toggle: this.toggle(),
      id: this.id()
    });
  }
  static {
    this.ɵfac = function SidebarToggleDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarToggleDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _SidebarToggleDirective,
      selectors: [["", "cSidebarToggle", ""]],
      hostBindings: function SidebarToggleDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function SidebarToggleDirective_click_HostBindingHandler($event) {
            return ctx.toggleOpen($event);
          });
        }
      },
      inputs: {
        id: [1, "cSidebarToggle", "id"],
        toggle: [1, "toggle"]
      },
      exportAs: ["cSidebarToggle"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarToggleDirective, [{
    type: Directive,
    args: [{
      selector: "[cSidebarToggle]",
      exportAs: "cSidebarToggle",
      host: {
        "(click)": "toggleOpen($event)"
      }
    }]
  }], null, null);
})();
var SidebarTogglerDirective = class _SidebarTogglerDirective {
  constructor() {
    this.role = input("button");
  }
  get getStyles() {
    return {
      appearance: "button",
      "align-items": "flex-start",
      cursor: "pointer"
    };
  }
  static {
    this.ɵfac = function SidebarTogglerDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarTogglerDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _SidebarTogglerDirective,
      selectors: [["", "cSidebarToggler", ""]],
      hostAttrs: [1, "sidebar-toggler"],
      hostVars: 3,
      hostBindings: function SidebarTogglerDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("role", ctx.role());
          ɵɵstyleMap(ctx.getStyles);
        }
      },
      inputs: {
        role: [1, "role"]
      },
      features: [ɵɵHostDirectivesFeature([{
        directive: SidebarToggleDirective,
        inputs: ["cSidebarToggle", "cSidebarToggler", "toggle", "toggle"]
      }])]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarTogglerDirective, [{
    type: Directive,
    args: [{
      selector: "[cSidebarToggler]",
      hostDirectives: [{
        directive: SidebarToggleDirective,
        inputs: ["cSidebarToggle: cSidebarToggler", "toggle"]
      }],
      host: {
        "[attr.role]": "role()",
        class: "sidebar-toggler",
        "[style]": "getStyles"
      }
    }]
  }], null, null);
})();
var SidebarHeaderComponent = class _SidebarHeaderComponent {
  static {
    this.ɵfac = function SidebarHeaderComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarHeaderComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _SidebarHeaderComponent,
      selectors: [["c-sidebar-header"]],
      hostAttrs: [1, "sidebar-header"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function SidebarHeaderComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarHeaderComponent, [{
    type: Component,
    args: [{
      selector: "c-sidebar-header",
      template: "<ng-content />",
      host: {
        class: "sidebar-header"
      }
    }]
  }], null, null);
})();
var SidebarFooterComponent = class _SidebarFooterComponent {
  static {
    this.ɵfac = function SidebarFooterComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarFooterComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _SidebarFooterComponent,
      selectors: [["c-sidebar-footer"]],
      hostAttrs: [1, "sidebar-footer"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function SidebarFooterComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarFooterComponent, [{
    type: Component,
    args: [{
      selector: "c-sidebar-footer",
      template: "<ng-content />",
      host: {
        class: "sidebar-footer"
      }
    }]
  }], null, null);
})();
var SidebarNavService = class _SidebarNavService {
  static {
    this.ɵfac = function SidebarNavService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarNavService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _SidebarNavService,
      factory: _SidebarNavService.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarNavService, [{
    type: Injectable
  }], null, null);
})();
var SidebarNavHelper = class _SidebarNavHelper {
  constructor() {
    this.hasBadge = (item) => Boolean(item.badge);
    this.hasIcon = (item) => Boolean(item.icon) || item.icon === "";
    this.hasIconComponent = (item) => Boolean(item.iconComponent);
  }
  itemType(item) {
    if (item.divider) {
      return "divider";
    } else if (item.title) {
      return "title";
    } else if (item.children && item.children.length > 0) {
      return "group";
    } else if (item.label) {
      return "label";
    } else if (!Object.keys(item).length) {
      return "empty";
    } else {
      return "link";
    }
  }
  isActive(router, item) {
    return router.isActive(item.url, false);
  }
  getIconClass(item) {
    const classes = {
      "nav-icon": true
    };
    const icon = item.icon;
    classes[icon] = this.hasIcon(item);
    return classes;
  }
  static {
    this.ɵfac = function SidebarNavHelper_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarNavHelper)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _SidebarNavHelper,
      factory: _SidebarNavHelper.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarNavHelper, [{
    type: Injectable
  }], null, null);
})();
var SidebarNavGroupService = class _SidebarNavGroupService {
  constructor() {
    this.sidebarNavGroupState = new BehaviorSubject({});
    this.sidebarNavGroupState$ = this.sidebarNavGroupState.asObservable();
  }
  toggle(action) {
    this.sidebarNavGroupState.next(action);
  }
  static {
    this.ɵfac = function SidebarNavGroupService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarNavGroupService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _SidebarNavGroupService,
      factory: _SidebarNavGroupService.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarNavGroupService, [{
    type: Injectable
  }], null, null);
})();
var SidebarNavIconPipe = class _SidebarNavIconPipe {
  transform(item, args) {
    const icon = item.icon;
    return {
      "nav-icon": true,
      [`${icon}`]: !!icon
    };
  }
  static {
    this.ɵfac = function SidebarNavIconPipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarNavIconPipe)();
    };
  }
  static {
    this.ɵpipe = ɵɵdefinePipe({
      name: "cSidebarNavIcon",
      type: _SidebarNavIconPipe,
      pure: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarNavIconPipe, [{
    type: Pipe,
    args: [{
      name: "cSidebarNavIcon"
    }]
  }], null, null);
})();
var SidebarNavBadgePipe = class _SidebarNavBadgePipe {
  transform(item, args) {
    const badge = item.badge;
    return {
      badge: true,
      "ms-auto": true,
      "badge-sm": !badge.size,
      [`badge-${badge.size}`]: !!badge.size,
      [`bg-${badge.color}`]: !!badge.color,
      [`${badge.class}`]: !!badge.class
    };
  }
  static {
    this.ɵfac = function SidebarNavBadgePipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarNavBadgePipe)();
    };
  }
  static {
    this.ɵpipe = ɵɵdefinePipe({
      name: "cSidebarNavBadge",
      type: _SidebarNavBadgePipe,
      pure: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarNavBadgePipe, [{
    type: Pipe,
    args: [{
      name: "cSidebarNavBadge"
    }]
  }], null, null);
})();
var SidebarNavLinkPipe = class _SidebarNavLinkPipe {
  transform(item) {
    const disabled = item?.attributes?.disabled;
    return {
      "nav-link": true,
      disabled,
      "btn-link": disabled,
      [`nav-link-${item.variant}`]: !!item.variant
    };
  }
  static {
    this.ɵfac = function SidebarNavLinkPipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarNavLinkPipe)();
    };
  }
  static {
    this.ɵpipe = ɵɵdefinePipe({
      name: "cSidebarNavLink",
      type: _SidebarNavLinkPipe,
      pure: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarNavLinkPipe, [{
    type: Pipe,
    args: [{
      name: "cSidebarNavLink"
    }]
  }], null, null);
})();
var SidebarNavLinkContentComponent = class _SidebarNavLinkContentComponent {
  constructor() {
    this.helper = inject(SidebarNavHelper);
  }
  static {
    this.ɵfac = function SidebarNavLinkContentComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarNavLinkContentComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _SidebarNavLinkContentComponent,
      selectors: [["c-sidebar-nav-link-content"]],
      inputs: {
        item: "item"
      },
      features: [ɵɵProvidersFeature([SidebarNavHelper])],
      decls: 1,
      vars: 1,
      template: function SidebarNavLinkContentComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵtemplate(0, SidebarNavLinkContentComponent_Conditional_0_Template, 2, 1, "ng-container");
        }
        if (rf & 2) {
          ɵɵconditional(true ? 0 : -1);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarNavLinkContentComponent, [{
    type: Component,
    args: [{
      selector: "c-sidebar-nav-link-content",
      template: `
    @if (true) {
      <ng-container>{{ item?.name ?? '' }}</ng-container>
    }
  `,
      providers: [SidebarNavHelper]
    }]
  }], null, {
    item: [{
      type: Input
    }]
  });
})();
var SidebarNavLinkComponent = class _SidebarNavLinkComponent {
  set item(item) {
    this._item = JSON.parse(JSON.stringify(item));
  }
  get item() {
    return this._item;
  }
  constructor() {
    this.router = inject(Router);
    this._item = {};
    this.linkClick = output();
    const router = this.router;
    this.navigationEndObservable = router.events.pipe(filter((event) => {
      return event instanceof NavigationEnd;
    }));
  }
  ngOnInit() {
    this.url = typeof this.item.url === "string" ? this.item.url : this.router.serializeUrl(this.router.createUrlTree(this.item.url ?? [""]));
    this.linkType = this.getLinkType();
    this.href = this.isDisabled() ? "" : this.item.href || this.url;
    this.linkActive = this.router.url.split(/[?#(;]/)[0] === this.href.split(/[?#(;]/)[0];
    this.navSubscription = this.navigationEndObservable.subscribe((event) => {
      const itemUrlArray = this.href.split(/[?#(;]/)[0].split("/");
      const urlArray = event.urlAfterRedirects.split(/[?#(;]/)[0].split("/");
      this.linkActive = itemUrlArray.every((value, index) => value === urlArray[index]);
    });
  }
  ngOnDestroy() {
    this.navSubscription?.unsubscribe();
  }
  getLinkType() {
    return this.isDisabled() ? "disabled" : this.isExternalLink() ? "external" : "link";
  }
  isDisabled() {
    return this.item?.attributes?.["disabled"];
  }
  isExternalLink() {
    const linkPath = Array.isArray(this.item.url) ? this.item.url[0] : this.item.url;
    return !!this.item.href || linkPath?.substring(0, 4) === "http";
  }
  linkClicked() {
    this.linkClick.emit();
  }
  static {
    this.ɵfac = function SidebarNavLinkComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarNavLinkComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _SidebarNavLinkComponent,
      selectors: [["c-sidebar-nav-link"]],
      inputs: {
        item: "item"
      },
      outputs: {
        linkClick: "linkClick"
      },
      features: [ɵɵProvidersFeature([SidebarNavHelper])],
      decls: 5,
      vars: 1,
      consts: [["iconTemplate", ""], [3, "cHtmlAttr", "ngClass"], [3, "cHtmlAttr", "href", "ngClass"], ["routerLinkActive", "active", 3, "cHtmlAttr", "fragment", "ngClass", "preserveFragment", "queryParamsHandling", "queryParams", "replaceUrl", "routerLinkActiveOptions", "routerLink", "skipLocationChange", "state", "target"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "item"], [3, "ngClass"], [3, "click", "cHtmlAttr", "href", "ngClass"], ["routerLinkActive", "active", 3, "click", "cHtmlAttr", "fragment", "ngClass", "preserveFragment", "queryParamsHandling", "queryParams", "replaceUrl", "routerLinkActiveOptions", "routerLink", "skipLocationChange", "state", "target"], [1, "nav-icon"], [3, "cIcon", "customClasses", "name"]],
      template: function SidebarNavLinkComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵtemplate(0, SidebarNavLinkComponent_Case_0_Template, 5, 11, "a", 1)(1, SidebarNavLinkComponent_Case_1_Template, 5, 12, "a", 2)(2, SidebarNavLinkComponent_Case_2_Template, 5, 23, "a", 3)(3, SidebarNavLinkComponent_ng_template_3_Template, 3, 3, "ng-template", null, 0, ɵɵtemplateRefExtractor);
        }
        if (rf & 2) {
          let tmp_1_0;
          ɵɵconditional((tmp_1_0 = ctx.linkType) === "disabled" ? 0 : tmp_1_0 === "external" ? 1 : 2);
        }
      },
      dependencies: [RouterModule, RouterLink, RouterLinkActive, HtmlAttributesDirective, IconDirective, SidebarNavLinkContentComponent, SidebarNavLinkPipe, SidebarNavBadgePipe, SidebarNavIconPipe, NgTemplateOutlet, NgClass],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarNavLinkComponent, [{
    type: Component,
    args: [{
      selector: "c-sidebar-nav-link",
      providers: [SidebarNavHelper],
      imports: [RouterModule, HtmlAttributesDirective, IconDirective, SidebarNavLinkContentComponent, SidebarNavLinkPipe, SidebarNavBadgePipe, SidebarNavIconPipe, NgTemplateOutlet, NgClass],
      template: `@switch (linkType) {
  @case ('disabled') {
    <a [cHtmlAttr]="item.attributes ?? {}" [ngClass]="item | cSidebarNavLink">
      <ng-container *ngTemplateOutlet="iconTemplate; context: {$implicit: item}" />
      <c-sidebar-nav-link-content [item]="item" />
      @if (item.badge) {
        <span [ngClass]="item | cSidebarNavBadge">{{ item.badge?.text }}</span>
      }
    </a>
  }
  @case ('external') {
    <a (click)="linkClicked()" [cHtmlAttr]="item.attributes ?? {}" [href]="href" [ngClass]="item | cSidebarNavLink">
      <ng-container *ngTemplateOutlet="iconTemplate; context: {$implicit: item}" />
      <c-sidebar-nav-link-content [item]="item" />
      @if (item.badge) {
        <span [ngClass]="item | cSidebarNavBadge">{{ item.badge?.text }}</span>
      }
    </a>
  }
  @default {
    <a (click)="linkClicked()"
       [cHtmlAttr]="item.attributes ?? {}"
       [fragment]="item.linkProps?.fragment"
       [ngClass]="item | cSidebarNavLink"
       [preserveFragment]="item.linkProps?.preserveFragment ?? false"
       [queryParamsHandling]="item.linkProps?.queryParamsHandling"
       [queryParams]="item.linkProps?.queryParams ?? null"
       [replaceUrl]="item.linkProps?.replaceUrl ?? false"
       [routerLinkActiveOptions]="item.linkProps?.routerLinkActiveOptions ?? { exact: false }"
       [routerLink]="item.url"
       [skipLocationChange]="item.linkProps?.skipLocationChange ?? false"
       [state]="item.linkProps?.state ?? {}"
       [target]="item.attributes?.['target']"
       routerLinkActive="active"
    >
      <!--    [class.active]="linkActive"-->
      <ng-container *ngTemplateOutlet="iconTemplate ; context: {$implicit: item}" />
      <c-sidebar-nav-link-content [item]="item" />
      @if (item.badge) {
        <span [ngClass]="item | cSidebarNavBadge">{{ item.badge?.text }}</span>
      }
    </a>
  }
}
<ng-template #iconTemplate let-item>
  <!--  <i *ngIf="item?.icon" [ngClass]="item | cSidebarNavIcon"></i>-->
  @if (item?.icon) {
    <span class="nav-icon">
      <span [ngClass]="item.icon ?? ''"></span>
    </span>
  }
  @if (item?.iconComponent) {
    <svg
      [cIcon]="item.iconComponent?.content"
      [customClasses]="item | cSidebarNavIcon"
      [name]="item.iconComponent?.name"
    ></svg>
  }
  @if (!item?.icon && !item?.iconComponent) {
    <span [ngClass]="item | cSidebarNavIcon"></span>
  }
</ng-template>
`
    }]
  }], () => [], {
    item: [{
      type: Input
    }]
  });
})();
var SidebarNavLabelComponent = class _SidebarNavLabelComponent {
  constructor() {
    this.helper = inject(SidebarNavHelper);
    this.classes = {
      "c-nav-label": true,
      "c-active": true
    };
    this.iconClasses = {};
  }
  ngOnInit() {
    this.iconClasses = this.helper.getIconClass(this.item);
  }
  getItemClass() {
    const itemClass = this.item.class;
    this.classes[itemClass] = !!itemClass;
    return this.classes;
  }
  getLabelIconClass() {
    const variant = `text-${this.item.label.variant}`;
    this.iconClasses[variant] = !!this.item.label.variant;
    const labelClass = this.item.label.class;
    this.iconClasses[labelClass] = !!labelClass;
    return this.iconClasses;
  }
  static {
    this.ɵfac = function SidebarNavLabelComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarNavLabelComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _SidebarNavLabelComponent,
      selectors: [["c-sidebar-nav-label"]],
      inputs: {
        item: "item"
      },
      decls: 5,
      vars: 6,
      consts: [[3, "cHtmlAttr", "ngClass", "href"], [3, "ngClass"]],
      template: function SidebarNavLabelComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "a", 0);
          ɵɵtemplate(1, SidebarNavLabelComponent_Conditional_1_Template, 1, 1, "i", 1);
          ɵɵelementContainerStart(2);
          ɵɵtext(3);
          ɵɵelementContainerEnd();
          ɵɵtemplate(4, SidebarNavLabelComponent_Conditional_4_Template, 3, 4, "span", 1);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵpropertyInterpolate("href", ctx.item.url, ɵɵsanitizeUrl);
          ɵɵproperty("cHtmlAttr", ctx.item.attributes)("ngClass", ctx.getItemClass());
          ɵɵadvance();
          ɵɵconditional(ctx.helper.hasIcon(ctx.item) ? 1 : -1);
          ɵɵadvance(2);
          ɵɵtextInterpolate(ctx.item.name);
          ɵɵadvance();
          ɵɵconditional(ctx.helper.hasBadge(ctx.item) ? 4 : -1);
        }
      },
      dependencies: [HtmlAttributesDirective, SidebarNavBadgePipe, NgClass],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarNavLabelComponent, [{
    type: Component,
    args: [{
      selector: "c-sidebar-nav-label",
      imports: [HtmlAttributesDirective, SidebarNavBadgePipe, NgClass],
      template: '<a [cHtmlAttr]="item.attributes"\n   [ngClass]="getItemClass()"\n   href="{{item.url}}">\n  @if (helper.hasIcon(item)) {\n    <i [ngClass]="getLabelIconClass()"></i>\n  }\n  <ng-container>{{ item.name }}</ng-container>\n  @if (helper.hasBadge(item)) {\n    <span [ngClass]="item | cSidebarNavBadge">{{ item.badge.text }}</span>\n  }\n</a>\n'
    }]
  }], null, {
    item: [{
      type: Input
    }]
  });
})();
var SidebarNavTitleComponent = class _SidebarNavTitleComponent {
  #elementRef = inject(ElementRef);
  #renderer = inject(Renderer2);
  ngOnInit() {
    const nativeElement = this.#elementRef.nativeElement;
    const name = this.#renderer.createText(this.item.name);
    if (this.item.class) {
      const classes = this.item.class;
      this.#renderer.addClass(nativeElement, classes);
    }
    if (this.item.wrapper) {
      const wrapper = this.#renderer.createElement(this.item.wrapper.element);
      this.addAttribs(this.item.wrapper.attributes, wrapper);
      this.#renderer.appendChild(wrapper, name);
      this.#renderer.appendChild(nativeElement, wrapper);
    } else {
      this.#renderer.appendChild(nativeElement, name);
    }
  }
  addAttribs(attribs, element) {
    if (attribs) {
      for (const attr in attribs) {
        if (attr === "style" && typeof attribs[attr] === "object") {
          this.setStyle(attribs[attr], element);
        } else if (attr === "class") {
          this.addClass(attribs[attr], element);
        } else {
          this.setAttrib(attr, attribs[attr], element);
        }
      }
    }
  }
  setStyle(styles, el) {
    for (const style2 in styles) {
      if (style2) {
        this.#renderer.setStyle(el, style2, styles[style2]);
      }
    }
  }
  addClass(classes, el) {
    const classArray = Array.isArray(classes) ? classes : classes.split(" ");
    classArray.filter((element) => element.length > 0).forEach((element) => {
      this.#renderer.addClass(el, element);
    });
  }
  setAttrib(key, value, el) {
    this.#renderer.setAttribute(el, key, value);
  }
  static {
    this.ɵfac = function SidebarNavTitleComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarNavTitleComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _SidebarNavTitleComponent,
      selectors: [["c-sidebar-nav-title"]],
      inputs: {
        item: "item"
      },
      decls: 0,
      vars: 0,
      template: function SidebarNavTitleComponent_Template(rf, ctx) {
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarNavTitleComponent, [{
    type: Component,
    args: [{
      selector: "c-sidebar-nav-title",
      template: ""
    }]
  }], null, {
    item: [{
      type: Input
    }]
  });
})();
var SidebarNavDividerComponent = class _SidebarNavDividerComponent {
  static {
    this.ɵfac = function SidebarNavDividerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarNavDividerComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _SidebarNavDividerComponent,
      selectors: [["c-sidebar-nav-divider"]],
      inputs: {
        item: "item"
      },
      decls: 0,
      vars: 0,
      template: function SidebarNavDividerComponent_Template(rf, ctx) {
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarNavDividerComponent, [{
    type: Component,
    args: [{
      selector: "c-sidebar-nav-divider",
      template: ``
    }]
  }], null, {
    item: [{
      type: Input
    }]
  });
})();
var SidebarNavItemClassPipe = class _SidebarNavItemClassPipe {
  constructor() {
    this.helper = inject(SidebarNavHelper);
  }
  // transform(item: any, ...args: any[]): any {
  transform(item, args) {
    const itemType = this.helper.itemType(item);
    let itemClass;
    if (["divider", "title"].includes(itemType)) {
      itemClass = `nav-${itemType}`;
    } else if (itemType === "group") {
      itemClass = "";
    } else {
      itemClass = "nav-item";
    }
    return item.class ? `${itemClass} ${item.class}` : itemClass;
  }
  static {
    this.ɵfac = function SidebarNavItemClassPipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarNavItemClassPipe)();
    };
  }
  static {
    this.ɵpipe = ɵɵdefinePipe({
      name: "cSidebarNavItemClass",
      type: _SidebarNavItemClassPipe,
      pure: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarNavItemClassPipe, [{
    type: Pipe,
    args: [{
      name: "cSidebarNavItemClass"
    }]
  }], null, null);
})();
var SidebarNavGroupComponent = class _SidebarNavGroupComponent {
  #router;
  #renderer;
  #hostElement;
  #sidebarNavGroupService;
  constructor() {
    this.#router = inject(Router);
    this.#renderer = inject(Renderer2);
    this.#hostElement = inject(ElementRef);
    this.#sidebarNavGroupService = inject(SidebarNavGroupService);
    this.helper = inject(SidebarNavHelper);
    this.dropdownMode = "path";
    this.navItems = [];
    this.display = {
      display: "block"
    };
    const router = this.#router;
    this.navigationEndObservable = router.events.pipe(filter((event) => event instanceof NavigationEnd));
  }
  get hostClasses() {
    return {
      "nav-group": true,
      show: this.open
    };
  }
  ngOnInit() {
    this.navItems = [...this.item.children];
    this.navSubscription = this.navigationEndObservable.subscribe((event) => {
      if (this.dropdownMode !== "none") {
        const samePath = this.samePath(event.url);
        this.openGroup(samePath);
      }
    });
    if (this.samePath(this.#router.routerState.snapshot.url)) {
      this.openGroup(true);
    }
    this.navGroupSubscription = this.#sidebarNavGroupService.sidebarNavGroupState$.subscribe((next) => {
      if (this.dropdownMode === "close" && next.sidebarNavGroup && next.sidebarNavGroup !== this) {
        if (next.sidebarNavGroup.item.url.startsWith(this.item.url)) {
          return;
        }
        if (this.samePath(this.#router.routerState.snapshot.url)) {
          this.openGroup(true);
          return;
        }
        this.openGroup(false);
      }
    });
  }
  samePath(url) {
    const itemArray = this.item.url?.split("/");
    const urlArray = url.split("/");
    return itemArray?.every((value, index) => {
      return value === urlArray[index];
    });
  }
  openGroup(open) {
    this.open = open;
  }
  toggleGroup($event) {
    $event.preventDefault();
    this.openGroup(!this.open);
    if (this.open) {
      this.#sidebarNavGroupService.toggle({
        open: this.open,
        sidebarNavGroup: this
      });
    }
  }
  ngOnDestroy() {
    this.navSubscription?.unsubscribe();
  }
  onAnimationStart($event) {
    this.display = {
      display: "block"
    };
    setTimeout(() => {
      const host = this.sidebarNav?.nativeElement;
      if ($event.toState === "open" && host) {
        this.#renderer.setStyle(host, "height", `${host["scrollHeight"]}px`);
      }
    });
  }
  onAnimationDone($event) {
    setTimeout(() => {
      const host = this.sidebarNav?.nativeElement;
      if ($event.toState === "open" && host) {
        this.#renderer.setStyle(host, "height", "auto");
      }
      if ($event.toState === "closed") {
        setTimeout(() => {
          this.display = null;
        });
      }
    });
  }
  static {
    this.ɵfac = function SidebarNavGroupComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarNavGroupComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _SidebarNavGroupComponent,
      selectors: [["c-sidebar-nav-group"]],
      viewQuery: function SidebarNavGroupComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(SidebarNavComponent, 5, ElementRef);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.sidebarNav = _t.first);
        }
      },
      hostVars: 2,
      hostBindings: function SidebarNavGroupComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses);
        }
      },
      inputs: {
        item: "item",
        dropdownMode: "dropdownMode",
        show: "show",
        compact: [2, "compact", "compact", booleanAttribute]
      },
      features: [ɵɵProvidersFeature([SidebarNavHelper, SidebarNavGroupService])],
      decls: 8,
      vars: 13,
      consts: [["iconTemplate", ""], ["href", "", 1, "nav-link", "nav-group-toggle", 3, "click", "cHtmlAttr"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "ngClass"], [3, "compact", "dropdownMode", "groupItems", "navItems", "ngStyle"], [1, "nav-icon"], [3, "cIcon", "customClasses", "name"]],
      template: function SidebarNavGroupComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = ɵɵgetCurrentView();
          ɵɵelementStart(0, "a", 1);
          ɵɵlistener("click", function SidebarNavGroupComponent_Template_a_click_0_listener($event) {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.toggleGroup($event));
          });
          ɵɵtemplate(1, SidebarNavGroupComponent_ng_container_1_Template, 1, 0, "ng-container", 2);
          ɵɵelementContainerStart(2);
          ɵɵtext(3);
          ɵɵelementContainerEnd();
          ɵɵtemplate(4, SidebarNavGroupComponent_Conditional_4_Template, 3, 4, "span", 3);
          ɵɵelementEnd();
          ɵɵelementStart(5, "c-sidebar-nav", 4);
          ɵɵlistener("@openClose.done", function SidebarNavGroupComponent_Template_c_sidebar_nav_animation_openClose_done_5_listener($event) {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.onAnimationDone($event));
          })("@openClose.start", function SidebarNavGroupComponent_Template_c_sidebar_nav_animation_openClose_start_5_listener($event) {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.onAnimationStart($event));
          });
          ɵɵelementEnd();
          ɵɵtemplate(6, SidebarNavGroupComponent_ng_template_6_Template, 3, 3, "ng-template", null, 0, ɵɵtemplateRefExtractor);
        }
        if (rf & 2) {
          const iconTemplate_r4 = ɵɵreference(7);
          ɵɵproperty("cHtmlAttr", ctx.item.attributes);
          ɵɵadvance();
          ɵɵproperty("ngTemplateOutlet", iconTemplate_r4)("ngTemplateOutletContext", ɵɵpureFunction1(11, _c10, ctx.item));
          ɵɵadvance(2);
          ɵɵtextInterpolate(ctx.item.name);
          ɵɵadvance();
          ɵɵconditional(ctx.helper.hasBadge(ctx.item) ? 4 : -1);
          ɵɵadvance();
          ɵɵproperty("@openClose", ctx.open ? "open" : "closed")("compact", ctx.compact)("dropdownMode", ctx.dropdownMode)("groupItems", true)("navItems", ctx.navItems)("ngStyle", ctx.display);
        }
      },
      dependencies: () => [HtmlAttributesDirective, IconDirective, NgTemplateOutlet, NgClass, SidebarNavIconPipe, SidebarNavBadgePipe, SidebarNavComponent, NgStyle],
      styles: [".nav-group-toggle[_ngcontent-%COMP%]{cursor:pointer}.nav-group-items[_ngcontent-%COMP%]{display:block}"],
      data: {
        animation: [trigger("openClose", [state("open", style({
          height: "*"
        })), state("closed", style({
          height: "0px"
        })), transition("open <=> closed", [animate(".15s ease")])])]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarNavGroupComponent, [{
    type: Component,
    args: [{
      selector: "c-sidebar-nav-group",
      providers: [SidebarNavHelper, SidebarNavGroupService],
      imports: [HtmlAttributesDirective, IconDirective, NgTemplateOutlet, NgClass, SidebarNavIconPipe, SidebarNavBadgePipe, forwardRef(() => SidebarNavComponent), NgStyle],
      animations: [trigger("openClose", [state("open", style({
        height: "*"
      })), state("closed", style({
        height: "0px"
      })), transition("open <=> closed", [animate(".15s ease")])])],
      template: `<a (click)="toggleGroup($event)"
   [cHtmlAttr]="item.attributes"
   class="nav-link nav-group-toggle"
   href>
  <ng-container *ngTemplateOutlet="iconTemplate ; context: {$implicit: item}" />
  <ng-container>{{ item.name }}</ng-container>
  @if (helper.hasBadge(item)) {
    <span [ngClass]="item | cSidebarNavBadge">{{ item.badge.text }}</span>
  }
</a>
<c-sidebar-nav
  (@openClose.done)="onAnimationDone($event)"
  (@openClose.start)="onAnimationStart($event)"
  [@openClose]="open ? 'open' : 'closed'"
  [compact]="compact"
  [dropdownMode]="dropdownMode"
  [groupItems]="true"
  [navItems]="navItems"
  [ngStyle]="display"
/>

<ng-template #iconTemplate let-item>
  <!--  <i *ngIf="item?.icon" [ngClass]="item | cSidebarNavIcon"></i>-->
  @if (item?.icon) {
    <span class="nav-icon">
    <span [ngClass]="item.icon ?? ''"></span>
  </span>
  }
  @if (item?.iconComponent) {
    <svg
      [cIcon]="item.iconComponent?.content"
      [customClasses]="item | cSidebarNavIcon"
      [name]="item.iconComponent?.name"
    />
  }
  @if (!item?.icon && !item?.iconComponent) {
    <span [ngClass]="item | cSidebarNavIcon"></span>
  }
</ng-template>
`,
      styles: [".nav-group-toggle{cursor:pointer}.nav-group-items{display:block}\n"]
    }]
  }], () => [], {
    item: [{
      type: Input
    }],
    dropdownMode: [{
      type: Input
    }],
    show: [{
      type: Input
    }],
    compact: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hostClasses: [{
      type: HostBinding,
      args: ["class"]
    }],
    sidebarNav: [{
      type: ViewChild,
      args: [forwardRef(() => SidebarNavComponent), {
        read: ElementRef
      }]
    }]
  });
})();
var SidebarNavComponent = class _SidebarNavComponent {
  constructor() {
    this.sidebar = inject(SidebarComponent, {
      optional: true
    });
    this.helper = inject(SidebarNavHelper);
    this.router = inject(Router);
    this.#renderer = inject(Renderer2);
    this.#hostElement = inject(ElementRef);
    this.#sidebarService = inject(SidebarService);
    this.navItems = [];
    this.dropdownMode = "path";
    this.role = "navigation";
    this.navItemsArray = [];
  }
  #renderer;
  #hostElement;
  #sidebarService;
  get hostClasses() {
    return {
      "sidebar-nav": !this.groupItems,
      "nav-group-items": this.groupItems,
      compact: this.groupItems && this.compact
    };
  }
  ngOnChanges(changes) {
    this.navItemsArray = Array.isArray(this.navItems) ? this.navItems.slice() : [];
  }
  hideMobile() {
    if (this.sidebar && this.sidebar.sidebarState.mobile) {
      this.#sidebarService.toggle({
        toggle: "visible",
        sidebar: this.sidebar
      });
    }
  }
  static {
    this.ɵfac = function SidebarNavComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarNavComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _SidebarNavComponent,
      selectors: [["c-sidebar-nav"]],
      hostVars: 3,
      hostBindings: function SidebarNavComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("role", ctx.role);
          ɵɵclassMap(ctx.hostClasses);
        }
      },
      inputs: {
        navItems: "navItems",
        dropdownMode: "dropdownMode",
        groupItems: [2, "groupItems", "groupItems", booleanAttribute],
        compact: [2, "compact", "compact", booleanAttribute],
        role: "role"
      },
      features: [ɵɵNgOnChangesFeature],
      ngContentSelectors: _c0,
      decls: 3,
      vars: 0,
      consts: [["rla", "routerLinkActive"], ["routerLinkActive", "show", 3, "dropdownMode", "item", "ngClass", "routerLinkActiveOptions", "compact"], [3, "cHtmlAttr", "item", "ngClass"], [3, "item", "ngClass"], [3, "linkClick", "item", "ngClass"]],
      template: function SidebarNavComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵrepeaterCreate(0, SidebarNavComponent_For_1_Template, 6, 1, null, null, ɵɵrepeaterTrackByIdentity);
          ɵɵprojection(2);
        }
        if (rf & 2) {
          ɵɵrepeater(ctx.navItemsArray);
        }
      },
      dependencies: () => [NgClass, HtmlAttributesDirective, SidebarNavLinkComponent, SidebarNavLabelComponent, SidebarNavTitleComponent, SidebarNavDividerComponent, SidebarNavGroupComponent, SidebarNavItemClassPipe, RouterModule, RouterLinkActive],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarNavComponent, [{
    type: Component,
    args: [{
      selector: "c-sidebar-nav",
      imports: [NgClass, HtmlAttributesDirective, SidebarNavLinkComponent, SidebarNavLabelComponent, SidebarNavTitleComponent, SidebarNavDividerComponent, forwardRef(() => SidebarNavGroupComponent), SidebarNavItemClassPipe, RouterModule],
      template: `@for (item of navItemsArray; track item) {
  @switch (helper.itemType(item)) {
    @case ('group') {
      <c-sidebar-nav-group
        #rla="routerLinkActive"
        [dropdownMode]="dropdownMode"
        [item]="item"
        [ngClass]="item | cSidebarNavItemClass"
        [routerLinkActiveOptions]="{exact: true}"
        routerLinkActive="show"
        [compact]="compact"
      />
    }
    @case ('divider') {
      <c-sidebar-nav-divider
        [cHtmlAttr]="item.attributes ?? {}"
        [item]="item"
        [ngClass]="item | cSidebarNavItemClass"
      />
    }
    @case ('title') {
      <c-sidebar-nav-title
        [cHtmlAttr]="item.attributes ?? {}"
        [item]="item"
        [ngClass]="item | cSidebarNavItemClass"
      />
    }
    @case ('label') {
      <c-sidebar-nav-label
        [item]="item"
        [ngClass]="item | cSidebarNavItemClass"
      />
    }
    @case ('empty') {
      <ng-container />
    }
    @default {
      <c-sidebar-nav-link
        (linkClick)="hideMobile()"
        [item]="item"
        [ngClass]="item | cSidebarNavItemClass"
      />
    }
  }
}
<ng-content />
`
    }]
  }], null, {
    navItems: [{
      type: Input
    }],
    dropdownMode: [{
      type: Input
    }],
    groupItems: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    compact: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hostClasses: [{
      type: HostBinding,
      args: ["class"]
    }],
    role: [{
      type: HostBinding,
      args: ["attr.role"]
    }, {
      type: Input
    }]
  });
})();
var SidebarModule = class _SidebarModule {
  static {
    this.ɵfac = function SidebarModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _SidebarModule,
      imports: [SidebarComponent, SidebarBrandComponent, SidebarFooterComponent, SidebarHeaderComponent, SidebarNavComponent, SidebarNavBadgePipe, SidebarNavDividerComponent, SidebarNavGroupComponent, SidebarNavIconPipe, SidebarNavItemClassPipe, SidebarNavLabelComponent, SidebarNavLinkComponent, SidebarNavLinkContentComponent, SidebarNavLinkPipe, SidebarNavTitleComponent, SidebarToggleDirective, SidebarTogglerDirective],
      exports: [SidebarComponent, SidebarToggleDirective, SidebarTogglerDirective, SidebarBrandComponent, SidebarNavComponent, SidebarHeaderComponent, SidebarFooterComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      providers: [SidebarService, SidebarNavHelper, SidebarNavGroupService],
      imports: [SidebarNavComponent, SidebarNavGroupComponent, SidebarNavLinkComponent]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarModule, [{
    type: NgModule,
    args: [{
      imports: [SidebarComponent, SidebarBrandComponent, SidebarFooterComponent, SidebarHeaderComponent, SidebarNavComponent, SidebarNavBadgePipe, SidebarNavDividerComponent, SidebarNavGroupComponent, SidebarNavIconPipe, SidebarNavItemClassPipe, SidebarNavLabelComponent, SidebarNavLinkComponent, SidebarNavLinkContentComponent, SidebarNavLinkPipe, SidebarNavTitleComponent, SidebarToggleDirective, SidebarTogglerDirective],
      exports: [SidebarComponent, SidebarToggleDirective, SidebarTogglerDirective, SidebarBrandComponent, SidebarNavComponent, SidebarHeaderComponent, SidebarFooterComponent],
      providers: [SidebarService, SidebarNavHelper, SidebarNavGroupService]
    }]
  }], null, null);
})();
var SpinnerComponent = class _SpinnerComponent {
  constructor() {
    this.color = input();
    this.label = input("Loading...");
    this.size = input();
    this.variant = input("border");
    this.role = input("status");
    this.hostClasses = computed(() => {
      return {
        [`spinner-${this.variant()}`]: true,
        [`text-${this.color()}`]: !!this.color(),
        [`spinner-${this.variant()}-${this.size()}`]: !!this.size()
      };
    });
  }
  static {
    this.ɵfac = function SpinnerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SpinnerComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _SpinnerComponent,
      selectors: [["c-spinner"]],
      hostVars: 3,
      hostBindings: function SpinnerComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("role", ctx.role());
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        color: [1, "color"],
        label: [1, "label"],
        size: [1, "size"],
        variant: [1, "variant"],
        role: [1, "role"]
      },
      ngContentSelectors: _c0,
      decls: 2,
      vars: 0,
      consts: [[1, "visually-hidden"]],
      template: function SpinnerComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0, 0, null, SpinnerComponent_ProjectionFallback_0_Template, 2, 1);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SpinnerComponent, [{
    type: Component,
    args: [{
      selector: "c-spinner",
      host: {
        "[attr.role]": "role()",
        "[class]": "hostClasses()"
      },
      template: '<ng-content>\n  <span class="visually-hidden">{{ label() }}</span>\n</ng-content>\n'
    }]
  }], null, null);
})();
var SpinnerModule = class _SpinnerModule {
  static {
    this.ɵfac = function SpinnerModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SpinnerModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _SpinnerModule,
      imports: [SpinnerComponent],
      exports: [SpinnerComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SpinnerModule, [{
    type: NgModule,
    args: [{
      exports: [SpinnerComponent],
      imports: [SpinnerComponent]
    }]
  }], null, null);
})();
var TableColorDirective = class _TableColorDirective {
  constructor() {
    this.color = input(void 0, {
      alias: "cTableColor"
    });
    this.hostClasses = computed(() => {
      const color = this.color();
      return {
        [`table-${color}`]: !!color
      };
    });
  }
  static {
    this.ɵfac = function TableColorDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TableColorDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TableColorDirective,
      selectors: [["", "cTableColor", ""]],
      hostVars: 2,
      hostBindings: function TableColorDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        color: [1, "cTableColor", "color"]
      },
      exportAs: ["cTableColor"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TableColorDirective, [{
    type: Directive,
    args: [{
      selector: "[cTableColor]",
      exportAs: "cTableColor",
      host: {
        "[class]": "hostClasses()"
      }
    }]
  }], null, null);
})();
var TableActiveDirective = class _TableActiveDirective {
  constructor() {
    this.active = input(false, {
      alias: "cTableActive",
      transform: booleanAttribute
    });
  }
  static {
    this.ɵfac = function TableActiveDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TableActiveDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TableActiveDirective,
      selectors: [["", "cTableActive", ""]],
      hostVars: 2,
      hostBindings: function TableActiveDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassProp("table-active", ctx.active());
        }
      },
      inputs: {
        active: [1, "cTableActive", "active"]
      },
      exportAs: ["cTableActive"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TableActiveDirective, [{
    type: Directive,
    args: [{
      selector: "[cTableActive]",
      exportAs: "cTableActive",
      host: {
        "[class.table-active]": "active()"
      }
    }]
  }], null, null);
})();
var TableDirective = class _TableDirective {
  constructor() {
    this.#renderer = inject(Renderer2);
    this.#hostElement = inject(ElementRef);
    this.align = input();
    this.borderColor = input();
    this.bordered = input(false, {
      transform: booleanAttribute
    });
    this.borderless = input(false, {
      transform: booleanAttribute
    });
    this.caption = input();
    this.color = input();
    this.hover = input(false, {
      transform: booleanAttribute
    });
    this.responsive = input();
    this.small = input(false, {
      transform: booleanAttribute
    });
    this.striped = input(false, {
      transform: booleanAttribute
    });
    this.stripedColumns = input(false, {
      transform: booleanAttribute
    });
    this.hostClasses = computed(() => {
      const align = this.align();
      const caption = this.caption();
      const borderColor = this.borderColor();
      const bordered = this.bordered();
      const borderless = this.borderless();
      const color = this.color();
      const hover = this.hover();
      const small = this.small();
      const striped = this.striped();
      const stripedColumns = this.stripedColumns();
      return {
        table: true,
        [`align-${align}`]: !!align,
        [`caption-${caption}`]: !!caption,
        [`border-${borderColor}`]: !!borderColor,
        "table-bordered": bordered,
        "table-borderless": borderless,
        [`table-${color}`]: !!color,
        "table-hover": hover,
        "table-sm": small,
        "table-striped": striped,
        "table-striped-columns": stripedColumns
      };
    });
    this.#responsiveWrapperEffect = effect(() => {
      const responsive = this.responsive();
      if (!!responsive) {
        const nativeElement = this.#hostElement.nativeElement;
        const wrapper = this.#renderer.createElement("div");
        const className = responsive === true ? "table-responsive" : `table-responsive-${responsive}`;
        this.#renderer.addClass(wrapper, className);
        const parentNode = this.#renderer.parentNode(nativeElement);
        this.#renderer.appendChild(parentNode, wrapper);
        this.#renderer.insertBefore(parentNode, wrapper, nativeElement);
        this.#renderer.appendChild(wrapper, nativeElement);
      }
    });
  }
  #renderer;
  #hostElement;
  #responsiveWrapperEffect;
  static {
    this.ɵfac = function TableDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TableDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TableDirective,
      selectors: [["table", "cTable", ""]],
      hostAttrs: [1, "table"],
      hostVars: 2,
      hostBindings: function TableDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        align: [1, "align"],
        borderColor: [1, "borderColor"],
        bordered: [1, "bordered"],
        borderless: [1, "borderless"],
        caption: [1, "caption"],
        color: [1, "color"],
        hover: [1, "hover"],
        responsive: [1, "responsive"],
        small: [1, "small"],
        striped: [1, "striped"],
        stripedColumns: [1, "stripedColumns"]
      },
      exportAs: ["cTable"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TableDirective, [{
    type: Directive,
    args: [{
      selector: "table[cTable]",
      exportAs: "cTable",
      host: {
        class: "table",
        "[class]": "hostClasses()"
      }
    }]
  }], null, null);
})();
var TableModule = class _TableModule {
  static {
    this.ɵfac = function TableModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TableModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _TableModule,
      imports: [TableDirective, TableColorDirective, TableActiveDirective],
      exports: [TableDirective, TableColorDirective, TableActiveDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TableModule, [{
    type: NgModule,
    args: [{
      exports: [TableDirective, TableColorDirective, TableActiveDirective],
      imports: [TableDirective, TableColorDirective, TableActiveDirective]
    }]
  }], null, null);
})();
var TabService = class _TabService {
  constructor() {
    this.activeTabPaneIdx = new Subject();
    this.activeTabPaneIdx$ = this.activeTabPaneIdx.asObservable();
  }
  setActiveTabIdx(tabContentState) {
    this.activeTabPaneIdx.next(tabContentState);
  }
  static {
    this.ɵfac = function TabService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TabService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _TabService,
      factory: _TabService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var TabPaneComponent = class _TabPaneComponent {
  #changeDetectorRef;
  #tabService;
  constructor() {
    this.#changeDetectorRef = inject(ChangeDetectorRef);
    this.#tabService = inject(TabService);
    this.#active = false;
    this.role = "tabpanel";
    this.subscribeTabService();
  }
  #tabServiceSubscription;
  set active(value) {
    const newValue = booleanAttribute(value);
    if (this.#active !== newValue) {
      this.#active = newValue;
      this.#changeDetectorRef.markForCheck();
    }
  }
  get active() {
    return this.#active;
  }
  #active;
  get hostClasses() {
    return {
      "tab-pane": true,
      fade: true,
      show: this.active,
      active: this.active
    };
  }
  ngOnDestroy() {
    this.subscribeTabService(false);
  }
  subscribeTabService(subscribe = true) {
    if (subscribe) {
      this.#tabServiceSubscription = this.#tabService.activeTabPaneIdx$.subscribe((tabContentState) => {
        if (tabContentState.tabContent === this.tabContent) {
          this.active = tabContentState.activeIdx === this.tabPaneIdx;
        }
      });
    } else {
      this.#tabServiceSubscription?.unsubscribe();
    }
  }
  static {
    this.ɵfac = function TabPaneComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TabPaneComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _TabPaneComponent,
      selectors: [["c-tab-pane"]],
      hostAttrs: [1, "tab-pane"],
      hostVars: 3,
      hostBindings: function TabPaneComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("role", ctx.role);
          ɵɵclassMap(ctx.hostClasses);
        }
      },
      inputs: {
        role: "role"
      },
      exportAs: ["cTabPane"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function TabPaneComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      styles: ["[_nghost-%COMP%]{display:block}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabPaneComponent, [{
    type: Component,
    args: [{
      selector: "c-tab-pane",
      template: "<ng-content />",
      exportAs: "cTabPane",
      host: {
        class: "tab-pane"
      },
      styles: [":host{display:block}\n"]
    }]
  }], () => [], {
    hostClasses: [{
      type: HostBinding,
      args: ["class"]
    }],
    role: [{
      type: Input
    }, {
      type: HostBinding,
      args: ["attr.role"]
    }]
  });
})();
var TabContentComponent = class _TabContentComponent {
  constructor() {
    this.#changeDetectorRef = inject(ChangeDetectorRef);
    this.#tabService = inject(TabService);
    this.#activeTabPaneIdx = -1;
    this.activeTabPaneIdxChange = new EventEmitter();
  }
  #changeDetectorRef;
  #tabService;
  /**
   * Set active tabPane index
   * @type number
   */
  set activeTabPaneIdx(value) {
    const newValue = value;
    if (this.#activeTabPaneIdx != newValue) {
      this.#activeTabPaneIdx = newValue;
      this.activeTabPaneIdxChange.emit(newValue);
      this.#changeDetectorRef.markForCheck();
      this.#changeDetectorRef.detectChanges();
    }
  }
  get activeTabPaneIdx() {
    return this.#activeTabPaneIdx;
  }
  #activeTabPaneIdx;
  #tabServiceSubscription;
  ngAfterContentInit() {
    this.subscribeTabService();
  }
  ngAfterContentChecked() {
    this.panes?.forEach((tabPane, index) => {
      tabPane.tabContent = this;
      tabPane.tabPaneIdx = index;
    });
    this.refreshTabPaneActive(this.activeTabPaneIdx);
    this.#tabService.setActiveTabIdx({
      tabContent: this,
      activeIdx: this.activeTabPaneIdx
    });
  }
  ngOnChanges(changes) {
    if (changes["activeTabPaneIdx"]?.currentValue) {
      this.#tabService.setActiveTabIdx({
        tabContent: this,
        activeIdx: changes["activeTabPaneIdx"].currentValue
      });
    }
  }
  ngOnDestroy() {
    this.subscribeTabService(false);
  }
  subscribeTabService(subscribe = true) {
    if (subscribe) {
      this.#tabServiceSubscription = this.#tabService.activeTabPaneIdx$.subscribe((tabContentState) => {
        if (this === tabContentState.tabContent) {
          this.activeTabPaneIdx = tabContentState.activeIdx;
        }
      });
    } else {
      this.#tabServiceSubscription?.unsubscribe();
    }
  }
  refreshTabPaneActive(idx) {
    this.panes?.forEach((tabPane, index) => {
      tabPane.active = idx === index;
    });
  }
  static {
    this.ɵfac = function TabContentComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TabContentComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _TabContentComponent,
      selectors: [["c-tab-content"]],
      contentQueries: function TabContentComponent_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuery(dirIndex, TabPaneComponent, 4);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.panes = _t);
        }
      },
      hostAttrs: [1, "tab-content"],
      inputs: {
        activeTabPaneIdx: [2, "activeTabPaneIdx", "activeTabPaneIdx", numberAttribute]
      },
      outputs: {
        activeTabPaneIdxChange: "activeTabPaneIdxChange"
      },
      exportAs: ["cTabContent"],
      features: [ɵɵNgOnChangesFeature],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function TabContentComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      styles: ["[_nghost-%COMP%]{display:block}"],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabContentComponent, [{
    type: Component,
    args: [{
      selector: "c-tab-content",
      template: "<ng-content />",
      changeDetection: ChangeDetectionStrategy.OnPush,
      exportAs: "cTabContent",
      host: {
        class: "tab-content"
      },
      styles: [":host{display:block}\n"]
    }]
  }], null, {
    activeTabPaneIdx: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    activeTabPaneIdxChange: [{
      type: Output
    }],
    panes: [{
      type: ContentChildren,
      args: [TabPaneComponent]
    }]
  });
})();
var TabContentRefDirective = class _TabContentRefDirective {
  #changeDetectorRef;
  #tabService;
  constructor() {
    this.#changeDetectorRef = inject(ChangeDetectorRef);
    this.#tabService = inject(TabService);
    this.#active = false;
    this.#disabled = false;
    this.tabPaneIdx = -1;
    this.role = "tab";
    this.subscribeTabService();
  }
  #tabServiceSubscription;
  /**
   * Set active state of tab content
   * @type boolean
   * @default false
   */
  set active(value) {
    const newValue = value;
    if (this.#active !== newValue) {
      this.#active = newValue;
      this.#changeDetectorRef.detectChanges();
    }
  }
  get active() {
    return this.#active;
  }
  #active;
  /**
   * Set disabled state of tab content
   * @type boolean
   */
  set disabled(value) {
    this.#disabled = value;
  }
  get disabled() {
    return this.#disabled || this.tabPaneIdx >= this.tabContentRef?.panes?.length;
  }
  #disabled;
  get hostClasses() {
    return {
      active: this.active,
      disabled: this.disabled
    };
  }
  get isDisabled() {
    return this.disabled || null;
  }
  get attrDisabled() {
    return this.disabled ? "" : null;
  }
  get ariaSelected() {
    return this.active;
  }
  get getTabindex() {
    return this.disabled ? "-1" : null;
  }
  ngOnChanges(changes) {
    if (changes["active"]?.currentValue) {
      this.setActiveTabPane();
    }
  }
  toggleOpen($event) {
    $event.preventDefault();
    this.setActiveTabPane();
  }
  setActiveTabPane() {
    setTimeout(() => {
      if (this.tabPaneIdx < this.tabContentRef.panes.length) {
        this.active = true;
        this.#tabService.setActiveTabIdx({
          tabContent: this.tabContentRef,
          activeIdx: this.tabPaneIdx
        });
      } else {
        this.active = false;
      }
    });
  }
  ngOnDestroy() {
    this.subscribeTabService(false);
  }
  subscribeTabService(subscribe = true) {
    if (subscribe) {
      this.#tabServiceSubscription = this.#tabService.activeTabPaneIdx$.subscribe((tabContentState) => {
        if (tabContentState.tabContent === this.tabContentRef) {
          this.active = tabContentState.activeIdx === this.tabPaneIdx;
        }
      });
    } else {
      this.#tabServiceSubscription?.unsubscribe();
    }
  }
  static {
    this.ɵfac = function TabContentRefDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TabContentRefDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TabContentRefDirective,
      selectors: [["", "cTabContent", ""]],
      hostVars: 7,
      hostBindings: function TabContentRefDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function TabContentRefDirective_click_HostBindingHandler($event) {
            return ctx.toggleOpen($event);
          });
        }
        if (rf & 2) {
          ɵɵattribute("aria-disabled", ctx.isDisabled)("disabled", ctx.attrDisabled)("aria-selected", ctx.ariaSelected)("role", ctx.role)("tabindex", ctx.getTabindex);
          ɵɵclassMap(ctx.hostClasses);
        }
      },
      inputs: {
        tabContentRef: [0, "cTabContent", "tabContentRef"],
        active: [2, "active", "active", booleanAttribute],
        disabled: [2, "disabled", "disabled", booleanAttribute],
        tabPaneIdx: [2, "tabPaneIdx", "tabPaneIdx", numberAttribute],
        role: "role"
      },
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabContentRefDirective, [{
    type: Directive,
    args: [{
      selector: "[cTabContent]"
    }]
  }], () => [], {
    tabContentRef: [{
      type: Input,
      args: ["cTabContent"]
    }],
    active: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tabPaneIdx: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    hostClasses: [{
      type: HostBinding,
      args: ["class"]
    }],
    isDisabled: [{
      type: HostBinding,
      args: ["attr.aria-disabled"]
    }],
    attrDisabled: [{
      type: HostBinding,
      args: ["attr.disabled"]
    }],
    ariaSelected: [{
      type: HostBinding,
      args: ["attr.aria-selected"]
    }],
    role: [{
      type: Input
    }, {
      type: HostBinding,
      args: ["attr.role"]
    }],
    getTabindex: [{
      type: HostBinding,
      args: ["attr.tabindex"]
    }],
    toggleOpen: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }]
  });
})();
var TabsModule = class _TabsModule {
  static {
    this.ɵfac = function TabsModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TabsModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _TabsModule,
      imports: [TabContentComponent, TabContentRefDirective, TabPaneComponent],
      exports: [TabContentComponent, TabPaneComponent, TabContentRefDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      providers: [TabService]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabsModule, [{
    type: NgModule,
    args: [{
      imports: [TabContentComponent, TabContentRefDirective, TabPaneComponent],
      exports: [TabContentComponent, TabPaneComponent, TabContentRefDirective],
      providers: [TabService]
    }]
  }], null, null);
})();
var TabsService = class _TabsService {
  constructor() {
    this.activeItem = signal(void 0);
    this.activeItemKey = signal(void 0);
    this.id = signal(void 0);
  }
  static {
    this.ɵfac = function TabsService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TabsService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _TabsService,
      factory: _TabsService.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabsService, [{
    type: Injectable
  }], null, null);
})();
var nextId2 = 0;
var TabsComponent = class _TabsComponent {
  constructor() {
    this.tabsService = inject(TabsService);
    this.activeItemKey = model();
    this.tabsId = `tabs-${nextId2++}`;
    this.id = input(this.tabsId);
    this.#activeItemEffect = effect(() => {
      this.tabsService.id.set(this.id());
      this.tabsService.activeItemKey.set(this.activeItemKey());
    });
    this.#tabsServiceEffect = effect(() => {
      this.activeItemKey.set(this.tabsService.activeItemKey());
    });
  }
  #activeItemEffect;
  #tabsServiceEffect;
  static {
    this.ɵfac = function TabsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TabsComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _TabsComponent,
      selectors: [["c-tabs"]],
      hostAttrs: [1, "tabs"],
      hostVars: 1,
      hostBindings: function TabsComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵhostProperty("id", ctx.id());
        }
      },
      inputs: {
        activeItemKey: [1, "activeItemKey"],
        id: [1, "id"]
      },
      outputs: {
        activeItemKey: "activeItemKeyChange"
      },
      exportAs: ["cTabs"],
      features: [ɵɵProvidersFeature([TabsService])],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function TabsComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      styles: ["[_nghost-%COMP%]{display:block}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabsComponent, [{
    type: Component,
    args: [{
      exportAs: "cTabs",
      selector: "c-tabs",
      imports: [],
      template: "<ng-content />",
      providers: [TabsService],
      host: {
        "[id]": "id()",
        class: "tabs"
      },
      styles: [":host{display:block}\n"]
    }]
  }], null, null);
})();
var TabDirective = class _TabDirective {
  constructor() {
    this.#injector = inject(Injector);
    this.#destroyRef = inject(DestroyRef);
    this.#elementRef = inject(ElementRef);
    this.#tabsService = inject(TabsService);
    this.disabledInput = input(false, {
      transform: booleanAttribute,
      alias: "disabled"
    });
    this.#disabled = signal(false);
    this.attrDisabled = computed(() => this.#disabled() || null);
    this.#disabledEffect = effect(() => {
      const disabled = this.disabledInput();
      untracked(() => {
        this.disabled = disabled;
      });
    });
    this.itemKey = input.required();
    this.id = input();
    this.ariaControls = input(void 0, {
      alias: "aria-controls"
    });
    this.isActive = signal(false);
    this.hostClasses = computed(() => ({
      "nav-link": true,
      active: this.isActive(),
      disabled: this.#disabled()
    }));
    this.propId = computed(() => this.id() ?? `${this.#tabsService.id()}-tab-${this.itemKey()}`);
    this.attrAriaControls = computed(() => this.ariaControls() ?? `${this.#tabsService.id()}-panel-${this.itemKey()}`);
    this.#disabledSignalEffect = effect(() => {
      const disabled = this.#disabled();
      if (!disabled) {
        const click$ = fromEvent(this.#elementRef.nativeElement, "click");
        const focusIn$ = fromEvent(this.#elementRef.nativeElement, "focusin");
        merge(focusIn$, click$).pipe(filter(($event) => !disabled), tap(($event) => {
          this.#tabsService.activeItemKey.set(untracked(this.itemKey));
        }), takeWhile(() => !disabled), takeUntilDestroyed(this.#destroyRef)).subscribe();
      }
    });
  }
  #injector;
  #destroyRef;
  #elementRef;
  #tabsService;
  #disabled;
  #disabledEffect;
  set disabled(value) {
    this.#disabled.set(value);
  }
  get disabled() {
    return this.#disabled();
  }
  #disabledSignalEffect;
  focus(origin) {
    this.#elementRef.nativeElement.focus();
  }
  ngOnInit() {
    runInInjectionContext(this.#injector, () => {
      effect(() => {
        const isActive = !this.#disabled() && this.#tabsService.activeItemKey() === this.itemKey();
        this.isActive.set(isActive);
      });
    });
  }
  static {
    this.ɵfac = function TabDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TabDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TabDirective,
      selectors: [["button", "cTab", ""]],
      hostAttrs: ["type", "button", "role", "tab"],
      hostVars: 7,
      hostBindings: function TabDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵhostProperty("id", ctx.propId())("tabindex", ctx.isActive() ? 0 : -1);
          ɵɵattribute("aria-selected", ctx.isActive())("aria-controls", ctx.attrAriaControls())("disabled", ctx.attrDisabled() || null);
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        disabledInput: [1, "disabled", "disabledInput"],
        itemKey: [1, "itemKey"],
        id: [1, "id"],
        ariaControls: [1, "aria-controls", "ariaControls"]
      },
      exportAs: ["cTab"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabDirective, [{
    type: Directive,
    args: [{
      exportAs: "cTab",
      selector: "button[cTab]",
      host: {
        "[class]": "hostClasses()",
        type: "button",
        role: "tab",
        "[attr.aria-selected]": "isActive()",
        "[attr.aria-controls]": "attrAriaControls()",
        "[attr.disabled]": "attrDisabled() || null",
        "[id]": "propId()",
        "[tabindex]": "isActive() ? 0 : -1"
      }
    }]
  }], null, null);
})();
var TabsListComponent = class _TabsListComponent {
  constructor() {
    this.#destroyRef = inject(DestroyRef);
    this.tabsService = inject(TabsService);
    this.layout = input();
    this.variant = input();
    this.role = input("tablist");
    this.hostClasses = computed(() => ({
      nav: true,
      [`nav-${this.layout()}`]: this.layout(),
      [`nav-${this.variant()}`]: this.variant()
    }));
    this.tabs = contentChildren(TabDirective);
    this.#tabsEffect = effect(() => {
      const tabs = this.tabs();
      if (tabs.length === 0) {
        return;
      }
      this.#focusKeyManager = new FocusKeyManager(tabs).skipPredicate((tab) => tab.disabled === true).withHorizontalOrientation("ltr").withHomeAndEnd().withWrap();
      this.#focusKeyManager.change.pipe(tap((value) => {
        this.tabsService.activeItemKey.set(this.#focusKeyManager.activeItem?.itemKey());
        this.tabsService.activeItem.set(this.#focusKeyManager.activeItem);
      }), takeUntilDestroyed(this.#destroyRef)).subscribe();
      untracked(() => {
        setTimeout(() => {
          const activeItem = tabs.find((tab) => tab.isActive()) ?? tabs.find((tab) => !tab.disabled);
          const activeItemIndex = tabs.findIndex((tab) => tab === activeItem);
          this.#focusKeyManager?.updateActiveItem(activeItemIndex < 0 ? 0 : activeItemIndex);
          this.tabsService.activeItemKey.set(this.#focusKeyManager.activeItem?.itemKey());
          this.tabsService.activeItem.set(this.#focusKeyManager.activeItem);
        });
      });
    });
    this.#tabsServiceEffect = effect(() => {
      const activeItemIndex = this.tabs().findIndex((tab) => untracked(tab.isActive) && untracked(tab.itemKey) === this.tabsService.activeItemKey());
      this.#focusKeyManager?.updateActiveItem(activeItemIndex < 0 ? 0 : activeItemIndex);
    });
  }
  #destroyRef;
  #focusKeyManager;
  #tabsEffect;
  #tabsServiceEffect;
  onKeydown($event) {
    if (["ArrowLeft", "ArrowRight"].includes($event.key)) {
      this.#focusKeyManager.onKeydown($event);
      return;
    }
    if (["Tab"].includes($event.key)) {
      this.#focusKeyManager?.tabOut.next();
    }
    return;
  }
  static {
    this.ɵfac = function TabsListComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TabsListComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _TabsListComponent,
      selectors: [["c-tabs-list"]],
      contentQueries: function TabsListComponent_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuerySignal(dirIndex, ctx.tabs, TabDirective, 4);
        }
        if (rf & 2) {
          ɵɵqueryAdvance();
        }
      },
      hostVars: 3,
      hostBindings: function TabsListComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("keydown", function TabsListComponent_keydown_HostBindingHandler($event) {
            return ctx.onKeydown($event);
          });
        }
        if (rf & 2) {
          ɵɵattribute("role", ctx.role());
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        layout: [1, "layout"],
        variant: [1, "variant"],
        role: [1, "role"]
      },
      exportAs: ["cTabsList"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function TabsListComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabsListComponent, [{
    type: Component,
    args: [{
      exportAs: "cTabsList",
      selector: "c-tabs-list",
      imports: [],
      template: "<ng-content />",
      host: {
        "[attr.role]": "role()",
        "[class]": "hostClasses()"
      }
    }]
  }], null, {
    onKeydown: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }]
  });
})();
var TabsContentComponent = class _TabsContentComponent {
  static {
    this.ɵfac = function TabsContentComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TabsContentComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _TabsContentComponent,
      selectors: [["c-tabs-content"]],
      hostAttrs: [1, "tab-content"],
      exportAs: ["cTabsContent"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function TabsContentComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabsContentComponent, [{
    type: Component,
    args: [{
      exportAs: "cTabsContent",
      selector: "c-tabs-content",
      template: "<ng-content />",
      host: {
        class: "tab-content"
      }
    }]
  }], null, null);
})();
var TabPanelComponent = class _TabPanelComponent {
  constructor() {
    this.tabsService = inject(TabsService);
    this.ariaLabelledBy = input(void 0, {
      alias: "aria-labelledby"
    });
    this.id = input();
    this.itemKey = input.required();
    this.tabindex = input(0, {
      transform: numberAttribute
    });
    this.transition = input(true);
    this.visibleChange = output();
    this.show = signal(false);
    this.visible = computed(() => {
      const visible = this.tabsService.activeItemKey() === this.itemKey() && !this.tabsService.activeItem()?.disabled;
      this.visibleChange.emit({
        itemKey: this.itemKey(),
        visible
      });
      return visible;
    });
    this.propId = computed(() => this.id() ?? `${this.tabsService.id()}-panel-${this.itemKey()}`);
    this.attrAriaLabelledBy = computed(() => this.ariaLabelledBy() ?? `${this.tabsService.id()}-tab-${this.itemKey()}`);
    this.hostClasses = computed(() => ({
      "tab-pane": true,
      active: this.show(),
      fade: this.transition(),
      show: this.show(),
      invisible: this.tabsService.activeItem()?.disabled
    }));
  }
  get animationDisabled() {
    return !this.transition();
  }
  get animateType() {
    return this.visible() ? "show" : "hide";
  }
  onAnimationDone($event) {
    this.show.set(this.visible());
  }
  static {
    this.ɵfac = function TabPanelComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TabPanelComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _TabPanelComponent,
      selectors: [["c-tab-panel"]],
      hostAttrs: ["role", "tabpanel"],
      hostVars: 7,
      hostBindings: function TabPanelComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵsyntheticHostListener("@fadeInOut.done", function TabPanelComponent_animation_fadeInOut_done_HostBindingHandler($event) {
            return ctx.onAnimationDone($event);
          });
        }
        if (rf & 2) {
          ɵɵhostProperty("tabindex", ctx.visible() ? ctx.tabindex() : -1)("id", ctx.propId());
          ɵɵsyntheticHostProperty("@.disabled", ctx.animationDisabled)("@fadeInOut", ctx.animateType);
          ɵɵattribute("aria-labelledby", ctx.attrAriaLabelledBy());
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        ariaLabelledBy: [1, "aria-labelledby", "ariaLabelledBy"],
        id: [1, "id"],
        itemKey: [1, "itemKey"],
        tabindex: [1, "tabindex"],
        transition: [1, "transition"]
      },
      outputs: {
        visibleChange: "visibleChange"
      },
      exportAs: ["cTabPanel"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function TabPanelComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2,
      data: {
        animation: [trigger("fadeInOut", [state("show", style({
          opacity: 1
        })), state("hide", style({
          opacity: 0
        })), state("void", style({
          opacity: 1
        })), transition("* => *", [query("@*", [animateChild()], {
          optional: true
        }), animate("150ms linear")])])]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabPanelComponent, [{
    type: Component,
    args: [{
      exportAs: "cTabPanel",
      selector: "c-tab-panel",
      template: "<ng-content />",
      host: {
        "[class]": "hostClasses()",
        "[tabindex]": "visible() ? tabindex(): -1",
        "[attr.aria-labelledby]": "attrAriaLabelledBy()",
        "[id]": "propId()",
        role: "tabpanel"
      },
      animations: [trigger("fadeInOut", [state("show", style({
        opacity: 1
      })), state("hide", style({
        opacity: 0
      })), state("void", style({
        opacity: 1
      })), transition("* => *", [query("@*", [animateChild()], {
        optional: true
      }), animate("150ms linear")])])]
    }]
  }], null, {
    animationDisabled: [{
      type: HostBinding,
      args: ["@.disabled"]
    }],
    animateType: [{
      type: HostBinding,
      args: ["@fadeInOut"]
    }],
    onAnimationDone: [{
      type: HostListener,
      args: ["@fadeInOut.done", ["$event"]]
    }]
  });
})();
var Tabs2Module = class _Tabs2Module {
  static {
    this.ɵfac = function Tabs2Module_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _Tabs2Module)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _Tabs2Module,
      imports: [TabsComponent, TabsListComponent, TabDirective, TabsContentComponent, TabPanelComponent],
      exports: [TabsComponent, TabsListComponent, TabDirective, TabsContentComponent, TabPanelComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      providers: [TabsService]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Tabs2Module, [{
    type: NgModule,
    args: [{
      imports: [TabsComponent, TabsListComponent, TabDirective, TabsContentComponent, TabPanelComponent],
      exports: [TabsComponent, TabsListComponent, TabDirective, TabsContentComponent, TabPanelComponent],
      providers: [TabsService]
    }]
  }], null, null);
})();
var ToasterService = class _ToasterService {
  constructor() {
    this.#toasterState = new BehaviorSubject({});
    this.toasterState$ = this.#toasterState.asObservable();
  }
  #toasterState;
  setState(state2) {
    this.#toasterState.next(__spreadValues({}, state2));
  }
  static {
    this.ɵfac = function ToasterService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ToasterService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ToasterService,
      factory: _ToasterService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToasterService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var ToastComponent = class _ToastComponent {
  constructor() {
    this.changeDetectorRef = inject(ChangeDetectorRef);
    this.hostElement = inject(ElementRef);
    this.renderer = inject(Renderer2);
    this.toasterService = inject(ToasterService);
    this.dynamic = input();
    this.placementInput = input(void 0, {
      alias: "placement"
    });
    this.autohide = input(true);
    this.color = input("");
    this.delay = input(5e3, {
      transform: numberAttribute
    });
    this.fade = input(true);
    this.visibleInput = input(false, {
      transform: booleanAttribute,
      alias: "visible"
    });
    this.#visibleInputEffect = effect(() => {
      this.visible = this.visibleInput();
    });
    this.#visible = false;
    this.index = input(0, {
      transform: numberAttribute
    });
    this.visibleChange = output();
    this.timer = output();
    this.animationDisabled = computed(() => {
      return !this.fade();
    });
    this.hostClasses = computed(() => {
      const color = this.color();
      return {
        toast: true,
        show: true,
        [`bg-${color}`]: !!color,
        "border-0": !!color
      };
    });
  }
  get placement() {
    return this.placementInput();
  }
  #visibleInputEffect;
  set visible(value) {
    const newValue = value;
    if (this.#visible !== newValue) {
      this.#visible = newValue;
      newValue ? this.setTimer() : this.clearTimer();
      this.visibleChange.emit(newValue);
      this.changeDetectorRef.markForCheck();
    }
  }
  get visible() {
    return this.#visible;
  }
  #visible;
  get clock() {
    return this._clock;
  }
  set clock(value) {
    this._clock = value;
    this.timer.emit(this._clock);
    this.changeDetectorRef.markForCheck();
  }
  get animateType() {
    return this.visible ? "show" : "hide";
  }
  ngOnInit() {
    if (this.visible) {
      this.toasterService.setState({
        toast: this,
        show: this.visible,
        placement: this.placement
      });
      this.clearTimer();
      this.setTimer();
    }
  }
  ngOnDestroy() {
    this.clearTimer();
  }
  setTimer() {
    this.clearTimer();
    if (this.autohide() && this.visible) {
      this.timerId = this.delay() > 0 ? setTimeout(() => this.onClose(), this.delay()) : void 0;
      this.setClock();
    }
  }
  clearTimer() {
    this.clearClock();
    clearTimeout(this.timerId);
    this.timerId = void 0;
  }
  onClose() {
    this.clearTimer();
    this.toasterService.setState({
      toast: this,
      show: false,
      placement: this.placement
    });
  }
  setClock() {
    this.clearClock();
    this.clock = 0;
    this.clockId = setInterval(() => {
      this.clock += 1;
      this.changeDetectorRef.markForCheck();
    }, 1e3);
    this.clockTimerId = setTimeout(() => {
      this.clearClock();
    }, this.delay());
  }
  clearClock() {
    clearTimeout(this.clockTimerId);
    clearInterval(this.clockId);
    this.clockId = void 0;
  }
  static {
    this.ɵfac = function ToastComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ToastComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ToastComponent,
      selectors: [["c-toast"]],
      hostAttrs: [1, "toast", "show"],
      hostVars: 4,
      hostBindings: function ToastComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("mouseover", function ToastComponent_mouseover_HostBindingHandler() {
            return ctx.clearTimer();
          })("mouseout", function ToastComponent_mouseout_HostBindingHandler() {
            return ctx.setTimer();
          });
        }
        if (rf & 2) {
          ɵɵsyntheticHostProperty("@fadeInOut", ctx.animateType)("@.disabled", ctx.animationDisabled());
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        dynamic: [1, "dynamic"],
        placementInput: [1, "placement", "placementInput"],
        autohide: [1, "autohide"],
        color: [1, "color"],
        delay: [1, "delay"],
        fade: [1, "fade"],
        visibleInput: [1, "visible", "visibleInput"],
        index: [1, "index"]
      },
      outputs: {
        visibleChange: "visibleChange",
        timer: "timer"
      },
      exportAs: ["cToast"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function ToastComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      styles: ["[_nghost-%COMP%]{display:block;overflow:hidden}"],
      data: {
        animation: [trigger("fadeInOut", [state("show", style({
          opacity: 1,
          height: "*",
          padding: "*",
          border: "*",
          margin: "*"
        })), state("hide", style({
          opacity: 0,
          height: 0,
          padding: 0,
          border: 0,
          margin: 0
        })), state("void", style({
          opacity: 0,
          height: 0,
          padding: 0,
          border: 0,
          margin: 0
        })), transition("show => hide", [animate("{{ time }} {{ easing }}")], {
          params: {
            time: "300ms",
            easing: "ease-out"
          }
        }), transition("hide => show", [animate("{{ time }} {{ easing }}")], {
          params: {
            time: "300ms",
            easing: "ease-in"
          }
        }), transition("show => void", [animate("{{ time }} {{ easing }}")], {
          params: {
            time: "300ms",
            easing: "ease-out"
          }
        }), transition("void => show", [animate("{{ time }} {{ easing }}")], {
          params: {
            time: "300ms",
            easing: "ease-in"
          }
        })])]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastComponent, [{
    type: Component,
    args: [{
      selector: "c-toast",
      template: "<ng-content />",
      exportAs: "cToast",
      animations: [trigger("fadeInOut", [state("show", style({
        opacity: 1,
        height: "*",
        padding: "*",
        border: "*",
        margin: "*"
      })), state("hide", style({
        opacity: 0,
        height: 0,
        padding: 0,
        border: 0,
        margin: 0
      })), state("void", style({
        opacity: 0,
        height: 0,
        padding: 0,
        border: 0,
        margin: 0
      })), transition("show => hide", [animate("{{ time }} {{ easing }}")], {
        params: {
          time: "300ms",
          easing: "ease-out"
        }
      }), transition("hide => show", [animate("{{ time }} {{ easing }}")], {
        params: {
          time: "300ms",
          easing: "ease-in"
        }
      }), transition("show => void", [animate("{{ time }} {{ easing }}")], {
        params: {
          time: "300ms",
          easing: "ease-out"
        }
      }), transition("void => show", [animate("{{ time }} {{ easing }}")], {
        params: {
          time: "300ms",
          easing: "ease-in"
        }
      })])],
      host: {
        class: "toast show",
        "[class]": "hostClasses()",
        "(mouseover)": "clearTimer()",
        "(mouseout)": "setTimer()",
        "[@fadeInOut]": "animateType",
        "[@.disabled]": "animationDisabled()"
      },
      styles: [":host{display:block;overflow:hidden}\n"]
    }]
  }], null, null);
})();
var ToastBodyComponent = class _ToastBodyComponent {
  constructor() {
    this.toast = inject(ToastComponent, {
      optional: true
    });
  }
  static {
    this.ɵfac = function ToastBodyComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ToastBodyComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ToastBodyComponent,
      selectors: [["c-toast-body"]],
      hostAttrs: [1, "toast-body"],
      exportAs: ["cToastBody"],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function ToastBodyComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      styles: ["[_nghost-%COMP%]{display:block}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastBodyComponent, [{
    type: Component,
    args: [{
      selector: "c-toast-body",
      template: "<ng-content />",
      exportAs: "cToastBody",
      host: {
        class: "toast-body"
      },
      styles: [":host{display:block}\n"]
    }]
  }], null, null);
})();
var ToastCloseDirective = class _ToastCloseDirective {
  constructor() {
    this.#toasterService = inject(ToasterService);
    this.cToastClose = input();
  }
  #toasterService;
  toggleOpen($event) {
    $event.preventDefault();
    this.#toasterService.setState({
      show: false,
      toast: this.cToastClose()
    });
  }
  static {
    this.ɵfac = function ToastCloseDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ToastCloseDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _ToastCloseDirective,
      selectors: [["", "cToastClose", ""]],
      hostBindings: function ToastCloseDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function ToastCloseDirective_click_HostBindingHandler($event) {
            return ctx.toggleOpen($event);
          });
        }
      },
      inputs: {
        cToastClose: [1, "cToastClose"]
      },
      exportAs: ["cToastClose"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastCloseDirective, [{
    type: Directive,
    args: [{
      selector: "[cToastClose]",
      exportAs: "cToastClose",
      host: {
        "(click)": "toggleOpen($event)"
      }
    }]
  }], null, null);
})();
var ToastHeaderComponent = class _ToastHeaderComponent {
  constructor() {
    this.#toast = inject(ToastComponent, {
      optional: true
    });
    this.toast = signal(this.#toast ?? void 0);
    this.closeButton = input(true);
  }
  #toast;
  static {
    this.ɵfac = function ToastHeaderComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ToastHeaderComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ToastHeaderComponent,
      selectors: [["c-toast-header"]],
      hostAttrs: [1, "toast-header"],
      inputs: {
        closeButton: [1, "closeButton"]
      },
      exportAs: ["cToastHeader"],
      ngContentSelectors: _c0,
      decls: 3,
      vars: 1,
      consts: [["aria-label", "close", "cButtonClose", "", 1, "ms-auto", 3, "cToastClose", "style"], ["aria-label", "close", "cButtonClose", "", 1, "ms-auto", 3, "cToastClose"]],
      template: function ToastHeaderComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵelementContainerStart(0);
          ɵɵprojection(1);
          ɵɵtemplate(2, ToastHeaderComponent_Conditional_2_Template, 1, 4, "button", 0);
          ɵɵelementContainerEnd();
        }
        if (rf & 2) {
          ɵɵadvance(2);
          ɵɵconditional(ctx.closeButton() ? 2 : -1);
        }
      },
      dependencies: [ToastCloseDirective, ButtonCloseDirective],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastHeaderComponent, [{
    type: Component,
    args: [{
      selector: "c-toast-header",
      exportAs: "cToastHeader",
      imports: [ToastCloseDirective, ButtonCloseDirective],
      host: {
        class: "toast-header"
      },
      template: '<ng-container>\n  <ng-content />\n  @if (closeButton()) {\n    <button [cToastClose]="toast()" [style]="{outline: 0}" aria-label="close" cButtonClose class="ms-auto"></button>\n  }\n</ng-container>\n'
    }]
  }], null, null);
})();
var ToasterHostDirective = class _ToasterHostDirective {
  constructor() {
    this.viewContainerRef = inject(ViewContainerRef);
  }
  static {
    this.ɵfac = function ToasterHostDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ToasterHostDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _ToasterHostDirective,
      selectors: [["", "cToasterHost", ""]],
      exportAs: ["cToasterHost"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToasterHostDirective, [{
    type: Directive,
    args: [{
      selector: "[cToasterHost]",
      exportAs: "cToasterHost"
    }]
  }], null, null);
})();
var ToasterPlacement;
(function(ToasterPlacement2) {
  ToasterPlacement2["Static"] = "static";
  ToasterPlacement2["TopStart"] = "top-start";
  ToasterPlacement2["TopCenter"] = "top-center";
  ToasterPlacement2["TopEnd"] = "top-end";
  ToasterPlacement2["MiddleStart"] = "middle-start";
  ToasterPlacement2["MiddleCenter"] = "middle-center";
  ToasterPlacement2["MiddleEnd"] = "middle-end";
  ToasterPlacement2["BottomStart"] = "bottom-start";
  ToasterPlacement2["BottomCenter"] = "bottom-center";
  ToasterPlacement2["BottomEnd"] = "bottom-end";
})(ToasterPlacement || (ToasterPlacement = {}));
var ToasterComponent = class _ToasterComponent {
  constructor() {
    this.#hostElement = inject(ElementRef);
    this.#renderer = inject(Renderer2);
    this.#toasterService = inject(ToasterService);
    this.#destroyRef = inject(DestroyRef);
    this.placements = Object.values(ToasterPlacement);
    this.toastsDynamic = [];
    this.placementInput = input(ToasterPlacement.TopEnd, {
      alias: "placement"
    });
    this.position = input("absolute");
    this.toasterHost = viewChild.required(ToasterHostDirective);
    this.contentToasts = contentChildren(ToastComponent, {
      read: ViewContainerRef
    });
    this.hostClasses = computed(() => {
      const placement = this.placement;
      const position = this.position();
      return {
        toaster: true,
        "toast-container": true,
        [`position-${position}`]: !!position,
        "top-0": placement.includes("top"),
        "top-50": placement.includes("middle"),
        "bottom-0": placement.includes("bottom"),
        "start-0": placement.includes("start"),
        "start-50": placement.includes("center"),
        "end-0": placement.includes("end"),
        "translate-middle-x": placement.includes("center") && !placement.includes("middle"),
        "translate-middle-y": placement.includes("middle") && !placement.includes("center"),
        "translate-middle": placement.includes("middle") && placement.includes("center")
      };
    });
  }
  #hostElement;
  #renderer;
  #toasterService;
  #destroyRef;
  get placement() {
    return this.placementInput();
  }
  ngOnInit() {
    this.stateToasterSubscribe();
  }
  addToast(toast, props, options) {
    const componentRef = this.toasterHost().viewContainerRef.createComponent(toast, options);
    this.toastsDynamic.push(componentRef);
    const index = this.toastsDynamic.indexOf(componentRef);
    for (const [key, value] of Object.entries(props)) {
      componentRef.setInput(key, value);
    }
    componentRef.setInput("placement", this.placement);
    componentRef.setInput("dynamic", true);
    componentRef.setInput("index", index);
    componentRef.setInput("visible", true);
    componentRef.instance["visibleChange"].emit(true);
    componentRef.changeDetectorRef?.detectChanges();
    return componentRef;
  }
  removeToast(state2) {
    this.toastsDynamic?.forEach((item) => {
      if (state2.toast?.dynamic() && item.instance === state2.toast) {
        item.setInput("visible", false);
        item.instance["visibleChange"].emit(false);
        item.destroy();
      }
    });
    this.contentToasts()?.forEach((item) => {
      if (state2.toast && item.element.nativeElement === state2.toast.hostElement.nativeElement) {
        if (!state2.toast.dynamic()) {
          state2.toast["visible"] = false;
        }
      }
    });
  }
  stateToasterSubscribe() {
    this.#toasterService.toasterState$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((state2) => {
      if (state2.show === false) {
        this.removeToast(state2);
      }
    });
  }
  static {
    this.ɵfac = function ToasterComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ToasterComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ToasterComponent,
      selectors: [["c-toaster"]],
      contentQueries: function ToasterComponent_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuerySignal(dirIndex, ctx.contentToasts, ToastComponent, 4, ViewContainerRef);
        }
        if (rf & 2) {
          ɵɵqueryAdvance();
        }
      },
      viewQuery: function ToasterComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuerySignal(ctx.toasterHost, ToasterHostDirective, 5);
        }
        if (rf & 2) {
          ɵɵqueryAdvance();
        }
      },
      hostAttrs: [1, "toaster", "toast-container"],
      hostVars: 2,
      hostBindings: function ToasterComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        placementInput: [1, "placement", "placementInput"],
        position: [1, "position"]
      },
      exportAs: ["cToaster"],
      ngContentSelectors: _c0,
      decls: 2,
      vars: 0,
      consts: [["cToasterHost", ""]],
      template: function ToasterComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵtemplate(0, ToasterComponent_ng_template_0_Template, 0, 0, "ng-template", 0);
          ɵɵprojection(1, 0, ["cToasterHost", ""]);
        }
      },
      dependencies: [ToasterHostDirective],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToasterComponent, [{
    type: Component,
    args: [{
      selector: "c-toaster",
      exportAs: "cToaster",
      imports: [ToasterHostDirective],
      host: {
        class: "toaster toast-container",
        "[class]": "hostClasses()"
      },
      template: "<ng-template cToasterHost />\n<ng-content cToasterHost />\n"
    }]
  }], null, null);
})();
var ToastModule = class _ToastModule {
  static {
    this.ɵfac = function ToastModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ToastModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _ToastModule,
      imports: [ToastBodyComponent, ToastComponent, ToastCloseDirective, ToastHeaderComponent, ToasterComponent, ToasterHostDirective],
      exports: [ToastBodyComponent, ToastComponent, ToastCloseDirective, ToastHeaderComponent, ToasterComponent, ToasterHostDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      providers: [ToasterService]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastModule, [{
    type: NgModule,
    args: [{
      imports: [ToastBodyComponent, ToastComponent, ToastCloseDirective, ToastHeaderComponent, ToasterComponent, ToasterHostDirective],
      providers: [ToasterService],
      exports: [ToastBodyComponent, ToastComponent, ToastCloseDirective, ToastHeaderComponent, ToasterComponent, ToasterHostDirective]
    }]
  }], null, null);
})();
var TooltipComponent = class _TooltipComponent {
  constructor() {
    this.renderer = inject(Renderer2);
    this.content = input("");
    this.#contentEffect = effect(() => {
      this.updateView(this.content());
    });
    this.visible = input(false, {
      transform: booleanAttribute
    });
    this.id = input();
    this.role = input("tooltip");
    this.viewContainerRef = viewChild("tooltipTemplate", {
      read: ViewContainerRef
    });
    this.hostClasses = computed(() => {
      return {
        tooltip: true,
        fade: true,
        show: this.visible(),
        "bs-tooltip-auto": true
      };
    });
  }
  #contentEffect;
  ngOnDestroy() {
    this.clear();
  }
  clear() {
    this.viewContainerRef()?.clear();
    if (!!this.textNode) {
      this.renderer.removeChild(this.textNode.parentNode, this.textNode);
    }
  }
  updateView(content) {
    this.clear();
    if (!content) {
      return;
    }
    if (content instanceof TemplateRef) {
      this.viewContainerRef()?.createEmbeddedView(content);
    } else {
      this.textNode = this.renderer.createText(content);
      const element = this.viewContainerRef()?.element.nativeElement;
      this.renderer.appendChild(element.parentNode, this.textNode);
    }
  }
  static {
    this.ɵfac = function TooltipComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TooltipComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _TooltipComponent,
      selectors: [["c-tooltip"]],
      viewQuery: function TooltipComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuerySignal(ctx.viewContainerRef, _c14, 5, ViewContainerRef);
        }
        if (rf & 2) {
          ɵɵqueryAdvance();
        }
      },
      hostAttrs: [1, "tooltip", "fade", "bs-tooltip-auto"],
      hostVars: 4,
      hostBindings: function TooltipComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("role", ctx.role())("id", ctx.id());
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        content: [1, "content"],
        visible: [1, "visible"],
        id: [1, "id"],
        role: [1, "role"]
      },
      decls: 5,
      vars: 0,
      consts: [["tooltipTemplate", ""], ["data-popper-arrow", "", 1, "tooltip-arrow"], [1, "tooltip-inner"]],
      template: function TooltipComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementContainerStart(0);
          ɵɵelement(1, "div", 1);
          ɵɵelementStart(2, "div", 2);
          ɵɵelementContainer(3, null, 0);
          ɵɵelementEnd();
          ɵɵelementContainerEnd();
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipComponent, [{
    type: Component,
    args: [{
      selector: "c-tooltip",
      host: {
        class: "tooltip fade bs-tooltip-auto",
        "[class]": "hostClasses()",
        "[attr.role]": "role()",
        "[attr.id]": "id()"
      },
      template: '<ng-container>\n  <div class="tooltip-arrow" data-popper-arrow></div>\n  <div class="tooltip-inner">\n    <ng-container #tooltipTemplate />\n  </div>\n</ng-container>\n'
    }]
  }], null, null);
})();
var TooltipDirective = class _TooltipDirective {
  constructor() {
    this.#renderer = inject(Renderer2);
    this.#hostElement = inject(ElementRef);
    this.#viewContainerRef = inject(ViewContainerRef);
    this.#listenersService = inject(ListenersService);
    this.#changeDetectorRef = inject(ChangeDetectorRef);
    this.#intersectionService = inject(IntersectionService);
    this.#destroyRef = inject(DestroyRef);
    this.#document = inject(DOCUMENT);
    this.content = input(void 0, {
      alias: "cTooltip"
    });
    this.#contentEffect = effect(() => {
      if (this.content()) {
        this.destroyTooltipElement();
      }
    });
    this.popperOptions = input({}, {
      alias: "cTooltipOptions"
    });
    this.#popperOptionsEffect = effect(() => {
      this._popperOptions = __spreadValues(__spreadProps(__spreadValues({}, this._popperOptions), {
        placement: this.placement()
      }), this.popperOptions());
    });
    this.popperOptionsComputed = computed(() => {
      return __spreadValues({
        placement: this.placement()
      }, this._popperOptions);
    });
    this.placement = input("top", {
      alias: "cTooltipPlacement"
    });
    this.reference = input(void 0, {
      alias: "cTooltipRef"
    });
    this.referenceRef = computed(() => this.reference()?.elementRef ?? this.#hostElement);
    this.trigger = input("hover", {
      alias: "cTooltipTrigger"
    });
    this.visible = model(false, {
      alias: "cTooltipVisible"
    });
    this.#visibleEffect = effect(() => {
      this.visible() ? this.addTooltipElement() : this.removeTooltipElement();
    });
    this._popperOptions = {
      modifiers: [{
        name: "offset",
        options: {
          offset: [0, 5]
        }
      }]
    };
  }
  #renderer;
  #hostElement;
  #viewContainerRef;
  #listenersService;
  #changeDetectorRef;
  #intersectionService;
  #destroyRef;
  #document;
  #contentEffect;
  #popperOptionsEffect;
  #visibleEffect;
  get ariaDescribedBy() {
    return this.tooltipId ? this.tooltipId : null;
  }
  ngAfterViewInit() {
    this.intersectionServiceSubscribe();
  }
  ngOnDestroy() {
    this.clearListeners();
    this.destroyTooltipElement();
  }
  ngOnInit() {
    this.setListeners();
  }
  setListeners() {
    const config = {
      hostElement: this.#hostElement,
      trigger: this.trigger(),
      callbackToggle: () => {
        this.visible.update((value) => !value);
      },
      callbackOff: () => {
        this.visible.set(false);
      },
      callbackOn: () => {
        this.visible.set(true);
      }
    };
    this.#listenersService.setListeners(config);
  }
  clearListeners() {
    this.#listenersService.clearListeners();
  }
  intersectionServiceSubscribe() {
    this.#intersectionService.createIntersectionObserver(this.referenceRef());
    this.#intersectionService.intersecting$.pipe(filter((next) => next.hostElement === this.referenceRef()), debounceTime(100), finalize(() => {
      this.#intersectionService.unobserve(this.referenceRef());
    }), takeUntilDestroyed(this.#destroyRef)).subscribe((next) => {
      this.visible.set(next.isIntersecting ? this.visible() : false);
    });
  }
  getUID(prefix) {
    let uid = prefix ?? "random-id";
    do {
      uid = `${prefix}-${Math.floor(Math.random() * 1e6).toString(10)}`;
    } while (this.#document.getElementById(uid));
    return uid;
  }
  createTooltipElement() {
    if (!this.tooltipRef) {
      this.tooltipRef = this.#viewContainerRef.createComponent(TooltipComponent);
    }
  }
  destroyTooltipElement() {
    this.tooltip?.remove();
    this.tooltipRef?.destroy();
    this.tooltipRef = void 0;
    this.popperInstance?.destroy();
    this.#viewContainerRef?.detach();
    this.#viewContainerRef?.clear();
  }
  addTooltipElement() {
    if (!this.content()) {
      this.destroyTooltipElement();
      return;
    }
    if (!this.tooltipRef) {
      this.createTooltipElement();
    }
    this.tooltipRef?.setInput("content", this.content() ?? "");
    this.tooltip = this.tooltipRef?.location.nativeElement;
    this.#renderer.addClass(this.tooltip, "d-none");
    this.#renderer.addClass(this.tooltip, "fade");
    this.popperInstance?.destroy();
    this.#viewContainerRef.insert(this.tooltipRef.hostView);
    this.#renderer.appendChild(this.#document.body, this.tooltip);
    this.popperInstance = createPopper3(this.referenceRef().nativeElement, this.tooltip, __spreadValues({}, this.popperOptionsComputed()));
    if (!this.visible()) {
      this.removeTooltipElement();
      return;
    }
    setTimeout(() => {
      this.tooltipId = this.getUID("tooltip");
      this.tooltipRef?.setInput("id", this.tooltipId);
      this.#renderer.removeClass(this.tooltip, "d-none");
      this.tooltipRef?.setInput("visible", this.visible());
      this.popperInstance?.forceUpdate();
      this.#changeDetectorRef?.markForCheck();
    }, 100);
  }
  removeTooltipElement() {
    this.tooltipId = "";
    if (!this.tooltipRef) {
      return;
    }
    this.tooltipRef.setInput("visible", false);
    this.tooltipRef.setInput("id", void 0);
    this.#changeDetectorRef.markForCheck();
    setTimeout(() => {
      this.#viewContainerRef?.detach();
    }, 300);
  }
  static {
    this.ɵfac = function TooltipDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TooltipDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TooltipDirective,
      selectors: [["", "cTooltip", ""]],
      hostVars: 1,
      hostBindings: function TooltipDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("aria-describedby", ctx.ariaDescribedBy);
        }
      },
      inputs: {
        content: [1, "cTooltip", "content"],
        popperOptions: [1, "cTooltipOptions", "popperOptions"],
        placement: [1, "cTooltipPlacement", "placement"],
        reference: [1, "cTooltipRef", "reference"],
        trigger: [1, "cTooltipTrigger", "trigger"],
        visible: [1, "cTooltipVisible", "visible"]
      },
      outputs: {
        visible: "cTooltipVisibleChange"
      },
      exportAs: ["cTooltip"],
      features: [ɵɵProvidersFeature([ListenersService, IntersectionService])]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipDirective, [{
    type: Directive,
    args: [{
      selector: "[cTooltip]",
      exportAs: "cTooltip",
      providers: [ListenersService, IntersectionService],
      host: {
        "[attr.aria-describedby]": "ariaDescribedBy"
      }
    }]
  }], null, null);
})();
var TooltipModule = class _TooltipModule {
  static {
    this.ɵfac = function TooltipModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TooltipModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _TooltipModule,
      imports: [TooltipComponent, TooltipDirective],
      exports: [TooltipComponent, TooltipDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipModule, [{
    type: NgModule,
    args: [{
      exports: [TooltipComponent, TooltipDirective],
      imports: [TooltipComponent, TooltipDirective]
    }]
  }], null, null);
})();
var WidgetStatAComponent = class _WidgetStatAComponent extends CardComponent {
  constructor() {
    super(...arguments);
    this.title = input();
    this.value = input();
    this.templates = {};
    this.contentTemplates = contentChildren(TemplateIdDirective, {
      descendants: true
    });
    this.#contentTemplatesEffect = effect(() => {
      this.contentTemplates().forEach((child) => {
        this.templates[child.id] = child.templateRef;
      });
    });
    this.hostClasses = computed(() => {
      const color = this.color();
      return {
        card: true,
        [`bg-${color}`]: !!color,
        "text-white": !!color
      };
    });
  }
  #contentTemplatesEffect;
  get bodyClasses() {
    return {
      "pb-0": true,
      "d-flex": true,
      "justify-content-between": true,
      "align-items-start": true
    };
  }
  static {
    this.ɵfac = /* @__PURE__ */ (() => {
      let ɵWidgetStatAComponent_BaseFactory;
      return function WidgetStatAComponent_Factory(__ngFactoryType__) {
        return (ɵWidgetStatAComponent_BaseFactory || (ɵWidgetStatAComponent_BaseFactory = ɵɵgetInheritedFactory(_WidgetStatAComponent)))(__ngFactoryType__ || _WidgetStatAComponent);
      };
    })();
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _WidgetStatAComponent,
      selectors: [["c-widget-stat-a"]],
      contentQueries: function WidgetStatAComponent_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuerySignal(dirIndex, ctx.contentTemplates, TemplateIdDirective, 5);
        }
        if (rf & 2) {
          ɵɵqueryAdvance();
        }
      },
      hostAttrs: [1, "card"],
      hostVars: 2,
      hostBindings: function WidgetStatAComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        title: [1, "title"],
        value: [1, "value"]
      },
      exportAs: ["cWidgetStatA"],
      features: [ɵɵInheritDefinitionFeature],
      ngContentSelectors: _c16,
      decls: 15,
      vars: 5,
      consts: [["defaultWidgetTitleTemplate", ""], ["defaultWidgetValueTemplate", ""], ["defaultWidgetChartTemplate", ""], ["defaultWidgetActionTemplate", ""], [3, "ngClass"], [1, "fs-4", "fw-semibold"], [4, "ngTemplateOutlet"]],
      template: function WidgetStatAComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef(_c15);
          ɵɵelementContainerStart(0);
          ɵɵelementStart(1, "c-card-body", 4)(2, "div");
          ɵɵtemplate(3, WidgetStatAComponent_Conditional_3_Template, 2, 1, "div", 5)(4, WidgetStatAComponent_Conditional_4_Template, 2, 1, "div");
          ɵɵelementEnd();
          ɵɵtemplate(5, WidgetStatAComponent_ng_container_5_Template, 1, 0, "ng-container", 6);
          ɵɵelementEnd();
          ɵɵtemplate(6, WidgetStatAComponent_ng_container_6_Template, 1, 0, "ng-container", 6);
          ɵɵelementContainerEnd();
          ɵɵtemplate(7, WidgetStatAComponent_ng_template_7_Template, 1, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor)(9, WidgetStatAComponent_ng_template_9_Template, 1, 1, "ng-template", null, 1, ɵɵtemplateRefExtractor)(11, WidgetStatAComponent_ng_template_11_Template, 1, 0, "ng-template", null, 2, ɵɵtemplateRefExtractor)(13, WidgetStatAComponent_ng_template_13_Template, 1, 0, "ng-template", null, 3, ɵɵtemplateRefExtractor);
        }
        if (rf & 2) {
          const defaultWidgetChartTemplate_r4 = ɵɵreference(12);
          const defaultWidgetActionTemplate_r5 = ɵɵreference(14);
          ɵɵadvance();
          ɵɵproperty("ngClass", ctx.bodyClasses);
          ɵɵadvance(2);
          ɵɵconditional(!!ctx.value() || (ctx.templates == null ? null : ctx.templates["widgetValueTemplate"]) ? 3 : -1);
          ɵɵadvance();
          ɵɵconditional(!!ctx.title() || (ctx.templates == null ? null : ctx.templates["widgetTitleTemplate"]) ? 4 : -1);
          ɵɵadvance();
          ɵɵproperty("ngTemplateOutlet", (ctx.templates == null ? null : ctx.templates["widgetActionTemplate"]) || defaultWidgetActionTemplate_r5);
          ɵɵadvance();
          ɵɵproperty("ngTemplateOutlet", (ctx.templates == null ? null : ctx.templates["widgetChartTemplate"]) || defaultWidgetChartTemplate_r4);
        }
      },
      dependencies: [CardBodyComponent, NgClass, NgTemplateOutlet],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WidgetStatAComponent, [{
    type: Component,
    args: [{
      selector: "c-widget-stat-a",
      exportAs: "cWidgetStatA",
      imports: [CardBodyComponent, NgClass, NgTemplateOutlet],
      host: {
        class: "card",
        "[class]": "hostClasses()"
      },
      template: `<ng-container>
  <c-card-body [ngClass]="bodyClasses">
    <div>
      @if (!!value() || templates?.['widgetValueTemplate']) {
        <div class="fs-4 fw-semibold">
          <ng-container *ngTemplateOutlet="templates?.['widgetValueTemplate'] || defaultWidgetValueTemplate" />
        </div>
      }
      @if (!!title() || templates?.['widgetTitleTemplate']) {
        <div>
          <ng-container *ngTemplateOutlet="templates?.['widgetTitleTemplate'] || defaultWidgetTitleTemplate" />
        </div>
      }
    </div>
    <ng-container *ngTemplateOutlet="templates?.['widgetActionTemplate'] || defaultWidgetActionTemplate" />
  </c-card-body>
  <ng-container *ngTemplateOutlet="templates?.['widgetChartTemplate'] || defaultWidgetChartTemplate" />
</ng-container>

<ng-template #defaultWidgetTitleTemplate>
  {{ title() }}
</ng-template>

<ng-template #defaultWidgetValueTemplate>
  {{ value() }}
</ng-template>

<ng-template #defaultWidgetChartTemplate>
  <ng-content select=".chart-wrapper" />
</ng-template>

<ng-template #defaultWidgetActionTemplate>
  <ng-content />
</ng-template>
`
    }]
  }], null, null);
})();
var WidgetStatBComponent = class _WidgetStatBComponent extends CardComponent {
  constructor() {
    super();
    this.title = input();
    this.text = input();
    this.value = input();
    this.inverse = input(false, {
      transform: booleanAttribute
    });
    this.hostClasses = computed(() => {
      const color = this.color();
      const textColor = this.textColor();
      return {
        card: true,
        [`bg-${color}`]: !!color,
        [`text-${textColor}`]: !!textColor,
        "text-white": this.inverse()
      };
    });
  }
  static {
    this.ɵfac = function WidgetStatBComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _WidgetStatBComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _WidgetStatBComponent,
      selectors: [["c-widget-stat-b"]],
      hostAttrs: [1, "card"],
      hostVars: 2,
      hostBindings: function WidgetStatBComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        title: [1, "title"],
        text: [1, "text"],
        value: [1, "value"],
        inverse: [1, "inverse"]
      },
      exportAs: ["cWidgetStatB"],
      features: [ɵɵInheritDefinitionFeature],
      ngContentSelectors: _c0,
      decls: 5,
      vars: 3,
      consts: [[1, "fs-4", "fw-semibold"], [3, "ngClass"]],
      template: function WidgetStatBComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵelementStart(0, "c-card-body");
          ɵɵtemplate(1, WidgetStatBComponent_Conditional_1_Template, 2, 1, "div", 0)(2, WidgetStatBComponent_Conditional_2_Template, 2, 1, "div");
          ɵɵprojection(3);
          ɵɵtemplate(4, WidgetStatBComponent_Conditional_4_Template, 2, 2, "small", 1);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵadvance();
          ɵɵconditional(!!ctx.value() ? 1 : -1);
          ɵɵadvance();
          ɵɵconditional(!!ctx.title() ? 2 : -1);
          ɵɵadvance(2);
          ɵɵconditional(ctx.text() ? 4 : -1);
        }
      },
      dependencies: [CardBodyComponent, NgClass],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WidgetStatBComponent, [{
    type: Component,
    args: [{
      selector: "c-widget-stat-b",
      exportAs: "cWidgetStatB",
      imports: [CardBodyComponent, NgClass],
      host: {
        class: "card",
        "[class]": "hostClasses()"
      },
      template: `<c-card-body>
  @if (!!value()) {
    <div class="fs-4 fw-semibold">{{ value() }}</div>
  }
  @if (!!title()) {
    <div>{{ title() }}</div>
  }
  <ng-content />
  @if (text()) {
    <small [ngClass]="inverse() ? 'text-white text-opacity-75' : 'text-body-secondary'">
      {{ text() }}
    </small>
  }
</c-card-body>
`
    }]
  }], () => [], null);
})();
var WidgetStatCComponent = class _WidgetStatCComponent extends CardComponent {
  constructor() {
    super();
    this.icon = input();
    this.title = input();
    this.value = input();
    this.inverse = input(false, {
      transform: booleanAttribute
    });
    this.templates = {};
    this.contentTemplates = contentChildren(TemplateIdDirective, {
      descendants: true
    });
    this.#contentTemplatesEffect = effect(() => {
      this.contentTemplates().forEach((child) => {
        this.templates[child.id] = child.templateRef;
      });
    });
    this.hostExtendedClass = computed(() => {
      return __spreadProps(__spreadValues({}, this.hostClasses()), {
        "text-white": this.inverse()
      });
    });
    this.titleClasses = computed(() => {
      const inverse = this.inverse();
      return {
        "text-body-secondary": !inverse,
        "text-white": inverse,
        "text-opacity-75": inverse,
        [`text-${this.textColor()}`]: !!this.textColor()
      };
    });
    this.valueClasses = computed(() => {
      return __spreadProps(__spreadValues({
        "fs-4": !this.textColor(),
        "fw-semibold": true
      }, this.titleClasses()), {
        "text-opacity-75": false
      });
    });
    this.iconClasses = computed(() => {
      return __spreadValues({
        "mb-4": !this.textColor(),
        "text-end": true
      }, this.titleClasses());
    });
  }
  #contentTemplatesEffect;
  static {
    this.ɵfac = function WidgetStatCComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _WidgetStatCComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _WidgetStatCComponent,
      selectors: [["c-widget-stat-c"]],
      contentQueries: function WidgetStatCComponent_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuerySignal(dirIndex, ctx.contentTemplates, TemplateIdDirective, 5);
        }
        if (rf & 2) {
          ɵɵqueryAdvance();
        }
      },
      hostVars: 2,
      hostBindings: function WidgetStatCComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostExtendedClass());
        }
      },
      inputs: {
        icon: [1, "icon"],
        title: [1, "title"],
        value: [1, "value"],
        inverse: [1, "inverse"]
      },
      exportAs: ["cWidgetStatC"],
      features: [ɵɵInheritDefinitionFeature],
      ngContentSelectors: _c0,
      decls: 9,
      vars: 4,
      consts: [["defaultWidgetIconTemplate", ""], ["defaultWidgetProgressTemplate", ""], [3, "ngClass"], [4, "ngTemplateOutlet"]],
      template: function WidgetStatCComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵelementStart(0, "c-card-body");
          ɵɵtemplate(1, WidgetStatCComponent_Conditional_1_Template, 2, 2, "div", 2)(2, WidgetStatCComponent_Conditional_2_Template, 2, 2, "div", 2)(3, WidgetStatCComponent_Conditional_3_Template, 2, 2, "div", 2)(4, WidgetStatCComponent_Conditional_4_Template, 1, 1, "ng-container");
          ɵɵelementEnd();
          ɵɵtemplate(5, WidgetStatCComponent_ng_template_5_Template, 1, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor)(7, WidgetStatCComponent_ng_template_7_Template, 1, 0, "ng-template", null, 1, ɵɵtemplateRefExtractor);
        }
        if (rf & 2) {
          ɵɵadvance();
          ɵɵconditional(ctx.icon() || (ctx.templates == null ? null : ctx.templates["widgetIconTemplate"]) ? 1 : -1);
          ɵɵadvance();
          ɵɵconditional(!!ctx.value() ? 2 : -1);
          ɵɵadvance();
          ɵɵconditional(!!ctx.title() ? 3 : -1);
          ɵɵadvance();
          ɵɵconditional((ctx.templates == null ? null : ctx.templates["widgetProgressTemplate"]) ? 4 : -1);
        }
      },
      dependencies: [CardBodyComponent, NgClass, NgTemplateOutlet],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WidgetStatCComponent, [{
    type: Component,
    args: [{
      selector: "c-widget-stat-c",
      exportAs: "cWidgetStatC",
      imports: [CardBodyComponent, NgClass, NgTemplateOutlet],
      host: {
        "[class]": "hostExtendedClass()"
      },
      template: `<c-card-body>
  @if (icon() || templates?.['widgetIconTemplate']) {
    <div [ngClass]="iconClasses()">
      <ng-container *ngTemplateOutlet="templates?.['widgetIconTemplate'] || defaultWidgetIconTemplate" />
    </div>
  }
  @if (!!value()) {
    <div [ngClass]="valueClasses()">
      {{ value() }}
    </div>
  }
  @if (!!title()) {
    <div [ngClass]="titleClasses()">
      {{ title() }}
    </div>
  }
  @if (templates?.['widgetProgressTemplate']) {
    <ng-container *ngTemplateOutlet="templates?.['widgetProgressTemplate'] || defaultWidgetProgressTemplate" />
  }
</c-card-body>

<ng-template #defaultWidgetIconTemplate>
  {{ icon() }}
</ng-template>

<ng-template #defaultWidgetProgressTemplate>
  <ng-content />
</ng-template>
`
    }]
  }], () => [], null);
})();
var WidgetStatDComponent = class _WidgetStatDComponent extends CardComponent {
  constructor() {
    super(...arguments);
    this.values = input();
    this.headerClasses = computed(() => {
      return {
        "position-relative": true,
        "d-flex": true,
        "justify-content-center": true,
        "align-items-center": true,
        [`bg-${this.color()}`]: this.color()
      };
    });
  }
  static {
    this.ɵfac = /* @__PURE__ */ (() => {
      let ɵWidgetStatDComponent_BaseFactory;
      return function WidgetStatDComponent_Factory(__ngFactoryType__) {
        return (ɵWidgetStatDComponent_BaseFactory || (ɵWidgetStatDComponent_BaseFactory = ɵɵgetInheritedFactory(_WidgetStatDComponent)))(__ngFactoryType__ || _WidgetStatDComponent);
      };
    })();
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _WidgetStatDComponent,
      selectors: [["c-widget-stat-d"]],
      hostAttrs: [1, "card"],
      inputs: {
        values: [1, "values"]
      },
      exportAs: ["cWidgetStatD"],
      features: [ɵɵInheritDefinitionFeature],
      ngContentSelectors: _c0,
      decls: 5,
      vars: 1,
      consts: [[3, "ngClass"], ["cRow", "", 1, "text-center"], [1, "vr"], [1, "fs-5", "fw-semibold"], [1, "text-uppercase", "text-body-secondary", "small"]],
      template: function WidgetStatDComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵelementStart(0, "c-card-header", 0);
          ɵɵprojection(1);
          ɵɵelementEnd();
          ɵɵelementStart(2, "c-card-body", 1);
          ɵɵrepeaterCreate(3, WidgetStatDComponent_For_4_Template, 6, 3, null, null, ɵɵrepeaterTrackByIdentity);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵproperty("ngClass", ctx.headerClasses());
          ɵɵadvance(3);
          ɵɵrepeater(ctx.values());
        }
      },
      dependencies: [CardHeaderComponent, CardBodyComponent, ColComponent, RowDirective, NgClass],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WidgetStatDComponent, [{
    type: Component,
    args: [{
      selector: "c-widget-stat-d",
      exportAs: "cWidgetStatD",
      imports: [CardHeaderComponent, CardBodyComponent, ColComponent, RowDirective, NgClass],
      host: {
        class: "card"
      },
      template: '<c-card-header [ngClass]="headerClasses()">\n  <ng-content />\n</c-card-header>\n<c-card-body cRow class="text-center">\n  @for (item of values(); track item; let i = $index) {\n    @if (i % 2 !== 0) {\n      <div class="vr"></div>\n    }\n    <c-col>\n      <div class="fs-5 fw-semibold">{{ item.value }}</div>\n      <div class="text-uppercase text-body-secondary small">{{ item.title }}</div>\n    </c-col>\n  }\n</c-card-body>\n'
    }]
  }], null, null);
})();
var WidgetStatEComponent = class _WidgetStatEComponent extends CardComponent {
  constructor() {
    super();
    this.title = input();
    this.value = input();
    this.titleClasses = computed(() => {
      const textColor = this.textColor();
      return {
        "text-body-secondary": !textColor,
        small: true,
        "text-uppercase": true,
        "fw-semibold": true,
        [`text-${textColor}`]: !!textColor
      };
    });
  }
  static {
    this.ɵfac = function WidgetStatEComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _WidgetStatEComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _WidgetStatEComponent,
      selectors: [["c-widget-stat-e"]],
      inputs: {
        title: [1, "title"],
        value: [1, "value"]
      },
      exportAs: ["cWidgetStatE"],
      features: [ɵɵInheritDefinitionFeature],
      ngContentSelectors: _c0,
      decls: 4,
      vars: 2,
      consts: [[1, "text-center"], [3, "ngClass"], [1, "fs-6", "fw-semibold", "py-3"]],
      template: function WidgetStatEComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵelementStart(0, "c-card-body", 0);
          ɵɵtemplate(1, WidgetStatEComponent_Conditional_1_Template, 2, 2, "div", 1)(2, WidgetStatEComponent_Conditional_2_Template, 2, 1, "div", 2);
          ɵɵprojection(3);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵadvance();
          ɵɵconditional(!!ctx.title() ? 1 : -1);
          ɵɵadvance();
          ɵɵconditional(!!ctx.value() ? 2 : -1);
        }
      },
      dependencies: [CardBodyComponent, NgClass],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WidgetStatEComponent, [{
    type: Component,
    args: [{
      selector: "c-widget-stat-e",
      exportAs: "cWidgetStatE",
      imports: [CardBodyComponent, NgClass],
      template: '<c-card-body class="text-center">\n  @if (!!title()) {\n    <div [ngClass]="titleClasses()">{{ title() }}</div>\n  }\n  @if (!!value()) {\n    <div class="fs-6 fw-semibold py-3">{{ value() }}</div>\n  }\n  <ng-content />\n</c-card-body>\n'
    }]
  }], () => [], null);
})();
var WidgetStatFComponent = class _WidgetStatFComponent extends CardComponent {
  constructor() {
    super(...arguments);
    this.footer = input();
    this.icon = input();
    this.padding = input(false, {
      transform: booleanAttribute
    });
    this.title = input();
    this.value = input();
    this.templates = {};
    this.contentTemplates = contentChildren(TemplateIdDirective, {
      descendants: true
    });
    this.#contentTemplatesEffect = effect(() => {
      this.contentTemplates().forEach((child) => {
        this.templates[child.id] = child.templateRef;
      });
    });
    this.cardBodyClasses = computed(() => {
      return {
        "d-flex": true,
        "align-items-center": true,
        "p-0": !this.padding()
      };
    });
    this.iconClasses = computed(() => {
      const color = this.color();
      const padding = this.padding();
      return {
        "me-3": !this.textColor(),
        "text-white": true,
        [`bg-${color}`]: !!color,
        "p-3": padding,
        "p-4": !padding,
        "rounded-start-1": !padding
      };
    });
    this.titleClasses = computed(() => {
      const textColor = this.textColor();
      return {
        "text-body-secondary": !textColor,
        small: true,
        "text-uppercase": true,
        "fw-semibold": true,
        [`text-${textColor}`]: !!textColor
      };
    });
    this.valueClasses = computed(() => {
      const textColor = this.textColor();
      return {
        "fs-6": !textColor,
        "fw-semibold": true,
        [`text-${textColor}`]: !!textColor
      };
    });
  }
  #contentTemplatesEffect;
  static {
    this.ɵfac = /* @__PURE__ */ (() => {
      let ɵWidgetStatFComponent_BaseFactory;
      return function WidgetStatFComponent_Factory(__ngFactoryType__) {
        return (ɵWidgetStatFComponent_BaseFactory || (ɵWidgetStatFComponent_BaseFactory = ɵɵgetInheritedFactory(_WidgetStatFComponent)))(__ngFactoryType__ || _WidgetStatFComponent);
      };
    })();
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _WidgetStatFComponent,
      selectors: [["c-widget-stat-f"]],
      contentQueries: function WidgetStatFComponent_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuerySignal(dirIndex, ctx.contentTemplates, TemplateIdDirective, 5);
        }
        if (rf & 2) {
          ɵɵqueryAdvance();
        }
      },
      hostAttrs: [1, "card"],
      hostVars: 2,
      hostBindings: function WidgetStatFComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.hostClasses());
        }
      },
      inputs: {
        footer: [1, "footer"],
        icon: [1, "icon"],
        padding: [1, "padding"],
        title: [1, "title"],
        value: [1, "value"]
      },
      exportAs: ["cWidgetStatB"],
      features: [ɵɵInheritDefinitionFeature],
      decls: 14,
      vars: 8,
      consts: [["defaultWidgetIconTemplate", ""], ["defaultFooterIconTemplate", ""], [3, "ngClass"], [4, "ngTemplateOutlet"]],
      template: function WidgetStatFComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementContainerStart(0);
          ɵɵelementStart(1, "c-card-body", 2)(2, "div", 2);
          ɵɵtemplate(3, WidgetStatFComponent_ng_container_3_Template, 1, 0, "ng-container", 3);
          ɵɵelementEnd();
          ɵɵelementStart(4, "div")(5, "div", 2);
          ɵɵtext(6);
          ɵɵelementEnd();
          ɵɵelementStart(7, "div", 2);
          ɵɵtext(8);
          ɵɵelementEnd()()();
          ɵɵtemplate(9, WidgetStatFComponent_Conditional_9_Template, 2, 1, "c-card-footer");
          ɵɵelementContainerEnd();
          ɵɵtemplate(10, WidgetStatFComponent_ng_template_10_Template, 2, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor)(12, WidgetStatFComponent_ng_template_12_Template, 2, 1, "ng-template", null, 1, ɵɵtemplateRefExtractor);
        }
        if (rf & 2) {
          const defaultWidgetIconTemplate_r3 = ɵɵreference(11);
          ɵɵadvance();
          ɵɵproperty("ngClass", ctx.cardBodyClasses());
          ɵɵadvance();
          ɵɵproperty("ngClass", ctx.iconClasses());
          ɵɵadvance();
          ɵɵproperty("ngTemplateOutlet", (ctx.templates == null ? null : ctx.templates["widgetIconTemplate"]) || defaultWidgetIconTemplate_r3);
          ɵɵadvance(2);
          ɵɵproperty("ngClass", ctx.valueClasses());
          ɵɵadvance();
          ɵɵtextInterpolate(ctx.value());
          ɵɵadvance();
          ɵɵproperty("ngClass", ctx.titleClasses());
          ɵɵadvance();
          ɵɵtextInterpolate(ctx.title());
          ɵɵadvance();
          ɵɵconditional(ctx.footer() || (ctx.templates == null ? null : ctx.templates["widgetFooterTemplate"]) ? 9 : -1);
        }
      },
      dependencies: [CardBodyComponent, CardFooterComponent, NgClass, NgTemplateOutlet],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WidgetStatFComponent, [{
    type: Component,
    args: [{
      selector: "c-widget-stat-f",
      exportAs: "cWidgetStatB",
      imports: [CardBodyComponent, CardFooterComponent, NgClass, NgTemplateOutlet],
      host: {
        class: "card",
        "[class]": "hostClasses()"
      },
      template: `<ng-container>
  <c-card-body [ngClass]="cardBodyClasses()">
    <div [ngClass]="iconClasses()">
      <ng-container *ngTemplateOutlet="templates?.['widgetIconTemplate'] || defaultWidgetIconTemplate" />
    </div>
    <div>
      <div [ngClass]="valueClasses()">{{ value() }}</div>
      <div [ngClass]="titleClasses()">{{ title() }}</div>
    </div>
  </c-card-body>
  @if (footer() || templates?.['widgetFooterTemplate']) {
    <c-card-footer>
      <ng-container *ngTemplateOutlet="templates?.['widgetFooterTemplate'] || defaultFooterIconTemplate" />
    </c-card-footer>
  }
</ng-container>

<ng-template #defaultWidgetIconTemplate>
  <span>{{ icon() }}</span>
</ng-template>

<ng-template #defaultFooterIconTemplate>
  <span>{{ footer() }}</span>
</ng-template>
`
    }]
  }], null, null);
})();
var WidgetModule = class _WidgetModule {
  static {
    this.ɵfac = function WidgetModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _WidgetModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _WidgetModule,
      imports: [WidgetStatAComponent, WidgetStatBComponent, WidgetStatCComponent, WidgetStatDComponent, WidgetStatEComponent, WidgetStatFComponent],
      exports: [WidgetStatAComponent, WidgetStatBComponent, WidgetStatCComponent, WidgetStatDComponent, WidgetStatEComponent, WidgetStatFComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WidgetModule, [{
    type: NgModule,
    args: [{
      imports: [WidgetStatAComponent, WidgetStatBComponent, WidgetStatCComponent, WidgetStatDComponent, WidgetStatEComponent, WidgetStatFComponent],
      exports: [WidgetStatAComponent, WidgetStatBComponent, WidgetStatCComponent, WidgetStatDComponent, WidgetStatEComponent, WidgetStatFComponent]
    }]
  }], null, null);
})();
export {
  AccordionButtonDirective,
  AccordionComponent,
  AccordionItemComponent,
  AccordionModule,
  AlertComponent,
  AlertHeadingDirective,
  AlertLinkDirective,
  AlertModule,
  AlignDirective,
  AvatarComponent,
  AvatarModule,
  BackdropService,
  BadgeComponent,
  BadgeModule,
  BgColorDirective,
  BorderDirective,
  BreadcrumbComponent,
  BreadcrumbItemComponent,
  BreadcrumbModule,
  BreadcrumbRouterComponent,
  BreadcrumbRouterService,
  BreakpointInfix,
  ButtonCloseDirective,
  ButtonDirective,
  ButtonGroupComponent,
  ButtonGroupModule,
  ButtonModule,
  ButtonToolbarComponent,
  CalloutComponent,
  CalloutModule,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardGroupComponent,
  CardHeaderActionsComponent,
  CardHeaderComponent,
  CardImgDirective,
  CardImgOverlayComponent,
  CardLinkDirective,
  CardModule,
  CardSubtitleDirective,
  CardTextDirective,
  CardTitleDirective,
  CarouselCaptionComponent,
  CarouselComponent,
  CarouselConfig,
  CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  CarouselModule,
  ClassToggleService,
  ColComponent,
  ColDirective,
  CollapseDirective,
  CollapseModule,
  ColorModeService,
  ContainerComponent,
  DropdownCloseDirective,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownItemPlainDirective,
  DropdownMenuDirective,
  DropdownModule,
  DropdownService,
  DropdownToggleDirective,
  ElementRefDirective,
  FooterComponent,
  FooterModule,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  FormControlDirective,
  FormDirective,
  FormFeedbackComponent,
  FormFloatingDirective,
  FormLabelDirective,
  FormModule,
  FormSelectDirective,
  FormTextDirective,
  GridModule,
  GutterDirective,
  HeaderBrandComponent,
  HeaderComponent,
  HeaderDividerComponent,
  HeaderModule,
  HeaderNavComponent,
  HeaderTextComponent,
  HeaderTogglerDirective,
  HtmlAttributesDirective,
  ImgDirective,
  ImgModule,
  InMemoryStorageService,
  InputGroupComponent,
  InputGroupTextDirective,
  IntersectionService,
  ListGroupDirective,
  ListGroupItemDirective,
  ListGroupModule,
  ListenersService,
  LocalStorageService,
  ModalBodyComponent,
  ModalComponent,
  ModalContentComponent,
  ModalDialogComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalModule,
  ModalService,
  ModalTitleDirective,
  ModalToggleDirective,
  NavComponent,
  NavItemComponent,
  NavLinkDirective,
  NavModule,
  NavbarBrandDirective,
  NavbarComponent,
  NavbarModule,
  NavbarNavComponent,
  NavbarTextComponent,
  NavbarTogglerDirective,
  OffcanvasBodyComponent,
  OffcanvasComponent,
  OffcanvasHeaderComponent,
  OffcanvasModule,
  OffcanvasService,
  OffcanvasTitleDirective,
  OffcanvasToggleDirective,
  PageItemComponent,
  PageItemDirective,
  PageLinkDirective,
  PaginationComponent,
  PaginationModule,
  PlaceholderAnimationDirective,
  PlaceholderDirective,
  PlaceholderModule,
  PopoverComponent,
  PopoverDirective,
  PopoverModule,
  ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent,
  ProgressModule,
  ProgressStackedComponent,
  RoundedDirective,
  RowComponent,
  RowDirective,
  RtlService,
  ShadowOnScrollDirective,
  SharedModule,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarModule,
  SidebarNavComponent,
  SidebarNavHelper,
  SidebarService,
  SidebarToggleDirective,
  SidebarTogglerDirective,
  SpinnerComponent,
  SpinnerModule,
  TabContentComponent,
  TabContentRefDirective,
  TabDirective,
  TabPaneComponent,
  TabPanelComponent,
  TabService,
  TableActiveDirective,
  TableColorDirective,
  TableDirective,
  TableModule,
  Tabs2Module,
  TabsComponent,
  TabsContentComponent,
  TabsListComponent,
  TabsModule,
  TabsService,
  TemplateIdDirective,
  TextBgColorDirective,
  TextColorDirective,
  ThemeDirective,
  ToastBodyComponent,
  ToastCloseDirective,
  ToastComponent,
  ToastHeaderComponent,
  ToastModule,
  ToasterComponent,
  ToasterHostDirective,
  ToasterPlacement,
  ToasterService,
  TooltipComponent,
  TooltipDirective,
  TooltipModule,
  UIDService,
  UtilitiesModule,
  WidgetModule,
  WidgetStatAComponent,
  WidgetStatBComponent,
  WidgetStatCComponent,
  WidgetStatDComponent,
  WidgetStatEComponent,
  WidgetStatFComponent
};
//# sourceMappingURL=@coreui_angular.js.map
