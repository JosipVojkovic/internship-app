export enum Path {
  Home = '/',
  ApplicationForm = '/application-form',
  ScheduleInterview = '/schedule-interview/:internId',
  ScheduleTest = '/schedule-test/:discipline/:internId',
  Status = '/status/:internId',
  Test = '/test/:testSlotId',
  TestChoose = '/test',

  Dashboard = '/admin',
  Login = '/admin/login',
  Intern = '/admin/intern/:internId',
  Interview = '/admin/interview/:internId',
  Interviewers = '/admin/interviewers',
  InterviewPicker = '/admin/interview-scheduler',
  TestScheduler = '/admin/test-scheduler',
  TestOverview = '/admin/test-overview/:testSlotId',
  TestReview = '/admin/test-review/:testSlotId/:group/:groupId',
  AdminLogs = '/admin/admin-logs',
  Counter = '/admin/counter',

  //Dodani pathovi
  InterviewBuilder = '/admin/interview-builder',

  InterviewQuestionStats = '/admin/interview-builder/:questionId',
  //
  CatchAll = '/:path*',
}
