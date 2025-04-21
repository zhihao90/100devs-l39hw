const express = require('express')
const app = express()
const PORT = 3002

let movies = {
    "21 jump street":{
        'quotes': [`He's white, that means people actually give a shit.`, 
                    `You have the right to... suck my dick, motherfucker!`,
                    ` Clearly I wasn't talking to you, big-titties.`]

    },
    "white chicks":{
        'quotes':[
                ` You hit like a bitch! C'mon.`,
                `Jesus, lady! All this for just a handbag? It's not *just* a handbag. It's Prada!`,
                `What a beautiful chocolate man! Beautiful!`
        ]

    },
    "zootopia":{
        'quotes':[
            `Life isn't some cartoon musical where you sing a little song and all your insipid dreams magically come true. So let it go.`,
            `I know everybody. And I also know that somewhere there's a toy store missing its stuffed animal. So why don't you get back to your box?`,
            `You want to talk about making the world a better place, no better way to do it than becoming a carrot farmer.`
    ]
    }
}

let rappers = "NO SUCH MOVIE"

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})


app.get('/api/movies', (request, response) => {
    
        response.json(movies)
        console.log(movies['zootopia']['quotes'][0])
    
})

app.get('/api/:name', (request, response) => {
    const movieName = request.params.name.toLowerCase()
    const quoteNum = Math.floor(Math.random()*3)
    console.log(quoteNum)
    if(movies[movieName]){
        response.json(movies[movieName]['quotes'][quoteNum])
    }else{
        response.json(rappers)
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

