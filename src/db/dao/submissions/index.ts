import { submissions, scores } from '@/db/schema'
import {
  AdapterReturn,
  Submission,
  SubmissionForAdmin,
  Score,
  SubmissionForContestant,
  SubmissionForEdit,
  SubCount,
} from '@/db/types'
import { db } from '@/db/db'
import { eq, avg, count, gt, sql } from 'drizzle-orm'
import { q, valOrError, wrap } from '../util'
import { SubmissionsAdapter, SubmissionsReadAdapter } from '@/db/adapter'
import { readSubmissionForJudge } from '../transactions'

import * as paginated from './paginated'
import * as transactions from '../transactions'

type SubmissionWithScores = Submission & {
  scores: Score[]
}

class SubmissionsReader implements SubmissionsReadAdapter {
  readSubmissionByUserIdForEdit = wrap(
    async (
      userId: string,
    ): Promise<AdapterReturn<SubmissionForEdit | undefined>> => {
      const sub = (await q.submissions.findFirst({
        where: eq(submissions.userId, userId),
        with: {
          user: true,
        },
      })) as SubmissionForEdit | undefined
      return { data: sub, error: null }
    },
  )

  readSubmissionForEdit = wrap(
    async (
      userId?: string,
      subId?: string,
    ): Promise<AdapterReturn<SubmissionForEdit | undefined>> => {
      if (userId) {
        return this.readSubmissionByUserIdForEdit(userId)
      } else if (subId) {
        return this.readSubmissionBySubIdForEdit(subId)
      }
      return { data: null, error: new Error('id not specified') }
    },
  )

  private readSubmissionBySubIdForEdit = wrap(
    async (
      subId: string,
    ): Promise<AdapterReturn<SubmissionForEdit | undefined>> => {
      const sub = (await q.submissions.findFirst({
        where: eq(submissions.id, subId),
        with: {
          user: true,
        },
      })) as SubmissionForEdit | undefined
      return { data: sub, error: null }
    },
  )

  readSubForContestantStatement = q.submissions
    .findFirst({
      columns: {
        id: true,
        userId: true,
        statement: true,
        imageSrc: true,
        level: true,
        approved: true,
      },
      where: eq(submissions.id, sql.placeholder('subId')),
    })
    .prepare('readSubForContestant')

  readSubmissionForContestant = wrap(
    async (subId: string): Promise<AdapterReturn<SubmissionForContestant>> => {
      const sub = await this.readSubForContestantStatement.execute({ subId })
      return valOrError(sub)
    },
  )

  readSubmissionForAdmin = wrap(
    async (subId: string): Promise<AdapterReturn<SubmissionForAdmin>> => {
      const subPromise = q.submissions.findFirst({
        where: eq(submissions.id, subId),
        with: {
          user: {
            columns: {
              name: true,
              email: true,
            },
          },
        },
      })

      const aggregateScorePromise = db
        .select({
          aggregateScore: avg(scores.score),
        })
        .from(scores)
        .where(eq(scores.submissionId, subId))

      const [sub, agResult] = await Promise.all([
        subPromise,
        aggregateScorePromise,
      ])

      if (sub && agResult.length > 0) {
        const agScore = agResult[0].aggregateScore || '-'
        ;(sub as unknown as SubmissionForAdmin).aggregateScore =
          parseFloat(agScore)
      }

      if (!sub) {
        return { data: null, error: new Error('not found') }
      }

      const { user, ...subNoUser } = sub

      const agScore = agResult[0].aggregateScore || '-1'

      const result = {
        ...subNoUser,
        aggregateScore: parseFloat(agScore),
        name: user.name,
        email: user.email,
      } as SubmissionForAdmin

      return valOrError(result)
    },
  )

  readSubmissionsForGallery = paginated.readSubmissionsForGallery
  readSubmissionForJudge = readSubmissionForJudge
  readUnapprovedSubmissionsForGallery =
    paginated.readUnapprovedSubmissionsForGallery
  readUnscoredSubmissionsForGallery =
    paginated.readUnscoredSubmissionsForGallery
  readSubmissionsForPdf = paginated.readSubmissionsForPdf

  countSubmissionsByDate = wrap(
    async (): Promise<AdapterReturn<SubCount[]>> => {
      const results = await db
        .select({
          count: count(),
          date: sql<Date>`${submissions.createdAt}::date`,
        })
        .from(submissions)
        .groupBy(sql`${submissions.createdAt}::date`)
        .orderBy(sql`${submissions.createdAt}::date`)
      return { data: results, error: null }
    },
  )
}
export class SubmissionsDAO implements SubmissionsAdapter {
  read: SubmissionsReader

  constructor() {
    this.read = new SubmissionsReader()
  }

  approveSubmission = wrap(
    async (subId: string): Promise<AdapterReturn<Submission>> => {
      const results = await db
        .update(submissions)
        .set({ approved: true })
        .where(eq(submissions.id, subId))
        .returning()
      return valOrError(results[0])
    },
  )

  unapproveSubmission = wrap(
    async (subId: string): Promise<AdapterReturn<Submission>> => {
      const results = await db
        .update(submissions)
        .set({ approved: false })
        .where(eq(submissions.id, subId))
        .returning()
      return valOrError(results[0])
    },
  )

  getNewSubmissionsCount = wrap(async (): Promise<AdapterReturn<number>> => {
    const results = await db
      .select({ count: count() })
      .from(submissions)
      .where(gt(submissions.createdAt, sql`NOW() - INTERVAL '7 days'`))

    return valOrError(results[0].count)
  })

  createSubmissionAndUser = transactions.createSubmissionAndUser
  createSubmission = transactions.createSubmission
  updateSubmission = transactions.updateSubmission
  deleteSubmission = transactions.deleteSubmission
}
