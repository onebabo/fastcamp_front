import { useEffect, useState } from 'react'
import ButtonGroup from './components/core/ButtonGroup'
import Button from './components/core/Button'
import Spacer from './components/core/Spacer'
import If from './components/core/If'
import { useSignIn, useSignUp } from './hooks/useUser'
import { USER_ID_KEY } from './constant'

import './Signin.css'

const Signin = () => {
  const signIn = useSignIn()
  const signUp = useSignUp()
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [isCreate, setIsCreate] = useState(false)

  useEffect(() => {
    if (signIn.success) {
      sessionStorage.setItem(USER_ID_KEY, userId)
      location.reload()
    }
  }, [signIn.success])

  useEffect(() => {
    if (signUp.success) {
      sessionStorage.setItem(USER_ID_KEY, userId)
      location.reload()
    }
  }, [signUp.success])
  
  useEffect(() => {
    if (signIn.error) {
      alert('계정 정보를 확인해주세요.')
    }
  }, [signIn.error])

  useEffect(() => {
    if (signUp.error) {
      alert('알수 없는 문제가 발생했습니다. 다른 아이디를 사용해주세요.')
    }
  }, [signUp.error])

  const validateForm = () => {
    if (!userId || !password) {
      alert('아이디와 비밀번호를 정확히 입력해주세요.')
      return false
    }

    if (userId.length <= 3) {
      alert('아이디는 3자 이상 입력해주세요.')
      return false
    }

    if (password.length <= 3) {
      alert('비밀번호는 3자 이상 입력해주세요.')
      return false
    }

    return true
  }

  const onChangeCreate = event => {
    setIsCreate(event.target.checked)
  }

  const onSignIn = async () => {
    if (!validateForm()) return 

    await signIn.postSignIn(userId, password)
  }

  const onSignUp = async () => {
    if (!validateForm()) return 

    await signUp.postSignUp(userId, password)
  }

  return (
    <div className="signin">
      <h2>로그인</h2>
      <div>
        <input type="text" placeholder="아이디를 입력해주세요." 
          value={userId} onChange={e => setUserId(e.target.value)} />
      </div>
      <div>
        <input type="password" placeholder="비밀번호를 입력해주세요."
          value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div className="create-switch">
        <label for="create">
          <input type="checkbox" id="create" 
            checked={isCreate} 
            onChange={onChangeCreate} /> 신규 계정 만들기
        </label>
      </div>
      <Spacer />
      <ButtonGroup align="right">
        <Button size="medium" >돌아가기</Button>
        
        <If then={isCreate}><Button size="medium" onClick={onSignUp}>회원 가입</Button></If>
        <If then={!isCreate}><Button size="medium" onClick={onSignIn}>로그인</Button></If>
        
      </ButtonGroup>
      <Spacer size={2} />
    </div>
  )
}

export default Signin
