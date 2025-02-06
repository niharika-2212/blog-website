import express from "express";
const app = express();

const port = 3000;

let arr = [];
let curr = "";
// to read data in the form of req, res
app.use(express.urlencoded({ extended: true }));
// to use css as static website
app.use(express.static("public"));

// render main page
app.get(["/", "/home"], (req, res) => {
  curr = "home";
  res.render("index.ejs", { posts: arr , curr:curr});
});

// render create page to create post
app.get("/create", (req, res) => {
  curr = "create";
  res.render("index.ejs",{curr:curr});
});

// render edit page list blogs to edit
app.get("/edit", (req, res) => {
  curr="edit";
  res.render("index.ejs", { posts: arr ,curr:curr});
});

// render edit page for particular blog
app.get("/edit-post", (req, res) => {
  const postIndex = req.query.id;
  curr="edit-post";
  res.render("index.ejs", { posts: arr, i: postIndex ,curr:curr});
});

app.post("/submit", (req, res) => {
  // if edit page submission then edit in array
  if (req.query.id) {
    const i = req.query.id;
    arr[i][0] = req.body["text-heading"];
    arr[i][1] = req.body["text-content"];
  } else { // else create a new section in array
    let temp = [];
    let heading = req.body["text-heading"];
    let body = req.body["text-content"];
    temp.push(heading);
    temp.push(body);
    arr.push(temp);
  }
  curr="home";
  res.render("index.ejs", { posts: arr ,curr:curr});
});


app.get("/delete",(req,res)=>{
  const i=req.body.id;
  let w = arr.splice(i,1);
  curr = "edit";
  res.render("index.ejs", { posts: arr ,curr:curr});
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
