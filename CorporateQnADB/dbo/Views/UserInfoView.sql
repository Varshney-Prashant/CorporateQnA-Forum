CREATE VIEW [dbo].[UserInfoView]
AS
SELECT
Id,
FullName,
ImageUrl,
Designation,
Company,
NoOfLikes,
NoOfDislikes,
QuestionsAsked,
QuestionsAnswered,
QuestionsSolved FROM AspNetUsers AS Users
CROSS APPLY GetUserActivity(Users.Id) AS UserActivity
