let currentLeftBoxPosition = 100
let numberOfStep = 10
let direction = 'yes'
let box

function boxProgram() {
  numberOfStep = prompt('몇 걸음 걸을까요?')
  direction = prompt('왼쪽으로 갈까요?')

  let moveStep = 1
  
  if (direction === 'yes') {
    while (moveStep <= numberOfStep) {
      box.style.left = (currentLeftBoxPosition - moveStep) + 'px' 

      moveStep++
    }

    currentLeftBoxPosition = currentLeftBoxPosition - moveStep
  } else {
    while (moveStep <= numberOfStep) {
      box.style.left = (currentLeftBoxPosition + moveStep) + 'px'
  
      moveStep++
    }  

    currentLeftBoxPosition = currentLeftBoxPosition + moveStep
  }
}

function main() {
  box = document.querySelector('#box')
  
  box.style.left = currentLeftBoxPosition + 'px'

  box.addEventListener('click', boxProgram)
}

document.addEventListener('DOMContentLoaded', main)
