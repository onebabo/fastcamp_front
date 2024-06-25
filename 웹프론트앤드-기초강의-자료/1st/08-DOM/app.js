// 1. 이메일 입력창에 포커스 이동
// 2. 정보 추가
// 3. 포커스가 빠지면 정보 삭제

window.onload = function() {

  const email = document.querySelector('#email')

  email.addEventListener('focus', function() {
    const form = document.querySelector('form')
    const info = document.createElement('p')

    info.innerText = '이메일 형식을 잘 맞춰 입력해 주세요!'
    
    form.insertBefore(info, form.firstChild)
  })

  email.addEventListener('blur', function() {
    const form = document.querySelector('form')

    form.removeChild(form.firstChild)
  })
}