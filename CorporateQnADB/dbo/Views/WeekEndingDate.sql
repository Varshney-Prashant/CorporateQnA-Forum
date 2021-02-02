CREATE VIEW [dbo].[WeekEndingDate]
AS
SELECT 
DATEADD(week, DATEDIFF(week, 6, GETDATE()), 6 + 7) as Date;
