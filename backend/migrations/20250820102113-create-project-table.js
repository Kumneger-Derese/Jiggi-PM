import {DataTypes} from 'sequelize'

export const up = async ({context: queryInterface}) => {
// TODO: Add migration code here (e.g., createTable, addColumn)
    await queryInterface.createTable('projects', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        ownerId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users', //table name
                key: 'id',
            },
            onDelete: 'CASCADE', // if users deleted their project also deleted
            onUpdate: 'CASCADE',
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
    await queryInterface.dropTable('projects')
}
