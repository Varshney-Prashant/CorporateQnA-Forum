CREATE VIEW [dbo].[WeekCategoryTags]
AS
SELECT Categories.Id AS CategoryId,
CASE
	WHEN WeekTagsTable.WeekTag IS NULL Then 0
	ELSE WeekTagsTable.WeekTag
END AS WeekTags
from Categories
left join( SELECT CategoryId, count(*) AS WeekTag from Questions q
where q.PostingTime>=(SELECT * FROM WeekStartingDate)
and q.PostingTime<=(SELECT * FROM WeekEndingDate)
group by CategoryId)
as WeekTagsTable on Categories.Id=WeekTagsTable.CategoryId
