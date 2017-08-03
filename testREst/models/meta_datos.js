/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('meta_datos', {
    keym: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    id_meta_dato: {
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
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    meta_dato_ir: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    id_tipo_dato: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'tipos_datos',
        key: 'id_tipo_dato'
      }
    },
    fecha_ultima_modificacion: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'meta_datos'
  });
};
