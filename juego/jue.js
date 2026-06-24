const levels = [

{
    pregunta: "¿Qué pseudoclase se activa al pasar el mouse sobre un elemento?",
    opciones: [":hover", ":active", ":focus"],
    correcta: 0
},

{
    pregunta: "¿Qué pseudoclase se activa mientras haces clic?",
    opciones: [":focus", ":active", ":hover"],
    correcta: 1
},

{
    pregunta: "¿Qué pseudoclase se aplica cuando un input recibe el foco?",
    opciones: [":focus", ":visited", ":target"],
    correcta: 0
},

{
    pregunta: "¿Cuál es seleccionado por :first-child?",
    opciones: [
        "🍏 Primer elemento",
        "🍎 Segundo elemento",
        "🍌 Último elemento"
    ],
    correcta: 0
},

{
    pregunta: "¿Cuál es seleccionado por :last-child?",
    opciones: [
        "🍏 Primer elemento",
        "🍎 Segundo elemento",
        "🍌 Último elemento"
    ],
    correcta: 2
},

{
    pregunta: "¿Cuál selecciona :nth-child(3)?",
    opciones: [
        "Elemento 1",
        "Elemento 2",
        "Elemento 3"
    ],
    correcta: 2
},

{
    pregunta: "¿Qué elementos selecciona :nth-child(even)?",
    opciones: [
        "1, 3, 5, 7",
        "2, 4, 6, 8",
        "Todos"
    ],
    correcta: 1
},

{
    pregunta: "¿Qué texto selecciona p:lang(en)?",
    opciones: [
        "Hola",
        "Hello",
        "Bonjour"
    ],
    correcta: 1
},

{
    pregunta: "¿Qué texto coincide con :dir(rtl)?",
    opciones: [
        "Hola",
        "Hello",
        "مرحبا"
    ],
    correcta: 2
},

{
    pregunta: "¿Qué elemento selecciona :any-link?",
    opciones: [
        "<div>",
        "<a href='#'>",
        "<p>"
    ],
    correcta: 1
}

];

let currentLevel = 0;
let score = 0;
let answered = false;

const question =
document.getElementById("question");

const options =
document.getElementById("options");

const scoreText =
document.getElementById("score");

const nivelText =
document.getElementById("nivel");

const message =
document.getElementById("message");

const nextBtn =
document.getElementById("nextBtn");

const progressBar =
document.getElementById("progress-bar");

const finalScreen =
document.getElementById("final-screen");

function loadLevel(){

    answered = false;

    const level =
    levels[currentLevel];

    nivelText.textContent =
    currentLevel + 1;

    question.textContent =
    level.pregunta;

    options.innerHTML = "";

    message.textContent = "";

    level.opciones.forEach(
    (option,index)=>{

        const div =
        document.createElement("div");

        div.classList.add("option");

        div.textContent =
        option;

        div.addEventListener(
        "click",
        ()=>checkAnswer(index,div)
        );

        options.appendChild(div);

    });

    progressBar.style.width =
    ((currentLevel) /
    levels.length) * 100 + "%";

}

function checkAnswer(index,element){

    if(answered) return;

    answered = true;

    const level =
    levels[currentLevel];

    const cards =
    document.querySelectorAll(".option");

    if(index === level.correcta){

        score += 10;

        scoreText.textContent =
        score;

        element.classList.add(
        "correct"
        );

        message.textContent =
        "✅ Correcto";

    }else{

        element.classList.add(
        "wrong"
        );

        cards[level.correcta]
        .classList.add("correct");

        message.textContent =
        "❌ Incorrecto";

    }

}

nextBtn.addEventListener(
"click",
()=>{

    if(!answered){

        alert(
        "Debes responder primero"
        );

        return;
    }

    currentLevel++;

    if(
    currentLevel >= levels.length
    ){

        finishGame();

        return;
    }

    loadLevel();

}
);

function finishGame(){

    document.querySelector(
    ".question-card"
    ).style.display = "none";

    document.querySelector(
    ".options"
    ).style.display = "none";

    document.querySelector(
    ".button-container"
    ).style.display = "none";

    document.querySelector(
    ".message"
    ).style.display = "none";

    finalScreen.style.display =
    "block";

    progressBar.style.width =
    "100%";

    document.getElementById(
    "final-score"
    ).textContent =
    `Tu puntuación fue ${score} de 100 puntos`;

    const rank =
    document.getElementById(
    "rank"
    );

    if(score >= 90){

        rank.textContent =
        "🏆 Maestro CSS";

    }

    else if(score >= 70){

        rank.textContent =
        "🥇 Experto CSS";

    }

    else if(score >= 50){

        rank.textContent =
        "🥈 Intermedio CSS";

    }

    else{

        rank.textContent =
        "🥉 Sigue practicando";

    }

}

loadLevel();