'use client';
import { Button, TextArea, TextField } from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';
import SimpleMDEReact from 'react-simplemde-editor';

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title" />
      <SimpleMDEReact placeholder="Add description here" />
      {/* <TextArea placeholder="Add description here" /> */}
      <Button>Submit new issue</Button>
    </div>
  );
};

export default NewIssuePage;
