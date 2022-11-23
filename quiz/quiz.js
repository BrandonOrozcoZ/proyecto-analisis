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
  appId: "1:109271917334:web:92a74c465c489e78816637",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

var paramstr = window.location.search.substr(1);
var paramarr = paramstr.split("&");
var params = {};

for (var i = 0; i < paramarr.length; i++) {
  var tmparr = paramarr[i].split("=");
  params[tmparr[0]] = tmparr[1];
}

const name = params["name"];

const saveKid = (name, score, time) => {
  addDoc(collection(db, "users"), { name, score, time });
};

const QUESTION_COUNT = questionBase.length;
let QUESTION_INDEX = 0;
let DIFICULT_INDEX = 0;//Math.floor(Math.random() * 5);
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
    finish("time");
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
});

function loadProgressbar() {
  document.getElementById("progress-bar").style.width =
    (QUESTION_INDEX / QUESTION_COUNT) * 100 + "%";
  document.getElementById(
    "text-bar"
  ).innerHTML = `${QUESTION_INDEX}/${QUESTION_COUNT}`;
}

async function loadQuestion(index) {
  var question = questionBase[index][DIFICULT_INDEX];
  let html = "";
  let options = [...question.distractors];
  options.push(question.answer);

  options.sort(() => Math.random() - 0.5);

  html += `<div id="header">
                
    <h4 id="question">${question.question}</h4>
    <img id="image" src="${question.image}">
  </div>

  <div class="radio">
    <div>
      <input type="radio" name="option" id="option1">
      <label for="option1" id="label1" align="center"><img class="answers" id="image1" src="${options[0]}"></label>
    </div>

    <div>
      <input type="radio" name="option" id="option2">
      <label for="option2" id="label2" align="center"><img class="answers" id="image2" src="${options[1]}"></label>
    </div>

    <div>
      <input type="radio" name="option" id="option3">
      <label for="option3" id="label3" align="center"><img class="answers" id="image3" src="${options[2]}"></label>
    </div>

    <div>
      <input type="radio" name="option" id="option4">
      <label for="option4" id="label4" align="center"><img class="answers" id="image4" src="${options[3]}"></label>
    </div>
  </div>`;

  document.getElementById("board").innerHTML = html;
  loadProgressbar();
}

const optionButton = document.getElementById("optionButton");

optionButton.addEventListener("click", selectOption);

async function selectOption() {
  for (let i = 1; i <= 4; i++) {
    if (document.getElementById(`option${i}`).checked) {
      let txt = document.getElementById(`image${i}`).src;
      if (
        questionBase[QUESTION_INDEX][DIFICULT_INDEX].answer.trim() == txt.trim()
      ) {
        await Swal.fire({
          title: "Respuesta correcta",
          html: "La respuesta es correcta",
          icon: "success",
        });
        /* if (DIFICULT_INDEX < 4) {
          DIFICULT_INDEX++;
        } */

        SCORE++;
      } else {
        await Swal.fire({
          title: "Respuesta incorrecta",
          html: `La respuesta correcta es <img id="image" src="${questionBase[QUESTION_INDEX][DIFICULT_INDEX].answer}" style="width:90%;height:100px;object-fit: contain;">`,
          icon: "error",
        });

        /* if (DIFICULT_INDEX > 0) {
          DIFICULT_INDEX--;
        } */
      }
      //const timer = new CountdownTimer();
    }
  }

  QUESTION_INDEX++;
  if (QUESTION_INDEX >= questionBase.length) {
    //Acá se guarda el intento y se reinicia el cuestionario
    loadProgressbar();
    finish();
  }else{
    loadQuestion(QUESTION_INDEX);
  }
  
}

async function finish(message) {
  if (message == "time") {
    message = "Oh no! Se acabó el tiempo";
  } else {
    message = "Quiz finalizado";
  }

  saveKid(name, SCORE, time);
  await Swal.fire({
    title: message,
    html: `Tu puntaje es: ${SCORE}/${questionBase.length}`,
    icon: "success",
  });

  SCORE = 0;
  QUESTION_INDEX = 0;
  window.open("../index.html", "_self");
}
