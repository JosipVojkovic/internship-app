import { Button, SelectChangeEvent } from '@mui/material';
import LayoutSpacing from '../../components/LayoutSpacing';
import LogoHeader from '../../components/LogoHeader';
import classes from './InterviewBuilderPage.module.css';
import InterviewQuestion from '../../components/InterviewQuestion';
import { useFetchAllInterviewQuestions } from '../../api/useFetchAllInterviewQuestions';
import { useEffect, useState } from 'react';
import { EditedInterviewQuestion } from '../../components/InterviewQuestion/EditedInterviewQuestion';
import {
  InterviewQuestion as InterviewQuestionType,
  QuestionStatus,
} from '@internship-app/types';
import { useUpdateInterviewQuestions } from '../../api/useUpdateManyInterviewQuestions';
import AddInterviewQuestionDialog from '../../components/AddInterviewQuestionDialog';

export const InterviewBuilderPage = () => {
  const { data: fetchedQuestions, refetch } = useFetchAllInterviewQuestions();
  const updateManyInterviewQuestions = useUpdateInterviewQuestions();

  const [interviewQuestions, setInterviewQuestions] = useState<
    InterviewQuestionType[]
  >([]);
  const [editQuestion, setEditQuestion] =
    useState<InterviewQuestionType | null>(null);
  const [editedQuestionsStatus, setEditedQuestionsStatus] = useState<
    InterviewQuestionType[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);

  console.log(editQuestion);

  const handleEditQuestion = (question: InterviewQuestionType) => {
    setEditQuestion(question);
  };

  const handleSaveChanges = () => {
    const updates = editedQuestionsStatus.map((q) => {
      if (q.id === editQuestion?.id) {
        return {
          id: editQuestion.id,
          data: {
            title: editQuestion.title,
            type: q.type,
            category: editQuestion.category,
            status: editQuestion.status,
            options: editQuestion.options,
          },
        };
      }

      return {
        id: q.id,
        data: {
          title: q.title,
          type: q.type,
          category: q.category,
          status: q.status,
          options: q.options,
        },
      };
    });

    updateManyInterviewQuestions.mutate(updates, {
      onSuccess: () => {
        setEditQuestion(null);
        setEditedQuestionsStatus([]);
        refetch();
      },
    });
  };

  const handleStatusChange = (id: string) => {
    setInterviewQuestions((current) =>
      current.map((q) =>
        q.id === id
          ? {
              ...q,
              status:
                q.status === QuestionStatus.Disabled
                  ? QuestionStatus.Enabled
                  : QuestionStatus.Disabled,
            }
          : q,
      ),
    );

    setEditedQuestionsStatus((current) => {
      const exists = current.find((q) => q.id === id);
      if (exists) {
        return current.map((q) =>
          q.id === id
            ? {
                ...q,
                status:
                  q.status === QuestionStatus.Disabled
                    ? QuestionStatus.Enabled
                    : QuestionStatus.Disabled,
              }
            : q,
        );
      } else {
        const original = interviewQuestions.find((q) => q.id === id);
        if (!original) return current;

        const updatedQuestion = {
          ...original,
          status:
            original.status === QuestionStatus.Disabled
              ? QuestionStatus.Enabled
              : QuestionStatus.Disabled,
        };

        return [...current, updatedQuestion];
      }
    });

    setEditQuestion((q) =>
      q?.id === id
        ? {
            ...q,
            status:
              q.status === QuestionStatus.Disabled
                ? QuestionStatus.Enabled
                : QuestionStatus.Disabled,
          }
        : q,
    );
  };

  const handleChangeEditedQuestion = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent,
  ) => {
    const { name, value } = e.target;

    setEditQuestion((prev) => {
      if (prev === null) return prev;
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    if (fetchedQuestions) setInterviewQuestions(fetchedQuestions);
  }, [fetchedQuestions]);

  return (
    <>
      <LogoHeader text="Interview Builder" />
      <LayoutSpacing>
        <div className={classes.interviewBuilderHeader}>
          <h1>Trenutna Pitanja</h1>
          <Button onClick={() => setIsOpen(true)}>Dodaj Pitanje</Button>
          <Button onClick={handleSaveChanges}>Spremi Promjene</Button>
        </div>

        <div className={classes.questionsContainer}>
          {interviewQuestions?.map((q) =>
            q.id === editQuestion?.id ? (
              <EditedInterviewQuestion
                key={q.id}
                question={editQuestion}
                onStatusChange={handleStatusChange}
                onQuestionChange={handleChangeEditedQuestion}
              />
            ) : (
              <InterviewQuestion
                key={q.id}
                question={q}
                onStatusChange={handleStatusChange}
                onClick={handleEditQuestion}
              />
            ),
          )}
        </div>
      </LayoutSpacing>
      <AddInterviewQuestionDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
