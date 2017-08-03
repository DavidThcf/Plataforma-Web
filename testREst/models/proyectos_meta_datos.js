/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proyectos_meta_datos', {
    keym: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    id_proyecto_meta_dato: {
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
    keym_pro: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'proyectos',
        key: 'keym'
      }
    },
    id_proyecto: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    id_usuario_pro: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    valor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_title: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_ultima_modificacion: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'proyectos_meta_datos'
  });
};
