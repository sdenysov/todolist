module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Status", {
        name: DataTypes.STRING,
    }, {
        timestamps: false,
        underscored: true,
        tableName: 'statuses',
        version: false
    })
};