/*
function* iter_range(begin,end,step) {
	// Normalize our inputs
	step = step ? step : 1;
	
	if (typeof(end) === 'undefined') {
		end   = begin > 0 ? begin : 0;
		begin = begin < 0 ? begin : 0;
	}
	
	if (begin == end) {
		return;
	}
	
	if (begin > end) {
		step = step * -1;	
	}
	
	for (let x = begin; x < end; x += step) {
		yield x;
	}
}

export function range(begin, end, step) {
	if (begin < 0) begin = 0;
	return Array.from(iter_range(begin,end,step));
}

*/
function* iter_range(begin, end, step) {
    // Normalize our inputs
    step = step ? step : 1;
    
    // Handle case where only 'begin' is provided
    if (typeof(end) === 'undefined') {
        end = 0;
    }

    // Handle cases where 'begin' is greater than 'end'
    if (begin > end) {
        step = Math.abs(step) * -1; // Ensure step is negative
        for (let x = begin; x > end; x += step) {
            yield x;
        }
    } else {
        // Handle cases where 'begin' is less than or equal to 'end'
        for (let x = begin; x < end; x += step) {
            yield x;
        }
    }
}

export function range(begin, end, step) {
    // Adjust 'begin' and 'end' if only 'begin' is provided
    if (typeof(end) === 'undefined') {
        end = begin > 0 ? 0 : begin;
        begin = begin > 0 ? begin : 0;
    }
    return Array.from(iter_range(begin, end, step));
}
