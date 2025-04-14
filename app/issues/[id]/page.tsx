import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading } from '@radix-ui/themes';
import { notFound } from 'next/navigation';

interface IssueDetailPage {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: IssueDetailPage) => {
  if (typeof params.id !== 'string') {
    notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <Heading className="capitalize">{issue.title}</Heading>
      <Flex gap="1" my="2">
        <IssueStatusBadge status={issue.status} />
        {issue.createdAt.toDateString()}
      </Flex>
      <Card>{issue.description}</Card>
    </div>
  );
};

export default IssueDetailPage;
