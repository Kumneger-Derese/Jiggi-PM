import {DataTypes} from "sequelize";
import sequelize from "../config/sequelize.js";

const List = sequelize.define("lists", {
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
    position: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1
    },
    projectId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'lists',
    modelName: "list",
})

export default List;
