CREATE TABLE [dbo].[Answers] (
    [Id]           INT            IDENTITY (1, 1) NOT NULL,
    [Content]      NVARCHAR (MAX) NOT NULL,
    [NoOfLikes]    INT            CONSTRAINT [DF_Answers_NoOfLikes] DEFAULT ((0)) NOT NULL,
    [NoOfDislikes] INT            CONSTRAINT [DF_Answers_NoOfDislikes] DEFAULT ((0)) NOT NULL,
    [PostingTime]  DATETIME       NOT NULL,
    [BestAnswer]   BIT            NOT NULL DEFAULT 0,
    [QuestionId]   INT            NOT NULL,
    [UserId]       NVARCHAR (450) NOT NULL,
    [IsDeleted]    BIT            CONSTRAINT [DF_Answers_IsDeleted] DEFAULT ((0)) NOT NULL,
    [DateDeleted]  DATETIME       NULL, 
    CONSTRAINT [PK_Answers] PRIMARY KEY CLUSTERED ([Id] ASC)
);

