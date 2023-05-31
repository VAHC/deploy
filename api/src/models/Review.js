const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('review', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El título de la reseña no puede estar vacío.'
        },
        len: {
          args: [2, 100],
          msg: 'El título de la reseña debe tener entre 2 y 100 caracteres.'
        }
      }
    },
    qualification: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: 'La calificación debe ser un número entero positivo.'
        },
        max: {
          args: [5],
          msg: 'La calificación debe ser un número entero menor o igual a 5.'
        }
      }
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El comentario no puede estar vacío.'
        },
        len: {
          args: [2, 1000],
          msg: 'El comentario debe tener entre 2 y 1000 caracteres.'
        }
      }
    },
    createdDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    timestamps: false
  })
}