const router = require("express").Router();
var Todo = require("./model");

function findAllTodo(req, res) {
  Todo.find((err, todos) => {
    if (err) {
      console.log(err);
    }
    res.json(todos);
  });
}

function findOneTodo(req, res) {
  let id = req.params.id;
  Todo.findById(id, (err, todo) => {
    if (err) {
      console.log(err);
    }
    res.json(todo);
  });
}

function addOneTodo(req, res) {
  let todo = new Todo(req.body);
  todo
    .save()
    .then((todo) => {
      res.status(200).json({ todo: "todo added successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("adding new todo failed");
    });
}

function updateOneTodo(req, res) {
  Todo.findById(req.params.id, function (err, todo) {
    if (!todo) res.status(404).send("data is not found");

    todo.description = req.body.description;
    todo.responsible = req.body.responsible;
    todo.priority = req.body.priority;
    todo.completed = req.body.completed;

    todo
      .save()
      .then((todo) => {
        res.json("Todo updated!");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send("Update not possible");
      });
  });
}

router.get("/", findAllTodo);
router.get("/:id", findOneTodo);
router.post("/add", addOneTodo);
router.post("/update/:id", updateOneTodo);

module.exports = router;
