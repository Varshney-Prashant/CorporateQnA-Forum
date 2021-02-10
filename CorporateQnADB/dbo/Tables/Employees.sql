CREATE TABLE [dbo].[Employees]
(
	[Id] NVARCHAR(450) NOT NULL PRIMARY KEY, 
    [FullName] NVARCHAR(MAX) NOT NULL, 
    [Designation] NVARCHAR(MAX) NOT NULL, 
    [Company] NVARCHAR(MAX) NOT NULL, 
    [ImageUrl] NVARCHAR(MAX) NOT NULL, 
    [NoOfLikes] INT NOT NULL DEFAULT 0, 
    [NoOfDislikes] INT NOT NULL DEFAULT 0, 
    [IsDeleted] BIT NOT NULL DEFAULT 0, 
    [DateDeleted] DATETIME NULL
)
