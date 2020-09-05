const express = require('express')
const fetch = require('node-fetch')
const xml2js = require('xml2js')
const bcrypt = require("bcrypt")
const cookieParser = require('cookie-parser')

const User = require("../models/User")
const {
  use
} = require('./admin')

var router = express.Router();
var teamRssLink = "https://mangadex.org/rss/9KDNWuA7z683StEQGB2yqcgMxsnawR4Z/group_id/13463?h=0"

router.get('/', async (req, res, next) => {
  try {
    var rss = await fetch(teamRssLink)
    var str = await rss.text()
    var result = await xml2js.parseStringPromise(str)
    rssData = result.rss.channel[0].item.slice(0, 3)
    sentData = []
    for (let i = 0; i < rssData.length; i++) {
      let data = rssData[i]
      let [, mangaId] = /https:\/\/mangadex\.org\/title\/(\d+)/gm.exec(data.mangaLink[0]) || [, "Il y a une erreur dans ce mangaId"]
      let [, titre, chapitre] = /([A-Za-z ,\?]+) - (.+)/gm.exec(data.title[0]) || [, "Il y a une erreur dans ce titre", "Il y a une erreur dans ce chapitre"]
      let obj = {
        titre,
        chapitre,
        liens: data.link[0],
        mangaId,
        couverture: `https://mangadex.org/images/manga/${mangaId}.jpg`
      }
      sentData.push(obj)

    }
    res.render('index', {
      title: 'Index',
      sentData
    })
  } catch (e) {
    next(e)
  }
})

router.get('/sorties', async (req, res, next) => {
  try {
    var rss = await fetch(teamRssLink)
    var str = await rss.text()
    var result = await xml2js.parseStringPromise(str)
    rssData = result.rss.channel[0].item
    sentData = []
    for (let i = 0; i < rssData.length; i++) {
      let data = rssData[i]
      let [, mangaId] = /https:\/\/mangadex\.org\/title\/(\d+)/gm.exec(data.mangaLink[0]) || [, "Il y a une erreur dans ce mangaId"]
      let [, titre, chapitre] = /([A-Za-z ,\?]+) - (.+)/gm.exec(data.title[0]) || [, "Il y a une erreur dans ce titre", "Il y a une erreur dans ce chapitre"]
      let obj = {
        titre,
        chapitre,
        liens: data.link[0],
        mangaId,
        couverture: `https://mangadex.org/images/manga/${mangaId}.jpg`
      }
      sentData.push(obj)

    }
    res.render('sorties', {
      title: 'Sorties',
      sentData
    })
  } catch (e) {
    next(e)
  }

})

router.get('/team', async (req, res, next) => {
  res.render('team', {
    title: 'Team'
  })
})

router.get('/planning', async (req, res, next) => {
  res.render('planning', {
    title: 'Planning'
  })
})

router.get('/discord', (req, res) => {
  res.redirect('https://discord.gg/XjP3Mxm')
})

router.get('/logIn', async (req, res, next) => {
  res.render('logIn', {
    title: 'Log In'
  })
})

router.post('/submitLogInForm', async (req, res) => {
  const pseudo = req.body.pseudo
  const password = req.body.password
  try {
    const dbUser = await User.findOne({
      pseudo: pseudo
    })
    if (dbUser == null) return false
    bcrypt.compare(password, dbUser.password, function (err, result) {
      if (result) {
        let user = {
          pseudo: pseudo,
          level: dbUser.level
        }
        console.log(user)
        res.cookie("userData", user);
        res.redirect("/")
      } else {
        res.redirect("/logIn")
      }
    });
  } catch (e) {
    res.status(404)
    res.send({
      message: "User doesn't exist!",
      error: e
    })
  }
})

router.get('/*', (req, res) => {
  res.render('error', {
    title: 'Error'
  })
})




module.exports = router;