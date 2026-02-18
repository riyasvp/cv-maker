import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

const SYSTEM_PROMPT_BULLET = `You are an expert HR Manager in Dubai. Rewrite this bullet point to sound professional, action-oriented, and ATS-friendly using keywords relevant to the UAE market.

IMPORTANT INSTRUCTIONS:
1. Provide EXACTLY 3 different versions of the enhanced bullet point
2. Each version should use different action verbs and emphasize different aspects
3. Format your response as a JSON object with this exact structure:
{
  "enhancedText": "The primary enhanced version (best one)",
  "alternatives": ["Alternative version 1", "Alternative version 2", "Alternative version 3"],
  "keyWords": ["List of 3-5 key action words used"]
}

Focus on:
- Using strong action verbs (Led, Spearheaded, Delivered, Optimized, Implemented)
- Including quantifiable achievements when possible (% improvements, $ amounts, team sizes)
- Using keywords relevant to the UAE/Dubai job market
- Making it ATS-friendly with relevant industry keywords`;

const SYSTEM_PROMPT_SUMMARY = `You are an expert HR Manager in Dubai. Rewrite this professional summary to be compelling, concise (3-4 sentences max), and tailored for the UAE job market.

IMPORTANT INSTRUCTIONS:
1. Provide EXACTLY 3 different versions
2. Format your response as a JSON object with this exact structure:
{
  "enhancedText": "The primary enhanced version (best one)",
  "alternatives": ["Alternative version 1", "Alternative version 2", "Alternative version 3"],
  "keyWords": ["List of 3-5 key action words used"]
}

Focus on:
- Highlighting key achievements and expertise
- Using professional language appropriate for UAE/Dubai corporate culture
- Including industry-relevant keywords for ATS optimization
- Creating a strong first impression for recruiters`;

const SYSTEM_PROMPT_SUGGESTIONS = `You are an expert career coach specializing in the UAE job market. Based on the given text, suggest improvements and enhancements.

IMPORTANT INSTRUCTIONS:
1. Analyze the text and suggest specific improvements
2. Provide suggestions in this exact JSON format:
{
  "enhancedText": "The improved version",
  "alternatives": ["Alternative 1", "Alternative 2", "Alternative 3"],
  "keyWords": ["Action verb 1", "Action verb 2", "Skill keyword 1"],
  "improvementTips": ["Tip 1 for improvement", "Tip 2 for improvement"]
}`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, type = 'bullet', getSuggestions = false } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    let systemPrompt = SYSTEM_PROMPT_BULLET;
    
    if (type === 'summary') {
      systemPrompt = SYSTEM_PROMPT_SUMMARY;
    } else if (getSuggestions) {
      systemPrompt = SYSTEM_PROMPT_SUGGESTIONS;
    }

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const responseText = completion.choices[0]?.message?.content;

    if (!responseText) {
      return NextResponse.json(
        { error: 'Failed to enhance text' },
        { status: 500 }
      );
    }

    // Try to parse as JSON, fallback to plain text
    try {
      // Strip markdown code blocks if present
      let cleanedResponse = responseText.trim();
      if (cleanedResponse.startsWith('```json')) {
        cleanedResponse = cleanedResponse.slice(7);
      } else if (cleanedResponse.startsWith('```')) {
        cleanedResponse = cleanedResponse.slice(3);
      }
      if (cleanedResponse.endsWith('```')) {
        cleanedResponse = cleanedResponse.slice(0, -3);
      }
      cleanedResponse = cleanedResponse.trim();
      
      const parsed = JSON.parse(cleanedResponse);
      return NextResponse.json({
        enhancedText: parsed.enhancedText || responseText,
        alternatives: parsed.alternatives || [],
        keyWords: parsed.keyWords || [],
        improvementTips: parsed.improvementTips || [],
      });
    } catch {
      // If not valid JSON, return as plain text
      return NextResponse.json({
        enhancedText: responseText,
        alternatives: [],
        keyWords: [],
        improvementTips: [],
      });
    }
  } catch (error) {
    console.error('Enhancement error:', error);
    return NextResponse.json(
      { error: 'Failed to enhance text. Please try again.' },
      { status: 500 }
    );
  }
}
