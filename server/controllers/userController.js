const ApiError = require('../error/ApiError');
const { User,Cart } = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailer = require('../middleware/nodeMailer');

const generateJWT = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
};

class UserController {
  async registration(req, res, next) {
    try {
      const { email, name = null, password, role = 'USER', phoneNumber = null } = req.body;
      if(!email || !password){
        return next(ApiError.badRequest('Не указан email или пароль')); 
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
        return next(ApiError.badRequest('Не указан email или пароль')); 
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

  async getUserById(req, res, next) {
    try {
      const { id } = req.user; // Получаем id пользователя из декодированного JWT токена
      const user = await User.findOne({
        where: { id },
        attributes: ['id', 'email', 'name', 'password', 'phoneNumber','role']
      });
  
      if (!user) {
        return next(ApiError.notFound('Пользователь не найден'));
      }
  
      return res.status(200).json(user);
    } catch (error) {
      next(ApiError.internal('Непредвиденная ошибка сервера: ' + error.message));
    }
  }

  async check(req, res, next) {
    try {
      const token = generateJWT(req.user.id, req.user.email, req.user.role)
      return res.json({token})
      }
     catch (error) {
      next(ApiError.internal('Непредвиденная ошибка сервера: ' + error.message));
    }
  }


  async sendRecoveryCode(req, res) {
    try {
      const userEmail = req.body.email;
  
      // Find the user in the database
      const user = await User.findOne({ where: { email: userEmail } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a random 6-digit recovery code
      let recoveryCode = '';
      for (let i = 0; i < 6; i++) {
        recoveryCode += Math.floor(Math.random() * 10);
      }
  
      // Update the recovery field in the database
      await user.update({ recovery: recoveryCode });
  
      // Send the recovery code to the user's email
      const mailOptions = {
        to: userEmail,
        subject: 'Ваш код восстановления и скидка на доставку',
        text: `Ваш код восстановления: ${recoveryCode}
        
        Не забудьте, мы предлагаем 15% скидку на все заказы с доставкой на этой неделе!
        Воспользуйтесь этим отличным предложением.`
        };
        mailer(mailOptions);
      res.status(200).json({ message: 'Recovery code sent to your email' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending recovery code' });
    }
  }


  async verifyRecoveryCode(req, res) {
    try {
      const { email, recoveryCode} = req.body;
      // Find the user in the database
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the recovery code matches
      if (user.recovery !== recoveryCode) {
        return res.status(400).json({ message: 'Invalid recovery code' });
      }
  
  
      res.status(200).json({ message: 'Успешно введен секретный код' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error verifying recovery code' });
    }
  }
  async updatePassword(req, res) {
    try {
      let email = req.body.email;
      let newPassword = req.body.newPassword;
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        throw new Error('User not found');
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 5);
  
      // Update the password
      await user.update({ password: hashedPassword });
  
      console.log('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error.message);
      throw error;
    }
  };

  async updateUserData(req, res){
    try {
      const { name, email, password, phoneNumber } = req.body;
      const userId = req.user.id;
  
      // Обновление данных пользователя
      const updatedUser = await User.update(
        {
          name,
          email,
          password,
          phoneNumber,
        },
        {
          where: {
            id: userId,
          },
        }
      );
  
      if (updatedUser[0] === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Получение обновленного пользователя
      const user = await User.findByPk(userId);
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error updating user data:', error);
      res.status(500).json({ message: 'Error updating user data' });
    }
  };
  
}


module.exports = new UserController();


//mail ru - pizzamail123@mail.ru || 81451528136500c