import { InterviewQuestion } from '@internship-app/types';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';

import { api } from '.';

const updateInterviewQuestions = async (
  updates: { id: string; data: Partial<InterviewQuestion> }[],
) => {
  return await api.put<typeof updates, InterviewQuestion[]>(
    '/interview-questions',
    updates,
  );
};

export const useUpdateInterviewQuestions = () => {
  return useMutation(updateInterviewQuestions, {
    onMutate: () => {
      return { toastId: toast.loading('Spremanje promjena...') };
    },
    onSuccess: (_data, _variables, context) => {
      toast.success('Promjene su spremljene!', { id: context?.toastId });
    },
    onError: (error: string, _variables, context) => {
      toast.error(error, { id: context?.toastId });
    },
  });
};
