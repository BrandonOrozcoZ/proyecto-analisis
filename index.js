let QUESTION_COUNT = 2;
let QUESTION_INDEX = 0;
let SCORE = 0;

loadQuestion(QUESTION_INDEX);

function loadProgressbar(){
    document.getElementById("progress-bar").style.width = QUESTION_INDEX/QUESTION_COUNT * 100 + "%";
    document.getElementById("text-bar").innerHTML = `${QUESTION_INDEX}/${QUESTION_COUNT}`;
}

function loadQuestion(index){
    question = questionBase[index]
    let html = "";
    options = [...question.distractors];
    options.push(question.answer);

    options.sort(() => Math.random() - 0.5);

    html += `<div id="header">
                
    <span id="question">${question.question}</span>
    <br>
    <img id="image" src="${question.image}" style="width:90%;height:100px;object-fit: contain;">
    </div>

    <div>
        <input type="radio" name="option" id="option1">
        <label for="option1" id="label1">${options[0]}</label>
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
        loadProgressbar();
        await Swal.fire({
            title: "Quiz finalizado",
            html: `Tu puntaje es: ${SCORE}/${questionBase.length}`,
            icon: "success",
        });
        SCORE = 0;
        QUESTION_INDEX = 0;
    }
    loadQuestion(QUESTION_INDEX);
    
}