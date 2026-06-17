const cajas = document.querySelectorAll(".caja-evento");

cajas.forEach(caja => {

    let timer = null;

    caja.addEventListener("click", function() {

        timer = setTimeout(() => {

            this.style.display = "none";

        }, 250);

    });

    caja.addEventListener("dblclick", function() {

        clearTimeout(timer);

        this.style.visibility = "hidden";

    });

});

// ======================
// BANDERAS DEL MUNDIAL
// ======================

const banderas = [

"🇨🇴","🇨🇴",
"🇦🇷","🇦🇷",
"🇧🇷","🇧🇷",
"🇫🇷","🇫🇷",
"🇪🇸","🇪🇸",
"🇩🇪","🇩🇪",
"🇵🇹","🇵🇹",
"🇲🇽","🇲🇽",
"🇺🇾","🇺🇾",
"🇯🇵","🇯🇵",
"🇺🇸","🇺🇸",
"🏴","🏴"

];

// ======================
// VARIABLES
// ======================

let modoJuego = 1;

let jugadorActual = 1;

let puntosJ1 = 0;
let puntosJ2 = 0;

let parejasEncontradas = 0;

let primeraCarta = null;
let segundaCarta = null;

let bloqueo = false;

let segundos = 0;

let cronometro;


// ======================
// INICIAR JUEGO
// ======================

function iniciarJuego(jugadores){

    modoJuego = jugadores;

    document.getElementById("menu").style.display = "none";

    mezclar();

    iniciarCronometro();

}


// ======================
// MEZCLAR BANDERAS
// ======================

function mezclar(){

    banderas.sort(() => Math.random() - 0.5);

    const cartas = document.querySelectorAll(".carta");

    cartas.forEach((carta, indice) => {

        carta.textContent = banderas[indice];

        carta.addEventListener("click", voltearCarta);

    });

}


// ======================
// CRONOMETRO
// ======================

function iniciarCronometro(){

    cronometro = setInterval(() => {

        segundos++;

        document.getElementById("cronometro").textContent =
        "⏱ Tiempo: " + segundos + " s";

    },1000);

}


// ======================
// VOLTEAR CARTA
// ======================

function voltearCarta(){

    if(bloqueo) return;

    if(this === primeraCarta) return;

    this.classList.add("volteada");

    if(!primeraCarta){

        primeraCarta = this;

        return;
    }

    segundaCarta = this;

    bloqueo = true;

    verificarPareja();
}


// ======================
// VERIFICAR
// ======================

function verificarPareja(){

    if(primeraCarta.textContent === segundaCarta.textContent){

        parejaCorrecta();

    }else{

        parejaIncorrecta();

    }

}


// ======================
// SI SON IGUALES
// ======================

function parejaCorrecta(){

    parejasEncontradas++;

    if(jugadorActual === 1){

        puntosJ1++;

        document.getElementById("jugador1").textContent =
        "👤 Jugador 1: " + puntosJ1;

    }else{

        puntosJ2++;

        document.getElementById("jugador2").textContent =
        "👤 Jugador 2: " + puntosJ2;

    }

    primeraCarta.classList.add("acertada");
    segundaCarta.classList.add("acertada");

    setTimeout(() => {

        primeraCarta.style.visibility = "hidden";
        segundaCarta.style.visibility = "hidden";

        reiniciarSeleccion();

        verificarVictoria();

    },700);

}


// ======================
// SI FALLA
// ======================

function parejaIncorrecta(){

    setTimeout(() => {

        primeraCarta.classList.remove("volteada");
        segundaCarta.classList.remove("volteada");

        if(modoJuego === 2){

            jugadorActual = jugadorActual === 1 ? 2 : 1;

            document.getElementById("turno").textContent =
            "🎯 Turno: Jugador " + jugadorActual;

        }

        reiniciarSeleccion();

    },1000);

}


// ======================
// REINICIAR SELECCION
// ======================

function reiniciarSeleccion(){

    primeraCarta = null;
    segundaCarta = null;

    bloqueo = false;

}


// ======================
// VICTORIA
// ======================

function verificarVictoria(){

    if(parejasEncontradas !== 12) return;

    clearInterval(cronometro);

    let mensaje = "";

    if(modoJuego === 1){

        mensaje =
        "🏆 Terminaste en " +
        segundos +
        " segundos";

    }else{

        if(puntosJ1 > puntosJ2){

            mensaje =
            "🥇 Ganó Jugador 1<br>" +
            puntosJ1 +
            " - " +
            puntosJ2;

        }

        else if(puntosJ2 > puntosJ1){

            mensaje =
            "🥇 Ganó Jugador 2<br>" +
            puntosJ2 +
            " - " +
            puntosJ1;

        }

        else{

            mensaje =
            "🤝 Empate<br>" +
            puntosJ1 +
            " - " +
            puntosJ2;

        }

    }

    document.getElementById("resultado-final").innerHTML = mensaje;

    document.getElementById("ganador").style.display = "block";

}


// ======================
// REINICIAR
// ======================

function reiniciarJuego(){

    location.reload();

}