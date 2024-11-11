export class WebGL{
    constructor(canvasId,vertexShaderId,fragmentShaderId){
        this.canvas = document.querySelector("#"+canvasId);
        this.gl = this.canvas.getContext('webgl');
        if (!this.gl) {
            throw new Error('WebGL not supported');
        }
        let vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderId);
        let fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderId);

        this.program = this.createProgram(vertexShader, fragmentShader);
        this.gl.useProgram(this.program);
        
        this.positionBuffer = this.gl.createBuffer();
        this.colorBuffer = this.gl.createBuffer();

        const positionLocation = this.gl.getAttribLocation(this.program, `position`);
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);

        const colorLocation = this.gl.getAttribLocation(this.program, `color`);
        this.gl.enableVertexAttribArray(colorLocation);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
        this.gl.vertexAttribPointer(colorLocation, 3, this.gl.FLOAT, false, 0, 0);

        this.limpaTela([1,1,1]);
    }

    createShader(type, campoId) {
        let source = document.querySelector("#"+campoId).text;
        let shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        let success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
        if (success) {
          return shader;
        }
        console.log(this.gl.getShaderInfoLog(shader));
        this.gl.deleteShader(shader);
    }

    createProgram(vertexShader, fragmentShader) {
        let program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        let success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
        if (success) {
          return program;
        }
        console.log(this.gl.getProgramInfoLog(program));
        this.gl.deleteProgram(program);
    }
    
    limpaTela(cor){
        this.gl.clearColor(cor[0],cor[1],cor[2],1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
}


  
  