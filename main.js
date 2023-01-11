const questions = [
  {
    question:
      "Как называется стиль живописи точечными или прямоугольными мазками без смешения красок?",
    answers: ["Импрессионизм", "Пуантилизм", "Авангард", "Классицизм"],
    correct: 2,
  },
  {
    question: "Кто написал Девочку с персиками?",
    answers: [
      "Виктор Васнецов",
      "Алексей Саврасов",
      "Илья Репин",
      "Валентин Серов",
    ],
    correct: 4,
  },
  {
    question: "В какой стране возник импрессионизм?",
    answers: ["Франция", "Германия", "Италия", "Португалия"],
    correct: 1,
  },
  {
    question: "В каком веке была написана Мона Лиза?",
    answers: ["15", "16", "17", "все ответы неверные"],
    correct: 1,
  },
];
let score = 0;
let indexQuestion = 0;
const headerHTML = document.querySelector("#header");
const questionsListHTML = document.querySelector("#list");
const answerBtn = document.querySelector("#submit");

let clearHTML = function () {
  headerHTML.innerHTML = "";
  questionsListHTML.innerHTML = "";
};
clearHTML();

//Вопрос
let showQuestion = function () {
  //questions[indexQuestion]["question"];
  const headerTemplate = `<h2 class="title">%title%</h2>`;
  const title = headerTemplate.replace(
    "%title%",
    questions[indexQuestion]["question"]
  );
  headerHTML.innerHTML = title;
  //Ответы
  let answerNumber = 1;
  for (const answerText of questions[indexQuestion]["answers"]) {
    const questionTemplate = `
      <li>
				<label>
					<input value = "%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`;

    const answerHTML = questionTemplate
      .replace("%answer%", answerText)
      .replace("%number%", answerNumber);
    questionsListHTML.innerHTML += answerHTML;
    answerNumber++;
  }
};

showQuestion();

let checkAnswers = function () {
  const checkedRadio = questionsListHTML.querySelector(
    'input[type="radio"]:checked'
  );
  if (!checkedRadio) {
    answerBtn.blur();
    return;
  }
  const userAnswer = parseInt(checkedRadio.value); //получаем всегда строку, переводим в число
  if (userAnswer === questions[indexQuestion]["correct"]) {
    score++;
  }
  if (indexQuestion !== questions.length - 1) {
    indexQuestion++;
    clearHTML();
    showQuestion();
    return;
  } else {
    clearHTML();
    showResults();
  }
};

answerBtn.onclick = checkAnswers;
function showResults() {
  const resultTemplate = `
      <h2 class="title">%title%</h2>
			<h3 class="summary">%message%</h3>
			<p class="result">%result%</p>`;
  let title, message;
  if (score === questions.length) {
    title = "Вот это да 😲";
    message = "Вы настоящий знаток 👨🏻‍🎓";
  } else if ((score * 100) / questions.length >= 50) {
    title = "Здорово 😺";
    message = "Вы неплохо справились 💪🏻";
  } else {
    title = "Ничего страшного 💩";
    message = "В другой раз будет лучше 🤕";
  }
  let result = `${score} из ${questions.length}`;
  const finalMessage = resultTemplate
    .replace("%title%", title)
    .replace("%message%", message)
    .replace("%result%", result);
  headerHTML.innerHTML = finalMessage;
  answerBtn.blur();
  answerBtn.innerText = `Начать заново`;
  answerBtn.onclick = () => history.go();
}
