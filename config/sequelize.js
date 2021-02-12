'use strict';
const Sequelize = require('sequelize');
const config = require("./db.config");
const cls = require('cls-hooked');
const namespace = cls.createNamespace('my-very-own-namespace');
Sequelize.useCLS(namespace);

// local connection settings 
var pool = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
  logging: false,
  define: {
    timestamps: true,
    freezeTableName: true
  },
});

var sequelize = pool;

// checks the database connectivity
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("../models/users.model")(sequelize, Sequelize);
db.Customers = require("../models/customers.model")(sequelize, Sequelize);
db.Items = require("../models/items.model")(sequelize, Sequelize);
db.LineItem = require("../models/line_items.model")(sequelize, Sequelize);
db.Bid = require('../models/bids.model')(sequelize, Sequelize);

db.User.hasMany(db.Customers, { as: "manager", foreignKey: 'user_id', targetKey: 'id' });
db.User.hasMany(db.Items, { as: "relate_item", foreignKey: "user_id", targetKey: 'id' });
db.User.hasMany(db.Bid, { onDelete: "cascade", as: "relate_bid", foreignKey: "user_id", targetKey: 'id' });
db.User.hasMany(db.LineItem, { onDelete: "cascade", as: "relate_lineitem", foreignKey: "user_id", targetKey: 'id' });

db.Bid.belongsTo(db.Customers, { onDelete: "cascade", as: "bids", foreignKey: "customer_id", targetKey: "id" });
db.Bid.belongsTo(db.User, { onDelete: "cascade", foreignKey: "user_id", targetKey: "id" });
db.Bid.hasMany(db.LineItem, { onDelete: "cascade", foreignKey: "bid_id", targetKey: "id" })

db.Items.hasMany(db.LineItem, { onDelete: "cascade", foreignKey: "item_id", targetKey: "id" });

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

module.exports = db;