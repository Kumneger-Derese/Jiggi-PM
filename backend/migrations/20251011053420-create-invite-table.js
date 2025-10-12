import {DataTypes} from 'sequelize'

export const up = async ({context: queryInterface}) => {
// TODO: Add migration code here (e.g., createTable, addColumn)
    await queryInterface.createTable(
        'invites',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            token: {
                type: DataTypes.STRING, //store SHA256 hex
                allowNull: false,
                unique: true
            },
            status: {
                type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'expired'),
                default: 'pending',
                allowNull: false
            },
            projectId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'projects', // table name
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            inviterId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users', // table name
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            expiresAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            acceptedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
    )
}

export const down = async ({context: queryInterface}) => {
    // TODO: Add reverting code here (e.g., dropTable, removeColumn)
    await queryInterface.dropTable('invites')
}
