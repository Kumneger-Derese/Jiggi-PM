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
        defaultValue: 'viewer',
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'expired'),
        defaultValue: 'pending',
        allowNull: false
    },
}, {
    modelName: 'ProjectMember',
    tableName: 'project_members',
    timestamps: true,
})

export default ProjectMember