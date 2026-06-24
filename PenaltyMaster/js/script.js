// ==========================
// VARIABLES
// ==========================

const pantallaInicio =
document.getElementById("pantallaInicio");

const pantallaEquipos =
document.getElementById("pantallaEquipos");

const pantallaJugadores =
document.getElementById("pantallaJugadores");

const pantallaFormacion =
document.getElementById("pantallaFormacion");

const pantallaPenales =
document.getElementById("pantallaPenales");

const pantallaResultado =
document.getElementById("pantallaResultado");

const btnIniciar =
document.getElementById("btnIniciar");

const btnEquipo =
document.getElementById("btnEquipo");

const crearFormulario =
document.getElementById("crearFormulario");

const guardarJugadores =
document.getElementById("guardarJugadores");

const btnPenales =
document.getElementById("btnPenales");

const formJugadores =
document.getElementById("formJugadores");

const equipoGenerado =
document.getElementById("equipoGenerado");

let jugadores = [];

let equipoSeleccionado = "";

// ==========================
// FUNCION CAMBIAR PANTALLA
// ==========================

function mostrarPantalla(pantalla){

    document
    .querySelectorAll(".pantalla")
    .forEach(seccion=>{

        seccion.classList.remove("activa");

    });

    pantalla.classList.add("activa");

}

// ==========================
// INICIAR
// ==========================

btnIniciar.addEventListener(
"click",
()=>{

    mostrarPantalla(
    pantallaEquipos
    );

}
);

// ==========================
// EQUIPO
// ==========================

btnEquipo.addEventListener(
"click",
()=>{

    const equipo =
    document.querySelector(
    'input[name="equipo"]:checked'
    );

    if(!equipo){

        alert(
        "Selecciona un equipo"
        );

        return;
    }

    equipoSeleccionado =
    equipo.value;

    mostrarPantalla(
    pantallaJugadores
    );

}
);

// ==========================
// CREAR FORMULARIOS
// ==========================

crearFormulario.addEventListener(
"click",
()=>{

    formJugadores.innerHTML = "";

    const cantidad =
    document.getElementById(
    "cantidadJugadores"
    ).value;

    for(let i=1;i<=cantidad;i++){

        formJugadores.innerHTML += `

        <div class="jugador-form">

            <h3>
                Jugador ${i}
            </h3>

            <input
                type="text"
                class="nombre"
                placeholder="Nombre"
                required>

            <br><br>

            <input
                type="email"
                class="correo"
                placeholder="Correo Gmail"
                required>

        </div>

        `;

    }

}
);

// ==========================
// GUARDAR JUGADORES
// ==========================

guardarJugadores.addEventListener(
"click",
()=>{

    jugadores = [];

    const nombres =
    document.querySelectorAll(
    ".nombre"
    );

    const correos =
    document.querySelectorAll(
    ".correo"
    );

    if(nombres.length===0){

        alert(
        "Primero crea los jugadores"
        );

        return;

    }

    for(let i=0;i<nombres.length;i++){

        jugadores.push({

            nombre:
            nombres[i].value,

            correo:
            correos[i].value

        });

    }

    generarEquipo();

    mostrarPantalla(
    pantallaFormacion
    );

}
);

// ==========================
// GENERAR EQUIPO
// ==========================

function generarEquipo(){

    equipoGenerado.innerHTML = "";

    jugadores.forEach(
    (jugador,index)=>{

        let icono = "⚽";

        if(index===0){

            icono = "👑";

        }

        if(
        index===jugadores.length-1
        ){

            icono = "⭐";

        }

        equipoGenerado.innerHTML += `

        <div class="player">

            <div class="avatar">

                😎

            </div>

            <h3>

                ${icono}
                ${jugador.nombre}

            </h3>

            <p>

                ${jugador.correo}

            </p>

        </div>

        `;

    });

}

// ==========================
// PENALES
// ==========================

btnPenales.addEventListener(
"click",
()=>{

    mostrarPantalla(
    pantallaPenales
    );

    iniciarPenales();

}
);

// ==========================
// VARIABLES PENALES
// ==========================

let goles = 0;
let atajadas = 0;

const resultadoPenal =
document.getElementById(
"resultadoPenal"
);

const jugadorActual =
document.getElementById(
"jugadorActual"
);

let turno = 0;

// ==========================
// INICIAR PENALES
// ==========================

function iniciarPenales(){

    turno = 0;

    goles = 0;

    atajadas = 0;

    mostrarJugador();

}

// ==========================
// MOSTRAR JUGADOR
// ==========================

function mostrarJugador(){

    if(
    turno >= jugadores.length
    ){

        finalizarJuego();

        return;

    }

    jugadorActual.innerHTML = `

    <h2>

        Turno de
        ${jugadores[turno].nombre}

    </h2>

    `;

}

// ==========================
// BOTONES DIRECCION
// ==========================

document
.querySelectorAll(".direccion")
.forEach(boton=>{

    boton.addEventListener(
    "click",
    ()=>{

        const opciones =

        [
            "izquierda",
            "centro",
            "derecha"
        ];

        const arquero =

        opciones[
        Math.floor(
        Math.random()*3
        )
        ];

        const tiro =
        boton.dataset.dir;

        if(tiro!==arquero){

            goles++;

            resultadoPenal.innerHTML =

            `
            <h2>
            ⚽ GOOOOOL
            </h2>
            `;

        }

        else{

            atajadas++;

            resultadoPenal.innerHTML =

            `
            <h2>
            🥅 ATAJADA
            </h2>
            `;

        }

        turno++;

        setTimeout(()=>{

            mostrarJugador();

        },1500);

    });

});

// ==========================
// FINAL
// ==========================

function finalizarJuego(){

    mostrarPantalla(
    pantallaResultado
    );

    document.getElementById(
    "estadisticas"
    ).innerHTML = `

    <h2>
        🏆 Partido Finalizado
    </h2>

    <p>
        Equipo:
        ${equipoSeleccionado}
    </p>

    <p>
        ⚽ Goles:
        ${goles}
    </p>

    <p>
        🥅 Atajadas:
        ${atajadas}
    </p>

    <p>
        👥 Jugadores:
        ${jugadores.length}
    </p>

    `;

}

// ==========================
// REINICIAR
// ==========================

document
.getElementById("reiniciar")
.addEventListener(
"click",
()=>{

    location.reload();

}
);