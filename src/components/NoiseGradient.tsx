import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;

  // Simplex 3D noise — compact GLSL implementation
  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g  = step(x0.yzx, x0.xyz);
    vec3 l  = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x  = x_ * ns.x + ns.yyyy;
    vec4 y  = y_ * ns.x + ns.yyyy;
    vec4 h  = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    // Slow time
    float t = u_time * 0.08;

    // Base position with very slow drift
    vec2 pos = uv * 2.0;

    // Layer 1: large-scale slow noise (dominant structure)
    float n1 = snoise(vec3(pos * 0.8, t * 0.5));

    // Layer 2: medium detail
    float n2 = snoise(vec3(pos * 1.6 + 3.0, t * 0.7 + 10.0));

    // Layer 3: fine grain
    float n3 = snoise(vec3(pos * 3.2 + 7.0, t * 0.9 + 20.0));

    // Combine layers — fBM style
    float noise = n1 * 0.55 + n2 * 0.30 + n3 * 0.15;

    // Remap from [-1,1] to [0,1]
    noise = noise * 0.5 + 0.5;

    // Color palette: deep dark purples → indigo → near-black
    // Minimalist: very dark base with subtle color shifts
    vec3 colorDeep   = vec3(0.035, 0.025, 0.065);  // near-black purple
    vec3 colorMid    = vec3(0.06, 0.04, 0.13);     // dark indigo
    vec3 colorLight  = vec3(0.10, 0.06, 0.20);     // muted purple

    // Gradient based on noise
    vec3 color = mix(colorDeep, colorMid, smoothstep(0.3, 0.6, noise));
    color = mix(color, colorLight, smoothstep(0.55, 0.85, noise));

    // Subtle vignette to darken edges
    vec2 vigUv = uv * 2.0 - 1.0;
    float vig = 1.0 - dot(vigUv * 0.5, vigUv * 0.5);
    vig = smoothstep(0.0, 1.0, vig);
    color *= mix(0.6, 1.0, vig);

    // Very subtle grain overlay (high-freq noise for texture)
    float grain = snoise(vec3(gl_FragCoord.xy * 0.5, u_time * 2.0)) * 0.02;
    color += grain;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function NoiseGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;

    // Compile shader
    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    // Full-screen quad
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, 'a_position');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const resLoc = gl.getUniformLocation(program, 'u_resolution');

    // Handle resize
    const dpr = Math.min(window.devicePixelRatio, 1.5); // cap DPR for performance
    function resize() {
      canvas!.width = canvas!.clientWidth * dpr;
      canvas!.height = canvas!.clientHeight * dpr;
    }
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Render loop
    const startTime = performance.now();
    function render() {
      const elapsed = (performance.now() - startTime) / 1000;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.useProgram(program);

      gl!.enableVertexAttribArray(posLoc);
      gl!.bindBuffer(gl!.ARRAY_BUFFER, posBuffer);
      gl!.vertexAttribPointer(posLoc, 2, gl!.FLOAT, false, 0, 0);

      gl!.uniform1f(timeLoc, elapsed);
      gl!.uniform2f(resLoc, canvas!.width, canvas!.height);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);

      animRef.current = requestAnimationFrame(render);
    }
    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
