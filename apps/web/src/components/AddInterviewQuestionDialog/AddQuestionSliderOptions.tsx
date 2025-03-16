import { SliderOptions } from '@internship-app/types';
import { TextField } from '@mui/material';

export const AddQuestionSliderOptions = ({
  options,
  onChangeSliderOptions,
}: {
  options: SliderOptions;
  onChangeSliderOptions: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <h3>Postavke slidera:</h3>

      <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
        <TextField
          type="number"
          label="Min"
          name="min"
          fullWidth
          sx={{ marginBottom: '10px' }}
          onChange={onChangeSliderOptions}
          value={options.min}
        />

        <TextField
          type="number"
          label="Max"
          name="max"
          fullWidth
          sx={{ marginBottom: '10px' }}
          onChange={onChangeSliderOptions}
          value={options.max}
        />

        <TextField
          type="number"
          label="Step"
          name="step"
          fullWidth
          sx={{ marginBottom: '10px' }}
          onChange={onChangeSliderOptions}
          value={options.step}
        />
      </div>
    </div>
  );
};
