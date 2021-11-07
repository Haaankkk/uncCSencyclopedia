let questionPrompt;
let buttonsSection;
let yesButton;
let noButton;
let playAgainButton;

let professorsLeftList;
let gameSectionDiv;
var gameManager;

const debug = false;

$(() => {
    function startUp() {
        gameSectionDiv = $('.secondSection');
        const gameBGHeight = window.innerWidth * 0.84;
        gameSectionDiv.css({ height: gameBGHeight });
        gameManager = new GameManager();
        questionPrompt = $('#question-prompt');
        buttonsSection = $('#buttons-section');

        yesButton = $('#yes-button');
        noButton = $('#no-button');
        playAgainButton = $('#play-again-button');
        playAgainButton.hide();

        questionPrompt.html(Questions.get(gameManager.nextQuestion));

        yesButton.on('click', () => {
            onButtonClicked(true);
        });

        noButton.on('click', () => {
            onButtonClicked(false)
        });

        playAgainButton.on('click', () => {
            onPlayAgain();
        })
    }

    startUp();



    function onPlayAgain() {
        // startUp();
        // yesButton.show();
        // noButton.show();
        // playAgainButton.hide();
        location.reload();

    }

    function onButtonClicked(yes = true) {
        gameManager.professorsLeft = gameManager.professorsLeft.filter((element, index) => {
            const attribute = element.attributeList.get(gameManager.nextQuestion);
            gameManager.professorsLeft[index].attributeList.delete(gameManager.nextQuestion);
            if (!isNotNull(attribute)) return true;
            if (gameManager.nextQuestion === QuestionKeys.ARE_YOU_TAKING_NEXT_SEMESTER) {
                if (yes) {
                    if (attribute === true) {
                        gameManager.professorsLeft[index].probability += 100;
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (attribute === true) {
                        return true;
                    } else {
                        return true;
                    }
                }
            }
            if (yes) {
                switch (attribute) {
                    case true:
                        gameManager.professorsLeft[index].probability += 100;
                        return true;
                    case false:
                        return false;
                    case ATTRIBUTE_VALUES.A_LITTLE_LIKELY:
                        gameManager.professorsLeft[index].probability += 10;
                        return true;
                    case ATTRIBUTE_VALUES.KINDOF_LIKELY:
                        gameManager.professorsLeft[index].probability += 25;
                        return true;
                    case ATTRIBUTE_VALUES.MODERATELY_LIKELY:
                        gameManager.professorsLeft[index].probability += 50;
                        return true;
                    case ATTRIBUTE_VALUES.HIGHLY_LIEKLY:
                        gameManager.professorsLeft[index].probability += 75;
                        return true;
                    case ATTRIBUTE_VALUES.A_LITTLE_UNLIKELY:
                        gameManager.professorsLeft[index].probability -= 10;
                        return true;
                    case ATTRIBUTE_VALUES.KINDOF_UNLIKELY:
                        gameManager.professorsLeft[index].probability -= 25;
                        return true;
                    case ATTRIBUTE_VALUES.MODERATELY_UNLIKELY:
                        gameManager.professorsLeft[index].probability -= 50;
                        return true;
                    case ATTRIBUTE_VALUES.HIGHLY_UNLIEKLY:
                        gameManager.professorsLeft[index].probability -= 75;
                        return true;
                    default:
                        break;
                }
            } else {
                switch (attribute) {
                    case true:
                        return false;
                    case false:
                        gameManager.professorsLeft[index].probability += 100;
                        return true;
                    case ATTRIBUTE_VALUES.A_LITTLE_LIKELY:
                        gameManager.professorsLeft[index].probability -= 10;
                        return true;
                    case ATTRIBUTE_VALUES.KINDOF_LIKELY:
                        gameManager.professorsLeft[index].probability -= 25;
                        return true;
                    case ATTRIBUTE_VALUES.MODERATELY_LIKELY:
                        gameManager.professorsLeft[index].probability -= 50;
                        return true;
                    case ATTRIBUTE_VALUES.HIGHLY_LIEKLY:
                        gameManager.professorsLeft[index].probability -= 75;
                        return true;
                    case ATTRIBUTE_VALUES.A_LITTLE_UNLIKELY:
                        gameManager.professorsLeft[index].probability += 10;
                        return true;
                    case ATTRIBUTE_VALUES.KINDOF_UNLIKELY:
                        gameManager.professorsLeft[index].probability += 25;
                        return true;
                    case ATTRIBUTE_VALUES.MODERATELY_UNLIKELY:
                        gameManager.professorsLeft[index].probability += 50;
                        return true;
                    case ATTRIBUTE_VALUES.HIGHLY_UNLIEKLY:
                        gameManager.professorsLeft[index].probability += 75;
                        return true;
                    default:
                        break;
                }
            }
        });

        if (checkIfFinished()) {
            return;
        }

        gameManager.nextQuestion = getNextQuestion();
        questionPrompt.html(Questions.get(gameManager.nextQuestion));
    }

    function checkIfFinished() {
        if (gameManager.professorsLeft.length === 0) {
            onPlayAgain();
        }
        //only one left, end game
        if (gameManager.professorsLeft.length === 1) {
            if (gameManager.professorsLeft[0].name === KMP_NAME) {
                onGameEnd(true);
            } else {
                onGameEnd();
            }
            return true;
        }

        //check if there is high enough score
        var oneProfessorLeft = true;
        var highest = -999;
        var highestIndex = 0;
        var normalizedScoreLevelMap = new Map();
        var normalizedScoreLevelSet = new Set();

        gameManager.professorsLeft.forEach((professor, index) => {
            const probability = professor.probability;
            const normalizedScoreLevel = getNormalizedScore(probability);
            normalizedScoreLevelMap.set(index, normalizedScoreLevel);
            if (normalizedScoreLevelSet.has(normalizedScoreLevel)) {
                oneProfessorLeft = false;
            } else {
                normalizedScoreLevelSet.add(normalizedScoreLevel);
            }
            if (probability > highest) {
                highest = professor.probability;
                highestIndex = index;
            }
            l(normalizedScoreLevelSet);
        })
        if (oneProfessorLeft) {
            gameManager.professorsLeft = [gameManager.professorsLeft[highestIndex]];
            onGameEnd();

            return true;
        }


        return false;

        function onGameEnd(isKMP = false) {
            const theProfessor = gameManager.professorsLeft[0];
            if (theProfessor.specificQuestion.length > 0) {
                //ask specific question
                const index = Math.floor(Math.random() * theProfessor.specificQuestion.length / 1);
                const question = theProfessor.specificQuestion[index];
                questionPrompt.html(question);
                yesButton.on('click', () => {
                    showEndGameUI();
                });

                noButton.on('click', () => {
                    onPlayAgain();
                });
            } else {
                showEndGameUI();
            }

            function showEndGameUI() {
                if (isKMP) {
                    questionPrompt.html(`He is me!`);
                } else {
                    if (theProfessor.name === TESSA_NAME) {
                        questionPrompt.html(`She is ${gameManager.professorsLeft[0].name}!`);
                    } else {
                        questionPrompt.html(`He is ${gameManager.professorsLeft[0].name}!`);
                    }

                }

                yesButton.hide();
                noButton.hide();
                playAgainButton.show();
            }
        }
    }



    function getNextQuestion() {
        const allSize = gameManager.professorsLeft.length;
        const questionList = new Map();
        Questions.forEach((value, key) => {
            questionList.set(key, { true: 0, false: 0, NA: allSize });
        })
        gameManager.professorsLeft.forEach((element, index) => {
            element.attributeList.forEach((value, key) => {
                var temp = questionList.get(key);
                temp.NA--;
                if (value) {
                    temp.true++;
                } else {
                    temp.false++;
                }
                questionList.set(key, temp);
            })
        })

        var bestKey = '';
        var bestScore = -1;
        questionList.forEach((value, key) => {

            const score = (allSize - value.NA) / allSize * (min(value.true, value.false) / max(value.true, value.false));
            if (score > bestScore) {
                bestScore = score;
                bestKey = key;
            }
        })

        return bestKey


    }
    //kmp         AS
    //is? true    is? true
    //ol? false   ol? true

    //none null / all * (min / max)
})

