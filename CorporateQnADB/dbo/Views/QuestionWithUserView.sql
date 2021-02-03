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
Questions.UserId AS UserId,
QuestionActivities.Id AS ActivityId,
QuestionActivities.ViewCount AS ViewCount,
QuestionACtivities.UpVotes As UpVotes
FROM Questions
INNER JOIN AspNetUsers ON Questions.UserId=AspNetUsers.Id
INNER JOIN QuestionActivities ON Questions.Id=QuestionActivities.QuestionId AND QuestionActivities.IsDeleted=0
WHERE Questions.IsDeleted=0
