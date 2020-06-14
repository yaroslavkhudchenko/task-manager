const mongoose = require("mongoose");
/* 
const ThirdPartyReg = new mongoose.Schema({
  provider_name: {
    type: String,
    default: null,
  },
  provider_id: {
    type: String,
    default: null,
  },
  provider_data: {
    type: {},
    default: null,
  },
}); */

// Create Schema for the User
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    /* email_is_verified: {
      type: Boolean,
      default: false,
    }, */
    password: {
      type: String,
      required:true
    },
    /* referral_code: {
      type: String,
      // This is a custom function and creates a six-character hash of the email. I.e., a new referral code is created whenever somebody signs up.
      default: () => {
        let hash = 0;
        for (let i = 0; i < this.email.length; i++) {
          hash = this.email.charCodeAt(i) + ((hash << 5) - hash);
        }
        let res = (hash & 0x00ffffff).toString(16).toUpperCase();
        return "00000".substring(0, 6 - res.length) + res;
      }, 
    },
    referred_by: {
      type: String,
      default: null,
    },
    third_party_auth: [ThirdPartyReg], */
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { strict: false }
);

const users = mongoose.model("users", UserSchema);

module.exports = users; // export users variable