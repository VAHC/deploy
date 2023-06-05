const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('order', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'La fecha de la compra es requerida.'
        }
      }
    },
    state: {
      type: DataTypes.ENUM,
      values: ["Created", "Processing", "Pending", "Cancelled", "Completed"],
      defaultValue: "Created",
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'La cantidad debe ser un valor positivo o cero.'
        }
      }
    },
    price_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: {
          msg: 'El valor del total debe ser un número decimal válido'
        },
        min: {
          args: [0],
          msg: 'El valor del total debe ser mayor o igual a cero'
        },
        max: {
            args: [1000000],
            msg: 'El valor del total no puede ser mayor a 1,000,000'
        }
      }
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  },
  {
    timestamps: false
  })
}