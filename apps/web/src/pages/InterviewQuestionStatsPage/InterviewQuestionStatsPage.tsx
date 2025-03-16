import { useParams } from 'wouter';
import { useGetQuestionAnswers } from '../../api/useFetchInterviewQuestionAnswers';
import LayoutSpacing from '../../components/LayoutSpacing';
import { Button } from '@mui/material';

const InterviewQuestionStatsPage = () => {
  const { questionId } = useParams<{ questionId: string }>();

  const { data: answers } = useGetQuestionAnswers(questionId);

  return (
    <>
      <LayoutSpacing style={{ padding: '20px' }}>
        <h1>Zašto te zanima programiranje?</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid grey',
              padding: '5px 15px',
              borderRadius: '4px',
            }}
          >
            <p>
              <span>Sara Tičinović</span>
              <span>Veliki prioritet</span>
            </p>
            <div>
              <Button>Flag</Button>
              <Button>Uđi u pripravnika</Button>
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid grey',
              padding: '5px 15px',
              borderRadius: '4px',
            }}
          >
            <p>
              <span>Sara Tičinović</span>
              <span>Veliki prioritet</span>
            </p>
            <div>
              <Button>Flag</Button>
              <Button>Uđi u pripravnika</Button>
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid grey',
              padding: '5px 15px',
              borderRadius: '4px',
            }}
          >
            <p>
              <span>Sara Tičinović</span>
              <span>Veliki prioritet</span>
            </p>
            <div>
              <Button>Flag</Button>
              <Button>Uđi u pripravnika</Button>
            </div>
          </div>
        </div>
      </LayoutSpacing>
    </>
  );
};

export default InterviewQuestionStatsPage;
