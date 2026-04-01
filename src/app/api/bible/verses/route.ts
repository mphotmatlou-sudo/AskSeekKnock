import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get('keyword');

  if (!keyword) {
    return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
  }

  const apiKey = process.env.BIBLE_API_KEY;
  const apiHost = process.env.BIBLE_API_HOST;

  if (!apiKey || !apiHost) {
    return NextResponse.json({ error: 'API key or host not configured' }, { status: 500 });
  }

  const url = `https://${apiHost}/GetSearch?query=${keyword}&versionId=kjv`;

  try {
    const response = await fetch(url, {
      headers: {
        'x-rapidapi-host': apiHost,
        'x-rapidapi-key': apiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: 'Failed to fetch from Bible API', details: errorText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
