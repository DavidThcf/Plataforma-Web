/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('plantillas', {
    keym: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    id_plantilla: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    id_usuario: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id_usuario'
      }
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_ultima_modificacion: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'plantillas'
  });
};
