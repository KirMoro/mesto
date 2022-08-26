(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=e.name,this._link=e.link,this._id=e._id,this._likes=e.likes,this._userId=e.currentUser,this._ownerCardId=e.owner._id,this._cardSelector=n,this._handleCardClick=r.onClick,this._handleTrashBtnClick=r.onDelete,this._handleLikeClick=r.onlike,this._getElement(),this._trashBtn=this._element.querySelector(".elements__trash-button"),this._likeElement=this._element.querySelector(".elements__like-button"),this._likeCounter=this._element.querySelector(".elements__like-counter")}var n,r;return n=t,(r=[{key:"_getElement",value:function(){var e=document.querySelector(this._cardSelector).content.querySelector(".elements__item").cloneNode(!0);this._element=e}},{key:"_isDelete",value:function(){this._ownerCardId===this._userId||this._trashBtn.remove()}},{key:"_isLiked",value:function(){var e=this;this._likes.some((function(t){return t._id===e._userId}))&&this._likeElement.classList.add("elements_like-button_active")}},{key:"_toggleLike",value:function(e){var t=this;e.likes.some((function(e){return e._id===t._userId}))?this._likeCounter.textContent=e.likes.length:this._likeCounter.textContent=Math.max(0,e.likes.length-1),this._likeElement.classList.toggle("elements_like-button_active")}},{key:"_setEventListeners",value:function(){var e=this;this._likeElement.addEventListener("click",(function(){e._handleLikeClick(e._id,e._likeElement,e._likeCounter,e._toggleLike.bind(e))})),this._element.querySelector(".elements__trash-button").addEventListener("click",(function(){e._handleTrashBtnClick(e._id,e._element)})),this._element.querySelector(".elements__image").addEventListener("click",(function(){e._handleCardClick(e._link,e._name)}))}},{key:"generateCard",value:function(){var e=this._element.querySelector(".elements__image");return this._setEventListeners(),this._likeCounter.textContent=this._likes.length,this._element.querySelector(".elements__title").textContent=this._name,e.src=this._link,e.alt=this._name,this._isDelete(),this._isLiked(),this._element}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formElement=document.querySelector(n),this._fieldsSelector=t.fieldsSelector,this._fieldsetList=Array.from(this._formElement.querySelectorAll(this._fieldsSelector)),this._inputSelector=t.inputList,this._buttonElement=t.buttonElement,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._submitButton=this._formElement.querySelector(this._buttonElement)}var t,r;return t=e,(r=[{key:"_showInputError",value:function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(this._inputErrorClass),r.textContent=n,r.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(this._inputErrorClass),n.classList.remove(this._errorClass),n.textContent=""}},{key:"_checkInputValidity",value:function(e,t){t.validity.valid?this._hideInputError(e,t):this._showInputError(e,t,t.validationMessage)}},{key:"_hasInvalidInput",value:function(e){return e.some((function(e){return!e.validity.valid}))}},{key:"_toggleButtonState",value:function(e){this._hasInvalidInput(e)?(this._submitButton.classList.add(this._inactiveButtonClass),this._submitButton.setAttribute("disabled",!0)):(this._submitButton.classList.remove(this._inactiveButtonClass),this._submitButton.removeAttribute("disabled"))}},{key:"clearInputsError",value:function(){var e=this;this._inputList.forEach((function(t){e._hideInputError(e._formElement,t),t.value="",e._toggleButtonState(e._inputList)}))}},{key:"_setEventListeners",value:function(e){var t=this;this._inputList.forEach((function(n){n.addEventListener("input",(function(){t._checkInputValidity(e,n),t._toggleButtonState(t._inputList)}))}))}},{key:"enableSubmitBtn",value:function(){this._submitButton.classList.remove(this._inactiveButtonClass),this._submitButton.removeAttribute("disabled")}},{key:"enableValidation",value:function(){var e=this;this._formElement.addEventListener("submit",(function(e){e.preventDefault()})),this._fieldsetList.forEach((function(t){e._setEventListeners(t)}))}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._item=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"addItem",value:function(e){this._container.prepend(e)}},{key:"deleteItem",value:function(e){e.remove()}},{key:"renderItems",value:function(){var e=this;this._item.forEach((function(t){e._renderer(t)}))}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("mousedown",(function(t){t.target===t.currentTarget&&e.close()})),this._popup.querySelector(".popup__close-button").addEventListener("click",(function(){e.close()}))}},{key:"open",value:function(){document.addEventListener("keydown",this._handleEscClose),this._popup.classList.add("popup_opened")}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}}])&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e,t){return s=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},s(e,t)}function f(e,t){if(t&&("object"===l(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return p(e)}function p(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function h(){return h="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=_(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},h.apply(this,arguments)}function _(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=y(e)););return e}function y(e){return y=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},y(e)}var d=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&s(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=y(r);if(o){var n=y(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return f(this,e)});function u(e){var t,n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,e))._popupImageCard=n._popup.querySelector(".popup__image"),n._popupCapture=n._popup.querySelector(".popup__capture"),h((t=p(n),y(u.prototype)),"setEventListeners",t).call(t),n}return t=u,(n=[{key:"open",value:function(e,t){this._popupImageCard.src=e,this._popupImageCard.alt=t,this._popupCapture.textContent=t,h(y(u.prototype),"open",this).call(this)}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(a);function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function b(){return b="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=k(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},b.apply(this,arguments)}function k(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=w(e)););return e}function g(e,t){return g=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},g(e,t)}function E(e,t){if(t&&("object"===v(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function w(e){return w=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},w(e)}var S=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&g(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=w(r);if(o){var n=w(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return E(this,e)});function u(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,e))._formSubmitHandler=t,n._form=n._popup.querySelector(".form"),n._inputList=n._form.querySelectorAll(".form__field"),n.setEventListeners(),n}return t=u,(n=[{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"setEventListeners",value:function(){var e=this;this._form.addEventListener("submit",(function(t){t.preventDefault(),e._formSubmitHandler(e._getInputValues())})),b(w(u.prototype),"setEventListeners",this).call(this)}},{key:"setSavingMode",value:function(){this._form.querySelector(".form__submit-button").textContent="Сохранение..."}},{key:"removeSavingMode",value:function(){this._form.querySelector(".form__submit-button").textContent="Сохранить"}},{key:"close",value:function(){b(w(u.prototype),"close",this).call(this),this._form.reset()}}])&&m(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(a);function C(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var O=function(){function e(t){var n=t.profileNameSelector,r=t.profileAboutSelector,o=t.profileAvatar;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._profileName=document.querySelector(n),this._profileAbout=document.querySelector(r),this._profileAvatar=document.querySelector(o)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._profileName.textContent,about:this._profileAbout.textContent}}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.about;this._profileName.textContent=t,this._profileAbout.textContent=n}},{key:"setUserAvatar",value:function(e){var t=e.avatar;this._profileAvatar.src=t}}])&&C(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function L(e){return L="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},L(e)}function j(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function P(){return P="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=I(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},P.apply(this,arguments)}function I(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=B(e)););return e}function q(e,t){return q=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},q(e,t)}function A(e,t){if(t&&("object"===L(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function B(e){return B=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},B(e)}var R=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&q(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=B(r);if(o){var n=B(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return A(this,e)});function u(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,e))._formSubmitHandler=t,n._form=n._popup.querySelector(".form"),n.setEventListeners(),n}return t=u,(n=[{key:"open",value:function(e,t){P(B(u.prototype),"open",this).call(this,e),this._id=e,this._element=t}},{key:"setEventListeners",value:function(){var e=this;this._form.addEventListener("submit",(function(t){t.preventDefault(),e._formSubmitHandler(e._id,e._element)})),P(B(u.prototype),"setEventListeners",this).call(this)}}])&&j(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(a);function T(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var x=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=t.baseUrl,this._headers=t.headers,this._token=t.headers.authorization,this._content_type="application/json",this._fetch=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;return fetch("".concat(n._baseUrl,"/").concat(e),{method:t,headers:{authorization:n._token,"content-type":n._content_type},body:JSON.stringify(r)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){return e}))}}var t,n;return t=e,(n=[{key:"getInitialCards",value:function(){return this._fetch("cards")}},{key:"getProfileInfo",value:function(){return this._fetch("users/me")}},{key:"setProfileInfo",value:function(e){return this._fetch("users/me","PATCH",e)}},{key:"setProfileAvatar",value:function(e){var t=e.avatar;return this._fetch("users/me/avatar","PATCH",{avatar:t})}},{key:"setNewCard",value:function(e){return this._fetch("cards","POST",e)}},{key:"deleteCard",value:function(e){return this._fetch("cards/".concat(e),"DELETE")}},{key:"addLike",value:function(e){return this._fetch("cards/likes/".concat(e),"PUT")}},{key:"removeLike",value:function(e){return this._fetch("cards/likes/".concat(e),"DELETE")}}])&&T(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),U=document.querySelector(".profile__edit-button"),D=document.querySelector(".profile__add-button"),M=document.querySelector(".profile__edit-avatar-button"),V=document.querySelector(".form__field_type_name"),N=document.querySelector(".form__field_type_about"),H={profileNameSelector:".profile__title",profileAboutSelector:".profile__subtitle",profileAvatar:".profile__avatar"},z={fieldsSelector:".form__fields",inputList:".form__field",buttonElement:".form__submit-button",inactiveButtonClass:"form__submit-button_disabled",inputErrorClass:"form__field_type_error",errorClass:"form__field-error_active"};function G(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var J=new x({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-48",headers:{authorization:"6dcd6a5f-9295-4e62-a1cd-62fe426f6415","Content-Type":"application/json"}});Promise.all([J.getProfileInfo(),J.getInitialCards()]).then((function(e){var n,o,u=(o=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],u=!0,a=!1;try{for(n=n.call(e);!(u=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);u=!0);}catch(e){a=!0,o=e}finally{try{u||null==n.return||n.return()}finally{if(a)throw o}}return i}}(n,o)||function(e,t){if(e){if("string"==typeof e)return G(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?G(e,t):void 0}}(n,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}());return function(e){var n=e.profile,o=e.cards,u=function(e,n){return new t(e,n,{onClick:function(e,t){v.open(e,t)},onDelete:function(e,t){y.open(e,t)},onlike:function(e,t,n,r){t.classList.contains("elements_like-button_active")?J.removeLike(e).then((function(e){return r(e)})).catch((function(e){console.log(e)})):J.addLike(e).then((function(e){return r(e)})).catch((function(e){console.log(e)}))}}).generateCard()};U.addEventListener("click",(function(){var e;p.open(),c.clearInputsError(),c.enableSubmitBtn(),e=l.getUserInfo(),V.value=e.name,N.value=e.about})),D.addEventListener("click",(function(){h.open(),s.clearInputsError()})),M.addEventListener("click",(function(){_.open(),f.clearInputsError()})),J.getProfileInfo().then((function(e){l.setUserInfo(e),l.setUserAvatar(e)})).catch((function(e){console.log(e)}));var a=new i({items:o,renderer:function(e){e.currentUser=n._id,a.addItem(u(e,"#item-template"))}},".elements");a.renderItems();var l=new O(H),c=new r(z,".form_type_edit");c.enableValidation();var s=new r(z,".form_type_add");s.enableValidation();var f=new r(z,".form_type_add-avatar");f.enableValidation();var p=new S(".popup_type_edit",(function(e){p.setSavingMode(),J.setProfileInfo(e).then((function(e){l.setUserInfo(e),p.close()})).catch((function(e){console.log(e)})).finally((function(){return p.removeSavingMode()}))})),h=new S(".popup_type_add",(function(e){h.setSavingMode(),J.setNewCard(e).then((function(e){e.currentUser=n._id,a.addItem(u(e,"#item-template")),h.close()})).catch((function(e){console.log(e)})).finally((function(){return h.removeSavingMode()}))})),_=new S(".popup_type_add-avatar",(function(e){_.setSavingMode(),J.setProfileAvatar(e).then((function(e){l.setUserAvatar(e),_.close()})).catch((function(e){console.log(e)})).finally((function(){return _.removeSavingMode()}))})),y=new R(".popup_type_confirm",(function(e,t){J.deleteCard(e).then((function(){a.deleteItem(t),y.close()})).catch((function(e){console.log(e)}))})),v=new d(".popup_type_image")}({profile:u[0],cards:u[1]})})).catch((function(e){console.log(e)}))})();