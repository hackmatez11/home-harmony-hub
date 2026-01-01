const axios = require('axios');
const Property = require('../models/Property');

// Gemini API Chatbot
exports.chatbot = async (req, res) => {
  try {
    const { message, conversationHistory = [], language = 'en' } = req.body;

    // First, try to extract property preferences from the message
    const preferences = extractPreferences(message);
    
    // Search properties based on preferences
    let properties = [];
    if (Object.keys(preferences).length > 0) {
      const query = buildPropertyQuery(preferences);
      properties = await Property.find(query)
        .populate('agencyId', 'agencyName phone email')
        .limit(5);
    }

    // Prepare context for Gemini
    const propertyContext = properties.length > 0 
      ? `\n\nI found ${properties.length} matching properties:\n${properties.map((p, i) => 
          `${i + 1}. ${p.title} - $${p.price.toLocaleString()} in ${p.location.city}, ${p.bedrooms} bedrooms, ${p.propertyType}`
        ).join('\n')}`
      : '';

    const systemPrompt = `You are a helpful real estate assistant. Help users find properties based on their preferences. 
    You have access to a real estate database. When users ask about properties, analyze their requirements and provide relevant suggestions.
    Available property types: apartment, house, villa, condo, townhouse, land, commercial, office.
    You can filter by: price range, location (city), bedrooms, property type, furnished status.
    
    ${propertyContext}
    
    Respond in ${language === 'es' ? 'Spanish' : language === 'fr' ? 'French' : language === 'de' ? 'German' : 'English'}.`;

    // Call Gemini API (mock for now - replace with actual API)
    // const geminiResponse = await callGeminiAPI(systemPrompt, message, conversationHistory);
    
    // Mock response for demonstration
    let botResponse = '';
    
    if (properties.length > 0) {
      botResponse = `I found ${properties.length} properties matching your criteria:\n\n`;
      properties.forEach((p, i) => {
        botResponse += `${i + 1}. **${p.title}**\n`;
        botResponse += `   Price: $${p.price.toLocaleString()}\n`;
        botResponse += `   Location: ${p.location.city}\n`;
        botResponse += `   Type: ${p.propertyType}\n`;
        botResponse += `   Bedrooms: ${p.bedrooms}\n`;
        botResponse += `   Listed by: ${p.agencyId.agencyName}\n\n`;
      });
      botResponse += '\nWould you like more details about any of these properties?';
    } else if (Object.keys(preferences).length > 0) {
      botResponse = `I understand you're looking for properties with these criteria: ${JSON.stringify(preferences)}. Unfortunately, I couldn't find exact matches. Would you like to adjust your search criteria?`;
    } else {
      botResponse = `Hello! I'm your real estate assistant. I can help you find properties based on your preferences. You can tell me about:
      
- Your budget range
- Preferred location (city)
- Number of bedrooms
- Property type (apartment, house, villa, etc.)
- Furnished or unfurnished

What are you looking for?`;
    }

    res.json({
      response: botResponse,
      properties: properties.map(p => ({
        id: p._id,
        title: p.title,
        price: p.price,
        location: p.location.city,
        bedrooms: p.bedrooms,
        propertyType: p.propertyType,
        images: p.images[0]?.url,
        agencyName: p.agencyId.agencyName
      })),
      preferences
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ message: 'Server error in chatbot', error: error.message });
  }
};

// Voice Bot (using Minimax Audio AI)
exports.voiceBot = async (req, res) => {
  try {
    const { audioData, language = 'en' } = req.body;

    // In a real implementation, you would:
    // 1. Send audio to Minimax Speech-to-Text API
    // 2. Get transcribed text
    // 3. Process through chatbot logic
    // 4. Convert response back to speech using Minimax Text-to-Speech

    // Mock response
    const mockTranscription = "I'm looking for a 3 bedroom apartment in New York under 500000";
    
    // Use chatbot logic
    const preferences = extractPreferences(mockTranscription);
    const query = buildPropertyQuery(preferences);
    const properties = await Property.find(query)
      .populate('agencyId', 'agencyName phone email')
      .limit(3);

    const textResponse = properties.length > 0
      ? `I found ${properties.length} properties matching your search. ${properties[0].title} for $${properties[0].price.toLocaleString()} in ${properties[0].location.city}.`
      : "I couldn't find properties matching your criteria. Would you like to adjust your search?";

    res.json({
      transcription: mockTranscription,
      response: textResponse,
      properties: properties.map(p => ({
        id: p._id,
        title: p.title,
        price: p.price,
        location: p.location.city,
        bedrooms: p.bedrooms,
        images: p.images[0]?.url
      })),
      // In real implementation, include audioUrl from Minimax TTS
      audioUrl: null
    });

  } catch (error) {
    console.error('Voice bot error:', error);
    res.status(500).json({ message: 'Server error in voice bot' });
  }
};

// Helper function to extract preferences from natural language
function extractPreferences(message) {
  const prefs = {};
  const lowerMessage = message.toLowerCase();

  // Extract price
  const priceMatch = lowerMessage.match(/(\$|usd|dollars?)\s*(\d+[k]?)|(\d+[k]?)\s*(\$|usd|dollars?)|under\s+(\d+[k]?)|below\s+(\d+[k]?)|up\s+to\s+(\d+[k]?)/i);
  if (priceMatch) {
    const priceStr = priceMatch[2] || priceMatch[3] || priceMatch[5] || priceMatch[6] || priceMatch[7];
    let price = parseInt(priceStr.replace('k', '000'));
    prefs.maxPrice = price;
  }

  // Extract bedrooms
  const bedroomMatch = lowerMessage.match(/(\d+)\s*(bed|bedroom|br)/i);
  if (bedroomMatch) {
    prefs.bedrooms = parseInt(bedroomMatch[1]);
  }

  // Extract property type
  const types = ['apartment', 'house', 'villa', 'condo', 'townhouse', 'land', 'commercial', 'office'];
  for (const type of types) {
    if (lowerMessage.includes(type)) {
      prefs.propertyType = type;
      break;
    }
  }

  // Extract city names (simple matching - in production use NLP)
  const cityMatch = lowerMessage.match(/in\s+([a-z\s]+?)(?:\s|,|$)/i);
  if (cityMatch) {
    prefs.city = cityMatch[1].trim();
  }

  // Extract furnished status
  if (lowerMessage.includes('furnished') && !lowerMessage.includes('unfurnished')) {
    prefs.furnished = 'furnished';
  } else if (lowerMessage.includes('unfurnished')) {
    prefs.furnished = 'unfurnished';
  }

  return prefs;
}

// Helper function to build MongoDB query from preferences
function buildPropertyQuery(preferences) {
  const query = { isActive: true, availability: 'available' };

  if (preferences.maxPrice) {
    query.price = { $lte: preferences.maxPrice };
  }

  if (preferences.minPrice) {
    query.price = query.price || {};
    query.price.$gte = preferences.minPrice;
  }

  if (preferences.bedrooms) {
    query.bedrooms = preferences.bedrooms;
  }

  if (preferences.propertyType) {
    query.propertyType = preferences.propertyType;
  }

  if (preferences.city) {
    query['location.city'] = new RegExp(preferences.city, 'i');
  }

  if (preferences.furnished) {
    query.furnished = preferences.furnished;
  }

  return query;
}

// Actual Gemini API call (implement when you have API key)
async function callGeminiAPI(systemPrompt, userMessage, history) {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured');
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: 'user',
            parts: [{ text: systemPrompt }]
          },
          ...history,
          {
            role: 'user',
            parts: [{ text: userMessage }]
          }
        ]
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini API error:', error);
    return null;
  }
}

module.exports = exports;
