/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('plantillas_meta_datos', {
    keym: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    id_plantilla_meta_dato: {
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
    keym_pla: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'plantillas',
        key: 'keym'
      }
    },
    id_plantilla: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    id_usuario_pla: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    keym_met: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'meta_datos',
        key: 'keym'
      }
    },
    id_meta_dato: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    id_usuario_met: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    requerido: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    fecha_ultima_modificacion: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'plantillas_meta_datos'
  });
};
