'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class commentaires extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.commentaires.belongsTo(models.utilisateurs,{
        foreignKey:{
          allowNull: false
        }
      })
    }
  };
  commentaires.init({
    pseudo: DataTypes.STRING,
    contenu_commentaire: DataTypes.STRING,
    articles_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'commentaires',
  });
  return commentaires;
};