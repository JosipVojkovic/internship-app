import { useQuery } from 'react-query';

import { api } from '.';
import { InterviewQuestion } from '@internship-app/types';

const fetchAllInterviewQuestions = async () => {
  return api.get<never, InterviewQuestion[]>('/interview-questions');
};

export const useFetchAllInterviewQuestions = () => {
  return useQuery(['interviewQuestions'], fetchAllInterviewQuestions);
};
