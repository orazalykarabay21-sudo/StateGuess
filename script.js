const questions = [
  {
    q: "Как зовут главного героя сериала?",
    a: ["Патрик Джейн", "Тереза Лисбон", "Кимбалл Чо", "Оззи Осборн"],
    correct: 0
  },
  {
    q: "Какое прозвище было у Патрика Джейна, когда он притворялся экстрасенсом?",
    a: ["Мистер Икс", "Менталист", "Ясновидец", "Провидец"],
    correct: 1
  },
  {
    q: "Что стало причиной, по которой Джейн начал помогать полиции?",
    a: ["Скука", "Месть за убийство жены и дочери", "Дружба с Лисбон", "Работа мечты"],
    correct: 1
  },
  {
    q: "Кто убил жену и дочь Патрика Джейна?",
    a: ["Красный Джон", "Тигр, тигр", "Барбара Сью", "Джон Бродерик"],
    correct: 0
  },
  {
    q: "Как зовут главного антагониста сериала?",
    a: ["Красный Джон", "Красный Дракон", "Чёрный Джон", "Мистер Рэд"],
    correct: 0
  },
  {
    q: "Сколько лет Патрик Джейн скрывался после побега из CBI?",
    a: ["1 год", "2 года", "3 года", "5 лет"],
    correct: 0
  },
  {
    q: "Кто был директором CBI, а затем ФБР в сериале?",
    a: ["Тереза Лисбон", "Кимбалл Чо", "Деннис Эбботт", "Гейл Бертрам"],
    correct: 3
  },
  {
    q: "Как зовут агента CBI, который позже стал шерифом?",
    a: ["Уэйн Ригсби", "Кимбалл Чо", "Сэм Боско", "Гейл Бертрам"],
    correct: 0
  },
  {
    q: "Кто из команды CBI почти всегда молчалив и суров, но предан Джейну?",
    a: ["Ригсби", "Чо", "Ван Пелт", "Лисбон"],
    correct: 1
  },
  {
    q: "Как зовут девушку-детектива, которая часто флиртовала с Ригсби?",
    a: ["Грейс Ван Пелт", "Тереза Лисбон", "Эрика Флинн", "Кристин Ла Саль"],
    correct: 0
  },
  {
    q: "Какое хобби было у Патрика Джейна в свободное время?",
    a: ["Шахматы", "Рисование", "Игра на гитаре", "Коллекционирование чайников"],
    correct: 3
  },
  {
    q: "Что Патрик Джейн часто использовал, чтобы расслабить подозреваемых?",
    a: ["Гипноз", "Чай", "Шутки", "Музыку"],
    correct: 1
  },
  {
    q: "Как называется эпизод, где Джейн наконец находит Красного Джона?",
    a: ["Red John", "The Mentalist", "My Blue Heaven", "Red Dawn"],
    correct: 0
  },
  {
    q: "Сколько сезонов длился сериал «Менталист»?",
    a: ["5", "6", "7", "8"],
    correct: 2
  },
  {
    q: "Кем стал Патрик Джейн в финале сериала?",
    a: ["Агентом ФБР", "Шерифом", "Частным детективом", "Профессором"],
    correct: 0
  }
];

let currentIndex = 0;
let score = 0;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const nextBtn = document.getElementById('next-btn');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers');
const feedback = document.getElementById('feedback');
const currentQ = document.getElementById('current-q');
const totalQ = document.getElementById('total-q');
const progressFill = document.getElementById('progress-fill');
const scoreEl = document.getElementById('score');
const maxScoreEl = document.getElementById('max-score');
const resultMessage = document.getElementById('result-message');

totalQ.textContent = questions.length;

function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

function startQuiz() {
  currentIndex = 0;
  score = 0;
  showScreen(quizScreen);
  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentIndex];
  currentQ.textContent = currentIndex + 1;
  questionText.textContent = q.q;
  feedback.textContent = '';
  feedback.classList.remove('correct');
  nextBtn.classList.add('hidden');
  answersContainer.innerHTML = '';

  progressFill.style.width = ((currentIndex) / questions.length) * 100 + '%';

  q.a.forEach((answer, i) => {
    const btn = document.createElement('button');
    btn.classList.add('answer-btn');
    btn.textContent = answer;
    btn.addEventListener('click', () => selectAnswer(i, btn));
    answersContainer.appendChild(btn);
  });
}

function selectAnswer(index, btn) {
  const q = questions[currentIndex];
  const buttons = answersContainer.querySelectorAll('.answer-btn');
  buttons.forEach(b => b.disabled = true);

  if (index === q.correct) {
    btn.classList.add('correct');
    score++;
    feedback.textContent = '✅ Правильно!';
    feedback.classList.add('correct');
  } else {
    btn.classList.add('wrong');
    buttons[q.correct].classList.add('correct');
    feedback.textContent = `❌ Неправильно. Правильный ответ: ${q.a[q.correct]}`;
    feedback.classList.remove('correct');
  }

  progressFill.style.width = ((currentIndex + 1) / questions.length) * 100 + '%';
  nextBtn.classList.remove('hidden');
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  showScreen(resultScreen);
  scoreEl.textContent = score;
  maxScoreEl.textContent = questions.length;

  const percent = (score / questions.length) * 100;
  let msg = '';

  if (percent === 100) {
    msg = '🏆 Идеально! Ты настоящий Менталист!';
  } else if (percent >= 80) {
    msg = '🎩 Отлично! Патрик Джейн гордился бы тобой.';
  } else if (percent >= 60) {
    msg = '🕵️ Неплохо! Ты явно смотрел сериал внимательно.';
  } else if (percent >= 40) {
    msg = '📺 Средне. Пора пересмотреть пару сезонов.';
  } else {
    msg = '😅 Слабо. Красный Джон был бы разочарован.';
  }

  resultMessage.textContent = msg;
}

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
