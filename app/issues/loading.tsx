import { Skeleton } from '@/app/components';
import { Table } from '@radix-ui/themes';
import NewIssueButton from './NewIssueButton';

const LoadingIssuePage = () => {
  const issues = [1, 2, 3, 4, 5];

  return (
    <>
      <NewIssueButton />
      <Table.Root className="max-w-xl" variant="surface">
        <Table.Header>
          <Table.Row className="capitalize">
            <Table.ColumnHeaderCell>issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => {
            return (
              <Table.Row key={issue}>
                <Table.Cell>
                  <Skeleton />
                  <div className="block md:hidden">
                    <Skeleton />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <div>
                    <Skeleton />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <Skeleton />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default LoadingIssuePage;
