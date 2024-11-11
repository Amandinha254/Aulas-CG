function main(){
  const canvas = document.querySelector("#c");
  const gl = canvas.getContext('webgl');

  if (!gl) {
      throw new Error('WebGL not supported');
  }

  var vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
  var fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;

  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  var program = createProgram(gl, vertexShader, fragmentShader);

  gl.useProgram(program);

  const positionBuffer = gl.createBuffer();
  const colorBuffer = gl.createBuffer();

  const positionLocation = gl.getAttribLocation(program, `position`);
  gl.enableVertexAttribArray(positionLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  const colorLocation = gl.getAttribLocation(program, `color`);
  gl.enableVertexAttribArray(colorLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

  var op=1;
  

  canvas.addEventListener("mousedown",mouseDown,false);
  function mouseDown(event){
    op++;
    if(op>3){
      op=1;
    }
    desenha(op,gl,positionBuffer,colorBuffer);
  }

  desenha(op,gl,positionBuffer,colorBuffer);
}

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function setRectangleVertices(gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
     x1, y1,
     x2, y1,
     x1, y2,
     x1, y2,
     x2, y1,
     x2, y2,
  ]), gl.STATIC_DRAW);
}

function setRectangleColor(gl,color) {
  colorData = [];
  for (let triangle = 0; triangle < 2; triangle++) {
    for(let vertex=0; vertex<3; vertex++)
      colorData.push(...color);
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
}

function setCircleVertices(gl,n,center,radius){
  let vertexData = [];
  for(let i=0;i<n;i++){
    vertexData.push(...center);
    vertexData.push(...[radius*Math.cos(i*(2*Math.PI)/n)+center[0],radius*Math.sin(i*(2*Math.PI)/n)+center[1]]);
    vertexData.push(...[radius*Math.cos((i+1)*(2*Math.PI)/n)+center[0],radius*Math.sin((i+1)*(2*Math.PI)/n)+center[1]]);
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
}

function setCircleColor(gl,n,color){
  colorData = [];
  for (let triangle = 0; triangle < n; triangle++) {
    for(let vertex=0; vertex<3; vertex++)
      colorData.push(...color);
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
}

function Carro(gl,positionBuffer,colorBuffer){
  //parte de baixo do carro
  gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
  setRectangleVertices(gl,-0.9,-0.4,1.8,0.5);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  setRectangleColor(gl,[1,0,0]);
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  //parte de cima do carro
  gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
  setRectangleVertices(gl,-0.4,0.1,0.8,0.35);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  setRectangleColor(gl,[1,0,0]);
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  //roda 1
  n=30;
  gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
  setCircleVertices(gl,n,[-0.65,-0.4],0.25);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  setCircleColor(gl,n,[0,0,0]);
  gl.drawArrays(gl.TRIANGLES, 0, 3*n);

  //roda 2
  gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
  setCircleVertices(gl,n,[0.65,-0.4],0.25);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  setCircleColor(gl,n,[0,0,0]);
  gl.drawArrays(gl.TRIANGLES, 0, 3*n);
}

function flor(gl,positionBuffer,colorBuffer){
  let center=[0.0,0.0];
  let radius=0.5

  n=8;
  for(let i=0;i<n;i++){
    gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
    setCircleVertices(gl,n,[radius*Math.cos(i*(2*Math.PI)/n)+center[0],radius*Math.sin(i*(2*Math.PI)/n)+center[1]],0.2);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl,n,[0.7,0.5,0.79]);
    gl.drawArrays(gl.TRIANGLES, 0, 3*n);
  }

  var n=30;
  gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
  setCircleVertices(gl,n,[0,0],0.5);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  setCircleColor(gl,n,[1,0.75,0.79]);
  gl.drawArrays(gl.TRIANGLES, 0, 3*n);
}

function Palhaco(gl,positionBuffer,colorBuffer){
  var n=30;
  //rosto do palhaco
  gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
  setCircleVertices(gl,n,[0,0],1);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  setCircleColor(gl,n,[1,1,1]);
  gl.drawArrays(gl.TRIANGLES, 0, 3*n);

  //nariz do palhaco
  gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
  setCircleVertices(gl,n,[0,0],0.25);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  setCircleColor(gl,n,[1,0,0]);
  gl.drawArrays(gl.TRIANGLES, 0, 3*n);

  //olho direito
  gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
  setCircleVertices(gl,n,[-0.5,0.5],0.25);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  setCircleColor(gl,n,[0,0,0]);
  gl.drawArrays(gl.TRIANGLES, 0, 3*n);

  //olho esquerdo
  gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
  setCircleVertices(gl,n,[0.5,0.5],0.25);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  setCircleColor(gl,n,[0,0,0]);
  gl.drawArrays(gl.TRIANGLES, 0, 3*n);

  //boca do palahco
  gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
  setRectangleVertices(gl,-0.65,-0.8,1.3,0.4);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  setRectangleColor(gl,[1,0,0]);
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
  setRectangleVertices(gl,-0.55,-0.7,1.1,0.2);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  setRectangleColor(gl,[1,1,1]);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function desenha(op,gl,positionBuffer,colorBuffer){
  gl.clearColor(1, 1, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  switch (op){
    case 1:
      Carro(gl,positionBuffer,colorBuffer);
      break;
    case 2:
      flor(gl,positionBuffer,colorBuffer);
      break;
    case 3:
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      Palhaco(gl,positionBuffer,colorBuffer)
  }
}

main();