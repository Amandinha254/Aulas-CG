import { WebGL } from "./initWebGL.js";

export class Formas {
    constructor(webgl) {
        this.webgl = webgl;
    }
}

export class retangulo extends Formas{
    constructor(webgl,center, width, height,color) {
        super(webgl);
        this.vertices = this.setVertices(center, width, height);
        this.desenha(color);
    }

    setVertices(center, width, height){
        let vertices = [];
        vertices.push([center[0]-width/2,center[1]-height/2]);
        vertices.push([center[0]+width/2,center[1]-height/2]);
        vertices.push([center[0]-width/2,center[1]+height/2]);
        vertices.push([center[0]+width/2,center[1]+height/2]);
        return vertices;
    }

    desenha(color){
        //vertices
        this.webgl.gl.bindBuffer(this.webgl.gl.ARRAY_BUFFER,this.webgl.positionBuffer);
        this.webgl.gl.bufferData(this.webgl.gl.ARRAY_BUFFER, new Float32Array([
            //triangulo 1
            this.vertices[0][0], this.vertices[0][1], //ponto inf esq
            this.vertices[1][0], this.vertices[1][1], //ponto inf dir
            this.vertices[2][0], this.vertices[2][1], //ponto sup esq
            //triangulo 2
            this.vertices[2][0], this.vertices[2][1], //ponto sup esq
            this.vertices[1][0], this.vertices[1][1], //ponto inf dir
            this.vertices[3][0], this.vertices[3][1], //ponto sup dir
        ]), this.webgl.gl.STATIC_DRAW);

        //cor
        this.webgl.gl.bindBuffer(this.webgl.gl.ARRAY_BUFFER, this.webgl.colorBuffer);
        let colorData = [];
        for (let triangle = 0; triangle < 2; triangle++) {
        for(let vertex=0; vertex<3; vertex++)
            colorData.push(...color);
        }
        this.webgl.gl.bufferData(this.webgl.gl.ARRAY_BUFFER, new Float32Array(colorData), this.webgl.gl.STATIC_DRAW);
        this.webgl.gl.drawArrays(this.webgl.gl.TRIANGLES, 0, 6);
    }
}

export class circulo extends Formas{
    constructor(webgl, center, radius,color,n=30){
        super(webgl);
        this.desenha(center, radius,color,n);
    }
    desenha(center, radius,color,n){
        //vertices
        this.webgl.gl.bindBuffer(this.webgl.gl.ARRAY_BUFFER,this.webgl.positionBuffer);
        let vertexData = [];
        for(let i=0;i<n;i++){
            vertexData.push(...center);
            vertexData.push(...[radius*Math.cos(i*(2*Math.PI)/n)+center[0],radius*Math.sin(i*(2*Math.PI)/n)+center[1]]);
            vertexData.push(...[radius*Math.cos((i+1)*(2*Math.PI)/n)+center[0],radius*Math.sin((i+1)*(2*Math.PI)/n)+center[1]]);
        }
        this.webgl.gl.bufferData(this.webgl.gl.ARRAY_BUFFER, new Float32Array(vertexData), this.webgl.gl.STATIC_DRAW);

        //cor
        this.webgl.gl.bindBuffer(this.webgl.gl.ARRAY_BUFFER, this.webgl.colorBuffer);
        let colorData = [];
        for (let triangle = 0; triangle < n; triangle++) {
            for(let vertex=0; vertex<3; vertex++)
                colorData.push(...color);
        }
        this.webgl.gl.bufferData(this.webgl.gl.ARRAY_BUFFER, new Float32Array(colorData), this.webgl.gl.STATIC_DRAW);
        this.webgl.gl.drawArrays(this.webgl.gl.TRIANGLES, 0, 3*n);
    }
}