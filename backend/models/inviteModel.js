import sequelize from "../config/sequelize.js";
import {DataTypes} from "sequelize";

const Invite = sequelize.define(
    'invite',
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
        status: {
            type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'expired'),
            default: 'pending',
            allowNull: false
        },
        token: {
            type: DataTypes.STRING, //store SHA256 hex
            allowNull: false,
            unique: true
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
        }
    },
    {
        tableName: 'invites',
        modelName: 'invite',
        timestamps: true,
    }
)

export default Invite;