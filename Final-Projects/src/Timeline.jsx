import './Timeline.css'
import DiaryPreview from './components/DiaryPreview'
import { useDiaries } from './hooks/useDiary'

const Timeline = ({ year, month }) => {
  const { diaries, loading, error } = useDiaries(`${year}-${String(month).padStart(2, '0')}`)

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{
      paddingLeft: 40,
      paddingRight: 40,
    }}>
      <div className="timeline">
        { diaries.data.map((diary, index) => <DiaryPreview 
            key={index} 
            userId={diary.userId} 
            date={diary.date} 
            content={diary.article} 
          />)}
      </div>
    </div>
  )
}

export default Timeline
