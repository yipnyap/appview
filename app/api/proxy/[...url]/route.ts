/**
 * Full proxy for images.
 * URL: /proxy/[url]
 * Using NextJS API Routes
 */
import { NextApiRequest, NextApiResponse } from 'next';
import {ImageResponse, NextResponse} from 'next/server'

export async function GET(
  req: NextApiRequest,
  context: {
    params: {
      url: string[]
    }
  }
) {
  const urlArray = context.params.url;
  const url = urlArray.join('/');
  const response = await fetch(`https://${url}`);
  const contentType = response.headers.get('content-type');

  if (contentType?.startsWith('image')) {
    const blob = await response.blob();
    const headers = new Headers();

    headers.set("Content-Type", "image/*");
    return new NextResponse(blob, { status: 200, statusText: "OK", headers });
  } else {
    NextResponse.json({
      error: 'Not an image'
    }, {
      status: 401
    })
  }
}