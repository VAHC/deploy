const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El nombre es requerido.'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El apellido es requerido.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'El correo electrónico debe tener un formato válido.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'La contraseña es requerida.',
        },
        len: {
          args: [8, 10],
          msg: 'La contraseña debe tener entre 8 y 10 caracteres.',
        }
      }
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: {
          args: true,
          msg: 'El número de teléfono debe ser numérico'
        },
        len: {
          args: [10, 15],
          msg: 'El número de teléfono debe tener entre 10 y 15 dígitos'
        }
      }
    },
    profile: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    state: {
      type: DataTypes.ENUM,
      values: ["New", "Active", "Inactive", "Blocked"],
      defaultValue: "New",
      allowNull: false,
    },
    suscribed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    date_suscription: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'La fecha de suscripción es requerida.'
        }
      }
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
