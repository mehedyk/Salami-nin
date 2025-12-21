// netlify/functions/supabase-proxy.js
const { createClient } = require('@supabase/supabase-js');

// Headers for CORS
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json'
};

exports.handler = async (event) => {
  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Get credentials from environment (hidden from frontend)
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  try {
    const { action, ...params } = JSON.parse(event.body || '{}');

    switch (action) {
      case 'loadHistory': {
        // Get recent 10 entries
        const { data, error } = await supabase
          .from('salami_history')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) throw error;

        // Get total count
        const { count, error: countError } = await supabase
          .from('salami_history')
          .select('*', { count: 'exact', head: true });

        if (countError) throw countError;

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ data, count })
        };
      }

      case 'saveSalami': {
        const { name, session_id } = params;

        // Server-side validation
        if (!name || name.trim().length < 2 || name.trim().length > 50) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Invalid name length' })
          };
        }

        // Check for malicious patterns
        const maliciousPatterns = [
          /<script/gi, /javascript:/gi, /<iframe/gi,
          /select.*from/gi, /insert.*into/gi, /update.*set/gi,
          /delete.*from/gi, /drop.*table/gi
        ];

        for (let pattern of maliciousPatterns) {
          if (pattern.test(name)) {
            return {
              statusCode: 400,
              headers,
              body: JSON.stringify({ error: 'Malicious content detected' })
            };
          }
        }

        // Save to Supabase
        const { data, error } = await supabase
          .from('salami_history')
          .insert([{ name: name.trim(), session_id }])
          .select();

        if (error) {
          // Check if rate limit hit
          if (error.message.includes('policy')) {
            return {
              statusCode: 429,
              headers,
              body: JSON.stringify({ error: 'Rate limit exceeded' })
            };
          }
          throw error;
        }

        // Get updated count
        const { count } = await supabase
          .from('salami_history')
          .select('*', { count: 'exact', head: true });

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ data, count })
        };
      }

      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid action' })
        };
    }

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};