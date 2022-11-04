const input = document.querySelector('#conversation');
const btnOpen = document.querySelector('.j-btn-open');
const btnClose = document.querySelector('.j-btn-close');
const btnSend = document.querySelector('.j-btn-send');
const btnSwitchNavigation = document.querySelector('.j-btn-switch-on-navigation');
const btnClearChat = document.querySelector('.j-btn-clear-chat');
const wsUrl = 'wss://echo-ws-service.herokuapp.com/';
const conversationArea = document.querySelector('.conversationArea');//div для чата
let websocket;
//Функция отрисовывает  любой введёный текст со значениями по умолчанию
function writeConversationMessage(who,message,alignSelf='flex-start',color = 'rgb(158, 69, 6)', fontSize = '20px', fontFamily = 'Arial',margin = '0 25px',border = '4px solid',borderRadius = '30%',padding = '10px') {     
    const messageText = document.createElement('p');
    messageText.style.wordBreak = 'break-word';
    messageText.style.color = color;
    messageText.style.fontSize = fontSize;
    messageText.style.fontFamily = fontFamily ;
    messageText.style.margin = margin;
    messageText.style.border = border;
    messageText.style.borderRadius = borderRadius;
    messageText.style.padding = padding;
    messageText.style.alignSelf = alignSelf;
    messageText.innerText = `${who} ${message}`;
    conversationArea.append(messageText);
    input.value = '';
}

btnOpen.addEventListener('click',()=>{//Обработчик кнопки открытия соединения с эхо-сервером
    websocket = new WebSocket(wsUrl);
    websocket.onopen = function() {
        writeConversationMessage('','Соединение установлено, можете любезно общаться', 'center', 'blueviolet', '30px','none')    
    };
    websocket.onmessage = function(evt) {
        writeConversationMessage('Сервер: ', evt.data);//Функция отрисовывает ответ сервера
    }
    websocket.onerror = function(evt) {
        writeConversationMessage('', `connection ERROR, your HTTPadress is ${evt.data}`,'','red');        
    }
    websocket.onclose = function(evt) {
        writeConversationMessage('', 'Соединение закрыто , общение невозможно :(', '', 'red')
    }
})
btnClose.addEventListener('click',()=>{
    writeConversationMessage('','Соединение закрыто клиентом, общение невозможно :(')
    websocket.close();
    websocket = null;
})
btnSend.addEventListener('click',() => { //Обработчик для кнопки отправки вашего сообщения
    let ourMessage = input.value;// Введёное в поле input значение
    writeConversationMessage('Вы: ',ourMessage,'flex-end','blue');
    websocket.send(ourMessage); 
})
btnClearChat.addEventListener('click',()=> {  //Обработчик для отчистки чата
    conversationArea.innerHTML = '';
})
                  // займёмся навигацией
btnSwitchNavigation.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        const error = () => {
            const par = document.createElement('p');
            par.textContent = 'Невозможно получить ваше местоположение';
            conversationArea.appendChild(par);
        } 
        const success = (position) => {
            latitude  = position.coords.latitude;
            longitude = position.coords.longitude;
            console.log(latitude)
            const navLink = document.createElement('a');
            navLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
            navLink.innerText = 'Ваша геопозиция ';
            navLink.setAttribute('target','_blank');
            conversationArea.appendChild(navLink);

          }
        navigator.geolocation.getCurrentPosition(success, error);    
      }  
})
