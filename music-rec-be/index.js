const axios = require("axios");
const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 8000

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors())


app.post("/getSongs", async (req, res) => {
    const { name } = req.body
    const idDataPromise = axios.request({
        method: 'GET',
        url: "https://imdb8.p.rapidapi.com/title/find",
        params: { q: name },
        headers: {
            'X-RapidAPI-Key': 'de625bebd1msh5e7374e917a36a9p148c05jsn0e8c6b9b3124',
            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
    })
    let data = await idDataPromise
    let id = data.data.results[0].id.split("/")[2]
    const year = data.data.results[0].year

    const genreDataPromise = axios.request({
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/title/get-genres',
        params: { tconst: id },
        headers: {
            'X-RapidAPI-Key': 'de625bebd1msh5e7374e917a36a9p148c05jsn0e8c6b9b3124',
            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
    })
    data = await genreDataPromise
    const genreList = data.data
    const movieGenre = genreList[Math.random() * genreList.length | 0]

    const movieToSongMapping = { "Action": "Rock", "Drama": "Pop", "Adventure": "Rock", "Romance": "Country", "Thriller": "Electro", "Comedy": "Bluegrass", "Sci-Fi": "Techno" };
    const songGenre = movieToSongMapping[movieGenre] != undefined ? movieToSongMapping[movieGenre] : "Hip Hop"
})

app.listen(PORT, () => {
    console.log("Listening on port: ", PORT)
})