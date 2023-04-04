import "../css/admin-page.css";
import { useState } from "react";
import AWS from "aws-sdk";

const S3_BUCKET = "vgs-website-resources/static";
const REGION = "us-east-1";
const ACCESS_KEY = "AKIA6C44BFWJBQXDULXD";
const SECRET_ACCESS_KEY = "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";

AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
    maxRetries: 1, // on upload fail retry to upload only once (default is 3 times)
    httpOptions: {
        timeout: 10000000, // set timeout to 10000000 milliseconds = 167 minutes
        connectTimeout: 10000000 // set timeout to 10000000 milliseconds = 167 minutes
        
    }
});


export default function AdminPage() {
    const [progress, setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const myBucket = new AWS.S3({
        params: {Bucket: S3_BUCKET},
        region: REGION
    });

    function handleFileInput(e) {
        setSelectedFile(e.target.files[0]);
    }

    function handleUpload(file) {
        const params = {
            Bucket: S3_BUCKET,
            Body: file,
            Key: file.name
        }
        
        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded/evt.total)*100));
            })
            .send((err) => {
                if (err) {
                    console.log(err);
                }
            });
    }

    
    return (
        <div className="body">
            <h3 className="text">Admin Page : progress {progress}%</h3>
            <input type="file" onChange={handleFileInput} />
            <button onClick={() => handleUpload(selectedFile)}>upload</button>
        </div>
    )
}