namespace DatingApp.Helpers
{
    public class PaginationHeader
    {
        public PaginationHeader(int pageNumber, int totalPages, int itemsPerPage, int totalItems)
        {
            this.pageNumber = pageNumber;
            TotalPages = totalPages;
            ItemsPerPage = itemsPerPage;
            TotalItems = totalItems;
        }

        public int pageNumber { get; set; }
        public int TotalPages { get; set; }
        public int ItemsPerPage { get; set; }
        public int TotalItems { get; set; }
    }
}
