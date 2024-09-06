"use client";
import React from "react";
import { IQuestionFormInputs, IQuestions } from "@/interfaces/quiz.interface";
import {
  addQuestion,
  updateQuestion,
} from "@/reduxjs/features/quizzez/quizSlice";
import { useAppDispatch } from "@/reduxjs/hooks";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Trash } from "react-bootstrap-icons";

interface ControlQuestionFormProps {
  question?: IQuestions;
  quizId: number;
  handleClose: () => void;
}

const ControlQuestionForm: React.FC<ControlQuestionFormProps> = ({
  question,
  quizId,
  handleClose,
}) => {
  const dispatch = useAppDispatch();
  const isEditingMode = !!question;

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IQuestionFormInputs>({
    defaultValues: {
      text: question?.text || "",
      feedback_true: question?.feedback_true || "",
      feedback_false: question?.feedback_false || "",
      answers: question?.answers || [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "answers",
  });

  const updateCorrectAnswer = (id: string) => {
    fields.map((field, index) =>
      field.id === id
        ? update(index, { ...field, is_true: true })
        : update(index, { ...field, is_true: false })
    );
  };

  const onSubmit: SubmitHandler<IQuestionFormInputs> = (data) => {
    if (isEditingMode) {
      dispatch(
        updateQuestion({
          question: { ...question, ...data },
          questionId: question?.id as number,
          quizId,
        })
      );
    } else {
      dispatch(addQuestion({ question: data, quizId }));
    }
    reset();
    handleClose();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="text">
        <Form.Label>Question</Form.Label>
        <Form.Control
          type="text"
          placeholder="Question"
          {...register("text", { required: "Question text is required" })}
          isInvalid={!!errors.text}
        />
        {errors.text && (
          <Form.Control.Feedback type="invalid">
            {errors.text.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="feedback_true">
        <Form.Label>Feedback True</Form.Label>
        <Form.Control
          type="text"
          placeholder="Feedback True"
          {...register("feedback_true")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="feedback_false">
        <Form.Label>Feedback False</Form.Label>
        <Form.Control
          type="text"
          placeholder="Feedback False"
          {...register("feedback_false")}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Row className="mb-4 justify-content-between align-items-center">
          <Col>
            <Form.Label>Answers</Form.Label>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              className="mb-2"
              onClick={() => append({ text: "", is_true: false })}
            >
              + Add Answer
            </Button>
          </Col>
        </Row>
        {fields.map((field, index) => (
          <Row key={field.id} className="d-flex align-items-center mb-2 gap-3">
            <Col md={8}>
              <Form.Control
                type="text"
                placeholder="Answer"
                {...register(`answers.${index}.text`, {
                  required: "Answer text is required",
                })}
                isInvalid={!!errors.answers?.[index]?.text}
              />
              {errors.answers && (
                <Form.Control.Feedback type="invalid">
                  {errors.answers?.[index]?.text?.message ?? ""}
                </Form.Control.Feedback>
              )}
            </Col>
            <Col className="d-flex justify-content-center">
              <Form.Check
                type="checkbox"
                id={`answer-${field.id}`}
                name="correctAnswer"
                checked={field.is_true}
                style={{ transform: "scale(1.5)" }}
                onChange={() => updateCorrectAnswer(field.id)}
              />
            </Col>
            <Col>
              <Button variant="outline-danger" onClick={() => remove(index)}>
                <Trash />
              </Button>
            </Col>
          </Row>
        ))}
      </Form.Group>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {isEditingMode ? "Edit" : "Add"}
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export default ControlQuestionForm;
