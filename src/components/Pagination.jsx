/* eslint-disable react/prop-types */
export const Pagination = ({total, limit, skip, onChange}) => {
    const totalPages = Math.ceil(total / limit);
    const currentPage = Math.floor(skip / limit) + 1;

    const handleChange = (page) => {
        const itemsToSkip = (page - 1) * limit;
        onChange(itemsToSkip)
    }

    return <div className="paginationClass">

        <div>
            <button 
            onClick={() => handleChange(currentPage - 1)}
            disabled={currentPage === 1}
            >Previous</button>

            <button 
            onClick={() => handleChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            >Next</button>
        </div>

        <span>Page {currentPage} of {totalPages}</span>
    </div>
}