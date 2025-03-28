export enum QuestionType {
  Field = 'Field',
  TextArea = 'TextArea',
  Select = 'Select',
  Slider = 'Slider',
  Checkbox = 'Checkbox',
  Date = 'Date',
  DateTime = 'DateTime',
  Radio = 'Radio',
  Number = 'Number',
}

export enum QuestionCategory {
  General = 'General',
  Personal = 'Personal',
  Development = 'Development',
  Design = 'Design',
  Marketing = 'Marketing',
  Multimedia = 'Multimedia',
  Final = 'Final',
}

export enum QuestionStatus {
  Enabled = 'Enabled',
  Disabled = 'Disabled',
}

export type Question = {
  id: string;
  title?: string;
  required?: boolean;
  registerValue?: any;
} & (
  | { type: QuestionType.Field }
  | { type: QuestionType.TextArea }
  | { type: QuestionType.Checkbox; options?: string[] }
  | { type: QuestionType.Slider; min: number; max: number; step: number }
  | { type: QuestionType.Select; options: string[] }
  | { type: QuestionType.Date }
  | { type: QuestionType.DateTime }
  | { type: QuestionType.Radio; options: string[] }
  | { type: QuestionType.Number; min?: number; max?: number }
);

export type MultistepQuestion<T> = Question & {
  category: T;
};

export type SliderOptions = {
  min: number;
  max: number;
  step: number;
};

export type SelectOptions = string[];

export type InterviewQuestion = {
  id: string;
  title: string;
  type: QuestionType;
  category: QuestionCategory;
  status: QuestionStatus;
  options: null | SliderOptions | SelectOptions;
  updatedAt: Date;
  createdAt: Date;
};
