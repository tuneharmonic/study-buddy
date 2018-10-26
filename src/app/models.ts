export class Question {
    private correctAnswerId : number;
    public id : number;
    public question : string;
    public answers : Answer[];
    public selectedAnswerId : number;

    constructor(id: number, question: string, answers: Answer[], correctId: number) {
        this.id = id;
        this.question = question;
        this.answers = answers;
        this.correctAnswerId = correctId;
    }

    public answer(answerId : number) : boolean {
        this.selectedAnswerId = answerId;
        return this.checkCorrect();
    }

    public checkCorrect(answerId: number = 0) : boolean {
        answerId = answerId || this.selectedAnswerId;
        return answerId == this.correctAnswerId;
    }
}

export class Answer {
    public id : number;
    public answer : string;

    constructor(id: number, answer: string) {
        this.id = id;
        this.answer = answer;
    }
}

export enum QuizState {
    Quiz,
    ShowScore,
    ShowAnswers
}