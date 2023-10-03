const box_colors = document.querySelectorAll('.box-colors div')
const color_bet = document.querySelector('.color-bet')
const color_output = document.querySelector('.color-output')
const color_score = document.querySelector('#color-score')
const btn_roll = document.querySelector('.btn-roll-color')
const attempt = document.querySelector('#attempt')

let colors_length = box_colors.length
const colors = ['green', 'white', 'violet', 'blue', 'yellow', 'red']
let isPlay = false
color_score.innerHTML = 0

function initialDisplay(){
    for(let i = 0; i < colors_length; i++){
        box_colors[i].style.background = colors[i]
        box_colors[i].id = colors[i]

        box_colors[i].addEventListener('click', e =>{
            btn_roll.classList.remove('unshow')
            color_bet.style.background = box_colors[i].id
            color_bet.id = box_colors[i].id
            color_output.style.background = "none"
        })
    }
}

initialDisplay()

let score = 0
function effect(){
    
    let speed = 500
    let limit = 30

    function stopTime(){
        const item = Math.floor(Math.random() * colors_length) 
        box_colors[item].classList.add('win')
        btn_roll.classList.remove('spin-dice')
        box_colors[item].dataset.color = `${box_colors[item].id}`
        
        console.log(item)
        color_output.style.background = box_colors[item].id
        console.log("Output: "+box_colors[item].id, "Bet: "+color_bet.id)
        if(box_colors[item].id == color_bet.id){
            score++
            color_score.innerHTML = `${score}`
        }

        isPlay = false

        function reset(){
            color_bet.removeAttribute('id')
            
            box_colors.forEach(el =>{
                el.classList.remove('light')
                el.addEventListener('click', ()=>{
                    box_colors[item].classList.remove('win')
                    box_colors[item].dataset.color = ``
                })
            })
        }
        
        setTimeout(reset, 500)
    }
    
    let count = 0
    const runTime = setInterval(roll, speed)

    function roll(){
        count++
        console.log("count")
        btn_roll.classList.add('spin-dice')
        effects()
        if(count > limit){
            clearInterval(runTime)
            setTimeout(stopTime, 500)
            count = 0
        }
    }
    
    function effects(){
        for(let i = 0; i < colors_length; i++){
            box_colors[i].classList.add('light')
            box_colors[i].style.animationDelay = `${i}00ms`
            box_colors[i].style.animationIterationCount = `${limit}`
        }
    }
}

const RollColor = (e) =>{
    if(color_bet.hasAttribute('id')){
       // function
      isPlay = true
      console.log(isPlay)
      effect()
    }

}

let count_attempt = 0
attempt.innerHTML = `${count_attempt}`
function countAttempt(){
    count_attempt++
    attempt.innerHTML = `${count_attempt}`
}


btn_roll.addEventListener('click', RollColor)

