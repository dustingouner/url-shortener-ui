export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

export const postUrls = (newUrl) => {
  console.log('is this working')
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    body: JSON.stringify({
      long_url: newUrl.urlToShorten,
      title: newUrl.title
    }), 
    headers: {
      'Content-type':'application/json'
    }
  })
}
