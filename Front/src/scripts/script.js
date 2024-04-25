let globalData = {}
const globalQuestions = []
let currentQuestion
let currentTheme

const getData = async () => {
    try {
        const response = await fetch('https://webhook.latenode.com/2326/prod/themes');
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

    answerButtons.forEach((button, index) => {
        const question = globalQuestions.find(x => x.id === id);
        const keysArray = Array.from(Object.keys(question.answers));
        const key = keysArray[index];
        button.innerText = question.answers[key];
    });
}

const generateID = () => {
    return Math.floor(Math.random() * Date.now()).toString(16)
}

// document.querySelector('.themes_root').addEventListener('click', (e) => {
//     if(!e.target.closest('.questionElement')) return
//     else {
//         document.querySelector('.question_text').innerText = globalQuestions.find(x => x.id === e.target.closest('.questionElement').getAttribute('id')).questionFullDescription
//         fillButtonsWithAnswers(e.target.closest('.questionElement').getAttribute('id'))
//     }
// })

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
    currentQuestion = globalQuestions.find(x => x.themeName === currentTheme && x.questionNumber === 'Question ' + index).id
    debugger
}

document.querySelector('.answers_box').addEventListener('click', (e) => {
    if(!e.target.closest('.answer_button')) return
    else document.querySelector('.question_text').innerText = 'Your answer is ' + e.target.closest('.ans_text').innerText
})

document.querySelector('#themes_window').addEventListener('click', (e) => {
    if(!e.target.closest('.theme_element')) return 

    document.querySelector('.questions_left_list').innerHTML = '' //removing all children
    currentTheme = e.target.closest('.theme_element').innerText   //setting current theme
    globalData.themes.find(x => x.themeName === e.target.closest('.theme_element').innerText)
        .questions.forEach((y, index, self) => document.querySelector('.questions_left_list').appendChild(createQuestion(y.questionNumber, index)))
    setCurrentQuestion(0)
})

window.addEventListener('DOMContentLoaded', () => {
    getData()
})

