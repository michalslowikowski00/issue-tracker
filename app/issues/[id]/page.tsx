import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading } from '@radix-ui/themes';
import delay from 'delay';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

interface IssueDetailPageProps {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: IssueDetailPageProps) => {
  if (typeof params.id !== 'string') {
    notFound();
  }
  await delay(2000);
  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <Heading className="capitalize">{issue.title}</Heading>
      <Flex gap="8px" my="2">
        <IssueStatusBadge status={issue.status} />
        {issue.createdAt.toDateString()}
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown className="markdown">{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
