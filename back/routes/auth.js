const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/reg_log", (req, res, next) => {
  console.log('auth')
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      return res.status(400).json({ errors: "No user found" });
    }
    req.logIn(user, function (err) { // if user exist and no error -> log in
      console.log('loga ina')
      if (err) {
        return res.status(400).json({ errors: err });
      }
      return res.status(200).json({ success: `logged in ${user.id}` });
    });
  })(req, res, next);
});

module.exports = router;
