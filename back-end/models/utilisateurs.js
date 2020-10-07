'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class utilisateurs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  utilisateurs.init({
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    permission: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'utilisateurs',
  });
  return utilisateurs;
};