console.log('Javascript is running from the server side')


const form = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

// messageOne.textContent = 'From Javascript'

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    const url = 'http://localhost:3000/weather?address=' + location
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(url).then((response)=>{
        response.json().then((data)=>{
        if (data.error){
            console.log(data.error)
            messageOne.textContent = data.error
        }else{
            messageOne.textContent= data.Location
            messageTwo.textContent = data.Forecast
            console.log(data.Location)
            console.log(data.Forecast)
        }
        
        })
    })
 

})