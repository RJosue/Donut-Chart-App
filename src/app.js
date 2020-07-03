const express = require('express')
const app = express()
const hbs = require('hbs')
const path = require('path')


const donutChart = require('./utils/donut-chart')

// Dinamic Port
const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/views/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    let model = {
        width: 500,
        heigth: 500,
        cx: 250,
        cy: 250,
        radius: 200,
        arcwidth: 80,
        colors: ['#82B341', '#333333'],
        colorFont: "#333333",
        font: "arial",
        porcen: 59
    }
    let returnCanvas = new donutChart().create(model)
    res.render('index', {
        returnCanvas
    })
})

app.listen(port, () => {
    console.log("SERVER START IN PORT " + port)
})