
const TIME_LIMIT = 20;
let timePassed = 0;
let timeLeft = TIME_LIMIT;

let QUESTION_COUNT = 2;
let QUESTION_INDEX = 0;
let SCORE = 0;

(function ($) {
    var search_button = $(".btn"),
      close_button = $(".close"),
      input = $(".input"),
      submit = $(".submit");
    search_button.on("click", function () {
      $(this).parent().addClass("open");
      close_button.fadeIn(500);
      input.fadeIn(500);
      submit.fadeIn(500);
    });
  
    close_button.on("click", function () {
      search_button.parent().removeClass("open");
      close_button.fadeOut(500);
      input.fadeOut(500);
      submit.fadeOut(500);
    });
})(jQuery);

var name;
/*const form = document.getElementById('form')
form.addEventListener('submit', (e) => {
    
    name = document.getElementById("name").value;
    console.log(name)
    form.reset()
    
});*/

loadQuestion(QUESTION_INDEX);

function loadProgressbar(){
    console.log(name)
    document.getElementById("progress-bar").style.width = QUESTION_INDEX/QUESTION_COUNT * 100 + "%";
    document.getElementById("text-bar").innerHTML = `${QUESTION_INDEX}/${QUESTION_COUNT}`;
}

async function loadQuestion(index){

    console.log(name)
    question = questionBase[index];
    let html = "";
    let options = [...question.distractors];
    options.push(question.answer);

    options.sort(() => Math.random() - 0.5);

    html += `<div id="header">
                
    <span id="question">${question.question}</span>
    <img id="image" src="${question.image}" style="width:28%;height:400px;object-fit: contain;">
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

async function selectOption(){
    
    for(let i = 1; i <= 4; i++){
        if(document.getElementById(`option${i}`).checked){
            let txt = document.getElementById(`image${i}`).src
            if(questionBase[QUESTION_INDEX].answer.trim() == txt.trim()){
                await Swal.fire({
                    title:"Respuesta correcta",
                    html:"La respuesta es correcta",
                    icon:"success",
                });
                SCORE++;
            }else{
                await Swal.fire({
                    title:"Respuesta incorrecta",
                    html: `La respuesta correcta es <img id="image" src="${questionBase[QUESTION_INDEX].answer}" style="width:90%;height:100px;object-fit: contain;">`,
                    icon:"error",
                });
            }
        }
    }
    
    QUESTION_INDEX++;
    if(QUESTION_INDEX >= questionBase.length){
        //Acá se guarda el intento y se reinicia el cuestionario

        //saveResult(name, score, time)
        //const querySnapshot = await getRanking()
        loadProgressbar();
        await Swal.fire({
            title: "Quiz finalizado",
            html: `Tu puntaje es: ${SCORE}/${questionBase.length}`,
            icon: "success",
        });
        saveResult();
        SCORE = 0;
        QUESTION_INDEX = 0;
        window.open("../loginKids/loginKids.html", "_self")
    }
    loadQuestion(QUESTION_INDEX);
    
}

async function saveResult() {
    console.log("Brandon")
    fs.collection("users").add({
        name: "Brandon2",
        score: SCORE,
        time: 24
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

class CountdownTimer extends HTMLElement {
    static get observedAttributes(){
      return ['time-limit-in-seconds']
    }
  
    constructor(){
      super()
  
      this.FULL_DASH_ARRAY = 283;
      this.WARNING_THRESHOLD = 10;
      this.ALERT_THRESHOLD = 5;
  
      this.COLOR_CODES = {
        info: {
          color: "green"
        },
        warning: {
          color: "orange",
          threshold: this.WARNING_THRESHOLD
        },
        alert: {
          color: "red",
          threshold: this.ALERT_THRESHOLD
        }
      };
  
      this.timePassed = 0;
      this.timeLeft = this.TIME_LIMIT;
      this.timerInterval = null;
      this.remainingPathColor = this.COLOR_CODES.info.color;
  
      this.reset()
    }
  
    reset(){
  
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
        <span class="label">${this.formatTime(
          this.timeLeft
        )}</span>
      `;
  
    }
  
    onTimesUp() {
      clearInterval(this.timerInterval);
    }
  
    startTimer() {
      this.timerInterval = setInterval(() => {
        this.timePassed = this.timePassed += 1;
        this.timeLeft = this.TIME_LIMIT - this.timePassed;
  
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
        this
          .querySelector(".path-remaining")
          .classList.remove(warning.color);
        this
          .querySelector(".path-remaining")
          .classList.add(alert.color);
      } else if (timeLeft <= warning.threshold) {
        this
          .querySelector(".path-remaining")
          .classList.remove(info.color);
        this
          .querySelector(".path-remaining")
          .classList.add(warning.color);
      }
    }
  
    setCircleDasharray() {
      const circleDasharray = `${(
        this.calculateTimeFraction() * this.FULL_DASH_ARRAY
      ).toFixed(0)} 283`;
  
      this
        .querySelector(".path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
    }
  
  
    connectedCallback(){
      this.startTimer();
    }
  
    attributeChangedCallback(attribute, oldValue, newValue){
      if(attribute == 'time-limit-in-seconds'){
        this.TIME_LIMIT = parseInt(newValue)
      }
    }
  
    disconnectedCallback(){
  
    }
  }
  
  customElements.define('countdown-timer', CountdownTimer)