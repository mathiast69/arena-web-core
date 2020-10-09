// arena-aframemods.js
//
// Direct modifications to AFRAME components to
// improve UX in the ARENA
// maybe one day move this to custom AFRAME build?

const CLAMP_VELOCITY = 0.00001;
const MAX_DELTA = 0.2;
AFRAME.components['wasd-controls'].Component.prototype.updateVelocity = function (delta) {
    var acceleration;
    var adAxis;
    var adSign;
    var data = this.data;
    var keys = this.keys;
    var velocity = this.velocity;
    var wsAxis;
    var wsSign;

    adAxis = data.adAxis;
    wsAxis = data.wsAxis;

    // If FPS too low, reset velocity.
    if (delta > MAX_DELTA) {
        velocity[adAxis] = 0;
        velocity[wsAxis] = 0;
        return;
    }

    // https://gamedev.stackexchange.com/questions/151383/frame-rate-independant-movement-with-acceleration
    var scaledEasing = Math.pow(1 / this.easing, delta * 60);
    // Velocity Easing.
    if (velocity[adAxis] !== 0) {
        velocity[adAxis] = velocity[adAxis] * scaledEasing;
    }
    if (velocity[wsAxis] !== 0) {
        velocity[wsAxis] = velocity[wsAxis] * scaledEasing;
    }

    // Clamp velocity easing.
    if (Math.abs(velocity[adAxis]) < CLAMP_VELOCITY) { velocity[adAxis] = 0; }
    if (Math.abs(velocity[wsAxis]) < CLAMP_VELOCITY) { velocity[wsAxis] = 0; }

    if (!data.enabled) { return; }

    // Update velocity using keys pressed.
    acceleration = data.acceleration;
    if (data.adEnabled) {
        adSign = data.adInverted ? -1 : 1;
        if (keys.KeyA) { velocity[adAxis] -= adSign * acceleration * delta; }
        if (keys.KeyD) { velocity[adAxis] += adSign * acceleration * delta; }
    }
    if (data.wsEnabled) {
        wsSign = data.wsInverted ? -1 : 1;
        if (keys.KeyW || keys.ArrowUp) { velocity[wsAxis] -= wsSign * acceleration * delta; }
        if (keys.KeyS || keys.ArrowDown) { velocity[wsAxis] += wsSign * acceleration * delta; }
    }
}

const MAX_DELTA_LOOK = 0.015;
const PI_2 = Math.PI / 2;
keysPressed = {};

AFRAME.registerComponent("look-controls-arrow", {
    init: function () {
        this.attachKeyEventListeners();
    },

    attachKeyEventListeners: function () {
        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
    },

    removeKeyEventListeners: function () {
        window.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('keyup', this.onKeyUp);
    },

    onKeyDown: function (event) {
        keysPressed[event.key] = true;
    },

    onKeyUp: function (event) {
        delete keysPressed[event.key];
    },

    tick: function (time, delta) {
        if (!globals || !globals.sceneObjects.myCamera) return;

        const keys = keysPressed;
        if (keys['ArrowLeft']) globals.sceneObjects.myCamera.components['look-controls'].yawObject.rotation.y += MAX_DELTA_LOOK;
        if (keys['ArrowRight']) globals.sceneObjects.myCamera.components['look-controls'].yawObject.rotation.y -= MAX_DELTA_LOOK;

        // if (keys['ArrowUp']) globals.sceneObjects.myCamera.components['look-controls'].pitchObject.rotation.x += MAX_DELTA_LOOK;
        // if (keys['ArrowDown']) globals.sceneObjects.myCamera.components['look-controls'].pitchObject.rotation.x -= MAX_DELTA_LOOK;
        // globals.sceneObjects.myCamera.components['look-controls'].pitchObject.rotation.x =
        //     Math.max(-PI_2, Math.min(PI_2, globals.sceneObjects.myCamera.components['look-controls'].pitchObject.rotation.x));
    }
});

// emit model onProgress (loading) event for gltf models
AFRAME.components['gltf-model'].Component.prototype.update = function () {
    var self = this;
    var el = this.el;
    var src = this.data;

    if (!src) { return; }

    this.remove();

    this.loader.load(src, function gltfLoaded (gltfModel) {
        self.model = gltfModel.scene || gltfModel.scenes[0];
        self.model.animations = gltfModel.animations;
        el.setObject3D('mesh', self.model);
        el.emit('model-loaded', {format: 'gltf', model: self.model});
    }, function gltfProgress(xhr) {
        el.emit("model-progress", {src: src, progress: (xhr.loaded / xhr.total * 100) })
    }, function gltfFailed (error) {
        var message = (error && error.message) ? error.message : 'Failed to load glTF model';
        console.error(message);
        el.emit('model-error', {format: 'gltf', src: src});
    });
}