import { useQuery } from 'react-query';
import toast from 'react-hot-toast';
import { api } from '.';

export type QuestionAnswersResponse = {
  slotId: string;
  start: Date;
  intern?: {
    id: string;
    name: string;
  } | null;
  answer?: string;
  selectedOptions?: number[];
  score?: number;
};

export const useGetQuestionAnswers = (questionId?: string) => {
  return useQuery<QuestionAnswersResponse[]>(
    ['interview-questions', questionId, 'answers'],
    async () => {
      if (!questionId) throw new Error('Question ID required');

      const response = await api.get(
        `/interview-questions/${questionId}/answers`,
      );

      return response.data;
    },
    {
      enabled: !!questionId,
      onError: (error) => {
        toast.error(`Greška: ${error}`);
      },
    },
  );
};
