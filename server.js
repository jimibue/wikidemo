const { db } = require("./model");
const app = require("./app");
const PORT = 3000;

const init = async () => {
  try {
    //   await Page.sync()
    //   await User.sync()
    await db.sync({force: true});

    app.listen(PORT, () => {
      console.log(`Listening on port http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log('err:', err)
  }
};

init()
