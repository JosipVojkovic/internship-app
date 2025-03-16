import {
  InterviewQuestion,
  QuestionType,
  SelectOptions,
  SliderOptions,
} from '@internship-app/types';
import { Button, TextField } from '@mui/material';
import classes from './InterviewQuestionOptions.module.css';

type InterviewQuestionOptionsProps = {
  question?: InterviewQuestion;
};

export const InterviewQuestionOptions: React.FC<
  InterviewQuestionOptionsProps
> = ({ question }) => {
  if (!question || question.options) return null;

  if (
    [QuestionType.Select, QuestionType.Checkbox, QuestionType.Radio].includes(
      question.type,
    )
  ) {
    const options = question.options as SelectOptions | null;
    if (!options) return null;

    return (
      <div className={classes.options}>
        <p>Opcije:</p>
        {options.map((option, index) => (
          <span key={index}>{option}</span>
        ))}
        <Button
          onClick={() => {
            /* Dodaj novu opciju */
          }}
        >
          Dodaj opciju
        </Button>
      </div>
    );
  }

  if (question.type === QuestionType.Slider) {
    const options = question.options as SliderOptions | null;
    if (!options) return null;

    return (
      <div className={classes.options}>
        <p>Postavke klizača:</p>
        <TextField label="Min" type="number" value={options.min} />
        <TextField label="Max" type="number" value={options.max} />
        <TextField label="Korak" type="number" value={options.step} />
      </div>
    );
  }
};
