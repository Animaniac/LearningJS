const correctAnswers = ['B', 'B', 'B', 'A'];
const form = document.querySelector('.quiz-form');
const results = document.getElementById('result');

form.addEventListener('submit', e => {
    e.preventDefault();

    let score = 0;
    const userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value];

    userAnswers.forEach((answer, index) =>{
        if(answer === correctAnswers[index]){
            score += 25;
        }
    });
    
    results.textContent = `You got ${score}% correct`;
    results.classList.remove('d-none');
    
    console.log(score);
});