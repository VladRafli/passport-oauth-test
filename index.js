import * as bcrypt from "bcrypt";
import * as env from "dotenv";
import express from "express";
import * as hbs from "express-handlebars";
import user from "./database/user";
import webRoutes from "./routes/web";
// Set environment variables
env.config();
// Seed memory database
user.push({
  id: user.length + 1,
  username: "admin",
  password: bcrypt.hashSync("admin", bcrypt.genSaltSync()),
});

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.engine(".hbs", hbs.engine({ defaultLayout: false, extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/resources/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(cors());
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.status(404).render("404");
});
app.use(webRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server is started on http://localhost:${process.env.PORT}`)
);
