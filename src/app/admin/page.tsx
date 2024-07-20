import { AdminList, JudgeList } from '@/components/UserList'

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
    <>
      <AdminList />
      <JudgeList />
    </>
  )
  // const [admins, setAdmins] = useState<User[]>([])
  // const [newAdmin, setNewAdmin] = useState<string>('')
  // const [judges, setJudges] = useState<User[]>([])
  // const [newJudge, setNewJudge] = useState<string>('')
  // const [err, setErr] = useState<Error | null>(null)
  // const user = useUser()

  // useEffect(() => {
  //   const fetchAdmins = async () => {
  //     const { data, error } = await readAdmins()
  //     if (error !== null) {
  //       setErr(error)
  //     }
  //     if (data !== null) {
  //       setAdmins(data)
  //     }
  //   }
  //   fetchAdmins()
  // }, [])

  // if (user === undefined) {
  //   return <div>loading...</div>
  // }

  // if (!user.isAdmin) {
  //   return <div>Restricted</div>
  // }

  // if (err !== null) {
  //   return <div>ERROR: {err.message}</div>
  // }

  // const onAdd = async (email: string) => {
  //   const response = await addAdmin(email)
  //   if (response === null) {
  //     return
  //   }
  //   const { data, error } = response
  //   if (data !== null) {
  //     setAdmins([...admins, data])
  //     // setNewAdmin('')
  //   } else {
  //     console.log(error)
  //   }
  // }

  // const onRemovePrivileges = async (role: Role, email: string) => {
  //   const response = await removePrivileges(email)
  //   if (response === null) {
  //     console.warn('only admins can do that')
  //     return
  //   }
  //   if (response.data !== null) {
  //     switch (role) {
  //       case Role.Admin:
  //         setAdmins(admins.filter((a) => a.email !== email))
  //       case Role.Judge:
  //         setJudges(judges.filter((j) => j.email !== email))
  //       default:
  //         console.error('role was not admin or judge')
  //     }
  //   }
  //   if (response.error !== null) {
  //     console.error(response.error.message)
  //   }
  // }

  // return (
  //   <>
  //     <h2>Admins</h2>
  //     <table>
  //       <tr>
  //         <th>Name</th>
  //         <th>Email</th>
  //         <th>Actions</th>
  //       </tr>
  //       {admins.map((admin, index) => (
  //         <tr key={index}>
  //           <td>{admin.name}</td>
  //           <td>{admin.email}</td>r
  //           <td>
  //             <button
  //               onClick={() => onRemovePrivileges(Role.Admin, admin.email)}
  //             >
  //               Remove
  //             </button>
  //           </td>
  //         </tr>
  //       ))}
  //     </table>
  //     {/* <ul>
  //       {admins.map((admin, index) => (
  //         <li key={index}>
  //           {admin.name}({admin.email})
  //         </li>
  //       ))}
  //     </ul> */}
  //     <h2>Add Admin</h2>
  //     <label>Email</label>
  //     <input type="text" onChange={(e) => setNewAdmin(e.target.value)} />
  //     <button onClick={() => onAdd(newAdmin)}>Add</button>
  //   </>
  // )
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
