var gameover = false
var time = 60
var trueTime = time
var restart = 0
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
var score = 0
canvas.width = innerWidth
canvas.height = innerHeight

class Player {
    constructor() {
        this.position = {
            x: canvas.width / 2 - 40,
            y: canvas.height / 2 - 40
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 40
        this.height = 40
    }
    draw() {
        c.fillStyle = 'lightblue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Apple{
    constructor() {
        this.position = {
            x: 300,
            y: 300
        }
        this.width = 20
        this.height = 20
    }
    draw() {
        c.fillStyle = ('red')
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw()
    }
}
class Score{
    draw(){
        const ctx = canvas.getContext('2d');
        ctx.font = '128px serif';
        ctx.fillStyle = ('black')
        ctx.fillText(score, 10, 130);
    }
}
class Timer{
    draw(){
        const ctx2 = canvas.getContext('2d');
        ctx2.font = '128 serif';
        ctx2.fillStyle = ('black')
        ctx2.fillText(time, 10, 258);
    }
}
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    },
    down:{
        pressed: false
    }
}
//make sure to include this line or it will not draw
const player = new Player()
const apple = new Apple()
const theScore = new Score()
const timer = new Timer()
//timer
var myfunc = setInterval(function() {
    if (time > 0 && gameover == false){
        time--
        trueTime = time
    }else if (trueTime < 1){
        var highscore = score
        var restart = 0
        score = "Game Over"
        time = ""
        gameover = true
    }
}, 1000)
var func = setInterval(function() {
    if (gameover == true){
        if (restart < 3){
            restart++
        }else{
            score = 0
            time = 60
            trueTime = time
            player.position.x = canvas.width / 2 - player.width
            player.position.y = canvas.height / 2 - player.height
            apple.position.x = 300
            apple.position.y = 300
            restart = 0
            gameover = false
    }
        }
}, 1000)
//drawing the player
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    apple.update()
    theScore.draw()
    timer.draw()
    //player movement
    if (gameover == false && keys.left.pressed || keys.right.pressed && gameover == false){
        if (keys.left.pressed){
            player.velocity.x = -2.5
        }else if (keys.right.pressed){
            player.velocity.x = 2.5
        }
    }else{
        player.velocity.x = 0
    }
    if (gameover == false && keys.up.pressed || keys.down.pressed && gameover == false){
        if (keys.up.pressed){
            player.velocity.y = -2.5
        }else if (keys.down.pressed){
            player.velocity.y = 2.5
        }
    }else{
        player.velocity.y = 0
    }
    
    
    
    //move apples if touching player
    if (player.position.x + player.width > apple.position.x && player.position.x < apple.position.x + apple.width && player.position.y + player.height > apple.position.y && player.position.y < apple.position.y + apple.width && gameover == false) {
        score += 1
        apple.position.x = Math.abs(Math.floor(Math.random() * canvas.width) - 40)
        apple.position.y = Math.abs(Math.floor(Math.random() * canvas.height) - 20)
    }
    //hit detection for wall
    if (player.position.x < 0){
        player.position.x = 0
    }
    if (player.position.x + player.width > canvas.width){
        player.position.x = canvas.width - player.width
    }
    if (player.position.y < 0){
        player.position.y = 0
    }
    if (player.position.y + player.height > canvas.height){
        player.position.y = canvas.height - player.height
    }
}
animate()

addEventListener("keydown", ({keyCode}) => {
    switch(keyCode){
        case 65:
            keys.left.pressed = true;
            break;
        case 83:
            keys.down.pressed = true;
            break;
        case 68:
            keys.right.pressed = true;
            break;
        case 87:
            keys.up.pressed = true;
            break;
    } 
})
addEventListener("keyup", ({keyCode}) => {
    switch(keyCode){
        case 65:
            keys.left.pressed = false;
            break;
        case 83:
            keys.down.pressed = false;
            break;
        case 68:
            keys.right.pressed = false;
            break;
        case 87:
            keys.up.pressed = false;
            break;
    } 
})
