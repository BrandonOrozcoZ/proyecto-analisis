(function ($) {
  var search_button = $(".btn"),
    close_button = $(".close"),
    input = $(".input"),
    submit = $(".submit"),
    button = $("#teacher");
  search_button.on("click", function () {
    $(this).parent().addClass("open");
    close_button.fadeIn(500);
    input.fadeIn(500);
    submit.fadeIn(500);
    button.fadeIn(500);
  });

  close_button.on("click", function () {
    search_button.parent().removeClass("open");
    close_button.fadeOut(500);
    input.fadeOut(500);
    submit.fadeOut(500);
    button.fadeOut(500);
  });
})(jQuery);


const form = document.getElementById('form')

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name');
  const child = name.value
  window.open("../quiz/quiz.html?name=" + child, "_self");
});

const teacher = document.getElementById('teacher')

teacher.addEventListener('click', (e) => {
  e.preventDefault();
  window.open("../teacherView/teacherView.html", "_self");  
});











