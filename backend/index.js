require("dotenv").config();
var cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
const userRouter = require("./api/users/userRouter");
const workshopRouter = require("./api/workshops/workshopRouter");
const ativitiesRouter = require("./api/activities/activityRouter");
const newsRouter = require("./api/news/newsRouter");
const projectsRouter = require("./api/projects/projectRouter");
const donatorsRouter = require("./api/donators/donatorsRouter");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const path = require("path");

app.use(express.static(__dirname));
app.use(express.json());
app.use(fileUpload());
app.use("/api/users", userRouter);
app.use("/api/workshops", workshopRouter);
app.use("/api/activities", ativitiesRouter);
app.use("/api/news", newsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/donators", donatorsRouter);

function formatPath(str) {
  var newString = str.toLowerCase();
  newString = newString.replace(/ć|č/g, "c").replace(/š/g, "s").replace(/đ/g, "d").replace(/ž/g, "z").replace(/:|-|,/g, "").replace(/ /g, "-").replace(".", "");
  return newString;
}

app.post("/upload/:tipobjave/:naslov", (req, res) => {
  const { image } = req.files;
  const naslov = formatPath(req.params.naslov);
  const tipObjave = req.params.tipobjave;
  fs.mkdir(path.join(__dirname + "/newuploads/" + tipObjave + "/", naslov), (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Folder uspješno dodan");
  });

  if (image.length > 1) {
    let imageNumber = 0;
    image.forEach((slika) => {
      let slikaName = naslov + imageNumber + ".jpg";
      slika.mv(__dirname + "/newuploads/" + tipObjave + "/" + naslov + "/" + slikaName);
      imageNumber++;
    });
  } else image.mv(__dirname + "/newuploads/" + tipObjave + "/" + naslov + "/" + naslov + "0.jpg");

  res.sendStatus(200);
});

app.get("/:nazivFoldera/:naslov", async (req, res) => {
  const naslov = req.params.naslov;
  const nazivFoldera = req.params.nazivFoldera;
  const testFolder2 = "./../backend/newuploads/" + nazivFoldera + "/" + naslov + "/";
  try {
    const slike = fs.readdirSync(testFolder2);
    res.json(slike);
  } catch (err) {}
});

app.listen(5000, () => {
  console.log("Server up and running on port", 5000);
});
