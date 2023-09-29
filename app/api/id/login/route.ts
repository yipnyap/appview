import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const { headers, body } = req

    try {
        const { data, headers: returnedHeaders } = await axios.post(
            `${process.env.NEXT_PUBLIC_YIPNYAP_CORE_URL}/v2/id/login`,
            body
        )

        if (!data || data.success !== true) return NextResponse.json(data, { status: 401})

        let responseHeaders = new Headers()
        for (const [key, value] of Object.entries(headers)) {
            responseHeaders.set(key, value)
        }

        return NextResponse.json(data, {
            headers: responseHeaders,
            status: 200,
        })
    } catch (error: any) {
        const status = error.response?.status || 500
        return NextResponse.json({
            error: error.message,
            data: error.response?.data,
        }, { status })
    }
}