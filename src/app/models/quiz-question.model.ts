import { QuizAnswer } from "./quiz-answer.model";

/* export type QuizQuestion = 
{
    question : string;
    answers : QuizAnswer[];
} */

  export class QuizQuestion 
 {
     question!: string;
     answers!: QuizAnswer[];

     constructor(question : string, correctAnswer : string, wrongAnswers : string[]) 
     {
        this.question = question
        // put all the answers, wrong and correct, in the answers array
        this.answers = wrongAnswers.map((x) =>{ return new QuizAnswer(x,false)}).concat(new QuizAnswer(correctAnswer,true))
        // now shuffle the answers        
        QuizQuestion.fisherYates(this.answers) 
     }

     static fisherYates( array : QuizAnswer[])
     {
        var count = array.length,
            randomnumber,
            temp;
        while( count ){
         randomnumber = Math.random() * count-- | 0;
         temp = array[count];
         array[count] = array[randomnumber];
         array[randomnumber] = temp
        }
    }
 } 