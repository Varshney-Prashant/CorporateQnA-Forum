CREATE TABLE [dbo].[Questions] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Title]       NVARCHAR (MAX) NOT NULL,
    [Description] NVARCHAR (MAX) NOT NULL,
    [Status]      SMALLINT       NOT NULL,
    [PostingTime] DATETIME       NOT NULL,
    [UserId]      NVARCHAR (450) NOT NULL,
    [CategoryId]  INT            NOT NULL,
    [IsDeleted]   BIT            CONSTRAINT [DF_Questions_IsDeleted] DEFAULT ((0)) NOT NULL,
    [DateDeleted] DATETIME       NULL,
    CONSTRAINT [PK_Questions] PRIMARY KEY CLUSTERED ([Id] ASC)
);

