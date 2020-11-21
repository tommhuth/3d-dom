#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

@import ./snoise;

varying vec2 vUv;
attribute vec2 uv;
uniform float uTime;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
attribute vec3 position;

void main() {
    vUv = uv;

    vec3 pos = position;
    float noiseFreq = 1.5;
    float noiseAmp = .125;
    vec3 noisePos = vec3(pos.x + uTime, pos.y, pos.z) ;
    vec4 mvPosition = modelViewMatrix * vec4(noisePos, 1.0);
    
    pos.z += snoise(mvPosition.xyz) * noiseAmp; 

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}