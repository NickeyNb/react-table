import { useMemo } from "react";
import Table from "./components/specific/Table";
import mData from "./assets/MOCK_DATA.json";

export type DataType = {
  id: number;
  name: string;
  gender: string;
  salary: number;
};

export type ColumnsType = {
  accessorKey?: string;
  accessorFn?: (val: any) => string;

  header: string;
  footer: string;
};

const App = () => {
  // we have to memoize the data and columns
  const columns: ColumnsType[] = [
    {
      accessorKey: "id",
      header: "ID",
      footer: "ID",
    },

    {
      // inside name field both id as well as name
      accessorFn: (row) => `${row.name} (${row.id})`,
      header: "Name",
      footer: "Name",
    },
    {
      accessorKey: "gender",
      header: "Gender",
      footer: "Gender",
    },
    {
      accessorKey: "salary",
      header: "Salary",
      footer: "Salary",
    },
  ];

  // data
  const data: DataType[] = useMemo(() => mData, []);
  return (
    <div className="h-screen  p-12">
      <Table data={data} columns={columns} />
    </div>
  );
};

export default App;
