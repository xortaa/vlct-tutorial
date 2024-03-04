"use client"

import { useForm } from "react-hook-form"
import axios from "axios"

const CustomerForm = ({setCustomers}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const buttsex = (data) => {
    axios.post("/api/customer", data).then((response) => {
      setCustomers((previousCustomers) => [...previousCustomers, response.data.newCustomer])
      console.log(response.data.newCustomer)
    })
  }

  return (
    <form onSubmit={handleSubmit(buttsex)}>
      <input {...register("firstname")}></input>
      <input {...register("lastname")}></input>
      <select {...register("gender")}>
        <option>male</option>
        <option>female</option>
        <option>other</option>
      </select>
      <button type='submit'>SUBMIT</button>
    </form>
  )
}
export default CustomerForm
