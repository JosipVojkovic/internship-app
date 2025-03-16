import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { InterviewQuestionOptions } from './InterviewQuestionOptions';
import classes from './InterviewQuestion.module.css';
import { InterviewQuestion, QuestionStatus } from '@internship-app/types';

type EditedInterviewQuestionProps = {
  question: InterviewQuestion;
  onStatusChange: (id: string) => void;
  onQuestionChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent,
  ) => void;
};
export const EditedInterviewQuestion: React.FC<
  EditedInterviewQuestionProps
> = ({ question, onStatusChange, onQuestionChange }) => {
  return (
    <div
      className={`${classes.editQuestion} ${question.status === QuestionStatus.Disabled ? classes.disabled : ''}`}
    >
      <div className={classes.leftContainer}>
        <div>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            sx={{ minWidth: 150 }}
          >
            <InputLabel id="demo-simple-select-outlined-label">Tip</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Type"
              value={question.type}
              name="type"
              onChange={onQuestionChange}
            >
              <MenuItem value={'Field'}>Field</MenuItem>
              <MenuItem value={'TextArea'}>TextArea</MenuItem>
              <MenuItem value={'Select'}>Select</MenuItem>
              <MenuItem value={'Slider'}>Slider</MenuItem>
              <MenuItem value={'Checkbox'}>Checkbox</MenuItem>
              <MenuItem value={'Date'}>Date</MenuItem>
              <MenuItem value={'DateTime'}>DateTime</MenuItem>
              <MenuItem value={'Radio'}>Radio</MenuItem>
              <MenuItem value={'Number'}>Number</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            variant="outlined"
            className={classes.formControl}
            sx={{ minWidth: 150 }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Područje
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Category"
              value={question.category}
              name="category"
              onChange={onQuestionChange}
            >
              <MenuItem value={'General'}>General</MenuItem>
              <MenuItem value={'Personal'}>Personal</MenuItem>
              <MenuItem value={'Development'}>Development</MenuItem>
              <MenuItem value={'Design'}>Dizajn</MenuItem>
              <MenuItem value={'Marketing'}>Marketing</MenuItem>
              <MenuItem value={'Multimedia'}>Multimedija</MenuItem>
              <MenuItem value={'Final'}>Final</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={() => onStatusChange(question.id)}>
            {question.status === 'Disabled' ? 'Enable' : 'Disable'}
          </Button>
        </div>

        <TextField
          id="text"
          label="Tekst"
          variant="outlined"
          value={question.title}
          name="title"
          onChange={onQuestionChange}
        />

        <InterviewQuestionOptions question={question} />
      </div>
      <div>
        <Button>Stats</Button>
      </div>
    </div>
  );
};
