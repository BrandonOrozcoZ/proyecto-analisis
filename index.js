
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
    let question = questionBase[index];
    let html = "";
    let options = [...question.distractors];
    options.push(question.answer);

    options.sort(() => Math.random() - 0.5);

    html += `<div id="header">
                
    <span id="question">${question.question}</span>
    <br>
    <img id="image" src="${question.image}" style="width:90%;height:100px;object-fit: contain;">
    </div>

    <div class="radio">
        <div>
            <input type="radio" name="option" id="option1">
            <img id="label1" src="${options[0]}" style="width:90%;height:100px;object-fit: contain;">
        </div>

        <div>
            <input type="radio" name="option" id="option2">
            <label for="option2" id="label2">${options[1]}</label>
        </div>

        <div>
            <input type="radio" name="option" id="option3">
            <label for="option3" id="label3">${options[2]}</label>
        </div>

        <div>
            <input type="radio" name="option" id="option4">
            <label for="option4" id="label4">${options[3]}</label>
        </div>
    </div>`;

    document.getElementById("board").innerHTML = html;
    loadProgressbar();
}

async function selectOption(){
    
    for(let i = 1; i <= 4; i++){
        if(document.getElementById(`option${i}`).checked){
            let txt = document.getElementById(`label${i}`).innerHTML
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
                    html: `La respuesta correcta es "${questionBase[QUESTION_INDEX].answer}"`,
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
        window.open("/loginKids.html", "_self")
    }
    loadQuestion(QUESTION_INDEX);
    
}

async function saveResult() {
    fs.collection("users").add({
        name: "Brandon2",
        score: SCORE,
        time: 24,
    });
}
