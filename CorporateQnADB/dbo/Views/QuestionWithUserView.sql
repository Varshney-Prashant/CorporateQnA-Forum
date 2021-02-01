CREATE VIEW [dbo].[QuestionWithUserView]
AS
SELECT
Questions.Id AS QuestionId,
Questions.Title AS Title,
Questions.Description AS Description,
Questions.Status AS Status,
Questions.PostingTime AS PostingTime,
Questions.AnswersCount AS AnswersCount,
AspNetUsers.FullName As UserFullName,
AspNetUsers.ImageUrl AS ImageUrl,
Questions.CategoryId AS CategoryId,
Questions.UserId As UserId
FROM Questions
INNER JOIN AspNetUsers on Questions.UserId=AspNetUsers.Id
WHERE Questions.IsDeleted=0
