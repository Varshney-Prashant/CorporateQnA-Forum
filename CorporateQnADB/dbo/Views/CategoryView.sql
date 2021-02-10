CREATE VIEW [dbo].[CategoryView]
AS
SELECT
Categories.Id AS CategoryId,
Categories.Name AS CategoryName,
Categories.Description AS CategoryDescription,
tct.TotalTags AS TotalTags,
tct.MonthTags AS MonthTags,
tct.WeekTags AS WeekTags
FROM Categories
JOIN TotalCategoryTags tct ON Categories.Id=tct.CategoryId
WHERE Categories.IsDeleted=0
