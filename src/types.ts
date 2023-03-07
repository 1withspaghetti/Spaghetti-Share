export const fileTypes: {[key: string]: string} = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
    gif: "image/gif",
    mp4: "video/mp4",
    webm: "video/webm"
}

export interface FileData {
    id: number,
    name: string,
    src: string,
    type: string,
    date: string
}