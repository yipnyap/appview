/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Yipnyap";
export const contentType = "image/png";

export default async function OG() {
    const lexend = await fetch(
        new URL('../public/Lexend-Regular.ttf', import.meta.url),
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
        (
            <div
                tw="h-full w-full flex flex-col">
                <img tw="w-full"
                     style={{
                         borderRadius: '0 0 5% 5%',
                         height: '75%',
                         objectFit: 'cover',
                     }}
                     src="http://localhost/dummy/rek/banner.jpg"
                     alt="Profile cover"/>
                <div tw="flex items-center p-8 px-24">
                    <img
                        tw="rounded-full h-32 w-32"
                        src="http://localhost/dummy/rek/banner.jpg"
                        alt=""/>
                    <div
                        tw="flex flex-1 min-w-0 flex items-center justify-end">
                        <div tw="flex flex-col ml-6 min-w-0 flex-1">
                            <h1 style={{
                                fontSize: '3rem',
                                marginTop: '0',
                                marginBottom: '0'
                            }}>
                                Test
                            </h1>
                            <span style={{
                                fontSize: '2rem',
                            }}>
                                Test
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            width: 1600,
            height: 900,
            fonts: [
                {
                    name: 'Lexend',
                    data: lexend,
                },
            ],
        },
    );
}
