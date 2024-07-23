import { getIsAdmin } from '@/app/serverSideUtils'
import { NextRequest, NextResponse } from 'next/server'
import { generatePdf } from './pdf'

// import { generatePdf } from './pdf'

export async function GET(request: NextRequest) {
  const isAdmin = await getIsAdmin()
  if (!isAdmin) {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 })
  }
  const buffer = await generatePdf()
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="app.pdf"`,
    },
  })
}
