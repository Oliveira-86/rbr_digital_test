import mongoose, { Schema, Document } from 'mongoose';

export interface IEmployees extends Document {
  name: string;
  position: string;
  department: string;
  hireDate: Date;
}

const EmployeesSchema: Schema = new Schema({
    name: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    hireDate: {
      type: Date,  
      required: true
    },
    createdAt: {
      type: Date,
      default: new Date(),
    }
});

const Employees = mongoose.model<IEmployees>('Employees', EmployeesSchema);

export default Employees;