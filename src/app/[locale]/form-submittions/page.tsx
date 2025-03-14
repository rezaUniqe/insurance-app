
import {FormSubmissionTable} from "@/app/[locale]/form-submittions/_components/form-submission-table";

const columns = ["Full Name", "Age", "Gender", "Insurance Type", "City"]

const data = [
  {
    id: "1",
    "Full Name": "John Doe",
    Age: 28,
    Gender: "Male",
    "Insurance Type": "Health",
    City: "New York",
  },
  {
    id: "2",
    "Full Name": "Jane Smith",
    Age: 32,
    Gender: "Female",
    "Insurance Type": "Home",
    City: "Los Angeles",
  },
  {
    id: "3",
    "Full Name": "Alice Brown",
    Age: 40,
    Gender: "Female",
    "Insurance Type": "Car",
    City: "Chicago",
  },
]

export default function Submissions() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Applications</h1>
      <FormSubmissionTable columns={columns} data={data} />
    </div>
  )
}

