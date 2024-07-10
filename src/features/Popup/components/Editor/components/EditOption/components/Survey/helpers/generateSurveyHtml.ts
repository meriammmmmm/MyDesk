export const generateSurveyHtml = (questions: any, surveyId: string) => {
  const htmlStrings = questions.map((el: any) => generateHTML(el, surveyId))
  const finalHTML = htmlStrings.join('')
  const styles = `
    <style>
  .question {
    font-size:17px;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px 0;
    padding: 10px;
  }

  .option {
    margin: 5px 0;
  }
  .submit-survey-popup {
        width: 100%;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
  }
  input[type="radio"], input[type="checkbox"] {
    margin-right: 10px;
    cursor: pointer;
  }
</style>
    `

  const fullHTML = `<html><head>${styles}</head><body><div class='survey-popup-container custom-button'>${finalHTML}<button class='submit-survey-popup'>submit</button></div></body></html>`
  return fullHTML
}

const generateHTML = (question: any, surveyId: string) => {
  const { label, type, options } = question
  let html = `<div surveyid=${surveyId} class="question"><p>${label}</p>`

  options.forEach((option: any, index: number) => {
    html += `<div class="option">`

    if (type === 'radio') {
      html += `
                <input type="radio" name="question_${question.id}" id="option_${question.id}_${index}" value="${option}">
                <label for="option_${question.id}_${index}">${option}</label>
            `
    } else if (type === 'checkbox') {
      html += `
                <input type="checkbox" name="question_${question.id}[]" id="option_${question.id}_${index}" value="${option}">
                <label for="option_${question.id}_${index}">${option}</label>
            `
    }
    html += `</div>`
  })

  html += `</div>`
  return html
}
