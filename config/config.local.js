exports.sequelize = {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  database: 'tea',
  username: 'root',
  password: 'password',
  define: {
    timestamps: false, // 是否自動加 created_at、updated_at
    freezeTableName: true, // 表名與 model 名一致
  },
}
