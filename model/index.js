const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack");

// create some models.
// MVC - model view controller(routes)

// PAGE - {title:string, slug:string, content:text, status:enum}
const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    // when trying to save to db this can't be null
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("open", "closed"),
  },
});

// the cb we call here will be called before we do any validation
Page.beforeValidate((page) => {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  console.log("BEFORE PAGE VALIDATION:")
  if(!page.slug){
    page.slug = page.title.replace(/\s+/g, "_").replace(/\W/g, "").toLowerCase()
  }
});

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

// adds methods to our Page model and create a foreign key on our
// Page 'authorId'
Page.belongsTo(User, { as: "author" });

module.exports = {
  db,
  Page,
  User,
};
