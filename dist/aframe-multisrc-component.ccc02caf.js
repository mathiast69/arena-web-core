parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"gt3I":[function(require,module,exports) {
AFRAME.registerComponent("multisrc",{dependencies:["material"],schema:{srcs:{default:[],parse:function(e){return 0==e.length?"":e.split(",")}},srcspath:{type:"string",default:""}},init:function(){this.sides=this.el.getObject3D("mesh").geometry.groups.length,this.makeMaterials(),this.styleMaterials(),this.el.getObject3D("mesh").material=this.materials,this.materialListener()},makeMaterials:function(){for(this.materials=[],i=0;i<this.sides;i++)this.materials.push(new THREE.MeshStandardMaterial({name:"material-"+i}))},update:function(){this.parseSrcs(),this.addTextures()},parseSrcs:function(){for(this.textures=[],i=0;i<this.sides;i++){var e;e=""==this.data.srcs?this.data["src"+i]:this.data.srcs[i],this.textures.push({}),this.textures[i].srcIndex="src"+i,this.textures[i].url=t(this.data,e,i).url,this.textures[i].type=t(this.data,e,i).type,this.textures[i].srcInline=t(this.data,e,i).inline,this.textures[i].assetId=t(this.data,e,i).assetId}function t(e,t,i){var a,n,s,r,l,o=t;void 0===o||""==o?(n="",s="",r="",l=""):(null===document.getElementById(o.replace("#",""))?(a=o,r=!0):(l=o,a=document.getElementById(o.replace("#","")).src,r=!1),s=(n=e.srcspath+a).includes(".jpg")||n.includes(".jpeg")||n.includes(".png")||n.includes(".gif")?"image":"video");return{url:n,type:s,inline:r,assetId:l}}},addTextures:function(){for(i=0;i<this.textures.length;i++){var e=this.textures[i],t=this.materials[i];if(""==e.url)t.map=null,t.needsUpdate=!0;else if("image"==e.type){var a=new THREE.TextureLoader;t.map=a.load(e.url),t.needsUpdate=!0}else{var n;e.srcInline?((n=document.createElement("video")).src=e.url,n.crossOrigin="anonymous",n.loop=!0,n.preload="auto",n.load(),n.play()):((n=document.getElementById(e.assetId.replace("#",""))).src=e.url,n.load());var s=new THREE.VideoTexture(n);s.needsUpdate,s.minFilter=THREE.LinearFilter,s.magFilter=THREE.LinearFilter,s.format=THREE.RGBFormat,t.map=s,t.needsUpdate=!0}}},materialListener:function(){var e=this;this.compChange=function(t){"material"==t.detail.name&&this.isAnimating?(e.reduceMaterialChangedThrottle(0),e.styleMaterials()):"material"==t.detail.name&&e.styleMaterials()},this.el.addEventListener("componentchanged",this.compChange),this.isAnimating=!1,this.animationCount=0,this.materialChangedByAnimation=function(t){"animationbegin"==t.type||"animationstart"==t.type?(this.isAnimating=!0,e.animationCount++):"animationcomplete"!=t.type&&"animationend"!=t.type||(this.isAnimating=!1,e.animationCount--,0==e.animationCount&&e.reduceMaterialChangedThrottle(200),"animationcomplete"==t.type&&e.el.components[t.detail.name].animation.reset())};["animationbegin","animationstart","animationcomplete","animationend"].forEach(function(t){e.el.addEventListener(t,e.materialChangedByAnimation)})},styleMaterials:function(){var e=this.el.components.material.material;for(i=0;i<this.sides;i++){var t=this.materials[i],a=t,n=e,s=AFRAME.utils.diff(a,n);for(var r in s)t.hasOwnProperty(r)&&("uuid"==r||"map"==r||"name"==r||(t[r]=e[r]))}},granularChange:function(e){return this.el.getObject3D("mesh").material[e]},reduceMaterialChangedThrottle:function(e){var t=this.el.components.material;t.throttledEmitComponentChanged=AFRAME.utils.throttle(function(){t.el.emit("componentchanged",t.evtDetail,!1)},e)},updateSchema:function(){var e=this.el.getObject3D("mesh").geometry.groups.length,t={};for(i=0;i<e;i++)t["src"+i]={type:"string",default:""};this.extendSchema(t)},remove:function(){var e=this.el.components.material.material;this.el.getObject3D("mesh").material=e,this.el.removeEventListener("componentchanged",this.compChange);["animationbegin","animationstart","animationcomplete","animationend"].forEach(function(e){this.el.addEventListener(e,this.materialChangedByAnimation)}),this.reduceMaterialChangedThrottle(200)}});
},{}]},{},["gt3I"], null)
//# sourceMappingURL=/aframe-multisrc-component.ccc02caf.js.map