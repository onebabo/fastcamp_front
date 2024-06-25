import TextWithBR from './TextWithBR'
import Avatar from './Avatar'
import './DiaryPreview.css'

const DiaryPreview = ({ userId, date, content }) => {  
  return (
    <div className="entry long-text">
      <div className="date">
        <Avatar userId={userId} size="small" /> {date}
      </div>
      <div className="icon blue"></div>
      <div className="content">
        <TextWithBR>{content}</TextWithBR>
      </div>
    </div>
  )
}

export default DiaryPreview
