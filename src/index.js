import app from "./app";
const port = process.env.PORT || 4269;
app.listen(port, () => console.log(`app listening on port ${port}!`));
