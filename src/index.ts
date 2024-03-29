import express from "express";
import cors from "cors";
import path from 'path';
import { generate } from "./utils";
import simpleGit from "simple-git";
import { getAllFiles } from './file';
import { uploadFile } from  './aws';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/hello", (req, res) => {
    return res.json({ status: "running perfectly"});
});


app.post("/deploy", async (req, res) => {
    const repoUrl = req.body.repoUrl;
    const id = generate();
    await simpleGit().clone(repoUrl, path.join(__dirname,`output/${id}`));
    const files = getAllFiles(path.join(__dirname, `output/${id}`));

    files.forEach((file, index) => {
        uploadFile(file.slice(__dirname.length + 1), file);
    });
  
    res.json({ id: id});
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});