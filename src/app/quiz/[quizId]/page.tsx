"use client";
import QuestionDialog from "@/components/dialogs/QuestionDialog";
import { IQuiz } from "@/interfaces/quiz.interface";
import { deleteQuestion } from "@/reduxjs/features/quizzez/quizSlice";
import { useAppDispatch, useAppSelector } from "@/reduxjs/hooks";
import { RootState } from "@/reduxjs/store";
import { useRouter } from "next/navigation";
import { Breadcrumb, Button, Card, Col, Container, Row } from "react-bootstrap";
import { ArrowLeft, Trash } from "react-bootstrap-icons";

const QuizDetails = ({
  params: { quizId },
}: {
  params: { quizId: string };
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const quizzes: IQuiz[] = useAppSelector(
    (state: RootState) => state.quizzes.quizzes
  );
  const quiz = quizzes.find((q) => q.id === Number(quizId));

  if (!quiz) {
    return (
      <Container className="py-16">
        <p className="pb-5">Quiz not found</p>
        <Button variant="link" onClick={() => router.back()}>
          Back to home
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <Button
            className="d-flex align-items-center gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft />
            <div className="mb-1"> Back</div>
          </Button>
        </Col>
      </Row>
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => router.push("/")}>
          Quizzes
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{quiz.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Row className=" justify-content-between align-items-center">
        <Col>
          <h1 className="display-4 text-primary">{quiz.title}</h1>
        </Col>
        <Col className="d-flex align-items-center justify-content-end">
          <QuestionDialog quizId={Number(quizId)} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="text-muted">{quiz.description}</h2>
          {quiz.score && <p>Final Score:{quiz.score}</p>}
          <p>
            URL:
            <a
              href={quiz.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary"
            >
              {quiz.url}
            </a>
          </p>
        </Col>
      </Row>
      <Row>
        {quiz.questions_answers?.map((question, index) => (
          <Col key={index} md={6} className="mb-4">
            <Card>
              <Card.Header>
                <Row className="align-items-center">
                  <Col>
                    <Card.Title>{question.text}</Card.Title>
                  </Col>
                  <Col className="d-flex justify-content-end gap-2">
                    <QuestionDialog
                      question={question}
                      quizId={Number(quizId)}
                    />
                    <Button
                      variant="outline-danger"
                      onClick={() =>
                        dispatch(
                          deleteQuestion({
                            questionId: question?.id,
                            quizId: +quizId,
                          })
                        )
                      }
                    >
                      <Trash />
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                {question.answers.map((answer, idx) => (
                  <div
                    key={idx}
                    className={`border ${
                      answer.is_true
                        ? "bg-success text-white"
                        : "bg-light text-dark"
                    } px-2 py-1 rounded mb-2`}
                  >
                    {answer.text}
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default QuizDetails;
