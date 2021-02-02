CREATE VIEW [dbo].[TotalCategoryTags]
AS
SELECT Categories.Id AS CategoryId,
CASE
	WHEN tt.TotalTag IS NULL THEN 0
	ELSE tt.TotalTag
END AS TotalTags,
wt.WeekTags,
mt.MonthTags
FROM Categories
LEFT JOIN (SELECT CategoryId, COUNT(*) AS TotalTag FROM Questions
GROUP BY CategoryId) AS tt 
ON Categories.Id=tt.CategoryId
JOIN WeekCategoryTags wt ON wt.CategoryId=Categories.Id
JOIN MonthCategoryTags mt ON mt.CategoryId=Categories.Id
