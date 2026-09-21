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


const nota = document.getElementById("nota");
const puntosTexto = document.getElementById("puntos");
const tiempoTexto = document.getElementById("tiempo");
const area = document.getElementById("areaJuego");

let puntos = 0;
let tiempo = 30;

function moverNota(){

    let x = Math.random() * (area.clientWidth - 50);

    let y = Math.random() * (area.clientHeight - 50);

    nota.style.left = x + "px";

    nota.style.top = y + "px";

}

nota.addEventListener("click",()=>{

    puntos++;

    puntosTexto.textContent = puntos;

    moverNota();

});

moverNota();

const intervalo = setInterval(()=>{

    tiempo--;

    tiempoTexto.textContent = tiempo;

    if(tiempo<=0){

        clearInterval(intervalo);

        nota.style.display="none";

        alert("🎉 Juego terminado.\nPuntaje: " + puntos);

    }

},1000);