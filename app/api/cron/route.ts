// app/api/cron/route.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Example "task" function — replace with your real job (DB cleanup, fetch, etc.)
async function performTask() {
    // do whatever: cleanup DB, call external API, generate reports...
    console.log('Cron task running at', new Date().toISOString());
}

export async function GET(request: NextRequest) {
    // Optional: basic security (see section on secure setup below)
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    try {
        await performTask();
        return NextResponse.json({ ok: true, ranAt: new Date().toISOString() });
    } catch (err) {
        console.error('Cron task failed:', err);
        return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
    }
}