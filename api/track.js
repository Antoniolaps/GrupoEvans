const app = express();
const cors = require('cors');
export default async function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { tracking_number } = req.query;

    if (!tracking_number) {
        return res.status(400).json({ error: 'tracking_number parameter is required' });
    }

    const apiKey = process.env.TRACKINGMORE_API_KEY || '3fl3mgwv-r8f8-kctt-tb30-whgo4rza31jl';

    try {
        const response = await fetch(`https://api.trackingmore.com/v4/trackings/get?tracking_numbers=${tracking_number}`, {
            method: 'GET',
            headers: {
                'Tracking-Api-Key': apiKey,
                'Content-Type': 'application/json'
            }
        });
        app.use(
            cors({
                origin: '*'
            })
        )
        const data = await response.json();

        // Configure CORS for safety - optionally restrict to your domain
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');

        return res.status(200).json(data);
    } catch (error) {
        console.error('Error in tracking endpoint:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
