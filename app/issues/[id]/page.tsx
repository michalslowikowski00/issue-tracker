import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Box, Button, Card, Flex, Grid, Heading } from '@radix-ui/themes';
import Link from 'next/link';
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
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Box>
        <Heading className="capitalize">{issue.title}</Heading>
        <Flex gap="8px" my="2">
          <IssueStatusBadge status={issue.status} />
          {issue.createdAt.toDateString()}
        </Flex>
        <Card className="prose max-w-xl" mt="4">
          <ReactMarkdown className="markdown">
            {issue.description}
          </ReactMarkdown>
        </Card>{' '}
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`issues/${issue.id}/edit`}>Edit issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
