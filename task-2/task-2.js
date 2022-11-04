const btn = document.querySelector('.j-btn-test');
function alertWidthAndHeigtScreen() {
  alert(`Ширина вашего экрана составляет: ${window.screen.width}px`);
  alert(`Высота вашего экрана составляет: ${window.screen.height}px`);
}
btn.addEventListener('click',alertWidthAndHeigtScreen);
