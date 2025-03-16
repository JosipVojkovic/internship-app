import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import {
  QuestionCategory,
  QuestionStatus,
  QuestionType,
} from '@internship-app/types';
import { AddQuestionSelectOptions } from './AddQuestionSelectOptions';
import { AddQuestionSliderOptions } from './AddQuestionSliderOptions';
import {
  newQuestionType,
  usePostInterviewQuestion,
} from '../../api/usePostInterviewQuestion';

const AddInterviewQuestionDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [newQuestion, setNewQuestion] = useState<newQuestionType>({
    type: QuestionType.Field,
    category: QuestionCategory.General,
    status: QuestionStatus.Enabled,
    title: '',
    options: null,
  });

  const postInterviewQuestion = usePostInterviewQuestion();

  const handleChangeNewQuestion = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent,
  ) => {
    const { name, value } = e.target;

    setNewQuestion((prev) => {
      const otherOptions = [
        'Field',
        'TextArea',
        'Number',
        'Date',
        'DateTime',
      ].includes(value);
      const selectOptions = ['Select', 'Radio', 'Checkbox'].includes(value);
      const sliderOptions = 'Slider' === value;

      if (selectOptions) {
        return {
          ...prev,
          [name]: value,
          options: [],
        };
      }

      if (sliderOptions) {
        return {
          ...prev,
          [name]: value,
          options: { min: 1, max: 5, step: 1 },
        };
      }

      if (otherOptions) {
        return {
          ...prev,
          [name]: value,
          options: null,
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleStatusChange = () => {
    setNewQuestion((prev) => ({
      ...prev,
      status:
        prev.status === QuestionStatus.Disabled
          ? QuestionStatus.Enabled
          : QuestionStatus.Disabled,
    }));
  };

  const handleCancelAction = () => {
    setNewQuestion({
      type: QuestionType.Field,
      category: QuestionCategory.General,
      status: QuestionStatus.Enabled,
      title: '',
      options: null,
    });
    setIsOpen(false);
  };

  const handleAddSelectOptions = (selectOption: string) => {
    setNewQuestion((prev) => ({
      ...prev,
      options: [...prev.options, selectOption],
    }));
  };

  const handleRemoveSelectOption = (selectOption: string) => {
    setNewQuestion((prev) => ({
      ...prev,
      options: prev.options.filter((o: string) => o !== selectOption),
    }));
  };

  const handleChangeSliderOptions = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    setNewQuestion((prev) => ({
      ...prev,
      options: { ...prev.options, [name]: Number(value) },
    }));
  };

  const handleConfirmNewQuestion = () => {
    postInterviewQuestion.mutate(newQuestion, {
      onSuccess: () => {
        setIsOpen(false);
        setNewQuestion({
          type: QuestionType.Field,
          category: QuestionCategory.General,
          status: QuestionStatus.Enabled,
          title: '',
          options: null,
        });
      },
    });
  };

  let optionsComponent;

  if (
    newQuestion.type === QuestionType.Select ||
    newQuestion.type === QuestionType.Radio ||
    newQuestion.type === QuestionType.Checkbox
  ) {
    optionsComponent = (
      <AddQuestionSelectOptions
        options={newQuestion.options}
        onAddSelectOptions={handleAddSelectOptions}
        onRemoveSelectOption={handleRemoveSelectOption}
      />
    );
  } else if (newQuestion.type === QuestionType.Slider) {
    optionsComponent = (
      <AddQuestionSliderOptions
        options={newQuestion.options}
        onChangeSliderOptions={handleChangeSliderOptions}
      />
    );
  } else {
    optionsComponent = null;
  }

  console.log(newQuestion);

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>Dodaj pitanje</DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <FormControl
            variant="outlined"
            sx={{ minWidth: 150, marginBottom: 2 }}
          >
            <InputLabel id="type-select-label">Tip</InputLabel>
            <Select
              labelId="type-select-label"
              id="type-select"
              label="Tip"
              name="type"
              value={newQuestion.type}
              onChange={handleChangeNewQuestion}
            >
              <MenuItem value={QuestionType.Field}>Field</MenuItem>
              <MenuItem value={QuestionType.TextArea}>TextArea</MenuItem>
              <MenuItem value={QuestionType.Select}>Select</MenuItem>
              <MenuItem value={QuestionType.Slider}>Slider</MenuItem>
              <MenuItem value={QuestionType.Checkbox}>Checkbox</MenuItem>
              <MenuItem value={QuestionType.Date}>Date</MenuItem>
              <MenuItem value={QuestionType.DateTime}>DateTime</MenuItem>
              <MenuItem value={QuestionType.Radio}>Radio</MenuItem>
              <MenuItem value={QuestionType.Number}>Number</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            variant="outlined"
            sx={{ minWidth: 150, marginBottom: 2 }}
          >
            <InputLabel id="category-select-label">Područje</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              label="Područje"
              name="category"
              value={newQuestion.category}
              onChange={handleChangeNewQuestion}
            >
              <MenuItem value={QuestionCategory.General}>General</MenuItem>
              <MenuItem value={QuestionCategory.Personal}>Personal</MenuItem>
              <MenuItem value={QuestionCategory.Development}>
                Development
              </MenuItem>
              <MenuItem value={QuestionCategory.Design}>Design</MenuItem>
              <MenuItem value={QuestionCategory.Marketing}>Marketing</MenuItem>
              <MenuItem value={QuestionCategory.Multimedia}>
                Multimedia
              </MenuItem>
              <MenuItem value={QuestionCategory.Final}>Final</MenuItem>
            </Select>
          </FormControl>

          <Button onClick={handleStatusChange}>{newQuestion.status}</Button>
        </div>

        <TextField
          fullWidth
          label="Tekst"
          variant="outlined"
          sx={{ marginBottom: 2 }}
          name="title"
          value={newQuestion.title}
          onChange={handleChangeNewQuestion}
        />

        {optionsComponent}

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleCancelAction} sx={{ marginRight: 1 }}>
            Odustani
          </Button>
          <Button onClick={handleConfirmNewQuestion} variant="outlined">
            Potvrdi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddInterviewQuestionDialog;
