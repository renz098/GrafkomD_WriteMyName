const canvas = document.getElementById('webgl-canvas');
const gl = canvas.getContext('webgl');

if (!gl) {
    alert('WebGL tidak didukung di browser ini!');
}

gl.clearColor(1.0, 1.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const vsSource = `
    attribute vec2 a_position;
    void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
    }
`;

const fsSource = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(0.0, 0.6, 0.9, 1.0);
    }
`;

// Helper untuk kompilasi shader
function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);


const vertices = new Float32Array([

    -0.85,  0.6,   -0.73,  0.6,   -0.85, -0.6,
    -0.85, -0.6,   -0.73,  0.6,   -0.73, -0.6,

    -0.37,  0.6,   -0.25,  0.6,   -0.37, -0.6,
    -0.37, -0.6,   -0.25,  0.6,   -0.25, -0.6,

    -0.73,  0.06,  -0.27,  0.06,  -0.73, -0.06,
    -0.73, -0.06,  -0.27,  0.06,  -0.27, -0.06,


    0.25,  0.6,    0.37,  0.6,    0.25, -0.6,
    0.25, -0.6,    0.37,  0.6,    0.37, -0.6,

    0.73,  0.6,    0.85,  0.6,    0.73, -0.6,
    0.73, -0.6,    0.85,  0.6,    0.85, -0.6,

    0.25,  0.6,    0.37,  0.6,    0.73, -0.6,
    0.73, -0.6,    0.85, -0.6,    0.37,  0.6
]);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
