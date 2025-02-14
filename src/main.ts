import { QuizItem, Questions } from "./data";

//- select element
const contentElement = document.querySelector<HTMLDivElement>("#content");

//* create a dynamicish website with a quiz that provides per question:
// a picture -> img (Questions.url)
// a question -> p (Questions.question)
// choices -> buttons each that can get clicked and change their styling with click, yellow for wrong, green for right (Questions.choices + Questions.answer)

// - we need:
//  a function that renders the information into the cards/ questions with .forEach
//  onclick addEventListener(), which does the logic for the buttons

function createHeadline() {
  const h1 = document.createElement("h1");
  h1.className =
    "text-6xl uppercase font-semibold animate-bounce transition hover:animate-none cursor-default hover:text-yellow hover:text-5xl";
  h1.textContent = "Quiz about stuff";
  contentElement?.appendChild(h1);
}
createHeadline();

function renderQuestions(questions: QuizItem[]) {
  questions.forEach((question: QuizItem) => {
    //? create Elements
    const newQuizContainer = document.createElement("div");
    newQuizContainer.className =
      "flex flex-col gap-2 items-center justify-center bg-grey pb-5 rounded-xl shadow transition ease-in-out hover:shadow-2xl";
    const newQuizPictureContainer = document.createElement("div");
    newQuizPictureContainer.className = "h-[50%] overflow-hidden";
    ("transition ease-in-out hover:shadow-xl");
    // ? give the newQuizPictureContainer an img:
    newQuizPictureContainer.innerHTML = `<img class=" object-cover rounded-t-xl shadow-2xs" src="${question.url}" alt="well, we do not have a description. So sorry.">`;
    const newQuizQuestion = document.createElement("p");
    newQuizQuestion.className = "text-xl font-semibold";
    // ? give newQuizQuestion the content:
    newQuizQuestion.textContent = question.question;
    // - give newButtonContainer buttons:
    const newButtonContainer = document.createElement("div");
    newButtonContainer.className = "flex gap-4 items-center justify-evenly";
    question.choices.forEach((choice) => {
      const newButton = document.createElement("button");
      newButton.className =
        "cursor-pointer border-2 border-green p-2 rounded-xl transition ease-in-out hover:bg-green hover:text-grey";
      newButton.textContent = `${choice}`;
      newButtonContainer.appendChild(newButton);
      //- add EventListener() to the button
      newButton.addEventListener("click", () => {
        if (choice === question.answer) {
          newButton.className = "text-grey bg-green p-2 rounded-xl";
          newQuizQuestion.className = "text-green text-3xl animate-bounce";
          newQuizQuestion.textContent = "Correct!";
        } else {
          newButton.className = "text-grey bg-yellow p-2 rounded-xl";
          newQuizQuestion.className = "text-yellow text-2xl";
          newQuizQuestion.textContent = "Incorrect. Try again.";
        }
      });
    });
    // ? put a div(card) into the main div for the new question
    contentElement?.appendChild(newQuizContainer);
    // ? put the filled img in the div
    newQuizContainer.appendChild(newQuizPictureContainer);
    //? put the filled p in the div
    newQuizContainer.appendChild(newQuizQuestion);
    //? put newButtonContainer in div
    newQuizContainer.appendChild(newButtonContainer);
  });
}
renderQuestions(Questions);
