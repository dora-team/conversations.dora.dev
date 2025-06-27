import questions_raw from "../assets/questions.txt?raw";
import survey_questions_raw from "../assets/survey-questions.txt?raw";

export const questionsUnrandomized = questions_raw
  .split("\n")
  .filter((e) => e) // filter out any blank questions (blank lines in questions.txt)
  .map((question_text) => {
    return { question_text, hash: hash(question_text) };
  })
  .sort((a, b) => a.question_text.localeCompare(b.question_text));

export const surveyQuestionsUnrandomized = survey_questions_raw
  .split("\n")
  .filter((e) => e) // filter out any blank questions (blank lines in questions.txt)
  .map((question_text) => {
    return { question_text, hash: hash(question_text) };
  })
  .sort((a, b) => a.question_text.localeCompare(b.question_text));

export function hash(s) {
  const hash = Array.from(s).reduce((hash, char) => {
    const result = (hash << 5) - hash + char.charCodeAt(0);
    return result & result;
  }, 0);
  return Math.abs(hash).toString(24);
}
