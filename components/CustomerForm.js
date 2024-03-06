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

  const onSubmit = (data) => {
    axios.post("/api/customer", data).then((response) => {
      setCustomers((previousCustomers) => [...previousCustomers, response.data.newCustomer])
      console.log(response.data.newCustomer)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        First Name:
        <input {...register("firstname")}></input>
      </label>
      <label>
        Last Name:
        <input {...register("lastname")}></input>
      </label>
      <label>
        Gender:
        <select {...register("gender")}>
          <option>male</option>
          <option>female</option>
          <option>other</option>
        </select>
      </label>
      <button type='submit'>SUBMIT</button>
    </form>
  )
}
export default CustomerForm