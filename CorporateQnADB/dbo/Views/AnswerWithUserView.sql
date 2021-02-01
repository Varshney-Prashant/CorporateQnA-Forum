CREATE VIEW [dbo].[AnswerWithUserView]
AS
SELECT
Answers.Id AS AnswerId,
Answers.Description As Description,
AspNetUsers.FullName As UserFullName,
Answers.NoOfLikes As NoOfLikes,
Answers.NoOfDislikes AS NoOfDislikes,
Answers.PostingTime AS PostingTime,
Answers.BestAnswer AS BestAnswer,
AspNetUsers.ImageUrl AS ImageUrl,
Answers.QuestionId As QuestionId,
Answers.UserId As UserId
from Answers
INNER JOIN AspNetUsers ON Answers.UserId=AspNetUsers.Id
WHERE Answers.IsDeleted=0
