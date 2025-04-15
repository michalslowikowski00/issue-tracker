import { IssueStatusBadge } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import { Heading, Flex, Card } from '@radix-ui/themes';
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface DetailsIssuePageProps {
  issue: Issue;
}

const IssueDetails = ({ issue }: DetailsIssuePageProps) => {
  return (
    <>
      <Heading className="capitalize">{issue.title}</Heading>
      <Flex gap="8px" my="2">
        <IssueStatusBadge status={issue.status} />
        {issue.createdAt.toDateString()}
      </Flex>
      <Card className="prose max-w-xl" mt="4">
        <ReactMarkdown className="markdown">{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
