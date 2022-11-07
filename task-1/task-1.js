const svgElement = document.querySelectorAll('svg');
console.log(svgElement)
const button = document.querySelector('.button');
button.addEventListener('click',()=> {
    svgElement[0].classList.toggle('hidden');
    svgElement[1].classList.toggle('hidden');
})