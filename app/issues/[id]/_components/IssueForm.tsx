'use client';
import { createIssueSchema } from '@/app/validationSchemas';
import { Button, Callout, Spinner, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z, ZodBooleanDef } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import dynamic from 'next/dynamic';
import { Issue } from '@prisma/client';

const SimpleMDEReact = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

type IssueFormData = z.infer<typeof createIssueSchema>;

interface IssueFormParams {
  issue?: Issue;
}

const IssueForm = ({ issue }: IssueFormParams) => {
  const [error, setError] = useState<string>();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({ resolver: zodResolver(createIssueSchema) });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitted(true);
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setSubmitted(false);
      setError('An unexpected error occurred.');
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register('title')}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          control={control}
          name="description"
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDEReact placeholder="Add description here" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={submitted}>
          Submit new issue
          {submitted && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
