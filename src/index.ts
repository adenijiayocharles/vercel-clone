import express from "express";
import cors from "cors";
import { generate } from "./utils";
import simpleGit from "simple-git";


const app = express();
app.use(cors());
app.use(express.json());

app.get("/hello", (req, res) => {
    return res.json({ status: "running perfectly"});
});


app.post("/deploy", async (req, res) => {
    const repoUrl = req.body.repoUrl;
    const id = generate();
    await simpleGit().clone(repoUrl, `output/${id}`);
    res.json({ id: id});
});

app.listen(3000, () => {
    console.log('listening on port 3000')
});