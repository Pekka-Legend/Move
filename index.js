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
//drawing the player
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    apple.update()
    theScore.draw()
    //player movement
    if (keys.left.pressed || keys.right.pressed){
        if (keys.left.pressed){
            player.velocity.x = -3
        }else if (keys.right.pressed){
            player.velocity.x = 3
        }
    }else{
        player.velocity.x = 0
    }
    if (keys.up.pressed || keys.down.pressed){
        if (keys.up.pressed){
            player.velocity.y = -3
        }else if (keys.down.pressed){
            player.velocity.y = 3
        }
    }else{
        player.velocity.y = 0
    }
    
    
    
    //move apples if touching player
    if (player.position.x + player.width > apple.position.x && player.position.x < apple.position.x + apple.width && player.position.y + player.height > apple.position.y && player.position.y < apple.position.y + apple.width) {
        score += 1
        apple.position.x = Math.abs(Math.floor(Math.random() * canvas.width) - 40)
        apple.position.y = Math.abs(Math.floor(Math.random() * canvas.height) - 40)
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
