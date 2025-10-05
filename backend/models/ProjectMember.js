import sequelize from "../config/sequelize.js";
import {DataTypes} from "sequelize";

const ProjectMember = sequelize.define("ProjectMember", {
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
        type: DataTypes.ENUM('owner', 'admin', 'member', 'viewer'),
        default: 'member',
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'removed', 'invited', 'left'),
        default: 'invited',
        allowNull: false
    },
    permissions: {
        type: DataTypes.JSON,
        allowNull: true
    },
    joinedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, {
    modelName: 'ProjectMember',
    tableName: 'ProjectMember',
    timestamps: true,
})

export default ProjectMember