//main.js
var express = require('express'),
    fs = require('fs'),
    multer = require('multer'),
    cors = require('cors');

let app = express();

app.use(cors());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'files/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-';
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage });

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html');
})

app.post('/upload', upload.any(), (req, res)=>{
    var result = req.files;
    // 支持base64上传
    if (req.body['file-base64']) {
        fs.writeFile(__dirname + "files-base64/out.png", req.body['file-base64'].replace(/^data:image\/jpeg;base64,/, ""), 'base64', function(err) {
            console.log(err);
        });
    }
    res.json({
        success: 1,
        data: {
            url: result[0].originalname,
        }
    });//返回信息自己定义
})

app.listen(9091);