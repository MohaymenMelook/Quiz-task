import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { quizzes } from "@/data/questions"; // Import initial quizzes data
import {
  IQuestionFormInputs,
  IQuestions,
  IQuiz,
} from "@/interfaces/quiz.interface"; // Import interfaces for types

interface QuizState {
  quizzes: IQuiz[];
}

const initialState: QuizState = {
  quizzes,
};

const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (
      state,
      action: PayloadAction<
        Omit<
          IQuiz,
          "id" | "created" | "modified" | "score" | "questions_answers"
        >
      >
    ) => {
      const newQuiz: IQuiz = {
        ...action.payload,
        id: state.quizzes.length + 1,
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
        questions_answers: [],
      };
      state.quizzes.push(newQuiz);
    },
    editQuiz: (
      state,
      action: PayloadAction<{ quizId: number; updatedQuiz: Partial<IQuiz> }>
    ) => {
      const { quizId, updatedQuiz } = action.payload;
      const quizIndex = state.quizzes.findIndex((quiz) => quiz.id === quizId);
      if (quizIndex !== -1) {
        state.quizzes[quizIndex] = {
          ...state.quizzes[quizIndex],
          ...updatedQuiz,
          modified: new Date().toISOString(),
        };
      }
    },
    deleteQuiz: (state, action: PayloadAction<number>) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz.id !== action.payload
      );
    },
    addQuestion: (
      state,
      action: PayloadAction<{
        question: IQuestionFormInputs;
        quizId: number;
      }>
    ) => {
      const { question, quizId } = action.payload;
      const quizIndex = state.quizzes.findIndex((quiz) => quiz.id === quizId);
      if (quizIndex !== -1) {
        state.quizzes[quizIndex].questions_answers.push({
          ...question,
          id: state.quizzes[quizIndex].questions_answers.length + 1,
          answer_id: null,
        });
        state.quizzes[quizIndex].modified = new Date().toISOString();
      }
    },
    updateQuestion: (
      state,
      action: PayloadAction<{
        question: IQuestions;
        quizId: number;
        questionId: number;
      }>
    ) => {
      const { question, quizId, questionId } = action.payload;
      const quizIndex = state.quizzes.findIndex((quiz) => quiz.id === quizId);
      if (quizIndex !== -1) {
        const questionIndex = state.quizzes[
          quizIndex
        ].questions_answers.findIndex((q) => q.id === questionId);
        if (questionIndex !== -1) {
          state.quizzes[quizIndex].questions_answers[questionIndex] = {
            ...state.quizzes[quizIndex].questions_answers[questionIndex],
            ...question,
          };
          state.quizzes[quizIndex].modified = new Date().toISOString();
        }
      }
    },
    deleteQuestion: (
      state,
      action: PayloadAction<{ quizId: number; questionId: number }>
    ) => {
      const { quizId, questionId } = action.payload;
      const quizIndex = state.quizzes.findIndex((quiz) => quiz.id === quizId);
      if (quizIndex !== -1) {
        state.quizzes[quizIndex].questions_answers = state.quizzes[
          quizIndex
        ].questions_answers.filter((q) => q.id !== questionId);
        state.quizzes[quizIndex].modified = new Date().toISOString();
      }
    },
  },
});

export const {
  addQuiz,
  editQuiz,
  deleteQuiz,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} = quizSlice.actions;

export default quizSlice.reducer;
