import { DAO } from '@/db/dao'
import nodemailer from 'nodemailer'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  console.log(request.headers)

  const { data, error } = await DAO.submissions.getNewSubmissionsCount()
  if (error !== null) {
    return new Response(error.message, {
      status: 500,
    })
  }

  const judgesResult = await DAO.users.readJudges()
  if (judgesResult.error) {
    return new Response(judgesResult.error.message, {
      status: 500,
    })
  }
  const emails = judgesResult.data.map((j) => j.email)

  console.log('THIS MANY', data)
  if (data >= 0) {
    sendMail(data, emails)
  }
  return new Response(null, {
    status: 200,
  })
}

async function sendMail(newSubCount: number, addresses: string[]) {
  console.log('Sending email...')
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NOTIFIER_EMAIL,
      pass: process.env.NOTIFIER_PASSWORD,
    },
  })

  console.log(process.env.NOTIFIER_PASSWORD)

  // for (const address of addresses) {
  for (const address of ['matt.grunwald.dev@gmail.com']) {
    try {
      const result = await transporter.sendMail({
        from: process.env.NOTIFIER_EMAIL,
        to: address,
        subject: 'New Submissions in the GEM Project Art Contest',
        html: `<p>Hello!</p>
              <p>This is the GEM Project Art Contest Bot. There have been <b>${newSubCount}</b> submissions to the contest in the last seven days.</p>
              <p>To score them, please visit <a href="http://localhost:3000/gallery/unscored">http://localhost:3000/gallery/unscored</a></p>
              <p>Have a nice day!</p>
              `,
      })
      console.log(result)
    } catch (error) {
      console.error('error sending mail', error)
    }
  }
  transporter.close()
}
