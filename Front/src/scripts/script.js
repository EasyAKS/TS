let globalData = {}
const globalQuestions = []

const getData = async () => {
    try {
        const response = await fetch('https://webhook.latenode.com/2326/prod/easyaks');
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
        y.id = generateID()
        globalQuestions.push(y)
    }))
    resp.themes.forEach(x => questionRoot.appendChild(createThemeNode(x)))
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

document.querySelector('.themes_root').addEventListener('click', (e) => {
    if(!e.target.closest('.questionElement')) return
    else {
        document.querySelector('.question_text').innerText = globalQuestions.find(x => x.id === e.target.closest('.questionElement').getAttribute('id')).questionFullDescription
        fillButtonsWithAnswers(e.target.closest('.questionElement').getAttribute('id'))
    }
})

document.querySelector('.answers_box').addEventListener('click', (e) => {
    if(!e.target.closest('.answer_button')) return
    else document.querySelector('.question_text').innerText = 'Your answer is ' + e.target.closest('.ans_text').innerText
})

window.addEventListener('DOMContentLoaded', () => {
    getData()
})

