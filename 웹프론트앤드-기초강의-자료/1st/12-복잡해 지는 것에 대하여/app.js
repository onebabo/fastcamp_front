import { add, sub, multi, div } from './calc'

function makeObject(name, age, height) {
  const result = {}

  result.name = name
  result.age = age
  result.height = height

  return result
}

const myObj = makeObject('김민태', 30, 180)
const myObj2 = makeObject('홍길동', 50, 190)
const myObj3 = makeObject('김유신', 20, 170)
