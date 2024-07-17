'use client'
import { SessionProvider } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { readAdmins, addAdmin } from './actions'
import { useUser } from '@/hooks/useUser'

// export default async function Page() {
//   const session = await auth()
//   if (session === null || (session.user as any).role !== Role.Admin) {
//     return <div>You cannot see</div>
//   }
//   const { data, error } = await DAO.readAdmins()
//   if (error !== null) {
//     return <div>ERROR: {error.message}</div>
//   }

//   return (
//     <>
//       <h2>Admins</h2>
//       <ul>
//         {data.map((d) => (
//           <li key={d.id}>{d.email}</li>
//         ))}
//       </ul>
//       <h2>Add Admin</h2>
//       {/* <form action={createInvoice}>
//         <label htmlFor="email">Email</label>
//         <br />
//         <input type="text" name="email" />
//         <br />
//         <label htmlFor="amount">Amount</label>
//         <br />
//         <input type="text" name="amount" />
//         <br />
//         <label htmlFor="status">Status</label>
//         <br />
//         <input type="text" name="status" />
//         <br />
//         <button type="submit">Add Admin</button>
//       </form> */}

//       <label >Email</label>
//     </>
//   )
// }

export default function Page() {
  return (
    <SessionProvider>
      <Content />
    </SessionProvider>
  )
}

function Content() {
  const [admins, setAdmins] = useState<string[]>([])
  const [newAdmin, setNewAdmin] = useState<string>('')
  const [err, setErr] = useState<Error | null>(null)
  const { isAdmin } = useUser()

  useEffect(() => {
    const fetchAdmins = async () => {
      const { data, error } = await readAdmins()
      if (error !== null) {
        setErr(error)
      }
      if (data !== null) {
        const admins = data.map((d) => d.email)
        setAdmins(admins)
      }
    }
    fetchAdmins()
  }, [])

  if (!isAdmin) {
    return <div>Restricted</div>
  }

  if (err !== null) {
    return <div>ERROR: {err.message}</div>
  }

  const onAdd = async () => {
    const error = await addAdmin(newAdmin)
    if (error === null) {
      setAdmins([...admins, newAdmin])
      setNewAdmin('')
    } else {
      console.log(error)
    }
  }

  return (
    <>
      <h2>Admins</h2>
      <ul>
        {admins.map((admin, index) => (
          <li key={index}>{admin}</li>
        ))}
      </ul>
      <h2>Add Admin</h2>
      <label>Email</label>
      <input type="text" onChange={(e) => setNewAdmin(e.target.value)} />
      <button onClick={() => onAdd()}>Add</button>
    </>
  )
}

// async function createInvoice(formData: FormData) {
//   'use server'
//   const session = await auth()
//   const user = session === null ? null : session.user
//   console.log(user)
//   if (user !== null && user !== undefined) {
//     const rawFormData = {
//       email: (formData.get('email') as string) || '',
//     }

//     DAO.createAdmin(rawFormData.email)
//   }

//   // console.log("HERE's THE FORM DATA")
//   // console.log(rawFormData)
//   // mutate data
//   // revalidate cache
// }
