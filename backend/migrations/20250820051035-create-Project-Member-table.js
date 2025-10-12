import {DataTypes} from 'sequelize'

export const up = async ({context: queryInterface}) => {
// TODO: Add migration code here (e.g., createTable, addColumn)
    await queryInterface.createTable('ProjectMember', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        projectId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: 'projects',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        role: {
            type: DataTypes.ENUM('owner', 'editor', 'viewer'),
            default: 'viewer',
            allowNull: false
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
    await queryInterface.dropTable('ProjectMember')
}
