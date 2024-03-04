"use client"
import Image from "next/image"
import styles from "./page.module.css"
import { useState, useEffect } from "react"
import axios from "axios"
import CustomerForm from "@/components/CustomerForm"

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

  return (
    <div>
      <h1>Customer List</h1>
      <div>
        {customers.map((content) => {
          return (
            <div>
              <p>{content._id}</p>
              <p>{content.firstname}</p>
              <p>{content.lastname}</p>
              <p>{content.gender}</p>
            </div>
          )
        })}
      </div>
      <div>
        <CustomerForm setCustomers={setCustomers}/>
      </div>
    </div>
  )
}
