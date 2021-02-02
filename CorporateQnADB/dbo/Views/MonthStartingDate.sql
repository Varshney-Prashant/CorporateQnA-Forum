CREATE VIEW [dbo].[MonthStartingDate]
AS
SELECT 
DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0) AS StartOfMonth;
