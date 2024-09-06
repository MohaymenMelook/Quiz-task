export interface IQuiz {
  created: string;
  description: string;
  id: number;
  modified: string;
  questions_answers: IQuestions[];
  score?: number | null;
  title: string;
  url: string;
}

export interface IQuestions {
  answer_id: null;
  answers: IAnswers[];
  feedback_false: string;
  feedback_true: string;
  id: number;
  text: string;
}

export interface IQuizFormInputs {
  title: string;
  description: string;
  score: number;
  url: string;
}

export interface IQuestionFormInputs {
  text: string;
  feedback_true: string;
  feedback_false: string;
  answers: IAnswers[];
}

interface IAnswers {
  id?: number;
  is_true: boolean;
  text: string;
}
