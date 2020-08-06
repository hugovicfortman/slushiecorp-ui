export enum OrderStates {
    New = 0,
    Accepted = 10,
    Rejected = -10
}

export enum CustomerStates {
    New = 0,                   // new
    Ordering = 1,              // ordering
    Consuming = -1,            // drinking
    Empty = -2,                // empty
    Supplied = 10,             // supplied
    Rejected = -10             // rejected
}
