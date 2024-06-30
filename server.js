import Express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = Express();

const port = process.env.PORT || 3000;


app.use(Express.json({ extended: false }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization,Content-Disposition, x-auth-token"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST, PUT, DELETE, OPTIONS, PATCH");
  if (req.method === "OPTIONS") {
    return res.send();
  }
  next();
});


const appName = "IDrive Web App";

// serve static assets in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(Express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

//listen
app.listen(port, () => {
  console.log(`${appName} listening on port ${port}`);
});
