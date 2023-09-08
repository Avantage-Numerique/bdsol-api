

const withOrganiations = function() {
    this.aggregate([{
        from: 'organisations',
        localField: '_id',
        foreignField: 'team.member',
        as: 'organisations'
    }])
}

export default withOrganiations;