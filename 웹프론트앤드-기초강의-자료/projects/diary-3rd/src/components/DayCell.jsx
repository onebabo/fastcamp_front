import { useCheckDiary } from '../hooks/useDiary'
import './DayCell.css'

const DayCell = ({ 
  day, 
  date,
  today = false,
  sunday = false, 
  disableSelect = false,
  onClick = () => {},
}) => {
  const { diaryArticle, loading, error }= useCheckDiary(date)
  const classList = ['day-cell']
  const selector = disableSelect || day === 0 ? [] : ['circle-hover']

  if (today) selector.push('today')
  if (sunday) classList.push('sunday')

  return (
    <div className={classList.join(' ')}>
      <div className={selector.join(' ')} onClick={() => {
        if (day !== 0) onClick(day)
      }}>
        {day === 0 ? '' : day}
        {!loading && !error && diaryArticle.data ? <div className="dot"/> : null }
      </div>
    </div>
  )
}

export default DayCell
