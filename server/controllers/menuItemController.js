const { MenuItem } = require("../models/models");
const ApiError = require("../error/ApiError");



class MenuItemController {
  async add(req, res, next) {
    try {
      const { name, description, price_normal, price_large, category, image } =
        req.body;
      if (
        !name ||
        !description ||
        !price_normal ||
        !price_large ||
        !category ||
        !image
      ) {
        return next(
          ApiError.badRequest("Не переданы все параметры для создания пиццы")
        );
      }
      const menuItem = await MenuItem.create({
        name,
        description,
        price_normal,
        price_large,
        category,
        image,
      });
      return res.json(menuItem);
    } catch (error) {
      next(ApiError.internal("Непредвиденная ошибка сервера" + error.message));
    }
  }

  async getSorted(req, res, next) {
    try {
      const menuItems = await MenuItem.findAll({
        order: [["name", "ASC"]],
      });

      return res.json(menuItems);
    } catch (error) {
      next(ApiError.internal("Непредвиденная ошибка сервера" + error.message));
    }
  }

  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const menuItem = await MenuItem.findByPk(id);
      if (!menuItem) {
        return next(ApiError.badRequest("Элемент меню не найден"));
      }
      return res.json(menuItem);
    } catch (error) {
      next(ApiError.internal("Непредвиденная ошибка сервера" + error.message));
    }
  }

  async addMenuItem(req, res, next) {
    const { name, description, price_normal, price_large, category, image } =
      req.body;

    try {
      // Проверка на наличие необходимых данных
      if (!name || !description || !price_normal || !price_large || !category) {
        return next(ApiError.badRequest("Все поля обязательны для заполнения"));
      }

      // Создание нового элемента меню
      const newMenuItem = await MenuItem.create({
        name,
        description,
        price_normal,
        price_large,
        category,
        image,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return res.status(201).json(newMenuItem);
    } catch (error) {
      console.error(error);
      return next(
        ApiError.internal(
          "Ошибка при добавлении элемента меню: " + error.message
        )
      );
    }
  }
}

module.exports = new MenuItemController();
