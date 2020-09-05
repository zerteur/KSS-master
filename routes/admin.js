var express = require('express')


var router = express.Router();

// router.use(function (req, res, next) {
//   if (!req.cookies.userData) res.redirect('/')
//   if (req.cookies.userData.level == 0) next()
//   else res.redirect('/')
// });

router.get("/", (req, res, next) => {
  res.send("ok")
})

module.exports = router;