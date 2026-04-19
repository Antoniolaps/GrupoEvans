/**
 * API Route: /api/track
 * Secured Tracking Proxy for TrackingMore
 */

export default async function handler(req, res) {
    // 1. Restricción de método
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // 2. CORS Seguro: En producción, cambia '*' por tu dominio real
    // Ejemplo: 'evansslogistics.com'
    const allowedOrigins = ['*'];
    const origin = req.headers.origin || '';

    res.setHeader('Access-Control-Allow-Origin', allowedOrigins.includes('*') ? '*' : origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 3. Validación y Sanitización de Entrada
    const { tracking_number } = req.query;

    if (!tracking_number || typeof tracking_number !== 'string' || tracking_number.length < 5) {
        return res.status(400).json({
            meta: { code: 400, message: 'Número de rastreo requerido o inválido' },
            data: []
        });
    }

    // Regex para validar formato (Solo alfanumérico, guiones y puntos)
    const trackingRegex = /^[a-zA-Z0-9.\-]{5,50}$/;
    if (!trackingRegex.test(tracking_number.trim())) {
        return res.status(400).json({
            meta: { code: 400, message: 'Formato de número de rastreo no permitido' },
            data: []
        });
    }

    const safeTrackingNumber = encodeURIComponent(tracking_number.trim());

    // 4. Protección de API Key (NUNCA hardcoded en producción)
    // El fallback '3fl3...' se mantiene solo para pruebas locales si no hay .env
    const apiKey = process.env.TRACKINGMORE_API_KEY;

    if (!apiKey) {
        console.error('CRITICAL: TRACKINGMORE_API_KEY is not defined in environment variables.');
        return res.status(500).json({
            meta: { code: 500, message: 'Error de configuración del servidor' },
            data: []
        });
    }

    try {
        // 5. Fetch con Timeout de seguridad
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const response = await fetch(`https://api.trackingmore.com/v4/trackings/get?tracking_numbers=${safeTrackingNumber}`, {
            method: 'GET',
            headers: {
                'Tracking-Api-Key': apiKey,
                'Content-Type': 'application/json'
            },
            signal: controller.signal
        });

        clearTimeout(timeout);

        if (!response.ok) {
            throw new Error(`API Externa respondió con status: ${response.status}`);
        }

        const data = await response.json();

        // 6. Devolver la respuesta original (para compatibilidad con main.js)
        return res.status(200).json(data);

    } catch (error) {
        console.error('Error en el proxy de tracking:', error.message);

        const message = error.name === 'AbortError' ? 'Tiempo de espera agotado' : 'Error interno de conexión';
        return res.status(500).json({
            meta: { code: 500, message: message },
            data: []
        });
    }
}

