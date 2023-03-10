import app from "./app";

let port: number;

if (process.env.PORT == undefined) {
  port = 3000;
} else {
  port = +process.env.PORT;
}

app.listen(port, () => {
  console.log(`Server started listening on http://localhost:${port}`);
});
