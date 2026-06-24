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
        mensaje = "🏆 Terminaste en " + segundos + " segundos";
    }else{
        if(puntosJ1 > puntosJ2){
            mensaje = "🥇 Ganó Jugador 1<br>" + puntosJ1 + " - " + puntosJ2;
        }
        else if(puntosJ2 > puntosJ1){
            mensaje = "🥇 Ganó Jugador 2<br>" + puntosJ2 + " - " + puntosJ1;
        }
        else{
            mensaje = "🤝 Empate<br>" + puntosJ1 + " - " + puntosJ2;
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

// =======================================================
// CONTROL DEL MENÚ STICKY (NUEVA INTEGRACIÓN)
// =======================================================
document.addEventListener("DOMContentLoaded", () => {
    const botonMenu = document.getElementById('btn-control-menu');
    const menuDesplegable = document.getElementById('menu-desplegable');

    if (botonMenu && menuDesplegable) {
        botonMenu.addEventListener('click', () => {
            menuDesplegable.classList.toggle('mostrar');
            
            if (menuDesplegable.classList.contains('mostrar')) {
                botonMenu.innerHTML = '✕ Ocultar Menú';
            } else {
                botonMenu.innerHTML = '☰ Mostrar Menú';
            }
        });
    }
});


async function traducirTexto(){

    const texto =
    document.getElementById("texto").value.trim();

    if(texto === ""){
        alert("Escribe un texto primero");
        return;
    }

    try{

        document.getElementById("ingles").textContent =
        "Traduciendo...";

        document.getElementById("frances").textContent =
        "Traduciendo...";

        document.getElementById("portugues").textContent =
        "Traduciendo...";

        document.getElementById("arabe").textContent =
        "جاري الترجمة...";

        const [en, fr, pt, ar] =
        await Promise.all([

            fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=es|en`
            ),

            fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=es|fr`
            ),

            fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=es|pt`
            ),

            fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=es|ar`
            )

        ]);

        const datosEn = await en.json();
        const datosFr = await fr.json();
        const datosPt = await pt.json();
        const datosAr = await ar.json();

        document.getElementById("ingles").textContent =
        datosEn.responseData.translatedText;

        document.getElementById("frances").textContent =
        datosFr.responseData.translatedText;

        document.getElementById("portugues").textContent =
        datosPt.responseData.translatedText;

        document.getElementById("arabe").textContent =
        datosAr.responseData.translatedText;

    }
    catch(error){

        console.error(error);

        document.getElementById("ingles").textContent =
        "Error";

        document.getElementById("frances").textContent =
        "Error";

        document.getElementById("portugues").textContent =
        "Error";

        document.getElementById("arabe").textContent =
        "خطأ";

        alert("No fue posible realizar la traducción.");

    }

}

const levels = [

{
nivel:1,
pregunta:"¿Cuál elemento selecciona :first-child?",
correcta:0,
opciones:[
"🍏",
"🍎",
"🍌"
]
},

{
nivel:2,
pregunta:"¿Cuál elemento selecciona :last-child?",
correcta:2,
opciones:[
"🍏",
"🍎",
"🍌"
]
},

{
nivel:3,
pregunta:"¿Cuál elemento selecciona :nth-child(2)?",
correcta:1,
opciones:[
"🍏",
"🍎",
"🍌"
]
},

{
nivel:4,
pregunta:"¿Qué elementos son pares?",
correcta:1,
opciones:[
"1,3,5",
"2,4,6",
"1,2,3"
]
},

{
nivel:5,
pregunta:"¿Cuál es el primer <p> usando :first-of-type?",
correcta:0,
opciones:[
"Párrafo 1",
"Párrafo 2",
"Párrafo 3"
]
},

{
nivel:6,
pregunta:"¿Qué texto coincide con :lang(en)?",
correcta:1,
opciones:[
"Hola",
"Hello",
"Bonjour"
]
},

{
nivel:7,
pregunta:"¿Qué elemento coincide con :dir(rtl)?",
correcta:2,
opciones:[
"Hola",
"Hello",
"مرحبا"
]
}

];


document.addEventListener("DOMContentLoaded", () => {
  const inputTexto = document.getElementById("texto-usuario");
  const botonEnviar = document.getElementById("boton-enviar");
  const contadorCantidad = document.getElementById("cantidad");

  // Escuchamos lo que el usuario escribe en tiempo real
  inputTexto.addEventListener("input", () => {
    const longitudTexto = inputTexto.value.length;

    // Actualizamos el contador visual en la pantalla
    contadorCantidad.textContent = longitudTexto;

    // Si la longitud es mayor o igual a 10, deshabilitado = false (se habilita)
    if (longitudTexto >= 10) {
      botonEnviar.disabled = false;
    } else {
      botonEnviar.disabled = true;
    }
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const nombreInput = document.getElementById("nombre-usuario");
  const rolInput = document.getElementById("rol-usuario");
  const btnGuardar = document.getElementById("btn-guardar");
  const btnSalir = document.getElementById("btn-salir");

  // Función que evalúa la suma de caracteres en ambos inputs
  function validarFormulario() {
    const caracteresNombre = nombreInput.value.length;
    const caracteresRol = rolInput.value.length;
    const totalCaracteres = caracteresNombre + caracteresRol;

    // Habilita si la suma de letras en ambos campos es mayor o igual a 10
    if (totalCaracteres >= 10) {
      btnGuardar.disabled = false;
    } else {
      btnGuardar.disabled = true;
    }
  }

  // Escuchamos el evento en ambos inputs al mismo tiempo
  nombreInput.addEventListener("input", validarFormulario);
  rolInput.addEventListener("input", validarFormulario);

  // Acción simple opcional para el botón Salir
  btnSalir.addEventListener("click", () => {
    alert("Has salido de la edición de perfil.");
  });
});