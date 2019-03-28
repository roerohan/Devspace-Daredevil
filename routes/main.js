const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Question = mongoose.model('Question');
const State = mongoose.model('State');
var currentQuestion;
var currentDaredevil;
router.get("/", (req, res) => {
    State.findOne({
        "_id": 1
    }, (err, doc) => {
        if (!err) {
            res.send(err);
        } else {
            if (!doc) {
                res.send("Not found");
            } else {
                currentQuestion = doc.currentQuestion;
                currentDaredevil = doc.currentDaredevil;

                Question.findOne({
                    "qno": currentQuestion
                }, (err, doc2) => {
                    if (err) {
                        res.send(err);
                    } else {
                        if (!doc) {
                            res.send("Question not found")
                        } else {
                            res.render("index.hbs", {
                                    question: doc2.question,
                                    daredevil: currentDaredevil,
                                }
                            );
                        }
                    }
                });
            }
        }
    });
});

router.post("/", (req, res) => {
    currentDaredevil = req.body.name;
    State.updateOne({
        "currentQuestion": currentQuestion
    }, {
        "currentQuestion": currentDaredevil + 1,
        "currentDaredevil": currentDaredevil,
    }, (err, doc) => {
        res.redirect("/");
    })
})
module.exports = router;
