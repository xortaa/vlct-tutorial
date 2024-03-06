"use client"

import { useForm } from "react-hook-form"
import axios from "axios"
import { useEffect } from "react"

const EditCustomerForm = ({setCustomers, customerId, customer}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    axios.patch(`/api/customer/${customerId}`, data).then((response) => {
      setCustomers((previousCustomers) => previousCustomers.map((customer) => customer._id === customerId ? response.data : customer))
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue={customer.firstname} {...register("firstname")}></input>
      <input defaultValue={customer.lastname} {...register("lastname")}></input>
      <select defaultValue={customer.gender} {...register("gender")}>
        <option>male</option>
        <option>female</option>
        <option>other</option>
      </select>
      <button type='submit'>SUBMIT</button>
    </form>
  )
}
export default EditCustomerForm