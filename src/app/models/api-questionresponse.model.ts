import { apiQuestion } from "./api-question.model";

export interface apiQuestionResponse
{
  response_code: number;
  results: apiQuestion[];
}

