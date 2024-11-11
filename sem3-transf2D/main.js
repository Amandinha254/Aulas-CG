import { circulo,retangulo } from "../codigos-base/formas.js";
import { WebGL } from "../codigos-base/initWebGL.js";

function main(){

  let webgl = new WebGL("c","vertex-shader-2d","fragment-shader-2d");
  let op=1, center=[0,0], dir = [1,1];
  let vel = [Math.random()*0.02,Math.random()*0.02];
  let dist = [0.1,0.15,0.05];
  function anima(){
    if(center[0]+dist[op-1]>=0.9 || center[0]-dist[op-1]<=-0.9) dir[0] *= -1;
    if(center[1]+dist[op-1]>=0.9 || center[1]-dist[op-1]<=-0.9) dir[1] *= -1;
    center[0] += vel[0]*dir[0];
    center[1] += vel[1]*dir[1];
    desenha(op,webgl,center,dist[op-1]);
    window.requestAnimationFrame(anima);
  }
  
  webgl.canvas.addEventListener("mousedown",mouseDown,false);
  function mouseDown(event){
    op++;
    if(op>3){
      op=1;
    }
  }

  anima(op,webgl);
}

function Carro(webgl,center,dist = 0.25){
  //parte de baixo do carro
  const r1 = new retangulo(webgl,center,dist*7.2,dist*2,[1,0,0]);
  //parte de cima do carro
  const r2 = new retangulo(webgl,[center[0],center[1]+dist*3.2/2],dist*3.2,dist*3/2,[1,0,0]);
  //roda 1
  const c1 = new circulo(webgl,[center[0]-dist*5/2,center[1]-dist],dist,[0,0,0]);
  //roda 2
  const c2 = new circulo(webgl,[center[0]+dist*5/2,center[1]-dist],dist,[0,0,0]);
}

function flor(webgl,center,radius = 0.25){
  let n = 8;
  for(let i=0;i<n;i++){
    let petala = new circulo(webgl,[radius*Math.cos(i*(2*Math.PI)/n)+center[0],radius*Math.sin(i*(2*Math.PI)/n)+center[1]],radius*0.4,[0.7,0.5,0.79],n);
  }
  const meio = new circulo(webgl,center,radius,[1,0.75,0.79]);
}

function Palhaco(webgl,center,dist=0.05){
  //rosto do palhaco
  const rosto = new circulo(webgl,center,dist*4,[1,1,1]);
  //nariz do palhaco
  const nariz = new circulo(webgl,center,dist,[1,0,0]);
  //olho direito
  const olho1 = new circulo(webgl,[center[0]-dist*2,center[1]+dist*2],dist,[0,0,0]);
  //olho esquerdo
  const olho2 = new circulo(webgl,[center[0]+dist*2,center[1]+dist*2],dist,[0,0,0]);
  //boca do palahco
  const lab1 = new retangulo(webgl,[center[0],center[1]-dist*2],dist*5.2,dist*8/5,[1,0,0]);
  const lab2 = new retangulo(webgl,[center[0],center[1]-dist*2],dist*4.4,dist*4/5,[1,1,1]);
}

function desenha(op,webgl,center,dist){
  webgl.limpaTela([1,1,1]);

  switch (op){
    case 1:
      Carro(webgl,center,dist);
      break;
    case 2:
      flor(webgl,center,dist);
      break;
    case 3:
      webgl.limpaTela([0,0,0]);
      Palhaco(webgl,center,dist);
  }
}



main();