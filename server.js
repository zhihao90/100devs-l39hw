const express = require('express')
const app = express()
const PORT = 3002

app.use(express.json())

let movies = {
    "21 jump street":{
        'quotes': [`He's white, that means people actually give a shit.`, 
                    `You have the right to... suck my dick, motherfucker!`,
                    ` Clearly I wasn't talking to you, big-titties.`],
        'id': '1'

    },
    "white chicks":{
        'quotes':[
                ` You hit like a bitch! C'mon.`,
                `Jesus, lady! All this for just a handbag? It's not *just* a handbag. It's Prada!`,
                `What a beautiful chocolate man! Beautiful!`
        ],
        'id': '2'

    },
    "zootopia":{
        'quotes':[
            `Life isn't some cartoon musical where you sing a little song and all your insipid dreams magically come true. So let it go.`,
            `I know everybody. And I also know that somewhere there's a toy store missing its stuffed animal. So why don't you get back to your box?`,
            `You want to talk about making the world a better place, no better way to do it than becoming a carrot farmer.`,
            `I, um... I may have sold him a very expensive wool rug that was made from the fur of a skunk... 's butt.`,
            `Actually, it's your word against yours. `
            ],

        'id': '3'

    }
}

let noMovieFound = "NO SUCH MOVIE"

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})


app.get('/api/movies', (request, response) => {
    
        response.json(movies)
    
})

app.get('/api/:name', (request, response) => {
    const movieName = request.params.name.toLowerCase()
        if(movies[movieName]){
        const quoteNum = Math.floor(Math.random()*(movies[movieName]['quotes'].length))
        response.json(movies[movieName]['quotes'][quoteNum])
    }else{
        response.json(noMovieFound)
    }
})

app.delete('/api/movies/:id', (request, response) => {
    const id = request.params.id
    for (let movie in movies){

        if(movies[movie]['id'] == id){
            delete movies[movie]
            return response.status(200).json({ message: 'Movie deleted.' });
        }
    }
  
    response.status(204).end()
  })


  app.post('/api/movies/:id', (request, response) => {

    const id = request.params.id
    const note = request.body

    console.log(id)
    console.log(note["quote"])

    for(let movie in movies){
        if(movies[movie]["id"] == id){
            movies[movie]["quotes"].push(note["quote"])
        }
    }



    response.json(note)
  })

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

