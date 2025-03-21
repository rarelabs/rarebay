export default async function handler(req, res) {
    try {
      // Get user's IP address from the request headers
      const ip = 
        req.headers["x-forwarded-for"] || 
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);
  
      // Replace this with a third-party service like ipinfo.io, ipdata.co, or ip-api.com
      const geoResponse = await fetch(`https://ipinfo.io/${ip}?token=82f968cf9d1ecf`);
      const geoData = await geoResponse.json();
  
      const { country } = geoData;
  
      if (country) {
        res.status(200).json({ country });
      } else {
        res.status(404).json({ error: "Location not found" });
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  