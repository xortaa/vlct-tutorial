import connectToDatabase from "@/utils/database"
import Customer from "@/models/customer"
import { NextRequest, NextResponse } from "next/server"

// getting a single customer
// remember to add {params} to the function parameters
export const GET = async (NextRequest, { params }) => {
  // id from the parameter
  const id = params.id
  await connectToDatabase()
  try {
    // find customer with that id from the params
    const customer = await Customer.findById(id)
    // if the id doesnt match anything from the database
    if (!customer) {
      return NextResponse.json("Customer not found", { status: 404 })
    }
    // return the customer and status 200(ok)
    return NextResponse.json({ customer }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json("Failed to get customer", { status: 500 })
  }
}

export const PATCH = async (NextRequest, { params }) => {
  // get the id from the params
  const id = params.id
  await connectToDatabase()
  try {
    // get the data from the request body
    const customerData = await NextRequest.json()
    // find the customer with the id and update it with the new data
    const updatedCustomer = await Customer.findByIdAndUpdate(id, customerData, { new: true })
    // if no id is found that matches the id from the params
    if (!updatedCustomer) {
      return NextResponse.json("Customer not found", { status: 404 })
    }
    return NextResponse.json(updatedCustomer, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json("Failed to update customer", { status: 500 })
  }
}

export const DELETE = async (NextRequest, { params }) => {
  // get the id from the params
  const id = params.id
  try {
    await connectToDatabase()
    // find the customer with the id and delete it
    const deletedCustomer = await Customer.findByIdAndDelete(id)
    // if no id is found that matches the id from the params
    if (!deletedCustomer) {
      return NextResponse.json("Customer not found", { status: 404 })
    }
    return NextResponse.json(deletedCustomer, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json("Failed to delete customer", { status: 500 })
  }
}
