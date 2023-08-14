export class PlayerQuestion
{
    question!: string
    answers!: string[]

    // questions the player will see on screen; the text isn't parsed correctly so it will be fixed here
    constructor(question : string, answers : string[])
    {
        this.question = PlayerQuestion.decodeEntities(question)
        this.answers = answers.map(value => PlayerQuestion.decodeEntities(value))
    }


    // Workaround for incorrect parsing of strings
    static decodeEntities(encodedString : string) : string {
        var textArea = document.createElement('textarea');
        textArea.innerHTML = encodedString;
        return textArea.value;
      }
}