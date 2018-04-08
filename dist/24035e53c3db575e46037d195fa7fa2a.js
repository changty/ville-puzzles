require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var s=e[n]=new t.Module(n);r[n][0].call(s.exports,i,s,s.exports)}return e[n].exports}function o(r){this.id=r,this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.isParcelRequire=!0,t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({6:[function(require,module,exports) {

},{}],13:[function(require,module,exports) {
"use strict";function e(e){return e[Math.floor(Math.random()*e.length)]}function t(e,t){var r=e.characterSet,n=e.key,o=/([+-])(\d+)/g.exec(n),s="-"===o[1]?-parseInt(o[2]):parseInt(o[2]);return t.toUpperCase().split("").map(function(e){if(-1===r.indexOf(e))return e;var t=r.indexOf(e)+s;return t<0?t+=r.length:t>r.length-1&&(t-=r.length),r[t]}).join("")}function r(e){return e.charAt(0).toUpperCase()+e.substr(1)}function n(e,t,n){var o=r(t);e.style["webkit"+o]=n,e.style["moz"+o]=n,e.style["ms"+o]=n,e.style["o"+o]=n}Object.defineProperty(exports,"__esModule",{value:!0}),exports.randomChoice=e,exports.cipher=t,exports.capitalize=r,exports.setVendorStyle=n;
},{}],16:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var n={"str-your-answer":"Vastauksesi","str-check-answer":"Tarkista","str-send-answer":"Lähetä","str-select":"Valitse","str-erase":"Poista"},r=exports.BasePuzzle=function(){function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t(this,r),this.options=Object.assign(n,e),this.state={answer:"",answerSent:!1},this.html={name:e["str-name"]},this.elementSelectors=Object.assign({parent:"#puzzle"},this.options.elementSelectors)}return e(r,[{key:"onSubmit",value:function(){}},{key:"sendAnswer",value:function(e){window.alert('Vastaus "'+this.state.answer+'" lähetetty!'),this.setState({answerSent:!0},e)}},{key:"setup",value:function(){this.parentEl=document.querySelector(this.elementSelectors.parent),this.renderHTML()}},{key:"renderElement",value:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:this.parentEl,a=document.createElement(e);if(a.id=t,n&&n.innerHTML?a.appendChild(n):n instanceof Array?n.map(function(e){a.appendChild(e)}):a.innerHTML=n||"",r){var s=document.querySelector("#"+t);s&&r.removeChild(s),r.appendChild(a)}return a}},{key:"renderHTML",value:function(){this.parentEl.innerHTML="",this.renderElement("h1","puzzleName",this.html.name)}},{key:"setState",value:function(e,t){var n=this.state;this.state=Object.assign({},n,e),"function"==typeof t?t():this.updateView()}},{key:"updateView",value:function(){}}]),r}();
},{}],17:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Puzzle1=void 0;var e=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),t=function e(t,n,r){null===t&&(t=Function.prototype);var i=Object.getOwnPropertyDescriptor(t,n);if(void 0===i){var s=Object.getPrototypeOf(t);return null===s?void 0:e(s,n,r)}if("value"in i)return i.value;var a=i.get;return void 0!==a?a.call(r):void 0};exports.makeCipherer=o;var n=require("./BasePuzzle"),r=require("../lib/util");function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function o(e){var t=e.characterSet,n=e.key,r=/([+-])(\d+)/g.exec(n),i="-"===r[1]?-parseInt(r[2]):parseInt(r[2]);function s(e){if(-1===t.indexOf(e))return e;var n=t.indexOf(e)+i;return n<0?n+=t.length:n>t.length-1&&(n-=t.length),t[n]}return function(e){if("string"==typeof e)return 1===e.length?s(e.toUpperCase()):e.toUpperCase().split("").map(s).join("")}}require("./Puzzle1.css");var u={"str-name":"Salakirjoitus","str-description":"\n    Majavat lähettävät tietoa erityistä salakirjoitusavainta käyttäen. \n    Jokainen kirjain vaihdetaan aakkosissa {{keyDesc}} olevaan kirjaimeen. <br> \n    Siis esim.. {{keyExample}}.","str-question":"Vastaanotettu viesti: {{cipherText}} <br> \n    <strong>Mikä oli viesti?</strong>"},c=exports.Puzzle1=function(c){function h(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};i(this,h);var n=s(this,(h.__proto__||Object.getPrototypeOf(h)).call(this,Object.assign(u,t)));return n.setting=e,n.cipher=o(e),n.ringRotationControl=0,n.ringDegreePerChar=360/e.characterSet.length,n.state={answer:"",check:[],currentCharIdx:0,done:!1,ringRotation:0,selectedCharIdx:0,submitted:!1},n.html.description=n.options["str-description"].replace("{{keyDesc}}",e.keyDesc).replace("{{keyExample}}",e.keyExample),n.setup(),n}return a(h,n.BasePuzzle),e(h,[{key:"setup",value:function(){t(h.prototype.__proto__||Object.getPrototypeOf(h.prototype),"setup",this).call(this),document.onkeydown=this.onKeyPress.bind(this)}},{key:"checkAnswer",value:function(e,t){var n=this;return t.toUpperCase().split("").map(function(t,r){return n.checkCharacter(e[r],t)})}},{key:"checkCharacter",value:function(e,t){return e&&t&&e===this.cipher(t)}},{key:"onSubmit",value:function(){if(this.canSubmit()){var e=this.state.answer,t=this.setting.cipherText,n=this.checkAnswer(t,e);this.setState({check:n,submitted:!0})}}},{key:"onSendAnswer",value:function(){this.canSend()&&this.sendAnswer()}},{key:"onPrev",value:function(){var e=this.state,t=e.ringRotation,n=e.selectedCharIdx,r=this.setting.characterSet;t-=1,n<=0?n=r.length-1:n-=1,this.setState({ringRotation:t,selectedCharIdx:n})}},{key:"onNext",value:function(){var e=this.state,t=e.ringRotation,n=e.selectedCharIdx;t+=1,n>=this.setting.characterSet.length-1?n=0:n+=1,this.setState({ringRotation:t,selectedCharIdx:n})}},{key:"onErase",value:function(){if(this.canErase()){var e=this.state,t=e.answer,n=e.currentCharIdx,r=this.setting.cipherText;for(t=t.slice(0,-1),n-=1;" "===r[n];)n-=1,t=t.slice(0,-1);this.setState({answer:t,currentCharIdx:n})}}},{key:"onSelect",value:function(){if(this.canSelect()){var e=this.state.selectedCharIdx,t=this.state,n=t.currentCharIdx,r=t.answer,i=this.setting,s=i.characterSet,a=i.cipherText;for(r+=s[e],n+=1;" "===a[n];)n+=1,r+=" ";this.setState({answer:r,currentCharIdx:n})}}},{key:"onKeyPress",value:function(e){switch(e.key){case"ArrowLeft":this.onPrev();break;case"ArrowRight":this.onNext();break;case"Enter":this.onSelect();break;case"Backspace":this.onErase();break;default:return}e.preventDefault()}},{key:"canSelect",value:function(){var e=this.state,t=e.answer,n=e.submitted,r=this.setting.cipherText;return!n&&t.length<r.length}},{key:"canErase",value:function(){var e=this.state,t=e.answer,n=e.currentCharIdx;return!e.submitted&&t.length>0&&n>0}},{key:"canSubmit",value:function(){var e=this.state,t=e.answer;return!e.submitted&&t.length>0}},{key:"canSend",value:function(){var e=this.state,t=e.answerSent;return e.submitted&&!t}},{key:"updateView",value:function(){t(h.prototype.__proto__||Object.getPrototypeOf(h.prototype),"updateView",this).call(this),this.updateAnswer(),this.updateButtons(),this.updateQuestion(),this.updateRing()}},{key:"updateRing",value:function(){var e=this.state,t=e.ringRotation,n=e.selectedCharIdx,i=t*this.ringDegreePerChar,s=document.querySelector("#puzzleRing #ringWrapper #characters");(0,r.setVendorStyle)(s,"transform","rotateY("+-i+"deg)"),setTimeout(function(){document.querySelectorAll("#puzzleRing #ringWrapper #characters .characterSet").forEach(function(e,t){t===n?e.classList.add("current-char"):e.classList.remove("current-char")})},60)}},{key:"updateQuestion",value:function(){document.querySelector("#puzzleQuestion").innerHTML=this.renderQuestion()}},{key:"updateAnswer",value:function(){document.querySelector("#puzzleAnswer").innerHTML=this.renderAnswer()}},{key:"updateButtons",value:function(){this.eraseButton.disabled=!this.canErase(),this.selectButton.disabled=!this.canSelect(),this.submitButton.disabled=!this.canSubmit(),this.sendAnswerButton.disabled=!this.canSend()}},{key:"renderHTML",value:function(){t(h.prototype.__proto__||Object.getPrototypeOf(h.prototype),"renderHTML",this).call(this),this.renderElement("p","puzzleDescription",this.html.description),this.renderElement("p","puzzleQuestion",this.renderQuestion()),this.renderElement("div","puzzleRing",this.renderCipherRing()),this.renderElement("p","puzzleAnswerLabel","Vastauksesi:"),this.renderElement("p","puzzleAnswer"),this.submitButton=this.renderElement("button","puzzleSubmit",this.options["str-check-answer"]),this.submitButton.onclick=this.onSubmit.bind(this),this.submitButton.disabled=!0,this.sendAnswerButton=this.renderElement("button","puzzleSend",this.options["str-send-answer"]),this.sendAnswerButton.onclick=this.onSendAnswer.bind(this),this.sendAnswerButton.disabled=!0,this.updateView()}},{key:"renderQuestion",value:function(){var e=this.state.currentCharIdx,t=this.setting.cipherText;return this.options["str-question"].replace("{{cipherText}}",t.split("").map(function(t,n){return'<span class="characterSet '+(n===e?"current-char":"")+'">'+t+"</span>"}).join(""))}},{key:"renderAnswer",value:function(){var e=this.state,t=e.answer,n=e.check;return e.submitted?t.split("").map(function(e,t){return'<span class="'+(n[t]?"correct":"incorrect")+'">'+e+"</span>"}).join(""):t}},{key:"renderCipherRing",value:function(){var e=this,t=this.setting.characterSet,n=this.renderElement("ul","characters",t.split("").map(function(t,n){var i=n*e.ringDegreePerChar,s=document.createElement("li");return s.classList.add("characterSet"),(0,r.setVendorStyle)(s,"transform","rotateY("+i+"deg) translateZ(300px)"),s.innerHTML=t,s}),null),i=this.renderElement("div","ringWrapper",n,null),s=this.renderElement("button","eraseButton",this.options["str-erase"],null),a=this.renderElement("button","prevButton","<<<",null),o=this.renderElement("button","nextButton",">>>",null),u=this.renderElement("button","selectButton",this.options["str-select"],null);s.disabled=!0,s.onclick=this.onErase.bind(this),a.onclick=this.onPrev.bind(this),o.onclick=this.onNext.bind(this),u.onclick=this.onSelect.bind(this);var c=this.renderElement("div","controls",[s,a,o,u]);return this.eraseButton=s,this.selectButton=u,[i,c]}}]),h}();
},{"./BasePuzzle":16,"../lib/util":13,"./Puzzle1.css":6}],18:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Puzzle2=void 0;var e=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),t=function e(t,n,r){null===t&&(t=Function.prototype);var i=Object.getOwnPropertyDescriptor(t,n);if(void 0===i){var o=Object.getPrototypeOf(t);return null===o?void 0:e(o,n,r)}if("value"in i)return i.value;var s=i.get;return void 0!==s?s.call(r):void 0},n=require("./BasePuzzle");function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}require("./Puzzle2.css");var s={101:"riverTopBot",102:"riverLeftRight",103:"riverDiagTopBot",104:"riverDiagBotTop",205:"bridgeTopBot",206:"bridgeLeftRight",207:"bridgeDiagTopBot",208:"bridgeDiagBotTop",301:"lake",302:"tree",303:"treestump",304:"mushroom"};function a(e,t){return{col:Math.floor(t%e),row:Math.floor(t/e)}}var u={"str-name":"Majavakartta","str-description":"Majavakartassa esineen paikka ilmaistaan kahdella suluissa olevalla numerolla. Ensin rivin numero ja sitten sarakkeen numero."},l=exports.Puzzle2=function(s){function l(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};r(this,l);var n=i(this,(l.__proto__||Object.getPrototypeOf(l)).call(this,Object.assign(u,t)));return n.setting=e,n.indexToRowCol=a.bind(null,e.cols),n.onSpotClick=n.onSpotClick.bind(n),n.onAnswerChange=n.onAnswerChange.bind(n),n.html.description=n.options["str-description"],n.html.question=n.options["str-question"],n.grid=Array(n.setting.rows*n.setting.cols).fill(null).map(function(e,t){var r=n.indexToRowCol(t);return new c(r.row,r.col,n.setting.objects.find(function(e){return e[0]===r.row+1&&e[1]===r.col+1}))}),n.setup(),n}return o(l,n.BasePuzzle),e(l,[{key:"onSendAnswer",value:function(){this.canSend()&&this.sendAnswer()}},{key:"onSpotClick",value:function(e,t){this.onAnswerChange(null,"rivi: "+t.row+", sarake: "+t.col)}},{key:"onAnswerChange",value:function(e,t){this.canEditAnswer()&&this.setState({answer:e?e.target.value:t||""})}},{key:"canSend",value:function(){var e=this.state,t=e.answer;return!e.answerSent&&t.length>0}},{key:"canEditAnswer",value:function(){return!this.state.answerSent}},{key:"updateView",value:function(){t(l.prototype.__proto__||Object.getPrototypeOf(l.prototype),"updateView",this).call(this),this.updateAnswer(),this.updateButtons()}},{key:"updateButtons",value:function(){this.sendAnswerButton.disabled=!this.canSend()}},{key:"updateAnswer",value:function(){this.textArea.value=this.state.answer,this.textArea.disabled=!this.canEditAnswer()}},{key:"renderHTML",value:function(){t(l.prototype.__proto__||Object.getPrototypeOf(l.prototype),"renderHTML",this).call(this),this.renderElement("p","puzzleDescription",this.html.description),this.renderElement("div","puzzleGrid",this.renderGrid()),this.renderElement("p","puzzleQuestion",this.html.question),this.renderElement("p","puzzleAnswerLabel","Vastauksesi: "),this.renderElement("div","puzzleInput",this.renderInputForm()),this.sendAnswerButton=this.renderElement("button","puzzleSend",this.options["str-send-answer"]),this.sendAnswerButton.onclick=this.onSendAnswer.bind(this),this.sendAnswerButton.disabled=!0,this.updateView()}},{key:"renderGrid",value:function(){var e=this,t=this.grid.map(function(t){return t.renderHTML({onClick:e.onSpotClick})});return this.renderElement("div","gridWrapper",t,null)}},{key:"renderInputForm",value:function(){var e=document.createElement("textarea");return e.onchange=this.onAnswerChange,e.onkeyup=this.onAnswerChange,this.textArea=e,this.renderElement("form","inputForm",[e],null)}}]),l}(),c=function(){function t(e,n,i){r(this,t),this.col_0=n,this.col=n+1,this.row_0=e,this.row=e+1,this.objectType=Array.isArray(i)?i[2]:"number"==typeof i?i:null}return e(t,[{key:"renderHTML",value:function(e){var t=this,n=e.onClick,r=document.createElement("div");return r.className="spot",this.objectType?r.classList.add(s[this.objectType]):r.classList.add("empty"),r.style.gridColumn=this.col,r.style.gridRow=this.row,r.innerHTML=this.objectType?s[this.objectType]:"&bull;",1===this.row&&r.appendChild(this.renderIndexingNumber("col",this.col)),1===this.col&&r.appendChild(this.renderIndexingNumber("row",this.row)),r.onclick=function(e){return n(e,t)},r}},{key:"renderIndexingNumber",value:function(e,t){var n=document.createElement("span");return n.className="indexingNumber",n.classList.add(e),n.innerHTML=t,n}},{key:"toString",value:function(){return(this.objectType?s[this.objectType]:null)+" ("+this.row+", "+this.col+")"}}]),t}();
},{"./BasePuzzle":16,"./Puzzle2.css":6}],19:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Puzzle3=void 0;var t=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),e=function t(e,n,o){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,n);if(void 0===r){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,n,o)}if("value"in r)return r.value;var s=r.get;return void 0!==s?s.call(o):void 0},n=require("./BasePuzzle");function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var s={"str-name":"Drag & Drop"},u=exports.Puzzle3=function(u){function a(t,e){o(this,a);var n=r(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,Object.assign(s,e)));return n.state.submitted=!1,n.setting=t,n.setup(),n}return i(a,n.BasePuzzle),t(a,[{key:"checkAnswer",value:function(){}},{key:"onSubmit",value:function(){this.canSubmit()&&this.setState({submitted:!0})}},{key:"onSendAnswer",value:function(){this.canSend()&&this.sendAnswer()}},{key:"canSubmit",value:function(){return!this.state.submitted}},{key:"canSend",value:function(){return!this.state.answerSent}},{key:"updateView",value:function(){e(a.prototype.__proto__||Object.getPrototypeOf(a.prototype),"updateView",this).call(this),this.updateButtons()}},{key:"updateButtons",value:function(){this.submitButton.disabled=!this.canSubmit(),this.sendAnswerButton.disabled=!this.canSend()}},{key:"renderHTML",value:function(){e(a.prototype.__proto__||Object.getPrototypeOf(a.prototype),"renderHTML",this).call(this),this.submitButton=this.renderElement("button","puzzleSubmit",this.options["str-check-answer"]),this.submitButton.onclick=this.onSubmit.bind(this),this.submitButton.disabled=!0,this.sendAnswerButton=this.renderElement("button","puzzleSend",this.options["str-send-answer"]),this.sendAnswerButton.onclick=this.onSendAnswer.bind(this),this.sendAnswerButton.disabled=!0,this.updateView()}}]),a}();
},{"./BasePuzzle":16}],15:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./BasePuzzle");Object.defineProperty(exports,"BasePuzzle",{enumerable:!0,get:function(){return e.BasePuzzle}});var r=require("./Puzzle1");Object.defineProperty(exports,"Puzzle1",{enumerable:!0,get:function(){return r.Puzzle1}}),Object.defineProperty(exports,"makeCipherer",{enumerable:!0,get:function(){return r.makeCipherer}});var t=require("./Puzzle2");Object.defineProperty(exports,"Puzzle2",{enumerable:!0,get:function(){return t.Puzzle2}});var u=require("./Puzzle3");Object.defineProperty(exports,"Puzzle3",{enumerable:!0,get:function(){return u.Puzzle3}});
},{"./BasePuzzle":16,"./Puzzle1":17,"./Puzzle2":18,"./Puzzle3":19}],7:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./lib/util"),a=require("./puzzles");function k(){var k=(0,e.randomChoice)([{key:"+1",keyDesc:"yksi askel eteenpäin",keyExample:"A &#8594; B, B &#8594; C..., Ä &#8594; Ö, Ö &#8594; A"},{key:"+2",keyDesc:"kaksi askelta eteenpäin",keyExample:"A &#8594; C, B &#8594; D..., Ä &#8594; A, Ö &#8594; B"},{key:"-1",keyDesc:"yksi askel taaksepäin",keyExample:"A &#8594; Ö, B &#8594; A..., Ä &#8594; Å, Ö &#8594; Ä"},{key:"-2",keyDesc:"kaksi askelta taaksepäin",keyExample:"A &#8594; Ä, B &#8594; Ö..., Ä &#8594; Z, Ö &#8594; Å"}]);k.characterSet="ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";k.cipherText=(0,a.makeCipherer)(k)((0,e.randomChoice)(["HEI MAAILMA","JS ROKKAA","YLIOPISTO ON PARAS"]));return new a.Puzzle1(k,{})}exports.default=k;
},{"./lib/util":13,"./puzzles":15}],10:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./lib/util"),a=require("./puzzles");function s(){var s={"str-question":(0,e.randomChoice)(["Kirjoita tai klikkaa missä puunkanto sijaitsee.","Majavan talo sijaitsee neljä askelta sienen alapuolella ja siitä kaksi askelta oikealle. <strong>Missä rivissä ja sarakkeessa Majavan talo sijaitsee?</strong>"])};return new a.Puzzle2({rows:10,cols:10,objects:[[1,1,301],[2,5,304],[3,9,302],[9,6,303]]},s)}exports.default=s;
},{"./lib/util":13,"./puzzles":15}],8:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./puzzles");function r(){return new e.Puzzle3}exports.default=r;
},{"./puzzles":15}],4:[function(require,module,exports) {
"use strict";require("./index.css");var e=require("./initPuzzle1"),u=c(e),i=require("./initPuzzle2"),n=c(i),t=require("./initPuzzle3"),l=c(t);function c(e){return e&&e.__esModule?e:{default:e}}document.querySelector("#initPuzzle1").onclick=function(){window.puzzle=(0,u.default)()},document.querySelector("#initPuzzle2").onclick=function(){window.puzzle=(0,n.default)()},document.querySelector("#initPuzzle3").onclick=function(){window.puzzle=(0,l.default)()};
},{"./index.css":6,"./initPuzzle1":7,"./initPuzzle2":10,"./initPuzzle3":8}]},{},[4])