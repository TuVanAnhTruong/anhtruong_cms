/*
 * Ho va ten: Tu Van Anh Truong
 * Mssv: 2123110486
 * Ngay tao: 22/05/2026
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS.Data.Entities
{
        public class Category
        {
            public int Id { get; set; }
            public required string Name { get; set; } // Tên danh mục (vd: Tin Giáo Dục)
            public string Description { get; set; }

            // Quan hệ: Một danh mục có nhiều bài viết
            public virtual ICollection<Post> Posts { get; set; }
        }
}
