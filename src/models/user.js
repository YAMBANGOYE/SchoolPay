const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nom: { 
    type: String, 
    required: true 
  },
  prenom: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  telephone: { 
    type: String, 
    required: true
  },
  enligne: { 
    type: Boolean, 
    required: true, 
    default: false
  },
  status: { 
    type: String,
      enum: ["superadmin", "admin", "redponsable"],
      required: true
  },
  password: { 
    type: String, 
    required: true 
  }
});

/* 🔐 Hash du mot de passe */
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

/* ✅ COMPARAISON DU MOT DE PASSE */
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);