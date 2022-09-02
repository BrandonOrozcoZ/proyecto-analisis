let QUESTION_INDEX = 0;
let score = 0;

loadQuestion(QUESTION_INDEX);

function loadQuestion(index){
    question = questionBase[index]

    options = [...question.distractors];
    options.push(question.answer);

    options.sort(() => Math.random() - 0.5);

    document.getElementById("question").innerHTML = question.question;
    
    if(question.image){
        document.getElementById("image").src = question.image;
        document.getElementById("image").style.display = "";
    }else{
        document.getElementById("image").style.display = "none";
    }
    

    document.getElementById("1st-option").innerHTML = options[0];
    document.getElementById("2nd-option").innerHTML = options[1];
    document.getElementById("3rd-option").innerHTML = options[2];
    document.getElementById("4th-option").innerHTML = options[3];
}

async function selectOption(index){
    let flag = options[index] == question.answer

    if(flag){
        await Swal.fire({
            title:"Respuesta correcta",
            html:"La respuesta es correcta",
            icon:"success",
        });
        score++;
    }else{
        await Swal.fire({
            title:"Respuesta incorrecta",
            html: `La respuesta correcta es "${question.answer}"`,
            icon:"error",
        });
    }

    QUESTION_INDEX++;
    if(QUESTION_INDEX >= questionBase.length){
        await Swal.fire({
            title: "Quiz finalizado",
            html: `Tu puntaje es: ${score}/${questionBase.length}`,
            icon: "success",
        });
        score = 0;
        QUESTION_INDEX = 0;
    }
    loadQuestion(QUESTION_INDEX);
    
    
}