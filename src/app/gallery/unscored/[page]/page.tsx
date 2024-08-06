import { Level, Role } from '@/db/util'
import { DAO } from '@/db/dao'
import { notFound } from 'next/navigation'
import { parseLevel, parsePage } from '@/util/helpers'
import { getRoleAndId } from '@/app/serverSideUtils'
import { SubmissionGallery } from '@/components/SubmissionGallery'

type GalleryParams = {
  params: { page: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams }: GalleryParams) {
  const { role, id } = await getRoleAndId()
  if (role !== Role.Judge || id == null) {
    return notFound()
  }
  const page = parsePage(params.page)
  const level = parseLevel(searchParams.level as string) || Level.HighSchool

  const res = await DAO.submissions.read.readUnscoredSubmissionsForGallery(
    id,
    level,
    page,
  )

  if (res.error != null) {
    return <div>ERROR: {res.error.message}</div>
  }

  const { total, results } = res.data

  return (
    <SubmissionGallery
      level={level}
      unscored={true}
      unapproved={false}
      role={role}
      subs={results}
      total={total}
      page={page}
    />
  )
}
