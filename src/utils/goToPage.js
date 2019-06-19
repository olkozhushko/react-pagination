function goToPage(page, state, pageLimit) {
    const currentPage = Math.max(1, Math.min(page, state.totalPages));

    const offset = (currentPage - 1) * pageLimit;

    const currentCountries = state.allCountries.slice(offset, offset + pageLimit);
    console.log({
        ...state,
        currentCountries,
        currentPage
    });
    return {
        ...state,
        currentCountries,
        currentPage
    }
}

export default goToPage;