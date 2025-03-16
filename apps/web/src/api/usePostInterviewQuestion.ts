import { QuestionStatus } from '@internship-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

export type newQuestionType = {
  type: string;
  category: string;
  status: QuestionStatus;
  title: string;
  options: any;
};

const addInterviewQuestion = async (newInterviewQuestion: newQuestionType) => {
  await api.post('/interview-questions', newInterviewQuestion);
};

export const usePostInterviewQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation(addInterviewQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries('interview-questions');
      toast.success('Intervju pitanje uspješno dodano!');
    },
    onError: (error) => {
      toast.error(`Greška prilikom dodavanja intervju pitanja! (${error})`);
    },
  });
};
