CREATE FUNCTION GetUserActivity
(
	@UserId NVarchar(450)
)
RETURNS @Counts TABLE
(
	UserId nvarchar(450),
	QuestionsAsked INT,
	QuestionsAnswered INT,
	QuestionsSolved INT
)
AS
BEGIN
	DECLARE @questionsAnswered INT
	DECLARE @questionsAsked INT
	DECLARE @questionsSolved INT
	INSERT INTO @Counts(UserId) VALUES (@UserId)

	SELECT @questionsAnswered = COUNT(Answers.Id) 
								FROM Answers 
								FULL JOIN AspNetUsers
								ON Answers.UserId=AspNetUsers.Id
								WHERE userId=@UserId
								AND Answers.IsDeleted=0
	SELECT @questionsAsked =    COUNT(Questions.Id) 
								FROM Questions
								FULL JOIN AspNetUsers
								ON Questions.UserId=AspNetUsers.Id
								WHERE userId=@UserId 
								AND Questions.IsDeleted=0
	SELECT @questionsSolved =   COUNT(Questions.Id)
								FROM Questions 
								INNER JOIN AspNetUsers 
								ON Questions.UserId = AspNetUsers.Id 
								WHERE UserId=@UserId
								AND Status=1 AND Questions.IsDeleted=0

	UPDATE @Counts 
	SET
	QuestionsAsked=@questionsAsked,
	QuestionsAnswered=@questionsAnswered,
	QuestionsSolved=@questionsSolved
RETURN
END
