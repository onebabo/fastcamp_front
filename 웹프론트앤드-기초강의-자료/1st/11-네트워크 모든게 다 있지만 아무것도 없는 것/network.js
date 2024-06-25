
async function network_job() {
  try {
    let response = await fetch('https://www.myserver.com/login')
  
    console.log('성공')
  } catch(error) {
    console.log(error)
  }
}

