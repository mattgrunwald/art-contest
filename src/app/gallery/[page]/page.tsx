import { Level, Role } from '@/drizzle/util'
import { DAO } from '@/drizzle/dao'
import { Pager } from '@/components/Pager'
import { SubmissionGalleryImage } from '@/components/SubmissionGalleryImage'
import { parseLevel, parsePage } from '@/util/helpers'
import { getRole } from '@/app/serverSideUtils'
import { SubmissionFilter } from '@/components/SubmissionFilter'

type GalleryParams = {
  params: { page: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams }: GalleryParams) {
  const role = await getRole()
  const page = parsePage(params.page)
  const level = parseLevel(searchParams.level as string) || Level.HighSchool

  const res = await DAO.readSubmissionsForGallery(level, page)

  if (res.error != null) {
    return <div>ERROR: {res.error.message}</div>
  }

  const { total, results } = res.data

  return (
    <>
      <SubmissionFilter
        currentLevel={level}
        showingUnscored={false}
        role={role}
      />
      <div className="grid grid-cols-2 gap-x-1 gap-y-1">
        {results.map((sub) => (
          <SubmissionGalleryImage key={sub.id} sub={sub} />
        ))}
      </div>
      <Pager totalPages={total} page={page} path="/gallery" />
    </>
  )
}
