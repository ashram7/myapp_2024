let express = require("express");
let axios = require("axios");

let app = express();
let port = process.env.PORT || 80;

app.use(express.static("public_html"));
app.listen(port, function(){
    console.log("HTML 서버 시작됨");
});

app.get("/pharmach_list", (req, res) => {
    let api = async() => {
        let response = null;
        try {
            response = await axios.get("http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire", {
                params : {
                    "serviceKey" : "pBm/blCKgCXdJVHkGTN5mPOlNmmOH1fu7x61kAhi/yWcpQJLz4Q0UC+p6cBj7wpTTC0QoFpaPNoinkRcc2Q6NA==",

                    "Q0" : req.query.Q0,
                    "Q1" : req.query.Q1,
                    "QT" : req.query.QT,
                    "QN" : req.query.QN,
                    "ORD" : req.query.ORD,
                    "pageNo" : req.query.pageNo,
                    "numOfRows" : req.query.numOfRows
                }
            });
        }
        catch(e) {
            console.lgo(e);
        }
            
        return response;
    }

    api().then((response) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(response.data.response.body);
    });        
});