
"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

// types questons

type typeQuestion={
    question:string;
    correct_answer:string;
    incorrect_answers:string[]
}

// correct ans
type answers={
    correct_answer:string 
}

const QuizApp = () => {
//   managing states
  const [questions , setQuestions] =useState<typeQuestion[]>([]);
  const [answers , setAnswers] =useState<answers[]>([])

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

//    fetching questions from api
    console.log(questions && questions.length ," length of questions array")
    useEffect(() => {
        const getQuestions = async () => {
            try {
                const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                if (data.results && data.results.length > 0) {
                    setQuestions(data.results);
                    const correctAnswers = data.results.map((question:any) => question.correct_answer);
                    setAnswers(correctAnswers);
                } else {
                    console.log("No questions found");
                }
            } catch (error) {
                console.log("Failed to fetch data from API:", error);
            }finally{
                if(selectedOption == questions.length ){
                    getQuestions();
                }
            }
        };

        getQuestions();
    }, []);
   
    // console.log(answers ,"correct answere is checking")

    const handleOptionClick = (option:any) => {
        setSelectedOption(option);
        if (option === questions[currentQuestionIndex].correct_answer) {
          setScore(score + 1);
        }
      };

    //   
    const handleNext = () => {
        setSelectedOption(null);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      };
    
//     handel next btn 
const currentQuestion = questions[currentQuestionIndex];


const handleTryAgain = () => {
  setCurrentQuestionIndex(0);
  setScore(0);
  setSelectedOption(null);
  // Optionally reset any other state related to the quiz
  // fetchQuestions(); // If you want to fetch new questions
};

    //   console.log(questions  ,"fetching questions from api")
    return (
        <div className="flex justify-center h-screen items-center">
          <div className="min-h-[200px] max-w-[500px] w-full">
            <Card>
              <CardHeader>
                <CardTitle className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                  Quiz App
                </CardTitle>
                <CardDescription className="scroll-m-20 border-b pb-2 text-base font-medium tracking-tight first:mt-0">
                  A quiz app clone which has all the features of a quiz app
                </CardDescription>
              </CardHeader>
              {currentQuestion && (
                <div className="block">
                  <CardContent>
                    <p className="p-2 text-base">
                      Q:<span className="ml-1 mr-1">{currentQuestionIndex + 1}</span>{currentQuestion.question}?
                    </p>
                    {[...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
                    //   .sort(() => Math.random() - 0.5)
                      .map((option) => (
                        <li
                          key={option}
                          className={`border border-spacing-1 p-2 mb-2 text-base cursor-pointer ${
                            selectedOption
                              ? option === currentQuestion.correct_answer
                                ? 'bg-green-500 text-white'
                                : option === selectedOption
                                ? 'bg-red-500 text-white'
                                : ''
                              : ''
                          }`}
                          onClick={() => handleOptionClick(option)}
                        >
                          {option}
                        </li>
                      ))}
                  </CardContent>
                  <CardFooter className="flex-col">
                    <div className="flex justify-between items-center space-x-12">
                      <p className="text-base font-medium">
                        Result: Your score is {score} / {questions.length}
                      </p>
                      {currentQuestionIndex + 1 < questions.length ? (
                        <Button
                          variant={'outline'}
                          className="bg-black text-white"
                          onClick={handleNext}
                          disabled={!selectedOption} // Disable button if no option is selected
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          variant={'outline'}
                          className="bg-black text-white"
                          onClick={handleTryAgain}
                        >
                          Try Again
                        </Button>
                      )}
                    </div>
                    <div className="h-[0.10rem] w-full mt-2 bg-black"></div>
                  </CardFooter>
                </div>
              )}
            </Card>
          </div>
        </div>
      );
      
   
      
};

export default QuizApp;
