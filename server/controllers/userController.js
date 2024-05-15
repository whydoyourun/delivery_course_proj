const ApiError = require('../error/ApiError')


class UserController {
  async registration(req,res){

  }

  async login(req,res){

  }

  async check(req,res,next){
    const {id} = req.query
    if(!id){
      return next(ApiError.badRequest('не задан ID пользователя'))
    }
    else{
      const message = `Вы запросили ${id}`;
      return res.status(200).json({ message });
    }
  }
}

module.exports = new UserController()