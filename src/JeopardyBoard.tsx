import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "./hooks/use-toast";
import { Input } from "./components/ui/input";

// Types
type Team = {
  id: number;
  name: string;
  score: number;
};

type Question = {
  question: string;
  answer: string;
  value: number;
  isAnswered: boolean;
};

type Category = {
  name: string;
  questions: Question[];
};

// Sample data structure
const initialCategories: Category[] = [
  {
    name: "Category 1",
    questions: [
      {
        question: "Placeholder question 1",
        answer: "Placeholder answer 1",
        value: 200,
        isAnswered: false,
      },
      {
        question: "Placeholder question 2",
        answer: "Placeholder answer 2",
        value: 400,
        isAnswered: false,
      },
      {
        question: "Placeholder question 3",
        answer: "Placeholder answer 3",
        value: 600,
        isAnswered: false,
      },
      {
        question: "Placeholder question 4",
        answer: "Placeholder answer 4",
        value: 800,
        isAnswered: false,
      },
      {
        question: "Placeholder question 5",
        answer: "Placeholder answer 5",
        value: 1000,
        isAnswered: false,
      },
      {
        question: "Placeholder question 6",
        answer: "Placeholder answer 6",
        value: 1200,
        isAnswered: false,
      },
      {
        question: "Placeholder question 7",
        answer: "Placeholder answer 7",
        value: 1400,
        isAnswered: false,
      },
      {
        question: "Placeholder question 8",
        answer: "Placeholder answer 8",
        value: 1600,
        isAnswered: false,
      },
    ],
  },
  {
    name: "Category 2",
    questions: [
      {
        question: "Placeholder question 1",
        answer: "Placeholder answer 1",
        value: 200,
        isAnswered: false,
      },
      {
        question: "Placeholder question 2",
        answer: "Placeholder answer 2",
        value: 400,
        isAnswered: false,
      },
      {
        question: "Placeholder question 3",
        answer: "Placeholder answer 3",
        value: 600,
        isAnswered: false,
      },
      {
        question: "Placeholder question 4",
        answer: "Placeholder answer 4",
        value: 800,
        isAnswered: false,
      },
      {
        question: "Placeholder question 5",
        answer: "Placeholder answer 5",
        value: 1000,
        isAnswered: false,
      },
      {
        question: "Placeholder question 6",
        answer: "Placeholder answer 6",
        value: 1200,
        isAnswered: false,
      },
      {
        question: "Placeholder question 7",
        answer: "Placeholder answer 7",
        value: 1400,
        isAnswered: false,
      },
      {
        question: "Placeholder question 8",
        answer: "Placeholder answer 8",
        value: 1600,
        isAnswered: false,
      },
    ],
  },
  {
    name: "Category 3",
    questions: [
      {
        question: "Placeholder question 1",
        answer: "Placeholder answer 1",
        value: 200,
        isAnswered: false,
      },
      {
        question: "Placeholder question 2",
        answer: "Placeholder answer 2",
        value: 400,
        isAnswered: false,
      },
      {
        question: "Placeholder question 3",
        answer: "Placeholder answer 3",
        value: 600,
        isAnswered: false,
      },
      {
        question: "Placeholder question 4",
        answer: "Placeholder answer 4",
        value: 800,
        isAnswered: false,
      },
      {
        question: "Placeholder question 5",
        answer: "Placeholder answer 5",
        value: 1000,
        isAnswered: false,
      },
      {
        question: "Placeholder question 6",
        answer: "Placeholder answer 6",
        value: 1200,
        isAnswered: false,
      },
      {
        question: "Placeholder question 7",
        answer: "Placeholder answer 7",
        value: 1400,
        isAnswered: false,
      },
      {
        question: "Placeholder question 8",
        answer: "Placeholder answer 8",
        value: 1600,
        isAnswered: false,
      },
    ],
  },
  {
    name: "Category 4",
    questions: [
      {
        question: "Placeholder question 1",
        answer: "Placeholder answer 1",
        value: 200,
        isAnswered: false,
      },
      {
        question: "Placeholder question 2",
        answer: "Placeholder answer 2",
        value: 400,
        isAnswered: false,
      },
      {
        question: "Placeholder question 3",
        answer: "Placeholder answer 3",
        value: 600,
        isAnswered: false,
      },
      {
        question: "Placeholder question 4",
        answer: "Placeholder answer 4",
        value: 800,
        isAnswered: false,
      },
      {
        question: "Placeholder question 5",
        answer: "Placeholder answer 5",
        value: 1000,
        isAnswered: false,
      },
      {
        question: "Placeholder question 6",
        answer: "Placeholder answer 6",
        value: 1200,
        isAnswered: false,
      },
      {
        question: "Placeholder question 7",
        answer: "Placeholder answer 7",
        value: 1400,
        isAnswered: false,
      },
      {
        question: "Placeholder question 8",
        answer: "Placeholder answer 8",
        value: 1600,
        isAnswered: false,
      },
    ],
  },
  {
    name: "Category 5",
    questions: [
      {
        question: "Placeholder question 1",
        answer: "Placeholder answer 1",
        value: 200,
        isAnswered: false,
      },
      {
        question: "Placeholder question 2",
        answer: "Placeholder answer 2",
        value: 400,
        isAnswered: false,
      },
      {
        question: "Placeholder question 3",
        answer: "Placeholder answer 3",
        value: 600,
        isAnswered: false,
      },
      {
        question: "Placeholder question 4",
        answer: "Placeholder answer 4",
        value: 800,
        isAnswered: false,
      },
      {
        question: "Placeholder question 5",
        answer: "Placeholder answer 5",
        value: 1000,
        isAnswered: false,
      },
      {
        question: "Placeholder question 6",
        answer: "Placeholder answer 6",
        value: 1200,
        isAnswered: false,
      },
      {
        question: "Placeholder question 7",
        answer: "Placeholder answer 7",
        value: 1400,
        isAnswered: false,
      },
      {
        question: "Placeholder question 8",
        answer: "Placeholder answer 8",
        value: 1600,
        isAnswered: false,
      },
    ],
  },
  {
    name: "Category 6",
    questions: [
      {
        question: "Placeholder question 1",
        answer: "Placeholder answer 1",
        value: 200,
        isAnswered: false,
      },
      {
        question: "Placeholder question 2",
        answer: "Placeholder answer 2",
        value: 400,
        isAnswered: false,
      },
      {
        question: "Placeholder question 3",
        answer: "Placeholder answer 3",
        value: 600,
        isAnswered: false,
      },
      {
        question: "Placeholder question 4",
        answer: "Placeholder answer 4",
        value: 800,
        isAnswered: false,
      },
      {
        question: "Placeholder question 5",
        answer: "Placeholder answer 5",
        value: 1000,
        isAnswered: false,
      },
      {
        question: "Placeholder question 6",
        answer: "Placeholder answer 6",
        value: 1200,
        isAnswered: false,
      },
      {
        question: "Placeholder question 7",
        answer: "Placeholder answer 7",
        value: 1400,
        isAnswered: false,
      },
      {
        question: "Placeholder question 8",
        answer: "Placeholder answer 8",
        value: 1600,
        isAnswered: false,
      },
    ],
  },
  {
    name: "Category 7",
    questions: [
      {
        question: "Placeholder question 1",
        answer: "Placeholder answer 1",
        value: 200,
        isAnswered: false,
      },
      {
        question: "Placeholder question 2",
        answer: "Placeholder answer 2",
        value: 400,
        isAnswered: false,
      },
      {
        question: "Placeholder question 3",
        answer: "Placeholder answer 3",
        value: 600,
        isAnswered: false,
      },
      {
        question: "Placeholder question 4",
        answer: "Placeholder answer 4",
        value: 800,
        isAnswered: false,
      },
      {
        question: "Placeholder question 5",
        answer: "Placeholder answer 5",
        value: 1000,
        isAnswered: false,
      },
      {
        question: "Placeholder question 6",
        answer: "Placeholder answer 6",
        value: 1200,
        isAnswered: false,
      },
      {
        question: "Placeholder question 7",
        answer: "Placeholder answer 7",
        value: 1400,
        isAnswered: false,
      },
      {
        question: "Placeholder question 8",
        answer: "Placeholder answer 8",
        value: 1600,
        isAnswered: false,
      },
    ],
  },
  {
    name: "Category 8",
    questions: [
      {
        question: "Placeholder question 1",
        answer: "Placeholder answer 1",
        value: 200,
        isAnswered: false,
      },
      {
        question: "Placeholder question 2",
        answer: "Placeholder answer 2",
        value: 400,
        isAnswered: false,
      },
      {
        question: "Placeholder question 3",
        answer: "Placeholder answer 3",
        value: 600,
        isAnswered: false,
      },
      {
        question: "Placeholder question 4",
        answer: "Placeholder answer 4",
        value: 800,
        isAnswered: false,
      },
      {
        question: "Placeholder question 5",
        answer: "Placeholder answer 5",
        value: 1000,
        isAnswered: false,
      },
      {
        question: "Placeholder question 6",
        answer: "Placeholder answer 6",
        value: 1200,
        isAnswered: false,
      },
      {
        question: "Placeholder question 7",
        answer: "Placeholder answer 7",
        value: 1400,
        isAnswered: false,
      },
      {
        question: "Placeholder question 8",
        answer: "Placeholder answer 8",
        value: 1600,
        isAnswered: false,
      },
    ],
  },
];

const JeopardyBoard = () => {
  const [teams, setTeams] = useState<Team[]>([
    { id: 1, name: "Team 1", score: 0 },
    { id: 2, name: "Team 2", score: 0 },
    { id: 3, name: "Team 3", score: 0 },
  ]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<
    number | null
  >(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<
    number | null
  >(null);

  const handleScoreEdit = (teamId: number, newScore: string) => {
    const score = parseInt(newScore) || 0;
    setTeams(
      teams.map((team) => (team.id === teamId ? { ...team, score } : team))
    );
  };

  const handleQuestionClick = (
    question: Question,
    categoryIndex: number,
    questionIndex: number
  ) => {
    if (!question.isAnswered) {
      setSelectedQuestion(question);
      setSelectedCategoryIndex(categoryIndex);
      setSelectedQuestionIndex(questionIndex);
      setShowAnswer(false);
    }
  };

  const handleCorrectAnswer = () => {
    if (!selectedTeam)
      toast({
        variant: "destructive",
        title: "You forgot to select a team!",
      });
    if (selectedQuestion && selectedTeam) {
      setTeams(
        teams.map((team) =>
          team.id === selectedTeam.id
            ? { ...team, score: team.score + selectedQuestion.value }
            : team
        )
      );
      markQuestionAsAnswered();
    }
  };

  const handleWrongAnswer = () => {
    if (selectedQuestion) {
      markQuestionAsAnswered();
    }
  };

  const markQuestionAsAnswered = () => {
    const newCategories = categories.map((category, categoryIndex) => ({
      ...category,
      questions: category.questions.map((q, questionIndex) =>
        categoryIndex === selectedCategoryIndex &&
        questionIndex === selectedQuestionIndex
          ? { ...q, isAnswered: true }
          : q
      ),
    }));
    setCategories(newCategories);
    setSelectedQuestion(null);
  };

  const closeDialog = () => {
    setSelectedQuestion(null);
    setShowAnswer(false);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-[#d69f4c]">Jeopardy!</h1>
        <div className="flex justify-center gap-4 mb-4">
          {teams.map((team) => (
            <div key={team.id} className="flex flex-col items-center gap-2">
              <Button
                variant={selectedTeam?.id === team.id ? "default" : "outline"}
                onClick={() => setSelectedTeam(team)}
                className="min-w-[120px]"
              >
                {team.name}
              </Button>
              <div className="flex items-center gap-2">
                <span>$</span>
                <Input
                  type="number"
                  value={team.score}
                  onChange={(e) => handleScoreEdit(team.id, e.target.value)}
                  className="w-24 text-center"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-8 gap-2">
        {/* Category headers */}
        {categories.map((category, idx) => (
          <Card
            key={idx}
            className="p-2 bg-blue-600 text-white text-center font-bold text-sm bg-[#071277] text-[#d69f4c]"
          >
            {category.name}
          </Card>
        ))}

        {/* Questions grid */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map(
          (
            rowIndex // Updated array to include 8 rows
          ) => (
            <React.Fragment key={rowIndex}>
              {categories.map((category, categoryIndex) => {
                const question = category.questions[rowIndex];
                return (
                  <Button
                    key={`${categoryIndex}-${rowIndex}`}
                    variant={question.isAnswered ? "ghost" : "default"}
                    className={`h-16 text-sm font-bold ${
                      // Reduced height and font size
                      question.isAnswered
                        ? "opacity-50"
                        : "bg-[#071277] hover:bg-blue-600"
                    }`}
                    onClick={() =>
                      handleQuestionClick(question, categoryIndex, rowIndex)
                    }
                    disabled={question.isAnswered}
                  >
                    <h1 className="text-[#d69f4c] text-4xl">
                      ${question.value}
                    </h1>
                  </Button>
                );
              })}
            </React.Fragment>
          )
        )}
      </div>

      {/* Question Dialog */}
      <Dialog open={selectedQuestion !== null} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-center">
              ${selectedQuestion?.value}
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4 p-4">
            <p className="text-lg">{selectedQuestion?.question}</p>
            {showAnswer && (
              <p className="text-lg font-bold text-blue-600">
                {selectedQuestion?.answer}
              </p>
            )}
          </div>
          <DialogFooter className="flex justify-center gap-4">
            {!showAnswer ? (
              <Button onClick={() => setShowAnswer(true)}>Show Answer</Button>
            ) : (
              <>
                <Button variant="destructive" onClick={handleWrongAnswer}>
                  Incorrect
                </Button>
                <Button variant="default" onClick={handleCorrectAnswer}>
                  Correct
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JeopardyBoard;
