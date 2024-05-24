using Core.Enitities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    /// <summary>
    /// This interface defines the Unit Of Work (UoW) pattern for data access. 
    /// It provides methods for managing a transaction scope, 
    /// interacting with repositories, and ensuring proper resource disposal.
    /// </summary>
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<T> Repository<T>() where T : BaseEntity;
        Task<int> Complete();
    }
}
