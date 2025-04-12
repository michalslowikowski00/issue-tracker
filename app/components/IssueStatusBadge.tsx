import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';
import React from 'react';

// OPEN: 'OPEN',
//   IN_PROGRESS: 'IN_PROGRESS',
//   CLOSED: 'CLOSED'

const statusMap: Record<
  Status,
  { label: string; color: 'red' | 'yellow' | 'green' }
> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In progress', color: 'yellow' },
  CLOSED: { label: 'Closed', color: 'green' },
};

type IssueStatusBadgeProps = {
  status: Status;
};

const IssueStatusBadge = ({ status }: IssueStatusBadgeProps) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};
export default IssueStatusBadge;
