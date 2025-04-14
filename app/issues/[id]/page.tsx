import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

interface IssueDetailPageProps {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: IssueDetailPageProps) => {
  if (typeof params.id !== 'string') {
    notFound();
  }

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
      <Flex gap="1" my="2">
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
