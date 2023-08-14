import { Difficulty } from "./difficulty.model";
import { QuizType } from "./quiz-type.model";

export interface apiQuestion
{
    category : string,
    // type: QuizType,
    // difficulty: Difficulty,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}


