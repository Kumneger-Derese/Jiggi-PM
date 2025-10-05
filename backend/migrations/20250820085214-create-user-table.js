import {DataTypes} from 'sequelize'

export const up = async ({context: queryInterface}) => {
// TODO: Add migration code here (e.g., createTable, addColumn)
    await queryInterface.createTable('users', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    })
}

export const down = async ({context: queryInterface}) => {
    // TODO: Add reverting code here (e.g., dropTable, removeColumn)
    await queryInterface.dropTable('users')
}
