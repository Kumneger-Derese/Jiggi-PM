import {DataTypes} from "sequelize";
import sequelize from "../config/sequelize.js";

const Card = sequelize.define("Card", {
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
            defaultValue: 1
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
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
    },
    {
        tableName: "cards",
        timestamps: true,
        modelName: "card",
    })

export default Card