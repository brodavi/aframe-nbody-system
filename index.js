var physics = require('aframe-physics-system')
physics.registerAll()

/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerSystem('nbody', {
  schema: {
    g: {type: 'int', default: 6.674}
  },
  init: function () {
    this.entities = []
  },
  tick: function (t, dt) {
    var self = this

    if (!self.entities) return

    // for every entity
    self.entities.map(function (me) {
      var initial = CANNON.Vec3.ZERO

      // reduce all vectors to other entities to one vector
      thisVector = self.entities.reduce(function (acc, other) {
        if (me === other) return acc

        // Get the vector pointing from me to other
        var meToOther = new CANNON.Vec3()
        other.body.position.vsub(me.body.position, meToOther)
        meToOther.normalize()

        // Get distance from me to other
        var distanceSquared = me.body.position.distanceSquared(other.body.position)

        // apply scalar
        var scaled = new CANNON.Vec3()
        meToOther.scale(self.data.g * me.body.mass * other.body.mass / distanceSquared, scaled)

        // add it to the rest
        var final = new CANNON.Vec3()
        scaled.vadd(acc, final)

        return final

      }, initial)

      // apply it
      me.body.applyForce(
        thisVector,
        new CANNON.Vec3().copy(me.getAttribute('position'))
      )
    })

  },
  registerMe: function (el) {
    this.entities.push(el)
  },
  unregisterMe: function (el) {
    var index = this.entities.indexOf(el);
    this.entities.splice(index, 1)
  }
});

/**
 * N-Body component for A-Frame.
 */
AFRAME.registerComponent('nbody', {
  schema: {},

  /**
   * Set if component needs multiple instancing.
   */
  multiple: false,

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    this.system.registerMe(this.el);
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) { },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () {
    this.system.unregisterMe(this.el);
  },

  /**
   * Called on each scene tick.
   */
  // tick: function (t) { },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () { },

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () { }
});
