function canvasApp() {
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = 'red'
  ctx.fillRect(10, 10, 300, 10)

  ctx.font = '50px Arial'
  ctx.fillStyle = 'blue'
  ctx.fillText('This is text', 200, 200)
  
  ctx.beginPath()
  ctx.arc(200, 100, 50, 0, 2 * Math.PI)
  ctx.fillStyle = 'blue'
  ctx.fill()
}

window.onload = canvasApp
document.addEventListener('DOMContentLoaded', canvasApp)
