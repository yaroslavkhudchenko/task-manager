const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/reg_log", (req, res, next) => {
  console.log('in reg log');
  console.log(req.body)
  passport.authenticate("local", function (err, user, info) {
    console.log('in pass')
    if (err) {
      console.log('111')
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      console.log('222')
      return res.status(400).json({ errors: "No user found" });
    }
    req.logIn(user, function (err) { // if user exist and no error -> log in
        console.log('console.log in login')
      if (err) {
        return res.status(400).json({ errors: err });
      }
      return res.status(200).json({ success: `logged in ${user.id}` });
    });
  })(req, res, next);
});




module.exports = router;
