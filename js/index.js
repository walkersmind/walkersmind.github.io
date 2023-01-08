const nickname = document.getElementsByClassName("nickname")[0];
const nicknameForm = document.querySelector("#userNickname");
const time = document.querySelector("#time");
const weather = document.querySelector("#weather");

//투두 리스트 관리하기
const todoList = document.querySelector("#todoList");
const todoListForm = todoList.querySelector("form");
const ul = todoList.querySelector("ul");

let addedTodoList = [];

//닉네임 설정하기
const userGreeting = nickname.querySelector("h2");

function handleNickname(event) {
  event.preventDefault();

  const userNickname = nicknameForm.querySelector("input").value;

  localStorage.setItem("nickname", `${userNickname}`);

  userGreeting.innerText = `${localStorage.nickname}님 안녕하세요!`;

  nicknameForm.classList.add("hidden");
  time.classList.remove("hidden");
  todoList.classList.remove("hidden");

  randomQuote();
}

// 현재 시간 보여주기.
function showTime() {
  const getTime = new Date();

  const hours = String(getTime.getHours()).padStart(2, "0");
  const minutes = String(getTime.getMinutes()).padStart(2, "0");
  const seconds = String(getTime.getSeconds()).padStart(2, "0");

  const currentTime = `${hours}:${minutes}:${seconds}`;

  time.innerText = currentTime;
}

setInterval(showTime, 1000);
showTime();

// 명언 보여주기
const quotesList = [
  "The greatest glory in living lies not in never falling, but in rising every time we fall. -Nelson Mandela",
  "The way to get started is to quit talking and begin doing. -Walt Disney",
  "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking. -Steve Jobs",
  "If life were predictable it would cease to be life, and be without flavor. -Eleanor Roosevelt",
  "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough. -Oprah Winfrey",
  "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success. -James Cameron",
  "Life is what happens when you're busy making other plans. -John Lennon",
];

const quotes = document.querySelector("#quotes");

function randomQuote() {
  const quote = quotesList[Math.floor(Math.random() * quotesList.length)];
  quotes.innerText = quote;
}

//닉네임 존재 여부 확인
if (localStorage.nickname) {
  userNickname.classList.add("hidden");
  userGreeting.innerText = `${localStorage.nickname}님 안녕하세요!`;
  randomQuote();
  time.classList.remove("hidden");
  todoList.classList.remove("hidden");
} else {
  nicknameForm.addEventListener("submit", handleNickname);
}

//투두 리스트 불러오기(로컬 스토리지)
if (localStorage.getItem("todoList")) {
  addedTodoList = JSON.parse(localStorage.getItem("todoList"));

  function addExistedTodoList(element) {
    const li = document.createElement("li");
    const button = document.createElement("button");

    ul.appendChild(li);
    li.innerText = element;
    button.innerText = "X";
    li.appendChild(button);
  }

  addedTodoList.forEach(addExistedTodoList);
}

function handleTodoListForm(event) {
  event.preventDefault();

  const li = document.createElement("li");
  const button = document.createElement("button");
  const input = todoList.querySelector("input");

  if (input.value) {
    ul.appendChild(li);
    li.innerText = `${input.value}`;
    button.innerText = "x";
    li.appendChild(button);
    addedTodoList.push(input.value);

    // new Date()를 키 값으로 저장하기

    localStorage.setItem("todoList", JSON.stringify(addedTodoList));
    input.value = "";
  }
}

const tasks = document.getElementsByClassName("tasks")[0];

//투두 리스트 로컬스트리지에 추가하기
todoListForm.addEventListener("submit", handleTodoListForm);

//투두 리스트 삭제하기
function handleDeleteButton(event) {
  if (event.target.tagName === "BUTTON") {
    const li = event.target.parentElement;

    event.target.remove();

    //로컬 스토리지에서 투두 리스트 삭제하기
    const newAddedTodoList = addedTodoList.filter(
      (element) => element !== li.innerText
    );

    //🚨 동일한 투두 리스트 입력 시 모두 삭제되는 문제
    addedTodoList = newAddedTodoList;
    localStorage.setItem("todoList", JSON.stringify(addedTodoList));

    li.remove();
  }
}

ul.addEventListener("click", handleDeleteButton);

//배경 이미지 랜덤 변경
const body = document.querySelector("body");

const imagesURL = [
  "./images/1.jpg",
  "./images/2.jpg",
  "./images/3.jpg",
  "./images/4.jpg",
  "./images/5.jpg",
  "./images/6.jpg",
];

let randomImage = imagesURL[Math.floor(Math.random() * imagesURL.length)];

body.style.backgroundImage = `url(${randomImage})`;

//날씨 보여주기
