import { InternDiscipline } from '@internship-app/types';

import {
  disciplineLabel,
  disciplineStatusLabel,
  testStatusLabel,
} from '../../constants/internConstants';
import * as styled from './styled';

type DisciplineCardProps = {
  internDiscipline: InternDiscipline;
};

export const DisciplineCard: React.FC<DisciplineCardProps> = ({
  internDiscipline: ind,
}) => {
  return (
    <styled.disciplineCard discipline={ind.discipline}>
      <styled.disciplineCardLabel>
        {disciplineLabel[ind.discipline]}
      </styled.disciplineCardLabel>
      <styled.statusSection>
        <styled.statusLabel>Status područja</styled.statusLabel>
        <styled.statusBox>
          <styled.statusValue>
            {disciplineStatusLabel[ind.status]}
          </styled.statusValue>
        </styled.statusBox>
      </styled.statusSection>
      {ind.testStatus && (
        <styled.statusSection>
          <styled.statusLabel>Status ispita</styled.statusLabel>
          <styled.statusBox>
            <styled.statusValue>
              {testStatusLabel[ind.testStatus]}
            </styled.statusValue>
          </styled.statusBox>
        </styled.statusSection>
      )}
    </styled.disciplineCard>
  );
};
