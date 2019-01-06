module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("Task", {
        title: DataTypes.STRING
    }, {
        timestamps: false,
        underscored: true,
        tableName: 'tasks',
        version: false
    });
    Task.associate = function (models) {
        const Status = models['Status'];
        Task.belongsTo(Status, {foreignKey: 'status_id', as: 'status'});
        //Task.hasOne(Status, {foreignKey: 'status_id', as: 'status'});
    };
    return Task;
};