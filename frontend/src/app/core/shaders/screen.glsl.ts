export const screenVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const screenFragmentShader = `
  uniform sampler2D textTexture;
  uniform float time;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Scanline effect
    float scanline = sin(uv.y * 200.0 + time * 5.0) * 0.1;
    
    // Screen glow
    vec4 textColor = texture2D(textTexture, uv);
    vec3 color = textColor.rgb * vec3(0.2, 1.0, 0.5); // Green tint
    
    // Add scanline and glow
    color += vec3(scanline);
    color += vec3(0.1, 0.3, 0.1) * (1.0 - distance(uv, vec2(0.5)));
    
    gl_FragColor = vec4(color, 1.0);
  }
`;
