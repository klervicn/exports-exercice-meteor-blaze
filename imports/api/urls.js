export const urls = [
    "https://www.lempire.com/",
    "https://www.lemlist.com/",
    "https://www.lemverse.com/",
    "https://www.lemstash.com/"
]

export const getRandomURL = () => urls[Math.floor(Math.random() * urls.length)];