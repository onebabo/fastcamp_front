import { useEffect, useState } from 'react'
import ButtonGroup from './components/core/ButtonGroup'
import Button from './components/core/Button'
import Spacer from './components/core/Spacer'
import Modal from './components/core/Modal'
import useDiary, { useDiaryPost, useDiaryUpdate, useDiaryDelete } from './hooks/useDiary'

import './DiaryForm.css'

const DiaryForm = ({ date, onCancel }) => {
  const { diaryArticle, loading } = useDiary(date)
  const usePost = useDiaryPost()
  const useUpdate = useDiaryUpdate()
  const useDelete = useDiaryDelete()
  const [text, setText] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [isNew, setNew] = useState(true)
  const [isModalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (diaryArticle) {
      setNew(false)
      setText(diaryArticle.data.article)
      setIsPublic(diaryArticle.data.isPublic === 'Y')
    }
  }, [diaryArticle])

  if (loading) return <div>Loading...</div>

  const onCloseModal = () => {
    setModalOpen(false)
  }

  const onDelete = async () => {
    setModalOpen(false)

    await useDelete.deleteDiary(date)
    onCancel(true)
  }

  const onConfirmDelete = () => {
    setModalOpen(true)
  }

  const onSave = async () => {
    if (text.trim() === '') return
  
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    
    const time = `${hours}:${minutes}`
    const article = text

    if (isNew) {
      await usePost.postDiary(date, article, time, isPublic)
    } else {
      await useUpdate.updateDiary(date, article, time, isPublic)
    }

    onCancel(true)
    setText('')
  }

  return (
    <div className="diary-form">
      <h2>오늘은 어땠어요?</h2>
      <textarea 
        className="textarea"
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="일기를 작성하세요"
      />
      <label>
        <input type="checkbox" checked={isPublic} onChange={e => setIsPublic(e.target.checked)} />
        일기 공유
      </label>
      <Spacer />
      <ButtonGroup align="right">
        <Button size="medium" onClick={onCancel}>돌아가기</Button>
        { !isNew ? <Button size="medium" onClick={onConfirmDelete}>삭제</Button> : null }
        <Button size="medium" onClick={onSave}>저장</Button>
      </ButtonGroup>
      <Spacer size={2} />
      <Modal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        onDelete={onDelete}
        message="이 작업은 복구할 수 없습니다. 정말로 삭제하시겠습니까?"
      />
    </div>
  )
}

export default DiaryForm
