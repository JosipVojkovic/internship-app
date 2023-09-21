import { Discipline } from '@internship-app/types';

import { useFetchAllInternDisciplines } from '../../api/useFetchAllInternDisciplines';
import { useFetchInterviewers } from '../../api/useFetchInterviewers';
import { CustomSelectInput } from '../common/SelectInput/CustomSelectInput';
import styles from './index.module.css';

interface Props {
  selectedStartTime?: string;
  selectedEndTime?: string;
}

export const CalendarSidebar: React.FC<Props> = ({
  selectedStartTime,
  selectedEndTime,
}: Props) => {
  const { data: internDisciplines } = useFetchAllInternDisciplines();
  const { data: interviewers } = useFetchInterviewers();
  console.log('Disciplines: ', internDisciplines);
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.time}>
        {selectedStartTime} - {selectedEndTime}
      </h1>
      <CustomSelectInput
        label="Područje:"
        menuOptions={['dev', 'multimedija', 'dizajn', 'marketing']}
        isMultiSelect={false}
      />
      <CustomSelectInput
        label="Intervjueri:"
        menuOptions={interviewers?.map((interviewer) => interviewer.name)}
        isMultiSelect={true}
      />
      <div>
        <span>Notes:</span>
      </div>
    </div>
  );
};
