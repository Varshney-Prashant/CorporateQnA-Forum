CREATE VIEW [dbo].[AnswerWithUserView]
AS
SELECT
Answers.Id AS AnswerId,
Answers.Content AS Content,
Employees.FullName AS UserFullName,
Answers.NoOfLikes AS NoOfLikes,
Answers.NoOfDislikes AS NoOfDislikes,
Answers.PostingTime AS PostingTime,
Answers.BestAnswer AS BestAnswer,
Employees.ImageUrl AS ImageUrl,
Answers.QuestionId AS QuestionId,
Answers.UserId AS UserId
FROM Answers
INNER JOIN Employees ON Answers.UserId=Employees.Id
WHERE Answers.IsDeleted=0
