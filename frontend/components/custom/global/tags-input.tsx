import React, { useState } from 'react';
import {Badge} from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TagsInputProps {
  selectedOptions: string[];
  onSelectedOptionsChange: (selectedOptions: string[]) => void;
}

const TagsInput = (props: TagsInputProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [currentOption, setCurrentOption] = useState<string>('');

  const predefinedOptions: string[] = [
    'Impreza',
    'Domowka',
    'Plener',
    'Klub',
    'Sport',
  ];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption: string = event.target.value;

    // Check if the option is not already selected
    if (!props.selectedOptions.includes(selectedOption)) {
      props.onSelectedOptionsChange([...props.selectedOptions, selectedOption]);
    }

    setCurrentOption('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentOption(event.target.value);
  };

  return (
    <div className="grid grid-cols-1 gap-2 p-2">
      <div className="col-span-1">
        <label htmlFor="selectOptions">Select tags (optional):</label>
      </div>
      <div className="col-span-1">
        <select
          id="selectOptions"
          className="w-full p-2"
          onChange={handleSelectChange}
          value={currentOption}>
          <option value=""
            disabled>Select an option</option>
          {predefinedOptions.map((option) => (
            <option key={option}
              value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="col-span-1">
        {props.selectedOptions.map((option) => {
          return(
            <Badge className="mb-1 mr-1">{option}</Badge>
          )})}
      </div>
      <div className="col-span-1">
        <Button
          type='button'
          onClick={() => props.onSelectedOptionsChange([])}>
          Reset tags
        </Button>
      </div>
    </div>
  );
};

export default TagsInput;
