import bcrypt from 'bcryptjs'
import { DataTypes } from 'sequelize'
import sequelize from '../config/sequelize.js'

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Must be a valid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: [5],
          msg: 'Password must be at least 5 characters long'
        }
      }
    }
  },
  {
    timestamps: true,
    tableName: 'users',
    modelName: 'user',
    // exclude password by default and also I can customize
    // defaultScope: {
    //     attributes: {
    //         exclude: ['password'],
    //     }
    // },
    hooks: {
      // Hash password before creating and updating
      beforeCreate: async user => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10)
          user.password = await bcrypt.hash(user.password, salt)
        }
      },
      beforeUpdate: async user => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10)
          user.password = await bcrypt.hash(user.password, salt)
        }
      }
    }
  }
)

//Instance Method for matching password during login
User.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

export default User
