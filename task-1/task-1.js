const clockWise = document.querySelector('.btn-icon1');
const airplane = document.querySelector('.btn-icon2');
const button = document.querySelector('.button');
button.addEventListener('click',()=> {
    console.log(clockWise.classList.toggle('hidden'));
    console.log(airplane.classList.toggle('hidden'));
})