import { SelectOptions } from '@internship-app/types';
import { Button, TextField } from '@mui/material';
import { useRef } from 'react';

export const AddQuestionSelectOptions = ({
  options,
  onAddSelectOptions,
  onRemoveSelectOption,
}: {
  options: SelectOptions;
  onAddSelectOptions: (selectOption: string) => void;
  onRemoveSelectOption: (selectOption: string) => void;
}) => {
  const optionInputRef = useRef<HTMLInputElement>(null);

  const handleAddSelectOption = () => {
    const newOption = optionInputRef.current?.value;

    if (newOption) {
      if (!options.includes(newOption)) onAddSelectOptions(newOption);

      if (optionInputRef.current) optionInputRef.current.value = '';
    }
  };

  return (
    <div>
      <h3>Opcije:</h3>
      <div
        style={{
          marginBottom: '10px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '5px',
        }}
      >
        {options.length ? (
          options.map((option) => (
            <span
              key={option}
              style={{
                padding: '5px',
                border: '1px solid grey',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => onRemoveSelectOption(option)}
            >
              {option} ✖
            </span>
          ))
        ) : (
          <p>Nema opcija</p>
        )}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <TextField
          label="Dodaj opciju"
          fullWidth
          sx={{ marginBottom: '10px' }}
          inputRef={optionInputRef}
        />
      </div>

      <Button variant="outlined" onClick={handleAddSelectOption}>
        Dodaj opciju
      </Button>
    </div>
  );
};
