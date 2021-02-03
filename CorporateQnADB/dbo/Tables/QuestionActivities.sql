CREATE TABLE [dbo].[QuestionActivities]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [QuestionId] INT NOT NULL, 
    [ViewCount] INT NOT NULL DEFAULT 0, 
    [UpVotes] INT NOT NULL DEFAULT 0, 
    [IsDeleted] BIT NOT NULL, 
    [DateDeleted] DATETIME NULL
)
