// p4-module.js

// Import the data from p4-data.js
const { data } = require("./p4-data");

// 1. Get all questions
function getQuestions() {
  return data.map((item) => item.question);
}

// 2. Get all answers
function getAnswers() {
  return data.map((item) => item.answer);
}

// 3. Get all questions and answers
function getQuestionsAnswers() {
  return [...data]; // A copy of the original data array
}

// 4. Get a specific question by number
function getQuestion(number = "") {
  const num = parseInt(number);
  if (isNaN(num)) {
    return { error: "Question number must be an integer", question: "", number: "" };
  }
  if (num < 1) {
    return { error: "Question number must be >= 1", question: "", number: "" };
  }
  if (num > data.length) {
    return { error: `Question number must be less than the number of questions (${data.length})`, question: "", number: "" };
  }
  return { error: "", question: data[num - 1].question, number: num };
}

// 5. Get a specific answer by number
function getAnswer(number = "") {
  const num = parseInt(number);
  if (isNaN(num)) {
    return { error: "Answer number must be an integer", answer: "", number: "" };
  }
  if (num < 1) {
    return { error: "Answer number must be >= 1", answer: "", number: "" };
  }
  if (num > data.length) {
    return { error: `Answer number must be less than the number of answers (${data.length})`, answer: "", number: "" };
  }
  return { error: "", answer: data[num - 1].answer, number: num };
}

// 6. Get a specific question and its corresponding answer by number
function getQuestionAnswer(number = "") {
  const num = parseInt(number);
  if (isNaN(num)) {
    return { error: "Question number must be an integer", question: "", answer: "", number: "" };
  }
  if (num < 1) {
    return { error: "Question number must be >= 1", question: "", answer: "", number: "" };
  }
  if (num > data.length) {
    return { error: `Question number must be less than the number of questions (${data.length})`, question: "", answer: "", number: "" };
  }
  return { error: "", question: data[num - 1].question, answer: data[num - 1].answer, number: num };
}

function addQuestionAnswer(info = {}) {
    if (!info.question) {
      return { error: "Object question property required", message: "", number: -1 };
    }
    if (!info.answer) {
      return { error: "Object answer property required", message: "", number: -1 };
    }
  
    data.push({ question: info.question, answer: info.answer });
  
    return {
      error: "",
      message: "Question added",
      number: data.length,
    };
  }

  function updateQuestionAnswer(info = {}) {
    const { number, question, answer } = info;
  
    if (!question && !answer) {
      return {
        error: "Object question property or answer property required",
        message: "",
        number: "",
      };
    }
  
    const num = parseInt(number);
    if (isNaN(num)) {
      return {
        error: "Object number property must be a valid integer",
        message: "",
        number: "",
      };
    }
  
    if (num < 1 || num > data.length) {
      return {
        error: `Question number must be between 1 and ${data.length}`,
        message: "",
        number: "",
      };
    }
  
    if (question) data[num - 1].question = question;
    if (answer) data[num - 1].answer = answer;
  
    return {
      error: "",
      message: `Question ${num} updated`,
      number: num,
    };
  }  
  
  function deleteQuestionAnswer(number = "") {
    const num = parseInt(number);
  
    if (isNaN(num)) {
      return {
        error: "Question/answer number must be an integer",
        message: "",
        number: "",
      };
    }
  
    if (num < 1) {
      return {
        error: "Question/answer number must be >= 1",
        message: "",
        number: "",
      };
    }
  
    if (num > data.length) {
      return {
        error: `Question/answer number must be less than the number of questions (${data.length})`,
        message: "",
        number: "",
      };
    }
  
    data.splice(num - 1, 1);
  
    return {
      error: "",
      message: `Question ${num} deleted`,
      number: num,
    };
  }
  

// Export all the functions for use in the REST API server
module.exports = {
    getQuestions,
    getAnswers,
    getQuestionsAnswers,
    getQuestion,
    getAnswer,
    getQuestionAnswer,
    addQuestionAnswer,
    updateQuestionAnswer,
    deleteQuestionAnswer, // <== Add this
  };
  


