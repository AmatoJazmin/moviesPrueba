const express = require("express")

const router = express.Router()

let movies = [
    {id: 1, title: "El secreto de sus ojos", director: "Juan Jose Campanella", year: 2009},
    {id: 2, title: "Relatos salvajes", director: "Damian Szifron", year: 2014},
    {id: 3, title: "La historia oficial", director: "Luis Puenzo", year: 1985},
    {id: 4, title: "Nueve Reinas", director: "Fabian Bielinsky", year: 2000}
]

router.get('/', (req,res) => {
    res.json(movies)
})

router.get('/:id', (req,res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id))
    if(!movie) return res.status(404).send('Movie not found')
    res.json(movie)
})

router.post('/', (req,res) => {
    const newMovie = {
        id: movies.length +1,
        title: req.body.title,
        director: req.body.director,
        year: req.body.year
    }
    movies.push(newMovie)
    res.status(201).json(newMovie)
})

router.put('/:id', (req,res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id))
    if(!movie) return res.status(404).send('Movie not found')
    movie.title = req.body.title || movie.title
    movie.director = req.body.director || movie.director
    movie.year = req.body.year || movie.year
    res.json(movie)
})

router.delete('/:id', (req,res) => {
    const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id))
    if(movieIndex === -1) return res.status(404).send('Movie not found')
    const deletedMovie = movies.splice(movieIndex,1)
    res.send(deletedMovie)
})

module.exports = router