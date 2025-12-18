// Error
// https://developer.chrome.com/docs/devtools/network/reference/?utm_source=devtools&utm_campaign=stable#provisional-headers
// blocked mixed content
// Mixed Content: The page at 'https://sadeghallahverdi.github.io/weather/' was loaded over HTTPS, but requested an insecure resource 'http://ip-api.com/json/95.223.....'. This request has been blocked; the content must be served over HTTPS.

// export async function getUserIp() {
//   const response = await fetch("https://api.ipify.org?format=json");
//   const data = await response.json();
//   return data.ip;
// }

// export async function ipToCity(ip: string) {
//   const response = await fetch(`http://ip-api.com/json/${ip}`);
//   const data = await response.json();
//   return data.city;
// }

export async function cityBackgroundImage(city: string) {
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${city}`);
    const data = await response.json();
    if (data.originalimage.source) {
        return data.originalimage.source;
    } else if (data.thumbnail.source) {
        return data.thumbnail.source;
    } else {
        return "/cologne-christmas-market-1600x890.jpg";
    }
}