document.addEventListener('DOMContentLoaded', function() {
  const video = document.querySelector('#video')

  // 권한 요청
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // 카메라 비디오 스트림 요청
      navigator.mediaDevices.getUserMedia({ video: true })
          .then(function(stream) {
              // video 요소에 스트림 연결
              video.srcObject = stream
          })
          .catch(function(error) {
              console.error("카메라 권한을 얻지 못했습니다.", error)
          })
  } else {
      alert('기능이 지원되지 않는 브라우저입니다.')
  }
})
