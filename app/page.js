"use client"
import Image from "next/image"
import styles from "./page.module.css"
import { useState, useEffect } from "react"
import axios from "axios"
import CustomerForm from "@/components/CustomerForm"
import EditCustomerForm from "@/components/EditCustomerForm"

export default function Home() {
  const [customers, setCustomers] = useState([])
  // customers = name of the variable
  // setCustomers = function to update the variable
  // setCustomers(<data you want customers to be>)

  useEffect(() => {
    axios.get("/api/customer").then((response) => {
      setCustomers(response.data)
      console.log(response.data)
    })
  }, [])

  //  for get request or delete
  // axios.<requestType>(<url>)
  // for post or patch request
  // axios.<requestType>(<url>, data)

  //   const fruit = "apple"
  // const person = "john"
  // console.log(fruit, person)
  // apple john
  // previosCustomers[content1, content2, content3]
  // ...previousCustomers
  // content1, content2, content3, newData
  // [content1, content2, content3, newData]

  // get the id of customer you want to delete add it to the function parameters
  const deleteCustomer = (dickId) => {
    // backend side of the delete
    axios.delete(`/api/customer/${dickId}`).then((response) => {
      // only return the customers that dont match the id from the parameter
      // frontend side of the delete
      setCustomers((previousCustomers) => previousCustomers.filter((customer) => customer._id !== dickId))
    })
  }

  return (
    <div>
      <h1>Customer List</h1>
      <div>
        <CustomerForm setCustomers={setCustomers} />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((content) => {
            return (
              <tr key={content._id}>
                <td>{content._id}</td>
                <td>{content.firstname}</td>
                <td>{content.lastname}</td>
                <td>{content.gender}</td>
                <td>
                  <button onClick={() => deleteCustomer(content._id)}>DELETE</button>
                </td>
                <td>
                  <EditCustomerForm setCustomers={setCustomers} customerId={content._id} customer={content}/>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
