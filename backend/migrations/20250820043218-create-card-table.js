
import {DataTypes} from 'sequelize'

export const up = async ({context: queryInterface}) => {
// TODO: Add migration code here (e.g., createTable, addColumn)
    await queryInterface.createTable('cards', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        position: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        listId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "lists",
                key: 'id',
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    })
}

export const down = async ({context: queryInterface}) => {
 // TODO: Add reverting code here (e.g., dropTable, removeColumn)
    await queryInterface.dropTable('cards')
}
