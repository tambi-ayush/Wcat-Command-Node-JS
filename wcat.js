let fs = require("fs");
let inputArr = process.argv.slice(2);
let optionArr = [];
let filesArr = [];

let flag=false;//flag to implement only -n or -b
for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i].charAt(0) == "-")
        optionArr.push(inputArr[i]);
    else
        filesArr.push(inputArr[i]);
}

for (let i = 0; i < filesArr.length; i++) {
    if (fs.existsSync(filesArr[i]) == false)
        return;
}

let content = "";
for (let i = 0; i < filesArr.length; i++) {
    content += fs.readFileSync(filesArr[i]) + "\r\n";
}

for (let k = 0; k < optionArr.length; k++) {
    if (optionArr[k] == "-s") {
        let scontentArr = content.split("\r\n");
        for (let i = 1; i < scontentArr.length; i++) {
            if (scontentArr[i] == "" && scontentArr[i - 1] == "") {
                scontentArr[i] = null;
            }
            else if (scontentArr[i] == "" && scontentArr[i - 1] == null) {
                scontentArr[i] = null;
            }
        }
        let temparr = [];
        for (let i = 0; i < scontentArr.length; i++) {
            if (scontentArr[i] !== null)
                temparr.push(scontentArr[i]);
        }
        scontentArr = temparr;
        content = scontentArr.join("\r\n");
    }
    else if (optionArr[k] == "-n" && flag==false) {
        flag=true;
        let ncontentArr = content.split("\r\n");
        let lineCount = 1;
        for (let i = 0; i < ncontentArr.length; i++) {
            ncontentArr[i] = lineCount + " " + ncontentArr[i];
            lineCount++;
        }

        content = ncontentArr.join("\r\n");
    }

    else if (optionArr[k] == "-b" && flag==false) {
        flag=true;
        let bcontentArr = content.split("\r\n");
        let lineCount = 1;
        for (let i = 0; i < bcontentArr.length; i++) {
            if (bcontentArr[i] != "") {
                bcontentArr[i] = lineCount + "\t" + bcontentArr[i];
                lineCount++;
            }
        }
        content = bcontentArr.join("\r\n");

    }
}

console.log("" + content);

