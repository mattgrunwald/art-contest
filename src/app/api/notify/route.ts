import { DAO } from '@/db/dao'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  console.log(request.headers)

  const { data, error } = await DAO.getNewSubmissionsCount()
  if (error !== null) {
    return new Response(error.message, {
      status: 500,
    })
  }
  console.log('THIS MANY', data)
  return new Response(null, {
    status: 200,
  })
}
