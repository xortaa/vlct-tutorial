import connectToDatabase from "@/utils/database"
import Customer from "@/models/customer"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (NextRequest) => {
  try {
    // connects to the database
    await connectToDatabase()
    // assigns all customers in the databse to the variable customers
    const customers = await Customer.find({})
    // returns the value of customers and status 200(ok)
    return NextResponse.json(customers, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json("Failed to get customers", { status: 500 })
  }
}

export const POST = async (NextRequest) => {
  try {
    await connectToDatabase()
    const customerData = await NextRequest.json()
    const newCustomer = await Customer.create(customerData)
    return NextResponse.json({ newCustomer }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json("Failed to create customer", { status: 500 })
  }
}
