const {MenuItem} = require('../models/models');
const ApiError = require('../error/ApiError')

class MenuItemController {
   async add(req, res, next) {
      try {
        const { name, description, price_normal, price_large, category } = req.body;
        if (!name || !description || !price_normal || !price_large || !category) {
         return next(ApiError.badRequest('Не переданы все параметры для создания пиццы'));
       }
        const menuItem = await MenuItem.create({ name, description, price_normal, price_large, category });
        return res.json(menuItem);

      } catch (error) {
        next(ApiError.internal('Непредвиденная ошибка сервера'));
      }
    }
  
  async getSorted(req,res){
  
  }
  
  async getById(req, res, next) {
   const { id } = req.params;
   try {
     const menuItem = await MenuItem.findById(id);
     if (!menuItem) {
       return next(ApiError.notFound('Элемент меню не найден'));
     }
     return res.json(menuItem);
   } catch (error) {
     next(ApiError.internal('Непредвиденная ошибка сервера'));
   }
 }

 async delete(req, res, next) {
   const { id } = req.params;
   try {
     const menuItem = await MenuItem.findByIdAndDelete(id);
     if (!menuItem) {
       return next(ApiError.notFound('Элемент меню не найден'));
     }
     return res.json({ message: 'Элемент меню успешно удален' });
   } catch (error) {
     next(ApiError.internal('Непредвиденная ошибка сервера'));
   }
 }
  
  }
  
  module.exports = new MenuItemController()