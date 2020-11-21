#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec2 vUv;
uniform sampler2D uTexture;

void main() {
    vec3 texture = texture2D(uTexture, vUv).rgb;
    
    gl_FragColor = vec4(texture, 1.);
}