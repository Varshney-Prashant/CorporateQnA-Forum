CREATE VIEW [dbo].[MonthCategoryTags]
AS
SELECT Categories.Id AS CategoryId,
CASE
	WHEN MonthTagsTable.MonthTag IS NULL THEN 0
	ELSE MonthTagsTable.MonthTag
END AS MonthTags
FROM Categories
LEFT JOIN ( SELECT CategoryId, COUNT(*) AS MonthTag FROM Questions 
WHERE Questions.PostingTime>=(SELECT * FROM MonthStartingDate)
AND Questions.PostingTime<=(SELECT * FROM MonthEndingDate)
GROUP BY CategoryId) AS MonthTagsTable
ON Categories.Id=MonthTagsTable.CategoryId
