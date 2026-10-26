import app from "./app";

const Port = 5000;

app.listen(Port, () => {
  console.log(`Server is running at http://localhost:${Port}`);
});
