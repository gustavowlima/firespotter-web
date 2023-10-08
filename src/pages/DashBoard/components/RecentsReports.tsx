import { Table } from "@radix-ui/themes";

export const RecentsReports = () => {
  return (
    <div className="flex flex-col w-full h-full gap-3">
      <div className="flex gap-3 py-3 px-4 border-b-[1px] border-gray-50 items-center">
        <h2>Recents Reports</h2>
        <span className="text-sm">October 8, 2023 </span>
      </div>
      <div className="flex flex-col w-full h-full px-4">
        <Table.Root>
          <Table.Header>
            <Table.Row className="bg-gray-800 rounded-xl">
              <Table.ColumnHeaderCell className="text-white rounded-l-xl">
                Location
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-white">
                Severity
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-white rounded-r-xl"></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Londres - Europa</Table.Cell>
              <Table.Cell>Light</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
};
