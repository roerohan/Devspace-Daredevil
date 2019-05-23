const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Question = mongoose.model('Question');
const State = mongoose.model('State');
var currentQuestion;
var currentDaredevil;


const adminUser = "davidbart";
const adminPass = "openglsux";


router.get("/adminLogin", function (req, res) {
    res.render("authenticate");
});

router.post("/adminLogin", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (username == adminUser && password === adminPass) {
        req.session.user = true;
        res.redirect("/");
    } else {
        res.render("authenticate", {
            wrong: true
        });
    }
});

router.get("/logout", function (req, res, next) {
    req.session.destroy(function () {
        res.redirect("/adminLogin");
    });
});

router.get("/", (req, res) => {
    State.findOne({}, (err, doc) => {
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
                            });
                        }
                    }
                });
            }
        }
    });
});

router.get("/apparentlyverycomplicatedroute", (req, res) => {
    res.render("adminAdd");
});
router.post("/", (req, res) => {
    if (!req.session.user) {
        res.redirect("/adminLogin")
    } else {
        currentDaredevil = req.body.name;
        State.updateOne({}, {
            "currentQuestion": currentQuestion + 1,
            "currentDaredevil": currentDaredevil,
        }, (err, doc) => {
            console.log(currentQuestion)
            res.redirect("/");
        });
    }
});

router.get("/insert", (req, res) => {
    if (!req.session.user) {
        res.redirect("/adminLogin")
    } else {
        res.render("newQuestion.hbs")
    }
})

router.post("/insert", async (req, res) => {
    if (!req.session.user) {
        res.redirect("/adminLogin")
    } else {
        const qno = req.body.qno;
        const question = req.body.question;
        const q = await Question.findOne({
            qno
        });

        if (q) {
            q.question = question;
            q.save();
        } else {
            var questions = new Question()
            questions.question = question
            questions.qno = qno
            questions.save()
        }

        const s = await State.findOne({});
        if (s) {

        } else {
            var state = new State()
            state.currentDaredevil = "David Bart"
            state.currentQuestion = 1
            state.save()
        }
        res.send("Success");
    }
});
module.exports = router;
