let globalData = {}
const globalQuestions = []
let currentQuestion = 0
let currentQuestionNumber = 0
let currentTheme
let nextNumber
let ButtonSelected = false

const getData = async () => {
    try {
        //const response = await fetch('https://webhook.latenode.com/2326/prod/themes');
        const response = await fetch('http://localhost:5500/scripts/data.json')
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        globalData = await response.json();
        parseResponse(globalData);
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

const parseResponse = (resp) => {
    const questionRoot = document.querySelector('.themes_root')
    resp.themes.forEach(x => x.questions.forEach(y => {
        y.themeName = x.themeName
        y.id = generateID()
        globalQuestions.push(y)
    }))
    //resp.themes.forEach(x => questionRoot.appendChild(createThemeNode(x)))
    resp.themes.forEach(x => putThemeInWindow(x))
}

const putThemeInWindow = (theme) => {
    const themeList = document.querySelector('#themes_in_window')
    const themeElement = document.createElement('li')
    themeElement.classList.add('theme_element')
    themeElement.innerText = theme.themeName
    themeList.appendChild(themeElement)
}


const createThemeNode = (element) => {
    const theme = document.createElement("li")
    theme.innerText = element.themeName
    const themeSublist = document.createElement('ul')
    themeSublist.classList.add('questionList-sublist')
    theme.appendChild(themeSublist)

    element.questions.forEach(x => {
        const question = document.createElement("li")
        question.innerHTML = `<a href="#" class="questionElement" id="${x.id}">${x.questionNumber}</a>`
        themeSublist.appendChild(question)
    })
    return theme
}

const fillButtonsWithAnswers = (id) => {
    const answers_box = document.querySelector('.answers_box');
    const answerButtons = Array.from(answers_box.querySelectorAll('.ans_text'));

    const question = globalQuestions.find(x => x.id === id);
    const keysArray = Object.keys(question.answers);
    const shuffledKeys = shuffleArray(keysArray);

    answerButtons.forEach((button, index) => {
        const key = shuffledKeys[index];
        button.innerText = question.answers[key];
        button.setAttribute('id', id);
    });

    Array.from(answers_box.querySelectorAll('.answer_button')).forEach(button => {button.classList.remove('correct', 'wrong'); button.classList.add('hoverable')});
    
}

function shuffleArray(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

const generateID = () => {
    return Math.floor(Math.random() * Date.now()).toString(16)
}


const createQuestion = (questionName, index) => {
    const question = document.createElement('li')
    question.classList.add('question_element')
    question.setAttribute('style', 'font-size:' + (20 + index / 2).toString() + 'px;')
    question.innerText = questionName
    return question
}

const setCurrentQuestion = (index) => {
    document.querySelectorAll('.question_element').forEach(x => x.classList.remove('question_current'))
    document.querySelectorAll('.question_element')[index].classList.add('question_current')
    currentQuestion = globalQuestions.find(x => x.themeName === currentTheme && x.questionNumber === 'Question ' + (index + 1)).id
    fillButtonsWithAnswers(currentQuestion)
    setQuestion(currentQuestion)
    document.querySelector('#question_number').innerText = index + 1
}

const setQuestion = (id) => {
    const q = document.querySelector('.question_text')
    q.innerText = globalQuestions.find(x => x.id === id).questionFullDescription
}

const setButtonColor = (isCorrect, button) => {
    if (!ButtonSelected) {
        button.classList.add(isCorrect ? 'correct' : 'wrong')
        ButtonSelected = true
        setHoverStyle(button, isCorrect)
        return
    }
}

const setHoverStyle = (button, isCorrect) => {
    button.classList.remove('hoverable')
}

document.querySelector('.answers_box').addEventListener('click', (e) => {
    if(!e.target.closest('.answer_button') || ButtonSelected) return
    else {
        const id = currentQuestion
        const ans = globalQuestions.find(x => x.id === id)
        const text = e.target.closest('.answer_button').childNodes[1].innerText
        const len = globalData.themes.find(x => x.themeName === currentTheme).questions.length
        let correct = ans.answers.correct === text
        if (correct && currentQuestionNumber < len - 1) nextNumber = currentQuestionNumber + 1
        else nextNumber = 0
        setButtonColor(correct, e.target.closest('.answer_button'))
    }
})

document.querySelector('#themes_window').addEventListener('click', (e) => {
    if(!e.target.closest('.theme_element')) return 

    document.querySelector('.questions_left_list').innerHTML = '' //removing all children
    currentTheme = e.target.closest('.theme_element').innerText   //setting current theme
    globalData.themes.find(x => x.themeName === e.target.closest('.theme_element').innerText)
        .questions.forEach((y, index, self) => document.querySelector('.questions_left_list').appendChild(createQuestion(y.questionNumber, index)))
    currentQuestionNumber = 0
    setCurrentQuestion(currentQuestionNumber)
})

document.querySelector('#next_button').addEventListener('click', () => {
    if (!ButtonSelected) return
    currentQuestionNumber = nextNumber
    setCurrentQuestion(currentQuestionNumber)
    ButtonSelected = false
})

window.addEventListener('DOMContentLoaded', () => {
    getData()
})