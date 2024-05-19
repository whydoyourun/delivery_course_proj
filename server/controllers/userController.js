const ApiError = require('../error/ApiError');
const { User,Cart } = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateJWT = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
};

class UserController {
  async registration(req, res, next) {
    try {
      const { email, name, password, role, phoneNumber } = req.body;
      if(!email||!name||!password||!role||!phoneNumber){
        return next(ApiError.badRequest('Не переданы все параметры для регистрации пользователя')); 
      }

      const candidate =  await User.findOne({where:{email}})
      if(candidate){
        return next(ApiError.badRequest('пользователь с данным email уже существует')); 
      }
      const hashPassword = await bcrypt.hash(password,5);
      const user = await User.create({ email, name, password: hashPassword, role, phoneNumber });
      const cart = await Cart.create({userId: user.id}); 

      const token = generateJWT(user.id,user.email,user.role)

      return res.status(201).json({user,token});
    } catch (error) {
      next(ApiError.internal('Непредвиденная ошибка сервера: ' + error.message));
    }
  }

  async login(req, res, next) {
    try {
      const {email,password} = req.body;
      if(!email||!password){
        return next(ApiError.badRequest('Не переданы email или password при логине')); 
      }
      const user = await User.findOne({where:{email}});
      if(!user){
        return next(ApiError.badRequest('пользователь с таким email не найден')); 
      }
      console.log("user = " + user.email + user.password);
      console.log("user password = " + user.password);
      let comparePassword = await bcrypt.compare(password, user.password);
      if(!comparePassword){
        return next(ApiError.badRequest('неверный пароль')); 
      }

      const token = generateJWT(user.id, user.email, user.role)

      return res.status(200).json({token});
    } catch (error) {
      next(ApiError.internal('Непредвиденная ошибка сервера: ' + error.message));
    }
  }

  async check(req, res, next) {
    try {
      const { id } = req.query;
      if (!id) {
        return next(ApiError.badRequest('не задан ID пользователя'));
      } else {
        const message = `Вы запросили ${id}`;
        return res.status(200).json({ message });
      }
    } catch (error) {
      next(ApiError.internal('Непредвиденная ошибка сервера: ' + error.message));
    }
  }
}

module.exports = new UserController();