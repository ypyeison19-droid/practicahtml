const canvas = document.getElementById("lienzo");
const ctx = canvas.getContext("2d");

const color = document.getElementById("color");
const grosor = document.getElementById("grosor");
const limpiar = document.getElementById("limpiar");

let dibujando = false;

canvas.addEventListener("mousedown", iniciar);
canvas.addEventListener("mouseup", detener);
canvas.addEventListener("mouseleave", detener);
canvas.addEventListener("mousemove", dibujar);

function iniciar(e){

    dibujando = true;

    ctx.beginPath();

    ctx.moveTo(e.offsetX, e.offsetY);

}

function detener(){

    dibujando = false;

}

function dibujar(e){

    if(!dibujando) return;

    ctx.strokeStyle = color.value;

    ctx.lineWidth = grosor.value;

    ctx.lineCap = "round";

    ctx.lineTo(e.offsetX, e.offsetY);

    ctx.stroke();

}

limpiar.addEventListener("click",()=>{

    ctx.clearRect(0,0,canvas.width,canvas.height);

});