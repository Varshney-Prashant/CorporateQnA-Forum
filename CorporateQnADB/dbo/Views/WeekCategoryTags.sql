CREATE VIEW [dbo].[WeekCategoryTags]
AS
SELECT Categories.Id AS CategoryId,
CASE
	WHEN WeekTagsTable.WeekTag IS NULL THEN 0
	ELSE WeekTagsTable.WeekTag
END AS WeekTags
FROM Categories
LEFT JOIN( SELECT CategoryId, COUNT(*) AS WeekTag FROM Questions q
WHERE q.PostingTime>=(SELECT * FROM WeekStartingDate)
AND q.PostingTime<=(SELECT * FROM WeekEndingDate)
GROUP BY CategoryId)
AS WeekTagsTable ON Categories.Id=WeekTagsTable.CategoryId
