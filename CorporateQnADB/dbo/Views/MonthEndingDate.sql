CREATE VIEW [dbo].[MonthEndingDate]
AS
SELECT
DATEADD(d, -1, DATEADD(m, DATEDIFF(m, 0,GETDATE() ) + 1, 0)) As EndOfMonth;
