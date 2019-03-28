const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Question = mongoose.model('Question');
const State = mongoose.model('State');
var currentQuestion;
var currentDaredevil;
router.get("/", (req, res) => {
    State.findOne({
    }, (err, doc) => {
        if (err) {
            res.send(err);
        } else {
            if (!doc) {
                res.send("Not found");
            } else {
                currentQuestion = doc.currentQuestion;
                currentDaredevil = doc.currentDaredevil;
                console.log(currentDaredevil);
                console.log(currentQuestion);
                Question.findOne({
                    "qno": currentQuestion
                }, (err, doc2) => {
                    if (err) {
                        res.send(err);
                    } else {
                        if (!doc2) {
                            res.send("Dare not found")
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
    }, {
        "currentQuestion": currentQuestion + 1,
        "currentDaredevil": currentDaredevil,
    }, (err, doc) => {
        console.log(currentQuestion)
        res.redirect("/");
    });
});

router.get("/insert", (req,res)=>{
    res.render("newQuestion.hbs")
})

router.post("/insert", async (req, res)=> {
    const qno = req.body.qno;
    const question = req.body.question;
    const q = await Question.findOne({qno});

    if (q) {
        q.question = question;
        q.save();
    } else {
           var questions = new Question()
           questions.question = question
           questions.qno = qno
           questions.save()
    }

    var state = new State()
    state.currentDaredevil = "David Bart"
    state.currentQuestion = 1
    state.save()
    res.send("Success");
});
module.exports = router;
