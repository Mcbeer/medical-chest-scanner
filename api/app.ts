import cors from "cors";
import express, { Request, Response } from "express";
import fs from "fs";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.get("/guides", (_req: Request, res: Response) => {
  const file = fs.readFileSync("./vejledninger.json", "utf8");
  const parsedFile = JSON.parse(file);

  res.json(parsedFile);
});

app.listen(8000, () => console.log("Running now"));
