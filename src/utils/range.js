function range(start, end, step = 1) {

    let arr = [];

    for(let i = start; i <= end; i += step ) {
        arr.push(i);
    }

    return arr;
}

export default range;