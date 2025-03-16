import { Button } from '@mui/material';
import classes from './InterviewQuestion.module.css';
import {
  InterviewQuestion as InterviewQuestionType,
  QuestionStatus,
} from '@internship-app/types';
import { Link } from 'wouter';
import { Path } from '../../constants/paths';

type InterviewQuestionProps = {
  question: InterviewQuestionType;
  onClick: (id: InterviewQuestionType) => void;
  onStatusChange: (id: string) => void;
};

export const InterviewQuestion: React.FC<InterviewQuestionProps> = ({
  question,
  onClick,
  onStatusChange,
}) => {
  return (
    <div
      className={`${classes.question} ${question.status === QuestionStatus.Disabled ? classes.disabled : ''}`}
    >
      <div>
        <p>{question.title}</p>
        <span className={classes.discipline}>{question.category}</span>
        <span className={classes.type}>{question.type}</span>
        <Button onClick={() => onStatusChange(question.id)}>
          {question.status === 'Disabled' ? 'Enable' : 'Disable'}
        </Button>
        <Button onClick={() => onClick(question)}>Edit</Button>
      </div>
      <div>
        <Button
          component={Link}
          to={Path.InterviewQuestionStats.replace(':questionId', question.id)}
        >
          Stats
        </Button>
      </div>
    </div>
  );
};
