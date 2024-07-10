export default function Page() {
  async function createInvoice(formData: FormData) {
    'use server'

    const rawFormData = {
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    }

    console.log("HERE's THE FORM DATA")
    console.log(rawFormData)
    // mutate data
    // revalidate cache
  }

  return (
    <form action={createInvoice}>
      <label htmlFor="customerId">Customer ID</label>
      <br />
      <input type="text" name="customerId" />
      <br />
      <label htmlFor="amount">Amount</label>
      <br />
      <input type="text" name="amount" />
      <br />
      <label htmlFor="status">Status</label>
      <br />
      <input type="text" name="status" />
      <br />
      <button type="submit">Update User Name</button>
    </form>
  )
}
