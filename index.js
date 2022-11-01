import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDZRPGtD-zXfKYRy-98FwmFlD3WEZisKno",
    authDomain: "logicalfunnyquiz.firebaseapp.com",
    projectId: "logicalfunnyquiz",
    storageBucket: "logicalfunnyquiz.appspot.com",
    messagingSenderId: "109271917334",
    appId: "1:109271917334:web:92a74c465c489e78816637"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const saveKid = (name, score, time) => {
  addDoc(collection(db, "users"), { name, score, time });
  console.log(collection(db, "users"))
}

let questionBase = [
  {
    question: "¿Qué camino debe realizar el carro para llegar a la meta?",
    image: "https://i.ibb.co/2S1kRM7/Laberinto.jpg",
    answer: "https://i.ibb.co/FWjMxjv/Correcta.png",

    distractors: [
      "https://i.ibb.co/tCg5z1S/Incorrecta1.png",
      "https://i.ibb.co/5KtTgDp/Incorrecta2.png",
      "https://i.ibb.co/BnpMMRQ/Incorrecta3.png",
    ],
  },
  {
    question:
      "¿Qué número sigue en la secuencia?",
    image:
      "https://i.ibb.co/hm89Hzp/Pregunta.png",
    answer: "https://i.ibb.co/9tQnFDf/Correcta.png",

    distractors: [
      "https://i.ibb.co/bRrTqds/Incorrecta3.png",
      "https://i.ibb.co/C6Zt0HH/Incorrecta2.png",
      "https://i.ibb.co/k0SnVmv/Incorrecta1.png",
    ],
  },
  {
    question:
      "¿Cuál es el orden de llegada?",
    image:
      "https://i.ibb.co/QCf1H2v/Pregunta3.png",
    answer: "https://i.ibb.co/8MqWRdg/Correcta.png",

    distractors: [
      "https://i.ibb.co/VBPzNtb/Incorrecta1.png",
      "https://i.ibb.co/3YW8fNg/Incorrecta2.png",
      "https://i.ibb.co/sbzVt1S/Incorrecta3.png",
    ],
  },
  {
    question:
      "¿Qué piezas faltan para completar el rompecabezas?",
    image:
      "https://i.ibb.co/D4FBK4P/Pregunta.png",
    answer: "https://i.ibb.co/LkTtMpM/Correcta.png",

    distractors: [
      "https://i.ibb.co/2s7WTHP/Incorrecta1.png",
      "https://i.ibb.co/BNyryF1/Incorrecta2.png",
      "https://i.ibb.co/yQt59NL/Incorrecta3.png",
    ],
  },
  {
    question:
      "¿Cuánto da el resultado de la última operación?",
    image:
      "https://i.ibb.co/sbjGBWw/Pregunta5.png",
    answer: "8",

    distractors: [
      "6",
      "10",
      "16",
    ],
  },
];
const name = document.getElementById('name')
let QUESTION_COUNT = questionBase.length;
let QUESTION_INDEX = 0;
let SCORE = 0;
let time = 0;

class CountdownTimer extends HTMLElement {
  static get observedAttributes() {
    return ["time-limit-in-seconds"];
  }

  constructor() {
    super();

    this.FULL_DASH_ARRAY = 283;
    this.WARNING_THRESHOLD = 150;
    this.ALERT_THRESHOLD = 10;

    this.COLOR_CODES = {
      info: {
        color: "green",
      },
      warning: {
        color: "orange",
        threshold: this.WARNING_THRESHOLD,
      },
      alert: {
        color: "red",
        threshold: this.ALERT_THRESHOLD,
      },
    };

    this.timePassed = 0;
    this.timeLeft = this.TIME_LIMIT;
    this.timerInterval = null;
    this.remainingPathColor = this.COLOR_CODES.info.color;

    this.reset();
  }

  reset() {
    this.innerHTML = `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="timer-circle">
          <circle class="path-elapsed" cx="50" cy="50" r="45"></circle>
          <path
            stroke-dasharray="283"
            class="path-remaining ${this.remainingPathColor}"
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
      <span class="label">${this.formatTime(this.timeLeft)}</span>
    `;
  }

  onTimesUp() {
    clearInterval(this.timerInterval);
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timePassed = this.timePassed += 1;
      this.timeLeft = this.TIME_LIMIT - this.timePassed;
      time = this.timePassed;

      this.querySelector("span.label").innerHTML = this.formatTime(
        this.timeLeft
      );
      this.setCircleDasharray();
      this.setRemainingPathColor(this.timeLeft);

      if (this.timeLeft < 0) {
        this.onTimesUp();
      }
    }, 1000);
  }

  formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`; 

  }

  calculateTimeFraction() {
    const rawTimeFraction = this.timeLeft / this.TIME_LIMIT;
    return rawTimeFraction - (1 / this.TIME_LIMIT) * (1 - rawTimeFraction);
  }

  setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = this.COLOR_CODES;
    if (this.timeLeft <= alert.threshold) {
      this.querySelector(".path-remaining").classList.remove(warning.color);
      this.querySelector(".path-remaining").classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      this.querySelector(".path-remaining").classList.remove(info.color);
      this.querySelector(".path-remaining").classList.add(warning.color);
    }
  }

  setCircleDasharray() {
    const circleDasharray = `${(
      this.calculateTimeFraction() * this.FULL_DASH_ARRAY
    ).toFixed(0)} 283`;

    this.querySelector(".path-remaining").setAttribute(
      "stroke-dasharray",
      circleDasharray
    );
  }

  connectedCallback() {
    this.startTimer();
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    if (attribute == "time-limit-in-seconds") {
      this.TIME_LIMIT = parseInt(newValue);
    }
  }

  disconnectedCallback() {}
}

customElements.define("countdown-timer", CountdownTimer);

window.addEventListener("DOMContentLoaded", () => {
  loadQuestion(QUESTION_INDEX);
  console.log(name)
});

function loadProgressbar() {
  document.getElementById("progress-bar").style.width =
    (QUESTION_INDEX / QUESTION_COUNT) * 100 + "%";
  document.getElementById(
    "text-bar"
  ).innerHTML = `${QUESTION_INDEX}/${QUESTION_COUNT}`;
}

async function loadQuestion(index) {
  
  var question = questionBase[index];
  let html = "";
  let options = [...question.distractors];
  options.push(question.answer);

  options.sort(() => Math.random() - 0.5);

  html += `<div id="header">
                
    <h4 id="question">${question.question}</h4>
    <img id="image" src="${question.image}" style="width:29%;height:400px;object-fit: contain;">
  </div>

  <div class="radio">
    <div>
      <input type="radio" name="option" id="option1">
      <label for="option1" id="label1" align="center"><img id="image1" src="${options[0]}" style="width:90%;height:100px;object-fit: contain;"></label>
    </div>

    <div>
      <input type="radio" name="option" id="option2">
      <label for="option2" id="label2" align="center"><img id="image2" src="${options[1]}" style="width:90%;height:100px;object-fit: contain;"></label>
    </div>

    <div>
      <input type="radio" name="option" id="option3">
      <label for="option3" id="label3" align="center"><img id="image3" src="${options[2]}" style="width:90%;height:100px;object-fit: contain;"></label>
    </div>

    <div>
      <input type="radio" name="option" id="option4">
      <label for="option4" id="label4" align="center"><img id="image4" src="${options[3]}" style="width:90%;height:100px;object-fit: contain;"></label>
    </div>
  </div>`;

  document.getElementById("board").innerHTML = html;
  loadProgressbar();
}

const optionButton = document.getElementById('optionButton')

optionButton.addEventListener('click', selectOption)

async function selectOption(){

  for (let i = 1; i <= 4; i++) {
    if (document.getElementById(`option${i}`).checked) {
      let txt = document.getElementById(`image${i}`).src;
      if (questionBase[QUESTION_INDEX].answer.trim() == txt.trim()) {
        await Swal.fire({
          title: "Respuesta correcta",
          html: "La respuesta es correcta",
          icon: "success",
        });
        SCORE++;
      } else {
        await Swal.fire({
          title: "Respuesta incorrecta",
          html: `La respuesta correcta es <img id="image" src="${questionBase[QUESTION_INDEX].answer}" style="width:90%;height:100px;object-fit: contain;">`,
          icon: "error",
        });
      }
      //const timer = new CountdownTimer();
    }
  }

  QUESTION_INDEX++;
  if (QUESTION_INDEX >= questionBase.length) {
    //Acá se guarda el intento y se reinicia el cuestionario
    //const querySnapshot = await getRanking()
    loadProgressbar();
    saveKid("Brandon", SCORE, time);
    await Swal.fire({
      title: "Quiz finalizado",
      html: `Tu puntaje es: ${SCORE}/${questionBase.length}`,
      icon: "success",
    });
    
    SCORE = 0;
    QUESTION_INDEX = 0;
    window.open("./index.html", "_self");
  }
  loadQuestion(QUESTION_INDEX);
}

