import { useState } from 'react'
import Nav from './components/Nav'
import Titlebar from './components/Titlebar'
import Button from './components/core/Button'
import If from './components/core/If'
import ButtonGroup from './components/core/ButtonGroup'
import Container from './components/Container'
import CardContainer from './components/CardContainer'
import Signin from './Signin'
import Calendar from './Calendar'
import DiaryForm from './DiaryForm'
import Timeline from './Timeline'
import Spacer from './components/core/Spacer'
import Maxims from './components/Maxims'
import { USER_ID_KEY } from './constant'
import { buildCalendarData } from './utils/buildCalendarData'
import { randomNumber } from './utils/rand'
import Avatar from './components/Avatar'

const App = () => {
  const today = new Date()
  const [userId, setUserId] = useState(sessionStorage.getItem(USER_ID_KEY))
  const [updateKey, setUpdateKey] = useState(randomNumber())
  const [pickDay, setPickDay] = useState(0)
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1)

  const calendar = buildCalendarData(year, month)  

  const onGoToday = () => {
    setYear(today.getFullYear())
    setMonth(today.getMonth() + 1)
  }

  const onChangeMonth = (direction) => {
    if (direction === 'prev') {
      if (month === 1) {
        setYear(year - 1)
        setMonth(12)
      } else {
        setMonth(month - 1)
      }
    } else {
      if (month === 12) {
        setYear(year + 1)
        setMonth(1)
      } else {
        setMonth(month + 1)
      }
    }
  }

  const onSelectDay = (day) => {
    setPickDay(day)
  }

  const onBackward = (update = false) => {
    if (update) setUpdateKey(randomNumber())
    setPickDay(0)
  }

  return (
    <Container>
      <If then={!!userId}>
        <Nav>
          <Titlebar>{year}년 {month}월 {pickDay !== 0 ? `${pickDay}일` : ''} Diary</Titlebar>
          <If then={pickDay === 0}>
            <ButtonGroup>
              <Button test="prev" onClick={() => onChangeMonth('prev')}>◀︎</Button>
              <Button test="today" onClick={() => onGoToday()}>오늘</Button>
              <Button test="next" onClick={() => onChangeMonth('next')}>►</Button>
            </ButtonGroup>
            <Avatar userId={userId} />
          </If>
        </Nav>
        <CardContainer>
          <If then={pickDay === 0}>
            <Calendar data={calendar} year={year} month={month} onSelectDay={onSelectDay} />
          </If>
          <If then={pickDay !== 0}>
            <DiaryForm 
              date={`${year}-${String(month).padStart(2, '0')}-${String(pickDay).padStart(2, '0')}`} 
              onCancel={onBackward}
            />
          </If>
        </CardContainer>
        <If then={pickDay === 0}>
          <Timeline key={updateKey} year={year} month={month} />
          <Maxims />
        </If>
        <Spacer />
      </If>
      <If then={!userId}>
        <Spacer size={8} />
        <CardContainer>
          <Signin />
        </CardContainer>
      </If>
    </Container>
  )
}

export default App
