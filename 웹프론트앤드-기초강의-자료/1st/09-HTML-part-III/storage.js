function main() {
  const userNameElement = document.querySelector('#user-name')
  let userName = localStorage.getItem('userName')

  if(userName === null) {
    userName = prompt('당신의 이름을 알려주세요.')

    localStorage.setItem('userName', userName)
  }

  userNameElement.innerText = userName
}

document.addEventListener('DOMContentLoaded', main)
