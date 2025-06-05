// p4-server.js

const express = require("express");
const {
  getQuestions,
  getAnswers,
  getQuestionsAnswers,
  getQuestion,
  getAnswer,
  getQuestionAnswer,
  addQuestionAnswer,
  updateQuestionAnswer,
  deleteQuestionAnswer,
} = require("./p4-module");

const app = express();
const port = 3000;

// Route: /cit/question
app.get("/cit/question", (req, res) => {
  res.json({
    error: "",
    statusCode: 200,
    questions: getQuestions(),
  });
});

// Route: /cit/answer
app.get("/cit/answer", (req, res) => {
  res.json({
    error: "",
    statusCode: 200,
    answers: getAnswers(),
  });
});

// Route: /cit/questionanswer
app.get("/cit/questionanswer", (req, res) => {
  res.json({
    error: "",
    statusCode: 200,
    questions_answers: getQuestionsAnswers(),
  });
});

// Route: /cit/question/:number
app.get("/cit/question/:number", (req, res) => {
  const result = getQuestion(req.params.number);
  res.json({
    error: result.error,
    statusCode: result.error ? 400 : 200,
    question: result.error ? "" : result.question,
    number: result.error ? "" : result.number,
  });
});

// Route: /cit/answer/:number
app.get("/cit/answer/:number", (req, res) => {
  const result = getAnswer(req.params.number);
  res.json({
    error: result.error,
    statusCode: result.error ? 400 : 200,
    answer: result.error ? "" : result.answer,
    number: result.error ? "" : result.number,
  });
});

// Route: /cit/questionanswer/:number
app.get("/cit/questionanswer/:number", (req, res) => {
  const result = getQuestionAnswer(req.params.number);
  res.json({
    error: result.error,
    statusCode: result.error ? 400 : 200,
    question: result.error ? "" : result.question,
    answer: result.error ? "" : result.answer,
    number: result.error ? "" : result.number,
  });
});

app.use(express.json());

// Route: /cit/question (POST)
app.post("/cit/question", (req, res) => {
    const result = addQuestionAnswer(req.body);
  
    res.status(result.error ? 400 : 201).json({
      error: result.error,
      statusCode: result.error ? 400 : 201,
      number: result.number,
    });
  });

  // Middleware to parse JSON bodies
app.use(express.json());

// PUT: /cit/question
app.put("/cit/question", (req, res) => {
  const result = updateQuestionAnswer(req.body);
  res.status(result.error ? 400 : 200).json({
    error: result.error,
    statusCode: result.error ? 400 : 200,
    number: result.error ? "" : result.number,
  });
});

app.delete("/cit/question/:number", (req, res) => {
    const result = deleteQuestionAnswer(req.params.number);
    res.status(result.error ? 400 : 200).json({
      error: result.error,
      statusCode: result.error ? 400 : 200,
      number: result.error ? "" : result.number,
    });
  });
  
  
// Catch-all unmatched route
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    statusCode: 404,
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

