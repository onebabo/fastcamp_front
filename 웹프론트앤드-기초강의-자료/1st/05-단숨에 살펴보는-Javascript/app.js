/*
 * REPL을 사용한 예제입니다.
 * 이름: JavaScript REPL
 * ID: achil.vscode-javascript-repl
 * 버전: 0.7.4
 * VS Marketplace 링크: https://marketplace.visualstudio.com/items?itemName=achil.vscode-javascript-repl
*/

import * as Utils from './common/util'

Utils.AppleName
Utils.CarName
Utils.Sum(1, 2, 3)
// 식
10 - 10
10 * 10
10 / 10 
13 % 2
13 + '10'

// 값 
10
22
'22'
'하나둘 셋'
true 
false
a = { 
  name: '김민태', 
  age: 20,
  family: {
    name: '할아버지'
  }
}

b = [10, 20, 30, '하하', '호호', [1, 2, 3], { }]

a.name
a.family.name

b[1] * 10

// 이름 붙이기
let myNameIs = ''
const yourname = '홍길동';


// 문
if (!true) {
  x = 10
} else {
  b = 10
}

for (let i = 0; i < 10 ; i++) {
  10 + 1
}
let i = 0

while (i < 10) {
  10 + 1
  i++
}

if (i === 10) {

} else if (i === 100) {

} else if (i === 200) {

}

switch (i) {
  case 10:
    10 * 10
    break
  case 100:
    10 * 100
    break
  case 200:
    10 * 200
    break
  default:
    10 * 1000
}

// 함수 그리고 클래스
function sum(x, y) {
  return x + y
}

let mySum = function(x, y) {
  return x + y
}

let mySum2 = x => x * 2

let myage = () => 20

let mysum1 = sum(200, 200) + 10
let mysum2 = sum(1000, 200)
let mysum3 = mySum(10, 10)
let mysum4 = mySum2(10, 10)

zyz = myage()
mysum1
mysum2
zyz

class Box {
  constructor(width, height) {
    this.width = width
    this.height = height
  }

  width() {
    return this.width
  }

  height() {
    return this.height
  }

  area() {
    return this.width * this.height
  }
}

let box1 = new Box(400, 400)

box1

// mywidth = box1.width()
let area = box1.area()

area



// 모듈화
