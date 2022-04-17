var isBrowser="undefined"!=typeof window&&"undefined"!=typeof document&&"undefined"!=typeof navigator;const timeoutDuration=function(){const e=["Edge","Trident","Firefox"];for(let t=0;t<e.length;t+=1)if(isBrowser&&navigator.userAgent.indexOf(e[t])>=0)return 1;return 0}();function microtaskDebounce(e){let t=!1;return()=>{t||(t=!0,window.Promise.resolve().then(()=>{t=!1,e()}))}}function taskDebounce(e){let t=!1;return()=>{t||(t=!0,setTimeout(()=>{t=!1,e()},timeoutDuration))}}const supportsMicroTasks=isBrowser&&window.Promise;var debounce=supportsMicroTasks?microtaskDebounce:taskDebounce;function isFunction(e){return e&&"[object Function]"==={}.toString.call(e)}function getStyleComputedProperty(e,t){if(1!==e.nodeType)return[];const o=e.ownerDocument.defaultView.getComputedStyle(e,null);return t?o[t]:o}function getParentNode(e){return"HTML"===e.nodeName?e:e.parentNode||e.host}function getScrollParent(e){if(!e)return document.body;switch(e.nodeName){case"HTML":case"BODY":return e.ownerDocument.body;case"#document":return e.body}const{overflow:t,overflowX:o,overflowY:n}=getStyleComputedProperty(e);return/(auto|scroll|overlay)/.test(t+n+o)?e:getScrollParent(getParentNode(e))}function getReferenceNode(e){return e&&e.referenceNode?e.referenceNode:e}const isIE11=isBrowser&&!(!window.MSInputMethodContext||!document.documentMode),isIE10=isBrowser&&/MSIE 10/.test(navigator.userAgent);function isIE(e){return 11===e?isIE11:10===e?isIE10:isIE11||isIE10}function getOffsetParent(e){if(!e)return document.documentElement;const t=isIE(10)?document.body:null;let o=e.offsetParent||null;for(;o===t&&e.nextElementSibling;)o=(e=e.nextElementSibling).offsetParent;const n=o&&o.nodeName;return n&&"BODY"!==n&&"HTML"!==n?-1!==["TH","TD","TABLE"].indexOf(o.nodeName)&&"static"===getStyleComputedProperty(o,"position")?getOffsetParent(o):o:e?e.ownerDocument.documentElement:document.documentElement}function isOffsetContainer(e){const{nodeName:t}=e;return"BODY"!==t&&("HTML"===t||getOffsetParent(e.firstElementChild)===e)}function getRoot(e){return null!==e.parentNode?getRoot(e.parentNode):e}function findCommonOffsetParent(e,t){if(!(e&&e.nodeType&&t&&t.nodeType))return document.documentElement;const o=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,n=o?e:t,r=o?t:e,i=document.createRange();i.setStart(n,0),i.setEnd(r,0);const{commonAncestorContainer:s}=i;if(e!==s&&t!==s||n.contains(r))return isOffsetContainer(s)?s:getOffsetParent(s);const f=getRoot(e);return f.host?findCommonOffsetParent(f.host,t):findCommonOffsetParent(e,getRoot(t).host)}function getScroll(e,t="top"){const o="top"===t?"scrollTop":"scrollLeft",n=e.nodeName;if("BODY"===n||"HTML"===n){const t=e.ownerDocument.documentElement;return(e.ownerDocument.scrollingElement||t)[o]}return e[o]}function includeScroll(e,t,o=!1){const n=getScroll(t,"top"),r=getScroll(t,"left"),i=o?-1:1;return e.top+=n*i,e.bottom+=n*i,e.left+=r*i,e.right+=r*i,e}function getBordersSize(e,t){const o="x"===t?"Left":"Top",n="Left"===o?"Right":"Bottom";return parseFloat(e[`border${o}Width`])+parseFloat(e[`border${n}Width`])}function getSize(e,t,o,n){return Math.max(t[`offset${e}`],t[`scroll${e}`],o[`client${e}`],o[`offset${e}`],o[`scroll${e}`],isIE(10)?parseInt(o[`offset${e}`])+parseInt(n[`margin${"Height"===e?"Top":"Left"}`])+parseInt(n[`margin${"Height"===e?"Bottom":"Right"}`]):0)}function getWindowSizes(e){const t=e.body,o=e.documentElement,n=isIE(10)&&getComputedStyle(o);return{height:getSize("Height",t,o,n),width:getSize("Width",t,o,n)}}var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e};function getClientRect(e){return _extends({},e,{right:e.left+e.width,bottom:e.top+e.height})}function getBoundingClientRect(e){let t={};try{if(isIE(10)){t=e.getBoundingClientRect();const o=getScroll(e,"top"),n=getScroll(e,"left");t.top+=o,t.left+=n,t.bottom+=o,t.right+=n}else t=e.getBoundingClientRect()}catch(e){}const o={left:t.left,top:t.top,width:t.right-t.left,height:t.bottom-t.top},n="HTML"===e.nodeName?getWindowSizes(e.ownerDocument):{},r=n.width||e.clientWidth||o.width,i=n.height||e.clientHeight||o.height;let s=e.offsetWidth-r,f=e.offsetHeight-i;if(s||f){const t=getStyleComputedProperty(e);s-=getBordersSize(t,"x"),f-=getBordersSize(t,"y"),o.width-=s,o.height-=f}return getClientRect(o)}function getOffsetRectRelativeToArbitraryNode(e,t,o=!1){const n=isIE(10),r="HTML"===t.nodeName,i=getBoundingClientRect(e),s=getBoundingClientRect(t),f=getScrollParent(e),p=getStyleComputedProperty(t),a=parseFloat(p.borderTopWidth),l=parseFloat(p.borderLeftWidth);o&&r&&(s.top=Math.max(s.top,0),s.left=Math.max(s.left,0));let c=getClientRect({top:i.top-s.top-a,left:i.left-s.left-l,width:i.width,height:i.height});if(c.marginTop=0,c.marginLeft=0,!n&&r){const e=parseFloat(p.marginTop),t=parseFloat(p.marginLeft);c.top-=a-e,c.bottom-=a-e,c.left-=l-t,c.right-=l-t,c.marginTop=e,c.marginLeft=t}return(n&&!o?t.contains(f):t===f&&"BODY"!==f.nodeName)&&(c=includeScroll(c,t)),c}function getViewportOffsetRectRelativeToArtbitraryNode(e,t=!1){const o=e.ownerDocument.documentElement,n=getOffsetRectRelativeToArbitraryNode(e,o),r=Math.max(o.clientWidth,window.innerWidth||0),i=Math.max(o.clientHeight,window.innerHeight||0),s=t?0:getScroll(o),f=t?0:getScroll(o,"left");return getClientRect({top:s-n.top+n.marginTop,left:f-n.left+n.marginLeft,width:r,height:i})}function isFixed(e){const t=e.nodeName;if("BODY"===t||"HTML"===t)return!1;if("fixed"===getStyleComputedProperty(e,"position"))return!0;const o=getParentNode(e);return!!o&&isFixed(o)}function getFixedPositionOffsetParent(e){if(!e||!e.parentElement||isIE())return document.documentElement;let t=e.parentElement;for(;t&&"none"===getStyleComputedProperty(t,"transform");)t=t.parentElement;return t||document.documentElement}function getBoundaries(e,t,o,n,r=!1){let i={top:0,left:0};const s=r?getFixedPositionOffsetParent(e):findCommonOffsetParent(e,getReferenceNode(t));if("viewport"===n)i=getViewportOffsetRectRelativeToArtbitraryNode(s,r);else{let o;"scrollParent"===n?"BODY"===(o=getScrollParent(getParentNode(t))).nodeName&&(o=e.ownerDocument.documentElement):o="window"===n?e.ownerDocument.documentElement:n;const f=getOffsetRectRelativeToArbitraryNode(o,s,r);if("HTML"!==o.nodeName||isFixed(s))i=f;else{const{height:t,width:o}=getWindowSizes(e.ownerDocument);i.top+=f.top-f.marginTop,i.bottom=t+f.top,i.left+=f.left-f.marginLeft,i.right=o+f.left}}const f="number"==typeof(o=o||0);return i.left+=f?o:o.left||0,i.top+=f?o:o.top||0,i.right-=f?o:o.right||0,i.bottom-=f?o:o.bottom||0,i}function getArea({width:e,height:t}){return e*t}function computeAutoPlacement(e,t,o,n,r,i=0){if(-1===e.indexOf("auto"))return e;const s=getBoundaries(o,n,i,r),f={top:{width:s.width,height:t.top-s.top},right:{width:s.right-t.right,height:s.height},bottom:{width:s.width,height:s.bottom-t.bottom},left:{width:t.left-s.left,height:s.height}},p=Object.keys(f).map(e=>_extends({key:e},f[e],{area:getArea(f[e])})).sort((e,t)=>t.area-e.area),a=p.filter(({width:e,height:t})=>e>=o.clientWidth&&t>=o.clientHeight),l=a.length>0?a[0].key:p[0].key,c=e.split("-")[1];return l+(c?`-${c}`:"")}function getReferenceOffsets(e,t,o,n=null){return getOffsetRectRelativeToArbitraryNode(o,n?getFixedPositionOffsetParent(t):findCommonOffsetParent(t,getReferenceNode(o)),n)}function getOuterSizes(e){const t=e.ownerDocument.defaultView.getComputedStyle(e),o=parseFloat(t.marginTop||0)+parseFloat(t.marginBottom||0),n=parseFloat(t.marginLeft||0)+parseFloat(t.marginRight||0);return{width:e.offsetWidth+n,height:e.offsetHeight+o}}function getOppositePlacement(e){const t={left:"right",right:"left",bottom:"top",top:"bottom"};return e.replace(/left|right|bottom|top/g,e=>t[e])}function getPopperOffsets(e,t,o){o=o.split("-")[0];const n=getOuterSizes(e),r={width:n.width,height:n.height},i=-1!==["right","left"].indexOf(o),s=i?"top":"left",f=i?"left":"top",p=i?"height":"width",a=i?"width":"height";return r[s]=t[s]+t[p]/2-n[p]/2,r[f]=o===f?t[f]-n[a]:t[getOppositePlacement(f)],r}function find(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function findIndex(e,t,o){if(Array.prototype.findIndex)return e.findIndex(e=>e[t]===o);const n=find(e,e=>e[t]===o);return e.indexOf(n)}function runModifiers(e,t,o){return(void 0===o?e:e.slice(0,findIndex(e,"name",o))).forEach(e=>{e.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");const o=e.function||e.fn;e.enabled&&isFunction(o)&&(t.offsets.popper=getClientRect(t.offsets.popper),t.offsets.reference=getClientRect(t.offsets.reference),t=o(t,e))}),t}function update(){if(this.state.isDestroyed)return;let e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=getReferenceOffsets(this.state,this.popper,this.reference,this.options.positionFixed),e.placement=computeAutoPlacement(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.positionFixed=this.options.positionFixed,e.offsets.popper=getPopperOffsets(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",e=runModifiers(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}function isModifierEnabled(e,t){return e.some(({name:e,enabled:o})=>o&&e===t)}function getSupportedPropertyName(e){const t=[!1,"ms","Webkit","Moz","O"],o=e.charAt(0).toUpperCase()+e.slice(1);for(let n=0;n<t.length;n++){const r=t[n],i=r?`${r}${o}`:e;if(void 0!==document.body.style[i])return i}return null}function destroy(){return this.state.isDestroyed=!0,isModifierEnabled(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[getSupportedPropertyName("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function getWindow(e){const t=e.ownerDocument;return t?t.defaultView:window}function attachToScrollParents(e,t,o,n){const r="BODY"===e.nodeName,i=r?e.ownerDocument.defaultView:e;i.addEventListener(t,o,{passive:!0}),r||attachToScrollParents(getScrollParent(i.parentNode),t,o,n),n.push(i)}function setupEventListeners(e,t,o,n){o.updateBound=n,getWindow(e).addEventListener("resize",o.updateBound,{passive:!0});const r=getScrollParent(e);return attachToScrollParents(r,"scroll",o.updateBound,o.scrollParents),o.scrollElement=r,o.eventsEnabled=!0,o}function enableEventListeners(){this.state.eventsEnabled||(this.state=setupEventListeners(this.reference,this.options,this.state,this.scheduleUpdate))}function removeEventListeners(e,t){return getWindow(e).removeEventListener("resize",t.updateBound),t.scrollParents.forEach(e=>{e.removeEventListener("scroll",t.updateBound)}),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t}function disableEventListeners(){this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=removeEventListeners(this.reference,this.state))}function isNumeric(e){return""!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function setStyles(e,t){Object.keys(t).forEach(o=>{let n="";-1!==["width","height","top","right","bottom","left"].indexOf(o)&&isNumeric(t[o])&&(n="px"),e.style[o]=t[o]+n})}function setAttributes(e,t){Object.keys(t).forEach(function(o){!1!==t[o]?e.setAttribute(o,t[o]):e.removeAttribute(o)})}function applyStyle(e){return setStyles(e.instance.popper,e.styles),setAttributes(e.instance.popper,e.attributes),e.arrowElement&&Object.keys(e.arrowStyles).length&&setStyles(e.arrowElement,e.arrowStyles),e}function applyStyleOnLoad(e,t,o,n,r){const i=getReferenceOffsets(r,t,e,o.positionFixed),s=computeAutoPlacement(o.placement,i,t,e,o.modifiers.flip.boundariesElement,o.modifiers.flip.padding);return t.setAttribute("x-placement",s),setStyles(t,{position:o.positionFixed?"fixed":"absolute"}),o}function getRoundedOffsets(e,t){const{popper:o,reference:n}=e.offsets,{round:r,floor:i}=Math,s=e=>e,f=r(n.width),p=r(o.width),a=-1!==["left","right"].indexOf(e.placement),l=-1!==e.placement.indexOf("-"),c=t?a||l||f%2==p%2?r:i:s,d=t?r:s;return{left:c(f%2==1&&p%2==1&&!l&&t?o.left-1:o.left),top:d(o.top),bottom:d(o.bottom),right:c(o.right)}}const isFirefox=isBrowser&&/Firefox/i.test(navigator.userAgent);function computeStyle(e,t){const{x:o,y:n}=t,{popper:r}=e.offsets,i=find(e.instance.modifiers,e=>"applyStyle"===e.name).gpuAcceleration;void 0!==i&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");const s=void 0!==i?i:t.gpuAcceleration,f=getOffsetParent(e.instance.popper),p=getBoundingClientRect(f),a={position:r.position},l=getRoundedOffsets(e,window.devicePixelRatio<2||!isFirefox),c="bottom"===o?"top":"bottom",d="right"===n?"left":"right",u=getSupportedPropertyName("transform");let h,m;if(m="bottom"===c?"HTML"===f.nodeName?-f.clientHeight+l.bottom:-p.height+l.bottom:l.top,h="right"===d?"HTML"===f.nodeName?-f.clientWidth+l.right:-p.width+l.right:l.left,s&&u)a[u]=`translate3d(${h}px, ${m}px, 0)`,a[c]=0,a[d]=0,a.willChange="transform";else{const e="bottom"===c?-1:1,t="right"===d?-1:1;a[c]=m*e,a[d]=h*t,a.willChange=`${c}, ${d}`}const g={"x-placement":e.placement};return e.attributes=_extends({},g,e.attributes),e.styles=_extends({},a,e.styles),e.arrowStyles=_extends({},e.offsets.arrow,e.arrowStyles),e}function isModifierRequired(e,t,o){const n=find(e,({name:e})=>e===t),r=!!n&&e.some(e=>e.name===o&&e.enabled&&e.order<n.order);if(!r){const e=`\`${t}\``,n=`\`${o}\``;console.warn(`${n} modifier is required by ${e} modifier in order to work, be sure to include it before ${e}!`)}return r}function arrow(e,t){if(!isModifierRequired(e.instance.modifiers,"arrow","keepTogether"))return e;let o=t.element;if("string"==typeof o){if(!(o=e.instance.popper.querySelector(o)))return e}else if(!e.instance.popper.contains(o))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),e;const n=e.placement.split("-")[0],{popper:r,reference:i}=e.offsets,s=-1!==["left","right"].indexOf(n),f=s?"height":"width",p=s?"Top":"Left",a=p.toLowerCase(),l=s?"left":"top",c=s?"bottom":"right",d=getOuterSizes(o)[f];i[c]-d<r[a]&&(e.offsets.popper[a]-=r[a]-(i[c]-d)),i[a]+d>r[c]&&(e.offsets.popper[a]+=i[a]+d-r[c]),e.offsets.popper=getClientRect(e.offsets.popper);const u=i[a]+i[f]/2-d/2,h=getStyleComputedProperty(e.instance.popper),m=parseFloat(h[`margin${p}`]),g=parseFloat(h[`border${p}Width`]);let b=u-e.offsets.popper[a]-m-g;return b=Math.max(Math.min(r[f]-d,b),0),e.arrowElement=o,e.offsets.arrow={[a]:Math.round(b),[l]:""},e}function getOppositeVariation(e){return"end"===e?"start":"start"===e?"end":e}var placements=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"];const validPlacements=placements.slice(3);function clockwise(e,t=!1){const o=validPlacements.indexOf(e),n=validPlacements.slice(o+1).concat(validPlacements.slice(0,o));return t?n.reverse():n}const BEHAVIORS={FLIP:"flip",CLOCKWISE:"clockwise",COUNTERCLOCKWISE:"counterclockwise"};function flip(e,t){if(isModifierEnabled(e.instance.modifiers,"inner"))return e;if(e.flipped&&e.placement===e.originalPlacement)return e;const o=getBoundaries(e.instance.popper,e.instance.reference,t.padding,t.boundariesElement,e.positionFixed);let n=e.placement.split("-")[0],r=getOppositePlacement(n),i=e.placement.split("-")[1]||"",s=[];switch(t.behavior){case BEHAVIORS.FLIP:s=[n,r];break;case BEHAVIORS.CLOCKWISE:s=clockwise(n);break;case BEHAVIORS.COUNTERCLOCKWISE:s=clockwise(n,!0);break;default:s=t.behavior}return s.forEach((f,p)=>{if(n!==f||s.length===p+1)return e;n=e.placement.split("-")[0],r=getOppositePlacement(n);const a=e.offsets.popper,l=e.offsets.reference,c=Math.floor,d="left"===n&&c(a.right)>c(l.left)||"right"===n&&c(a.left)<c(l.right)||"top"===n&&c(a.bottom)>c(l.top)||"bottom"===n&&c(a.top)<c(l.bottom),u=c(a.left)<c(o.left),h=c(a.right)>c(o.right),m=c(a.top)<c(o.top),g=c(a.bottom)>c(o.bottom),b="left"===n&&u||"right"===n&&h||"top"===n&&m||"bottom"===n&&g,w=-1!==["top","bottom"].indexOf(n),y=!!t.flipVariations&&(w&&"start"===i&&u||w&&"end"===i&&h||!w&&"start"===i&&m||!w&&"end"===i&&g),O=!!t.flipVariationsByContent&&(w&&"start"===i&&h||w&&"end"===i&&u||!w&&"start"===i&&g||!w&&"end"===i&&m),E=y||O;(d||b||E)&&(e.flipped=!0,(d||b)&&(n=s[p+1]),E&&(i=getOppositeVariation(i)),e.placement=n+(i?"-"+i:""),e.offsets.popper=_extends({},e.offsets.popper,getPopperOffsets(e.instance.popper,e.offsets.reference,e.placement)),e=runModifiers(e.instance.modifiers,e,"flip"))}),e}function keepTogether(e){const{popper:t,reference:o}=e.offsets,n=e.placement.split("-")[0],r=Math.floor,i=-1!==["top","bottom"].indexOf(n),s=i?"right":"bottom",f=i?"left":"top",p=i?"width":"height";return t[s]<r(o[f])&&(e.offsets.popper[f]=r(o[f])-t[p]),t[f]>r(o[s])&&(e.offsets.popper[f]=r(o[s])),e}function toValue(e,t,o,n){const r=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),i=+r[1],s=r[2];if(!i)return e;if(0===s.indexOf("%")){let e;switch(s){case"%p":e=o;break;case"%":case"%r":default:e=n}return getClientRect(e)[t]/100*i}if("vh"===s||"vw"===s){let e;return(e="vh"===s?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*i}return i}function parseOffset(e,t,o,n){const r=[0,0],i=-1!==["right","left"].indexOf(n),s=e.split(/(\+|\-)/).map(e=>e.trim()),f=s.indexOf(find(s,e=>-1!==e.search(/,|\s/)));s[f]&&-1===s[f].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");const p=/\s*,\s*|\s+/;let a=-1!==f?[s.slice(0,f).concat([s[f].split(p)[0]]),[s[f].split(p)[1]].concat(s.slice(f+1))]:[s];return(a=a.map((e,n)=>{const r=(1===n?!i:i)?"height":"width";let s=!1;return e.reduce((e,t)=>""===e[e.length-1]&&-1!==["+","-"].indexOf(t)?(e[e.length-1]=t,s=!0,e):s?(e[e.length-1]+=t,s=!1,e):e.concat(t),[]).map(e=>toValue(e,r,t,o))})).forEach((e,t)=>{e.forEach((o,n)=>{isNumeric(o)&&(r[t]+=o*("-"===e[n-1]?-1:1))})}),r}function offset(e,{offset:t}){const{placement:o,offsets:{popper:n,reference:r}}=e,i=o.split("-")[0];let s;return s=isNumeric(+t)?[+t,0]:parseOffset(t,n,r,i),"left"===i?(n.top+=s[0],n.left-=s[1]):"right"===i?(n.top+=s[0],n.left+=s[1]):"top"===i?(n.left+=s[0],n.top-=s[1]):"bottom"===i&&(n.left+=s[0],n.top+=s[1]),e.popper=n,e}function preventOverflow(e,t){let o=t.boundariesElement||getOffsetParent(e.instance.popper);e.instance.reference===o&&(o=getOffsetParent(o));const n=getSupportedPropertyName("transform"),r=e.instance.popper.style,{top:i,left:s,[n]:f}=r;r.top="",r.left="",r[n]="";const p=getBoundaries(e.instance.popper,e.instance.reference,t.padding,o,e.positionFixed);r.top=i,r.left=s,r[n]=f,t.boundaries=p;const a=t.priority;let l=e.offsets.popper;const c={primary(e){let o=l[e];return l[e]<p[e]&&!t.escapeWithReference&&(o=Math.max(l[e],p[e])),{[e]:o}},secondary(e){const o="right"===e?"left":"top";let n=l[o];return l[e]>p[e]&&!t.escapeWithReference&&(n=Math.min(l[o],p[e]-("right"===e?l.width:l.height))),{[o]:n}}};return a.forEach(e=>{const t=-1!==["left","top"].indexOf(e)?"primary":"secondary";l=_extends({},l,c[t](e))}),e.offsets.popper=l,e}function shift(e){const t=e.placement,o=t.split("-")[0],n=t.split("-")[1];if(n){const{reference:t,popper:r}=e.offsets,i=-1!==["bottom","top"].indexOf(o),s=i?"left":"top",f=i?"width":"height",p={start:{[s]:t[s]},end:{[s]:t[s]+t[f]-r[f]}};e.offsets.popper=_extends({},r,p[n])}return e}function hide(e){if(!isModifierRequired(e.instance.modifiers,"hide","preventOverflow"))return e;const t=e.offsets.reference,o=find(e.instance.modifiers,e=>"preventOverflow"===e.name).boundaries;if(t.bottom<o.top||t.left>o.right||t.top>o.bottom||t.right<o.left){if(!0===e.hide)return e;e.hide=!0,e.attributes["x-out-of-boundaries"]=""}else{if(!1===e.hide)return e;e.hide=!1,e.attributes["x-out-of-boundaries"]=!1}return e}function inner(e){const t=e.placement,o=t.split("-")[0],{popper:n,reference:r}=e.offsets,i=-1!==["left","right"].indexOf(o),s=-1===["top","left"].indexOf(o);return n[i?"left":"top"]=r[o]-(s?n[i?"width":"height"]:0),e.placement=getOppositePlacement(t),e.offsets.popper=getClientRect(n),e}var modifiers={shift:{order:100,enabled:!0,fn:shift},offset:{order:200,enabled:!0,fn:offset,offset:0},preventOverflow:{order:300,enabled:!0,fn:preventOverflow,priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:keepTogether},arrow:{order:500,enabled:!0,fn:arrow,element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:flip,behavior:"flip",padding:5,boundariesElement:"viewport",flipVariations:!1,flipVariationsByContent:!1},inner:{order:700,enabled:!1,fn:inner},hide:{order:800,enabled:!0,fn:hide},computeStyle:{order:850,enabled:!0,fn:computeStyle,gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:applyStyle,onLoad:applyStyleOnLoad,gpuAcceleration:void 0}},Defaults={placement:"bottom",positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:()=>{},onUpdate:()=>{},modifiers:modifiers};class Popper{constructor(e,t,o={}){this.scheduleUpdate=(()=>requestAnimationFrame(this.update)),this.update=debounce(this.update.bind(this)),this.options=_extends({},Popper.Defaults,o),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=e&&e.jquery?e[0]:e,this.popper=t&&t.jquery?t[0]:t,this.options.modifiers={},Object.keys(_extends({},Popper.Defaults.modifiers,o.modifiers)).forEach(e=>{this.options.modifiers[e]=_extends({},Popper.Defaults.modifiers[e]||{},o.modifiers?o.modifiers[e]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(e=>_extends({name:e},this.options.modifiers[e])).sort((e,t)=>e.order-t.order),this.modifiers.forEach(e=>{e.enabled&&isFunction(e.onLoad)&&e.onLoad(this.reference,this.popper,this.options,e,this.state)}),this.update();const n=this.options.eventsEnabled;n&&this.enableEventListeners(),this.state.eventsEnabled=n}update(){return update.call(this)}destroy(){return destroy.call(this)}enableEventListeners(){return enableEventListeners.call(this)}disableEventListeners(){return disableEventListeners.call(this)}}Popper.Utils=("undefined"!=typeof window?window:global).PopperUtils,Popper.placements=placements,Popper.Defaults=Defaults;