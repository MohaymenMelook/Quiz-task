"use client";
import { IQuestions } from "@/interfaces/quiz.interface";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ControlQuestionForm from "../forms/ControlQuestionForm";

interface QuestionDialogProps {
  question?: IQuestions;
  quizId: number;
}

const QuestionDialog: React.FC<QuestionDialogProps> = ({
  question,
  quizId,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const isEditingMode = !!question;

  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="d-flex align-items-center gap-2"
      >
        {isEditingMode ? (
          <>
            <span>Edit</span>
          </>
        ) : (
          <>
            <span>Add</span>
          </>
        )}
      </Button>

      <Modal show={isDialogOpen} onHide={() => setIsDialogOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditingMode ? `Edit Question` : "Add Question"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ControlQuestionForm
            question={question}
            quizId={quizId}
            handleClose={() => setIsDialogOpen(false)}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default QuestionDialog;
