const socket=io('http://localhost:8000');
/*const app=express();
const cors=require("cors");
app.use(express.json());
app.use(cors());*/
const form=document.getElementById('sendc');
const messageInput=document.getElementById('msginp')
const messageContainer=document.querySelector(".cont")

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText= message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You:${message}`,'right')
    socket.emit('send',message);
    messageInput.value=''
})
const name=prompt("Enter your name to join");
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right')
})

socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left')
})

socket.on('left',name=>{
    append(`${name} left the chat`,'left')
})
