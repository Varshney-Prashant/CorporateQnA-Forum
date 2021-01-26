CREATE TABLE [dbo].[Categories] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Name]        NVARCHAR (50)  NOT NULL,
    [Description] NVARCHAR (MAX) NOT NULL,
    [IsDeleted]   BIT            CONSTRAINT [DF_Categories_IsDeleted] DEFAULT ((0)) NOT NULL,
    [DateDeleted] DATETIME       NULL,
    CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED ([Id] ASC)
);

