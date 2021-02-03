CREATE VIEW [dbo].[AnswerWithUserView]
AS
SELECT
Answers.Id AS AnswerId,
Answers.Description AS Description,
AspNetUsers.FullName AS UserFullName,
Answers.NoOfLikes AS NoOfLikes,
Answers.NoOfDislikes AS NoOfDislikes,
Answers.PostingTime AS PostingTime,
Answers.BestAnswer AS BestAnswer,
AspNetUsers.ImageUrl AS ImageUrl,
Answers.QuestionId AS QuestionId,
Answers.UserId AS UserId
FROM Answers
INNER JOIN AspNetUsers ON Answers.UserId=AspNetUsers.Id
WHERE Answers.IsDeleted=0
