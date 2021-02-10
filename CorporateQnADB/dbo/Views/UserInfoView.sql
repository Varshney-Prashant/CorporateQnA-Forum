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
QuestionsSolved FROM Employees AS Employees
CROSS APPLY GetUserActivity(Employees.Id) AS UserActivity
