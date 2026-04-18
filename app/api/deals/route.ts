import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const deals = await prisma.deal.findMany({
      orderBy: { added: 'desc' },
    });
    return NextResponse.json(deals);
  } catch (error) {
    console.error('Error fetching deals:', error);
    return NextResponse.json({ error: 'Failed to fetch deals' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const deal = await prisma.deal.create({
      data: {
        dealId: body.dealId,
        company: body.company,
        founder: body.founder,
        sector: body.sector,
        cstage: body.cstage,
        geo: body.geo,
        ask: body.ask,
        source: body.source,
        owner: body.owner,
        url: body.url || null,
        summary: body.summary,
        notes: body.notes || null,
        status: body.status || 'New Opportunity',
        align: body.align || null,
        added: body.added || new Date().toISOString().split('T')[0],
      },
    });
    return NextResponse.json(deal, { status: 201 });
  } catch (error) {
    console.error('Error creating deal:', error);
    return NextResponse.json({ error: 'Failed to create deal' }, { status: 500 });
  }
}
