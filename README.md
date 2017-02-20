## aframe-nbody-component

![n-body simulation](/screencast.gif "n-body simuation")

A [n-body](https://en.wikipedia.org/wiki/N-body_simulation) system for [A-Frame](https://aframe.io). Depends on [aframe-physics-system](https://github.com/donmccurdy/aframe-physics-system)

Use this system if you want to do a simulation of celestial bodies. Only use it if you really feel like tweaking a lot of values. This n-body system only does a direct gravitational n-body simulation. Does not take relativity into consideration. There are no calculation optimizations. Barnes–Hut simulation coming in the future.

Stars sky image from: http://www.chrusion.com/public_files/tycho/Stars_Tycho2_3000.png

### API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| g        | Gravitational constant of the universe             |               |

### Installation

Note you have to turn off gravity from the aframe-physics-system for this to work.

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-nbody-system/dist/aframe-nbody-system.min.js"></script>
</head>

<body>
  <a-scene physics="gravity: 0" nbody="g: 9">
    <a-entity nbody material="color: #0000ff" geometry="primitive: sphere; radius: 1.0;" dynamic-body="shape: sphere; sphereRadius: 1.0; mass: 1.0" position="5 -14 -35"></a-entity>
    <a-entity nbody material="color: #00ff00" geometry="primitive: sphere; radius: 1.2;" dynamic-body="shape: sphere; sphereRadius: 1.2; mass: 1.2" position="-4 15 -55"></a-entity>
  </a-scene>
</body>
```

<!-- If component is accepted to the Registry, uncomment this. -->
<!--
Or with [angle](https://npmjs.com/package/angle/), you can install the proper
version of the component straight into your HTML file, respective to your
version of A-Frame:

```sh
angle install aframe-nbody-system
```
-->

#### npm

Install via npm:

```bash
npm install aframe-nbody-system
```

Then require and use.

```js
require('aframe');
require('aframe-nbody-system');
```
