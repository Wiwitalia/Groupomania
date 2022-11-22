const mongoose = require('mongoose');
const { isEmail } = require('validator'); // On appel dans la biblioteque validator la fonction isEmail
const bcrypt = require('bcrypt');


// Shema de notre utilisateur
const userSchema = new mongoose.Schema(
  { admin: {
      type: Boolean,
      required: true,
      default: false
    },
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true   // suppression des éspaces
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail], // Validation du mail
      lowercase: true, // Minuscules
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6
    },
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png"
    },
    bio :{
      type: String,
      max: 1024,
    },
    followers: {
      type: [String]
    },
    following: {
      type: [String]
    },
    likes: {
      type: [String]
    }
  },
  {
    timestamps: true,  // Date de creation de l'utilisateur
  }
);

// play function before save into display: 'block',
userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Mot de passe incorrect');
  }
  throw Error('email incorrect')
};

const UserModel = mongoose.model("user", userSchema);  // On recupere le userShema, on incremente dans la table user dans la BDD

module.exports = UserModel;