import {DataTypes} from 'sequelize'

export const up = async ({context: queryInterface}) => {
// TODO: Add migration code here (e.g., createTable, addColumn)
    await queryInterface.changeColumn(
        'ProjectMember',
        'role',
        {
            type: DataTypes.ENUM('owner', 'editor', 'viewer'),
            default: 'viewer',
            allowNull: false
        },
    )
}

export const down = async ({context: queryInterface}) => {
    // TODO: Add reverting code here (e.g., dropTable, removeColumn)
    await queryInterface.changeColumn(
        'Project-Member',
        'role',
        {
            type: DataTypes.ENUM('owner','admin', 'member', 'viewer'),
            default: 'member',
            allowNull: false
        },
    )
}
