require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var s=e[n]=new t.Module(n);r[n][0].call(s.exports,i,s,s.exports)}return e[n].exports}function o(r){this.id=r,this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.isParcelRequire=!0,t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({3:[function(require,module,exports) {

},{}],6:[function(require,module,exports) {
"use strict";function e(e){return e[Math.floor(Math.random()*e.length)]}function t(e,t){var r="ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ",n=/([+-])(\d+)/g.exec(t),o="-"===n[1]?-parseInt(n[2]):parseInt(n[2]);return e.toUpperCase().split("").map(function(e){if(-1===r.indexOf(e))return e;var t=r.indexOf(e)+o;return t<0?t+=r.length:t>r.length-1&&(t-=r.length),r[t]}).join("")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.randomChoice=e,exports.cipher=t;
},{}],9:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}();function n(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var t=exports.BasePuzzle=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};n(this,t),this.state={running:!1,answer:null},this.elementSelectors=Object.assign({parent:"#puzzle"},e.elementSelectors),this.render=this.render.bind(this)}return e(t,[{key:"sendAnswer",value:function(){}},{key:"setup",value:function(){this.parentEl=document.querySelector(this.elementSelectors.parent),this.renderHTML()}},{key:"start",value:function(){this.state.running=!0,window.requestAnimationFrame(this.render)}},{key:"pause",value:function(){this.state.running=!1}},{key:"renderElement",value:function(e,n,t,r){var i=document.createElement(e),a=document.querySelector("#"+n);return i.id=n,i.innerHTML=t||"",a&&this.parentEl.removeChild(a),this.parentEl.appendChild(i),"function"==typeof r?r(i):i}},{key:"renderHTML",value:function(){this.renderElement("h1","puzzleName",this.name)}},{key:"render",value:function(){this.state.running&&this.canvas?(this.draw(),window.requestAnimationFrame(this.render)):this.canvas||console.warn("no canvas defined")}},{key:"draw",value:function(){console.warn("draw() not defined"),this.state.running=!1}}]),t}();
},{}],8:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Puzzle1=void 0;var e=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),t=function e(t,n,r){null===t&&(t=Function.prototype);var i=Object.getOwnPropertyDescriptor(t,n);if(void 0===i){var o=Object.getPrototypeOf(t);return null===o?void 0:e(o,n,r)}if("value"in i)return i.value;var s=i.get;return void 0!==s?s.call(r):void 0},n=require("./BasePuzzle");function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s=exports.Puzzle1=function(s){function a(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};r(this,a);var o=i(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,n));return o.cipherMessage=e,o.setting=t,o.name="Salakirjoitus",o.description="\n      Majavat lähettävät tietoa erityistä salakirjoitusavainta käyttäen. \n      Jokainen kirjain vaihdetaan aakkosissa "+o.setting.desc+" olevaan kirjaimeen. <br> \n      Siis esim.. "+o.setting.example+".",o.question="Vastaanotettu viesti: "+o.cipherMessage+" <br> <strong>Mikä oli viesti?</strong>",o.submit=o.submit.bind(o),o.setup(),o}return o(a,n.BasePuzzle),e(a,[{key:"submit",value:function(){var e=document.querySelector("input#puzzleInput"),t=document.querySelector("#puzzleAnswer");if(e.value){this.state.answer=e.value,e.value="";var n=this.checkAnswer(this.cipherMessage,this.state.answer),r=this.state.answer.split("").map(function(e,t){return n[t]?'<span class="correct">'+e+"</span>":'<span class="incorrect">'+e+"</span>"}).join("");t.innerHTML="Vastauksesi: <strong>"+r+"</strong>"}}},{key:"checkAnswer",value:function(e,t){var n=this;return t.toUpperCase().split("").map(function(t,r){return n.checkCharacter(e[r],t)})}},{key:"checkCharacter",value:function(e,t){return!(!e||!t||e!==this.cipher(t))}},{key:"cipher",value:function(e){var t=this.setting,n=t.characterSet,r=t.key,i=/([+-])(\d+)/g.exec(r),o="-"===i[1]?-parseInt(i[2]):parseInt(i[2]);if(-1===n.indexOf(e))return e;var s=n.indexOf(e)+o;return s<0?s+=n.length:s>n.length-1&&(s-=n.length),n[s]}},{key:"renderHTML",value:function(){t(a.prototype.__proto__||Object.getPrototypeOf(a.prototype),"renderHTML",this).call(this),this.renderElement("p","puzzleDescription",this.description),this.renderElement("p","puzzleQuestion",this.question),this.renderElement("p","puzzleAnswer"),this.renderElement("input","puzzleInput"),this.renderElement("button","puzzleSubmit","Tarkista").onclick=this.submit}}]),a}();
},{"./BasePuzzle":9}],10:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Puzzle2=void 0;var t=function(){return function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var r=[],i=!0,n=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(i=(a=s.next()).done)&&(r.push(a.value),!e||r.length!==e);i=!0);}catch(t){n=!0,o=t}finally{try{!i&&s.return&&s.return()}finally{if(n)throw o}}return r}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),e=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),r=function t(e,r,i){null===e&&(e=Function.prototype);var n=Object.getOwnPropertyDescriptor(e,r);if(void 0===n){var o=Object.getPrototypeOf(e);return null===o?void 0:t(o,r,i)}if("value"in n)return n.value;var a=n.get;return void 0!==a?a.call(i):void 0},i=require("./BasePuzzle");function n(t){if(Array.isArray(t)){for(var e=0,r=Array(t.length);e<t.length;e++)r[e]=t[e];return r}return Array.from(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var l={101:"riverTopBot",102:"riverLeftRight",103:"riverDiagTopBot",104:"riverDiagBotTop",205:"bridgeTopBot",206:"bridgeLeftRight",207:"bridgeDiagTopBot",208:"bridgeDiagBotTop",301:"lake",302:"tree",303:"treestump",304:"mushroom"},c=exports.Puzzle2=function(t){function n(t){o(this,n);var e=a(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,t));return e.name="Majavakartta",e.description="Majavakartassa esineen paikka ilmaistaan kahdella suluissa olevalla numerolla. Ensin rivin numero ja sitten sarakkeen numero.",e.question="",e.setting={rows:10,cols:10,objects:[[1,1,301],[2,5,304],[3,9,302],[9,6,303]]},e.state.matrix=Array(e.setting.rows*e.setting.cols).fill(null).map(function(t,r){var i=Math.floor(r/e.setting.cols),n=Math.floor(r%e.setting.cols);return new u(i,n,e.setting.objects.find(function(t){return t[0]===i+1&&t[1]===n+1}))}),e.submit=e.submit.bind(e),e.draw=e.draw.bind(e),e.canvasMouseHover=e.canvasMouseHover.bind(e),e.canvasMouseOut=e.canvasMouseOut.bind(e),e.canvasClick=e.canvasClick.bind(e),e.setup(),e}return s(n,i.BasePuzzle),e(n,[{key:"submit",value:function(){}},{key:"checkAnswer",value:function(){}},{key:"renderHTML",value:function(){r(n.prototype.__proto__||Object.getPrototypeOf(n.prototype),"renderHTML",this).call(this),this.renderElement("p","puzzleDescription",this.description),this.canvas=this.renderElement("canvas","puzzleCanvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.width=300,this.canvas.height=300,this.canvas.onmousemove=this.canvasMouseHover,this.canvas.onmouseout=this.canvasMouseOut,this.canvas.onclick=this.canvasClick,this.renderElement("br","puzzleSpacing"),this.renderElement("button","puzzleSubmit","Tarkista").onclick=this.submit,this.start()}},{key:"draw",value:function(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.renderMap()}},{key:"renderMap",value:function(){var t=this;this.state.matrix.forEach(function(e){e.render(t.ctx,t.ctx.canvas.clientWidth/t.setting.cols,t.ctx.canvas.clientHeight/t.setting.rows,t.mouseX,t.mouseY,t.state.lastClickedSpot)})}},{key:"canvasMouseHover",value:function(t){var e=this.canvas.getBoundingClientRect();this.mouseX=Math.floor(t.clientX-e.left),this.mouseY=Math.floor(t.clientY-e.top)}},{key:"canvasMouseOut",value:function(){this.mouseX=-1,this.mouseY=-1}},{key:"canvasClick",value:function(){var t=this;this.state.lastClickedSpot=null,this.state.matrix.forEach(function(e){e.isMouseHovering(t.mouseX,t.mouseY)&&(t.state.lastClickedSpot=e,console.log("Clicked on "+e.toString()))})}}]),n}(),u=function(){function r(t,e,i){o(this,r),this.row_0=t,this.row=t+1,this.col_0=e,this.col=e+1,this.objectType=Array.isArray(i)?i[2]:"number"==typeof i?i:null}return e(r,[{key:"render",value:function(t,e,r,i,o,a){var s=this.x=this.col_0*e,l=this.y=this.row_0*r;switch(this.rect=[s,l,e,r],this.isMouseHovering(i,o)&&(t.strokeStyle="#000000",t.strokeRect.apply(t,n(this.rect))),a&&a.row===this.row&&a.col===this.col&&(t.strokeStyle="#AAAAAA",t.strokeRect.apply(t,n(this.rect))),this.objectType){case 301:t.fillStyle="#0000FF",t.fillRect.apply(t,n(this.rect));break;case 302:t.fillStyle="#00FF00",t.fillRect.apply(t,n(this.rect));break;case 303:t.fillStyle="#9fc600",t.fillRect.apply(t,n(this.rect));break;case 304:t.fillStyle="#b26e1a",t.fillRect.apply(t,n(this.rect));break;default:t.fillStyle="#aaaaaa",t.beginPath(),t.arc(s+e/2,l+r/2,5,0,Math.PI+4*Math.PI/2),t.fill()}t.fillStyle="#000000"}},{key:"isMouseHovering",value:function(e,r){if(e>0&&r>0){var i=t(this.rect,4),n=i[0],o=i[1],a=i[2],s=i[3];return e>=n&&e<n+a&&r>=o&&r<o+s}return!1}},{key:"toString",value:function(){return(this.objectType?l[this.objectType]:null)+" ("+this.row+", "+this.col+")"}}]),r}();
},{"./BasePuzzle":9}],7:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./BasePuzzle");Object.defineProperty(exports,"BasePuzzle",{enumerable:!0,get:function(){return e.BasePuzzle}});var r=require("./Puzzle1");Object.defineProperty(exports,"Puzzle1",{enumerable:!0,get:function(){return r.Puzzle1}});var u=require("./Puzzle2");Object.defineProperty(exports,"Puzzle2",{enumerable:!0,get:function(){return u.Puzzle2}});
},{"./BasePuzzle":9,"./Puzzle1":8,"./Puzzle2":10}],4:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./lib/util"),a=require("./puzzles");function t(){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ",r=[{key:"+1",desc:"yksi askel eteenpäin",example:"A &#8594; B, B &#8594; C..., Ä &#8594; Ö, Ö &#8594; A",characterSet:t},{key:"+2",desc:"kaksi askelta eteenpäin",example:"A &#8594; C, B &#8594; D..., Ä &#8594; A, Ö &#8594; B",characterSet:t},{key:"-1",desc:"yksi askel taaksepäin",example:"A &#8594; Ö, B &#8594; A..., Ä &#8594; Å, Ö &#8594; Ä",characterSet:t},{key:"-2",desc:"kaksi askelta taaksepäin",example:"A &#8594; Ä, B &#8594; Ö..., Ä &#8594; Z, Ö &#8594; Å",characterSet:t}],s=(0,e.randomChoice)(r),c=(0,e.randomChoice)(["HEI MAAILMA"]),i=(0,e.cipher)(c,s.key);new a.Puzzle1(i,s)}exports.default=t;
},{"./lib/util":6,"./puzzles":7}],5:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./puzzles");function r(){new e.Puzzle2}exports.default=r;
},{"./puzzles":7}],2:[function(require,module,exports) {
"use strict";require("./index.css");var e=require("./initPuzzle1"),u=t(e),i=require("./initPuzzle2"),r=t(i);function t(e){return e&&e.__esModule?e:{default:e}}(0,r.default)();
},{"./index.css":3,"./initPuzzle1":4,"./initPuzzle2":5}]},{},[2])