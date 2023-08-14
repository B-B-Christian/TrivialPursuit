/* export type QuizAnswer = 
{
    value : string;
    isCorrect : boolean;
} */
export class QuizAnswer  
{
    answer : string;
    isCorrect : boolean;

    constructor(value : string, isCorrect : boolean)
    {
        this.answer = value
        this.isCorrect = isCorrect
    }
}