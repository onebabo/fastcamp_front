function canvasApp() {
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = 'red'
              // X   y    width  hegiht
  // 사각형
  ctx.fillRect(10, 10, 300, 10)

  // 글자
  ctx.font = '50px Arial'
  ctx.fillStyle = 'blue'
  ctx.fillText('This is text', 200, 200)
  
  // 원형
  ctx.beginPath()
         // x   y   반지름   각도   pi :파이   Math.PI *2  = 360       
  ctx.arc(200, 100, 50, 0,  Math.PI * 2 )
  ctx.fillStyle = 'blue'
  ctx.fill()
}

window.onload = canvasApp
document.addEventListener('DOMContentLoaded', canvasApp)
