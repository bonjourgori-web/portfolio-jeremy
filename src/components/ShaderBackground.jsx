import { useEffect, useRef } from 'react'

const vertexShader = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const fragmentShader = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;

  vec3 palette(float t) {
    vec3 a = vec3(0.05, 0.08, 0.20);
    vec3 b = vec3(0.02, 0.05, 0.18);
    vec3 c = vec3(0.10, 0.15, 0.40);
    vec3 d = vec3(0.00, 0.10, 0.30);
    return a + b * cos(6.28318 * (c * t + d));
  }

  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 5; ++i) {
      v += a * smoothNoise(p);
      p = rot * p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 mouse = u_mouse / u_resolution.xy;
    float t = u_time * 0.12;

    vec2 q = vec2(fbm(uv + t * 0.4), fbm(uv + vec2(1.0)));
    vec2 r = vec2(
      fbm(uv + 1.0 * q + vec2(1.7, 9.2) + 0.15 * t),
      fbm(uv + 1.0 * q + vec2(8.3, 2.8) + 0.126 * t)
    );

    float f = fbm(uv + r);

    /* mouse influence */
    float dist = length(uv - mouse);
    f += 0.08 * smoothstep(0.4, 0.0, dist);

    vec3 col = palette(f * 0.5 + 0.5);

    /* Aurora bands */
    float aurora = sin(uv.x * 3.0 + t * 0.8 + fbm(uv * 2.0 + t) * 2.0) * 0.5 + 0.5;
    aurora *= smoothstep(0.9, 0.3, uv.y) * smoothstep(0.0, 0.4, uv.y);
    col += vec3(0.0, 0.05, 0.20) * aurora * 0.4;

    /* Stars */
    vec2 starUv = uv * 80.0;
    float star = noise(floor(starUv));
    if (star > 0.97) {
      float blink = sin(u_time * 2.0 + star * 100.0) * 0.5 + 0.5;
      col += vec3(blink * 0.4);
    }

    col = pow(col, vec3(0.85));
    gl_FragColor = vec4(col, 1.0);
  }
`

export default function ShaderBackground() {
  const canvasRef = useRef(null)
  const stateRef = useRef({ mouse: [0, 0], raf: null, gl: null })

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false })
    if (!gl) return
    stateRef.current.gl = gl

    const compile = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }

    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vertexShader))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fragmentShader))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(prog, 'position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uRes  = gl.getUniformLocation(prog, 'u_resolution')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouse = (e) => {
      stateRef.current.mouse = [e.clientX, window.innerHeight - e.clientY]
    }
    window.addEventListener('mousemove', onMouse)

    let start = performance.now()
    const render = () => {
      const t = (performance.now() - start) / 1000
      gl.uniform1f(uTime, t)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform2f(uMouse, ...stateRef.current.mouse)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      stateRef.current.raf = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(stateRef.current.raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.85,
      }}
    />
  )
}
