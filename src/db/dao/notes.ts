// const sq = db.$with('sq').as(
//   db
//     .select({
//       id: submissions.id,
//       userId: submissions.userId,
//       grade: submissions.grade,
//       level: submissions.level,
//       statement: submissions.statement,
//       imageSrc: submissions.imageSrc,
//       birthday: submissions.birthday,
//       consentForm: submissions.consentForm,
//       createdAt: submissions.createdAt,
//       updatedAt: submissions.updatedAt,
//       aggregateScore: avg(scores.score),
//     })
//     .from(submissions)
//     .where(eq(submissions.id, subId))
//     .leftJoin(scores, eq(scores.submissionId, submissions.id))
//     .groupBy(submissions.id),
// )

// const rows = db.with(sq).select({
//   id: sq.id,
//   userId: sq.userId,
//   grade: sq.grade,
//   level: sq.level,
//   statement: sq.statement,
//   imageSrc: sq.imageSrc,
//   birthday: sq.birthday,
//   consentForm: sq.consentForm,
//   createdAt: sq.createdAt,
//   updatedAt: sq.updatedAt,
//   aggregateScore: sq.aggregateScore,
// }).from(sq).leftJoin(scores, eq(sq.id, scores.submissionId))
