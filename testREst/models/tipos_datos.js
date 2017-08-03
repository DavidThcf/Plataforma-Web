/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipos_datos', {
    id_tipo_dato: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'tipos_datos'
  });
};
