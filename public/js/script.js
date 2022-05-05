//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeCount = document.querySelector(".timer .timer_sec");

// 5 questions
const limited_qs = [];
const is = [];
while (limited_qs.length < 5) {
  const random = Math.floor(Math.random() * 12);
  while (limited_qs.indexOf(questions[random]) === -1) {
    limited_qs.push(questions[random]);
    is.push(random);
  }
}

// if startQuiz button clicked
start_btn.onclick = () => {
  info_box.classList.add("activeInfo");
  // console.log(limited_qs);
  // console.log(is);
};

// if exitQuiz button clicked
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
};

// if continueQuiz button clicked
continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
  quiz_box.classList.add("activeQuiz");
  showQuetions(0);
  queCounter(1);
  startTimer();
  startTimerLine(0);
};

let timeValue = 20;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz");
  result_box.classList.remove("activeResult");
  timeValue = 20;
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  showQuetions(que_count);
  queCounter(que_numb);
  clearInterval(counter);
  clearInterval(counterLine);
  startTimer(timeValue);
  startTimerLine(widthValue);
  next_btn.classList.remove("show");
};

// if quitQuiz button clicked
quit_quiz.onclick = () => {
  window.location.reload();
};

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = () => {
  if (que_count < limited_qs.length - 1) {
    que_count++;
    que_numb++;
    showQuetions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    next_btn.classList.remove("show");
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    showResult();
  }
};

// getting questions and options from array
function showQuetions(index) {
  const que_text = document.querySelector(".que_text");
  let que_tag =
    "<span>" +
    (limited_qs.indexOf(limited_qs[index]) + 1) +
    ". " +
    limited_qs[index].question +
    "</span>";
  let option_tag =
    '<div class="option"><span>' +
    limited_qs[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    limited_qs[index].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    limited_qs[index].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    limited_qs[index].options[3] +
    "</span></div>";
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;

  const option = option_list.querySelectorAll(".option");

  // set onclick attribute to all available options
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  let userAns = answer.textContent;
  let correcAns = limited_qs[que_count].answer;
  const allOptions = option_list.children.length;

  if (userAns == correcAns) {
    userScore += 4;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIconTag);
    console.log("Correct Answer");
    console.log("Your correct answers = " + userScore);
  } else {
    userScore -= 1;
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIconTag);

    for (i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correcAns) {
        option_list.children[i].setAttribute("class", "option correct");
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
        console.log("Auto selected correct answer.");
      }
    }
  }
  for (i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next_btn.classList.add("show");
}

function showResult() {
  info_box.classList.remove("activeInfo");
  quiz_box.classList.remove("activeQuiz");
  result_box.classList.add("activeResult");
  const scoreText = result_box.querySelector(".score_text");
  if (userScore > 10) {
    let scoreTag =
      "<span>and congrats! , You got <p>" +
      userScore +
      "</p> out of <p>" +
      "20" +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 5) {
    let scoreTag =
      "<span>and nice , You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      "<span>and sorry , You got only <p>" +
      userScore +
      "</p> out of <p>" +
      "20" +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    // timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeText.textContent = "Time Off";
      console.log("Time up");
      const allOptions = option_list.children.length;
      let correcAns = questions[que_count].answer;
      for (i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correcAns) {
          option_list.children[i].setAttribute("class", "option correct");
          option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
          console.log("Time Off: Auto selected correct answer.");
        }
      }
      for (i = 0; i < allOptions; i++) {
        console.log("Hi");
        option_list.children[i].classList.add("disabled");
      }
      next_btn.classList.add("show");
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1;
    time_line.style.width = time + "px";
    if (time > 549) {
      clearInterval(counterLine);
    }
  }
}

function queCounter(index) {
  let totalQueCounTag =
    "<span><p>" +
    index +
    "</p> of <p>" +
    limited_qs.length +
    "</p> Questions</span>";
  if (index === 5) {
    next_btn.textContent = "Finish!";
  }
  bottom_ques_counter.innerHTML = totalQueCounTag;
}
