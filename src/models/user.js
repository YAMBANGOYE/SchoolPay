const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userschema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('Email is invalid');
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isLength(value, { min: 0, max: 16 })) throw new Error('Le mot de passe doit faire entre 0 et 16 caracteres');
        }
    },
    role: {
        type: String,
        enum: ["SUPER_ADMIN", "ADMIN_ETABLISSEMENT", "FACTURATION", "PARENT"],
        required: true
    },
    ecoleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ecole'
    }
    }, 
    { timestamps: true }
);

userschema.statics.findUser = async (email, password,) => {
    const user = await User.findOne({ email });
   
   
    if (!user) throw new Error('Unable to login');      
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) throw new Error('Unable to login');
    
    return user;
}
userschema.pre('save', async function () {
    if (this.isModified('password')) {
        // Hash the password before saving (hashing code not shown here)
        this.password = await bcrypt.hash(this.password, 8);
    }
});
const User = mongoose.model('User', userschema);
module.exports = User;