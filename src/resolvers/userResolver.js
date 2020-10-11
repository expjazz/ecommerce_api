const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const EmailVerification = require('../models/emailVerification');
const { transporter, niceEmail } = require('../mail');

const userResolver = {
  Query: {
    users() {
      return User.find();
    },

    user(_, { id }) {
      return User.findById(id);
    },

    async currentUser(_, __, context) {
      if (!context.request.userId) {
        return null;
      }
      const user = await User.findById(context.request.userId);

      return user;
    },
  },

  User: {
    async items(parent) {
      const user = await User.findById(parent._id).populate('items');
      return user.items;
    },
  },

  Mutation: {
    async signUp(_, { user }, context) {
      user.email = user.email.toLowerCase();
      const { email, password } = user;
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await new User({
        ...user,
        email,
        password: hashPassword,
      });
      newUser.save();
      const token = jwt.sign({ userId: newUser._id }, process.env.APP_SECRET);
      context.response.cookie('token', token, {
        httpOnly: true,
        maxAge: 100 * 60 * 60 * 24 * 365,
      });
      const emailToken = jwt.sign({ userId: newUser._id }, 'emailVerification');
      const verification = await new EmailVerification({
        _userId: newUser.id,
        token: emailToken,
      });
      verification.save();
      console.log(verification);
      const mailRes = await transporter.sendMail({
        from: 'expeditojazz@gmail.com',
        to: newUser.email,
        subject: 'Click here to validate',
        html: niceEmail(`Your Password Reset Token is here!
      \n\n
      <p>Click Here to Confirm ${verification._id} </p>`),
      });

      return newUser;
    },
    updateUser(_, { id, user }) {
      return User.findByIdAndUpdate(id, user, {
        new: true,
        useFindAndModify: false,
      });
    },
    deleteUser(_, { id }) {
      return User.findByIdAndRemove(id, {
        useFindAndModify: false,
      });
    },
  },
};

module.exports = userResolver;
