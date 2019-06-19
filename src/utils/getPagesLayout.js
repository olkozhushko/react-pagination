import range from "./range";

function getPagesLayout({
    currentPage = 1, 
    pageLimit = 30, 
    pageNeighbours = 1, 
    totalRecord=0}) {
  
  const totalPages = Math.ceil(totalRecord / pageLimit);
  
  const totalNumbers = (pageNeighbours * 2) + 3;
  const totalBlocks = totalNumbers + 2;

  if(totalBlocks < totalPages) {

    const leftBound = currentPage - pageNeighbours;
    const rightBound = currentPage + pageNeighbours;
    const beforeLastPage = totalPages - 1;

    const startPage = Math.max(2, leftBound);
    const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;
 
    let pages = range(startPage, endPage);

    console.log(`pages ${pages}`);

    const pagOffset = totalNumbers - pages.length - 1;

    console.log(`pagOffset ${pagOffset}`);

    const hasSpillLeft = startPage > 2;
    const hasSpillRight = endPage < beforeLastPage;

    if(hasSpillLeft && !hasSpillRight) {
        const extraPages = range(startPage - pagOffset, startPage - 1);
        pages = ["Left", ...extraPages, ...pages];
    }
    if(!hasSpillLeft && hasSpillRight) {
        const extraPages = range(endPage + 1, endPage + pagOffset);
        pages = [...pages, ...extraPages, "Right"];
    } 
    if(hasSpillLeft && hasSpillRight) {
        pages = ["Left", ...pages, "Right"];
    }

    return [1, ...pages, totalPages];
  }
  return [...range(1, totalPages)];
}

export default getPagesLayout;