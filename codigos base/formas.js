
function retangulo(gl,positionBuffer,colorBuffer, x, y, width, height,color){
    gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
    let x1 = x;
    let x2 = x + width;
    let y1 = y;
    let y2 = y + height;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
       x1, y1,
       x2, y1,
       x1, y2,
       x1, y2,
       x2, y1,
       x2, y2,
    ]), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    colorData = [];
    for (let triangle = 0; triangle < 2; triangle++) {
      for(let vertex=0; vertex<3; vertex++)
        colorData.push(...color);
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function circulo(gl,positionBuffer,colorBuffer, center, radius,color){
    let n=30;
    gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
    let vertexData = [];
    for(let i=0;i<n;i++){
        vertexData.push(...center);
        vertexData.push(...[radius*Math.cos(i*(2*Math.PI)/n)+center[0],radius*Math.sin(i*(2*Math.PI)/n)+center[1]]);
        vertexData.push(...[radius*Math.cos((i+1)*(2*Math.PI)/n)+center[0],radius*Math.sin((i+1)*(2*Math.PI)/n)+center[1]]);
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    colorData = [];
    for (let triangle = 0; triangle < n; triangle++) {
        for(let vertex=0; vertex<3; vertex++)
            colorData.push(...color);
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, 3*n);
}