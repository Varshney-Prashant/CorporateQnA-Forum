// This file was automatically generated by the PetaPoco T4 Template
// Do not make changes directly to this file - edit the template instead
// 
// The following connection settings were used to generate this file
// 
//     Connection String Name: `CorporateQNA`
//     Provider:               `System.Data.SqlClient`
//     Connection String:      `Server=LAPTOP-KDRM4ASL\PRASHANT;Database=CorporateQNA;Trusted_Connection=True;MultipleActiveResultSets=true`
//     Schema:                 ``
//     Include Views:          `False`



using System;
using System.Collections.Generic;
using PetaPoco;

namespace CorporateQnAModels.Models.DataModels
{

	public partial class CorporateQNADB : Database
	{
		public CorporateQNADB() 
			: base("CorporateQNA")
		{
			CommonConstruct();
		}

		public CorporateQNADB(string connectionStringName) 
			: base(connectionStringName)
		{
			CommonConstruct();
		}
		
		partial void CommonConstruct();
		
		public interface IFactory
		{
			CorporateQNADB GetInstance();
		}
		
		public static IFactory Factory { get; set; }
        public static CorporateQNADB GetInstance()
        {
			if (_instance!=null)
				return _instance;
				
			if (Factory!=null)
				return Factory.GetInstance();
			else
				return new CorporateQNADB();
        }

		[ThreadStatic] static CorporateQNADB _instance;
		
		public override void OnBeginTransaction()
		{
			if (_instance==null)
				_instance=this;
		}
		
		public override void OnEndTransaction()
		{
			if (_instance==this)
				_instance=null;
		}
        

		public class Record<T> where T:new()
		{
			public static CorporateQNADB repo { get { return CorporateQNADB.GetInstance(); } }
			public bool IsNew() { return repo.IsNew(this); }
			public object Insert() { return repo.Insert(this); }

			public void Save() { repo.Save(this); }
			public int Update() { return repo.Update(this); }

			public int Update(IEnumerable<string> columns) { return repo.Update(this, columns); }
			public static int Update(string sql, params object[] args) { return repo.Update<T>(sql, args); }
			public static int Update(Sql sql) { return repo.Update<T>(sql); }
			public int Delete() { return repo.Delete(this); }
			public static int Delete(string sql, params object[] args) { return repo.Delete<T>(sql, args); }
			public static int Delete(Sql sql) { return repo.Delete<T>(sql); }
			public static int Delete(object primaryKey) { return repo.Delete<T>(primaryKey); }
			public static bool Exists(object primaryKey) { return repo.Exists<T>(primaryKey); }
			public static bool Exists(string sql, params object[] args) { return repo.Exists<T>(sql, args); }
			public static T SingleOrDefault(object primaryKey) { return repo.SingleOrDefault<T>(primaryKey); }
			public static T SingleOrDefault(string sql, params object[] args) { return repo.SingleOrDefault<T>(sql, args); }
			public static T SingleOrDefault(Sql sql) { return repo.SingleOrDefault<T>(sql); }
			public static T FirstOrDefault(string sql, params object[] args) { return repo.FirstOrDefault<T>(sql, args); }
			public static T FirstOrDefault(Sql sql) { return repo.FirstOrDefault<T>(sql); }
			public static T Single(object primaryKey) { return repo.Single<T>(primaryKey); }
			public static T Single(string sql, params object[] args) { return repo.Single<T>(sql, args); }
			public static T Single(Sql sql) { return repo.Single<T>(sql); }
			public static T First(string sql, params object[] args) { return repo.First<T>(sql, args); }
			public static T First(Sql sql) { return repo.First<T>(sql); }
			public static List<T> Fetch(string sql, params object[] args) { return repo.Fetch<T>(sql, args); }
			public static List<T> Fetch(Sql sql) { return repo.Fetch<T>(sql); }
			public static List<T> Fetch(long page, long itemsPerPage, string sql, params object[] args) { return repo.Fetch<T>(page, itemsPerPage, sql, args); }
			public static List<T> Fetch(long page, long itemsPerPage, Sql sql) { return repo.Fetch<T>(page, itemsPerPage, sql); }
			public static List<T> SkipTake(long skip, long take, string sql, params object[] args) { return repo.SkipTake<T>(skip, take, sql, args); }
			public static List<T> SkipTake(long skip, long take, Sql sql) { return repo.SkipTake<T>(skip, take, sql); }
			public static Page<T> Page(long page, long itemsPerPage, string sql, params object[] args) { return repo.Page<T>(page, itemsPerPage, sql, args); }
			public static Page<T> Page(long page, long itemsPerPage, Sql sql) { return repo.Page<T>(page, itemsPerPage, sql); }
			public static IEnumerable<T> Query(string sql, params object[] args) { return repo.Query<T>(sql, args); }
			public static IEnumerable<T> Query(Sql sql) { return repo.Query<T>(sql); }

		}

	}
	

	[TableName("dbo.Answers")]
	[PrimaryKey("Id")]

    public partial class Answer : CorporateQNADB.Record<Answer>  
    {
		public int Id { get; set; }
		public string Content { get; set; }
		public int NoOfLikes { get; set; }
		public int NoOfDislikes { get; set; }
		public DateTime PostingTime { get; set; }
		public bool BestAnswer { get; set; }
		public int QuestionId { get; set; }
		public string UserId { get; set; }
		public bool IsDeleted { get; set; }
		public DateTime? DateDeleted { get; set; }

	}

    

	[TableName("dbo.AspNetUsers")]
	[PrimaryKey("Id", AutoIncrement=false)]

    public partial class AspNetUser : CorporateQNADB.Record<AspNetUser>  
    {
		public string Id { get; set; }
		public string FullName { get; set; }
		public string Designation { get; set; }
		public string Company { get; set; }
		public string ImageUrl { get; set; }
		public int NoOfLikes { get; set; }
		public int NoOfDislikes { get; set; }
		public string Email { get; set; }
		public bool EmailConfirmed { get; set; }
		public string PasswordHash { get; set; }
		public string SecurityStamp { get; set; }
		public string PhoneNumber { get; set; }
		public bool PhoneNumberConfirmed { get; set; }
		public bool TwoFactorEnabled { get; set; }
		public DateTime? LockoutEndDateUtc { get; set; }
		public bool LockoutEnabled { get; set; }
		public int AccessFailedCount { get; set; }
		public string UserName { get; set; }

	}

    

	[TableName("dbo.Categories")]
	[PrimaryKey("Id")]

    public partial class Category : CorporateQNADB.Record<Category>  
    {
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public bool IsDeleted { get; set; }
		public DateTime? DateDeleted { get; set; }

	}

    

	[TableName("dbo.Questions")]
	[PrimaryKey("Id")]

    public partial class Question : CorporateQNADB.Record<Question>  
    {
		public int Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public short Status { get; set; }
		public DateTime PostingTime { get; set; }
		public int AnswersCount { get; set; }
		public string UserId { get; set; }
		public int CategoryId { get; set; }
		public bool IsDeleted { get; set; }
		public DateTime? DateDeleted { get; set; }
	}

	[TableName("dbo.QuestionActivities")]
	[PrimaryKey("Id")]
	public class QuestionActivity: CorporateQNADB.Record<QuestionActivity>
	{
		public int Id { get; set; }
		public int QuestionId { get; set; }
		public int ViewCount { get; set; }
		public int UpVotes { get; set; }
		public bool IsDeleted { get; set; }
		public DateTime? DateDeleted { get; set; }
	}

	[TableName("dbo.Employees")]
	public class Employee
	{
		public string Id { get; set; }
		public string FullName { get; set; }
		public string Designation { get; set; }
		public string Company { get; set; }
		public string ImageUrl { get; set; }
		public int NoOfLikes { get; set; }
		public int NoOfDislikes { get; set; }
		public bool IsDeleted { get; set; }
		public DateTime? DateDeleted { get; set; }
	}

	public class QuestionWithUserViewModel
	{
		public int QuestionId { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public string UserFullName { get; set; }
		public string ImageUrl { get; set; }
		public short Status { get; set; }
		public int ViewCount { get; set; }
		public int UpVotes { get; set; }
		public DateTime PostingTime { get; set; }
		public int AnswersCount { get; set; }
		public int ActivityId { get; set; }
		public int CategoryId { get; set; }
		public string UserId { get; set; }

	}

	public class AnswerWithUserViewModel
	{
		public int AnswerId { get; set; }
		public string Content { get; set; }
		public string UserFullName { get; set; }
		public int NoOfLikes { get; set; }
		public int NoOfDislikes { get; set; }
		public string ImageUrl { get; set; }
		public DateTime PostingTime { get; set; }
		public bool BestAnswer { get; set; }
		public int QuestionId { get; set; }
		public string UserId { get; set; }
	}

	public class CategoryViewModel
    {
		public int CategoryId { get; set; }
		public string CategoryName { get; set; }
		public string CategoryDescription { get; set; }
		public int TotalTags { get; set; }
		public int WeekTags { get; set; }
		public int MonthTags { get; set; }
	}

	public class UserInfoViewModel
	{
		public string Id { get; set; }
		public string FullName { get; set; }
		public string ImageUrl { get; set; }
		public string Designation { get; set; }
		public string Company { get; set; }
		public int NoOfLikes { get; set; }
		public int NoOfDislikes { get; set; }
		public int QuestionsAsked { get; set; }
		public int QuestionsAnswered { get; set; }
		public int QuestionsSolved { get; set; }

	}



}
