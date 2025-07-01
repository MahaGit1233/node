const fs = require("fs");

const requestHandler = (req, res) => {
  console.log("Server Created");

  const url = req.url;
  const method = req.method;

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");

    fs.readFile("value.txt", (err, data) => {
      console.log(data.toString());
      let messages = data.toString();
      res.end(
        `
        <div>
            <h1>${messages}</h1>
                <form action='/message' method='POST'>
                    <label>Name:</label>
                    <input type='text' name='username'></input>
                    <button type='submit'>Add</button>
                </form>
        </div>
        `
      );
    });
  } else {
    if (req.url === "/message") {
      res.setHeader("Content-Type", "text/html");

      let dataChunks = [];
      req.on("data", (chunks) => {
        console.log(chunks);
        dataChunks.push(chunks);
      });

      req.on("end", () => {
        let combineBuffer = Buffer.concat(dataChunks);
        console.log(combineBuffer.toString());
        let value = combineBuffer.toString().split("=")[1];
        console.log(value);

        fs.writeFile("value.txt", value, (err) => {
          res.statusCode = 302;
          res.setHeader("Location", "/");
          res.end();
        });
      });
    }
  }
};

exports.handler=requestHandler;
