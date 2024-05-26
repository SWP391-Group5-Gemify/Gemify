﻿using System.Linq.Expressions;

namespace Core.Specifications
{
    /// <summary>
    /// Implementation of ISpecification<T>
    /// Base specification for entities, including sorting, paging and other criterias.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class BaseSpecification<T> : ISpecification<T>
    {
        public BaseSpecification() { }

        /// <summary>
        /// Passes the criteria to construct a specification with specific conditions.
        /// </summary>
        /// <param name="criteria"></param>
        public BaseSpecification(Expression<Func<T, bool>> criteria) 
        {
            Criteria = criteria;
        }

        /// <summary>
        /// The conditions or criteria to get an entity or entities.
        /// </summary>
        public Expression<Func<T, bool>> Criteria { get; }

        /// <summary>
        /// The list of Includes expressions that an entity includes the related entities 
        /// through navigation properties.
        /// </summary>
        public List<Expression<Func<T, object>>> Includes { get; } = new List<Expression<Func<T, object>>>();

        /// <summary>
        /// Used for sorting ascendingly
        /// </summary>
        public Expression<Func<T, object>> OrderBy { get; private set; }

        /// <summary>
        /// Used for sorting descendingly
        /// </summary>
        public Expression<Func<T, object>> OrderByDescending { get; private set; }

        /// <summary>
        /// The number of items in a page.
        /// </summary>
        public int Take { get; private set; }

        /// <summary>
        /// The number of items to skip to get to a page.
        /// </summary>
        public int Skip { get; private set; }

        /// <summary>
        /// Allows or prevents an entity to have pagination.
        /// </summary>
        public bool IsPagingEnabled { get; private set; }

        /// <summary>
        /// Adds Include expression to the Includes list
        /// </summary>
        /// <param name="includeExpression"></param>
        protected void AddInclude(Expression<Func<T, object>> includeExpression)
        {
            Includes.Add(includeExpression);
        }

        /// <summary>
        /// Assigns the sorting ascendingly expression to the OrderBy property.
        /// </summary>
        /// <param name="orderByExpression"></param>
        protected void AddOrderBy(Expression<Func<T, object>> orderByExpression)
        {
            OrderBy = orderByExpression;
        }

        /// <summary>
        /// Assigns the sorting descendingly expression to the OrderByDescending property.
        /// </summary>
        /// <param name="orderByDescExpression"></param>
        protected void AddOrderByDescending(Expression<Func<T, object>> orderByDescExpression)
        {
            OrderByDescending = orderByDescExpression;
        }

        /// <summary>
        /// Applies paging to the entity.
        /// The skip params skips a specified number of items to get to a page (PageSize * (PageIndex - 1)).
        /// The take params takes a specified number of items in a page (Page Size).
        /// </summary>
        /// <param name="skip"></param>
        /// <param name="take"></param>
        protected void ApplyPaging(int skip, int take)
        {
            Skip = skip;
            Take = take;
            IsPagingEnabled = true;
        }
    }
}
