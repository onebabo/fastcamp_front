import './Avatar.css'

const Avatar = ({ userId, size = '' }) => {
  const [first, second] = String(userId).split('')
  const classList = ['avatar']

  if (size) classList.push(size)

  return (
    <div className={classList.join(' ')}>
      {first}{second}
    </div>
  )
}

export default Avatar
