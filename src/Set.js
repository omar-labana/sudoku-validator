class Set {
    constructor(set) {
        /**
     * @param {[string]} set
     */
        this.data = set;
        this.validSet = this.validateSet();
        this.complete = this.validateComplete();
        this.valid = this.complete && this.validSet;
    }

    validateSet() {
        return this.validateBoundries() && this.validateDuplicates();
    }

    validateBoundries() {
        return this.data.every((c) => c >= 0 && c <= 9);
    }
    
    validateDuplicates() {
        return this.data.every((c) => c!== "0" ? this.data.indexOf(c) === this.data.lastIndexOf(c): true);
    }

    validateComplete() {
        return this.data.every((c) => c !== "0");
    }
}

module.exports = Set
