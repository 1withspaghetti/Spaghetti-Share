import type { FileData } from "./types";


export function downloadImage(file: FileData) {
    var link = document.createElement("a");
    link.download = file.name;
    link.href = '/media/'+file.id+'.'+file.type;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link.remove();
}

export function copyLink(file: FileData, callback: (success: boolean)=>any) {
    navigator.clipboard.writeText('https://share.1withspaghetti.com/media/'+file.id+'.'+file.type)
        .then(()=>{callback(true)})
        .catch(()=>{callback(false)})
}

export function copyImage(file: FileData, callback: (success: boolean)=>any) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    var img = document.createElement("img");
    img.src = '/media/'+file.id+'.'+file.type;
    img.onload = ()=>{
        canvas.width = img.width;
        canvas.height = img.height;
        if (!context) return callback(false)
        context.drawImage(img, 0, 0);
        canvas.toBlob((blob)=>{
            if (!blob) return callback(false)
            navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
                .then(()=>{callback(true)})
                .catch(()=>{callback(false)})
        }, "image/png");
    };
    img.onerror = ()=>{callback(false)}
}