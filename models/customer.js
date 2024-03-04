import { Schema, model, models } from "mongoose";

const CustomerSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other", "N/A"],
    default: "N/A",
  },
});

const Customer = models.Customer || model("Customer", CustomerSchema);

export default Customer;
