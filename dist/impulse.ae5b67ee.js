parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"W4mB":[function(require,module,exports) {
AFRAME.registerComponent("impulse",{schema:{on:{default:""},force:{type:"vec3",default:{x:1,y:1,z:1}},position:{type:"vec3",default:{x:1,y:1,z:1}}},multiple:!0,init:function(){},update:function(e){const t=this.data,n=this.el;t.on?n.addEventListener(t.on,function(e){if(e.detail.clicker&&n.body){const e=new THREE.Vector3(t.force.x,t.force.y,t.force.z),o=new THREE.Vector3(t.position.x,t.position.y,t.position.z);n.body.applyImpulse(e,o)}}):console.log(t)},remove:function(){const e=this.data,t=this.el;e.event&&t.removeEventListener(e.event,this.eventHandlerFn)}});
},{}]},{},["W4mB"], null)
//# sourceMappingURL=/impulse.ae5b67ee.js.map