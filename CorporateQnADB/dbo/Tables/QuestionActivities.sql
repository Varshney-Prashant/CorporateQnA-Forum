CREATE TABLE [dbo].[QuestionActivities]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [QuestionId] INT NOT NULL, 
    [ViewCount] INT NOT NULL, 
    [UpVotes] INT NOT NULL, 
    [IsDeleted] BIT NOT NULL, 
    [DateDeleted] DATETIME NULL
)
